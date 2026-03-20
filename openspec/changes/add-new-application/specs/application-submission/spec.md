## ADDED Requirements

### Requirement: ApplicationForm UI — /applications/new page
The `/applications/new` page SHALL use `UserShellLayout` as the outer shell. The page-level container (heading, sub-heading, back button) uses inline styles with the Deep Ocean `C` constant. The `<ApplicationForm />` feature component uses Tailwind reusable components (`Input`, `Button`, `Alert`, `Label`) — never inline styles.

#### Scenario: Page layout matches authenticated shell pages
- **WHEN** a user visits /applications/new
- **THEN** the page renders inside `UserShellLayout` with a "← Back to Timeline" secondary button, an h1 heading "New Application" at 52px / weight 900 / ink color / `-0.04em` letter-spacing, and a sub-heading at 16px / weight 600 / faint color — matching the pattern of `/events/new`

#### Scenario: Form fields use the Input component
- **WHEN** the ApplicationForm renders
- **THEN** each text/date/url field is rendered via the `<Input>` component (from `@/components/Input`) passing `id`, `label`, `type`, `placeholder`, `error`, and `helperText` props — never raw `<input>` elements with inline styles

#### Scenario: File input uses Label + raw input with Tailwind classes
- **WHEN** the resume file picker renders
- **THEN** the label uses the `<Label>` component and the `<input type="file">` uses Tailwind utility classes matching the `Input` component visual style (`border-4 border-ink rounded-none bg-neutral-light`) — not inline styles

#### Scenario: Submit and Cancel buttons use the Button component
- **WHEN** the form action row renders
- **THEN** the submit button uses `<Button variant="primary">` and the cancel button uses `<Button variant="outline">` — never inline-styled `<button>` elements

### Requirement: Back to Timeline and Cancel visibility based on onboarding state
The "← Back to Timeline" link and the "Cancel" button on `/applications/new` SHALL be hidden when the user has zero APPLICATION events (i.e. they arrived via the onboarding flow) and visible when the user already has at least one APPLICATION event.

#### Scenario: Back link and Cancel hidden during onboarding
- **WHEN** a regular user with zero APPLICATION events visits /applications/new
- **THEN** the "← Back to Timeline" link and the "Cancel" button are NOT rendered

#### Scenario: Back link and Cancel visible for returning users
- **WHEN** a regular user with at least one APPLICATION event visits /applications/new
- **THEN** the "← Back to Timeline" link and the "Cancel" button ARE rendered

#### Scenario: Admin users always see Back link and Cancel
- **WHEN** an admin user visits /applications/new
- **THEN** the "← Back to Timeline" link and the "Cancel" button ARE rendered

#### Scenario: Global error uses the Alert component
- **WHEN** a submission or upload error occurs
- **THEN** the error is displayed via `<Alert type="error">` — not a hand-rolled div with inline styles

#### Scenario: Field-level errors render below their input
- **WHEN** a required field fails validation
- **THEN** the error message is passed to the `<Input error={...}>` prop so it appears below the field in accent color — not as a separate `<p>` element

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
