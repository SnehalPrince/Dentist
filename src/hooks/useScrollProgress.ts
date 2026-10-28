// src/hooks/useScrollProgress.ts
import { useState, useEffect } from 'react'

/**
 * Returns true when the page has scrolled past `threshold` pixels.
 * Used for the sticky header transparent → solid transition.
 */
export function useScrollProgress(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    handleScroll() // check on mount
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
