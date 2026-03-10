import Head from 'next/head'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import ProtectedRoute from '@/components/ProtectedRoute'

function AdminApprovalContent() {
  return (
    <Layout>
      <Container className="py-12">
        <PageHeader title="Pending Approvals" description="Review users awaiting approval" />
        <p className="text-neutral-dark font-bold">Coming soon.</p>
      </Container>
    </Layout>
  )
}

export default function AdminApprovalPage() {
  return (
    <>
      <Head>
        <title>Pending Approvals · trunk-xyz</title>
      </Head>
      <ProtectedRoute requiredRole="admin">
        <AdminApprovalContent />
      </ProtectedRoute>
    </>
  )
}
