import Head from 'next/head'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function RecruitmentDetailContent() {
  return (
    <Layout>
      <Container className="py-12">
        <PageHeader title="Recruitment Detail" description="Detailed view for a recruitment entry" />
        <p className="text-neutral-dark font-bold">Coming soon.</p>
      </Container>
    </Layout>
  )
}

export default function RecruitmentDetailPage() {
  return (
    <>
      <Head>
        <title>Recruitment Detail · trunk-xyz</title>
      </Head>
      <ProtectedRoute returnUrl="/recruitment">
        <RecruitmentDetailContent />
      </ProtectedRoute>
    </>
  )
}
