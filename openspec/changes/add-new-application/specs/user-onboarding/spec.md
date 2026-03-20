## ADDED Requirements

### Requirement: Post-login routing based on application history
The system SHALL redirect approved regular users to different destinations after login based on whether they have any existing APPLICATION events.

#### Scenario: First-time user redirected to onboarding
- **WHEN** an approved regular user logs in and has zero APPLICATION-type events
- **THEN** the user is redirected to /onboarding

#### Scenario: Returning user redirected to timeline
- **WHEN** an approved regular user logs in and has at least one APPLICATION-type event
- **THEN** the user is redirected to /timeline

#### Scenario: Admin users bypass onboarding
- **WHEN** a user with role=admin logs in
- **THEN** the user is redirected to /timeline regardless of APPLICATION event count

#### Scenario: Unapproved users are unaffected
- **WHEN** a user with approved=false logs in
- **THEN** the user is redirected to /auth/pending-approval (existing behaviour, unchanged)

### Requirement: Onboarding welcome screen
The system SHALL display a welcome screen at /onboarding before presenting the application form.

#### Scenario: Welcome screen shown on first visit
- **WHEN** a first-time user lands on /onboarding
- **THEN** a welcome screen is displayed with a brief description of the product and a CTA button to start creating their first application

#### Scenario: CTA advances to the application form
- **WHEN** the user clicks the CTA on the welcome screen
- **THEN** the user is navigated to /applications/new

#### Scenario: Direct navigation by returning users is blocked
- **WHEN** an approved user who already has at least one APPLICATION event navigates directly to /onboarding
- **THEN** the user is redirected to /timeline

#### Scenario: Unauthenticated access is blocked
- **WHEN** an unauthenticated user navigates to /onboarding
- **THEN** the user is redirected to /auth/login

### Requirement: applications.hasAny query
The system SHALL expose an `applications.hasAny` tRPC query that returns a boolean indicating whether the current user has at least one APPLICATION-type event.

#### Scenario: User with applications
- **WHEN** an authenticated user with one or more APPLICATION events calls applications.hasAny
- **THEN** the response is `true`

#### Scenario: User without applications
- **WHEN** an authenticated user with zero APPLICATION events calls applications.hasAny
- **THEN** the response is `false`

#### Scenario: Query is efficient
- **WHEN** applications.hasAny is called
- **THEN** the database query uses LIMIT 1 and does not count all rows

### Requirement: Navigation menu restricted for users with no applications
The system SHALL limit the navigation menu to a single "New Application" entry for approved regular users who have zero APPLICATION events.

#### Scenario: Menu shows only New Application for new users
- **WHEN** an approved regular user with zero APPLICATION events views any page (e.g. /applications/new)
- **THEN** the navigation menu renders only a single link: "New Application" pointing to /applications/new

#### Scenario: Menu shows full nav for users with applications
- **WHEN** an approved regular user with at least one APPLICATION event views a page
- **THEN** the full navigation menu is displayed (including Timeline and other standard entries)

#### Scenario: Admin users always see full menu
- **WHEN** a user with role=admin views any page
- **THEN** the full navigation menu is displayed regardless of APPLICATION event count
