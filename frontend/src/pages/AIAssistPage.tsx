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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AI-Assisted Profile Setup</h1>
        <p className="text-sm text-slate-500">
          Paste your professional resume, bio, or summary. Our AI extracts structured practice areas, courts, and services for your review.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-800 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-sky-500" />
              Raw Bio or Professional Profile Text
            </label>
            <button
              onClick={() => setBioText(sampleBio)}
              className="text-xs text-sky-600 hover:text-sky-700 font-medium"
            >
              Load Sample Bio
            </button>
          </div>

          <textarea
            rows={10}
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            placeholder="Paste your CV, bio, or list of practice areas and courts here..."
            className="w-full p-4 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
          />

          <Button
            onClick={handleExtract}
            disabled={loading || !bioText.trim()}
            className="w-full bg-navy-900 text-white hover:bg-navy-800 flex items-center justify-center py-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Extracting with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2 text-sky-400" />
                Extract Profile Details via AI
              </>
            )}
          </Button>
        </div>

        {/* Right Column: Interactive Approval */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center border-b pb-3">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
              Structured Details for Verification & Approval
            </h2>

            {extractedData ? (
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider block mb-1">
                    Detected Practice Areas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.practice_areas?.map((item: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-800 border border-blue-200 text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider block mb-1">
                    Detected Courts:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.court_names?.map((item: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-purple-50 text-purple-800 border border-purple-200 text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider block mb-1">
                    Offered Services:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.service_names?.map((item: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-800 border border-slate-200 text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {extractedData.years_of_experience && (
                  <div>
                    <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider block mb-1">
                      Experience:
                    </span>
                    <span className="text-slate-800 font-medium">{extractedData.years_of_experience} Years</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-center text-slate-400 text-sm">
                Extract details to preview and approve before saving to your profile.
              </div>
            )}
          </div>

          {extractedData && (
            <div className="pt-6 border-t mt-6">
              {saved ? (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-center text-sm font-medium">
                  ✓ Profile successfully updated!
                </div>
              ) : (
                <Button
                  onClick={() => setSaved(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center"
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
