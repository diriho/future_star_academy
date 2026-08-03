import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

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
      className={cn(
        'group rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(11,35,70,0.08)] ring-1 ring-navy/5 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(11,35,70,0.15)]',
        className,
      )}
    >
      <div
        className={cn(
          'mb-5 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110',
          tone === 'navy' ? 'bg-navy text-gold' : 'bg-gold text-navy',
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
      </div>
      <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy/70">{description}</p>
    </motion.div>
  )
}
