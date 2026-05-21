import { useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const NAV = [
  { icon: '⊞', labelKey: 'dashboard.nav.dashboard', href: '/dashboard', exact: true },
  { icon: '◦', labelKey: 'dashboard.nav.profile', href: '/dashboard/profile' },
  { icon: '◦', labelKey: 'dashboard.nav.applications', href: '/apply', match: ['/apply', '/status'] },
  { icon: '◦', labelKey: 'dashboard.nav.calculator', href: '/calculator', match: ['/calculator'] },
  { icon: '◦', labelKey: 'dashboard.nav.orders', href: '/dashboard/orders' },
  { icon: '◦', labelKey: 'dashboard.nav.coins', href: '/dashboard/coins' },
  { icon: '◦', labelKey: 'dashboard.nav.investments', href: '/dashboard/investments' },
  { icon: '◦', labelKey: 'dashboard.nav.brandLine', href: '/dashboard/brand' },
  { icon: '◦', labelKey: 'dashboard.nav.qrIdentity', href: '/dashboard/qr' },
  { icon: '◦', labelKey: 'dashboard.nav.payment', href: '/dashboard/payment' },
  { icon: '◦', labelKey: 'dashboard.nav.delivery', href: '/dashboard/delivery' },
  { icon: '◦', labelKey: 'dashboard.nav.referral', href: '/dashboard/referral' },
  { icon: '◦', labelKey: 'dashboard.nav.messages', href: '/dashboard/messages', badge: 3 },
  { icon: '◦', labelKey: 'dashboard.nav.aiAssistant', href: '/dashboard/ai' },
  { icon: '◦', labelKey: 'dashboard.nav.support', href: '/dashboard/support' },
  { icon: '◦', labelKey: 'dashboard.nav.settings', href: '/dashboard/settings' },
] as const

const METALS = [
  { name: 'GOLD', price: '$67.42', change: '+0.85%' },
  { name: 'SILVER', price: '$0.897', change: '+1.23%' },
  { name: 'PLATINUM', price: '$32.15', change: '+0.62%' },
  { name: 'PALLADIUM', price: '$29.71', change: '+0.18%' },
]

function isNavActive(pathname: string, item: (typeof NAV)[number]): boolean {
  if ('match' in item && item.match) {
    return item.match.some((p) => pathname === p || pathname.startsWith(p + '/'))
  }
  if ('exact' in item && item.exact) return pathname === item.href
  return pathname === item.href || pathname.startsWith(item.href + '/')
}

interface Props {
  children: ReactNode
  /** i18n key under dashboard.titles.* — e.g. "referral" */
  titleKey?: string
  /** raw title override (used when titleKey not set) */
  title?: string
}

export default function DashboardLayout({ children, title, titleKey }: Props) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const headerTitle = titleKey
    ? t(`dashboard.titles.${titleKey}`)
    : title || t('dashboard.titles.dashboard')

  return (
    <div className="dash-shell flex min-h-screen">
      <aside className={`dash-sidebar ${open ? 'dash-sidebar--open' : 'dash-sidebar--collapsed'}`}>
        <div className="dash-sidebar-head">
          <Link to="/" className="flex items-center gap-3 no-underline shrink-0">
            <div className="dash-logo-mark">★</div>
            {open && (
              <div className="font-serif-display leading-none">
                <p className="text-[9px] font-light tracking-[0.38em] text-[#D4AF37]">MERGE</p>
                <p className="text-[9px] font-light tracking-[0.38em] text-neutral-400">STARS</p>
              </div>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="dash-sidebar-toggle"
            aria-label={open ? t('dashboard.collapseMenu') : t('dashboard.expandMenu')}
          >
            {open ? '◂' : '▸'}
          </button>
        </div>

        <nav className="dash-nav flex-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = isNavActive(location.pathname, item)
            const label = t(item.labelKey)
            return (
              <Link
                key={item.href + item.labelKey}
                to={item.href}
                title={!open ? label : undefined}
                className={`dash-nav-link ${active ? 'dash-nav-link--active' : ''}`}
              >
                <span className="dash-nav-icon">{item.icon}</span>
                {open && (
                  <>
                    <span className="dash-nav-label">{label}</span>
                    {'badge' in item && item.badge != null && (
                      <span className="dash-nav-badge">{item.badge}</span>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        <button type="button" onClick={() => navigate('/login')} className="dash-logout">
          <span>↗</span>
          {open && <span>{t('dashboard.logout')}</span>}
        </button>
      </aside>

      <div className="dash-main flex-1 flex flex-col min-w-0">
        <header className="dash-header">
          <div>
            <p className="dash-header-kicker">{t('dashboard.welcomeBack')}</p>
            <div className="flex items-center gap-3 flex-wrap mt-1">
              <h1 className="dash-header-title">{headerTitle}</h1>
              <span className="dash-id-pill">MS-782456</span>
            </div>
          </div>
          <nav className="dash-header-actions" aria-label="Quick links">
            <LanguageSwitcher variant="compact" />
            <Link
              to="/dashboard/messages"
              className="dash-header-btn"
              aria-label={t('dashboard.notifications')}
              title={t('dashboard.notifications')}
            >
              <span className="dash-header-btn-icon" aria-hidden>
                🔔
              </span>
              <span className="dash-header-dot">2</span>
            </Link>
            <Link
              to="/dashboard/messages"
              className="dash-header-btn"
              aria-label={t('dashboard.messages')}
              title={t('dashboard.messages')}
            >
              <span className="dash-header-btn-icon" aria-hidden>
                ✉
              </span>
            </Link>
            <Link
              to="/dashboard/profile"
              className="dash-header-btn dash-header-btn--avatar"
              aria-label={t('dashboard.myProfile')}
              title={t('dashboard.myProfile')}
            >
              <span className="dash-avatar-text">MS</span>
            </Link>
          </nav>
        </header>

        <main className="dash-content flex-1 overflow-y-auto">{children}</main>

        <div className="dash-ticker shrink-0 overflow-hidden">
          <div className="ticker-scroll flex whitespace-nowrap">
            {[...METALS, ...METALS, ...METALS, ...METALS].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-8 text-[10px] tracking-wide">
                <span className="text-[#D4AF37] font-medium">{m.name}</span>
                <span className="text-neutral-500">{m.price}/g</span>
                <span className="text-emerald-400/90 font-medium">{m.change}</span>
                <span className="text-neutral-700 mx-1">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
