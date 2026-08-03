import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './ProgramCard.css'

interface ProgramCardProps {
  image: string
  icon: LucideIcon
  title: string
  description: string
  to: string
  cta?: string
}

export function ProgramCard({ image, icon: Icon, title, description, to, cta = 'Learn More' }: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -8 }}
      className="program-card"
    >
      <div className="program-card__image">
        <img src={image} alt="" loading="lazy" />
        <div className="program-card__image-overlay" />
        <div className="program-card__icon">
          <Icon size={24} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
      <div className="program-card__body">
        <h3 className="program-card__title">{title}</h3>
        <p className="program-card__description">{description}</p>
        <Link to={to} className="program-card__link">
          {cta}
          <ArrowRight size={16} className="program-card__arrow" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  )
}
