# CI/CD Pipeline Implementation Tasks

## 1. Test Infrastructure Setup

- [x] 1.1 Evaluate and select test framework (Jest, Vitest, or existing setup)
- [x] 1.2 Create basic test configuration file if needed (jest.config.js or vitest.config.ts)
- [x] 1.3 Create test directory structure in web package (src/__tests__ or tests/)
- [x] 1.4 Add `pnpm test` script to web/package.json if not exists
- [x] 1.5 Create basic unit test for a utility function to verify test setup works
- [x] 1.6 Run tests locally with `pnpm test` to verify they pass

## 2. GitHub Actions Workflow Creation

- [x] 2.1 Create `.github/` directory if not exists
- [x] 2.2 Create `.github/workflows/` directory
- [x] 2.3 Create `.github/workflows/ci.yml` workflow file with:
  - [x] Trigger on PR to main and push to main
  - [x] Setup node with pnpm
  - [x] Restore/cache dependencies
  - [x] Install dependencies step
  - [x] Four parallel jobs: tests, typescript-check, lint-check, build
- [x] 2.4 Implement test job:
  - [x] Run `pnpm test` command
  - [x] Set job name as "tests" for status check
- [x] 2.5 Implement typescript-check job:
  - [x] Run `pnpm tc` command
  - [x] Set job name as "typescript" for status check
- [x] 2.6 Implement lint-check job:
  - [x] Run `pnpm run lint` command
  - [x] Set job name as "lint" for status check
- [x] 2.7 Implement build job:
  - [x] Run `pnpm build:check` command
  - [x] Set job name as "build" for status check
- [x] 2.8 Configure dependency caching:
  - [x] Use pnpm-lock.yaml as cache key
  - [x] Set cache path for node_modules and pnpm cache
  - [x] Ensure all jobs share same cache

## 3. GitHub Branch Protection Configuration

- [ ] 3.1 Go to repository Settings → Branches
- [ ] 3.2 Select main branch for protection
- [ ] 3.3 Enable "Require a pull request before merging"
- [ ] 3.4 Enable "Require status checks to pass before merging"
- [ ] 3.5 Add required status checks:
  - [ ] Select "tests" check
  - [ ] Select "typescript" check
  - [ ] Select "lint" check
  - [ ] Select "build" check
- [ ] 3.6 Enable "Require branches to be up to date before merging"
- [ ] 3.7 Enable "Dismiss stale pull request approvals when new commits are pushed"
- [ ] 3.8 Verify merge button is disabled for PRs with failing CI

## 4. Test CI Workflow

- [ ] 4.1 Commit `.github/workflows/ci.yml` to a test branch
- [ ] 4.2 Push test branch and create a PR to main
- [ ] 4.3 Verify GitHub Actions starts workflow automatically
- [ ] 4.4 Wait for all four jobs to complete
- [ ] 4.5 Verify all jobs pass (green checkmarks shown)
- [ ] 4.6 Verify merge button is enabled when all checks pass
- [ ] 4.7 Test merge blocking by creating test failure:
  - [ ] Create a test that fails
  - [ ] Push to PR branch
  - [ ] Verify CI runs and test job fails
  - [ ] Verify merge button is disabled
  - [ ] Verify red X shown for failed check
- [ ] 4.8 Test TypeScript error blocking:
  - [ ] Introduce a TypeScript error (e.g., bad type annotation)
  - [ ] Push to PR branch
  - [ ] Verify CI runs and typescript check fails
  - [ ] Verify merge button is disabled
- [ ] 4.9 Test lint error blocking:
  - [ ] Introduce an ESLint violation
  - [ ] Push to PR branch
  - [ ] Verify CI runs and lint check fails
  - [ ] Verify merge button is disabled
- [ ] 4.10 Test build error blocking:
  - [ ] Introduce a build-breaking error (e.g., syntax error)
  - [ ] Push to PR branch
  - [ ] Verify CI runs and build fails
  - [ ] Verify merge button is disabled
- [ ] 4.11 Fix all errors and verify CI passes again
- [ ] 4.12 Close test PR without merging (discard test changes)

## 5. Verify Existing PR Protection

- [ ] 5.1 Check if any existing open PRs are affected
- [ ] 5.2 For each open PR:
  - [ ] Verify CI is running
  - [ ] Check if all four status checks are shown
  - [ ] If any fail, notify PR author
- [ ] 5.3 Update existing PR authors if their PRs now require fixes
- [ ] 5.4 Provide guidance on fixing common CI failures:
  - [ ] Running tests locally: `pnpm test`
  - [ ] Checking types locally: `pnpm tc`
  - [ ] Checking lint locally: `pnpm run lint`
  - [ ] Testing build locally: `pnpm build:check`

## 6. Documentation

- [ ] 6.1 Update CLAUDE.md to document CI pipeline:
  - [ ] Explain what CI checks are run
  - [ ] Explain when checks are triggered (PR to main, push to main)
  - [ ] Explain what must pass before merge
- [ ] 6.2 Add section to CLAUDE.md on fixing CI failures:
  - [ ] How to run each check locally before pushing
  - [ ] How to understand CI logs and find errors
  - [ ] Common issues and solutions
- [ ] 6.3 Document in CLAUDE.md that all checks must pass:
  - [ ] No exceptions for merge
  - [ ] Admin cannot bypass (or can only in emergencies)
  - [ ] Stale checks are re-run on new commits

## 7. Cleanup and Final Verification

- [ ] 7.1 Ensure no test branch/PR exists with deliberate failures
- [ ] 7.2 Verify main branch CI status is clean
- [ ] 7.3 Create a final test PR to main to verify:
  - [ ] New PR shows all four status checks pending
  - [ ] All checks run in parallel
  - [ ] All checks pass
  - [ ] Merge button is enabled
- [ ] 7.4 Merge final test PR to confirm workflow works on main
- [ ] 7.5 Delete test branch if created
- [ ] 7.6 Verify branch protection rules are still in place
