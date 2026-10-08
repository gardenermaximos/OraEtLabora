import { useState } from 'react'
import {
  Award,
  Sparkles,
  Palette,
  Sun,
  Moon,
  Church,
  CheckCircle,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useThemeStore } from '@/store/useThemeStore'
import { useSessionStore } from '@/store/useSessionStore'
import { useToastStore } from '@/store/useToastStore'
import type { LiturgicalSeason } from '@/types/common.types'

const SEASONS: { id: LiturgicalSeason; label: string; color: string }[] = [
  { id: 'ordinary', label: 'Tempo Comum (Verde)', color: 'bg-emerald-600' },
  { id: 'advent', label: 'Advento (Roxo)', color: 'bg-purple-600' },
  { id: 'lent', label: 'Quaresma (Roxo Penitent)', color: 'bg-purple-800' },
  { id: 'christmas', label: 'Natal (Champanhe / Dourado)', color: 'bg-amber-400' },
  { id: 'easter', label: 'Páscoa (Dourado / Branco)', color: 'bg-amber-500' },
  { id: 'pentecost', label: 'Pentecostes (Vermelho)', color: 'bg-red-600' },
  { id: 'gaudete', label: 'Gaudete / Alegria (Rosa)', color: 'bg-pink-500' },
]

const BADGES = [
  {
    id: 'b-1',
    title: 'Discípulo de São Bento',
    desc: 'Equilibrou 7 dias de oração e trabalho',
    unlocked: true,
  },
  {
    id: 'b-2',
    title: 'Vigília Fiel',
    desc: 'Completou a oração das Completas por 5 noites',
    unlocked: true,
  },
  {
    id: 'b-3',
    title: 'Amigo dos Pobres',
    desc: 'Uniu suas intenções na comunidade por 10 vezes',
    unlocked: true,
  },
  {
    id: 'b-4',
    title: 'Apóstolo do Santo Terço',
    desc: 'Meditou os 4 mistérios ao longo da semana',
    unlocked: false,
  },
]

export default function ProfilePage() {
  const { theme, toggleTheme, liturgicalSeason, setLiturgicalSeason } = useThemeStore()
  const { user } = useSessionStore()
  const { addToast } = useToastStore()

  const [parish, setParish] = useState('Paróquia São Bento Abade')
  const [userName, setUserName] = useState(user?.displayName ?? 'Servo de Deus')
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = () => {
    setIsEditing(false)
    addToast({
      message: 'Dados do perfil espiritual atualizados com sucesso.',
      variant: 'success',
    })
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card padding="lg" className="border border-gold/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-gold-dark font-serif font-bold text-2xl shadow-sm">
              <span className="select-none">✠</span>
            </div>

            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="px-2 py-1 text-base font-serif font-bold rounded border border-ivory-200 bg-ivory-50 text-graphite-900"
                  />
                  <input
                    type="text"
                    value={parish}
                    onChange={(e) => setParish(e.target.value)}
                    className="px-2 py-1 text-xs rounded border border-ivory-200 bg-ivory-50 text-graphite-600 block"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-graphite-900">
                    {userName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-graphite-600">
                    <Church className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{parish}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Button
            size="sm"
            variant={isEditing ? 'primary' : 'secondary'}
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
          >
            {isEditing ? 'Salvar' : 'Editar Perfil'}
          </Button>
        </div>

        {/* Spiritual Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-ivory-200 text-center">
          <div className="p-3 rounded-card bg-ivory-50 border border-ivory-200">
            <span className="text-lg font-bold font-serif text-amber-600 block">
              14
            </span>
            <span className="text-[11px] text-graphite-400">Dias de Chama</span>
          </div>

          <div className="p-3 rounded-card bg-ivory-50 border border-ivory-200">
            <span className="text-lg font-bold font-serif text-emerald-600 block">
              2
            </span>
            <span className="text-[11px] text-graphite-400">Dias de Graça</span>
          </div>

          <div className="p-3 rounded-card bg-ivory-50 border border-ivory-200">
            <span className="text-lg font-bold font-serif text-gold-dark block">
              850
            </span>
            <span className="text-[11px] text-graphite-400">Pontos de Oração</span>
          </div>
        </div>
      </Card>

      {/* Liturgical Colors & Theme Customizer */}
      <Card padding="md" className="border border-ivory-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-gold-dark" />
            <h4 className="text-base font-serif font-bold text-graphite-900">
              Cores Litúrgicas e Tema
            </h4>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill border border-ivory-200 bg-ivory-50 text-xs text-graphite-700 hover:bg-ivory-200"
          >
            {theme === 'vigilia' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" /> Modo Claro
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" /> Modo Vigília (Escuro)
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-graphite-600">
          A paleta do aplicativo acompanha os paramentos e tempos santos da Igreja Católica. Selecione o tempo atual:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SEASONS.map((season) => (
            <button
              key={season.id}
              type="button"
              onClick={() => {
                setLiturgicalSeason(season.id)
                addToast({
                  message: `Tempo litúrgico alterado para: ${season.label}.`,
                  variant: 'info',
                })
              }}
              className={`p-2.5 rounded-card border text-left text-xs font-medium flex items-center justify-between transition-all ${
                liturgicalSeason === season.id
                  ? 'border-gold bg-gold/15 text-gold-dark font-semibold'
                  : 'border-ivory-200 bg-ivory-50 text-graphite-700 hover:bg-ivory-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${season.color}`} />
                <span>{season.label}</span>
              </div>
              {liturgicalSeason === season.id && (
                <CheckCircle className="w-3.5 h-3.5 text-gold-dark" />
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Spiritual Badges */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-gold-dark" />
          <h4 className="text-base font-serif font-bold text-graphite-900">
            Conquistas e Virtudes
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-card border flex items-start gap-3 ${
                badge.unlocked
                  ? 'bg-ivory-100 border-gold/40 shadow-xs'
                  : 'bg-ivory-100/40 border-ivory-200 opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  badge.unlocked
                    ? 'bg-gold/20 text-gold-dark'
                    : 'bg-ivory-200 text-graphite-400'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-serif font-bold text-graphite-900">
                  {badge.title}
                </h5>
                <p className="text-xs text-graphite-600">{badge.desc}</p>
                <span className="text-[10px] font-mono mt-1 block font-semibold text-gold-dark">
                  {badge.unlocked ? 'Alcançado' : 'Em progresso'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
