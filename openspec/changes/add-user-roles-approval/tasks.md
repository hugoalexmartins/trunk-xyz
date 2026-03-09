## 1. Database Schema & Migrations

- [x] 1.1 Add `role` enum column to User model (values: 'admin', 'regular', default: 'regular')
- [x] 1.2 Add `approved` boolean column to User model (default: false)
- [x] 1.3 Add `approvedBy` userId column to User model (nullable, references User.id)
- [x] 1.4 Create Prisma migration for User schema changes
- [x] 1.5 Run migration and generate Prisma types with `pnpm --filter=shared run db:generate`
- [x] 1.6 Backfill existing users: set `approved=true`, `role='regular'` for all current users

## 2. Authentication API Updates

- [x] 2.1 Update signup procedure to create user with `approved=false`, `role='regular'`
- [x] 2.2 Update login procedure to return `approved` status in response
- [x] 2.3 Update getCurrentUser procedure to include `approved` and `role` fields
- [x] 2.4 Add validation: pending users receive response with `approved=false` flag

## 3. User Context & Hooks Updates

- [x] 3.1 Update UserContext type to include `approved` and `role` fields
- [x] 3.2 Update UserProvider to handle `approved` and `role` from API response
- [x] 3.3 Update `useAuth()` hook to return `approved` and `role` properties
- [x] 3.4 Update `useLogin()` hook to parse `approved` status from login response

## 4. Admin User Management API (tRPC)

- [x] 4.1 Create admin router with protected procedures: `admin.listUsers()`
- [x] 4.2 Implement `admin.listUsers()` to return all users with their approval status and email
- [x] 4.3 Implement `admin.approveUser(userId)` to set `approved=true` and `approvedBy=adminId`
- [x] 4.4 Implement `admin.rejectUser(userId)` to delete or mark rejected user
- [x] 4.5 Implement `admin.disableUser(userId)` to set `approved=false`
- [x] 4.6 Implement `admin.enableUser(userId)` to set `approved=true`
- [x] 4.7 Add role check middleware: all admin procedures require `user.role === 'admin'`

## 5. Admin User Management Page

- [x] 5.1 Create `/web/src/features/admin-user-management/` directory structure
- [x] 5.2 Create page file at `/web/src/pages/admin/users.tsx`
- [x] 5.3 Build `AdminUserList` component to display all users in a table
- [x] 5.4 Build `UserFilterBar` component for filtering (pending/approved/all)
- [x] 5.5 Build `UserActionButtons` component with approve/reject/disable/enable buttons
- [x] 5.6 Implement React Query hooks for fetching users and performing actions
- [x] 5.7 Add loading and error states to admin page
- [x] 5.8 Add success/error notifications when actions complete

## 6. Protected Routes Update

- [x] 6.1 Update `ProtectedRoute` component to check both `isLoading` and `approved` status
- [x] 6.2 Redirect pending users to a "Pending Approval" page or login
- [x] 6.3 Redirect disabled users to access denied page
- [x] 6.4 Create PendingApprovalScreen component for users awaiting approval

## 7. Admin Route Protection

- [x] 7.1 Create `AdminRoute` component (or update ProtectedRoute) to check `user.role === 'admin'`
- [x] 7.2 Redirect non-admin users away from `/admin/*` routes
- [x] 7.3 Apply AdminRoute wrapper to `/admin/users` page

## 8. Header Navigation Update

- [x] 8.1 Update Header component to conditionally render "Admin" link
- [x] 8.2 Show "Admin" link only when `user.role === 'admin'`
- [x] 8.3 Link points to `/admin/users`
- [x] 8.4 Style the admin link consistently with other header items

## 9. Seed Command for Development

- [x] 9.1 Create or extend seed script at `/packages/shared/prisma/seed.ts`
- [x] 9.2 Add function to create an admin user with email `admin@example.com` and default password
- [x] 9.3 Add CLI command: `pnpm --filter=shared run db:seed-admin`
- [x] 9.4 Ensure seed script is idempotent (doesn't fail if admin already exists)
- [x] 9.5 Document seed command in README or CLAUDE.md

## 10. Frontend Behavior for Pending Users

- [x] 10.1 Update login page to show message when user is pending approval
- [x] 10.2 Create PendingApprovalScreen component with helpful messaging
- [x] 10.3 Allow pending user to see approval status but block access to main app
- [x] 10.4 Provide logout button on pending approval screen

## 11. Testing & Verification

- [ ] 11.1 Write unit test for admin.listUsers() endpoint
- [ ] 11.2 Write unit test for admin.approveUser() endpoint with role check
- [ ] 11.3 Write unit test for admin.disableUser() endpoint
- [ ] 11.4 Write integration test: signup creates pending user, admin approves, user can login
- [ ] 11.5 Write integration test: pending user cannot access protected routes
- [ ] 11.6 Write integration test: disabled user cannot login or access routes
- [ ] 11.7 Manual test: verify admin menu only appears for admins
- [ ] 11.8 Manual test: verify non-admin users are redirected from /admin/users
- [x] 11.9 Run all CI checks locally: `pnpm test`, `pnpm tc`, `pnpm lint`, `pnpm build:check` (TypeScript check passed)

## 12. Documentation & Deployment

- [x] 12.1 Update CLAUDE.md with role-based access control information
- [x] 12.2 Document new admin endpoints in API documentation
- [x] 12.3 Document approval workflow for admins
- [x] 12.4 Create deployment checklist (migrate DB, seed admin, deploy backend, deploy frontend)
- [x] 12.5 Verify all tests pass before PR (All CI checks: TypeScript ✓, ESLint ✓, Tests 42/42 ✓, Build ✓)
- [ ] 12.6 Create PR with summary of user roles and approval workflow changes
