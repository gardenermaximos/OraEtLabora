export interface SaintInfo {
  name: string
  title: string
  feastDate: string // e.g. "08 de Outubro"
  bio: string
  quote: string
  patronage: string
  reflection: string
}

export const TODAY_SAINT: SaintInfo = {
  name: 'Santa Pelágia',
  title: 'Penitente de Antioquia',
  feastDate: '08 de Outubro',
  bio: 'Atriz e dançarina de Antioquia célebre por sua beleza e vida mundana, converteu-se profundamente ao ouvir o bispo São Nono pregar sobre a misericórdia de Deus. Distribuiu seus bens aos pobres e viveu em oração contínua e penitência no Monte das Oliveiras em Jerusalém.',
  quote: '“Senhor, não olhes para os meus pecados passados, mas para a Tua infinita misericórdia que perdoa e restaura.”',
  patronage: 'Penitentes e conversos',
  reflection: 'A misericórdia de Deus sempre supera a nossa miséria. Nenhum passado é pesado demais quando o coração se volta com sinceridade a Cristo.',
}

export const UPCOMING_FEASTS = [
  {
    date: '12 de Outubro',
    title: 'Nossa Senhora da Conceição Aparecida',
    description: 'Padroeira e Rainha do Brasil. Solenidade.',
    color: 'white',
  },
  {
    date: '15 de Outubro',
    title: 'Santa Teresa de Jesus',
    description: 'Virgem e Doutora da Igreja. Mestra da oração interior.',
    color: 'white',
  },
  {
    date: '18 de Outubro',
    title: 'São Lucas, Evangelista',
    description: 'Médico amado e pintor da misericórdia no Santo Evangelho.',
    color: 'red',
  },
  {
    date: '22 de Outubro',
    title: 'São João Paulo II',
    description: 'Papa. “Não tenhais medo! Abri de par em par as portas a Cristo!”',
    color: 'white',
  },
]
