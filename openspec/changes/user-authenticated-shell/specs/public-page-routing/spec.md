## ADDED Requirements

### Requirement: /user/* routes are registered in the Pages Router
The Next.js Pages Router SHALL serve all routes under `pages/user/` at their corresponding `/user/*` paths.

#### Scenario: /user/dashboard is accessible
- **WHEN** user navigates to `/user/dashboard`
- **THEN** Next.js serves `pages/user/dashboard.tsx`

#### Scenario: /user/timeline is accessible
- **WHEN** user navigates to `/user/timeline`
- **THEN** Next.js serves `pages/user/timeline.tsx`

#### Scenario: /user/events is accessible
- **WHEN** user navigates to `/user/events`
- **THEN** Next.js serves `pages/user/events.tsx`
