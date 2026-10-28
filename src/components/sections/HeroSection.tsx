// src/components/sections/HeroSection.tsx
// Main hero: 60/40 text/image split (desktop), stacked mobile
// Per 03_DESIGN.md §11.1 and 04_SITEMAP_AND_CONTENT.md §1 HOME
import { motion } from 'framer-motion'
import { Phone, Star, CheckCircle } from 'lucide-react'
import { Button } from '@components/ui/Button'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { OpenNowBadge } from '@components/ui/OpenNowBadge'
import { staggerContainer, slideInLeft, slideInRight, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import siteConfig from '@content/site.config.json'
import hours from '@content/hours.json'
import type { WeeklyHours } from '@/types'

const hoursData = hours as WeeklyHours

const BULLETS = [
  'Rated 4.9★ on Google — trusted by 100+ patients',
  'Free consultations for dental implants',
  'Same-day crowns — in & out in one visit',
]

export function HeroSection() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        minHeight: '100dvh',
        paddingTop: '80px', // header offset
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-neutral-50)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle decorative gradient blob */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '60vw',
          height: '80vh',
          background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-12)',
            paddingBlock: 'var(--space-16)',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Text Column */}
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            animate="visible"
            style={{ zIndex: 1 }}
          >
            <motion.div variants={getVariants(slideInLeft, reduced)}>
              <SectionLabel>YOUR CHATSWORTH DENTIST</SectionLabel>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={getVariants(slideInLeft, reduced)}
              style={{
                marginTop: 'var(--space-4)',
                fontSize: 'var(--text-display-2xl)',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                color: 'var(--color-neutral-900)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Experienced &amp; Caring{' '}
              <span style={{ color: 'var(--color-brand-500)' }}>Dental Professionals</span>
            </motion.h1>

            <motion.p
              variants={getVariants(slideInLeft, reduced)}
              style={{
                marginTop: 'var(--space-6)',
                fontSize: 'var(--text-body-xl)',
                color: 'var(--color-neutral-600)',
                lineHeight: 'var(--leading-body)',
                maxWidth: '520px',
              }}
            >
              Serving Chatsworth families with compassionate, modern dental care
              and the beautiful smiles they deserve. Se Habla Español.
            </motion.p>

            {/* Bullet points */}
            <motion.ul
              variants={getVariants(staggerContainer, reduced)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                marginTop: 'var(--space-6)',
                listStyle: 'none',
              }}
              aria-label="Practice highlights"
            >
              {BULLETS.map((bullet) => (
                <motion.li
                  key={bullet}
                  variants={getVariants(fadeUp, reduced)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-body-md)',
                    color: 'var(--color-neutral-600)',
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle
                    size={16}
                    style={{ color: 'var(--color-brand-500)', flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA Row */}
            <motion.div
              variants={getVariants(fadeUp, reduced)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-8)',
                flexWrap: 'wrap',
              }}
            >
              <Button variant="primary" size="xl" href="/book-an-appointment" id="hero-book-btn">
                Book an Appointment
              </Button>
              <Button
                variant="ghost"
                size="xl"
                href={`tel:${siteConfig.phone}`}
              >
                <Phone size={18} aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </Button>
            </motion.div>

            {/* Social proof micro-row */}
            <motion.div
              variants={getVariants(fadeUp, reduced)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                marginTop: 'var(--space-6)',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', fontWeight: 500 }}
                aria-label={`${siteConfig.rating} star rating from ${siteConfig.reviewCount}+ Google reviews`}
              >
                <Star size={14} fill="var(--color-accent-star)" color="var(--color-accent-star)" aria-hidden="true" />
                {siteConfig.rating} ({siteConfig.reviewCount}+ reviews)
              </span>
              <span aria-hidden="true" style={{ color: 'var(--color-neutral-200)' }}>|</span>
              <OpenNowBadge hours={hoursData} />
              <span aria-hidden="true" style={{ color: 'var(--color-neutral-200)' }}>|</span>
              <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>
                Canoga Ave, Chatsworth
              </span>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            variants={getVariants(slideInRight, reduced)}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-3xl)',
              overflow: 'hidden',
              aspectRatio: '4/5',
              maxHeight: '600px',
              backgroundColor: 'var(--color-brand-50)',
            }}
            className="hero-image-col"
          >
            <img
              src="/hero.png"
              alt="Dentist smiling with patient in modern dental office"
              width={800}
              height={1000}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
              fetchPriority="high"
              decoding="async"
            />

            {/* Floating rating card */}
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={reduced ? {} : { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.4 } }}
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                backgroundColor: 'var(--color-neutral-0)',
                borderRadius: 'var(--radius-xl)',
                padding: '0.75rem 1rem',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              aria-label="4.6 stars from 50 Google reviews"
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                {siteConfig.rating}
              </span>
              <div>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={12} fill="var(--color-accent-star)" color="var(--color-accent-star)" aria-hidden="true" />
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500)', marginTop: '2px' }}>
                  {siteConfig.reviewCount} reviews on Google
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .hero-image-col {
            max-height: 680px !important;
          }
        }
      `}</style>
    </section>
  )
}
