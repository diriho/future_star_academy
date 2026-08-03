import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import './FeatureCard.css'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  tone?: 'navy' | 'gold'
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, tone = 'navy', className }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className={cn('feature-card', className)}
    >
      <div className={cn('feature-card__icon', `feature-card__icon--${tone}`)}>
        <Icon size={24} strokeWidth={2} aria-hidden="true" />
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
    </motion.div>
  )
}
