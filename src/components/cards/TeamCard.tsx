// src/components/cards/TeamCard.tsx
// Handles isPlaceholder: true state per Team Section Strategy
// Per 01_PRD.md and 04_SITEMAP_AND_CONTENT.md
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import { Badge } from '@components/ui/Badge'
import type { Dentist } from '@/types'
import '@styles/components/card.css'

interface TeamCardProps {
  dentist: Dentist
  showCta?: boolean
}

export function TeamCard({ dentist, showCta = true }: TeamCardProps) {
  return (
    <div className="team-card">
      {/* Image area */}
      <div className="team-card__image">
        {dentist.image && !dentist.isPlaceholder ? (
          <img
            src={dentist.image}
            alt={`${dentist.name} — Topanga Dental Care`}
            width={600}
            height={800}
            loading="lazy"
          />
        ) : (
          <>
            <User
              className="team-card__placeholder-icon"
              aria-hidden="true"
              strokeWidth={1}
            />
            <p className="team-card__placeholder-text">
              Photo coming soon
            </p>
          </>
        )}
      </div>

      {/* Content */}
      <div className="team-card__content">
        <h3 className="team-card__name">{dentist.name}</h3>
        <p className="team-card__role">{dentist.role}</p>

        {dentist.isPlaceholder && (
          <Badge variant="neutral" className="team-card__badge">
            Full bio coming soon
          </Badge>
        )}

        {showCta && (
          <Link
            to={`/dentists/${dentist.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '1rem',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 500,
              color: 'var(--color-brand-500)',
              textDecoration: 'none',
            }}
            aria-label={`View profile for ${dentist.name}`}
          >
            View Profile →
          </Link>
        )}
      </div>
    </div>
  )
}
