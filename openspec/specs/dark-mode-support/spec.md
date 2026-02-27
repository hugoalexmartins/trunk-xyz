## ADDED Requirements

### Requirement: Dark mode toggle UI
The system SHALL provide a user interface element to toggle dark mode.

#### Scenario: Theme toggle is visible
- **WHEN** viewing the application
- **THEN** a theme toggle button is accessible (typically in header)

#### Scenario: Toggle reflects current theme
- **WHEN** viewing the toggle
- **THEN** icon or label clearly indicates current theme

#### Scenario: Toggle switches theme instantly
- **WHEN** clicking the toggle
- **THEN** UI theme changes immediately without reload

### Requirement: Dark mode color inversion
The system SHALL properly invert all colors for dark mode readability.

#### Scenario: Text remains readable in dark mode
- **WHEN** dark mode is enabled
- **THEN** text color adjusts for proper contrast on dark backgrounds

#### Scenario: Backgrounds darken appropriately
- **WHEN** dark mode is enabled
- **THEN** all background colors are darkened while maintaining hierarchy

#### Scenario: Images and icons adapt
- **WHEN** dark mode is enabled
- **THEN** images and SVG icons maintain visibility (not inverted)

### Requirement: Persistent theme preference
The system SHALL remember user's theme choice across sessions.

#### Scenario: Theme saved to localStorage
- **WHEN** user toggles theme
- **THEN** preference is persisted to browser storage

#### Scenario: Theme restored on return
- **WHEN** user returns to app later
- **THEN** previously selected theme is applied
