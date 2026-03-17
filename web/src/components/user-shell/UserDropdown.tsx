import React, { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { useLogout } from '@/hooks/useLogout'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { getUserInitials } from '@/utils/getUserInitials'

const C = {
  canvas: '#F5F9FC',
  ink: '#0B1929',
  primary: '#00D9FF',
  accent: '#FF4D7D',
  muted: '#4A5A6A',
}

export function UserDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const { mutate: logout, isLoading: isLoggingOut } = useLogout()
  const router = useRouter()

  const close = useCallback(() => setOpen(false), [])
  useOutsideClick(ref, close)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [close])

  const handleLogout = async () => {
    close()
    try {
      await logout()
      router.push('/auth/login')
    } catch {
      // Error handled in hook
    }
  }

  const initials = getUserInitials(null, user?.email)
  const displayName = user?.email?.split('@')[0] ?? 'User'
  const email = user?.email ?? ''

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Avatar trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open user menu"
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          width: 38,
          height: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: C.primary,
          border: `3px solid ${C.ink}`,
          boxShadow: `3px 3px 0 ${C.ink}`,
          fontWeight: 800,
          fontSize: 13,
          color: C.ink,
          cursor: 'pointer',
          letterSpacing: '-0.01em',
          transition: 'box-shadow 0.1s, transform 0.1s',
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
        }}
      >
        {initials}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 8px)',
          width: 240,
          background: C.canvas,
          border: `3px solid ${C.ink}`,
          boxShadow: `6px 6px 0 ${C.ink}`,
          zIndex: 20,
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
        }}>
          {/* User identity */}
          <div style={{
            padding: '16px 20px',
            borderBottom: `3px solid ${C.ink}`,
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

          {/* Links */}
          <div style={{ padding: '8px 0' }}>
            <Link
              href="/user/profile"
              onClick={close}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
                fontWeight: 700,
                fontSize: 14,
                color: C.ink,
                textDecoration: 'none',
                transition: 'background 0.1s',
              }}
              className="user-dropdown-item"
            >
              Profile
            </Link>
            <Link
              href="/user/change-password"
              onClick={close}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
                fontWeight: 700,
                fontSize: 14,
                color: C.ink,
                textDecoration: 'none',
                transition: 'background 0.1s',
              }}
              className="user-dropdown-item"
            >
              Change Password
            </Link>
          </div>

          {/* Logout */}
          <div style={{ borderTop: `3px solid ${C.ink}`, padding: '8px 0' }}>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
                fontWeight: 700,
                fontSize: 14,
                color: C.accent,
                background: 'transparent',
                border: 'none',
                cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                opacity: isLoggingOut ? 0.5 : 1,
                textAlign: 'left',
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                transition: 'background 0.1s',
              }}
              className="user-dropdown-item"
            >
              {isLoggingOut ? 'Logging out…' : 'Logout'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .user-dropdown-item:hover { background: #E8F1F7; }
      `}</style>
    </div>
  )
}
