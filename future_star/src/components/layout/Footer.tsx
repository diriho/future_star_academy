import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../shared/SocialIcons'

const quickLinks = [
  { label: 'About Us', to: '/#mission' },
  { label: 'Our Mission', to: '/#mission' },
  { label: 'Programs', to: '/programs/education' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'News & Events', to: '/#news' },
]

const resourceLinks = [
  { label: 'Photo Gallery', to: '/#gallery' },
  { label: 'Our Board', to: '/#mission' },
  { label: 'Our Founders', to: '/#mission' },
  { label: 'Contact Us', to: '/#contact' },
  { label: 'Donate', to: '/get-involved/sponsor' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  { label: 'Twitter', href: 'https://twitter.com', Icon: TwitterIcon },
  { label: 'YouTube', href: 'https://youtube.com', Icon: YoutubeIcon },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div id="contact" className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Future Stars Academy" className="h-12 w-12 object-contain" />
            <span className="font-heading text-sm font-extrabold uppercase leading-tight tracking-wide">
              Future Stars
              <br />
              <span className="text-gold">Academy</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Building minds, developing talents, and transforming lives for a brighter future.
          </p>
          <a
            href="mailto:info@fsaliberia.org"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-dark"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            info@fsaliberia.org
          </a>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-gold">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-white/75 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-gold">Resources</h3>
          <ul className="mt-4 space-y-2.5">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-white/75 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-gold">Stay Connected</h3>
          <p className="mt-4 text-sm text-white/70">Follow us on social media for updates, stories, and upcoming events.</p>
          <div className="mt-4 flex gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-navy"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-white/50">
          © {new Date().getFullYear()} Future Stars Academy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
