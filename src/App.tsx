// src/App.tsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from '@components/layout/Layout'

// Lazy-loaded pages for code splitting
const Home           = lazy(() => import('@pages/Home'))
const About          = lazy(() => import('@pages/About'))
const Services       = lazy(() => import('@pages/Services'))
const ServiceDetail  = lazy(() => import('@pages/ServiceDetail'))
const Dentists       = lazy(() => import('@pages/Dentists'))
const DentistDetail  = lazy(() => import('@pages/DentistDetail'))
const Blog           = lazy(() => import('@pages/Blog'))
const BlogPost       = lazy(() => import('@pages/BlogPost'))
const BookAppt       = lazy(() => import('@pages/BookAppointment'))
const Contact        = lazy(() => import('@pages/Contact'))
const NotFound       = lazy(() => import('@pages/NotFound'))

function PageFallback() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid var(--color-neutral-200)', borderTopColor: 'var(--color-brand-500)', borderRadius: '50%' }} className="animate-spin" role="status" aria-label="Loading page" />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:slug" element={<ServiceDetail />} />
                <Route path="dentists" element={<Dentists />} />
                <Route path="dentists/:slug" element={<DentistDetail />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="book-an-appointment" element={<BookAppt />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
