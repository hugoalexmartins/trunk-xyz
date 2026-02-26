import { useRouter } from 'next/router';
import Link from 'next/link';
import { EventForm } from '@/components/EventForm';
import { EventType } from '@prisma/client';

export default function NewEventPage() {
  const router = useRouter();
  const { pipelineId, type } = router.query;

  const handleSuccess = () => {
    if (pipelineId) {
      router.push(`/recruitment/${pipelineId}`);
    } else {
      router.push('/timeline');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/timeline" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Timeline
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Event</h1>
        <p className="text-gray-600 mb-8">Add a new event to the timeline</p>

        <EventForm
          pipelineId={pipelineId as string | undefined}
          eventType={type as EventType | undefined}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
