import { cn } from '../../lib/utils'
import './LoadingSpinner.css'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md'
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('spinner', `spinner--${size}`, className)}
    />
  )
}
