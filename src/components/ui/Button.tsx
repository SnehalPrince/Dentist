// src/components/ui/Button.tsx
import { motion } from 'framer-motion'
import { cn } from '@lib/utils'
import { useReducedMotion } from '@hooks/useReducedMotion'
import '@styles/components/button.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'dark-ghost'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  children: React.ReactNode
  id?: string
  'aria-label'?: string
  style?: React.CSSProperties
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  external = false,
  onClick,
  type = 'button',
  disabled = false,
  className,
  children,
  id,
  'aria-label': ariaLabel,
  style,
}: ButtonProps) {
  const reduced = useReducedMotion()
  const classes = cn(
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full',
    className
  )

  const motionProps = reduced
    ? {}
    : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, transition: { duration: 0.15 } }

  if (href) {
    return (
      <motion.a
        id={id}
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        style={style}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
      style={style}
    >
      {children}
    </motion.button>
  )
}
