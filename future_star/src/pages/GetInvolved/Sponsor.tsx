import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'
import { Backpack, BookOpen, Goal, HeartHandshake, Shirt, Utensils } from 'lucide-react'
import { HeroSection } from '../../components/shared/HeroSection'
import { SectionTitle } from '../../components/shared/SectionTitle'
import { DonationWidget } from './DonationWidget'
import classroom1 from '../../assets/classroom-1.jpg'
import soccerTrio from '../../assets/soccer-trio.jpg'
import './Sponsor.css'

const wholeChildBenefits = [
  { icon: Backpack, label: 'School supplies' },
  { icon: Shirt, label: 'Uniforms' },
  { icon: Utensils, label: 'Meals' },
  { icon: BookOpen, label: 'Academic support' },
]

const onFieldBenefits = [
  { icon: Goal, label: 'Soccer equipment' },
  { icon: HeartHandshake, label: 'Mentorship' },
  { icon: BookOpen, label: 'Leadership development' },
]

export default function Sponsor() {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const status = searchParams.get('donation')
    if (status === 'success') {
      toast.success('Thank you! Your donation was received.')
      setSearchParams({}, { replace: true })
    } else if (status === 'cancelled') {
      toast('Your donation was cancelled — no charge was made.', { icon: 'ℹ️' })
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, setSearchParams])

  return (
    <>
      <Helmet>
        <title>Sponsor a Child | Future Stars Academy</title>
        <meta
          name="description"
          content="Sponsor a child at Future Stars Academy with a one-time or monthly gift covering school supplies, uniforms, meals, and mentorship."
        />
      </Helmet>

      <HeroSection
        image={classroom1}
        eyebrow="Get Involved / Sponsor"
        title={
          <>
            Sponsor a Child.
            <br />
            <span className="hero__title-accent">Transform a Future.</span>
          </>
        }
        subtitle="Your sponsorship gives a child access to education, mentorship, and soccer development — and the chance to become a future leader."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Get Involved', to: '/get-involved' }, { label: 'Sponsor' }]}
      />

      <section className="section section--white">
        <div className="container sponsor-split">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="sponsor-split__image"
          >
            <img src={classroom1} alt="Student at Future Stars Academy" />
          </motion.div>
          <div>
            <SectionTitle
              eyebrow="Whole-Child Support"
              title="Every Sponsorship Covers the Essentials"
              description="A sponsorship isn't just tuition — it's everything a child needs to show up ready to learn every single day."
            />
            <div className="sponsor-benefits">
              {wholeChildBenefits.map((item) => (
                <div key={item.label} className="sponsor-benefit">
                  <span className="sponsor-benefit__icon sponsor-benefit__icon--navy">
                    <item.icon size={20} aria-hidden="true" />
                  </span>
                  <span className="sponsor-benefit__label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--offwhite">
        <div className="container sponsor-split">
          <div className="sponsor-split__image--order-2">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="sponsor-split__image"
            >
              <img src={soccerTrio} alt="Future Stars Academy soccer players" />
            </motion.div>
          </div>
          <div className="sponsor-split__content--order-1">
            <SectionTitle
              eyebrow="Growth On and Off the Field"
              title="Building Character Through Sport and Leadership"
              description="Sponsorship also fuels the soccer development and leadership programs that build teamwork, confidence, and discipline."
            />
            <div className="sponsor-benefits sponsor-benefits--3col">
              {onFieldBenefits.map((item) => (
                <div key={item.label} className="sponsor-benefit">
                  <span className="sponsor-benefit__icon sponsor-benefit__icon--gold">
                    <item.icon size={20} aria-hidden="true" />
                  </span>
                  <span className="sponsor-benefit__label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionTitle
            eyebrow="Make a Gift"
            title="Choose Your Level of Support"
            description="Give once or become a monthly sponsor — every gift directly supports a child's education, uniforms, meals, and mentorship."
            light
            align="center"
            className="mb-12"
          />
          <DonationWidget />
        </div>
      </section>
    </>
  )
}
