import { useState, useMemo } from 'react'
import {
  Sun,
  Sunset,
  Moon,
  Sparkles,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToastStore } from '@/store/useToastStore'

interface CanonicalHour {
  id: string
  name: string
  latinName: string
  timeRange: string
  meaning: string
  icon: typeof Sun
  hymn: string
  psalm: string
  reading: string
  canticle?: {
    name: string
    latinName: string
    text: string
  }
  prayer: string
}

const CANONICAL_HOURS: CanonicalHour[] = [
  {
    id: 'matins',
    name: 'Ofício das Leituras',
    latinName: 'Matutinum',
    timeRange: '04:00 – 06:00',
    meaning: 'Vigília nas primeiras horas do dia, meditando a Lei do Senhor no silêncio da noite.',
    icon: Moon,
    hymn: 'No silêncio da noite escura, vigiamos esperando o Senhor que vem como o sol nascente.',
    psalm: 'Salmo 94: “Vinde, exultemos no Senhor, aclamemos o Rochedo da nossa salvação!”',
    reading: '1Ts 5, 5-6: “Vós todos sois filhos da luz e filhos do dia. Não somos da noite nem das trevas.”',
    prayer: 'Senhor Deus onipotente, que nos fizestes chegar ao romper deste dia, guardai-nos com o Vosso poder para que hoje não caiamos em pecado.',
  },
  {
    id: 'lauds',
    name: 'Laudes (Oração da Manhã)',
    latinName: 'Laudes',
    timeRange: '06:00 – 09:00',
    meaning: 'Consagração das primícias do dia à Ressurreição de Jesus Cristo, Sol da Justiça.',
    icon: Sun,
    hymn: 'Surge a luz de um novo dia, louvemos a Deus criador que nos renova a vida e a esperança.',
    psalm: 'Salmo 62: “Ó Deus, Vós sois o meu Deus, com ardor Vos procuro; a minha alma tem sede de Vós.”',
    reading: 'Rm 13, 11-12: “Já é hora de acordardes do sono, porque a salvação está agora mais perto de nós.”',
    canticle: {
      name: 'Cântico de Zacarias (Benedictus)',
      latinName: 'Canticum Zachariae',
      text: '“Bendito seja o Senhor, Deus de Israel, porque visitou e redimiu o seu povo... Pelo entranhado amor do nosso Deus, com que nos há de visitar o Sol que nasce do alto, para iluminar os que jazem nas trevas e na sombra da morte e guiar nossos passos pelo caminho da paz.”',
    },
    prayer: 'Senhor Jesus, Luz do mundo, fazei resplandecer sobre nós a Vossa graça e dirigi nossos passos neste dia.',
  },
  {
    id: 'terce',
    name: 'Hora Terça',
    latinName: 'Tertia',
    timeRange: '09:00 – 12:00',
    meaning: 'Comemoração da descida do Espírito Santo sobre os Apóstolos no Cenáculo.',
    icon: Sun,
    hymn: 'Vinde, Espírito Criador, iluminai a nossa mente e abrasai o nosso coração no Vosso amor.',
    psalm: 'Salmo 118: “Ensina-me, Senhor, o caminho das tuas leis, e eu o seguirei até ao fim.”',
    reading: '1Jo 4, 16: “Deus é amor: quem permanece no amor, permanece em Deus e Deus nele.”',
    prayer: 'Enviai, Senhor, o Vosso Santo Espírito sobre os nossos labores para que sejam fecundos em santidade.',
  },
  {
    id: 'sext',
    name: 'Hora Sexta (Ângelus)',
    latinName: 'Sexta',
    timeRange: '12:00 – 15:00',
    meaning: 'Meio-dia: pausa sagrada que recorda Jesus pregado na Cruz no Calvário e a Encarnação.',
    icon: Sun,
    hymn: 'Pausa no calor da jornada: elevamos as mãos em ação de graças e união à Cruz do Senhor.',
    psalm: 'Salmo 122: “A vós levanto os meus olhos, a vós que habitais nos céus.”',
    reading: '1Ts 5, 21-22: “Examinai tudo e abraçai o que é bom. Guardai-vos de toda a espécie de mal.”',
    canticle: {
      name: 'Ângelus',
      latinName: 'Angelus Domini',
      text: '“O Anjo do Senhor anunciou a Maria, e Ela concebeu do Espírito Santo... Eis aqui a serva do Senhor: faça-se em mim segundo a vossa palavra.”',
    },
    prayer: 'Derramai, Senhor, a vossa graça em nossos corações para que, conhecendo a Encarnação de Cristo, cheguemos à glória da Ressurreição.',
  },
  {
    id: 'none',
    name: 'Hora Noa',
    latinName: 'Nona',
    timeRange: '15:00 – 18:00',
    meaning: 'Hora da Misericórdia: momento em que Jesus expirou na Cruz redimindo o gênero humano.',
    icon: Sunset,
    hymn: 'Ó Deus eterno, criador da luz, perante a Cruz de Cristo entregamos o cansaço do dia.',
    psalm: 'Salmo 125: “Os que semeiam em lágrimas, ceifarão com alegria.”',
    reading: '1Cor 6, 20: “Fostes comprados por alto preço. Glorificai, pois, a Deus no vosso corpo.”',
    prayer: 'Senhor Jesus Cristo, que na hora nona entregastes o vosso espírito nas mãos do Pai, acolhei nossa vida em oblação de amor.',
  },
  {
    id: 'vespers',
    name: 'Vésperas (Oração da Tarde)',
    latinName: 'Vesperae',
    timeRange: '18:00 – 21:00',
    meaning: 'Ação de graças no declinar do dia pela obra da Criação e da Redenção.',
    icon: Sunset,
    hymn: 'Já o sol declina no horizonte; acendemos a lâmpada do louvor perante a Trindade Santíssima.',
    psalm: 'Salmo 140: “Suba a minha oração como incenso diante de Vós; as minhas mãos erguidas como oferenda da tarde.”',
    reading: '2Cor 1, 3-4: “Bendito seja Deus, Pai das misericórdias e Deus de toda a consolação.”',
    canticle: {
      name: 'Cântico da Virgem Maria (Magnificat)',
      latinName: 'Magnificat',
      text: '“A minha alma glorifica ao Senhor e o meu espírito se alegra em Deus meu Salvador. Porque pôs os olhos na humildade da sua serva... Santo é o seu nome!”',
    },
    prayer: 'Ficai conosco, Senhor, porque a noite vem caindo e o dia já declina. Sede a nossa luz perene.',
  },
  {
    id: 'compline',
    name: 'Completas (Oração da Noite)',
    latinName: 'Completorium',
    timeRange: '21:00 – 04:00',
    meaning: 'Última oração antes do repouso noturno, com exame de consciência e entrega confiante.',
    icon: Moon,
    hymn: 'Antes que a luz desapareça, nós Vos rogamos, ó Criador, guardai-nos sob a Vossa custódia.',
    psalm: 'Salmo 90: “Aos seus anjos Ele dará ordens a teu respeito, para que te guardem em todos os teus caminhos.”',
    reading: '1Pd 5, 8-9: “Sede sóbrios e vigilantes. O vosso adversário, o diabo, ronda como leão a rugir, procurando a quem devorar. Resisti-lhe firmes na fé.”',
    canticle: {
      name: 'Cântico de Simeão (Nunc Dimittis)',
      latinName: 'Nunc Dimittis',
      text: '“Agora, Senhor, podeis deixar partir em paz o vosso servo, segundo a vossa palavra; porque os meus olhos viram a vossa salvação.”',
    },
    prayer: 'Dai-nos, Senhor, uma noite tranquila e um fim perfeito. Que o repouso repare nossas forças para servir-Vos ao amanhecer.',
  },
]

function getCurrentHourId(): string {
  const h = new Date().getHours()
  if (h >= 4 && h < 6) return 'matins'
  if (h >= 6 && h < 9) return 'lauds'
  if (h >= 9 && h < 12) return 'terce'
  if (h >= 12 && h < 15) return 'sext'
  if (h >= 15 && h < 18) return 'none'
  if (h >= 18 && h < 21) return 'vespers'
  return 'compline'
}

export default function HoursClockPage() {
  const currentHourId = useMemo(() => getCurrentHourId(), [])
  const [selectedHourId, setSelectedHourId] = useState<string>(currentHourId)
  const { addToast } = useToastStore()

  const activeHour =
    CANONICAL_HOURS.find((h) => h.id === selectedHourId) ?? CANONICAL_HOURS[1]

  const handlePrayHour = () => {
    addToast({
      message: `Você rezou as ${activeHour.name}. Que o Senhor acolha seu louvor!`,
      variant: 'success',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-graphite-900">
          Relógio das Horas Canônicas
        </h2>
        <p className="text-sm text-graphite-600 font-sans">
          Liturgia das Horas (Horarium Beneditino) para santificar cada período do dia em união à Igreja Universal.
        </p>
      </div>

      {/* Horarium Timeline Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CANONICAL_HOURS.map((h) => {
          const isSelected = selectedHourId === h.id
          const isNow = currentHourId === h.id
          const Icon = h.icon

          return (
            <button
              key={h.id}
              type="button"
              onClick={() => setSelectedHourId(h.id)}
              className={`p-3 rounded-card border min-w-[130px] flex flex-col text-left transition-all relative ${
                isSelected
                  ? 'border-gold bg-gold/15 shadow-sm'
                  : 'border-ivory-200 bg-ivory-100 hover:bg-ivory-200'
              }`}
            >
              {isNow && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              )}
              <div className="flex items-center gap-1.5 text-xs text-graphite-400 mb-1">
                <Icon className="w-3.5 h-3.5 text-gold-dark" />
                <span className="font-mono text-[10px]">{h.timeRange}</span>
              </div>
              <span className="text-xs font-serif font-bold text-graphite-900 leading-tight">
                {h.name}
              </span>
              <span className="text-[10px] font-serif italic text-graphite-400">
                {h.latinName}
              </span>
            </button>
          )
        })}
      </div>

      {/* Selected Hour Details */}
      <Card padding="lg" className="border border-gold/30 space-y-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ivory-200/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-serif font-bold text-graphite-900">
                {activeHour.name}
              </h3>
              <Badge variant="liturgical">{activeHour.latinName}</Badge>
            </div>
            <p className="text-xs text-graphite-600 font-sans mt-0.5">
              {activeHour.meaning}
            </p>
          </div>

          <span className="text-xs font-mono font-medium text-gold-dark bg-gold/10 px-3 py-1 rounded-pill self-start sm:self-auto">
            {activeHour.timeRange}
          </span>
        </div>

        {/* Hino */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase font-mono tracking-wider text-gold-dark">
            Hino
          </span>
          <p className="font-serif italic text-sm text-graphite-800 leading-relaxed bg-ivory-50 p-3 rounded-card border border-ivory-200">
            {activeHour.hymn}
          </p>
        </div>

        {/* Salmo */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase font-mono tracking-wider text-gold-dark">
            Salmodia
          </span>
          <p className="font-serif text-sm text-graphite-800 leading-relaxed bg-ivory-50 p-3 rounded-card border border-ivory-200">
            {activeHour.psalm}
          </p>
        </div>

        {/* Leitura Breve */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase font-mono tracking-wider text-gold-dark">
            Leitura Breve da Palavra
          </span>
          <p className="font-sans text-sm text-graphite-800 leading-relaxed bg-ivory-50 p-3 rounded-card border border-ivory-200">
            {activeHour.reading}
          </p>
        </div>

        {/* Cântico Evangélico (se houver) */}
        {activeHour.canticle && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase font-mono tracking-wider text-gold-dark">
                Cântico Evangélico: {activeHour.canticle.name}
              </span>
              <span className="text-[10px] font-serif italic text-graphite-400">
                ({activeHour.canticle.latinName})
              </span>
            </div>
            <blockquote className="font-serif italic text-sm sm:text-base text-graphite-900 leading-relaxed bg-gold/10 p-4 rounded-card border-l-4 border-gold">
              {activeHour.canticle.text}
            </blockquote>
          </div>
        )}

        {/* Oração Conclusiva */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase font-mono tracking-wider text-gold-dark">
            Oração Conclusiva
          </span>
          <p className="font-serif text-sm text-graphite-800 leading-relaxed bg-ivory-50 p-3 rounded-card border border-ivory-200">
            {activeHour.prayer}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <Button
            size="md"
            leftIcon={<Sparkles className="w-4 h-4" />}
            onClick={handlePrayHour}
          >
            Concluir Oração da Hora
          </Button>
        </div>
      </Card>
    </div>
  )
}
