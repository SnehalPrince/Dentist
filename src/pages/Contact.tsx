// src/pages/Contact.tsx
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Star, Mail } from 'lucide-react'
import { SEOHead } from '@components/seo/SEOHead'
import { ContactForm } from '@components/forms/ContactForm'
import { OpenNowBadge } from '@components/ui/OpenNowBadge'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { staggerContainer, slideInLeft, slideInRight, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import siteConfig from '@content/site.config.json'
import hours from '@content/hours.json'
import { getDisplayHours } from '@lib/hours'
import type { WeeklyHours } from '@/types'

const BASE_URL = 'https://pleitezdentalcorp.com'
const hoursData = hours as WeeklyHours

export default function Contact() {
  const reduced = useReducedMotion()
  const displayHours = getDisplayHours(hoursData)

  return (
    <>
      <SEOHead
        title="Contact Pleitez Dental Corp — Chatsworth, CA"
        description="Contact Pleitez Dental Corp in Chatsworth, CA. Call (818) 718-8433 or send us a message. Located at 10244 Canoga Ave Suite #2, Chatsworth, CA 91311. Se Habla Español."
        canonical={`${BASE_URL}/contact`}
      />

      <section
        aria-labelledby="contact-heading"
        style={{ paddingTop: 'calc(80px + var(--space-16))', paddingBottom: 'var(--space-24)', backgroundColor: 'var(--color-neutral-50)' }}
      >
        <Container>
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            animate="visible"
            style={{ marginBottom: 'var(--space-16)' }}
          >
            <motion.div variants={getVariants(slideInLeft, reduced)}>
              <SectionLabel>GET IN TOUCH</SectionLabel>
            </motion.div>
            <motion.h1
              id="contact-heading"
              variants={getVariants(slideInLeft, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-xl)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.025em' }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              variants={getVariants(slideInLeft, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-xl)', color: 'var(--color-neutral-600)', maxWidth: '520px' }}
            >
              Questions, new patient inquiries, or just want to say hello? We'd love to hear from you. Se Habla Español.
            </motion.p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-16)', alignItems: 'start' }} className="contact-grid">
            {/* Contact info + Map */}
            <motion.div
              variants={getVariants(slideInLeft, reduced)}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}
            >
              {/* NAP block */}
              <div style={{ backgroundColor: 'var(--color-neutral-0)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                  <a href={`tel:${siteConfig.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', textDecoration: 'none', color: 'inherit' }} aria-label={`Call ${siteConfig.phoneDisplay}`}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={20} style={{ color: 'var(--color-brand-500)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>Phone</p>
                      <p style={{ fontWeight: 700, color: 'var(--color-neutral-900)', fontSize: 'var(--text-body-xl)' }}>{siteConfig.phoneDisplay}</p>
                    </div>
                  </a>
                  <a href={`mailto:${siteConfig.email}`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', textDecoration: 'none', color: 'inherit' }} aria-label={`Email ${siteConfig.email}`}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={20} style={{ color: 'var(--color-brand-500)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>Email</p>
                      <p style={{ fontWeight: 600, color: 'var(--color-neutral-900)', fontSize: 'var(--text-body-md)' }}>{siteConfig.email}</p>
                    </div>
                  </a>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <MapPin size={20} style={{ color: 'var(--color-brand-500)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>Address</p>
                      <address style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--color-neutral-900)' }}>
                        {siteConfig.address.line1}<br />
                        {siteConfig.address.line2}<br />
                        {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}
                      </address>
                      <Button variant="ghost" size="sm" href={siteConfig.googleMapsUrl} external style={{ marginTop: '0.5rem', paddingLeft: 0 }}>
                        Get Directions →
                      </Button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={20} style={{ color: 'var(--color-brand-500)' }} aria-hidden="true" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-2)' }}>Hours</p>
                      <OpenNowBadge hours={hoursData} />
                      <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {displayHours.map(({ day, display, verified }) => (
                          <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-body-sm)', gap: 'var(--space-4)' }}>
                            <span style={{ color: 'var(--color-neutral-500)' }}>{day}</span>
                            <span style={{ color: verified ? 'var(--color-neutral-700)' : 'var(--color-neutral-400)', fontStyle: verified ? 'normal' : 'italic' }}>{display}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Star size={20} fill="var(--color-accent-star)" color="var(--color-accent-star)" aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>Google Rating</p>
                      <p style={{ fontWeight: 700, color: 'var(--color-neutral-900)' }} aria-label={`${siteConfig.rating} stars from ${siteConfig.reviewCount}+ Google reviews`}>
                        {siteConfig.rating}★ · {siteConfig.reviewCount}+ reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: 'var(--color-neutral-100)' }}>
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pleitez Dental Corp on Google Maps"
                />
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              variants={getVariants(slideInRight, reduced)}
              initial="hidden"
              animate="visible"
              style={{ backgroundColor: 'var(--color-neutral-0)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', boxShadow: 'var(--shadow-card)' }}
            >
              <h2 style={{ fontSize: 'var(--text-display-sm)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-6)' }}>
                Send Us a Message
              </h2>
              <ContactForm />
            </motion.div>
          </div>
        </Container>
        <style>{`
          @media (min-width: 1024px) { .contact-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>
    </>
  )
}
