import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'
import './CTASection.css'

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
    <section className="cta">
      <div className="cta__blob cta__blob--top" aria-hidden="true" />
      <div className="cta__blob cta__blob--bottom" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="cta__content"
      >
        <h2 className="cta__title">{title}</h2>
        {subtitle && <p className="cta__subtitle">{subtitle}</p>}
        <div className="cta__actions">
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
