## ADDED Requirements

### Requirement: Reusable UI components with theme support
The system SHALL provide a library of reusable components that support theming.

#### Scenario: Button component with variants
- **WHEN** rendering a button
- **THEN** it supports primary, secondary, and danger variants with proper styling

#### Scenario: Card component with theme support
- **WHEN** rendering a card
- **THEN** background and text colors adapt to current theme

#### Scenario: Input components styled consistently
- **WHEN** using form inputs
- **THEN** borders, focus states, and text colors are theme-aware

#### Scenario: Badge and status components
- **WHEN** displaying event type badges
- **THEN** colors match theme and type (APPLICATION, INTERVIEW, OFFER, etc.)

### Requirement: Component hover and focus states
The system SHALL provide proper interactive states for all components.

#### Scenario: Buttons respond to hover
- **WHEN** hovering over a button
- **THEN** color and shadow change to indicate interactivity

#### Scenario: Inputs show focus state
- **WHEN** focusing on an input
- **THEN** border and shadow highlight the focused field

#### Scenario: Links are distinguishable
- **WHEN** viewing links
- **THEN** they are underlined and use theme color
