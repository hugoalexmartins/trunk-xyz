## Context

The trunk-xyz project is a timeline application for visualizing events. Currently, the monorepo has no event data model or timeline UI. The application is built with Next.js 14, Prisma ORM, and PostgreSQL. We're implementing a generic events system that supports grouping events into "pipelines" (e.g., recruitment journeys). Recruitment is the initial use case.

## Goals / Non-Goals

**Goals:**
- Design a generic event model that isn't tied to recruitment but can represent it
- Use pipeline UUID to group related events without requiring a separate pipeline table
- Implement recruitment event types and statuses as the initial pipeline type
- Create a timeline view showing events chronologically with pipeline grouping
- Build extensible foundation for future pipeline types (support tickets, sales, projects, etc.)
- Ensure filtering and querying by pipeline UUID is efficient

**Non-Goals:**
- Event attachments, media, or comments (future enhancement)
- Pipeline automation or workflow triggers
- Advanced visualization (Gantt charts, network graphs)
- Multi-tenancy or permission system
- Event audit/versioning history

## Decisions

### 1. Pipeline Grouping via UUID (not separate table)
**Decision**: Use `pipelineId` UUID field on events instead of separate `Pipeline` table

**Rationale:**
- Simpler schema, fewer joins
- Supports ad-hoc pipeline creation (no need to pre-create pipelines)
- Generic events can exist without a pipeline
- Still queryable and groupable by pipelineId

**Alternatives considered:**
- Separate Pipeline table: more structure but adds complexity, requires pre-creation
- Implicit grouping by matching criteria: harder to query, less explicit

### 2. Event Type as Enum (not separate table)
**Decision**: Use `type` field with enum values (APPLICATION, INTERVIEW, OFFER, DECISION, etc.)

**Rationale:**
- Known set of recruitment event types initially
- Easy to query and filter
- Can extend with new types without migration
- Simpler than event_type lookup table

**Alternatives considered:**
- Separate event_type table: unnecessary overhead, harder to extend
- Free text type: no validation, harder to build consistent UI

### 3. Flexible Metadata JSON field
**Decision**: Add `metadata` JSONB field for event-specific data (e.g., interview type, salary offer, rejection reason)

**Rationale:**
- Different event types have different attributes
- Avoids creating type-specific columns
- Allows future pipeline types to store custom data
- PostgreSQL JSONB is queryable and indexed

**Alternatives considered:**
- Type-specific tables: too rigid, hard to extend
- Multiple nullable columns: pollutes schema, doesn't scale

### 4. tRPC + REST API (or tRPC-first)
**Decision**: Implement tRPC router for type-safe client-server communication; REST endpoints optional

**Rationale:**
- Type-safe queries and mutations across network
- Reduces boilerplate vs raw REST
- Consistent with monorepo patterns
- Better TypeScript integration with Prisma

**Alternatives considered:**
- Pure REST: simpler but less type safety
- GraphQL: overkill for current scale

### 5. Pagination for timeline
**Decision**: Use cursor-based pagination (date + ID) for timeline events

**Rationale:**
- Efficient for large event lists
- Works well with sorting by date
- No offset/limit issues

**Alternatives considered:**
- Offset/limit: simpler but inefficient for large datasets
- Infinite scroll without pagination: harder to navigate

## Architecture

```
Event Model:
├── id (UUID)
├── pipelineId (UUID, nullable - events can exist without pipeline)
├── type (enum: APPLICATION, INTERVIEW, OFFER, DECISION, REJECTION, HIRED, etc.)
├── status (enum: PENDING, ACTIVE, COMPLETED, ARCHIVED, etc.)
├── title (string)
├── description (text, nullable)
├── metadata (JSONB - event-type specific data)
├── createdAt (timestamp)
├── updatedAt (timestamp)
└── Indexes: (pipelineId, createdAt), (createdAt), type

tRPC Router (events):
├── create(type, pipelineId, title, description, metadata)
├── update(id, partial fields)
├── delete(id)
├── getById(id)
├── listByPipeline(pipelineId, pagination)
├── listAll(filters: type, dateRange, pagination)
└── getPipelineTimeline(pipelineId) - returns all events for one pipeline

Frontend Routes:
├── /timeline - view all events chronologically
├── /recruitment - recruitment-specific view of pipelines
└── /recruitment/[pipelineId] - view single recruitment pipeline
```

## Risks / Trade-offs

**Risk: JSON validation on metadata field**
- Different event types need different metadata structures
- No schema validation at database level
→ Mitigation: Use Zod schemas in application code to validate metadata by type

**Risk: pipelineId querying at scale**
- If millions of events, filtering by pipelineId could be slow
→ Mitigation: Add index on (pipelineId, createdAt); can add partitioning later if needed

**Risk: Treating all pipelines the same in UI**
- Recruitment pipelines have different semantics than (e.g.) support tickets
→ Mitigation: Create type-specific components; generic timeline is shared foundation

**Risk: Future pipeline types require schema changes**
- May discover new event types or metadata that doesn't fit
→ Mitigation: JSONB metadata field is flexible; can extend without schema changes

## Implementation Phases

1. **Phase 1**: Database schema (Event table), basic CRUD API, timeline view
2. **Phase 2**: Recruitment pipeline types and UI components
3. **Phase 3**: Filtering and search
4. **Phase 4**: Polish and optimization (indexing, pagination)

## Open Questions

1. Should we pre-populate recruitment event types (APPLICATION, INTERVIEW, OFFER, DECISION, REJECTED, HIRED)? Or let application define them?
2. Should event timestamps be user-provided (e.g., "interview happened last Tuesday") or always system-generated (now)?
3. Do we need soft deletes on events, or hard deletes?
4. Should pipelineId be required or optional? (Proposed: optional - allow standalone events)
