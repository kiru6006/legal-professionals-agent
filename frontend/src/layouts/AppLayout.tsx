import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  Compass,
  Users,
  Briefcase,
  MessageSquare,
  Activity,
  User,
  ShieldCheck,
  Scale,
  Menu,
  X
} from 'lucide-react'

export const AppLayout: React.FC = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Discover', path: '/discover', icon: <Compass className="w-4 h-4 mr-2" /> },
    { label: 'Directory', path: '/directory', icon: <Scale className="w-4 h-4 mr-2" /> },
    { label: 'Network', path: '/network', icon: <Users className="w-4 h-4 mr-2" /> },
    { label: 'Services', path: '/services', icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { label: 'Messages', path: '/messages', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
    { label: 'AI Activity', path: '/activity', icon: <Activity className="w-4 h-4 mr-2" /> },
  ]

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Primary Navigation (Desktop & Mobile Top) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-8">
            {/* Hamburger button for mobile & tablet */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/discover" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0D47A1] text-white flex items-center justify-center font-bold text-base shadow-xs">
                ⚖
              </div>
              <span className="font-black text-base sm:text-lg tracking-tight text-[#0D47A1] whitespace-nowrap">
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
                    className={`flex items-center px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-[#0D47A1] font-bold border-b-2 border-[#0D47A1]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              to="/directory"
              className="hidden sm:inline-flex items-center text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl hover:bg-emerald-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Claim Profile
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-1.5 sm:space-x-2 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-xl border ${
                location.pathname === '/profile'
                  ? 'border-[#0D47A1] text-[#0D47A1] bg-blue-50'
                  : 'border-slate-200 text-slate-800 hover:bg-slate-50'
              }`}
            >
              <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate max-w-[100px] sm:max-w-none">Adv. Kirubakaran</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Slide-down */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === '/discover' && (location.pathname === '/' || location.pathname === '/search'))
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#0D47A1]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Legal Network. Professional Network for Indian Legal Practitioners.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link to="/activity" className="text-[#1565C0] hover:underline flex items-center">
              <Activity className="w-3.5 h-3.5 mr-1" />
              AI Activity & Transparency
            </Link>
            <Link to="/directory" className="text-slate-600 hover:underline">
              Advocate Directory
            </Link>
            <Link to="/profile" className="text-slate-600 hover:underline">
              Settings & Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
