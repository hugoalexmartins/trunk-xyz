import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLogin } from '@/hooks/useLogin'

const C = {
  canvas:    '#F5F9FC',
  ink:       '#0B1929',
  primary:   '#00D9FF',
  secondary: '#FFB81C',
  accent:    '#FF4D7D',
  muted:     '#4A5A6A',
  faint:     '#8B99A6',
}

function LoginPageContent() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate, isLoading, error } = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await mutate(email, password)
      if (!result.approved) {
        router.push('/auth/pending-approval')
      } else {
        const returnUrl = (router.query.returnUrl as string) || '/timeline'
        router.push(returnUrl)
      }
    } catch {
      // Error is handled by the hook
    }
  }

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: '100%',
    height: 36,
    padding: '0 12px',
    border: `3px solid ${hasError ? C.accent : C.ink}`,
    background: C.canvas,
    fontSize: 13,
    fontWeight: 600,
    color: C.ink,
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    opacity: isLoading ? 0.5 : 1,
  })

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    color: C.ink,
    display: 'block',
    marginBottom: 6,
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: C.canvas,
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', marginBottom: 40 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: C.ink, letterSpacing: '-0.02em' }}>
          trunk<span style={{ color: C.primary }}>-xyz</span>
        </span>
      </Link>

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: C.canvas,
        border: `4px solid ${C.ink}`,
        boxShadow: `8px 8px 0 ${C.ink}`,
      }}>
        {/* Header bar */}
        <div style={{
          background: C.primary,
          borderBottom: `4px solid ${C.ink}`,
          padding: '16px 24px',
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: C.ink, margin: 0, letterSpacing: '-0.02em' }}>
            Sign in
          </h1>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: C.muted, margin: 0 }}>
            Welcome back. Enter your credentials to continue.
          </p>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: C.accent,
              border: `3px solid ${C.ink}`,
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
            }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="email" style={labelStyle}>Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLoading}
                style={inputStyle()}
              />
            </div>

            <div>
              <label htmlFor="password" style={labelStyle}>Password</label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
                style={inputStyle()}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px 24px',
                marginTop: 8,
                fontSize: 15,
                fontWeight: 800,
                border: `4px solid ${C.ink}`,
                background: C.primary,
                color: C.ink,
                boxShadow: `5px 5px 0 ${C.ink}`,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
                transition: 'all .1s',
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              {isLoading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          <p style={{ fontSize: 13, fontWeight: 600, color: C.faint, margin: 0, textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" style={{ color: C.ink, fontWeight: 800, textDecoration: 'underline' }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sign in · trunk-xyz</title>
      </Head>
      <LoginPageContent />
    </>
  )
}
