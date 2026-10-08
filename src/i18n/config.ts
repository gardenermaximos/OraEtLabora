import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// pt-BR namespaces
import commonPtBR from './locales/pt-BR/common.json'
import prayersPtBR from './locales/pt-BR/prayers.json'
import loggerPtBR from './locales/pt-BR/logger.json'
import discoverPtBR from './locales/pt-BR/discover.json'
import assistantPtBR from './locales/pt-BR/assistant.json'
import communityPtBR from './locales/pt-BR/community.json'

// en namespaces (espelhado, para o futuro)
import commonEn from './locales/en/common.json'

const resources = {
  'pt-BR': {
    common: commonPtBR,
    prayers: prayersPtBR,
    logger: loggerPtBR,
    discover: discoverPtBR,
    assistant: assistantPtBR,
    community: communityPtBR,
  },
  en: {
    common: commonEn,
  },
}

void i18n.use(initReactI18next).init({
  resources,
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false, // React já escapa
  },
  react: {
    useSuspense: true,
  },
})

export default i18n
