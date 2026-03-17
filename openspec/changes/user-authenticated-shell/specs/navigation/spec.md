## ADDED Requirements

### Requirement: Authenticated /user/* routes are part of the nav system
The navigation system SHALL include `/user/dashboard`, `/user/timeline`, and `/user/events` as primary authenticated routes.

#### Scenario: Nav links resolve to correct /user/* routes
- **WHEN** user clicks Dashboard in the authenticated shell nav
- **THEN** browser navigates to `/user/dashboard`

#### Scenario: Timeline nav link routes correctly
- **WHEN** user clicks Timeline in the authenticated shell nav
- **THEN** browser navigates to `/user/timeline`

#### Scenario: Events nav link routes correctly
- **WHEN** user clicks Events in the authenticated shell nav
- **THEN** browser navigates to `/user/events`
