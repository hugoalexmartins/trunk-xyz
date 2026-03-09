## ADDED Requirements

### Requirement: Event Creator Tracking
The system SHALL record which user created each event.

#### Scenario: New event includes creator
- **WHEN** authenticated user creates event via API
- **THEN** event's createdById field is automatically set to current user's ID

#### Scenario: Event response includes creator
- **WHEN** user queries for event
- **THEN** response includes creator object with user id and email

#### Scenario: Legacy events have null creator
- **WHEN** retrieving events created before user auth was implemented
- **THEN** events may have null createdById field (historic data)

### Requirement: User-Scoped Event Queries (Foundation)
The system SHALL provide foundation for querying events by creator (for Phase 2 authorization).

#### Scenario: API can filter by creator
- **WHEN** event listing API is called with optional creatorId filter parameter
- **THEN** endpoint accepts parameter without error (for future use in Phase 2 authorization)

#### Scenario: Event list includes creator info
- **WHEN** user queries event list
- **THEN** each event in response includes creator object for potential filtering/display

### Requirement: Event Timeline Shows Creator
The system SHALL display event creator information in timeline UI.

#### Scenario: Timeline event card displays creator
- **WHEN** event is displayed in timeline component
- **THEN** card shows creator email/name for reference

#### Scenario: Event details page shows creator
- **WHEN** user views single event details
- **THEN** creator information is displayed (who created this event and when)
