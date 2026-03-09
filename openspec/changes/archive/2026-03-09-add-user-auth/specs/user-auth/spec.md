## ADDED Requirements

### Requirement: User Registration
The system SHALL allow users to create new accounts with email and password.

#### Scenario: Successful registration
- **WHEN** user provides valid email and password (minimum 8 characters) on signup form
- **THEN** user account is created with bcrypt-hashed password and user is redirected to login page with success message

#### Scenario: Invalid password
- **WHEN** user provides password shorter than 8 characters
- **THEN** signup form displays validation error without creating account

#### Scenario: Duplicate email
- **WHEN** user attempts to register with email already in system
- **THEN** signup form displays "email already registered" error without creating account

#### Scenario: Invalid email format
- **WHEN** user provides email that doesn't match valid format
- **THEN** signup form displays email validation error

### Requirement: User Login
The system SHALL authenticate users with email and password, issuing JWT tokens.

#### Scenario: Successful login
- **WHEN** user provides correct email and password
- **THEN** system validates credentials, generates JWT token, sets HTTP-only cookie, and redirects to homepage or intended destination

#### Scenario: Incorrect password
- **WHEN** user provides valid email but incorrect password
- **THEN** login form displays "invalid credentials" error without revealing whether email exists

#### Scenario: Non-existent email
- **WHEN** user attempts to login with email not in system
- **THEN** login form displays "invalid credentials" error

### Requirement: User Logout
The system SHALL allow users to invalidate their session.

#### Scenario: Successful logout
- **WHEN** authenticated user clicks logout button
- **THEN** JWT cookie is cleared and user is redirected to login page

#### Scenario: Logout from protected page
- **WHEN** user logs out from any protected page (timeline, recruitment, etc.)
- **THEN** all subsequent API calls receive 401 Unauthorized until user logs back in

### Requirement: Get Current User
The system SHALL provide API endpoint for frontend to fetch current authenticated user.

#### Scenario: Authenticated user requests current user
- **WHEN** authenticated user calls getCurrentUser endpoint with valid JWT token
- **THEN** endpoint returns user object with id, email, and createdAt (without passwordHash)

#### Scenario: Unauthenticated user requests current user
- **WHEN** user without valid JWT token calls getCurrentUser endpoint
- **THEN** endpoint returns 401 Unauthorized

### Requirement: Password Security
Passwords SHALL be securely hashed using bcrypt before storage.

#### Scenario: Password hashing
- **WHEN** user registers or changes password
- **THEN** password is hashed with bcrypt cost factor 10 before storage

#### Scenario: Password verification
- **WHEN** user attempts to login
- **THEN** submitted password is compared against stored hash using bcrypt verification

### Requirement: JWT Token Security
The system SHALL use secure JWT tokens for authentication with HTTP-only cookies.

#### Scenario: Token in HTTP-only cookie
- **WHEN** user logs in successfully
- **THEN** JWT token is stored in HTTP-only cookie with Secure and SameSite=Strict flags

#### Scenario: Token expiration
- **WHEN** JWT token expires after 24 hours
- **THEN** authenticated requests using expired token receive 401 Unauthorized, user must login again

#### Scenario: Token payload
- **WHEN** JWT token is created
- **THEN** token contains user ID, email, issued-at time, and 24-hour expiration time
