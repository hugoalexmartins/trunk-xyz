import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Card, CardBody } from '@/components/Card'
import { useLogin } from '@/hooks/useLogin'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate, isLoading, error } = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await mutate(email, password)
      // Check if user is approved
      if (!result.approved) {
        // Redirect to pending approval page
        router.push('/auth/pending-approval')
      } else {
        // Redirect to timeline or return URL
        const returnUrl = (router.query.returnUrl as string) || '/timeline'
        router.push(returnUrl)
      }
    } catch {
      // Error is handled by the hook
    }
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <main>
        <Container className="py-12 flex items-center justify-center min-h-[calc(100vh-theme(spacing.32))]">
          <Card className="w-full max-w-md" header="Login" headerColor="cyan">
            <CardBody className="space-y-6">
              <p className="text-ink font-bold">Sign in to your account</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 bg-accent border-4 border-accent rounded-none text-white font-bold text-sm">
                    {error}
                  </div>
                )}

                <Input
                  id="email"
                  type="email"
                  label="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />

                <Input
                  id="password"
                  type="password"
                  label="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <p className="text-center text-sm text-ink font-bold">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-primary hover:text-secondary transition-colors">
                  Sign up
                </Link>
              </p>
            </CardBody>
          </Card>
        </Container>
      </main>
    </div>
  )
}
