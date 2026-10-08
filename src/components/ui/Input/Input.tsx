import { useId, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-graphite-600"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-describedby={errorId}
        aria-invalid={error ? true : undefined}
        className={[
          'h-10 w-full rounded-card border bg-ivory-50 px-3 text-sm text-graphite-900',
          'placeholder:text-graphite-400 transition-colors duration-subtle',
          'focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1',
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-ivory-200 hover:border-graphite-400',
          className,
        ].join(' ')}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs text-graphite-400">{helperText}</p>
      )}
    </div>
  )
}
