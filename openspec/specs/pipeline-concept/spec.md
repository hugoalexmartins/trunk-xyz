## ADDED Requirements

### Requirement: Pipeline as event grouping
The system SHALL support the concept of a "pipeline" as a logical grouping of related events identified by a UUID.

#### Scenario: Pipeline creation via events
- **WHEN** creating the first event with a new pipelineId UUID
- **THEN** the pipeline implicitly exists and can be queried

#### Scenario: Pipeline visibility
- **WHEN** querying pipelines
- **THEN** user can see all pipelines that have at least one event

#### Scenario: Single pipeline view
- **WHEN** querying a specific pipelineId
- **THEN** all events associated with that pipeline are returned in chronological order

### Requirement: Pipeline independence from type
A pipeline SHALL be able to contain events of different types, allowing flexible event sequences.

#### Scenario: Mixed event types in pipeline
- **WHEN** adding APPLICATION, INTERVIEW, and OFFER events to same pipelineId
- **THEN** all three events are part of the same pipeline and can be retrieved together

### Requirement: Pipeline as workflow representation
The system SHALL allow pipelines to represent workflows (e.g., recruitment journey).

#### Scenario: Complete recruitment workflow
- **WHEN** viewing a pipelineId with events: APPLICATION → INTERVIEW → OFFER → HIRED
- **THEN** the full workflow progression is visible in timeline order

#### Scenario: Incomplete workflow
- **WHEN** viewing a pipelineId with only APPLICATION and INTERVIEW events
- **THEN** the partial workflow is shown without requiring completion
