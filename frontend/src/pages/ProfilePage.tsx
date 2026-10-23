import React, { useState } from 'react'
import {
  ShieldCheck,
  Edit2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const ProfilePage: React.FC = () => {
  const [profileData] = useState({
    name: 'Adv. Kirubakaran Srinivasan',
    designation: 'Senior Advocate',
    barAssociation: 'Tamil Nadu Bar Council',
    enrollment: 'TN/2015/12345',
    status: 'Verified Bar Member',
    bio: 'Trial and appellate advocate specializing in criminal defense and constitutional matters before the Madras High Court and Principal Sessions Court, Salem with 14 years of practice.',
    location: 'Salem & Chennai, Tamil Nadu',
    experience: 14,
  })

  const [aiPreferences, setAiPreferences] = useState({
    receiveRecommendations: true,
    allowAiProfileAccess: true,
    allowDiscussionSummarization: true,
    optOutMatching: false,
  })

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-[#E0E0E0] pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-[#212121]">
          MY PROFILE & SETTINGS
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Manage your verified professional identity, jurisdiction, privacy controls, and AI preferences.
        </p>
      </div>

      {/* Screen 19: PROFESSIONAL PROFILE BOX */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
            PROFESSIONAL PROFILE
          </h2>
          <Button variant="outline" size="sm" className="h-7 text-xs border-[#E0E0E0] text-[#546E7A]">
            <Edit2 className="w-3 h-3 mr-1" />
            [ EDIT ]
          </Button>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-[#FAFAFA] border border-[#E0E0E0] flex items-center justify-center font-bold text-xl text-[#0D47A1] shrink-0">
            K
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-[#212121]">{profileData.name}</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold text-[#2E7D32] bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                {profileData.status}
              </span>
            </div>
            <p className="text-[#546E7A] font-medium">{profileData.designation}</p>
            <p className="text-[#666666]">
              {profileData.barAssociation} • <span className="font-mono">{profileData.enrollment}</span>
            </p>
            <p className="text-[#212121] pt-1 leading-relaxed max-w-2xl">{profileData.bio}</p>
          </div>
        </div>
      </section>

      {/* EXPERTISE & SERVICES */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
            EXPERTISE & SERVICES
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-7 text-xs border-[#E0E0E0] text-[#546E7A]">
              [ EDIT SERVICES ]
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs border-[#E0E0E0] text-[#546E7A]">
              [ EDIT AVAILABILITY ]
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold text-[#666666] block mb-1">PRACTICE AREAS</span>
            <div className="space-y-1 text-[#212121]">
              <p>• Criminal Law (Appeals, Sessions trial, NDPS, POCSO)</p>
              <p>• Constitutional Law (Writ Petitions)</p>
              <p>• Criminal Procedure & Police Investigation</p>
            </div>
          </div>
          <div>
            <span className="font-semibold text-[#666666] block mb-1">OFFERED SERVICES</span>
            <div className="space-y-1 text-[#212121]">
              <p>✓ Court Appearance (Regular appearances in Salem Sessions & Madras HC)</p>
              <p>✓ Local Counsel (Docket management, bail filing, certified copies)</p>
              <p>✓ Legal Consulting (Case merit opinions)</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY & VISIBILITY */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-3 text-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121] border-b border-[#E0E0E0] pb-3">
          PRIVACY & VISIBILITY
        </h2>
        <div className="space-y-2 text-[#212121]">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#0D47A1]" />
            <span>Profile visible in deterministic search results</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#0D47A1]" />
            <span>Available for connection requests from verified colleagues</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#0D47A1]" />
            <span>Available for service requests (local counsel & appearances)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#0D47A1]" />
            <span>Mask contact numbers until reciprocal connection is accepted</span>
          </label>
        </div>
      </section>

      {/* AI PREFERENCES & CONTROLS */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
            AI PREFERENCES & TRANSPARENCY CONTROLS
          </h2>
          <span className="text-[11px] text-[#1565C0] font-semibold">User Agency Protected</span>
        </div>

        <div className="space-y-2 text-[#212121]">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={aiPreferences.receiveRecommendations}
              onChange={(e) =>
                setAiPreferences({ ...aiPreferences, receiveRecommendations: e.target.checked })
              }
              className="rounded text-[#0D47A1]"
            />
            <span>Receive AI recommendations based on network graph</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={aiPreferences.allowAiProfileAccess}
              onChange={(e) =>
                setAiPreferences({ ...aiPreferences, allowAiProfileAccess: e.target.checked })
              }
              className="rounded text-[#0D47A1]"
            />
            <span>Allow AI agents to match my profile for relevant colleague service inquiries</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={aiPreferences.allowDiscussionSummarization}
              onChange={(e) =>
                setAiPreferences({
                  ...aiPreferences,
                  allowDiscussionSummarization: e.target.checked,
                })
              }
              className="rounded text-[#0D47A1]"
            />
            <span>Allow on-demand AI summarization of lengthy legal discussions</span>
          </label>
        </div>
      </section>

      {/* ACCOUNT & SECURITY */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4 text-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121] border-b border-[#E0E0E0] pb-3">
          SECURITY & ACCOUNT
        </h2>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="font-semibold text-[#212121]">Email: kiruba@example.com</p>
            <p className="text-[#666666]">Mobile: +91 98765 43210 (Verified OTP)</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-7 text-xs border-[#E0E0E0]">
              [ CHANGE PASSWORD ]
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs border-[#E0E0E0]">
              [ ACTIVE SESSIONS ]
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
