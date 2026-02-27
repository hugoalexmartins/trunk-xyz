## ADDED Requirements

### Requirement: Strict Branch Protection on Main
The system SHALL enforce that no code can be merged to main unless ALL CI checks pass.

#### Scenario: Merge blocked on failing test
- **WHEN** any test fails in CI
- **THEN** merge button is disabled and PR shows merge is blocked

#### Scenario: Merge blocked on type error
- **WHEN** TypeScript type checking fails
- **THEN** merge button is disabled and PR shows merge is blocked

#### Scenario: Merge blocked on lint violation
- **WHEN** ESLint violations are found
- **THEN** merge button is disabled and PR shows merge is blocked

#### Scenario: Merge blocked on build failure
- **WHEN** Next.js build fails
- **THEN** merge button is disabled and PR shows merge is blocked

#### Scenario: Merge allowed only when all pass
- **WHEN** all CI checks pass (tests, type-check, lint, build)
- **THEN** merge button is enabled and "All checks have passed" is shown

### Requirement: Required Status Checks
The system SHALL require specific status checks before merge is allowed.

#### Scenario: All four checks required
- **WHEN** configuring branch protection
- **THEN** required status checks include: tests, typescript, lint, build

#### Scenario: No partial merges allowed
- **WHEN** checking merge eligibility
- **THEN** ALL four checks must show passing status (not just some)

### Requirement: No Admin Override
The system SHALL prevent even repository admins from merging failing code under normal circumstances.

#### Scenario: Admin cannot bypass all checks
- **WHEN** any CI check fails
- **THEN** merge is blocked even for administrators

#### Scenario: Emergency bypass restricted
- **WHEN** truly emergency situations require bypassing
- **THEN** only repository owner can override (rare, documented cases)

### Requirement: Stale Check Dismissal
The system SHALL require fresh CI run after code review.

#### Scenario: Stale checks dismissed on new push
- **WHEN** new commits are pushed to a PR
- **THEN** previous CI check results are dismissed (must re-run)

#### Scenario: Code review must be current
- **WHEN** checking merge eligibility
- **THEN** CI has run against the latest commit in the PR

### Requirement: Up-to-Date Branch Requirement
The system SHALL require PR branch to be up-to-date with main before merge.

#### Scenario: Out-of-date PR cannot merge
- **WHEN** main branch has new commits since PR was created
- **THEN** PR shows "Merge blocked: pull request is out of date" message

#### Scenario: Must update before merge
- **WHEN** PR is out of date
- **THEN** developer must rebase/update branch and trigger new CI run before merge allowed
