import React, { useState } from 'react'
import { Sparkles, FileText, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { api } from '@/lib/api'

export const AIAssistPage: React.FC = () => {
  const [bioText, setBioText] = useState('')
  const [loading, setLoading] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [saved, setSaved] = useState(false)

  const sampleBio = `Adv. K. Sundaram, practicing in Madras High Court and Madurai Bench since 2012. 
Specialized in Civil Appeals, Constitutional Writ Petitions, and Property Disputes. 
Available for local appearances, filing caveat petitions, and preparing legal opinions for corporate clients in Chennai.`

  const handleExtract = async () => {
    if (!bioText.trim()) return
    setLoading(true)
    try {
      const res = await api.post('/ai/extract-profile', { raw_text: bioText })
      setExtractedData(res.data.extracted_draft || res.data.extracted)
    } catch (err) {
      console.error('AI Profile extraction error', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-[#D9D7D0] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-1">
          01 · ASSISTED EXTRACTION
        </div>
        <h1 className="text-3xl font-editorial text-[#171717] font-normal tracking-tight">
          AI-Assisted <span className="italic font-serif">Profile Setup</span>
        </h1>
        <p className="text-xs text-[#686868] mt-1">
          Paste your professional resume, bio, or summary. Our AI extracts structured practice areas, courts, and services for your review.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input */}
        <div className="bg-[#FFFFFF] border border-[#D9D7D0] rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#171717] flex items-center">
              <FileText className="w-4 h-4 mr-2 text-[#111111]" />
              Bio or Professional Profile Text
            </label>
            <button
              onClick={() => setBioText(sampleBio)}
              className="text-xs text-[#171717] hover:underline font-semibold"
            >
              Load Sample Bio
            </button>
          </div>

          <textarea
            rows={10}
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            placeholder="Paste your CV, bio, or list of practice areas and courts here..."
            className="w-full p-4 border border-[#D9D7D0] rounded-lg text-xs bg-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#111111] text-[#171717] placeholder-[#929292]"
          />

          <Button
            onClick={handleExtract}
            variant="primary"
            disabled={loading || !bioText.trim()}
            className="w-full flex items-center justify-center py-3 text-xs font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Extracting with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Extract Profile Details via AI
              </>
            )}
          </Button>
        </div>

        {/* Right Column: Interactive Approval */}
        <div className="bg-[#FFFFFF] border border-[#D9D7D0] rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-[#D9D7D0] pb-3">
              <h2 className="text-xs font-bold text-[#171717] flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-[#2F6B4F]" />
                Structured Details for Verification & Approval
              </h2>
            </div>

            {extractedData ? (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold text-[10px] text-[#929292] uppercase tracking-wider block mb-2">
                    Detected Practice Areas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.practice_areas?.map((item: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-[#F0EFEA] text-[#171717] border border-[#D9D7D0] text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-[10px] text-[#929292] uppercase tracking-wider block mb-2">
                    Detected Courts:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.court_names?.map((item: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-[#F0EFEA] text-[#686868] border border-[#D9D7D0] text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-[10px] text-[#929292] uppercase tracking-wider block mb-2">
                    Offered Services:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.service_names?.map((item: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-[#F0EFEA] text-[#171717] border border-[#D9D7D0] text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {extractedData.years_of_experience && (
                  <div>
                    <span className="font-bold text-[10px] text-[#929292] uppercase tracking-wider block mb-1">
                      Experience:
                    </span>
                    <span className="text-[#171717] font-semibold">{extractedData.years_of_experience} Years</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-center text-[#929292] text-xs">
                Extract details to preview and approve before saving to your profile.
              </div>
            )}
          </div>

          {extractedData && (
            <div className="pt-6 border-t border-[#D9D7D0] mt-6">
              {saved ? (
                <div className="bg-[#F0EFEA] text-[#2F6B4F] border border-[#D9D7D0] p-3 rounded-lg text-center text-xs font-semibold">
                  ✓ Profile successfully updated!
                </div>
              ) : (
                <Button
                  onClick={() => setSaved(true)}
                  className="w-full bg-[#2F6B4F] hover:bg-[#25573F] text-white flex items-center justify-center text-xs font-semibold"
                >
                  Confirm and Publish Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
