## ADDED Requirements

### Requirement: User approval workflow
The system SHALL require admin approval before new users can access the application. Users created via signup are in a pending state until approved.

#### Scenario: New user starts in pending state
- **WHEN** a user completes signup
- **THEN** they are created with `approved = false`

#### Scenario: Pending user cannot login
- **WHEN** a pending user (with `approved = false`) attempts to login with correct credentials
- **THEN** the system accepts the login but returns `approved: false` in the response, and frontend prevents access

#### Scenario: Approved user can login
- **WHEN** an approved user (with `approved = true`) attempts to login with correct credentials
- **THEN** the system allows login and grants access to the application

#### Scenario: Disabled user cannot login
- **WHEN** a user is disabled (set to `approved = false` after being approved)
- **THEN** subsequent login attempts fail or grant temporary access until re-login is required

### Requirement: Admin approval functionality
The system SHALL provide admins with the ability to approve or reject pending user registrations.

#### Scenario: Admin approves a pending user
- **WHEN** an admin calls the approval endpoint for a pending user
- **THEN** the user is set to `approved = true` and `approvedBy` is set to the admin user's ID

#### Scenario: Admin rejects a pending user
- **WHEN** an admin rejects a pending user
- **THEN** the user's record is deleted (or marked as rejected; out of scope for detailed handling)

#### Scenario: Only admins can approve users
- **WHEN** a regular user attempts to call an admin approval endpoint
- **THEN** the system returns a permission error (403 Forbidden)

### Requirement: Approval tracking
The system SHALL track who approved each user for audit purposes.

#### Scenario: Approved user has approvedBy field set
- **WHEN** an admin approves a pending user
- **THEN** the user's `approvedBy` field is set to the approving admin's ID
