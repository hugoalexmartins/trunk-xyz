## ADDED Requirements

### Requirement: Event CRUD operations via API
The system SHALL provide type-safe API endpoints for creating, reading, updating, and deleting events.

#### Scenario: Create event
- **WHEN** calling the create endpoint with event data (type, title, description, pipelineId, metadata)
- **THEN** event is created and returned with assigned UUID and timestamps

#### Scenario: Retrieve single event
- **WHEN** querying for an event by ID
- **THEN** the complete event data is returned or 404 if not found

#### Scenario: Update event
- **WHEN** calling update endpoint with partial event data
- **THEN** specified fields are updated and updatedAt timestamp changes

#### Scenario: Delete event
- **WHEN** deleting an event by ID
- **THEN** event is removed and subsequent queries return 404

### Requirement: Querying events by pipeline
The system SHALL provide efficient API method to retrieve all events for a specific pipeline.

#### Scenario: List pipeline events
- **WHEN** querying events for a specific pipelineId with optional pagination
- **THEN** all events for that pipeline are returned sorted by createdAt, newest first

#### Scenario: Pipeline event count
- **WHEN** requesting event count for a pipeline
- **THEN** the total number of events in that pipeline is returned

### Requirement: Global event listing with filters
The system SHALL provide API to list all events with optional filtering by type, date range, and status.

#### Scenario: List all events
- **WHEN** calling the list events endpoint without filters
- **THEN** all events are returned in chronological order (newest first) with pagination

#### Scenario: Filter by event type
- **WHEN** filtering events by type (APPLICATION, INTERVIEW, OFFER, etc.)
- **THEN** only events matching the specified type(s) are returned

#### Scenario: Filter by date range
- **WHEN** filtering events by startDate and endDate
- **THEN** only events within that date range are returned

#### Scenario: Combined filters
- **WHEN** applying multiple filters (type AND dateRange)
- **THEN** only events matching all criteria are returned

### Requirement: Type-safe API implementation
The API SHALL use type-safe patterns (tRPC) to ensure request/response validation.

#### Scenario: Input validation
- **WHEN** calling API with invalid data (missing required fields, invalid type)
- **THEN** API returns validation error without creating event

#### Scenario: Type safety across network
- **WHEN** calling tRPC procedures from client
- **THEN** types are validated both on client and server
