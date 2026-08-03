import { Router } from 'express'
import { getStripe } from '../stripeClient.js'
import { insertDonation } from '../db.js'

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
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
  const unitAmount = Math.round(parsedAmount * 100)

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
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
      success_url: `${clientUrl}/get-involved/sponsor?donation=success`,
      cancel_url: `${clientUrl}/get-involved/sponsor?donation=cancelled`,
    })

    insertDonation({ stripeSession: session.id, amount: unitAmount, recurring: isRecurring })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Failed to create Stripe checkout session:', err)
    res.status(500).json({ error: 'Unable to start checkout right now. Please try again shortly.' })
  }
})
