import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import FlowStepper from '../components/FlowStepper'
import CustomSelect from '../components/CustomSelect'

type Step = 1 | 2 | 3 | 4

const COIN_TYPES = [
  'MERGE SILVER COIN (1KG)',
  'MERGE GOLD COIN (1KG)',
  'MERGE PLATINUM COIN (1KG)',
]

const STEP_LABELS = ['Coin details', 'Your profile', 'Delivery & financing', 'Review']

const STEP_GUIDE: { title: string; blurb: string }[] = [
  {
    title: 'Coin details',
    blurb: 'Choose your Merge Coin specification. You can refine quantity, metal, and optional requests before submitting.',
  },
  {
    title: 'Personal information',
    blurb: 'We use these details for KYC verification and secure account records.',
  },
  {
    title: 'Financing & delivery',
    blurb: 'Select how you would like to pay and where your order should ship.',
  },
  {
    title: 'Review & submit',
    blurb: 'Confirm every field is correct before you send your application to our team.',
  },
]

export default function ApplicationPage() {
  const [step, setStep] = useState<Step>(1)
  const [coinType, setCoinType] = useState(COIN_TYPES[0])
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  const coinValue = 2450
  const downPayment = coinValue * 0.2
  const toFinance = coinValue - downPayment
  const monthly = (toFinance / 12).toFixed(2)

  const idx = step - 1

  return (
    <DashboardLayout titleKey="application">
      <div className="apply-flow-wrap apply-flow-max space-y-8">
        <header>
          <p className="landing-sans-head mb-2">Merge Stars · application</p>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-light tracking-wide text-[#f5f2eb]">
            {STEP_GUIDE[idx].title}
          </h2>
          <span className="apply-step-pill">Step {step} of 4</span>
          <p className="apply-lead">{STEP_GUIDE[idx].blurb}</p>
        </header>

        <FlowStepper steps={STEP_LABELS} current={step} />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="apply-surface p-8 sm:p-10">
              {step === 1 && (
                <div className="flex flex-col gap-7 sm:gap-8">
                  <h3 className="apply-section-head">Coin specification</h3>
                  <div>
                    <label className="apply-label" htmlFor="apply-coin-type">
                      Select coin type
                    </label>
                    <CustomSelect
                      id="apply-coin-type"
                      aria-label="Coin type"
                      value={coinType}
                      onChange={(v) => setCoinType(String(v))}
                      options={COIN_TYPES.map((c) => ({ value: c, label: c }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label className="apply-label" htmlFor="apply-qty">
                        Quantity (KG)
                      </label>
                      <input
                        id="apply-qty"
                        className="apply-field"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(+e.target.value)}
                        min={1}
                      />
                    </div>
                    <div>
                      <label className="apply-label" htmlFor="apply-weight">
                        Coin weight
                      </label>
                      <input
                        id="apply-weight"
                        className="apply-field apply-field--muted"
                        value={`${quantity * 1000} grams`}
                        readOnly
                        aria-readonly="true"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label className="apply-label" htmlFor="apply-metal">
                        Metal purity
                      </label>
                      <select id="apply-metal" className="apply-field">
                        <option>Silver (Ag)</option>
                        <option>Gold (Au)</option>
                        <option>Platinum (Pt)</option>
                      </select>
                    </div>
                    <div>
                      <label className="apply-label" htmlFor="apply-purity">
                        Fineness (%)
                      </label>
                      <input
                        id="apply-purity"
                        className="apply-field apply-field--muted"
                        value="99.9 %"
                        readOnly
                        aria-readonly="true"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="apply-label" htmlFor="apply-notes">
                      Special request (optional)
                    </label>
                    <textarea
                      id="apply-notes"
                      className="apply-field resize-none"
                      rows={4}
                      placeholder="Engraving, packaging, timelines, or other notes..."
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-7 sm:gap-8">
                  <h3 className="apply-section-head">Your profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label className="apply-label" htmlFor="apply-fn">
                        First name
                      </label>
                      <input id="apply-fn" className="apply-field" placeholder="As shown on ID" />
                    </div>
                    <div>
                      <label className="apply-label" htmlFor="apply-ln">
                        Last name
                      </label>
                      <input id="apply-ln" className="apply-field" placeholder="As shown on ID" />
                    </div>
                  </div>
                  <div>
                    <label className="apply-label" htmlFor="apply-idn">
                      Personal ID number
                    </label>
                    <input id="apply-idn" className="apply-field" placeholder="National ID or passport number" />
                  </div>
                  <div>
                    <label className="apply-label" htmlFor="apply-phone-after">
                      Phone number
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <select
                        className="apply-field shrink-0 w-full sm:w-[8.75rem]"
                        id="apply-cc"
                        aria-label="Country code"
                      >
                        <option>🇬🇪 +995</option>
                        <option>🇺🇸 +1</option>
                      </select>
                      <input id="apply-phone-after" className="apply-field flex-1" placeholder="Mobile number" />
                    </div>
                  </div>
                  <div>
                    <label className="apply-label" htmlFor="apply-email">
                      Email
                    </label>
                    <input id="apply-email" className="apply-field" type="email" placeholder="name@company.com" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-7 sm:gap-8">
                  <h3 className="apply-section-head">Options & address</h3>
                  <div>
                    <label className="apply-label" htmlFor="apply-fin">
                      Financing preference
                    </label>
                    <select id="apply-fin" className="apply-field">
                      <option>Full payment</option>
                      <option>Bank financing (12 months)</option>
                      <option>Bank financing (24 months)</option>
                    </select>
                  </div>
                  <div>
                    <label className="apply-label" htmlFor="apply-address">
                      Delivery address
                    </label>
                    <textarea
                      id="apply-address"
                      className="apply-field resize-none"
                      rows={4}
                      placeholder="Street, city, postal code, country"
                    />
                  </div>
                  <div>
                    <label className="apply-label" htmlFor="apply-misc">
                      Additional notes
                    </label>
                    <textarea
                      id="apply-misc"
                      className="apply-field resize-none"
                      rows={3}
                      placeholder="Optional context for fulfilment team"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-4">
                  <h3 className="apply-section-head">Application summary</h3>
                  {[
                    { label: 'Coin type', value: coinType },
                    { label: 'Quantity', value: `${quantity} KG` },
                    { label: 'Coin weight', value: `${quantity * 1000} grams` },
                    { label: 'Metal purity', value: '99.9 % silver' },
                    { label: 'Order value reference', value: `$${(coinValue * quantity).toLocaleString()}` },
                    { label: 'Financing', value: 'Bank financing (12 months)' },
                  ].map((r) => (
                    <div key={r.label} className="preview-row">
                      <span className="preview-muted">{r.label}</span>
                      <span className="preview-value text-right">{r.value}</span>
                    </div>
                  ))}
                  <div className="pt-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 w-4 h-4 shrink-0 accent-[#d4af37]" />
                      <span className="text-[11px] leading-relaxed tracking-wide text-neutral-500">
                        I confirm this information is accurate and I agree to the{' '}
                        <Link to="/terms" className="text-[#D4AF37] hover:underline underline-offset-2">
                          Terms &amp; Conditions
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="apply-actions-divider">
                <div className="application-actions flex flex-col-reverse sm:flex-row gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => (s - 1) as Step)}
                      className="luxury-btn-ghost flex-1 justify-center"
                    >
                      ‹ Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => (s + 1) as Step)}
                      className={`luxury-btn-glass justify-center ${step > 1 ? 'flex-1' : 'w-full sm:flex-1'}`}
                    >
                      Continue ›
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate('/status')}
                      className={`luxury-btn-glass justify-center ${step > 1 ? 'flex-1' : 'w-full sm:flex-1'}`}
                    >
                      Submit application ›
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="apply-surface-sidebar p-7 sm:p-8 lg:sticky lg:top-6">
              <p className="dash-label mb-6">Financing preview</p>
              {[
                { label: 'Coin value', value: `$${coinValue.toLocaleString()}.00` },
                { label: 'Down payment (20%)', value: `$${downPayment.toFixed(2)}` },
                { label: 'Amount to finance', value: `$${toFinance.toFixed(2)}` },
                { label: 'Financing term', value: '12 months' },
                { label: 'Est. monthly', value: `$${monthly}` },
              ].map((r) => (
                <div key={r.label} className="preview-row">
                  <span className="preview-muted">{r.label}</span>
                  <span className="preview-value">{r.value}</span>
                </div>
              ))}
              <p className="apply-preview-note">
                Indicative only. Crystal and our underwriting partners set final financing terms.
              </p>

              <Link to="/calculator" className="luxury-btn-glass w-full justify-center mt-6">
                Open price calculator
              </Link>
              <div className="apply-sidebar-links">
                <Link to="/price-indicator">View live reference indicator</Link>
                <Link to="/faq">How pricing works →</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  )
}
