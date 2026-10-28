// src/components/ui/OpenNowBadge.tsx
// Dynamic open/closed status — NEVER hardcodes "Closed"
// Per 02_DATA_SOURCE_OF_TRUTH.md §5 and 07_ACCESSIBILITY_AND_QA.md §5.2

import type { WeeklyHours } from '@/types'
import { useOpenStatus } from '@hooks/useOpenStatus'

interface OpenNowBadgeProps {
  hours: WeeklyHours
  className?: string
}

export function OpenNowBadge({ hours, className }: OpenNowBadgeProps) {
  const status = useOpenStatus(hours)

  return (
    <span
      role="status"
      aria-live="polite"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: 'var(--text-body-sm)',
        color: status.isOpen ? 'var(--color-brand-700)' : 'var(--color-neutral-500)',
      }}
    >
      <span
        aria-hidden="true"
        className={status.isOpen ? 'dot-pulse' : undefined}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          flexShrink: 0,
          backgroundColor: status.isOpen
            ? 'var(--color-brand-500)'
            : 'var(--color-neutral-400)',
          display: 'inline-block',
        }}
      />
      {status.label}
      {!status.hoursVerified && (
        <span style={{ fontSize: 'var(--text-label-md)', color: 'var(--color-neutral-400)' }}>
          {' '}(hours unverified)
        </span>
      )}
    </span>
  )
}
