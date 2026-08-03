import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Heart, RefreshCw } from 'lucide-react'
import { cn } from '../../lib/utils'
import { createCheckoutSession } from '../../lib/api'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'

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
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-[0_8px_40px_rgba(11,35,70,0.12)] ring-1 ring-navy/5 md:p-10">
      <div className="mx-auto flex w-fit rounded-full bg-offwhite p-1">
        {(['once', 'monthly'] as const).map((freq) => (
          <button
            key={freq}
            type="button"
            onClick={() => switchFrequency(freq)}
            aria-pressed={frequency === freq}
            className={cn(
              'rounded-full px-6 py-2 text-sm font-heading font-bold uppercase tracking-wide transition-colors',
              frequency === freq ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy',
            )}
          >
            {freq === 'once' ? 'One-Time' : 'Monthly'}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PRESETS[frequency].map((amount) => (
          <motion.button
            key={amount}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelected(amount)}
            className={cn(
              'rounded-lg border-2 py-4 text-center font-heading text-lg font-bold transition-colors',
              selected === amount ? 'border-gold bg-gold/10 text-navy' : 'border-navy/10 text-navy/70 hover:border-gold/50',
            )}
          >
            ${amount}
            {frequency === 'monthly' && <span className="block text-xs font-normal text-navy/50">/month</span>}
          </motion.button>
        ))}
        <button
          type="button"
          onClick={() => setSelected('custom')}
          className={cn(
            'rounded-lg border-2 py-4 text-center font-heading text-lg font-bold transition-colors',
            isCustom ? 'border-gold bg-gold/10 text-navy' : 'border-navy/10 text-navy/70 hover:border-gold/50',
          )}
        >
          Custom
        </button>
      </div>

      {isCustom && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label htmlFor="customAmount" className="mb-1.5 block text-sm font-semibold text-navy">
            Enter your {frequency === 'monthly' ? 'monthly ' : ''}donation amount (USD)
          </label>
          <div className="flex items-center gap-2 rounded-lg border-2 border-navy/10 px-4 py-2 focus-within:border-gold">
            <span className="text-navy/50">$</span>
            <input
              id="customAmount"
              type="number"
              min={1}
              step="1"
              inputMode="decimal"
              aria-invalid={!!errors.customAmount}
              aria-describedby={errors.customAmount ? 'customAmount-error' : undefined}
              className="w-full border-0 bg-transparent py-1 text-navy outline-none"
              placeholder="0.00"
              {...register('customAmount', {
                required: 'Please enter an amount.',
                min: { value: 1, message: 'Minimum donation is $1.' },
              })}
            />
          </div>
          {errors.customAmount && (
            <p id="customAmount-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.customAmount.message}
            </p>
          )}
        </form>
      )}

      <button
        type="button"
        disabled={submitting}
        onClick={() => (isCustom ? handleSubmit(onSubmit)() : startCheckout(selected as number))}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-md disabled:pointer-events-none disabled:opacity-70"
      >
        {submitting ? (
          <LoadingSpinner size="sm" />
        ) : frequency === 'monthly' ? (
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Heart className="h-4 w-4" aria-hidden="true" />
        )}
        {submitting ? 'Redirecting to checkout…' : frequency === 'monthly' ? 'Become a Monthly Sponsor' : 'Donate Once'}
      </button>
      <p className="mt-4 text-center text-xs text-navy/50">
        {isCustom && customAmount ? `You're donating $${customAmount}${frequency === 'monthly' ? '/month' : ''}. ` : ''}
        Secure checkout powered by Stripe.
      </p>
    </div>
  )
}
