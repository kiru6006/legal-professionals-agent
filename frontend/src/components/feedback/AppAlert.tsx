import React from 'react'
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'brand'

export interface AppAlertProps {
  type?: AlertType
  title?: string
  children: React.ReactNode
  onClose?: () => void
  action?: React.ReactNode
  className?: string
}

export const AppAlert: React.FC<AppAlertProps> = ({
  type = 'info',
  title,
  children,
  onClose,
  action,
  className,
}) => {
  const styles: Record<AlertType, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
    info: {
      bg: 'bg-[#E8F0FE]',
      border: 'border-[#D2E3FC]',
      text: 'text-[#1A73E8]',
      icon: <Info className="w-4 h-4 text-[#1A73E8] shrink-0" />,
    },
    success: {
      bg: 'bg-[#E6F4EA]',
      border: 'border-[#CEEAD6]',
      text: 'text-[#188038]',
      icon: <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0" />,
    },
    warning: {
      bg: 'bg-[#FEF7E0]',
      border: 'border-[#FEEFC3]',
      text: 'text-[#B06000]',
      icon: <AlertTriangle className="w-4 h-4 text-[#B06000] shrink-0" />,
    },
    error: {
      bg: 'bg-[#FCE8E6]',
      border: 'border-[#FAD2CF]',
      text: 'text-[#D93025]',
      icon: <AlertCircle className="w-4 h-4 text-[#D93025] shrink-0" />,
    },
    brand: {
      bg: 'bg-[#FCE8EF]',
      border: 'border-[#F8CCD7]',
      text: 'text-[#C70234]',
      icon: <Info className="w-4 h-4 text-[#C70234] shrink-0" />,
    },
  }

  const current = styles[type] || styles.info

  return (
    <div
      className={cn(
        'p-4 rounded-xl border flex items-start justify-between gap-3 text-xs leading-relaxed shadow-xs',
        current.bg,
        current.border,
        className
      )}
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5">{current.icon}</span>
        <div>
          {title && <h4 className={cn('font-bold mb-0.5 text-xs', current.text)}>{title}</h4>}
          <div className="text-[#3C4043]">{children}</div>
          {action && <div className="mt-2.5">{action}</div>}
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-[#5F6368] hover:text-[#202124] p-1 rounded-md transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
