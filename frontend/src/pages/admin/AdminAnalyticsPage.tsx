import AdminLayout from '../../components/AdminLayout'

const STATS = [
  { label: 'TOTAL USERS',     value: '256',      change: '+12.6%', up: true,  color: '#fff' },
  { label: 'VERIFIED USERS',  value: '198',      change: '+8.3%',  up: true,  color: '#22c55e' },
  { label: 'TOTAL ORDERS',    value: '89',       change: '+15.2%', up: true,  color: '#c9a84c' },
  { label: 'APPROVED',        value: '67',       change: '+9.1%',  up: true,  color: '#22c55e' },
  { label: 'CONVERSION RATE', value: '34.8%',    change: '+2.1%',  up: true,  color: '#60a5fa' },
  { label: 'QR SCANS (MTD)',  value: '1,247',    change: '+22.4%', up: true,  color: '#a78bfa' },
  { label: 'TOTAL REVENUE',   value: '$145,250', change: '+14.4%', up: true,  color: '#c9a84c' },
  { label: 'PLATFORM FEE',    value: '$2,905',   change: '+14.4%', up: true,  color: '#f5d78e' },
]

const MONTHLY = [
  { month: 'Jan', orders: 4,  revenue: 9800 },
  { month: 'Feb', orders: 6,  revenue: 14700 },
  { month: 'Mar', orders: 9,  revenue: 22050 },
  { month: 'Apr', orders: 14, revenue: 34300 },
  { month: 'May', orders: 22, revenue: 53900 },
]

const COUNTRIES = [
  { country: 'Georgia',        pct: 68, count: 174 },
  { country: 'USA',            pct: 12, count: 31 },
  { country: 'Germany',        pct: 8,  count: 20 },
  { country: 'UK',             pct: 6,  count: 15 },
  { country: 'Other',          pct: 6,  count: 16 },
]

const maxRevenue = Math.max(...MONTHLY.map(m => m.revenue))

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout title="ADMIN PANEL" subtitle="ANALYTICS DASHBOARD">
      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '14px', marginBottom: '28px' }}>
        {STATS.map((s) => (
          <div key={s.label} className="gold-card" style={{ padding: '16px 18px', borderRadius: '4px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>{s.label}</p>
            <p style={{ fontSize: '22px', fontWeight: 900, color: s.color, marginBottom: '4px' }}>{s.value}</p>
            <p style={{ fontSize: '10px', fontWeight: 600, color: s.up ? '#22c55e' : '#f87171' }}>{s.change} this month</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '20px', marginBottom: '20px' }}>
        {/* Revenue chart */}
        <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c', marginBottom: '20px' }}>MONTHLY REVENUE</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
            {MONTHLY.map((m) => (
              <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                <p style={{ fontSize: '10px', color: '#c9a84c', fontWeight: 700 }}>${(m.revenue / 1000).toFixed(1)}k</p>
                <div
                  style={{
                    width: '100%', borderRadius: '2px 2px 0 0',
                    height: `${(m.revenue / maxRevenue) * 120}px`,
                    background: m.month === 'May' ? 'linear-gradient(180deg,#c9a84c,#f5d78e)' : 'rgba(201,168,76,0.25)',
                    transition: 'height 0.5s ease',
                  }}
                />
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{m.month}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Orders chart */}
        <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c', marginBottom: '20px' }}>MONTHLY ORDERS</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
            {MONTHLY.map((m) => {
              const max = Math.max(...MONTHLY.map(x => x.orders))
              return (
                <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                  <p style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 700 }}>{m.orders}</p>
                  <div style={{ width: '100%', borderRadius: '2px 2px 0 0', height: `${(m.orders / max) * 120}px`, background: m.month === 'May' ? 'linear-gradient(180deg,#3b82f6,#60a5fa)' : 'rgba(59,130,246,0.2)', transition: 'height 0.5s ease' }} />
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{m.month}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '20px' }}>
        {/* Country distribution */}
        <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c', marginBottom: '20px' }}>USER DISTRIBUTION BY COUNTRY</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {COUNTRIES.map((c) => (
              <div key={c.country}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>{c.country}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{c.count} · {c.pct}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${c.pct}%`, background: 'linear-gradient(90deg,#c9a84c,#f5d78e)', borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent conversions */}
        <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c', marginBottom: '20px' }}>CONVERSION FUNNEL</p>
          {[
            { stage: 'Registered',  count: 256, pct: 100 },
            { stage: 'KYC Verified',count: 198, pct: 77 },
            { stage: 'Brand Created',count: 145, pct: 57 },
            { stage: 'Order Placed', count: 89,  pct: 35 },
            { stage: 'Approved',     count: 67,  pct: 26 },
            { stage: 'Delivered',    count: 45,  pct: 18 },
          ].map((f) => (
            <div key={f.stage} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{f.stage}</span>
                <span style={{ fontSize: '11px', color: '#c9a84c', fontWeight: 700 }}>{f.count} ({f.pct}%)</span>
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${f.pct}%`, background: `rgba(201,168,76,${f.pct / 100})`, borderRadius: '2px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
