// src/components/sections/ProcessSection.tsx
// Dark 3-step process with GSAP SVG connector line per 03_DESIGN.md §11.3
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Smile } from 'lucide-react'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { animateProcessLine } from '@lib/gsap'

const STEPS = [
  {
    number: '01',
    icon: Calendar,
    title: 'Book Your Visit',
    body: 'Call us or book online in seconds — we\'ll confirm your preferred time and send you everything you need to know.',
  },
  {
    number: '02',
    icon: User,
    title: 'Meet Your Dentist',
    body: 'Every visit starts with a real conversation. We listen first, then develop a personalized care plan that fits your goals and comfort level.',
  },
  {
    number: '03',
    icon: Smile,
    title: 'Smile with Confidence',
    body: 'Leave with a healthier, better-looking smile — and a team that\'s always here for your follow-up care.',
  },
]

export function ProcessSection() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    animateProcessLine('#process-connector', sectionRef.current)
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-heading"
      style={{
        backgroundColor: 'var(--color-neutral-950)',
        paddingBlock: 'var(--space-24)',
        color: 'var(--color-neutral-0)',
        overflow: 'hidden',
        position: 'relative',
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
            style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}
          >
            <SectionLabel light>HOW IT WORKS</SectionLabel>
            <h2
              id="process-heading"
              style={{
                marginTop: 'var(--space-4)',
                fontSize: 'var(--text-display-lg)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--color-neutral-0)',
                letterSpacing: '-0.02em',
              }}
            >
              Your Path to a Healthier Smile
            </h2>
          </motion.div>

          {/* Steps */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: 'var(--space-6)',
              position: 'relative',
            }}
            className="process-grid"
          >
            {/* GSAP dashed connector (visible on desktop) */}
            <svg
              id="process-connector"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                right: '0',
                width: '100%',
                height: '2px',
                display: 'none',
                pointerEvents: 'none',
              }}
              className="process-connector-svg"
            >
              <line
                x1="16%"
                y1="1"
                x2="84%"
                y2="1"
                stroke="var(--color-brand-500)"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            </svg>

            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  variants={getVariants(fadeUp, reduced)}
                  style={{
                    backgroundColor: 'var(--color-neutral-900)',
                    borderRadius: 'var(--radius-2xl)',
                    padding: 'var(--space-8)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span
                      style={{
                        fontSize: 'var(--text-label-lg)',
                        fontWeight: 700,
                        color: 'var(--color-brand-500)',
                        letterSpacing: '0.05em',
                      }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'rgba(20,184,166,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} style={{ color: 'var(--color-brand-400)' }} aria-hidden="true" />
                    </div>
                  </div>
                  <h3
                    style={{
                      fontSize: 'var(--text-display-sm)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: 'var(--color-neutral-0)',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-body-md)',
                      color: 'var(--color-neutral-400)',
                      lineHeight: 'var(--leading-body)',
                    }}
                  >
                    {step.body}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>

      <style>{`
        @media (min-width: 768px) {
          .process-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .process-connector-svg { display: block !important; }
        }
      `}</style>
    </section>
  )
}
