import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSignup } from '@/hooks/useSignup'

const C = {
  canvas:    '#F5F9FC',
  ink:       '#0B1929',
  primary:   '#00D9FF',
  secondary: '#FFB81C',
  accent:    '#FF4D7D',
  muted:     '#4A5A6A',
  faint:     '#8B99A6',
}

function SignupPageContent() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const { mutate, isLoading, error } = useSignup()

  const validateForm = (): boolean => {
    setValidationError(null)
    if (!email) { setValidationError('Email is required'); return false }
    if (!password) { setValidationError('Password is required'); return false }
    if (password.length < 8) { setValidationError('Password must be at least 8 characters'); return false }
    if (password !== confirmPassword) { setValidationError('Passwords do not match'); return false }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      await mutate(email, password)
      router.push('/auth/login?message=Account%20created%20successfully.%20Please%20log%20in.')
    } catch {
      // Error is handled by the hook
    }
  }

  const displayError = error || validationError

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: 36,
    padding: '0 12px',
    border: `3px solid ${C.ink}`,
    background: C.canvas,
    fontSize: 13,
    fontWeight: 600,
    color: C.ink,
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    opacity: isLoading ? 0.5 : 1,
  }

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
          background: C.secondary,
          borderBottom: `4px solid ${C.ink}`,
          padding: '16px 24px',
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: C.ink, margin: 0, letterSpacing: '-0.02em' }}>
            Create account
          </h1>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: C.muted, margin: 0 }}>
            Free. No card. Start tracking your job search today.
          </p>

          {displayError && (
            <div style={{
              padding: '12px 16px',
              background: C.accent,
              border: `3px solid ${C.ink}`,
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
            }}>
              ⚠ {displayError}
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
                style={inputStyle}
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
                style={inputStyle}
              />
              <p style={{ fontSize: 12, fontWeight: 600, color: C.faint, marginTop: 4 }}>
                Minimum 8 characters.
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" style={labelStyle}>Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                style={inputStyle}
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
              {isLoading ? 'Creating account…' : 'Get started →'}
            </button>
          </form>

          <p style={{ fontSize: 13, fontWeight: 600, color: C.faint, margin: 0, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: C.ink, fontWeight: 800, textDecoration: 'underline' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign up · trunk-xyz</title>
      </Head>
      <SignupPageContent />
    </>
  )
}
