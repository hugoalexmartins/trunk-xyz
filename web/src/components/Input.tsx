import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

/**
 * Neo-brutalism Input component
 * Features: thick borders, large bold text, focus shadow, ice blue background
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={props.id} className="text-sm font-bold text-ink">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-4 py-3 border-4 border-ink rounded-none bg-neutral-light text-ink text-base font-bold placeholder-ink placeholder-opacity-60 transition-all duration-200 ease-out focus:outline-none focus:bg-white focus:shadow-neo-md sm:focus:shadow-neo-lg prefers-reduced-motion:transition-none disabled:bg-neutral-lighter disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-accent focus:ring-2 focus:ring-accent'
              : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-sm font-bold text-accent">{error}</span>}
        {helperText && !error && <span className="text-sm text-neutral-dark">{helperText}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
export default Input
