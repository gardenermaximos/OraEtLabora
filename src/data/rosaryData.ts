export interface RosaryMystery {
  id: string
  title: string
  scripture: string
  fruit: string
  reflection: string
}

export interface MysteryGroup {
  id: 'joyful' | 'luminous' | 'sorrowful' | 'glorious'
  name: string
  days: string
  mysteries: RosaryMystery[]
}

export const ROSARY_GROUPS: MysteryGroup[] = [
  {
    id: 'joyful',
    name: 'Mistérios Gozosos',
    days: 'Segunda-feira e Sábado',
    mysteries: [
      {
        id: 'j-1',
        title: '1º Mistério: A Anunciação do Arcanjo Gabriel a Nossa Senhora',
        scripture: '“Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra” (Lc 1, 38).',
        fruit: 'Fruto do mistério: A Humildade.',
        reflection: 'Meditamos a encarnação do Verbo no seio virginal de Maria e o seu "Sim" pleno que abriu as portas da Salvação ao mundo.',
      },
      {
        id: 'j-2',
        title: '2º Mistério: A Visitação de Maria à sua prima Santa Isabel',
        scripture: '“Donde me vem que a mãe do meu Senhor me visite?” (Lc 1, 43).',
        fruit: 'Fruto do mistério: A Caridade fraterna.',
        reflection: 'Maria parte apressadamente pelas montanhas para servir. Onde Maria chega, Cristo se faz presente e traz a alegria do Espírito Santo.',
      },
      {
        id: 'j-3',
        title: '3º Mistério: O Nascimento de Jesus em Belém',
        scripture: '“Ela deu à luz o seu filho primogênito, enfaixou-o e o deitou numa manjedoura” (Lc 2, 7).',
        fruit: 'Fruto do mistério: O Desapego dos bens materiais.',
        reflection: 'O Criador de todas as coisas nasce na pobreza da gruta de Belém, ensinando-nos a buscar a riqueza eterna de Deus.',
      },
      {
        id: 'j-4',
        title: '4º Mistério: A Apresentação do Menino Jesus no Templo',
        scripture: '“Meus olhos viram a vossa salvação que preparastes em favor de todos os povos” (Lc 2, 30-31).',
        fruit: 'Fruto do mistério: A Pureza e a Obediência.',
        reflection: 'Maria e José oferecem o Menino ao Pai, cumprindo com reverência a Lei Divina e acolhendo a profecia do santo Simeão.',
      },
      {
        id: 'j-5',
        title: '5º Mistério: A Perda e o Encontro de Jesus no Templo',
        scripture: '“Não sabíeis que devo ocupar-me das coisas de meu Pai?” (Lc 2, 49).',
        fruit: 'Fruto do mistério: O Zelo pelas coisas de Deus.',
        reflection: 'Após três dias de dorosa busca, Maria e José encontram Jesus entre os mestres da Lei, ensinando a divina sabedoria.',
      },
    ],
  },
  {
    id: 'luminous',
    name: 'Mistérios Luminosos',
    days: 'Quinta-feira',
    mysteries: [
      {
        id: 'l-1',
        title: '1º Mistério: O Batismo de Jesus no Rio Jordão',
        scripture: '“Este é o meu Filho muito amado, em quem ponho a minha complacência” (Mt 3, 17).',
        fruit: 'Fruto do mistério: A Fidelidade às promessas batismais.',
        reflection: 'Jesus desce às águas para santificá-las, manifestando a Santíssima Trindade e iniciando sua missão pública.',
      },
      {
        id: 'l-2',
        title: '2º Mistério: A Auto-revelação de Jesus nas Bodas de Caná',
        scripture: '“Fazei tudo o que Ele vos disser” (Jo 2, 5).',
        fruit: 'Fruto do mistério: A Confiança na intercessão de Maria.',
        reflection: 'A pedido de Sua Mãe Santíssima, Jesus antecipa Sua hora, transformando água em vinho excelente e confirmando a fé dos discípulos.',
      },
      {
        id: 'l-3',
        title: '3º Mistério: O Anúncio do Reino de Deus e o Convite à Conversão',
        scripture: '“O tempo está cumprido e o Reino de Deus está próximo: arrependei-vos e crede no Evangelho” (Mc 1, 15).',
        fruit: 'Fruto do mistério: O Desejo contínuo de conversão.',
        reflection: 'Jesus proclama a misericórdia de Deus, cura os enfermos e acolhe os pecadores arrependidos com infinito amor.',
      },
      {
        id: 'l-4',
        title: '4º Mistério: A Transfiguração no Monte Tabor',
        scripture: '“O seu rosto resplandeceu como o sol e as suas vestes tornaram-se brancas como a luz” (Mt 17, 2).',
        fruit: 'Fruto do mistério: O Espírito de oração contemplativa.',
        reflection: 'Cristo antecipa a glória da Ressurreição aos apóstolos no Tabor, para fortalecê-los diante do escândalo da Cruz.',
      },
      {
        id: 'l-5',
        title: '5º Mistério: A Instituição da Sagrada Eucaristia',
        scripture: '“Tomai e comei: isto é o meu Corpo que é dado por vós” (Lc 22, 19).',
        fruit: 'Fruto do mistério: O Amor ardente ao Santíssimo Sacramento.',
        reflection: 'Na Última Ceia, Jesus faz-se alimento dos homens e institui o Sacerdócio católico, amando os Seus até o fim.',
      },
    ],
  },
  {
    id: 'sorrowful',
    name: 'Mistérios Dolorosos',
    days: 'Terça e Sexta-feira',
    mysteries: [
      {
        id: 's-1',
        title: '1º Mistério: A Agonia de Jesus no Horto das Oliveiras',
        scripture: '“Pai, se é do teu agrado, afasta de mim este cálice! Não se faça, porém, a minha vontade, mas a tua” (Lc 22, 42).',
        fruit: 'Fruto do mistério: A Dor sincera pelos nossos pecados.',
        reflection: 'Jesus sua sangue no Getsêmani, assumindo o peso terrível de todos os pecados da humanidade em obediência ao Pai.',
      },
      {
        id: 's-2',
        title: '2º Mistério: A Flagelação de Nosso Senhor',
        scripture: '“Pilatos mandou então flagelar Jesus” (Jo 19, 1).',
        fruit: 'Fruto do mistério: A Mortificação dos sentidos.',
        reflection: 'O Cordeiro imaculado sofre os terríveis golpes da flagelação para reparar a impureza e as desordens da nossa carne.',
      },
      {
        id: 's-3',
        title: '3º Mistério: A Coroação de Espinhos',
        scripture: '“Teceram uma coroa de espinhos e puseram-na sobre a sua cabeça” (Mt 27, 29).',
        fruit: 'Fruto do mistério: A Humildade perante o desprezo do mundo.',
        reflection: 'O Rei dos Reis é escarnecido com um manto púrpura e uma coroa pungente para expiar o nosso orgulho e soberba intelectual.',
      },
      {
        id: 's-4',
        title: '4º Mistério: O Caminho do Calvário carregando a Cruz',
        scripture: '“Jesus, carregando a sua cruz, saiu para o lugar chamado Calvário” (Jo 19, 17).',
        fruit: 'Fruto do mistério: A Paciência nas tribulações diárias.',
        reflection: 'Abraçado à Cruz pesada, Jesus cai e Se levanta, encontrando o olhar materno de Maria, e nos ensina a abraçar nossa cruz com amor.',
      },
      {
        id: 's-5',
        title: '5º Mistério: A Crucificação e Morte de Nosso Senhor Jesus Cristo',
        scripture: '“Pai, em tuas mãos entrego o meu espírito” (Lc 23, 46).',
        fruit: 'Fruto do mistério: O Perdão aos inimigos e salvação das almas.',
        reflection: 'Pregado na Cruz por três horas de martírio, Jesus nos entrega Maria como Mãe e expira redimindo a humanidade.',
      },
    ],
  },
  {
    id: 'glorious',
    name: 'Mistérios Gloriosos',
    days: 'Quarta-feira e Domingo',
    mysteries: [
      {
        id: 'g-1',
        title: '1º Mistério: A Ressurreição Triunfal de Jesus Cristo',
        scripture: '“Não tenhais medo. Sei que procurais Jesus, o crucificado; Ele não está aqui: ressuscitou!” (Mt 28, 5-6).',
        fruit: 'Fruto do mistério: Uma Fé viva e inabalável.',
        reflection: 'A morte foi tragada pela vitória! Cristo vence o pecado e o túmulo, tornando-se as primícias de nossa ressurreição.',
      },
      {
        id: 'g-2',
        title: '2º Mistério: A Ascensão de Jesus ao Céu',
        scripture: '“Enquanto os abençoava, separou-se deles e foi elevado ao céu” (Lc 24, 51).',
        fruit: 'Fruto do mistério: A Esperança e o anseio pela Pátria Celeste.',
        reflection: 'Jesus sobe vitorioso ao Céu para nos preparar um lugar à direita do Pai Todo-Poderoso.',
      },
      {
        id: 'g-3',
        title: '3º Mistério: A Descida do Espírito Santo em Pentecostes',
        scripture: '“Todos ficaram cheios do Espírito Santo e começaram a falar em outras línguas” (At 2, 4).',
        fruit: 'Fruto do mistério: O Zelo missionário e amor a Deus.',
        reflection: 'O Paráclito prometido desce com fogo e vento impetuoso sobre Nossa Senhora e os Apóstolos no Cenáculo, dando início à missão da Igreja.',
      },
      {
        id: 'g-4',
        title: '4º Mistério: A Assunção de Nossa Senhora ao Céu',
        scripture: '“Quem é esta que sobe do deserto, apoiada no seu amado?” (Ct 8, 5).',
        fruit: 'Fruto do mistério: A Graça de uma santa morte.',
        reflection: 'Concluído o curso de sua vida terrena, a Virgem Imaculada foi elevada em corpo e alma à glória celestial.',
      },
      {
        id: 'g-5',
        title: '5º Mistério: A Coroação de Maria como Rainha do Céu e da Terra',
        scripture: '“Apareceu no céu um grande sinal: uma mulher vestida de sol, tendo a lua debaixo dos pés e na cabeça uma coroa de doze estrelas” (Ap 12, 1).',
        fruit: 'Fruto do mistério: A Confiança filial na Mãe de Deus.',
        reflection: 'A Virgem Mãe é coroada pela Santíssima Trindade como Rainha dos Anjos e dos Santos, advogada constante dos cristãos.',
      },
    ],
  },
]
