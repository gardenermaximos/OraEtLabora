import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Flame,
  CheckCircle2,
  Circle,
  Plus,
  Sparkles,
  BookMarked,
  Sun,
  Sunset,
  Moon,
  HeartHandshake,
} from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TODAY_SAINT } from '@/data/saintsAndFeasts'
import { INITIAL_ACTIVITIES, type DailyActivity } from '@/data/activitiesData'
import { useToastStore } from '@/store/useToastStore'
import { ROUTES } from '@/constants/routes'

export default function HomePage() {
  const [activities, setActivities] = useState<DailyActivity[]>(INITIAL_ACTIVITIES)
  const streakDays = 14
  const [graceDays] = useState(2)
  const [newActivityTitle, setNewActivityTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<'morning' | 'afternoon' | 'evening'>('morning')

  const { addToast } = useToastStore()

  const toggleActivity = (id: string) => {
    setActivities((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.done
          if (nextState) {
            addToast({
              message: `+${item.points} pts: "${item.title}" concluído para a glória de Deus!`,
              variant: 'success',
            })
          }
          return { ...item, done: nextState }
        }
        return item
      }),
    )
  }

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newActivityTitle.trim()) return

    const newAct: DailyActivity = {
      id: `custom-${Date.now()}`,
      title: newActivityTitle.trim(),
      category: 'spiritual',
      period: selectedPeriod,
      timeHint: 'Hoje',
      points: 10,
      done: false,
    }

    setActivities((prev) => [...prev, newAct])
    setNewActivityTitle('')
    setIsAdding(false)
    addToast({
      message: 'Nova atividade adicionada ao seu dia.',
      variant: 'info',
    })
  }

  const completedCount = activities.filter((a) => a.done).length
  const totalCount = activities.length
  const progressPct = Math.round((completedCount / totalCount) * 100)

  const morningActivities = activities.filter((a) => a.period === 'morning')
  const afternoonActivities = activities.filter((a) => a.period === 'afternoon')
  const eveningActivities = activities.filter((a) => a.period === 'evening')

  return (
    <div className="space-y-6">
      {/* Liturgical Day & Saint Banner */}
      <section className="relative overflow-hidden rounded-card bg-gradient-to-br from-ivory-100 to-ivory-200/70 p-5 sm:p-6 border border-gold/30 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="liturgical">Tempo Comum</Badge>
              <span className="text-xs text-graphite-400">
                {TODAY_SAINT.feastDate}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-graphite-900">
              Santo do Dia: {TODAY_SAINT.name}
            </h2>
            <p className="text-xs text-graphite-600 font-sans italic">
              {TODAY_SAINT.title} • {TODAY_SAINT.patronage}
            </p>
          </div>

          {/* Spiritual Streak Widget */}
          <div className="flex items-center gap-4 bg-ivory-50/90 rounded-card px-4 py-2.5 border border-ivory-200 shadow-xs self-start sm:self-auto">
            <div className="flex items-center gap-1.5 text-amber-600">
              <Flame className="w-6 h-6 fill-amber-500 animate-pulse" />
              <div>
                <span className="text-lg font-bold font-serif leading-none">
                  {streakDays}
                </span>
                <span className="text-[11px] block text-graphite-400 font-sans -mt-0.5">
                  dias de chama
                </span>
              </div>
            </div>
            <div className="h-7 w-px bg-ivory-200" />
            <div>
              <span className="text-xs font-semibold text-emerald-700 block">
                {graceDays} dias
              </span>
              <span className="text-[10px] text-graphite-400 font-sans">
                de graça salvos
              </span>
            </div>
          </div>
        </div>

        <blockquote className="mt-4 pt-3 border-t border-ivory-200 text-sm italic font-serif text-graphite-600">
          {TODAY_SAINT.quote}
        </blockquote>
      </section>

      {/* Quick Spiritual Devotions Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to={ROUTES.PRAYERS}
          className="flex flex-col items-center justify-center p-3 rounded-card bg-ivory-100 hover:bg-gold/15 border border-ivory-200 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark mb-1.5 group-hover:scale-105 transition-transform">
            <Sun className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-graphite-800">Ângelus</span>
          <span className="text-[10px] text-graphite-400">12:00 e 18:00</span>
        </Link>

        <Link
          to={ROUTES.PRAYERS}
          className="flex flex-col items-center justify-center p-3 rounded-card bg-ivory-100 hover:bg-gold/15 border border-ivory-200 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark mb-1.5 group-hover:scale-105 transition-transform">
            <BookMarked className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-graphite-800">Santo Terço</span>
          <span className="text-[10px] text-graphite-400">Mistérios do Dia</span>
        </Link>

        <Link
          to={ROUTES.ASSISTANT}
          className="flex flex-col items-center justify-center p-3 rounded-card bg-ivory-100 hover:bg-gold/15 border border-ivory-200 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark mb-1.5 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-graphite-800">Assistente</span>
          <span className="text-[10px] text-graphite-400">Guia de Fé</span>
        </Link>

        <Link
          to={ROUTES.COMMUNITY}
          className="flex flex-col items-center justify-center p-3 rounded-card bg-ivory-100 hover:bg-gold/15 border border-ivory-200 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark mb-1.5 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-graphite-800">Intenções</span>
          <span className="text-[10px] text-graphite-400">Reze com irmãos</span>
        </Link>
      </section>

      {/* "Meu Dia" Routine & Progress */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-graphite-900">
              Meu Dia
            </h3>
            <p className="text-xs text-graphite-400">
              {completedCount} de {totalCount} atividades cumpridas ({progressPct}%)
            </p>
          </div>

          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? 'Fechar' : 'Nova Atividade'}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-ivory-200 h-2 rounded-pill overflow-hidden">
          <div
            className="bg-gold h-full rounded-pill transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Add Activity Form */}
        {isAdding && (
          <form
            onSubmit={handleAddActivity}
            className="p-4 rounded-card bg-ivory-100 border border-ivory-200 flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Ex: Leitura dos Salmos ou Santo Rosário..."
                value={newActivityTitle}
                onChange={(e) => setNewActivityTitle(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-card border border-ivory-200 bg-ivory-50 text-graphite-900 focus:outline-none focus:ring-2 focus:ring-gold"
                autoFocus
              />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-3 py-2 text-sm rounded-card border border-ivory-200 bg-ivory-50 text-graphite-900"
              >
                <option value="morning">Manhã</option>
                <option value="afternoon">Tarde</option>
                <option value="evening">Noite</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                Cancelar
              </Button>
              <Button type="submit" size="sm">
                Salvar Atividade
              </Button>
            </div>
          </form>
        )}

        {/* Routine Sections */}
        <div className="space-y-4">
          {/* Manhã */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite-400">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Manhã</span>
            </div>
            <div className="space-y-2">
              {morningActivities.map((act) => (
                <ActivityRow key={act.id} activity={act} onToggle={toggleActivity} />
              ))}
            </div>
          </div>

          {/* Tarde */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite-400">
              <Sunset className="w-3.5 h-3.5 text-orange-500" />
              <span>Tarde</span>
            </div>
            <div className="space-y-2">
              {afternoonActivities.map((act) => (
                <ActivityRow key={act.id} activity={act} onToggle={toggleActivity} />
              ))}
            </div>
          </div>

          {/* Noite */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite-400">
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Noite</span>
            </div>
            <div className="space-y-2">
              {eveningActivities.map((act) => (
                <ActivityRow key={act.id} activity={act} onToggle={toggleActivity} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scriptural Verse of the Day */}
      <section className="rounded-card bg-ivory-100 p-5 border border-ivory-200">
        <p className="text-xs uppercase tracking-widest font-serif text-gold-dark font-medium mb-1">
          Palavra do Dia • Salmo 118, 105
        </p>
        <p className="text-base font-serif italic text-graphite-800 leading-relaxed">
          “Lâmpada para os meus pés é a tua palavra e luz, para os meus caminhos.”
        </p>
      </section>
    </div>
  )
}

function ActivityRow({
  activity,
  onToggle,
}: {
  activity: DailyActivity
  onToggle: (id: string) => void
}) {
  return (
    <div
      onClick={() => onToggle(activity.id)}
      className={`flex items-center justify-between p-3 rounded-card border transition-all cursor-pointer ${
        activity.done
          ? 'bg-ivory-100/50 border-ivory-200/50 opacity-70'
          : 'bg-ivory-100 border-ivory-200 hover:border-gold/50 shadow-xs'
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={activity.done ? 'Marcar como não concluído' : 'Marcar como concluído'}
          className="text-gold-dark focus:outline-none"
        >
          {activity.done ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
          ) : (
            <Circle className="w-5 h-5 text-graphite-400" />
          )}
        </button>
        <div>
          <p
            className={`text-sm font-medium ${
              activity.done
                ? 'line-through text-graphite-400'
                : 'text-graphite-800'
            }`}
          >
            {activity.title}
          </p>
          <span className="text-[10px] text-graphite-400">
            {activity.timeHint} • {activity.category === 'spiritual' ? 'Espiritual' : 'Diária'}
          </span>
        </div>
      </div>

      <span className="text-xs font-mono font-medium text-gold-dark">
        +{activity.points} pts
      </span>
    </div>
  )
}
