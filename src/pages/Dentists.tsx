// src/pages/Dentists.tsx
import { motion } from 'framer-motion'
import { SEOHead } from '@components/seo/SEOHead'
import { CTABand } from '@components/sections/CTABand'
import { TeamCard } from '@components/cards/TeamCard'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import drErik from '@content/dentists/dr-erik-pleitez.json'
import drMartha from '@content/dentists/dr-martha-pleitez.json'
import type { Dentist } from '@/types'

const BASE_URL = 'https://pleitezdentalcorp.com'
const TEAM = [drErik, drMartha] as Dentist[]

export default function Dentists() {
  const reduced = useReducedMotion()

  return (
    <>
      <SEOHead
        title="Meet the Doctors — Dr. Erik & Dr. Martha Pleitez"
        description="Meet the dental team at Pleitez Dental Corp in Chatsworth, CA — Dr. Erik and Dr. Martha Pleitez, known for compassion, skill, and 13+ years of exceptional patient care. (818) 718-8433."
        canonical={`${BASE_URL}/dentists`}
      />

      <section
        aria-labelledby="dentists-heading"
        style={{ paddingTop: 'calc(80px + var(--space-16))', paddingBottom: 'var(--space-24)', backgroundColor: 'var(--color-neutral-50)' }}
      >
        <Container>
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            animate="visible"
            style={{ marginBottom: 'var(--space-16)' }}
          >
            <motion.div variants={getVariants(fadeUp, reduced)}>
              <SectionLabel>MEET THE DOCTORS</SectionLabel>
            </motion.div>
            <motion.h1
              id="dentists-heading"
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-xl)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.025em' }}
            >
              Dr. Erik &amp; Dr. Martha Pleitez
            </motion.h1>
            <motion.p
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-xl)', color: 'var(--color-neutral-600)', maxWidth: '540px' }}
            >
              A husband-and-wife dental team with over 13 years serving the Chatsworth community. Patients describe them as skilled, compassionate, and genuinely invested in making every visit exceptional.
            </motion.p>
          </motion.div>

          {/* Team grid */}
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'var(--space-8)', maxWidth: '760px' }}
            className="dentists-grid"
          >
            {TEAM.map((dentist) => (
              <motion.div key={dentist.slug} variants={getVariants(fadeUp, reduced)}>
                <TeamCard dentist={dentist} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
        <style>{`
          @media (min-width: 640px) { .dentists-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: 760px !important; } }
        `}</style>
      </section>

      <CTABand eyebrow="BOOK NOW" heading="Book Your First Visit Today" body="Our team is ready to welcome you — no referral needed. Se Habla Español." />
    </>
  )
}
