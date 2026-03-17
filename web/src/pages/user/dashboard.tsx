import React, { useState } from 'react'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { UserShellLayout } from '@/components/user-shell/UserShellLayout'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Input } from '@/components/Input'
import { Badge } from '@/components/Badge'
import { DataGrid, type DataGridColumn } from '@/components/DataGrid'

const C = {
  canvas: '#F5F9FC',
  ink: '#0B1929',
  primary: '#00D9FF',
  secondary: '#FFB81C',
  accent: '#FF4D7D',
  muted: '#4A5A6A',
  faint: '#8B99A6',
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 64 }}>
      <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `4px solid ${C.ink}` }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.ink, margin: 0, letterSpacing: '-0.02em' }}>{title}</h2>
        {description && (
          <p style={{ marginTop: 4, fontSize: 13, fontWeight: 600, color: C.faint }}>{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

// ─── Quick actions ────────────────────────────────────────────────────────────
function QuickActions() {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 64,
      padding: '20px 24px',
      border: `4px solid ${C.ink}`,
      boxShadow: `6px 6px 0 ${C.ink}`,
      background: C.canvas,
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: C.faint, alignSelf: 'center', marginRight: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Quick actions
      </span>
      <Link href="/timeline">
        <Button variant="primary" size="sm">→ Timeline</Button>
      </Link>
      <Link href="/events/new">
        <Button variant="secondary" size="sm">+ New Event</Button>
      </Link>
      <Link href="/recruitment">
        <Button variant="outline" size="sm">⬡ Recruitment</Button>
      </Link>
      <Link href="/user/dashboard">
        <Button variant="outline" size="sm">◈ Dashboard</Button>
      </Link>
    </div>
  )
}

// ─── DataGrid demo data ───────────────────────────────────────────────────────
interface Application {
  id: number
  company: string
  role: string
  status: 'APPLICATION' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTION' | 'HIRED'
  date: string
}

const STATUS_COLOR: Record<Application['status'], 'cyan' | 'amber' | 'magenta'> = {
  APPLICATION: 'cyan',
  SCREENING:   'amber',
  INTERVIEW:   'cyan',
  OFFER:       'magenta',
  REJECTION:   'magenta',
  HIRED:       'magenta',
}

const DEMO_ROWS: Application[] = [
  { id: 1,  company: 'Acme Corp',       role: 'Frontend Engineer',     status: 'INTERVIEW',   date: '2026-03-01' },
  { id: 2,  company: 'Globex Inc',      role: 'UX Designer',           status: 'OFFER',       date: '2026-03-05' },
  { id: 3,  company: 'Initech',         role: 'Full Stack Developer',  status: 'SCREENING',   date: '2026-03-10' },
  { id: 4,  company: 'Umbrella Corp',   role: 'Product Manager',       status: 'APPLICATION', date: '2026-03-12' },
  { id: 5,  company: 'Stark Industries',role: 'Systems Engineer',      status: 'HIRED',       date: '2026-03-14' },
  { id: 6,  company: 'Wayne Enterprises',role:'Backend Developer',     status: 'REJECTION',   date: '2026-02-28' },
  { id: 7,  company: 'Dunder Mifflin',  role: 'DevOps Engineer',       status: 'SCREENING',   date: '2026-02-20' },
  { id: 8,  company: 'Pied Piper',      role: 'React Developer',       status: 'INTERVIEW',   date: '2026-03-08' },
  { id: 9,  company: 'Hooli',           role: 'Staff Engineer',        status: 'APPLICATION', date: '2026-03-15' },
  { id: 10, company: 'Bluth Company',   role: 'Mobile Developer',      status: 'OFFER',       date: '2026-03-16' },
  { id: 11, company: 'Vandelay Industries', role: 'QA Engineer',       status: 'SCREENING',   date: '2026-03-02' },
  { id: 12, company: 'Soylent Corp',    role: 'Platform Engineer',     status: 'HIRED',       date: '2026-02-18' },
]

const DATAGRID_COLUMNS: DataGridColumn<Application>[] = [
  { key: 'company', label: 'Company' },
  { key: 'role',    label: 'Role' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Badge color={STATUS_COLOR[value as Application['status']]} style={{ transform: 'none' }}>
        {String(value)}
      </Badge>
    ),
  },
  { key: 'date', label: 'Date', sortable: true },
]

function DataGridSection() {
  return (
    <Section
      title="DataGrid"
      description="Sortable columns, row selection, search filter, pagination — all in one component"
    >
      <DataGrid
        columns={DATAGRID_COLUMNS}
        rows={DEMO_ROWS}
        pageSize={5}
        selectable
        searchable
      />
    </Section>
  )
}

// ─── Typography ───────────────────────────────────────────────────────────────
function TypographySection() {
  return (
    <Section title="Typography" description="Space Grotesk heading scale and body text">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h1 style={{ fontSize: 52, fontWeight: 900, color: C.ink, margin: 0, letterSpacing: '-0.04em', lineHeight: 1 }}>Heading 1 — Black 900</h1>
        <h2 style={{ fontSize: 40, fontWeight: 800, color: C.ink, margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>Heading 2 — Bold 800</h2>
        <h3 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Heading 3 — Bold 700</h3>
        <h4 style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: 0, letterSpacing: '-0.01em' }}>Heading 4 — Bold 700</h4>
        <p style={{ fontSize: 16, fontWeight: 500, color: C.muted, maxWidth: 580, lineHeight: 1.6, margin: 0 }}>
          Body text — regular paragraph copy at 16px. Space Grotesk gives technical content a distinctive,
          mechanical feel without sacrificing legibility.
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, color: C.faint, margin: 0 }}>
          Small / helper text — labels, captions, and secondary information.
        </p>
      </div>
    </Section>
  )
}

// ─── Buttons ──────────────────────────────────────────────────────────────────
function ButtonSection() {
  return (
    <Section title="Buttons" description="Three variants × three sizes — hard shadow press effect">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <p style={{ marginBottom: 12, fontSize: 11, fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Primary</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="md" disabled>Disabled</Button>
          </div>
        </div>
        <div>
          <p style={{ marginBottom: 12, fontSize: 11, fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secondary</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <Button variant="secondary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
            <Button variant="secondary" size="lg">Large</Button>
            <Button variant="secondary" size="md" disabled>Disabled</Button>
          </div>
        </div>
        <div>
          <p style={{ marginBottom: 12, fontSize: 11, fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Outline</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <Button variant="outline" size="sm">Small</Button>
            <Button variant="outline" size="md">Medium</Button>
            <Button variant="outline" size="lg">Large</Button>
            <Button variant="outline" size="md" disabled>Disabled</Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Cards ────────────────────────────────────────────────────────────────────
function CardSection() {
  return (
    <Section title="Cards" description="Thick-border containers with colored header bars and hover lift">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        <Card header="Cyan Header" headerColor="cyan">
          <p style={{ fontSize: 14, color: C.muted }}>Default card with cyan header. Hover to see the lift effect.</p>
          <div style={{ marginTop: 16 }}><Button variant="primary" size="sm">Action</Button></div>
        </Card>
        <Card header="Amber Header" headerColor="amber">
          <p style={{ fontSize: 14, color: C.muted }}>Card with amber header. Great for warnings or highlights.</p>
          <div style={{ marginTop: 16 }}><Button variant="secondary" size="sm">Action</Button></div>
        </Card>
        <Card header="Magenta Header" headerColor="magenta">
          <p style={{ fontSize: 14, color: C.muted }}>Card with magenta header. Use for alerts or critical info.</p>
          <div style={{ marginTop: 16 }}><Button variant="outline" size="sm">Action</Button></div>
        </Card>
        <Card>
          <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 8 }}>No header card</p>
          <p style={{ fontSize: 14, color: C.muted }}>Clean card without a colored header bar. Useful for simple content blocks.</p>
        </Card>
      </div>
    </Section>
  )
}

// ─── Inputs ───────────────────────────────────────────────────────────────────
function InputSection() {
  return (
    <Section title="Inputs" description="Thick-border fields with bold focus shadow">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24, maxWidth: 640 }}>
        <Input label="Default" placeholder="Enter some text…" id="input-default" />
        <Input label="With helper text" placeholder="email@example.com" helperText="We will never share your email." id="input-helper" type="email" />
        <Input label="With error" placeholder="Enter value…" error="This field is required." id="input-error" />
        <Input label="Disabled" placeholder="Cannot edit this" disabled id="input-disabled" />
      </div>
    </Section>
  )
}

// ─── Badges ───────────────────────────────────────────────────────────────────
function BadgeSection() {
  return (
    <Section title="Badges" description="Pill-shaped labels with subtle rotation — hover to exaggerate">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <Badge color="cyan">Cyan</Badge>
        <Badge color="amber">Amber</Badge>
        <Badge color="magenta">Magenta</Badge>
        <Badge color="cyan">Application</Badge>
        <Badge color="amber">Screening</Badge>
        <Badge color="magenta">Offer</Badge>
        <Badge color="magenta">Hired</Badge>
        <Badge color="cyan">Active</Badge>
        <Badge color="amber">Pending</Badge>
      </div>
    </Section>
  )
}

// ─── Form example ─────────────────────────────────────────────────────────────
interface FormValues {
  fullName: string
  email: string
  jobType: string
  experience: string
  terms: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  jobType?: string
  experience?: string
  terms?: string
}

function FormSection() {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    jobType: '',
    experience: '',
    terms: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(v: FormValues): FormErrors {
    const e: FormErrors = {}
    if (!v.fullName.trim()) e.fullName = 'Full name is required.'
    if (!v.email.trim()) {
      e.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      e.email = 'Enter a valid email address.'
    }
    if (!v.jobType) e.jobType = 'Select a job type.'
    if (!v.experience) e.experience = 'Select your experience level.'
    if (!v.terms) e.terms = 'You must accept the terms to continue.'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSubmitted(true)
  }

  function handleCancel() {
    setValues({ fullName: '', email: '', jobType: '', experience: '', terms: false })
    setErrors({})
    setSubmitted(false)
  }

  // Shared styles matching homepage link/button aesthetic
  const btnBase: React.CSSProperties = {
    padding: '14px 28px',
    fontSize: 15,
    fontWeight: 800,
    border: `4px solid ${C.ink}`,
    boxShadow: `5px 5px 0 ${C.ink}`,
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
    transition: 'all .1s',
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    letterSpacing: '-0.01em',
  }

  const fieldLabel: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    color: C.ink,
    display: 'block',
    marginBottom: 6,
  }

  const errorMsg: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: C.accent,
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  }

  const selectStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    fontSize: 15,
    fontWeight: 700,
    color: C.ink,
    background: '#F5F9FC',
    border: `4px solid ${hasError ? C.accent : C.ink}`,
    boxShadow: hasError ? `0 0 0 2px ${C.accent}` : 'none',
    borderRadius: 0,
    appearance: 'none' as const,
    cursor: 'pointer',
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
  })

  const radioGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '12px 16px',
    border: `4px solid ${errors.experience ? C.accent : C.ink}`,
    background: '#F5F9FC',
  }

  const radioLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 14,
    fontWeight: 700,
    color: C.ink,
    cursor: 'pointer',
  }

  if (submitted) {
    return (
      <Section title="Form" description="Text, select, radio, validation — neo-brutalism style">
        <div style={{
          padding: '32px 40px',
          background: C.primary,
          border: `4px solid ${C.ink}`,
          boxShadow: `6px 6px 0 ${C.ink}`,
          maxWidth: 560,
        }}>
          <p style={{ fontSize: 28, fontWeight: 900, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            ✓ Submitted!
          </p>
          <p style={{ fontSize: 14, fontWeight: 600, color: C.ink, opacity: 0.75, margin: '0 0 24px' }}>
            <strong>{values.fullName}</strong> · {values.email} · {values.jobType} · {values.experience}
          </p>
          <button onClick={handleCancel} style={{ ...btnBase, background: C.canvas, color: C.ink }}>
            ← Reset form
          </button>
        </div>
      </Section>
    )
  }

  return (
    <Section title="Form" description="Text, select, radio, validation — neo-brutalism style">
      <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 560 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Text — Full name */}
          <div>
            <label htmlFor="form-name" style={fieldLabel}>Full name</label>
            <input
              id="form-name"
              type="text"
              placeholder="Jane Smith"
              value={values.fullName}
              onChange={e => setValues(v => ({ ...v, fullName: e.target.value }))}
              style={{
                width: '100%',
                height: 36,
                padding: '0 12px',
                border: `3px solid ${errors.fullName ? C.accent : C.ink}`,
                background: C.canvas,
                fontSize: 13,
                fontWeight: 600,
                color: C.ink,
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {errors.fullName && <p style={errorMsg}>⚠ {errors.fullName}</p>}
          </div>

          {/* Text — Email */}
          <div>
            <label htmlFor="form-email" style={fieldLabel}>Work email</label>
            <input
              id="form-email"
              type="email"
              placeholder="jane@example.com"
              value={values.email}
              onChange={e => setValues(v => ({ ...v, email: e.target.value }))}
              style={{
                width: '100%',
                height: 36,
                padding: '0 12px',
                border: `3px solid ${errors.email ? C.accent : C.ink}`,
                background: C.canvas,
                fontSize: 13,
                fontWeight: 600,
                color: C.ink,
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {errors.email
              ? <p style={errorMsg}>⚠ {errors.email}</p>
              : <p style={{ fontSize: 12, fontWeight: 600, color: C.faint, marginTop: 4 }}>Used to send you interview reminders.</p>
            }
          </div>

          {/* Select — Job type */}
          <div>
            <label htmlFor="form-jobtype" style={fieldLabel}>Job type</label>
            <div style={{ position: 'relative' }}>
              <select
                id="form-jobtype"
                value={values.jobType}
                onChange={e => setValues(v => ({ ...v, jobType: e.target.value }))}
                style={selectStyle(!!errors.jobType)}
              >
                <option value="">Select a job type…</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract / freelance</option>
                <option value="internship">Internship</option>
              </select>
              {/* Custom chevron */}
              <span style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                fontSize: 12, fontWeight: 900, color: C.ink, pointerEvents: 'none',
              }}>▼</span>
            </div>
            {errors.jobType && <p style={errorMsg}>⚠ {errors.jobType}</p>}
          </div>

          {/* Radio — Experience */}
          <div>
            <span style={fieldLabel}>Experience level</span>
            <div style={radioGroupStyle} role="group" aria-label="Experience level">
              {[
                { value: 'junior', label: 'Junior (0–2 yrs)' },
                { value: 'mid', label: 'Mid-level (3–5 yrs)' },
                { value: 'senior', label: 'Senior (6–10 yrs)' },
                { value: 'staff', label: 'Staff / Principal (10+ yrs)' },
              ].map(opt => (
                <label key={opt.value} style={radioLabelStyle}>
                  <input
                    type="radio"
                    name="experience"
                    value={opt.value}
                    checked={values.experience === opt.value}
                    onChange={e => setValues(v => ({ ...v, experience: e.target.value }))}
                    style={{ accentColor: C.primary, width: 18, height: 18, cursor: 'pointer' }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.experience && <p style={errorMsg}>⚠ {errors.experience}</p>}
          </div>

          {/* Checkbox — Terms */}
          <div style={{
            padding: '12px 16px',
            border: `4px solid ${errors.terms ? C.accent : C.ink}`,
            background: errors.terms ? '#FFF0F4' : C.canvas,
          }}>
            <label style={{ ...radioLabelStyle, alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={values.terms}
                onChange={e => setValues(v => ({ ...v, terms: e.target.checked }))}
                style={{ accentColor: C.primary, width: 18, height: 18, marginTop: 2, cursor: 'pointer', flexShrink: 0 }}
              />
              <span style={{ fontSize: 14, fontWeight: 600, color: C.ink, lineHeight: 1.4 }}>
                I agree to the{' '}
                <span style={{ fontWeight: 800, textDecoration: 'underline' }}>terms & conditions</span>
                {' '}and confirm this is example data.
              </span>
            </label>
            {errors.terms && <p style={{ ...errorMsg, marginTop: 8 }}>⚠ {errors.terms}</p>}
          </div>

          {/* Actions — homepage link style */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 8 }}>
            <button type="submit" style={{ ...btnBase, background: C.primary, color: C.ink }}>
              Submit →
            </button>
            <button type="button" onClick={handleCancel} style={{ ...btnBase, background: C.canvas, color: C.ink }}>
              Cancel
            </button>
          </div>

        </div>
      </form>
    </Section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <UserShellLayout>
        <div style={{ padding: '64px 48px', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
          {/* Page header */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: C.ink, margin: 0, letterSpacing: '-0.04em', lineHeight: 1 }}>
              Component Gallery
            </h1>
            <p style={{ marginTop: 8, fontSize: 16, fontWeight: 600, color: C.faint }}>
              All available design system components — neo-brutalism edition.
            </p>
          </div>

          <QuickActions />
          <DataGridSection />
          <TypographySection />
          <ButtonSection />
          <CardSection />
          <InputSection />
          <FormSection />
          <BadgeSection />
        </div>

        <style>{`
          @media (max-width: 640px) {
            div[style*="padding: 64px 48px"] { padding: 32px 24px !important; }
          }
        `}</style>
      </UserShellLayout>
    </ProtectedRoute>
  )
}
