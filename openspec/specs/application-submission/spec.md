## ADDED Requirements

### Requirement: ApplicationForm UI — /applications/new page
The `/applications/new` page SHALL use `UserShellLayout` as the outer shell. The page-level container (heading, sub-heading, back button) uses inline styles with the Deep Ocean `C` constant. The `<ApplicationForm />` feature component uses inline styles matching the established neo-brutalism form pattern — never Tailwind utility classes on form elements.

#### Scenario: Page layout matches authenticated shell pages
- **WHEN** a user visits /applications/new
- **THEN** the page renders inside `UserShellLayout` with a "← Back to Timeline" secondary button, an h1 heading "New Application" at 52px / weight 900 / ink color / `-0.04em` letter-spacing, and a sub-heading at 16px / weight 600 / faint color — matching the pattern of `/events/new`

#### Scenario: Form fields use inline styles matching the login pattern
- **WHEN** the ApplicationForm renders
- **THEN** each input is a raw `<input>` element with inline styles (height 36, `3px solid C.ink`, fontSize 13, fontWeight 600, Space Grotesk font family) matching the pattern used in `auth/login.tsx` and `user/dashboard.tsx` FormSection

#### Scenario: Submit and Cancel buttons use inline styles
- **WHEN** the form action row renders
- **THEN** buttons use inline styles with `4px solid C.ink` border, `5px 5px 0 C.ink` box-shadow, and cyan or canvas background — never the `<Button>` component

#### Scenario: Global error uses inline-styled error banner
- **WHEN** a submission or upload error occurs
- **THEN** the error is displayed as a div with `background: C.accent`, `3px solid C.ink` border, white text — not via a component

#### Scenario: Field-level errors render below their input
- **WHEN** a required field fails validation
- **THEN** the error message is a `<p>` with `fontSize: 12, fontWeight: 700, color: C.accent` prefixed with ⚠

### Requirement: Application creation via dedicated tRPC procedure
The system SHALL expose an `applications.create` tRPC procedure that creates an APPLICATION event as the head of a new recruitment pipeline.

#### Scenario: Successful application submission
- **WHEN** an approved regular user submits valid application data (position, company, date)
- **THEN** an Event is created with type=APPLICATION, status=PENDING, and pipelineId set to the event's own id

#### Scenario: Self-referencing pipelineId
- **WHEN** the APPLICATION event is created
- **THEN** the event's pipelineId MUST equal its own id, making it the canonical head of the recruitment chain

#### Scenario: Auto-generated title
- **WHEN** an application is created with position="Engineer" and company="Acme"
- **THEN** the event title is automatically set to "Engineer @ Acme" without requiring a separate title input

#### Scenario: Application date defaults to today
- **WHEN** a user submits the form without changing the date field
- **THEN** the event's date is set to the current date (UTC)

#### Scenario: User-supplied date
- **WHEN** a user changes the date field before submitting
- **THEN** the event's date is set to the user-supplied date value

#### Scenario: Metadata structure
- **WHEN** an application is created
- **THEN** the event's metadata field contains exactly: `{ position, company, jobUrl, jobUrlFile }` where jobUrl and jobUrlFile are nullable

#### Scenario: Authentication required
- **WHEN** an unauthenticated request is made to applications.create
- **THEN** the request is rejected with an UNAUTHORIZED error

#### Scenario: Validation — required fields
- **WHEN** position or company is missing or empty
- **THEN** the procedure returns a BAD_REQUEST error and no event is created

### Requirement: Application ownership
The system SHALL associate every APPLICATION event with the authenticated user who created it.

#### Scenario: createdById is set on submission
- **WHEN** an approved regular user creates an application
- **THEN** the event's createdById field is set to that user's id

#### Scenario: Users can only see their own applications
- **WHEN** querying for the current user's APPLICATION events
- **THEN** only events where createdById matches the authenticated user are returned
