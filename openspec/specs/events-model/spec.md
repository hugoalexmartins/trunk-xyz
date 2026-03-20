## ADDED Requirements

### Requirement: Generic event model with pipeline UUID
The system SHALL store events with pipeline grouping capability via UUID field, allowing related events to be grouped without a separate pipeline table.

#### Scenario: Event creation with pipeline UUID
- **WHEN** creating an event with a pipelineId
- **THEN** the event is stored and associated with that pipeline for later retrieval

#### Scenario: Standalone events without pipeline
- **WHEN** creating an event without specifying pipelineId
- **THEN** the event is created and can be queried individually without pipeline context

### Requirement: Event type and status tracking
The system SHALL support typed events with status tracking to represent different stages of a pipeline journey.

#### Scenario: Event type assignment
- **WHEN** creating an event with type (APPLICATION, INTERVIEW, OFFER, etc.)
- **THEN** the event type is persisted and can be used for filtering and categorization

#### Scenario: Status progression
- **WHEN** updating an event's status
- **THEN** the new status is recorded and reflects the current state of the event

### Requirement: Event metadata for extensibility
The system SHALL support storing event-type-specific metadata in a flexible JSON field.

#### Scenario: Metadata storage
- **WHEN** creating an event with metadata (e.g., interview type, salary offer)
- **THEN** the metadata is persisted and queryable

#### Scenario: Different metadata per type
- **WHEN** creating APPLICATION event with resume attachment metadata vs INTERVIEW event with location metadata
- **THEN** both metadata structures are supported without schema changes

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

### Requirement: Event timestamps
The system SHALL track when events are created and updated.

#### Scenario: Automatic timestamp creation
- **WHEN** an event is created
- **THEN** createdAt timestamp is automatically set to current time

#### Scenario: Timestamp updates
- **WHEN** an event is modified
- **THEN** updatedAt timestamp is automatically updated

### Requirement: Query efficiency
The system SHALL support efficient queries on events by pipeline UUID and date range.

#### Scenario: Pipeline event retrieval
- **WHEN** querying all events for a specific pipelineId
- **THEN** results are returned quickly even with thousands of events

#### Scenario: Date range queries
- **WHEN** filtering events by date range
- **THEN** database indexes ensure efficient retrieval
