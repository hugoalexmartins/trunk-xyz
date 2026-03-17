## ADDED Requirements

### Requirement: /user index redirects to /user/dashboard
The `/user` route SHALL perform a server-side redirect to `/user/dashboard`.

#### Scenario: Visiting /user redirects immediately
- **WHEN** user navigates to `/user`
- **THEN** browser is redirected to `/user/dashboard` via server-side redirect (no content flash)

### Requirement: All /user/* routes require authentication
Every page under `/user/*` SHALL be wrapped in `ProtectedRoute` to enforce authentication.

#### Scenario: Unauthenticated user is redirected to login
- **WHEN** unauthenticated user navigates to `/user/dashboard`, `/user/timeline`, or `/user/events`
- **THEN** user is redirected to `/auth/login` with the return URL preserved

#### Scenario: Authenticated user can access /user/* pages
- **WHEN** authenticated user navigates to any `/user/*` route
- **THEN** the page renders inside `UserShellLayout`

### Requirement: /user/dashboard displays component gallery
The `/user/dashboard` page SHALL render a full design system component gallery showcasing all available UI components.

#### Scenario: Button variants are displayed
- **WHEN** user views `/user/dashboard`
- **THEN** primary, secondary, and outline Button variants in all sizes are visible

#### Scenario: Card variants are displayed
- **WHEN** user views `/user/dashboard`
- **THEN** default and hover-state Card variants are visible with example content

#### Scenario: Input states are displayed
- **WHEN** user views `/user/dashboard`
- **THEN** default, focus, disabled, and placeholder Input states are visible

#### Scenario: Badge variants are displayed
- **WHEN** user views `/user/dashboard`
- **THEN** all Badge color variants are visible

#### Scenario: Typography scale is displayed
- **WHEN** user views `/user/dashboard`
- **THEN** heading levels h1–h4 and body text are rendered with Space Grotesk font

### Requirement: /user/timeline is a placeholder page
The `/user/timeline` page SHALL render inside `UserShellLayout` with a placeholder heading and description.

#### Scenario: Timeline placeholder renders
- **WHEN** authenticated user navigates to `/user/timeline`
- **THEN** page renders with a heading "Timeline" and a placeholder message

### Requirement: /user/events is a placeholder page
The `/user/events` page SHALL render inside `UserShellLayout` with a placeholder heading and description.

#### Scenario: Events placeholder renders
- **WHEN** authenticated user navigates to `/user/events`
- **THEN** page renders with a heading "Events" and a placeholder message
