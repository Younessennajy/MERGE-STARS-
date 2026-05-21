import { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'

export default function BrandLinePage() {
  const [name, setName]   = useState('MERGE STAR BRAND')
  const [desc, setDesc]   = useState('')
  const [saved, setSaved] = useState(false)

  return (
    <DashboardLayout titleKey="brandLine">
      <div style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '8px' }}>MY BRAND LINE</p>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff' }}>Brand Identity</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {/* Brand form */}
          <div className="gold-card" style={{ padding: '32px', borderRadius: '4px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '24px' }}>BRAND DETAILS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>BRAND NAME</label>
                <input className="gold-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter brand name" />
              </div>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>BRAND LOGO</label>
                <div style={{
                  border: '2px dashed rgba(201,168,76,0.2)', borderRadius: '4px',
                  padding: '32px', textAlign: 'center', cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')}
                >
                  <p style={{ fontSize: '24px', marginBottom: '8px' }}>📤</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Click to upload logo</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>PNG, SVG · Max 5MB</p>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>BRAND DESCRIPTION</label>
                <textarea className="gold-input" rows={4} placeholder="Describe your brand..." value={desc} onChange={(e) => setDesc(e.target.value)} style={{ resize: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>BRAND LINE ID</label>
                <input className="gold-input" value="BRAND-000001" readOnly style={{ color: '#c9a84c' }} />
              </div>
              <button
                className="gold-btn w-full justify-center"
                style={{ borderRadius: '2px' }}
                onClick={() => setSaved(true)}
              >
                {saved ? '✅ SAVED' : 'SAVE BRAND LINE'}
              </button>
            </div>
          </div>

          {/* Preview + Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Preview card */}
            <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '20px' }}>BRAND PREVIEW</p>
              <div style={{ background: '#080808', borderRadius: '4px', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#f5d78e)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px', fontWeight: 900, color: '#000' }}>★</div>
                <p style={{ fontSize: '16px', fontWeight: 800, color: '#fff', letterSpacing: '0.1em', marginBottom: '8px' }}>{name || 'YOUR BRAND'}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: '200px', margin: '0 auto' }}>{desc || 'Brand description appears here'}</p>
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '10px', padding: '4px 10px', background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px' }}>BRAND-000001</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="gold-card" style={{ padding: '24px', borderRadius: '4px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '16px' }}>BRAND STATS</p>
              {[
                { label: 'Profile Views',    value: '1,247' },
                { label: 'QR Scans',         value: '89' },
                { label: 'Active Products',  value: '3' },
                { label: 'Brand Status',     value: 'ACTIVE', color: '#22c55e' },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: s.color || '#fff' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
