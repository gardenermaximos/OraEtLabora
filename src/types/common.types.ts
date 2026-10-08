/* Tipos comuns compartilhados entre features */

export type ID = string

export type Timestamp = string // ISO 8601

export type Language = 'la' | 'pt-BR' | 'en' | 'es' | 'it'

export type VisibilityLevel = 'private' | 'friends' | 'public'

export type LiturgicalSeason =
  | 'ordinary'
  | 'advent'
  | 'christmas'
  | 'lent'
  | 'easter'
  | 'pentecost'
  | 'gaudete'
  | 'laetare'

export type LiturgicalColor =
  | 'green'
  | 'purple'
  | 'white'
  | 'red'
  | 'rose'
  | 'gold'

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}
