import React from 'react'

type AlertType = 'info' | 'success' | 'warning' | 'error'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertType
  title?: string
  children: React.ReactNode
  onClose?: () => void
}

const typeClasses: Record<AlertType, string> = {
  info: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-200',
  success: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800 text-success-800 dark:text-success-200',
  warning: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800 text-warning-800 dark:text-warning-200',
  error: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800 text-error-800 dark:text-error-200',
}

const typeIcons: Record<AlertType, string> = {
  info: 'ℹ️',
  success: '✓',
  warning: '⚠️',
  error: '✕',
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type = 'info', title, onClose, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border px-4 py-3 ${typeClasses[type]} ${className}`}
        role="alert"
        {...props}
      >
        <div className="flex items-start">
          <span className="mr-3 text-lg">{typeIcons[type]}</span>
          <div className="flex-1">
            {title && <h3 className="font-medium mb-1">{title}</h3>}
            <div className="text-sm">{children}</div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-3 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    )
  }
)

Alert.displayName = 'Alert'
