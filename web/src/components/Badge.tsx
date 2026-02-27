import React from 'react'
import type { EventType } from '@prisma/client'
import { EventType as EventTypeEnum } from '@prisma/client'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  eventType?: EventType
  children: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200',
  success: 'bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-200',
  warning: 'bg-warning-100 dark:bg-warning-900 text-warning-800 dark:text-warning-200',
  error: 'bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200',
  info: 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200',
}

const eventTypeVariants: Record<EventType, BadgeVariant> = {
  [EventTypeEnum.APPLICATION]: 'info',
  [EventTypeEnum.SCREENING]: 'warning',
  [EventTypeEnum.INTERVIEW]: 'info',
  [EventTypeEnum.OFFER]: 'success',
  [EventTypeEnum.REJECTION]: 'error',
  [EventTypeEnum.HIRED]: 'success',
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, eventType, className = '', children, ...props }, ref) => {
    const finalVariant = eventType ? eventTypeVariants[eventType] : variant || 'default'
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'

    return (
      <span ref={ref} className={`${baseClasses} ${variantClasses[finalVariant]} ${className}`} {...props}>
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
