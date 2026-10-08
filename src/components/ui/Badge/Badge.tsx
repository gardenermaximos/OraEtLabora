import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'liturgical' | 'gold' | 'success' | 'warning'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-ivory-200 text-graphite-600',
  liturgical: 'bg-liturgical-subtle text-liturgical',
  gold: 'bg-gold-light/30 text-gold-dark',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
}

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
