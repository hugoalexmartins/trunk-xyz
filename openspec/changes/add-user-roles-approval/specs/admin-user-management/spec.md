## ADDED Requirements

### Requirement: Admin user management page
The system SHALL provide an admin-only page at `/admin/users` where admins can view and manage user accounts.

#### Scenario: Admin accesses user management page
- **WHEN** an admin (role='admin') navigates to `/admin/users`
- **THEN** the page loads and displays the list of users

#### Scenario: Regular user cannot access admin page
- **WHEN** a regular user (role='regular') navigates to `/admin/users`
- **THEN** the system redirects to home page or shows access denied

#### Scenario: Not authenticated user cannot access admin page
- **WHEN** an unauthenticated user navigates to `/admin/users`
- **THEN** the system redirects to login page

### Requirement: Pending user list
The system SHALL display users awaiting approval in the admin interface.

#### Scenario: Admin sees pending users
- **WHEN** an admin views the user management page
- **THEN** pending users (approved=false) are displayed in a list with email and signup date

#### Scenario: Approved users appear in separate section
- **WHEN** an admin views the user management page
- **THEN** approved users (approved=true) are shown separately or can be filtered

### Requirement: User filtering
The system SHALL allow admins to filter the user list by approval status.

#### Scenario: Filter by pending users
- **WHEN** an admin selects "Pending" filter
- **THEN** only users with `approved=false` are displayed

#### Scenario: Filter by approved users
- **WHEN** an admin selects "Approved" filter
- **THEN** only users with `approved=true` are displayed

#### Scenario: Filter by all users
- **WHEN** an admin selects "All" filter
- **THEN** all users are displayed

### Requirement: User approval actions
The system SHALL allow admins to approve users directly from the user management interface.

#### Scenario: Admin approves a pending user
- **WHEN** an admin clicks the approve button next to a pending user
- **THEN** the user is marked as `approved=true` and the list updates immediately

#### Scenario: Admin rejects a pending user
- **WHEN** an admin clicks reject on a pending user
- **THEN** the user is removed from the system (or marked as rejected)

### Requirement: User disable/enable functionality
The system SHALL allow admins to disable and re-enable approved users.

#### Scenario: Admin disables an approved user
- **WHEN** an admin clicks the disable button for an approved user
- **THEN** the user is set to `approved=false`, preventing login

#### Scenario: Admin re-enables a disabled user
- **WHEN** an admin clicks the enable button for a disabled user
- **THEN** the user is set to `approved=true`, allowing login again

#### Scenario: Disabled user cannot login
- **WHEN** a disabled user attempts to login
- **THEN** login fails or they are denied access
