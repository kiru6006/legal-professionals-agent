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
    HIGH: 'bg-[#F0EFEA] text-[#2F6B4F] border-[#D9D7D0]',
    MEDIUM: 'bg-[#F0EFEA] text-[#9A6A16] border-[#D9D7D0]',
    LOW: 'bg-[#F0EFEA] text-[#929292] border-[#D9D7D0]',
  }

  const icons = {
    HIGH: <CheckCircle className="w-3.5 h-3.5 text-[#2F6B4F] mr-1.5" />,
    MEDIUM: <AlertTriangle className="w-3.5 h-3.5 text-[#9A6A16] mr-1.5" />,
    LOW: <HelpCircle className="w-3.5 h-3.5 text-[#929292] mr-1.5" />,
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border',
        styles[tier],
        className
      )}
    >
      {icons[tier]}
      {tier} CONFIDENCE {score !== undefined && `(${Math.round(score * 100)}%)`}
    </span>
  )
}
