import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useScrolled } from '@/hooks/useScrolled'
import { UserDropdown } from './UserDropdown'

const C = {
  canvas: '#F5F9FC',
  ink: '#0B1929',
  primary: '#00D9FF',
}

const NAV_LINKS = [
  { label: 'Dashboard', href: '/user/dashboard', match: ['/user/dashboard'] },
  { label: 'Timeline', href: '/timeline', match: ['/timeline', '/user/timeline'] },
  { label: 'Recruitment', href: '/recruitment', match: ['/recruitment', '/user/events'] },
]

interface UserHeaderProps {
  onMenuOpen: () => void
}

export function UserHeader({ onMenuOpen }: UserHeaderProps) {
  const scrolled = useScrolled()
  const router = useRouter()

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: C.canvas,
      borderBottom: `4px solid ${C.ink}`,
      boxShadow: scrolled ? `0 4px 0 ${C.ink}` : 'none',
      transition: 'box-shadow 0.2s',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        height: 64,
      }}>
        {/* Left: Logo + Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link href="/user/dashboard" style={{
            fontSize: 20,
            fontWeight: 800,
            color: C.ink,
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}>
            trunk<span style={{ color: C.primary }}>-xyz</span>
          </Link>

          {/* Desktop nav — hidden on mobile via CSS class */}
          <nav className="user-header-nav" aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {NAV_LINKS.map(({ label, href, match }) => {
              const isActive = match.some(p => router.pathname === p || router.pathname.startsWith(p + '/'))
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: '4px 16px',
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.ink,
                    textDecoration: 'none',
                    borderBottom: isActive ? `4px solid ${C.primary}` : '4px solid transparent',
                    transition: 'border-color 0.15s, color 0.15s',
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right: User dropdown + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <UserDropdown />

          {/* Hamburger — mobile only */}
          <button
            onClick={onMenuOpen}
            aria-label="Open navigation menu"
            className="user-header-hamburger"
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              border: `3px solid ${C.ink}`,
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span style={{ width: 18, height: 2, background: C.ink, display: 'block' }} />
            <span style={{ width: 18, height: 2, background: C.ink, display: 'block' }} />
            <span style={{ width: 18, height: 2, background: C.ink, display: 'block' }} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .user-header-hamburger { display: none !important; }
        }
        @media (max-width: 767px) {
          .user-header-nav { display: none !important; }
        }
      `}</style>
    </header>
  )
}
