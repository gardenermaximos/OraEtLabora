import { useState, useRef, useEffect } from 'react'
import {
  Send,
  ShieldAlert,
  Trash2,
  BookOpen,
  Bot,
  User,
} from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { useToastStore } from '@/store/useToastStore'

interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  content: string
  reference?: string
  timestamp: string
}

const FAITH_KNOWLEDGE_BASE: Record<
  string,
  { response: string; reference: string }
> = {
  credo: {
    response:
      'O Credo dos Apóstolos é a síntese fiel da fé católica transmitida desde os primeiros discípulos de Cristo. Divide-se em doze artigos que proclamam a verdade sobre a Santíssima Trindade (Pai Criador, Filho Redentor e Espírito Santo Santificador) e sobre a Santa Igreja Católica, o perdão dos pecados e a ressurreição da carne para a vida eterna.',
    reference: 'Catecismo da Igreja Católica, § 185–197',
  },
  quaresma: {
    response:
      'A Quaresma é o tempo litúrgico penitencial de quarenta dias que antecede a Páscoa da Ressurreição. Inspirada nos 40 dias de Jesus jejuando no deserto, ela nos convida a três armas espirituais essenciais: a Oração (aproximar-se de Deus), o Jejum (domínio sobre si e conversão) e a Esmola (caridade e amor fraterno ao próximo necessitado).',
    reference: 'Papa Bento XVI, Mensagem para a Quaresma; CIC § 1434',
  },
  terco: {
    response:
      'Rezar o Terço é contemplar com os olhos e o coração de Maria a vida, paixão, morte e glória de Jesus Cristo. Cada mistério (Gozosos, Luminosos, Dolorosos ou Gloriosos) nos convida a rezar 1 Pai Nosso, 10 Ave Marias e 1 Glória ao Pai, meditando as passagens evangélicas fundamentais da nossa salvação.',
    reference: 'São João Paulo II, Carta Apostólica Rosarium Virginis Mariae',
  },
  eucaristia: {
    response:
      'A Sagrada Eucaristia é a “fonte e ápice de toda a vida cristã” (Lumen Gentium 11). Não é mero símbolo ou recordação histórica: através da transubstanciação pelas mãos do sacerdote na Santa Missa, o pão e o vinho tornam-se real, verdadeira e substancialmente o Corpo, Sangue, Alma e Divindade de Nosso Senhor Jesus Cristo.',
    reference: 'Concílio de Trento; CIC § 1324–1327',
  },
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'assistant',
    content:
      'Paz e bem! Sou o seu assistente de vida espiritual no Ora et Labora. Como posso ajudar seu caminho de fé hoje? Você pode tirar dúvidas sobre orações, doutrina, virtudes ou o sentido do trabalho cristão.',
    timestamp: 'Hoje',
  },
]

let _messageCounter = 100

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputVal, setInputVal] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { addToast } = useToastStore()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (userText: string) => {
    if (!userText.trim()) return

    const userMsg: ChatMessage = {
      id: `msg-${++_messageCounter}`,
      sender: 'user',
      content: userText.trim(),
      timestamp: 'Agora',
    }

    setMessages((prev) => [...prev, userMsg])
    setInputVal('')
    setIsTyping(true)

    setTimeout(() => {
      const lower = userText.toLowerCase()
      let reply = ''
      let ref = 'Magistério da Igreja Católica'

      if (lower.includes('credo')) {
        reply = FAITH_KNOWLEDGE_BASE.credo.response
        ref = FAITH_KNOWLEDGE_BASE.credo.reference
      } else if (lower.includes('quaresma') || lower.includes('jejum')) {
        reply = FAITH_KNOWLEDGE_BASE.quaresma.response
        ref = FAITH_KNOWLEDGE_BASE.quaresma.reference
      } else if (lower.includes('terço') || lower.includes('rosario') || lower.includes('rosário')) {
        reply = FAITH_KNOWLEDGE_BASE.terco.response
        ref = FAITH_KNOWLEDGE_BASE.terco.reference
      } else if (lower.includes('eucaristia') || lower.includes('missa') || lower.includes('comunhão')) {
        reply = FAITH_KNOWLEDGE_BASE.eucaristia.response
        ref = FAITH_KNOWLEDGE_BASE.eucaristia.reference
      } else if (lower.includes('trabalho') || lower.includes('labora')) {
        reply =
          'O trabalho humano, iluminado pela Regra de São Bento ("Ora et Labora"), é participação contínua na obra criadora de Deus. Trabalhar com retidão de intenção, pontualidade e amor ao próximo transforma o nosso dever diário em verdadeira oração contínua.'
        ref = 'São Josemaría Escrivá; Regra de São Bento'
      } else {
        reply =
          `“Buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão dadas em acréscimo” (Mt 6, 33). Em sua caminhada espiritual sobre "${userText}", alimente-se da oração diária, da frequência aos sacramentos da Penitência e Eucaristia, e da escuta dócil à Palavra de Deus.`
        ref = 'Sagrada Escritura e Tradição Católica'
      }

      const botMsg: ChatMessage = {
        id: `msg-${++_messageCounter}`,
        sender: 'assistant',
        content: reply,
        reference: ref,
        timestamp: 'Agora',
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 600)
  }

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES)
    addToast({ message: 'Histórico de conversa reiniciado.', variant: 'info' })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] space-y-4">
      {/* Header and Disclaimer */}
      <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-graphite-900">
            Assistente Espiritual
          </h2>
          <p className="text-xs text-graphite-600">
            Respostas fundamentadas no Catecismo e nos Santos Padres.
          </p>
        </div>

        <button
          type="button"
          onClick={clearChat}
          className="p-2 rounded-full text-graphite-400 hover:text-graphite-700 hover:bg-ivory-200/50 transition-colors"
          title="Limpar histórico"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Pastoral Disclaimer Banner */}
      <div className="flex items-start gap-2.5 p-3 rounded-card bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
        <p className="leading-snug">
          Este assistente tem caráter formativo baseado na doutrina católica. Para confissão, direção espiritual ou discernimento pastoral, procure sempre um sacerdote católico.
        </p>
      </div>

      {/* Chat Messages scroll area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center shrink-0 border border-gold/40">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-card p-3.5 space-y-2 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gold text-white shadow-xs ml-auto'
                  : 'bg-ivory-100 border border-ivory-200 text-graphite-900 shadow-card'
              }`}
            >
              <p>{msg.content}</p>

              {msg.reference && (
                <div className="pt-2 border-t border-ivory-200/60 flex items-center gap-1.5 text-[11px] font-mono text-gold-dark">
                  <BookOpen className="w-3 h-3" />
                  <span>{msg.reference}</span>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-graphite-200 text-graphite-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-graphite-400 italic py-1">
            <span className="w-2 h-2 rounded-full bg-gold animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.4s]" />
            <span>Consultando ensinamentos da Igreja...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {['Explique o Credo', 'O que é a Quaresma?', 'Como rezar o Terço?', 'O que é a Eucaristia?'].map(
          (sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => handleSend(sug)}
              className="px-3 py-1 rounded-pill bg-ivory-100 hover:bg-gold/15 border border-ivory-200 text-xs font-medium text-graphite-700 whitespace-nowrap transition-colors"
            >
              {sug}
            </button>
          ),
        )}
      </div>

      {/* Message input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend(inputVal)
        }}
        className="flex items-center gap-2 pt-2 border-t border-ivory-200"
      >
        <input
          type="text"
          placeholder="Faça uma pergunta sobre a fé católica ou vida de oração..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm rounded-card border border-ivory-200 bg-ivory-100 text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <Button
          type="submit"
          disabled={!inputVal.trim()}
          rightIcon={<Send className="w-4 h-4" />}
        >
          Enviar
        </Button>
      </form>
    </div>
  )
}
