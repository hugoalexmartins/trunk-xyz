## ADDED Requirements

### Requirement: New Application CTA on timeline
The system SHALL display a prominent "New Application" call-to-action on the timeline page for users who already have at least one application.

#### Scenario: CTA visible on timeline for returning users
- **WHEN** an approved regular user with at least one APPLICATION event views /timeline
- **THEN** a "New Application" button or link is visible on the page

#### Scenario: CTA navigates to application form
- **WHEN** the user clicks the "New Application" CTA on the timeline
- **THEN** the user is navigated to /applications/new

#### Scenario: Timeline shows application date field
- **WHEN** viewing an APPLICATION event card on the timeline
- **THEN** the event's date field is displayed (not createdAt)

### Requirement: New Application link always visible in navigation
The "New Application" link SHALL always appear in the navigation menu for all authenticated users (regular and admin), regardless of application history.

#### Scenario: New Application link visible for admin
- **WHEN** an admin user views any page with a navigation menu
- **THEN** a "New Application" link pointing to /applications/new is present in the menu

#### Scenario: New Application link visible for regular user with applications
- **WHEN** a regular user with at least one APPLICATION event views any page with a navigation menu
- **THEN** a "New Application" link pointing to /applications/new is present in the menu

### Requirement: Back-to-timeline button on new application page styled with white text
The "Back to Timeline" button or link on /applications/new SHALL use white as its text/label colour per the neo-brutalism style guide.

#### Scenario: Back button uses white text
- **WHEN** a user views /applications/new
- **THEN** the back-to-timeline link renders with white (`#FFFFFF`) text colour
