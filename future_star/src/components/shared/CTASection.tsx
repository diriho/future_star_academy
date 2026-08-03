import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'

interface CTAButton {
  label: string
  to: string
  icon?: ReactNode
}

interface CTASectionProps {
  title: string
  subtitle?: string
  primary: CTAButton
  secondary?: CTAButton
}

export function CTASection({ title, subtitle, primary, secondary }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-navy py-16">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-base leading-relaxed text-white/80">{subtitle}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to={primary.to} variant="gold" size="lg" icon={primary.icon}>
            {primary.label}
          </Button>
          {secondary && (
            <Button to={secondary.to} variant="outline" size="lg" icon={secondary.icon}>
              {secondary.label}
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  )
}
