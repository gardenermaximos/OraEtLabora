/* Todas as rotas da aplicação como constantes tipadas.
   Nunca use strings mágicas de rota fora deste arquivo. */

export const ROUTES = {
  HOME: '/',
  PRAYERS: '/prayers',
  PRAYER_DETAIL: '/prayers/:id',
  DISCOVER: '/discover',
  ASSISTANT: '/assistant',
  COMMUNITY: '/community',
  PROFILE: '/profile',
  ONBOARDING: '/onboarding',
  ROSARY: '/rosary',
  HOURS_CLOCK: '/hours',
  EXAMINATION: '/examination',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

/** Substitui parâmetros dinâmicos na rota. Ex: buildPath(ROUTES.PRAYER_DETAIL, { id: '123' }) */
export function buildPath(
  route: string,
  params: Record<string, string>,
): string {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    route,
  )
}
