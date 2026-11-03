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
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col font-sans text-[#171717]">
      {/* Primary Navigation */}
      <header className="bg-[#FFFFFF] border-b border-[#D9D7D0] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-8">
            {/* Hamburger button for mobile & tablet */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#686868] hover:text-[#171717] hover:bg-[#E8E6DF] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/discover" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ⚖
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base tracking-tight text-[#171717] whitespace-nowrap">
                  LEGAL NETWORK
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#929292] -mt-0.5">
                  Editorial AI Product
                </span>
              </div>
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
                    className={`flex items-center px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#E8E6DF] text-[#171717] font-semibold'
                        : 'text-[#686868] hover:text-[#171717] hover:bg-[#E8E6DF]'
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
              className="hidden sm:inline-flex items-center text-xs font-medium text-[#171717] bg-[#FFFFFF] border border-[#D9D7D0] px-3 py-1.5 rounded-lg hover:bg-[#E8E6DF] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#2F6B4F]" />
              Claim Profile
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-1.5 sm:space-x-2 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg border transition-colors ${
                location.pathname === '/profile'
                  ? 'border-[#111111] text-[#171717] bg-[#E8E6DF]'
                  : 'border-[#D9D7D0] text-[#171717] bg-[#FFFFFF] hover:bg-[#E8E6DF]'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#686868] shrink-0" />
              <span className="truncate max-w-[100px] sm:max-w-none">Adv. Kirubakaran</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#D9D7D0] bg-[#FFFFFF] px-4 pt-2 pb-4 space-y-1 shadow-sm">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === '/discover' && (location.pathname === '/' || location.pathname === '/search'))
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E8E6DF] text-[#171717] font-semibold'
                      : 'text-[#686868] hover:bg-[#E8E6DF] hover:text-[#171717]'
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#D9D7D0] py-6 text-xs text-[#929292]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Legal Network. Professional Network for Indian Legal Practitioners.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link to="/activity" className="text-[#686868] hover:text-[#171717] flex items-center transition-colors">
              <Activity className="w-3.5 h-3.5 mr-1 text-[#456B8C]" />
              AI Activity & Transparency
            </Link>
            <Link to="/directory" className="text-[#686868] hover:text-[#171717] transition-colors">
              Advocate Directory
            </Link>
            <Link to="/profile" className="text-[#686868] hover:text-[#171717] transition-colors">
              Settings & Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
