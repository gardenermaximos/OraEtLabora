import type { ID, Timestamp } from './common.types'

export interface User {
  id: ID
  email: string
  displayName: string
  avatarUrl?: string
  createdAt: Timestamp
}

export interface Profile {
  userId: ID
  bio?: string
  parishName?: string
  spiritualGoals: string[]
  level: number
  totalPoints: number
  currentStreak: number
  gracesDays: number
}

export interface UserPreferences {
  userId: ID
  theme: 'light' | 'vigilia'
  language: 'pt-BR' | 'en'
  prayerLanguage: import('./common.types').Language
  notifications: boolean
  reminderTime?: string // HH:MM
}
