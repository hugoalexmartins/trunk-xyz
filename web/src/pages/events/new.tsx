import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { EventForm } from '@/components/EventForm'
import { EventType } from '@prisma/client'
import { UserShellLayout } from '@/components/user-shell/UserShellLayout'
import { Button } from '@/components/Button'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const C = { ink: '#0B1929', faint: '#8B99A6' }

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
    <UserShellLayout>
      <div style={{ padding: '64px 48px', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
        <div style={{ marginBottom: 8 }}>
          <Link href="/timeline">
            <Button variant="secondary" size="sm">← Back to Timeline</Button>
          </Link>
        </div>

        <div style={{ marginBottom: 40, marginTop: 32 }}>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.04em', lineHeight: 1 }}>
            Create Event
          </h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.faint, margin: 0 }}>
            Add a new event to the timeline
          </p>
        </div>

        <div style={{ maxWidth: 640 }}>
          <EventForm
            pipelineId={pipelineId as string | undefined}
            eventType={type as EventType | undefined}
            onSuccess={handleSuccess}
          />
        </div>
      </div>

      <style>{`@media (max-width: 640px) { div[style*="padding: 64px 48px"] { padding: 32px 24px !important; } }`}</style>
    </UserShellLayout>
  )
}

export default function NewEventPage() {
  const router = useRouter()
  const { pipelineId } = router.query
  const returnUrl = pipelineId ? `/recruitment/${pipelineId}` : '/timeline'

  return (
    <>
      <Head>
        <title>New Event · trunk-xyz</title>
      </Head>
      <ProtectedRoute returnUrl={returnUrl}>
        <NewEventPageContent />
      </ProtectedRoute>
    </>
  )
}
