## MODIFIED Requirements

### Requirement: Event CRUD operations via API
The system SHALL provide type-safe API endpoints for creating, reading, updating, and deleting events.

#### Scenario: Create event
- **WHEN** authenticated user calls the create endpoint with event data (type, title, description, pipelineId, metadata)
- **THEN** event is created with creator set to current user, and returned with assigned UUID and timestamps

#### Scenario: Retrieve single event
- **WHEN** authenticated user queries for an event by ID
- **THEN** the complete event data including creator information is returned or 404 if not found

#### Scenario: Update event
- **WHEN** authenticated user calls update endpoint with partial event data
- **THEN** specified fields are updated and updatedAt timestamp changes (creator remains unchanged)

#### Scenario: Delete event
- **WHEN** authenticated user deletes an event by ID
- **THEN** event is removed and subsequent queries return 404

### Requirement: Querying events by pipeline
The system SHALL provide efficient API method to retrieve all events for a specific pipeline.

#### Scenario: List pipeline events
- **WHEN** authenticated user queries events for a specific pipelineId with optional pagination
- **THEN** all events for that pipeline are returned sorted by createdAt (newest first), including creator information

#### Scenario: Pipeline event count
- **WHEN** authenticated user requests event count for a pipeline
- **THEN** the total number of events in that pipeline is returned

### Requirement: Global event listing with filters
The system SHALL provide API to list all events with optional filtering by type, date range, and status.

#### Scenario: List all events
- **WHEN** authenticated user calls the list events endpoint without filters
- **THEN** all events are returned in chronological order (newest first) with pagination, including creator information

#### Scenario: Filter by event type
- **WHEN** authenticated user filters events by type (APPLICATION, INTERVIEW, OFFER, etc.)
- **THEN** only events matching the specified type(s) are returned

#### Scenario: Filter by date range
- **WHEN** authenticated user filters events by startDate and endDate
- **THEN** only events within that date range are returned

#### Scenario: Combined filters
- **WHEN** authenticated user applies multiple filters (type AND dateRange)
- **THEN** only events matching all criteria are returned

### Requirement: Type-safe API implementation
The API SHALL use type-safe patterns (tRPC) to ensure request/response validation.

#### Scenario: Input validation
- **WHEN** user calls API with invalid data (missing required fields, invalid type)
- **THEN** API returns validation error without creating event

#### Scenario: Type safety across network
- **WHEN** authenticated user calls tRPC procedures from client
- **THEN** types are validated both on client and server

## ADDED Requirements

### Requirement: Authentication Required for All Event Operations
The system SHALL require valid JWT authentication for all event API endpoints.

#### Scenario: Unauthenticated request rejected
- **WHEN** unauthenticated user attempts to call event API without valid JWT token
- **THEN** API returns 401 Unauthorized response

#### Scenario: Expired token rejected
- **WHEN** user sends API request with expired JWT token
- **THEN** API returns 401 Unauthorized and client logs out user

#### Scenario: All CRUD operations require auth
- **WHEN** checking event endpoints (create, read, update, delete, list)
- **THEN** every endpoint requires valid, non-expired JWT authentication
