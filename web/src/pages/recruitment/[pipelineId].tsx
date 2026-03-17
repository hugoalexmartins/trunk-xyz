import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Timeline } from '@/components/Timeline'
import { useEventsByPipeline } from '@/hooks/useEvents'
import { UserShellLayout } from '@/components/user-shell/UserShellLayout'
import { Button } from '@/components/Button'
import { Card, CardBody } from '@/components/Card'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const C = { ink: '#0B1929', faint: '#8B99A6', muted: '#4A5A6A' }

function PipelineDetailContent() {
  const router = useRouter()
  const { pipelineId } = router.query
  const { data, isLoading } = useEventsByPipeline(pipelineId as string, 100)

  if (!pipelineId) {
    return <div>Loading...</div>
  }

  const events = data?.events || []

  return (
    <UserShellLayout>
      <div style={{ padding: '64px 48px', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
        <div style={{ marginBottom: 8 }}>
          <Link href="/recruitment">
            <Button variant="secondary" size="sm">← Back to Recruitment</Button>
          </Link>
        </div>

        <div style={{ marginBottom: 40, marginTop: 32 }}>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.04em', lineHeight: 1 }}>
            Recruitment Pipeline
          </h1>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.faint, margin: '0 0 20px', fontFamily: 'monospace' }}>
            {pipelineId}
          </p>
          <Link href={`/events/new?pipelineId=${pipelineId}`}>
            <Button variant="primary">Add Event</Button>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          <Card className="border-4 border-ink shadow-neo-md">
            <CardBody>
              <p className="text-neutral-dark text-sm font-bold">Total Events</p>
              <p className="text-3xl font-bold text-ink mt-2">{events.length}</p>
            </CardBody>
          </Card>
          {events.length > 0 && (
            <>
              <Card className="border-4 border-ink shadow-neo-md">
                <CardBody>
                  <p className="text-neutral-dark text-sm font-bold">First Event</p>
                  <p className="text-lg font-bold text-ink mt-2">
                    {new Date(events[events.length - 1].createdAt).toLocaleDateString()}
                  </p>
                </CardBody>
              </Card>
              <Card className="border-4 border-ink shadow-neo-md">
                <CardBody>
                  <p className="text-neutral-dark text-sm font-bold">Latest Event</p>
                  <p className="text-lg font-bold text-ink mt-2">
                    {new Date(events[0].createdAt).toLocaleDateString()}
                  </p>
                </CardBody>
              </Card>
            </>
          )}
        </div>

        <div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: C.ink, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
            Timeline
          </h2>
          <Timeline events={events} isLoading={isLoading} groupByPipeline={false} />
        </div>
      </div>

      <style>{`@media (max-width: 640px) { div[style*="padding: 64px 48px"] { padding: 32px 24px !important; } }`}</style>
    </UserShellLayout>
  )
}

export default function PipelineDetailPage() {
  const router = useRouter()
  const { pipelineId } = router.query
  const returnUrl = pipelineId ? `/recruitment/${pipelineId}` : '/recruitment'

  return (
    <>
      <Head>
        <title>Pipeline · trunk-xyz</title>
      </Head>
      <ProtectedRoute returnUrl={returnUrl}>
        <PipelineDetailContent />
      </ProtectedRoute>
    </>
  )
}
