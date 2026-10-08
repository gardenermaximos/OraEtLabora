export interface PrayerVerse {
  latin?: string
  portuguese: string
}

export interface PrayerItem {
  id: string
  title: string
  titleLatin?: string
  category: 'marian' | 'eucharistic' | 'saints' | 'daily' | 'rosary' | 'liturgical'
  verses: PrayerVerse[]
  description?: string
  audioDurationSec?: number
}

export const PRAYERS: PrayerItem[] = [
  {
    id: 'pater-noster',
    title: 'Pai Nosso',
    titleLatin: 'Pater Noster',
    category: 'daily',
    description: 'A oração ensinada pelo próprio Senhor Jesus Cristo aos Seus apóstolos.',
    audioDurationSec: 52,
    verses: [
      {
        latin: 'Pater noster, qui es in caelis, sanctificetur nomen tuum.',
        portuguese: 'Pai nosso, que estais nos céus, santificado seja o vosso nome.',
      },
      {
        latin: 'Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra.',
        portuguese: 'Venha a nós o vosso reino. Seja feita a vossa vontade, assim na terra como no céu.',
      },
      {
        latin: 'Panem nostrum cotidianum da nobis hodie,',
        portuguese: 'O pão nosso de cada dia nos dai hoje,',
      },
      {
        latin: 'et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus nostris.',
        portuguese: 'perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido.',
      },
      {
        latin: 'Et ne nos inducas in tentationem, sed libera nos a malo. Amen.',
        portuguese: 'E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      },
    ],
  },
  {
    id: 'ave-maria',
    title: 'Ave Maria',
    titleLatin: 'Ave Maria',
    category: 'marian',
    description: 'A saudação angélica à Santíssima Virgem Maria e súplica por nossa salvação.',
    audioDurationSec: 45,
    verses: [
      {
        latin: 'Ave Maria, gratia plena, Dominus tecum.',
        portuguese: 'Ave Maria, cheia de graça, o Senhor é convosco.',
      },
      {
        latin: 'Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus.',
        portuguese: 'Bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.',
      },
      {
        latin: 'Sancta Maria, Mater Dei, ora pro nobis peccatoribus,',
        portuguese: 'Santa Maria, Mãe de Deus, rogai por nós pecadores,',
      },
      {
        latin: 'nunc et in hora mortis nostrae. Amen.',
        portuguese: 'agora e na hora de nossa morte. Amém.',
      },
    ],
  },
  {
    id: 'gloria-patri',
    title: 'Glória ao Pai',
    titleLatin: 'Gloria Patri',
    category: 'daily',
    description: 'Doxologia menor de louvor à Santíssima Trindade.',
    audioDurationSec: 25,
    verses: [
      {
        latin: 'Gloria Patri, et Filio, et Spiritui Sancto.',
        portuguese: 'Glória ao Pai, e ao Filho, e ao Espírito Santo.',
      },
      {
        latin: 'Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.',
        portuguese: 'Como era no princípio, agora e sempre. Amém.',
      },
    ],
  },
  {
    id: 'credo',
    title: 'Credo dos Apóstolos',
    titleLatin: 'Symbolum Apostolorum',
    category: 'daily',
    description: 'A profissão de fé apostólica transmitida desde as origens da Santa Igreja.',
    audioDurationSec: 90,
    verses: [
      {
        latin: 'Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae.',
        portuguese: 'Creio em Deus Pai todo-poderoso, Criador do céu e da terra.',
      },
      {
        latin: 'Et in Iesum Christum, Filium eius unicum, Dominum nostrum:',
        portuguese: 'E em Jesus Cristo, seu único Filho, nosso Senhor:',
      },
      {
        latin: 'qui conceptus est de Spiritu Sancto, natus ex Maria Virgine,',
        portuguese: 'que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria,',
      },
      {
        latin: 'passus sub Pontio Pilato, crucifixus, mortuus, et sepultus, descendit ad inferos,',
        portuguese: 'padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado, desceu à mansão dos mortos,',
      },
      {
        latin: 'tertia die resurrexit a mortuis, ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis,',
        portuguese: 'ressuscitou ao terceiro dia, subiu aos céus, está sentado à direita de Deus Pai todo-poderoso,',
      },
      {
        latin: 'inde venturus est iudicare vivos et mortuos.',
        portuguese: 'donde há de vir a julgar os vivos e os mortos.',
      },
      {
        latin: 'Credo in Spiritum Sanctum, sanctam Ecclesiam catholicam, sanctorum communionem,',
        portuguese: 'Creio no Espírito Santo, na santa Igreja católica, na comunhão dos santos,',
      },
      {
        latin: 'remissionem peccatorum, carnis resurrectionem, vitam aeternam. Amen.',
        portuguese: 'na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.',
      },
    ],
  },
  {
    id: 'salve-regina',
    title: 'Salve Rainha',
    titleLatin: 'Salve Regina',
    category: 'marian',
    description: 'Antífona mariana tradicional cantada após as Completas.',
    audioDurationSec: 65,
    verses: [
      {
        latin: 'Salve, Regina, Mater misericordiae, vita, dulcedo, et spes nostra, salve.',
        portuguese: 'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!',
      },
      {
        latin: 'Ad te clamamus, exsules filii Hevae. Ad te suspiramus, gementes et flentes in hac lacrimarum valle.',
        portuguese: 'A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas.',
      },
      {
        latin: 'Eia ergo, advocata nostra, illos tuos misericordes oculos ad nos converte.',
        portuguese: 'Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei.',
      },
      {
        latin: 'Et Iesum, benedictum fructum ventris tui, nobis post hoc exsilium ostende. O clemens, o pia, o dulcis Virgo Maria.',
        portuguese: 'E, depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria.',
      },
    ],
  },
  {
    id: 'sao-miguel',
    title: 'São Miguel Arcanjo',
    titleLatin: 'Sancte Michael Archangele',
    category: 'saints',
    description: 'Oração de proteção composta pelo Papa Leão XIII.',
    audioDurationSec: 50,
    verses: [
      {
        latin: 'Sancte Michael Archangele, defende nos in proelio;',
        portuguese: 'São Miguel Arcanjo, defendei-nos no combate;',
      },
      {
        latin: 'contra nequitiam et insidias diaboli esto praesidium.',
        portuguese: 'sede o nosso refúgio contra as maldades e ciladas do demônio.',
      },
      {
        latin: 'Imperet illi Deus, supplices deprecamur: tuque, Princeps militiae caelestis,',
        portuguese: 'Ordene-lhe Deus, instantemente o pedimos; e vós, Príncipe da milícia celeste,',
      },
      {
        latin: 'Satanam aliosque spiritus malignos, qui ad perditionem animarum pervagantur in mundo, divina virtute in infernum detrude. Amen.',
        portuguese: 'pela virtude divina, precipitai no inferno a Satanás e aos outros espíritos malignos que andam pelo mundo para perder as almas. Amém.',
      },
    ],
  },
  {
    id: 'sao-bento',
    title: 'Oração da Cruz de São Bento',
    titleLatin: 'Crux Sacra Sit Mihi Lux',
    category: 'saints',
    description: 'Fórmula de exorcismo e oração de fidelidade à Cruz de Cristo.',
    audioDurationSec: 40,
    verses: [
      {
        latin: 'Crux Sacra Sit Mihi Lux! Non Draco Sit Mihi Dux!',
        portuguese: 'A Cruz Sagrada seja a minha luz! Não seja o dragão o meu guia!',
      },
      {
        latin: 'Vade Retro Satana! Nunquam Suade Mihi Vana!',
        portuguese: 'Retira-te, Satanás! Nunca me aconselhes coisas vãs!',
      },
      {
        latin: 'Sunt Mala Quae Libas; Ipse Venena Bibas!',
        portuguese: 'É mau o que tu me ofereces; bebe tu mesmo os teus venenos!',
      },
    ],
  },
  {
    id: 'santo-anjo',
    title: 'Santo Anjo do Senhor',
    titleLatin: 'Angele Dei',
    category: 'daily',
    description: 'Invocação ao Santo Anjo da Guarda.',
    audioDurationSec: 30,
    verses: [
      {
        latin: 'Angele Dei, qui custos es mei, me, tibi commissum pietate superna,',
        portuguese: 'Santo Anjo do Senhor, meu zeloso guardião,',
      },
      {
        latin: 'illumina, custodi, rege et guberna. Amen.',
        portuguese: 'se a ti me confiou a piedade divina, sempre me rege, guarda, governa e ilumina. Amém.',
      },
    ],
  },
  {
    id: 'terco-misericordia',
    title: 'Terço da Misericórdia',
    titleLatin: 'Coronilla Divinae Misericordiae',
    category: 'rosary',
    description: 'Revelada a Santa Faustina Kowalska para implorar a misericórdia sobre nós e o mundo inteiro.',
    audioDurationSec: 120,
    verses: [
      {
        latin: 'Pater aeterne, offero tibi Corpus et Sanguinem, Animam et Divinitatem dilectissimi Filii Tui, Domini nostri Iesu Christi,',
        portuguese: 'Eterno Pai, eu Vos ofereço o Corpo e o Sangue, a Alma e a Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo,',
      },
      {
        latin: 'in propitiatione pro peccatis nostris et totius mundi.',
        portuguese: 'em expiação dos nossos pecados e dos do mundo inteiro.',
      },
      {
        latin: 'Pro dolorosa Eius passione, miserere nobis et totius mundi.',
        portuguese: 'Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.',
      },
      {
        latin: 'Sanctus Deus, Sanctus Fortis, Sanctus Immortalis, miserere nobis et totius mundi.',
        portuguese: 'Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro.',
      },
    ],
  },
]
