## ADDED Requirements

### Requirement: Automated TypeScript Type Checking
The system SHALL run TypeScript type checking across the entire monorepo and fail if any type errors exist.

#### Scenario: Type check runs on CI
- **WHEN** CI workflow executes the typescript-check job
- **THEN** command `pnpm tc` is executed to check all TypeScript files

#### Scenario: Type error blocks merge
- **WHEN** any TypeScript type error exists
- **THEN** CI reports typescript-check job as failed and merge is blocked

#### Scenario: All types must be valid
- **WHEN** all TypeScript files have valid types
- **THEN** CI reports typescript-check job as passed

#### Scenario: Type errors displayed in logs
- **WHEN** type checking fails
- **THEN** logs include file names, line numbers, column numbers, and error descriptions

### Requirement: Type Check Coverage
The system SHALL check all TypeScript files in the monorepo.

#### Scenario: All packages checked
- **WHEN** type checking runs
- **THEN** all packages in monorepo (web, shared, config-*) are included

#### Scenario: Strict mode enforced
- **WHEN** TypeScript checking runs
- **THEN** strict mode is enabled (per tsconfig.json)

### Requirement: Type Check Environment
The system SHALL run type checking in consistent environment.

#### Scenario: Type check with installed dependencies
- **WHEN** typescript-check job starts
- **THEN** all dependencies are available for type resolution

#### Scenario: Type definitions available
- **WHEN** type checking executes
- **THEN** all @types packages and generated types (Prisma) are available
