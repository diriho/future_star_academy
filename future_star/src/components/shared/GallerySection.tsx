import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { LazyImage } from './LazyImage'
import './GallerySection.css'

export interface GalleryImage {
  src: string
  caption: string
}

interface GallerySectionProps {
  images: GalleryImage[]
}

export function GallerySection({ images }: GallerySectionProps) {
  return (
    <div className="gallery-grid">
      {images.map((image, i) => (
        <motion.div
          key={image.src + i}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className={cn('gallery-grid__item', i === 0 && 'gallery-grid__item--featured')}
        >
          <LazyImage src={image.src} alt={image.caption} className="gallery-grid__image" />
          <div className="gallery-grid__caption">
            <p>{image.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
