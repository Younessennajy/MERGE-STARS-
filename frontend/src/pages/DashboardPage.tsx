import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'

const ACTIVITY = [
  { icon: '✓', text: 'Application Submitted', time: '2 hours ago', tone: 'gold' as const },
  { icon: '✓', text: 'Payment Received', time: '1 day ago', tone: 'green' as const },
  { icon: '◆', text: 'Sent to Crystal', time: '2 days ago', tone: 'blue' as const },
  { icon: '◎', text: 'Under Review', time: '3 days ago', tone: 'amber' as const },
  { icon: '✓', text: 'Order Confirmed', time: '3 days ago', tone: 'green' as const },
]

export default function DashboardPage() {
  return (
    <DashboardLayout titleKey="dashboard">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="dash-panel">
            <p className="dash-label mb-4">Merge coin balance</p>
            <div className="flex items-end gap-4">
              <div className="dash-coin-badge text-xl">★</div>
              <div>
                <p className="font-serif-display text-3xl font-light text-[#D4AF37] tracking-wide leading-none">
                  12,450
                </p>
                <p className="text-[10px] tracking-[0.2em] text-neutral-500 mt-1">MGS</p>
              </div>
            </div>
            <Link to="/dashboard/coins" className="dash-text-link mt-5 inline-block">
              View coins →
            </Link>
          </div>

          <div className="dash-panel">
            <p className="dash-label mb-4">Application status</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="dash-pulse-dot" />
              <p className="text-lg font-light tracking-wide text-amber-400/90">Under review</p>
            </div>
            <p className="text-[11px] text-neutral-500 tracking-wide leading-relaxed">
              Your application is being reviewed by our team.
            </p>
            <Link to="/status" className="dash-text-link mt-5 inline-block">
              View details →
            </Link>
          </div>

          <div className="dash-panel">
            <p className="dash-label mb-4">Total investments</p>
            <p className="font-serif-display text-3xl font-light text-neutral-100 tracking-wide">$24,850</p>
            <p className="text-[11px] mt-2">
              <span className="text-emerald-400/90 font-medium">▲ +14.6%</span>
              <span className="text-neutral-500 ml-2 tracking-wide">this month</span>
            </p>
            <div className="mt-5 h-9 flex items-end gap-1">
              {[40, 55, 45, 70, 65, 80, 90, 85, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    background: i === 8 ? 'rgba(212,175,55,0.7)' : 'rgba(212,175,55,0.15)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="dash-panel lg:col-span-5">
            <p className="dash-label mb-5">My merge coin</p>
            <div className="flex gap-4 items-start">
              <div className="dash-coin-badge text-2xl shrink-0">★</div>
              <div className="min-w-0">
                <h3 className="text-sm font-medium tracking-wide text-[#D4AF37] mb-2">
                  MERGE SILVER COIN (1KG)
                </h3>
                <p className="text-[11px] text-neutral-500 tracking-wide">Quantity: 1,000 g</p>
                <p className="text-[11px] text-neutral-500 tracking-wide mt-0.5">Purity: 90.9% Silver</p>
                <span className="dash-status dash-status--blue mt-3">In production</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-white/[0.06]">
              <Link to="/dashboard/coins" className="luxury-btn-glass">
                View coin
              </Link>
              <Link to="/status" className="luxury-btn-ghost">
                Track status
              </Link>
            </div>
          </div>

          <div className="dash-panel lg:col-span-4">
            <p className="dash-label mb-5">Recent activity</p>
            <ul className="space-y-4">
              {ACTIVITY.map((a) => (
                <li key={a.text} className="flex items-start gap-3">
                  <span className={`dash-activity-icon dash-activity-icon--${a.tone}`}>{a.icon}</span>
                  <div>
                    <p className="text-[11px] font-medium text-neutral-200 tracking-wide">{a.text}</p>
                    <p className="text-[10px] text-neutral-600 mt-0.5 tracking-wide">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="dash-panel lg:col-span-3">
            <p className="dash-label mb-5">Quick actions</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/apply" className="luxury-btn-glass w-full justify-center text-center">
                New application
              </Link>
              <Link to="/calculator" className="luxury-btn-ghost w-full justify-center text-center">
                Calculator
              </Link>
              <Link to="/dashboard/orders" className="luxury-btn-ghost w-full justify-center text-center">
                My orders
              </Link>
              <Link to="/dashboard/support" className="luxury-btn-ghost w-full justify-center text-center">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
