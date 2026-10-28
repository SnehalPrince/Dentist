// src/pages/ServiceDetail.tsx
// Dynamic route: /services/:slug
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, CheckCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { SEOHead } from '@components/seo/SEOHead'
import { JsonLd } from '@components/seo/JsonLd'
import { CTABand } from '@components/sections/CTABand'
import { ServiceCard } from '@components/cards/ServiceCard'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { breadcrumbSchema, faqPageSchema, medicalProcedureSchema } from '@lib/seo'
import type { Service } from '@/types'
import siteConfig from '@content/site.config.json'

// Import all Pleitez services
import generalDentistry from '@content/services/general-cleanings.json'
import dentalImplants from '@content/services/dental-implants.json'
import sameDayCrowns from '@content/services/same-day-crowns.json'
import familyDentistry from '@content/services/family-dentistry.json'
import cosmeticDentistry from '@content/services/cosmetic-dentistry.json'
import preventiveCare from '@content/services/preventive-care.json'

const SERVICE_MAP: Record<string, Service> = {
  'general-cleanings': generalDentistry as Service,
  'dental-implants': dentalImplants as Service,
  'same-day-crowns': sameDayCrowns as Service,
  'family-dentistry': familyDentistry as Service,
  'cosmetic-dentistry': cosmeticDentistry as Service,
  'preventive-care': preventiveCare as Service,
}

const BASE_URL = 'https://pleitezdentalcorp.com'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const reduced = useReducedMotion()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const service = slug ? SERVICE_MAP[slug] : undefined
  if (!service) return <Navigate to="/services" replace />

  const related = service.relatedSlugs
    .map((s) => SERVICE_MAP[s])
    .filter(Boolean)
    .slice(0, 3)

  return (
    <>
      <SEOHead
        title={`${service.name} in Chatsworth, CA — Pleitez Dental Corp`}
        description={`${service.teaser} Pleitez Dental Corp, Chatsworth. Call ${siteConfig.phoneDisplay}.`}
        canonical={`${BASE_URL}/services/${service.slug}`}
      />
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Services', url: `${BASE_URL}/services` },
        { name: service.name, url: `${BASE_URL}/services/${service.slug}` },
      ])} />
      <JsonLd schema={medicalProcedureSchema({ name: service.name, description: service.overview[0] })} />
      {service.faqs.length > 0 && <JsonLd schema={faqPageSchema(service.faqs)} />}

      {/* Hero */}
      <section
        aria-labelledby="service-detail-heading"
        style={{ paddingTop: 'calc(80px + var(--space-16))', paddingBottom: 'var(--space-16)', backgroundColor: 'var(--color-neutral-50)' }}
      >
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-6)' }}>
            <ol style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', listStyle: 'none' }}>
              <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><Link to="/services" style={{ textDecoration: 'none', color: 'inherit' }}>Services</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page" style={{ color: 'var(--color-neutral-700)', fontWeight: 500 }}>{service.name}</li>
            </ol>
          </nav>

          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            animate="visible"
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-12)', alignItems: 'center' }}
            className="service-hero-grid"
          >
            <div>
              <motion.div variants={getVariants(fadeUp, reduced)}>
                <SectionLabel>{service.category}</SectionLabel>
              </motion.div>
              <motion.h1
                id="service-detail-heading"
                variants={getVariants(fadeUp, reduced)}
                style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-xl)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.025em' }}
              >
                {service.name}
              </motion.h1>
              <motion.p
                variants={getVariants(fadeUp, reduced)}
                style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-xl)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-body)', maxWidth: '540px' }}
              >
                {service.teaser}
              </motion.p>
              <motion.div
                variants={getVariants(fadeUp, reduced)}
                style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}
              >
                <Button variant="primary" size="lg" href="/book-an-appointment">Book an Appointment</Button>
                <Button variant="ghost" size="lg" href={`tel:${siteConfig.phone}`}>
                  <Phone size={18} aria-hidden="true" /> {siteConfig.phoneDisplay}
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={getVariants(fadeUp, reduced)}
              style={{ borderRadius: 'var(--radius-3xl)', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: 'var(--color-brand-50)' }}
            >
              <img
                src={service.image}
                alt={`${service.name} — Pleitez Dental Corp Chatsworth`}
                width={800}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </motion.div>
          </motion.div>
          <style>{`
            @media (min-width: 1024px) { .service-hero-grid { grid-template-columns: 1fr 1fr !important; } }
          `}</style>
        </Container>
      </section>

      {/* Overview */}
      <section aria-labelledby="overview-heading" style={{ backgroundColor: 'var(--color-neutral-0)', paddingBlock: 'var(--space-24)' }}>
        <Container narrow>
          <motion.div variants={getVariants(staggerContainer, reduced)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.h2 id="overview-heading" variants={getVariants(fadeUp, reduced)}
              style={{ fontSize: 'var(--text-display-lg)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>
              About This Service
            </motion.h2>
            {service.overview.map((para, i) => (
              <motion.p key={i} variants={getVariants(fadeUp, reduced)}
                style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-lg)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                {para}
              </motion.p>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* What to Expect — 3 steps */}
      <section aria-labelledby="steps-heading" style={{ backgroundColor: 'var(--color-neutral-50)', paddingBlock: 'var(--space-24)' }}>
        <Container>
          <motion.div variants={getVariants(staggerContainer, reduced)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.h2 id="steps-heading" variants={getVariants(fadeUp, reduced)}
              style={{ fontSize: 'var(--text-display-lg)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-12)' }}>
              What to Expect
            </motion.h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {service.whatToExpect.map((step) => (
                <motion.div key={step.step} variants={getVariants(fadeUp, reduced)}
                  style={{ display: 'flex', gap: 'var(--space-6)', backgroundColor: 'var(--color-neutral-0)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', boxShadow: 'var(--shadow-card)', alignItems: 'flex-start' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-brand-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'var(--font-display)', flexShrink: 0 }}>
                    {step.step}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'var(--text-display-sm)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>{step.title}</h3>
                    <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-body)' }}>{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Accordion */}
      {service.faqs.length > 0 && (
        <section aria-labelledby="faq-heading" style={{ backgroundColor: 'var(--color-neutral-0)', paddingBlock: 'var(--space-24)' }}>
          <Container narrow>
            <motion.div variants={getVariants(staggerContainer, reduced)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.h2 id="faq-heading" variants={getVariants(fadeUp, reduced)}
                style={{ fontSize: 'var(--text-display-lg)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-8)' }}>
                Frequently Asked Questions
              </motion.h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {service.faqs.map((faq, i) => (
                  <motion.div key={i} variants={getVariants(fadeUp, reduced)}
                    style={{ border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                    <button
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: '100%', textAlign: 'left', padding: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-body-lg)', color: 'var(--color-neutral-900)' }}
                    >
                      {faq.question}
                      <CheckCircle
                        size={20}
                        aria-hidden="true"
                        style={{ color: 'var(--color-brand-500)', flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                      />
                    </button>
                    <div
                      id={`faq-answer-${i}`}
                      aria-hidden={openFaq !== i}
                      style={{ display: openFaq === i ? 'block' : 'none', padding: '0 var(--space-6) var(--space-6)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-body)', fontSize: 'var(--text-body-md)' }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Related Services */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" style={{ backgroundColor: 'var(--color-accent-warm)', paddingBlock: 'var(--space-24)' }}>
          <Container>
            <h2 id="related-heading" style={{ fontSize: 'var(--text-display-md)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-8)' }}>
              Related Services
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'var(--space-6)' }} className="related-grid">
              {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          </Container>
          <style>{`
            @media (min-width: 640px) { .related-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (min-width: 1024px) { .related-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          `}</style>
        </section>
      )}

      <CTABand eyebrow="BOOK NOW" heading="Ready for a Healthier Smile?" body="Book your free consultation today. Call us or request an appointment online. Se Habla Español." />
    </>
  )
}
