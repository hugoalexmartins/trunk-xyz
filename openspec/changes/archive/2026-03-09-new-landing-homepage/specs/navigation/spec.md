## MODIFIED Requirements

### Requirement: Root page routing
The system SHALL serve the landing page at the root path `/` when accessed by unauthenticated users.

#### Scenario: Unauthenticated user accesses root path
- **WHEN** unauthenticated user navigates to `/`
- **THEN** landing page is served (previously redirected to login)

#### Scenario: Authenticated user accesses root path
- **WHEN** authenticated user navigates to `/`
- **THEN** user is redirected to `/timeline` (application main page)

### Requirement: Navigation menu visibility
The application header and navigation menu SHALL be hidden on the landing page, showing only the landing page layout.

#### Scenario: Header is not displayed on landing page
- **WHEN** user views the landing page
- **THEN** Header component is not rendered (landing page has its own layout)

#### Scenario: Header appears on auth pages and application pages
- **WHEN** user views `/auth/login`, `/auth/signup`, or `/timeline`
- **THEN** Header component displays with navigation menu
