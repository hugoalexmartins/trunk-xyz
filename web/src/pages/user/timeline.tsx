import React from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { UserShellLayout } from '@/components/user-shell/UserShellLayout'

const C = { ink: '#0B1929', faint: '#8B99A6' }

export default function UserTimelinePage() {
  return (
    <ProtectedRoute>
      <UserShellLayout>
        <div style={{
          padding: '96px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
        }}>
          <div style={{ fontSize: 64, marginBottom: 24, lineHeight: 1 }} aria-hidden="true">📅</div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.04em', lineHeight: 1 }}>
            Timeline
          </h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.faint, maxWidth: 400, lineHeight: 1.5 }}>
            Your event timeline will appear here. This page is coming soon.
          </p>
        </div>
      </UserShellLayout>
    </ProtectedRoute>
  )
}
