// src/pages/NotFound.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Phone } from 'lucide-react'
import { SEOHead } from '@components/seo/SEOHead'
import { Button } from '@components/ui/Button'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, scaleIn, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import siteConfig from '@content/site.config.json'

const BASE_URL = 'https://pleitezdentalcorp.com'

export default function NotFound() {
  const reduced = useReducedMotion()

  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Pleitez Dental Corp's homepage."
        canonical={`${BASE_URL}/404`}
        noIndex
      />

      <section
        aria-labelledby="notfound-heading"
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-neutral-50)',
          paddingBlock: 'var(--space-24)',
          paddingTop: 'calc(80px + var(--space-24))',
        }}
      >
        <Container>
          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            animate="visible"
            style={{ textAlign: 'center', maxWidth: '560px', marginInline: 'auto' }}
          >
            {/* Tooth icon */}
            <motion.div
              variants={getVariants(scaleIn, reduced)}
              style={{ fontSize: '6rem', lineHeight: 1, marginBottom: 'var(--space-6)', userSelect: 'none' }}
              aria-hidden="true"
            >
              🦷
            </motion.div>

            <motion.p
              variants={getVariants(fadeUp, reduced)}
              style={{ fontSize: 'var(--text-label-lg)', color: 'var(--color-brand-500)', letterSpacing: '0.12em', fontWeight: 500 }}
            >
              404 — PAGE NOT FOUND
            </motion.p>

            <motion.h1
              id="notfound-heading"
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-lg)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}
            >
              This page lost a tooth
            </motion.h1>

            <motion.p
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-xl)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-body)' }}
            >
              The page you're looking for doesn't exist or may have moved.
              Let us help you find what you need.
            </motion.p>

            <motion.div
              variants={getVariants(fadeUp, reduced)}
              style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-8)' }}
            >
              <Button variant="primary" size="lg" href="/" id="notfound-home-btn">
                <Home size={18} aria-hidden="true" /> Return to Home
              </Button>
              <Button variant="ghost" size="lg" href={`tel:${siteConfig.phone}`}>
                <Phone size={18} aria-hidden="true" /> {siteConfig.phoneDisplay}
              </Button>
            </motion.div>

            <motion.div
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-12)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              {[
                { label: 'Services', href: '/services' },
                { label: 'Book an Appointment', href: '/book-an-appointment' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{ fontSize: 'var(--text-body-md)', color: 'var(--color-brand-600)', textDecoration: 'none', fontWeight: 500 }}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
