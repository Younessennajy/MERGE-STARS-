import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import ru from './locales/ru'
import fr from './locales/fr'
import de from './locales/de'
import tr from './locales/tr'
import ka from './locales/ka'

export const LANG_STORAGE_KEY = 'merge-stars-lang'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', labelKey: 'lang.en' },
  { code: 'ru', labelKey: 'lang.ru' },
  { code: 'fr', labelKey: 'lang.fr' },
  { code: 'de', labelKey: 'lang.de' },
  { code: 'tr', labelKey: 'lang.tr' },
  { code: 'ka', labelKey: 'lang.ka' },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

function readStoredLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY)
    if (stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)) {
      return stored as LanguageCode
    }
  } catch {
    /* ignore */
  }
  return 'en'
}

const saved = typeof window !== 'undefined' ? readStoredLanguage() : 'en'

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    fr: { translation: fr },
    de: { translation: de },
    tr: { translation: tr },
    ka: { translation: ka },
  },
  lng: saved,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = saved
}

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lng)
  } catch {
    /* ignore */
  }
  document.documentElement.lang = lng
})

export default i18n
