import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={props.id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-3 py-2 rounded-lg border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 dark:placeholder-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 disabled:bg-neutral-100 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed ${
            error
              ? 'border-error-500 focus:ring-error-500'
              : 'border-neutral-300 dark:border-neutral-700'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-sm text-error-600 dark:text-error-400">{error}</span>}
        {helperText && !error && <span className="text-sm text-neutral-500 dark:text-neutral-400">{helperText}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
