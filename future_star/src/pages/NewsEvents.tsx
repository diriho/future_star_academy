import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from '../components/shared/HeroSection'
import { SectionTitle } from '../components/shared/SectionTitle'
import { CTASection } from '../components/shared/CTASection'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { NewsEventCard } from '../components/shared/NewsEventCard'
import { NewsEventModal } from '../components/shared/NewsEventModal'
import { fetchNewsEvents, type NewsEvent } from '../lib/api'
import { useStoryDialog } from '../lib/useStoryDialog'
import teamHuddle from '../assets/team-huddle.jpg'
import './NewsEvents.css'

export default function NewsEvents() {
  const [items, setItems] = useState<NewsEvent[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  const { activeSlug, activeItem, openStory, closeStory } = useStoryDialog(items)

  useEffect(() => {
    let cancelled = false
    fetchNewsEvents()
      .then((data) => {
        if (cancelled) return
        setItems(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const news = items.filter((item) => item.type === 'News')
  const events = items.filter((item) => item.type === 'Event')

  return (
    <>
      <Helmet>
        <title>News & Events | Future Stars Academy</title>
        <meta
          name="description"
          content="Catch up on the latest news from Future Stars Academy and see what events are coming up."
        />
      </Helmet>

      <HeroSection
        image={teamHuddle}
        eyebrow="News & Events"
        title="What's Happening at Future Stars Academy"
        subtitle="Stories from our programs and community, and the events bringing us together."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'News & Events' }]}
      />

      {status === 'loading' && (
        <div className="news-events-status">
          <LoadingSpinner size="md" />
        </div>
      )}

      {status === 'error' && (
        <div className="news-events-status">
          <p className="news-events-status__text">
            We couldn't load news & events right now. Please try again shortly.
          </p>
        </div>
      )}

      {status === 'ready' && (
        <>
          <section className="section section--white">
            <div className="container">
              <SectionTitle eyebrow="Latest Updates" title="News" align="center" className="mb-14" />
              {news.length > 0 ? (
                <div className="news-events-grid">
                  {news.map((item, i) => (
                    <NewsEventCard key={item.id} item={item} index={i} onSelect={openStory} />
                  ))}
                </div>
              ) : (
                <p className="news-events-empty">No news yet — check back soon.</p>
              )}
            </div>
          </section>

          <section className="section section--offwhite">
            <div className="container">
              <SectionTitle eyebrow="Mark Your Calendar" title="Events" align="center" className="mb-14" />
              {events.length > 0 ? (
                <div className="news-events-grid">
                  {events.map((item, i) => (
                    <NewsEventCard key={item.id} item={item} index={i} onSelect={openStory} />
                  ))}
                </div>
              ) : (
                <p className="news-events-empty">No upcoming events yet — check back soon.</p>
              )}
            </div>
          </section>
        </>
      )}

      <NewsEventModal slug={activeSlug} preview={activeItem} onClose={closeStory} />

      <CTASection
        title="Want to Be Part of the Story?"
        subtitle="Volunteer, sponsor a child, or partner with us to help write the next chapter."
        primary={{ label: 'Get Involved', to: '/get-involved', icon: <ArrowRight size={16} /> }}
        secondary={{ label: 'Donate Now', to: '/get-involved/sponsor' }}
      />
    </>
  )
}
