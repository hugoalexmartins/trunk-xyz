## Context

The app has two visual layers: the **landing page** (fully styled with inline CSS using the Deep Ocean neo-brutalism design) and the **inner app** (auth, admin, events, recruitment pages using Tailwind + shared components). The shared components (`Button`, `Card`, `Input`, `Badge`, `Container`, `Header`, `PageHeader`) are already aligned with the design system. The gap is at the **page level**: some templates still use non-design-system classes (`bg-white`, `dark:*`, `neutral-*` without semantic names, `font-medium`, `font-mono`) or skip shared components in favor of ad-hoc markup that doesn't apply neo-brutalism rules.

The Tailwind config already defines all needed tokens: `bg-canvas`, `text-ink`, `text-primary`, `text-secondary`, `text-accent`, `text-neutral-dark`, `text-neutral-light`, `shadow-neo-*`, and the Space Grotesk font stack.

**Constraint**: Changes are primarily in JSX and Tailwind class strings. A shared `Layout` component (`Header` + `main` + `Footer`) was also introduced as part of a concurrent page restructure, which centrally provides `bg-canvas` to all inner-app pages.

## Goals / Non-Goals

**Goals:**
- Every inner-app page uses `bg-canvas` (not `bg-white`), `text-ink` (not `text-neutral-900`), and Deep Ocean semantic colors
- All `dark:` variant classes removed — single-theme app
- Ad-hoc stat cards and table markup in `[pipelineId].tsx` and `admin/list.tsx` (renamed from `admin/users.tsx`) use neo-brutalism borders and shadows
- Empty states use proper `text-ink`/`text-neutral-dark` typography
- `font-medium` and `font-mono` replaced with `font-bold` for consistency
- CI (tests, TypeScript, lint, build) passes after each module update

**Non-Goals:**
- No changes to shared components (`Button`, `Card`, `Input`, etc.)
- No changes to any tRPC routers, Prisma schema, or backend logic
- No dark mode implementation (intentionally single-theme)
- No layout restructuring or new feature additions
- No changes to `index.tsx` (already verified reference)

## Decisions

### Decision 1: Class-by-class replacement + shared Layout wrapper

**Choice**: Targeted class replacements on each template, combined with a shared `Layout` component (`web/src/components/Layout.tsx`) that wraps all inner-app pages with `Header`, `bg-canvas` root, and `Footer`.

**Rationale**: The JSX structure and component composition in these pages is sound — the only issue was class naming. A `Layout` wrapper was introduced alongside a page directory restructure (flat files → feature folders), which centrally enforces `bg-canvas` and removes the need for each page to declare it individually.

**Outcome**: The layout wrapper did not require test updates or break any component API contracts — all 67 tests passed. The original concern about blast radius did not materialise.

**Note on page paths**: As part of the restructure, `admin/users.tsx` → `admin/list.tsx` and `recruitment.tsx` → `recruitment/index.tsx`.

### Decision 2: Module-by-module with CI verification

**Choice**: Update pages in module groups (auth → admin → events → recruitment) and validate CI passes after each group.

**Rationale**: Smaller changesets are easier to review and debug. If a TypeScript or lint error is introduced, the failing module is isolated immediately.

**Alternative considered**: Update all 7 files in one commit — rejected because a single lint/TS error would block the entire change.

### Decision 3: Use existing Tailwind tokens, not inline styles

**Choice**: Keep using Tailwind utility classes, mapping to the design-system tokens already in `tailwind.config.ts`.

**Rationale**: Shared components are Tailwind-based. Mixing inline styles with Tailwind on the same page creates specificity conflicts and harms readability. The homepage uses inline styles because it has no shared components — not as the pattern for inner-app pages.

**Alternative considered**: Convert inner-app pages to inline styles matching the homepage — rejected as it would bypass the entire Tailwind design system and make future updates inconsistent.

### Decision 4: Neo-brutalism for ad-hoc card markup

**Choice**: Ad-hoc card-like divs in `[pipelineId].tsx` (stat cards) should use `border-4 border-ink shadow-neo-md` and `bg-canvas` to match the `Card` component's visual appearance.

**Rationale**: These stat blocks are structurally cards. They should look like `Card` components. The simplest fix is to either use the `Card` component directly or apply the same classes manually where the Card component can't be used as-is.

## Risks / Trade-offs

- **[Risk] Missed class** → A dark-mode class or wrong color token is not caught by TypeScript. Mitigation: Visual review after each module + build check.
- **[Risk] Tailwind purge removes a new class** → If a class string is dynamically constructed, Tailwind may not detect it. Mitigation: Always use full class strings, never template literals for class names.
- **[Risk] Test snapshot failures** → If any tests render full page components with snapshot assertions. Mitigation: Run `pnpm --filter=web test` after each module; fix any snapshots.

## Migration Plan

1. Update auth module (`login.tsx`, `signup.tsx`, `pending-approval.tsx`) → run CI checks → commit
2. Update admin module (`admin/list.tsx`, was `admin/users.tsx`) → run CI checks → commit
3. Update events module (`events/new.tsx`) → run CI checks → commit
4. Update recruitment module (`recruitment/index.tsx`, `recruitment/[pipelineId].tsx`) → run CI checks → commit
5. Final full CI run to confirm all checks pass (67 tests, 0 TypeScript errors, 0 lint violations)

No rollback strategy needed — all changes are local file edits tracked by git.
