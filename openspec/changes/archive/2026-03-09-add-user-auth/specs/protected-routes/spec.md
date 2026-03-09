## ADDED Requirements

### Requirement: ProtectedRoute Component
The system SHALL provide component wrapper that redirects unauthenticated users to login.

#### Scenario: Authenticated user accesses protected page
- **WHEN** authenticated user navigates to protected page (timeline, recruitment, etc.)
- **THEN** page loads and displays normally

#### Scenario: Unauthenticated user redirected to login
- **WHEN** unauthenticated user attempts to access protected page
- **THEN** user is redirected to /auth/login with returnUrl parameter

#### Scenario: User redirected after login
- **WHEN** user logs in after being redirected from protected page
- **THEN** after successful login, user is redirected back to original intended page

#### Scenario: Loading state during auth check
- **WHEN** page mounts and auth state is loading
- **THEN** page displays loading spinner instead of flashing unauthorized content

### Requirement: Public Auth Pages
The system SHALL provide auth pages (login, signup) accessible without authentication.

#### Scenario: Unauthenticated user accesses login page
- **WHEN** user navigates to /auth/login
- **THEN** login form is displayed

#### Scenario: Unauthenticated user accesses signup page
- **WHEN** user navigates to /auth/signup
- **THEN** signup form is displayed

#### Scenario: Authenticated user redirected from auth pages
- **WHEN** authenticated user navigates to /auth/login or /auth/signup
- **THEN** user is redirected to homepage or timeline

### Requirement: API-Level Authentication Requirement
The system SHALL require valid JWT token for all event-related API calls.

#### Scenario: Unauthenticated API call fails
- **WHEN** API request lacks valid JWT token in Authorization header or cookie
- **THEN** API returns 401 Unauthorized response

#### Scenario: Expired token fails
- **WHEN** API request includes expired JWT token
- **THEN** API returns 401 Unauthorized response

#### Scenario: Authenticated API call succeeds
- **WHEN** API request includes valid non-expired JWT token
- **THEN** API processes request and returns results normally

### Requirement: Auth Pages Not Protected
The system SHALL allow unauthenticated users to access registration and login pages.

#### Scenario: Signup endpoint public
- **WHEN** unauthenticated user calls POST /auth/signup with valid credentials
- **THEN** endpoint processes request without requiring prior authentication

#### Scenario: Login endpoint public
- **WHEN** unauthenticated user calls POST /auth/login with valid credentials
- **THEN** endpoint processes request without requiring prior authentication
