import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { Timeline } from '@/components/Timeline'
import { EventFilters, type FilterState } from '@/components/EventFilters'
import { useEvents } from '@/hooks/useEvents'
import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function TimelinePageContent() {
  const [filters, setFilters] = useState<FilterState>({})
  const { data, isLoading, error } = useEvents(filters)

  const events = data?.events || []

  return (
    <Layout>
      <Container className="py-12">
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

        <EventFilters onFilterChange={setFilters} />

        <Timeline events={events} isLoading={isLoading} error={error} groupByPipeline={false} />
      </Container>
    </Layout>
  )
}

export default function TimelinePage() {
  return (
    <>
      <Head>
        <title>Timeline · trunk-xyz</title>
      </Head>
      <ProtectedRoute returnUrl="/timeline">
        <TimelinePageContent />
      </ProtectedRoute>
    </>
  )
}
