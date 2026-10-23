import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  Compass,
  Users,
  Briefcase,
  MessageSquare,
  Activity,
  User,
  ShieldCheck,
  Scale
} from 'lucide-react'

export const AppLayout: React.FC = () => {
  const location = useLocation()

  // Architecture based on Section 2:
  // DISCOVER (Search, Network, Services)
  // NETWORK (Professional Graph)
  // SERVICES (Request & Offer)
  // MESSAGES (1-to-1 & Service Requests)
  // ACTIVITY (AI Activity & Transparency Log)
  // PROFILE (Profile & Settings)
  const navItems = [
    { label: 'Discover', path: '/discover', icon: <Compass className="w-4 h-4 mr-2" /> },
    { label: 'Directory', path: '/directory', icon: <Scale className="w-4 h-4 mr-2" /> },
    { label: 'Network', path: '/network', icon: <Users className="w-4 h-4 mr-2" /> },
    { label: 'Services', path: '/services', icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { label: 'Messages', path: '/messages', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
    { label: 'AI Activity', path: '/activity', icon: <Activity className="w-4 h-4 mr-2" /> },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans text-[#212121]">
      {/* Primary Navigation (Desktop Top) */}
      <header className="bg-white border-b border-[#E0E0E0] sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/discover" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-[#0D47A1] text-white flex items-center justify-center font-bold text-base shadow-xs">
                ⚖
              </div>
              <span className="font-bold text-lg tracking-tight text-[#0D47A1]">
                LEGAL NETWORK
              </span>
            </Link>

            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === '/discover' && (location.pathname === '/' || location.pathname === '/search'))
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-[#0D47A1] font-semibold border-b-2 border-[#0D47A1]'
                        : 'text-[#666666] hover:text-[#212121] hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/directory"
              className="hidden sm:inline-flex items-center text-xs font-medium text-[#2E7D32] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md hover:bg-emerald-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Claim Profile
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-md border ${
                location.pathname === '/profile'
                  ? 'border-[#0D47A1] text-[#0D47A1] bg-blue-50'
                  : 'border-[#E0E0E0] text-[#212121] hover:bg-slate-50'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#546E7A]" />
              <span>Adv. Kirubakaran</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E0E0E0] py-6 text-center text-xs text-[#666666]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Legal Network. Professional Network for Indian Legal Practitioners.</p>
          <div className="flex items-center space-x-4 text-xs">
            <Link to="/activity" className="text-[#1565C0] hover:underline flex items-center">
              <Activity className="w-3.5 h-3.5 mr-1" />
              AI Activity & Transparency
            </Link>
            <Link to="/directory" className="text-[#666666] hover:underline">
              Advocate Directory
            </Link>
            <Link to="/profile" className="text-[#666666] hover:underline">
              Settings & Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
