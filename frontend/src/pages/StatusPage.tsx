import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'

const TIMELINE_STEPS = [
  { label: 'Submitted', done: true, date: '10/05/2024 09:15 AM' },
  { label: 'Under Review', done: true, date: '10/05/2024 11:30 AM', current: true },
  { label: 'Sent to Crystal', done: false, date: null },
  { label: 'Approved', done: false, date: null },
  { label: 'Funds Received', done: false, date: null },
  { label: 'In Production', done: false, date: null },
  { label: 'Delivered', done: false, date: null },
]

const HISTORY = [
  { status: 'Under Review', date: '10/05/2024 11:30 AM', note: 'Application under review by our team.' },
  { status: 'Submitted', date: '10/05/2024 09:15 AM', note: 'Application submitted successfully.' },
]

const DETAILS = [
  { label: 'Application ID', value: 'APP-2024-000567' },
  { label: 'Coin type', value: 'Merge Silver Coin (1KG)' },
  { label: 'Submitted', value: '10/05/2024 09:15 AM' },
  { label: 'Total value', value: '$2,450.00' },
]

export default function StatusPage() {
  return (
    <DashboardLayout titleKey="status">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="landing-sans-head mb-2">Application status</p>
            <h2 className="font-serif-display text-3xl font-light tracking-wide text-[#f5f2eb]">
              APP-2024-000567
            </h2>
          </div>
          <span className="status-badge status-badge--review">
            <span className="dash-pulse-dot shrink-0" />
            Under review
          </span>
        </div>

        {/* Timeline */}
        <section className="dash-panel">
          <p className="dash-label mb-8">Application timeline</p>

          <div className="hidden md:block">
            <div className="status-timeline-track">
              {TIMELINE_STEPS.map((s, i) => (
                <div key={s.label} className="status-timeline-step">
                  {i < TIMELINE_STEPS.length - 1 && (
                    <div
                      className="status-timeline-line"
                      data-done={s.done && !s.current ? 'true' : 'false'}
                    />
                  )}
                  <div
                    className={`status-timeline-dot ${
                      s.current ? 'status-timeline-dot--current' : s.done ? 'status-timeline-dot--done' : ''
                    }`}
                  >
                    {s.current ? '◎' : s.done ? '✓' : ''}
                  </div>
                  <p
                    className={`status-timeline-label ${
                      s.current ? 'text-[#D4AF37]' : s.done ? 'text-neutral-400' : 'text-neutral-600'
                    }`}
                  >
                    {s.label}
                  </p>
                  {s.date && (
                    <p className="text-[9px] tracking-wide text-neutral-600 mt-1 text-center max-w-[88px]">
                      {s.date}
                    </p>
                  )}
                  {s.current && <span className="status-current-pill mt-2">Current</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden space-y-3">
            {TIMELINE_STEPS.map((s, i) => (
              <div key={s.label} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div
                    className={`status-timeline-dot ${
                      s.current ? 'status-timeline-dot--current' : s.done ? 'status-timeline-dot--done' : ''
                    }`}
                  >
                    {s.current ? '◎' : s.done ? '✓' : ''}
                  </div>
                  {i < TIMELINE_STEPS.length - 1 && (
                    <div className="w-px flex-1 min-h-[24px] mt-1 bg-white/[0.06]" />
                  )}
                </div>
                <div className="pb-2">
                  <p className={`text-[11px] font-medium tracking-wide ${s.current ? 'text-[#D4AF37]' : 'text-neutral-300'}`}>
                    {s.label}
                  </p>
                  {s.date && <p className="text-[10px] text-neutral-600 mt-0.5">{s.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History + side column */}
        <div className="grid lg:grid-cols-2 gap-5 items-start">
          <section className="dash-panel h-full">
            <p className="dash-label mb-6">Status history</p>
            <ul className="space-y-0">
              {HISTORY.map((h, i) => (
                <li key={h.status} className="status-history-item">
                  <div className="status-history-rail">
                    <span className="status-history-dot" />
                    {i < HISTORY.length - 1 && <span className="status-history-line" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-[11px] font-medium tracking-wide text-neutral-200">{h.status}</p>
                    <p className="text-[10px] text-neutral-600 tracking-wide mt-0.5">{h.date}</p>
                    <p className="text-[10px] text-neutral-500 tracking-wide mt-2 leading-relaxed">{h.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="space-y-5">
            <section className="dash-panel">
              <p className="dash-label mb-5">Notifications</p>
              <div className="status-notice">
                <p className="text-[11px] font-medium tracking-wide text-neutral-200 mb-2">
                  Application under review
                </p>
                <p className="text-[10px] text-neutral-500 tracking-wide leading-relaxed">
                  Your application is currently being reviewed by our team. You will be notified once there is an
                  update.
                </p>
                <p className="text-[9px] text-neutral-600 tracking-wide mt-3">2 hours ago</p>
              </div>
              <p className="text-[10px] text-neutral-600 tracking-wide text-center mt-5">
                We will notify you once there is an update.
              </p>
            </section>

            <section className="dash-panel">
              <p className="dash-label mb-5">Application details</p>
              <dl className="space-y-0">
                {DETAILS.map((d) => (
                  <div key={d.label} className="status-detail-row">
                    <dt className="text-[10px] tracking-wide text-neutral-500">{d.label}</dt>
                    <dd className="text-[10px] font-medium tracking-wide text-neutral-200 text-right">{d.value}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/apply" className="luxury-btn-ghost w-full justify-center mt-6 text-center">
                New application
              </Link>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
