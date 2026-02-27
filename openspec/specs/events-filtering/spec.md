## ADDED Requirements

### Requirement: Filter events by type
The system SHALL allow users to filter timeline events by one or more event types.

#### Scenario: Single type filter
- **WHEN** user selects filter for type=INTERVIEW
- **THEN** timeline shows only INTERVIEW events

#### Scenario: Multiple type filter
- **WHEN** user selects types=INTERVIEW,OFFER
- **THEN** timeline shows events matching either type

#### Scenario: Clear type filter
- **WHEN** user removes type filter
- **THEN** timeline shows all events again

### Requirement: Filter events by date range
The system SHALL support filtering events by start and end date.

#### Scenario: Date range selection
- **WHEN** user specifies startDate and endDate
- **THEN** timeline shows only events within that date range

#### Scenario: Start date only
- **WHEN** user specifies only startDate (no endDate)
- **THEN** timeline shows events from start date to present

#### Scenario: End date only
- **WHEN** user specifies only endDate (no startDate)
- **THEN** timeline shows events up to and including end date

### Requirement: Filter events by pipeline
The system SHALL allow filtering to show events from specific pipelines only.

#### Scenario: Single pipeline filter
- **WHEN** user filters by pipelineId
- **THEN** timeline shows only events associated with that pipeline

#### Scenario: View all pipelines
- **WHEN** user clears pipeline filter
- **THEN** timeline shows events from all pipelines

### Requirement: Combined filtering
The system SHALL support applying multiple filters simultaneously.

#### Scenario: Type and date range
- **WHEN** user filters by type AND dateRange
- **THEN** timeline shows only events matching all criteria

#### Scenario: Type, date, and pipeline
- **WHEN** user applies type, dateRange, and pipelineId filters
- **THEN** timeline respects all filters and shows matching events

### Requirement: Search by text
The system SHALL support full-text search on event title and description.

#### Scenario: Search by keyword
- **WHEN** user enters search term (e.g., "John Smith")
- **THEN** timeline shows events whose title or description contains that term

#### Scenario: Search with filters
- **WHEN** user applies text search AND other filters
- **THEN** results respect all criteria

### Requirement: Filter UI/UX
The system SHALL provide intuitive filter controls in the timeline view.

#### Scenario: Filter visibility
- **WHEN** viewing timeline
- **THEN** filter controls are visible and accessible

#### Scenario: Active filter indication
- **WHEN** filters are applied
- **THEN** UI indicates which filters are active and count of matching events

#### Scenario: Clear all filters
- **WHEN** user clicks "Clear filters"
- **THEN** all filters are removed and full timeline is shown
