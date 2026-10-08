import { useEffect, useState } from 'react'

/**
 * Debounce genérico — retorna o valor estabilizado após o delay.
 * Uso: evitar buscas a cada tecla pressionada.
 */
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
