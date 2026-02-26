## ADDED Requirements

### Requirement: Global timeline view
The system SHALL display all events chronologically in a timeline format on a dedicated page.

#### Scenario: Timeline page loads
- **WHEN** user navigates to /timeline
- **THEN** all events are displayed in chronological order (newest first)

#### Scenario: Event card in timeline
- **WHEN** viewing timeline
- **THEN** each event shows title, type, status, date, and description

#### Scenario: Empty timeline
- **WHEN** no events exist
- **THEN** timeline displays helpful message indicating no events

### Requirement: Pipeline grouping in timeline
The system SHALL allow timeline view to show events grouped by their pipeline UUID.

#### Scenario: Pipeline expansion
- **WHEN** clicking on a pipeline group in timeline
- **THEN** that pipeline expands to show all its events or collapses if already expanded

#### Scenario: Pipeline header
- **WHEN** viewing a grouped pipeline in timeline
- **THEN** pipeline header shows count of events and key dates (start/end)

### Requirement: Visual differentiation by type
The system SHALL use visual cues (color, icon, label) to distinguish different event types.

#### Scenario: Type-based styling
- **WHEN** viewing timeline events
- **THEN** events of different types have distinct visual appearance (APPLICATION blue, INTERVIEW green, OFFER gold, REJECTION red, etc.)

#### Scenario: Type legend
- **WHEN** viewing timeline
- **THEN** a legend shows what each color/icon represents

### Requirement: Pagination for large event sets
The system SHALL support pagination or infinite scroll for timelines with many events.

#### Scenario: Initial page load
- **WHEN** timeline page loads
- **THEN** first page of events is displayed (e.g., last 20 events)

#### Scenario: Load more
- **WHEN** user scrolls to bottom or clicks load more
- **THEN** next page of events is loaded and appended to timeline

### Requirement: Pipeline detail view
The system SHALL provide dedicated view for exploring a single pipeline's full journey.

#### Scenario: Pipeline detail page
- **WHEN** clicking a pipeline or navigating to /recruitment/[pipelineId]
- **THEN** all events for that pipeline are displayed with chronological ordering and full details

#### Scenario: Pipeline metadata display
- **WHEN** viewing pipeline detail
- **THEN** pipeline creation date, event count, and overall status are shown
