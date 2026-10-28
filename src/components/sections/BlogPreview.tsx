// src/components/sections/BlogPreview.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { BlogCard } from '@components/cards/BlogCard'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import blogIndex from '@content/blog/index.json'
import type { BlogPostMeta } from '@/types'

const POSTS = (blogIndex as BlogPostMeta[]).slice(0, 4)

export function BlogPreview() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="blog-preview-heading"
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
              <SectionLabel>DENTAL HEALTH BLOG</SectionLabel>
              <h2
                id="blog-preview-heading"
                style={{
                  marginTop: 'var(--space-4)',
                  fontSize: 'var(--text-display-lg)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--color-neutral-900)',
                  letterSpacing: '-0.02em',
                }}
              >
                Oral Health Insights
              </h2>
            </div>
            <Link
              to="/blog"
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
              View All Posts <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Blog grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: 'var(--space-6)',
            }}
            className="blog-preview-grid"
          >
            {POSTS.map((post) => (
              <motion.div key={post.slug} variants={getVariants(fadeUp, reduced)}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      <style>{`
        @media (min-width: 640px) {
          .blog-preview-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .blog-preview-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
