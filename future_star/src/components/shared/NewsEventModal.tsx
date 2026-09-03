import { useCallback, useEffect, useMemo, useState } from 'react'
import { CalendarDays, ExternalLink, MapPin, ZoomIn } from 'lucide-react'
import { fetchNewsEventBySlug, type ContentImage, type NewsEvent, type NewsEventDetail } from '../../lib/api'
import { formatDate } from '../../lib/utils'
import { ImageLightbox } from './ImageLightbox'
import { LazyImage } from './LazyImage'
import { LoadingSpinner } from './LoadingSpinner'
import { Modal } from './Modal'
import { NewsEventContent } from './NewsEventContent'
import './NewsEventModal.css'

interface NewsEventModalProps {
  // The slug of the item to show, or null when nothing is open.
  slug: string | null
  // The list row that was clicked. Its title, date and summary render immediately so
  // the dialog has real content while the page body is still being fetched. Null when
  // the dialog was opened straight from a shared URL, before the list has loaded.
  preview: NewsEvent | null
  onClose: () => void
}

// Both the fetch result and the open picture are stamped with the slug they belong to,
// so switching stories derives a fresh loading state instead of resetting state from
// inside the effect (which would cascade an extra render on every open).
interface FetchResult {
  slug: string
  detail: NewsEventDetail | null
  error: string
}

function formatDateRange(start: string | null, end: string | null) {
  const from = formatDate(start)
  if (!from) return ''
  const to = formatDate(end)
  return to && to !== from ? `${from} – ${to}` : from
}

export function NewsEventModal({ slug, preview, onClose }: NewsEventModalProps) {
  const [result, setResult] = useState<FetchResult | null>(null)
  const [lightbox, setLightbox] = useState<{ slug: string; index: number } | null>(null)

  useEffect(() => {
    if (!slug) return

    let cancelled = false

    fetchNewsEventBySlug(slug)
      .then((detail) => {
        if (!cancelled) setResult({ slug, detail, error: '' })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const error = err instanceof Error ? err.message : 'Unable to load this story right now.'
        setResult({ slug, detail: null, error })
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  const current = result && result.slug === slug ? result : null
  const detail = current?.detail ?? null
  const isLoading = slug !== null && current === null

  const item = detail ?? preview
  const isEvent = item?.type === 'Event'

  // Before the fetch lands there's only the list row's featured image to show, so the
  // lightbox opens on that one picture and grows to the full set once it arrives.
  const images: ContentImage[] = useMemo(() => {
    if (detail) return detail.images
    if (preview?.featuredImage) return [{ url: preview.featuredImage, caption: preview.title }]
    return []
  }, [detail, preview])

  const imageIndexByUrl = useMemo(() => {
    const map = new Map<string, number>()
    images.forEach((image, i) => {
      if (!map.has(image.url)) map.set(image.url, i)
    })
    return map
  }, [images])

  const openImage = useCallback(
    (index: number) => {
      if (slug) setLightbox({ slug, index })
    },
    [slug],
  )

  const closeImage = useCallback(() => setLightbox(null), [])

  // Only ever open on a picture that exists: an item whose Notion `Image` property
  // was cleared between the list and detail fetches would otherwise suspend the
  // dialog for a lightbox that has nothing to show, leaving Escape doing nothing.
  const lightboxIndex =
    lightbox && lightbox.slug === slug && images[lightbox.index] ? lightbox.index : null

  // The banner is the Notion `Image` property alone. images[0] would promote the
  // first body picture on an item without one, and the article below renders that
  // same picture in its own place — showing it twice.
  const heroUrl = item?.featuredImage ?? null
  const heroIndex = heroUrl ? imageIndexByUrl.get(heroUrl) ?? 0 : 0
  const dateLabel = isEvent
    ? formatDateRange(item?.startDate ?? null, item?.endDate ?? null)
    : formatDate(item?.publishDate)
  const tags = item ? (item.category.length > 0 ? item.category : item.type ? [item.type] : []) : []

  return (
    <>
      <Modal
        isOpen={slug !== null}
        onClose={onClose}
        title={item?.title ?? (current?.error ? 'Story unavailable' : 'Loading…')}
        suspended={lightboxIndex !== null}
      >
        <div className="story">
          {heroUrl && (
            <button
              type="button"
              onClick={() => openImage(heroIndex)}
              className="story__hero"
              aria-label={`View image full size: ${item?.title ?? ''}`}
            >
              <LazyImage src={heroUrl} alt={item?.title ?? ''} className="story__hero-image" fit="contain" />
              <span className="story__hero-zoom" aria-hidden="true">
                <ZoomIn size={16} />
              </span>
            </button>
          )}

          <div className="story__body">
            {(tags.length > 0 || dateLabel || item?.location) && (
              <div className="story__meta">
                {tags.map((tag) => (
                  <span key={tag} className="story__tag">
                    {tag}
                  </span>
                ))}
                {dateLabel && (
                  <span className="story__meta-item">
                    <CalendarDays size={14} aria-hidden="true" />
                    {dateLabel}
                  </span>
                )}
                {item?.location && (
                  <span className="story__meta-item">
                    <MapPin size={14} aria-hidden="true" />
                    {item.location}
                  </span>
                )}
              </div>
            )}

            {item?.summary && <p className="story__lede">{item.summary}</p>}

            {isLoading && (
              <div className="story__status">
                <LoadingSpinner size="sm" />
              </div>
            )}

            {current?.error && <p className="story__error">{current.error}</p>}

            {detail && detail.content.length > 0 && (
              <NewsEventContent
                blocks={detail.content}
                imageIndexOf={(url) => imageIndexByUrl.get(url) ?? 0}
                onOpenImage={openImage}
              />
            )}

            {detail && detail.content.length === 0 && !detail.summary && (
              <p className="story__empty">Full details for this {isEvent ? 'event' : 'story'} are coming soon.</p>
            )}

            {isEvent && item?.registrationUrl && (
              <a href={item.registrationUrl} target="_blank" rel="noopener noreferrer" className="story__register">
                Register for this event
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </Modal>

      <ImageLightbox images={images} index={lightboxIndex} onChangeIndex={openImage} onClose={closeImage} />
    </>
  )
}
