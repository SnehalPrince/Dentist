// src/lib/lenis.ts
// Lenis smooth scroll — init, RAF loop, and GSAP sync
// Per 05_TECH_SPEC.md § 4 and 07_ACCESSIBILITY_AND_QA.md § 2.2.5

import Lenis from 'lenis'

let _lenis: Lenis | null = null

export function initLenis(): Lenis {
  // Respect prefers-reduced-motion per WCAG
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  _lenis = new Lenis({
    duration: prefersReduced ? 0 : 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReduced,
    wheelMultiplier: 1,
  })

  return _lenis
}

export function getLenis(): Lenis | null {
  return _lenis
}

/** RAF loop — call once in main.tsx */
export function startLenisRaf(lenis: Lenis): void {
  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

/** Sync Lenis scroll position with GSAP ScrollTrigger */
export async function syncLenisWithGSAP(lenis: Lenis): Promise<void> {
  try {
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  } catch {
    // GSAP sync is optional — Lenis works without it
  }
}
