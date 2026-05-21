import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import CustomSelect from '../components/CustomSelect'

const COIN_TYPES = [
  { label: 'MERGE SILVER COIN (1KG)', metalPrice: 0.897, metal: 'Silver (Ag)', purity: 99.9 },
  { label: 'MERGE GOLD COIN (1KG)', metalPrice: 67.42, metal: 'Gold (Au)', purity: 99.9 },
  { label: 'MERGE PLATINUM COIN (1KG)', metalPrice: 32.15, metal: 'Platinum (Pt)', purity: 99.9 },
]

const LIVE_PRICES = [
  { name: 'Silver (Ag)', price: 0.897, change: '+1.23%' },
  { name: 'Gold (Au)', price: 67.42, change: '+0.85%' },
]

export default function CalculatorPage() {
  const [coinIdx, setCoinIdx] = useState(0)
  const [weight, setWeight] = useState(1000)
  const [purity, setPurity] = useState(99.9)

  const coin = COIN_TYPES[coinIdx]
  const metalValue = (coin.metalPrice * weight * purity) / 100
  const mfgFee = 1200
  const platformFee = 153
  const totalValue = metalValue + mfgFee + platformFee

  const downPayment = totalValue * 0.2
  const toFinance = totalValue - downPayment
  const monthly = (toFinance / 12).toFixed(2)

  return (
    <DashboardLayout titleKey="calculator">
      <div className="apply-flow-wrap apply-flow-max space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="landing-sans-head mb-2">Merge Stars · pricing</p>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-light tracking-wide text-[#f5f2eb]">
              Live price calculator
            </h2>
            <p className="apply-lead mt-2">
              Adjust weight and purity to see indicative coin value and financing estimates.
            </p>
          </div>
          <div className="calc-live-badge">
            <span className="dash-pulse-dot shrink-0" style={{ background: '#4ade80', boxShadow: 'none' }} />
            Live prices applied
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Configuration */}
          <div className="lg:col-span-4 space-y-6">
            <section className="apply-surface p-7 sm:p-8">
              <p className="dash-label mb-6">Configuration</p>

              <div className="space-y-7">
                <div>
                  <label className="apply-label" htmlFor="calc-coin">
                    Coin type
                  </label>
                  <CustomSelect
                    id="calc-coin"
                    aria-label="Coin type"
                    value={coinIdx}
                    onChange={(v) => setCoinIdx(Number(v))}
                    options={COIN_TYPES.map((c, i) => ({ value: i, label: c.label }))}
                  />
                </div>

                <div>
                  <label className="apply-label">
                    Weight — <span className="text-neutral-400">{weight.toLocaleString()} g</span>
                  </label>
                  <input
                    type="range"
                    className="calc-range w-full"
                    min={100}
                    max={5000}
                    step={100}
                    value={weight}
                    onChange={(e) => setWeight(+e.target.value)}
                  />
                  <div className="flex justify-between mt-2 text-[10px] tracking-wide text-neutral-600">
                    <span>100g</span>
                    <span>5,000g</span>
                  </div>
                </div>

                <div>
                  <label className="apply-label">
                    Purity — <span className="text-neutral-400">{purity}%</span>
                  </label>
                  <input
                    type="range"
                    className="calc-range w-full"
                    min={50}
                    max={99.9}
                    step={0.1}
                    value={purity}
                    onChange={(e) => setPurity(+e.target.value)}
                  />
                  <div className="flex justify-between mt-2 text-[10px] tracking-wide text-neutral-600">
                    <span>50%</span>
                    <span>99.9%</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="apply-surface-sidebar p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="dash-label mb-0">Market feed</p>
                <span className="text-[9px] tracking-[0.14em] uppercase text-emerald-400/80">Live</span>
              </div>
              <ul className="space-y-3">
                {LIVE_PRICES.map((p) => (
                  <li key={p.name} className="flex justify-between items-baseline gap-4">
                    <span className="text-[11px] text-neutral-400 tracking-wide">{p.name}</span>
                    <div className="text-right">
                      <p className="text-[11px] font-medium text-[#D4AF37]">${p.price}/g</p>
                      <p className="text-[10px] text-emerald-400/80">{p.change}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/price-indicator" className="dash-text-link inline-block mt-5">
                Full indicator →
              </Link>
            </section>
          </div>

          {/* Result */}
          <section className="apply-surface p-8 sm:p-10 lg:col-span-5 flex flex-col">
            <p className="dash-label mb-8 text-center">Calculated value</p>
            <p className="calc-hero-value text-center">
              ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <p className="text-center text-[11px] tracking-wide text-neutral-500 mt-2 mb-10">
              {weight.toLocaleString()} g · {coin.metal}
            </p>

            <div className="space-y-0 flex-1">
              {[
                { label: 'Metal value', value: `$${metalValue.toFixed(2)}` },
                { label: 'Manufacturing', value: `$${mfgFee.toLocaleString()}` },
                { label: 'Platform fee', value: `$${platformFee}` },
              ].map((r) => (
                <div key={r.label} className="preview-row">
                  <span className="preview-muted">{r.label}</span>
                  <span className="preview-value">{r.value}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-center tracking-wide text-neutral-600 mt-8 leading-relaxed">
              Indicative pricing. Final quote may reflect live market movement at checkout.
            </p>
          </section>

          {/* Financing */}
          <section className="apply-surface-sidebar p-7 sm:p-8 lg:col-span-3 flex flex-col lg:sticky lg:top-6">
            <p className="dash-label mb-2">Financing preview</p>
            <p className="text-[10px] text-neutral-600 tracking-wide mb-6">Provided by Crystal</p>

            {[
              { label: 'Coin value', value: `$${totalValue.toFixed(2)}` },
              { label: 'Down payment (20%)', value: `$${downPayment.toFixed(2)}` },
              { label: 'Amount to finance', value: `$${toFinance.toFixed(2)}` },
              { label: 'Term', value: '12 months' },
              { label: 'Est. monthly', value: `$${monthly}` },
            ].map((r) => (
              <div key={r.label} className="preview-row">
                <span className="preview-muted">{r.label}</span>
                <span className="preview-value">{r.value}</span>
              </div>
            ))}

            <p className="apply-preview-note mt-4">Estimate only. Partners confirm final terms.</p>

            <Link to="/apply" className="luxury-btn-glass w-full justify-center mt-auto pt-6">
              Apply for financing
            </Link>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
