import React, { useState } from 'react'
import { Sparkles, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export const ServicesPage: React.FC = () => {
  const [naturalNeed, setNaturalNeed] = useState('')
  const [matchedResults, setMatchedResults] = useState<any[] | null>(null)

  const offeredServices = [
    { title: 'Court Appearance', active: true, category: 'Litigation' },
    { title: 'Legal Consulting', active: true, category: 'Advisory' },
    { title: 'Local Counsel', active: true, category: 'Litigation' },
    { title: 'Arbitration', active: false, category: 'ADR' },
    { title: 'Mediation', active: false, category: 'ADR' },
  ]

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
      <div className="border-b border-[#D9D7D0] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-1">
          01 · LEGAL ASSISTANCE & ENGAGEMENT
        </div>
        <h1 className="text-3xl font-editorial text-[#171717] font-normal tracking-tight">
          Professional <span className="italic font-serif">Services</span>
        </h1>
        <p className="text-xs text-[#686868] mt-1">
          Request appearances, local counsel assistance, or manage services you provide to colleagues.
        </p>
      </div>

      {/* ──────────────── I NEED HELP WITH ──────────────── */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
            ASSISTANCE DISPATCH
          </div>
          <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight">
            I Need Help With:
          </h2>
        </div>

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
              className="px-3 py-1.5 rounded-lg border border-[#D9D7D0] bg-[#F0EFEA] hover:bg-[#E8E6DF] text-[#171717] font-medium transition-colors"
            >
              {svc}
            </button>
          ))}
        </div>

        <form onSubmit={handleServiceSearch} className="space-y-2 pt-2 border-t border-[#D9D7D0]">
          <p className="text-xs text-[#686868]">Or describe your requirement naturally:</p>
          <div className="relative">
            <input
              type="text"
              value={naturalNeed}
              onChange={(e) => setNaturalNeed(e.target.value)}
              placeholder='E.g., "I need someone to appear for my client in Coimbatore next Monday for a Sessions Court hearing"'
              className="w-full pl-4 pr-36 py-3 bg-[#FFFFFF] border border-[#D9D7D0] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#111111] text-[#171717] placeholder-[#929292]"
            />
            <Button
              type="submit"
              variant="primary"
              className="absolute right-2 top-1.5 h-8 px-4 text-xs font-semibold"
            >
              FIND COUNSEL
            </Button>
          </div>
        </form>
      </section>

      {/* ──────────────── AI SERVICE MATCHING RESULTS ──────────────── */}
      {matchedResults && (
        <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5 animate-in fade-in">
          <div className="border-b border-[#D9D7D0] pb-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-1">
              MATCH ENGINE
            </div>
            <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-[#111111]" />
              Service Request Match
            </h2>
            <div className="mt-2 text-xs text-[#686868]">
              Interpreted requirement:
              <p className="font-semibold text-[#171717] mt-0.5">&ldquo;{naturalNeed}&rdquo;</p>
            </div>
          </div>

          {/* AI Understood */}
          <div className="bg-[#F0EFEA] p-4 rounded-lg border border-[#D9D7D0] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[#929292] block text-[10px] uppercase font-bold tracking-wider">SERVICE</span>
              <span className="font-bold text-[#171717]">Court Appearance</span>
            </div>
            <div>
              <span className="text-[#929292] block text-[10px] uppercase font-bold tracking-wider">LOCATION</span>
              <span className="font-bold text-[#171717]">Coimbatore / Salem</span>
            </div>
            <div>
              <span className="text-[#929292] block text-[10px] uppercase font-bold tracking-wider">COURT</span>
              <span className="font-bold text-[#171717]">Sessions Court</span>
            </div>
            <div>
              <span className="text-[#929292] block text-[10px] uppercase font-bold tracking-wider">PRACTICE AREA</span>
              <span className="font-bold text-[#171717]">Criminal Law</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
              Matched Professionals ({matchedResults.length} Found)
            </h3>

            {matchedResults.map((m, idx) => (
              <div
                key={idx}
                className="border border-[#D9D7D0] rounded-lg p-5 bg-[#FFFFFF] flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-[#171717]">{m.name}</h4>
                    <span className="text-[10px] font-semibold text-[#2F6B4F] bg-[#F0EFEA] px-2 py-0.5 rounded border border-[#D9D7D0]">
                      ✓ {m.availability}
                    </span>
                    <span className="text-[10px] text-[#929292]">Response: {m.responseTime}</span>
                  </div>
                  <p className="text-xs text-[#686868]">{m.specialty} • {m.location}</p>

                  <div className="bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg p-3 text-xs text-[#171717]">
                    <span className="font-bold text-[#111111] block mb-1">Why This Match:</span>
                    <ul className="space-y-0.5 text-[#686868] text-[11px]">
                      {m.reasons.map((r: string, rIdx: number) => (
                        <li key={rIdx} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-[#2F6B4F] mr-1.5 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 pt-2 md:pt-0">
                  <Link to="/search">
                    <Button variant="secondary" size="sm" className="h-8 text-xs">
                      View Profile
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="primary" size="sm" className="h-8 text-xs">
                      Request Assistance
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ──────────────── I CAN OFFER & AVAILABILITY ──────────────── */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
              OFFERING CATALOG
            </div>
            <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight">
              Services I Can Offer
            </h2>
            <p className="text-xs text-[#686868]">
              Manage the services you offer in your verified advocate profile:
            </p>
          </div>
          <Link to="/profile">
            <Button variant="secondary" size="sm" className="h-7 text-xs">
              Edit My Services
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {offeredServices.map((svc, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-lg border flex items-center justify-between ${
                svc.active
                  ? 'bg-[#F0EFEA] border-[#D9D7D0] text-[#171717]'
                  : 'bg-[#FFFFFF] border-[#D9D7D0] text-[#929292]'
              }`}
            >
              <span className="font-semibold">{svc.active ? '✓' : '○'} {svc.title}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#929292]">{svc.category}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-[#D9D7D0] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-medium text-[#171717]">Service Status:</span>
            <span className="text-[#2F6B4F] font-semibold bg-[#F0EFEA] px-2 py-0.5 rounded border border-[#D9D7D0] text-[11px]">
              Available for colleagues
            </span>
            <span className="text-[#686868]">Response time: <b>1-2 business days</b></span>
          </div>
          <Link to="/profile">
            <span className="text-xs text-[#171717] hover:underline font-semibold cursor-pointer">
              Edit Availability
            </span>
          </Link>
        </div>
      </section>

      {/* ──────────────── YOUR SERVICE REQUESTS ──────────────── */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
            ENGAGEMENT INBOX
          </div>
          <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight">
            Incoming Service Requests
          </h2>
          <p className="text-xs text-[#686868]">
            Recent requests received from other professionals:
          </p>
        </div>

        <div className="space-y-3">
          {serviceRequests.map((req) => (
            <div
              key={req.id}
              className="border border-[#D9D7D0] rounded-lg p-4 bg-[#FFFFFF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#171717]">{req.advocate}</span>
                  <span className="font-medium text-[#171717] bg-[#F0EFEA] px-2 py-0.5 rounded border border-[#D9D7D0] text-[11px]">
                    Service: {req.service}
                  </span>
                </div>
                <p className="text-[#686868]">{req.details}</p>
                <p className="text-[11px] text-[#929292]">Hearing / Timeline: <b>{req.date}</b></p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {req.status === 'awaiting' ? (
                  <>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleAction(req.id, 'accepted')}
                      className="h-8 text-xs bg-[#2F6B4F] text-white hover:bg-[#25573F]"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAction(req.id, 'declined')}
                      className="h-8 text-xs text-[#A63D40]"
                    >
                      Decline
                    </Button>
                  </>
                ) : req.status === 'accepted' ? (
                  <span className="text-xs font-semibold text-[#2F6B4F]">
                    ✓ Request Accepted
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-[#A63D40]">
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
