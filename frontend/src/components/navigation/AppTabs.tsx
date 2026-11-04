import React from 'react'
import { cn } from '@/lib/utils'

export type TabVariant = 'underlined' | 'pill' | 'segmented' | 'brand'

export interface TabItem {
  id: string
  label: string
  count?: number
  icon?: React.ReactNode
}

export interface AppTabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  variant?: TabVariant
  className?: string
}

export const AppTabs: React.FC<AppTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underlined',
  className,
}) => {
  // Underlined Tabs (Google-inspired)
  if (variant === 'underlined') {
    return (
      <div className={cn('border-b border-[#DADCE0] flex space-x-6', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer relative',
                isActive
                  ? 'border-[#1A73E8] text-[#1A73E8]'
                  : 'border-transparent text-[#5F6368] hover:text-[#202124] hover:border-[#BDC1C6]'
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'text-[10px] font-bold px-1.5 py-0.2 rounded-full',
                    isActive ? 'bg-[#E8F0FE] text-[#1A73E8]' : 'bg-[#F1F3F4] text-[#5F6368]'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Pill Tabs
  if (variant === 'pill') {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
                isActive
                  ? 'bg-[#1A73E8] text-white shadow-xs'
                  : 'bg-[#F1F3F4] text-[#5F6368] hover:bg-[#E8EAED] hover:text-[#202124]'
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'text-[10px] font-bold px-1.5 py-0.2 rounded-full',
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E8EAED] text-[#5F6368]'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Brand Crimson Tabs
  if (variant === 'brand') {
    return (
      <div className={cn('border-b border-[#DADCE0] flex space-x-6', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer',
                isActive
                  ? 'border-[#C70234] text-[#C70234]'
                  : 'border-transparent text-[#5F6368] hover:text-[#202124]'
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'text-[10px] font-bold px-1.5 py-0.2 rounded-full',
                    isActive ? 'bg-[#FCE8EF] text-[#C70234]' : 'bg-[#F1F3F4] text-[#5F6368]'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Segmented Control
  return (
    <div
      className={cn(
        'inline-flex p-1 bg-[#F1F3F4] rounded-xl border border-[#DADCE0] gap-1',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
              isActive
                ? 'bg-white text-[#202124] shadow-xs'
                : 'text-[#5F6368] hover:text-[#202124]'
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#F1F3F4] text-[#5F6368]">
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
