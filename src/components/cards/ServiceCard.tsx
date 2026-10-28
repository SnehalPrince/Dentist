// src/components/cards/ServiceCard.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@components/ui/SectionLabel'
import { useReducedMotion } from '@hooks/useReducedMotion'
import type { Service } from '@/types'
import '@styles/components/card.css'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="service-card"
        aria-label={`Learn more about ${service.name}`}
      >
        <div className="service-card__image">
          <img
            src={service.image}
            alt={`${service.name} — Topanga Dental Care`}
            loading="lazy"
            width={800}
            height={600}
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
            }}
          />
        </div>
        <div className="service-card__content">
          <SectionLabel>{service.category}</SectionLabel>
          <h3 className="service-card__name">{service.name}</h3>
          <p className="service-card__teaser">{service.teaser}</p>
          <span className="service-card__link">
            Learn More <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
