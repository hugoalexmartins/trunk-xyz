import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`mx-auto px-4 md:px-6 lg:px-8 max-w-7xl ${className}`} {...props}>
      {children}
    </div>
  )
)

Container.displayName = 'Container'
