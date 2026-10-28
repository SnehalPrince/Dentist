// src/pages/Services.tsx
import { motion } from 'framer-motion'
import { SEOHead } from '@components/seo/SEOHead'
import { CTABand } from '@components/sections/CTABand'
import { ServiceCard } from '@components/cards/ServiceCard'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import type { Service } from '@/types'

import dentalImplants from '@content/services/dental-implants.json'
import sameDayCrowns from '@content/services/same-day-crowns.json'
import familyDentistry from '@content/services/family-dentistry.json'
import cosmeticDentistry from '@content/services/cosmetic-dentistry.json'
import generalDentistry from '@content/services/general-cleanings.json'
import preventiveCare from '@content/services/preventive-care.json'

const ALL_SERVICES = [
  dentalImplants, sameDayCrowns, familyDentistry,
  cosmeticDentistry, generalDentistry, preventiveCare,
] as Service[]

const BASE_URL = 'https://pleitezdentalcorp.com'

export default function Services() {
  const reduced = useReducedMotion()

  return (
    <>
      <SEOHead
        title="Dental Services in Chatsworth, CA — Pleitez Dental Corp"
        description="Pleitez Dental Corp offers dental implants (free consultation), same-day crowns, family dentistry, cosmetic dentistry, and preventive care in Chatsworth, CA. (818) 718-8433. Se Habla Español."
        canonical={`${BASE_URL}/services`}
      />

      {/* Page Hero */}
      <section
        aria-labelledby="services-heading"
        style={{ paddingTop: 'calc(80px + var(--space-16))', paddingBottom: 'var(--space-12)', backgroundColor: 'var(--color-neutral-50)' }}
      >
        <Container>
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={getVariants(fadeUp, reduced)}>
              <SectionLabel>WHAT WE OFFER</SectionLabel>
            </motion.div>
            <motion.h1
              id="services-heading"
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-xl)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.025em', maxWidth: '640px' }}
            >
              All the Care Your Smile Needs
            </motion.h1>
            <motion.p
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-xl)', color: 'var(--color-neutral-600)', maxWidth: '600px' }}
            >
              From free dental implant consultations to same-day crowns and comprehensive family care — we provide modern, affordable dentistry for the whole family in Chatsworth, CA.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Services Grid */}
      <section
        aria-label="All services"
        style={{ backgroundColor: 'var(--color-neutral-50)', paddingBottom: 'var(--space-24)' }}
      >
        <Container>
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'var(--space-6)' }}
            className="all-services-grid"
          >
            {ALL_SERVICES.map((service) => (
              <motion.div key={service.slug} variants={getVariants(fadeUp, reduced)}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
          <style>{`
            @media (min-width: 640px) { .all-services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (min-width: 1024px) { .all-services-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          `}</style>
        </Container>
      </section>

      <CTABand eyebrow="FREE CONSULTATION" heading="Start with a Free Implant Consultation" body="Call us or book online — we'll give you an honest, complete assessment at no cost. Se Habla Español." />
    </>
  )
}
