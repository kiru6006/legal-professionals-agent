import React from 'react'
import { cn } from '@/lib/utils'

export type BadgeColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'crimson' | 'cyan' | 'neutral'

export interface StatusBadgeProps {
  color?: BadgeColor
  dot?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  color = 'blue',
  dot = false,
  icon,
  children,
  className,
  size = 'md',
}) => {
  const colorStyles: Record<BadgeColor, { bg: string; text: string; border: string; dot: string }> = {
    blue: {
      bg: 'bg-[#E8F0FE]',
      text: 'text-[#1A73E8]',
      border: 'border-[#D2E3FC]',
      dot: 'bg-[#1A73E8]',
    },
    green: {
      bg: 'bg-[#E6F4EA]',
      text: 'text-[#188038]',
      border: 'border-[#CEEAD6]',
      dot: 'bg-[#34A853]',
    },
    red: {
      bg: 'bg-[#FCE8E6]',
      text: 'text-[#D93025]',
      border: 'border-[#FAD2CF]',
      dot: 'bg-[#EA4335]',
    },
    yellow: {
      bg: 'bg-[#FEF7E0]',
      text: 'text-[#B06000]',
      border: 'border-[#FEEFC3]',
      dot: 'bg-[#FBBC05]',
    },
    purple: {
      bg: 'bg-[#F3E8FD]',
      text: 'text-[#8430C9]',
      border: 'border-[#E9D2FD]',
      dot: 'bg-[#A142F4]',
    },
    crimson: {
      bg: 'bg-[#FCE8EF]',
      text: 'text-[#C70234]',
      border: 'border-[#F8CCD7]',
      dot: 'bg-[#C70234]',
    },
    cyan: {
      bg: 'bg-[#E0F7FA]',
      text: 'text-[#00838F]',
      border: 'border-[#B2EBF2]',
      dot: 'bg-[#00ACC1]',
    },
    neutral: {
      bg: 'bg-[#F1F3F4]',
      text: 'text-[#5F6368]',
      border: 'border-[#DADCE0]',
      dot: 'bg-[#80868B]',
    },
  }

  const current = colorStyles[color] || colorStyles.blue

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border transition-colors',
        current.bg,
        current.text,
        current.border,
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', current.dot)}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}
