import { useState } from 'react'
import { Link } from 'react-router-dom'

const ADMIN_NAV = [
  { icon: '⊞', label: 'DASHBOARD',    href: '/dashboard' },
  { icon: '👥', label: 'USERS',        href: '/admin/users' },
  { icon: '📋', label: 'APPLICATIONS', href: '/admin',     active: true },
  { icon: '🏦', label: 'FINANCING',    href: '/admin/financing' },
  { icon: '💎', label: 'CRYSTAL LOG',  href: '/admin/crystal' },
  { icon: '📊', label: 'REPORTS',      href: '/admin/reports' },
  { icon: '⚙',  label: 'SETTINGS',    href: '/admin/settings' },
]

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  'Under Review':    { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b' },
  'Approved':        { bg: 'rgba(34,197,94,0.12)',   color: '#22c55e' },
  'Sent to Crystal': { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa' },
  'Funds Received':  { bg: 'rgba(20,184,166,0.12)',  color: '#2dd4bf' },
  'Rejected':        { bg: 'rgba(239,68,68,0.12)',   color: '#f87171' },
  'In Production':   { bg: 'rgba(139,92,246,0.12)',  color: '#a78bfa' },
}

const APPLICATIONS = [
  { id: 'APP-2024-000567', user: 'Giorgi T.', coin: 'Silver (1KG)', qty: 1, value: '$2,450.00', status: 'Under Review',    crystal: '—' },
  { id: 'APP-2024-000566', user: 'Nino M.',   coin: 'Silver 500g',  qty: 2, value: '$1,340.00', status: 'Sent to Crystal', crystal: 'Yes' },
  { id: 'APP-2024-000565', user: 'David K.',  coin: 'Gold 1KG',     qty: 1, value: '$8,900.00', status: 'Approved',        crystal: 'Yes' },
  { id: 'APP-2024-000564', user: 'Mariam L.', coin: 'Silver 1KG',   qty: 1, value: '$2,450.00', status: 'Funds Received',  crystal: 'Yes' },
  { id: 'APP-2024-000563', user: 'Levan B.',  coin: 'Silver 2KG',   qty: 1, value: '$3,960.00', status: 'In Production',   crystal: 'Yes' },
]

const STATS = [
  { label: 'TOTAL APPLICATIONS', value: '256', change: '+12.6%', up: true  },
  { label: 'APPROVED',           value: '98',  change: '+8.3%',  up: true  },
  { label: 'REJECTED',           value: '23',  change: '-5.2%',  up: false },
  { label: 'TOTAL FUNDS',        value: '$145,250', change: '+14.4%', up: true },
  { label: 'IN PRODUCTION',      value: '45',  change: '+8.2%',  up: true  },
]

export default function AdminPage() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [search, setSearch] = useState('')

  const filtered = APPLICATIONS.filter((a) => {
    const matchStatus = statusFilter === 'All Status' || a.status === statusFilter
    const matchSearch = a.id.toLowerCase().includes(search.toLowerCase()) || a.user.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const selected = APPLICATIONS.find((a) => a.id === selectedApp)

  return (
    <div className="flex min-h-screen" style={{ background: '#080808' }}>
      {/* Sidebar */}
      <aside
        className="w-[200px] shrink-0 flex flex-col"
        style={{ background: '#0a0a0a', borderRight: '1px solid rgba(201,168,76,0.12)', minHeight: '100vh' }}
      >
        <div
          className="flex items-center gap-2 px-5 py-5"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
        >
          <div
            className="flex items-center justify-center text-black font-black text-base"
            style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg,#c9a84c,#f5d78e)', borderRadius: '4px' }}
          >★</div>
          <div>
            <p className="text-[8px] font-black tracking-[0.35em]" style={{ color: '#c9a84c' }}>MERGE</p>
            <p className="text-[8px] font-black tracking-[0.35em] text-white">ADMIN</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-2 flex-1">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded transition-all"
              style={{
                background: item.active ? 'rgba(201,168,76,0.12)' : 'transparent',
                color: item.active ? '#c9a84c' : 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                borderLeft: item.active ? '2px solid #c9a84c' : '2px solid transparent',
              }}
            >
              <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
              <span className="text-[10px] font-semibold tracking-[0.1em]">{item.label}</span>
            </Link>
          ))}
        </nav>

        <Link
          to="/login"
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderTop: '1px solid rgba(201,168,76,0.1)', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
        >
          <span>🚪</span>
          <span className="text-[10px] font-semibold tracking-[0.1em]">LOGOUT</span>
        </Link>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className="px-8 py-4 flex items-center justify-between shrink-0"
          style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.1)' }}
        >
          <div>
            <p className="text-[10px] font-semibold tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>ADMIN PANEL</p>
            <h2 className="text-base font-black text-white tracking-widest">APPLICATIONS MANAGEMENT</h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-bold px-3 py-1.5"
              style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              ADMIN
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {STATS.map((s) => (
              <div key={s.label} className="gold-card p-4" style={{ borderRadius: '4px' }}>
                <p className="text-[9px] font-bold tracking-[0.15em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-[10px] mt-1 font-semibold" style={{ color: s.up ? '#22c55e' : '#ef4444' }}>{s.change}</p>
              </div>
            ))}
          </div>

          {/* Table + detail */}
          <div className="flex gap-5">
            {/* Table */}
            <div className="flex-1 gold-card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
              {/* Filters */}
              <div
                className="flex items-center gap-3 px-5 py-4 flex-wrap"
                style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
              >
                <p className="text-[11px] font-bold tracking-[0.15em]" style={{ color: '#c9a84c' }}>APPLICATIONS</p>
                <select
                  className="gold-input text-[11px] py-1.5"
                  style={{ width: 'auto' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  {Object.keys(STATUS_COLORS).map((s) => <option key={s}>{s}</option>)}
                </select>
                <input
                  className="gold-input text-[11px] py-1.5"
                  style={{ width: '180px' }}
                  placeholder="Search by ID or name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="gold-btn ml-auto">
                  EXPORT
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {['ID', 'USER', 'COIN TYPE', 'QTY', 'TOTAL VALUE', 'STATUS', 'CRYSTAL', 'ACTIONS'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[9px] font-bold tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((app) => {
                      const sc = STATUS_COLORS[app.status] || { bg: 'rgba(255,255,255,0.05)', color: '#fff' }
                      return (
                        <tr
                          key={app.id}
                          className="cursor-pointer transition-colors"
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            background: selectedApp === app.id ? 'rgba(201,168,76,0.06)' : 'transparent',
                          }}
                          onClick={() => setSelectedApp(selectedApp === app.id ? null : app.id)}
                        >
                          <td className="px-4 py-3 text-[11px] font-bold" style={{ color: '#c9a84c' }}>{app.id}</td>
                          <td className="px-4 py-3 text-[11px] text-white">{app.user}</td>
                          <td className="px-4 py-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{app.coin}</td>
                          <td className="px-4 py-3 text-[11px] text-white">{app.qty}</td>
                          <td className="px-4 py-3 text-[11px] font-bold text-white">{app.value}</td>
                          <td className="px-4 py-3">
                            <span
                              className="text-[9px] font-bold px-2 py-1 tracking-widest"
                              style={{ background: sc.bg, color: sc.color, borderRadius: '2px' }}
                            >
                              {app.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{app.crystal}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="text-sm" style={{ color: '#c9a84c' }}>👁</button>
                              <button className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✏</button>
                              <button className="text-sm" style={{ color: 'rgba(239,68,68,0.6)' }}>🗑</button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail panel */}
            {selected && (
              <div
                className="w-[280px] shrink-0 gold-card p-5 flex flex-col gap-4"
                style={{ borderRadius: '4px', maxHeight: '600px', overflowY: 'auto' }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold tracking-[0.15em]" style={{ color: '#c9a84c' }}>APPLICATION DETAILS</p>
                  <button onClick={() => setSelectedApp(null)} style={{ color: 'rgba(255,255,255,0.3)' }}>✕</button>
                </div>
                <p className="text-[11px] font-bold text-white">{selected.id}</p>
                {[
                  { label: 'User',       value: selected.user },
                  { label: 'Coin Type',  value: selected.coin },
                  { label: 'Quantity',   value: `${selected.qty} KG` },
                  { label: 'Total Value',value: selected.value },
                  { label: 'Status',     value: selected.status },
                  { label: 'Crystal',    value: selected.crystal },
                ].map((d) => (
                  <div key={d.label} className="flex flex-col gap-0.5 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{d.label}</span>
                    <span className="text-[12px] font-semibold text-white">{d.value}</span>
                  </div>
                ))}
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    className="gold-btn justify-center"
                    style={{ borderRadius: '2px' }}
                  >
                    SEND TO CRYSTAL
                  </button>
                  <button
                    className="py-2.5 text-[10px] font-bold tracking-widest transition-all"
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      color: '#f87171',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '2px',
                    }}
                  >
                    REJECT
                  </button>
                  <button
                    className="gold-btn-outline justify-center"
                    style={{ borderRadius: '2px' }}
                  >
                    VIEW / DOWNLOAD PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
