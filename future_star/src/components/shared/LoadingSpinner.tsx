import { cn } from '../../lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md'
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block animate-spin rounded-full border-navy/20 border-t-gold',
        size === 'sm' ? 'h-4 w-4 border-2' : 'h-8 w-8 border-[3px]',
        className,
      )}
    />
  )
}
