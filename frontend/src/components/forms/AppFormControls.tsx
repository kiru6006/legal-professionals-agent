import React from 'react'
import { Check, AlertCircle, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ──────────────── 1. Input Field ────────────────
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  status?: 'default' | 'success' | 'error' | 'warning'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  status = 'default',
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  const statusBorderMap = {
    default: 'border-[#DADCE0] focus:border-[#1A73E8] focus:ring-[#1A73E8]',
    success: 'border-[#34A853] focus:border-[#34A853] focus:ring-[#34A853]',
    error: 'border-[#EA4335] focus:border-[#EA4335] focus:ring-[#EA4335]',
    warning: 'border-[#FBBC05] focus:border-[#FBBC05] focus:ring-[#FBBC05]',
  }

  return (
    <div className="space-y-1 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-[#202124]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[#5F6368] pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full bg-white text-xs text-[#202124] placeholder-[#80868B] border rounded-lg px-3.5 py-2.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-20 shadow-xs',
            leftIcon && 'pl-9',
            rightIcon && 'pr-9',
            statusBorderMap[status],
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-[#5F6368]">
            {rightIcon}
          </span>
        )}
      </div>
      {helperText && (
        <p
          className={cn(
            'text-[11px] flex items-center gap-1 mt-1 font-medium',
            status === 'default' && 'text-[#5F6368]',
            status === 'success' && 'text-[#188038]',
            status === 'error' && 'text-[#D93025]',
            status === 'warning' && 'text-[#B06000]'
          )}
        >
          {status === 'success' && <Check className="w-3.5 h-3.5" />}
          {status === 'error' && <AlertCircle className="w-3.5 h-3.5" />}
          {status === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
          {helperText}
        </p>
      )}
    </div>
  )
}

// ──────────────── 2. Toggle Switch ────────────────
export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  color?: 'blue' | 'crimson' | 'green'
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  color = 'blue',
}) => {
  const activeColorMap = {
    blue: 'bg-[#1A73E8]',
    crimson: 'bg-[#C70234]',
    green: 'bg-[#34A853]',
  }

  return (
    <label className={cn('inline-flex items-start gap-3 select-none cursor-pointer', disabled && 'opacity-50 pointer-events-none')}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'w-11 h-6 rounded-full transition-colors duration-200 relative p-0.5 mt-0.5',
          checked ? activeColorMap[color] : 'bg-[#DADCE0]'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </div>
      {(label || description) && (
        <div>
          {label && <span className="text-xs font-semibold text-[#202124] block">{label}</span>}
          {description && <span className="text-[11px] text-[#5F6368] block mt-0.5">{description}</span>}
        </div>
      )}
    </label>
  )
}

// ──────────────── 3. Custom Checkbox ────────────────
export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  color?: 'blue' | 'crimson' | 'green'
  disabled?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  color = 'blue',
  disabled = false,
}) => {
  const colorMap = {
    blue: 'bg-[#1A73E8] border-[#1A73E8]',
    crimson: 'bg-[#C70234] border-[#C70234]',
    green: 'bg-[#34A853] border-[#34A853]',
  }

  return (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer select-none text-xs text-[#202124]', disabled && 'opacity-50 pointer-events-none')}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'w-4 h-4 rounded border flex items-center justify-center transition-all',
          checked ? colorMap[color] : 'border-[#DADCE0] bg-white'
        )}
      >
        {checked && <Check className="w-3 h-3 text-white stroke-[3]" />}
      </div>
      {label && <span>{label}</span>}
    </label>
  )
}
