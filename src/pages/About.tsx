// src/pages/About.tsx
import { motion } from 'framer-motion'
import { MapPin, Phone, Star } from 'lucide-react'
import { SEOHead } from '@components/seo/SEOHead'
import { CTABand } from '@components/sections/CTABand'
import { TeamPreview } from '@components/sections/TeamPreview'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { staggerContainer, fadeUp, slideInLeft, slideInRight, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import siteConfig from '@content/site.config.json'

const BASE_URL = 'https://pleitezdentalcorp.com'

const PILLARS = [
  { heading: 'Compassion First', body: 'Dr. Martha and Dr. Erik lead every appointment with genuine warmth — checking in throughout procedures, listening to your concerns, and making sure you feel cared for, not just treated.' },
  { heading: 'Honesty as a Standard', body: 'We give you a complete, truthful picture of your dental health before any work begins. Our free implant consultations exist to inform — not to pressure — because that\'s what ethical care looks like.' },
  { heading: 'Skills You Can Trust', body: 'With over 13 years of experience in Chatsworth, our doctors have handled everything from complex implant evaluations to everyday family dentistry — with results patients rave about for years.' },
  { heading: 'Community as Family', body: 'Patients bring their kids, send their neighbors, and stay with us for over a decade. That\'s not marketing — that\'s what happens when a practice genuinely cares about the people it serves.' },
]

export default function About() {
  const reduced = useReducedMotion()

  return (
    <>
      <SEOHead
        title="About Pleitez Dental Corp — Chatsworth, CA"
        description="Learn about Pleitez Dental Corp in Chatsworth, CA — a compassionate, experienced dental team trusted by families for over 13 years. Rated 4.9★ on Google. Se Habla Español."
        canonical={`${BASE_URL}/about`}
      />

      {/* About Hero */}
      <section
        aria-labelledby="about-heading"
        style={{
          paddingTop: 'calc(80px + var(--space-24))',
          paddingBottom: 'var(--space-24)',
          backgroundColor: 'var(--color-neutral-50)',
        }}
      >
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-16)', alignItems: 'center' }} className="about-hero-grid">
            <motion.div
              variants={getVariants(staggerContainer, reduced)}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={getVariants(slideInLeft, reduced)}>
                <SectionLabel>ABOUT US</SectionLabel>
              </motion.div>
              <motion.h1
                id="about-heading"
                variants={getVariants(slideInLeft, reduced)}
                style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-xl)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.025em' }}
              >
                A Practice Built on<br />
                <span style={{ color: 'var(--color-brand-500)' }}>Compassion &amp; Trust</span>
              </motion.h1>
              <motion.p
                variants={getVariants(fadeUp, reduced)}
                style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-body-xl)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-body)', maxWidth: '560px' }}
              >
                Pleitez Dental Corporation is a family-focused dental practice serving the Chatsworth community.
                The practice emphasizes compassionate care, modern technology, and helping every patient achieve
                a healthier, more confident smile. Their mission is to provide high-quality dental treatment in
                a welcoming environment for patients of all ages.
              </motion.p>
              <motion.div
                variants={getVariants(fadeUp, reduced)}
                style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}
              >
                <Button variant="primary" size="lg" href="/book-an-appointment">Book an Appointment</Button>
                <Button variant="secondary" size="lg" href="/contact">Get in Touch</Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={getVariants(slideInRight, reduced)}
              initial="hidden"
              animate="visible"
              style={{ borderRadius: 'var(--radius-3xl)', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: 'var(--color-brand-50)' }}
              className="about-hero-image"
            >
              <img
                src="/images/about.webp"
                alt="Pleitez Dental Corp office — welcoming reception and treatment room"
                width={800}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          </div>
        </Container>
        <style>{`
          @media (min-width: 1024px) {
            .about-hero-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </section>

      {/* What We Stand For — 4 pillars */}
      <section
        aria-labelledby="pillars-heading"
        style={{ backgroundColor: 'var(--color-neutral-0)', paddingBlock: 'var(--space-24)' }}
      >
        <Container>
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={getVariants(fadeUp, reduced)} style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
              <SectionLabel>OUR VALUES</SectionLabel>
              <h2
                id="pillars-heading"
                style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-lg)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}
              >
                What We Stand For
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'var(--space-6)' }} className="pillars-grid">
              {PILLARS.map((pillar) => (
                <motion.div
                  key={pillar.heading}
                  variants={getVariants(fadeUp, reduced)}
                  style={{ padding: 'var(--space-8)', backgroundColor: 'var(--color-neutral-50)', borderRadius: 'var(--radius-2xl)', borderLeft: '4px solid var(--color-brand-500)' }}
                >
                  <h3 style={{ fontSize: 'var(--text-display-sm)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>{pillar.heading}</h3>
                  <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-body)' }}>{pillar.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
        <style>{`
          @media (min-width: 768px) { .pillars-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
      </section>

      {/* Location Feature */}
      <section
        aria-labelledby="location-heading"
        style={{ backgroundColor: 'var(--color-accent-warm)', paddingBlock: 'var(--space-24)' }}
      >
        <Container>
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-12)', alignItems: 'center' }}
            className="location-grid"
          >
            <motion.div variants={getVariants(fadeUp, reduced)}>
              <SectionLabel>FIND US</SectionLabel>
              <h2
                id="location-heading"
                style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-lg)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}
              >
                Conveniently Located on Canoga Ave
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <MapPin size={20} style={{ color: 'var(--color-brand-500)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--color-neutral-900)' }}>{siteConfig.address.line1}</p>
                    <p style={{ color: 'var(--color-neutral-600)' }}>{siteConfig.address.line2}</p>
                    <p style={{ color: 'var(--color-neutral-600)' }}>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Phone size={20} style={{ color: 'var(--color-brand-500)', flexShrink: 0 }} aria-hidden="true" />
                  <a href={`tel:${siteConfig.phone}`} style={{ fontWeight: 600, color: 'var(--color-neutral-900)', textDecoration: 'none' }}>{siteConfig.phoneDisplay}</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Star size={20} fill="var(--color-accent-star)" color="var(--color-accent-star)" aria-hidden="true" />
                  <span style={{ color: 'var(--color-neutral-700)' }} aria-label={`${siteConfig.rating} stars from ${siteConfig.reviewCount}+ Google reviews`}>
                    {siteConfig.rating}★ · {siteConfig.reviewCount}+ Google reviews
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
                <Button variant="primary" size="md" href={siteConfig.googleMapsUrl} external>Get Directions</Button>
                <Button variant="secondary" size="md" href={`tel:${siteConfig.phone}`}>Call Now</Button>
              </div>
            </motion.div>
            <motion.div
              variants={getVariants(fadeUp, reduced)}
              style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: 'var(--color-neutral-100)' }}
            >
              <iframe
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pleitez Dental Corp location on Google Maps"
              />
            </motion.div>
          </motion.div>
        </Container>
        <style>{`
          @media (min-width: 1024px) { .location-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>

      <TeamPreview />
      <CTABand eyebrow="GET STARTED" heading="Ready to Book Your Visit?" body="Join our growing community of Chatsworth patients who trust us with their smiles." />
    </>
  )
}
