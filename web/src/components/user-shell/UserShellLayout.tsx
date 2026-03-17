import React, { useState, useCallback } from 'react'
import { UserHeader } from './UserHeader'
import { MobileDrawer } from './MobileDrawer'
import { UserFooter } from './UserFooter'

interface UserShellLayoutProps {
  children: React.ReactNode
}

export function UserShellLayout({ children }: UserShellLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F5F9FC' }}>
      <UserHeader onMenuOpen={openDrawer} />
      <MobileDrawer isOpen={drawerOpen} onClose={closeDrawer} />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <UserFooter />
    </div>
  )
}
