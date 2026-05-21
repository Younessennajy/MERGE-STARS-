import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const SECTIONS = [
  { title: '1. DATA WE COLLECT', body: 'We collect: full name, email, phone number, country, personal ID number, date of birth, IP address, device information, and KYC documentation. We also collect QR scan data, referral attribution, and platform activity logs.' },
  { title: '2. HOW WE USE YOUR DATA', body: 'Your data is used to: verify your identity (KYC), process orders and payments, manage production and delivery, generate invoices, track referral attribution, provide AI assistant services, and comply with legal obligations.' },
  { title: '3. DATA SHARING', body: 'We share data with: Crystal (our financial partner) for financing approval, logistics partners for delivery, and regulatory authorities when legally required. We do not sell your personal data to third parties.' },
  { title: '4. QR & TRACKING DATA', body: 'When QR codes are scanned, we collect: QR code ID, type, referrer ID, timestamp, IP address, user agent, and source page. This data is used for referral attribution and fraud prevention.' },
  { title: '5. AUDIT LOGS', body: 'All platform actions are recorded in an immutable Audit Log including: user ID, action type, timestamp, IP address, before/after values, and session ID. These logs cannot be deleted and may be reviewed for compliance purposes.' },
  { title: '6. DATA SECURITY', body: 'We use AES-256 encryption at rest, TLS 1.3 in transit, JWT authentication with HttpOnly cookies, and bcrypt password hashing. KYC documents are stored in encrypted S3-compatible storage.' },
  { title: '7. DATA RETENTION', body: 'Account data is retained for the duration of your account plus 7 years for compliance. Audit logs are retained indefinitely. You may request data deletion subject to legal retention requirements.' },
  { title: '8. YOUR RIGHTS', body: 'You have the right to: access your personal data, correct inaccurate data, request deletion (subject to retention requirements), object to processing, and data portability. Contact us at privacy@mergestars.com.' },
  { title: '9. COOKIES', body: 'We use strictly necessary cookies for authentication and session management. Optional analytics cookies may be used with your consent. You can manage cookie preferences in your browser settings.' },
  { title: '10. CONTACT', body: 'For privacy inquiries: privacy@mergestars.com. Data Protection Officer: dpo@mergestars.com. We will respond to all valid requests within 30 days.' },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '110px' }}>
        <section style={{ textAlign: 'center', padding: '80px 32px 60px', maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '16px' }}>LEGAL</p>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>PRIVACY POLICY</h1>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '16px' }}>Last updated: January 2024 · Version 1.0</p>
        </section>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px 80px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {SECTIONS.map((s) => (
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
