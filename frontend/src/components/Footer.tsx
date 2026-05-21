import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const COMPANY = [
  { labelKey: 'nav.howItWorks', to: '/how-it-works' },
  { labelKey: 'nav.mergeCoin', to: '/merge-coin' },
  { labelKey: 'nav.prices', to: '/price-indicator' },
  { labelKey: 'nav.apply', to: '/apply' },
] as const

const SUPPORT = [
  { labelKey: 'nav.faq', to: '/faq' },
  { labelKey: 'nav.contact', to: '/contact' },
  { labelKey: 'footer.terms', to: '/terms' },
  { labelKey: 'footer.privacy', to: '/privacy' },
] as const

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const badges = [
    { title: 'footer.secure', sub: 'footer.secureSub' },
    { title: 'footer.fast', sub: 'footer.fastSub' },
    { title: 'footer.global', sub: 'footer.globalSub' },
    { title: 'footer.supportTitle', sub: 'footer.supportSub' },
  ] as const

  return (
    <footer className="bg-[#030303] border-t border-[rgba(212,175,55,0.1)]">
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-px"
        style={{ background: 'rgba(212,175,55,0.04)' }}
      >
        {badges.map((b) => (
          <div
            key={b.title}
            className="flex flex-col justify-center px-8 py-8 bg-[#030303] transition-all duration-300 ease-in-out hover:bg-[#050505]"
          >
            <p className="text-[10px] font-medium tracking-[0.22em] text-[#D4AF37] mb-1.5">{t(b.title)}</p>
            <p className="text-[9px] tracking-wide text-neutral-500">{t(b.sub)}</p>
          </div>
        ))}
      </div>

      <div className="px-8 lg:px-16 py-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center justify-center w-8 h-8 border border-[rgba(212,175,55,0.35)] text-[#D4AF37] font-serif text-sm"
                style={{ borderRadius: '2px' }}
              >
                ★
              </div>
              <div className="flex flex-col leading-none font-serif-display">
                <span className="text-[9px] font-light tracking-[0.4em] text-[#D4AF37]">MERGE</span>
                <span className="text-[9px] font-light tracking-[0.4em] text-neutral-400">STARS</span>
              </div>
            </div>
            <p className="landing-body max-w-[280px] !text-[11px]">{t('footer.tagline')}</p>
            <div className="flex gap-2 mt-8">
              {['f', 'in', '▶', 'li', '𝕏'].map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-9 h-9 flex items-center justify-center text-[10px] font-medium text-neutral-500 border border-[rgba(212,175,55,0.15)] transition-all duration-300 ease-in-out hover:border-[rgba(212,175,55,0.4)] hover:text-[#D4AF37]"
                  style={{ borderRadius: '2px' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="landing-sans-head mb-6">{t('footer.company')}</h4>
            <ul className="flex flex-col gap-3">
              {COMPANY.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[11px] tracking-wide text-neutral-500 no-underline transition-all duration-300 ease-in-out hover:text-neutral-200"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="landing-sans-head mb-6">{t('footer.support')}</h4>
            <ul className="flex flex-col gap-3">
              {SUPPORT.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[11px] tracking-wide text-neutral-500 no-underline transition-all duration-300 ease-in-out hover:text-neutral-200"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="landing-sans-head mb-6">{t('footer.contact')}</h4>
            <ul className="flex flex-col gap-3">
              {['info@mergestars.com', '+1 (555) 123 4567', 'Global Headquarters'].map((text) => (
                <li key={text}>
                  <span className="text-[11px] tracking-wide text-neutral-500">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1440px] mx-auto border-t border-[rgba(212,175,55,0.06)]">
        <p className="text-[9px] tracking-[0.12em] text-neutral-600">
          © {year} MERGE STARS. {t('footer.rights')}
        </p>
        <p className="text-[9px] tracking-[0.12em] text-neutral-600">{t('footer.slogan')}</p>
      </div>
    </footer>
  )
}
