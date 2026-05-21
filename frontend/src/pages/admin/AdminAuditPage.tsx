import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

const LOG = [
  { id: 'LOG-001', user: 'Admin', action: 'STATUS_CHANGE',    target: 'APP-2024-000567', before: 'SUBMITTED',  after: 'UNDER_REVIEW', ip: '192.168.1.1', ts: '10/05/2024 11:30:00', session: 'S-001' },
  { id: 'LOG-002', user: 'Giorgi T.', action: 'ORDER_SUBMIT', target: 'APP-2024-000567', before: 'DRAFT',      after: 'SUBMITTED',    ip: '192.168.1.2', ts: '10/05/2024 09:15:22', session: 'S-002' },
  { id: 'LOG-003', user: 'Admin', action: 'KYC_VERIFIED',     target: 'MERGE-000001',    before: 'PENDING',    after: 'VERIFIED',     ip: '192.168.1.1', ts: '09/05/2024 14:00:05', session: 'S-001' },
  { id: 'LOG-004', user: 'Admin', action: 'PAYMENT_CONFIRM',  target: 'APP-2024-000564', before: 'PENDING',    after: 'PAID',         ip: '192.168.1.1', ts: '15/04/2024 10:22:11', session: 'S-003' },
  { id: 'LOG-005', user: 'Admin', action: 'CRYSTAL_SEND',     target: 'APP-2024-000566', before: 'APPROVED',   after: 'SENT_CRYSTAL', ip: '192.168.1.1', ts: '08/05/2024 10:30:00', session: 'S-001' },
  { id: 'LOG-006', user: 'Nino M.',  action: 'USER_REGISTER', target: 'MERGE-000002',    before: '—',          after: 'CREATED',      ip: '10.0.0.5',    ts: '02/05/2024 08:00:01', session: 'S-004' },
  { id: 'LOG-007', user: 'Admin', action: 'PRODUCTION_START', target: 'APP-2024-000565', before: 'APPROVED',   after: 'PRODUCTION',   ip: '192.168.1.1', ts: '12/05/2024 14:00:00', session: 'S-005' },
]

const ACTION_COLORS: Record<string, string> = {
  STATUS_CHANGE:    '#c9a84c',
  ORDER_SUBMIT:     '#60a5fa',
  KYC_VERIFIED:     '#22c55e',
  PAYMENT_CONFIRM:  '#22c55e',
  CRYSTAL_SEND:     '#a78bfa',
  USER_REGISTER:    '#2dd4bf',
  PRODUCTION_START: '#f59e0b',
}

export default function AdminAuditPage() {
  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState('All')

  const filtered = LOG.filter((l) => {
    const ms = (l.user + l.action + l.target).toLowerCase().includes(search.toLowerCase())
    const ma = actionFilter === 'All' || l.action === actionFilter
    return ms && ma
  })

  return (
    <AdminLayout title="ADMIN PANEL" subtitle="AUDIT LOG">
      <div style={{ padding: '12px 16px', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '4px', marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <span style={{ fontSize: '16px' }}>🔒</span>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
          Audit Log is <strong style={{ color: '#c9a84c' }}>append-only</strong>. Critical logs cannot be deleted.
          All admin and user actions are permanently recorded with user, IP, timestamp, and before/after values.
        </p>
      </div>

      <div className="gold-card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '12px', padding: '14px 20px', borderBottom: '1px solid rgba(201,168,76,0.1)', flexWrap: 'wrap' }}>
          <input className="gold-input" style={{ width: '200px' }} placeholder="Search user, action, target..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="gold-input" style={{ width: '180px' }} value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
            <option>All</option>
            {Object.keys(ACTION_COLORS).map((a) => <option key={a}>{a}</option>)}
          </select>
          <button className="gold-btn ml-auto">EXPORT CSV</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['LOG ID', 'TIMESTAMP', 'USER', 'ACTION', 'TARGET', 'BEFORE', 'AFTER', 'IP'].map((h) => (
                  <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '11px 14px', fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{l.id}</td>
                  <td style={{ padding: '11px 14px', fontSize: '10px', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>{l.ts}</td>
                  <td style={{ padding: '11px 14px', fontSize: '12px', color: '#fff', fontWeight: 600 }}>{l.user}</td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 7px', background: `${ACTION_COLORS[l.action] || '#c9a84c'}1a`, color: ACTION_COLORS[l.action] || '#c9a84c', borderRadius: '2px' }}>{l.action}</span>
                  </td>
                  <td style={{ padding: '11px 14px', fontSize: '11px', color: '#c9a84c', fontWeight: 600 }}>{l.target}</td>
                  <td style={{ padding: '11px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{l.before}</td>
                  <td style={{ padding: '11px 14px', fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>{l.after}</td>
                  <td style={{ padding: '11px 14px', fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>Showing {filtered.length} of {LOG.length} records · Append-only · No deletion possible</p>
        </div>
      </div>
    </AdminLayout>
  )
}
