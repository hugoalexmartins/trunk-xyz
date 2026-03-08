import Link from 'next/link'
import { EventTypeBadge } from './EventTypeIcon'
import { Card, CardBody } from './Card'

interface EventCardProps {
  event: any
  showPipelineLink?: boolean
}

export function EventCard({ event, showPipelineLink = false }: EventCardProps) {
  const formattedDate = new Date(event.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const formattedTime = new Date(event.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Card className="hover:shadow-lg">
      <CardBody>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50">{event.title}</h3>
            {event.description && (
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">{event.description}</p>
            )}
          </div>
          <div className="flex-shrink-0">
            <EventTypeBadge type={event.type} />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center justify-between">
            <time dateTime={event.createdAt?.toString()}>
              {formattedDate} at {formattedTime}
            </time>
            {event.creator && (
              <span className="text-xs text-neutral-500 dark:text-neutral-500">
                by {event.creator.email}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            {showPipelineLink && event.pipelineId && (
              <Link
                href={`/recruitment/${event.pipelineId}`}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                View Pipeline
              </Link>
            )}

            <Link href={`/events/${event.id}`} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              Details
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
