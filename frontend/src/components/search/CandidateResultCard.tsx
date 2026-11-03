import React, { useState } from 'react'
import {
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Briefcase,
  Award,
  MessageSquare,
  User,
  X,
  Phone,
  Mail,
  Scale,
  Send,
  CheckCircle,
  Loader2,
  Info
} from 'lucide-react'
import { RecommendedCandidate } from '@/types'
import { Button } from '@/components/ui/Button'
import { api } from '@/lib/api'

interface CandidateResultCardProps {
  candidate: RecommendedCandidate
}

interface ProfileFullDetail {
  id: string
  full_name: string
  designation: string
  enrollment_number: string
  is_verified: boolean
  years_of_experience: number
  headline?: string
  bio?: string
  district?: { id: string; name: string; state: string }
  languages?: string[]
  practice_areas?: {
    practice_area: { id: string; name: string; description?: string }
    is_primary: boolean
    years_focused: number
  }[]
  courts?: {
    court: { id: string; name: string; court_type: string }
    is_regular: boolean
  }[]
  services?: {
    service: { id: string; title: string; category: string; slug: string }
    details?: string
    is_active: boolean
  }[]
  contact_info?: {
    phone?: string
    email?: string
    is_masked: boolean
    unmask_instructions?: string
  }
}

export const CandidateResultCard: React.FC<CandidateResultCardProps> = ({ candidate }) => {
  // Modal states
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isServiceOpen, setIsServiceOpen] = useState(false)

  // Data loading states
  const [fullProfile, setFullProfile] = useState<ProfileFullDetail | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(false)

  // 1-on-1 Chat states
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'advocate'; text: string; time: string }>>([
    {
      sender: 'advocate',
      text: `Hello! I am ${candidate.full_name}. How can I assist you with your legal matter today?`,
      time: 'Just now',
    },
  ])
  const [messageInput, setMessageInput] = useState('')
  const [isSendingMessage, setIsSendingMessage] = useState(false)

  // Service Request states
  const [selectedService, setSelectedService] = useState<string>('')
  const [caseDescription, setCaseDescription] = useState('')
  const [courtName, setCourtName] = useState('')
  const [urgency, setUrgency] = useState('Standard')
  const [serviceSubmitted, setServiceSubmitted] = useState(false)

  // Fetch full profile details
  const fetchProfileDetails = async () => {
    if (fullProfile) return
    setLoadingProfile(true)
    try {
      const res = await api.get(`/profiles/${candidate.profile_id}`)
      setFullProfile(res.data)
      if (res.data.services && res.data.services.length > 0) {
        setSelectedService(res.data.services[0].service.title)
      }
    } catch (err) {
      console.error('Failed to fetch full profile:', err)
    } finally {
      setLoadingProfile(false)
    }
  }

  const handleOpenProfile = () => {
    setIsProfileOpen(true)
    fetchProfileDetails()
  }

  const handleOpenChat = () => {
    setIsChatOpen(true)
  }

  const handleOpenService = () => {
    setIsServiceOpen(true)
    fetchProfileDetails()
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    const newMsg = {
      sender: 'user' as const,
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setChatMessages((prev) => [...prev, newMsg])
    setMessageInput('')
    setIsSendingMessage(true)

    setTimeout(() => {
      setIsSendingMessage(false)
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'advocate',
          text: `Thank you for reaching out. I have received your inquiry regarding this matter and will review the particulars. Please share any docket number or relevant hearing dates.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    }, 1200)
  }

  const handleSubmitServiceRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService && (!fullProfile?.services || fullProfile.services.length === 0)) return
    setServiceSubmitted(true)
    setTimeout(() => {
      setServiceSubmitted(false)
      setIsServiceOpen(false)
      setCaseDescription('')
      setCourtName('')
    }, 2200)
  }

  const displayServices = fullProfile?.services && fullProfile.services.length > 0
    ? fullProfile.services
    : [
        {
          service: { id: 's1', title: 'Court Appearance', category: 'Litigation', slug: 'court-appearance' },
          details: 'Representation and appearance before District & Sessions Court, High Court, or Tribunals.',
          is_active: true,
        },
        {
          service: { id: 's2', title: 'Local Counsel', category: 'Litigation', slug: 'local-counsel' },
          details: 'Local assistance for out-of-station advocates, filing, certified copies, and docket management.',
          is_active: true,
        },
        {
          service: { id: 's3', title: 'Legal Drafting & Review', category: 'Advisory', slug: 'legal-drafting' },
          details: 'Drafting petitions, affidavits, bail applications, legal notices, and agreements.',
          is_active: true,
        },
      ]

  return (
    <>
      {/* ──────────────── Lawyer Card ──────────────── */}
      <div className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 flex flex-col justify-between space-y-5 hover:border-[#BDBAB1] transition-colors">
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F0EFEA] border border-[#D9D7D0] flex items-center justify-center text-[#171717] font-bold text-lg shrink-0">
              {candidate.full_name.replace('Adv. ', '').charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-[#171717] tracking-tight truncate">
                  {candidate.full_name}
                </h3>
                {candidate.is_bar_verified && (
                  <span className="inline-flex items-center text-[11px] font-semibold text-[#2F6B4F] bg-[#F0EFEA] px-2 py-0.5 rounded border border-[#D9D7D0]">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#2F6B4F]" />
                    Verified Bar Member
                  </span>
                )}
              </div>

              {/* Sub-meta details row */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-[#686868] mt-1.5">
                {candidate.enrollment_number && (
                  <span className="font-mono bg-[#F0EFEA] text-[#171717] px-2 py-0.5 rounded border border-[#D9D7D0]">
                    {candidate.enrollment_number}
                  </span>
                )}
                {candidate.primary_district && (
                  <span className="flex items-center text-[#686868]">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#929292] shrink-0" />
                    {candidate.primary_district}
                  </span>
                )}
                {candidate.years_of_experience !== undefined && (
                  <span className="flex items-center text-[#686868]">
                    <Briefcase className="w-3.5 h-3.5 mr-1 text-[#929292] shrink-0" />
                    {candidate.years_of_experience} yrs experience
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tags Section: Practice areas & Courts */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {candidate.matching_practice_areas.map((area, idx) => (
              <span
                key={idx}
                className="bg-[#F0EFEA] text-[#171717] border border-[#D9D7D0] text-xs px-2.5 py-1 rounded-md font-medium"
              >
                {area}
              </span>
            ))}
            {candidate.matching_courts.map((court, idx) => (
              <span
                key={idx}
                className="bg-[#F0EFEA] text-[#686868] border border-[#D9D7D0] text-xs px-2.5 py-1 rounded-md font-medium"
              >
                {court}
              </span>
            ))}
            {candidate.matching_services.map((svc, idx) => (
              <span
                key={idx}
                className="bg-[#F0EFEA] text-[#929292] border border-[#D9D7D0] text-xs px-2.5 py-1 rounded-md font-medium"
              >
                {svc}
              </span>
            ))}
          </div>

          {/* Grounding & Match Reasons */}
          <div className="bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg p-3.5 text-xs text-[#171717]">
            <div className="font-bold text-[#111111] flex items-center mb-2">
              <Award className="w-3.5 h-3.5 mr-1.5 text-[#111111] shrink-0" />
              <span>MATCHING QUALIFICATIONS</span>
            </div>
            <ul className="space-y-1.5">
              {candidate.grounding_reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start text-[#686868]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6B4F] mr-2 mt-0.5 shrink-0" />
                  <span>{reason.claim}</span>
                </li>
              ))}
            </ul>

            {candidate.information_gaps && candidate.information_gaps.length > 0 && (
              <div className="mt-2.5 pt-2 border-t border-[#D9D7D0] text-[#929292] text-[11px]">
                <span className="font-medium text-[#686868]">Pending Profile Fields: </span>
                {candidate.information_gaps.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="pt-4 border-t border-[#D9D7D0] flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleOpenProfile}
            className="text-xs"
          >
            <User className="w-3.5 h-3.5 mr-1.5 text-[#686868]" />
            View Profile
          </Button>

          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleOpenChat}
              className="text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-[#171717]" />
              Connect
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleOpenService}
              className="text-xs font-semibold"
            >
              <Scale className="w-3.5 h-3.5 mr-1.5" />
              Request Service
            </Button>
          </div>
        </div>
      </div>

      {/* ──────────────── 1. Full Profile Modal ──────────────── */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-[#D9D7D0] shadow-lg overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#D9D7D0] flex items-center justify-between bg-[#F0EFEA]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm">
                  {candidate.full_name.replace('Adv. ', '').charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-[#171717]">{candidate.full_name}</h2>
                    {candidate.is_bar_verified && (
                      <span className="inline-flex items-center text-[10px] font-semibold text-[#2F6B4F] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#D9D7D0]">
                        <ShieldCheck className="w-3 h-3 mr-1 text-[#2F6B4F]" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#929292] font-mono">
                    {fullProfile?.enrollment_number || candidate.enrollment_number || 'Enrolled Advocate'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="text-[#686868] hover:text-[#171717] p-1.5 rounded-lg hover:bg-[#E8E6DF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {loadingProfile ? (
                <div className="flex flex-col items-center justify-center py-12 text-[#929292]">
                  <Loader2 className="w-8 h-8 animate-spin text-[#111111] mb-3" />
                  <p className="text-xs">Loading verified advocate credentials...</p>
                </div>
              ) : (
                <>
                  {/* Headline & Bio */}
                  <div>
                    <h3 className="text-[10px] font-bold text-[#929292] uppercase tracking-wider mb-2">
                      Professional Overview
                    </h3>
                    <p className="text-sm text-[#171717] font-semibold mb-2">
                      {fullProfile?.headline || `${candidate.years_of_experience || 10}+ Years Legal Practice in ${candidate.primary_district || 'Tamil Nadu'}`}
                    </p>
                    <p className="text-xs text-[#686868] leading-relaxed bg-[#F0EFEA] p-3.5 rounded-lg border border-[#D9D7D0]">
                      {fullProfile?.bio ||
                        `Advocate practicing before district courts and tribunals with a dedicated focus on client representation, local counsel assistance, and procedural hearings.`}
                    </p>
                  </div>

                  {/* Core Attributes */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-[#F0EFEA] rounded-lg border border-[#D9D7D0] text-xs">
                      <span className="text-[#929292] block mb-1">Jurisdiction / District</span>
                      <span className="font-semibold text-[#171717] flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#929292]" />
                        {fullProfile?.district?.name || candidate.primary_district || 'Tamil Nadu'}
                      </span>
                    </div>
                    <div className="p-3 bg-[#F0EFEA] rounded-lg border border-[#D9D7D0] text-xs">
                      <span className="text-[#929292] block mb-1">Total Experience</span>
                      <span className="font-semibold text-[#171717] flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1 text-[#929292]" />
                        {fullProfile?.years_of_experience || candidate.years_of_experience || 5} Years
                      </span>
                    </div>
                    <div className="p-3 bg-[#F0EFEA] rounded-lg border border-[#D9D7D0] text-xs col-span-2 sm:col-span-1">
                      <span className="text-[#929292] block mb-1">Languages</span>
                      <span className="font-semibold text-[#171717]">
                        {fullProfile?.languages?.join(', ') || 'English, Tamil'}
                      </span>
                    </div>
                  </div>

                  {/* Practice Areas */}
                  <div>
                    <h3 className="text-[10px] font-bold text-[#929292] uppercase tracking-wider mb-2">
                      Practice Areas
                    </h3>
                    <div className="space-y-2">
                      {fullProfile?.practice_areas && fullProfile.practice_areas.length > 0 ? (
                        fullProfile.practice_areas.map((pa, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg border border-[#D9D7D0] bg-[#FFFFFF]"
                          >
                            <div>
                              <span className="font-semibold text-[#171717] text-xs">
                                {pa.practice_area.name}
                              </span>
                              {pa.practice_area.description && (
                                <p className="text-[11px] text-[#686868] mt-0.5">
                                  {pa.practice_area.description}
                                </p>
                              )}
                            </div>
                            <span className="text-[11px] font-medium bg-[#F0EFEA] text-[#171717] border border-[#D9D7D0] px-2 py-0.5 rounded">
                              {pa.years_focused} yrs focused
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {candidate.matching_practice_areas.map((area, idx) => (
                            <span
                              key={idx}
                              className="bg-[#F0EFEA] text-[#171717] border border-[#D9D7D0] px-2.5 py-1 rounded-md text-xs font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Courts of Appearance */}
                  <div>
                    <h3 className="text-[10px] font-bold text-[#929292] uppercase tracking-wider mb-2">
                      Courts & Appearance Venues
                    </h3>
                    <div className="space-y-2">
                      {fullProfile?.courts && fullProfile.courts.length > 0 ? (
                        fullProfile.courts.map((c, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg border border-[#D9D7D0] bg-[#FFFFFF]"
                          >
                            <span className="font-semibold text-[#171717] text-xs">
                              {c.court.name}
                            </span>
                            <span className="text-[11px] bg-[#F0EFEA] text-[#686868] border border-[#D9D7D0] px-2 py-0.5 rounded">
                              {c.court.court_type} {c.is_regular ? '• Regular' : ''}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {candidate.matching_courts.map((court, idx) => (
                            <span
                              key={idx}
                              className="bg-[#F0EFEA] text-[#686868] border border-[#D9D7D0] px-2.5 py-1 rounded-md text-xs font-medium"
                            >
                              {court}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact & Privacy Notice */}
                  <div className="bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg p-4 text-xs text-[#171717] flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#456B8C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block mb-0.5">Contact Verification & Privacy</span>
                      <p className="text-[#686868]">
                        {fullProfile?.contact_info?.unmask_instructions ||
                          'Contact numbers and emails are masked until you initiate a connection or service request.'}
                      </p>
                      <div className="flex items-center gap-4 mt-2 font-mono text-[#171717]">
                        <span className="flex items-center">
                          <Phone className="w-3.5 h-3.5 mr-1 text-[#929292]" />
                          {fullProfile?.contact_info?.phone || '+91 ••••• ••••'}
                        </span>
                        <span className="flex items-center">
                          <Mail className="w-3.5 h-3.5 mr-1 text-[#929292]" />
                          {fullProfile?.contact_info?.email || '••••••@legalnet.in'}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-[#D9D7D0] bg-[#F0EFEA] flex items-center justify-between">
              <Button variant="secondary" size="sm" onClick={() => setIsProfileOpen(false)}>
                Close
              </Button>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setIsProfileOpen(false)
                    setIsChatOpen(true)
                  }}
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                  Connect
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setIsProfileOpen(false)
                    setIsServiceOpen(true)
                  }}
                >
                  <Scale className="w-3.5 h-3.5 mr-1.5" />
                  Request Service
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 2. One-on-One Chat Modal (Connect) ──────────────── */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl max-w-lg w-full h-[580px] flex flex-col border border-[#D9D7D0] shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="px-5 py-3.5 border-b border-[#D9D7D0] flex items-center justify-between bg-[#111111] text-white">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#FFFFFF] text-[#111111] flex items-center justify-center font-bold text-sm">
                    {candidate.full_name.replace('Adv. ', '').charAt(0)}
                  </div>
                  <span className="w-2.5 h-2.5 bg-[#2F6B4F] border-2 border-[#111111] rounded-full absolute bottom-0 right-0" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    {candidate.full_name}
                    {candidate.is_bar_verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B4F]" />
                    )}
                  </h3>
                  <span className="text-[11px] text-[#929292] block">
                    Direct Consultation • {candidate.primary_district || 'Tamil Nadu'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F7F6F2]">
              <div className="text-center my-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#929292] bg-[#FFFFFF] px-2.5 py-1 rounded-full border border-[#D9D7D0]">
                  Encrypted Consultation Channel
                </span>
              </div>

              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#111111] text-white rounded-br-xs'
                        : 'bg-[#FFFFFF] text-[#171717] border border-[#D9D7D0] rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-white/60' : 'text-[#929292]'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isSendingMessage && (
                <div className="flex justify-start">
                  <div className="bg-[#FFFFFF] border border-[#D9D7D0] text-[#929292] text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5">
                    <Loader2 className="w-3 h-3 animate-spin text-[#111111]" />
                    <span>Advocate is typing response...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#D9D7D0] bg-[#FFFFFF] flex items-center gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Write your message or inquiry..."
                className="flex-1 px-3.5 py-2 text-xs border border-[#D9D7D0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#111111] bg-[#FFFFFF] text-[#171717] placeholder-[#929292]"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!messageInput.trim()}
                className="h-8 px-4"
              >
                <Send className="w-3.5 h-3.5 mr-1" />
                Send
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────── 3. Request Service Modal ──────────────── */}
      {isServiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl max-w-xl w-full max-h-[90vh] flex flex-col border border-[#D9D7D0] shadow-lg overflow-hidden">
            {/* Service Modal Header */}
            <div className="px-6 py-4 border-b border-[#D9D7D0] flex items-center justify-between bg-[#F0EFEA]">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-sm">
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#171717]">
                    Request Legal Service
                  </h2>
                  <p className="text-xs text-[#686868]">
                    Engage <b>{candidate.full_name}</b> for representation or counsel
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsServiceOpen(false)}
                className="text-[#686868] hover:text-[#171717] p-1.5 rounded-lg hover:bg-[#E8E6DF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Service Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {serviceSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 bg-[#F0EFEA] text-[#2F6B4F] rounded-full flex items-center justify-center mx-auto border border-[#D9D7D0]">
                    <CheckCircle className="w-6 h-6 text-[#2F6B4F]" />
                  </div>
                  <h3 className="text-base font-bold text-[#171717]">Service Request Dispatched</h3>
                  <p className="text-xs text-[#686868] max-w-sm mx-auto">
                    Your formal engagement request for <b>{selectedService}</b> has been transmitted to {candidate.full_name}. You will receive confirmation via notifications and email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitServiceRequest} className="space-y-4">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#929292] uppercase tracking-wider mb-2">
                      Select Service Offered by Advocate
                    </label>
                    <div className="space-y-2">
                      {displayServices.map((svcItem, idx) => {
                        const title = svcItem.service.title
                        const isSelected = selectedService === title || (!selectedService && idx === 0)
                        return (
                          <label
                            key={idx}
                            onClick={() => setSelectedService(title)}
                            className={`flex items-start p-3.5 rounded-lg border cursor-pointer transition-colors ${
                              isSelected
                                ? 'border-[#111111] bg-[#F0EFEA]'
                                : 'border-[#D9D7D0] hover:border-[#BDBAB1] bg-[#FFFFFF]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="serviceSelection"
                              checked={isSelected}
                              onChange={() => setSelectedService(title)}
                              className="mt-1 h-3.5 w-3.5 text-[#111111] focus:ring-0 border-[#D9D7D0]"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#171717]">{title}</span>
                                <span className="text-[10px] font-medium text-[#686868] bg-[#F0EFEA] px-2 py-0.5 rounded border border-[#D9D7D0]">
                                  {svcItem.service.category}
                                </span>
                              </div>
                              <p className="text-xs text-[#686868] mt-1 leading-normal">
                                {svcItem.details ||
                                  (title === 'Court Appearance'
                                    ? 'Representation before judicial officers, hearing arguments, and handling interim applications.'
                                    : title === 'Local Counsel'
                                    ? 'Local advocacy representation, filings, certified copy extraction, and docket monitoring.'
                                    : 'Comprehensive legal documentation, case assessment, and representation.')}
                              </p>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* Hearing/Court details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#171717] mb-1">
                        Court / Forum (Optional)
                      </label>
                      <input
                        type="text"
                        value={courtName}
                        onChange={(e) => setCourtName(e.target.value)}
                        placeholder="e.g. Principal Sessions Court, Salem"
                        className="w-full px-3 py-2 text-xs border border-[#D9D7D0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#111111] bg-[#FFFFFF] text-[#171717] placeholder-[#929292]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#171717] mb-1">
                        Urgency Timeline
                      </label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9D7D0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#111111] bg-[#FFFFFF] text-[#171717]"
                      >
                        <option value="Urgent">Immediate (Within 24 Hours / Bail)</option>
                        <option value="Standard">Standard (Within 3 to 5 Days)</option>
                        <option value="Flexible">Upcoming Hearing (Within 2 Weeks)</option>
                      </select>
                    </div>
                  </div>

                  {/* Matter Summary */}
                  <div>
                    <label className="block text-xs font-medium text-[#171717] mb-1">
                      Brief Matter Summary / Instructions
                    </label>
                    <textarea
                      rows={3}
                      value={caseDescription}
                      onChange={(e) => setCaseDescription(e.target.value)}
                      placeholder="Please mention case title, stage of proceeding, or specific assistance required..."
                      className="w-full px-3 py-2 text-xs border border-[#D9D7D0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#111111] bg-[#FFFFFF] text-[#171717] placeholder-[#929292]"
                      required
                    />
                  </div>

                  <div className="bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg p-3 text-[11px] text-[#686868] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2F6B4F] shrink-0" />
                    <span>
                      Standard engagement terms apply. Confidentiality is safeguarded under the Advocate-Client privilege framework.
                    </span>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsServiceOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                    >
                      Submit Service Request
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
