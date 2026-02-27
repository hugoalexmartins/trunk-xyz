import { useRouter } from 'next/router'
import Link from 'next/link'
import { Timeline } from '@/components/Timeline'
import { useEventsByPipeline } from '@/hooks/useEvents'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { Card, CardBody } from '@/components/Card'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function PipelineDetailContent() {
  const router = useRouter()
  const { pipelineId } = router.query
  const { data, isLoading } = useEventsByPipeline(pipelineId as string, 100)

  if (!pipelineId) {
    return <div>Loading...</div>
  }

  const events = data?.events || []

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      <main>
        <Container className="py-8">
          {/* Back Link */}
          <div className="mb-6">
            <Link href="/recruitment">
              <Button variant="secondary" className="mb-6">
                ← Back to Recruitment
              </Button>
            </Link>
          </div>

          {/* Page Header */}
          <PageHeader title="Recruitment Pipeline">
            <p className="text-neutral-600 dark:text-neutral-400 font-mono text-sm mb-4">{pipelineId}</p>
            <Link href={`/events/new?pipelineId=${pipelineId}`}>
              <Button variant="primary">Add Event</Button>
            </Link>
          </PageHeader>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardBody>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-2">{events.length}</p>
              </CardBody>
            </Card>
            {events.length > 0 && (
              <>
                <Card>
                  <CardBody>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">First Event</p>
                    <p className="text-lg font-mono text-neutral-900 dark:text-neutral-50 mt-2">
                      {new Date(events[events.length - 1].createdAt).toLocaleDateString()}
                    </p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">Latest Event</p>
                    <p className="text-lg font-mono text-neutral-900 dark:text-neutral-50 mt-2">
                      {new Date(events[0].createdAt).toLocaleDateString()}
                    </p>
                  </CardBody>
                </Card>
              </>
            )}
          </div>

          {/* Timeline */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Timeline</h2>
            <Timeline events={events} isLoading={isLoading} groupByPipeline={false} />
          </div>
        </Container>
      </main>
    </div>
  )
}

export default function PipelineDetailPage() {
  const router = useRouter()
  const { pipelineId } = router.query
  const returnUrl = pipelineId ? `/recruitment/${pipelineId}` : '/recruitment'

  return (
    <ProtectedRoute returnUrl={returnUrl}>
      <PipelineDetailContent />
    </ProtectedRoute>
  )
}
