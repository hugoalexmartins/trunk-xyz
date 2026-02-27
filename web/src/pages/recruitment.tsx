import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Timeline } from '@/components/Timeline'
import { useEvents } from '@/hooks/useEvents'
import { EventType } from '@prisma/client'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { Card, CardBody } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Spinner } from '@/components/Spinner'

interface PipelineGroup {
  pipelineId: string
  eventCount: number
  latestDate: Date
}

export default function RecruitmentPage() {
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
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      <main>
        <Container className="py-8">
          {/* Page Header */}
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

          {/* Pipelines List */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Spinner size="lg" className="text-primary-600 dark:text-primary-400" />
              </div>
            ) : pipelines.length === 0 ? (
              <Card>
                <CardBody className="text-center py-12">
                  <p className="text-lg font-medium text-neutral-900 dark:text-neutral-50">No recruitment pipelines yet</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Create your first application to get started</p>
                </CardBody>
              </Card>
            ) : (
              pipelines.map((pipeline) => (
                <Link key={pipeline.pipelineId} href={`/recruitment/${pipeline.pipelineId}`}>
                  <Card className="hover:shadow-lg cursor-pointer">
                    <CardBody>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50">
                            {pipeline.pipelineId.substring(0, 8)}...
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="info">{pipeline.eventCount} event{pipeline.eventCount !== 1 ? 's' : ''}</Badge>
                          </div>
                        </div>
                        <time className="text-sm text-neutral-600 dark:text-neutral-400">
                          {pipeline.latestDate.toLocaleDateString()}
                        </time>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))
            )}
          </div>

          {/* Recent Events */}
          {data?.events && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Recent Activity</h2>
              <Timeline events={data.events.slice(0, 10)} groupByPipeline={true} />
            </div>
          )}
        </Container>
      </main>
    </div>
  )
}
