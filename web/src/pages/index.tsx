import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/Button'
import { Card, CardBody } from '@/components/Card'

export default function LandingPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  // Redirect authenticated users to timeline
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/timeline')
    }
  }, [user, isLoading, router])

  // Show loading or nothing while checking auth state
  if (isLoading) {
    return <div className="min-h-screen" style={{ backgroundColor: '#F5F9FC' }} />
  }

  // If authenticated, don't show landing page
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F9FC' }}>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-20">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Creative Visual Element - Emoji Art */}
          <div className="text-6xl sm:text-8xl mb-8" style={{ animation: 'bounce 3s infinite' }}>
            📅 🏢 👥 ⚡
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-6xl md:text-8xl font-black leading-tight"
            style={{ color: '#0B1929' }}
          >
            trunk-xyz
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-2xl md:text-3xl font-bold max-w-2xl mx-auto"
            style={{ color: '#4A5A6A' }}
          >
            Manage your timeline, recruitment pipeline, and team—all in one beautifully designed application.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8">
            <Link href="/auth/signup" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="py-20 px-4 sm:px-6 md:px-8" style={{ backgroundColor: '#F5F9FC' }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-black text-center mb-16"
            style={{ color: '#0B1929' }}
          >
            Powerful Features
          </h2>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Timeline Feature */}
            <Card
              header="Timeline"
              headerColor="cyan"
              className="hover:shadow-neo-xl transition-all"
            >
              <CardBody className="space-y-4">
                <p className="font-bold" style={{ color: '#0B1929' }}>
                  View all events in chronological order. Track your organization's journey with a beautiful, intuitive timeline interface.
                </p>
                <p className="text-sm font-bold" style={{ color: '#4A5A6A' }}>
                  ✨ Real-time updates
                </p>
              </CardBody>
            </Card>

            {/* Recruitment Pipeline Feature */}
            <Card
              header="Recruitment"
              headerColor="amber"
              className="hover:shadow-neo-xl transition-all"
            >
              <CardBody className="space-y-4">
                <p className="font-bold" style={{ color: '#0B1929' }}>
                  Manage candidate journeys through your recruitment process. Track applications, interviews, offers, and hires all in one place.
                </p>
                <p className="text-sm font-bold" style={{ color: '#4A5A6A' }}>
                  👥 Candidate tracking
                </p>
              </CardBody>
            </Card>

            {/* User Management Feature */}
            <Card
              header="User Management"
              headerColor="magenta"
              className="hover:shadow-neo-xl transition-all"
            >
              <CardBody className="space-y-4">
                <p className="font-bold" style={{ color: '#0B1929' }}>
                  Assign roles, manage approvals, and control access. Admin dashboard gives you full control over your team and organization.
                </p>
                <p className="text-sm font-bold" style={{ color: '#4A5A6A' }}>
                  🔐 Role-based access
                </p>
              </CardBody>
            </Card>

            {/* Design System Feature */}
            <Card
              header="Neo-Brutalism"
              headerColor="cyan"
              className="hover:shadow-neo-xl transition-all"
            >
              <CardBody className="space-y-4">
                <p className="font-bold" style={{ color: '#0B1929' }}>
                  Built with a bold, distinctive design system. High contrast, thick borders, and beautiful typography make the app unforgettable.
                </p>
                <p className="text-sm font-bold" style={{ color: '#4A5A6A' }}>
                  🎨 Beautiful UI
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 md:px-8" style={{ backgroundColor: '#0B1929' }}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2
            className="text-3xl sm:text-5xl font-black"
            style={{ color: '#F5F9FC' }}
          >
            Ready to get started?
          </h2>
          <p
            className="text-lg sm:text-xl font-bold"
            style={{ color: '#F5F9FC', opacity: 0.9 }}
          >
            Join trunk-xyz today and transform how you manage timelines and team workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8">
            <Link href="/auth/signup">
              <Button variant="primary" size="md" className="w-full sm:w-auto">
                Create Your Account
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="md" className="w-full sm:w-auto">
                Already have an account?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 md:px-8" style={{
        backgroundColor: '#F5F9FC',
        borderTop: '4px solid #0B1929'
      }}>
        <div className="max-w-6xl mx-auto text-center font-bold" style={{ color: '#4A5A6A' }}>
          <p>© 2026 trunk-xyz. Built with the neo-brutalism design system.</p>
        </div>
      </footer>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  )
}
