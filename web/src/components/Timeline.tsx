'use client';

import { EventCard } from './EventCard';

interface TimelineProps {
  events: any[];
  isLoading?: boolean;
  error?: Error | null;
  groupByPipeline?: boolean;
}

export function Timeline({ events, isLoading = false, error = null, groupByPipeline = false }: TimelineProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
        Error loading events: {error.message}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="text-lg">No events found</p>
        <p className="text-sm">Try adjusting your filters or create a new event</p>
      </div>
    );
  }

  if (!groupByPipeline) {
    return (
      <div className="space-y-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} showPipelineLink={true} />
        ))}
      </div>
    );
  }

  // Group by pipeline
  const grouped = events.reduce(
    (acc, event) => {
      const key = event.pipelineId || 'standalone';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(event);
      return acc;
    },
    {} as Record<string, any[]>
  );

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([pipelineId, pipelineEvents]) => (
        <div key={pipelineId} className="border border-gray-300 rounded-lg overflow-hidden">
          {pipelineId !== 'standalone' && (
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="font-semibold text-sm">
                Pipeline: {pipelineId.substring(0, 8)}... ({(pipelineEvents as any[]).length} events)
              </h3>
            </div>
          )}
          <div className="p-4 space-y-4">
            {(pipelineEvents as any[]).map((event: any) => (
              <EventCard key={event.id} event={event} showPipelineLink={pipelineId !== 'standalone'} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
