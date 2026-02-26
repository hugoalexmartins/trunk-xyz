## ADDED Requirements

### Requirement: Dependency installation
The project SHALL support simple dependency installation through pnpm.

#### Scenario: Initial setup
- **WHEN** running `pnpm i`
- **THEN** all workspace dependencies are installed from pnpm-lock.yaml

### Requirement: Development server
The project SHALL support convenient development server startup.

#### Scenario: Full development mode
- **WHEN** running `pnpm run dev`
- **THEN** web application starts on localhost:3000 with hot reloading

#### Scenario: Web-only development
- **WHEN** running `pnpm run dev:web`
- **THEN** only the web application starts (most common development mode)

### Requirement: Full development reset
The project SHALL support complete reset of development environment.

#### Scenario: Fresh start
- **WHEN** running `pnpm run dx`
- **THEN** dependencies are reinstalled, databases are reset, and seed data is loaded
- **NOTE**: Use sparingly as it wipes database and node_modules

### Requirement: Common development commands
The project SHALL provide quick access to common development operations.

#### Scenario: Command aliases
- **WHEN** examining package.json scripts
- **THEN** shortcuts exist for: dev, dev:web, lint, tc, build:check, and database operations

#### Scenario: Database management from shared package
- **WHEN** navigating to packages/shared and running pnpm commands
- **THEN** database commands like `pnpm run db:generate`, `pnpm run db:migrate`, `pnpm run db:reset`, `pnpm run db:seed` are available
