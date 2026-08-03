import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react'
import { HeroSection } from '../../components/shared/HeroSection'
import { SectionTitle } from '../../components/shared/SectionTitle'
import { FeatureCard } from '../../components/shared/FeatureCard'
import { GallerySection } from '../../components/shared/GallerySection'
import { StatsSection } from '../../components/shared/StatsSection'
import { FAQAccordion } from '../../components/shared/FAQAccordion'
import { CTASection } from '../../components/shared/CTASection'
import { ProgramCard } from '../../components/shared/ProgramCard'
import { getRelatedPrograms, type Program } from '../../data/programs'

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
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-2">
          <SectionTitle eyebrow="Our Mission" title="What We're Working Toward" description={program.mission} />
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-gold-dark">Objectives</h3>
            <ul className="mt-4 space-y-4">
              {program.objectives.map((objective, i) => (
                <motion.li
                  key={objective}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-dark" aria-hidden="true" />
                  <span className="text-navy/80">{objective}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="bg-offwhite py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle
            eyebrow="Program Overview"
            title="How This Program Works"
            description={program.overview}
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {program.features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="Photo Gallery" title="See the Program in Action" align="center" className="mb-10" />
          <GallerySection images={program.gallery} />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="Our Impact" title="The Difference This Program Makes" light align="center" className="mb-12" />
          <StatsSection stats={program.stats} />
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-offwhite py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="Success Stories" title="Real Impact, Real Growth" align="center" className="mb-14" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {program.successStories.map((story, i) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl bg-white p-8 shadow-[0_2px_10px_rgba(11,35,70,0.08)] ring-1 ring-navy/5"
              >
                <Quote className="h-8 w-8 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-bold text-navy">{story.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">{story.story}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <SectionTitle eyebrow="FAQ" title="Common Questions" align="center" className="mb-10 mx-auto" />
          <FAQAccordion items={program.faqs} />
        </div>
      </section>

      <CTASection
        title={`Ready to Support ${program.navLabel}?`}
        subtitle="Volunteer your time, sponsor a child, or partner with us to help this program grow."
        primary={{ label: 'Get Involved', to: '/get-involved', icon: <ArrowRight className="h-4 w-4" /> }}
        secondary={{ label: 'Donate Now', to: '/get-involved/sponsor' }}
      />

      {/* Related Programs */}
      <section className="bg-offwhite py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="Explore More" title="Related Programs" align="center" className="mb-14" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {related.map((p) => (
              <ProgramCard key={p.slug} image={p.heroImage} icon={p.icon} title={p.navLabel} description={p.subtitle} to={p.path} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
