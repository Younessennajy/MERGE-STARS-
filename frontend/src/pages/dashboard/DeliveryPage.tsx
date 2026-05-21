import DashboardLayout from '../../components/DashboardLayout'

const TRACK_STEPS = [
  { label: 'Order Confirmed',    icon: '✅', done: true,  date: '10/05/2024 09:15' },
  { label: 'In Production',      icon: '🏭', done: true,  date: '12/05/2024 14:00' },
  { label: 'Quality Check',      icon: '🔍', done: true,  date: '18/05/2024 10:30' },
  { label: 'Ready for Dispatch', icon: '📦', done: true,  date: '20/05/2024 09:00' },
  { label: 'Dispatched',         icon: '🚚', done: true,  date: '20/05/2024 15:45', current: true },
  { label: 'In Transit',         icon: '✈',  done: false, date: null },
  { label: 'Out for Delivery',   icon: '🛵', done: false, date: null },
  { label: 'Delivered',          icon: '🏠', done: false, date: null },
]

export default function DeliveryPage() {
  return (
    <DashboardLayout titleKey="delivery">
      <div style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '8px' }}>DELIVERY TRACKING</p>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff' }}>Order: ORD-2024-000122</h1>
        </div>

        {/* Tracking banner */}
        <div className="gold-card" style={{ padding: '20px 28px', borderRadius: '4px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          {[
            { label: 'Tracking Code', value: 'MS-TRK-2024-000122', color: '#c9a84c' },
            { label: 'Courier',       value: 'DHL Express',          color: '#fff' },
            { label: 'Est. Delivery', value: '24/05/2024',           color: '#fff' },
            { label: 'Status',        value: 'IN TRANSIT',           color: '#f59e0b' },
          ].map((d) => (
            <div key={d.label}>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '4px' }}>{d.label}</p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: d.color }}>{d.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {/* Timeline */}
          <div className="gold-card" style={{ padding: '28px', borderRadius: '4px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '24px' }}>TRACKING TIMELINE</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {TRACK_STEPS.map((s, i) => (
                <div key={s.label} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                      background: s.current ? 'linear-gradient(135deg,#c9a84c,#f5d78e)' : s.done ? 'rgba(201,168,76,0.15)' : '#111',
                      border: s.done && !s.current ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', color: s.current ? '#000' : s.done ? '#c9a84c' : 'rgba(255,255,255,0.2)',
                    }}>{s.icon}</div>
                    {i < TRACK_STEPS.length - 1 && (
                      <div style={{ width: '1px', height: '32px', background: s.done ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < TRACK_STEPS.length - 1 ? '0' : '0', paddingTop: '6px' }}>
                    <p style={{ fontSize: '12px', fontWeight: s.current ? 700 : 600, color: s.current ? '#c9a84c' : s.done ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}>
                      {s.label}
                      {s.current && <span style={{ marginLeft: '8px', fontSize: '9px', padding: '2px 6px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', borderRadius: '2px' }}>CURRENT</span>}
                    </p>
                    {s.date && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{s.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '16px' }}>DELIVERY ADDRESS</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                Merge Star<br />123 Luxury Avenue<br />Tbilisi, Georgia 0102<br />+995 555 123 456
              </p>
            </div>
            <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '16px' }}>ORDER CONTENTS</p>
              {[
                { label: 'Product',  value: 'Gold Coin (1KG)' },
                { label: 'Purity',   value: '99.9% Gold' },
                { label: 'Value',    value: '$8,900.00' },
                { label: 'Insured',  value: 'Yes — Full Value', color: '#22c55e' },
              ].map((d) => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{d.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: d.color || '#fff' }}>{d.value}</span>
                </div>
              ))}
            </div>
            <button className="gold-btn w-full justify-center">
              CONFIRM DELIVERY RECEIPT
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
