import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Building2,
  Calendar,
  CheckCircle2,
  Church,
  ClipboardList,
  GraduationCap,
  Gift,
  Globe,
  HandCoins,
  Handshake,
  Landmark,
  School,
  Users,
  Users2,
} from 'lucide-react'
import { HeroSection } from '../../components/shared/HeroSection'
import { SectionTitle } from '../../components/shared/SectionTitle'
import { FeatureCard } from '../../components/shared/FeatureCard'
import { CTASection } from '../../components/shared/CTASection'
import { Button } from '../../components/shared/Button'
import { GoogleFormModal } from '../../components/shared/GoogleFormModal'
import { GOOGLE_FORMS } from '../../config/forms'
import player3 from '../../assets/player3.jpeg'
import teamHuddle from '../../assets/team-huddle.jpg'
import './Partner.css'

const whoCanPartner = [
  { icon: Building2, title: 'Businesses', description: 'Local and international businesses supporting youth development.' },
  { icon: Globe, title: 'NGOs', description: 'Non-profits aligned with our mission of education and youth empowerment.' },
  { icon: School, title: 'Schools', description: 'Primary and secondary schools looking to expand student opportunities.' },
  { icon: GraduationCap, title: 'Universities', description: 'Higher education institutions offering mentorship and pathways.' },
  { icon: Church, title: 'Churches', description: 'Faith communities investing in the next generation.' },
  { icon: Landmark, title: 'Foundations', description: 'Grant-making foundations funding education and community programs.' },
  { icon: Users2, title: 'Community Organizations', description: 'Local groups working alongside us to strengthen neighborhoods.' },
]

const partnershipOpportunities = [
  { icon: GraduationCap, title: 'Scholarships', description: 'Fund tuition, books, and school fees for students in need.' },
  { icon: Gift, title: 'Equipment Donations', description: 'Provide soccer gear, school supplies, or technology.' },
  { icon: HandCoins, title: 'Program Sponsorship', description: 'Sponsor an academic, mentorship, or soccer program directly.' },
  { icon: Users, title: 'Volunteer Teams', description: 'Mobilize your staff or members for hands-on service days.' },
  { icon: ClipboardList, title: 'Internship Programs', description: 'Offer real-world experience and career pathways for our youth.' },
  { icon: Calendar, title: 'Events', description: 'Co-host camps, tournaments, workshops, and community events.' },
]

const visionGoals = [
  'Expand across Liberia',
  'Build community learning centers',
  'Develop youth leadership',
  'Increase educational access',
  'Empower underserved communities',
  'Developing professional athletes through soccer.',
]

export default function Partner() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Partner With Us | Future Stars Academy</title>
        <meta
          name="description"
          content="Partner with Future Stars Academy as a business, school, NGO, or community organization to expand educational access and youth development in Liberia."
        />
      </Helmet>

      <HeroSection
        image={player3}
        eyebrow="Get Involved / Partner"
        title="Partner With Future Stars Academy"
        subtitle="Join businesses, schools, and organizations helping us build minds, develop talents, and transform lives across Liberia."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Get Involved', to: '/get-involved' }, { label: 'Partner' }]}
        actions={
          <Button variant="gold" size="lg" icon={<Handshake size={16} />} onClick={() => setFormOpen(true)}>
            Partner With Us
          </Button>
        }
      />

      <section className="section section--white">
        <div className="container">
          <SectionTitle eyebrow="Who Can Partner?" title="Organizations Like Yours" align="center" className="mb-14" />
          <div className="partner-grid partner-grid--4">
            {whoCanPartner.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--offwhite">
        <div className="container">
          <SectionTitle eyebrow="Partnership Opportunities" title="Ways Your Organization Can Help" align="center" className="mb-14" />
          <div className="partner-grid partner-grid--3">
            {partnershipOpportunities.map((item) => (
              <FeatureCard key={item.title} {...item} tone="gold" />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container partner-vision">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="partner-vision__image"
          >
            <img src={teamHuddle} alt="Future Stars Academy team" />
          </motion.div>
          <div>
            <SectionTitle
              eyebrow="Long-Term Vision"
              title="Building a Bigger Future, Together"
              description="Our partnerships fuel a vision that goes far beyond a single program — we're building the infrastructure for generational change across Liberia."
            />
            <ul className="partner-vision__list">
              {visionGoals.map((goal, i) => (
                <motion.li
                  key={goal}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="partner-vision__item"
                >
                  <CheckCircle2 size={20} className="partner-vision__icon" aria-hidden="true" />
                  <span className="partner-vision__label">{goal}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Let's Build Something Lasting"
        subtitle="Tell us about your organization and how you'd like to partner with Future Stars Academy."
        primary={{ label: 'Explore Volunteering', to: '/get-involved/volunteer' }}
        secondary={{ label: 'Sponsor a Child', to: '/get-involved/sponsor' }}
      />

      <GoogleFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title="Partnership Inquiry"
        formUrl={GOOGLE_FORMS.partner}
      />
    </>
  )
}
