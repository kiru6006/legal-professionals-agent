import React from 'react'
import { Search, Sparkles, Check, ShieldCheck, Zap } from 'lucide-react'
import { KPICard } from '@/components/cards/KPICard'

export const ActivityPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#DADCE0] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C70234] bg-[#FCE8EF] px-2 py-0.5 rounded border border-[#C70234]/20">
            01 · AUDIT LOG
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#80868B]">
            TRANSPARENCY & DETERMINISM
          </span>
        </div>
        <h1 className="text-3xl font-editorial text-[#202124] font-normal tracking-tight">
          AI Activity & <span className="italic font-serif text-[#C70234]">Transparency</span>
        </h1>
        <p className="text-xs text-[#5F6368] mt-1">
          This audit log shows deterministic AI actions performed on your behalf, data sources accessed, and grounding reasoning.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          color="blue"
          icon={<Search className="w-5 h-5 text-[#1A73E8]" />}
          metric="14"
          title="Searches Grounded"
          change="+18.5%"
          changeLabel="vs last week"
          supportingText="Zero hallucinations"
        />
        <KPICard
          color="purple"
          icon={<Sparkles className="w-5 h-5 text-[#A142F4]" />}
          metric="6"
          title="Recommendations"
          change="+12.0%"
          changeLabel="vs last week"
          supportingText="Bar graph validated"
        />
        <KPICard
          color="green"
          icon={<ShieldCheck className="w-5 h-5 text-[#34A853]" />}
          metric="100%"
          title="Verification Rate"
          change="Deterministic"
          changeLabel="100% verified"
          supportingText="Bar Council roll linked"
        />
        <KPICard
          color="crimson"
          icon={<Zap className="w-5 h-5 text-[#C70234]" />}
          metric="320ms"
          title="Avg AI Latency"
          change="-24.2%"
          changeType="positive"
          changeLabel="faster response"
          supportingText="Cached vector indexes"
        />
      </div>

      {/* TODAY'S AI ACTIVITY */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] border-t-4 border-t-[#1A73E8] p-6 space-y-5 shadow-sm">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A73E8] mb-0.5">
            LOGS (TODAY)
          </div>
          <h2 className="text-lg font-editorial text-[#202124] font-normal tracking-tight">
            Today&apos;s AI Activity
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl border border-[#DADCE0] border-l-4 border-l-[#1A73E8] bg-[#F8F9FA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#202124] flex items-center">
                <Search className="w-3.5 h-3.5 mr-2 text-[#1A73E8]" />
                1. Professional Search (08:45 AM)
              </span>
              <span className="text-[#1A73E8] bg-[#E8F0FE] px-2 py-0.5 rounded-full text-[10px] font-bold">Today</span>
            </div>
            <div className="text-[#5F6368] space-y-1 pl-5">
              <p>• Agent: <b className="text-[#202124]">Discovery + Grounding Engine</b></p>
              <p>• Query: <i>&ldquo;Criminal lawyer in Salem with appellate experience&rdquo;</i></p>
              <p>• Data Sources: <b className="text-[#202124]">Tamil Nadu Bar Council Directory, Verified Profiles, Service Taxonomy</b></p>
              <p>• Results: <b className="text-[#188038]">7 explainable matches identified</b> (zero hallucinations)</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#DADCE0] border-l-4 border-l-[#A142F4] bg-[#F8F9FA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#202124] flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-2 text-[#A142F4]" />
                2. Network Recommendation (08:30 AM)
              </span>
              <span className="text-[#A142F4] bg-[#F3E8FD] px-2 py-0.5 rounded-full text-[10px] font-bold">Today</span>
            </div>
            <div className="text-[#5F6368] space-y-1 pl-5">
              <p>• Agent: <b className="text-[#202124]">Recommendation Graph Engine</b></p>
              <p>• Type: Suggested peers for homepage feed</p>
              <p>• Data Sources: <b className="text-[#202124]">Shared Bar Council affiliations, mutual referrals, court appearances</b></p>
              <p>• Results: <b className="text-[#202124]">Adv. Ramesh Kumar, Adv. Priya Sharma</b></p>
            </div>
          </div>
        </div>
      </section>

      {/* DATA USED BY AI AGENTS */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] p-6 space-y-5 shadow-sm">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#C70234] mb-0.5">
            DATA ACCESS AUDIT
          </div>
          <h2 className="text-lg font-editorial text-[#202124] font-normal tracking-tight">
            Verified Data Sources
          </h2>
          <p className="text-xs text-[#5F6368] mt-0.5">
            Deterministic systems rely exclusively on confirmed bar registries and direct peer endorsements:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {[
            { title: 'Bar Council Registry', count: '30,000+ Records', color: 'border-l-[#188038] bg-[#E6F4EA]/40 text-[#188038]' },
            { title: 'Court Appearance Docket', count: '12 Jurisdictions', color: 'border-l-[#1A73E8] bg-[#E8F0FE]/40 text-[#1A73E8]' },
            { title: 'Peer Endorsements', count: '100% Deterministic', color: 'border-l-[#C70234] bg-[#FCE8EF]/40 text-[#C70234]' },
          ].map((ds, idx) => (
            <div key={idx} className={`p-4 rounded-xl border border-[#DADCE0] border-l-4 ${ds.color}`}>
              <div className="flex items-center gap-1.5 font-bold text-[#202124]">
                <Check className="w-3.5 h-3.5" />
                {ds.title}
              </div>
              <div className="text-[11px] font-semibold mt-1 opacity-90">{ds.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW AI AGENTS WORK */}
      <section className="bg-white rounded-2xl border border-[#DADCE0] p-6 space-y-5 text-xs shadow-sm">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#80868B] mb-0.5">
            SYSTEM GOVERNANCE
          </div>
          <h2 className="text-lg font-editorial text-[#202124] font-normal tracking-tight">
            How AI Agents Work (Zero-Hallucination Governance)
          </h2>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] border-l-4 border-l-[#1A73E8]">
            <span className="font-bold text-[#202124] block mb-1">Discovery Agent</span>
            <p className="text-[#5F6368]">
              Translates natural language legal requirements into structured SQL parameters. Searches only verified databases and presents explicit match reasoning.
            </p>
          </div>

          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] border-l-4 border-l-[#C70234]">
            <span className="font-bold text-[#202124] block mb-1">Matching Agent</span>
            <p className="text-[#5F6368]">
              Matches formal service requests (court appearances, local counsel) to practitioners based on declared availability and jurisdiction. Never automatically contacts anyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
