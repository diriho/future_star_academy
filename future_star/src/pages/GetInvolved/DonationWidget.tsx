import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Heart, RefreshCw } from 'lucide-react'
import { cn } from '../../lib/utils'
import { createCheckoutSession } from '../../lib/api'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'
import './DonationWidget.css'

const PRESETS = {
  once: [25, 50, 100, 250],
  monthly: [10, 25, 50, 100],
}

interface CustomAmountForm {
  customAmount: string
}

export function DonationWidget() {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [selected, setSelected] = useState<number | 'custom'>(50)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomAmountForm>({ defaultValues: { customAmount: '' } })

  const customAmount = useWatch({ control, name: 'customAmount' })

  function switchFrequency(next: 'once' | 'monthly') {
    setFrequency(next)
    setSelected(PRESETS[next][1])
  }

  async function startCheckout(amount: number) {
    if (!amount || amount < 1) {
      toast.error('Please enter a donation amount of at least $1.')
      return
    }
    setSubmitting(true)
    try {
      const { url } = await createCheckoutSession({ amount, recurring: frequency === 'monthly' })
      window.location.assign(url)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  function onSubmit(data: CustomAmountForm) {
    startCheckout(Number(data.customAmount))
  }

  const isCustom = selected === 'custom'

  return (
    <div className="donation-widget">
      <div className="donation-widget__toggle">
        {(['once', 'monthly'] as const).map((freq) => (
          <button
            key={freq}
            type="button"
            onClick={() => switchFrequency(freq)}
            aria-pressed={frequency === freq}
            className={cn('donation-widget__toggle-btn', frequency === freq && 'is-active')}
          >
            {freq === 'once' ? 'One-Time' : 'Monthly'}
          </button>
        ))}
      </div>

      <div className="donation-widget__amounts">
        {PRESETS[frequency].map((amount) => (
          <motion.button
            key={amount}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelected(amount)}
            className={cn('donation-widget__amount-btn', selected === amount && 'is-selected')}
          >
            ${amount}
            {frequency === 'monthly' && <span className="donation-widget__amount-period">/month</span>}
          </motion.button>
        ))}
        <button
          type="button"
          onClick={() => setSelected('custom')}
          className={cn('donation-widget__amount-btn', isCustom && 'is-selected')}
        >
          Custom
        </button>
      </div>

      {isCustom && (
        <form onSubmit={handleSubmit(onSubmit)} className="donation-widget__custom-form">
          <label htmlFor="customAmount" className="donation-widget__custom-label">
            Enter your {frequency === 'monthly' ? 'monthly ' : ''}donation amount (USD)
          </label>
          <div className="donation-widget__custom-input-wrap">
            <span className="donation-widget__custom-currency">$</span>
            <input
              id="customAmount"
              type="number"
              min={1}
              step="1"
              inputMode="decimal"
              aria-invalid={!!errors.customAmount}
              aria-describedby={errors.customAmount ? 'customAmount-error' : undefined}
              className="donation-widget__custom-input"
              placeholder="0.00"
              {...register('customAmount', {
                required: 'Please enter an amount.',
                min: { value: 1, message: 'Minimum donation is $1.' },
              })}
            />
          </div>
          {errors.customAmount && (
            <p id="customAmount-error" role="alert" className="donation-widget__custom-error">
              {errors.customAmount.message}
            </p>
          )}
        </form>
      )}

      <button
        type="button"
        disabled={submitting}
        onClick={() => (isCustom ? handleSubmit(onSubmit)() : startCheckout(selected as number))}
        className="donation-widget__submit"
      >
        {submitting ? (
          <LoadingSpinner size="sm" />
        ) : frequency === 'monthly' ? (
          <RefreshCw size={16} aria-hidden="true" />
        ) : (
          <Heart size={16} aria-hidden="true" />
        )}
        {submitting ? 'Redirecting to checkout…' : frequency === 'monthly' ? 'Become a Monthly Sponsor' : 'Donate Once'}
      </button>
      <p className="donation-widget__footnote">
        {isCustom && customAmount ? `You're donating $${customAmount}${frequency === 'monthly' ? '/month' : ''}. ` : ''}
        Secure checkout powered by Stripe.
      </p>
    </div>
  )
}
