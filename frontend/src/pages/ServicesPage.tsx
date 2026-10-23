import React, { useState } from 'react'
import {
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export const ServicesPage: React.FC = () => {
  const [naturalNeed, setNaturalNeed] = useState('')
  const [matchedResults, setMatchedResults] = useState<any[] | null>(null)

  // Screen 11: I Can Offer state
  const offeredServices = [
    { title: 'Court Appearance', active: true, category: 'Litigation' },
    { title: 'Legal Consulting', active: true, category: 'Advisory' },
    { title: 'Local Counsel', active: true, category: 'Litigation' },
    { title: 'Arbitration', active: false, category: 'ADR' },
    { title: 'Mediation', active: false, category: 'ADR' },
  ]

  // Screen 11: Service Requests queue state
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 'sr1',
      advocate: 'Adv. Sanjay Kumar',
      service: 'Court Appearance',
      details: 'Criminal matter in Salem Sessions Court (Bail & trial argument)',
      date: 'Monday, 15 December',
      status: 'awaiting',
    },
    {
      id: 'sr2',
      advocate: 'Adv. Priya Sharma (referred by Adv. Ramesh)',
      service: 'Legal Research & Opinion',
      details: 'Constitutional law precedents on electronic record admissibility',
      date: 'Within 5 business days',
      status: 'awaiting',
    },
  ])

  const handleServiceSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!naturalNeed.trim()) return

    // Screen 12: AI Service Matching simulation
    setMatchedResults([
      {
        name: 'Adv. Anand Rao',
        specialty: 'Criminal Law Specialist',
        location: 'Coimbatore (primary location)',
        availability: 'Available',
        responseTime: '1-2 business days',
        reasons: [
          'Criminal law (your matter)',
          'Coimbatore jurisdiction (primary base)',
          'Sessions Court experience (10+ years)',
          'Court appearance (core service)',
          'Your connection (via Adv. Ramesh)',
        ],
      },
      {
        name: 'Adv. Meera Krishnan',
        specialty: 'Criminal & Constitutional Law',
        location: 'Salem / South India',
        availability: 'Available',
        responseTime: '2-3 business days',
        reasons: [
          'Criminal law (primary practice)',
          'High Court & Sessions experience',
          'South Indian courts (regular practitioner)',
          'Court appearance (active offering)',
        ],
      },
    ])
  }

  const handleAction = (id: string, action: 'accepted' | 'declined') => {
    setServiceRequests(
      serviceRequests.map((req) => (req.id === id ? { ...req, status: action } : req))
    )
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-[#E0E0E0] pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-[#212121]">
          PROFESSIONAL SERVICES
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Request appearances, local counsel assistance, or manage services you provide to colleagues.
        </p>
      </div>

      {/* ──────────────── SCREEN 11: I NEED HELP WITH ──────────────── */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
          I NEED HELP WITH:
        </h2>

        <div className="flex flex-wrap gap-2 text-xs">
          {[
            'Court Appearance',
            'Local Counsel',
            'Legal Research',
            'Legal Drafting',
            'Legal Opinion',
            'Consultation',
            'Arbitration',
            'Mediation',
          ].map((svc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setNaturalNeed(`I need a lawyer for ${svc}`)
              }}
              className="px-3 py-1.5 rounded-md border border-[#E0E0E0] bg-[#FAFAFA] hover:bg-slate-100 text-[#546E7A] font-medium"
            >
              [ {svc} ]
            </button>
          ))}
        </div>

        <form onSubmit={handleServiceSearch} className="space-y-2 pt-2">
          <p className="text-xs text-[#666666]">Or describe your need naturally:</p>
          <div className="relative">
            <input
              type="text"
              value={naturalNeed}
              onChange={(e) => setNaturalNeed(e.target.value)}
              placeholder='E.g., "I need someone to appear for my client in Coimbatore next Monday for a Sessions Court hearing"'
              className="w-full pl-4 pr-36 py-3 border border-[#E0E0E0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0D47A1] text-[#212121]"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1.5 h-8 px-4 bg-[#0D47A1] text-white hover:bg-[#0B3C8A] rounded-md text-xs font-medium"
            >
              ⚡ FIND PROFESSIONALS
            </Button>
          </div>
        </form>
      </section>

      {/* ──────────────── SCREEN 12: AI SERVICE MATCHING RESULTS ──────────────── */}
      {matchedResults && (
        <section className="bg-white rounded-xl border border-[#1565C0] p-6 shadow-xs space-y-5 animate-in fade-in">
          <div className="border-b border-[#E0E0E0] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1565C0] flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5" />
              SERVICE REQUEST MATCH
            </h2>
            <div className="mt-2 text-xs text-[#666666]">
              Your requirement:
              <p className="font-semibold text-slate-800 mt-0.5">&ldquo;{naturalNeed}&rdquo;</p>
            </div>
          </div>

          {/* AI Understood */}
          <div className="bg-[#FAFAFA] p-3.5 rounded-lg border border-[#E0E0E0] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-[#666666] block text-[10px]">SERVICE:</span>
              <span className="font-bold text-[#212121]">Court Appearance</span>
            </div>
            <div>
              <span className="text-[#666666] block text-[10px]">LOCATION:</span>
              <span className="font-bold text-[#212121]">Coimbatore / Salem</span>
            </div>
            <div>
              <span className="text-[#666666] block text-[10px]">COURT:</span>
              <span className="font-bold text-[#212121]">Sessions Court</span>
            </div>
            <div>
              <span className="text-[#666666] block text-[10px]">PRACTICE AREA:</span>
              <span className="font-bold text-[#212121]">Criminal Law</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#212121]">
              MATCHED PROFESSIONALS ({matchedResults.length} FOUND)
            </h3>

            {matchedResults.map((m, idx) => (
              <div
                key={idx}
                className="border border-[#E0E0E0] rounded-lg p-4 bg-[#FAFAFA] flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-[#212121]">{m.name}</h4>
                    <span className="text-[10px] font-semibold text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ {m.availability}
                    </span>
                    <span className="text-[10px] text-[#666666]">Response: {m.responseTime}</span>
                  </div>
                  <p className="text-xs text-[#546E7A]">{m.specialty} • {m.location}</p>

                  <div className="bg-blue-50/60 border border-blue-100 rounded p-2.5 text-xs text-[#1565C0]">
                    <span className="font-semibold block mb-1">⚡ WHY THIS MATCH:</span>
                    <ul className="space-y-0.5 text-[#546E7A] text-[11px]">
                      {m.reasons.map((r: string, rIdx: number) => (
                        <li key={rIdx} className="flex items-center">
                          <span className="text-[#2E7D32] mr-1.5">✓</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 pt-2 md:pt-0">
                  <Link to="/search">
                    <Button variant="outline" size="sm" className="h-8 text-xs border-[#E0E0E0]">
                      [ VIEW PROFILE ]
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button size="sm" className="h-8 text-xs bg-[#0D47A1] text-white hover:bg-[#0B3C8A]">
                      [ REQUEST ASSISTANCE ]
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ──────────────── SCREEN 11: I CAN OFFER & AVAILABILITY ──────────────── */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
              I CAN OFFER:
            </h2>
            <p className="text-xs text-[#666666]">
              Manage the services you offer in your verified advocate profile:
            </p>
          </div>
          <Link to="/profile">
            <Button variant="outline" size="sm" className="h-7 text-xs border-[#E0E0E0] text-[#546E7A]">
              [ EDIT MY SERVICES ]
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {offeredServices.map((svc, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border flex items-center justify-between ${
                svc.active
                  ? 'bg-blue-50/40 border-blue-200 text-[#0D47A1]'
                  : 'bg-[#FAFAFA] border-[#E0E0E0] text-[#666666]'
              }`}
            >
              <span className="font-semibold">{svc.active ? '✓' : '○'} {svc.title}</span>
              <span className="text-[11px] text-[#546E7A]">{svc.category}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#E0E0E0] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-[#212121]">Service Status:</span>
            <span className="text-[#2E7D32] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ☑ Available to assist colleagues
            </span>
            <span className="text-[#666666]">Typical response time: <b>1-2 business days</b></span>
          </div>
          <Link to="/profile">
            <button className="text-xs text-[#1565C0] hover:underline font-medium">
              [ EDIT AVAILABILITY ]
            </button>
          </Link>
        </div>
      </section>

      {/* ──────────────── SCREEN 11: YOUR SERVICE REQUESTS ──────────────── */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
            YOUR SERVICE REQUESTS
          </h2>
          <p className="text-xs text-[#666666]">
            Recent requests received from other professionals:
          </p>
        </div>

        <div className="space-y-3">
          {serviceRequests.map((req) => (
            <div
              key={req.id}
              className="border border-[#E0E0E0] rounded-lg p-4 bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#212121]">{req.advocate}</span>
                  <span className="font-medium text-[#0D47A1] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Service: {req.service}
                  </span>
                </div>
                <p className="text-[#666666]">{req.details}</p>
                <p className="text-[11px] text-[#546E7A]">Hearing / Timeline: <b>{req.date}</b></p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {req.status === 'awaiting' ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleAction(req.id, 'accepted')}
                      className="h-8 text-xs bg-[#2E7D32] hover:bg-emerald-700 text-white"
                    >
                      [ ACCEPT ]
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(req.id, 'declined')}
                      className="h-8 text-xs border-[#E0E0E0] text-[#546E7A]"
                    >
                      [ DECLINE ]
                    </Button>
                  </>
                ) : req.status === 'accepted' ? (
                  <span className="text-xs font-semibold text-[#2E7D32]">
                    ✓ Request Accepted
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-[#C62828]">
                    Declined
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
