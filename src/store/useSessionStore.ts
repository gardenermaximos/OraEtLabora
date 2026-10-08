import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { User, UserPreferences } from '@/types/user.types'

interface SessionState {
  user: User | null
  preferences: UserPreferences | null
  isOnboarded: boolean
  setUser: (user: User | null) => void
  setPreferences: (prefs: UserPreferences) => void
  setOnboarded: (value: boolean) => void
  logout: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      preferences: null,
      isOnboarded: false,

      setUser: (user) => set({ user }),

      setPreferences: (preferences) => set({ preferences }),

      setOnboarded: (isOnboarded) => set({ isOnboarded }),

      logout: () => set({ user: null, preferences: null }),
    }),
    { name: 'oraetlabora-session' },
  ),
)
