import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import ProtectedRoute from '@/components/ProtectedRoute'

function AdminIndexContent() {
  return (
    <Layout>
      <Container className="py-12">
        <PageHeader title="Admin" description="Manage your application" />
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/admin/list">
            <Button variant="primary">User List</Button>
          </Link>
          <Link href="/admin/approval">
            <Button variant="secondary">Pending Approvals</Button>
          </Link>
        </div>
      </Container>
    </Layout>
  )
}

export default function AdminIndexPage() {
  return (
    <>
      <Head>
        <title>Admin · trunk-xyz</title>
      </Head>
      <ProtectedRoute requiredRole="admin">
        <AdminIndexContent />
      </ProtectedRoute>
    </>
  )
}
