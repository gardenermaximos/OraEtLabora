import { create } from 'zustand'

export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

interface PlayerState {
  prayerId: string | null
  language: string | null
  status: PlaybackStatus
  currentVerseIndex: number
  speed: number
  duration: number
  position: number
  play: (prayerId: string, language: string) => void
  pause: () => void
  resume: () => void
  stop: () => void
  setStatus: (status: PlaybackStatus) => void
  setCurrentVerse: (index: number) => void
  setSpeed: (speed: number) => void
  setPosition: (position: number) => void
  setDuration: (duration: number) => void
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  prayerId: null,
  language: null,
  status: 'idle',
  currentVerseIndex: 0,
  speed: 1.0,
  duration: 0,
  position: 0,

  play: (prayerId, language) =>
    set({ prayerId, language, status: 'loading', currentVerseIndex: 0 }),

  pause: () => set({ status: 'paused' }),

  resume: () => set({ status: 'playing' }),

  stop: () =>
    set({
      prayerId: null,
      language: null,
      status: 'idle',
      currentVerseIndex: 0,
      position: 0,
      duration: 0,
    }),

  setStatus: (status) => set({ status }),
  setCurrentVerse: (currentVerseIndex) => set({ currentVerseIndex }),
  setSpeed: (speed) => set({ speed }),
  setPosition: (position) => set({ position }),
  setDuration: (duration) => set({ duration }),
}))
