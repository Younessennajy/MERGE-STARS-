import { useState } from 'react'
import SiteLayout from '../../components/SiteLayout'

const LABEL = 'font-semibold tracking-[0.12em] text-[11px] block mb-2'
const labelStyle = { color: 'rgba(255,255,255,0.45)' } as const

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  return (
    <SiteLayout>
      <div className="page-hero">
        <p className="page-kicker">Contact</p>
        <h1 className="page-title">
          GET IN <span className="gold-text">TOUCH</span>
        </h1>
      </div>

      <div className="site-container site-container-wide page-section grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="gold-card p-8 md:p-10">
          {sent ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-lg font-extrabold mb-2" style={{ color: '#c9a84c' }}>MESSAGE SENT</h3>
              <p className="prose-block">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="flex flex-col gap-5">
              <h3 className="text-xs font-bold tracking-[0.2em]" style={{ color: '#c9a84c' }}>SEND A MESSAGE</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL} style={labelStyle}>FIRST NAME</label>
                  <input className="gold-input" placeholder="First name" required />
                </div>
                <div>
                  <label className={LABEL} style={labelStyle}>LAST NAME</label>
                  <input className="gold-input" placeholder="Last name" required />
                </div>
              </div>
              <div>
                <label className={LABEL} style={labelStyle}>EMAIL</label>
                <input className="gold-input" type="email" placeholder="your@email.com" required />
              </div>
              <div>
                <label className={LABEL} style={labelStyle}>SUBJECT</label>
                <select className="gold-input">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>KYC / Verification</option>
                  <option>Payment / Financing</option>
                  <option>Partnership</option>
                  <option>Technical Issue</option>
                </select>
              </div>
              <div>
                <label className={LABEL} style={labelStyle}>MESSAGE</label>
                <textarea className="gold-input resize-none" rows={5} placeholder="Your message..." required />
              </div>
              <button type="submit" className="gold-btn w-full justify-center">
                SEND MESSAGE →
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {[
            { icon: '✉', title: 'EMAIL', lines: ['info@mergestars.com', 'support@mergestars.com'] },
            { icon: '☎', title: 'PHONE', lines: ['+1 (555) 123 4567', 'Mon–Fri, 9AM–6PM'] },
            { icon: '📍', title: 'HEADQUARTERS', lines: ['Global Headquarters', 'Tbilisi, Georgia'] },
            { icon: '🕐', title: 'SUPPORT HOURS', lines: ['24/7 AI Assistant', 'Human support: 9AM–6PM'] },
          ].map((c) => (
            <div key={c.title} className="gold-card p-5 md:p-6 flex gap-4 items-start">
              <span className="text-xl shrink-0 mt-0.5">{c.icon}</span>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] mb-1.5" style={{ color: '#c9a84c' }}>{c.title}</p>
                {c.lines.map((l) => (
                  <p key={l} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
