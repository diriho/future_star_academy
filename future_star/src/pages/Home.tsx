import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Gift,
  GraduationCap,
  Handshake,
  HandCoins,
  HandHeart,
  Heart,
  HeartHandshake,
  Megaphone,
  Trophy,
  Users,
  Users2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/shared/Button'
import { SectionTitle } from '../components/shared/SectionTitle'
import { FeatureCard } from '../components/shared/FeatureCard'
import { StatsSection } from '../components/shared/StatsSection'
import { GallerySection } from '../components/shared/GallerySection'
import { LazyImage } from '../components/shared/LazyImage'
import './Home.css'

import soccerTrio from '../assets/soccer-trio.jpg'
import classroom1 from '../assets/classroom-1.jpg'
import classroom2 from '../assets/classroom-2.jpg'
import teamHuddle from '../assets/team-huddle.jpg'

const missionCards = [
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'We support academic excellence and provide resources for lifelong learning.',
  },
  {
    icon: HeartHandshake,
    title: 'Mentorship',
    description: 'We mentor young minds to build confidence, character, and leadership.',
  },
  {
    icon: Trophy,
    title: 'Sports',
    description: 'We develop talent, teamwork, and discipline through soccer and athletics.',
  },
  {
    icon: Users2,
    title: 'Community',
    description: 'We engage families and communities to create a better future for all.',
  },
]

const programStrip = [
  { icon: BookOpen, label: 'Academic Enrichment & Tutoring', to: '/programs/education' },
  { icon: Trophy, label: 'Soccer Training & Talent Development', to: '/programs/sports' },
  { icon: Handshake, label: 'Leadership & Character Building', to: '/programs/mentorship' },
  { icon: Users, label: 'Mentorship & Life Skills', to: '/programs/mentorship' },
  { icon: Megaphone, label: 'Community Outreach & Youth Empowerment', to: '/programs/community-services' },
]

const getInvolvedStrip = [
  { icon: HandHeart, title: 'Volunteer', subtitle: 'Join Us', to: '/get-involved/volunteer' },
  { icon: Handshake, title: 'Sponsor', subtitle: 'Sign Me Up', to: '/get-involved/sponsor' },
  { icon: Users2, title: 'Get Involved', subtitle: 'Make an Impact', to: '/get-involved' },
  { icon: Heart, title: 'Donate', subtitle: 'Support Our Cause', to: '/get-involved/sponsor' },
]

const newsItems = [
  {
    image: classroom1,
    tag: 'Education',
    title: 'Back to School Program Empowers Students',
    date: 'May 10, 2025',
  },
  {
    image: teamHuddle,
    tag: 'Events',
    title: 'Future Stars Soccer Camp A Big Success!',
    date: 'April 25, 2025',
  },
  {
    image: classroom2,
    tag: 'Community',
    title: 'Community Outreach Makes an Impact',
    date: 'April 10, 2025',
  },
]

const getInvolvedSidebar = [
  { icon: HandHeart, label: 'Volunteer', to: '/get-involved/volunteer' },
  { icon: Gift, label: 'Sponsor a Program', to: '/get-involved/sponsor' },
  { icon: HandCoins, label: 'Make a Donation', to: '/get-involved/sponsor' },
  { icon: Handshake, label: 'Partner With Us', to: '/get-involved/partner' },
]

const galleryImages = [
  { src: soccerTrio, caption: 'On the Field' },
  { src: classroom1, caption: 'Classroom Learning' },
  { src: teamHuddle, caption: 'Team Spirit' },
  { src: classroom2, caption: 'STEM & Tutoring' },
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Future Stars Academy | Building Minds. Developing Talents. Transforming Lives.</title>
        <meta
          name="description"
          content="Future Stars Academy empowers children and young people through education, mentorship, leadership, and sports to become future leaders on and off the field."
        />
      </Helmet>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero__container">
          {/* Left Column */}
          <motion.div
            className="home-hero__content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            
            <h1 className="home-hero__title">
              Building Minds.
              <br />
              Developing Talents.
              <br />
              <span className="home-hero__title-accent">
                Transforming Lives.
              </span>
            </h1>

            <p className="home-hero__subtitle">
              Empowering children and young people through education,
              mentorship, leadership, and sports to become future leaders
              on and off the field.
            </p>

            <div className="home-hero__actions">
              <Button
                to="/get-involved"
                variant="gold"
                size="lg"
                icon={<ArrowRight size={16} />}
              >
                Get Involved
              </Button>

              <Button
                to="/get-involved/sponsor"
                variant="outline"
                size="lg"
                icon={<Heart size={16} />}
              >
                Donate Now
              </Button>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="home-hero__image-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <img
              src={soccerTrio}
              alt="Future Stars Academy students playing soccer"
              className="home-hero__image"
            />
          </motion.div>
        </div>
      </section>

      {/* Get Involved strip */}
      <section className="involved-strip">
        <div className="container involved-strip__grid">
          {getInvolvedStrip.map((item) => (
            <Link key={item.title} to={item.to} className="involved-strip__link">
              <item.icon size={28} className="involved-strip__icon" strokeWidth={2} aria-hidden="true" />
              <span>
                <span className="involved-strip__title">{item.title}</span>
                <span className="involved-strip__subtitle">{item.subtitle}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="mission-section">
        <div className="container mission-section__grid">
          <SectionTitle
            eyebrow="Our Mission"
            title="Creating Opportunities. Inspiring Greatness."
            description="Future Stars Academy is a youth development organization committed to providing educational support, mentorship, leadership training, and soccer development for children and communities."
          />
          <div className="mission-section__cards">
            {missionCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Programs strip */}
      <section className="programs-strip">
        <div className="container">
          <SectionTitle eyebrow="What We Do" title="Our Programs" align="center" className="mb-12" />
          <div className="programs-strip__grid">
            {programStrip.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="programs-strip__item"
              >
                <div className="programs-strip__icon">
                  <Link to={item.to}>
                    <item.icon size={24} strokeWidth={2} aria-hidden="true" />
                  </Link>
                </div>
                <p className="programs-strip__label">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats">
        <div className="container home-stats__grid">
          <SectionTitle
            eyebrow="Our Impact"
            title="Together, We Transform Lives"
            light
            description="With the support of our partners, volunteers, and donors, we are creating brighter futures for children and strengthening communities."
          />
          <StatsSection
            stats={[
              { value: 500, suffix: '+', label: 'Youth Impacted' },
              { value: 20, suffix: '+', label: 'Education Programs' },
              { value: 15, suffix: '+', label: 'Soccer Teams' },
              { value: 100, suffix: '+', label: 'Volunteers & Partners' },
            ]}
          />
        </div>
      </section>

      {/* News & Events */}
      <section id="news" className="news-section">
        <div className="container">
          <div className="news-section__grid">
            <div>
              <SectionTitle eyebrow="News & Events" title="Latest From Future Stars Academy" className="mb-10" />
              <div className="news-section__items">
                {newsItems.map((item, i) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="news-card"
                  >
                    <div className="news-card__image">
                      <LazyImage src={item.image} alt={item.title} className="news-card__lazy-image" />
                      <span className="news-card__tag">{item.tag}</span>
                    </div>
                    <div className="news-card__body">
                      <h3 className="news-card__title">{item.title}</h3>
                      <p className="news-card__date">{item.date}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              className="news-sidebar"
            >
              <h3 className="news-sidebar__title">Get Involved Today</h3>
              <p className="news-sidebar__intro">
                There are many ways to support our mission and help transform lives.
              </p>
              <ul className="news-sidebar__list">
                {getInvolvedSidebar.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="news-sidebar__link">
                      <span className="news-sidebar__link-label">
                        <item.icon size={16} className="news-sidebar__link-icon" aria-hidden="true" />
                        {item.label}
                      </span>
                      <ArrowRight size={16} className="news-sidebar__link-arrow" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="home-gallery">
        <div className="container">
          <SectionTitle eyebrow="Gallery" title="Moments From Our Programs" align="center" className="mb-10" />
          <GallerySection images={galleryImages} />
        </div>
      </section>
    </>
  )
}
