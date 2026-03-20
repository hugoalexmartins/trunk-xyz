## Context

The application currently has an `Event` model with a `pipelineId` field for grouping related recruitment events. The `EventType` enum already includes `APPLICATION`, `SCREENING`, `INTERVIEW`, `OFFER`, `REJECTION`, and `HIRED`. However, there is no user-facing flow for creating an application, no onboarding experience for new users, and no post-login routing logic that branches on whether the user has existing applications.

The login page at `/auth/login` currently redirects all approved users to `/timeline` (or a `returnUrl`). The `events` tRPC router already supports `create`, but it is generic — it does not enforce the pipelineId self-referencing pattern or application-specific metadata structure.

There is no file upload infrastructure in the codebase. MinIO is running in the stack but has no established bucket policy or upload API route.

## Goals / Non-Goals

**Goals:**
- Post-login routing: approved regular users with zero APPLICATION events go to `/onboarding`; all others go to `/timeline`
- `/onboarding` page: welcome screen with a CTA that leads to the application form
- `/applications/new` page: form for creating a new APPLICATION event, reusable from both onboarding and timeline
- Application creation: new `applications.create` tRPC procedure that handles the pipelineId self-referencing pattern, auto-generates the title, and stores metadata correctly
- PDF upload: new API route for MinIO presigned URLs; PDF stored in MinIO, URL saved in event metadata
- `Event` schema: add `date DateTime` column via Prisma migration with a default for existing rows
- Timeline CTA: add "New Application" button to `/timeline` for returning users
- New feature directory: `web/src/features/applications/`

**Non-Goals:**
- Subsequent pipeline events (SCREENING, INTERVIEW, etc.) — this change only covers the APPLICATION head event
- Application list/detail page — timeline already shows events; a dedicated `/applications` index is out of scope
- Admin visibility into user applications — no changes to the admin router
- File type validation beyond PDF on the server side

## Decisions

### 1. pipelineId self-referencing pattern

**Decision**: Create the event without `pipelineId` first, then immediately update it to set `pipelineId = id`. This is done in a Prisma transaction.

**Why**: Prisma's `create` does not allow self-referencing the generated `id` in the same operation. A two-step transaction (create → update) is the only correct approach without a separate UUID.

**Alternative considered**: Generate a `cuid()` in application code before creation and use it as both `id` and `pipelineId`. Rejected because Prisma controls `id` generation with `@default(cuid())` and bypassing it would require raw SQL or schema changes.

### 2. New `applications` tRPC router (not extending `events`)

**Decision**: Create a dedicated `applications` router in `web/src/server/api/routers/applications.ts` with a `create` procedure.

**Why**: The APPLICATION creation has specific business logic (pipelineId self-reference, auto-generated title, metadata schema, date field) that would pollute the generic `events` router. Keeping them separate maintains single responsibility and makes the domain intent explicit.

**Alternative considered**: Add a `createApplication` procedure to the existing `events` router. Rejected to avoid coupling domain logic to a generic CRUD router.

### 3. Post-login routing via client-side check

**Decision**: After login succeeds in `useLogin`, query `applications.hasAny` (a new lightweight tRPC query returning a boolean) and redirect to `/onboarding` or `/timeline` based on the result.

**Why**: The auth server (`auth.login`) only handles authentication concerns. Routing logic based on application state belongs in the client, keeping the server stateless. The `login.tsx` page already does client-side redirect logic (`router.push`).

**Alternative considered**: Return an `isFirstTime` flag from `auth.login` by querying APPLICATION event count server-side during login. Rejected because it adds user-state concerns to the auth procedure and complicates future changes (e.g., different routing logic per role).

### 4. Metadata structure for APPLICATION events

**Decision**: Store application-specific fields in the existing `metadata` JSON field with a fixed shape:

```ts
{
  position: string,       // required
  company: string,        // required
  jobUrl: string | null,  // optional
  jobUrlFile: string | null, // optional — MinIO URL after upload
}
```

**Why**: No schema change needed beyond the `date` column. The spec and existing `recruitment-pipeline` spec already confirm that metadata is the intended extensibility mechanism.

### 5. `date` column default for migration

**Decision**: Add `date DateTime @default(now())` to the `Event` model. The migration will backfill existing rows with their `createdAt` value via a raw SQL step.

**Why**: `createdAt` is the best available approximation for existing events. Using `now()` as the migration default would misrepresent historical data.

### 6. File upload: presigned URL pattern

**Decision**: New API route `POST /api/upload/presign` returns a MinIO presigned PUT URL. The client uploads the PDF directly to MinIO. On success, the client includes the resulting object URL in the `applications.create` call as `metadata.jobUrlFile`.

**Why**: Avoids routing large file bytes through the Next.js server. MinIO presigned URLs are already the standard pattern for S3-compatible storage. Keeps the tRPC layer thin.

**Alternative considered**: Upload the file through a tRPC mutation using a base64-encoded string. Rejected due to payload size limits and poor performance.

### 7. Feature directory structure

```
web/src/features/applications/
  ApplicationForm.tsx        # Form component (used by /onboarding and /applications/new)
  useCreateApplication.ts    # Hook wrapping applications.create tRPC mutation
  useUploadResume.ts         # Hook for presigned URL upload flow
  applicationSchema.ts       # Zod validation schema for the form
```

Pages remain in `web/src/pages/` per the Pages Router convention.

## Risks / Trade-offs

- **Two-step transaction for pipelineId** → If the update step fails after create, the event exists without a pipelineId. Mitigation: wrap both steps in `prisma.$transaction`.
- **Client-side routing decision** → A slow `applications.hasAny` query adds latency to the post-login redirect. Mitigation: the query is a simple `count` with a `LIMIT 1` — it should be <10ms on any reasonable dataset.
- **No server-side validation of PDF type on presign** → The presign endpoint cannot enforce file type; it only knows the filename. Mitigation: validate file extension and MIME type client-side before requesting the presigned URL. Accept the risk that the server-side constraint is advisory.
- **`date` migration backfill** → Backfilling with `createdAt` requires a raw SQL step in the migration file, which is manually maintained. Mitigation: document this clearly in the migration file.
- **MinIO bucket setup not automated** → Local dev requires the bucket to exist. Mitigation: add bucket creation to `db:seed` or `infra:dev:up` setup script.

## Migration Plan

1. Add `date DateTime @default(now())` to `Event` in `schema.prisma`
2. Run `pnpm --filter=shared run db:generate` to generate migration SQL
3. Edit the generated migration SQL to backfill `date` from `createdAt` for existing rows before adding the `NOT NULL` constraint
4. Run `pnpm --filter=shared run db:migrate` locally to verify
5. Deploy: migration runs automatically on next deploy (Prisma migrate deploy)
6. Rollback: the `date` column can be dropped in a follow-up migration with no data loss risk (it is additive)

## Open Questions

~~- Should the MinIO bucket name and presign URL expiry be environment-configurable?~~
**Resolved**: MinIO bucket name is env-configurable via `MINIO_BUCKET_NAME` with default value `"trunk-applications"`. Presign expiry is a hardcoded constant for now.

~~- Should `/onboarding` redirect users who already have applications?~~
**Resolved**: Yes. Any approved regular user with at least one `APPLICATION`-type event is considered to have completed onboarding. Navigating to `/onboarding` directly will redirect them to `/timeline`. The `applications.hasAny` check is the single source of truth for this gate.
