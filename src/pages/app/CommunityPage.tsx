import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Plus } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { INITIAL_INTENTIONS, type PrayerIntention } from '@/data/intentionsData'
import { useToastStore } from '@/store/useToastStore'

const CATEGORY_LABELS = {
  health: { label: 'Saúde', variant: 'liturgical' as const },
  family: { label: 'Família', variant: 'default' as const },
  vocations: { label: 'Vocações', variant: 'gold' as const },
  conversion: { label: 'Conversão', variant: 'warning' as const },
  thanksgiving: { label: 'Ação de Graças', variant: 'success' as const },
}

export default function CommunityPage() {
  const [intentions, setIntentions] = useState<PrayerIntention[]>(INITIAL_INTENTIONS)
  const [isPosting, setIsPosting] = useState(false)
  const [newText, setNewText] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newCategory, setNewCategory] = useState<'health' | 'family' | 'vocations' | 'conversion' | 'thanksgiving'>('health')

  const { addToast } = useToastStore()

  const handlePray = (id: string) => {
    setIntentions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const already = item.hasPrayed
          const nextCount = already ? item.prayedCount - 1 : item.prayedCount + 1
          if (!already) {
            addToast({
              message: `Você uniu sua oração à intenção de ${item.authorName}. Deus abençoe!`,
              variant: 'success',
            })
          }
          return {
            ...item,
            hasPrayed: !already,
            prayedCount: nextCount,
          }
        }
        return item
      }),
    )
  }

  const handleAddIntention = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newText.trim()) return

    const newInt: PrayerIntention = {
      id: `int-${Date.now()}`,
      authorName: newAuthor.trim() || 'Irmão em Cristo',
      city: 'Brasil',
      text: newText.trim(),
      category: newCategory,
      createdAt: 'Agora',
      prayedCount: 1,
      hasPrayed: true,
    }

    setIntentions((prev) => [newInt, ...prev])
    setNewText('')
    setNewAuthor('')
    setIsPosting(false)
    addToast({
      message: 'Sua intenção de oração foi partilhada com a comunidade.',
      variant: 'success',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-graphite-900">
            Comunhão dos Santos
          </h2>
          <p className="text-sm text-graphite-600 font-sans">
            “Onde dois ou três estiverem reunidos em meu nome, ali estou Eu no meio deles” (Mt 18, 20).
          </p>
        </div>

        <Button
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsPosting(!isPosting)}
        >
          {isPosting ? 'Fechar' : 'Pedir Oração'}
        </Button>
      </div>

      {/* Share Intention Form */}
      {isPosting && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAddIntention}
          className="p-5 rounded-card bg-ivory-100 border border-ivory-200 shadow-card space-y-3"
        >
          <h3 className="text-base font-serif font-bold text-graphite-900">
            Partilhe sua Intenção de Oração
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Seu nome (ou deixe vazio para anônimo)"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="px-3 py-2 text-sm rounded-card border border-ivory-200 bg-ivory-50 text-graphite-900 focus:outline-none focus:ring-2 focus:ring-gold"
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="px-3 py-2 text-sm rounded-card border border-ivory-200 bg-ivory-50 text-graphite-900"
            >
              <option value="health">Saúde e Cura</option>
              <option value="family">Família e Matrimônio</option>
              <option value="vocations">Vocações e Igreja</option>
              <option value="conversion">Conversão e Paz</option>
              <option value="thanksgiving">Ação de Graças</option>
            </select>
          </div>

          <textarea
            placeholder="Descreva a sua intenção de oração com sinceridade de coração..."
            rows={3}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-card border border-ivory-200 bg-ivory-50 text-graphite-900 focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsPosting(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" size="sm">
              Publicar Intenção
            </Button>
          </div>
        </motion.form>
      )}

      {/* Intentions Feed */}
      <div className="space-y-4">
        {intentions.map((item) => {
          const categoryMeta = CATEGORY_LABELS[item.category]

          return (
            <Card
              key={item.id}
              padding="md"
              className="border border-ivory-200 space-y-3 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gold/20 text-gold-dark font-serif font-bold flex items-center justify-center text-xs">
                    {item.authorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-graphite-900">
                      {item.authorName}
                    </h4>
                    {item.city && (
                      <p className="text-[11px] text-graphite-400">{item.city} • {item.createdAt}</p>
                    )}
                  </div>
                </div>

                <Badge variant={categoryMeta.variant}>{categoryMeta.label}</Badge>
              </div>

              <p className="text-sm text-graphite-800 leading-relaxed font-sans">
                {item.text}
              </p>

              <div className="pt-2 border-t border-ivory-200/80 flex items-center justify-between">
                <span className="text-xs text-graphite-400">
                  <strong className="text-graphite-700 font-semibold">
                    {item.prayedCount}
                  </strong>{' '}
                  {item.prayedCount === 1 ? 'pessoa rezou' : 'pessoas rezaram'}
                </span>

                <Button
                  size="sm"
                  variant={item.hasPrayed ? 'primary' : 'secondary'}
                  leftIcon={
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        item.hasPrayed ? 'fill-current' : ''
                      }`}
                    />
                  }
                  onClick={() => handlePray(item.id)}
                >
                  {item.hasPrayed ? 'Você está rezando' : 'Rezo por você'}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
