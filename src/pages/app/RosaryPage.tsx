import { useState, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ROSARY_GROUPS, type RosaryMystery } from '@/data/rosaryData'
import { useToastStore } from '@/store/useToastStore'

// Sugere o mistério de acordo com o dia da semana
function getDefaultMysteryId(): 'joyful' | 'luminous' | 'sorrowful' | 'glorious' {
  const day = new Date().getDay()
  if (day === 1 || day === 6) return 'joyful' // Segunda e Sábado
  if (day === 4) return 'luminous' // Quinta
  if (day === 2 || day === 5) return 'sorrowful' // Terça e Sexta
  return 'glorious' // Quarta e Domingo
}

export default function RosaryPage() {
  const [selectedGroupId, setSelectedGroupId] = useState<'joyful' | 'luminous' | 'sorrowful' | 'glorious'>(
    getDefaultMysteryId,
  )
  const [currentMysteryIndex, setCurrentMysteryIndex] = useState(0) // 0 a 4 (5 mistérios)
  const [currentBead, setCurrentBead] = useState(0) // 0 = Pai Nosso, 1..10 = Ave Marias, 11 = Glória / Jaculatória
  const [language, setLanguage] = useState<'pt' | 'la'>('pt')

  const { addToast } = useToastStore()

  const currentGroup = useMemo(
    () => ROSARY_GROUPS.find((g) => g.id === selectedGroupId) ?? ROSARY_GROUPS[0],
    [selectedGroupId],
  )
  const activeMystery: RosaryMystery = currentGroup.mysteries[currentMysteryIndex]

  const handleNextBead = () => {
    if (currentBead < 11) {
      setCurrentBead((prev) => prev + 1)
    } else {
      // Avança para o próximo mistério se houver
      if (currentMysteryIndex < 4) {
        setCurrentMysteryIndex((prev) => prev + 1)
        setCurrentBead(0)
        addToast({
          message: `Iniciando o ${currentMysteryIndex + 2}º Mistério!`,
          variant: 'info',
        })
      } else {
        addToast({
          message: 'Santo Terço concluído para a glória de Deus e triunfo da Virgem Maria!',
          variant: 'success',
        })
      }
    }
  }

  const handlePrevBead = () => {
    if (currentBead > 0) {
      setCurrentBead((prev) => prev - 1)
    } else if (currentMysteryIndex > 0) {
      setCurrentMysteryIndex((prev) => prev - 1)
      setCurrentBead(11)
    }
  }

  const handleReset = () => {
    setCurrentMysteryIndex(0)
    setCurrentBead(0)
    addToast({ message: 'Terço reiniciado.', variant: 'info' })
  }

  const getBeadLabel = () => {
    if (currentBead === 0) return language === 'la' ? 'Pater Noster (Pai Nosso)' : 'Pai Nosso'
    if (currentBead >= 1 && currentBead <= 10)
      return `${language === 'la' ? 'Ave Maria' : 'Ave Maria'} (${currentBead}/10)`
    return language === 'la' ? 'Gloria Patri & O mi Iesu' : 'Glória ao Pai & Jaculatória de Fátima'
  }

  const getPrayerText = () => {
    if (currentBead === 0) {
      return language === 'la'
        ? 'Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum cotidianum da nobis hodie, et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.'
        : 'Pai nosso, que estais nos céus, santificado seja o vosso nome. Venha a nós o vosso reino. Seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.'
    }
    if (currentBead >= 1 && currentBead <= 10) {
      return language === 'la'
        ? 'Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen.'
        : 'Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora de nossa morte. Amém.'
    }
    return language === 'la'
      ? 'Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.\n\nO mi Iesu, dimitte nobis debita nostra, libera nos ab igne inferni, perduc in caelum omnes animas, praesertim eas quae misericordiae tuae maxime indigent.'
      : 'Glória ao Pai, e ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.\n\nÓ meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem da Vossa misericórdia.'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-graphite-900">
            Santo Terço Mariano
          </h2>
          <p className="text-sm text-graphite-600 font-sans">
            Meditação dos mistérios da salvação acompanhando a Virgem Maria.
          </p>
        </div>

        {/* Language selector */}
        <div className="flex rounded-card border border-ivory-200 bg-ivory-100 p-1 self-start">
          <button
            type="button"
            onClick={() => setLanguage('pt')}
            className={`px-3 py-1 text-xs font-medium rounded-card transition-all ${
              language === 'pt' ? 'bg-gold text-white shadow-xs' : 'text-graphite-600'
            }`}
          >
            Português
          </button>
          <button
            type="button"
            onClick={() => setLanguage('la')}
            className={`px-3 py-1 text-xs font-medium rounded-card transition-all ${
              language === 'la' ? 'bg-gold text-white shadow-xs' : 'text-graphite-600'
            }`}
          >
            Latim
          </button>
        </div>
      </div>

      {/* Mystery Group Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {ROSARY_GROUPS.map((grp) => (
          <button
            key={grp.id}
            type="button"
            onClick={() => {
              setSelectedGroupId(grp.id)
              setCurrentMysteryIndex(0)
              setCurrentBead(0)
            }}
            className={`px-3.5 py-1.5 rounded-pill text-xs font-medium whitespace-nowrap transition-all border ${
              selectedGroupId === grp.id
                ? 'bg-gold/20 border-gold text-gold-dark font-semibold shadow-xs'
                : 'bg-ivory-100 border-ivory-200 text-graphite-600 hover:bg-ivory-200'
            }`}
          >
            {grp.name}
          </button>
        ))}
      </div>

      {/* Active Mystery Card */}
      <Card padding="lg" className="border border-gold/30 space-y-4 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Badge variant="liturgical">Dezena {currentMysteryIndex + 1} de 5</Badge>
          <span className="text-xs text-graphite-400 font-mono">
            {currentGroup.days}
          </span>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-graphite-900 leading-snug">
            {activeMystery.title}
          </h3>
          <p className="text-xs font-mono text-gold-dark mt-0.5">
            {activeMystery.fruit}
          </p>
        </div>

        <blockquote className="p-3.5 rounded-card bg-ivory-50 border-l-3 border-gold text-sm font-serif italic text-graphite-800">
          {activeMystery.scripture}
        </blockquote>

        <p className="text-xs text-graphite-600 leading-relaxed font-sans">
          {activeMystery.reflection}
        </p>
      </Card>

      {/* Interactive Rosary Beads Progression */}
      <Card padding="md" className="border border-ivory-200 space-y-4">
        {/* Beads Progress Visualizer */}
        <div className="flex items-center justify-between gap-1.5 py-2 overflow-x-auto">
          {/* Pai Nosso Bead */}
          <button
            type="button"
            onClick={() => setCurrentBead(0)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-serif transition-transform ${
              currentBead === 0
                ? 'bg-gold text-white scale-110 shadow-sm ring-2 ring-gold/40'
                : currentBead > 0
                  ? 'bg-emerald-600 text-white'
                  : 'bg-ivory-200 text-graphite-600'
            }`}
            title="Pai Nosso"
          >
            P
          </button>

          <span className="w-2 h-0.5 bg-ivory-200" />

          {/* 10 Ave Maria Beads */}
          {Array.from({ length: 10 }).map((_, i) => {
            const beadIndex = i + 1
            const isCompleted = currentBead > beadIndex
            const isCurrent = currentBead === beadIndex

            return (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentBead(beadIndex)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono transition-transform ${
                  isCurrent
                    ? 'bg-gold text-white scale-125 shadow-sm ring-2 ring-gold/40'
                    : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-ivory-200 text-graphite-600'
                }`}
                title={`Ave Maria ${beadIndex}`}
              >
                {beadIndex}
              </button>
            )
          })}

          <span className="w-2 h-0.5 bg-ivory-200" />

          {/* Glória Bead */}
          <button
            type="button"
            onClick={() => setCurrentBead(11)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-serif transition-transform ${
              currentBead === 11
                ? 'bg-gold text-white scale-110 shadow-sm ring-2 ring-gold/40'
                : 'bg-ivory-200 text-graphite-600'
            }`}
            title="Glória ao Pai"
          >
            G
          </button>
        </div>

        {/* Current Bead Text Box */}
        <div className="p-4 rounded-card bg-ivory-50 border border-ivory-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-serif font-bold tracking-wider text-gold-dark">
              {getBeadLabel()}
            </span>
            <span className="text-[11px] font-mono text-graphite-400">
              Conta {currentBead === 0 ? 'Inicial' : currentBead === 11 ? 'Final' : `${currentBead} de 10`}
            </span>
          </div>

          <p className="font-serif text-base sm:text-lg text-graphite-900 leading-relaxed whitespace-pre-line">
            {getPrayerText()}
          </p>
        </div>

        {/* Navigation Steppers */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={handleReset}
          >
            Reiniciar
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<ChevronLeft className="w-4 h-4" />}
              onClick={handlePrevBead}
              disabled={currentMysteryIndex === 0 && currentBead === 0}
            >
              Anterior
            </Button>

            <Button
              size="md"
              rightIcon={<ChevronRight className="w-4 h-4" />}
              onClick={handleNextBead}
            >
              {currentBead === 11 && currentMysteryIndex === 4
                ? 'Concluir Terço'
                : currentBead === 11
                  ? 'Próximo Mistério'
                  : 'Próxima Conta'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
