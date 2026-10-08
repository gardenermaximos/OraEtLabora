/* Chaves do TanStack Query — nunca use strings mágicas inline.
   Organizado por feature para facilitar invalidação seletiva. */

export const QUERY_KEYS = {
  prayers: {
    all: ['prayers'] as const,
    list: (filters?: Record<string, unknown>) =>
      ['prayers', 'list', filters] as const,
    detail: (id: string) => ['prayers', 'detail', id] as const,
  },
  liturgy: {
    today: ['liturgy', 'today'] as const,
    saint: (date: string) => ['liturgy', 'saint', date] as const,
  },
  activities: {
    today: ['activities', 'today'] as const,
    history: (userId: string) => ['activities', 'history', userId] as const,
  },
  content: {
    feed: (category?: string) => ['content', 'feed', category] as const,
    events: ['content', 'events'] as const,
  },
  user: {
    profile: (userId: string) => ['user', 'profile', userId] as const,
    preferences: (userId: string) =>
      ['user', 'preferences', userId] as const,
  },
  social: {
    friends: (userId: string) => ['social', 'friends', userId] as const,
    intentions: ['social', 'intentions'] as const,
    feed: (userId: string) => ['social', 'feed', userId] as const,
  },
} as const
