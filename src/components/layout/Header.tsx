// src/components/layout/Header.tsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { Button } from '@components/ui/Button'
import { MobileNav } from './MobileNav'
import { useScrollProgress } from '@hooks/useScrollProgress'
import siteConfig from '@content/site.config.json'
import '@styles/components/header.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Team', to: '/dentists' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  const scrolled = useScrollProgress(60)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : 'header--transparent'}`}>
        <div className="container">
          <div className="header__inner">
            {/* Logo */}
            <Link to="/" className="header__logo" aria-label="Pleitez Dental Corp — Home">
              Pleitez{' '}
              <span className="brand">Dental Corp.</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="header__nav" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* CTA Group */}
            <div className="header__cta">
              <a
                href={`tel:${siteConfig.phone}`}
                className="header__phone"
                aria-label={`Call Pleitez Dental Corp at ${siteConfig.phoneDisplay}`}
              >
                <Phone size={16} aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
              <Button
                variant="primary"
                size="sm"
                href="/book-an-appointment"
                id="header-book-btn"
              >
                Book Appointment
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="header__hamburger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={NAV_LINKS}
      />
    </>
  )
}
