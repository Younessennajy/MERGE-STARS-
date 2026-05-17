import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/router/routes'

const NAV_ITEMS = [
  { label: 'Dashboard',       path: ROUTES.DASHBOARD },
  { label: 'My Profile',      path: ROUTES.PROFILE },
  { label: 'My Applications', path: ROUTES.APPLICATIONS },
  { label: 'My Orders',       path: ROUTES.ORDERS },
  { label: 'My Coins',        path: ROUTES.COINS },
  { label: 'My Investments',  path: ROUTES.INVESTMENTS },
  { label: 'Messages',        path: ROUTES.MESSAGES },
  { label: 'Support',         path: ROUTES.SUPPORT },
  { label: 'Settings',        path: ROUTES.SETTINGS },
]

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-[#111111] border-r border-[#2A2A2A] flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#2A2A2A]">
        <span className="text-[#D4AF37] font-display font-bold text-xl tracking-widest">
          MERGE STARS
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm transition-colors ${
                isActive
                  ? 'text-[#D4AF37] bg-[#D4AF3712] border-r-2 border-[#D4AF37]'
                  : 'text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A]'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#2A2A2A]">
        <button className="w-full text-left px-2 py-2 text-sm text-[#A0A0A0] hover:text-[#EF4444] transition-colors">
          Logout
        </button>
      </div>
    </aside>
  )
}
