import { useRouter } from 'next/router'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
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
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      <main>
        <Container className="py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-50 dark:bg-yellow-900/20">
                <span className="text-3xl">⏳</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              Pending Approval
            </h1>

            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Your account is awaiting approval from an administrator. You will receive an email notification once your account has been reviewed and approved.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Please allow 1-2 business days for approval. If you have questions, contact our support team.
              </p>
            </div>

            <Button
              onClick={handleLogout}
              variant="primary"
              className="w-full"
            >
              Logout
            </Button>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-6">
              <button
                onClick={() => router.push('/auth/login')}
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Go back to login
              </button>
            </p>
          </div>
        </Container>
      </main>
    </div>
  )
}
