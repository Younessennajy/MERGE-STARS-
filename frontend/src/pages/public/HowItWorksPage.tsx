import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const STEPS = [
  { n: '01', icon: '👤', title: 'REGISTER',           desc: 'Create your account with email and phone verification. Receive your unique User ID, Founder ID, and Brand Line ID instantly.' },
  { n: '02', icon: '🪪', title: 'KYC VERIFICATION',   desc: 'Complete identity verification by providing your personal details. KYC status: PENDING → VERIFIED. Required to proceed.' },
  { n: '03', icon: '🏷', title: 'BRAND LINE',          desc: 'Create your unique brand identity — name, logo, catalog. Your brand is permanently linked to your MERGE ID.' },
  { n: '04', icon: '★',  title: 'MERGE COIN',          desc: 'Activate your MERGE COIN — your Product Reference Unit and Brand Identity. Each coin has a unique QR code and Digital Passport.' },
  { n: '05', icon: '📋', title: 'PLACE ORDER',         desc: 'Select your coin type, quantity, metal purity, and special customization. Review your order details and submit your application.' },
  { n: '06', icon: '🏦', title: 'PAYMENT / FINANCING', desc: 'Choose Full Payment or Bank Financing. Production begins ONLY after payment_status = PAID or bank_status = APPROVED.' },
  { n: '07', icon: '🏭', title: 'PRODUCTION',          desc: 'Your order enters our global manufacturing network. Track status: WAITING → IN_PRODUCTION → QC → READY.' },
  { n: '08', icon: '📦', title: 'DELIVERY',            desc: 'Your luxury product is shipped with real-time tracking. Confirm delivery and receive your Digital Passport.' },
]

export default function HowItWorksPage() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '110px' }}>
        {/* Hero */}
        <section style={{ textAlign: 'center', padding: '80px 32px 60px', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '16px' }}>HOW IT WORKS</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: '#fff', marginBottom: '20px', lineHeight: 1.1 }}>
            FROM REGISTRATION TO<br /><span className="gold-text">LUXURY DELIVERY</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
            MERGE STARS operates as a controlled workflow platform. Every step is validated, logged, and traceable.
          </p>
        </section>

        {/* Steps */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px 80px' }}>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '40px', top: '40px', bottom: '40px', width: '1px', background: 'linear-gradient(180deg, #c9a84c, rgba(201,168,76,0.1))', display: 'block' }} className="hidden md:block" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {STEPS.map((s, i) => (
                <div key={s.n} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                  {/* Number circle */}
                  <div style={{ flexShrink: 0, width: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '50%',
                      background: i < 2 ? 'linear-gradient(135deg,#c9a84c,#f5d78e)' : 'rgba(201,168,76,0.1)',
                      border: i >= 2 ? '1px solid rgba(201,168,76,0.25)' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px', zIndex: 1, position: 'relative',
                    }}>
                      <span style={{ color: i < 2 ? '#000' : '#c9a84c' }}>{s.icon}</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>{s.n}</span>
                  </div>
                  {/* Content */}
                  <div className="gold-card" style={{ flex: 1, padding: '24px', borderRadius: '4px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '60px 32px 80px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
            READY TO START YOUR <span className="gold-text">JOURNEY?</span>
          </h2>
          <a href="/login" className="gold-btn inline-flex mt-4">
            CREATE YOUR ACCOUNT →
          </a>
        </section>
      </div>
      <Footer />
    </div>
  )
}
