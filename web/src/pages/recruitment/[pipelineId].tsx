import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Timeline } from '@/components/Timeline'
import { useEventsByPipeline } from '@/hooks/useEvents'
import { Layout } from '@/components/Layout'
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
    <Layout>
      <Container className="py-8">
        <div className="mb-6">
          <Link href="/recruitment">
            <Button variant="secondary" className="mb-6">
              ← Back to Recruitment
            </Button>
          </Link>
        </div>

        <PageHeader title="Recruitment Pipeline">
          <p className="text-neutral-dark font-bold text-sm mb-4">{pipelineId}</p>
          <Link href={`/events/new?pipelineId=${pipelineId}`}>
            <Button variant="primary">Add Event</Button>
          </Link>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
          <h2 className="text-2xl font-bold text-ink mb-4">Timeline</h2>
          <Timeline events={events} isLoading={isLoading} groupByPipeline={false} />
        </div>
      </Container>
    </Layout>
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
