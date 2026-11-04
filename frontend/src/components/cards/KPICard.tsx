import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { AppCard, CardColor } from './AppCard'
import { cn } from '@/lib/utils'

export interface KPICardProps {
  title: string
  metric: string | number
  change?: string | number
  changeType?: 'positive' | 'negative' | 'neutral'
  changeLabel?: string
  supportingText?: string
  icon: React.ReactNode
  color?: CardColor
  badgeText?: string
  className?: string
  chartSnippet?: React.ReactNode
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  metric,
  change,
  changeType = 'positive',
  changeLabel = 'vs last month',
  supportingText,
  icon,
  color = 'blue',
  badgeText,
  className,
  chartSnippet,
}) => {
  const iconThemeMap: Record<CardColor, { bg: string; text: string }> = {
    blue: { bg: 'bg-[#E8F0FE]', text: 'text-[#1A73E8]' },
    crimson: { bg: 'bg-[#FCE8EF]', text: 'text-[#C70234]' },
    green: { bg: 'bg-[#E6F4EA]', text: 'text-[#188038]' },
    yellow: { bg: 'bg-[#FEF7E0]', text: 'text-[#B06000]' },
    purple: { bg: 'bg-[#F3E8FD]', text: 'text-[#8430C9]' },
    cyan: { bg: 'bg-[#E0F7FA]', text: 'text-[#00838F]' },
    neutral: { bg: 'bg-[#F1F3F4]', text: 'text-[#5F6368]' },
  }

  const iconStyle = iconThemeMap[color] || iconThemeMap.blue

  return (
    <AppCard
      variant="top-accent"
      accentColor={color}
      interactive
      className={cn('flex flex-col justify-between h-full', className)}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-xs',
                iconStyle.bg,
                iconStyle.text
              )}
            >
              {icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#5F6368] uppercase tracking-wider">
                {title}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight mt-0.5">
                {metric}
              </h3>
            </div>
          </div>

          {badgeText && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F1F3F4] text-[#5F6368] uppercase tracking-wider border border-[#DADCE0]">
              {badgeText}
            </span>
          )}
        </div>

        {/* Change Indicator & Supporting Text */}
        {(change !== undefined || supportingText) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            {change !== undefined && (
              <span
                className={cn(
                  'inline-flex items-center font-bold px-1.5 py-0.5 rounded text-[11px]',
                  changeType === 'positive' && 'bg-[#E6F4EA] text-[#188038]',
                  changeType === 'negative' && 'bg-[#FCE8E6] text-[#D93025]',
                  changeType === 'neutral' && 'bg-[#F1F3F4] text-[#5F6368]'
                )}
              >
                {changeType === 'positive' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
                {changeType === 'negative' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                {change}
              </span>
            )}
            <span className="text-[#80868B]">{changeLabel}</span>
          </div>
        )}

        {supportingText && (
          <p className="text-xs text-[#5F6368] mt-2 border-t border-[#F1F3F4] pt-2">
            {supportingText}
          </p>
        )}
      </div>

      {chartSnippet && <div className="mt-3 pt-2">{chartSnippet}</div>}
    </AppCard>
  )
}

