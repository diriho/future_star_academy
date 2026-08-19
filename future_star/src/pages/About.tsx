import { Helmet } from 'react-helmet-async'
import { GraduationCap, HeartHandshake, Trophy, Users2 } from 'lucide-react'
import { SectionTitle } from '../components/shared/SectionTitle'
import { FeatureCard } from '../components/shared/FeatureCard'
import { StatsSection } from '../components/shared/StatsSection'
import { TeamCard } from '../components/shared/TeamCard'
import { FacebookIcon, InstagramIcon, YoutubeIcon, LinkedInIcon } from '../components/shared/SocialIcons'
import teamHuddle from '../assets/team-huddle.jpg'
import './About.css'
import charlesGongar from '../assets/team/charles_gongar.jpeg'
import alexanderZean from '../assets/team/alexander_zean.jpeg'

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
              eyebrow="Our Mission "
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
                Future Stars Academy started with a simple reality: talent is everywhere, but opportunity isn’t.
              </p>

              <p>
                Growing up playing soccer, our founder Charles T. Gongar Jr. loved the game, 
                but lacked the structured coaching, academic support, and mentorship needed to take his potential 
                further. After playing collegiate soccer in the US and spending years working in human services and 
                youth coaching, he realized young athletes needed more than just a pitch—they needed a full support system.
              </p>

              <p>
                Together with a team of like-minded coaches and educators, FSA was built to bridge that gap. 
                We combine structured soccer training with education, leadership development, and mentorship for 
                youth in the U.S. and Liberia. We aren't just training better players; we're giving the next generation 
                the resources, guidance, and opportunities we wished we had.

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
            </div>
            <div className="about__team-grid">
              {/*CEO card */}
              <TeamCard
                image= {charlesGongar}
                name="Mr. Charles T. Gongar, Jr."
                role="Co-Founder & CEO"
                bio="Charles is a former collegiate soccer player with a background in human services and coaching, he empowers youth through education, sports, and mentorship."
                socialLinks={[
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/charles-t-gongar-jr-6157b1325/', Icon: LinkedInIcon },
                  { label: 'Instagram', href: '', Icon: InstagramIcon },
                  { label: 'YouTube', href: 'https://youtube.com/johndoe', Icon: YoutubeIcon },
                ]}
              />

              {/** President card */}
              <TeamCard
                image={alexanderZean}
                name="Mr. Alexander Zean Soe"
                role="President & Co-Founder"
                bio="Alexander is dedicated to helping young people discover their potential, build character, develop their talents, and become leaders both on and off the field."
                socialLinks={[
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/charles-t-gongar-jr-6157b1325/', Icon: LinkedInIcon },
                  { label: 'Facebook', href: 'https://facebook.com/janesmith', Icon: FacebookIcon },
                  { label: 'Instagram', href: 'https://instagram.com/janesmith', Icon: InstagramIcon },
                ]}
              />
              
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default About
