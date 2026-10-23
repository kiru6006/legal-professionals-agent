import React from 'react'
import { Search, Sparkles, Check } from 'lucide-react'

export const ActivityPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#E0E0E0] pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-[#212121]">
          AI ACTIVITY & TRANSPARENCY
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          This audit log shows what AI agents are doing on your behalf, data sources accessed, and reasoning chains.
        </p>
      </div>

      {/* TODAY'S AI ACTIVITY */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
          TODAY&apos;S AI ACTIVITY
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0D47A1] flex items-center">
                <Search className="w-3.5 h-3.5 mr-1.5" />
                1. Professional Search (08:45 AM)
              </span>
              <span className="text-[#666666] text-[11px]">Today</span>
            </div>
            <div className="text-[#666666] space-y-1 pl-5">
              <p>• Agent: <b>Discovery + Grounding Engine</b></p>
              <p>• Query: <i>&ldquo;Criminal lawyer in Salem with appellate experience&rdquo;</i></p>
              <p>• Data Sources: <b>Tamil Nadu Bar Council Directory, Verified Profiles, Service Taxonomy</b></p>
              <p>• Results: <b>7 explainable matches identified</b> (zero hallucinations)</p>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0D47A1] flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                2. Network Recommendation (08:30 AM)
              </span>
              <span className="text-[#666666] text-[11px]">Today</span>
            </div>
            <div className="text-[#666666] space-y-1 pl-5">
              <p>• Agent: <b>Recommendation Graph Engine</b></p>
              <p>• Type: Suggested peers for homepage feed</p>
              <p>• Data Sources: <b>Shared Bar Council affiliations, mutual referrals, court appearances</b></p>
              <p>• Results: <b>Adv. Ramesh Kumar, Adv. Priya Sharma</b></p>
            </div>
          </div>
        </div>
      </section>

      {/* THIS WEEK'S AI ACTIVITY SUMMARY */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
          THIS WEEK&apos;S AI ACTIVITY
        </h2>
        <div className="divide-y divide-[#E0E0E0] text-xs">
          <div className="py-2.5 flex justify-between text-[#212121]">
            <span>Professional Search</span>
            <span className="font-mono text-[#546E7A]">3 searches executed</span>
          </div>
          <div className="py-2.5 flex justify-between text-[#212121]">
            <span>Service Request Matching</span>
            <span className="font-mono text-[#546E7A]">1 match coordinated</span>
          </div>
          <div className="py-2.5 flex justify-between text-[#212121]">
            <span>Referral Recommendations</span>
            <span className="font-mono text-[#546E7A]">2 recommendations generated</span>
          </div>
          <div className="py-2.5 flex justify-between text-[#212121]">
            <span>Profile Insights Grounding</span>
            <span className="font-mono text-[#546E7A]">1 view verified</span>
          </div>
        </div>
      </section>

      {/* DATA USED BY AI AGENTS */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
            DATA USED BY AI AGENTS
          </h2>
          <p className="text-xs text-[#666666]">
            The following data is strictly used for deterministic discovery under your authorization:
          </p>
        </div>

        <ul className="space-y-2 text-xs text-[#212121]">
          <li className="flex items-center text-[#2E7D32]">
            <Check className="w-4 h-4 mr-2 shrink-0" />
            <span>Your professional profile (full name, bar enrollment TN/2015/12345, bar association)</span>
          </li>
          <li className="flex items-center text-[#2E7D32]">
            <Check className="w-4 h-4 mr-2 shrink-0" />
            <span>Your declared practice areas and offered services</span>
          </li>
          <li className="flex items-center text-[#2E7D32]">
            <Check className="w-4 h-4 mr-2 shrink-0" />
            <span>Primary district & court appearances (High Court, Principal Sessions Court)</span>
          </li>
          <li className="flex items-center text-[#2E7D32]">
            <Check className="w-4 h-4 mr-2 shrink-0" />
            <span>Your search requirements (processed in memory, not permanently retained)</span>
          </li>
        </ul>
      </section>

      {/* HOW AI AGENTS WORK */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4 text-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
          HOW AI AGENTS WORK (ZERO HALLUCINATION GOVERNANCE)
        </h2>

        <div className="space-y-3">
          <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#E0E0E0]">
            <span className="font-bold text-[#0D47A1] block mb-1">Discovery Agent</span>
            <p className="text-[#666666]">
              Translates natural language legal requirements into structured SQL parameters. Searches only verified databases and presents explicit match reasoning.
            </p>
          </div>

          <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#E0E0E0]">
            <span className="font-bold text-[#0D47A1] block mb-1">Matching Agent</span>
            <p className="text-[#666666]">
              Matches formal service requests (court appearances, local counsel) to practitioners based on declared availability and jurisdiction. Never automatically contacts anyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
