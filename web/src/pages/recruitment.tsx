import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Timeline } from '@/components/Timeline';
import { useEvents } from '@/hooks/useEvents';
import { EventType } from '@prisma/client';

interface PipelineGroup {
  pipelineId: string;
  eventCount: number;
  latestDate: Date;
}

export default function RecruitmentPage() {
  const [pipelines, setPipelines] = useState<PipelineGroup[]>([]);
  const { data, isLoading } = useEvents({ type: EventType.APPLICATION });

  useEffect(() => {
    if (data?.events) {
      const grouped: Record<string, PipelineGroup> = {};

      data.events.forEach((event: any) => {
        if (event.pipelineId) {
          const eventDate = new Date(event.createdAt);
          if (!grouped[event.pipelineId]) {
            grouped[event.pipelineId] = {
              pipelineId: event.pipelineId,
              eventCount: 0,
              latestDate: eventDate,
            };
          }
          grouped[event.pipelineId].eventCount++;
          if (eventDate > grouped[event.pipelineId].latestDate) {
            grouped[event.pipelineId].latestDate = eventDate;
          }
        }
      });

      setPipelines(Object.values(grouped));
    }
  }, [data?.events]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruitment Pipeline</h1>
          <p className="text-gray-600">Track candidate journeys through the recruitment process</p>
          <div className="mt-4 flex gap-2">
            <Link
              href="/events/new?type=APPLICATION"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              New Application
            </Link>
            <Link href="/timeline" className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300">
              All Events
            </Link>
          </div>
        </div>

        {/* Pipelines List */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {isLoading ? (
            <div className="text-center py-8">Loading pipelines...</div>
          ) : pipelines.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No recruitment pipelines yet</p>
              <p className="text-sm">Create your first application to get started</p>
            </div>
          ) : (
            pipelines.map((pipeline) => (
              <Link
                key={pipeline.pipelineId}
                href={`/recruitment/${pipeline.pipelineId}`}
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {pipeline.pipelineId.substring(0, 8)}...
                    </h3>
                    <p className="text-sm text-gray-600">
                      {pipeline.eventCount} event{pipeline.eventCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <time className="text-sm text-gray-500">
                    {pipeline.latestDate.toLocaleDateString()}
                  </time>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Recent Events */}
        {data?.events && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <Timeline events={data.events.slice(0, 10)} groupByPipeline={true} />
          </div>
        )}
      </div>
    </div>
  );
}
