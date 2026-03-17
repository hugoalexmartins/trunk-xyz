## Why

The application currently lacks a cohesive authenticated user shell — after login, users have no consistent navigation, header, or footer that persists across pages. This change establishes the post-login UI foundation: a sticky header with primary navigation and user dropdown, a slide-in mobile drawer, sub-pages under `/user/*`, a component gallery dashboard, and a rich footer — all built on the existing neo-brutalism design system.

## What Changes

- Add `/user` route that redirects to `/user/dashboard`
- Add `/user/dashboard` page — full design system component gallery (buttons, cards, inputs, badges, typography)
- Add `/user/timeline` page — placeholder, ready for real content
- Add `/user/events` page — placeholder, ready for real content
- All `/user/*` routes wrapped in `ProtectedRoute` (login required)
- New `UserShellLayout` component: sticky header + scrollable content + footer
- Header: logo, nav links (Dashboard · Timeline · Events) with active thick-border indicator, user avatar dropdown (initials + name + email → Profile, Change Password, Logout)
- Mobile: hamburger → slide-in drawer replacing top nav
- Footer: nav links + copyright + social icons, neo-brutalism styled
- Scroll-triggered shadow on sticky header

## Capabilities

### New Capabilities
- `user-shell-layout`: Authenticated app shell — sticky header, nav, user dropdown, mobile drawer, footer
- `user-pages`: The `/user/*` page routes (dashboard, timeline, events) and their content structure

### Modified Capabilities
- `navigation`: Extends navigation to include authenticated `/user/*` routes alongside existing public routes
- `public-page-routing`: `/user` prefix routing added to the Pages Router configuration

## Impact

- **New files**: `web/src/pages/user/index.tsx`, `user/dashboard.tsx`, `user/timeline.tsx`, `user/events.tsx`
- **New components**: `UserShellLayout`, `UserHeader`, `UserNav`, `UserDropdown`, `MobileDrawer`, `UserFooter`
- **Existing components reused**: `Button`, `Card`, `Input`, `Badge`, `ProtectedRoute`, design system tokens
- **No breaking changes** to existing routes or APIs
- **No new dependencies** — Tailwind CSS, Next.js router, and existing auth hooks are sufficient
