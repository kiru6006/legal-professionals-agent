import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  MapPin,
  Briefcase,
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [naturalQuery, setNaturalQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!naturalQuery.trim()) return
    navigate(`/search?q=${encodeURIComponent(naturalQuery.trim())}`)
  }

  const quickActions = [
    { label: 'Find Professional', query: 'Find an advocate with appellate experience in High Court' },
    { label: 'Find Service', query: 'Need a local counsel for court appearance' },
    { label: 'Ask Network', query: 'Experience with electronic evidence suppression in criminal trials' },
    { label: 'Find Referral', query: 'Need to refer a civil property dispute in Madurai' },
    { label: 'Explore Courts', query: 'Advocates practicing before Principal Sessions Court' },
  ]

  const recommendations = [
    {
      name: 'Adv. Ramesh Kumar',
      role: 'Senior Advocate',
      practice: 'Corporate Law • Arbitration',
      location: 'Chennai, Tamil Nadu',
      experience: '16 years experience',
      courts: 'Madras High Court, NCLT',
      why: 'Shared connections (3 mutual referrals) and verified High Court bar record',
      verified: true,
      initial: 'R',
    },
    {
      name: 'Adv. Priya Sharma',
      role: 'Advocate',
      practice: 'Family Law • Property Litigation',
      location: 'Bangalore / Coimbatore',
      experience: '11 years experience',
      courts: 'High Court, District Courts',
      why: 'Court jurisdiction overlap and active counsel availability',
      verified: true,
      initial: 'P',
    },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* User Greeting */}
      <div className="border-b border-[#E0E0E0] pb-4">
        <h1 className="text-2xl font-bold text-[#212121]">Welcome, Kirubakaran</h1>
        <p className="text-sm text-[#666666] mt-0.5">
          Senior Advocate • Tamil Nadu Bar Council (TN/2015/12345)
        </p>
      </div>

      {/* Hero Section: WHAT DO YOU NEED HELP WITH? */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1565C0] flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            AI Professional Discovery
          </span>
        </div>

        <h2 className="text-xl font-bold text-[#212121]">
          WHAT DO YOU NEED HELP WITH?
        </h2>

        <p className="text-xs text-[#666666]">
          E.g., &ldquo;Find a criminal lawyer in Salem for my client&rdquo; or &ldquo;I need to refer a property dispute to someone&rdquo; or &ldquo;Find arbitration specialists in Chennai&rdquo;
        </p>

        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={naturalQuery}
              onChange={(e) => setNaturalQuery(e.target.value)}
              placeholder="Describe your requirement naturally..."
              className="w-full pl-4 pr-32 py-3.5 border border-[#E0E0E0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent text-[#212121] placeholder-[#BDBDBD]"
            />
            <Button
              type="submit"
              className="absolute right-2 top-2 h-9 px-5 bg-[#0D47A1] text-white hover:bg-[#0B3C8A] rounded-md font-medium text-xs flex items-center"
            >
              <Search className="w-3.5 h-3.5 mr-1.5" />
              ⚡ SEARCH
            </Button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-[#666666] block mb-2">OR USE QUICK ACTIONS:</span>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNaturalQuery(action.query)
                  navigate(`/search?q=${encodeURIComponent(action.query)}`)
                }}
                className="text-xs bg-[#FAFAFA] hover:bg-slate-100 text-[#546E7A] font-medium border border-[#E0E0E0] px-3 py-1.5 rounded-md transition-colors"
              >
                [ {action.label} ]
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDED FOR YOU */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
            RECOMMENDED FOR YOU
          </h2>
          <p className="text-xs text-[#666666]">
            Based on your network graph, practice area overlap, and verified Bar records:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="border border-[#E0E0E0] rounded-lg p-4 bg-[#FAFAFA] flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#212121] flex items-center gap-1.5">
                      {rec.name}
                      {rec.verified && (
                        <span className="inline-flex items-center text-[10px] font-semibold text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 mr-0.5" />
                          Verified
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-[#546E7A] mt-0.5">{rec.role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center font-bold text-xs text-[#0D47A1]">
                    {rec.initial}
                  </div>
                </div>

                <div className="mt-2 text-xs space-y-1 text-[#666666]">
                  <div className="font-medium text-[#212121]">{rec.practice}</div>
                  <div className="flex items-center text-xs">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                    {rec.location}
                  </div>
                  <div className="flex items-center text-xs">
                    <Briefcase className="w-3 h-3 mr-1 text-slate-400" />
                    {rec.experience} • {rec.courts}
                  </div>
                </div>

                {/* AI Reasoning box */}
                <div className="mt-3 bg-blue-50/60 border border-blue-100 rounded p-2 text-[11px] text-[#1565C0]">
                  <span className="font-semibold block">⚡ Why Recommended:</span>
                  <span className="text-[#546E7A]">{rec.why}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-[#E0E0E0]">
                <Link to="/search">
                  <Button variant="outline" size="sm" className="h-7 text-xs border-[#E0E0E0] text-[#212121]">
                    View Profile
                  </Button>
                </Link>
                <Link to="/messages">
                  <Button size="sm" className="h-7 text-xs bg-[#0D47A1] text-white hover:bg-[#0B3C8A]">
                    Connect
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RELEVANT COMMUNITY DISCUSSIONS */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
              RELEVANT COMMUNITY DISCUSSIONS
            </h2>
            <p className="text-xs text-[#666666]">
              Peer exchange on recent judgments, procedural challenges, and trial practice:
            </p>
          </div>
          <Link to="/community" className="text-xs text-[#1565C0] font-medium hover:underline flex items-center">
            View All Discussions
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="space-y-3">
          <div className="border border-[#E0E0E0] rounded-lg p-3.5 bg-[#FAFAFA] hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#0D47A1] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Criminal Law
                </span>
                <span className="text-xs font-bold text-[#212121]">
                  Electronic Evidence in Cross-Examination
                </span>
              </div>
              <p className="text-xs text-[#666666] mt-1">
                23 professionals participating • 147 messages • Updated 2 hours ago
              </p>
            </div>
            <Link to="/community">
              <Button variant="outline" size="sm" className="h-8 text-xs shrink-0 border-[#E0E0E0]">
                View Discussion
              </Button>
            </Link>
          </div>

          <div className="border border-[#E0E0E0] rounded-lg p-3.5 bg-[#FAFAFA] hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#546E7A] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Corporate Law
                </span>
                <span className="text-xs font-bold text-[#212121]">
                  Recent Amendments to DIA Act & Insolvency Timelines
                </span>
              </div>
              <p className="text-xs text-[#666666] mt-1">
                15 professionals participating • 89 messages • Updated 1 day ago
              </p>
            </div>
            <Link to="/community">
              <Button variant="outline" size="sm" className="h-8 text-xs shrink-0 border-[#E0E0E0]">
                View Discussion
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* YOUR RECENT ACTIVITY */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#666666]">
          YOUR RECENT ACTIVITY
        </h2>
        <ul className="space-y-2 text-xs text-[#546E7A]">
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D47A1] mr-2.5" />
            Connected with Adv. Veera (3 days ago)
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D47A1] mr-2.5" />
            Participated in &ldquo;Bail Bond Calculation&rdquo; practice discussion (1 week ago)
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D47A1] mr-2.5" />
            Received referral request from Adv. Sanjay for Sessions Court counsel (5 days ago)
          </li>
        </ul>
      </section>
    </div>
  )
}
