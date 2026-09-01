import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, Heart, Lock, RefreshCw } from 'lucide-react'
import {
  CheckoutElementsProvider,
  PaymentElement,
  useCheckoutElements,
} from '@stripe/react-stripe-js/checkout'
import type { Appearance } from '@stripe/stripe-js'
import { createCheckoutSession } from '../../lib/api'
import { getStripe } from '../../lib/stripe'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'
import './SponsorCheckout.css'

const MIN_AMOUNT = 1
const MAX_AMOUNT = 100000

// Matches the site's navy/gold palette so the Stripe iframe doesn't read as a
// third-party form bolted onto the page.
const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#f4b400',
    colorText: '#071a3d',
    colorDanger: '#dc2626',
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
    borderRadius: '8px',
    spacingUnit: '4px',
  },
}

function CheckoutForm({ amount, isRecurring }: { amount: number; isRecurring: boolean }) {
  const navigate = useNavigate()
  const checkoutState = useCheckoutElements()
  const [submitting, setSubmitting] = useState(false)

  if (checkoutState.type === 'loading') {
    return (
      <div className="sponsor-checkout__loading">
        <LoadingSpinner size="md" />
        <p>Loading secure payment form…</p>
      </div>
    )
  }

  if (checkoutState.type === 'error') {
    return (
      <p role="alert" className="sponsor-checkout__error">
        {checkoutState.error.message}
      </p>
    )
  }

  const { checkout } = checkoutState

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    setSubmitting(true)

    // Payment methods that need to leave the site (3DS, bank redirects, wallets)
    // are sent to the session's return_url by Stripe. Anything confirmed inline
    // resolves here, so both paths end on the same completion page.
    const result = await checkout.confirm()

    if (result.type === 'error') {
      toast.error(result.error.message)
      setSubmitting(false)
      return
    }

    navigate(`/get-involved/sponsor/complete?session_id=${encodeURIComponent(result.session.id)}`)
  }

  const label = isRecurring ? `Donate $${amount}/month` : `Donate $${amount}`

  return (
    <form onSubmit={handleSubmit} className="sponsor-checkout__form">
      <PaymentElement options={{ layout: 'tabs' }} />

      <button type="submit" disabled={submitting} className="sponsor-checkout__submit">
        {submitting ? (
          <LoadingSpinner size="sm" />
        ) : isRecurring ? (
          <RefreshCw size={16} aria-hidden="true" />
        ) : (
          <Heart size={16} aria-hidden="true" />
        )}
        {submitting ? 'Processing…' : label}
      </button>

      <p className="sponsor-checkout__secure">
        <Lock size={12} aria-hidden="true" />
        Payments are processed securely by Stripe. Card details never touch our servers.
      </p>
    </form>
  )
}

// Owns one Stripe session for one (amount, frequency) pair. The parent remounts
// this via `key` when either changes, so a stale client secret can never outlive
// the amount shown to the donor.
function CheckoutSession({ amount, isRecurring }: { amount: number; isRecurring: boolean }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // StrictMode double-invokes effects in dev, and each run would create a real
  // Stripe session (and a pending donations row), so creation is guarded.
  const requested = useRef(false)

  const stripePromise = getStripe()

  useEffect(() => {
    if (requested.current || !stripePromise) return
    requested.current = true

    createCheckoutSession({ amount, recurring: isRecurring })
      .then((session) => setClientSecret(session.clientSecret))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unable to start checkout right now.')
      })
  }, [amount, isRecurring, stripePromise])

  if (!stripePromise) {
    return (
      <p role="alert" className="sponsor-checkout__error">
        Payments aren't configured yet. Set VITE_STRIPE_PUBLISHABLE_KEY in future_star/.env and
        restart the dev server.
      </p>
    )
  }

  if (error) {
    return (
      <p role="alert" className="sponsor-checkout__error">
        {error}
      </p>
    )
  }

  if (!clientSecret) {
    return (
      <div className="sponsor-checkout__loading">
        <LoadingSpinner size="md" />
        <p>Preparing secure checkout…</p>
      </div>
    )
  }

  return (
    <CheckoutElementsProvider
      stripe={stripePromise}
      options={{ clientSecret, elementsOptions: { appearance } }}
    >
      <CheckoutForm amount={amount} isRecurring={isRecurring} />
    </CheckoutElementsProvider>
  )
}

export default function SponsorCheckout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const amount = Number(searchParams.get('amount'))
  const isRecurring = searchParams.get('frequency') === 'monthly'
  const amountIsValid = Number.isFinite(amount) && amount >= MIN_AMOUNT && amount <= MAX_AMOUNT

  useEffect(() => {
    if (!amountIsValid) {
      toast.error('Please choose a donation amount first.')
      navigate('/get-involved/sponsor', { replace: true })
    }
  }, [amountIsValid, navigate])

  if (!amountIsValid) return null

  return (
    <>
      <Helmet>
        <title>Complete Your Donation | Future Stars Academy</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="section section--offwhite sponsor-checkout">
        <div className="container sponsor-checkout__container">
          <Link to="/get-involved/sponsor" className="sponsor-checkout__back">
            <ArrowLeft size={16} aria-hidden="true" />
            Change amount
          </Link>

          <div className="sponsor-checkout__card">
            <header className="sponsor-checkout__header">
              <h1 className="sponsor-checkout__title">Complete your donation</h1>
              <p className="sponsor-checkout__summary">
                <span className="sponsor-checkout__amount">${amount}</span>
                <span className="sponsor-checkout__frequency">
                  {isRecurring ? 'every month' : 'one-time gift'}
                </span>
              </p>
            </header>

            <CheckoutSession
              key={`${amount}:${isRecurring}`}
              amount={amount}
              isRecurring={isRecurring}
            />
          </div>
        </div>
      </section>
    </>
  )
}
