import React, { useState } from 'react'
import { Search as SearchIcon, Sparkles, Filter, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CandidateResultCard } from '@/components/search/CandidateResultCard'
import { DiscoveryResponse } from '@/types'
import { api } from '@/lib/api'

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DiscoveryResponse | null>(null)

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await api.post<DiscoveryResponse>('/ai/ask-network', {
        query: query.trim(),
        include_unclaimed: true,
      })
      setResult(response.data)
    } catch (err: unknown) {
      console.error(err)
      setError('Search failed. Please ensure the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  const sampleQueries = [
    'Criminal appeal advocate in Madurai for Principal Sessions Court',
    'Senior civil lawyer in Chennai Madras High Court with 15+ years experience',
    'Coimbatore corporate commercial arbitration counsel',
    'Salem advocate for local court appearance and bail application',
  ]

  return (
    <div className="space-y-8">
      {/* Search Input Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex items-center space-x-2 text-navy-900 font-semibold text-lg">
            <Sparkles className="w-5 h-5 text-sky-500" />
            <span>AI Professional Search</span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you need (e.g. 'I need a criminal lawyer in Salem for Principal Sessions Court')..."
              className="w-full pl-12 pr-32 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800 placeholder-slate-400 text-base"
            />
            <SearchIcon className="w-6 h-6 text-slate-400 absolute left-4 top-4" />
            <Button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2.5 top-2.5 h-11 px-6 bg-navy-900 text-white hover:bg-navy-800 rounded-lg flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Find Advocates'
              )}
            </Button>
          </div>

          {/* Sample Prompts */}
          <div className="flex items-center flex-wrap gap-2 pt-1">
            <span className="text-xs text-slate-400 font-medium">Try asking:</span>
            {sampleQueries.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(sample)
                }}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full transition-colors"
              >
                &ldquo;{sample}&rdquo;
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Error notification */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center space-x-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Interpreted Intent summary */}
          <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-4 text-xs text-sky-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-sky-900 uppercase tracking-wider text-[11px] block">
                ✦ AI Query Interpretation
              </span>
              <p className="text-slate-700">{result.interpreted_intent.reasoning_summary}</p>
              <div className="flex flex-wrap gap-2 pt-1 text-slate-600">
                {result.interpreted_intent.districts.length > 0 && (
                  <span>Districts: <b>{result.interpreted_intent.districts.join(', ')}</b></span>
                )}
                {result.interpreted_intent.practice_areas.length > 0 && (
                  <span>Areas: <b>{result.interpreted_intent.practice_areas.join(', ')}</b></span>
                )}
                {result.interpreted_intent.court_names.length > 0 && (
                  <span>Courts: <b>{result.interpreted_intent.court_names.join(', ')}</b></span>
                )}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-slate-500 block">Found</span>
              <span className="text-xl font-extrabold text-navy-900">{result.total_matches}</span>
              <span className="text-slate-500 text-xs"> advocates</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.candidates.map((cand) => (
              <CandidateResultCard key={cand.profile_id} candidate={cand} />
            ))}
          </div>

          {result.candidates.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
              No matching advocates found for your specific criteria. Try broadening your query terms.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
