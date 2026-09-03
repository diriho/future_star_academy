import { motion } from 'framer-motion'
import { Newspaper, PartyPopper } from 'lucide-react'
import type { NewsEvent } from '../../lib/api'
import { formatDate } from '../../lib/utils'
import { LazyImage } from './LazyImage'
import './LatestNewsCard.css'

interface LatestNewsCardProps {
  item: NewsEvent
  index?: number
  onSelect: (item: NewsEvent) => void
}

// The compact teaser used in the home page's News & Events strip, where the cards sit
// three across in a column beside the Get Involved sidebar. NewsEventCard is the
// fuller treatment used on the News & Events page itself.
export function LatestNewsCard({ item, index = 0, onSelect }: LatestNewsCardProps) {
  const isEvent = item.type === 'Event'
  const tag = item.category[0] ?? item.type ?? 'Update'
  // An event's own date says more to a visitor than the day it was posted; news has
  // only the publish date to show.
  const date = isEvent ? item.startDate ?? item.publishDate : item.publishDate

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="news-card"
    >
      <div className="news-card__image">
        {item.featuredImage ? (
          <LazyImage src={item.featuredImage} alt={item.title} className="news-card__lazy-image" fit="contain" />
        ) : (
          <div className="news-card__placeholder" aria-hidden="true">
            {isEvent ? <PartyPopper size={24} /> : <Newspaper size={24} />}
          </div>
        )}
        <span className="news-card__tag">{tag}</span>
      </div>

      <div className="news-card__body">
        <h3 className="news-card__title">
          {/* The button's ::after covers the card, so the whole thing opens the story
              from a single tab stop whose accessible name is the title itself. */}
          <button type="button" onClick={() => onSelect(item)} className="news-card__trigger">
            {item.title}
          </button>
        </h3>
        <p className="news-card__date">{formatDate(date)}</p>
      </div>
    </motion.article>
  )
}
