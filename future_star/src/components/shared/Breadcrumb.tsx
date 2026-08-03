import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import './Breadcrumb.css'

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
      <ol className="breadcrumb__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className="breadcrumb__item">
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className={cn('breadcrumb__link', light && 'breadcrumb__link--light')}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn('breadcrumb__current', light && 'breadcrumb__current--light')}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  size={14}
                  className={cn('breadcrumb__chevron', light && 'breadcrumb__chevron--light')}
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
