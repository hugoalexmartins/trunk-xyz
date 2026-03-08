## Why

The project currently lacks automated testing and validation infrastructure, making it possible to merge code with broken tests, TypeScript errors, linting issues, or build failures. As the codebase grows with the events feature and authentication system, we need continuous integration to enforce quality standards and prevent any degradation. GitHub Actions provides free CI/CD for open source projects and integrates seamlessly with our GitHub-based workflow. The CI pipeline will be a hard requirement—no code can be merged to main if any CI check fails.

## What Changes

- Create GitHub Actions workflow file that executes all CI checks on every PR and push to main
- Implement automated test running with failure reporting
- Implement automated TypeScript type checking across monorepo
- Implement automated ESLint linting checks
- Implement automated Next.js build verification
- **Enforce strict CI requirement**: Block all merges to main if any check fails (test, type, lint, or build)
- Enable branch protection on main requiring passing CI status
- Cache dependencies to speed up workflow runs
- Report detailed check results and failure diagnostics

## Capabilities

### New Capabilities
- `ci-workflow`: GitHub Actions workflow file (.github/workflows/ci.yml) that orchestrates all CI checks with strict failure handling
- `test-running`: Automated test execution with failure reporting and blocking merge on test failures
- `typescript-checking`: Automated TypeScript validation with strict type checking and merge blocking
- `lint-checking`: Automated ESLint validation with merge blocking on linting failures
- `build-verification`: Automated Next.js build verification with merge blocking on build failures
- `dependency-caching`: GitHub Actions caching for pnpm dependencies to speed up runs
- `strict-branch-protection`: GitHub branch protection rules requiring ALL CI checks to pass (cannot merge on any failure)

### Modified Capabilities
- (none)

## Impact

**Files Changed:**
- Create `.github/workflows/ci.yml` - Main CI workflow configuration with strict failure handling
- Create `.github/workflows/` directory structure (if not exists)

**GitHub Configuration:**
- Configure branch protection on `main` branch to:
  - Require all status checks to pass (tests, typescript, lint, build)
  - Dismiss stale PR approvals when new commits are pushed
  - Require branches to be up to date before merging
  - Prevent merge if ANY check fails

**Hard Requirements:**
- **NO PR can be merged with failing tests**
- **NO PR can be merged with TypeScript errors**
- **NO PR can be merged with ESLint violations**
- **NO PR can be merged with build failures**
- All checks must be 100% passing before merge is allowed

**User Impact:**
- All PRs must have CI status "All checks passed" before merge button is enabled
- Developers will get immediate feedback on any failures
- Type safety, linting standards, and test coverage are non-negotiable
- Broken code cannot reach main branch under any circumstances
- CI failures must be fixed locally and pushed again to re-run checks

**Performance:**
- First CI run: ~5-10 minutes (dependency installation + test running)
- Subsequent runs: ~2-4 minutes (with caching)
- No impact on local development workflow

**No Breaking Changes:**
- Existing local development commands remain unchanged
- CI simply automates and enforces what developers should already do locally
