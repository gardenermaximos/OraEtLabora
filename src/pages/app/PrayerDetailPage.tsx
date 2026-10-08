import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Volume2,
  Copy,
  Heart,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PRAYERS } from '@/data/prayersData'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useToastStore } from '@/store/useToastStore'
import { ROUTES } from '@/constants/routes'

export default function PrayerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { play, prayerId: activePrayerId, status: playerStatus } = usePlayerStore()
  const { addToast } = useToastStore()

  const [fontSize, setFontSize] = useState<'base' | 'lg' | 'xl'>('lg')
  const [viewMode, setViewMode] = useState<'bilingual' | 'pt' | 'la'>('bilingual')
  const [isFavorite, setIsFavorite] = useState(false)

  const prayer = PRAYERS.find((p) => p.id === id)

  if (!prayer) {
    return (
      <div className="text-center py-12 space-y-4">
        <h3 className="text-xl font-serif font-bold text-graphite-900">
          Oração não encontrada
        </h3>
        <Button onClick={() => navigate(ROUTES.PRAYERS)}>Voltar para Orações</Button>
      </div>
    )
  }

  const isPlaying = activePrayerId === prayer.id && playerStatus === 'playing'

  const fontClass =
    fontSize === 'base'
      ? 'text-base leading-relaxed'
      : fontSize === 'lg'
        ? 'text-lg leading-relaxed'
        : 'text-xl leading-loose'

  const handleCopy = () => {
    const text = prayer.verses
      .map((v) =>
        viewMode === 'la' && v.latin
          ? v.latin
          : viewMode === 'pt'
            ? v.portuguese
            : `${v.portuguese}\n(${v.latin ?? ''})`,
      )
      .join('\n\n')

    navigator.clipboard.writeText(`${prayer.title}\n\n${text}`)
    addToast({
      message: 'Oração copiada para a área de transferência.',
      variant: 'success',
    })
  }

  return (
    <div className="space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(ROUTES.PRAYERS)}
          className="flex items-center gap-1.5 text-xs font-semibold text-graphite-600 hover:text-graphite-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Tesouro de Orações</span>
        </button>

        {/* Font size zoom controls */}
        <div className="flex items-center gap-1 bg-ivory-100 rounded-card p-1 border border-ivory-200">
          <button
            type="button"
            onClick={() => setFontSize('base')}
            className={`p-1.5 rounded text-xs font-mono transition-colors ${
              fontSize === 'base' ? 'bg-gold text-white' : 'text-graphite-600'
            }`}
            title="Tamanho normal"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => setFontSize('lg')}
            className={`p-1.5 rounded text-xs font-mono font-medium transition-colors ${
              fontSize === 'lg' ? 'bg-gold text-white' : 'text-graphite-600'
            }`}
            title="Tamanho médio"
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => setFontSize('xl')}
            className={`p-1.5 rounded text-xs font-mono font-bold transition-colors ${
              fontSize === 'xl' ? 'bg-gold text-white' : 'text-graphite-600'
            }`}
            title="Tamanho grande"
          >
            A++
          </button>
        </div>
      </div>

      {/* Main Prayer Container */}
      <Card padding="lg" className="border border-gold/30 space-y-6 shadow-card">
        {/* Header */}
        <div className="space-y-2 border-b border-ivory-200 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Badge variant="liturgical">{prayer.category.toUpperCase()}</Badge>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                leftIcon={
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                }
                onClick={() => {
                  setIsFavorite(!isFavorite)
                  addToast({
                    message: !isFavorite
                      ? 'Adicionado aos favoritos!'
                      : 'Removido dos favoritos.',
                    variant: 'info',
                  })
                }}
              >
                {isFavorite ? 'Favorito' : 'Favoritar'}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<Copy className="w-3.5 h-3.5" />}
                onClick={handleCopy}
              >
                Copiar
              </Button>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-graphite-900">
            {prayer.title}
          </h2>
          {prayer.titleLatin && (
            <p className="text-base font-serif italic text-gold-dark">
              {prayer.titleLatin}
            </p>
          )}
          {prayer.description && (
            <p className="text-xs text-graphite-600 font-sans">
              {prayer.description}
            </p>
          )}
        </div>

        {/* View mode toggle */}
        <div className="flex rounded-card border border-ivory-200 bg-ivory-100 p-1 self-start">
          <button
            type="button"
            onClick={() => setViewMode('bilingual')}
            className={`px-3 py-1.5 text-xs font-medium rounded-card transition-all ${
              viewMode === 'bilingual'
                ? 'bg-gold text-white shadow-xs'
                : 'text-graphite-600'
            }`}
          >
            Lado a lado
          </button>
          <button
            type="button"
            onClick={() => setViewMode('pt')}
            className={`px-3 py-1.5 text-xs font-medium rounded-card transition-all ${
              viewMode === 'pt' ? 'bg-gold text-white shadow-xs' : 'text-graphite-600'
            }`}
          >
            Português
          </button>
          <button
            type="button"
            onClick={() => setViewMode('la')}
            className={`px-3 py-1.5 text-xs font-medium rounded-card transition-all ${
              viewMode === 'la' ? 'bg-gold text-white shadow-xs' : 'text-graphite-600'
            }`}
          >
            Latim
          </button>
        </div>

        {/* Verses Container */}
        <div className="space-y-4">
          {prayer.verses.map((verse, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-card transition-colors ${
                viewMode === 'bilingual'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-4 bg-ivory-50 border border-ivory-200/80'
                  : 'bg-ivory-50/50'
              }`}
            >
              {(viewMode === 'bilingual' || viewMode === 'pt') && (
                <div>
                  {viewMode === 'bilingual' && (
                    <span className="text-[10px] uppercase font-mono tracking-wider text-graphite-400 block mb-1">
                      Vernáculo
                    </span>
                  )}
                  <p className={`font-serif text-graphite-900 ${fontClass}`}>
                    {verse.portuguese}
                  </p>
                </div>
              )}

              {(viewMode === 'bilingual' || viewMode === 'la') && verse.latin && (
                <div
                  className={
                    viewMode === 'bilingual'
                      ? 'md:border-l md:border-ivory-200 md:pl-4'
                      : ''
                  }
                >
                  {viewMode === 'bilingual' && (
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gold-dark block mb-1">
                      Latina
                    </span>
                  )}
                  <p
                    className={`font-serif italic text-graphite-700 ${fontClass}`}
                  >
                    {verse.latin}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Audio Player Action */}
        <div className="pt-4 border-t border-ivory-200 flex justify-end">
          <Button
            size="lg"
            leftIcon={<Volume2 className="w-5 h-5" />}
            onClick={() => {
              play(prayer.id, viewMode === 'la' ? 'la' : 'pt')
              addToast({
                message: `Reproduzindo áudio de "${prayer.title}".`,
                variant: 'info',
              })
            }}
          >
            {isPlaying ? 'Áudio em Reprodução' : 'Rezar com Áudio Sacro'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
