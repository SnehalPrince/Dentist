// src/pages/Blog.tsx
import { motion } from 'framer-motion'
import { SEOHead } from '@components/seo/SEOHead'
import { BlogCard } from '@components/cards/BlogCard'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import blogIndex from '@content/blog/index.json'
import type { BlogPostMeta } from '@/types'

const BASE_URL = 'https://pleitezdentalcorp.com'
const POSTS = blogIndex as BlogPostMeta[]

export default function Blog() {
  const reduced = useReducedMotion()

  return (
    <>
      <SEOHead
        title="Dental Health Blog — Tips & Guides | Pleitez Dental Corp"
        description="Read educational articles from Pleitez Dental Corp in Chatsworth, CA — dental implants, same-day crowns, cosmetic dentistry, family oral health tips, and more."
        canonical={`${BASE_URL}/blog`}
      />

      <section
        aria-labelledby="blog-heading"
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
              <SectionLabel>DENTAL HEALTH BLOG</SectionLabel>
            </motion.div>
            <motion.h1
              id="blog-heading"
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-xl)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.025em' }}
            >
              Oral Health Insights
            </motion.h1>
            <motion.p
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-xl)', color: 'var(--color-neutral-600)', maxWidth: '560px' }}
            >
              Practical, trustworthy articles to help you and your family maintain a healthy smile.
            </motion.p>
          </motion.div>

          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'var(--space-6)' }}
            className="blog-grid"
          >
            {POSTS.map((post) => (
              <motion.div key={post.slug} variants={getVariants(fadeUp, reduced)}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
          <style>{`
            @media (min-width: 640px) { .blog-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (min-width: 1024px) { .blog-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          `}</style>
        </Container>
      </section>
    </>
  )
}
