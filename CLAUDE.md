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
