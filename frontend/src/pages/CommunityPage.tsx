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
      <div className="border-b border-[#E0E0E0] pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-[#212121]">
          PROFESSIONAL COMMUNITY
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
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
            className={`px-3 py-1.5 rounded-md border font-medium transition-colors ${
              activeArea === pa
                ? 'bg-[#0D47A1] text-white border-[#0D47A1]'
                : 'bg-white text-[#546E7A] border-[#E0E0E0] hover:bg-slate-50'
            }`}
          >
            [ {pa} ]
          </button>
        ))}
      </div>

      {/* FEATURED DISCUSSIONS */}
      <section className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
            FEATURED DISCUSSIONS
          </h2>
          <span className="text-xs text-[#666666]">Permanent Knowledge Threads</span>
        </div>

        <div className="space-y-4">
          {discussions.map((d) => (
            <div
              key={d.id}
              className="border border-[#E0E0E0] rounded-lg p-5 bg-[#FAFAFA] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#0D47A1] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {d.practiceArea}
                    </span>
                    <h3 className="text-sm font-bold text-[#212121]">{d.title}</h3>
                  </div>
                  <p className="text-xs text-[#666666] mt-1">
                    Started by <b>{d.author}</b> • {d.participants} professionals participating • {d.messagesCount} messages • Last active {d.lastUpdated}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSummaryModal(true)}
                    className="h-8 text-xs border-[#1565C0] text-[#1565C0] bg-white hover:bg-blue-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    ⚡ AI Summary
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="h-8 text-xs bg-[#0D47A1] text-white hover:bg-[#0B3C8A]"
                  >
                    [ JOIN DISCUSSION ]
                  </Button>
                </div>
              </div>

              {/* Key points preview */}
              <div className="bg-white p-3 rounded-md border border-[#E0E0E0] text-xs text-[#546E7A] space-y-1">
                <span className="font-semibold text-[#212121] block">Key Discussion Points:</span>
                {d.keyPoints.map((pt, pIdx) => (
                  <p key={pIdx} className="flex items-start">
                    <span className="text-[#0D47A1] mr-1.5">•</span>
                    {pt}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCREEN 16: COMMUNITY AI SUMMARY MODAL */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-xl border border-[#E0E0E0] overflow-hidden text-xs">
            <div className="p-4 border-b border-[#E0E0E0] bg-[#FAFAFA] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#212121]">
                  DISCUSSION SUMMARY: Electronic Evidence
                </h3>
                <span className="text-[11px] text-[#666666]">
                  34 professionals • 147 messages • Section 65B IT Act
                </span>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-[11px] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                <span>
                  <b>Statutory Disclaimer:</b> This summary is AI-generated for review efficiency only. Always independently verify active case citations and jurisdictional rulings.
                </span>
              </div>

              <div>
                <span className="font-bold text-[#0D47A1] uppercase tracking-wider block mb-1">
                  KEY CONSENSUS OBSERVATIONS
                </span>
                <ul className="space-y-1.5 text-[#546E7A] pl-1">
                  <li>1. Digital forensics reports face heavy trial scrutiny regarding chain of custody and hash value preservation in police filings.</li>
                  <li>2. Secondary electronic evidence requires strict compliance with certificate procedures under Supreme Court precedent.</li>
                  <li>3. Practical challenge: Defense advocates in district headquarters face delays obtaining forensic laboratory inspection orders.</li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-[#0D47A1] uppercase tracking-wider block mb-1">
                  DIFFERING VIEWPOINTS
                </span>
                <p className="text-[#546E7A] leading-relaxed">
                  <b>View A (Majority):</b> Strict certificate condition precedent applies at stage of evidence tendering.<br />
                  <b>View B (Minority):</b> Procedural defect can be cured by recalling witness prior to defense argument.
                </p>
              </div>
            </div>

            <div className="p-3.5 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSummaryModal(false)}
                className="h-8 text-xs border-[#E0E0E0]"
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
