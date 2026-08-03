import express, { Router } from 'express'
import { getStripe } from '../stripeClient.js'
import { markDonationStatus } from '../db.js'

export const webhookRouter = Router()

// Stripe requires the raw request body (not JSON-parsed) to verify the signature.
// Scoped to just this route so it doesn't consume the body stream for other /api routes.
webhookRouter.post('/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set — cannot verify webhook signature.')
    return res.status(500).send('Webhook not configured')
  }

  let event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret)
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    markDonationStatus(session.id, 'completed')
  } else if (event.type === 'checkout.session.expired') {
    const session = event.data.object
    markDonationStatus(session.id, 'expired')
  }

  res.json({ received: true })
})
