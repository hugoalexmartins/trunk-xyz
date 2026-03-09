import React from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

/**
 * PageHeader with large bold neo-brutalism typography
 * Uses Space Grotesk 900 (black) weight for maximum impact
 */
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-ink mb-4 leading-tight">{title}</h1>
      {description && <p className="text-lg sm:text-xl text-ink font-bold mb-6 max-w-2xl">{description}</p>}
      {children}
    </div>
  )
}
