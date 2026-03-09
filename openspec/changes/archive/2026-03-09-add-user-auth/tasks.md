# User Authentication Implementation Tasks

## 1. Database Schema

- [x] 1.1 Add User model to Prisma schema with id, email, passwordHash, isApproved, createdAt, updatedAt
- [x] 1.2 Update Event model to include optional createdById and creator relation
- [x] 1.3 Create Prisma migration for User model and Event schema changes
- [x] 1.4 Run migration to update database schema
- [x] 1.5 Generate updated Prisma types with `pnpm run db:generate`

## 2. Dependencies

- [x] 2.1 Install bcryptjs package via pnpm
- [x] 2.2 Install jsonwebtoken package via pnpm
- [x] 2.3 Verify both packages are in web/package.json and type definitions are available

## 3. Authentication Utilities

- [x] 3.1 Create web/src/server/auth/hash.ts with hashPassword and verifyPassword functions using bcryptjs
- [x] 3.2 Create web/src/server/auth/jwt.ts with createToken and verifyToken functions using jsonwebtoken
- [x] 3.3 Create web/src/server/auth/constants.ts with JWT_SECRET, token expiration duration, and password validation rules
- [x] 3.4 Create web/src/server/auth/middleware.ts with authMiddleware function to extract and validate JWT from cookies

## 4. tRPC Authentication

- [x] 4.1 Update web/src/server/api/trpc.ts to export publicProcedure and protectedProcedure
- [x] 4.2 Implement authentication middleware that checks for valid JWT token
- [x] 4.3 Attach user context to protectedProcedure (inject userId and email)
- [x] 4.4 Create helper to handle authentication errors with proper 401 responses

## 5. Auth API Endpoints

- [x] 5.1 Create web/src/server/api/routers/auth.ts with signup procedure
  - [x] Accept email and password, validate inputs
  - [x] Check for duplicate email
  - [x] Hash password and create User record
  - [x] Return success message (no auto-login)
- [x] 5.2 Implement login procedure in auth router
  - [x] Accept email and password
  - [x] Find user and verify password
  - [x] Generate JWT token and set HTTP-only cookie
  - [x] Return user object (id, email)
- [x] 5.3 Implement logout procedure in auth router
  - [x] Clear authentication cookie
  - [x] Return success message
- [x] 5.4 Implement getCurrentUser procedure in auth router
  - [x] Access user from protected context
  - [x] Return user object (id, email, createdAt) without passwordHash
- [x] 5.5 Add auth router to web/src/server/api/root.ts

## 6. Frontend Context and Hooks

- [x] 6.1 Create web/src/contexts/UserContext.ts with user, isLoading, error state
- [x] 6.2 Create web/src/contexts/UserProvider.tsx component that:
  - [x] Wraps application with UserContext.Provider
  - [x] Calls getCurrentUser API once on component mount
  - [x] Handles loading and error states
  - [x] Updates context when user logs in/out
- [x] 6.3 Create web/src/hooks/useAuth.ts hook that:
  - [x] Returns user, isLoading, error from UserContext
  - [x] Includes mounted state check to prevent hydration mismatch
- [x] 6.4 Create web/src/hooks/useLogin.ts hook that:
  - [x] Calls login API with email/password
  - [x] Updates UserContext on success
  - [x] Returns isLoading, error, and mutate function
- [x] 6.5 Create web/src/hooks/useSignup.ts hook that:
  - [x] Calls signup API with email/password
  - [x] Returns success state and validation errors
  - [x] Does not auto-login (user must login after signup)

## 7. Protected Routes

- [x] 7.1 Create web/src/components/ProtectedRoute.tsx wrapper component that:
  - [x] Accepts children and optional returnUrl parameter
  - [x] Uses useAuth hook to check authentication
  - [x] Shows loading spinner while auth is checking
  - [x] Redirects to /auth/login if unauthenticated (with returnUrl)
  - [x] Renders children if authenticated
- [x] 7.2 Wrap existing pages (timeline, recruitment, recruitment/[pipelineId]) with ProtectedRoute

## 8. Authentication Pages

- [x] 8.1 Create web/src/pages/auth/login.tsx page with:
  - [x] Email and password input fields
  - [x] Submit button with loading state
  - [x] Error message display
  - [x] Link to signup page
  - [x] Form validation
  - [x] Redirect to timeline on successful login
- [x] 8.2 Create web/src/pages/auth/signup.tsx page with:
  - [x] Email and password input fields
  - [x] Password confirmation field
  - [x] Submit button with loading state
  - [x] Error message display (including validation errors)
  - [x] Link to login page
  - [x] Form validation (minimum 8 character password)
  - [x] Redirect to login with success message after signup

## 9. Update Header Component

- [x] 9.1 Update web/src/components/Header.tsx to:
  - [x] Import useAuth hook
  - [x] Add mounted state check for hydration safety
  - [x] Show user email and logout button when authenticated
  - [x] Show Login and Sign Up links when unauthenticated
  - [x] Handle logout by calling useLogout and redirecting to login
  - [x] Keep theme toggle button visible in both states
- [x] 9.2 Create web/src/hooks/useLogout.ts hook that calls logout API and clears context

## 10. Update Application Setup

- [x] 10.1 Update web/src/pages/_app.tsx to:
  - [x] Wrap QueryClientProvider with UserProvider
  - [x] Ensure theme and auth providers are in correct order
  - [x] Keep CSS imports

## 11. Update Event API

- [x] 11.1 Update event create procedure to:
  - [x] Change from publicProcedure to protectedProcedure
  - [x] Automatically set createdById to current user from context
- [x] 11.2 Update event list procedures to:
  - [x] Change from publicProcedure to protectedProcedure
  - [x] Include creator information in responses (nested User object)
- [x] 11.3 Update event get/update/delete procedures to use protectedProcedure
- [x] 11.4 Verify all event API endpoints now require authentication

## 12. Update Event Components

- [x] 12.1 Update web/src/components/EventCard.tsx to display creator email if available
- [x] 12.2 Update web/src/components/Timeline.tsx to handle protected content appropriately

## 13. Update Event Pages

- [x] 13.1 Wrap web/src/pages/timeline.tsx with ProtectedRoute
- [x] 13.2 Wrap web/src/pages/recruitment.tsx with ProtectedRoute
- [x] 13.3 Wrap web/src/pages/recruitment/[pipelineId].tsx with ProtectedRoute
- [x] 13.4 Update web/src/pages/events/new.tsx to:
  - [x] Wrap with ProtectedRoute
  - [x] Remove publicProcedure calls (now protectedProcedure)

## 14. Testing & Verification

- [x] 14.1 Start dev server: `pnpm run dev:web`
- [x] 14.2 Test signup flow: navigate to /auth/signup, create account, verify form validation
- [x] 14.3 Test login flow: login with created account, verify redirect to timeline
- [x] 14.4 Test logout: verify user menu logout works, redirects to login
- [x] 14.5 Test protected routes: verify unauthenticated access redirects to login
- [x] 14.6 Test event creation: create event while logged in, verify creator is set
- [x] 14.7 Test event list: verify events show creator information
- [x] 14.8 Test dark mode still works: verify theme toggle works with auth
- [x] 14.9 Test token expiration: manually expire cookie, verify 401 handling redirects to login
- [x] 14.10 Run TypeScript check: `pnpm tc` - no errors
- [x] 14.11 Run build check: `pnpm build:check` - no errors
- [x] 14.12 Run linting: `pnpm run lint` - fix any auth-related issues

## 15. Documentation

- [x] 15.1 Update CLAUDE.md to document new auth system and usage patterns
- [x] 15.2 Add comments to key auth files (jwt.ts, middleware, UserProvider)
