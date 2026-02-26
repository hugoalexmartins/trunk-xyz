import { useState } from 'react';
import Link from 'next/link';
import { Timeline } from '@/components/Timeline';
import { EventFilters, type FilterState } from '@/components/EventFilters';
import { useEvents } from '@/hooks/useEvents';

export default function TimelinePage() {
  const [filters, setFilters] = useState<FilterState>({});
  const { data, isLoading, error } = useEvents(filters);

  const events = data?.events || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Timeline</h1>
          <p className="text-gray-600">View all events in chronological order</p>
          <div className="mt-4 flex gap-2">
            <Link href="/events/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              New Event
            </Link>
            <Link href="/recruitment" className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300">
              Recruitment Pipeline
            </Link>
          </div>
        </div>

        {/* Filters */}
        <EventFilters onFilterChange={setFilters} />

        {/* Timeline */}
        <Timeline events={events} isLoading={isLoading} error={error} groupByPipeline={false} />
      </div>
    </div>
  );
}
