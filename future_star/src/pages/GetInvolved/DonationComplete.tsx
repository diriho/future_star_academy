import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'
import { fetchSessionStatus, type SessionStatus } from '../../lib/api'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'
import './DonationComplete.css'

// Stripe usually finalises a session in well under a second, but a 3DS or bank
// redirect can lag. ~18s of polling covers that without stranding the donor.
const POLL_INTERVAL_MS = 1500
const MAX_ATTEMPTS = 12

function formatAmount(amountTotal: number | null, currency: string | null) {
  if (amountTotal == null) return null
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (currency ?? 'usd').toUpperCase(),
  }).format(amountTotal / 100)
}

export default function DonationComplete() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [status, setStatus] = useState<SessionStatus | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [settled, setSettled] = useState(false)

  // A missing session_id is knowable at render time, so it's derived rather than
  // pushed into state from an effect.
  const error = sessionId ? fetchError : 'We couldn’t find a donation to confirm.'

  useEffect(() => {
    if (!sessionId) return

    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined
    let attempts = 0

    // A session is not always 'complete' the instant the donor lands here: after a
    // 3DS or bank redirect Stripe may still be finalising it. Showing "no charge was
    // made" to someone who just paid is the worst possible failure, so poll until the
    // session reaches a terminal state before drawing any conclusion. Transient
    // network errors are retried on the same schedule rather than surfaced at once.
    async function poll() {
      attempts += 1
      try {
        const result = await fetchSessionStatus(sessionId as string)
        if (cancelled) return

        setStatus(result)

        if (result.status === 'complete' || result.status === 'expired') {
          setSettled(true)
          return
        }
        if (attempts >= MAX_ATTEMPTS) {
          setSettled(true)
          return
        }
        timer = setTimeout(poll, POLL_INTERVAL_MS)
      } catch (err: unknown) {
        if (cancelled) return

        if (attempts < MAX_ATTEMPTS) {
          timer = setTimeout(poll, POLL_INTERVAL_MS)
          return
        }
        setFetchError(err instanceof Error ? err.message : 'Unable to confirm your donation status.')
      }
    }

    void poll()

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [sessionId])

  const amount = status ? formatAmount(status.amountTotal, status.currency) : null

  // Exactly one of these is true for every combination of inputs, so two panels can
  // never render on top of each other. An error outranks everything else.
  const isPaid = !error && status?.status === 'complete' && status.paymentStatus !== 'unpaid'
  // Bank debits and other delayed methods complete the session but settle later.
  const isProcessing = !error && status?.status === 'complete' && status.paymentStatus === 'unpaid'
  const isExpired = !error && status?.status === 'expired'
  // Only call a donation failed once polling has actually given up on it.
  const isIncomplete = !error && settled && !isPaid && !isProcessing && !isExpired
  const isConfirming = !error && !isPaid && !isProcessing && !isExpired && !isIncomplete

  return (
    <>
      <Helmet>
        <title>Donation Confirmation | Future Stars Academy</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="section section--offwhite donation-complete">
        <div className="container donation-complete__container">
          <div className="donation-complete__card">
            {isConfirming && (
              <div className="donation-complete__loading">
                <LoadingSpinner size="md" />
                <p>Confirming your donation…</p>
              </div>
            )}

            {error && (
              <>
                <span className="donation-complete__icon donation-complete__icon--error">
                  <XCircle size={32} aria-hidden="true" />
                </span>
                <h1 className="donation-complete__title">Something went wrong</h1>
                <p className="donation-complete__message">{error}</p>
              </>
            )}

            {isPaid && (
              <>
                <span className="donation-complete__icon donation-complete__icon--success">
                  <CheckCircle2 size={32} aria-hidden="true" />
                </span>
                <h1 className="donation-complete__title">Thank you!</h1>
                <p className="donation-complete__message">
                  {amount ? <strong>{amount}</strong> : 'Your donation'}
                  {status?.recurring ? ' will be donated every month' : ' has been received'}. Your
                  support gives a child access to education, mentorship, and soccer development.
                </p>
                {status?.customerEmail && (
                  <p className="donation-complete__receipt">
                    A receipt is on its way to {status.customerEmail}.
                  </p>
                )}
              </>
            )}

            {isProcessing && (
              <>
                <span className="donation-complete__icon donation-complete__icon--pending">
                  <Clock size={32} aria-hidden="true" />
                </span>
                <h1 className="donation-complete__title">Your donation is processing</h1>
                <p className="donation-complete__message">
                  Your payment method takes a little longer to settle. We’ll email you as soon as it
                  clears — no further action needed.
                </p>
              </>
            )}

            {(isExpired || isIncomplete) && (
              <>
                <span className="donation-complete__icon donation-complete__icon--error">
                  <XCircle size={32} aria-hidden="true" />
                </span>
                <h1 className="donation-complete__title">
                  {isExpired ? 'This checkout expired' : 'Donation not completed'}
                </h1>
                <p className="donation-complete__message">
                  No charge was made. You’re welcome to try again whenever you’re ready.
                </p>
              </>
            )}

            <div className="donation-complete__actions">
              <Link to="/get-involved/sponsor" className="donation-complete__btn">
                {isPaid ? 'Give again' : 'Try again'}
              </Link>
              <Link to="/" className="donation-complete__btn donation-complete__btn--ghost">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
