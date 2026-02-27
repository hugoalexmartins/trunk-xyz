import type { EventType } from '@prisma/client'
import { EventType as EventTypeEnum } from '@prisma/client'

interface EventTypeIconProps {
  type: EventType
  className?: string
}

export function EventTypeIcon({ type, className = '' }: EventTypeIconProps) {
  const icons: Record<EventType, string> = {
    [EventTypeEnum.APPLICATION]: '📋',
    [EventTypeEnum.SCREENING]: '📱',
    [EventTypeEnum.INTERVIEW]: '👤',
    [EventTypeEnum.OFFER]: '🎉',
    [EventTypeEnum.REJECTION]: '❌',
    [EventTypeEnum.HIRED]: '✅',
  }

  return <span className={className}>{icons[type]}</span>
}

export function EventTypeBadge({ type, className = '' }: EventTypeIconProps) {
  const colors: Record<EventType, string> = {
    [EventTypeEnum.APPLICATION]: 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200',
    [EventTypeEnum.SCREENING]: 'bg-warning-100 dark:bg-warning-900 text-warning-800 dark:text-warning-200',
    [EventTypeEnum.INTERVIEW]: 'bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200',
    [EventTypeEnum.OFFER]: 'bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-200',
    [EventTypeEnum.REJECTION]: 'bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200',
    [EventTypeEnum.HIRED]: 'bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-200',
  }

  const labels: Record<EventType, string> = {
    [EventTypeEnum.APPLICATION]: 'Application',
    [EventTypeEnum.SCREENING]: 'Screening',
    [EventTypeEnum.INTERVIEW]: 'Interview',
    [EventTypeEnum.OFFER]: 'Offer',
    [EventTypeEnum.REJECTION]: 'Rejection',
    [EventTypeEnum.HIRED]: 'Hired',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colors[type]} ${className}`}>
      <EventTypeIcon type={type} />
      {labels[type]}
    </span>
  )
}
