import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type LanguageCode } from '../i18n'

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'compact'
}

export default function LanguageSwitcher({ variant = 'navbar' }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const current = (i18n.language?.slice(0, 2) || 'en') as LanguageCode

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const select = (code: LanguageCode) => {
    void i18n.changeLanguage(code)
    setOpen(false)
  }

  const currentLabel = t(`lang.${current}`)

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={
          variant === 'navbar'
            ? 'flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] text-neutral-500 px-3 py-2 border border-white/10 rounded-sm transition-all duration-300 ease-in-out hover:border-[rgba(212,175,55,0.3)] hover:text-neutral-300 uppercase'
            : 'dash-header-btn text-[10px] tracking-[0.12em]'
        }
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('lang.label')}
      >
        <span>{current.toUpperCase()}</span>
        <span className="opacity-60" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-1 min-w-[10.5rem] py-1 z-[100] border border-[rgba(201,168,76,0.2)] rounded-sm shadow-lg"
          style={{ background: 'rgba(10,10,10,0.98)' }}
        >
          {SUPPORTED_LANGUAGES.map(({ code, labelKey }) => (
            <li key={code} role="option" aria-selected={code === current}>
              <button
                type="button"
                onClick={() => select(code)}
                className={`w-full text-left px-4 py-2.5 text-[11px] tracking-wide transition-colors ${
                  code === current
                    ? 'text-[#D4AF37] bg-[rgba(201,168,76,0.08)]'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]'
                }`}
              >
                {t(labelKey)}
              </button>
            </li>
          ))}
        </ul>
      )}
      {variant === 'navbar' && (
        <span className="sr-only">{currentLabel}</span>
      )}
    </div>
  )
}
