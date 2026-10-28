// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { JsonLd } from '@components/seo/JsonLd'
import { businessSchema } from '@lib/seo'

export function Layout() {
  return (
    <>
      {/* Global JSON-LD on every page */}
      <JsonLd schema={businessSchema} />

      {/* Skip to main content — WCAG 2.1 AA */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
