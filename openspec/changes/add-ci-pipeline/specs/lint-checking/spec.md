## ADDED Requirements

### Requirement: Automated ESLint Checking
The system SHALL run ESLint linting across the entire monorepo and fail if any linting violations exist.

#### Scenario: Lint check runs on CI
- **WHEN** CI workflow executes the lint-check job
- **THEN** command `pnpm run lint` is executed to check all code files

#### Scenario: Lint violation blocks merge
- **WHEN** any ESLint violation exists
- **THEN** CI reports lint-check job as failed and merge is blocked

#### Scenario: All code must be lint-clean
- **WHEN** all code files pass ESLint checks
- **THEN** CI reports lint-check job as passed

#### Scenario: Lint violations displayed in logs
- **WHEN** linting fails
- **THEN** logs include file names, line numbers, rule names, and violation descriptions

### Requirement: Lint Check Coverage
The system SHALL check all relevant code files across the monorepo.

#### Scenario: All packages linted
- **WHEN** linting runs
- **THEN** all JavaScript/TypeScript files in web and packages are checked

#### Scenario: Consistent rules across monorepo
- **WHEN** ESLint runs
- **THEN** shared ESLint configuration from `packages/config-eslint` is applied

### Requirement: Lint Check Environment
The system SHALL run linting in consistent environment.

#### Scenario: Lint check with dependencies
- **WHEN** lint-check job starts
- **THEN** all ESLint plugins and dependencies are available

#### Scenario: Lint configuration loaded
- **WHEN** linting executes
- **THEN** ESLint configuration is properly loaded from workspace
