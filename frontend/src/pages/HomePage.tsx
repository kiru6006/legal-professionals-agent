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
      <div className="border-b border-[#DADCE0] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#C70234] bg-[#FCE8EF] px-2 py-0.5 rounded border border-[#C70234]/20">
            01 · HOW IT'S BUILT
          </span>
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#80868B]">
            PROFESSIONAL NETWORK OVERVIEW
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-editorial text-[#202124] tracking-tight font-normal">
          Welcome back, <span className="italic font-serif text-[#C70234]">Kirubakaran</span>
        </h1>
        <p className="text-xs text-[#5F6368] mt-1 font-medium">
          Senior Advocate • Tamil Nadu Bar Council (TN/2015/12345) • Madras High Court
        </p>
      </div>

      {/* Hero Section: Editorial Search & AI Discovery with Top Crimson Accent */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] border-t-4 border-t-[#C70234] p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#A142F4] bg-[#F3E8FD] px-2.5 py-1 rounded-full border border-[#A142F4]/20 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#A142F4]" />
            AI Professional Discovery
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-editorial text-[#202124] font-normal tracking-tight">
            What do you need <span className="italic font-serif text-[#C70234]">help with today?</span>
          </h2>
          <p className="text-xs text-[#5F6368] mt-1">
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
              className="w-full pl-4 pr-32 py-3.5 bg-white border border-[#DADCE0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] text-[#202124] placeholder-[#80868B] shadow-xs"
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

        {/* Quick Actions with Soft Colored Pills */}
        <div className="pt-3 border-t border-[#DADCE0]">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#80868B] block mb-2.5">
            Suggested Quick Workflows
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Find Professional', query: 'Find an advocate with appellate experience in High Court', color: 'bg-[#E8F0FE] text-[#1A73E8] hover:bg-[#D2E3FC] border-[#1A73E8]/20' },
              { label: 'Find Service', query: 'Need a local counsel for court appearance', color: 'bg-[#FCE8EF] text-[#C70234] hover:bg-[#FAD2DF] border-[#C70234]/20' },
              { label: 'Ask Network', query: 'Experience with electronic evidence suppression in criminal trials', color: 'bg-[#F3E8FD] text-[#A142F4] hover:bg-[#E8D0F8] border-[#A142F4]/20' },
              { label: 'Find Referral', query: 'Need to refer a civil property dispute in Madurai', color: 'bg-[#E6F4EA] text-[#188038] hover:bg-[#CEEAD6] border-[#34A853]/20' },
              { label: 'Explore Courts', query: 'Advocates practicing before Principal Sessions Court', color: 'bg-[#FEF7E0] text-[#B06000] hover:bg-[#FEEFC3] border-[#FBBC05]/30' },
            ].map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNaturalQuery(action.query)
                  navigate(`/search?q=${encodeURIComponent(action.query)}`)
                }}
                className={`text-xs font-semibold border px-3 py-1.5 rounded-lg transition-all ${action.color}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDED FOR YOU */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] p-6 space-y-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C70234] bg-[#FCE8EF] px-1.5 py-0.5 rounded">
              02 · GROUNDED
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#80868B]">
              SUGGESTIONS FOR YOU
            </span>
          </div>
          <h2 className="text-xl font-editorial text-[#202124] font-normal tracking-tight">
            Recommended <span className="italic font-serif text-[#C70234]">Counsel</span>
          </h2>
          <p className="text-xs text-[#5F6368] mt-0.5">
            Based on your network graph, practice area overlap, and verified Bar records:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="border border-[#DADCE0] border-l-4 border-l-[#1A73E8] rounded-xl p-5 bg-white flex flex-col justify-between space-y-4 hover:shadow-md hover:border-l-[#C70234] transition-all"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
                      {rec.name}
                      {rec.verified && (
                        <span className="inline-flex items-center text-[10px] font-bold text-[#188038] bg-[#E6F4EA] px-2 py-0.5 rounded-full border border-[#34A853]/30">
                          <ShieldCheck className="w-3 h-3 mr-0.5 text-[#34A853]" />
                          Verified
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-[#5F6368] mt-0.5 font-medium">{rec.role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#E8F0FE] border border-[#1A73E8]/30 flex items-center justify-center font-bold text-xs text-[#1A73E8]">
                    {rec.initial}
                  </div>
                </div>

                <div className="mt-3 text-xs space-y-1.5 text-[#5F6368]">
                  <div className="font-semibold text-[#202124]">{rec.practice}</div>
                  <div className="flex items-center text-xs">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#C70234]" />
                    {rec.location}
                  </div>
                  <div className="flex items-center text-xs">
                    <Briefcase className="w-3.5 h-3.5 mr-1 text-[#1A73E8]" />
                    {rec.experience} • {rec.courts}
                  </div>
                </div>

                {/* AI Reasoning box */}
                <div className="mt-3.5 bg-[#F3E8FD] border border-[#A142F4]/20 rounded-lg p-3 text-[11px] text-[#202124]">
                  <span className="font-bold text-[#A142F4] block mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#A142F4]" />
                    Why Recommended:
                  </span>
                  <span className="text-[#5F6368]">{rec.why}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-3 border-t border-[#DADCE0]">
                <Link to="/search" className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full h-8 text-xs">
                    View Profile
                  </Button>
                </Link>
                <Link to="/messages" className="flex-1">
                  <Button variant="brand" size="sm" className="w-full h-8 text-xs">
                    Connect
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RELEVANT COMMUNITY DISCUSSIONS */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C70234] bg-[#FCE8EF] px-1.5 py-0.5 rounded">
                03 · FORUM
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#80868B]">
                PEER EXCHANGE
              </span>
            </div>
            <h2 className="text-xl font-editorial text-[#202124] font-normal tracking-tight">
              Relevant Community <span className="italic font-serif text-[#C70234]">Discussions</span>
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Peer exchange on recent judgments, procedural challenges, and trial practice:
            </p>
          </div>
          <Link to="/community" className="text-xs text-[#1A73E8] font-semibold hover:underline flex items-center">
            View All
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="space-y-3">
          <div className="border border-[#DADCE0] border-l-4 border-l-[#EA4335] rounded-xl p-4 bg-white hover:bg-[#F8F9FA] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA4335] bg-[#FCE8E6] px-2 py-0.5 rounded border border-[#EA4335]/20">
                  Criminal Law
                </span>
                <span className="text-sm font-semibold text-[#202124]">
                  Electronic Evidence in Cross-Examination
                </span>
              </div>
              <p className="text-xs text-[#5F6368] mt-1">
                23 professionals participating • 147 messages • Updated 2 hours ago
              </p>
            </div>
            <Link to="/community">
              <Button variant="secondary" size="sm" className="h-8 text-xs shrink-0">
                View Discussion
              </Button>
            </Link>
          </div>

          <div className="border border-[#DADCE0] border-l-4 border-l-[#1A73E8] rounded-xl p-4 bg-white hover:bg-[#F8F9FA] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] bg-[#E8F0FE] px-2 py-0.5 rounded border border-[#1A73E8]/20">
                  Corporate Law
                </span>
                <span className="text-sm font-semibold text-[#202124]">
                  Recent Amendments to IBC & Insolvency Timelines
                </span>
              </div>
              <p className="text-xs text-[#5F6368] mt-1">
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
      <section className="bg-white rounded-2xl border border-[#DADCE0] p-6 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C70234] bg-[#FCE8EF] px-1.5 py-0.5 rounded">
            04 · TIMELINE
          </span>
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#80868B]">
            RECENT ACTIVITY LOG
          </h2>
        </div>
        <ul className="space-y-2.5 text-xs text-[#5F6368]">
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#1A73E8] mr-3" />
            Connected with Adv. Veera (3 days ago)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#34A853] mr-3" />
            Participated in &ldquo;Bail Bond Calculation&rdquo; practice discussion (1 week ago)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#A142F4] mr-3" />
            Received referral request from Adv. Sanjay for Sessions Court counsel (5 days ago)
          </li>
        </ul>
      </section>
    </div>
  )
}
