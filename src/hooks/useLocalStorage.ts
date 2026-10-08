import { useCallback, useEffect, useState } from 'react'

/**
 * Wrapper tipado sobre localStorage com serialização JSON automática.
 * Sincroniza entre abas via storage event.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const readValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [stored, setStored] = useState<T>(readValue)

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      const next = value instanceof Function ? value(stored) : value
      localStorage.setItem(key, JSON.stringify(next))
      setStored(next)
    },
    [key, stored],
  )

  const removeValue = useCallback(() => {
    localStorage.removeItem(key)
    setStored(initialValue)
  }, [key, initialValue])

  // Sincroniza com outras abas
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key) setStored(readValue())
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key, readValue])

  return [stored, setValue, removeValue]
}
