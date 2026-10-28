// src/components/layout/MobileNav.tsx
// Slide-in drawer with focus trap, Escape key, and focus restoration
// Per 07_ACCESSIBILITY_AND_QA.md §2.2.1 and §2.4.2
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { Button } from '@components/ui/Button'
import { useReducedMotion } from '@hooks/useReducedMotion'
import siteConfig from '@content/site.config.json'

interface NavLink {
  label: string
  to: string
}

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const reduced = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Focus close button when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
    exit: { x: '100%', transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 'var(--z-overlay)' as unknown as number,
            }}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            variants={reduced ? {} : drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(320px, 90vw)',
              background: 'var(--color-neutral-0)',
              zIndex: 'var(--z-drawer)' as unknown as number,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--color-neutral-100)',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-neutral-900)' }}>
                Pleitez <span style={{ color: 'var(--color-brand-500)', fontWeight: 400 }}>Dental Corp.</span>
              </span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close navigation menu"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  border: 'none', background: 'none', cursor: 'pointer',
                  borderRadius: 'var(--radius-md)', color: 'var(--color-neutral-700)',
                }}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation" style={{ flex: 1, overflowY: 'auto' }}>
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid var(--color-neutral-100)',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--color-brand-600)' : 'var(--color-neutral-700)',
                    textDecoration: 'none',
                    fontSize: 'var(--text-body-md)',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Footer CTA */}
            <div style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              borderTop: '1px solid var(--color-neutral-100)',
            }}>
              <a
                href={`tel:${siteConfig.phone}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '1.125rem', fontWeight: 600,
                  color: 'var(--color-neutral-900)', textDecoration: 'none',
                  padding: '0.75rem 0',
                }}
                aria-label={`Call ${siteConfig.phoneDisplay}`}
              >
                <Phone size={20} aria-hidden="true" style={{ color: 'var(--color-brand-500)' }} />
                {siteConfig.phoneDisplay}
              </a>
              <Button variant="primary" size="lg" href="/book-an-appointment" fullWidth onClick={onClose}>
                Book an Appointment
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
