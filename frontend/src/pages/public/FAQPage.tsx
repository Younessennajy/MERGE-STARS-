import { useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../../components/SiteLayout'

const FAQS = [
  { q: 'What is MERGE STARS?', a: 'MERGE STARS is a revolutionary platform combining advanced 3D filament technology with precious metals, creating a luxury brand creation and production ecosystem. Every buyer becomes a brand owner.' },
  { q: 'What is MERGE COIN?', a: 'MERGE COIN is your Product Reference Unit and Brand Identity — a physical luxury product with a unique QR code and Digital Passport. It is NOT a cryptocurrency, token, or financial instrument.' },
  { q: 'Is MERGE COIN a cryptocurrency or investment?', a: 'No. MERGE COIN is a physical luxury product. MERGE STARS is not a lender or financial institution. No income, returns, or profits are guaranteed. All applications are subject to evaluation.' },
  { q: 'How does the pricing work?', a: 'The MERGE COIN Reference Indicator is calculated as: Silver Spot 1kg × 2. This is an indicative reference only. Final pricing is determined individually per order and may differ from the indicator.' },
  { q: 'What is the referral system?', a: 'MERGE STARS uses a single-level referral attribution system. When you refer someone using your unique QR or link, you receive attribution credit. Multi-level (MLM) referrals are strictly prohibited.' },
  { q: 'What is KYC and why is it required?', a: 'KYC (Know Your Customer) is an identity verification process required before full platform activation. You must provide personal details and ID. Status progresses from PENDING → VERIFIED before you can place orders.' },
  { q: 'What is a Brand Line?', a: 'Your Brand Line is your unique brand identity on the platform — your name, logo, catalog, and products. It is permanently linked to your MERGE COIN and QR Identity.' },
  { q: 'How long does production take?', a: 'Production timelines vary by order type and factory availability. Once payment or bank financing is approved, your order enters the production queue. You will receive real-time status updates throughout.' },
  { q: 'What payment methods are accepted?', a: 'We accept Full Payment (bank transfer, card) and Bank Financing (12-24 months, subject to Crystal partner approval). Crypto and wallet payments are not supported.' },
  { q: 'Can I cancel my order after production starts?', a: 'Orders cannot be cancelled once they have entered production (IN_PRODUCTION status). Please review your order carefully before submitting.' },
  { q: 'What happens if my bank financing is rejected?', a: 'If bank_status = REJECTED, production will not begin. You may reapply with different terms or choose Full Payment. You will be notified by both the platform and Crystal partner.' },
  { q: 'How do I contact support?', a: 'You can reach our dedicated support team through the Contact page, your dashboard, or by emailing info@mergestars.com. Our AI Assistant is also available 24/7 for common questions.' },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <SiteLayout>
      <div className="page-hero">
        <p className="page-kicker">FAQ</p>
        <h1 className="page-title">
          FREQUENTLY ASKED <span className="gold-text">QUESTIONS</span>
        </h1>
      </div>

      <div className="site-container site-container-narrow page-section">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="border-b border-[rgba(201,168,76,0.12)] cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex justify-between items-center gap-4 py-5">
              <h2 className="text-base font-bold text-white flex-1 leading-snug pr-2" style={{ color: open === i ? '#c9a84c' : '#fff' }}>
                {faq.q}
              </h2>
              <span
                className="text-xl shrink-0 transition-transform duration-200"
                style={{ color: '#c9a84c', transform: open === i ? 'rotate(45deg)' : 'none' }}
              >
                +
              </span>
            </div>
            {open === i && (
              <div className="pb-5">
                <p className="prose-block">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="section-divider-soft" />
      <div className="text-center page-section px-4">
        <p className="text-base mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Still have questions?
        </p>
        <Link to="/contact" className="gold-btn inline-flex">
          CONTACT US →
        </Link>
      </div>
    </SiteLayout>
  )
}
