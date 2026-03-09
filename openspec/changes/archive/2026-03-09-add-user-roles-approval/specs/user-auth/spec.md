## MODIFIED Requirements

### Requirement: User signup process
The system SHALL register new users with email and password, creating them in a pending state awaiting admin approval.

#### Scenario: User completes signup form
- **WHEN** a user enters email and password and submits the signup form
- **THEN** the user is created in the database with `approved=false` and `role='regular'`

#### Scenario: Signup succeeds for new email
- **WHEN** a user signs up with a new email
- **THEN** the signup succeeds and the user is notified they await admin approval

#### Scenario: Signup fails for duplicate email
- **WHEN** a user tries to signup with an email already in the system
- **THEN** the system returns an error indicating the email is already registered

### Requirement: User login with approval check
The system SHALL verify user credentials and approval status during login.

#### Scenario: Approved user can login
- **WHEN** an approved user enters valid email and password
- **THEN** the system returns a JWT token and authentication succeeds

#### Scenario: Pending user cannot access after login
- **WHEN** a pending user enters valid email and password
- **THEN** the system returns a response with `approved: false` and frontend denies access (redirect to login or pending screen)

#### Scenario: Disabled user cannot login
- **WHEN** a disabled user (previously approved, now `approved=false`) enters valid email and password
- **THEN** the system returns a response indicating access denied

#### Scenario: Invalid credentials fail
- **WHEN** a user enters invalid email or password
- **THEN** login fails with an authentication error

### Requirement: Authenticated user object
The system SHALL include user role and approval status in the authenticated user object.

#### Scenario: User context includes role
- **WHEN** a user is authenticated
- **THEN** the `useAuth()` hook returns `user.role` (one of: 'admin', 'regular')

#### Scenario: User context includes approval status
- **WHEN** a user is authenticated
- **THEN** the `useAuth()` hook returns `user.approved` (boolean)

#### Scenario: Protected routes check approval status
- **WHEN** a user navigates to a protected route
- **THEN** the system checks both authentication and `approved === true` before granting access
