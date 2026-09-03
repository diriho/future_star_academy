import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { HeroSection } from '../../components/shared/HeroSection'
import { SectionTitle } from '../../components/shared/SectionTitle'
import { FeatureCard } from '../../components/shared/FeatureCard'
import { GallerySection } from '../../components/shared/GallerySection'
import { StatsSection } from '../../components/shared/StatsSection'
import { FAQAccordion } from '../../components/shared/FAQAccordion'
import { CTASection } from '../../components/shared/CTASection'
import { ProgramCard } from '../../components/shared/ProgramCard'
import { getRelatedPrograms, type Program } from '../../data/programs'
import './ProgramTemplate.css'

interface ProgramTemplateProps {
  program: Program
}

export function ProgramTemplate({ program }: ProgramTemplateProps) {
  const related = getRelatedPrograms(program.slug)

  return (
    <>
      <Helmet>
        <title>{program.title} | Future Stars Academy</title>
        <meta name="description" content={program.subtitle} />
      </Helmet>

      <HeroSection
        image={program.heroImage}
        eyebrow={program.eyebrow}
        title={program.title}
        subtitle={program.subtitle}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Programs' }, { label: program.navLabel }]}
        primaryCta={{ label: 'Get Involved', to: '/get-involved' }}
        secondaryCta={{ label: 'Donate', to: '/get-involved/sponsor' }}
      />

      {/* Mission & Objectives */}
      <section className="section section--white">
        <div className="container program-objectives">
          <SectionTitle eyebrow="Our Mission" title="What We're Working Toward" description={program.mission} />
          <div>
            <h3 className="program-objectives__heading">Objectives</h3>
            <ul className="program-objectives__list">
              {program.objectives.map((objective, i) => (
                <motion.li
                  key={objective}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="program-objectives__item"
                >
                  <CheckCircle2 size={20} className="program-objectives__icon" aria-hidden="true" />
                  <span className="program-objectives__text">{objective}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="section section--offwhite">
        <div className="container">
          <SectionTitle
            eyebrow="Program Overview"
            title="How This Program Works"
            description={program.overview}
            align="center"
            className="mb-14"
          />
          <div className="program-features-grid">
            {program.features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section section--white">
        <div className="container">
          <SectionTitle eyebrow="Photo Gallery" title="See the Program in Action" align="center" className="mb-10" />
          <GallerySection images={program.gallery} />
        </div>
      </section>

      {/* Stats */}
      <section className="section section--sm section--navy">
        <div className="container">
          <SectionTitle eyebrow="Our Impact" title="The Difference This Program Makes" light align="center" className="mb-12" />
          <StatsSection stats={program.stats} />
        </div>
      </section>

      {/* Success Stories */}
      {/**
       <section className="section section--offwhite">
        <div className="container">
          <SectionTitle eyebrow="Success Stories" title="Real Impact, Real Growth" align="center" className="mb-14" />
          <div className="program-stories-grid">
            {program.successStories.map((story, i) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="program-story-card"
              >
                <Quote size={32} className="program-story-card__icon" aria-hidden="true" />
                <h3 className="program-story-card__title">{story.title}</h3>
                <p className="program-story-card__text">{story.story}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      * 
       */}

      {/* FAQ */}
      <section className="section section--white">
        <div className="container container--narrow">
          <SectionTitle eyebrow="FAQ" title="Common Questions" align="center" className="mb-10 mx-auto" />
          <FAQAccordion items={program.faqs} />
        </div>
      </section>

      <CTASection
        title={`Ready to Support ${program.navLabel}?`}
        subtitle="Volunteer your time, sponsor a child, or partner with us to help this program grow."
        primary={{ label: 'Get Involved', to: '/get-involved', icon: <ArrowRight size={16} /> }}
        secondary={{ label: 'Donate Now', to: '/get-involved/sponsor' }}
      />

      {/* Related Programs */}
      <section className="section section--offwhite">
        <div className="container">
          <SectionTitle eyebrow="Explore More" title="Related Programs" align="center" className="mb-14" />
          <div className="program-related-grid">
            {related.map((p) => (
              <ProgramCard key={p.slug} image={p.heroImage} icon={p.icon} title={p.navLabel} description={p.subtitle} to={p.path} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
