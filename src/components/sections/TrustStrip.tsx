// src/components/sections/TrustStrip.tsx
// 4 animated stats across the top of the page per 03_DESIGN.md §11.1
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@components/ui/AnimatedCounter'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import siteConfig from '@content/site.config.json'

const STATS = [
  {
    value: siteConfig.rating,
    suffix: '',
    prefix: '',
    label: `${siteConfig.rating} out of 5 average rating`,
    caption: 'Google Rating',
    display: `${siteConfig.rating}★`,
  },
  {
    value: siteConfig.reviewCount,
    suffix: '+',
    prefix: '',
    label: `Over ${siteConfig.reviewCount} happy patients`,
    caption: 'Happy Patients',
    display: `${siteConfig.reviewCount}+`,
  },
  {
    value: 13,
    suffix: '+',
    prefix: '',
    label: '13 or more years serving Chatsworth',
    caption: 'Years Serving Chatsworth',
    display: '13+',
  },
  {
    value: 6,
    suffix: '',
    prefix: '',
    label: '6 dental services offered',
    caption: 'Services Offered',
    display: '6',
  },
]

export function TrustStrip() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-label="Practice at a glance"
      style={{
        backgroundColor: 'var(--color-neutral-0)',
        borderBottom: '1px solid var(--color-neutral-200)',
        paddingBlock: 'var(--space-12)',
      }}
    >
      <Container>
        <motion.div
          variants={getVariants(staggerContainer, reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-8)',
          }}
          className="trust-strip-grid"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.caption}
              variants={getVariants(fadeUp, reduced)}
              style={{ textAlign: 'center' }}
            >
              <div
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-brand-500)',
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  label={stat.label}
                />
              </div>
              <p
                style={{
                  marginTop: 'var(--space-2)',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-neutral-500)',
                  fontWeight: 500,
                }}
              >
                {stat.caption}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      <style>{`
        @media (min-width: 768px) {
          .trust-strip-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
