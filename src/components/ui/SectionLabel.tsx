// src/components/ui/SectionLabel.tsx
// The Medio template's distinctive "// EYEBROW" section label pattern
import { cn } from '@lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  light?: boolean // for use on dark backgrounds
}

export function SectionLabel({ children, className, light = false }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'text-label-lg flex items-center gap-2',
        light ? 'text-brand-300' : 'text-brand-500',
        className
      )}
      style={{
        color: light ? 'var(--color-brand-300)' : 'var(--color-brand-500)',
        fontSize: 'var(--text-label-lg)',
        letterSpacing: '0.1em',
        fontWeight: 500,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <span aria-hidden="true" style={{ color: light ? 'rgba(94,234,212,0.6)' : 'var(--color-brand-300)', fontWeight: 300 }}>
        //
      </span>
      {children}
    </p>
  )
}
