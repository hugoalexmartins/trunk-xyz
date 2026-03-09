import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Container component with 8px spacing grid
 * Uses padding multiples of 8px for consistent spacing
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl bg-canvas ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)

Container.displayName = 'Container'

export { Container }
export default Container
