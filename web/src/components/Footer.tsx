import Link from 'next/link'

export function Footer() {
  return (
    <footer
      style={{ background: '#0B1929', borderTop: '4px solid #0B1929' }}
      className="py-7 px-12 flex items-center justify-between flex-wrap gap-4"
    >
      <span className="font-bold text-canvas text-lg">
        trunk<span style={{ color: '#00D9FF' }}>-xyz</span>
      </span>
      <span className="font-semibold text-canvas opacity-35 text-sm">
        © 2026 trunk-xyz · Built different.
      </span>
      <div className="flex gap-6">
        <Link href="/auth/login" className="text-canvas text-sm font-bold opacity-55 hover:opacity-100 transition-opacity">
          Sign in
        </Link>
        <Link href="/auth/signup" style={{ color: '#00D9FF' }} className="text-sm font-bold hover:opacity-80 transition-opacity">
          Sign up
        </Link>
      </div>
    </footer>
  )
}
