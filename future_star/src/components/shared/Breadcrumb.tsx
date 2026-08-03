import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: Crumb[]
  light?: boolean
  className?: string
}

export function Breadcrumb({ items, light = false, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm font-medium">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className={cn(
                    'transition-colors hover:text-gold',
                    light ? 'text-white/70' : 'text-navy/60',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(light ? 'text-gold' : 'text-navy', 'font-semibold')}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className={cn('h-3.5 w-3.5', light ? 'text-white/50' : 'text-navy/40')}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
