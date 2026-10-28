// src/pages/BlogPost.tsx
// Route: /blog/:slug — renders MDX blog posts
import { useParams, Navigate, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SEOHead } from '@components/seo/SEOHead'
import { JsonLd } from '@components/seo/JsonLd'
import { CTABand } from '@components/sections/CTABand'
import { BlogCard } from '@components/cards/BlogCard'
import { SectionLabel } from '@components/ui/SectionLabel'
import { Container } from '@components/ui/Container'
import { blogPostingSchema, breadcrumbSchema } from '@lib/seo'
import { staggerContainer, fadeUp, getVariants } from '@lib/motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import blogIndex from '@content/blog/index.json'
import type { BlogPostMeta } from '@/types'

const BASE_URL = 'https://pleitezdentalcorp.com'
const POSTS = blogIndex as BlogPostMeta[]

// Lazy-load MDX components
const MDX_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  'dental-implants-guide': lazy(() => import('@content/blog/dental-implants-guide.mdx')),
  'same-day-crowns-what-to-expect': lazy(() => import('@content/blog/dental-implants-guide.mdx')),
  'why-regular-dental-visits-matter': lazy(() => import('@content/blog/oral-health-tips-for-families.mdx')),
  'oral-health-tips-for-families': lazy(() => import('@content/blog/oral-health-tips-for-families.mdx')),
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const reduced = useReducedMotion()

  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  const MdxContent = slug ? MDX_COMPONENTS[slug] : undefined
  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`${BASE_URL}/blog/${post.slug}`}
        ogImage={`${BASE_URL}${post.image}`}
      />
      <JsonLd schema={blogPostingSchema({
        title: post.title,
        description: post.excerpt,
        image: `${BASE_URL}${post.image}`,
        datePublished: post.date,
        slug: post.slug,
      })} />
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Blog', url: `${BASE_URL}/blog` },
        { name: post.title, url: `${BASE_URL}/blog/${post.slug}` },
      ])} />

      {/* Post Hero */}
      <section
        aria-labelledby="blog-post-heading"
        style={{ paddingTop: 'calc(80px + var(--space-16))', paddingBottom: 'var(--space-12)', backgroundColor: 'var(--color-neutral-50)' }}
      >
        <Container narrow>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-8)' }}>
            <ol style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', listStyle: 'none', flexWrap: 'wrap' }}>
              <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><Link to="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>Blog</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page" style={{ color: 'var(--color-neutral-700)', fontWeight: 500 }}>{post.title}</li>
            </ol>
          </nav>

          <motion.div
            variants={getVariants(staggerContainer, reduced)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={getVariants(fadeUp, reduced)} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <SectionLabel>{post.category}</SectionLabel>
              <span style={{ color: 'var(--color-neutral-300)' }} aria-hidden="true">·</span>
              <time dateTime={post.date} style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)' }}>{formatDate(post.date)}</time>
            </motion.div>

            <motion.h1
              id="blog-post-heading"
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-display-xl)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-neutral-900)', letterSpacing: '-0.025em' }}
            >
              {post.title}
            </motion.h1>

            <motion.p
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-body-xl)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-body)' }}
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              variants={getVariants(fadeUp, reduced)}
              style={{ marginTop: 'var(--space-8)', fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-500)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderBottom: '1px solid var(--color-neutral-200)', paddingBottom: 'var(--space-8)' }}
            >
              <span style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-brand-100)', color: 'var(--color-brand-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }} aria-hidden="true">PDC</span>
              <span>By <strong style={{ color: 'var(--color-neutral-700)' }}>Pleitez Dental Corp</strong> · Educational content</span>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Hero Image */}
      <div style={{ backgroundColor: 'var(--color-neutral-100)', maxHeight: '440px', overflow: 'hidden' }}>
        <img
          src={post.image}
          alt={post.title}
          width={1200}
          height={630}
          style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '440px' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      {/* MDX Body */}
      <section aria-label="Article content" style={{ backgroundColor: 'var(--color-neutral-0)', paddingBlock: 'var(--space-16)' }}>
        <Container narrow>
          <article className="prose">
            {MdxContent ? (
              <Suspense fallback={<p style={{ color: 'var(--color-neutral-400)' }}>Loading article…</p>}>
                <MdxContent />
              </Suspense>
            ) : (
              <p style={{ color: 'var(--color-neutral-400)' }}>Article content coming soon.</p>
            )}
          </article>

          {/* Attribution */}
          <div style={{ marginTop: 'var(--space-12)', padding: 'var(--space-6)', backgroundColor: 'var(--color-brand-50)', borderRadius: 'var(--radius-xl)', borderLeft: '4px solid var(--color-brand-300)' }}>
            <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-neutral-600)' }}>
              <strong>About the Author:</strong> This article is published by Pleitez Dental Corp for educational purposes.
              It does not constitute dental advice. Always consult your dentist for guidance specific to your situation.
              Questions? Call us at <a href="tel:+18187188433" style={{ fontWeight: 600, color: 'var(--color-brand-600)' }}>(818) 718-8433</a>.
            </p>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section aria-labelledby="related-posts-heading" style={{ backgroundColor: 'var(--color-neutral-50)', paddingBlock: 'var(--space-24)' }}>
          <Container>
            <h2 id="related-posts-heading" style={{ fontSize: 'var(--text-display-md)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-8)' }}>
              More Articles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'var(--space-6)' }} className="related-posts-grid">
              {related.map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
          </Container>
          <style>{`
            @media (min-width: 640px) { .related-posts-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
        </section>
      )}

      <CTABand eyebrow="BOOK NOW" heading="Ready for a Healthier Smile?" body="Book your free consultation today — Pleitez Dental Corp is here for you. Se Habla Español." />
    </>
  )
}
