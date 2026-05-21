import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

const APPS = [
  { id: 'APP-2024-000567', user: 'Giorgi T.', coin: 'Silver 1KG', value: '$2,450', sentAt: '10/05/2024 14:00', response: null,       log: ['10/05/2024 14:00 — Sent to Crystal'] },
  { id: 'APP-2024-000566', user: 'Nino M.',   coin: 'Silver 500g',value: '$1,340', sentAt: '08/05/2024 10:30', response: 'APPROVED', log: ['08/05/2024 10:30 — Sent to Crystal', '09/05/2024 09:00 — Crystal approved'] },
  { id: 'APP-2024-000563', user: 'Levan B.',  coin: 'Silver 2KG', value: '$3,960', sentAt: '10/04/2024 11:00', response: 'REJECTED', log: ['10/04/2024 11:00 — Sent to Crystal', '11/04/2024 15:00 — Crystal rejected'] },
]

export default function AdminCrystalPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [responses, setResponses] = useState<Record<string, string>>(
    Object.fromEntries(APPS.filter(a => a.response).map(a => [a.id, a.response!]))
  )

  const app = APPS.find((a) => a.id === selected)

  return (
    <AdminLayout title="ADMIN PANEL" subtitle="CRYSTAL WORKFLOW">
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '20px' }}>
        {/* List */}
        <div className="gold-card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c' }}>APPLICATIONS SENT TO CRYSTAL</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {APPS.map((a) => {
              const resp = responses[a.id]
              const rc = resp === 'APPROVED' ? { bg: 'rgba(34,197,94,0.1)', color: '#22c55e' } : resp === 'REJECTED' ? { bg: 'rgba(239,68,68,0.1)', color: '#f87171' } : { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' }
              return (
                <div key={a.id} onClick={() => setSelected(selected === a.id ? null : a.id)}
                  style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: selected === a.id ? 'rgba(201,168,76,0.06)' : 'transparent' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c' }}>{a.id}</p>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', background: rc.bg, color: rc.color, borderRadius: '2px' }}>{resp || 'AWAITING'}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#fff' }}>{a.user} · {a.coin} · {a.value}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>Sent: {a.sentAt}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detail */}
        {app && (
          <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c' }}>CRYSTAL WORKFLOW</p>
              <button onClick={() => setSelected(null)} style={{ color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              {[
                { n: 1, title: 'SEND TO CRYSTAL',       done: true },
                { n: 2, title: 'CRYSTAL CONTACTS USER', done: !!responses[app.id] },
                { n: 3, title: 'UPDATE RESPONSE',       done: !!responses[app.id] },
              ].map((s) => (
                <div key={s.n} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: s.done ? 'linear-gradient(135deg,#c9a84c,#f5d78e)' : '#111', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, color: s.done ? '#000' : 'rgba(255,255,255,0.3)', flexShrink: 0 }}>{s.n}</div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: s.done ? '#fff' : 'rgba(255,255,255,0.35)' }}>{s.title}</p>
                </div>
              ))}
            </div>

            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', marginBottom: '20px' }}>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>COMMUNICATION LOG</p>
              {app.log.map((l, i) => (
                <p key={i} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{l}</p>
              ))}
            </div>

            {!responses[app.id] && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setResponses(s => ({ ...s, [app.id]: 'APPROVED' }))} style={{ flex: 1, padding: '11px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '2px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>✓ APPROVE</button>
                <button onClick={() => setResponses(s => ({ ...s, [app.id]: 'REJECTED' }))} style={{ flex: 1, padding: '11px', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '2px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>✗ REJECT</button>
              </div>
            )}
            {responses[app.id] && (
              <div style={{ padding: '12px', background: responses[app.id] === 'APPROVED' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${responses[app.id] === 'APPROVED' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`, borderRadius: '2px', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: responses[app.id] === 'APPROVED' ? '#22c55e' : '#f87171' }}>{responses[app.id] === 'APPROVED' ? '✓ APPROVED BY CRYSTAL' : '✗ REJECTED BY CRYSTAL'}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
