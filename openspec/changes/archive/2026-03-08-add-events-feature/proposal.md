## Why

The application needs a flexible, generic event system that supports tracking sequences of related activities as "pipelines." A recruitment pipeline exemplifies this: multiple events (application received, interview scheduled, offer extended, hired) are part of a single recruitment journey. By designing events with pipeline grouping via UUID, we create a reusable foundation that can support recruitment, support tickets, sales deals, project phases, and other domain-specific pipelines.

## What Changes

- Add generic event model to Prisma with pipeline UUID for grouping related events
- Create event types and status tracking within pipelines
- Implement timeline view that displays events chronologically and by pipeline
- Build recruitment pipeline implementation as the initial use case
- Create API endpoints for event and pipeline management
- Add filtering to view events by pipeline, date range, and type
- Design extensible event schema to support future pipeline types

## Capabilities

### New Capabilities
- `events-model`: Generic event schema with pipeline UUID, timestamp, type, and status fields for grouping related events
- `events-api`: API endpoints for creating, reading, updating, and deleting events; querying by pipeline UUID
- `pipeline-concept`: Core pipeline abstraction to group related events (recruitment, support, sales, etc.)
- `recruitment-pipeline`: Recruitment-specific pipeline implementation with event types (application, interview, offer, decision)
- `events-timeline-view`: Timeline component displaying events chronologically with pipeline grouping
- `events-filtering`: Filter events by pipeline UUID, date range, event type, and status

### Modified Capabilities
<!-- No existing capabilities require modification for initial events feature -->

## Impact

- **Database**: New `Event` model with `pipelineId` UUID, `type`, `status`, and `metadata` fields; indexes on `pipelineId` and `createdAt`
- **API**: New tRPC router for events with procedures for CRUD and querying by pipeline
- **Frontend**: New `/features/events` directory with timeline view and recruitment pipeline components
- **Components**: Timeline component, event list, event form, pipeline view
- **UI Pages**: Timeline page to view all events; recruitment pipeline page to view recruitment-specific aggregations
- **Dependencies**: None new (uses existing tech stack)

## Design Principles

1. **Generic by design**: Event model is not tied to recruitment; `type` and `metadata` fields allow extensibility
2. **Pipeline as grouping mechanism**: UUID links events into logical sequences without requiring a separate pipeline table
3. **Extensible**: New event types and pipeline types can be added without schema changes
4. **Timeline-first**: Timeline view is the primary interface; drill-down to pipeline details available

## Future Extensions

Once the generic events + recruitment pipeline foundation is solid, can add:
- Support ticket pipelines
- Sales deal pipelines
- Project task pipelines
- Event attachments and comments
- Pipeline templates and automation
- Analytics on pipeline conversion rates
