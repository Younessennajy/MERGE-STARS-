import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ReferralPolicyPage() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '110px' }}>
        <section style={{ textAlign: 'center', padding: '80px 32px 60px', maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '16px' }}>LEGAL</p>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>REFERRAL POLICY</h1>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '16px' }}>Last updated: January 2024 · Version 1.0</p>
        </section>

        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px 80px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Distribution model */}
          <div className="gold-card" style={{ padding: '32px', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '24px' }}>REVENUE DISTRIBUTION MODEL</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '16px' }}>
              {[
                { label: 'Platform / Operations', pct: '50%', color: '#c9a84c' },
                { label: 'Brand Owner',           pct: '25%', color: '#f5d78e' },
                { label: 'Direct Referrer',       pct: '25%', color: '#a78bfa' },
              ].map((r) => (
                <div key={r.label} style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                  <p style={{ fontSize: '36px', fontWeight: 900, color: r.color, marginBottom: '8px' }}>{r.pct}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{r.label}</p>
                </div>
              ))}
            </div>
          </div>

          {[
            { title: '1. SINGLE-LEVEL REFERRAL ONLY', body: 'MERGE STARS operates an exclusively single-level referral system. Only the direct referrer receives attribution credit. Multi-level, pyramid, or chain referral structures are strictly prohibited and void.' },
            { title: '2. HOW REFERRAL TRACKING WORKS', body: 'Referrals are tracked via unique QR codes and referral links. When a new user registers through your QR or link, they are attributed to you as your direct referral. Attribution is captured at registration and cannot be changed.' },
            { title: '3. QR CODE TYPES', body: 'Each user receives three QR types: Brand QR (linked to your brand catalog), Core QR (linked to your account profile), and Referral QR (used for referral attribution). Each is unique and non-transferable.' },
            { title: '4. PLATFORM FEE', body: 'A 2% platform service fee is applied to each user\'s actual received revenue. This fee is automatically deducted before distribution.' },
            { title: '5. NO DIRECT REFERRER', body: 'If no direct referrer exists (user registered organically), the referral attribution share (25%) is redirected to Platform Reserve / Operations.' },
            { title: '6. PROHIBITED LANGUAGE', body: 'The following terms are strictly prohibited in any referral marketing: "guaranteed income", "investment return", "passive income", "MLM", "ROI", "crypto earning", "financial promise". Violations result in account suspension.' },
            { title: '7. PAYMENT TIMING', body: 'Referral credit is only recognized after the referred user\'s order has been completed and payment confirmed. No speculative or advance referral payments are made.' },
            { title: '8. DISPUTES', body: 'Referral attribution disputes must be submitted within 14 days of the relevant transaction. MERGE STARS\' decision on attribution disputes is final.' },
          ].map((s) => (
            <div key={s.title} style={{ padding: '24px', background: '#0f0f0f', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '4px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', color: '#c9a84c', marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </div>
  )
}
