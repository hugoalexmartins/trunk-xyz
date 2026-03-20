import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { trpc } from '@/utils/trpc';
import { useAuth } from '@/hooks/useAuth';

const C = {
  canvas:    '#F5F9FC',
  ink:       '#0B1929',
  primary:   '#00D9FF',
  secondary: '#FFB81C',
  accent:    '#FF4D7D',
  muted:     '#4A5A6A',
  faint:     '#8B99A6',
};

function OnboardingContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Admin users always go to timeline
    if (user.role === 'admin') {
      router.replace('/timeline');
      return;
    }

    // Check if regular user already has applications
    trpc.applications.hasAny.query().then((hasAny) => {
      if (hasAny) {
        router.replace('/timeline');
      } else {
        setChecking(false);
      }
    }).catch(() => {
      setChecking(false);
    });
  }, [user, router]);

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        background: C.canvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
      }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: C.faint }}>Loading…</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: C.canvas,
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', marginBottom: 48 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: C.ink, letterSpacing: '-0.02em' }}>
          trunk<span style={{ color: C.primary }}>-xyz</span>
        </span>
      </Link>

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: 560,
        background: C.canvas,
        border: `4px solid ${C.ink}`,
        boxShadow: `8px 8px 0 ${C.ink}`,
      }}>
        {/* Header band */}
        <div style={{
          background: C.ink,
          borderBottom: `4px solid ${C.ink}`,
          padding: '24px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: -16,
            right: -16,
            fontSize: 80,
            opacity: 0.06,
            userSelect: 'none',
            transform: 'rotate(10deg)',
          }}>🚀</div>
          <h1 style={{
            fontSize: 36,
            fontWeight: 900,
            color: C.primary,
            margin: 0,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            Welcome aboard.
          </h1>
          <p style={{
            fontSize: 14,
            fontWeight: 600,
            color: C.faint,
            margin: '8px 0 0',
          }}>
            Let&apos;s track your first job application.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 32px 40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: C.muted, margin: 0 }}>
              trunk-xyz helps you stay on top of your job search — every application, every interview, every offer, in one place.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '📋', text: 'Log applications with one form' },
                { icon: '🗺️', text: 'Visualise your entire pipeline on the timeline' },
                { icon: '📎', text: 'Attach your resume to each application' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/applications/new" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '16px 32px',
              fontSize: 16,
              fontWeight: 800,
              border: `4px solid ${C.ink}`,
              background: C.primary,
              color: C.ink,
              boxShadow: `6px 6px 0 ${C.ink}`,
              cursor: 'pointer',
              transition: 'all .1s',
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              letterSpacing: '-0.01em',
            }}>
              Get started →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <>
      <Head>
        <title>Welcome · trunk-xyz</title>
      </Head>
      <ProtectedRoute returnUrl="/onboarding">
        <OnboardingContent />
      </ProtectedRoute>
    </>
  );
}
