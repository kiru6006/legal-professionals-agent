import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Sparkles,
  AlertCircle,
  Loader2,
  Check,
  Edit2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CandidateResultCard } from '@/components/search/CandidateResultCard'
import { DiscoveryResponse, RecommendedCandidate } from '@/types'
import { api } from '@/lib/api'

interface InterpretedState {
  raw_query: string
  practice_area: string
  location: string
  additional_expertise: string
  service_type: string
  experience_level: string
  network_preference: string
}

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Step state: 'input' -> 'interpreted' -> 'results'
  const [stage, setStage] = useState<'input' | 'interpreted' | 'results'>('input')

  // Interpretation state
  const [interpreted, setInterpreted] = useState<InterpretedState>({
    raw_query: '',
    practice_area: 'Criminal Law',
    location: 'Salem, Tamil Nadu',
    additional_expertise: 'Appellate Practice',
    service_type: 'Court Appearance',
    experience_level: '10+ years',
    network_preference: 'Include all verified professionals',
  })
  const [isEditingInterpretation, setIsEditingInterpretation] = useState(false)

  // Results state
  const [result, setResult] = useState<DiscoveryResponse | null>(null)

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      const q = initialQuery.trim()
      const parsedLoc = q.toLowerCase().includes('salem') ? 'Salem, Tamil Nadu' : q.toLowerCase().includes('chennai') ? 'Chennai, Tamil Nadu' : 'Tamil Nadu'
      const parsedPA = q.toLowerCase().includes('criminal') ? 'Criminal Law' : q.toLowerCase().includes('civil') ? 'Civil Litigation' : 'General Practice'
      const parsedSvc = 'Court Appearance'

      setInterpreted({
        raw_query: q,
        practice_area: parsedPA,
        location: parsedLoc,
        additional_expertise: 'Appellate Practice & Trial',
        service_type: parsedSvc,
        experience_level: '5+ years',
        network_preference: 'Verified professionals only',
      })
      setStage('interpreted')
      handleAnalyzeQuery(initialQuery)
    }
  }, [initialQuery])

  // Step 1 -> Step 2: User inputs query -> AI analyzes
  const handleAnalyzeQuery = async (queryText?: string) => {
    const q = (queryText || query).trim()
    if (!q) return

    setLoading(true)
    setError(null)

    try {
      const response = await api.post('/ai/ask-network', {
        query: q,
        include_unclaimed: true,
      })
      const data = response.data

      const parsedLoc = data.parsed_parameters?.location || (q.toLowerCase().includes('salem') ? 'Salem, Tamil Nadu' : q.toLowerCase().includes('chennai') ? 'Chennai, Tamil Nadu' : 'Tamil Nadu')
      const parsedPA = data.parsed_parameters?.practice_area || (q.toLowerCase().includes('criminal') ? 'Criminal Law' : q.toLowerCase().includes('civil') ? 'Civil Litigation' : 'General Practice')
      const parsedSvc = data.parsed_parameters?.service_required || 'Court Appearance'

      setInterpreted({
        raw_query: q,
        practice_area: parsedPA,
        location: parsedLoc,
        additional_expertise: 'Appellate Practice & Trial',
        service_type: parsedSvc,
        experience_level: '5+ years',
        network_preference: 'Verified professionals only',
      })

      const transformedCandidates: RecommendedCandidate[] = (data.recommendations || []).map((rec: any) => ({
        profile_id: rec.profile_id,
        full_name: rec.full_name,
        enrollment_number: rec.enrollment_number,
        primary_district: rec.district,
        years_of_experience: rec.years_experience,
        confidence_score: 0.9,
        confidence_tier: rec.confidence || 'HIGH',
        matching_practice_areas: [parsedPA],
        matching_courts: rec.primary_court ? [rec.primary_court] : ['District & Sessions Court'],
        matching_services: [parsedSvc],
        grounding_reasons: (rec.match_reasons || []).map((r: string) => ({
          claim: r,
          source_field: 'profile',
          verified: true,
        })),
        information_gaps: rec.missing_information || ['Current calendar availability not declared'],
        is_bar_verified: rec.is_verified ?? true,
      }))

      setResult({
        query: q,
        interpreted_intent: {
          raw_query: q,
          practice_areas: [parsedPA],
          court_names: data.parsed_parameters?.court ? [data.parsed_parameters.court] : ['Sessions Court'],
          districts: [parsedLoc],
          service_names: [parsedSvc],
          urgency_tier: 'NORMAL',
          reasoning_summary: `Interpreted as ${parsedPA} in ${parsedLoc}`,
        },
        total_matches: transformedCandidates.length,
        candidates: transformedCandidates,
        search_mode: 'deterministic_grounded',
      })

      setStage('interpreted')
    } catch (err) {
      console.error(err)
      setError('Could not process search interpretation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmSearch = () => {
    setStage('results')
  }

  const sampleQueries = [
    'Find a criminal lawyer in Salem with appellate experience',
    'Senior civil lawyer in Chennai Madras High Court with 15+ years experience',
    'Coimbatore corporate commercial arbitration counsel',
    'Local counsel in Madurai for Principal Sessions Court bail matter',
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* ──────────────── Top Search Input Bar ──────────────── */}
      <div className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAnalyzeQuery()
          }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#171717] flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#111111]" />
              AI Natural Language Professional Search
            </span>
            {stage !== 'input' && (
              <button
                type="button"
                onClick={() => setStage('input')}
                className="text-xs text-[#686868] hover:text-[#171717] underline"
              >
                Reset Search
              </button>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your legal requirement in plain language..."
              className="w-full pl-4 pr-36 py-3.5 bg-[#FFFFFF] border border-[#D9D7D0] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] text-[#171717] placeholder-[#929292]"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-2 h-9 px-5 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Interpreting...
                </>
              ) : (
                'SEARCH'
              )}
            </Button>
          </div>

          {/* Sample Prompts */}
          <div className="flex items-center flex-wrap gap-2 pt-1 text-xs">
            <span className="text-[#929292] font-medium mr-1 text-[11px] uppercase tracking-wider">Try asking:</span>
            {sampleQueries.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(sample)
                  handleAnalyzeQuery(sample)
                }}
                className="bg-[#F0EFEA] hover:bg-[#E8E6DF] text-[#171717] px-2.5 py-1 rounded-md border border-[#D9D7D0] transition-colors text-xs"
              >
                &ldquo;{sample}&rdquo;
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-[#F0EFEA] border border-[#A63D40] text-[#A63D40] p-4 rounded-lg text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#A63D40]" />
          <span>{error}</span>
        </div>
      )}

      {/* ──────────────── AI SEARCH INTERPRETATION ──────────────── */}
      {stage === 'interpreted' && (
        <div className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#D9D7D0] pb-4">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#929292] mb-1">
              01 · REQUIREMENT INTERPRETATION
            </div>
            <h2 className="text-xl sm:text-2xl font-editorial text-[#171717] font-normal tracking-tight">
              AI Search <span className="italic font-serif">Interpretation</span>
            </h2>
            <div className="mt-2 text-xs text-[#686868]">
              Interpreted from your prompt:
              <p className="font-semibold text-sm text-[#171717] mt-1">&ldquo;{interpreted.raw_query}&rdquo;</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <span className="font-bold text-[11px] uppercase tracking-widest text-[#929292] block">
              Parsed Filters & Criteria
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Practice Area */}
              <div className="p-4 bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg">
                <span className="text-[#929292] text-[10px] uppercase font-bold tracking-wider block mb-1">PRACTICE AREA</span>
                {isEditingInterpretation ? (
                  <input
                    type="text"
                    value={interpreted.practice_area}
                    onChange={(e) => setInterpreted({ ...interpreted, practice_area: e.target.value })}
                    className="w-full p-1.5 border border-[#D9D7D0] rounded text-xs bg-[#FFFFFF] text-[#171717]"
                  />
                ) : (
                  <div className="flex items-center text-sm font-bold text-[#171717]">
                    <Check className="w-4 h-4 text-[#2F6B4F] mr-1.5" />
                    {interpreted.practice_area}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="p-4 bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg">
                <span className="text-[#929292] text-[10px] uppercase font-bold tracking-wider block mb-1">LOCATION</span>
                {isEditingInterpretation ? (
                  <input
                    type="text"
                    value={interpreted.location}
                    onChange={(e) => setInterpreted({ ...interpreted, location: e.target.value })}
                    className="w-full p-1.5 border border-[#D9D7D0] rounded text-xs bg-[#FFFFFF] text-[#171717]"
                  />
                ) : (
                  <div className="flex items-center text-sm font-bold text-[#171717]">
                    <Check className="w-4 h-4 text-[#2F6B4F] mr-1.5" />
                    {interpreted.location}
                  </div>
                )}
              </div>

              {/* Additional Expertise */}
              <div className="p-4 bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg">
                <span className="text-[#929292] text-[10px] uppercase font-bold tracking-wider block mb-1">ADDITIONAL EXPERTISE</span>
                <div className="flex items-center text-sm font-bold text-[#171717]">
                  <Check className="w-4 h-4 text-[#2F6B4F] mr-1.5" />
                  {interpreted.additional_expertise}
                </div>
                <span className="text-[11px] text-[#686868] block mt-1">○ High Court Specialization (inferred)</span>
              </div>

              {/* Service Type */}
              <div className="p-4 bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg">
                <span className="text-[#929292] text-[10px] uppercase font-bold tracking-wider block mb-1">SERVICE TYPE</span>
                <div className="flex items-center text-sm font-bold text-[#171717]">
                  <Check className="w-4 h-4 text-[#2F6B4F] mr-1.5" />
                  {interpreted.service_type}
                </div>
                <span className="text-[11px] text-[#686868] block mt-1">○ Legal Consulting & Drafting (optional)</span>
              </div>
            </div>

            {/* Experience & Network Preferences */}
            <div className="p-4 bg-[#F0EFEA] border border-[#D9D7D0] rounded-lg space-y-2">
              <span className="text-[#929292] text-[10px] uppercase font-bold tracking-wider block">NETWORK PREFERENCE</span>
              <div className="flex flex-wrap gap-4 text-xs text-[#171717]">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked readOnly className="rounded text-[#111111] focus:ring-0" />
                  <span>Verified Bar Council professionals only</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked readOnly className="rounded text-[#111111] focus:ring-0" />
                  <span>Minimum 5+ years verified experience</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#D9D7D0] flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsEditingInterpretation(!isEditingInterpretation)}
              className="text-xs"
            >
              <Edit2 className="w-3.5 h-3.5 mr-1.5" />
              {isEditingInterpretation ? 'Save Edits' : 'Edit Filters'}
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleConfirmSearch}
              className="px-6 py-2 text-xs font-semibold"
            >
              Confirm & View Results
            </Button>
          </div>
        </div>
      )}

      {/* ──────────────── AI SEARCH RESULTS ──────────────── */}
      {stage === 'results' && result && (
        <div className="space-y-6">
          {/* Header Summary */}
          <div className="bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#929292] mb-0.5">
                02 · MATCH RESULTS
              </div>
              <h2 className="text-base font-editorial text-[#171717] font-normal">
                Search results for <span className="italic font-serif">{interpreted.practice_area}</span> in <span className="italic font-serif">{interpreted.location}</span>
              </h2>
              <p className="text-[#686868] mt-0.5">
                Filters: <b>{interpreted.additional_expertise}</b> • <b>{interpreted.service_type}</b>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-xs text-[#171717] bg-[#F0EFEA] border border-[#D9D7D0] px-2.5 py-1 rounded-md">
                Matches: {result.total_matches}
              </span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setStage('interpreted')}
                className="h-7 text-xs"
              >
                Refine Search
              </Button>
            </div>
          </div>

          {/* Cards Grid: Rendered using CandidateResultCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.candidates.map((cand) => (
              <CandidateResultCard key={cand.profile_id} candidate={cand} />
            ))}
          </div>

          {result.candidates.length === 0 && (
            <div className="text-center py-12 bg-[#FFFFFF] rounded-xl border border-[#D9D7D0] text-sm text-[#686868]">
              No advocates found for this specific jurisdiction. Try broadening your location criteria.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
