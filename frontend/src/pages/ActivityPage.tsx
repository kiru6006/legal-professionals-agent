import React from 'react'
import { Search, Sparkles, Check } from 'lucide-react'

export const ActivityPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#D9D7D0] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-1">
          01 · AUDIT LOG & TRANSPARENCY
        </div>
        <h1 className="text-3xl font-editorial text-[#171717] font-normal tracking-tight">
          AI Activity & <span className="italic font-serif">Transparency</span>
        </h1>
        <p className="text-xs text-[#686868] mt-1">
          This audit log shows deterministic AI actions performed on your behalf, data sources accessed, and grounding reasoning.
        </p>
      </div>

      {/* TODAY'S AI ACTIVITY */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
            LOGS (TODAY)
          </div>
          <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight">
            Today&apos;s AI Activity
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-lg border border-[#D9D7D0] bg-[#F0EFEA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#171717] flex items-center">
                <Search className="w-3.5 h-3.5 mr-2 text-[#111111]" />
                1. Professional Search (08:45 AM)
              </span>
              <span className="text-[#929292] text-[11px]">Today</span>
            </div>
            <div className="text-[#686868] space-y-1 pl-5">
              <p>• Agent: <b className="text-[#171717]">Discovery + Grounding Engine</b></p>
              <p>• Query: <i>&ldquo;Criminal lawyer in Salem with appellate experience&rdquo;</i></p>
              <p>• Data Sources: <b className="text-[#171717]">Tamil Nadu Bar Council Directory, Verified Profiles, Service Taxonomy</b></p>
              <p>• Results: <b className="text-[#171717]">7 explainable matches identified</b> (zero hallucinations)</p>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[#D9D7D0] bg-[#F0EFEA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#171717] flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-2 text-[#111111]" />
                2. Network Recommendation (08:30 AM)
              </span>
              <span className="text-[#929292] text-[11px]">Today</span>
            </div>
            <div className="text-[#686868] space-y-1 pl-5">
              <p>• Agent: <b className="text-[#171717]">Recommendation Graph Engine</b></p>
              <p>• Type: Suggested peers for homepage feed</p>
              <p>• Data Sources: <b className="text-[#171717]">Shared Bar Council affiliations, mutual referrals, court appearances</b></p>
              <p>• Results: <b className="text-[#171717]">Adv. Ramesh Kumar, Adv. Priya Sharma</b></p>
            </div>
          </div>
        </div>
      </section>

      {/* THIS WEEK'S AI ACTIVITY SUMMARY */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
            METRICS
          </div>
          <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight">
            Weekly Activity Summary
          </h2>
        </div>
        <div className="divide-y divide-[#D9D7D0] text-xs">
          <div className="py-3 flex justify-between text-[#171717]">
            <span>Professional Search</span>
            <span className="font-mono text-[#686868]">3 searches executed</span>
          </div>
          <div className="py-3 flex justify-between text-[#171717]">
            <span>Service Request Matching</span>
            <span className="font-mono text-[#686868]">1 match coordinated</span>
          </div>
          <div className="py-3 flex justify-between text-[#171717]">
            <span>Referral Recommendations</span>
            <span className="font-mono text-[#686868]">2 recommendations generated</span>
          </div>
          <div className="py-3 flex justify-between text-[#171717]">
            <span>Profile Insights Grounding</span>
            <span className="font-mono text-[#686868]">1 view verified</span>
          </div>
        </div>
      </section>

      {/* DATA USED BY AI AGENTS */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
            DATA ACCESS AUDIT
          </div>
          <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight">
            Data Used by AI Agents
          </h2>
          <p className="text-xs text-[#686868] mt-0.5">
            The following data is strictly used for deterministic discovery under your explicit authorization:
          </p>
        </div>

        <ul className="space-y-2.5 text-xs text-[#171717]">
          <li className="flex items-center">
            <Check className="w-4 h-4 mr-2.5 text-[#2F6B4F] shrink-0" />
            <span>Your professional profile (full name, bar enrollment TN/2015/12345, bar association)</span>
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 mr-2.5 text-[#2F6B4F] shrink-0" />
            <span>Your declared practice areas and offered services</span>
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 mr-2.5 text-[#2F6B4F] shrink-0" />
            <span>Primary district & court appearances (High Court, Principal Sessions Court)</span>
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 mr-2.5 text-[#2F6B4F] shrink-0" />
            <span>Your search requirements (processed in memory, not permanently retained)</span>
          </li>
        </ul>
      </section>

      {/* HOW AI AGENTS WORK */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5 text-xs">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
            SYSTEM GOVERNANCE
          </div>
          <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight">
            How AI Agents Work (Zero-Hallucination Governance)
          </h2>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-[#F0EFEA] rounded-lg border border-[#D9D7D0]">
            <span className="font-bold text-[#171717] block mb-1">Discovery Agent</span>
            <p className="text-[#686868]">
              Translates natural language legal requirements into structured SQL parameters. Searches only verified databases and presents explicit match reasoning.
            </p>
          </div>

          <div className="p-4 bg-[#F0EFEA] rounded-lg border border-[#D9D7D0]">
            <span className="font-bold text-[#171717] block mb-1">Matching Agent</span>
            <p className="text-[#686868]">
              Matches formal service requests (court appearances, local counsel) to practitioners based on declared availability and jurisdiction. Never automatically contacts anyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
