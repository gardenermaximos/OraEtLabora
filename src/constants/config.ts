/* Lê e valida variáveis de ambiente VITE_*.
   Importe este objeto em vez de acessar import.meta.env diretamente. */

function requireEnv(key: string, fallback?: string): string {
  const value = import.meta.env[key] as string | undefined
  if (value !== undefined && value !== '') return value
  if (fallback !== undefined) return fallback
  throw new Error(
    `Missing required environment variable: ${key}. Check .env.example.`,
  )
}

export const config = {
  app: {
    name: requireEnv('VITE_APP_NAME', 'Ora et Labora'),
    version: requireEnv('VITE_APP_VERSION', '0.1.0'),
  },
  tts: {
    provider: requireEnv('VITE_TTS_PROVIDER', 'mock') as 'mock' | 'http',
    apiUrl: requireEnv('VITE_TTS_API_URL', ''),
    apiKey: requireEnv('VITE_TTS_API_KEY', ''),
  },
  ai: {
    provider: requireEnv('VITE_AI_PROVIDER', 'mock') as 'mock' | 'http',
    apiUrl: requireEnv('VITE_AI_API_URL', ''),
    apiKey: requireEnv('VITE_AI_API_KEY', ''),
  },
} as const
