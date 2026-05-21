import DashboardLayout from '../../components/DashboardLayout'

const QR_TYPES = [
  { type: 'BRAND QR', id: 'QR-BRAND-000001', desc: 'Links to your brand catalog and public page.', color: '#c9a84c', scans: 89, icon: '🏷', qrColor: '#000', pattern: [1,1,1,0,1,1,1,1,0,0,1,0,0,1,1,0,1,0,1,0,1,1,0,0,0,1,0,1,1,1,1,0,1,1,1,0,0,1,0,0,1,0,0,0,0,1,0,1,1] },
  { type: 'CORE QR', id: 'QR-CORE-000001', desc: 'Links directly to your account profile.', color: '#a78bfa', scans: 234, icon: '👤', qrColor: '#7c3aed', pattern: [1,1,1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,0,1,1,0,1,0,1,0,0,1,0,1,1,1,1,0,1,1,0,1,0,0,1,0,1,0,1,0,1,1,0,1] },
  { type: 'REFERRAL QR', id: 'QR-REF-000001', desc: 'Used for referral attribution tracking.', color: '#22c55e', scans: 41, icon: '🤝', qrColor: '#16a34a', pattern: [1,1,1,0,1,1,1,1,0,0,0,1,0,0,1,1,0,1,0,0,1,1,1,0,0,0,0,1,1,1,1,0,1,1,1,0,0,0,1,0,1,0,0,1,0,1,0,1,1] },
] as const

function QRBox({ size = 140, color = '#000', pattern }: { size?: number; color?: string; pattern: readonly number[] }) {
  const cells = pattern.length >= 49 ? pattern.slice(0, 49) : [...pattern, ...Array(49 - pattern.length).fill(0)]
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '2px',
        width: `${size}px`,
        height: `${size}px`,
        padding: '8px',
        background: '#fff',
        borderRadius: '4px',
        flexShrink: 0,
      }}
    >
      {cells.map((filled, i) => (
        <div key={i} style={{ background: filled ? color : 'transparent', borderRadius: '1px' }} />
      ))}
    </div>
  )
}

export default function QRIdentityPage() {
  return (
    <DashboardLayout titleKey="qrIdentity">
      <div style={{ maxWidth: '1000px' }}>
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '8px' }}>QR IDENTITY</p>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff' }}>Your Digital Identity</h1>
        </div>

        <div className="gold-card" style={{ padding: '20px 28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: '4px' }}>YOUR MERGE ID</p>
            <p style={{ fontSize: '20px', fontWeight: 900, color: '#c9a84c', letterSpacing: '0.15em' }}>MERGE-000001</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: '4px' }}>FOUNDER ID</p>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>FOUNDER-000001</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: '4px' }}>BRAND LINE ID</p>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>BRAND-000001</p>
          </div>
          <span style={{ padding: '6px 14px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', borderRadius: '2px' }}>✓ KYC VERIFIED</span>
        </div>

        <div className="qr-cards-grid">
          {QR_TYPES.map((qr) => (
            <div key={qr.type} className="gold-card qr-card" style={{ borderRadius: '4px' }}>
              <div className="qr-card-header">
                <span style={{ fontSize: '18px' }}>{qr.icon}</span>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', color: qr.color, margin: 0 }}>{qr.type}</p>
              </div>

              <QRBox size={140} color={qr.qrColor} pattern={qr.pattern} />

              <div className="qr-card-body">
                <div>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px', letterSpacing: '0.1em' }}>QR ID</p>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: qr.color, letterSpacing: '0.05em', margin: 0 }}>{qr.id}</p>
                </div>
                <p className="qr-card-desc">{qr.desc}</p>
                <div className="qr-card-scans">
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Total Scans</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: qr.color }}>{qr.scans}</span>
                </div>
              </div>

              <div className="qr-card-actions">
                <button type="button" className="gold-btn-outline">
                  DOWNLOAD
                </button>
                <button type="button" className="gold-btn">
                  SHARE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
