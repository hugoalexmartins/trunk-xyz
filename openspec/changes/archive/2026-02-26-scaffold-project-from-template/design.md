## Context

This is the initial scaffolding of a monorepo project following the proven template architecture. The project is a personal React UI timeline application that requires both frontend and backend capabilities with shared utilities and configurations.

## Goals / Non-Goals

**Goals:**
- Establish a scalable monorepo structure using pnpm and Turbo
- Create a working Next.js 14 frontend with Pages Router
- Set up database layer with Prisma ORM and PostgreSQL
- Provide a complete local development environment with Docker
- Enable fast iteration with hot reloading and proper tooling
- Create foundation for shared code (types, schemas, utilities)

**Non-Goals:**
- Application features or business logic (only scaffolding)
- Production deployment configuration
- ClickHouse or analytics database setup (out of initial scope)
- Authentication system implementation
- API documentation generation beyond basic setup

## Decisions

### 1. pnpm + Turbo for Monorepo Orchestration
**Decision:** Use pnpm workspaces with Turbo task orchestration

**Rationale:**
- pnpm provides efficient disk usage through hard links and proper dependency isolation
- Turbo enables cached, parallelized builds across the monorepo
- Proven pattern used in production monorepos
- Faster than npm/yarn, better than lerna for this architecture

**Alternatives considered:**
- Yarn workspaces: less mature caching, slower installation
- Lerna alone: no caching, slower builds
- Single repo without monorepo: harder to scale, code sharing difficult

### 2. Next.js 14 with Pages Router
**Decision:** Use Next.js 14 with Pages Router (not App Router)

**Rationale:**
- Pages Router is stable and battle-tested
- App Router is still relatively new and has frequent breaking changes
- Pages Router + tRPC integration is well-documented
- Easier API routes implementation for public endpoints

**Alternatives considered:**
- App Router: newer but API routes less clear, more experimental
- Remix/SvelteKit: overkill for this project scale

### 3. Prisma ORM with PostgreSQL
**Decision:** Use Prisma for ORM, PostgreSQL for primary database

**Rationale:**
- Prisma provides type-safe database access
- PostgreSQL is robust, open-source, and feature-rich
- Schema-as-code approach allows version control of migrations
- Good integration with TypeScript and Next.js

**Alternatives considered:**
- Raw SQL: less type safety, more boilerplate
- TypeORM: more complex setup
- SQLite: insufficient for future scale

### 4. Shared Package Pattern
**Decision:** Create packages/shared for database schema, types, and utilities

**Rationale:**
- Centralized schema means web app can't diverge from database
- Single source of truth for types used across packages
- Easier to share validation schemas (Zod)
- Reusable utilities accessible to all packages

**Alternatives considered:**
- Separate database package: more fragmentation
- Types in web package: can't share with other future packages

### 5. Docker Compose for Local Infrastructure
**Decision:** Provide docker-compose.yml for local services (PostgreSQL, Redis, MinIO)

**Rationale:**
- Eliminates "works on my machine" problems
- Developers don't need to manually install/configure databases
- Easy teardown between projects
- Mirrors production-like environment

**Alternatives considered:**
- SQLite for local dev: insufficient for realistic development
- Manual installation: error-prone, harder onboarding

### 6. Feature-Based Directory Organization
**Decision:** Organize frontend code by feature in src/features/[feature-name]/

**Rationale:**
- Scales well as features grow
- Related code (components, hooks, types, API calls) lives together
- Clear domain boundaries
- Easy to find feature-specific logic

**Alternatives considered:**
- Layer-based (components/, hooks/, services/): harder to find related code
- Flat structure: unscalable

## Risks / Trade-offs

**Risk: pnpm monorepo complexity**
- Developers new to monorepos may find it harder to navigate
- **Mitigation:** Clear documentation, consistent package naming, helpful scripts

**Risk: Docker dependency for development**
- Requires Docker installation and understanding
- **Mitigation:** Simple one-command setup (`pnpm run infra:dev:up`), include Docker Desktop recommendation

**Risk: Next.js Pages Router may be deprecated**
- App Router is the new standard direction
- **Mitigation:** Migration path exists if needed, App Router features can be adopted incrementally

**Risk: Premature abstraction with shared packages**
- Might create unnecessary coupling early on
- **Mitigation:** Keep shared minimal initially (just types and ORM), move things to shared only when truly shared

**Risk: Database migrations and team coordination**
- Multiple developers working on schema changes
- **Mitigation:** Clear migration workflow, conflict resolution strategy in development guidelines

## Implementation Approach

1. Create monorepo root with pnpm-workspace.yaml and turbo.json
2. Generate package.json files for web/ and each config package
3. Create packages/shared with Prisma setup and base tsconfig
4. Create web/ Next.js app with basic pages structure
5. Set up docker-compose.yml with PostgreSQL, Redis, MinIO
6. Create development scripts for common operations
7. Establish .env.dev.example and environment setup
8. Initialize git and create initial commit

## Open Questions

- Should we include Redis and MinIO in initial scaffold? (Yes, for future feature completeness)
- Should initial database schema be empty or include example tables? (Empty, let features drive schema)
