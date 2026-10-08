import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Adiciona efeito hover sutil (escala + sombra) */
  interactive?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function Card({
  children,
  interactive = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-card bg-ivory-100 shadow-card',
        'transition-shadow duration-standard',
        interactive &&
          'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-transform',
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
