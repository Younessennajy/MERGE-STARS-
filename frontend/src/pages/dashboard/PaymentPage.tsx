import { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'

type Method = 'full' | 'bank'

export default function PaymentPage() {
  const [method, setMethod] = useState<Method>('bank')

  const coinValue   = 2450
  const downPayment = coinValue * 0.2
  const toFinance   = coinValue - downPayment
  const monthly12   = (toFinance / 12).toFixed(2)
  const monthly24   = (toFinance / 24).toFixed(2)

  return (
    <DashboardLayout titleKey="payment">
      <div style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '8px' }}>PAYMENT & FINANCING</p>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff' }}>Order: ORD-2024-000123</h1>
        </div>

        {/* Lock notice */}
        <div style={{ padding: '16px 20px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '4px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px' }}>🔒</span>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', marginBottom: '4px' }}>PRODUCTION LOCK</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              Production begins ONLY after <strong style={{ color: '#f59e0b' }}>payment_status = PAID</strong> or <strong style={{ color: '#f59e0b' }}>bank_status = APPROVED</strong>.
              No partial payments or speculative production.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {/* Method selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>SELECT PAYMENT METHOD</p>

            {/* Full payment */}
            <div
              className="gold-card"
              style={{ padding: '20px', borderRadius: '4px', cursor: 'pointer', borderColor: method === 'full' ? '#c9a84c' : undefined }}
              onClick={() => setMethod('full')}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${method === 'full' ? '#c9a84c' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {method === 'full' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#c9a84c' }} />}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>FULL PAYMENT</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Pay ${coinValue.toLocaleString()} in full. Bank transfer or card.</p>
                  <p style={{ fontSize: '11px', color: '#22c55e', marginTop: '8px', fontWeight: 600 }}>✓ No additional fees</p>
                </div>
              </div>
            </div>

            {/* Bank financing */}
            <div
              className="gold-card"
              style={{ padding: '20px', borderRadius: '4px', cursor: 'pointer', borderColor: method === 'bank' ? '#c9a84c' : undefined }}
              onClick={() => setMethod('bank')}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${method === 'bank' ? '#c9a84c' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {method === 'bank' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#c9a84c' }} />}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>BANK FINANCING</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Apply for financing via Crystal partner. Subject to approval.</p>
                  <p style={{ fontSize: '11px', color: '#f59e0b', marginTop: '8px', fontWeight: 600 }}>⚠ Approval not guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="gold-card" style={{ padding: '28px', borderRadius: '4px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '20px' }}>
              {method === 'full' ? 'FULL PAYMENT SUMMARY' : 'FINANCING PREVIEW'}
            </p>

            {method === 'full' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { label: 'Coin Value',     value: `$${coinValue.toLocaleString()}.00` },
                  { label: 'Payment Method', value: 'Bank Transfer / Card' },
                  { label: 'Total Due',      value: `$${coinValue.toLocaleString()}.00` },
                ].map((r) => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{r.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{r.value}</span>
                  </div>
                ))}
                <button className="gold-btn w-full justify-center mt-5">
                  PROCEED TO PAYMENT
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { label: 'Coin Value',         value: `$${coinValue.toLocaleString()}.00` },
                  { label: 'Down Payment (20%)', value: `$${downPayment.toFixed(2)}` },
                  { label: 'Amount to Finance',  value: `$${toFinance.toFixed(2)}` },
                ].map((r) => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{r.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{r.value}</span>
                  </div>
                ))}
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: '8px 0' }}>Choose financing term:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '4px 0 16px' }}>
                  {[
                    { months: 12, monthly: monthly12 },
                    { months: 24, monthly: monthly24 },
                  ].map((opt) => (
                    <div key={opt.months} className="gold-card" style={{ padding: '12px', textAlign: 'center', cursor: 'pointer', borderRadius: '4px' }}>
                      <p style={{ fontSize: '16px', fontWeight: 900, color: '#c9a84c' }}>{opt.months} mo</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>${opt.monthly}/mo</p>
                    </div>
                  ))}
                </div>
                <button className="gold-btn w-full justify-center">
                  APPLY FOR FINANCING
                </button>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: '12px', lineHeight: 1.6 }}>
                  *Provided by Crystal. Subject to evaluation and approval.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
