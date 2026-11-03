import React, { useState } from 'react'
import { Sparkles, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const CommunityPage: React.FC = () => {
  const [activeArea, setActiveArea] = useState('Criminal Law')
  const [showSummaryModal, setShowSummaryModal] = useState(false)

  const practiceAreas = [
    'Criminal Law',
    'Civil Law',
    'Corporate Law',
    'Family Law',
    'Property Law',
    'Arbitration',
    'Taxation',
  ]

  const discussions = [
    {
      id: 'd1',
      title: 'Electronic Evidence in Cross-Examination: Section 65B & IT Act Admissibility',
      author: 'Adv. Meera Sharma',
      started: '2 weeks ago',
      participants: 34,
      messagesCount: 147,
      lastUpdated: '2 hours ago',
      practiceArea: 'Criminal Law',
      keyPoints: [
        'Admissibility of digital forensics reports and chain of custody scrutiny in trial courts',
        'Judicial precedents on email authentication and server metadata integrity',
        'Practical challenges in securing expert witness cross-examination in subordinate courts',
      ],
    },
    {
      id: 'd2',
      title: 'Recent Amendments to the DIA Act & Insolvency Timelines',
      author: 'Adv. Rajesh Iyer',
      started: '1 week ago',
      participants: 23,
      messagesCount: 89,
      lastUpdated: '1 day ago',
      practiceArea: 'Corporate Law',
      keyPoints: [
        'Impact on statutory insolvency resolution timelines under NCLT benches',
        'Committee of Creditors voting threshold interpretations',
        'Practical transition guidance for ongoing corporate debt restructuring',
      ],
    },
    {
      id: 'd3',
      title: 'Supreme Court Precedents on Adverse Possession & Burden of Proof',
      author: 'Adv. Suresh Kumar',
      started: '4 days ago',
      participants: 15,
      messagesCount: 52,
      lastUpdated: '1 day ago',
      practiceArea: 'Property Law',
      keyPoints: [
        'Evolving evidentiary threshold for animus possidendi in title disputes',
        'Practical impact on revenue records vs physical possession pleadings',
      ],
    },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="border-b border-[#D9D7D0] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-1">
          01 · KNOWLEDGE EXCHANGE
        </div>
        <h1 className="text-3xl font-editorial text-[#171717] font-normal tracking-tight">
          Professional <span className="italic font-serif">Community</span>
        </h1>
        <p className="text-xs text-[#686868] mt-1">
          Peer-to-peer practice area forums, trial case law discussions, and practical knowledge sharing.
        </p>
      </div>

      {/* Practice Area Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        {practiceAreas.map((pa) => (
          <button
            key={pa}
            type="button"
            onClick={() => setActiveArea(pa)}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
              activeArea === pa
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-[#FFFFFF] text-[#686868] border-[#D9D7D0] hover:bg-[#E8E6DF] hover:text-[#171717]'
            }`}
          >
            {pa}
          </button>
        ))}
      </div>

      {/* FEATURED DISCUSSIONS */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-0.5">
              ACTIVE TOPICS
            </div>
            <h2 className="text-lg font-editorial text-[#171717] font-normal tracking-tight">
              Featured Discussions
            </h2>
          </div>
          <span className="text-xs text-[#929292]">Permanent Knowledge Threads</span>
        </div>

        <div className="space-y-4">
          {discussions.map((d) => (
            <div
              key={d.id}
              className="border border-[#D9D7D0] rounded-lg p-5 bg-[#FFFFFF] hover:border-[#BDBAB1] transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#171717] bg-[#F0EFEA] px-2 py-0.5 rounded border border-[#D9D7D0]">
                      {d.practiceArea}
                    </span>
                    <h3 className="text-sm font-bold text-[#171717]">{d.title}</h3>
                  </div>
                  <p className="text-xs text-[#686868] mt-1.5">
                    Started by <b className="text-[#171717]">{d.author}</b> • {d.participants} professionals participating • {d.messagesCount} messages • Last active {d.lastUpdated}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowSummaryModal(true)}
                    className="h-8 text-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-[#111111]" />
                    AI Summary
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="h-8 text-xs font-semibold"
                  >
                    Join Discussion
                  </Button>
                </div>
              </div>

              {/* Key points preview */}
              <div className="bg-[#F0EFEA] p-3.5 rounded-lg border border-[#D9D7D0] text-xs text-[#686868] space-y-1">
                <span className="font-bold text-[#111111] block mb-1">Key Discussion Points:</span>
                {d.keyPoints.map((pt, pIdx) => (
                  <p key={pIdx} className="flex items-start">
                    <span className="text-[#111111] mr-2">•</span>
                    {pt}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY AI SUMMARY MODAL */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-lg border border-[#D9D7D0] overflow-hidden text-xs">
            <div className="p-4 border-b border-[#D9D7D0] bg-[#F0EFEA] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#171717]">
                  Discussion Summary: Electronic Evidence
                </h3>
                <span className="text-[11px] text-[#929292]">
                  34 professionals • 147 messages • Section 65B IT Act
                </span>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-[#686868] hover:text-[#171717] text-sm font-bold p-1 rounded hover:bg-[#E8E6DF]"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="p-3 bg-[#F0EFEA] border border-[#D9D7D0] text-[#9A6A16] rounded-lg text-[11px] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#9A6A16] mt-0.5" />
                <span>
                  <b>Statutory Disclaimer:</b> This summary is AI-generated for review efficiency only. Always independently verify active case citations and jurisdictional rulings.
                </span>
              </div>

              <div>
                <span className="font-bold text-[#111111] text-[10px] uppercase tracking-wider block mb-1">
                  KEY CONSENSUS OBSERVATIONS
                </span>
                <ul className="space-y-1.5 text-[#686868] pl-1">
                  <li>1. Digital forensics reports face heavy trial scrutiny regarding chain of custody and hash value preservation in police filings.</li>
                  <li>2. Secondary electronic evidence requires strict compliance with certificate procedures under Supreme Court precedent.</li>
                  <li>3. Practical challenge: Defense advocates in district headquarters face delays obtaining forensic laboratory inspection orders.</li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-[#111111] text-[10px] uppercase tracking-wider block mb-1">
                  DIFFERING VIEWPOINTS
                </span>
                <p className="text-[#686868] leading-relaxed">
                  <b className="text-[#171717]">View A (Majority):</b> Strict certificate condition precedent applies at stage of evidence tendering.<br />
                  <b className="text-[#171717]">View B (Minority):</b> Procedural defect can be cured by recalling witness prior to defense argument.
                </p>
              </div>
            </div>

            <div className="p-3.5 border-t border-[#D9D7D0] bg-[#F0EFEA] flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowSummaryModal(false)}
                className="h-8 text-xs"
              >
                Close Summary
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
