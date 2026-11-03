import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] disabled:opacity-50 disabled:pointer-events-none rounded-lg'
  
  const variants = {
    // Primary: #111111 with white text, hover #222222
    primary: 'bg-[#111111] text-white hover:bg-[#222222] shadow-xs',
    // Secondary: White background with #D9D7D0 border, #171717 text, hover #E8E6DF
    secondary: 'bg-[#FFFFFF] border border-[#D9D7D0] text-[#171717] hover:bg-[#E8E6DF] shadow-xs',
    // Outline: Transparent/White with #D9D7D0 border, #171717 text, hover #E8E6DF
    outline: 'border border-[#D9D7D0] bg-[#FFFFFF] hover:bg-[#E8E6DF] text-[#171717]',
    // Ghost: Transparent with #171717 text, hover #E8E6DF
    ghost: 'hover:bg-[#E8E6DF] text-[#171717]',
    // Destructive: #A63D40 with white text
    destructive: 'bg-[#A63D40] text-white hover:bg-[#8F3437]',
  }

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
