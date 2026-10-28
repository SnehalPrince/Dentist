// src/pages/BookAppointment.tsx
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock } from 'lucide-react'
import { SEOHead } from '@components/seo/SEOHead'
import { AppointmentForm } from '@components/forms/AppointmentForm'
import { OpenNowBadge } from '@components/ui/OpenNowBadge'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, slideInLeft, slideInRight, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import siteConfig from '@content/site.config.json'
import hours from '@content/hours.json'
import type { WeeklyHours } from '@/types'

const BASE_URL = 'https://pleitezdentalcorp.com'
const hoursData = hours as WeeklyHours

export default function BookAppointment() {
  const reduced = useReducedMotion()

  return (
    <>
      <SEOHead
        title="Book an Appointment — Pleitez Dental Corp Chatsworth"
        description="Request an appointment at Pleitez Dental Corp in Chatsworth, CA. Call (818) 718-8433. Free consultations for dental implants available. Se Habla Español."
        canonical={`${BASE_URL}/book-an-appointment`}
      />

      <section
        aria-labelledby="book-heading"
        style={{ paddingTop: 'calc(80px + var(--space-16))', paddingBottom: 'var(--space-24)', backgroundColor: 'var(--color-neutral-50)' }}
      >
        <Container>
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            animate="visible"
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-16)', alignItems: 'start' }}
            className="book-grid"
          >
            {/* Form column */}
            <motion.div variants={getVariants(slideInLeft, reduced)}>
              <SectionLabel>REQUEST AN APPOINTMENT</SectionLabel>
              <h1
                id="book-heading"
                style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-xl)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.025em' }}
              >
                Book Your Visit
              </h1>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-lg)', color: 'var(--color-neutral-600)', marginBottom: 'var(--space-8)', maxWidth: '520px' }}>
                Fill out the form below and we'll confirm your appointment within one business day. For urgent needs, please call us directly.
              </p>
              <AppointmentForm />
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              variants={getVariants(slideInRight, reduced)}
              aria-label="Contact and location information"
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
            >
              {/* Contact card */}
              <div style={{ backgroundColor: 'var(--color-neutral-0)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', boxShadow: 'var(--shadow-card)' }}>
                <h2 style={{ fontSize: 'var(--text-display-sm)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-6)' }}>
                  Contact & Location
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-neutral-700)', textDecoration: 'none', fontWeight: 500 }}
                    aria-label={`Call us at ${siteConfig.phoneDisplay}`}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={18} style={{ color: 'var(--color-brand-500)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>Call us directly</p>
                      <p style={{ fontWeight: 700, color: 'var(--color-neutral-900)', fontSize: 'var(--text-body-lg)' }}>{siteConfig.phoneDisplay}</p>
                    </div>
                  </a>

                  <a
                    href={siteConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', color: 'var(--color-neutral-700)', textDecoration: 'none' }}
                    aria-label="Get directions to Pleitez Dental Corp"
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <MapPin size={18} style={{ color: 'var(--color-brand-500)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>Our location</p>
                      <p style={{ fontWeight: 600, color: 'var(--color-neutral-900)' }}>{siteConfig.address.line1}</p>
                      <p style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--text-body-sm)' }}>{siteConfig.address.line2}</p>
                      <p style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--text-body-sm)' }}>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}</p>
                    </div>
                  </a>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={18} style={{ color: 'var(--color-brand-500)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>Hours</p>
                      <OpenNowBadge hours={hoursData} />
                      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', marginTop: '4px' }}>Opens at 10:00 AM weekdays</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div style={{ backgroundColor: 'var(--color-brand-50)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)' }}>
                <h2 style={{ fontSize: 'var(--text-display-sm)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-4)' }}>
                  What Happens Next?
                </h2>
                <ol style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', listStyle: 'none' }}>
                  {[
                    'We receive your request and confirm availability',
                    'A team member contacts you within 1 business day',
                    'We confirm your appointment details',
                    'You arrive — and we take care of the rest',
                  ].map((step, i) => (
                    <li key={i} style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-body-md)', color: 'var(--color-neutral-700)' }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-brand-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }} aria-hidden="true">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>
                  Note: This form submits an appointment <em>request</em>, not a confirmed booking.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        </Container>
        <style>{`
          @media (min-width: 1024px) {
            .book-grid { grid-template-columns: 3fr 2fr !important; }
          }
        `}</style>
      </section>
    </>
  )
}
