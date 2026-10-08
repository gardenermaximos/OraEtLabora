import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { LiturgicalSeason } from '@/types/common.types'

interface ThemeState {
  theme: 'light' | 'vigilia'
  liturgicalSeason: LiturgicalSeason
  setTheme: (theme: 'light' | 'vigilia') => void
  setLiturgicalSeason: (season: LiturgicalSeason) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      liturgicalSeason: 'ordinary',

      setTheme: (theme) => {
        set({ theme })
        applyThemeToDOM(theme, get().liturgicalSeason)
      },

      setLiturgicalSeason: (liturgicalSeason) => {
        set({ liturgicalSeason })
        applyThemeToDOM(get().theme, liturgicalSeason)
      },

      toggleTheme: () => {
        const next = get().theme === 'light' ? 'vigilia' : 'light'
        get().setTheme(next)
      },
    }),
    {
      name: 'oraetlabora-theme',
      onRehydrateStorage: () => (state) => {
        // Aplica o tema salvo ao DOM quando a store é hidratada
        if (state) {
          applyThemeToDOM(state.theme, state.liturgicalSeason)
        }
      },
    },
  ),
)

function applyThemeToDOM(
  theme: 'light' | 'vigilia',
  season: LiturgicalSeason,
): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.setAttribute('data-liturgical', season)
}
