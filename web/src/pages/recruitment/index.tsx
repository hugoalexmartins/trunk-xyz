import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Timeline } from '@/components/Timeline'
import { useEvents } from '@/hooks/useEvents'
import { EventType } from '@prisma/client'
import { UserShellLayout } from '@/components/user-shell/UserShellLayout'
import { Button } from '@/components/Button'
import { Card, CardBody } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Spinner } from '@/components/Spinner'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const C = { ink: '#0B1929', faint: '#8B99A6' }

interface PipelineGroup {
  pipelineId: string
  eventCount: number
  latestDate: Date
}

function RecruitmentPageContent() {
  const [pipelines, setPipelines] = useState<PipelineGroup[]>([])
  const { data, isLoading } = useEvents({ type: EventType.APPLICATION })

  useEffect(() => {
    if (data?.events) {
      const grouped: Record<string, PipelineGroup> = {}

      data.events.forEach((event: any) => {
        if (event.pipelineId) {
          const eventDate = new Date(event.createdAt)
          if (!grouped[event.pipelineId]) {
            grouped[event.pipelineId] = {
              pipelineId: event.pipelineId,
              eventCount: 0,
              latestDate: eventDate,
            }
          }
          grouped[event.pipelineId].eventCount++
          if (eventDate > grouped[event.pipelineId].latestDate) {
            grouped[event.pipelineId].latestDate = eventDate
          }
        }
      })

      setPipelines(Object.values(grouped))
    }
  }, [data?.events])

  return (
    <UserShellLayout>
      <div style={{ padding: '64px 48px', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.04em', lineHeight: 1 }}>
            Recruitment Pipeline
          </h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.faint, margin: '0 0 24px' }}>
            Track candidate journeys through the recruitment process
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/events/new?type=APPLICATION">
              <Button variant="primary">New Application</Button>
            </Link>
            <Link href="/timeline">
              <Button variant="secondary">All Events</Button>
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 32 }}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '48px 0' }}>
              <Spinner size="lg" className="text-primary" />
            </div>
          ) : pipelines.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-lg font-bold text-ink">No recruitment pipelines yet</p>
                <p className="text-sm text-neutral-dark font-bold mt-2">Create your first application to get started</p>
              </CardBody>
            </Card>
          ) : (
            pipelines.map((pipeline) => (
              <Link key={pipeline.pipelineId} href={`/recruitment/${pipeline.pipelineId}`}>
                <Card className="hover:shadow-lg cursor-pointer">
                  <CardBody>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-ink">
                          {pipeline.pipelineId.substring(0, 8)}...
                        </h3>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge color="cyan">{pipeline.eventCount} event{pipeline.eventCount !== 1 ? 's' : ''}</Badge>
                        </div>
                      </div>
                      <time className="text-sm text-neutral-dark font-bold">
                        {pipeline.latestDate.toLocaleDateString()}
                      </time>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))
          )}
        </div>

        {data?.events && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: C.ink, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              Recent Activity
            </h2>
            <Timeline events={data.events.slice(0, 10)} groupByPipeline={true} />
          </div>
        )}
      </div>

      <style>{`@media (max-width: 640px) { div[style*="padding: 64px 48px"] { padding: 32px 24px !important; } }`}</style>
    </UserShellLayout>
  )
}

export default function RecruitmentPage() {
  return (
    <>
      <Head>
        <title>Recruitment · trunk-xyz</title>
      </Head>
      <ProtectedRoute returnUrl="/recruitment">
        <RecruitmentPageContent />
      </ProtectedRoute>
    </>
  )
}
