import React from 'react'
import type { EventType } from '@prisma/client'
import { EventType as EventTypeEnum } from '@prisma/client'

type BadgeColor = 'cyan' | 'amber' | 'magenta'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
  eventType?: EventType
  children: React.ReactNode
}

/**
 * Neo-brutalism Badge component
 * Features: pill shape, thick border, slight rotation, vibrant colors
 */
const colorMap: Record<BadgeColor, string> = {
  cyan: 'bg-primary text-ink border-ink',
  amber: 'bg-secondary text-ink border-ink',
  magenta: 'bg-accent text-white border-ink',
}

const eventTypeColors: Record<EventType, BadgeColor> = {
  [EventTypeEnum.APPLICATION]: 'cyan',
  [EventTypeEnum.SCREENING]: 'amber',
  [EventTypeEnum.INTERVIEW]: 'cyan',
  [EventTypeEnum.OFFER]: 'magenta',
  [EventTypeEnum.REJECTION]: 'magenta',
  [EventTypeEnum.HIRED]: 'magenta',
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ color, eventType, className = '', children, ...props }, ref) => {
    const finalColor = eventType ? eventTypeColors[eventType] : color || 'cyan'
    const baseClasses = [
      'inline-flex',
      'items-center',
      'px-4',
      'py-2',
      'border-2',
      'border-ink',
      'rounded-full',
      'text-sm',
      'font-bold',
      'rotate-3',
      'transition-transform',
      'duration-200',
      'hover:rotate-6',
      'prefers-reduced-motion:transition-none',
      'prefers-reduced-motion:rotate-0',
      'prefers-reduced-motion:hover:rotate-0',
    ].join(' ')

    return (
      <span
        ref={ref}
        className={`${baseClasses} ${colorMap[finalColor]} ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
export default Badge
