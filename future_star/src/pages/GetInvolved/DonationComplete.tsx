import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'
import { fetchSessionStatus, type SessionStatus } from '../../lib/api'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'
import './DonationComplete.css'

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

  // A missing session_id is knowable at render time, so it's derived rather than
  // pushed into state from an effect.
  const error = sessionId ? fetchError : 'We couldn’t find a donation to confirm.'

  useEffect(() => {
    if (!sessionId) return

    let cancelled = false
    fetchSessionStatus(sessionId)
      .then((result) => {
        if (!cancelled) setStatus(result)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setFetchError(err instanceof Error ? err.message : 'Unable to confirm your donation status.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [sessionId])

  const amount = status ? formatAmount(status.amountTotal, status.currency) : null
  const isPaid = status?.status === 'complete' && status.paymentStatus !== 'unpaid'
  // Bank debits and other delayed methods complete the session but settle later.
  const isProcessing = status?.status === 'complete' && status.paymentStatus === 'unpaid'

  return (
    <>
      <Helmet>
        <title>Donation Confirmation | Future Stars Academy</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="section section--offwhite donation-complete">
        <div className="container donation-complete__container">
          <div className="donation-complete__card">
            {!status && !error && (
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

            {status && status.status !== 'complete' && (
              <>
                <span className="donation-complete__icon donation-complete__icon--error">
                  <XCircle size={32} aria-hidden="true" />
                </span>
                <h1 className="donation-complete__title">
                  {status.status === 'expired' ? 'This checkout expired' : 'Donation not completed'}
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
