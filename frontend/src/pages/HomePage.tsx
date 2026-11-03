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
      {/* Editorial Header & Greeting */}
      <div className="border-b border-[#D9D7D0] pb-6">
        <div className="text-[11px] font-bold tracking-widest uppercase text-[#929292] mb-1.5">
          01 · PROFESSIONAL NETWORK OVERVIEW
        </div>
        <h1 className="text-3xl sm:text-4xl font-editorial text-[#171717] tracking-tight font-normal">
          Welcome back, <span className="italic font-serif">Kirubakaran</span>
        </h1>
        <p className="text-xs text-[#686868] mt-1 font-medium">
          Senior Advocate • Tamil Nadu Bar Council (TN/2015/12345)
        </p>
      </div>

      {/* Hero Section: Editorial Search & AI Discovery */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 sm:p-8 space-y-5">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#171717] flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#111111]" />
            AI Professional Discovery
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-editorial text-[#171717] font-normal tracking-tight">
            What do you need <span className="italic font-serif">help with today?</span>
          </h2>
          <p className="text-xs text-[#686868] mt-1">
            Describe your requirement naturally: &ldquo;Find a criminal lawyer in Salem for my client&rdquo; or &ldquo;Need arbitration counsel in Chennai&rdquo;
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={naturalQuery}
              onChange={(e) => setNaturalQuery(e.target.value)}
              placeholder="Describe your legal requirement in plain English..."
              className="w-full pl-4 pr-32 py-3.5 bg-[#FFFFFF] border border-[#D9D7D0] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] text-[#171717] placeholder-[#929292]"
            />
            <Button
              type="submit"
              variant="primary"
              className="absolute right-2 top-2 h-9 px-5 text-xs font-semibold"
            >
              <Search className="w-3.5 h-3.5 mr-1.5" />
              SEARCH
            </Button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="pt-2 border-t border-[#D9D7D0]">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#929292] block mb-2.5">
            Quick Actions
          </span>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNaturalQuery(action.query)
                  navigate(`/search?q=${encodeURIComponent(action.query)}`)
                }}
                className="text-xs bg-[#F0EFEA] hover:bg-[#E8E6DF] text-[#171717] font-medium border border-[#D9D7D0] px-3 py-1.5 rounded-lg transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDED FOR YOU */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
            02 · GROUNDED SUGGESTIONS
          </div>
          <h2 className="text-xl font-editorial text-[#171717] font-normal tracking-tight">
            Recommended <span className="italic font-serif">for you</span>
          </h2>
          <p className="text-xs text-[#686868] mt-0.5">
            Based on your network graph, practice area overlap, and verified Bar records:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="border border-[#D9D7D0] rounded-lg p-5 bg-[#FFFFFF] flex flex-col justify-between space-y-4 hover:border-[#BDBAB1] transition-colors"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#171717] flex items-center gap-1.5">
                      {rec.name}
                      {rec.verified && (
                        <span className="inline-flex items-center text-[10px] font-semibold text-[#2F6B4F] bg-[#F0EFEA] px-2 py-0.5 rounded border border-[#D9D7D0]">
                          <ShieldCheck className="w-3 h-3 mr-0.5 text-[#2F6B4F]" />
                          Verified
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-[#686868] mt-0.5 font-medium">{rec.role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F0EFEA] border border-[#D9D7D0] flex items-center justify-center font-bold text-xs text-[#171717]">
                    {rec.initial}
                  </div>
                </div>

                <div className="mt-3 text-xs space-y-1.5 text-[#686868]">
                  <div className="font-semibold text-[#171717]">{rec.practice}</div>
                  <div className="flex items-center text-xs">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#929292]" />
                    {rec.location}
                  </div>
                  <div className="flex items-center text-xs">
                    <Briefcase className="w-3.5 h-3.5 mr-1 text-[#929292]" />
                    {rec.experience} • {rec.courts}
                  </div>
                </div>

                {/* AI Reasoning box */}
                <div className="mt-3.5 bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg p-3 text-[11px] text-[#171717]">
                  <span className="font-bold text-[#111111] block mb-0.5">Why Recommended:</span>
                  <span className="text-[#686868]">{rec.why}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-3 border-t border-[#D9D7D0]">
                <Link to="/search" className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full h-8 text-xs">
                    View Profile
                  </Button>
                </Link>
                <Link to="/messages" className="flex-1">
                  <Button variant="primary" size="sm" className="w-full h-8 text-xs">
                    Connect
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RELEVANT COMMUNITY DISCUSSIONS */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
              03 · PEER EXCHANGE
            </div>
            <h2 className="text-xl font-editorial text-[#171717] font-normal tracking-tight">
              Relevant community <span className="italic font-serif">discussions</span>
            </h2>
            <p className="text-xs text-[#686868] mt-0.5">
              Peer exchange on recent judgments, procedural challenges, and trial practice:
            </p>
          </div>
          <Link to="/community" className="text-xs text-[#171717] font-medium hover:underline flex items-center">
            View All
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="space-y-3">
          <div className="border border-[#D9D7D0] rounded-lg p-4 bg-[#FFFFFF] hover:bg-[#F0EFEA] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#171717] bg-[#F0EFEA] px-2 py-0.5 rounded border border-[#D9D7D0]">
                  Criminal Law
                </span>
                <span className="text-sm font-semibold text-[#171717]">
                  Electronic Evidence in Cross-Examination
                </span>
              </div>
              <p className="text-xs text-[#686868] mt-1">
                23 professionals participating • 147 messages • Updated 2 hours ago
              </p>
            </div>
            <Link to="/community">
              <Button variant="secondary" size="sm" className="h-8 text-xs shrink-0">
                View Discussion
              </Button>
            </Link>
          </div>

          <div className="border border-[#D9D7D0] rounded-lg p-4 bg-[#FFFFFF] hover:bg-[#F0EFEA] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#171717] bg-[#F0EFEA] px-2 py-0.5 rounded border border-[#D9D7D0]">
                  Corporate Law
                </span>
                <span className="text-sm font-semibold text-[#171717]">
                  Recent Amendments to DIA Act & Insolvency Timelines
                </span>
              </div>
              <p className="text-xs text-[#686868] mt-1">
                15 professionals participating • 89 messages • Updated 1 day ago
              </p>
            </div>
            <Link to="/community">
              <Button variant="secondary" size="sm" className="h-8 text-xs shrink-0">
                View Discussion
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* YOUR RECENT ACTIVITY */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-3">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#929292]">
          04 · RECENT ACTIVITY LOG
        </h2>
        <ul className="space-y-2.5 text-xs text-[#686868]">
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mr-3" />
            Connected with Adv. Veera (3 days ago)
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mr-3" />
            Participated in &ldquo;Bail Bond Calculation&rdquo; practice discussion (1 week ago)
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mr-3" />
            Received referral request from Adv. Sanjay for Sessions Court counsel (5 days ago)
          </li>
        </ul>
      </section>
    </div>
  )
}
