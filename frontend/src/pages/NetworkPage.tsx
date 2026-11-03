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
      <div className="border-b border-[#D9D7D0] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-1">
          01 · COLLEAGUE DIRECTORY
        </div>
        <h1 className="text-3xl font-editorial text-[#171717] font-normal tracking-tight">
          My Professional <span className="italic font-serif">Network</span>
        </h1>
        <p className="text-xs text-[#686868] mt-1">
          Manage your verified professional peers, mutual connections, and referral colleagues.
        </p>
      </div>

      {/* MY CONNECTIONS */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
              GRAPH OVERVIEW
            </div>
            <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight">
              Active Connections ({connections.length})
            </h2>
          </div>
          <span className="text-xs text-[#686868] font-medium">Direct Colleague Graph</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((c) => (
            <div
              key={c.id}
              className="border border-[#D9D7D0] rounded-lg p-4 bg-[#FFFFFF] hover:border-[#BDBAB1] transition-colors flex items-start justify-between gap-3"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#F0EFEA] border border-[#D9D7D0] flex items-center justify-center font-bold text-xs text-[#171717] shrink-0">
                  {c.initial}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#171717] flex items-center gap-1.5">
                    {c.name}
                    {c.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B4F]" />
                    )}
                  </h3>
                  <p className="text-xs text-[#686868] font-medium">{c.role}</p>
                  <p className="text-xs text-[#171717] mt-1 font-semibold">{c.practice}</p>
                  <p className="text-[11px] text-[#929292] flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-[#929292]" />
                    {c.location} • {c.experience}
                  </p>
                </div>
              </div>

              {c.id !== '1' && (
                <button
                  type="button"
                  onClick={() => handleUnconnect(c.id)}
                  className="text-[11px] text-[#A63D40] hover:bg-[#F0EFEA] border border-[#D9D7D0] bg-[#FFFFFF] px-2 py-1 rounded transition-colors shrink-0 font-medium"
                >
                  Unconnect
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SUGGESTED PROFESSIONALS (AI-RECOMMENDED) */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
            02 · RECOMMENDATIONS
          </div>
          <h2 className="text-xl font-editorial text-[#171717] font-normal tracking-tight">
            Suggested <span className="italic font-serif">Professionals</span>
          </h2>
          <p className="text-xs text-[#686868] mt-0.5">
            Transparent reasoning based on Bar records and court jurisdiction overlap:
          </p>
        </div>

        <div className="space-y-4">
          {suggested.map((s, idx) => (
            <div
              key={idx}
              className="border border-[#D9D7D0] rounded-lg p-5 bg-[#FFFFFF] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#F0EFEA] border border-[#D9D7D0] flex items-center justify-center font-bold text-xs text-[#171717]">
                    {s.initial}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#171717]">{s.name}</h3>
                    <p className="text-xs text-[#686868]">{s.practice} • {s.location}</p>
                  </div>
                </div>

                <div className="bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg p-3 text-xs text-[#171717] mt-2">
                  <span className="font-bold text-[#111111] block mb-1">Suggested because:</span>
                  <ul className="space-y-1 text-[#686868] text-[11px]">
                    {s.reasons.map((r, rIdx) => (
                      <li key={rIdx} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mr-2 shrink-0" />
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
                  <Button variant="primary" size="sm" className="h-8 text-xs font-semibold">
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
