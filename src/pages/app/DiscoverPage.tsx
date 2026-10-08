import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  BookOpen,
  Sparkles,
  Bell,
  CheckCircle2,
  Share2,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TODAY_SAINT, UPCOMING_FEASTS } from '@/data/saintsAndFeasts'
import { useToastStore } from '@/store/useToastStore'

type TabKey = 'saints' | 'formation' | 'events'

const FORMATION_ARTICLES = [
  {
    id: 'f-1',
    title: 'Os Três Graus da Oração: Vocal, Meditativa e Contemplativa',
    author: 'Santa Teresa de Jesus & Catecismo',
    readTime: '4 min de leitura',
    summary:
      'Como passar da repetição das palavras à escuta profunda do Coração de Deus no silêncio da alma.',
    content:
      'A oração vocal funda-se na união da mente com as palavras pronunciadas. A meditação busca compreender o porquê e como da vida cristã, mobilizando pensamentos e desejos. Por fim, a contemplação é olhar de fé fixado em Jesus, silêncio pleno de amor.',
    tags: ['Vida Interior', 'Mística', 'Oração'],
  },
  {
    id: 'f-2',
    title: 'Ora et Labora: O Sentido Sagrado do Trabalho Cotidiano',
    author: 'Regra de São Bento',
    readTime: '3 min de leitura',
    summary:
      'A dignidade do labor humano quando oferecido a Deus como verdadeiro ato de culto e serviço fraterno.',
    content:
      'Para São Bento, o trabalho manual e intelectual nunca é obstáculo à santidade, mas o seu campo fértil. Ao santificar as tarefas diárias, cada dever se torna altar onde ofertamos a Deus o esforço de nossas mãos.',
    tags: ['São Bento', 'Trabalho', 'Espiritualidade'],
  },
  {
    id: 'f-3',
    title: 'O Silêncio Interior no Mundo Barulhento',
    author: 'Cardeal Robert Sarah',
    readTime: '5 min de leitura',
    summary:
      'Sem o silêncio, Deus não pode ser ouvido. Redescobrindo a quietude da alma em tempos de dispersão digital.',
    content:
      'Deus fala no murmúrio de uma brisa suave. O silêncio não é ausência, mas presença divina. Na quietude da oração matinal ou noturna, a alma recupera sua dignidade e escuta o Mestre.',
    tags: ['Silêncio', 'Fé', 'Virtude'],
  },
]

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('saints')
  const [reminders, setReminders] = useState<Record<string, boolean>>({})
  const { addToast } = useToastStore()

  const toggleReminder = (title: string) => {
    setReminders((prev) => {
      const next = !prev[title]
      addToast({
        message: next
          ? `Lembrete agendado para: "${title}".`
          : `Lembrete cancelado para: "${title}".`,
        variant: 'info',
      })
      return { ...prev, [title]: next }
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-graphite-900">
          Descobrir a Fé
        </h2>
        <p className="text-sm text-graphite-600 font-sans">
          Vida dos Santos, formação doutrinal católica e calendário das festas litúrgicas.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ivory-200">
        <button
          type="button"
          onClick={() => setActiveTab('saints')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'saints'
              ? 'border-gold text-gold-dark font-semibold'
              : 'border-transparent text-graphite-400 hover:text-graphite-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Santo do Dia</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('formation')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'formation'
              ? 'border-gold text-gold-dark font-semibold'
              : 'border-transparent text-graphite-400 hover:text-graphite-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Formação</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'events'
              ? 'border-gold text-gold-dark font-semibold'
              : 'border-transparent text-graphite-400 hover:text-graphite-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Festas & Liturgia</span>
        </button>
      </div>

      {/* Tab: Santo do Dia */}
      {activeTab === 'saints' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card padding="lg" className="border border-gold/30 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Badge variant="liturgical">{TODAY_SAINT.feastDate}</Badge>
              <Badge variant="gold">Padroeira: {TODAY_SAINT.patronage}</Badge>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-graphite-900">
                {TODAY_SAINT.name}
              </h3>
              <p className="text-sm font-serif italic text-graphite-600">
                {TODAY_SAINT.title}
              </p>
            </div>

            <div className="space-y-3 text-sm text-graphite-800 leading-relaxed font-sans">
              <p>{TODAY_SAINT.bio}</p>
            </div>

            <div className="p-4 rounded-card bg-ivory-50 border border-ivory-200 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark font-mono block">
                Reflexão Espiritual
              </span>
              <p className="text-sm font-serif italic text-graphite-800">
                {TODAY_SAINT.reflection}
              </p>
            </div>

            <blockquote className="p-4 rounded-card bg-gold/10 border-l-4 border-gold text-sm font-serif italic text-graphite-900">
              {TODAY_SAINT.quote}
            </blockquote>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<Share2 className="w-3.5 h-3.5" />}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${TODAY_SAINT.name} (${TODAY_SAINT.feastDate})\n\n"${TODAY_SAINT.quote}"\n\nOra et Labora`,
                  )
                  addToast({
                    message: 'Reflexão copiada para compartilhar.',
                    variant: 'success',
                  })
                }}
              >
                Compartilhar Reflexão
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Tab: Formação */}
      {activeTab === 'formation' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {FORMATION_ARTICLES.map((article) => (
            <Card
              key={article.id}
              padding="md"
              interactive
              className="border border-ivory-200 space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-graphite-400">
                <span>{article.author}</span>
                <span className="font-mono">{article.readTime}</span>
              </div>

              <h3 className="text-lg font-serif font-bold text-graphite-900 leading-snug">
                {article.title}
              </h3>

              <p className="text-sm text-graphite-600">{article.summary}</p>

              <div className="p-3 rounded-card bg-ivory-50 text-xs font-serif italic text-graphite-700 leading-relaxed">
                {article.content}
              </div>

              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Tab: Calendário & Festas */}
      {activeTab === 'events' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-card bg-ivory-100 border border-ivory-200">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-graphite-600 mb-1">
              Próximas Solenidades & Festas
            </h3>
            <p className="text-xs text-graphite-400">
              Prepare seu coração e sua oração para as grandes comemorações da Igreja.
            </p>
          </div>

          <div className="space-y-3">
            {UPCOMING_FEASTS.map((feast) => {
              const hasReminder = !!reminders[feast.title]
              return (
                <div
                  key={feast.title}
                  className="p-4 rounded-card bg-ivory-100 border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold font-mono text-gold-dark">
                        {feast.date}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </div>
                    <h4 className="text-base font-serif font-bold text-graphite-900">
                      {feast.title}
                    </h4>
                    <p className="text-xs text-graphite-600">{feast.description}</p>
                  </div>

                  <Button
                    size="sm"
                    variant={hasReminder ? 'secondary' : 'primary'}
                    leftIcon={
                      hasReminder ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Bell className="w-3.5 h-3.5" />
                      )
                    }
                    onClick={() => toggleReminder(feast.title)}
                  >
                    {hasReminder ? 'Lembrado' : 'Lembrar-me'}
                  </Button>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
