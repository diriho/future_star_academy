import { useState } from 'react'
import { cn } from '../../lib/utils'
import './LazyImage.css'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  // 'cover' crops the picture to fill its box. 'contain' shows all of it, letterboxed
  // over a blurred copy of itself so the spare space reads as part of the photo
  // rather than as empty bars — the right choice wherever the picture's shape is
  // unknown, like editor-supplied images in a fixed card slot.
  fit?: 'cover' | 'contain'
}

export function LazyImage({ src, alt, className, imgClassName, fit = 'cover' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('lazy-image', fit === 'contain' && 'lazy-image--contain', className)}>
      {!loaded && <div className="lazy-image__skeleton" aria-hidden="true" />}
      {fit === 'contain' && (
        // Same URL as the picture, so the browser makes one request for both.
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={cn('lazy-image__backdrop', loaded && 'is-loaded')}
        />
      )}
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
