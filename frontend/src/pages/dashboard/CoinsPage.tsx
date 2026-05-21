import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout'

export default function CoinsPage() {
  return (
    <DashboardLayout titleKey="coins">
      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
        <div className="dash-panel">
          <p className="dash-label mb-4">Active coin</p>
          <div className="flex gap-5 items-start">
            <div className="dash-coin-badge text-2xl">★</div>
            <div>
              <h3 className="text-sm font-medium tracking-wide text-[#D4AF37] mb-2">
                MERGE SILVER COIN (1KG)
              </h3>
              <p className="text-[11px] text-neutral-500 tracking-wide mb-1">Quantity: 1,000 g</p>
              <p className="text-[11px] text-neutral-500 tracking-wide mb-3">Purity: 90.9% Silver</p>
              <span className="dash-status dash-status--blue">In Production</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/status" className="luxury-btn-glass">Track status</Link>
            <Link to="/merge-coin" className="luxury-btn-ghost">Coin details</Link>
          </div>
        </div>
        <div className="dash-panel">
          <p className="dash-label mb-4">Balance</p>
          <p className="font-serif-display text-4xl font-light text-[#D4AF37] tracking-wide">12,450</p>
          <p className="text-[10px] tracking-[0.2em] text-neutral-500 mt-1 mb-6">MGS</p>
          <Link to="/merge-coin" className="luxury-btn-glass">Explore merge coin</Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
