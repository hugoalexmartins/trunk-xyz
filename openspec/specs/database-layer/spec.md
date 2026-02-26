## ADDED Requirements

### Requirement: Prisma ORM setup
The project SHALL use Prisma ORM for database access and schema management.

#### Scenario: Schema definition
- **WHEN** examining packages/shared/prisma/schema.prisma
- **THEN** it defines database models and relationships for the application

#### Scenario: Type generation
- **WHEN** running `pnpm run db:generate` in packages/shared
- **THEN** Prisma generates TypeScript types for all models

### Requirement: PostgreSQL database
The application SHALL use PostgreSQL as the primary database.

#### Scenario: Local database availability
- **WHEN** running `pnpm run infra:dev:up`
- **THEN** PostgreSQL becomes available on the configured port

#### Scenario: Connection configuration
- **WHEN** examining environment setup
- **THEN** DATABASE_URL is configured to point to PostgreSQL instance

### Requirement: Database migrations
The project SHALL support database migrations through Prisma.

#### Scenario: Migration creation
- **WHEN** schema.prisma is updated
- **THEN** running `pnpm run db:migrate` applies migrations to the database

#### Scenario: Migration reset
- **WHEN** running `pnpm run db:reset` in packages/shared
- **THEN** database is reset to clean state and re-seeded with example data

### Requirement: Shared schema location
Database schema definitions SHALL be centralized in packages/shared/prisma.

#### Scenario: Schema accessibility
- **WHEN** web application accesses database
- **THEN** it uses the schema defined in the shared package
