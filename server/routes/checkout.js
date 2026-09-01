import { Router } from 'express'
import { getStripe } from '../stripeClient.js'
import { insertDonation } from '../db.js'
import { getClientUrl } from '../clientUrl.js'

export const checkoutRouter = Router()

const MIN_AMOUNT = 1
const MAX_AMOUNT = 100000

checkoutRouter.post('/create-checkout-session', async (req, res) => {
  const { amount, recurring } = req.body ?? {}

  const parsedAmount = Number(amount)
  if (!Number.isFinite(parsedAmount) || parsedAmount < MIN_AMOUNT || parsedAmount > MAX_AMOUNT) {
    return res.status(400).json({ error: `Donation amount must be between $${MIN_AMOUNT} and $${MAX_AMOUNT}.` })
  }

  const isRecurring = Boolean(recurring)
  const clientUrl = getClientUrl()
  const unitAmount = Math.round(parsedAmount * 100)

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      // 'elements' returns a client_secret instead of a hosted URL, so the
      // Payment Element can render the payment form on our own checkout page.
      ui_mode: 'elements',
      mode: isRecurring ? 'subscription' : 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: isRecurring ? 'Monthly Sponsorship — Future Stars Academy' : 'Donation — Future Stars Academy',
            },
            unit_amount: unitAmount,
            ...(isRecurring ? { recurring: { interval: 'month' } } : {}),
          },
          quantity: 1,
        },
      ],
      // Where Stripe sends the donor back after any payment method that has to
      // leave our site to authenticate (3DS challenges, bank redirects, wallets).
      return_url: `${clientUrl}/get-involved/sponsor/complete?session_id={CHECKOUT_SESSION_ID}`,
    })

    insertDonation({ stripeSession: session.id, amount: unitAmount, recurring: isRecurring })

    res.json({ clientSecret: session.client_secret })
  } catch (err) {
    console.error('Failed to create Stripe checkout session:', err)
    res.status(500).json({ error: 'Unable to start checkout right now. Please try again shortly.' })
  }
})

// Backs the post-payment return page. The donor's browser can be redirected here
// by Stripe, so the status is always re-read from the API rather than trusted
// from the query string.
checkoutRouter.get('/session-status', async (req, res) => {
  const sessionId = req.query.session_id

  if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    return res.status(400).json({ error: 'A valid session_id is required.' })
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    res.json({
      status: session.status,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email ?? null,
      recurring: session.mode === 'subscription',
    })
  } catch (err) {
    console.error('Failed to retrieve Stripe checkout session:', err)
    res.status(500).json({ error: 'Unable to confirm your donation status right now.' })
  }
})
