## ADDED Requirements

### Requirement: Event application date field
The system SHALL store a user-supplied date on every event, separate from the system-managed createdAt timestamp.

#### Scenario: Date field stored on creation
- **WHEN** an event is created with a date value
- **THEN** the date field is persisted and returned in queries

#### Scenario: Date field defaults to creation time
- **WHEN** an event is created without an explicit date value
- **THEN** the date field defaults to the current timestamp (equivalent to now())

#### Scenario: Existing events backfilled
- **WHEN** the migration runs on a database with existing events
- **THEN** all existing events have their date field set to their createdAt value

#### Scenario: Date is user-editable
- **WHEN** a user submits a date different from today on the application form
- **THEN** the stored event.date reflects the user-supplied value, not the server creation time
