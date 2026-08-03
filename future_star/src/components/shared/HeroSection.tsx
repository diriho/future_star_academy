import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Breadcrumb, type Crumb } from './Breadcrumb'
import './HeroSection.css'

interface HeroCta {
  label: string
  to: string
  icon?: ReactNode
}

interface HeroSectionProps {
  image: string
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  actions?: ReactNode
  crumbs?: Crumb[]
  size?: 'lg' | 'md'
}

export function HeroSection({
  image,
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  actions,
  crumbs,
  size = 'md',
}: HeroSectionProps) {
  return (
    <section className={cn('hero', size === 'lg' && 'hero--lg')}>
      <img src={image} alt="" className="hero__image" />
      <div className="hero__overlay" />
      <div className="hero__content">
        {crumbs && <Breadcrumb items={crumbs} light className="hero__breadcrumb" />}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero__inner"
        >
          {eyebrow && <span className="hero__eyebrow">{eyebrow}</span>}
          <h1 className="hero__title">{title}</h1>
          {subtitle && <p className="hero__subtitle">{subtitle}</p>}
          {actions ? (
            <div className="hero__actions">{actions}</div>
          ) : (
            (primaryCta || secondaryCta) && (
              <div className="hero__actions">
                {primaryCta && (
                  <Button to={primaryCta.to} variant="gold" size="lg" icon={primaryCta.icon}>
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button to={secondaryCta.to} variant="outline" size="lg" icon={secondaryCta.icon}>
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
