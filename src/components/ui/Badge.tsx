// src/components/ui/Badge.tsx
import { cn } from '@lib/utils'

type BadgeVariant = 'brand' | 'neutral' | 'warm' | 'dark'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  brand:   'badge--brand',
  neutral: 'badge--neutral',
  warm:    'badge--warm',
  dark:    'badge--dark',
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span className={cn('badge', variantStyles[variant], className)}>
      {children}
    </span>
  )
}
