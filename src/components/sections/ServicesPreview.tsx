// src/components/sections/ServicesPreview.tsx
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ServiceCard } from '@components/cards/ServiceCard'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import type { Service } from '@/types'

// Import 4 featured Pleitez services
import dentalImplants from '@content/services/dental-implants.json'
import sameDayCrowns from '@content/services/same-day-crowns.json'
import cosmeticDentistry from '@content/services/cosmetic-dentistry.json'
import familyDentistry from '@content/services/family-dentistry.json'

const FEATURED_SERVICES = [dentalImplants, sameDayCrowns, cosmeticDentistry, familyDentistry] as Service[]

export function ServicesPreview() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="services-preview-heading"
      style={{
        backgroundColor: 'var(--color-accent-warm)',
        paddingBlock: 'var(--space-24)',
      }}
    >
      <Container>
        <motion.div
          variants={getVariants(staggerContainer, reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Header row */}
          <motion.div
            variants={getVariants(fadeUp, reduced)}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 'var(--space-6)',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-12)',
            }}
          >
            <div>
              <SectionLabel>WHAT WE OFFER</SectionLabel>
              <h2
                id="services-preview-heading"
                style={{
                  marginTop: 'var(--space-4)',
                  fontSize: 'var(--text-display-lg)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--color-neutral-900)',
                  letterSpacing: '-0.02em',
                }}
              >
                Our Core Services
              </h2>
              <p
                style={{
                  marginTop: 'var(--space-3)',
                  fontSize: 'var(--text-body-lg)',
                  color: 'var(--color-neutral-600)',
                  maxWidth: '540px',
                }}
              >
                From free implant consultations to same-day crowns and family dentistry — we cover everything your smile needs.
              </p>
            </div>

            <Link
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontWeight: 600,
                color: 'var(--color-brand-600)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                fontSize: 'var(--text-body-md)',
              }}
            >
              View All Services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Service cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: 'var(--space-6)',
            }}
            className="services-grid"
          >
            {FEATURED_SERVICES.map((service) => (
              <motion.div key={service.slug} variants={getVariants(fadeUp, reduced)}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      <style>{`
        @media (min-width: 640px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1280px) {
          .services-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
