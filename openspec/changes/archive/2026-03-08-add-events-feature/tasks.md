## 1. Database Schema

- [ ] 1.1 Add Event model to packages/shared/prisma/schema.prisma
  - [ ] 1.1.1 Define fields: id (UUID), pipelineId (UUID, optional), type (enum), status (enum), title, description, metadata (JSON), timestamps
  - [ ] 1.1.2 Create indexes: (pipelineId, createdAt), (createdAt), (type)

- [ ] 1.2 Create Prisma migration for Event table
  - [ ] 1.2.1 Run `pnpm --filter=shared run db:generate` to generate types
  - [ ] 1.2.2 Create migration with `prisma migrate dev --name add_event_model`
  - [ ] 1.2.3 Verify migration runs without errors

## 2. Event Type Enums

- [ ] 2.1 Define EventType enum in Prisma schema (APPLICATION, SCREENING, INTERVIEW, OFFER, REJECTION, HIRED)
- [ ] 2.2 Define EventStatus enum in Prisma schema (PENDING, ACTIVE, COMPLETED, ARCHIVED)
- [ ] 2.3 Export enums and types from packages/shared/src/index.ts

## 3. tRPC API Implementation

- [ ] 3.1 Create src/server/api/routers/events.ts in web package
  - [ ] 3.1.1 Implement createEvent procedure (input validation with Zod, metadata by type)
  - [ ] 3.1.2 Implement getEvent procedure (by id)
  - [ ] 3.1.3 Implement updateEvent procedure (partial fields)
  - [ ] 3.1.4 Implement deleteEvent procedure

- [ ] 3.2 Implement list/query procedures
  - [ ] 3.2.1 Implement listEventsByPipeline procedure (with cursor pagination)
  - [ ] 3.2.2 Implement listAllEvents procedure (with filters: type, dateRange, pagination)
  - [ ] 3.2.3 Implement getEventCount procedure

- [ ] 3.3 Add events router to root tRPC router (src/server/api/root.ts)
- [ ] 3.4 Verify all procedures are properly typed and exported

## 4. Frontend Hooks and Utilities

- [ ] 4.1 Create hooks for event queries
  - [ ] 4.1.1 Create useEvents hook (fetch all events with filtering)
  - [ ] 4.1.2 Create useEventsByPipeline hook (fetch events for specific pipeline)
  - [ ] 4.1.3 Create useSingleEvent hook (fetch one event by ID)

- [ ] 4.2 Create hooks for event mutations
  - [ ] 4.2.1 Create useCreateEvent hook
  - [ ] 4.2.2 Create useUpdateEvent hook
  - [ ] 4.2.3 Create useDeleteEvent hook

- [ ] 4.3 Create types and validation schemas
  - [ ] 4.3.1 Define TypeScript types for Event, EventType, EventStatus
  - [ ] 4.3.2 Create Zod schemas for event creation/update validation
  - [ ] 4.3.3 Create metadata validation schemas by event type

## 5. Timeline Component

- [ ] 5.1 Create components/EventCard.tsx
  - [ ] 5.1.1 Display event type with color/icon based on type
  - [ ] 5.1.2 Show title, description, status, timestamp
  - [ ] 5.1.3 Make clickable to view full event details

- [ ] 5.2 Create components/Timeline.tsx
  - [ ] 5.2.1 Display events in chronological order
  - [ ] 5.2.2 Group events by pipeline with expandable sections
  - [ ] 5.2.3 Handle loading and empty states
  - [ ] 5.2.4 Implement pagination for large event sets

- [ ] 5.3 Create components/EventTypeIcon.tsx and EventTypeBadge.tsx
  - [ ] 5.3.1 Map event types to colors and icons
  - [ ] 5.3.2 Create reusable badge component for type display

## 6. Filter UI Components

- [ ] 6.1 Create components/EventFilters.tsx
  - [ ] 6.1.1 Type filter (checkbox group for event types)
  - [ ] 6.1.2 Date range filter (date pickers for start/end)
  - [ ] 6.1.3 Pipeline filter (dropdown or searchable select)
  - [ ] 6.1.4 Text search input for title/description

- [ ] 6.2 Create components/ActiveFilters.tsx
  - [ ] 6.2.1 Display currently applied filters
  - [ ] 6.2.2 Allow removing individual filters
  - [ ] 6.2.3 Show "Clear all filters" button

## 7. Pages and Routes

- [ ] 7.1 Create web/src/pages/timeline.tsx
  - [ ] 7.1.1 Render Timeline component with all events
  - [ ] 7.1.2 Render EventFilters component above timeline
  - [ ] 7.1.3 Handle loading and error states

- [ ] 7.2 Create web/src/pages/recruitment.tsx
  - [ ] 7.2.1 Display recruitment-specific pipeline view
  - [ ] 7.2.2 Show list of recruitment pipelines with key metrics
  - [ ] 7.2.3 Link to individual pipeline detail pages

- [ ] 7.3 Create web/src/pages/recruitment/[pipelineId].tsx
  - [ ] 7.3.1 Fetch and display all events for a single pipeline
  - [ ] 7.3.2 Show pipeline metadata (creation date, event count, status)
  - [ ] 7.3.3 Display events with full details and metadata

## 8. Event Management Features

- [ ] 8.1 Create components/EventForm.tsx
  - [ ] 8.1.1 Form fields for title, description, type, status
  - [ ] 8.1.2 Dynamic metadata fields based on selected event type
  - [ ] 8.1.3 Validation on submit

- [ ] 8.2 Create web/src/pages/events/new.tsx
  - [ ] 8.2.1 Render event creation form
  - [ ] 8.2.2 Support creating with optional pipelineId (for recruitment flow)
  - [ ] 8.2.3 Redirect to timeline on success

- [ ] 8.3 Create web/src/pages/events/[id]/edit.tsx
  - [ ] 8.3.1 Render event edit form
  - [ ] 8.3.2 Pre-populate form with existing event data
  - [ ] 8.3.3 Redirect to event detail page on success

- [ ] 8.4 Create web/src/pages/events/[id].tsx (event detail page)
  - [ ] 8.4.1 Display complete event information
  - [ ] 8.4.2 Show all metadata fields
  - [ ] 8.4.3 Provide links to edit and delete
  - [ ] 8.4.4 Show related events in same pipeline (if applicable)

## 9. Recruitment-Specific Features

- [ ] 9.1 Create recruitment-specific metadata types
  - [ ] 9.1.1 APPLICATION: resume_url, cover_letter, source
  - [ ] 9.1.2 SCREENING: screener, feedback, passed
  - [ ] 9.1.3 INTERVIEW: interviewer, type, location, notes
  - [ ] 9.1.4 OFFER: salary, start_date, position, benefits
  - [ ] 9.1.5 REJECTION: reason, feedback_provided

- [ ] 9.2 Create recruitment form variant with metadata fields
  - [ ] 9.2.1 APPLICATION form with resume and source
  - [ ] 9.2.2 INTERVIEW form with interviewer and location
  - [ ] 9.2.3 OFFER form with salary and benefits

## 10. Testing and Verification

- [ ] 10.1 Test event CRUD operations
  - [ ] 10.1.1 Create event with and without pipelineId
  - [ ] 10.1.2 Retrieve events and verify data
  - [ ] 10.1.3 Update event fields
  - [ ] 10.1.4 Delete event and verify it's removed

- [ ] 10.2 Test filtering and querying
  - [ ] 10.2.1 Query by pipelineId returns correct events
  - [ ] 10.2.2 Filter by type returns correct events
  - [ ] 10.2.3 Filter by date range works correctly
  - [ ] 10.2.4 Combined filters work together

- [ ] 10.3 Test UI components
  - [ ] 10.3.1 Timeline renders events in correct order
  - [ ] 10.3.2 Filters update timeline correctly
  - [ ] 10.3.3 Pipeline grouping works
  - [ ] 10.3.4 Event form validation works

- [ ] 10.4 Test recruitment-specific features
  - [ ] 10.4.1 Recruitment pipeline page displays all pipelines
  - [ ] 10.4.2 Pipeline detail page shows all events
  - [ ] 10.4.3 Metadata display correct for each event type

## 11. Styling and Polish

- [ ] 11.1 Style timeline and event cards
  - [ ] 11.1.1 Visual differentiation by event type (colors/icons)
  - [ ] 11.1.2 Type legend display
  - [ ] 11.1.3 Responsive layout for mobile and desktop

- [ ] 11.2 Style filter UI
  - [ ] 11.2.1 Filter controls visually organized
  - [ ] 11.2.2 Active filters clearly indicated
  - [ ] 11.2.3 Date picker and select styling

- [ ] 11.3 Style forms and pages
  - [ ] 11.3.1 Event creation/edit form styling
  - [ ] 11.3.2 Recruitment pipeline page layout
  - [ ] 11.3.3 Event detail page styling

## 12. Documentation

- [ ] 12.1 Add API documentation to CLAUDE.md
  - [ ] 12.1.1 Document tRPC events router procedures
  - [ ] 12.1.2 Document filter options and metadata schemas

- [ ] 12.2 Create example code for event creation
  - [ ] 12.2.1 Example: creating an APPLICATION event
  - [ ] 12.2.2 Example: querying events by pipeline
  - [ ] 12.2.3 Example: filtering with multiple criteria
