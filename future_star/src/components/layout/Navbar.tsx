import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'

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
  scrolled,
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
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 py-1 text-sm font-semibold uppercase tracking-wide transition-colors',
          scrolled ? 'text-navy hover:text-gold-dark' : 'text-white hover:text-gold',
        )}
      >
        {label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full mt-3 w-56 overflow-hidden rounded-lg bg-white py-2 shadow-xl ring-1 ring-navy/10"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-offwhite hover:text-gold-dark"
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
    cn(
      'relative py-1 text-sm font-semibold uppercase tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-gold after:transition-all',
      solid ? 'text-navy hover:text-gold-dark' : 'text-white hover:text-gold',
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
    )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        solid ? 'bg-white shadow-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src="/logo.png" alt="Future Stars Academy" className="h-11 w-11 object-contain" />
          <span
            className={cn(
              'font-heading text-sm font-extrabold uppercase leading-tight tracking-wide',
              solid ? 'text-navy' : 'text-white',
            )}
          >
            Future Stars
            <br />
            <span className="text-gold">Academy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <a
            href="/#mission"
            className={cn(
              'py-1 text-sm font-semibold uppercase tracking-wide transition-colors',
              solid ? 'text-navy hover:text-gold-dark' : 'text-white hover:text-gold',
            )}
          >
            About Us
          </a>
          <NavDropdown label="Programs" links={programLinks} scrolled={solid} />
          <NavDropdown label="Get Involved" links={getInvolvedLinks} scrolled={solid} />
          <a
            href="/#news"
            className={cn(
              'py-1 text-sm font-semibold uppercase tracking-wide transition-colors',
              solid ? 'text-navy hover:text-gold-dark' : 'text-white hover:text-gold',
            )}
          >
            News &amp; Events
          </a>
          <a
            href="/#gallery"
            className={cn(
              'py-1 text-sm font-semibold uppercase tracking-wide transition-colors',
              solid ? 'text-navy hover:text-gold-dark' : 'text-white hover:text-gold',
            )}
          >
            Gallery
          </a>
          <a
            href="/#contact"
            className={cn(
              'py-1 text-sm font-semibold uppercase tracking-wide transition-colors',
              solid ? 'text-navy hover:text-gold-dark' : 'text-white hover:text-gold',
            )}
          >
            Contact Us
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/get-involved/sponsor"
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-md md:inline-flex"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Donate
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={cn('rounded-md p-2 lg:hidden', solid ? 'text-navy' : 'text-white')}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="overflow-hidden bg-white shadow-lg lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <Link to="/" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-semibold uppercase text-navy">
                Home
              </Link>
              <a href="/#mission" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-semibold uppercase text-navy">
                About Us
              </a>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-navy/40">Programs</p>
              {programLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="py-2 pl-2 text-sm font-medium text-navy">
                  {link.label}
                </Link>
              ))}
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-navy/40">Get Involved</p>
              {getInvolvedLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="py-2 pl-2 text-sm font-medium text-navy">
                  {link.label}
                </Link>
              ))}
              <a href="/#news" onClick={() => setMobileOpen(false)} className="mt-2 py-2.5 text-sm font-semibold uppercase text-navy">
                News &amp; Events
              </a>
              <a href="/#gallery" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-semibold uppercase text-navy">
                Gallery
              </a>
              <a href="/#contact" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-semibold uppercase text-navy">
                Contact Us
              </a>
              <Link
                to="/get-involved/sponsor"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                Donate
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
