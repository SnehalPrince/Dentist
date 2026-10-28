// src/lib/gsap.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animate an SVG path stroke on viewport entry (process connector line).
 * Falls back to opacity animation — does not require DrawSVGPlugin.
 */
export function animateProcessLine(selector: string, triggerEl: Element): void {
  const path = document.querySelector(selector)
  if (!path) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.fromTo(
    path,
    { strokeDashoffset: '100%', strokeDasharray: '100%', opacity: 0 },
    {
      strokeDashoffset: '0%',
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 70%',
        once: true,
      },
    }
  )
}

/** Subtle parallax on the hero image */
export function heroParallax(imageSelector: string): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.to(imageSelector, {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: imageSelector,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}
