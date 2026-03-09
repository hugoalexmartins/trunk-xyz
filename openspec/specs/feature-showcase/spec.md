## ADDED Requirements

### Requirement: Feature showcase cards grid
The landing page SHALL display 3-4 key application features in a responsive grid layout below the hero section.

#### Scenario: Feature cards render in responsive grid
- **WHEN** landing page loads
- **THEN** feature cards display in 1 column on mobile, 2 columns on tablet, 4 columns on desktop

#### Scenario: Each feature card displays title and description
- **WHEN** feature card is rendered
- **THEN** card includes header with feature title and body text with brief description

#### Scenario: Feature cards use neo-brutalism styling
- **WHEN** feature cards are rendered
- **THEN** cards use Card component with thick borders (border-4), hard shadows, and colored headers (primary/secondary/accent colors)

### Requirement: Feature card headers with color variants
The feature showcase SHALL use colored header bars to visually distinguish features and create visual hierarchy.

#### Scenario: Feature headers use Deep Ocean colors
- **WHEN** feature cards are rendered
- **THEN** headers alternate or use specific colors: primary (#00D9FF), secondary (#FFB81C), accent (#FF4D7D)

#### Scenario: Header text is bold and readable
- **WHEN** feature card header is rendered
- **THEN** text uses font-bold with sufficient contrast against header background color

### Requirement: Showcase key application features
The feature showcase SHALL highlight the main capabilities and value propositions of the trunk-xyz application.

#### Scenario: Timeline feature is described
- **WHEN** feature cards render
- **THEN** one card describes the Timeline feature (event tracking, chronological view)

#### Scenario: Recruitment feature is described
- **WHEN** feature cards render
- **THEN** one card describes the Recruitment Pipeline feature (candidate journey management)

#### Scenario: User Management feature is described
- **WHEN** feature cards render
- **THEN** one card describes the User Management feature (role-based access, admin controls)

#### Scenario: Additional feature is present
- **WHEN** feature cards render
- **THEN** fourth card describes another key feature (Real-time updates, Responsive design, or similar)
