// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom'
import { Phone, MapPin, ExternalLink, Star } from 'lucide-react'
import { OpenNowBadge } from '@components/ui/OpenNowBadge'
import { getDisplayHours } from '@lib/hours'
import siteConfig from '@content/site.config.json'
import hours from '@content/hours.json'
import type { WeeklyHours } from '@/types'
import '@styles/components/footer.css'

const hoursData = hours as WeeklyHours

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Team', to: '/dentists' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const SERVICE_LINKS = [
  { label: 'Dental Implants', to: '/services/dental-implants' },
  { label: 'Same-Day Crowns', to: '/services/same-day-crowns' },
  { label: 'Family Dentistry', to: '/services/family-dentistry' },
  { label: 'Cosmetic Dentistry', to: '/services/cosmetic-dentistry' },
  { label: 'General Dentistry', to: '/services/general-cleanings' },
  { label: 'Preventive Care', to: '/services/preventive-care' },
]

export function Footer() {
  const displayHours = getDisplayHours(hoursData)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__main">

          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Pleitez Dental Corp — Home">
              Pleitez <span className="brand">Dental Corp.</span>
            </Link>
            <p className="footer__tagline">
              Caring for Chatsworth smiles with compassion, expertise, and beautiful results.
            </p>

            {/* Rating */}
            <div className="footer__rating">
              <Star size={14} fill="var(--color-accent-star)" color="var(--color-accent-star)" aria-hidden="true" />
              <span aria-label={`Rated ${siteConfig.rating} out of 5 based on ${siteConfig.reviewCount} reviews on Google`}>
                {siteConfig.rating} · {siteConfig.reviewCount} reviews on Google
              </span>
            </div>

            {/* Contact */}
            <div className="footer__contact" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href={`tel:${siteConfig.phone}`} aria-label={`Call us at ${siteConfig.phoneDisplay}`}>
                <Phone size={14} aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
            <a href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Pleitez Dental Corp (opens in Google Maps)"
              >
                <MapPin size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
                <span>
                  {siteConfig.address.line1}<br />
                  {siteConfig.address.line2}<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}
                </span>
              </a>
            </div>
          </div>

          {/* Navigate Column */}
          <nav aria-label="Footer navigation">
            <p className="footer__col-label">Navigate</p>
            <div className="footer__nav-links">
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="footer__nav-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Services Column */}
          <nav aria-label="Services navigation">
            <p className="footer__col-label">Services</p>
            <div className="footer__nav-links">
              {SERVICE_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="footer__nav-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Hours & Contact Column */}
          <div>
            <p className="footer__col-label">Visit Us</p>

            <OpenNowBadge hours={hoursData} />

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {displayHours.map(({ day, display, verified }) => (
                <div key={day} className="footer__hours-row">
                  <span className="day">{day}</span>
                  <span className={verified ? 'time' : 'unverified'}>{display}</span>
                </div>
              ))}
            </div>

            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__directions"
              aria-label="Get directions to Pleitez Dental Corp (opens in Google Maps)"
            >
              Get Directions <ExternalLink size={12} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Pleitez Dental Corp. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/contact" className="footer__bottom-link">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
