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
  { icon: BookOpen, label: 'Academic Enrichment & Tutoring' },
  { icon: Trophy, label: 'Soccer Training & Talent Development' },
  { icon: Handshake, label: 'Leadership & Character Building' },
  { icon: Users, label: 'Mentorship & Life Skills' },
  { icon: Megaphone, label: 'Community Outreach & Youth Empowerment' },
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
      <section className="relative flex min-h-[720px] items-center overflow-hidden">
        <img src={soccerTrio} alt="Future Stars Academy soccer players" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl font-extrabold uppercase leading-tight text-white md:text-6xl">
              Building Minds.
              <br />
              Developing Talents.
              <br />
              <span className="text-gold">Transforming Lives.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Empowering children and young people through education, mentorship, leadership, and sports
              to become future leaders on and off the field.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/get-involved" variant="gold" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Get Involved
              </Button>
              <Button to="/get-involved/sponsor" variant="outline" size="lg" icon={<Heart className="h-4 w-4" />}>
                Donate Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get Involved strip */}
      <section className="bg-gold">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-6 md:grid-cols-4 md:px-10">
          {getInvolvedStrip.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <item.icon className="h-7 w-7 flex-shrink-0 text-navy" strokeWidth={2} aria-hidden="true" />
              <span>
                <span className="block font-heading text-sm font-extrabold uppercase tracking-wide text-navy">
                  {item.title}
                </span>
                <span className="block text-xs font-semibold text-navy/70">{item.subtitle}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <SectionTitle
            eyebrow="Our Mission"
            title="Creating Opportunities. Inspiring Greatness."
            description="Future Stars Academy is a youth development organization committed to providing educational support, mentorship, leadership training, and soccer development for children and communities."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {missionCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Programs strip */}
      <section className="bg-offwhite py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="What We Do" title="Our Programs" align="center" className="mb-12" />
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {programStrip.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold">
                  <item.icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy/80">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
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
      <section id="news" className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <SectionTitle eyebrow="News & Events" title="Latest From Future Stars Academy" className="mb-10" />
              <div className="grid gap-6 sm:grid-cols-3">
                {newsItems.map((item, i) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(11,35,70,0.08)] ring-1 ring-navy/5 transition-shadow hover:shadow-[0_12px_28px_rgba(11,35,70,0.16)]"
                  >
                    <div className="relative h-40">
                      <LazyImage src={item.image} alt={item.title} className="h-full w-full" />
                      <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                        {item.tag}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-sm font-bold leading-snug text-navy">{item.title}</h3>
                      <p className="mt-2 text-xs font-medium text-navy/50">{item.date}</p>
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
              className="rounded-xl bg-navy p-7 text-white"
            >
              <h3 className="font-heading text-lg font-bold text-gold">Get Involved Today</h3>
              <p className="mt-2 text-sm text-white/75">
                There are many ways to support our mission and help transform lives.
              </p>
              <ul className="mt-6 space-y-1">
                {getInvolvedSidebar.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="group flex items-center justify-between gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-white/10"
                    >
                      <span className="flex items-center gap-3 text-sm font-semibold">
                        <item.icon className="h-4 w-4 text-gold" aria-hidden="true" />
                        {item.label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-gold" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-24 bg-offwhite py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="Gallery" title="Moments From Our Programs" align="center" className="mb-10" />
          <GallerySection images={galleryImages} />
        </div>
      </section>
    </>
  )
}
