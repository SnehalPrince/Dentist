// src/components/sections/CTABand.tsx
// Dark CTA band repeating on multiple pages per 03_DESIGN.md §11.4
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { Button } from '@components/ui/Button'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import siteConfig from '@content/site.config.json'

interface CTABandProps {
  eyebrow?: string
  heading?: string
  body?: string
}

export function CTABand({
  eyebrow = 'START TODAY',
  heading = 'Get the Smile You Deserve Today!',
  body = 'Call us or book online — we\'ll take care of the rest.',
}: CTABandProps) {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="cta-band-heading"
      style={{
        backgroundColor: 'var(--color-neutral-950)',
        paddingBlock: 'var(--space-24)',
        color: 'var(--color-neutral-0)',
      }}
    >
      <Container>
        <motion.div
          variants={getVariants(staggerContainer, reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ textAlign: 'center', maxWidth: '720px', marginInline: 'auto' }}
        >
          <motion.div variants={getVariants(fadeUp, reduced)}>
            <SectionLabel light>
              {eyebrow}
            </SectionLabel>
          </motion.div>

          <motion.h2
            id="cta-band-heading"
            variants={getVariants(fadeUp, reduced)}
            style={{
              marginTop: 'var(--space-4)',
              fontSize: 'var(--text-display-lg)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--color-neutral-0)',
              letterSpacing: '-0.02em',
            }}
          >
            {heading}
          </motion.h2>

          <motion.p
            variants={getVariants(fadeUp, reduced)}
            style={{
              marginTop: 'var(--space-4)',
              fontSize: 'var(--text-body-xl)',
              color: 'var(--color-neutral-400)',
              lineHeight: 'var(--leading-body)',
              maxWidth: '560px',
              marginInline: 'auto',
            }}
          >
            {body}
          </motion.p>

          <motion.div
            variants={getVariants(fadeUp, reduced)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: 'var(--space-8)',
            }}
          >
            <Button variant="dark" size="lg" href="/book-an-appointment">
              Book an Appointment
            </Button>
            <Button variant="dark-ghost" size="lg" href={`tel:${siteConfig.phone}`}>
              <Phone size={18} aria-hidden="true" />
              Call {siteConfig.phoneDisplay}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
