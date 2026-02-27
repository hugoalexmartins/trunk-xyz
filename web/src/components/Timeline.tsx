'use client'

import { EventCard } from './EventCard'
import { Alert } from './Alert'
import { Card, CardHeader, CardBody } from './Card'

interface TimelineProps {
  events: any[]
  isLoading?: boolean
  error?: Error | null
  groupByPipeline?: boolean
}

export function Timeline({ events, isLoading = false, error = null, groupByPipeline = false }: TimelineProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert type="error" title="Error loading events">
        {error.message}
      </Alert>
    )
  }

  if (events.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg font-medium text-neutral-900 dark:text-neutral-50">No events found</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Try adjusting your filters or create a new event</p>
      </div>
    )
  }

  if (!groupByPipeline) {
    return (
      <div className="space-y-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} showPipelineLink={true} />
        ))}
      </div>
    )
  }

  // Group by pipeline
  const grouped = events.reduce(
    (acc, event) => {
      const key = event.pipelineId || 'standalone'
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(event)
      return acc
    },
    {} as Record<string, any[]>
  )

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([pipelineId, pipelineEvents]) => (
        <Card key={pipelineId}>
          {pipelineId !== 'standalone' && (
            <CardHeader className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="font-semibold text-base text-neutral-900 dark:text-neutral-50">
                Pipeline: {pipelineId.substring(0, 8)}... ({(pipelineEvents as any[]).length} events)
              </h3>
            </CardHeader>
          )}
          <CardBody className="space-y-4">
            {(pipelineEvents as any[]).map((event: any) => (
              <EventCard key={event.id} event={event} showPipelineLink={pipelineId !== 'standalone'} />
            ))}
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
