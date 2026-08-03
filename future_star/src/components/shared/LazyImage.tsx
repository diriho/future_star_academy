import { useState } from 'react'
import { cn } from '../../lib/utils'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

export function LazyImage({ src, alt, className, imgClassName }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-navy/5', className)}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-navy/10" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}
