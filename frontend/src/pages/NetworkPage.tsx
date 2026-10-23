import React, { useState } from 'react'
import {
  MapPin,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

interface ConnectionItem {
  id: string
  name: string
  role: string
  practice: string
  location: string
  experience: string
  initial: string
  verified: boolean
}

export const NetworkPage: React.FC = () => {
  const [connections, setConnections] = useState<ConnectionItem[]>([
    {
      id: 'c1',
      name: 'Adv. Ramesh Kumar',
      role: 'Senior Advocate',
      practice: 'Corporate Law • Commercial Litigation',
      location: 'Chennai, Tamil Nadu',
      experience: '16 yrs exp',
      initial: 'R',
      verified: true,
    },
    {
      id: 'c2',
      name: 'Adv. Priya Sharma',
      role: 'Advocate',
      practice: 'Family Law • Civil Revision',
      location: 'Bangalore / Coimbatore',
      experience: '11 yrs exp',
      initial: 'P',
      verified: true,
    },
    {
      id: 'c3',
      name: 'Adv. Anand Reddy',
      role: 'Advocate',
      practice: 'Intellectual Property • Cyber Law',
      location: 'Chennai / Hyderabad',
      experience: '9 yrs exp',
      initial: 'A',
      verified: true,
    },
    {
      id: 'c4',
      name: 'Adv. Sunita Mishra',
      role: 'Advocate',
      practice: 'Labour Law • Industrial Tribunals',
      location: 'Madurai, Tamil Nadu',
      experience: '13 yrs exp',
      initial: 'S',
      verified: true,
    },
  ])

  const suggested = [
    {
      name: 'Adv. Vikram Patel',
      practice: 'Criminal & Constitutional Law',
      location: 'Salem / Chennai',
      reasons: [
        'Same Bar Association (Tamil Nadu Bar Council)',
        '3 mutual connections (Adv. Ramesh, Adv. Sunita)',
        'Shared court appearances in Madras High Court',
      ],
      initial: 'V',
    },
    {
      name: 'Adv. Deepa Khosla',
      practice: 'Commercial Law & Arbitration',
      location: 'Coimbatore',
      reasons: [
        'Complementary practice area (arbitration)',
        'Active advocate in Coimbatore District Court',
        'Direct peer referral network overlap',
      ],
      initial: 'D',
    },
    {
      name: 'Adv. Harsh Mittal',
      practice: 'Tax Law & Corporate Restructuring',
      location: 'Chennai',
      reasons: [
        'Bar Association overlap',
        'Emerging expertise area in your referral network',
      ],
      initial: 'H',
    },
  ]

  const handleUnconnect = (id: string) => {
    setConnections(connections.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-[#E0E0E0] pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-[#212121]">
          MY PROFESSIONAL NETWORK
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Manage your verified professional peers, mutual connections, and referral colleagues.
        </p>
      </div>

      {/* MY CONNECTIONS */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
            MY CONNECTIONS: {connections.length}
          </h2>
          <span className="text-xs text-[#546E7A]">Direct Colleague Graph</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((c) => (
            <div
              key={c.id}
              className="border border-[#E0E0E0] rounded-lg p-4 bg-[#FAFAFA] flex items-start justify-between gap-3"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center font-bold text-xs text-[#0D47A1] shrink-0">
                  {c.initial}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#212121] flex items-center gap-1.5">
                    {c.name}
                    {c.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    )}
                  </h3>
                  <p className="text-xs text-[#546E7A] font-medium">{c.role}</p>
                  <p className="text-xs text-[#212121] mt-1">{c.practice}</p>
                  <p className="text-[11px] text-[#666666] flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                    {c.location} • {c.experience}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleUnconnect(c.id)}
                className="text-[11px] text-[#546E7A] hover:text-[#C62828] border border-[#E0E0E0] bg-white px-2 py-1 rounded transition-colors shrink-0"
              >
                [ UNCONNECT ]
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SUGGESTED PROFESSIONALS (AI-RECOMMENDED) */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
            SUGGESTED PROFESSIONALS (AI-RECOMMENDED)
          </h2>
          <p className="text-xs text-[#666666]">
            Every suggestion includes transparent reasoning based on Bar records and court jurisdiction:
          </p>
        </div>

        <div className="space-y-4">
          {suggested.map((s, idx) => (
            <div
              key={idx}
              className="border border-[#E0E0E0] rounded-lg p-4 bg-[#FAFAFA] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center font-bold text-xs text-[#0D47A1]">
                    {s.initial}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#212121]">{s.name}</h3>
                    <p className="text-xs text-[#546E7A]">{s.practice} • {s.location}</p>
                  </div>
                </div>

                <div className="bg-blue-50/60 border border-blue-100 rounded p-2.5 text-xs text-[#1565C0] mt-2">
                  <span className="font-semibold block mb-1">⚡ Suggested because:</span>
                  <ul className="space-y-0.5 text-[#546E7A] text-[11px]">
                    {s.reasons.map((r, rIdx) => (
                      <li key={rIdx} className="flex items-center">
                        <span className="mr-1.5">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <Link to="/search">
                  <Button variant="outline" size="sm" className="h-8 text-xs border-[#E0E0E0]">
                    [ VIEW PROFILE ]
                  </Button>
                </Link>
                <Link to="/messages">
                  <Button size="sm" className="h-8 text-xs bg-[#0D47A1] text-white hover:bg-[#0B3C8A]">
                    [ CONNECT ]
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
