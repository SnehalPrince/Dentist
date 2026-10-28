// src/components/sections/TestimonialsSection.tsx
// Only the 3 VERIFIED reviews from testimonials.json
import { motion } from 'framer-motion'
import { TestimonialCard } from '@components/cards/TestimonialCard'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import testimonials from '@content/testimonials.json'
import siteConfig from '@content/site.config.json'
import type { Testimonial } from '@/types'

const VERIFIED_TESTIMONIALS = testimonials as Testimonial[]

export function TestimonialsSection() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="testimonials-heading"
      role="region"
      aria-label="Patient Reviews"
      style={{
        backgroundColor: 'var(--color-neutral-0)',
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
          {/* Header */}
          <motion.div
            variants={getVariants(fadeUp, reduced)}
            style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
          >
            <SectionLabel>WHAT PATIENTS SAY</SectionLabel>
            <h2
              id="testimonials-heading"
              style={{
                marginTop: 'var(--space-4)',
                fontSize: 'var(--text-display-lg)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--color-neutral-900)',
                letterSpacing: '-0.02em',
              }}
            >
              Trusted by Our Chatsworth Community
            </h2>
            <p
              style={{
                marginTop: 'var(--space-3)',
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-neutral-600)',
                maxWidth: '540px',
                marginInline: 'auto',
              }}
            >
              {siteConfig.rating}★ · Trusted by {siteConfig.reviewCount}+ happy patients on Google
            </p>
          </motion.div>

          {/* Testimonials grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: 'var(--space-6)',
            }}
            className="testimonials-grid"
          >
            {VERIFIED_TESTIMONIALS.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={getVariants(fadeUp, reduced)}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      <style>{`
        @media (min-width: 768px) {
          .testimonials-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
