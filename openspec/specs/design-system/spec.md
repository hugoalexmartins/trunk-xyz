## ADDED Requirements

### Requirement: Consistent spacing scale
The system SHALL use a consistent spacing scale (4px base) throughout.

#### Scenario: Spacing utilities available
- **WHEN** using spacing classes
- **THEN** multiples of 4px are available (4, 8, 12, 16, 24, 32, etc.)

#### Scenario: Consistent margins and padding
- **WHEN** viewing components
- **THEN** all spacing uses the defined scale

### Requirement: Typography system
The system SHALL define a consistent type scale and hierarchy.

#### Scenario: Heading sizes defined
- **WHEN** using heading components (h1-h6)
- **THEN** each has consistent size, weight, and line-height

#### Scenario: Body text configured
- **WHEN** displaying body text
- **THEN** uses base font size with appropriate line-height for readability

### Requirement: Shadow and elevation system
The system SHALL provide consistent depth through shadows.

#### Scenario: Multiple shadow levels
- **WHEN** using shadow utilities
- **THEN** shadows indicate elevation (subtle to prominent)

#### Scenario: Shadows respond to theme
- **WHEN** dark mode is active
- **THEN** shadows are adjusted for visibility on dark backgrounds

### Requirement: Border radius consistency
The system SHALL use consistent corner rounding.

#### Scenario: Border radius scale
- **WHEN** using rounded corners
- **THEN** multiple options (sm, md, lg, xl) are available

#### Scenario: Consistent look across components
- **WHEN** viewing components
- **THEN** border radius is used consistently for buttons, cards, inputs
