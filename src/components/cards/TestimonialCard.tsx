// src/components/cards/TestimonialCard.tsx
import { StarRating } from '@components/ui/StarRating'
import type { Testimonial } from '@/types'
import '@styles/components/card.css'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      <StarRating value={testimonial.stars} size={18} />
      <blockquote>
        <p className="testimonial-card__quote">"{testimonial.quote}"</p>
      </blockquote>
      <div className="testimonial-card__attribution">
        <div
          className="testimonial-card__avatar"
          aria-hidden="true"
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="testimonial-card__name">{testimonial.name}</p>
          <p className="testimonial-card__meta">{testimonial.meta}</p>
        </div>
      </div>
    </div>
  )
}
