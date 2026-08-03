import { useState } from 'react'
import { cn } from '../../lib/utils'
import './LazyImage.css'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

export function LazyImage({ src, alt, className, imgClassName }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('lazy-image', className)}>
      {!loaded && <div className="lazy-image__skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn('lazy-image__img', loaded && 'is-loaded', imgClassName)}
      />
    </div>
  )
}
