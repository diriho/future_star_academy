import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import './Navbar.css'

const programLinks = [
  { label: 'Education', to: '/programs/education' },
  { label: 'Sports', to: '/programs/sports' },
  { label: 'Mentorship', to: '/programs/mentorship' },
  { label: 'Community Services', to: '/programs/community-services' },
]

const getInvolvedLinks = [
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Volunteer', to: '/get-involved/volunteer' },
  { label: 'Sponsor a Child', to: '/get-involved/sponsor' },
  { label: 'Partner With Us', to: '/get-involved/partner' },
]

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

function NavDropdown({
  label,
  links,
}: {
  label: string
  links: { label: string; to: string }[]
  scrolled: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="navbar__dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="navbar__dropdown-trigger"
      >
        {label}
        <ChevronDown
          size={14}
          className={cn('navbar__dropdown-chevron', open && 'is-open')}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="navbar__dropdown-menu"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="navbar__dropdown-link"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const scrolled = useScrolled()
  const [mobileOpen, setMobileOpen] = useState(false)

  const solid = scrolled || mobileOpen

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('navbar__link', isActive && 'is-active')

  return (
    <header className={cn('navbar', solid && 'navbar--solid')}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo-link" onClick={() => setMobileOpen(false)}>
          <img src="/logo.png" alt="Future Stars Academy" className="navbar__logo-img" />
          <span className="navbar__logo-text">
            Future Stars
            <br />
            <span className="navbar__logo-accent">Academy</span>
          </span>
        </Link>

        <nav className="navbar__nav" aria-label="Primary">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <a href="/#mission" className="navbar__link">
            About Us
          </a>
          <NavDropdown label="Programs" links={programLinks} scrolled={solid} />
          <NavDropdown label="Get Involved" links={getInvolvedLinks} scrolled={solid} />
          <a href="/#news" className="navbar__link">
            News &amp; Events
          </a>
          <a href="/#gallery" className="navbar__link">
            Gallery
          </a>
          <NavLink to="/contact" className={navLinkClass}>
            Contact Us
          </NavLink>
        </nav>

        <div className="navbar__actions">
          <Link to="/get-involved/sponsor" className="navbar__donate">
            <Heart size={16} aria-hidden="true" />
            Donate
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="navbar__toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile"
            className="navbar__mobile-nav"
          >
            <div className="navbar__mobile-inner">
              <Link to="/" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">
                Home
              </Link>
              <a href="/#mission" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">
                About Us
              </a>
              <p className="navbar__mobile-group-label">Programs</p>
              {programLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="navbar__mobile-sublink">
                  {link.label}
                </Link>
              ))}
              <p className="navbar__mobile-group-label">Get Involved</p>
              {getInvolvedLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="navbar__mobile-sublink">
                  {link.label}
                </Link>
              ))}
              <a href="/#news" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">
                News &amp; Events
              </a>
              <a href="/#gallery" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">
                Gallery
              </a>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="navbar__mobile-link">
                Contact Us
              </Link>
              <Link
                to="/get-involved/sponsor"
                onClick={() => setMobileOpen(false)}
                className="navbar__mobile-donate"
              >
                <Heart size={16} aria-hidden="true" />
                Donate
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
