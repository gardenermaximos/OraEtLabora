import { useState } from 'react'
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToastStore } from '@/store/useToastStore'

interface ExaminationPoint {
  id: string
  commandment: string
  questions: string[]
}

const EXAMINATION_POINTS: ExaminationPoint[] = [
  {
    id: 'cmd-1',
    commandment: '1º Amar a Deus sobre todas as coisas',
    questions: [
      'Deixei de rezar hoje ou rezei de maneira apressada e distraída?',
      'Coloquei o trabalho, redes sociais ou vaidade acima do amor a Deus?',
      'Duvidei da Providência Divina perante as dificuldades?',
    ],
  },
  {
    id: 'cmd-2',
    commandment: '2º Não tomar Seu Santo Nome em vão',
    questions: [
      'Pronunciei o Nome de Deus, de Jesus ou de Maria sem respeito ou na ira?',
      'Jurei sem necessidade ou quebrei promessas feitas a Deus?',
    ],
  },
  {
    id: 'cmd-3',
    commandment: '4º e 5º Honrar pai e mãe e não matar',
    questions: [
      'Fui impaciente, grosseiro ou causei tristeza a meus pais, cônjuge ou filhos?',
      'Alimentei rancor, ódio, vingança ou julguei o próximo com severidade?',
      'Causei escândalo ou incitei alguém a pecar por palavras ou atitudes?',
    ],
  },
  {
    id: 'cmd-4',
    commandment: '6º e 9º Pureza de coração e castidade',
    questions: [
      'Alimentei pensamentos, conversas ou olhei imagens impróprias?',
      'Fui vigilante nos sentidos e fiel à modéstia cristã no uso da internet?',
    ],
  },
  {
    id: 'cmd-5',
    commandment: '7º e 8º Justiça, verdade e caridade',
    questions: [
      'Disse mentiras, fofocas ou difamei a reputação de alguém?',
      'Trabalhei com desleixo ou desperdicei tempo no horário de serviço?',
      'Neguei ajuda a alguém necessitado que esteve ao meu alcance?',
    ],
  },
]

export default function ExaminationPage() {
  const [currentStep, setCurrentStep] = useState(1) // 1..5
  const [checkedPoints, setCheckedPoints] = useState<Record<string, boolean>>({})
  const { addToast } = useToastStore()

  const togglePoint = (key: string) => {
    setCheckedPoints((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleFinish = () => {
    addToast({
      message: 'Exame de consciência concluído. Que a paz de Cristo repouse em sua alma!',
      variant: 'success',
    })
    setCurrentStep(1)
    setCheckedPoints({})
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-graphite-900">
          Exame de Consciência
        </h2>
        <p className="text-sm text-graphite-600 font-sans">
          Oração da noite e preparação espiritual para uma santa confissão.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
        {[
          { num: 1, label: 'Gratidão' },
          { num: 2, label: 'Luz' },
          { num: 3, label: 'Revisão' },
          { num: 4, label: 'Contrição' },
          { num: 5, label: 'Propósito' },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setCurrentStep(s.num)}
            className={`flex flex-col items-center gap-1 text-center transition-all ${
              currentStep === s.num
                ? 'text-gold-dark font-bold'
                : currentStep > s.num
                  ? 'text-emerald-700'
                  : 'text-graphite-400'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-all ${
                currentStep === s.num
                  ? 'bg-gold text-white shadow-sm ring-2 ring-gold/30'
                  : currentStep > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-ivory-200 text-graphite-600'
              }`}
            >
              {s.num}
            </div>
            <span className="text-[11px] hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Step 1: Ação de Graças */}
      {currentStep === 1 && (
        <Card padding="lg" className="border border-gold/30 space-y-4">
          <Badge variant="liturgical">1º Passo: Ação de Graças</Badge>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-graphite-900">
            Reconhecer as Bênçãos do Dia
          </h3>
          <p className="text-sm text-graphite-700 leading-relaxed font-sans">
            Coloque-se em silêncio diante da presença de Deus. Recorde os dons que o Senhor lhe concedeu hoje: a vida, a saúde, o pão, o trabalho, os encontros com a família e irmãos, e até as cruzes que o ajudaram a amadurecer.
          </p>
          <blockquote className="p-4 rounded-card bg-ivory-50 border-l-4 border-gold text-sm font-serif italic text-graphite-800">
            “Que darei eu ao Senhor por todos os benefícios que me tem feito? Tomarei o cálice da salvação e invocarei o nome do Senhor!” (Sl 115, 12).
          </blockquote>
          <div className="flex justify-end pt-2">
            <Button
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setCurrentStep(2)}
            >
              Pedir a Luz de Deus
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Pedir Luz */}
      {currentStep === 2 && (
        <Card padding="lg" className="border border-gold/30 space-y-4">
          <Badge variant="liturgical">2º Passo: Petição de Luz</Badge>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-graphite-900">
            Suplicar a Graça do Espírito Santo
          </h3>
          <p className="text-sm text-graphite-700 leading-relaxed font-sans">
            Sem a luz divina, o coração humano facilmente se engana e justifica as próprias faltas. Peça a Deus coragem e transparência para enxergar sua alma com a sinceridade da verdade.
          </p>
          <div className="p-4 rounded-card bg-ivory-50 border border-ivory-200 text-sm font-serif italic text-graphite-800 space-y-2">
            <p className="font-semibold not-italic text-gold-dark font-sans text-xs uppercase tracking-wider">
              Oração ao Espírito Santo
            </p>
            <p>
              “Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor. Iluminai a minha mente para que eu reconheça as minhas fraquezas, chore os meus pecados e me una com amor renovado a Cristo Jesus.”
            </p>
          </div>
          <div className="flex justify-between pt-2">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setCurrentStep(1)}
            >
              Voltar
            </Button>
            <Button
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setCurrentStep(3)}
            >
              Revisar as Ações
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Revisão das Ações */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <Card padding="md" className="border border-gold/30 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="liturgical">3º Passo: Revisão do Dia</Badge>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Totalmente privado no aparelho</span>
              </div>
            </div>
            <p className="text-xs text-graphite-600">
              Assinale os pontos onde você percebe que vacilou ou pecou hoje, para pedir perdão e, se grave, levar ao sacramento da Confissão:
            </p>
          </Card>

          <div className="space-y-3">
            {EXAMINATION_POINTS.map((group) => (
              <div
                key={group.id}
                className="p-4 rounded-card bg-ivory-100 border border-ivory-200 space-y-2.5 shadow-xs"
              >
                <h4 className="text-sm font-serif font-bold text-graphite-900 border-b border-ivory-200 pb-1.5">
                  {group.commandment}
                </h4>

                <div className="space-y-2">
                  {group.questions.map((q, idx) => {
                    const key = `${group.id}-${idx}`
                    const isChecked = !!checkedPoints[key]

                    return (
                      <div
                        key={key}
                        onClick={() => togglePoint(key)}
                        className={`flex items-start gap-2.5 p-2 rounded-card text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-red-500/10 text-red-900 border border-red-500/20'
                            : 'hover:bg-ivory-200/50 text-graphite-700'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 shrink-0 text-graphite-400 focus:outline-none"
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-red-600 fill-red-100" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>
                        <span className="leading-snug">{q}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setCurrentStep(2)}
            >
              Voltar
            </Button>
            <Button
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setCurrentStep(4)}
            >
              Rezar a Contrição
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Dor dos Pecados */}
      {currentStep === 4 && (
        <Card padding="lg" className="border border-gold/30 space-y-4">
          <Badge variant="liturgical">4º Passo: Dor dos Pecados</Badge>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-graphite-900">
            A Dor Sincera do Coração
          </h3>
          <p className="text-sm text-graphite-700 leading-relaxed font-sans">
            A verdadeira dor dos pecados não é medo do castigo ou orgulho ferido pelas próprias quedas, mas a tristeza de ter ofendido a um Pai tão bom, e a Cristo crucificado que nos amou até a morte.
          </p>
          <blockquote className="p-4 rounded-card bg-ivory-50 border-l-4 border-gold text-sm font-serif italic text-graphite-800">
            “Cria em mim, ó Deus, um coração puro, e renova em mim um espírito reto. Um coração quebrantado e contrito não desprezareis, ó Deus!” (Sl 50, 12.19).
          </blockquote>
          <div className="flex justify-between pt-2">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setCurrentStep(3)}
            >
              Voltar
            </Button>
            <Button
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setCurrentStep(5)}
            >
              Fazer Ato de Contrição
            </Button>
          </div>
        </Card>
      )}

      {/* Step 5: Ato de Contrição e Propósito */}
      {currentStep === 5 && (
        <Card padding="lg" className="border border-gold/30 space-y-4">
          <Badge variant="liturgical">5º Passo: Propósito e Oração</Badge>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-graphite-900">
            Ato de Contrição e Propósito Firme
          </h3>
          <p className="text-sm text-graphite-700 leading-relaxed font-sans">
            Faça a resolução de evitar as ocasiões próximas de pecado no dia de amanhã e reze com fé profunda:
          </p>

          <div className="p-4 rounded-card bg-gold/10 border border-gold/30 space-y-3">
            <span className="text-xs font-bold uppercase font-mono tracking-wider text-gold-dark block">
              Ato de Contrição
            </span>
            <p className="font-serif text-base sm:text-lg text-graphite-900 leading-relaxed">
              “Meu Deus, eu me arrependo de todo o coração de todos os meus pecados, e os detesto, porque pecando ofendi a Vós, sumo Bem e digno de ser amado sobre todas as coisas. Proponho firmemente, com a ajuda da Vossa divina graça, nunca mais pecar, confessar-me e cumprir a penitência. Meu Jesus, misericórdia!”
            </p>
          </div>

          <div className="flex justify-between pt-2">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setCurrentStep(4)}
            >
              Voltar
            </Button>
            <Button
              size="md"
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={handleFinish}
            >
              Concluir Exame da Noite
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
