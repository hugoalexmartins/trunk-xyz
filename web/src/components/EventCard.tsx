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
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-ink">{event.title}</h3>
            {event.description && (
              <p className="text-neutral-dark text-sm mt-3">{event.description}</p>
            )}
          </div>
          <div className="flex-shrink-0">
            <EventTypeBadge type={event.type} />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-6 pt-4 border-t-4 border-ink text-sm text-neutral-dark">
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
                className="text-primary font-bold hover:text-secondary transition-colors"
              >
                View Pipeline
              </Link>
            )}

            <Link href={`/events/${event.id}`} className="text-primary font-bold hover:text-secondary transition-colors">
              Details
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
