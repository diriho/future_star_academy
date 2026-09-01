import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import './DonationWidget.css'

const PRESETS = {
  once: [25, 50, 100, 250],
  monthly: [10, 25, 50, 100],
}

interface CustomAmountForm {
  customAmount: string
}

export function DonationWidget() {
  const navigate = useNavigate()
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [selected, setSelected] = useState<number | 'custom'>(50)

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

  // The amount lives in the URL rather than router state so the checkout page
  // survives a refresh or a shared link without dropping back to $0.
  function goToCheckout(amount: number) {
    if (!amount || amount < 1) {
      toast.error('Please enter a donation amount of at least $1.')
      return
    }
    navigate(`/get-involved/sponsor/checkout?amount=${amount}&frequency=${frequency}`)
  }

  function onSubmit(data: CustomAmountForm) {
    goToCheckout(Number(data.customAmount))
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
        onClick={() => (isCustom ? handleSubmit(onSubmit)() : goToCheckout(selected as number))}
        className="donation-widget__submit"
      >
        Continue to Payment
        <ArrowRight size={16} aria-hidden="true" />
      </button>
      <p className="donation-widget__footnote">
        {isCustom && customAmount ? `You're donating $${customAmount}${frequency === 'monthly' ? '/month' : ''}. ` : ''}
        Secure checkout powered by Stripe.
      </p>
    </div>
  )
}
