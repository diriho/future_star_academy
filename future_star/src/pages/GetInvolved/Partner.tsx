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
import classroom2 from '../../assets/classroom-2.jpg'
import teamHuddle from '../../assets/team-huddle.jpg'

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
        image={classroom2}
        eyebrow="Get Involved / Partner"
        title="Partner With Future Stars Academy"
        subtitle="Join businesses, schools, and organizations helping us build minds, develop talents, and transform lives across Liberia."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Get Involved', to: '/get-involved' }, { label: 'Partner' }]}
        actions={
          <Button variant="gold" size="lg" icon={<Handshake className="h-4 w-4" />} onClick={() => setFormOpen(true)}>
            Partner With Us
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="Who Can Partner?" title="Organizations Like Yours" align="center" className="mb-14" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoCanPartner.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="Partnership Opportunities" title="Ways Your Organization Can Help" align="center" className="mb-14" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partnershipOpportunities.map((item) => (
              <FeatureCard key={item.title} {...item} tone="gold" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl"
          >
            <img src={teamHuddle} alt="Future Stars Academy team" className="h-full w-full object-cover" />
          </motion.div>
          <div>
            <SectionTitle
              eyebrow="Long-Term Vision"
              title="Building a Bigger Future, Together"
              description="Our partnerships fuel a vision that goes far beyond a single program — we're building the infrastructure for generational change across Liberia."
            />
            <ul className="mt-8 space-y-4">
              {visionGoals.map((goal, i) => (
                <motion.li
                  key={goal}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-gold-dark" aria-hidden="true" />
                  <span className="font-medium text-navy">{goal}</span>
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
