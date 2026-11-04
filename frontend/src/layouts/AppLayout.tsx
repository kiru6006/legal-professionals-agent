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
  X,
  Palette
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
    { label: 'Design System', path: '/design-system', icon: <Palette className="w-4 h-4 mr-2 text-[#C70234]" /> },
  ]

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans text-[#202124]">
      {/* Top Crimson Editorial Accent Bar (Inspired by Master Design Prompt & Reference) */}
      <div className="h-1 bg-gradient-to-r from-[#C70234] via-[#EA4335] to-[#FBBC05] w-full sticky top-0 z-50" />

      {/* Primary Navigation */}
      <header className="bg-white border-b border-[#DADCE0] sticky top-1 z-40 shadow-[0_1px_3px_rgba(60,64,67,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-8">
            {/* Hamburger button for mobile & tablet */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/discover" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#C70234] text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-[#B6263A] transition-colors">
                ⚖
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base tracking-tight text-[#202124] whitespace-nowrap">
                  LEGAL NETWORK
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C70234] -mt-0.5">
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
                        ? 'bg-[#E8F0FE] text-[#1A73E8] font-semibold shadow-xs'
                        : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
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
              className="hidden sm:inline-flex items-center text-xs font-semibold text-[#188038] bg-[#E6F4EA] border border-[#34A853]/30 px-3 py-1.5 rounded-lg hover:bg-[#D4EDDA] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#34A853]" />
              Claim Profile
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-1.5 sm:space-x-2 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg border transition-colors ${
                location.pathname === '/profile'
                  ? 'border-[#1A73E8] text-[#1A73E8] bg-[#E8F0FE]'
                  : 'border-[#DADCE0] text-[#202124] bg-white hover:bg-[#F1F3F4]'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#5F6368] shrink-0" />
              <span className="truncate max-w-[100px] sm:max-w-none font-medium">Adv. Kirubakaran</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#DADCE0] bg-white px-4 pt-2 pb-4 space-y-1 shadow-sm">
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
                      ? 'bg-[#E8F0FE] text-[#1A73E8] font-semibold'
                      : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
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
      <footer className="bg-white border-t border-[#DADCE0] py-6 text-xs text-[#80868B]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Legal Network. Professional Network for Indian Legal Practitioners.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link to="/design-system" className="text-[#5F6368] hover:text-[#C70234] flex items-center transition-colors font-semibold">
              <Palette className="w-3.5 h-3.5 mr-1 text-[#C70234]" />
              UI Design System Showcase
            </Link>
            <Link to="/activity" className="text-[#5F6368] hover:text-[#1A73E8] flex items-center transition-colors">
              <Activity className="w-3.5 h-3.5 mr-1 text-[#1A73E8]" />
              AI Activity & Transparency
            </Link>
            <Link to="/directory" className="text-[#5F6368] hover:text-[#202124] transition-colors">
              Advocate Directory
            </Link>
            <Link to="/profile" className="text-[#5F6368] hover:text-[#202124] transition-colors">
              Settings & Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
