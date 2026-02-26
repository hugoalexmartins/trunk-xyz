import { useRouter } from 'next/router';
import Link from 'next/link';
import { Timeline } from '@/components/Timeline';
import { useEventsByPipeline } from '@/hooks/useEvents';

export default function PipelineDetailPage() {
  const router = useRouter();
  const { pipelineId } = router.query;
  const { data, isLoading } = useEventsByPipeline(pipelineId as string, 100);

  if (!pipelineId) {
    return <div>Loading...</div>;
  }

  const events = data?.events || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/recruitment" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Recruitment
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruitment Pipeline</h1>
          <p className="text-gray-600 font-mono text-sm">{pipelineId}</p>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/events/new?pipelineId=${pipelineId}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Event
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-sm">Total Events</p>
            <p className="text-2xl font-bold">{events.length}</p>
          </div>
          {events.length > 0 && (
            <>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">First Event</p>
                <p className="text-sm font-mono">
                  {new Date(events[events.length - 1].createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">Latest Event</p>
                <p className="text-sm font-mono">
                  {new Date(events[0].createdAt).toLocaleDateString()}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Timeline */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Timeline</h2>
        <Timeline events={events} isLoading={isLoading} groupByPipeline={false} />
      </div>
    </div>
  );
}
