import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className = '', children, ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium text-neutral-700 dark:text-neutral-300 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-error-600 dark:text-error-400">*</span>}
    </label>
  )
)

Label.displayName = 'Label'
