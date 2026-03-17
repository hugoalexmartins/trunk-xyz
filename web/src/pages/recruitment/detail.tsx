import Head from 'next/head'
import { UserShellLayout } from '@/components/user-shell/UserShellLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const C = { ink: '#0B1929', faint: '#8B99A6' }

function RecruitmentDetailContent() {
  return (
    <UserShellLayout>
      <div style={{ padding: '64px 48px', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.04em', lineHeight: 1 }}>
            Recruitment Detail
          </h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.faint, margin: 0 }}>
            Detailed view for a recruitment entry
          </p>
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, color: C.faint }}>Coming soon.</p>
      </div>
    </UserShellLayout>
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
