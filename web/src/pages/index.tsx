import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

const C = {
  canvas: '#F5F9FC',
  ink: '#0B1929',
  primary: '#00D9FF',
  secondary: '#FFB81C',
  accent: '#FF4D7D',
  muted: '#4A5A6A',
  faint: '#8B99A6',
}

  
export default function LandingPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/timeline')
    }
  }, [user, isLoading, router])

  if (isLoading) return <div style={{ minHeight: '100vh', background: C.canvas }} />
  if (user) return null

  return (
    <>
      <Head>
        <title>trunk-xyz · Track your job search</title>
      </Head>
    <div style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', background: C.canvas, overflowX: 'hidden' }}>

      {/* ── NAV ─────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px',
        background: C.canvas,
        borderBottom: `4px solid ${C.ink}`,
      }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: C.ink, letterSpacing: '-0.02em' }}>
          trunk<span style={{ color: C.primary }}>-xyz</span>
        </span>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/auth/login" style={{
            padding: '10px 20px', fontSize: 14, fontWeight: 700,
            border: `3px solid ${C.ink}`, color: C.ink, background: C.canvas,
            boxShadow: `3px 3px 0 ${C.ink}`, textDecoration: 'none',
            transition: 'all .1s',
            display: 'inline-block',
          }}>
            Sign in
          </Link>
          <Link href="/auth/signup" style={{
            padding: '10px 20px', fontSize: 14, fontWeight: 700,
            border: `3px solid ${C.ink}`, color: C.ink, background: C.primary,
            boxShadow: `3px 3px 0 ${C.ink}`, textDecoration: 'none',
            transition: 'all .1s',
            display: 'inline-block',
          }}>
            Get started →
          </Link>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '120px 48px 80px',
        position: 'relative',
      }}>
        {/* Floating pill — top left */}
        <div style={{
          position: 'absolute', top: 120, left: 48,
          background: C.secondary, border: `3px solid ${C.ink}`,
          padding: '8px 16px', fontWeight: 700, fontSize: 13, color: C.ink,
          boxShadow: `4px 4px 0 ${C.ink}`, transform: 'rotate(-3deg)',
        }}>
          👻 ghosted? log it.
        </div>

        {/* Floating pill — top right */}
        <div style={{
          position: 'absolute', top: 148, right: 64,
          background: C.accent, border: `3px solid ${C.ink}`,
          padding: '8px 16px', fontWeight: 700, fontSize: 13, color: '#fff',
          boxShadow: `4px 4px 0 ${C.ink}`, transform: 'rotate(2deg)',
        }}>
          📋 100% free
        </div>

        {/* Tag line */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: C.ink, color: C.canvas,
          padding: '8px 16px', fontSize: 13, fontWeight: 700,
          marginBottom: 32, alignSelf: 'flex-start',
        }}>
          👀 For job seekers who are done being ghosted
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(52px, 9vw, 110px)',
          fontWeight: 900, lineHeight: 0.92,
          letterSpacing: '-0.04em',
          color: C.ink, margin: '0 0 28px',
        }}>
          Your career.<br />
          <span style={{ color: C.primary }}>Your receipts.</span><br />
          <span style={{
            display: 'inline-block',
            background: C.secondary,
            border: `4px solid ${C.ink}`,
            boxShadow: `6px 6px 0 ${C.ink}`,
            padding: '0 16px',
            marginTop: 8,
          }}>
            All of them.
          </span>
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: 22, fontWeight: 600, color: C.muted,
          maxWidth: 580, lineHeight: 1.4, margin: '0 0 40px',
        }}>
          Log every application, every company, every interview — and yes,
          every company that ghosted you after round three.
          Because your job search deserves a paper trail.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/auth/signup" style={{
            padding: '18px 36px', fontSize: 18, fontWeight: 800,
            background: C.primary, color: C.ink,
            border: `4px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}`,
            textDecoration: 'none', display: 'inline-block',
            transition: 'all .1s',
          }}>
            Start for free →
          </Link>
          <Link href="/auth/login" style={{
            padding: '18px 36px', fontSize: 18, fontWeight: 800,
            background: C.canvas, color: C.ink,
            border: `4px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}`,
            textDecoration: 'none', display: 'inline-block',
            transition: 'all .1s',
          }}>
            I have an account
          </Link>
        </div>

        <p style={{ marginTop: 20, fontSize: 13, fontWeight: 700, color: C.faint }}>
          Free. No card. No ghosting. (We&apos;re better than that.)
        </p>

        {/* Big ghost watermark */}
        <div style={{
          position: 'absolute', bottom: 32, right: 48,
          fontSize: 160, opacity: 0.06, userSelect: 'none', lineHeight: 1,
          transform: 'rotate(12deg)',
        }}>
          👻
        </div>
      </section>

      {/* ── FEATURES BENTO ──────────────────────────── */}
      <section style={{ padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: C.faint, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            — built for this
          </p>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 900,
            color: C.ink, lineHeight: 1, letterSpacing: '-0.03em',
            marginBottom: 64,
          }}>
            Stop losing track.<br />
            <span style={{ color: C.faint }}>Start connecting the dots.</span>
          </h2>

          {/* Bento grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>

            {/* Big — Your timeline (spans 2 cols) */}
            <div style={{
              gridColumn: 'span 2',
              background: C.primary, border: `4px solid ${C.ink}`,
              boxShadow: `8px 8px 0 ${C.ink}`,
              padding: 48, minHeight: 280,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: 48 }}>📅</span>
                <h3 style={{ fontSize: 36, fontWeight: 900, color: C.ink, margin: '16px 0 12px', letterSpacing: '-0.02em' }}>
                  Your full timeline
                </h3>
                <p style={{ fontSize: 18, fontWeight: 600, color: C.ink, opacity: 0.8, maxWidth: 420, lineHeight: 1.4 }}>
                  Every application, every stage, every follow-up — mapped out in one chronological view.
                  See the whole picture of your search, not just the last email you sent.
                </p>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 24, borderTop: `2px solid ${C.ink}`, paddingTop: 16 }}>
                ✨ Log it once · Never forget it · Always yours
              </p>
            </div>

            {/* Company intel */}
            <div style={{
              background: C.secondary, border: `4px solid ${C.ink}`,
              boxShadow: `8px 8px 0 ${C.ink}`,
              padding: 40, minHeight: 280,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: 40 }}>🏢</span>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: C.ink, margin: '16px 0 12px', letterSpacing: '-0.02em' }}>
                  Company intel
                </h3>
                <p style={{ fontSize: 16, fontWeight: 600, color: C.ink, opacity: 0.85, lineHeight: 1.4 }}>
                  Research, notes, red flags — stored per company. Walk into every conversation
                  knowing exactly who you&apos;re dealing with.
                </p>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginTop: 20 }}>
                🔎 Due diligence, done right
              </p>
            </div>

            {/* Interview prep */}
            <div style={{
              background: C.canvas, border: `4px solid ${C.ink}`,
              boxShadow: `8px 8px 0 ${C.ink}`,
              padding: 40, minHeight: 220,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: 40 }}>🎯</span>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: C.ink, margin: '16px 0 12px', letterSpacing: '-0.02em' }}>
                  Interview prep
                </h3>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.muted, lineHeight: 1.4 }}>
                  Track rounds, note what they asked, prep for what&apos;s next.
                  Never walk in blind again.
                </p>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginTop: 20 }}>
                Round-by-round tracking
              </p>
            </div>

            {/* Ghost register */}
            <div style={{
              background: C.accent, border: `4px solid ${C.ink}`,
              boxShadow: `8px 8px 0 ${C.ink}`,
              padding: 40, minHeight: 220,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transform: 'rotate(0.4deg)',
            }}>
              <div>
                <span style={{ fontSize: 40 }}>👻</span>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '16px 0 12px', letterSpacing: '-0.02em' }}>
                  Ghost register
                </h3>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', opacity: 0.9, lineHeight: 1.4 }}>
                  Applied. Interviewed. Disappeared. Log the companies that vanished
                  mid-process — so you remember them next time.
                </p>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 20 }}>
                💀 Name them. Shame them. Move on.
              </p>
            </div>

            {/* Pattern recognition */}
            <div style={{
              background: C.ink, border: `4px solid ${C.ink}`,
              boxShadow: `8px 8px 0 ${C.primary}`,
              padding: 40, minHeight: 220,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transform: 'rotate(-0.5deg)',
            }}>
              <div>
                <span style={{ fontSize: 40 }}>📊</span>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: C.canvas, margin: '16px 0 12px', letterSpacing: '-0.02em' }}>
                  See patterns
                </h3>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.canvas, opacity: 0.75, lineHeight: 1.4 }}>
                  When do you get dropped? Which industries ghost more?
                  Data turns frustration into strategy.
                </p>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginTop: 20 }}>
                ⚡ Turn rejections into insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (dark band) ─────────────────── */}
      <section style={{
        background: C.ink, borderTop: `4px solid ${C.ink}`, borderBottom: `4px solid ${C.ink}`,
        padding: '96px 48px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 900,
            color: C.canvas, lineHeight: 1, letterSpacing: '-0.03em', margin: '0 0 12px',
          }}>
            Start in{' '}
            <span style={{ color: C.secondary }}>3 minutes.</span>
          </h2>
          <p style={{ fontSize: 18, fontWeight: 600, color: C.canvas, opacity: 0.45, marginBottom: 56 }}>
            Less time than waiting for a recruiter to reply.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { num: '01', title: 'Sign up', desc: "Takes 30 seconds. No card, no recruiter screen, no take-home assignment.", bg: C.primary, tc: C.ink },
              { num: '02', title: 'Add your first application', desc: "Paste the job link, drop your notes, set the status. Done. One less thing living in your head.", bg: C.secondary, tc: C.ink },
              { num: '03', title: 'Build your story', desc: "Over time, you'll see patterns, spot the red flags early, and walk into every conversation with receipts.", bg: C.accent, tc: '#fff' },
            ].map((step) => (
              <div key={step.num} style={{
                background: step.bg,
                border: `4px solid rgba(245,249,252,0.25)`,
                padding: 40,
                boxShadow: `6px 6px 0 rgba(245,249,252,0.15)`,
              }}>
                <div style={{ fontSize: 56, fontWeight: 900, color: step.tc, opacity: 0.2, lineHeight: 1, marginBottom: 16 }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: step.tc, marginBottom: 12, letterSpacing: '-0.02em' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 16, fontWeight: 600, color: step.tc, opacity: 0.85, lineHeight: 1.4 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────── */}
      <section style={{ padding: '112px 48px', background: C.canvas, position: 'relative', overflow: 'hidden' }}>
        {/* Watermark */}
        <div style={{
          position: 'absolute', right: -40, bottom: -40,
          fontSize: 320, lineHeight: 1,
          color: C.ink, opacity: 0.03, userSelect: 'none',
        }}>✓</div>

        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-block',
            background: C.secondary, border: `3px solid ${C.ink}`,
            padding: '8px 16px', fontWeight: 700, fontSize: 13, color: C.ink,
            boxShadow: `4px 4px 0 ${C.ink}`, transform: 'rotate(-1.5deg)',
            marginBottom: 32,
          }}>
            👻 Ghost them back — with data
          </div>

          <h2 style={{
            fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 900,
            color: C.ink, lineHeight: 1.0, letterSpacing: '-0.04em',
            margin: '0 0 24px',
          }}>
            You showed up.<br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              Track it all.
              <span style={{
                position: 'absolute', left: 0, right: 0, bottom: 4,
                height: 12, background: C.primary, zIndex: -1,
              }} />
            </span>
          </h2>

          <p style={{ fontSize: 20, fontWeight: 600, color: C.muted, marginBottom: 40, maxWidth: 520, lineHeight: 1.5 }}>
            They asked for your best. You gave it. Then — silence.
            Start logging it all, so next time you walk in knowing exactly
            what this company owes you in clarity.
          </p>

          <Link href="/auth/signup" style={{
            display: 'inline-block',
            padding: '22px 48px', fontSize: 20, fontWeight: 900,
            background: C.ink, color: C.canvas,
            border: `4px solid ${C.ink}`, boxShadow: `8px 8px 0 ${C.primary}`,
            textDecoration: 'none',
          }}>
            Start tracking →
          </Link>

          <p style={{ marginTop: 24, fontSize: 14, fontWeight: 600, color: C.faint }}>
            Already in?{' '}
            <Link href="/auth/login" style={{ color: C.ink, fontWeight: 700, textDecoration: 'underline' }}>
              Sign in here.
            </Link>
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer style={{
        background: C.ink, borderTop: `4px solid ${C.ink}`,
        padding: '28px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <span style={{ fontWeight: 800, color: C.canvas, fontSize: 18 }}>
          trunk<span style={{ color: C.primary }}>-xyz</span>
        </span>
        <span style={{ fontWeight: 600, color: C.canvas, opacity: 0.35, fontSize: 13 }}>
          © 2026 trunk-xyz · Built different.
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/auth/login" style={{ color: C.canvas, fontSize: 14, fontWeight: 700, opacity: 0.55, textDecoration: 'none' }}>
            Sign in
          </Link>
          <Link href="/auth/signup" style={{ color: C.primary, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            Sign up
          </Link>
        </div>
      </footer>

      <style>{`
        a { cursor: pointer; }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          [style*="gridTemplateColumns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          [style*="gridColumn: span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
    </>
  )
}
