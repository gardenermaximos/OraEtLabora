import { NavLink, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sun,
  Moon,
  BookOpen,
  Compass,
  MessageSquare,
  Users,
  User,
  Play,
  Pause,
  X,
  Volume2,
  Calendar,
} from 'lucide-react'

import { ROUTES } from '@/constants/routes'
import { useThemeStore } from '@/store/useThemeStore'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useToastStore } from '@/store/useToastStore'
import { PRAYERS } from '@/data/prayersData'
import type { LiturgicalSeason } from '@/types/common.types'

const NAV_ITEMS = [
  { path: ROUTES.HOME, label: 'Hoje', icon: Calendar },
  { path: ROUTES.PRAYERS, label: 'Orações', icon: BookOpen },
  { path: ROUTES.DISCOVER, label: 'Descobrir', icon: Compass },
  { path: ROUTES.ASSISTANT, label: 'Assistente', icon: MessageSquare },
  { path: ROUTES.COMMUNITY, label: 'Comunidade', icon: Users },
  { path: ROUTES.PROFILE, label: 'Perfil', icon: User },
]

const LITURGICAL_LABELS: Record<LiturgicalSeason, { name: string; colorClass: string }> = {
  ordinary: { name: 'Tempo Comum', colorClass: 'bg-emerald-700/20 text-emerald-800 dark:text-emerald-300' },
  advent: { name: 'Advento', colorClass: 'bg-purple-700/20 text-purple-800 dark:text-purple-300' },
  lent: { name: 'Quaresma', colorClass: 'bg-purple-800/20 text-purple-900 dark:text-purple-300' },
  christmas: { name: 'Natal', colorClass: 'bg-amber-400/20 text-amber-900 dark:text-amber-200' },
  easter: { name: 'Páscoa', colorClass: 'bg-amber-500/20 text-amber-900 dark:text-amber-200' },
  pentecost: { name: 'Pentecostes', colorClass: 'bg-red-600/20 text-red-800 dark:text-red-300' },
  gaudete: { name: 'Gaudete', colorClass: 'bg-pink-600/20 text-pink-800 dark:text-pink-300' },
  laetare: { name: 'Laetare', colorClass: 'bg-pink-600/20 text-pink-800 dark:text-pink-300' },
}

export function AppShell() {
  const { theme, toggleTheme, liturgicalSeason } = useThemeStore()
  const {
    prayerId,
    status: playerStatus,
    speed,
    pause,
    resume,
    stop,
    setSpeed,
  } = usePlayerStore()
  const { toasts, removeToast } = useToastStore()

  const activePrayer = prayerId ? PRAYERS.find((p) => p.id === prayerId) : null
  const seasonInfo = LITURGICAL_LABELS[liturgicalSeason] ?? LITURGICAL_LABELS.ordinary

  const nextSpeed = () => {
    if (speed === 1.0) setSpeed(1.25)
    else if (speed === 1.25) setSpeed(1.5)
    else setSpeed(1.0)
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 text-graphite-900 transition-colors duration-300">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-ivory-200/80 bg-ivory-50/90 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark border border-gold/40 shadow-sm">
              <span className="font-serif font-bold text-lg select-none">✠</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-graphite-900 leading-none">
                Ora et Labora
              </h1>
              <p className="text-[11px] text-graphite-400 font-sans tracking-wide">
                Oração e trabalho no ritmo da graça
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Liturgical Season Tag */}
            <div
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium border border-transparent shadow-xs ${seasonInfo.colorClass}`}
              title="Tempo litúrgico da Igreja"
            >
              <span className="w-2 h-2 rounded-full bg-current opacity-80" />
              <span>{seasonInfo.name}</span>
            </div>

            {/* Theme Toggle (Vigília / Claro) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'vigilia' ? 'Ativar modo claro' : 'Ativar modo Vigília (escuro)'}
              className="p-2 rounded-pill border border-ivory-200 hover:bg-ivory-100 text-graphite-600 transition-colors"
            >
              {theme === 'vigilia' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-graphite-800" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:px-6 pb-28">
        <Outlet />
      </main>

      {/* Floating Audio Player when active */}
      <AnimatePresence>
        {activePrayer && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 right-4 max-w-2xl mx-auto z-40 bg-ivory-100/95 backdrop-blur-lg border border-gold/40 rounded-card p-3 shadow-card-hover flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center shrink-0">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
              <div className="truncate">
                <p className="text-xs uppercase font-serif tracking-wider text-gold-dark font-medium">
                  Áudio de Oração
                </p>
                <h4 className="text-sm font-semibold text-graphite-900 truncate">
                  {activePrayer.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={nextSpeed}
                className="px-2 py-1 text-[11px] font-mono rounded bg-ivory-200/80 text-graphite-800 hover:bg-ivory-200 transition-colors"
                title="Velocidade de reprodução"
              >
                {speed}x
              </button>
              <button
                type="button"
                onClick={playerStatus === 'playing' ? pause : resume}
                className="w-9 h-9 rounded-full bg-gold text-white flex items-center justify-center hover:bg-gold-dark shadow-sm transition-colors"
                aria-label={playerStatus === 'playing' ? 'Pausar' : 'Reproduzir'}
              >
                {playerStatus === 'playing' ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
              <button
                type="button"
                onClick={stop}
                className="p-1.5 rounded-full text-graphite-400 hover:text-graphite-800 hover:bg-ivory-200/50 transition-colors"
                aria-label="Fechar reprodutor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-ivory-50/95 backdrop-blur-lg border-t border-ivory-200/80 shadow-nav py-2 px-3">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'flex flex-col items-center gap-1 py-1 px-2.5 rounded-card text-[11px] font-medium transition-colors select-none',
                    isActive
                      ? 'text-gold-dark font-semibold'
                      : 'text-graphite-400 hover:text-graphite-800',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`p-1 rounded-full transition-transform ${
                        isActive ? 'bg-gold/15 scale-110' : ''
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* Toasts */}
      <aside aria-label="Notificações" className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => removeToast(toast.id)}
            className="cursor-pointer rounded-card bg-graphite-900 text-ivory-50 px-4 py-3 text-sm shadow-card-hover flex items-center justify-between gap-3"
          >
            <span>{toast.message}</span>
            <X className="w-4 h-4 opacity-70 hover:opacity-100" />
          </motion.div>
        ))}
      </aside>
    </div>
  )
}
