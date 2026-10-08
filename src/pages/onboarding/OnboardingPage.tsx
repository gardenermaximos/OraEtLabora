import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Check, Shield, Sun } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useSessionStore } from '@/store/useSessionStore'
import { ROUTES } from '@/constants/routes'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedGoal, setSelectedGoal] = useState('daily_prayer')
  const { setOnboarded } = useSessionStore()
  const navigate = useNavigate()

  const handleFinish = () => {
    setOnboarded(true)
    navigate(ROUTES.HOME)
  }

  return (
    <div className="min-h-screen bg-ivory-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-pill transition-all ${
                s === step
                  ? 'w-8 bg-gold'
                  : s < step
                    ? 'w-4 bg-gold-dark'
                    : 'w-4 bg-ivory-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-5"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-gold-dark font-serif font-bold text-3xl shadow-md">
              <span>✠</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-graphite-900">
                Ora et Labora
              </h1>
              <p className="text-sm text-graphite-600 max-w-sm mx-auto leading-relaxed">
                “Orai sem cessar e santificai o trabalho de cada dia para a glória de Deus.”
              </p>
            </div>

            <Card padding="md" className="border border-ivory-200 text-left space-y-3">
              <div className="flex items-start gap-3">
                <Sun className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-graphite-900">
                    Rotina Espiritual no Ritmo da Igreja
                  </h4>
                  <p className="text-xs text-graphite-600">
                    Acompanhe o tempo litúrgico, santos do dia e o relógio das Horas canônicas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-graphite-900">
                    Tradição e Latim
                  </h4>
                  <p className="text-xs text-graphite-600">
                    Orações históricas com traduções precisas e áudio sacro.
                  </p>
                </div>
              </div>
            </Card>

            <Button
              className="w-full"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setStep(2)}
            >
              Iniciar Caminhada
            </Button>
          </motion.div>
        )}

        {/* Step 2: Goal */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-serif font-bold text-graphite-900">
                Qual o seu propósito espiritual?
              </h2>
              <p className="text-xs text-graphite-600">
                Podemos adaptar sua rotina de orações e lembretes diários.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 'daily_prayer',
                  title: 'Constância na Oração Diária',
                  desc: 'Rezar a oração da manhã, Ângelus e noite com fidelidade.',
                },
                {
                  id: 'rosary',
                  title: 'Devoção ao Santo Terço',
                  desc: 'Aprofundar a meditação diária dos Mistérios de Cristo.',
                },
                {
                  id: 'work_sanctification',
                  title: 'Santificação do Trabalho',
                  desc: 'Oferecer as tarefas do dia a Deus sem dispersão ou reclamações.',
                },
              ].map((g) => (
                <div
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`p-4 rounded-card border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    selectedGoal === g.id
                      ? 'border-gold bg-gold/15 shadow-xs'
                      : 'border-ivory-200 bg-ivory-100 hover:bg-ivory-200'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-semibold text-graphite-900">
                      {g.title}
                    </h4>
                    <p className="text-xs text-graphite-600">{g.desc}</p>
                  </div>
                  {selectedGoal === g.id && (
                    <Check className="w-4 h-4 text-gold-dark shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button
                className="flex-1"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => setStep(3)}
              >
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Blessing & Start */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-5"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-graphite-900">
                Tudo Pronto!
              </h2>
              <p className="text-sm text-graphite-600 max-w-sm mx-auto leading-relaxed">
                “Que em todas as coisas seja Deus glorificado!”
                <br />
                <span className="text-xs font-serif italic text-graphite-400">
                  (Regra de São Bento, cap. 57)
                </span>
              </p>
            </div>

            <Button className="w-full" size="lg" onClick={handleFinish}>
              Entrar no Ora et Labora
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
