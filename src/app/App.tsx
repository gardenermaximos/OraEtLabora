import { Providers } from './providers'
import { AppRouter } from './router'

/**
 * Componente raiz — apenas monta providers e router.
 * Nenhuma lógica de negócio aqui.
 */
export function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  )
}
