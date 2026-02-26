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
