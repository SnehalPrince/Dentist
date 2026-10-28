// src/components/ui/AnimatedCounter.tsx
// Counts from 0 to target on viewport entry using Framer Motion
// Per 03_DESIGN.md §4.8 — Used in TrustStrip
import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number   // seconds
  label?: string      // aria-label for screen readers (should describe the final value)
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.5,
  label,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(reduced ? value : 0)

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  })

  useEffect(() => {
    if (reduced) {
      setDisplayValue(value)
      return
    }
    if (inView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (v) => setDisplayValue(Math.round(v * 10) / 10),
      })
      return controls.stop
    }
  }, [inView, value, duration, reduced, motionValue])

  // Keep spring in sync (used for smooth non-integer values)
  useEffect(() => {
    const unsubscribe = springValue.on('change', (v) => {
      if (!reduced) setDisplayValue(Math.round(v * 10) / 10)
    })
    return unsubscribe
  }, [springValue, reduced])

  const ariaLabel = label ?? `${prefix}${value}${suffix}`

  return (
    <span
      ref={ref}
      className={className}
      aria-label={ariaLabel}
    >
      <span aria-hidden="true">
        {prefix}{displayValue}{suffix}
      </span>
    </span>
  )
}
