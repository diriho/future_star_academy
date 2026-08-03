import { motion } from 'framer-motion'
import { LazyImage } from './LazyImage'

export interface GalleryImage {
  src: string
  caption: string
}

interface GallerySectionProps {
  images: GalleryImage[]
}

export function GallerySection({ images }: GallerySectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {images.map((image, i) => (
        <motion.div
          key={image.src + i}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className={`group relative rounded-lg ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
        >
          <LazyImage
            src={image.src}
            alt={image.caption}
            className="h-full min-h-[140px] w-full rounded-lg"
            imgClassName="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-end rounded-lg bg-gradient-to-t from-navy/80 via-navy/0 to-navy/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="p-3 text-xs font-semibold text-white md:text-sm">{image.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
