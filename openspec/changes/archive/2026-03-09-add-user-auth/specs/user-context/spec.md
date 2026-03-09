## ADDED Requirements

### Requirement: useAuth Hook
The system SHALL provide a React hook to access current authenticated user and auth state.

#### Scenario: Hook returns current user
- **WHEN** component calls useAuth() hook while user is logged in
- **THEN** hook returns object with user (id, email), isLoading false, and error null

#### Scenario: Hook returns loading state during hydration
- **WHEN** component mounts and auth state is being fetched from server
- **THEN** hook returns isLoading true to prevent flash of content

#### Scenario: Hook returns null when unauthenticated
- **WHEN** component calls useAuth() hook without valid JWT token
- **THEN** hook returns object with user null, isLoading false, and error null

#### Scenario: Hook detects auth errors
- **WHEN** fetchCurrentUser API call fails (network error, server error, etc.)
- **THEN** hook returns error object describing failure, user null, isLoading false

### Requirement: User Context Provider
The system SHALL provide context wrapper to manage authentication state application-wide.

#### Scenario: Context wrapper in application
- **WHEN** application starts
- **THEN** UserContext provider wraps all pages/components and calls getCurrentUser API once on mount

#### Scenario: Context persists across navigation
- **WHEN** user navigates between pages
- **THEN** user context remains available without re-fetching from API

#### Scenario: Context clears on logout
- **WHEN** user logs out
- **THEN** context updates to set user null, triggering redirect to login page

### Requirement: Auth State Hydration
The system SHALL safely hydrate auth state without causing hydration mismatches with next-themes.

#### Scenario: Mounted check prevents hydration mismatch
- **WHEN** page loads on client side
- **THEN** component waits for mounted state before rendering user-specific content

#### Scenario: Theme state and auth state sync
- **WHEN** page contains both dark mode and auth checks
- **THEN** both systems use mounted state checks to prevent hydration mismatch

### Requirement: Login/Signup Mutation Hooks
The system SHALL provide hooks for components to handle login and signup.

#### Scenario: useLogin hook
- **WHEN** user submits login form with email and password
- **THEN** hook calls login API, on success updates context with user and redirects to homepage

#### Scenario: useSignup hook
- **WHEN** user submits signup form with email and password
- **THEN** hook calls signup API, on success redirects to login page with success message

#### Scenario: Mutation error handling
- **WHEN** login/signup API call fails
- **THEN** hook returns error object that component displays to user
