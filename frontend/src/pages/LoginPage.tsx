import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Tab = 'login' | 'register'
type Step = 1 | 2 | 3

const TERMS = [
  'I agree to the Terms & Conditions',
  'I agree to the Privacy Policy',
  'I understand that MERGE STARS is not a lender or financial institution.',
  'I understand that funding is provided by our financial partner (Crystal).',
  'I agree that funding approval is subject to evaluation and not guaranteed.',
  'I confirm that all information provided is accurate.',
]

export default function LoginPage() {
  const [tab, setTab]         = useState<Tab>('login')
  const [step, setStep]       = useState<Step>(1)
  const [checked, setChecked] = useState<boolean[]>(TERMS.map(() => false))
  const [showPw, setShowPw]   = useState(false)
  const navigate              = useNavigate()

  const toggleCheck = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  const allChecked = checked.every(Boolean)

  return (
    <div
      className="min-h-screen flex"
      style={{ background: '#080808' }}
    >
      {/* ── LEFT — Branding panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden px-16 py-12"
        style={{ background: 'linear-gradient(135deg, #080808 0%, #0f0f0f 100%)' }}
      >
        {/* Glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          }}
        />
        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div
            className="flex items-center justify-center text-black font-black text-xl"
            style={{
              width: '40px', height: '40px',
              background: 'linear-gradient(135deg,#c9a84c,#f5d78e)',
              borderRadius: '4px',
            }}
          >★</div>
          <div>
            <p className="text-[11px] font-black tracking-[0.35em]" style={{ color: '#c9a84c' }}>MERGE</p>
            <p className="text-[11px] font-black tracking-[0.35em] text-white">STARS</p>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h1 className="font-black leading-none mb-4" style={{ fontSize: '56px' }}>
            <span className="gold-text">THE NEXT</span>
            <br /><span className="text-white">ERA OF</span>
            <br /><span className="gold-text">LUXURY</span>
          </h1>
          <p className="text-[14px] leading-7" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '320px' }}>
            3D Filament Technology Infused with Precious Metals. Revolutionary. Unique. Limitless.
          </p>

          {/* Badges */}
          <div className="flex gap-6 mt-10">
            {[
              { icon: '🔒', label: 'SECURE PLATFORM',  sub: 'Your data is 100% protected' },
              { icon: '🔐', label: 'ENCRYPTED',         sub: 'Bank-level security' },
              { icon: '🤝', label: 'TRUSTED PARTNER',   sub: 'Powered by Crystals' },
            ].map((b) => (
              <div key={b.label} className="text-center">
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="text-[9px] font-bold tracking-[0.12em]" style={{ color: '#c9a84c' }}>{b.label}</p>
                <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{b.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] relative z-10" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © 2024 MERGE STARS. All Rights Reserved.
        </p>
      </div>

      {/* ── RIGHT — Auth panel ── */}
      <div
        className="flex-1 flex flex-col justify-center items-center px-8 lg:px-16 py-12 overflow-y-auto"
        style={{ maxWidth: '640px', margin: '0 auto' }}
      >
        {/* Welcome */}
        <div className="text-center mb-8 w-full">
          <h2 className="text-[11px] font-bold tracking-[0.3em] mb-1" style={{ color: '#c9a84c' }}>
            ★ WELCOME TO MERGE STARS ★
          </h2>
        </div>

        {/* Tabs */}
        <div
          className="flex w-full max-w-md mb-8"
          style={{ border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', overflow: 'hidden' }}
        >
          {(['login', 'register'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setStep(1) }}
              className="flex-1 py-3 text-[12px] font-bold tracking-[0.15em] uppercase transition-all"
              style={{
                background: tab === t ? 'linear-gradient(135deg,#c9a84c,#f5d78e)' : 'transparent',
                color: tab === t ? '#000' : 'rgba(255,255,255,0.5)',
              }}
            >
              {t === 'login' ? '★ LOGIN' : '★ CREATE ACCOUNT'}
            </button>
          ))}
        </div>

        {/* ── LOGIN FORM ── */}
        {tab === 'login' && (
          <form
            className="w-full max-w-md flex flex-col gap-5"
            onSubmit={(e) => { e.preventDefault(); navigate('/dashboard') }}
          >
            <div>
              <label className="text-[11px] font-semibold tracking-[0.12em] block mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                EMAIL OR PHONE
              </label>
              <input className="gold-input" placeholder="Enter your email or phone" />
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-[0.12em] block mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                PASSWORD
              </label>
              <div className="relative">
                <input
                  className="gold-input pr-12"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px]"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {showPw ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#c9a84c]" />
                <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Remember Me</span>
              </label>
              <button type="button" className="text-[12px]" style={{ color: '#c9a84c' }}>
                Forgot Password?
              </button>
            </div>
            <button type="submit" className="gold-btn w-full justify-center mt-2">
              ENTER PLATFORM
            </button>
            <p className="text-center text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Don't have an account?{' '}
              <button type="button" onClick={() => setTab('register')} style={{ color: '#c9a84c' }}>
                Create Account
              </button>
            </p>
          </form>
        )}

        {/* ── REGISTER FORM ── */}
        {tab === 'register' && (
          <div className="w-full max-w-md">
            {/* Step indicator */}
            <div className="flex items-center mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                    style={{
                      background: step >= s ? 'linear-gradient(135deg,#c9a84c,#f5d78e)' : '#111',
                      color: step >= s ? '#000' : 'rgba(255,255,255,0.3)',
                      border: step >= s ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className="flex-1 h-px mx-2"
                      style={{ background: step > s ? '#c9a84c' : 'rgba(255,255,255,0.1)' }}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-[11px] font-bold tracking-[0.2em] mb-6" style={{ color: '#c9a84c' }}>
              {step === 1 ? 'STEP 1 — PERSONAL INFO' : step === 2 ? 'STEP 2 — SECURITY' : 'STEP 3 — AGREEMENT'}
            </p>

            {/* Step 1 */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>FIRST NAME</label>
                    <input className="gold-input" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>LAST NAME</label>
                    <input className="gold-input" placeholder="Enter your last name" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>PERSONAL ID NUMBER</label>
                  <input className="gold-input" placeholder="Enter your personal ID" />
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>PHONE NUMBER</label>
                  <div className="flex gap-2">
                    <select
                      className="gold-input"
                      style={{ width: '90px', flexShrink: 0 }}
                    >
                      <option>🇬🇪 +995</option>
                      <option>🇺🇸 +1</option>
                      <option>🇬🇧 +44</option>
                    </select>
                    <input className="gold-input" placeholder="Enter your phone number" />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="gold-btn w-full justify-center mt-2"
                  style={{ borderRadius: '2px' }}
                >
                  NEXT STEP &rsaquo;
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-semibold tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>EMAIL</label>
                  <input className="gold-input" type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>CREATE PASSWORD</label>
                  <input className="gold-input" type="password" placeholder="Create your password" />
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>CONFIRM PASSWORD</label>
                  <input className="gold-input" type="password" placeholder="Confirm your password" />
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>VERIFICATION CODE</label>
                  <div className="flex gap-2">
                    <input className="gold-input" placeholder="Enter 6-digit code" />
                    <button
                      className="gold-btn-outline shrink-0"
                      style={{ borderRadius: '2px', whiteSpace: 'nowrap' }}
                    >
                      SEND CODE
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="gold-btn-outline flex-1 justify-center"
                    style={{ borderRadius: '2px' }}
                  >
                    ‹ BACK
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="gold-btn flex-1 justify-center"
                    style={{ borderRadius: '2px' }}
                  >
                    NEXT STEP &rsaquo;
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                {TERMS.map((t, i) => (
                  <label key={i} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked[i]}
                      onChange={() => toggleCheck(i)}
                      className="mt-0.5 accent-[#c9a84c] shrink-0"
                    />
                    <span className="text-[12px] leading-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {i === 0 ? (
                        <>
                          I agree to the{' '}
                          <Link to="/terms" className="text-[#c9a84c] hover:underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
                            Terms &amp; Conditions
                          </Link>
                        </>
                      ) : i === 1 ? (
                        <>
                          I agree to the{' '}
                          <Link to="/privacy" className="text-[#c9a84c] hover:underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
                            Privacy Policy
                          </Link>
                        </>
                      ) : (
                        t
                      )}
                    </span>
                  </label>
                ))}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="gold-btn-outline flex-1 justify-center"
                    style={{ borderRadius: '2px' }}
                  >
                    ‹ BACK
                  </button>
                  <button
                    disabled={!allChecked}
                    onClick={() => navigate('/dashboard')}
                    className="gold-btn flex-1 justify-center"
                    style={{
                      borderRadius: '2px',
                      opacity: allChecked ? 1 : 0.4,
                      cursor: allChecked ? 'pointer' : 'not-allowed',
                    }}
                  >
                    ACTIVATE MY MERGE COIN
                  </button>
                </div>
              </div>
            )}

            <p className="text-center text-[12px] mt-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Already have an account?{' '}
              <button onClick={() => setTab('login')} style={{ color: '#c9a84c' }}>Login</button>
            </p>

            <p className="text-center text-[11px] mt-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
              ★ YOUR JOURNEY TO LUXURY STARTS HERE
            </p>
          </div>
        )}

        <Link
          to="/"
          className="mt-10 text-[11px] tracking-widest"
          style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}
        >
          ← BACK TO HOME
        </Link>
      </div>
    </div>
  )
}
