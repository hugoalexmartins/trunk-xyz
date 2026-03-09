## Why

The application currently treats all users equally. To enable proper governance and content moderation, we need a role-based access control system where admins can approve new user registrations and manage user accounts. This prevents unauthorized access and allows administrators to maintain user quality and compliance.

## What Changes

- Add user roles: `admin` and `regular` (2 roles only)
- Require admin approval for new user registrations (users wait in pending state)
- Allow any admin to approve or reject pending users through a dedicated UI
- Admins can disable/enable user accounts through the user management interface
- Add admin menu in the frontend with link to user management list (admin-only visibility)
- Add database seed command to load at least one admin user for development and testing
- **Important**: All users (including admins) only see and manage their own events and timeline. Admins do not have special access to other users' data.

## Capabilities

### New Capabilities
- `user-roles`: Role-based access control system with two roles (admin and regular). Tracks user role in database.
- `user-approval-workflow`: Workflow for new user registration requiring admin approval. Users in pending state cannot access the application until approved.
- `admin-user-management`: Admin-only UI for viewing pending user registrations, filtering, and approving/rejecting or enabling/disabling users.

### Modified Capabilities
- `user-auth`: Update signup to create users in pending state instead of active. Add role assignment during approval.
- `header-navigation`: Add conditional admin menu link (only visible for admin users) pointing to user management.

## Impact

- **Database**: User model schema changes (add `role`, `approved`, `approvedBy` fields)
- **API**: New tRPC endpoints for user approval, user list retrieval, and user status management
- **Frontend**: New admin user management page, updated header with admin menu
- **Seeding**: Add CLI command to seed an admin user for development
- **Authentication**: Users can still login, but non-approved users get access-denied response
- **Data Isolation**: All event access queries remain user-specific; admin role grants no data privileges, only user management capabilities
