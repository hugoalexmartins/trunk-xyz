## 1. Auth Module — Update Page Templates

- [x] 1.1 In `web/src/pages/auth/login.tsx`: confirm `bg-canvas` is on root div (already present — verify no `dark:` classes)
- [x] 1.2 In `web/src/pages/auth/login.tsx`: verify error banner uses `bg-accent border-4 border-ink` (no rounded class, no `dark:`)
- [x] 1.3 In `web/src/pages/auth/signup.tsx`: confirm `bg-canvas` is on root div (already present — verify no `dark:` classes)
- [x] 1.4 In `web/src/pages/auth/signup.tsx`: verify error banner uses `bg-accent border-4 border-ink` (no rounded class, no `dark:`)
- [x] 1.5 In `web/src/pages/auth/pending-approval.tsx`: confirm `bg-canvas` on root div; verify info box uses `border-4 border-secondary bg-neutral-light` (already present — confirm no `dark:`)

## 2. Auth Module — CI Verification

- [x] 2.1 Run `pnpm --filter=web test` — all tests pass
- [x] 2.2 Run `pnpm tc` — no TypeScript errors
- [x] 2.3 Run `pnpm run lint` — no lint violations
- [x] 2.4 Run `pnpm build:check` — Next.js build succeeds

## 3. Admin Module — Update Page Template

- [x] 3.1 In `web/src/pages/admin/list.tsx` (was `admin/users.tsx`): verify root div uses `bg-canvas` (provided by Layout wrapper — confirm no `dark:`)
- [x] 3.2 In `web/src/pages/admin/list.tsx` (was `admin/users.tsx`): verify notification banners use `border-4 border-ink rounded-none` (no `rounded-md` or `dark:`)
- [x] 3.3 In `web/src/pages/admin/list.tsx` (was `admin/users.tsx`): verify error banner uses `border-4 border-ink rounded-none` (no `rounded-md`)
- [x] 3.4 In `web/src/pages/admin/list.tsx` (was `admin/users.tsx`): verify table `<thead>` row uses `bg-primary` header with `text-ink font-bold` (already present — confirm)
- [x] 3.5 In `web/src/pages/admin/list.tsx` (was `admin/users.tsx`): verify `<tbody>` rows use `hover:bg-neutral-light` and `text-ink font-bold` (already present — confirm no `dark:`)

## 4. Admin Module — CI Verification

- [x] 4.1 Run `pnpm --filter=web test` — all tests pass
- [x] 4.2 Run `pnpm tc` — no TypeScript errors
- [x] 4.3 Run `pnpm run lint` — no lint violations
- [x] 4.4 Run `pnpm build:check` — Next.js build succeeds

## 5. Events Module — Update Page Template

- [x] 5.1 In `web/src/pages/events/new.tsx`: verify `bg-canvas` is applied (provided by Layout wrapper — confirm no `dark:`)
- [x] 5.2 In `web/src/pages/events/new.tsx`: verify no non-design-system classes anywhere in the JSX

## 6. Events Module — CI Verification

- [x] 6.1 Run `pnpm --filter=web test` — all tests pass
- [x] 6.2 Run `pnpm tc` — no TypeScript errors
- [x] 6.3 Run `pnpm run lint` — no lint violations
- [x] 6.4 Run `pnpm build:check` — Next.js build succeeds

## 7. Recruitment Module — Update Recruitment List Page

- [x] 7.1 In `web/src/pages/recruitment/index.tsx` (was `recruitment.tsx`): replace empty state `text-neutral-900 dark:text-neutral-50` with `text-ink`
- [x] 7.2 In `web/src/pages/recruitment/index.tsx` (was `recruitment.tsx`): replace empty state `text-neutral-600 dark:text-neutral-400` with `text-neutral-dark`
- [x] 7.3 In `web/src/pages/recruitment/index.tsx` (was `recruitment.tsx`): replace `text-neutral-dark` on pipeline date (already correct — verify class name is `text-neutral-dark` not `text-neutral-600`)
- [x] 7.4 In `web/src/pages/recruitment/index.tsx` (was `recruitment.tsx`): replace `Spinner` className `text-primary-600 dark:text-primary-400` with `text-primary`
- [x] 7.5 In `web/src/pages/recruitment/index.tsx` (was `recruitment.tsx`): verify `h2` "Recent Activity" uses `text-ink font-bold` (already present — confirm no `dark:`)

## 8. Recruitment Module — Update Pipeline Detail Page

- [x] 8.1 In `web/src/pages/recruitment/[pipelineId].tsx`: replace `bg-white dark:bg-neutral-950` on root div with `bg-canvas` (now provided by Layout wrapper)
- [x] 8.2 In `web/src/pages/recruitment/[pipelineId].tsx`: replace stat card label `text-neutral-600 dark:text-neutral-400 font-medium` with `text-neutral-dark font-bold`
- [x] 8.3 In `web/src/pages/recruitment/[pipelineId].tsx`: replace stat card value `text-neutral-900 dark:text-neutral-50` with `text-ink`
- [x] 8.4 In `web/src/pages/recruitment/[pipelineId].tsx`: replace stat card value `text-lg font-mono` with `text-lg font-bold`
- [x] 8.5 In `web/src/pages/recruitment/[pipelineId].tsx`: replace Timeline heading `text-neutral-900 dark:text-neutral-50` with `text-ink`
- [x] 8.6 In `web/src/pages/recruitment/[pipelineId].tsx`: replace pipelineId display `text-neutral-600 dark:text-neutral-400 font-mono` with `text-neutral-dark font-bold`
- [x] 8.7 In `web/src/pages/recruitment/[pipelineId].tsx`: apply `border-4 border-ink shadow-neo-md` to each stat card `Card` component (use `className` prop)

## 9. Recruitment Module — CI Verification

- [x] 9.1 Run `pnpm --filter=web test` — all tests pass
- [x] 9.2 Run `pnpm tc` — no TypeScript errors
- [x] 9.3 Run `pnpm run lint` — no lint violations
- [x] 9.4 Run `pnpm build:check` — Next.js build succeeds

## 10. Final Full-Suite Verification

- [x] 10.1 Run `pnpm --filter=web test` — full test suite passes (67+ tests)
- [x] 10.2 Run `pnpm tc` — zero TypeScript errors across all packages
- [x] 10.3 Run `pnpm run lint` — zero lint violations across the monorepo
- [x] 10.4 Run `pnpm build:check` — Next.js production build succeeds
