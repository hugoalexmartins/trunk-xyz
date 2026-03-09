import { useRouter } from 'next/router'
import Link from 'next/link'
import { EventForm } from '@/components/EventForm'
import { EventType } from '@prisma/client'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function NewEventPageContent() {
  const router = useRouter()
  const { pipelineId, type } = router.query

  const handleSuccess = () => {
    if (pipelineId) {
      router.push(`/recruitment/${pipelineId}`)
    } else {
      router.push('/timeline')
    }
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <main>
        <Container className="py-12">
          <div className="mb-6">
            <Link href="/timeline">
              <Button variant="secondary" className="mb-6">
                ← Back to Timeline
              </Button>
            </Link>
          </div>

          <PageHeader title="Create Event" description="Add a new event to the timeline" />

          <div className="max-w-2xl">
            <EventForm
              pipelineId={pipelineId as string | undefined}
              eventType={type as EventType | undefined}
              onSuccess={handleSuccess}
            />
          </div>
        </Container>
      </main>
    </div>
  )
}

export default function NewEventPage() {
  const router = useRouter()
  const { pipelineId } = router.query
  const returnUrl = pipelineId ? `/recruitment/${pipelineId}` : '/timeline'

  return (
    <ProtectedRoute returnUrl={returnUrl}>
      <NewEventPageContent />
    </ProtectedRoute>
  )
}
