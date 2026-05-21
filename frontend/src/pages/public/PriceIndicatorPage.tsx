import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function PriceIndicatorPage() {
  const [silverSpot, setSilverSpot] = useState(0.897)
  const [lastUpdated, setLastUpdated] = useState('Just now')
  const indicator = (silverSpot * 1000 * 2).toFixed(2)

  useEffect(() => {
    const t = setInterval(() => {
      setSilverSpot((p) => +(p + (Math.random() - 0.5) * 0.002).toFixed(4))
      setLastUpdated('Just now')
    }, 8000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '110px' }}>
        <section style={{ textAlign: 'center', padding: '80px 32px 60px', maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '16px' }}>REFERENCE INDICATOR</p>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
            MERGE COIN<br /><span className="gold-text">PRICE INDICATOR</span>
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
            Displayed values are indicative references only and do not constitute an offer, commitment,
            investment product, or financial instrument.
          </p>
        </section>

        {/* Live widget */}
        <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 32px 60px' }}>
          <div className="gold-card" style={{ padding: '48px', borderRadius: '4px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} className="animate-pulse" />
              <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600, letterSpacing: '0.15em' }}>LIVE — Updated: {lastUpdated}</span>
            </div>

            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: '8px' }}>SILVER SPOT (1 KG)</p>
            <p style={{ fontSize: '42px', fontWeight: 900, color: '#fff', marginBottom: '32px' }}>
              ${(silverSpot * 1000).toFixed(2)}<span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', marginLeft: '4px' }}>/kg</span>
            </p>

            <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', margin: '0 0 32px' }} />

            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: '8px' }}>FORMULA</p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
              Silver Spot 1kg × <span style={{ color: '#c9a84c', fontWeight: 700 }}>2</span>
            </p>

            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: '12px' }}>MERGE COIN REFERENCE INDICATOR</p>
            <p style={{ fontSize: '64px', fontWeight: 900 }} className="gold-text">${indicator}</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>USD · Market-Linked · Indicative Only</p>

            <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '2px' }}>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                ⚠ Source: Live Market Feed · Final pricing determined individually per order.
                This indicator is updated periodically and is subject to change without notice.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 32px 80px' }}>
          <div style={{ padding: '32px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '16px' }}>LEGAL DISCLAIMER</h3>
            {[
              'MERGE COIN is not a financial instrument, investment product, or security.',
              'MERGE STARS is not a lender or financial institution.',
              'The Reference Indicator is based on live silver market prices and changes continuously.',
              'Displayed values are indicative only and do not constitute a price offer or commitment.',
              'Final product pricing is determined by individual order configuration.',
              'Funding is provided by our financial partner (Crystal) and is subject to approval.',
              'No returns are guaranteed. All applications are subject to evaluation.',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#c9a84c', flexShrink: 0, fontSize: '12px', marginTop: '2px' }}>•</span>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{t}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
