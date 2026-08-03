import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

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
      className={cn(align === 'center' ? 'text-center mx-auto' : 'text-left', 'max-w-2xl', className)}
    >
      {eyebrow && (
        <span
          className={cn(
            'block font-heading text-sm font-bold uppercase tracking-widest mb-2',
            light ? 'text-gold' : 'text-gold-dark',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-3xl md:text-4xl font-bold leading-tight',
          light ? 'text-white' : 'text-navy',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base leading-relaxed', light ? 'text-white/80' : 'text-navy/70')}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
