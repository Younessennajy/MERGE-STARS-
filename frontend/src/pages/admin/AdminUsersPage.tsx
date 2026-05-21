import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

const USERS = [
  { id: 'MERGE-000001', name: 'Giorgi Tavdgiridze', email: 'giorgi@example.com', phone: '+995 555 001', country: 'GE', kyc: 'VERIFIED',  joined: '01/05/2024', orders: 2 },
  { id: 'MERGE-000002', name: 'Nino Maisuradze',   email: 'nino@example.com',   phone: '+995 555 002', country: 'GE', kyc: 'VERIFIED',  joined: '02/05/2024', orders: 1 },
  { id: 'MERGE-000003', name: 'David Kvaratskhelia',email: 'david@example.com',  phone: '+995 555 003', country: 'GE', kyc: 'PENDING',   joined: '05/05/2024', orders: 0 },
  { id: 'MERGE-000004', name: 'Mariam Lomidze',    email: 'mariam@example.com', phone: '+995 555 004', country: 'GE', kyc: 'PENDING',   joined: '07/05/2024', orders: 0 },
  { id: 'MERGE-000005', name: 'Levan Beridze',     email: 'levan@example.com',  phone: '+995 555 005', country: 'GE', kyc: 'REJECTED',  joined: '08/05/2024', orders: 0 },
]

const KYC_COLORS: Record<string, { bg: string; color: string }> = {
  VERIFIED: { bg: 'rgba(34,197,94,0.1)',   color: '#22c55e' },
  PENDING:  { bg: 'rgba(245,158,11,0.1)',  color: '#f59e0b' },
  REJECTED: { bg: 'rgba(239,68,68,0.1)',   color: '#f87171' },
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [kycFilter, setKycFilter] = useState('All')

  const filtered = USERS.filter((u) => {
    const ms = (u.name + u.email + u.id).toLowerCase().includes(search.toLowerCase())
    const mk = kycFilter === 'All' || u.kyc === kycFilter
    return ms && mk
  })

  return (
    <AdminLayout title="ADMIN PANEL" subtitle="USER MANAGEMENT">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'TOTAL USERS',    value: USERS.length,                                           color: '#fff' },
          { label: 'VERIFIED',       value: USERS.filter(u => u.kyc === 'VERIFIED').length,         color: '#22c55e' },
          { label: 'PENDING KYC',    value: USERS.filter(u => u.kyc === 'PENDING').length,          color: '#f59e0b' },
          { label: 'REJECTED',       value: USERS.filter(u => u.kyc === 'REJECTED').length,         color: '#f87171' },
        ].map((s) => (
          <div key={s.label} className="gold-card" style={{ padding: '18px 20px', borderRadius: '4px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>{s.label}</p>
            <p style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="gold-card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '12px', padding: '16px 20px', borderBottom: '1px solid rgba(201,168,76,0.1)', flexWrap: 'wrap' }}>
          <input className="gold-input" style={{ width: '220px' }} placeholder="Search by name, email, ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="gold-input" style={{ width: '140px' }} value={kycFilter} onChange={(e) => setKycFilter(e.target.value)}>
            <option>All</option>
            <option>VERIFIED</option>
            <option>PENDING</option>
            <option>REJECTED</option>
          </select>
          <button className="gold-btn ml-auto">EXPORT CSV</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['MERGE ID', 'NAME', 'EMAIL', 'PHONE', 'COUNTRY', 'KYC', 'JOINED', 'ORDERS', 'ACTIONS'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const kc = KYC_COLORS[u.kyc]
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#c9a84c' }}>{u.id}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#fff', fontWeight: 600 }}>{u.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{u.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{u.phone}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{u.country}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', background: kc.bg, color: kc.color, borderRadius: '2px' }}>{u.kyc}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{u.joined}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#fff', fontWeight: 700 }}>{u.orders}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c' }} title="View">👁</button>
                        {u.kyc === 'PENDING' && <button style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '2px', cursor: 'pointer', fontWeight: 700 }}>VERIFY</button>}
                        <button style={{ fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(239,68,68,0.6)' }} title="Suspend">🚫</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
