export interface DailyActivity {
  id: string
  title: string
  category: 'spiritual' | 'daily'
  period: 'morning' | 'afternoon' | 'evening'
  timeHint: string
  points: number
  done?: boolean
}

export const INITIAL_ACTIVITIES: DailyActivity[] = [
  // Manhã
  {
    id: 'act-1',
    title: 'Oferecimento do Dia e Sinal da Cruz',
    category: 'spiritual',
    period: 'morning',
    timeHint: '06:00',
    points: 10,
    done: true,
  },
  {
    id: 'act-2',
    title: 'Oração da Manhã (Laudes)',
    category: 'spiritual',
    period: 'morning',
    timeHint: '07:00',
    points: 15,
    done: true,
  },
  {
    id: 'act-3',
    title: 'Trabalho com Retidão de Intenção',
    category: 'daily',
    period: 'morning',
    timeHint: '08:30',
    points: 10,
    done: false,
  },
  // Tarde
  {
    id: 'act-4',
    title: 'Ângelus das 12h',
    category: 'spiritual',
    period: 'afternoon',
    timeHint: '12:00',
    points: 10,
    done: false,
  },
  {
    id: 'act-5',
    title: 'Santo Terço Mariano',
    category: 'spiritual',
    period: 'afternoon',
    timeHint: '15:00',
    points: 25,
    done: false,
  },
  {
    id: 'act-6',
    title: 'Leitura Espiritual ou Bíblica (15 min)',
    category: 'daily',
    period: 'afternoon',
    timeHint: '17:00',
    points: 15,
    done: false,
  },
  // Noite
  {
    id: 'act-7',
    title: 'Exame de Consciência',
    category: 'spiritual',
    period: 'evening',
    timeHint: '21:30',
    points: 15,
    done: false,
  },
  {
    id: 'act-8',
    title: 'Completas e Salve Rainha',
    category: 'spiritual',
    period: 'evening',
    timeHint: '22:00',
    points: 10,
    done: false,
  },
]
