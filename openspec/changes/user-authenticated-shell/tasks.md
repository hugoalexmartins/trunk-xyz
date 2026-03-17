## 1. Hooks & Utilities

- [x] 1.1 Create `useScrolled` hook that returns `true` when `window.scrollY > 0`, throttled via `requestAnimationFrame`
- [x] 1.2 Create `useOutsideClick(ref, handler)` hook for dropdown/drawer outside-click dismissal
- [x] 1.3 Create `getUserInitials(name?: string, email?: string): string` utility

## 2. UserHeader Component

- [x] 2.1 Create `UserHeader` component with sticky positioning and scroll shadow (uses `useScrolled`)
- [x] 2.2 Add app logo/name on the left
- [x] 2.3 Add desktop nav links (Dashboard, Timeline, Events) with active thick-border state using `useRouter`
- [x] 2.4 Add hamburger button (mobile only, hidden on md+)
- [x] 2.5 Add `UserDropdown` trigger (avatar with initials) on the right

## 3. UserDropdown Component

- [x] 3.1 Create `UserDropdown` component — absolutely-positioned panel, toggled by avatar click
- [x] 3.2 Show user initials avatar, name, and email at top of panel
- [x] 3.3 Add Profile link (href placeholder)
- [x] 3.4 Add Change Password link (href placeholder)
- [x] 3.5 Add Logout button that calls `useLogout` and redirects to `/auth/login`
- [x] 3.6 Implement outside-click close using `useOutsideClick`
- [x] 3.7 Apply neo-brutalism styling: hard offset shadow, thick border, deep navy

## 4. MobileDrawer Component

- [x] 4.1 Create `MobileDrawer` component — slide-in from left with CSS `translate-x` transition
- [x] 4.2 Add semi-transparent backdrop overlay that closes drawer on click
- [x] 4.3 Render nav links (Dashboard, Timeline, Events) inside drawer
- [x] 4.4 Close drawer on nav link click
- [x] 4.5 Add user name/email display at bottom of drawer
- [x] 4.6 Apply neo-brutalism styling consistent with header

## 5. UserFooter Component

- [x] 5.1 Create `UserFooter` component with thick top border (ink color)
- [x] 5.2 Add nav links section (Dashboard, Timeline, Events)
- [x] 5.3 Add copyright line with app name
- [x] 5.4 Add social icon placeholders (at least 2 icons)
- [x] 5.5 Apply Deep Ocean color palette and Space Grotesk font

## 6. UserShellLayout Component

- [x] 6.1 Create `UserShellLayout` component composing `UserHeader`, `<main>`, and `UserFooter`
- [x] 6.2 Pass `isDrawerOpen` state and toggle handler between `UserHeader` and `MobileDrawer`
- [x] 6.3 Ensure min-height layout so footer stays at bottom on short pages (`flex flex-col min-h-screen`)

## 7. Pages — Routing & Auth

- [x] 7.1 Create `pages/user/index.tsx` with `getServerSideProps` redirect to `/user/dashboard`
- [x] 7.2 Create `pages/user/dashboard.tsx` wrapped in `ProtectedRoute` + `UserShellLayout`
- [x] 7.3 Create `pages/user/timeline.tsx` wrapped in `ProtectedRoute` + `UserShellLayout`
- [x] 7.4 Create `pages/user/events.tsx` wrapped in `ProtectedRoute` + `UserShellLayout`

## 8. Dashboard — Component Gallery

- [x] 8.1 Add Typography section (h1–h4 + body text in Space Grotesk)
- [x] 8.2 Add Button gallery section (primary, secondary, outline variants × sm/md/lg sizes)
- [x] 8.3 Add Card gallery section (default, hover, with header variants and example content)
- [x] 8.4 Add Input gallery section (default, focus demo, disabled, placeholder states)
- [x] 8.5 Add Badge gallery section (all color variants with rotation)
- [x] 8.6 Add section headings and descriptions for each component group
- [x] 8.7 Apply neo-brutalism page layout: 8px grid spacing, section dividers

## 9. Placeholder Pages Content

- [x] 9.1 Add placeholder heading, icon, and "coming soon" message to `/user/timeline`
- [x] 9.2 Add placeholder heading, icon, and "coming soon" message to `/user/events`

## 10. Responsive & Accessibility

- [x] 10.1 Verify hamburger/drawer shows on mobile (< 768px), desktop nav shows on md+
- [x] 10.2 Verify drawer closes on nav link click and backdrop click
- [x] 10.3 Verify dropdown closes on outside click and Escape key
- [x] 10.4 Add `aria-label` to hamburger button and drawer
- [x] 10.5 Verify focus is trapped / managed correctly when drawer is open
- [x] 10.6 Verify all interactive elements have visible focus rings

## 11. Quality Checks

- [x] 11.1 Run `pnpm tc` — fix all TypeScript errors
- [x] 11.2 Run `pnpm run lint` — fix all ESLint violations
- [x] 11.3 Run `pnpm --filter=web test` — ensure no regressions
- [x] 11.4 Run `pnpm build:check` — verify Next.js build passes
