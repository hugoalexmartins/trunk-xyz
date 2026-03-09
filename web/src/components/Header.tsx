import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { useLogout } from '@/hooks/useLogout'
import { Button } from './Button'

/**
 * Header with neo-brutalism styling
 * Features: thick borders, deep navy background, bold typography
 */
export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, isMounted } = useAuth()
  const { mutate: logout, isLoading: isLoggingOut } = useLogout()
  const router = useRouter()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/auth/login')
    } catch {
      // Error handling is in the hook
    }
  }

  return (
    <header className="border-b-4 border-ink bg-canvas">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-8">
            <Link href="/" className="font-bold text-xl text-ink hover:text-primary transition-colors">
              Timeline
            </Link>
            {isMounted && user && (
              <>
                <Link
                  href="/timeline"
                  className="font-bold text-ink hover:text-primary transition-colors duration-200"
                >
                  Events
                </Link>
                <Link
                  href="/recruitment"
                  className="font-bold text-ink hover:text-primary transition-colors duration-200"
                >
                  Recruitment
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin/users"
                    className="font-bold text-ink hover:text-primary transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 border-2 border-ink rounded-none text-2xl hover:bg-neutral-light transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            )}

            {isMounted && user ? (
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm text-ink">{user.email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </Button>
              </div>
            ) : (
              isMounted && (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="primary" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
