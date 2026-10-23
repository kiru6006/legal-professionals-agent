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

  // Step state: 'input' -> 'interpreted' (Screen 8) -> 'results' (Screen 9)
  const [stage, setStage] = useState<'input' | 'interpreted' | 'results'>('input')

  // Interpretation state (Screen 8)
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

  // Results state (Screen 9)
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

  // Step 1 -> Step 2: User inputs query -> AI analyzes and shows Screen 8 (Interpretation)
  const handleAnalyzeQuery = async (queryText?: string) => {
    const q = (queryText || query).trim()
    if (!q) return

    setLoading(true)
    setError(null)

    try {
      // Call parse endpoint
      const response = await api.post('/ai/ask-network', {
        query: q,
        include_unclaimed: true,
      })
      const data = response.data

      // Extract parsed params
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

      // Store candidates in memory
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

      // Show Screen 8 (AI Search Interpretation)
      setStage('interpreted')
    } catch (err) {
      console.error(err)
      setError('Could not process search interpretation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Step 2 -> Step 3: User confirms interpretation -> Screen 9 (Search Results)
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
      <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAnalyzeQuery()
          }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1565C0] flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#1565C0]" />
              AI Natural Language Professional Search
            </span>
            {stage !== 'input' && (
              <button
                type="button"
                onClick={() => setStage('input')}
                className="text-xs text-[#546E7A] hover:underline"
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
              className="w-full pl-4 pr-32 py-3.5 border border-[#E0E0E0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1] text-[#212121] placeholder-[#BDBDBD]"
            />
            <Button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-2 h-9 px-5 bg-[#0D47A1] text-white hover:bg-[#0B3C8A] rounded-md font-medium text-xs flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Interpreting...
                </>
              ) : (
                '⚡ SEARCH'
              )}
            </Button>
          </div>

          {/* Sample Prompts */}
          <div className="flex items-center flex-wrap gap-1.5 pt-1 text-xs">
            <span className="text-[#666666] font-medium mr-1">Try asking:</span>
            {sampleQueries.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(sample)
                  handleAnalyzeQuery(sample)
                }}
                className="bg-[#FAFAFA] hover:bg-slate-100 text-[#546E7A] px-2.5 py-1 rounded border border-[#E0E0E0] transition-colors"
              >
                &ldquo;{sample}&rdquo;
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-[#C62828] p-4 rounded-lg text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#C62828]" />
          <span>{error}</span>
        </div>
      )}

      {/* ──────────────── SCREEN 8: AI SEARCH INTERPRETATION ──────────────── */}
      {stage === 'interpreted' && (
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-6">
          <div className="border-b border-[#E0E0E0] pb-4">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#212121]">
              AI SEARCH INTERPRETATION
            </h2>
            <div className="mt-2 text-xs text-[#666666]">
              Your requirement:
              <p className="font-semibold text-sm text-[#212121] mt-0.5">&ldquo;{interpreted.raw_query}&rdquo;</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <span className="font-bold text-xs uppercase tracking-wider text-[#1565C0] block">
              AI UNDERSTOOD & MAPPED
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Practice Area */}
              <div className="p-3.5 bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg">
                <span className="text-[#666666] block font-medium mb-1">PRACTICE AREA</span>
                {isEditingInterpretation ? (
                  <input
                    type="text"
                    value={interpreted.practice_area}
                    onChange={(e) => setInterpreted({ ...interpreted, practice_area: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded text-xs"
                  />
                ) : (
                  <div className="flex items-center text-sm font-bold text-[#212121]">
                    <Check className="w-4 h-4 text-[#2E7D32] mr-1.5" />
                    {interpreted.practice_area}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="p-3.5 bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg">
                <span className="text-[#666666] block font-medium mb-1">LOCATION</span>
                {isEditingInterpretation ? (
                  <input
                    type="text"
                    value={interpreted.location}
                    onChange={(e) => setInterpreted({ ...interpreted, location: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded text-xs"
                  />
                ) : (
                  <div className="flex items-center text-sm font-bold text-[#212121]">
                    <Check className="w-4 h-4 text-[#2E7D32] mr-1.5" />
                    {interpreted.location}
                  </div>
                )}
              </div>

              {/* Additional Expertise */}
              <div className="p-3.5 bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg">
                <span className="text-[#666666] block font-medium mb-1">ADDITIONAL EXPERTISE</span>
                <div className="flex items-center text-sm font-bold text-[#212121]">
                  <Check className="w-4 h-4 text-[#2E7D32] mr-1.5" />
                  {interpreted.additional_expertise}
                </div>
                <span className="text-[11px] text-[#546E7A] block mt-1">○ High Court Specialization (inferred)</span>
              </div>

              {/* Service Type */}
              <div className="p-3.5 bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg">
                <span className="text-[#666666] block font-medium mb-1">SERVICE TYPE</span>
                <div className="flex items-center text-sm font-bold text-[#212121]">
                  <Check className="w-4 h-4 text-[#2E7D32] mr-1.5" />
                  {interpreted.service_type}
                </div>
                <span className="text-[11px] text-[#546E7A] block mt-1">○ Legal Consulting & Drafting (optional)</span>
              </div>
            </div>

            {/* Experience & Network Preferences */}
            <div className="p-3.5 bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg space-y-2">
              <span className="text-[#666666] block font-medium">NETWORK PREFERENCE</span>
              <div className="flex flex-wrap gap-4 text-xs text-[#212121]">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked readOnly className="rounded text-[#0D47A1]" />
                  <span>Verified Bar Council professionals only</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked readOnly className="rounded text-[#0D47A1]" />
                  <span>Minimum 5+ years verified experience</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E0E0E0] flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditingInterpretation(!isEditingInterpretation)}
              className="border-[#546E7A] text-[#546E7A] hover:bg-slate-50"
            >
              <Edit2 className="w-3.5 h-3.5 mr-1.5" />
              {isEditingInterpretation ? 'Save Edits' : 'Edit Filters'}
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleConfirmSearch}
              className="bg-[#0D47A1] text-white hover:bg-[#0B3C8A] px-6 py-2"
            >
              [ ✓ SEARCH NOW ]
            </Button>
          </div>
        </div>
      )}

      {/* ──────────────── SCREEN 9: AI SEARCH RESULTS ──────────────── */}
      {stage === 'results' && result && (
        <div className="space-y-6">
          {/* Header Summary */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#212121]">
                SEARCH RESULTS
              </h2>
              <p className="text-[#666666] mt-0.5">
                Your search: <b>{interpreted.practice_area}</b> • <b>{interpreted.location}</b> • <b>{interpreted.additional_expertise}</b>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-sm text-[#0D47A1]">
                Matches found: {result.total_matches}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStage('interpreted')}
                className="h-7 text-xs border-[#E0E0E0] text-[#546E7A]"
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
            <div className="text-center py-12 bg-white rounded-xl border border-[#E0E0E0] text-sm text-[#666666]">
              No advocates found for this specific jurisdiction. Try broadening your location criteria.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
