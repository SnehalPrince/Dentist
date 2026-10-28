// src/components/cards/BlogCard.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@components/ui/Badge'
import { useReducedMotion } from '@hooks/useReducedMotion'
import type { BlogPostMeta } from '@/types'
import '@styles/components/card.css'

interface BlogCardProps {
  post: BlogPostMeta
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function categoryToVariant(cat: string): 'brand' | 'neutral' | 'warm' {
  const c = cat.toLowerCase()
  if (c === 'preventive') return 'brand'
  if (c === 'cosmetic') return 'warm'
  return 'neutral'
}

export function BlogCard({ post }: BlogCardProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      whileHover={reduced ? {} : { y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="blog-card"
        aria-label={post.title}
      >
        <div className="blog-card__image">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            width={600}
            height={338}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        <div className="blog-card__content">
          <div className="blog-card__meta">
            <Badge variant={categoryToVariant(post.category)}>
              {post.category}
            </Badge>
            <time dateTime={post.date} style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-400)' }}>
              {formatDate(post.date)}
            </time>
          </div>
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <span className="blog-card__read-more">
            Read More <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
