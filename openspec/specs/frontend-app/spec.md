## ADDED Requirements

### Requirement: Next.js 14 application with Pages Router
The project SHALL provide a Next.js 14 frontend application using the Pages Router for routing.

#### Scenario: Application initialization
- **WHEN** starting the development server with `pnpm run dev:web`
- **THEN** the Next.js application starts on localhost:3000

#### Scenario: API route availability
- **WHEN** making requests to /api routes
- **THEN** the application serves API responses from pages/api directory

### Requirement: TypeScript support
All frontend code SHALL be written in TypeScript with strict type checking.

#### Scenario: Type checking
- **WHEN** running `pnpm tc` or `pnpm build:check`
- **THEN** TypeScript reports no errors

#### Scenario: Component types
- **WHEN** examining any component file
- **THEN** it uses .tsx extension and includes proper type annotations

### Requirement: Feature-based organization
Frontend features SHALL be organized in /src/features directory by domain.

#### Scenario: Feature discovery
- **WHEN** examining src/features
- **THEN** each feature directory contains domain-specific logic, components, and types

### Requirement: tRPC integration
The application SHALL support tRPC for type-safe client-server communication.

#### Scenario: tRPC router available
- **WHEN** examining src/server/api
- **THEN** root.ts exports a tRPC router with procedures available to frontend
