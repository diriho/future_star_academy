import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ContentImage } from '../../lib/api'
import './ImageLightbox.css'

const FOCUSABLE_SELECTOR = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

interface ImageLightboxProps {
  images: ContentImage[]
  // Index of the picture on show, or null when the lightbox is closed.
  index: number | null
  onChangeIndex: (index: number) => void
  onClose: () => void
}

export function ImageLightbox({ images, index, onChangeIndex, onClose }: ImageLightboxProps) {
  const isOpen = index !== null
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const count = images.length

  // Wraps around, so paging through a set never dead-ends on the first or last one.
  const step = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return
      onChangeIndex((index + delta + count) % count)
    },
    [index, count, onChangeIndex],
  )

  useEffect(() => {
    if (!isOpen) return

    triggerRef.current = document.activeElement
    closeButtonRef.current?.focus()

    // Hands focus back to the picture that was clicked. Without this, closing the
    // viewer drops focus on the body and the next Tab lands behind the dialog
    // underneath, which has stopped trapping the keyboard on this one's behalf.
    return () => {
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        step(1)
      } else if (e.key === 'ArrowLeft') {
        step(-1)
      } else if (e.key === 'Tab' && dialogRef.current) {
        // The dialog underneath stops trapping Tab while this is open (see Modal's
        // `suspended` prop), so keep the keyboard inside the viewer here.
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, step])

  // Index and picture are paired so the counter and the <img> share one narrowing.
  const current = index !== null && images[index] ? { index, image: images[index] } : null

  return createPortal(
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.image.caption || 'Image viewer'}
          className="lightbox"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="lightbox__close"
          >
            <X size={22} aria-hidden="true" />
          </button>

          {count > 1 && (
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="lightbox__nav lightbox__nav--prev"
            >
              <ChevronLeft size={26} aria-hidden="true" />
            </button>
          )}

          <figure className="lightbox__figure">
            {/* Keyed on the url so switching pictures remounts the img and
                re-runs the fade, instead of swapping the src underneath it. */}
            <motion.img
              key={current.image.url}
              src={current.image.url}
              alt={current.image.caption || ''}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="lightbox__image"
            />
            {(current.image.caption || count > 1) && (
              <figcaption className="lightbox__caption">
                {current.image.caption && <span>{current.image.caption}</span>}
                {count > 1 && (
                  <span className="lightbox__counter">
                    {current.index + 1} / {count}
                  </span>
                )}
              </figcaption>
            )}
          </figure>

          {count > 1 && (
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="lightbox__nav lightbox__nav--next"
            >
              <ChevronRight size={26} aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
