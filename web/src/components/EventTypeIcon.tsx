import type { EventType } from '@prisma/client';
import { EventType as EventTypeEnum } from '@prisma/client';

interface EventTypeIconProps {
  type: EventType;
  className?: string;
}

export function EventTypeIcon({ type, className = '' }: EventTypeIconProps) {
  const icons: Record<EventType, string> = {
    [EventTypeEnum.APPLICATION]: '📋',
    [EventTypeEnum.SCREENING]: '📱',
    [EventTypeEnum.INTERVIEW]: '👤',
    [EventTypeEnum.OFFER]: '🎉',
    [EventTypeEnum.REJECTION]: '❌',
    [EventTypeEnum.HIRED]: '✅',
  };

  return <span className={className}>{icons[type]}</span>;
}

export function EventTypeBadge({ type, className = '' }: EventTypeIconProps) {
  const colors: Record<EventType, string> = {
    [EventTypeEnum.APPLICATION]: 'bg-blue-100 text-blue-800',
    [EventTypeEnum.SCREENING]: 'bg-yellow-100 text-yellow-800',
    [EventTypeEnum.INTERVIEW]: 'bg-purple-100 text-purple-800',
    [EventTypeEnum.OFFER]: 'bg-green-100 text-green-800',
    [EventTypeEnum.REJECTION]: 'bg-red-100 text-red-800',
    [EventTypeEnum.HIRED]: 'bg-emerald-100 text-emerald-800',
  };

  const labels: Record<EventType, string> = {
    [EventTypeEnum.APPLICATION]: 'Application',
    [EventTypeEnum.SCREENING]: 'Screening',
    [EventTypeEnum.INTERVIEW]: 'Interview',
    [EventTypeEnum.OFFER]: 'Offer',
    [EventTypeEnum.REJECTION]: 'Rejection',
    [EventTypeEnum.HIRED]: 'Hired',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors[type]} ${className}`}
    >
      <EventTypeIcon type={type} />
      {labels[type]}
    </span>
  );
}
