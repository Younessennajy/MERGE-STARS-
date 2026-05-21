import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const FEATURES = [
  { icon: '🆔', title: 'UNIQUE IDENTITY',      desc: 'Every MERGE COIN has a globally unique ID linked to your profile.' },
  { icon: '📱', title: 'QR PASSPORT',           desc: 'Scannable QR code containing full product identity and ownership history.' },
  { icon: '🏭', title: 'PRODUCTION TRACKING',   desc: 'Real-time visibility into manufacturing, QC, and delivery stages.' },
  { icon: '👑', title: 'BRAND OWNERSHIP',       desc: 'Your coin becomes your brand identity. Full ownership. Your rules.' },
  { icon: '🔒', title: 'SECURE & VERIFIED',     desc: 'XRF material analysis confirms precious metal composition before production.' },
  { icon: '🌍', title: 'GLOBAL RECOGNITION',    desc: 'Recognized across our international network of creators and partners.' },
]

export default function MergeCoinPage() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '110px' }}>
        <section style={{ textAlign: 'center', padding: '80px 32px 60px', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '16px' }}>MERGE COIN</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: '#fff', marginBottom: '20px', lineHeight: 1.1 }}>
            YOUR <span className="gold-text">PRODUCT IDENTITY</span><br />& BRAND UNIT
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '12px' }}>
            MERGE COIN is not a cryptocurrency, token, or financial instrument. It is a physical luxury product
            with a unique digital identity — your Brand Reference Unit.
          </p>
          <div style={{ display: 'inline-block', padding: '12px 24px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px', marginTop: '8px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
              ⚠ MERGE COIN is not a lender or financial institution. Funding is provided by our financial partner (Crystal).
              All applications are subject to evaluation. Prices are based on live market conditions and may change.
            </p>
          </div>
        </section>

        {/* Coin visual */}
        <section style={{ display: 'flex', justifyContent: 'center', padding: '0 32px 60px' }}>
          <div style={{
            width: '220px', height: '220px', borderRadius: '50%',
            background: 'linear-gradient(135deg,#c9a84c,#f5d78e,#c9a84c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px rgba(201,168,76,0.4), 0 0 120px rgba(201,168,76,0.15)',
            animation: 'glow-pulse 3s ease-in-out infinite',
          }}>
            <span style={{ fontSize: '80px', color: '#000', fontWeight: 900 }}>★</span>
          </div>
        </section>

        {/* What it is */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 32px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { label: 'COIN TYPE',      value: 'Physical Luxury Product' },
              { label: 'IDENTITY',       value: 'QR Code + Unique ID' },
              { label: 'MATERIAL',       value: 'Precious Metal Composite' },
              { label: 'OWNERSHIP',      value: 'Full Brand Ownership' },
              { label: 'TRACKING',       value: 'Production + Delivery' },
              { label: 'DIGITAL LAYER',  value: 'Digital Passport Included' },
            ].map((r) => (
              <div key={r.label} className="gold-card" style={{ padding: '20px 24px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.1em' }}>{r.label}</span>
                <span style={{ fontSize: '13px', color: '#c9a84c', fontWeight: 700 }}>{r.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px 80px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', marginBottom: '48px' }}>COIN FEATURES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '12px' }}>{f.icon}</span>
                <h3 style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ textAlign: 'center', padding: '60px 32px 80px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <a href="/apply" className="gold-btn inline-flex">
            ACTIVATE YOUR MERGE COIN →
          </a>
        </section>
      </div>
      <Footer />
    </div>
  )
}
