import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

const QUEUE = [
  { id: 'MERGE-000003', name: 'David Kvaratskhelia', idNo: 'GE-23456789', dob: '15/03/1990', phone: '+995 555 003', email: 'david@example.com', submitted: '05/05/2024 10:30', status: 'PENDING' },
  { id: 'MERGE-000004', name: 'Mariam Lomidze',      idNo: 'GE-34567890', dob: '22/07/1988', phone: '+995 555 004', email: 'mariam@example.com', submitted: '07/05/2024 14:15', status: 'PENDING' },
]

export default function AdminKYCPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [statuses, setStatuses] = useState<Record<string, string>>({})

  const item = QUEUE.find((q) => q.id === selected)

  const decide = (id: string, decision: 'VERIFIED' | 'REJECTED') => {
    setStatuses((s) => ({ ...s, [id]: decision }))
    setSelected(null)
  }

  return (
    <AdminLayout title="ADMIN PANEL" subtitle="KYC VERIFICATION">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'PENDING',  value: QUEUE.length,                                        color: '#f59e0b' },
          { label: 'VERIFIED', value: Object.values(statuses).filter(s => s === 'VERIFIED').length, color: '#22c55e' },
          { label: 'REJECTED', value: Object.values(statuses).filter(s => s === 'REJECTED').length, color: '#f87171' },
        ].map((s) => (
          <div key={s.label} className="gold-card" style={{ padding: '18px 20px', borderRadius: '4px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>{s.label}</p>
            <p style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '20px' }}>
        {/* Queue */}
        <div className="gold-card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c' }}>KYC VERIFICATION QUEUE</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {QUEUE.map((q) => {
              const st = statuses[q.id] || q.status
              const colors = { PENDING: '#f59e0b', VERIFIED: '#22c55e', REJECTED: '#f87171' }
              return (
                <div key={q.id}
                  style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: selected === q.id ? 'rgba(201,168,76,0.06)' : 'transparent', transition: 'background 0.15s' }}
                  onClick={() => setSelected(selected === q.id ? null : q.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{q.name}</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{q.id} · Submitted: {q.submitted}</p>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '4px 10px', background: `rgba(${st === 'VERIFIED' ? '34,197,94' : st === 'REJECTED' ? '239,68,68' : '245,158,11'},0.1)`, color: colors[st as keyof typeof colors], borderRadius: '2px' }}>{st}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detail */}
        {item && (
          <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c' }}>KYC DETAILS</p>
              <button onClick={() => setSelected(null)} style={{ color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            {[
              { label: 'Full Name',    value: item.name },
              { label: 'Merge ID',     value: item.id },
              { label: 'ID Number',    value: item.idNo },
              { label: 'Date of Birth',value: item.dob },
              { label: 'Phone',        value: item.phone },
              { label: 'Email',        value: item.email },
              { label: 'Submitted',    value: item.submitted },
            ].map((d) => (
              <div key={d.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{d.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{d.value}</span>
              </div>
            ))}

            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px' }}>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>ID DOCUMENT</p>
              <div style={{ height: '80px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>📄 Document uploaded</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => decide(item.id, 'VERIFIED')} style={{ flex: 1, padding: '12px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '2px', cursor: 'pointer', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>✓ VERIFY</button>
              <button onClick={() => decide(item.id, 'REJECTED')} style={{ flex: 1, padding: '12px', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '2px', cursor: 'pointer', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>✗ REJECT</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
