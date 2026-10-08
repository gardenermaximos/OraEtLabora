import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  BookOpen,
  Volume2,
  Copy,
  ChevronDown,
  Heart,
  ExternalLink,
} from 'lucide-react'

import { PRAYERS, type PrayerItem } from '@/data/prayersData'
import { Button } from '@/components/ui/Button'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useToastStore } from '@/store/useToastStore'
import { ROUTES, buildPath } from '@/constants/routes'

type CategoryFilter = 'all' | 'daily' | 'marian' | 'saints' | 'rosary' | 'liturgical'
type ViewMode = 'bilingual' | 'pt' | 'la'

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'daily', label: 'Diárias' },
  { id: 'marian', label: 'Marianas' },
  { id: 'saints', label: 'Santos' },
  { id: 'rosary', label: 'Terço' },
  { id: 'liturgical', label: 'Litúrgicas' },
]

export default function PrayersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('bilingual')
  const [expandedPrayerId, setExpandedPrayerId] = useState<string | null>('pater-noster')
  const [favorites, setFavorites] = useState<Record<string, boolean>>({ 'pater-noster': true })

  const { play, prayerId: activePrayerId, status: playerStatus } = usePlayerStore()
  const { addToast } = useToastStore()

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => {
      const next = !prev[id]
      addToast({
        message: next ? 'Oração adicionada aos favoritos.' : 'Oração removida dos favoritos.',
        variant: 'info',
      })
      return { ...prev, [id]: next }
    })
  }

  const copyPrayerText = (prayer: PrayerItem, e: React.MouseEvent) => {
    e.stopPropagation()
    const textToCopy = prayer.verses
      .map((v) => {
        if (viewMode === 'la' && v.latin) return v.latin
        if (viewMode === 'pt') return v.portuguese
        return v.latin ? `${v.portuguese}\n(${v.latin})` : v.portuguese
      })
      .join('\n\n')

    navigator.clipboard.writeText(`${prayer.title}\n\n${textToCopy}`)
    addToast({
      message: 'Texto da oração copiado para a área de transferência.',
      variant: 'success',
    })
  }

  const filteredPrayers = PRAYERS.filter((prayer) => {
    const matchesCategory =
      selectedCategory === 'all' || prayer.category === selectedCategory
    const matchesSearch =
      prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prayer.titleLatin && prayer.titleLatin.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prayer.verses.some(
        (v) =>
          v.portuguese.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (v.latin && v.latin.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header & Description */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-graphite-900">
          Tesouro das Orações
        </h2>
        <p className="text-sm text-graphite-600 font-sans">
          Tradição bimilenar da Igreja Católica em Português e Latim para aprofundar sua vida interior.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite-400" />
            <input
              type="text"
              placeholder="Buscar por título, trecho ou latim..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-card border border-ivory-200 bg-ivory-100 text-sm text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {/* View mode toggle (Bilingual, PT, LA) */}
          <div className="flex rounded-card border border-ivory-200 bg-ivory-100 p-1 self-start shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('bilingual')}
              className={`px-3 py-1.5 text-xs font-medium rounded-card transition-all ${
                viewMode === 'bilingual'
                  ? 'bg-gold text-white shadow-xs'
                  : 'text-graphite-600 hover:text-graphite-900'
              }`}
            >
              Lado a lado
            </button>
            <button
              type="button"
              onClick={() => setViewMode('pt')}
              className={`px-3 py-1.5 text-xs font-medium rounded-card transition-all ${
                viewMode === 'pt'
                  ? 'bg-gold text-white shadow-xs'
                  : 'text-graphite-600 hover:text-graphite-900'
              }`}
            >
              Português
            </button>
            <button
              type="button"
              onClick={() => setViewMode('la')}
              className={`px-3 py-1.5 text-xs font-medium rounded-card transition-all ${
                viewMode === 'la'
                  ? 'bg-gold text-white shadow-xs'
                  : 'text-graphite-600 hover:text-graphite-900'
              }`}
            >
              Latim
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-gold/20 border-gold text-gold-dark font-semibold shadow-xs'
                  : 'bg-ivory-100 border-ivory-200 text-graphite-600 hover:bg-ivory-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prayers List */}
      <div className="space-y-4">
        {filteredPrayers.length === 0 ? (
          <div className="text-center py-12 rounded-card bg-ivory-100 border border-ivory-200 p-6">
            <BookOpen className="w-10 h-10 mx-auto text-graphite-400 mb-2" />
            <p className="text-sm font-medium text-graphite-600">
              Nenhuma oração encontrada com esses critérios.
            </p>
          </div>
        ) : (
          filteredPrayers.map((prayer) => {
            const isExpanded = expandedPrayerId === prayer.id
            const isPlaying = activePrayerId === prayer.id && playerStatus === 'playing'
            const isFav = !!favorites[prayer.id]

            return (
              <motion.div
                key={prayer.id}
                layout
                className="rounded-card bg-ivory-100 border border-ivory-200 overflow-hidden shadow-card transition-all"
              >
                {/* Header Row */}
                <div
                  onClick={() =>
                    setExpandedPrayerId(isExpanded ? null : prayer.id)
                  }
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-ivory-200/40 transition-colors"
                >
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-graphite-900 leading-tight">
                        {prayer.title}
                      </h3>
                      {prayer.titleLatin && (
                        <span className="text-xs font-serif italic text-graphite-400">
                          ({prayer.titleLatin})
                        </span>
                      )}
                      {isFav && (
                        <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      )}
                    </div>
                    {prayer.description && (
                      <p className="text-xs text-graphite-600 line-clamp-1">
                        {prayer.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        play(prayer.id, 'pt')
                        addToast({
                          message: `Iniciando áudio de "${prayer.title}"...`,
                          variant: 'info',
                        })
                      }}
                      className={`p-2 rounded-full border transition-all ${
                        isPlaying
                          ? 'bg-gold text-white border-gold animate-pulse'
                          : 'border-ivory-200 bg-ivory-50 text-gold-dark hover:bg-gold/15'
                      }`}
                      title="Ouvir oração"
                      aria-label="Ouvir oração"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <ChevronDown
                      className={`w-5 h-5 text-graphite-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Prayer Text Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-ivory-200/80 p-4 sm:p-6 bg-ivory-50/70 space-y-4"
                    >
                      <div className="space-y-4">
                        {prayer.verses.map((verse, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-card transition-colors ${
                              viewMode === 'bilingual'
                                ? 'grid grid-cols-1 md:grid-cols-2 gap-3 bg-ivory-100/50'
                                : 'bg-transparent'
                            }`}
                          >
                            {(viewMode === 'bilingual' || viewMode === 'pt') && (
                              <div>
                                {viewMode === 'bilingual' && (
                                  <span className="text-[10px] uppercase font-mono tracking-wider text-graphite-400 block mb-1">
                                    Português
                                  </span>
                                )}
                                <p className="font-serif text-base sm:text-lg text-graphite-800 leading-relaxed">
                                  {verse.portuguese}
                                </p>
                              </div>
                            )}

                            {(viewMode === 'bilingual' || viewMode === 'la') &&
                              verse.latin && (
                                <div
                                  className={
                                    viewMode === 'bilingual'
                                      ? 'md:border-l md:border-ivory-200 md:pl-3'
                                      : ''
                                  }
                                >
                                  {viewMode === 'bilingual' && (
                                    <span className="text-[10px] uppercase font-mono tracking-wider text-gold-dark block mb-1">
                                      Latina
                                    </span>
                                  )}
                                  <p className="font-serif text-base sm:text-lg italic text-graphite-700 leading-relaxed">
                                    {verse.latin}
                                  </p>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>

                      {/* Prayer Card Action Buttons */}
                      <div className="pt-3 border-t border-ivory-200/80 flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            leftIcon={<Copy className="w-3.5 h-3.5" />}
                            onClick={(e) => copyPrayerText(prayer, e)}
                          >
                            Copiar Oração
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={
                              <Heart
                                className={`w-3.5 h-3.5 ${
                                  isFav ? 'fill-red-500 text-red-500' : ''
                                }`}
                              />
                            }
                            onClick={(e) => toggleFavorite(prayer.id, e)}
                          >
                            {isFav ? 'Favoritado' : 'Favoritar'}
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={buildPath(ROUTES.PRAYER_DETAIL, { id: prayer.id })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-pill bg-ivory-200/80 text-graphite-800 hover:bg-ivory-200 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Tela Inteira</span>
                          </Link>

                          <Button
                            size="sm"
                            leftIcon={<Volume2 className="w-3.5 h-3.5" />}
                            onClick={() => {
                              play(prayer.id, viewMode === 'la' ? 'la' : 'pt')
                              addToast({
                                message: `Ouvindo ${prayer.title} em áudio sacro.`,
                                variant: 'info',
                              })
                            }}
                          >
                            Rezar com Áudio
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}
