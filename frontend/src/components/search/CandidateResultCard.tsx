import React from 'react'
import { CheckCircle2, ShieldCheck, MapPin, Briefcase, Award } from 'lucide-react'
import { RecommendedCandidate } from '@/types'
import { GroundedBadge } from './GroundedBadge'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

interface CandidateResultCardProps {
  candidate: RecommendedCandidate
}

export const CandidateResultCard: React.FC<CandidateResultCardProps> = ({ candidate }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-navy-900 font-bold text-lg">
              {candidate.full_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-slate-900">{candidate.full_name}</h3>
                {candidate.is_bar_verified && (
                  <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Verified Bar Member
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-slate-500 mt-1 space-x-4">
                {candidate.enrollment_number && (
                  <span className="font-mono text-xs">{candidate.enrollment_number}</span>
                )}
                {candidate.primary_district && (
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {candidate.primary_district}
                  </span>
                )}
                {candidate.years_of_experience !== undefined && (
                  <span className="flex items-center">
                    <Briefcase className="w-3.5 h-3.5 mr-1" />
                    {candidate.years_of_experience} yrs exp
                  </span>
                )}
              </div>
            </div>
          </div>
          <GroundedBadge tier={candidate.confidence_tier} score={candidate.confidence_score} />
        </div>

        {/* Practice & Courts tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {candidate.matching_practice_areas.map((area, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-md font-medium"
            >
              {area}
            </span>
          ))}
          {candidate.matching_courts.map((court, idx) => (
            <span
              key={idx}
              className="bg-purple-50 text-purple-700 border border-purple-200 text-xs px-2.5 py-1 rounded-md font-medium"
            >
              {court}
            </span>
          ))}
          {candidate.matching_services.map((svc, idx) => (
            <span
              key={idx}
              className="bg-slate-100 text-slate-700 border border-slate-200 text-xs px-2.5 py-1 rounded-md font-medium"
            >
              {svc}
            </span>
          ))}
        </div>

        {/* AI Explainability Accordion / Grounding Box */}
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-700">
          <div className="font-semibold text-slate-800 flex items-center mb-2">
            <Award className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
            ✦ WHY RECOMMENDED BY AI:
          </div>
          <ul className="space-y-1">
            {candidate.grounding_reasons.map((reason, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 mt-0.5 shrink-0" />
                <span>{reason.claim}</span>
              </li>
            ))}
          </ul>

          {candidate.information_gaps && candidate.information_gaps.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-slate-200 text-slate-500">
              <span className="font-medium text-slate-600">Information Gaps: </span>
              {candidate.information_gaps.join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link to={`/profiles/${candidate.profile_id}`}>
          <Button variant="outline" size="sm">
            View Full Profile
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm">
            Connect
          </Button>
          <Button variant="primary" size="sm">
            Request Service
          </Button>
        </div>
      </div>
    </div>
  )
}
