import AdminLayout from '../../components/AdminLayout'

const ORDERS = [
  { id: 'APP-2024-000567', user: 'Giorgi T.', coin: 'Silver 1KG', value: '$2,450', payment: 'PENDING',  bank: '—',        crystal: 'Sent', date: '10/05/2024' },
  { id: 'APP-2024-000566', user: 'Nino M.',   coin: 'Silver 500g',value: '$1,340', payment: 'PAID',     bank: '—',        crystal: 'Yes',  date: '08/05/2024' },
  { id: 'APP-2024-000565', user: 'David K.',  coin: 'Gold 1KG',   value: '$8,900', payment: '—',        bank: 'APPROVED', crystal: 'Yes',  date: '01/05/2024' },
  { id: 'APP-2024-000564', user: 'Mariam L.', coin: 'Silver 1KG', value: '$2,450', payment: 'PAID',     bank: '—',        crystal: 'Yes',  date: '15/04/2024' },
  { id: 'APP-2024-000563', user: 'Levan B.',  coin: 'Silver 2KG', value: '$3,960', payment: '—',        bank: 'REJECTED', crystal: 'Yes',  date: '10/04/2024' },
]

const STATUS_COLOR = (v: string) => {
  if (v === 'PAID' || v === 'APPROVED') return { bg: 'rgba(34,197,94,0.1)', color: '#22c55e' }
  if (v === 'REJECTED') return { bg: 'rgba(239,68,68,0.1)', color: '#f87171' }
  if (v === 'PENDING')  return { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' }
  return { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }
}

export default function AdminFinancePage() {
  const totalFunds = ORDERS.filter(o => o.payment === 'PAID').reduce((s, o) => s + parseFloat(o.value.replace(/[$,]/g, '')), 0)

  return (
    <AdminLayout title="ADMIN PANEL" subtitle="FINANCE PANEL">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'TOTAL FUNDS RECEIVED', value: `$${totalFunds.toLocaleString()}`, color: '#22c55e' },
          { label: 'PAYMENT PENDING',       value: ORDERS.filter(o => o.payment === 'PENDING').length, color: '#f59e0b' },
          { label: 'BANK APPROVED',         value: ORDERS.filter(o => o.bank === 'APPROVED').length,   color: '#60a5fa' },
          { label: 'BANK REJECTED',         value: ORDERS.filter(o => o.bank === 'REJECTED').length,   color: '#f87171' },
          { label: 'PLATFORM FEE (2%)',     value: `$${(totalFunds * 0.02).toFixed(2)}`,               color: '#c9a84c' },
        ].map((s) => (
          <div key={s.label} className="gold-card" style={{ padding: '18px 20px', borderRadius: '4px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>{s.label}</p>
            <p style={{ fontSize: '24px', fontWeight: 900, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Lock rule notice */}
      <div style={{ padding: '14px 20px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '4px', marginBottom: '24px' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
          🔒 Production lock rule: <strong style={{ color: '#60a5fa' }}>payment_status = PAID</strong> OR <strong style={{ color: '#60a5fa' }}>bank_status = APPROVED</strong> required before production can begin.
        </p>
      </div>

      <div className="gold-card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(201,168,76,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c' }}>FINANCE RECORDS</p>
          <button className="gold-btn">EXPORT</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['ORDER ID', 'USER', 'COIN', 'VALUE', 'PAYMENT', 'BANK STATUS', 'CRYSTAL', 'DATE', 'ACTIONS'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => {
                const pc = STATUS_COLOR(o.payment)
                const bc = STATUS_COLOR(o.bank)
                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#c9a84c' }}>{o.id}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#fff' }}>{o.user}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{o.coin}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#fff' }}>{o.value}</td>
                    <td style={{ padding: '12px 16px' }}><span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', background: pc.bg, color: pc.color, borderRadius: '2px' }}>{o.payment}</span></td>
                    <td style={{ padding: '12px 16px' }}><span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', background: bc.bg, color: bc.color, borderRadius: '2px' }}>{o.bank}</span></td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{o.crystal}</td>
                    <td style={{ padding: '12px 16px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{o.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px', cursor: 'pointer', fontWeight: 700 }}>PDF</button>
                        {o.payment === 'PENDING' && <button style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '2px', cursor: 'pointer', fontWeight: 700 }}>CONFIRM</button>}
                        {o.bank === '—' && o.payment === 'PENDING' && <button style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '2px', cursor: 'pointer', fontWeight: 700 }}>BANK ▲</button>}
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
