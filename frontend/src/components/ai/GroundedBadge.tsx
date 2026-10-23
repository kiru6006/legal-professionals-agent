import React from 'react'
import { CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GroundedBadgeProps {
  tier: 'HIGH' | 'MEDIUM' | 'LOW'
  score?: number
  className?: string
}

export const GroundedBadge: React.FC<GroundedBadgeProps> = ({ tier, score, className }) => {
  const styles = {
    HIGH: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    MEDIUM: 'bg-amber-50 text-amber-800 border-amber-300',
    LOW: 'bg-slate-50 text-slate-700 border-slate-300',
  }

  const icons = {
    HIGH: <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mr-1" />,
    MEDIUM: <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mr-1" />,
    LOW: <HelpCircle className="w-3.5 h-3.5 text-slate-500 mr-1" />,
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        styles[tier],
        className
      )}
    >
      {icons[tier]}
      {tier} CONFIDENCE {score !== undefined && `(${Math.round(score * 100)}%)`}
    </span>
  )
}
