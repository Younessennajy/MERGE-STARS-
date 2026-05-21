import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

type Section = {
  title: string
  body?: string
  items?: string[]
}

const SECTIONS: Section[] = [
  {
    title: '1. INTRODUCTION & ACCEPTANCE',
    body: 'These Terms and Conditions ("Terms") govern your access to and use of the MERGE STARS website, platform, dashboard, and related services (collectively, the "Platform"), operated by MERGE STARS ("we", "us", "our"). By creating an account, submitting an application, placing an order, or otherwise using the Platform, you ("User", "you") confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not use the Platform.',
  },
  {
    title: '2. DEFINITIONS',
    items: [
      '"MERGE COIN" means the physical luxury product unit (precious-metal composite coin/emblem) produced through the Platform, including its digital passport and QR identity — not a cryptocurrency, security, or token.',
      '"Order" means a confirmed request for production of MERGE COIN and related brand services, subject to payment or approved financing.',
      '"KYC" means Know Your Customer identity verification required for full Platform access.',
      '"QR Identity" means the set of unique QR codes assigned to your account (Brand, Core, and Referral).',
      '"Reference Indicator" means the live market-based pricing reference displayed on the Platform; it is indicative only.',
      '"Crystal" means our designated financial partner for optional bank financing (where applicable).',
      '"Audit Log" means the immutable record of Platform actions maintained for compliance and security.',
    ],
  },
  {
    title: '3. PLATFORM PURPOSE — NOT A FINANCIAL SERVICE',
    body: 'MERGE STARS is an order-based brand creation and physical production platform. We are not a bank, lender, investment firm, broker, cryptocurrency exchange, or payment institution. Participation in the Platform does not constitute an investment, deposit, or financial product. MERGE STARS does not guarantee income, profit, returns, or passive earnings of any kind.',
  },
  {
    title: '4. ELIGIBILITY',
    items: [
      'You must be at least 18 years of age (or the age of majority in your jurisdiction).',
      'You must have legal capacity to enter into binding contracts.',
      'You may maintain only one account unless expressly authorized in writing.',
      'You must not be subject to sanctions or prohibited from using the Platform under applicable law.',
    ],
  },
  {
    title: '5. REGISTRATION, ACCOUNTS & IDENTITY',
    body: 'You agree to provide accurate, current, and complete registration information and to update it promptly when it changes. Upon registration, you may receive unique identifiers including Merge ID, Founder ID, Brand Line ID, and QR IDs. These identifiers are personal, non-transferable, and may not be sold, leased, or assigned without our prior written consent.',
    items: [
      'You are responsible for safeguarding your login credentials and all activity under your account.',
      'You must notify us immediately of any unauthorized access or suspected breach.',
      'We may suspend or refuse registration at our discretion for compliance, fraud prevention, or operational reasons.',
    ],
  },
  {
    title: '6. KYC & VERIFICATION',
    body: 'Full access to ordering, production tracking, payments, and certain dashboard features requires successful KYC verification. You consent to submission of identity documents and data checks as described in our Privacy Policy. We may request re-verification at any time. Failure to complete or pass KYC may result in limited access, order holds, or account termination.',
  },
  {
    title: '7. APPLICATIONS, ORDERS & PRODUCTION',
    body: 'Applications and orders submitted through the Platform are subject to review and acceptance. An order is not binding for production until confirmed by us and until payment or financing conditions are met.',
    items: [
      'Production begins only when payment_status = PAID or bank_status = APPROVED (as applicable).',
      'No production will commence without confirmed payment or approved financing.',
      'Orders already in production generally cannot be cancelled; exceptions are at our sole discretion.',
      'Production timelines are estimates; delays may occur due to materials, QC, logistics, or force majeure.',
      'You are responsible for reviewing order details, quantities, coin type, and delivery information before confirmation.',
    ],
  },
  {
    title: '8. PRICING, INVOICES & REFERENCE INDICATOR',
    body: 'The MERGE COIN Reference Indicator reflects live precious-metal market data and internal formulas for guidance only. It does not constitute a binding price offer. Final pricing is confirmed per order in your invoice or order summary. We reserve the right to adjust pricing, fees, and specifications before order confirmation. All amounts are due as stated on the invoice unless financing is approved.',
  },
  {
    title: '9. PAYMENT & BANK FINANCING',
    items: [
      'Full payment: You may pay the order amount in full according to the payment methods we make available. Production starts after payment is confirmed.',
      'Bank financing: Where offered, financing is provided by Crystal (or another designated partner), not by MERGE STARS. Approval is subject to credit evaluation and is not guaranteed.',
      'Typical financing structure (where available): approximately 20% down payment and the remainder over 12 or 24 months, as presented at application — final terms are set by the financing partner.',
      'MERGE STARS is not responsible for financing decisions, interest rates, collateral, or collection actions by the financing partner.',
      'If financing is rejected, you may choose full payment or cancel the order before production begins, subject to our policies.',
    ],
  },
  {
    title: '10. DELIVERY, RISK & TITLE',
    body: 'Delivery options and carriers will be specified in your order. Risk of loss may pass to you upon handover to the carrier or upon delivery, depending on applicable law and the delivery terms stated in your order. You must provide accurate shipping details. Failed delivery due to incorrect information may incur additional fees.',
  },
  {
    title: '11. MERGE COIN — PRODUCT NATURE',
    items: [
      'MERGE COIN is a physical luxury product, not digital currency, a security, or a financial instrument.',
      'Specifications (metal type, finish, weight class) depend on the product tier selected in your order.',
      'Each unit may include QR-linked digital passport features for authenticity and identity — not for trading on blockchain markets.',
      'Resale of physical products is permitted subject to law; we do not operate a secondary market or buy-back guarantee unless expressly offered.',
    ],
  },
  {
    title: '12. QR IDENTITY & SCAN DATA',
    body: 'Your QR Identity system includes Brand QR, Core QR, and Referral QR codes. Scan events may be logged (timestamp, referrer, device data) for attribution, analytics, and fraud prevention as described in the Privacy Policy. You must not manipulate, clone, or misuse QR codes to misrepresent identity or referrals.',
  },
  {
    title: '13. REFERRAL PROGRAM',
    body: 'MERGE STARS operates a single-level referral system only. Multi-level marketing (MLM), pyramid schemes, or downstream commission structures are strictly prohibited.',
    items: [
      'Only direct referrals attributed via your Referral QR or referral link qualify.',
      'Revenue share for referrers is as published (e.g. 25% of platform fee on qualifying orders) and may change with notice.',
      'Prohibited referral marketing language includes: "guaranteed income", "investment return", "passive income", "ROI", "crypto earning", and similar financial promises.',
      'Violations may result in suspension, forfeiture of referral credits, and account termination. See our Referral Policy for details.',
    ],
  },
  {
    title: '14. INTELLECTUAL PROPERTY',
    body: 'All Platform content, trademarks, logos, designs, software, and documentation are owned by MERGE STARS or our licensors. You receive a limited, non-exclusive license to use the Platform for its intended purpose. Brand assets created for you under a paid order are licensed as specified in your brand/order agreement; we retain rights to platform infrastructure and generic templates unless otherwise agreed in writing.',
  },
  {
    title: '15. AI ASSISTANT',
    body: 'The Merge AI assistant provides general information about the Platform only. It does not provide legal, tax, or investment advice. AI responses may be incomplete or outdated. Do not rely on the AI for financial decisions. Conversations may be logged for quality and compliance. You must not attempt to elicit prohibited financial advice through prompt manipulation.',
  },
  {
    title: '16. PROHIBITED CONDUCT',
    items: [
      'Providing false identity or KYC information.',
      'Money laundering, fraud, sanctions evasion, or illegal activity.',
      'Circumventing security, scraping, reverse engineering, or disrupting the Platform.',
      'Harassment, abuse, or unauthorized access to other users\' data.',
      'Marketing MERGE STARS as an investment, crypto project, or guaranteed-income opportunity.',
      'Operating multi-level referral schemes or misrepresenting affiliation with MERGE STARS.',
    ],
  },
  {
    title: '17. SUSPENSION & TERMINATION',
    body: 'We may suspend or terminate your account immediately for breach of these Terms, failed KYC, fraud risk, chargebacks, or legal requirement. Upon termination, you remain liable for outstanding payments and completed orders. Provisions that by nature should survive (liability limits, indemnity, governing law) will survive termination.',
  },
  {
    title: '18. DISCLAIMERS',
    body: 'THE PLATFORM AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" TO THE MAXIMUM EXTENT PERMITTED BY LAW. WE DISCLAIM WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT UNINTERRUPTED OR ERROR-FREE SERVICE.',
  },
  {
    title: '19. LIMITATION OF LIABILITY',
    body: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, MERGE STARS\' TOTAL LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS OR YOUR USE OF THE PLATFORM SHALL NOT EXCEED THE AMOUNT YOU PAID TO US FOR THE SPECIFIC ORDER GIVING RISE TO THE CLAIM IN THE TWELVE (12) MONTHS PRECEDING THE EVENT. WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, LOST PROFITS, OR LOST DATA.',
  },
  {
    title: '20. INDEMNIFICATION',
    body: 'You agree to indemnify and hold harmless MERGE STARS, its officers, employees, and partners from claims, damages, and expenses (including reasonable legal fees) arising from your breach of these Terms, misuse of the Platform, false referral marketing, or violation of applicable law.',
  },
  {
    title: '21. AUDIT, COMPLIANCE & RECORDS',
    body: 'You consent to logging of Platform activity in the Audit Log for security, dispute resolution, and regulatory compliance. We may cooperate with law enforcement and financial partners when legally required. Records may be retained as stated in the Privacy Policy.',
  },
  {
    title: '22. PRIVACY',
    body: 'Personal data is processed in accordance with our Privacy Policy. By using the Platform, you acknowledge that policy. KYC documents, payment data, QR scans, and communications may be stored and shared as described there.',
  },
  {
    title: '23. CHANGES TO THESE TERMS',
    body: 'We may update these Terms at any time. Material changes will be posted on this page with an updated "Last revised" date. Continued use after changes constitutes acceptance. For material changes affecting active orders, we will use reasonable efforts to notify registered users.',
  },
  {
    title: '24. GOVERNING LAW & DISPUTES',
    body: 'These Terms are governed by the laws of Georgia (country), without regard to conflict-of-law principles, unless mandatory consumer protection laws in your country require otherwise. Disputes shall first be addressed through good-faith contact at legal@mergestars.com. If unresolved, disputes may be submitted to the competent courts of Tbilisi, Georgia, unless applicable law grants you non-waivable rights to bring claims in your home jurisdiction.',
  },
  {
    title: '25. CONTACT',
    body: 'For questions about these Terms: legal@mergestars.com · General support: info@mergestars.com · Privacy: privacy@mergestars.com (see Privacy Policy).',
  },
]

export default function TermsPage() {
  const { t, i18n } = useTranslation()
  const showEnglishNotice = i18n.language !== 'en'

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '110px' }}>
        <section style={{ textAlign: 'center', padding: '80px 32px 48px', maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '16px' }}>{t('legal.legal')}</p>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: 0 }}>
            {t('legal.termsTitle')}
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '20px', lineHeight: 1.7 }}>
            {t('legal.termsIntro')}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '16px' }}>
            {t('legal.lastUpdated')}
          </p>
          <p style={{ fontSize: '12px', marginTop: '12px' }}>
            <Link to="/privacy" style={{ color: '#c9a84c', textDecoration: 'none', letterSpacing: '0.08em' }}>
              {t('legal.privacyLink')}
            </Link>
            {' · '}
            <Link to="/referral-policy" style={{ color: '#c9a84c', textDecoration: 'none', letterSpacing: '0.08em' }}>
              {t('legal.referralLink')}
            </Link>
          </p>
        </section>

        {showEnglishNotice && (
          <p
            style={{
              maxWidth: '800px',
              margin: '0 auto 24px',
              padding: '0 32px',
              fontSize: '12px',
              color: 'rgba(201,168,76,0.75)',
              lineHeight: 1.6,
            }}
          >
            {t('legal.englishOnlyNotice')}
          </p>
        )}

        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px 80px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {SECTIONS.map((s) => (
            <article
              key={s.title}
              style={{ padding: '24px 28px', background: '#0f0f0f', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '4px' }}
            >
              <h2 style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', color: '#c9a84c', marginBottom: '12px', marginTop: 0 }}>
                {s.title}
              </h2>
              {s.body && (
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>{s.body}</p>
              )}
              {s.items && (
                <ul style={{ margin: s.body ? '14px 0 0' : 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {s.items.map((item) => (
                    <li key={item.slice(0, 40)} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      </div>
      <Footer />
    </div>
  )
}
