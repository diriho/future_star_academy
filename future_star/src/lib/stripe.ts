import { loadStripe, type Stripe } from '@stripe/stripe-js'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

// Stripe.js is a ~200KB third-party script, so it's loaded once and shared
// rather than re-fetched every time the checkout page mounts.
let stripePromise: Promise<Stripe | null> | null = null

export function getStripe(): Promise<Stripe | null> | null {
  if (!publishableKey) return null
  if (!stripePromise) stripePromise = loadStripe(publishableKey)
  return stripePromise
}

export const isStripeConfigured = Boolean(publishableKey)
