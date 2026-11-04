import React from 'react'
import { cn } from '@/lib/utils'

export type CardVariant = 'default' | 'full-border' | 'top-accent' | 'left-accent' | 'selected'
export type CardColor = 'blue' | 'crimson' | 'green' | 'yellow' | 'purple' | 'cyan' | 'neutral'

export interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  accentColor?: CardColor
  interactive?: boolean
  selected?: boolean
  children: React.ReactNode
}

export const AppCard: React.FC<AppCardProps> = ({
  variant = 'default',
  accentColor = 'blue',
  interactive = false,
  selected = false,
  className,
  children,
  ...props
}) => {
  const colorMap: Record<CardColor, { border: string; bgSoft: string; bar: string; ring: string }> = {
    blue: {
      border: 'border-[#4285F4]',
      bgSoft: 'bg-[#E8F0FE]/50',
      bar: 'bg-[#4285F4]',
      ring: 'ring-[#4285F4]',
    },
    crimson: {
      border: 'border-[#C70234]',
      bgSoft: 'bg-[#FCE8EF]/50',
      bar: 'bg-[#C70234]',
      ring: 'ring-[#C70234]',
    },
    green: {
      border: 'border-[#34A853]',
      bgSoft: 'bg-[#E6F4EA]/50',
      bar: 'bg-[#34A853]',
      ring: 'ring-[#34A853]',
    },
    yellow: {
      border: 'border-[#FBBC05]',
      bgSoft: 'bg-[#FEF7E0]/50',
      bar: 'bg-[#FBBC05]',
      ring: 'ring-[#FBBC05]',
    },
    purple: {
      border: 'border-[#A142F4]',
      bgSoft: 'bg-[#F3E8FD]/50',
      bar: 'bg-[#A142F4]',
      ring: 'ring-[#A142F4]',
    },
    cyan: {
      border: 'border-[#00ACC1]',
      bgSoft: 'bg-[#E0F7FA]/50',
      bar: 'bg-[#00ACC1]',
      ring: 'ring-[#00ACC1]',
    },
    neutral: {
      border: 'border-[#BDC1C6]',
      bgSoft: 'bg-[#F1F3F4]/50',
      bar: 'bg-[#80868B]',
      ring: 'ring-[#80868B]',
    },
  }

  const currentTheme = colorMap[accentColor] || colorMap.blue
  const actualVariant = selected ? 'selected' : variant

  // Base styling for all cards
  let cardClass = 'bg-white rounded-xl shadow-card transition-all duration-200 relative overflow-hidden '

  if (interactive) {
    cardClass += 'hover:shadow-card-hover hover:border-[#BDC1C6] cursor-pointer '
  }

  // Variant A: Full colored border card
  if (actualVariant === 'full-border') {
    cardClass += `border-2 ${currentTheme.border} p-5 `
  }
  // Variant B: Top accent card (1px neutral border, 4px colored top strip)
  else if (actualVariant === 'top-accent') {
    cardClass += 'border border-[#DADCE0] p-5 pt-6 '
  }
  // Variant C: Left accent card (neutral border, 4px left vertical indicator)
  else if (actualVariant === 'left-accent') {
    cardClass += 'border border-[#DADCE0] p-5 pl-6 '
  }
  // Variant D: Selected card (2px colored border, tinted background)
  else if (actualVariant === 'selected') {
    cardClass += `border-2 ${currentTheme.border} ${currentTheme.bgSoft} p-5 ring-1 ${currentTheme.ring} `
  }
  // Default variant: 1px visible border
  else {
    cardClass += 'border border-[#DADCE0] p-5 '
  }

  return (
    <div className={cn(cardClass, className)} {...props}>
      {/* Top accent indicator strip */}
      {actualVariant === 'top-accent' && (
        <span
          className={cn('absolute top-0 left-0 right-0 h-1.5', currentTheme.bar)}
          aria-hidden="true"
        />
      )}

      {/* Left accent indicator strip */}
      {actualVariant === 'left-accent' && (
        <span
          className={cn('absolute top-0 bottom-0 left-0 w-1.5', currentTheme.bar)}
          aria-hidden="true"
        />
      )}

      {children}
    </div>
  )
}

