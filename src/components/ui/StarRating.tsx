// src/components/ui/StarRating.tsx
// Renders SVG stars from a 0-5 rating value
// Accessible via role="img" and aria-label

interface StarRatingProps {
  value: number          // 0-5, supports decimals like 4.6
  size?: number          // px, default 20
  label?: string         // custom aria-label, defaults to "X out of 5 stars"
  className?: string
}

export function StarRating({ value, size = 20, label, className }: StarRatingProps) {
  const ariaLabel = label ?? `${value} out of 5 stars`
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fillRatio = Math.max(0, Math.min(1, value - i))
    return fillRatio
  })

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{ display: 'inline-flex', gap: '2px' }}
    >
      {stars.map((fill, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        >
          <defs>
            <linearGradient id={`star-grad-${i}-${value}`}>
              <stop offset={`${fill * 100}%`} stopColor="var(--color-accent-star)" />
              <stop offset={`${fill * 100}%`} stopColor="var(--color-neutral-200)" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={`url(#star-grad-${i}-${value})`}
            stroke="var(--color-accent-star)"
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </span>
  )
}
