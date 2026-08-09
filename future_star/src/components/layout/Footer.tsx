import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../shared/SocialIcons'
import './Footer.css'

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Mission', to: '/#mission' },
  { label: 'Programs', to: '/programs/education' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'News & Events', to: '/#news' },
]

const resourceLinks = [
  { label: 'Photo Gallery', to: '/#gallery' },
  { label: 'Our Team', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Donate', to: '/get-involved/sponsor' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/futurestarsacademyofficial/', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/FutureStarsAcademyOfficial', Icon: FacebookIcon },
  { label: 'Twitter', href: 'https://twitter.com', Icon: TwitterIcon },
  { label: 'YouTube', href: 'https://youtube.com', Icon: YoutubeIcon },
]

export function Footer() {
  return (
    <footer className="footer">
      <div id="contact" className="container footer__grid">
        {/*Footer section */}
        <div>
          <Link to="/" className="footer__logo-link">
            <img src="/logo.png" alt="Future Stars Academy" className="footer__logo-img" />
            <span className="footer__logo-text">
              Future Stars
              <br />
              <span className="footer__logo-accent">Academy</span>
            </span>
          </Link>
          <p className="footer__tagline">
            Building minds, developing talents, and transforming lives for a brighter future.
          </p>
          <a href="mailto:info@fsaliberia.org" className="footer__email">
            <Mail size={16} aria-hidden="true" />
            info@fsaliberia.org
          </a>
        </div>

        {/*Quick links section */}
        <div>
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__list">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="footer__list-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*Resources section */}
        <div>
          <h3 className="footer__heading">Resources</h3>
          <ul className="footer__list">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="footer__list-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*Social Media section */}
        <div>
          <h3 className="footer__heading">Stay Connected</h3>
          <p className="footer__blurb">Follow us on social media for updates, stories, and upcoming events.</p>
          <div className="footer__social">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer__social-link"
              >
                <Icon width={16} height={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/*Copyright section */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Future Stars Academy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
