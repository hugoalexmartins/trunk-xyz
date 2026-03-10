import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Timeline } from '@/components/Timeline'
import { useEvents } from '@/hooks/useEvents'
import { EventType } from '@prisma/client'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { Card, CardBody } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Spinner } from '@/components/Spinner'
import { ProtectedRoute } from '@/components/ProtectedRoute'

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
    <Layout>
      <Container className="py-12">
        <PageHeader title="Recruitment Pipeline" description="Track candidate journeys through the recruitment process">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/events/new?type=APPLICATION">
              <Button variant="primary">New Application</Button>
            </Link>
            <Link href="/timeline">
              <Button variant="secondary">All Events</Button>
            </Link>
          </div>
        </PageHeader>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
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
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-ink mb-6">Recent Activity</h2>
            <Timeline events={data.events.slice(0, 10)} groupByPipeline={true} />
          </div>
        )}
      </Container>
    </Layout>
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
