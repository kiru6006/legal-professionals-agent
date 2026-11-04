import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'brand' | 'success' | 'danger' | 'destructive' | 'warning' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg select-none cursor-pointer'

  const variants = {
    // Primary: Google Blue #1A73E8
    primary: 'bg-[#1A73E8] text-white hover:bg-[#1557B0] active:bg-[#174EA6] focus-visible:ring-[#1A73E8] shadow-xs',
    // Secondary: White background, gray border, dark text
    secondary: 'bg-white border border-[#DADCE0] text-[#202124] hover:bg-[#F1F3F4] hover:border-[#BDC1C6] active:bg-[#E8EAED] focus-visible:ring-[#1A73E8] shadow-xs',
    // Brand: Crimson #C70234
    brand: 'bg-[#C70234] text-white hover:bg-[#B6263A] active:bg-[#9B032A] focus-visible:ring-[#C70234] shadow-xs',
    // Success: Green #188038
    success: 'bg-[#188038] text-white hover:bg-[#137333] active:bg-[#0D652D] focus-visible:ring-[#34A853] shadow-xs',
    // Danger: Red #D93025
    danger: 'bg-[#D93025] text-white hover:bg-[#C5221F] active:bg-[#B31412] focus-visible:ring-[#EA4335] shadow-xs',
    destructive: 'bg-[#D93025] text-white hover:bg-[#C5221F] active:bg-[#B31412] focus-visible:ring-[#EA4335] shadow-xs',
    // Warning: Yellow #FBBC05 with dark text
    warning: 'bg-[#FBBC05] text-[#202124] hover:bg-[#F9AB00] active:bg-[#E37400] focus-visible:ring-[#FBBC05] shadow-xs font-semibold',
    // Outline: White background with colored border
    outline: 'border border-[#1A73E8] bg-white text-[#1A73E8] hover:bg-[#E8F0FE] active:bg-[#D2E3FC]',
    // Ghost: Transparent with colored hover
    ghost: 'bg-transparent text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] active:bg-[#E8EAED]',
  }

  const sizes = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 py-2 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
    icon: 'h-9 w-9 p-0',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  )
}
