import AdminLayout from '../../components/AdminLayout'

const QUEUE = [
  { id: 'APP-2024-000565', user: 'David K.',  coin: 'Gold 1KG',   value: '$8,900', status: 'IN_PRODUCTION', factory: 'Factory #1', progress: 60, start: '12/05/2024', eta: '25/05/2024' },
  { id: 'APP-2024-000564', user: 'Mariam L.', coin: 'Silver 1KG', value: '$2,450', status: 'QC',           factory: 'Factory #2', progress: 90, start: '08/05/2024', eta: '22/05/2024' },
  { id: 'APP-2024-000563', user: 'Levan B.',  coin: 'Silver 2KG', value: '$3,960', status: 'READY',        factory: 'Factory #1', progress: 100, start: '01/05/2024', eta: '20/05/2024' },
  { id: 'APP-2024-000562', user: 'Ana G.',    coin: 'Silver 1KG', value: '$2,450', status: 'WAITING',      factory: '—',          progress: 0,  start: '—',          eta: '—' },
]

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  WAITING:       { bg: 'rgba(255,255,255,0.06)',  color: 'rgba(255,255,255,0.4)' },
  IN_PRODUCTION: { bg: 'rgba(139,92,246,0.1)',    color: '#a78bfa' },
  QC:            { bg: 'rgba(20,184,166,0.1)',    color: '#2dd4bf' },
  READY:         { bg: 'rgba(34,197,94,0.1)',     color: '#4ade80' },
  DELIVERED:     { bg: 'rgba(34,197,94,0.15)',    color: '#22c55e' },
}

export default function AdminProductionPage() {
  return (
    <AdminLayout title="ADMIN PANEL" subtitle="PRODUCTION MANAGEMENT">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '16px', marginBottom: '24px' }}>
        {Object.entries({ WAITING: 0, IN_PRODUCTION: 0, QC: 0, READY: 0 }).map(([status]) => {
          const count = QUEUE.filter(q => q.status === status).length
          const sc = STATUS_COLORS[status]
          return (
            <div key={status} className="gold-card" style={{ padding: '18px 20px', borderRadius: '4px' }}>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>{status}</p>
              <p style={{ fontSize: '28px', fontWeight: 900, color: sc.color }}>{count}</p>
            </div>
          )
        })}
      </div>

      <div className="gold-card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(201,168,76,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c' }}>PRODUCTION QUEUE</p>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{QUEUE.length} orders</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {QUEUE.map((q) => {
            const sc = STATUS_COLORS[q.status]
            return (
              <div key={q.id} style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '4px' }}>{q.id}</p>
                    <p style={{ fontSize: '13px', color: '#fff' }}>{q.user} · {q.coin} · {q.value}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '4px 10px', background: sc.bg, color: sc.color, borderRadius: '2px', display: 'inline-block', marginBottom: '6px' }}>{q.status}</span>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{q.factory}</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>Progress</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: sc.color }}>{q.progress}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${q.progress}%`, background: q.progress === 100 ? '#22c55e' : 'linear-gradient(90deg,#c9a84c,#f5d78e)', borderRadius: '2px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', marginTop: '10px' }}>
                  {[{ l: 'Start', v: q.start }, { l: 'ETA', v: q.eta }].map((d) => (
                    <div key={d.l}>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{d.l}: </span>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{d.v}</span>
                    </div>
                  ))}
                  {q.status !== 'WAITING' && (
                    <button style={{ marginLeft: 'auto', fontSize: '10px', padding: '4px 12px', background: 'rgba(201,168,76,0.08)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px', cursor: 'pointer', fontWeight: 700 }}>
                      UPDATE STATUS
                    </button>
                  )}
                  {q.status === 'WAITING' && (
                    <button style={{ marginLeft: 'auto', fontSize: '10px', padding: '4px 12px', background: 'rgba(139,92,246,0.08)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '2px', cursor: 'pointer', fontWeight: 700 }}>
                      ASSIGN & START
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
