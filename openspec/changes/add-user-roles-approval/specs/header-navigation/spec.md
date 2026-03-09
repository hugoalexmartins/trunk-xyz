## MODIFIED Requirements

### Requirement: Conditional admin menu visibility
The system SHALL display an "Admin" menu link in the header only for users with the admin role.

#### Scenario: Admin user sees admin menu link
- **WHEN** an admin user (role='admin') views the header
- **THEN** an "Admin" link is visible in the navigation

#### Scenario: Regular user does not see admin menu link
- **WHEN** a regular user (role='regular') views the header
- **THEN** no "Admin" link is visible in the navigation

#### Scenario: Unauthenticated user does not see admin menu link
- **WHEN** an unauthenticated user views the header
- **THEN** no "Admin" link is visible in the navigation

### Requirement: Admin menu navigation
The system SHALL navigate to the admin user management page when the admin link is clicked.

#### Scenario: Admin clicks admin menu link
- **WHEN** an admin clicks the "Admin" link in the header
- **THEN** they are navigated to `/admin/users`

#### Scenario: Admin menu link is only visible to admins
- **WHEN** a user with role='admin' is authenticated
- **THEN** the admin link appears with the text "Admin" or similar
