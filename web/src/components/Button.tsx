import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

/**
 * Neo-brutalism Button component
 * Features: thick borders, hard shadows, mechanical press effect
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', className = '', disabled, children, ...props },
    ref
  ) => {
    // Base styles - shared across all variants
    const baseClasses = [
      'font-bold',
      'border-4',
      'border-ink',
      'rounded-none', // sharp corners for neo-brutalism
      'transition-all',
      'duration-200',
      'ease-out',
      'active:translate-x-0.5',
      'active:translate-y-0.5',
      'active:shadow-none',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-primary',
      'focus:ring-offset-2',
      'focus:ring-offset-canvas',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'prefers-reduced-motion:transition-none',
    ].join(' ')

    // Size variants
    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 sm:h-13 md:h-14 px-6 text-base',
      lg: 'h-14 sm:h-16 md:h-18 px-8 text-lg',
    }

    // Color variants with neo-brutalism shadows
    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-primary text-ink shadow-neo-md sm:shadow-neo-lg md:shadow-neo-xl hover:shadow-neo-lg sm:hover:shadow-neo-xl',
      secondary:
        'bg-secondary text-ink shadow-neo-md sm:shadow-neo-lg md:shadow-neo-xl hover:shadow-neo-lg sm:hover:shadow-neo-xl',
      outline:
        'bg-transparent text-ink border-ink hover:bg-neutral-light',
    }

    const allClasses = [baseClasses, sizeClasses[size], variantClasses[variant], className]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={allClasses}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export default Button
