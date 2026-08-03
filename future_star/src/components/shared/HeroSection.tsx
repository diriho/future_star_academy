import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'
import { Breadcrumb, type Crumb } from './Breadcrumb'

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
    <section
      className={`relative flex items-end overflow-hidden ${size === 'lg' ? 'min-h-[560px]' : 'min-h-[420px]'}`}
    >
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-32 md:px-10">
        {crumbs && <Breadcrumb items={crumbs} light className="mb-4" />}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          {eyebrow && (
            <span className="mb-3 block font-heading text-sm font-bold uppercase tracking-widest text-gold">
              {eyebrow}
            </span>
          )}
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">{subtitle}</p>}
          {actions ? (
            <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
          ) : (
            (primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-4">
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
