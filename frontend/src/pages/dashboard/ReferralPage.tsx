import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DashboardLayout from '../../components/DashboardLayout'
import { downloadReferralQrPng, REFERRAL_QR_PATTERN, shareReferralLink } from '../../utils/referralQr'

function MiniQR({ color = '#1a1a1a' }: { color?: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '2px',
        width: '120px',
        height: '120px',
        padding: '8px',
        background: '#fff',
        borderRadius: '4px',
      }}
    >
      {REFERRAL_QR_PATTERN.slice(0, 144).map((f, i) => (
        <div key={i} style={{ background: f ? color : 'transparent', borderRadius: '1px' }} />
      ))}
    </div>
  )
}

const REFERRALS = [
  { user: 'Giorgi T.', date: '10/05/2024', status: 'VERIFIED', order: 'ORD-2024-000567' },
  { user: 'Nino M.', date: '08/05/2024', status: 'PENDING', order: '—' },
  { user: 'David K.', date: '01/05/2024', status: 'VERIFIED', order: 'ORD-2024-000544' },
]

export default function ReferralPage() {
  const { t } = useTranslation()
  const refLink = 'https://mergestars.com/ref/QR-REF-000001'
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((message: string) => {
    setToast(message)
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(t)
  }, [toast])

  const handleDownload = () => {
    downloadReferralQrPng(REFERRAL_QR_PATTERN, {
      color: '#1a1a1a',
      filename: 'merge-stars-QR-REF-000001.png',
    })
    showToast('QR code downloaded')
  }

  const handleShare = async () => {
    try {
      const result = await shareReferralLink(refLink)
      showToast(result === 'shared' ? 'Link shared' : 'Link copied — share not available')
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      showToast('Could not share link')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(refLink)
      showToast('Referral link copied')
    } catch {
      showToast('Copy failed — select the link manually')
    }
  }

  return (
    <DashboardLayout titleKey="referral">
      {toast && <div className="referral-toast" role="status">{toast}</div>}

      <div style={{ maxWidth: '1000px' }}>
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#c9a84c', marginBottom: '8px' }}>REFERRAL SYSTEM</p>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff' }}>My Referrals</h1>
        </div>

        <div style={{ padding: '14px 20px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '4px', marginBottom: '24px', display: 'flex', gap: '12px' }}>
          <span style={{ fontSize: '16px' }}>ℹ</span>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
            MERGE STARS uses a <strong style={{ color: '#c9a84c' }}>single-level referral system only</strong>. Multi-level (MLM) structures are prohibited.
            Only direct referrals are attributed. Your referral share: <strong style={{ color: '#c9a84c' }}>25%</strong> of platform fee per confirmed order.
          </p>
        </div>

        <div className="referral-tools-grid">
          <div className="gold-card referral-qr-card" style={{ borderRadius: '4px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', alignSelf: 'flex-start', margin: 0 }}>REFERRAL QR CODE</p>
            <MiniQR />
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', margin: 0 }}>QR-REF-000001</p>
            <div className="qr-card-actions" style={{ paddingTop: 0, marginTop: 'auto' }}>
              <button type="button" className="gold-btn-outline" onClick={handleDownload}>
                {t('common.download')}
              </button>
              <button type="button" className="gold-btn" onClick={handleShare}>
                {t('common.share')}
              </button>
            </div>
          </div>

          <div className="gold-card" style={{ padding: '28px', borderRadius: '4px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#c9a84c', marginBottom: '16px' }}>REFERRAL LINK</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <input className="gold-input" value={refLink} readOnly style={{ flex: '1 1 12rem', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }} />
              <button type="button" className="gold-btn ai-chat-send" onClick={handleCopy}>
                {t('common.copy')}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Total Referrals', value: '3' },
                { label: 'Verified', value: '2', color: '#22c55e' },
                { label: 'QR Scans', value: '41' },
                { label: 'Your Share', value: '25%', color: '#c9a84c' },
              ].map((s) => (
                <div key={s.label} style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', letterSpacing: '0.1em' }}>{s.label}</p>
                  <p style={{ fontSize: '22px', fontWeight: 900, color: s.color || '#fff', margin: 0 }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c', margin: 0 }}>MY REFERRED USERS</p>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['USER', 'DATE JOINED', 'KYC STATUS', 'ORDER'].map((h) => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REFERRALS.map((r) => (
                <tr key={r.user} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', fontSize: '13px', color: '#fff', fontWeight: 600 }}>{r.user}</td>
                  <td style={{ padding: '12px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{r.date}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', background: r.status === 'VERIFIED' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: r.status === 'VERIFIED' ? '#22c55e' : '#f59e0b', borderRadius: '2px' }}>{r.status}</span>
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: '12px', color: r.order === '—' ? 'rgba(255,255,255,0.3)' : '#c9a84c', fontWeight: r.order !== '—' ? 700 : 400 }}>{r.order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
