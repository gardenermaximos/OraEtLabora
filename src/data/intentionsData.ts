export interface PrayerIntention {
  id: string
  authorName: string
  authorAvatar?: string
  city?: string
  text: string
  category: 'health' | 'family' | 'vocations' | 'conversion' | 'thanksgiving'
  createdAt: string
  prayedCount: number
  hasPrayed?: boolean
}

export const INITIAL_INTENTIONS: PrayerIntention[] = [
  {
    id: 'int-1',
    authorName: 'Maria Clara',
    city: 'Belo Horizonte, MG',
    text: 'Pela saúde da minha mãe que fará uma cirurgia delicada nesta sexta-feira. Que Nossa Senhora passe à frente!',
    category: 'health',
    createdAt: 'Há 2 horas',
    prayedCount: 38,
    hasPrayed: false,
  },
  {
    id: 'int-2',
    authorName: 'Gabriel Santos',
    city: 'São Paulo, SP',
    text: 'Pelas vocações sacerdotais e religiosas da nossa diocese, e pela santidade dos nossos sacerdotes.',
    category: 'vocations',
    createdAt: 'Há 5 horas',
    prayedCount: 64,
    hasPrayed: true,
  },
  {
    id: 'int-3',
    authorName: 'Ana e Carlos',
    city: 'Curitiba, PR',
    text: 'Agradecimento pelos 10 anos de matrimônio e pedido de bênçãos e discernimento para nossa família.',
    category: 'thanksgiving',
    createdAt: 'Há 1 dia',
    prayedCount: 89,
    hasPrayed: false,
  },
  {
    id: 'int-4',
    authorName: 'Lucas Mendonça',
    city: 'Fortaleza, CE',
    text: 'Pela conversão do meu irmão e restauração da paz em nosso lar.',
    category: 'conversion',
    createdAt: 'Há 1 dia',
    prayedCount: 52,
    hasPrayed: false,
  },
]
