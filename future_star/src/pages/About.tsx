import { Helmet } from 'react-helmet-async'
import { GraduationCap, HeartHandshake, Trophy, Users2 } from 'lucide-react'
import { SectionTitle } from '../components/shared/SectionTitle'
import { FeatureCard } from '../components/shared/FeatureCard'
import { StatsSection } from '../components/shared/StatsSection'
import { TeamCard } from '../components/shared/TeamCard'
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../components/shared/SocialIcons'
import teamHuddle from '../assets/team-huddle.jpg'
import './About.css'

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

const About = () => {
  return (
    <section className="about">
      <Helmet>
        <title>About Us | Future Stars Academy</title>
        <meta
          name="description"
          content="Learn about Future Stars Academy's mission, story, impact, and the team behind our education, mentorship, and sports programs."
        />
      </Helmet>

      <div className="about__container">
        {/* Top */}
        <header className="about__hero">
          <span className="about__eyebrow">About Us</span>
          <h1 className="about__title">
            Learn more about our organization Future Stars Academy.
          </h1>
        </header>

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

        {/* Impact */}
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

        {/* Story */}
        <section className="about__story">
          <div className="container about__story-grid">
            <div className="about__story-content">
              <span className="about__section-eyebrow">Our Journey</span>
              <h2>Our Story</h2>
              <p>
                Future Stars Academy began with a simple belief: every child deserves the chance to
                discover what they&apos;re capable of, regardless of the community they grow up in. What
                started as a small group of volunteers running weekend soccer clinics grew into a full
                youth development organization pairing academic support, mentorship, and athletics under
                one roof.
              </p>
              <p>
                Since then, we&apos;ve partnered with local schools, coaches, and families to build a
                program that meets kids where they are &mdash; in the classroom, on the field, and in
                their communities &mdash; and helps them build the confidence and skills to go further.
              </p>
              <p>
                Today, Future Stars Academy continues to grow, one student, one team, one community at a
                time, guided by the same mission that started it all: creating opportunities and
                inspiring greatness.
              </p>
            </div>
            <div className="about__story-image">
              <img src={teamHuddle} alt="Future Stars Academy team and students together" />
            </div>
          </div>
        </section>

        {/* Meet the team */}
        <section className="about__team">
          <div className="container">
            <div className="about__team-header">
              <span className="about__section-eyebrow">Our People</span>
              <h2>Meet our Team</h2>
              <p>This our Team Card</p>
            </div>
            <div className="about__team-grid">
              <TeamCard
                image="/team/john_doe.jpg"
                name="John Doe"
                role="Founder & CEO"
                bio="John is passionate about education and has dedicated his life to helping children reach their full potential."
                socialLinks={[
                  { label: 'Facebook', href: 'https://facebook.com/johndoe', Icon: FacebookIcon },
                  { label: 'Instagram', href: 'https://instagram.com/johndoe', Icon: InstagramIcon },
                  { label: 'Twitter', href: 'https://twitter.com/johndoe', Icon: TwitterIcon },
                  { label: 'YouTube', href: 'https://youtube.com/johndoe', Icon: YoutubeIcon },
                ]}
              />
              <TeamCard
                image="/team/jane_smith.jpg"
                name="Jane Smith"
                role="Program Director"
                bio="Jane has over 10 years of experience in educational program development and is committed to creating impactful learning experiences."
                socialLinks={[
                  { label: 'Facebook', href: 'https://facebook.com/janesmith', Icon: FacebookIcon },
                  { label: 'Instagram', href: 'https://instagram.com/janesmith', Icon: InstagramIcon },
                  { label: 'Twitter', href: 'https://twitter.com/janesmith', Icon: TwitterIcon },
                  { label: 'YouTube', href: 'https://youtube.com/janesmith', Icon: YoutubeIcon },
                ]}
              />
              {/* Add more TeamCard components as needed */}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default About
