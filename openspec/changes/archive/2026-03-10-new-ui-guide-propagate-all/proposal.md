## Why

The homepage (`index.tsx`) implements a fully verified neo-brutalism design system using inline styles — featuring hard offset shadows, thick borders, the Deep Ocean color palette, Space Grotesk typography, and mechanical interactions. The inner app pages (auth, admin, recruitment, events) use Tailwind classes that are inconsistent with the homepage's visual language: some still reference `dark:` variants, generic `neutral-*` colors, or `bg-white` instead of the design system tokens. Unifying these establishes a single, coherent product aesthetic.

## What Changes

- Replace non-design-system Tailwind classes across all inner-app page templates with Deep Ocean tokens (`bg-canvas`, `text-ink`, `text-primary`, etc.)
- Remove all `dark:` variant classes — the app targets a single light theme
- Apply neo-brutalism visual language (hard shadows, thick borders, no border-radius) to ad-hoc markup that bypasses the shared components (stat cards in pipeline detail, table headers in admin, empty states in recruitment)
- Align typography: use `font-bold`/`font-black` + Space Grotesk weights; remove any `font-medium`/`font-mono` references that break the design
- Ensure every page uses the existing shared components (`Button`, `Card`, `Input`, `Badge`, `PageHeader`, `Container`, `Header`) correctly and consistently
- Fix `recruitment/[pipelineId].tsx` which uses `bg-white dark:bg-neutral-950` instead of `bg-canvas`
- Fix `recruitment.tsx` empty state which uses `text-neutral-900 dark:text-neutral-50` and `text-neutral-600 dark:text-neutral-400`

**Modules in scope (implement & verify CI in order):**
1. Auth module: `login.tsx`, `signup.tsx`, `pending-approval.tsx`
2. Admin module: `admin/users.tsx`
3. Events module: `events/new.tsx`
4. Recruitment module: `recruitment.tsx`, `recruitment/[pipelineId].tsx`

## Capabilities

### New Capabilities
- `ui-consistency-audit`: Documents the verified UI rails from the homepage and the mapping to inner-app Tailwind class conventions

### Modified Capabilities
- None — this is a pure visual consistency change; no API contracts, data models, or user-facing functionality changes

## Impact

- **Affected files**: 7 page templates in `web/src/pages/`
- **No API changes**: tRPC routers, Prisma schema, and all backend layers are untouched
- **No component changes**: Shared components in `web/src/components/` are already aligned; only page-level markup is updated
- **CI**: All 4 checks (tests, TypeScript, lint, build) must pass after each module
- **Dependencies**: None — changes are isolated to JSX markup and Tailwind class strings
