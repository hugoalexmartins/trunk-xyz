## Context

The application currently lacks user authentication, making it impossible to track who performed actions and enforce access control. This design establishes JWT-based authentication to secure API endpoints and restrict data access. The system integrates with the existing Prisma + tRPC architecture while maintaining compatibility with the events model.

## Goals / Non-Goals

**Goals:**
- Implement secure user registration and login with bcrypt password hashing
- Use JWT tokens for stateless API authentication
- Establish current user context for authorization decisions
- Protect all event endpoints with authentication
- Provide seamless redirect experience for unauthenticated users
- Enable future role-based access control (RBAC) and data ownership
- Create User model with foundation for approval status (Phase 2)

**Non-Goals:**
- User approval workflow (Phase 2 feature)
- OAuth/social login (Phase 2 feature)
- Multi-factor authentication (Phase 2 feature)
- Password reset flows (Phase 2 feature)
- Role-based access control implementation (Phase 2 feature)
- Audit logging of all user actions (Phase 2 feature)

## Decisions

### 1. JWT-Based Stateless Authentication
**Decision**: Use JWT tokens instead of server-side sessions.

**Rationale**:
- Stateless: No session table lookups for every request
- Scalable: Works across multiple servers without shared state
- Simple: Reduces complexity compared to managing session storage
- Aligns with API-first architecture

**Tradeoff**: Revocation requires blacklist (mitigated by short expiry + refresh tokens in Phase 2)

### 2. Middleware at tRPC Router Level
**Decision**: Implement authentication check as tRPC middleware in the router, not at individual procedure level.

**Rationale**:
- Cleaner, more maintainable than per-procedure checks
- Easy to apply to all procedures at once
- Can be disabled for public endpoints (signup, login)
- Follows tRPC best practices

**Tradeoff**: Requires explicit `publicProcedure` for auth-free endpoints

### 3. User Model in Prisma
**Decision**: Create User model with email, passwordHash, timestamps, and approval status field for Phase 2.

**Schema**:
```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  passwordHash String
  isApproved Boolean  @default(false)  // for Phase 2 approval workflow
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  events    Event[]
}

model Event {
  // ... existing fields
  createdById String?
  creator     User?     @relation(fields: [createdById], references: [id])
}
```

**Rationale**:
- Minimal fields for MVP
- Email as unique identifier for login
- passwordHash never exposed to frontend
- Optional createdById allows gradual migration of events
- isApproved field ready for Phase 2 user approval workflow (users register but wait for admin approval)

### 4. JWT Token Structure
**Payload**:
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234568890
}
```

**Storage**: HTTP-only cookie with `Secure` + `SameSite=Strict` flags (prevents XSS/CSRF)

**Duration**: 24 hours (1-week refresh cycle in Phase 2)

### 5. Protected vs Public Procedures
**Decision**: Create `publicProcedure` for signup/login, all others require authentication.

```typescript
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(authMiddleware);
```

**Rationale**:
- Explicit about what requires auth
- Signup/login must be accessible before auth token exists
- All event operations require authentication

### 6. Frontend Auth Flow
**Decision**: Implement `useAuth()` hook with automatic redirect to `/auth/login` for protected pages.

**Context**: UserContext provides current user, loading state, error state

**Automatic Redirect**: Routes wrapped in `<ProtectedRoute>` check for user during hydration

**Rationale**:
- Single source of truth for auth state
- Prevents flash of unprotected content
- Mounted state check prevents hydration mismatch with next-themes

### 7. Password Hashing
**Decision**: Use `bcryptjs` (JavaScript version, works server-side in Node.js)

**Cost Factor**: 10 (balance between security and performance for ~50ms hash time)

**Rationale**:
- Industry standard for password hashing
- Slow by design to resist brute force
- Salts included automatically
- Works with Prisma server-side code

### 8. Dependency Installation
**Decision**: Add `bcryptjs` and `jsonwebtoken` as dependencies in web package.

**Rationale**:
- Both work in Next.js API routes
- No server-only decorators needed initially
- Simplest to implement without adding complexity

### 9. Phase 2: User Approval Workflow
**Future Design**: When users register in Phase 2, they will be marked as `isApproved: false`. An admin user account will be able to approve new users, enabling them to log in. This allows controlled, gradual introduction of users into the application.

**Phase 1 Preparation**:
- isApproved field is already in User model
- Currently all users are auto-approved on signup (could add feature flag in Phase 2 to toggle)
- Admin endpoints for user management will be added in Phase 2

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| **Token Theft via XSS** | HTTP-only cookies prevent JavaScript access; Content Security Policy (CSP) in Phase 2 |
| **Token Revocation Not Instant** | Short expiry (24h) limits exposure; blacklist in Phase 2 if needed |
| **Password Reuse Across Sites** | Users responsible; password reset email verification in Phase 2 |
| **Unauthenticated Event History Loss** | One-time migration during Phase 1; all new events have creator |
| **Rate Limiting Not Implemented** | Add in Phase 2; prevents signup/login brute force attacks |
| **No Refresh Token Rotation** | Accept in MVP; implement in Phase 2 for better security |
| **No User Approval in Phase 1** | Controlled introduction via admin approval coming in Phase 2 |

## Migration Plan

**Phase 1 (This PR)**:
1. Add User and update Event models to Prisma
2. Run migrations
3. Implement auth API endpoints (signup, login, logout, getCurrentUser)
4. Add useAuth hook and ProtectedRoute wrapper
5. Protect all event endpoints
6. Create login/signup pages
7. Update Header with user menu
8. Test entire flow end-to-end

**Phase 2 (Future)**:
- Implement user approval workflow (admin approves new signups)
- Implement password reset email verification
- Add refresh token rotation
- Implement rate limiting on auth endpoints
- Add RBAC for multi-user scenarios (teams, roles)
- Implement audit logging
- Add OAuth options

## Open Questions

1. Should we auto-migrate existing events' `createdById` field, or leave as NULL for historical events? → Decision: Leave as NULL, new events have creator
2. Do we need password complexity validation (minimum length, character types)? → Decision: Yes, minimum 8 characters for Phase 1
3. Should login page remember email address via localStorage? → Decision: No, simpler for MVP
4. What's the email format validation approach? → Decision: Basic regex validation in signup form
5. In Phase 2, should there be a default admin user created, or manual setup? → Decision: Manual setup via database seeding script
