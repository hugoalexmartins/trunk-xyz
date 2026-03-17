# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

trunk-xyz is a React UI timeline of events application. This is a **pnpm + Turbo monorepo** containing a Next.js 14 frontend and supporting packages for shared utilities, configuration, and database management.

## Repository Structure

```
trunk-xyz/
├── web/                     # Next.js 14 frontend/backend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature-specific code organized by domain
│   │   ├── pages/          # Next.js pages (Pages Router)
│   │   ├── server/         # API routes and server logic
│   └── public/             # Static assets
├── packages/
│   ├── shared/             # Shared types, schemas, utilities, and database
│   │   ├── prisma/         # Database schema and migrations
│   │   └── src/            # Shared TypeScript code and exports
│   ├── config-eslint/      # ESLint configuration
│   └── config-typescript/  # TypeScript configuration
├── docker-compose.yml      # Local development services
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── turbo.json              # Turbo task orchestration
└── scripts/                # Development and deployment scripts
```

## Repository Architecture

This is a **pnpm + Turbo monorepo** with the following key packages:

### Core Applications
- **`/web/`** - Next.js 14 application (Pages Router) providing both frontend UI and backend APIs

### Supporting Packages
- **`/packages/shared/`** - Shared database schema (Prisma), types, and utilities
- **`/packages/config-eslint/`** - Shared ESLint configuration
- **`/packages/config-typescript/`** - Shared TypeScript configuration

## Development Commands

### Installation & Setup
```sh
pnpm i               # Install all dependencies
pnpm run infra:dev:up    # Start Docker services (PostgreSQL, Redis, MinIO)
pnpm run infra:dev:down  # Stop Docker services
```

### Development
```sh
pnpm run dev         # Start all services (web)
pnpm run dev:web     # Web app only (localhost:3000) - **used in most cases!**
pnpm run dx          # Full initial setup: install deps, reset DBs, seed data, start dev. USE SPARINGLY
```

### Database Management
Run these commands in the `packages/shared/` folder:
```sh
pnpm run db:generate       # Generate Prisma types from schema
pnpm run db:migrate        # Run Prisma migrations
pnpm run db:reset          # Reset and reseed databases
pnpm run db:seed           # Seed with example data
```

### Building & Type Checking
```sh
pnpm tc                               # Fast typecheck across all packages
pnpm build:check                      # Full Next.js build validation
pnpm --filter=PACKAGE_NAME run build  # Build specific package
```

### Linting
```sh
pnpm run lint        # Run ESLint across the monorepo
pnpm run lint:fix    # Automatically fix ESLint issues
```

### Testing
```sh
pnpm --filter=web test          # Run tests in web package
pnpm --filter=web test:watch    # Run tests in watch mode
```

## Technology Stack

### Web Application (`/web/`)
- **Framework**: Next.js 14 (Pages Router)
- **Database**: Prisma ORM with PostgreSQL
- **State Management**: TanStack Query (React Query)
- **Validation**: TypeScript with strict mode
- **Styling**: CSS (to be enhanced with Tailwind or CSS-in-JS as needed)

### Infrastructure
- **Primary Database**: PostgreSQL (via Prisma ORM)
- **Cache**: Redis
- **Blob Storage**: MinIO/S3-compatible
- **Package Manager**: pnpm v9.5.0
- **Task Orchestration**: Turbo

## Authentication System

The application implements JWT-based stateless authentication with the following components:

### Key Files
- **Auth Utilities**: `/web/src/server/auth/` - Hash, JWT, constants, and middleware functions
- **Auth API**: `/web/src/server/api/routers/auth.ts` - tRPC endpoints for signup, login, logout, getCurrentUser
- **User Context**: `/web/src/contexts/UserContext.ts` and `UserProvider.tsx` - React context for authenticated user state
- **Auth Hooks**: `/web/src/hooks/useAuth.ts`, `useLogin.ts`, `useSignup.ts`, `useLogout.ts` - React hooks for auth operations

### Usage

**Checking if user is authenticated:**
```typescript
const { user, isLoading } = useAuth();
```

**Login:**
```typescript
const { mutate: login } = useLogin();
await login(email, password);
```

**Signup:**
```typescript
const { mutate: signup } = useSignup();
await signup(email, password);
```

**Protecting routes:**
Wrap page content with `ProtectedRoute` component:
```typescript
<ProtectedRoute returnUrl="/timeline">
  <PageContent />
</ProtectedRoute>
```

### API Endpoints
- `POST /api/trpc/auth.signup` - Register new user
- `POST /api/trpc/auth.login` - Login user (sets HTTP-only cookie)
- `POST /api/trpc/auth.logout` - Logout user (clears cookie)
- `GET /api/trpc/auth.getCurrentUser` - Get current authenticated user (requires auth)

All event endpoints require authentication via `protectedProcedure`.

## Role-Based Access Control (RBAC)

The application implements a two-role system for managing user permissions:

### User Roles
- **admin**: Can manage user approvals and access admin dashboard
- **regular**: Standard user with access to events and timeline features

### Approval Workflow
1. New users signup with `approved=false`, awaiting admin approval
2. Admins view pending users at `/admin/users`
3. Admins approve or reject pending users
4. Approved users can login and access the application
5. Admins can disable/enable approved users at any time

### Key Files
- **User Model**: `/packages/shared/prisma/schema.prisma` - User schema with `role` and `approved` fields
- **Admin Router**: `/web/src/server/api/routers/admin.ts` - tRPC endpoints for user management
- **Protected Route**: `/web/src/components/ProtectedRoute.tsx` - Route protection with role and approval checks
- **Admin Page**: `/web/src/pages/admin/users.tsx` - Admin user management interface
- **Pending Approval**: `/web/src/pages/auth/pending-approval.tsx` - Screen shown to users awaiting approval

### Usage

**Protect a route for admin users only:**
```typescript
<ProtectedRoute requiredRole="admin">
  <AdminContent />
</ProtectedRoute>
```

**Check user approval and role:**
```typescript
const { user } = useAuth();
if (!user.approved) {
  // User is pending approval
}
if (user.role === 'admin') {
  // Show admin controls
}
```

### Admin API Endpoints
- `GET /api/trpc/admin.listUsers` - Get all users with approval status
- `POST /api/trpc/admin.approveUser` - Approve a pending user
- `POST /api/trpc/admin.rejectUser` - Reject/delete a pending user
- `POST /api/trpc/admin.disableUser` - Disable an approved user
- `POST /api/trpc/admin.enableUser` - Re-enable a disabled user

### Development Seeding
To create an admin user for development:
```sh
pnpm --filter=shared run db:seed
```
This creates `admin@example.com` with password `AdminPassword123!`

## Development Guidelines

### Frontend Features
- All new features go in `/web/src/features/[feature-name]/`
- Use Pages Router (not App Router) for new pages
- Follow existing feature structure for consistency
- Reusable components go in `/web/src/components`

### Database
- **Database system**: PostgreSQL via Prisma ORM
- All database operations go through Prisma (in `/packages/shared/prisma/schema.prisma`)
- Prisma generates types automatically with `pnpm run db:generate`

### Code Conventions
- **Pages Router** (not App Router)
- TypeScript with strict mode throughout
- Use `@/*` path alias for root-relative imports
- Use `@/src/*` for src-relative imports

## Environment Setup

- **Node.js**: Version 24 (specified in `.nvmrc`)
- **Package Manager**: pnpm v9.5.0
- **Docker**: Required for local PostgreSQL, Redis, MinIO
- **Environment**: Copy `.env.dev.example` to `.env` and adjust as needed

## Local Development Workflow

1. **Install dependencies**: `pnpm i`
2. **Copy environment file**: `cp .env.dev.example .env`
3. **Start infrastructure**: `pnpm run infra:dev:up`
4. **Generate Prisma types**: `pnpm --filter=shared run db:generate`
5. **Run migrations** (if any): `pnpm --filter=shared run db:migrate`
6. **Start development**: `pnpm run dev:web`

The app will be available at `http://localhost:3000`

## Continuous Integration (CI)

The repository uses GitHub Actions for automated code quality checks on every PR and push to main.

### CI Checks

All of the following checks **must pass** before code can be merged to main:
- **Tests** (`pnpm --filter=web test`) - Unit tests using Jest
- **TypeScript** (`pnpm tc`) - Type checking across all packages
- **Lint** (`pnpm run lint`) - ESLint code quality validation
- **Build** (`pnpm build:check`) - Next.js build verification

### Running Checks Locally Before Pushing

Always run these checks locally before pushing to avoid CI failures:

```sh
# Run all checks
pnpm --filter=web test          # Run tests
pnpm tc                          # Type check
pnpm run lint                    # Lint check
pnpm build:check                 # Build verification
```

**No code can be merged with failing tests, TypeScript errors, linting violations, or build failures.** This is a hard requirement enforced by branch protection on main.

### CI Workflow Details

The GitHub Actions workflow (`.github/workflows/ci.yml`):
- Runs on every PR to main and every push to main
- Executes 4 parallel jobs: tests, typescript, lint, and build
- Caches dependencies for faster runs (2-3 min vs 5-10 min uncached)
- Requires all 4 jobs to pass for merge to be allowed
- Dismisses stale checks when new commits are pushed

### Fixing CI Failures

If CI fails:
1. Read the detailed error in the GitHub Actions logs
2. Fix the issue locally (`pnpm --filter=web test`, `pnpm tc`, `pnpm run lint`, etc.)
3. Commit the fix
4. Push to your branch - CI will automatically re-run
5. Once all checks pass, the merge button will be enabled

## UI Style Guide

This design system is **neo-brutalism / Deep Ocean**. All new UI must follow these rules with no deviations.

### Color Palette

Always use these exact hex values. Never substitute with Tailwind semantic names in inline styles — define a local `C` constant at the top of every file that needs colors.

```ts
const C = {
  canvas:    '#F5F9FC', // ice blue — page/component background
  ink:       '#0B1929', // deep navy — text, borders, shadows
  primary:   '#00D9FF', // cyan — primary actions, active states, highlights
  secondary: '#FFB81C', // amber — secondary actions, warnings
  accent:    '#FF4D7D', // magenta — errors, alerts, destructive states
  muted:     '#4A5A6A', // body/secondary text
  faint:     '#8B99A6', // captions, helper text, disabled labels
}
```

### Typography

- **Font**: Space Grotesk only. Always set `fontFamily: '"Space Grotesk", system-ui, sans-serif'` on root containers.
- **Weights in use**: 600 (semibold), 700 (bold), 800 (extrabold), 900 (black). Never use 400 or 500 for UI text.
- **Heading scale**: h1 → 48–110px / 900, h2 → 36–80px / 900, h3 → 26–36px / 900, h4 → 22px / 700.
- **Body**: 16px / 600, color `C.muted`.
- **Helper/caption**: 12–13px / 600–700, color `C.faint`.
- **Letter spacing**: headings use `-0.02em` to `-0.04em`. Labels/caps use `0.08em–0.1em`.

### Borders

- All interactive elements: `border: 3px solid ${C.ink}` (controls, inputs) or `border: 4px solid ${C.ink}` (cards, containers, sections).
- **Never use `border-radius`**. All corners are sharp (`borderRadius: 0` / `rounded-none`).
- Error state: switch border color to `C.accent`. Never remove the border.

### Shadows (hard offset — no blur)

```
neo-sm:  2px 2px 0 ${C.ink}   — small controls (search inputs, tight elements)
neo-md:  4px 4px 0 ${C.ink}   — default cards, standard buttons
neo-lg:  6–8px 6–8px 0 ${C.ink} — prominent cards, hero elements
neo-xl: 12px 12px 0 ${C.ink}  — featured/hero cards
```

Never use blurred (`box-shadow` with a spread/blur value) shadows on UI components.

### Spacing Grid

All padding and margins must be multiples of 8px: `8, 16, 24, 32, 40, 48, 64, 96px`. Do not use arbitrary values like 10px, 15px, 20px.

### Inputs & Form Controls

Use **inline styles only** (not the `<Input>` component) for raw inputs in pages. Match the DataGrid search input exactly:

```ts
// Standard text/email input
{
  width: '100%',
  height: 36,
  padding: '0 12px',
  border: `3px solid ${hasError ? C.accent : C.ink}`,
  background: C.canvas,
  fontSize: 13,
  fontWeight: 600,
  color: C.ink,
  fontFamily: '"Space Grotesk", system-ui, sans-serif',
  outline: 'none',
  boxSizing: 'border-box' as const,
}

// Select
{
  width: '100%',
  padding: '12px 16px',
  fontSize: 15,
  fontWeight: 700,
  color: C.ink,
  background: C.canvas,
  border: `4px solid ${hasError ? C.accent : C.ink}`,
  borderRadius: 0,
  appearance: 'none' as const,
  cursor: 'pointer',
  fontFamily: '"Space Grotesk", system-ui, sans-serif',
}

// Radio/Checkbox label wrapper
{
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: 14,
  fontWeight: 700,
  color: C.ink,
  cursor: 'pointer',
}

// Radio/Checkbox input element
{ accentColor: C.primary, width: 18, height: 18, cursor: 'pointer' }
```

Field labels: `fontSize: 13, fontWeight: 700, color: C.ink, display: 'block', marginBottom: 6`.

Error messages: `fontSize: 12, fontWeight: 700, color: C.accent, marginTop: 4` — prefix with `⚠`.

Helper text (no error): `fontSize: 12, fontWeight: 600, color: C.faint, marginTop: 4`.

### Buttons

**Page-level action buttons** (submit, cancel, CTAs in pages) use **inline styles**, not the `<Button>` component:

```ts
// Primary (submit / main CTA)
{
  padding: '14px 28px',
  fontSize: 15,
  fontWeight: 800,
  border: `4px solid ${C.ink}`,
  background: C.primary,   // cyan fill
  color: C.ink,
  boxShadow: `5px 5px 0 ${C.ink}`,
  cursor: 'pointer',
  transition: 'all .1s',
  fontFamily: '"Space Grotesk", system-ui, sans-serif',
  letterSpacing: '-0.01em',
}

// Secondary (cancel / ghost)
{
  ...same as above,
  background: C.canvas,    // no fill
}
```

**Reusable component buttons** (inside feature components) use `<Button variant="primary|secondary|outline" size="sm|md|lg">`.

### Cards & Containers

```ts
// Standard container/section box
{
  border: `4px solid ${C.ink}`,
  boxShadow: `6px 6px 0 ${C.ink}`,
  background: C.canvas,
  padding: 40,            // multiples of 8
}
```

Use `<Card>` component for data display cards. Use inline styles for one-off layout containers.

### Decorative / Accent Techniques

- **Rotated badges/pills**: `transform: 'rotate(-3deg)'` to `rotate(3deg)` — used sparingly for emphasis.
- **Dark section band**: `background: C.ink` with `borderTop/Bottom: 4px solid ${C.ink}` — used for high-contrast sections.
- **Highlight underline**: absolutely-positioned `<span>` with `background: C.primary`, `height: 12px`, `zIndex: -1` behind heading text.
- **Watermark**: large emoji or symbol at 3–6% opacity, `userSelect: 'none'`, `position: absolute`.

### Styling Approach by Context

| Context | Use |
|---|---|
| Reusable component (`/components/`) | Tailwind utility classes |
| Page-level layout, forms, sections | Inline styles with `C` constant |
| Responsive breakpoints in pages | `<style>` tag with `@media` queries or Tailwind responsive classes |
| DataGrid, tables | Inline styles (already established) |

Never mix Tailwind and inline styles on the same element.

### Interaction States

- **Button press**: `translate(0.5px, 0.5px)` + remove shadow (`active:translate-x-0.5 active:shadow-none`).
- **Card hover**: lift with `hover:-translate-y-0.5` + increase shadow.
- **Input focus**: `outline: 'none'` — no focus ring on raw inputs. The `<Input>` component uses `focus:shadow-neo-md`.
- **Transitions**: `transition: 'all .1s'` for buttons, `transition-all duration-200 ease-out` for components.
- **Reduced motion**: always add `prefers-reduced-motion:transition-none` in Tailwind components.

### Accessibility

- All `<input>` elements must have an associated `<label>` (via `htmlFor`/`id` or wrapping).
- Radio groups must have `role="group"` and `aria-label`.
- Icon-only buttons must have `aria-label`.
- Error messages must be associated with their field (`aria-describedby` or proximity).

## Troubleshooting

### Port Already in Use
If ports 5432 (PostgreSQL), 6379 (Redis), or 9000 (MinIO) are already in use:
- Stop existing services: `pnpm run infra:dev:down`
- Or modify docker-compose.yml to use different ports

### Module Resolution Issues
Make sure `pnpm i` has been run in the root. If you see module not found errors:
- Check that the import path uses `@/src/*` or `@/*` aliases
- Verify the package is listed in `packages` in `pnpm-workspace.yaml`

### TypeScript Errors
Run `pnpm tc` to see all TypeScript errors across the monorepo. This is faster than running next build.
