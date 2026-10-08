import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useThemeStore } from '@/store/useThemeStore'
import { usePlayerStore } from '@/store/usePlayerStore'
import { PRAYERS } from '@/data/prayersData'
import { Button } from '@/components/ui/Button'

describe('Ora et Labora - Core Unit Tests', () => {
  beforeEach(() => {
    usePlayerStore.getState().stop()
  })

  it('contains essential Catholic prayers with Latin and Portuguese', () => {
    expect(PRAYERS.length).toBeGreaterThanOrEqual(5)

    const paterNoster = PRAYERS.find((p) => p.id === 'pater-noster')
    expect(paterNoster).toBeDefined()
    expect(paterNoster?.titleLatin).toBe('Pater Noster')
    expect(paterNoster?.verses[0].latin).toContain('Pater noster')

    const aveMaria = PRAYERS.find((p) => p.id === 'ave-maria')
    expect(aveMaria).toBeDefined()
    expect(aveMaria?.verses[0].portuguese).toContain('Ave Maria')
  })

  it('manages liturgical theme and dark vigília state correctly', () => {
    const { setTheme, setLiturgicalSeason } = useThemeStore.getState()

    setTheme('vigilia')
    expect(useThemeStore.getState().theme).toBe('vigilia')

    setTheme('light')
    expect(useThemeStore.getState().theme).toBe('light')

    setLiturgicalSeason('advent')
    expect(useThemeStore.getState().liturgicalSeason).toBe('advent')

    setLiturgicalSeason('ordinary')
    expect(useThemeStore.getState().liturgicalSeason).toBe('ordinary')
  })

  it('controls audio prayer player state properly', () => {
    const store = usePlayerStore.getState()

    store.play('pater-noster', 'la')
    expect(usePlayerStore.getState().prayerId).toBe('pater-noster')
    expect(usePlayerStore.getState().status).toBe('loading')

    usePlayerStore.getState().resume()
    expect(usePlayerStore.getState().status).toBe('playing')

    usePlayerStore.getState().pause()
    expect(usePlayerStore.getState().status).toBe('paused')

    usePlayerStore.getState().setSpeed(1.25)
    expect(usePlayerStore.getState().speed).toBe(1.25)

    usePlayerStore.getState().stop()
    expect(usePlayerStore.getState().prayerId).toBeNull()
    expect(usePlayerStore.getState().status).toBe('idle')
  })

  it('renders Button component with text and variants', () => {
    render(<Button variant="primary">Ora et Labora</Button>)
    const btn = screen.getByRole('button', { name: /ora et labora/i })
    expect(btn).toBeDefined()
  })
})
