import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Scale, Search, Users, Briefcase, FileText, CheckCircle, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const AppLayout: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { label: 'Search Advocates', path: '/search', icon: <Search className="w-4 h-4 mr-2" /> },
    { label: 'Directory', path: '/directory', icon: <Scale className="w-4 h-4 mr-2" /> },
    { label: 'Network', path: '/network', icon: <Users className="w-4 h-4 mr-2" /> },
    { label: 'Services Hub', path: '/services', icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { label: 'AI Assist', path: '/profile/ai-assist', icon: <FileText className="w-4 h-4 mr-2" /> },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-navy-900 border-b border-navy-800 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-400 font-bold">
                <Shield className="w-5 h-5 text-sky-400" />
              </div>
              <span className="font-bold text-lg tracking-tight font-serif text-white">
                Legal<span className="text-sky-400">Net</span>
              </span>
            </Link>

            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path)
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-navy-800 text-sky-400 border-b-2 border-sky-400'
                        : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
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
            <Link to="/directory">
              <Button variant="outline" size="sm" className="text-white border-slate-700 hover:bg-navy-800">
                <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Claim Profile
              </Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white font-medium">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Legal Professionals Network. Dedicated to the Advocates and Legal Fraternity of Tamil Nadu and India.</p>
          <p className="mt-1 text-slate-400">
            All AI recommendations are fully grounded on declared or verified profile records.
          </p>
        </div>
      </footer>
    </div>
  )
}
