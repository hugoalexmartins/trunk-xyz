import React from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">{title}</h1>
      {description && <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">{description}</p>}
      {children}
    </div>
  )
}
