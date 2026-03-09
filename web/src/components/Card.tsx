import React from 'react'

type CardHeaderColor = 'cyan' | 'amber' | 'magenta'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode
  headerColor?: CardHeaderColor
  children: React.ReactNode
}

/**
 * Neo-brutalism Card component
 * Features: thick borders, hard shadows, colored header bar, hover lift effect
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ header, headerColor = 'cyan', className = '', children, ...props }, ref) => {
    const headerColorMap: Record<CardHeaderColor, string> = {
      cyan: 'bg-primary',
      amber: 'bg-secondary',
      magenta: 'bg-accent',
    }

    const baseStyles = [
      'bg-neutral-light',
      'border-4',
      'border-ink',
      'rounded-none', // sharp corners
      'shadow-neo-md',
      'sm:shadow-neo-lg',
      'md:shadow-neo-xl',
      'transition-all',
      'duration-200',
      'ease-out',
      'hover:-translate-y-0.5',
      'hover:shadow-neo-lg',
      'sm:hover:shadow-neo-xl',
      'prefers-reduced-motion:transition-none',
      'prefers-reduced-motion:hover:-translate-y-0',
    ].join(' ')

    return (
      <div ref={ref} className={`${baseStyles} ${className}`} {...props}>
        {header && (
          <div className={`${headerColorMap[headerColor]} border-b-4 border-ink px-6 py-4 font-bold text-ink`}>
            {header}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
export default Card

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-b-4 border-ink ${className}`}>{children}</div>
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-t-4 border-ink flex gap-3 justify-end ${className}`}>{children}</div>
}
