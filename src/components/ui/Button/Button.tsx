import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
  > {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-ivory-50 hover:bg-gold-dark shadow-sm hover:shadow-card active:scale-[0.97]',
  secondary:
    'bg-ivory-100 text-graphite-800 border border-ivory-200 hover:bg-ivory-200 active:scale-[0.97]',
  ghost:
    'text-graphite-600 hover:bg-ivory-100 hover:text-graphite-900 active:scale-[0.97]',
  danger:
    'bg-red-600 text-white hover:bg-red-700 shadow-sm active:scale-[0.97]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.button
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={[
        'inline-flex items-center justify-center rounded-pill font-sans font-medium',
        'transition-colors duration-subtle focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
        'disabled:opacity-40 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </motion.button>
  )
}
