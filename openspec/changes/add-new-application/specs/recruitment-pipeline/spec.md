## MODIFIED Requirements

### Requirement: Recruitment-specific metadata
The system SHALL support recruitment-specific metadata fields for different event types.

#### Scenario: Application metadata
- **WHEN** creating APPLICATION event
- **THEN** metadata MUST contain: `{ position: string, company: string, jobUrl: string | null, jobUrlFile: string | null }` and metadata is stored and retrievable for that application

#### Scenario: Interview metadata
- **WHEN** creating INTERVIEW event with metadata (interviewer, type, location, notes)
- **THEN** interview-specific data is captured without schema changes

#### Scenario: Offer metadata
- **WHEN** creating OFFER event with metadata (salary, start_date, position, benefits)
- **THEN** offer details are stored for tracking offer terms

## ADDED Requirements

### Requirement: APPLICATION event as pipeline head
The system SHALL treat the APPLICATION event as the canonical head of a recruitment pipeline, identified by its self-referencing pipelineId.

#### Scenario: APPLICATION event is its own pipeline head
- **WHEN** an APPLICATION event is created via applications.create
- **THEN** the event's pipelineId MUST equal its own id

#### Scenario: Subsequent pipeline events reference the head
- **WHEN** a SCREENING, INTERVIEW, OFFER, REJECTION, or HIRED event is added to an existing pipeline
- **THEN** that event's pipelineId MUST equal the id of the original APPLICATION event that started the pipeline

#### Scenario: Pipeline head is queryable
- **WHEN** querying events with type=APPLICATION and createdById matching the current user
- **THEN** the results represent all active recruitment pipelines for that user, one per application
