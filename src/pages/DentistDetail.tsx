// src/pages/DentistDetail.tsx
// Route: /dentists/:slug — Pleitez Dental Corp doctor profile page
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, User } from 'lucide-react'
import { SEOHead } from '@components/seo/SEOHead'
import { JsonLd } from '@components/seo/JsonLd'
import { CTABand } from '@components/sections/CTABand'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { breadcrumbSchema } from '@lib/seo'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import drErik from '@content/dentists/dr-erik-pleitez.json'
import drMartha from '@content/dentists/dr-martha-pleitez.json'
import type { Dentist } from '@/types'

const DENTIST_MAP: Record<string, Dentist> = {
  'dr-erik-pleitez': drErik as Dentist,
  'dr-martha-pleitez': drMartha as Dentist,
}

const BASE_URL = 'https://pleitezdentalcorp.com'

export default function DentistDetail() {
  const { slug } = useParams<{ slug: string }>()
  const reduced = useReducedMotion()

  const dentist = slug ? DENTIST_MAP[slug] : undefined
  if (!dentist) return <Navigate to="/dentists" replace />

  return (
    <>
      <SEOHead
        title={`${dentist.name} — ${dentist.role} in Chatsworth, CA`}
        description={`Meet ${dentist.name}, ${dentist.role} at Pleitez Dental Corp in Chatsworth, CA. Book your appointment today — (818) 718-8433. Se Habla Español.`}
        canonical={`${BASE_URL}/dentists/${dentist.slug}`}
      />
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Our Team', url: `${BASE_URL}/dentists` },
        { name: dentist.name, url: `${BASE_URL}/dentists/${dentist.slug}` },
      ])} />

      <section
        aria-labelledby="dentist-heading"
        style={{ paddingTop: 'calc(80px + var(--space-16))', paddingBottom: 'var(--space-24)', backgroundColor: 'var(--color-neutral-50)' }}
      >
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-8)' }}>
            <ol style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', listStyle: 'none' }}>
              <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><Link to="/dentists" style={{ textDecoration: 'none', color: 'inherit' }}>Our Team</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page" style={{ color: 'var(--color-neutral-700)', fontWeight: 500 }}>{dentist.name}</li>
            </ol>
          </nav>

          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            animate="visible"
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-12)', alignItems: 'start' }}
            className="dentist-detail-grid"
          >
            {/* Photo / Placeholder */}
            <motion.div
              variants={getVariants(fadeUp, reduced)}
              style={{ borderRadius: 'var(--radius-3xl)', overflow: 'hidden', aspectRatio: '3/4', backgroundColor: 'var(--color-neutral-100)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)' }}
            >
              {dentist.image ? (
                <img src={dentist.image} alt={`${dentist.name} — ${dentist.role}`} width={600} height={800} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <>
                  <User size={80} style={{ color: 'var(--color-neutral-300)' }} aria-label="Profile photo coming soon" strokeWidth={1} />
                  <p style={{ color: 'var(--color-neutral-400)', fontSize: 'var(--text-body-sm)', textAlign: 'center', padding: '0 2rem' }}>
                    Photo coming soon
                  </p>
                </>
              )}
            </motion.div>

            {/* Content */}
            <motion.div variants={getVariants(staggerContainer, reduced)}>
              <motion.div variants={getVariants(fadeUp, reduced)}>
                <SectionLabel>MEET YOUR DENTIST</SectionLabel>
              </motion.div>
              <motion.h1
                id="dentist-heading"
                variants={getVariants(fadeUp, reduced)}
                style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-xl)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.025em' }}
              >
                {dentist.name}
              </motion.h1>
              <motion.p
                variants={getVariants(fadeUp, reduced)}
                style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-body-xl)', color: 'var(--color-brand-600)', fontWeight: 600 }}
              >
                {dentist.role}{dentist.credentials ? `, ${dentist.credentials}` : ''}
              </motion.p>

              {/* Bio */}
              {dentist.bio && (
                <motion.p
                  variants={getVariants(fadeUp, reduced)}
                  style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-body-lg)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}
                >
                  {dentist.bio}
                </motion.p>
              )}

              {/* Patient quote */}
              <motion.div
                variants={getVariants(fadeUp, reduced)}
                style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', backgroundColor: 'var(--color-neutral-0)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)', borderLeft: '4px solid var(--color-brand-500)' }}
              >
                <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
                  From Google Reviews
                </p>
                {dentist.slug === 'dr-erik-pleitez' ? (
                  <blockquote style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-body-lg)', color: 'var(--color-neutral-700)', fontStyle: 'italic', lineHeight: 'var(--leading-body)' }}>
                    "Dr. Pleitez checked my mouth, did X-rays and gave me the results… the information Dr. Pleitez gave me was like heaven sent."
                    <footer style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', fontStyle: 'normal' }}>
                      — Verified Patient, Google Review
                    </footer>
                  </blockquote>
                ) : (
                  <blockquote style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-body-lg)', color: 'var(--color-neutral-700)', fontStyle: 'italic', lineHeight: 'var(--leading-body)' }}>
                    "Both Dr. Martha and Dr. Erik are AMAZING. They take care of you top notch and always ask how you're feeling throughout the procedure."
                    <footer style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', fontStyle: 'normal' }}>
                      — Ronald Rodriguez, Google Review
                    </footer>
                  </blockquote>
                )}
              </motion.div>

              <motion.div
                variants={getVariants(fadeUp, reduced)}
                style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}
              >
                <Button variant="primary" size="lg" href="/book-an-appointment">Book an Appointment</Button>
                <Button variant="secondary" size="lg" href="/dentists">← All Dentists</Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
        <style>{`
          @media (min-width: 1024px) {
            .dentist-detail-grid { grid-template-columns: 2fr 3fr !important; }
          }
        `}</style>
      </section>

      <CTABand eyebrow="MEET THE TEAM" heading="Ready to Meet Dr. Erik & Dr. Martha?" body="Book your first visit today — no referral needed. Se Habla Español." />
    </>
  )
}
