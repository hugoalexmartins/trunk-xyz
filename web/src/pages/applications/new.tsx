import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { UserShellLayout } from '@/components/user-shell/UserShellLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ApplicationForm } from '@/features/applications/ApplicationForm';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/utils/trpc';

const C = { ink: '#0B1929', canvas: '#F5F9FC', faint: '#8B99A6' };

function NewApplicationContent() {
  const { user } = useAuth();
  const [showNavControls, setShowNavControls] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;
    if (user.role === 'admin') {
      setShowNavControls(true);
      return;
    }
    trpc.applications.hasAny.query()
      .then(setShowNavControls)
      .catch(() => setShowNavControls(true));
  }, [user]);

  // Wait until we know before rendering to avoid flash
  const ready = showNavControls !== null;

  return (
    <UserShellLayout>
      <div style={{ padding: '64px 48px', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
        {ready && showNavControls && (
          <div style={{ marginBottom: 8 }}>
            <Link href="/timeline" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 20px',
              fontSize: 13,
              fontWeight: 800,
              border: `4px solid ${C.ink}`,
              background: C.ink,
              color: '#FFFFFF',
              boxShadow: `4px 4px 0 ${C.ink}`,
              textDecoration: 'none',
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              letterSpacing: '-0.01em',
              transition: 'all .1s',
            }}>
              ← Back to Timeline
            </Link>
          </div>
        )}

        <div style={{ marginBottom: 40, marginTop: ready && showNavControls ? 32 : 0 }}>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.04em', lineHeight: 1 }}>
            New Application
          </h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.faint, margin: 0 }}>
            Log a new job application to your timeline.
          </p>
        </div>

        <div style={{ maxWidth: 640 }}>
          {ready && <ApplicationForm showNavControls={showNavControls} />}
        </div>
      </div>

      <style>{`@media (max-width: 640px) { div[style*="padding: 64px 48px"] { padding: 32px 24px !important; } }`}</style>
    </UserShellLayout>
  );
}

export default function NewApplicationPage() {
  return (
    <>
      <Head>
        <title>New Application · trunk-xyz</title>
      </Head>
      <ProtectedRoute returnUrl="/applications/new">
        <NewApplicationContent />
      </ProtectedRoute>
    </>
  );
}
