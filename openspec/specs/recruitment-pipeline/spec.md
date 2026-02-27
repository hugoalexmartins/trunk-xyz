## ADDED Requirements

### Requirement: Recruitment event types
The system SHALL define and support recruitment-specific event types representing stages of hiring process.

#### Scenario: Supported recruitment types
- **WHEN** checking available event types for recruitment
- **THEN** the following types are supported: APPLICATION, SCREENING, INTERVIEW, OFFER, REJECTION, HIRED

#### Scenario: Event creation with recruitment type
- **WHEN** creating an event with type=INTERVIEW for a recruitment pipeline
- **THEN** the event is created with recruitment context and can be filtered by type

### Requirement: Recruitment-specific metadata
The system SHALL support recruitment-specific metadata fields for different event types.

#### Scenario: Application metadata
- **WHEN** creating APPLICATION event with metadata (resume_url, cover_letter, source)
- **THEN** metadata is stored and retrievable for that application

#### Scenario: Interview metadata
- **WHEN** creating INTERVIEW event with metadata (interviewer, type, location, notes)
- **THEN** interview-specific data is captured without schema changes

#### Scenario: Offer metadata
- **WHEN** creating OFFER event with metadata (salary, start_date, position, benefits)
- **THEN** offer details are stored for tracking offer terms

### Requirement: Recruitment pipeline statuses
The system SHALL support status tracking specific to recruitment workflows.

#### Scenario: Application status progression
- **WHEN** updating APPLICATION event status from PENDING → UNDER_REVIEW → ACCEPTED
- **THEN** status changes are tracked and reflect review progress

#### Scenario: Rejection status
- **WHEN** an APPLICATION event status is set to REJECTED
- **THEN** the rejection is recorded and subsequent stages may be excluded

### Requirement: Recruitment dashboard representation
The system SHALL provide recruitment-specific view of pipelines as candidate journeys.

#### Scenario: Candidate pipeline view
- **WHEN** viewing a recruitment pipelineId
- **THEN** the complete candidate journey from application through hire/rejection is visible

#### Scenario: Multi-candidate view
- **WHEN** viewing all recruitment events without pipelineId filter
- **THEN** all candidate journeys are shown chronologically for overview
