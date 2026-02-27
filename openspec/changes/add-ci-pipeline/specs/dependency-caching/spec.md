## ADDED Requirements

### Requirement: Dependency Caching for Performance
The system SHALL cache dependencies across CI runs to speed up workflow execution.

#### Scenario: First CI run installs dependencies
- **WHEN** CI runs for the first time on a branch
- **THEN** dependencies are installed via `pnpm install` and stored in cache

#### Scenario: Second CI run uses cached dependencies
- **WHEN** CI runs again with same pnpm-lock.yaml
- **THEN** dependencies are restored from cache (2-3 minute savings)

#### Scenario: Cache invalidated on lock file change
- **WHEN** pnpm-lock.yaml is updated
- **THEN** cache key changes and new dependencies are installed

#### Scenario: Multiple parallel jobs share cache
- **WHEN** multiple CI jobs run in parallel
- **THEN** all jobs (test, type-check, lint, build) use the same cached dependencies

### Requirement: Cache Key Strategy
The system SHALL use deterministic cache keys based on dependency lock file.

#### Scenario: Lock file hash in cache key
- **WHEN** cache is created
- **THEN** cache key includes hash of pnpm-lock.yaml for consistency

#### Scenario: Consistent cache across runs
- **WHEN** CI runs multiple times without lock file changes
- **THEN** same cache is used each time

### Requirement: Cache Hit Detection
The system SHALL report cache hit/miss for debugging and monitoring.

#### Scenario: Cache hit is logged
- **WHEN** cached dependencies are used
- **THEN** workflow logs indicate cache hit (dependencies restored from cache)

#### Scenario: Cache miss is logged
- **WHEN** cache doesn't exist or is invalidated
- **THEN** workflow logs indicate cache miss (fresh install running)
