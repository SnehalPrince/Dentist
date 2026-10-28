// src/components/sections/BenefitsSection.tsx
// 4-up benefit cards — "Why Topanga Dental Care" per 04_SITEMAP_AND_CONTENT.md
import { motion } from 'framer-motion'
import { Heart, Shield, Clock, Users } from 'lucide-react'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const BENEFITS = [
  {
    icon: Heart,
    title: 'Genuinely Compassionate Care',
    body: 'Patients describe Dr. Martha and Dr. Erik as warm, patient, and truly invested in your well-being — checking in throughout every procedure to make sure you\'re comfortable.',
  },
  {
    icon: Shield,
    title: 'Honest, Ethical Dentistry',
    body: 'We give you a complete, truthful assessment of your dental health — no upselling, no surprises. Our free implant consultations are designed to inform, not pressure.',
  },
  {
    icon: Users,
    title: 'Family-Friendly & Bilingual',
    body: 'We welcome patients of all ages and proudly serve our community in both English and Spanish. Se Habla Español.',
  },
  {
    icon: Clock,
    title: 'Modern Technology, Same-Day Results',
    body: 'From same-day crowns to advanced implant care, we use modern technology so you get high-quality results faster — without multiple appointments.',
  },
]

export function BenefitsSection() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="benefits-heading"
      style={{
        backgroundColor: 'var(--color-neutral-50)',
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
            style={{ maxWidth: '640px' }}
          >
            <SectionLabel>WHY CHOOSE US</SectionLabel>
            <h2
              id="benefits-heading"
              style={{
                marginTop: 'var(--space-4)',
                fontSize: 'var(--text-display-lg)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--color-neutral-900)',
                letterSpacing: '-0.02em',
              }}
            >
              Dental Care That Truly Feels Different
            </h2>
            <p
              style={{
                marginTop: 'var(--space-4)',
                fontSize: 'var(--text-body-xl)',
                color: 'var(--color-neutral-600)',
                lineHeight: 'var(--leading-body)',
              }}
            >
              With over 13 years serving the Chatsworth community, Pleitez Dental Corp has built its practice on compassion, honesty, and results that speak for themselves.
            </p>
          </motion.div>

          {/* 4-up grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: 'var(--space-6)',
              marginTop: 'var(--space-12)',
            }}
            className="benefits-grid"
          >
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  variants={getVariants(fadeUp, reduced)}
                  style={{
                    backgroundColor: 'var(--color-neutral-0)',
                    borderRadius: 'var(--radius-2xl)',
                    padding: 'var(--space-8)',
                    boxShadow: 'var(--shadow-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)',
                  }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: 'var(--color-brand-50)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size={24}
                      style={{ color: 'var(--color-brand-500)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 'var(--text-display-sm)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: 'var(--color-neutral-900)',
                      }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      style={{
                        marginTop: 'var(--space-2)',
                        fontSize: 'var(--text-body-md)',
                        color: 'var(--color-neutral-600)',
                        lineHeight: 'var(--leading-body)',
                      }}
                    >
                      {benefit.body}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>

      <style>{`
        @media (min-width: 640px) {
          .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .benefits-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
