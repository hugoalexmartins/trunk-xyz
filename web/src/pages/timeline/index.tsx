import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { Timeline } from '@/components/Timeline'
import { EventFilters, type FilterState } from '@/components/EventFilters'
import { useEvents } from '@/hooks/useEvents'
import { UserShellLayout } from '@/components/user-shell/UserShellLayout'
import { Button } from '@/components/Button'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const C = { ink: '#0B1929', faint: '#8B99A6' }

function TimelinePageContent() {
  const [filters, setFilters] = useState<FilterState>({})
  const { data, isLoading, error } = useEvents(filters)

  const events = data?.events || []

  return (
    <UserShellLayout>
      <div style={{ padding: '64px 48px', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.04em', lineHeight: 1 }}>
            Timeline
          </h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.faint, margin: '0 0 24px' }}>
            View all events in chronological order
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/applications/new">
              <Button variant="primary">New Application</Button>
            </Link>
            <Link href="/events/new">
              <Button variant="secondary">New Event</Button>
            </Link>
            <Link href="/recruitment">
              <Button variant="secondary">Recruitment Pipeline</Button>
            </Link>
          </div>
        </div>

        <EventFilters onFilterChange={setFilters} />

        <Timeline events={events} isLoading={isLoading} error={error} groupByPipeline={false} />
      </div>

      <style>{`@media (max-width: 640px) { div[style*="padding: 64px 48px"] { padding: 32px 24px !important; } }`}</style>
    </UserShellLayout>
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
