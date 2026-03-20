## 1. Database Migration

- [x] 1.1 Add `date DateTime @default(now())` field to the `Event` model in `packages/shared/prisma/schema.prisma`
- [x] 1.2 Run `pnpm --filter=shared run db:generate` to generate the migration SQL
- [x] 1.3 Edit the generated migration file to backfill `date` from `createdAt` for existing rows before adding the NOT NULL constraint
- [x] 1.4 Run `pnpm --filter=shared run db:migrate` locally and verify migration succeeds

## 2. MinIO Setup

- [x] 2.1 Add `MINIO_BUCKET_NAME` to `.env.dev.example` with default value `"trunk-applications"`
- [x] 2.2 Add bucket creation for `MINIO_BUCKET_NAME` to the dev seed/setup script so local dev works out of the box

## 3. File Upload API

- [x] 3.1 Create `web/src/pages/api/upload/presign.ts` — POST endpoint that validates auth, validates `.pdf` extension, and returns a MinIO presigned PUT URL and object URL
- [x] 3.2 Add MinIO client utility in `web/src/server/` using `MINIO_*` env vars (endpoint, port, access key, secret key, bucket)

## 4. Applications tRPC Router

- [x] 4.1 Create `web/src/server/api/routers/applications.ts` with `create` and `hasAny` procedures
- [x] 4.2 `hasAny`: query `event.findFirst` where `type=APPLICATION, createdById=ctx.user.sub` — returns boolean
- [x] 4.3 `create`: validate input (position, company required; jobUrl, jobUrlFile, date optional), run Prisma `$transaction` to create event then update `pipelineId = id`, auto-generate title as `"${position} @ ${company}"`
- [x] 4.4 Register `applicationsRouter` in `web/src/server/api/root.ts`

## 5. Feature Directory

- [x] 5.1 Create `web/src/features/applications/applicationSchema.ts` — Zod schema for form validation (position, company required; jobUrl optional URL; jobUrlFile optional; date required with default today)
- [x] 5.2 Create `web/src/features/applications/useCreateApplication.ts` — hook wrapping `applications.create` tRPC mutation
- [x] 5.3 Create `web/src/features/applications/useUploadResume.ts` — hook that requests presigned URL then uploads PDF via `fetch` PUT, returns object URL
- [x] 5.4 Create `web/src/features/applications/ApplicationForm.tsx` — form component with fields: position, company, jobUrl, date (default today), jobUrlFile (PDF picker); handles upload then create in sequence; redirects to `/timeline` on success

## 6. Pages

- [x] 6.1 Create `web/src/pages/onboarding/index.tsx` — welcome screen with product intro and "Get started" CTA; protected (redirect to `/auth/login` if unauthenticated); redirect to `/timeline` if `applications.hasAny` is true
- [x] 6.2 Create `web/src/pages/applications/new.tsx` — renders `<ApplicationForm />`; protected; follows neo-brutalism style guide
- [x] 6.3 Style `/onboarding` welcome screen following the neo-brutalism style guide (Space Grotesk, ink borders, cyan CTA, hard shadow)

## 7. Post-Login Routing

- [x] 7.1 Update `web/src/pages/auth/login.tsx` — after successful login for approved regular users, call `applications.hasAny` and redirect to `/onboarding` if false, `/timeline` if true
- [x] 7.2 Ensure admin users always redirect to `/timeline` regardless of application count

## 8. Timeline CTA

- [x] 8.1 Add "New Application" button to `web/src/pages/timeline/index.tsx` linking to `/applications/new`, styled per neo-brutalism guide

## 9. Tests

- [x] 9.1 Unit test `applications.create` — test pipelineId self-reference, auto-generated title, required field validation
- [x] 9.2 Unit test `applications.hasAny` — test true/false cases
- [x] 9.3 Unit test presign API route — test auth guard, PDF extension validation, non-PDF rejection

## 11. Navigation Refinements

- [x] 11.1 Update the navigation/sidebar component to always show a "New Application" link (pointing to `/applications/new`) for all authenticated users (regular and admin)
- [x] 11.2 Restrict the navigation menu to only the "New Application" entry for approved regular users with zero APPLICATION events — call `applications.hasAny` in the nav component and conditionally render other links
- [x] 11.3 Ensure admin users always see the full navigation menu regardless of APPLICATION event count
- [x] 11.4 Fix the "Back to Timeline" button on `/applications/new` — set its text colour to white (`#FFFFFF`) per the neo-brutalism style guide (background stays `C.ink`, text becomes white)

## 12. Onboarding Form UX

- [x] 12.1 Pass a `showNavControls` boolean prop to `<ApplicationForm />` — when `false`, the "← Back to Timeline" link and "Cancel" button are not rendered; when `true`, they are rendered
- [x] 12.2 In `web/src/pages/applications/new.tsx`, call `applications.hasAny` on mount (same pattern as nav); pass `showNavControls={hasApplications || isAdmin}` to `<ApplicationForm />`
- [x] 12.3 Update `<ApplicationForm />` to conditionally render the back link and cancel button based on the `showNavControls` prop

## 10. Verification

- [x] 10.1 Run `pnpm tc` — confirm zero TypeScript errors
- [x] 10.2 Run `pnpm run lint` — confirm no lint violations
- [x] 10.3 Run `pnpm --filter=web test` — confirm all tests pass
- [ ] 10.4 Run `pnpm build:check` — confirm Next.js build succeeds
- [ ] 10.5 Manual smoke test: new user login → onboarding → /applications/new has no back/cancel controls → submit → timeline shows new event; verify nav only shows "New Application" before first submit (use newuser@example.com / UserPassword123!)
- [ ] 10.6 Manual smoke test: returning user login → timeline → /applications/new shows back/cancel controls → submit → timeline updated; verify full nav visible (use returning@example.com / UserPassword123!)
- [ ] 10.7 Manual smoke test: admin user login → /applications/new shows back/cancel controls; full navigation always visible, "New Application" link present
