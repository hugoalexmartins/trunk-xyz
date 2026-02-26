import Link from 'next/link';
import { EventTypeBadge } from './EventTypeIcon';

interface EventCardProps {
  event: any;
  showPipelineLink?: boolean;
}

export function EventCard({ event, showPipelineLink = false }: EventCardProps) {
  const formattedDate = new Date(event.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = new Date(event.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{event.title}</h3>
          {event.description && <p className="text-gray-600 text-sm mt-1">{event.description}</p>}
        </div>
        <EventTypeBadge type={event.type} />
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
        <time dateTime={event.createdAt.toISOString()}>
          {formattedDate} at {formattedTime}
        </time>

        {showPipelineLink && event.pipelineId && (
          <Link
            href={`/recruitment/${event.pipelineId}`}
            className="text-blue-600 hover:underline"
          >
            View Pipeline
          </Link>
        )}

        <Link href={`/events/${event.id}`} className="text-blue-600 hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
}
