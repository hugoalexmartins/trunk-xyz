'use client'

import { useState } from 'react'
import type { EventType, EventStatus } from '@prisma/client'
import { EventType as EventTypeEnum, EventStatus as EventStatusEnum } from '@prisma/client'
import { useCreateEvent } from '@/hooks/useEventMutations'
import { Card, CardBody } from './Card'
import { Label } from './Label'
import { Button } from './Button'
import { Alert } from './Alert'

interface EventFormProps {
  pipelineId?: string
  eventType?: EventType
  onSuccess?: () => void
}

export function EventForm({ pipelineId, eventType, onSuccess }: EventFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<EventType>(eventType || EventTypeEnum.APPLICATION)
  const [status, setStatus] = useState<EventStatus>(EventStatusEnum.PENDING)
  const [metadata, setMetadata] = useState<Record<string, unknown>>({})

  const createEvent = useCreateEvent()
  const isLoading = createEvent.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createEvent.mutateAsync({
        title,
        description: description || undefined,
        type,
        status,
        pipelineId: pipelineId || undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      })

      // Reset form
      setTitle('')
      setDescription('')
      setStatus(EventStatusEnum.PENDING)
      setMetadata({})

      onSuccess?.()
    } catch (error) {
      console.error('Failed to create event:', error)
    }
  }

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" required>
              Title
            </Label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event details (optional)"
              rows={3}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="type" required>
                Type
              </Label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as EventType)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.values(EventTypeEnum).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as EventStatus)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
            <Alert type="error" title="Error creating event">
              {createEvent.error.message}
            </Alert>
          )}

          <div className="pt-4">
            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
