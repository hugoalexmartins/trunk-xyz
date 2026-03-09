## Why

The application currently has no user authentication, meaning anyone can create, read, modify, and delete any event or pipeline. As the recruitment event tracking system grows, we need to restrict access and audit who made what changes. User authentication is foundational to implementing role-based access control, user-specific event views, and maintaining data integrity in multi-user scenarios.

## What Changes

- Add user registration and login system with secure password handling (bcrypt hashing)
- Implement JWT-based session management for API authentication
- Add "current user" context throughout the application for authorization
- Protect API endpoints to require authentication
- Create authentication UI pages (login, signup, profile)
- Add optional user metadata to events (who created/modified)
- Implement logout functionality and session expiration
- Add user menu to header with profile and logout options

## Capabilities

### New Capabilities
- `user-auth`: User registration, login, logout, and password management with bcrypt hashing and JWT tokens
- `user-context`: React context and hooks to access current authenticated user throughout the app
- `protected-routes`: Route middleware to redirect unauthenticated users to login
- `event-ownership`: Optional event creator tracking and user-scoped event queries (foundation for future authorization)

### Modified Capabilities
- `events-api`: Events API now requires authentication; responses include creator information; optional filtering by user
- `header-navigation`: Header now shows authenticated user menu with logout option

## Impact

**Database**:
- Add `User` model (email, passwordHash, createdAt, updatedAt)
- Add `Session` model (userId, token, expiresAt)
- Add optional `createdById` field to `Event` model

**API**:
- New endpoints: POST /auth/signup, POST /auth/login, POST /auth/logout, GET /auth/me
- All event endpoints now require authentication header
- Event endpoints include `creator` in responses

**Frontend**:
- New pages: /auth/login, /auth/signup, /auth/profile
- New hook: `useAuth()` for current user access
- Modified components: Header (add user menu), all event-related pages (show loading during auth check)
- Modified components: Protected route wrapper to redirect unauthenticated users

**Dependencies**:
- `bcryptjs` for password hashing
- `jsonwebtoken` for JWT creation/verification

**Breaking Changes**:
- All API endpoints now require `Authorization: Bearer <token>` header
- Existing API clients without authentication will receive 401 Unauthorized
