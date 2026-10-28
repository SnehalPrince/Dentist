// src/components/sections/TeamPreview.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { TeamCard } from '@components/cards/TeamCard'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import drErik from '@content/dentists/dr-erik-pleitez.json'
import drMartha from '@content/dentists/dr-martha-pleitez.json'
import type { Dentist } from '@/types'

const TEAM = [drErik, drMartha] as Dentist[]

export function TeamPreview() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="team-preview-heading"
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
              <SectionLabel>MEET THE DOCTORS</SectionLabel>
              <h2
                id="team-preview-heading"
                style={{
                  marginTop: 'var(--space-4)',
                  fontSize: 'var(--text-display-lg)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--color-neutral-900)',
                  letterSpacing: '-0.02em',
                }}
              >
                Dr. Erik &amp; Dr. Martha Pleitez
              </h2>
              <p
                style={{
                  marginTop: 'var(--space-3)',
                  fontSize: 'var(--text-body-lg)',
                  color: 'var(--color-neutral-600)',
                  maxWidth: '480px',
                }}
              >
                Trusted by Chatsworth families for over 13 years — known for their kindness, skill, and genuine dedication to every patient's health.
              </p>
            </div>
            <Link
              to="/dentists"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontWeight: 600,
                color: 'var(--color-brand-600)',
                textDecoration: 'none',
                fontSize: 'var(--text-body-md)',
                whiteSpace: 'nowrap',
              }}
            >
              Meet the Team <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Team grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: 'var(--space-8)',
              maxWidth: '640px',
              marginInline: 'auto',
            }}
            className="team-grid"
          >
            {TEAM.map((dentist) => (
              <motion.div key={dentist.slug} variants={getVariants(fadeUp, reduced)}>
                <TeamCard dentist={dentist} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      <style>{`
        @media (min-width: 640px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 760px !important;
          }
        }
      `}</style>
    </section>
  )
}
