import { Link, useLocation, useNavigate } from 'react-router-dom'

const NAV = [
  { icon: '⊞',  label: 'DASHBOARD',    href: '/dashboard' },
  { icon: '👥', label: 'USERS',         href: '/admin/users' },
  { icon: '🪪', label: 'KYC',           href: '/admin/kyc' },
  { icon: '📋', label: 'APPLICATIONS',  href: '/admin' },
  { icon: '🏦', label: 'FINANCE',       href: '/admin/finance' },
  { icon: '💎', label: 'CRYSTAL LOG',   href: '/admin/crystal' },
  { icon: '🏭', label: 'PRODUCTION',    href: '/admin/production' },
  { icon: '📊', label: 'ANALYTICS',     href: '/admin/analytics' },
  { icon: '🗂',  label: 'AUDIT LOG',    href: '/admin/audit' },
  { icon: '⚙',  label: 'SETTINGS',     href: '/admin/settings' },
]

interface Props { children: React.ReactNode; title?: string; subtitle?: string }

export default function AdminLayout({ children, title = 'ADMIN PANEL', subtitle }: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen" style={{ background: '#080808' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '200px', flexShrink: 0,
          background: '#0a0a0a',
          borderRight: '1px solid rgba(201,168,76,0.12)',
          minHeight: '100vh',
          position: 'sticky', top: 0, height: '100vh',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '18px 16px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg,#c9a84c,#f5d78e)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#000', flexShrink: 0 }}>★</div>
          <div>
            <p style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.35em', color: '#c9a84c' }}>MERGE</p>
            <p style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.35em', color: '#fff' }}>ADMIN</p>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '8px', overflowY: 'auto' }}>
          {NAV.map((item) => {
            const active = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 10px', borderRadius: '4px', textDecoration: 'none',
                  background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color: active ? '#c9a84c' : 'rgba(255,255,255,0.4)',
                  borderLeft: active ? '2px solid #c9a84c' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <button
          onClick={() => navigate('/login')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 16px',
            color: 'rgba(255,255,255,0.3)',
            background: 'none',
            cursor: 'pointer',
            border: 'none',
            borderTop: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          <span style={{ fontSize: '14px' }}>🚪</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em' }}>LOGOUT</span>
        </button>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <header style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', fontWeight: 600 }}>{title}</p>
            {subtitle && <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', marginTop: '2px' }}>{subtitle}</h2>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '4px 10px', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', letterSpacing: '0.1em' }}>ADMIN</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#ef4444,#f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, color: '#fff' }}>A</div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
