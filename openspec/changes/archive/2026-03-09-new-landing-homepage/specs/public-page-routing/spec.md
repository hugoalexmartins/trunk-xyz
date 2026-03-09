## ADDED Requirements

### Requirement: Landing page accessible to unauthenticated users
The landing page at `/` SHALL be publicly accessible to users without authentication.

#### Scenario: Unauthenticated user can view landing page
- **WHEN** user is not authenticated and navigates to `/`
- **THEN** landing page renders with hero section and feature showcase

#### Scenario: Landing page does not require auth token
- **WHEN** unauthenticated user requests `/`
- **THEN** page loads without requiring JWT token or session cookie

### Requirement: Authenticated users redirect to application
The landing page routing SHALL redirect authenticated users to the application timeline instead of showing the landing page.

#### Scenario: Authenticated user is redirected to timeline
- **WHEN** authenticated user navigates to `/`
- **THEN** client-side redirect routes user to `/timeline`

#### Scenario: Redirect happens before landing page renders
- **WHEN** authenticated user loads the page
- **THEN** landing page does not flash or display; redirect is immediate using useAuth() hook

#### Scenario: User can logout and return to landing page
- **WHEN** authenticated user logs out
- **THEN** subsequent navigation to `/` displays landing page (not redirect)

### Requirement: Navigation flow from landing page to auth
The landing page SHALL provide clear navigation paths to signup and login pages.

#### Scenario: Sign Up button navigation works
- **WHEN** user clicks "Sign Up" button on landing page
- **THEN** user navigates to `/auth/signup` and signup form displays

#### Scenario: Login button navigation works
- **WHEN** user clicks "Login" button on landing page
- **THEN** user navigates to `/auth/login` and login form displays

#### Scenario: Auth pages have back navigation
- **WHEN** user is on auth page (/auth/signup or /auth/login)
- **THEN** user can navigate back to landing page or other pages

### Requirement: No authentication required for landing page
The landing page SHALL not be protected by ProtectedRoute or require authentication.

#### Scenario: Landing page is unprotected
- **WHEN** landing page component renders
- **THEN** component is not wrapped in ProtectedRoute

#### Scenario: Landing page uses useAuth hook for redirect logic only
- **WHEN** landing page loads
- **THEN** useAuth() hook is used to check auth state; if authenticated, client-side redirect to /timeline occurs
