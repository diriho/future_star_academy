import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import './SectionTitle.css'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={cn('section-title', align === 'center' && 'section-title--center', className)}
    >
      {eyebrow && (
        <span className={cn('section-title__eyebrow', light && 'section-title__eyebrow--light')}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn('section-title__heading', light && 'section-title__heading--light')}>
        {title}
      </h2>
      {description && (
        <p className={cn('section-title__description', light && 'section-title__description--light')}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
