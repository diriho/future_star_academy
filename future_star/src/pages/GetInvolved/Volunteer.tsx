import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { HandHeart } from 'lucide-react'
import { HeroSection } from '../../components/shared/HeroSection'
import { SectionTitle } from '../../components/shared/SectionTitle'
import { FeatureCard } from '../../components/shared/FeatureCard'
import { StatsSection } from '../../components/shared/StatsSection'
import { CTASection } from '../../components/shared/CTASection'
import { Button } from '../../components/shared/Button'
import { GoogleFormModal } from '../../components/shared/GoogleFormModal'
import { volunteerOpportunities } from '../../data/volunteerOpportunities'
import { GOOGLE_FORMS } from '../../config/forms'
import teamHuddle from '../../assets/team-huddle.jpg'

export default function Volunteer() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Volunteer | Future Stars Academy</title>
        <meta
          name="description"
          content="Volunteer with Future Stars Academy as a tutor, coach, mentor, or event volunteer and help shape the next generation."
        />
      </Helmet>

      <HeroSection
        image={teamHuddle}
        eyebrow="Get Involved / Volunteer"
        title="Volunteer With Future Stars Academy"
        subtitle="Help shape the next generation through education, mentorship, sports, and community service."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Get Involved', to: '/get-involved' }, { label: 'Volunteer' }]}
        actions={
          <Button variant="gold" size="lg" icon={<HandHeart className="h-4 w-4" />} onClick={() => setFormOpen(true)}>
            Become a Volunteer
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle
            eyebrow="Opportunities"
            title="Where You Can Make a Difference"
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {volunteerOpportunities.map((opportunity) => (
              <FeatureCard key={opportunity.title} {...opportunity} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="Our Impact" title="Volunteers Like You Make This Possible" light align="center" className="mb-12" />
          <StatsSection
            stats={[
              { value: 500, suffix: '+', label: 'Youth Served' },
              { value: 100, suffix: '+', label: 'Volunteers' },
              { value: 20, suffix: '+', label: 'Education Programs' },
              { value: 15, suffix: '+', label: 'Soccer Teams' },
            ]}
          />
        </div>
      </section>

      <CTASection
        title="Not Ready to Volunteer Yet?"
        subtitle="There are plenty of other ways to support Future Stars Academy — from sponsoring a child to partnering with your organization."
        primary={{ label: 'See All Ways to Help', to: '/get-involved' }}
        secondary={{ label: 'Sponsor a Child', to: '/get-involved/sponsor' }}
      />

      <GoogleFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title="Volunteer Application"
        formUrl={GOOGLE_FORMS.volunteer}
      />
    </>
  )
}
