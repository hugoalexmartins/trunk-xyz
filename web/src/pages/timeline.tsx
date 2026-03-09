import { useState } from 'react'
import Link from 'next/link'
import { Timeline } from '@/components/Timeline'
import { EventFilters, type FilterState } from '@/components/EventFilters'
import { useEvents } from '@/hooks/useEvents'
import { Header } from '@/components/Header'
import { PageHeader } from '@/components/PageHeader'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function TimelinePageContent() {
  const [filters, setFilters] = useState<FilterState>({})
  const { data, isLoading, error } = useEvents(filters)

  const events = data?.events || []

  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <main>
        <Container className="py-12">
          {/* Page Header */}
          <PageHeader title="Timeline" description="View all events in chronological order">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/events/new">
                <Button variant="primary">New Event</Button>
              </Link>
              <Link href="/recruitment">
                <Button variant="secondary">Recruitment Pipeline</Button>
              </Link>
            </div>
          </PageHeader>

          {/* Filters */}
          <EventFilters onFilterChange={setFilters} />

          {/* Timeline */}
          <Timeline events={events} isLoading={isLoading} error={error} groupByPipeline={false} />
        </Container>
      </main>
    </div>
  )
}

export default function TimelinePage() {
  return (
    <ProtectedRoute returnUrl="/timeline">
      <TimelinePageContent />
    </ProtectedRoute>
  )
}
