import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { useSignup } from '@/hooks/useSignup'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const { mutate, isLoading, error } = useSignup()

  const validateForm = (): boolean => {
    setValidationError(null)

    if (!email) {
      setValidationError('Email is required')
      return false
    }

    if (!password) {
      setValidationError('Password is required')
      return false
    }

    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters')
      return false
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await mutate(email, password)
      // On success, redirect to login
      router.push('/auth/login?message=Account%20created%20successfully.%20Please%20log%20in.')
    } catch (err) {
      // Error is handled by the hook
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      <main>
        <Container className="py-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">Sign Up</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">Create a new account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {(error || validationError) && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                  {error || validationError}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Minimum 8 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>

            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary-600 dark:text-primary-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Container>
      </main>
    </div>
  )
}
