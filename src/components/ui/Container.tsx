// src/components/ui/Container.tsx
import { cn } from '@lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  narrow?: boolean // use content max-width instead of full container max
}

export function Container({ children, className, narrow = false }: ContainerProps) {
  return (
    <div
      className={cn('container', narrow && 'container--content', className)}
    >
      {children}
    </div>
  )
}
