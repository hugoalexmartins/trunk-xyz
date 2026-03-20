## Why

Approved regular users have no guided path to start tracking job applications after login. The first meaningful action a user should take — submitting a job application — has no dedicated UI or flow, leaving new users stranded on an empty timeline with no clear next step.

## What Changes

- Add a `date` column to the `Event` model (Prisma migration required) to capture the user-supplied application date
- Add `/onboarding` page: shown to first-time users (zero APPLICATION events) after login — welcome screen followed by the new application form
- Add `/applications/new` page: reusable new application form, accessible from the timeline CTA for returning users
- Add "New Application" CTA button to the `/timeline` page for returning users
- Update post-login redirect logic: check for existing APPLICATION events — redirect to `/onboarding` if none, `/timeline` otherwise
- Add `applications.create` tRPC procedure to create an APPLICATION event with recruitment metadata
- Add MinIO presigned URL upload endpoint for PDF resume (`jobUrlFile`)
- The submitted application creates an `Event` with:
  - `type: APPLICATION`
  - `status: PENDING`
  - `pipelineId` = the event's own `id` (self-referencing pipeline head)
  - `title` auto-generated as `"<position> @ <company>"`
  - `date` set to user-supplied date (defaults to today)
  - `metadata: { position, company, jobUrl, jobUrlFile }` stored as JSON

## Capabilities

### New Capabilities
- `application-submission`: Form and API for creating a new APPLICATION event — the head of a recruitment pipeline chain. Covers the form UI, tRPC procedure, metadata structure, and pipelineId self-referencing pattern.
- `user-onboarding`: First-time user flow — post-login redirect logic, `/onboarding` welcome screen, and inline application form for users with zero APPLICATION events.
- `file-upload`: MinIO presigned URL upload API and PDF file upload UI component for attaching a resume to an application.

### Modified Capabilities
- `events-model`: Adding a required `date DateTime` field to the Event model. This is a schema-level requirement change — existing events will need a default value migration.
- `events-timeline-view`: Adding a "New Application" CTA to the timeline page for users who already have applications.
- `recruitment-pipeline`: Formalising the self-referencing pipelineId pattern — the APPLICATION event's own `id` is its `pipelineId`, making it the canonical head of the recruitment chain.

## Impact

- **Database**: Prisma migration to add `date DateTime` to `Event` — requires a default for existing rows
- **API**: New tRPC router `applications` with `create` procedure; new Next.js API route for MinIO presigned uploads
- **Auth/routing**: Post-login redirect in `useLogin` or the auth callback needs to branch on APPLICATION event count
- **Pages**: Two new pages (`/onboarding`, `/applications/new`); one modified page (`/timeline`)
- **Feature directory**: New `web/src/features/applications/` with form, hooks, and API wiring
- **Infrastructure**: MinIO already in stack — needs a bucket policy and presigned URL pattern established
- **Existing specs affected**: `events-model`, `events-timeline-view`, `recruitment-pipeline`
