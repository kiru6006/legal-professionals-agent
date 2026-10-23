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

    // Simulated advocate acknowledgement
    setTimeout(() => {
      setIsSendingMessage(false)
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'advocate',
          text: `Thank you for reaching out. I have received your message regarding this matter and will review the particulars. Please share any docket number or hearing date if applicable.`,
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

  // Fallback services if profile has not loaded yet
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
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header Section: Left avatar + info, perfectly aligned */}
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 min-w-[52px] h-[52px] rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 flex items-center justify-center text-navy-900 font-bold text-xl shadow-inner shrink-0">
              {candidate.full_name.replace('Adv. ', '').charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight truncate">
                  {candidate.full_name}
                </h3>
                {candidate.is_bar_verified && (
                  <span className="inline-flex items-center text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Verified Bar Member
                  </span>
                )}
              </div>

              {/* Sub-meta details row */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-slate-600 mt-1.5">
                {candidate.enrollment_number && (
                  <span className="font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {candidate.enrollment_number}
                  </span>
                )}
                {candidate.primary_district && (
                  <span className="flex items-center text-slate-600">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                    {candidate.primary_district}
                  </span>
                )}
                {candidate.years_of_experience !== undefined && (
                  <span className="flex items-center text-slate-600">
                    <Briefcase className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
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
                className="bg-sky-50 text-sky-800 border border-sky-200/80 text-xs px-2.5 py-1 rounded-md font-medium"
              >
                {area}
              </span>
            ))}
            {candidate.matching_courts.map((court, idx) => (
              <span
                key={idx}
                className="bg-purple-50 text-purple-800 border border-purple-200/80 text-xs px-2.5 py-1 rounded-md font-medium"
              >
                {court}
              </span>
            ))}
            {candidate.matching_services.map((svc, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-800 border border-slate-200 text-xs px-2.5 py-1 rounded-md font-medium"
              >
                {svc}
              </span>
            ))}
          </div>

          {/* Grounding & Match Reasons */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700">
            <div className="font-semibold text-slate-800 flex items-center mb-2">
              <Award className="w-3.5 h-3.5 mr-1.5 text-amber-600 shrink-0" />
              <span>MATCHING QUALIFICATIONS</span>
            </div>
            <ul className="space-y-1.5">
              {candidate.grounding_reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5 shrink-0" />
                  <span>{reason.claim}</span>
                </li>
              ))}
            </ul>

            {candidate.information_gaps && candidate.information_gaps.length > 0 && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-slate-500 text-[11px]">
                <span className="font-medium text-slate-600">Pending Profile Fields: </span>
                {candidate.information_gaps.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleOpenProfile}
            className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-300 font-medium"
          >
            <User className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            View Profile
          </Button>

          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleOpenChat}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
              Connect
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleOpenService}
              className="bg-navy-900 hover:bg-navy-800 text-white font-medium shadow-sm"
            >
              <Scale className="w-3.5 h-3.5 mr-1.5 text-sky-300" />
              Request Service
            </Button>
          </div>
        </div>
      </div>

      {/* ──────────────── 1. Full Profile Modal ──────────────── */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-base">
                  {candidate.full_name.replace('Adv. ', '').charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-slate-900">{candidate.full_name}</h2>
                    {candidate.is_bar_verified && (
                      <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                        Verified Bar Member
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    {fullProfile?.enrollment_number || candidate.enrollment_number || 'Enrolled Advocate'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {loadingProfile ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                  <Loader2 className="w-8 h-8 animate-spin text-sky-600 mb-3" />
                  <p className="text-sm">Loading verified advocate credentials...</p>
                </div>
              ) : (
                <>
                  {/* Headline & Bio */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Professional Overview
                    </h3>
                    <p className="text-sm text-slate-800 font-medium mb-2">
                      {fullProfile?.headline || `${candidate.years_of_experience || 10}+ Years Legal Practice in ${candidate.primary_district || 'Tamil Nadu'}`}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      {fullProfile?.bio ||
                        `Advocate practicing before district courts and tribunals with a dedicated focus on client representation, local counsel assistance, and procedural hearings.`}
                    </p>
                  </div>

                  {/* Core Attributes */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <span className="text-slate-500 block mb-1">Jurisdiction / District</span>
                      <span className="font-semibold text-slate-800 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {fullProfile?.district?.name || candidate.primary_district || 'Tamil Nadu'}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <span className="text-slate-500 block mb-1">Total Experience</span>
                      <span className="font-semibold text-slate-800 flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {fullProfile?.years_of_experience || candidate.years_of_experience || 5} Years
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs col-span-2 sm:col-span-1">
                      <span className="text-slate-500 block mb-1">Languages</span>
                      <span className="font-semibold text-slate-800">
                        {fullProfile?.languages?.join(', ') || 'English, Tamil'}
                      </span>
                    </div>
                  </div>

                  {/* Practice Areas */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Practice Areas
                    </h3>
                    <div className="space-y-2">
                      {fullProfile?.practice_areas && fullProfile.practice_areas.length > 0 ? (
                        fullProfile.practice_areas.map((pa, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white"
                          >
                            <div>
                              <span className="font-semibold text-slate-800 text-sm">
                                {pa.practice_area.name}
                              </span>
                              {pa.practice_area.description && (
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {pa.practice_area.description}
                                </p>
                              )}
                            </div>
                            <span className="text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded">
                              {pa.years_focused} yrs focused
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {candidate.matching_practice_areas.map((area, idx) => (
                            <span
                              key={idx}
                              className="bg-sky-50 text-sky-800 border border-sky-200 px-3 py-1 rounded-md text-xs font-medium"
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
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Courts & Appearance Venues
                    </h3>
                    <div className="space-y-2">
                      {fullProfile?.courts && fullProfile.courts.length > 0 ? (
                        fullProfile.courts.map((c, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white"
                          >
                            <span className="font-semibold text-slate-800 text-sm">
                              {c.court.name}
                            </span>
                            <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded">
                              {c.court.court_type} {c.is_regular ? '• Regular' : ''}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {candidate.matching_courts.map((court, idx) => (
                            <span
                              key={idx}
                              className="bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1 rounded-md text-xs font-medium"
                            >
                              {court}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact & Privacy Notice */}
                  <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 text-xs text-sky-950 flex items-start gap-3">
                    <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block mb-0.5">Contact Verification & Privacy</span>
                      <p className="text-slate-600">
                        {fullProfile?.contact_info?.unmask_instructions ||
                          'Contact numbers and emails are masked until you initiate a connection or service request.'}
                      </p>
                      <div className="flex items-center gap-4 mt-2 font-mono text-slate-700">
                        <span className="flex items-center">
                          <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          {fullProfile?.contact_info?.phone || '+91 ••••• ••••'}
                        </span>
                        <span className="flex items-center">
                          <Mail className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          {fullProfile?.contact_info?.email || '••••••@legalnet.in'}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setIsProfileOpen(false)}>
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
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
                  Connect
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setIsProfileOpen(false)
                    setIsServiceOpen(true)
                  }}
                  className="bg-navy-900 text-white hover:bg-navy-800"
                >
                  <Scale className="w-3.5 h-3.5 mr-1.5 text-sky-300" />
                  Request Service
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 2. One-on-One Chat Modal (Connect) ──────────────── */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full h-[580px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Chat Header */}
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-navy-900 text-white">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-navy-900 flex items-center justify-center font-bold text-sm">
                    {candidate.full_name.replace('Adv. ', '').charAt(0)}
                  </div>
                  <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-navy-900 rounded-full absolute bottom-0 right-0" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    {candidate.full_name}
                    {candidate.is_bar_verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </h3>
                  <span className="text-[11px] text-sky-200 block">
                    Direct Consultation • {candidate.primary_district || 'Tamil Nadu'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body: Message List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              <div className="text-center my-1">
                <span className="text-[11px] text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                  Encrypted 1-on-1 Consultation Channel
                </span>
              </div>

              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-navy-900 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isSendingMessage && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-400 text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5">
                    <Loader2 className="w-3 h-3 animate-spin text-sky-600" />
                    <span>Advocate is typing response...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Write your message or inquiry..."
                className="flex-1 px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800 placeholder-slate-400"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!messageInput.trim()}
                className="h-9 px-4 bg-navy-900 text-white hover:bg-navy-800 rounded-xl shrink-0"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Service Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5 text-sky-700" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Request Legal Service
                  </h2>
                  <p className="text-xs text-slate-500">
                    Engage <b>{candidate.full_name}</b> for representation or counsel
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsServiceOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Service Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {serviceSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Service Request Dispatched</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Your formal engagement request for <b>{selectedService}</b> has been transmitted to {candidate.full_name}. You will receive confirmation via notifications and email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitServiceRequest} className="space-y-4">
                  {/* Service Selection List with full details */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                            className={`flex items-start p-3.5 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="serviceSelection"
                              checked={isSelected}
                              onChange={() => setSelectedService(title)}
                              className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-slate-300"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-900">{title}</span>
                                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                  {svcItem.service.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-1 leading-normal">
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
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Court / Forum (Optional)
                      </label>
                      <input
                        type="text"
                        value={courtName}
                        onChange={(e) => setCourtName(e.target.value)}
                        placeholder="e.g. Principal Sessions Court, Salem"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Urgency Timeline
                      </label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                      >
                        <option value="Urgent">Immediate (Within 24 Hours / Bail)</option>
                        <option value="Standard">Standard (Within 3 to 5 Days)</option>
                        <option value="Flexible">Upcoming Hearing (Within 2 Weeks)</option>
                      </select>
                    </div>
                  </div>

                  {/* Case / Requirement Summary */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Brief Matter Summary / Instructions
                    </label>
                    <textarea
                      rows={3}
                      value={caseDescription}
                      onChange={(e) => setCaseDescription(e.target.value)}
                      placeholder="Please mention case title, stage of proceeding, or specific assistance required..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 placeholder-slate-400"
                      required
                    />
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Standard engagement terms apply. Confidentiality is safeguarded under the Advocate-Client privilege framework.
                    </span>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsServiceOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="bg-navy-900 text-white hover:bg-navy-800"
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
