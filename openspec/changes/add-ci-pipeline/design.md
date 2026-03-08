## Context

Currently, code quality relies entirely on developer discipline to run local checks before committing. While `pnpm tc`, `pnpm run lint`, and `pnpm build:check` exist as tools, there's no automated enforcement. This has allowed PRs to be merged with potential issues. GitHub Actions provides a mechanism to automate these checks on every PR and push, preventing any code with errors from reaching main.

The CI pipeline must be a hard blocker—no exceptions, no merges if any check fails.

## Goals / Non-Goals

**Goals:**
- Run all quality checks automatically on every PR and push to main
- Fail fast on any test failure, type error, lint violation, or build failure
- Provide clear, actionable feedback to developers about failures
- Cache dependencies to minimize CI run time after initial setup
- Block merge button in GitHub UI if any check fails
- Ensure 100% code quality compliance before merge

**Non-Goals:**
- Automated deployments (deployment pipeline is Phase 2)
- Code coverage reports or metrics (Phase 2)
- Slack/email notifications (GitHub notifications sufficient for MVP)
- Docker image building (Phase 2)
- Performance benchmarking (Phase 2)

## Decisions

### 1. GitHub Actions as CI Platform
**Decision**: Use GitHub Actions instead of external CI services (CircleCI, Travis CI).

**Rationale**:
- Free for public repositories
- Native GitHub integration (branch protection, PR status checks)
- No additional services to manage
- Familiar to developers familiar with GitHub

**Alternatives Considered**:
- CircleCI: Would require additional account setup and payment for private repos
- Travis CI: Less integrated with GitHub's current UI
- Self-hosted: Too much infrastructure overhead for this project

### 2. Monorepo Job Strategy
**Decision**: Run all checks in a single workflow file with parallel jobs (tests, type-check, lint, build) that all must pass.

**Workflow Structure**:
```
checkout → install dependencies → [
  tests (parallel job),
  typescript (parallel job),
  lint (parallel job),
  build (parallel job)
] → all must pass
```

**Rationale**:
- Single workflow file keeps CI configuration maintainable
- Parallel jobs reduce total CI time (all checks run simultaneously)
- Clear sequential dependency: dependencies installed once, then all jobs run in parallel
- All jobs must pass—no partial merges

### 3. Dependency Caching
**Decision**: Cache pnpm lock file and node_modules folder using GitHub Actions cache.

**Cache Keys**:
- `node-modules-${{ hashFiles('pnpm-lock.yaml') }}`
- Restore keys: falls back to latest cache if lock file changes

**Rationale**:
- Saves 2-3 minutes per CI run after initial setup
- pnpm lock file is deterministic—cache invalidates only when dependencies change
- Significant time savings on repeated pushes to same PR

### 4. Trigger Events
**Decision**: Run CI on:
- `push` to `main` branch (every merge runs full CI)
- `pull_request` targeting `main` branch (every PR update runs CI)

**Rationale**:
- Ensures main branch is always in good state
- Catches issues before merge
- Re-runs CI on code review feedback

### 5. Branch Protection Rules
**Decision**: Require all status checks to pass before merge, with no override capability.

**Configuration**:
- Require status checks: `tests`, `typescript`, `lint`, `build`
- Dismiss stale approvals when new commits pushed
- Require branches to be up to date before merging
- Allow only admins to bypass rules (for emergency hotfixes)

**Rationale**:
- "No exceptions" policy enforces quality standards
- Prevents accidental merges of broken code
- Dismissing stale approvals ensures code review is current

### 6. Test Framework
**Decision**: Use existing test configuration (if any), or establish one in Phase 1.

**Phase 1**: Establish test structure (Jest or Vitest) with basic tests

**Rationale**:
- Tests must run before we can enforce CI
- Prevents shipping untested code
- Provides foundation for future test expansion

### 7. Workflow Failure Reporting
**Decision**: GitHub's native PR status checks provide sufficient failure feedback.

**Details**:
- Each job shows pass/fail status
- Clicking on a failed job shows detailed logs
- Developers can view exact error messages and stack traces

**Rationale**:
- No external tools needed
- Clear visual UI (red X for failure, green check for pass)
- Integrated into PR review workflow

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| **Slow CI runs block development** | Parallelize jobs, cache dependencies, monitor run times |
| **Flaky tests cause false failures** | Write deterministic tests, mock external dependencies, retry logic in Phase 2 |
| **Large dependency installs slow first run** | Accept 5-10 min for initial run; subsequent runs 2-4 min with cache |
| **Developers merge without waiting for CI** | Branch protection prevents merge; status checks required |
| **Test infrastructure not ready** | Establish basic test setup in Phase 1 with simple tests |
| **Lock file conflicts on dependency updates** | Resolve in local environment, commit lock file, CI validates |

## Migration Plan

**Phase 1 (This PR)**:
1. Create `.github/workflows/ci.yml` with test, type-check, lint, build jobs
2. Test workflow locally (dry run with act tool or test PR)
3. Set up branch protection on `main`:
   - Require status checks: `tests`, `typescript`, `lint`, `build`
   - Require branches to be up to date
   - Dismiss stale approvals
4. Verify workflow runs on first PR created after merge
5. Confirm all existing PRs cannot merge until CI passes

**Phase 1.5 (Concurrent with Auth/Events)**:
- Establish test infrastructure (Jest/Vitest setup)
- Write basic unit tests for critical paths
- Ensure `pnpm test` command works and CI can run it

**Phase 2+ (Future)**:
- Expand test coverage
- Add performance benchmarking
- Add code coverage reports
- Implement automated deployments triggered by passing CI
- Add Slack notifications for failures

## Open Questions

1. What test framework should we use? (Jest vs Vitest) → Decision: Defer to existing project structure, or Jest as default for Next.js
2. Should we enforce minimum test coverage percentage in CI? → Decision: No, Phase 2 feature; focus on running tests first
3. Should we have separate development and production build checks? → Decision: Single `pnpm build:check` for now; can split in Phase 2
4. How should we handle database migrations in CI? → Decision: Not applicable for Phase 1; address in Phase 2 when integration tests added
