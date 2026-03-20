import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { getUserInitials } from '@/utils/getUserInitials'
import { trpc } from '@/utils/trpc'

const C = {
  canvas: '#F5F9FC',
  ink: '#0B1929',
  primary: '#00D9FF',
  muted: '#4A5A6A',
}

const FULL_NAV_LINKS = [
  { label: 'Dashboard', href: '/user/dashboard', match: ['/user/dashboard'] },
  { label: 'Timeline', href: '/timeline', match: ['/timeline', '/user/timeline'] },
  { label: 'Recruitment', href: '/recruitment', match: ['/recruitment', '/user/events'] },
  { label: 'New Application', href: '/applications/new', match: ['/applications/new'] },
]

const NEW_USER_NAV_LINKS = [
  { label: 'New Application', href: '/applications/new', match: ['/applications/new'] },
]

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [hasApplications, setHasApplications] = useState<boolean | null>(null)

  const initials = getUserInitials(null, user?.email)
  const displayName = user?.email?.split('@')[0] ?? 'User'
  const email = user?.email ?? ''

  useEffect(() => {
    if (!user) return
    trpc.applications.hasAny.query().then(setHasApplications).catch(() => {
      setHasApplications(true)
    })
  }, [user])

  const isAdmin = user?.role === 'admin'
  const showFullNav = isAdmin || hasApplications !== false

  const navLinks = showFullNav ? FULL_NAV_LINKS : NEW_USER_NAV_LINKS

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: C.ink,
          opacity: isOpen ? 0.6 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 40,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: 280,
          background: C.canvas,
          borderRight: `4px solid ${C.ink}`,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-out',
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
        }}
      >
        {/* Drawer header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: `4px solid ${C.ink}`,
          background: C.ink,
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: C.canvas, letterSpacing: '-0.02em' }}>
            trunk<span style={{ color: C.primary }}>-xyz</span>
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: `2px solid ${C.canvas}`,
              color: C.canvas,
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
            }}
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, paddingTop: 8 }}>
          {navLinks.map(({ label, href, match }) => {
            const isActive = match.some(p => router.pathname === p || router.pathname.startsWith(p + '/'))
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 24px',
                  fontWeight: 700,
                  fontSize: 15,
                  color: C.ink,
                  textDecoration: 'none',
                  borderBottom: `2px solid #E8F1F7`,
                  borderLeft: isActive ? `4px solid ${C.primary}` : '4px solid transparent',
                  background: isActive ? '#E8F1F7' : 'transparent',
                  transition: 'background 0.1s',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User info at bottom */}
        <div style={{
          borderTop: `4px solid ${C.ink}`,
          padding: '16px 24px',
          background: '#E8F1F7',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 36,
            height: 36,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: C.primary,
            border: `3px solid ${C.ink}`,
            fontWeight: 800,
            fontSize: 12,
            color: C.ink,
          }}>
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontWeight: 700, color: C.ink, fontSize: 14, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName}
            </p>
            <p style={{ fontSize: 12, color: C.muted, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {email}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
