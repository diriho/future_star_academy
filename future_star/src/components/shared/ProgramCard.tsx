import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

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
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(11,35,70,0.08)] ring-1 ring-navy/5 transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(11,35,70,0.18)]"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
        <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-md">
          <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">{description}</p>
        <Link
          to={to}
          className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-navy transition-colors group-hover:text-gold-dark"
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  )
}
