// src/components/sections/TrustStrip.tsx
import { motion } from 'framer-motion'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import siteConfig from '@content/site.config.json'

const TRUST_ITEMS = [
  `⭐ ${siteConfig.rating} Google Rating`,
  '🦷 Family Dentistry',
  '😁 Same-Day Crowns',
  '🦷 Dental Implants',
  '🇪🇸 Se Habla Español',
]

export function TrustStrip() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-label="Practice highlights"
      style={{
        backgroundColor: 'var(--color-neutral-0)',
        borderBottom: '1px solid var(--color-neutral-200)',
        paddingBlock: 'var(--space-8)',
      }}
    >
      <Container>
        <motion.div
          variants={getVariants(staggerContainer, reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-6) var(--space-8)',
            alignItems: 'center',
          }}
        >
          {TRUST_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              variants={getVariants(fadeUp, reduced)}
              style={{
                fontSize: 'var(--text-body-lg)',
                fontWeight: 600,
                color: 'var(--color-neutral-700)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
