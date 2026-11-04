import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const NetworkPage: React.FC = () => {
  const [connections, setConnections] = useState([
    {
      id: '1',
      name: 'Adv. Kirubakaran',
      role: 'Senior Advocate (You)',
      practice: 'Civil Litigation • Property Law',
      location: 'Salem, Tamil Nadu',
      experience: '18 years',
      verified: true,
      initial: 'K',
    },
    {
      id: '2',
      name: 'Adv. M. Senthil Nathan',
      role: 'Advocate',
      practice: 'Criminal Defense • Bail Matters',
      location: 'Salem, Tamil Nadu',
      experience: '12 years',
      verified: true,
      initial: 'S',
    },
    {
      id: '3',
      name: 'Adv. Anitha Rajan',
      role: 'Appellate Counsel',
      practice: 'Constitutional Law • Writ Petitions',
      location: 'Chennai (Madras High Court)',
      experience: '14 years',
      verified: true,
      initial: 'A',
    },
    {
      id: '4',
      name: 'Adv. Rajesh Kannan',
      role: 'Advocate',
      practice: 'Motor Accident Claims • Insurance',
      location: 'Madurai, Tamil Nadu',
      experience: '9 years',
      verified: true,
      initial: 'R',
    },
  ])

  const suggested = [
    {
      name: 'Adv. K. Balasubramanian',
      practice: 'Commercial Arbitration • Corporate',
      location: 'Coimbatore, Tamil Nadu',
      reasons: [
        'Shared practice area focus with 2 mutual colleagues in Salem Bar',
        'Regular appearances before Principal District Court',
        'Verified Tamil Nadu Bar Council Member (TN/2012/8765)',
      ],
      initial: 'B',
    },
    {
      name: 'Adv. Deepa Sundaram',
      practice: 'Family Law • Domestic Relations',
      location: 'Tiruchirappalli, Tamil Nadu',
      reasons: [
        'Frequent co-counsel in appellate references from Trichy to High Court',
        '10+ years verified experience with complete profile',
      ],
      initial: 'D',
    },
  ]

  const handleUnconnect = (id: string) => {
    setConnections(connections.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-[#DADCE0] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C70234] bg-[#FCE8EF] px-2 py-0.5 rounded border border-[#C70234]/20">
            01 · COLLEAGUE DIRECTORY
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#80868B]">
            PROFESSIONAL NETWORK
          </span>
        </div>
        <h1 className="text-3xl font-editorial text-[#202124] font-normal tracking-tight">
          My Professional <span className="italic font-serif text-[#C70234]">Network</span>
        </h1>
        <p className="text-xs text-[#5F6368] mt-1">
          Manage your verified professional peers, mutual connections, and referral colleagues.
        </p>
      </div>

      {/* MY CONNECTIONS */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] border-t-4 border-t-[#1A73E8] p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A73E8] mb-0.5">
              GRAPH OVERVIEW
            </div>
            <h2 className="text-lg font-editorial text-[#202124] font-normal tracking-tight">
              Active Connections ({connections.length})
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#1A73E8] bg-[#E8F0FE] px-2.5 py-1 rounded-full border border-[#1A73E8]/20">
            Direct Colleague Graph
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((c) => (
            <div
              key={c.id}
              className="border border-[#DADCE0] border-l-4 border-l-[#1A73E8] rounded-xl p-4 bg-white hover:shadow-md hover:border-l-[#C70234] transition-all flex items-start justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] border border-[#1A73E8]/30 flex items-center justify-center font-bold text-xs text-[#1A73E8] shrink-0">
                  {c.initial}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
                    {c.name}
                    {c.verified && (
                      <span className="inline-flex items-center text-[10px] font-bold text-[#188038] bg-[#E6F4EA] px-1.5 py-0.5 rounded-full border border-[#34A853]/20">
                        <ShieldCheck className="w-3 h-3 mr-0.5 text-[#34A853]" />
                        Verified
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#5F6368] font-medium">{c.role}</p>
                  <p className="text-xs text-[#202124] mt-1 font-semibold">{c.practice}</p>
                  <p className="text-[11px] text-[#80868B] flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-[#C70234]" />
                    {c.location} • {c.experience}
                  </p>
                </div>
              </div>

              {c.id !== '1' && (
                <button
                  type="button"
                  onClick={() => handleUnconnect(c.id)}
                  className="text-[11px] text-[#EA4335] hover:bg-[#FCE8E6] border border-[#EA4335]/30 bg-white px-2 py-1 rounded-lg transition-colors shrink-0 font-medium"
                >
                  Unconnect
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SUGGESTED PROFESSIONALS (AI-RECOMMENDED) */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] border-t-4 border-t-[#A142F4] p-6 space-y-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A142F4] bg-[#F3E8FD] px-1.5 py-0.5 rounded border border-[#A142F4]/20">
              02 · AI RECOMMENDATIONS
            </span>
          </div>
          <h2 className="text-xl font-editorial text-[#202124] font-normal tracking-tight">
            Suggested <span className="italic font-serif text-[#C70234]">Professionals</span>
          </h2>
          <p className="text-xs text-[#5F6368] mt-0.5">
            Transparent reasoning based on Bar records and court jurisdiction overlap:
          </p>
        </div>

        <div className="space-y-4">
          {suggested.map((s, idx) => (
            <div
              key={idx}
              className="border border-[#DADCE0] border-l-4 border-l-[#A142F4] rounded-xl p-5 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F3E8FD] border border-[#A142F4]/30 flex items-center justify-center font-bold text-xs text-[#A142F4]">
                    {s.initial}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#202124]">{s.name}</h3>
                    <p className="text-xs text-[#5F6368]">{s.practice} • {s.location}</p>
                  </div>
                </div>

                <div className="bg-[#F3E8FD]/60 border border-[#A142F4]/20 rounded-xl p-3 text-xs text-[#202124] mt-2">
                  <span className="font-bold text-[#A142F4] block mb-1">Suggested because:</span>
                  <ul className="space-y-1 text-[#5F6368] text-[11px]">
                    {s.reasons.map((r, rIdx) => (
                      <li key={rIdx} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A142F4] mr-2 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <Link to="/search">
                  <Button variant="secondary" size="sm" className="h-8 text-xs">
                    View Profile
                  </Button>
                </Link>
                <Link to="/messages">
                  <Button variant="brand" size="sm" className="h-8 text-xs font-semibold">
                    Connect
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
