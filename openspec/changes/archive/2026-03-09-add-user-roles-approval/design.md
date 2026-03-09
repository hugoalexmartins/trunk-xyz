## Context

Currently, users are created as active on signup, with no role or approval mechanism. The application has existing authentication (JWT-based), protected routes, and a user context system. We need to layer in role-based access control (RBAC) for user management while maintaining data isolation—admins cannot see other users' data, only manage their accounts.

## Goals / Non-Goals

**Goals:**
- Implement a two-role system (admin, regular) with approval workflow
- Prevent unauthorized users (pending or disabled) from accessing the application
- Provide admins with a UI to approve/reject/disable users
- Add seed mechanism for development (create initial admin)
- Maintain strict data isolation (users only see their own events)

**Non-Goals:**
- Role-based access to other users' events or data (strict data isolation)
- Audit logging of approval actions
- Bulk user management or CSV import
- Email notifications for approvals

## Decisions

### 1. User Status Model
**Decision**: Add three fields to the User model: `role` (enum: admin | regular), `approved` (boolean), `approvedBy` (user ID or null).

**Rationale**: Explicit approval status allows pending users to exist in the system without granting access. The `approvedBy` field tracks who performed the approval for audit purposes at the data level.

**Alternatives considered**:
- Single `status` enum field (pending/active/disabled): Less flexible if we need additional states later
- Approval as separate table: Adds complexity; simpler to denormalize for this use case

### 2. Signup Flow
**Decision**: Signup creates user with `approved = false`, `role = 'regular'` by default. Seed command creates admin users with `approved = true`, `role = 'admin'`.

**Rationale**: Clear separation—humans approve, seeds bootstrap. Normal signup flow doesn't bypass approval.

**Alternatives considered**:
- Auto-approve first user as admin: Violates governance intent
- Require role selection on signup: UX complexity; better to have admins assign roles

### 3. Authentication & Access Control
**Decision**: Modify login response to include `approved` status. Frontend checks `approved` before granting access. Protected routes check both authentication and `approved === true`. Update `useAuth()` hook to return `approved` status.

**Rationale**: JWT doesn't need to be modified (keep it stateless); approval check happens on each page load or protected route. If admin disables a user mid-session, they are still logged in but new page loads fail, forcing re-login.

**Alternatives considered**:
- Include `approved` in JWT, refresh on approval: Requires token refresh mechanism; current setup doesn't have one
- Server-side session check: Adds server load; JWT is already stateless

### 4. Admin User List & Approval UI
**Decision**: Create new page `/admin/users` (protected with role check `role === 'admin'`). Display pending users with filters and toggle buttons for approve/disable. Use tRPC procedures: `admin.listUsers()`, `admin.approveUser()`, `admin.disableUser()`, `admin.enableUser()`.

**Rationale**: Isolated admin section prevents accidental exposure. tRPC mutations provide type-safe API calls. Role check on frontend + `protectedProcedure` on backend ensures defense in depth.

**Alternatives considered**:
- Inline admin functions in existing pages: Clutters UI; hard to reason about permissions
- GraphQL subscriptions for real-time updates: Unnecessary complexity; polling is sufficient

### 5. Header Admin Menu Link
**Decision**: Update header component to show "Admin" link (pointing to `/admin/users`) only when `user.role === 'admin'`. Link only renders for admins.

**Rationale**: Principle of least privilege—hide functionality admins shouldn't use. Simplifies UX for regular users.

### 6. Seed Command
**Decision**: Create or extend existing seed command to insert one admin user (e.g., `admin@example.com` / `password`). Command: `pnpm --filter=shared run db:seed-admin` or update existing `db:seed` to include admin option.

**Rationale**: Developers need a way to bootstrap admin access locally without manual DB edits.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Approval status not refreshed mid-session | Users disabled during active session remain logged in until next login. Acceptable for this phase; can add token refresh later if needed. |
| Admin users can still see all users in pending list, creating privacy concern | Data is user account records (not sensitive event data), and admins have legitimate need to access. Ensure no event/timeline data leaks. |
| Database migration required for existing users | Backfill `approved = true`, `role = 'regular'` for all existing users. Clear migration path needed. |
| Role enumeration during signup (security) | Signup form doesn't reveal if user is admin/regular; role is assigned on approval. Minimal risk. |

## Migration Plan

1. Add `role`, `approved`, `approvedBy` columns to User table (migration)
2. Backfill: Set `approved = true`, `role = 'regular'` for all existing users
3. Deploy backend (new tRPC endpoints, updated auth logic, seed command)
4. Deploy frontend (updated login, `useAuth()` hook, protected routes, admin page)
5. Seed initial admin user with new command
6. Test approval workflow manually

## Open Questions

- Should rejected users be able to re-signup? (Out of scope for this change)
- Do we need rate limiting on signup to prevent spam? (Out of scope)
- Should approval be role-specific (only super-admins approve other admins)? (No—any admin can approve)
