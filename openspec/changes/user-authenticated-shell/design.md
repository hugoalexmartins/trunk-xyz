## Context

The app has authentication, role-based access, and several existing pages (`/timeline`, `/events`, etc.) but no unified post-login shell. Currently each page manages its own layout independently. The neo-brutalism design system (Deep Ocean palette, hard shadows, Space Grotesk, Tailwind CSS) is ~48% implemented via the `refactor-ui-layout-css` change. This change builds the authenticated user shell on top of those foundations.

## Goals / Non-Goals

**Goals:**
- Unified authenticated layout: sticky header + content area + footer
- Responsive navigation: desktop top-nav, mobile hamburger → slide-in drawer
- User dropdown with real auth data (initials, name, email, logout)
- Active route indication with neo-brutalism thick border
- `/user/*` page routes with dashboard component gallery
- Zero new external dependencies

**Non-Goals:**
- Real content for `/user/timeline` or `/user/events` (placeholders only)
- Profile or password change functionality (links only, no implementation)
- Social media integration in footer (placeholder icons)
- Animation library beyond CSS transitions

## Decisions

### 1. New `UserShellLayout` instead of modifying existing `Layout`
**Decision**: Create `UserShellLayout` as a separate component, not extend the existing `Layout`.
**Rationale**: The existing `Layout` is used by public/auth pages with different nav requirements. Mixing authenticated and unauthenticated shell logic in one component creates coupling. A dedicated `UserShellLayout` keeps concerns clean.
**Alternative considered**: Prop-flagging the existing `Layout` — rejected because it adds conditional complexity and makes it harder to diverge the two layouts over time.

### 2. Sticky header with `position: sticky` + scroll shadow via JS
**Decision**: Use `position: sticky; top: 0` with a `useScrolled` hook that adds a CSS class when `window.scrollY > 0`.
**Rationale**: Pure CSS `position: sticky` handles the pinning. The scroll shadow requires JS to detect scroll position and toggle a Tailwind class. This avoids `position: fixed` which requires explicit content padding.
**Alternative considered**: `position: fixed` + `padding-top` on body — rejected because it's harder to manage with dynamic header heights.

### 3. Mobile drawer via CSS transform, no library
**Decision**: Implement the slide-in drawer with `translate-x-full` / `translate-x-0` Tailwind classes toggled by React state. An overlay backdrop handles click-outside-to-close.
**Rationale**: Zero dependency, consistent with the design system, and simple enough for this use case.
**Alternative considered**: Headless UI `Dialog` — available but overkill; adds a dependency and the focus-trap behavior is not required for a nav drawer.

### 4. User dropdown as a controlled `<div>` overlay, not `<select>`
**Decision**: Build dropdown as an absolutely-positioned `<div>` toggled by click, with `useRef` + document click listener for outside-click dismissal.
**Rationale**: Full visual control required by neo-brutalism style (hard shadows, thick borders). Native `<select>` cannot be styled sufficiently.

### 5. `/user` index redirects server-side to `/user/dashboard`
**Decision**: `pages/user/index.tsx` uses `getServerSideProps` to return a `redirect` to `/user/dashboard`.
**Rationale**: Cleaner than a client-side redirect — no flash of empty content.

### 6. Component gallery on `/user/dashboard` uses existing design system components
**Decision**: Import and render actual `Button`, `Card`, `Input`, `Badge` components from `@/src/components/`.
**Rationale**: The gallery serves as living documentation — it must use the real components, not mockups.

## Risks / Trade-offs

- **[Risk] Design system components not fully stable** → The `refactor-ui-layout-css` change is 48% complete. Some components may still evolve. Mitigation: build the shell against the currently-stable components (Button, Card, Input, Badge) and avoid internal implementation details.
- **[Risk] `useScrolled` causes re-render on every scroll event** → Mitigation: use `throttle` via `requestAnimationFrame` or a simple flag to avoid excessive re-renders. No library needed.
- **[Risk] Mobile drawer z-index conflicts with dropdowns** → Mitigation: establish a z-index scale: drawer backdrop at `z-40`, drawer panel at `z-50`, header at `z-30`, user dropdown at `z-20`.

## Migration Plan

1. Create components under `web/src/components/user-shell/`
2. Create pages under `web/src/pages/user/`
3. No changes to existing routes or components
4. No database migrations required
5. No environment variable changes

Rollback: revert the new files. No existing behavior is modified.
