import { Helmet } from 'react-helmet-async'
import { HeroSection } from '../../components/shared/HeroSection'
import { SectionTitle } from '../../components/shared/SectionTitle'
import { ProgramCard } from '../../components/shared/ProgramCard'
import { CTASection } from '../../components/shared/CTASection'
import { getInvolvedCards } from '../../data/getInvolvedCards'
import teamHuddle from '../../assets/team-huddle.jpg'
import './GetInvolvedLanding.css'

export default function GetInvolvedLanding() {
  return (
    <>
      <Helmet>
        <title>Get Involved | Future Stars Academy</title>
        <meta
          name="description"
          content="Volunteer, sponsor a child, or partner with Future Stars Academy to help transform young lives through education, mentorship, and sports."
        />
      </Helmet>

      <HeroSection
        image={teamHuddle}
        eyebrow="Get Involved"
        title="Be Part of the Future Stars Story"
        subtitle="Whether you have an hour, a skill, or a network — there's a place for you in our mission to build minds, develop talents, and transform lives."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Get Involved' }]}
      />

      <section className="section section--white">
        <div className="container">
          <SectionTitle
            eyebrow="Ways to Help"
            title="Choose How You'd Like to Get Involved"
            align="center"
            className="mb-14"
          />
          <div className="involved-landing__grid">
            {getInvolvedCards.map((card) => (
              <ProgramCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not Sure Where to Start?"
        subtitle="Reach out and our team will help you find the best way to make an impact."
        primary={{ label: 'Contact Us', to: '/contact' }}
        secondary={{ label: 'Donate Now', to: '/get-involved/sponsor' }}
      />
    </>
  )
}
