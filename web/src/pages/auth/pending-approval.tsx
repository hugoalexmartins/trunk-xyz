import { useRouter } from 'next/router'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Card, CardBody } from '@/components/Card'
import { useLogout } from '@/hooks/useLogout'

export default function PendingApprovalPage() {
  const router = useRouter()
  const { mutate: logout } = useLogout()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/auth/login')
    } catch {
      // Error handling is in the hook
    }
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <main>
        <Container className="py-12 flex items-center justify-center min-h-[calc(100vh-theme(spacing.32))]">
          <Card className="w-full max-w-md" header="Pending Approval" headerColor="amber">
            <CardBody className="text-center space-y-6">
              <div className="text-5xl">⏳</div>

              <div>
                <p className="text-ink font-bold mb-4">
                  Your account is awaiting approval from an administrator. You will receive an email notification once your account has been reviewed and approved.
                </p>

                <div className="border-4 border-secondary bg-neutral-light p-4">
                  <p className="text-sm text-ink font-bold">
                    Please allow 1-2 business days for approval. If you have questions, contact our support team.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                variant="primary"
                className="w-full"
              >
                Logout
              </Button>

              <p className="text-sm text-ink">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="text-primary font-bold hover:text-secondary transition-colors"
                >
                  Go back to login
                </button>
              </p>
            </CardBody>
          </Card>
        </Container>
      </main>
    </div>
  )
}
