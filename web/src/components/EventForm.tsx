'use client';

import { useState } from 'react';
import type { EventType, EventStatus } from '@prisma/client';
import { EventType as EventTypeEnum, EventStatus as EventStatusEnum } from '@prisma/client';
import { useCreateEvent } from '@/hooks/useEventMutations';

interface EventFormProps {
  pipelineId?: string;
  eventType?: EventType;
  onSuccess?: () => void;
}

export function EventForm({ pipelineId, eventType, onSuccess }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EventType>(eventType || EventTypeEnum.APPLICATION);
  const [status, setStatus] = useState<EventStatus>(EventStatusEnum.PENDING);
  const [metadata, setMetadata] = useState<Record<string, unknown>>({});

  const createEvent = useCreateEvent();
  const isLoading = createEvent.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createEvent.mutateAsync({
        title,
        description: description || undefined,
        type,
        status,
        pipelineId: pipelineId || undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setStatus(EventStatusEnum.PENDING);
      setMetadata({});

      onSuccess?.();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event details (optional)"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type *
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as EventType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.values(EventTypeEnum).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as EventStatus)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.values(EventStatusEnum).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {createEvent.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {createEvent.error.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  );
}
