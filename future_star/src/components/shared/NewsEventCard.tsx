import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, ExternalLink, MapPin, Newspaper, PartyPopper } from 'lucide-react'
import type { NewsEvent } from '../../lib/api'
import { formatDate } from '../../lib/utils'
import { LazyImage } from './LazyImage'
import './NewsEventCard.css'

interface NewsEventCardProps {
  item: NewsEvent
  index?: number
  // When given, the whole card becomes the trigger for the item's detail dialog.
  onSelect?: (item: NewsEvent) => void
}

export function NewsEventCard({ item, index = 0, onSelect }: NewsEventCardProps) {
  const isEvent = item.type === 'Event'
  const tag = item.category[0] ?? item.type ?? 'Update'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="news-event-card"
    >
      <div className="news-event-card__image">
        {item.featuredImage ? (
          <LazyImage src={item.featuredImage} alt={item.title} className="news-event-card__lazy-image" />
        ) : (
          <div className="news-event-card__placeholder" aria-hidden="true">
            {isEvent ? <PartyPopper size={28} /> : <Newspaper size={28} />}
          </div>
        )}
        <span className="news-event-card__tag">{tag}</span>
      </div>

      <div className="news-event-card__body">
        <h3 className="news-event-card__title">
          {onSelect ? (
            // The button's ::after covers the card, so the whole thing is clickable
            // from a single tab stop whose accessible name is the title itself.
            <button type="button" onClick={() => onSelect(item)} className="news-event-card__trigger">
              {item.title}
            </button>
          ) : (
            item.title
          )}
        </h3>

        <div className="news-event-card__meta">
          {isEvent ? (
            <>
              {item.startDate && (
                <span className="news-event-card__meta-item">
                  <CalendarDays size={14} aria-hidden="true" />
                  {formatDate(item.startDate)}
                  {item.endDate && item.endDate !== item.startDate ? ` – ${formatDate(item.endDate)}` : ''}
                </span>
              )}
              {item.location && (
                <span className="news-event-card__meta-item">
                  <MapPin size={14} aria-hidden="true" />
                  {item.location}
                </span>
              )}
            </>
          ) : (
            item.publishDate && <span className="news-event-card__meta-item">{formatDate(item.publishDate)}</span>
          )}
        </div>

        {item.summary && <p className="news-event-card__summary">{item.summary}</p>}

        {onSelect && (
          <span className="news-event-card__more" aria-hidden="true">
            Read more
            <ArrowRight size={14} />
          </span>
        )}

        {isEvent && item.registrationUrl && (
          <a
            href={item.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="news-event-card__register"
          >
            Register
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  )
}
