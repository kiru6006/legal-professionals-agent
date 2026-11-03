import React, { useState } from 'react'
import { ShieldCheck, Edit2 } from 'lucide-react'
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
      <div className="border-b border-[#D9D7D0] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-1">
          01 · CREDENTIALS & GOVERNANCE
        </div>
        <h1 className="text-3xl font-editorial text-[#171717] font-normal tracking-tight">
          Profile & <span className="italic font-serif">Preferences</span>
        </h1>
        <p className="text-xs text-[#686868] mt-1">
          Manage your verified professional identity, jurisdiction, privacy controls, and AI preferences.
        </p>
      </div>

      {/* PROFESSIONAL PROFILE BOX */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#D9D7D0] pb-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292]">
            VERIFIED ADVOCATE IDENTITY
          </div>
          <Button variant="secondary" size="sm" className="h-7 text-xs">
            <Edit2 className="w-3 h-3 mr-1" />
            Edit Profile
          </Button>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#F0EFEA] border border-[#D9D7D0] flex items-center justify-center font-bold text-lg text-[#171717] shrink-0">
            K
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-[#171717]">{profileData.name}</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold text-[#2F6B4F] bg-[#F0EFEA] border border-[#D9D7D0]">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#2F6B4F]" />
                {profileData.status}
              </span>
            </div>
            <p className="text-[#686868] font-medium">{profileData.designation}</p>
            <p className="text-[#929292]">
              {profileData.barAssociation} • <span className="font-mono text-[#171717]">{profileData.enrollment}</span>
            </p>
            <p className="text-[#171717] pt-2 leading-relaxed max-w-2xl text-xs">{profileData.bio}</p>
          </div>
        </div>
      </section>

      {/* EXPERTISE & SERVICES */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5 text-xs">
        <div className="flex items-center justify-between border-b border-[#D9D7D0] pb-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292]">
            PRACTICE SCOPE
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" className="h-7 text-xs">
              Edit Services
            </Button>
            <Button variant="secondary" size="sm" className="h-7 text-xs">
              Edit Availability
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#F0EFEA] rounded-lg border border-[#D9D7D0]">
            <span className="font-bold text-[10px] uppercase tracking-wider text-[#929292] block mb-2">PRACTICE AREAS</span>
            <div className="space-y-1.5 text-[#171717]">
              <p>• Criminal Law (Appeals, Sessions trial, NDPS, POCSO)</p>
              <p>• Constitutional Law (Writ Petitions)</p>
              <p>• Criminal Procedure & Police Investigation</p>
            </div>
          </div>
          <div className="p-4 bg-[#F0EFEA] rounded-lg border border-[#D9D7D0]">
            <span className="font-bold text-[10px] uppercase tracking-wider text-[#929292] block mb-2">OFFERED SERVICES</span>
            <div className="space-y-1.5 text-[#171717]">
              <p>✓ Court Appearance (Sessions Court & High Court)</p>
              <p>✓ Local Counsel (Docket management, bail filing, certified copies)</p>
              <p>✓ Legal Consulting (Case merit opinions)</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY & VISIBILITY */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-4 text-xs">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] border-b border-[#D9D7D0] pb-3">
          PRIVACY & VISIBILITY CONTROLS
        </div>
        <div className="space-y-2.5 text-[#171717]">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#111111] focus:ring-0 border-[#D9D7D0]" />
            <span>Profile visible in deterministic search results</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#111111] focus:ring-0 border-[#D9D7D0]" />
            <span>Available for connection requests from verified colleagues</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#111111] focus:ring-0 border-[#D9D7D0]" />
            <span>Available for service requests (local counsel & appearances)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#111111] focus:ring-0 border-[#D9D7D0]" />
            <span>Mask contact numbers until reciprocal connection is accepted</span>
          </label>
        </div>
      </section>

      {/* AI PREFERENCES & CONTROLS */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-[#D9D7D0] pb-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292]">
            AI PREFERENCES & TRANSPARENCY
          </div>
          <span className="text-[11px] text-[#2F6B4F] font-semibold">User Agency Protected</span>
        </div>

        <div className="space-y-2.5 text-[#171717]">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={aiPreferences.receiveRecommendations}
              onChange={(e) =>
                setAiPreferences({ ...aiPreferences, receiveRecommendations: e.target.checked })
              }
              className="rounded text-[#111111] focus:ring-0 border-[#D9D7D0]"
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
              className="rounded text-[#111111] focus:ring-0 border-[#D9D7D0]"
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
              className="rounded text-[#111111] focus:ring-0 border-[#D9D7D0]"
            />
            <span>Allow on-demand AI summarization of lengthy legal discussions</span>
          </label>
        </div>
      </section>

      {/* ACCOUNT & SECURITY */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-4 text-xs">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] border-b border-[#D9D7D0] pb-3">
          SECURITY & ACCOUNT
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="font-semibold text-[#171717]">Email: kiruba@example.com</p>
            <p className="text-[#686868]">Mobile: +91 98765 43210 (Verified OTP)</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" className="h-8 text-xs">
              Change Password
            </Button>
            <Button variant="secondary" size="sm" className="h-8 text-xs">
              Active Sessions
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
