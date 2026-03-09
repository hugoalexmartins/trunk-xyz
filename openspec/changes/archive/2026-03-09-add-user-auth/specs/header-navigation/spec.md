## ADDED Requirements

### Requirement: User Menu in Header
The system SHALL display authenticated user information and actions in the application header.

#### Scenario: Header shows user email when logged in
- **WHEN** authenticated user views the application
- **THEN** header displays user's email address and logout button

#### Scenario: Header shows login link when not authenticated
- **WHEN** unauthenticated user views the application
- **THEN** header shows "Login" and "Sign Up" links instead of user menu

#### Scenario: User can logout from header
- **WHEN** authenticated user clicks logout button in header
- **THEN** user session is invalidated and user is redirected to login page

#### Scenario: Header updates after login
- **WHEN** user logs in from /auth/login page
- **THEN** header immediately updates to show user email and logout button

#### Scenario: Header updates after logout
- **WHEN** user logs out from any page
- **THEN** header immediately updates to show Login and Sign Up links

### Requirement: Theme Toggle in Header
The system SHALL continue to provide dark mode theme toggle alongside user menu.

#### Scenario: Theme toggle available with user menu
- **WHEN** user views header with user menu
- **THEN** both theme toggle button (☀️/🌙) and user menu are visible and functional

#### Scenario: Theme preference persists across login/logout
- **WHEN** user logs out and logs back in
- **THEN** previously selected theme preference is maintained

### Requirement: Navigation Links in Header
The system SHALL provide navigation to main application sections, accessible when authenticated.

#### Scenario: Timeline link in header
- **WHEN** authenticated user views header
- **THEN** header contains link to /timeline

#### Scenario: Recruitment link in header
- **WHEN** authenticated user views header
- **THEN** header contains link to /recruitment
