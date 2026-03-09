## ADDED Requirements

### Requirement: User role assignment
The system SHALL support two user roles: `admin` and `regular`. Each user has exactly one role assigned at the time of approval.

#### Scenario: New user gets regular role by default
- **WHEN** a new user signs up
- **THEN** they are created with `role = 'regular'`

#### Scenario: Admin assigns role during approval
- **WHEN** an admin approves a pending user
- **THEN** the user retains `role = 'regular'` (only explicit admin role is different)

#### Scenario: Admin user role is set
- **WHEN** a user is seeded or created as admin
- **THEN** they have `role = 'admin'`

### Requirement: Role-based authorization
The system SHALL check user role before granting access to admin-only features.

#### Scenario: Admin user can access admin panel
- **WHEN** a user with `role = 'admin'` navigates to `/admin/users`
- **THEN** the page loads successfully

#### Scenario: Regular user cannot access admin panel
- **WHEN** a user with `role = 'regular'` navigates to `/admin/users`
- **THEN** they are redirected to the home page or access denied page

#### Scenario: Role is included in authenticated user context
- **WHEN** a user is logged in
- **THEN** the `useAuth()` hook returns `user.role` (either 'admin' or 'regular')
