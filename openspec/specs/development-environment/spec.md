## ADDED Requirements

### Requirement: Docker Compose infrastructure
The project SHALL provide Docker Compose configuration for local development services.

#### Scenario: Service startup
- **WHEN** running `pnpm run infra:dev:up`
- **THEN** PostgreSQL, Redis, and MinIO containers start and become available

#### Scenario: Service shutdown
- **WHEN** running `pnpm run infra:dev:down`
- **THEN** all Docker services stop gracefully

#### Scenario: Service configuration
- **WHEN** examining docker-compose.yml
- **THEN** it defines PostgreSQL, Redis, MinIO with appropriate ports and settings

### Requirement: Environment configuration
Development environment SHALL be configurable through environment files.

#### Scenario: Environment file setup
- **WHEN** examining project root
- **THEN** .env.dev.example or similar contains all required environment variables with defaults

#### Scenario: Local override capability
- **WHEN** .env file is created (copy of .env.dev.example)
- **THEN** local development uses those settings instead of defaults

### Requirement: Node.js version management
The project SHALL specify required Node.js version.

#### Scenario: Version specification
- **WHEN** examining .nvmrc or similar
- **THEN** it specifies Node.js version 24 (or current required version)

#### Scenario: NVM compatibility
- **WHEN** using nvm (Node Version Manager)
- **THEN** running `nvm use` automatically switches to correct Node.js version
