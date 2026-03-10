## ADDED Requirements

### Requirement: Inner-app pages use Deep Ocean canvas background
All inner-app page root elements SHALL use `bg-canvas` (#F5F9FC) as the background color. No page SHALL use `bg-white`, `bg-neutral-50`, or any `dark:` background variant.

#### Scenario: Page background on canvas
- **WHEN** any inner-app page is rendered
- **THEN** the root div has `bg-canvas` class applied

### Requirement: Inner-app pages use ink color for primary text
All primary text content in inner-app pages SHALL use `text-ink` (#0B1929). Generic `text-neutral-900`, `text-neutral-800`, or `dark:text-neutral-50` classes SHALL NOT appear.

#### Scenario: Text color on ink token
- **WHEN** page content is rendered
- **THEN** headings and body text use `text-ink` or `text-neutral-dark` from the design system

### Requirement: No dark mode variants in inner-app pages
Inner-app page templates SHALL NOT contain any Tailwind `dark:` variant classes. The application targets a single light theme using the Deep Ocean palette.

#### Scenario: No dark variants present
- **WHEN** any inner-app page template file is inspected
- **THEN** no `dark:` prefixed class strings are present in the JSX

### Requirement: Ad-hoc card markup uses neo-brutalism styling
Any card-like container markup that does not use the shared `Card` component SHALL apply neo-brutalism borders and shadows: `border-4 border-ink` and `shadow-neo-md` (or equivalent) with `bg-canvas` background.

#### Scenario: Stat cards in pipeline detail
- **WHEN** the pipeline detail page renders stats (Total Events, First Event, Latest Event)
- **THEN** each stat container has `border-4 border-ink` applied

### Requirement: Typography consistency with design system
Inner-app pages SHALL use `font-bold` or `font-black` for text weight. `font-medium` and `font-mono` SHALL NOT be used for labels, stats, or headings. Date/time display values MAY use `font-bold`.

#### Scenario: Stat labels use design-system font weights
- **WHEN** a stat label or data value is rendered
- **THEN** it uses `font-bold` and `text-ink` or `text-neutral-dark`

### Requirement: Auth module pages visually consistent
The login, signup, and pending-approval pages SHALL render with the neo-brutalism design system. They SHALL use the existing `Card`, `Button`, `Input`, and `Container` components without adding non-design-system wrapper styles.

#### Scenario: Login page renders with design system
- **WHEN** the login page is loaded
- **THEN** the page background is `bg-canvas` and the card uses neo-brutalism styling

#### Scenario: Signup page renders with design system
- **WHEN** the signup page is loaded
- **THEN** the page background is `bg-canvas`, the card uses neo-brutalism styling, and no `dark:` classes are present

#### Scenario: Pending approval page renders with design system
- **WHEN** the pending approval page is loaded
- **THEN** the page background is `bg-canvas` and the card uses the amber header color

### Requirement: Admin module pages visually consistent
The admin users page SHALL render with the neo-brutalism design system for all UI elements including the filter bar, table headers, status badges, and action buttons.

#### Scenario: Admin page renders with design system
- **WHEN** the admin users page is loaded by an admin user
- **THEN** the page background is `bg-canvas`, the table uses `border-4 border-ink`, and all text uses design system tokens

### Requirement: Recruitment module pages visually consistent
The recruitment list page and pipeline detail page SHALL use `bg-canvas` and design system tokens. Empty states SHALL use `text-ink`/`text-neutral-dark` instead of generic neutral colors.

#### Scenario: Recruitment list empty state
- **WHEN** no pipelines exist and the recruitment page renders
- **THEN** the empty state text uses `text-ink` and `font-bold`

#### Scenario: Pipeline detail page background
- **WHEN** the pipeline detail page is loaded
- **THEN** the root element uses `bg-canvas` instead of `bg-white dark:bg-neutral-950`

### Requirement: Events module pages visually consistent
The new event page SHALL render with the neo-brutalism design system, using `bg-canvas` and design system tokens consistently.

#### Scenario: New event page renders with design system
- **WHEN** the new event page is loaded
- **THEN** the page background is `bg-canvas` and the back button uses the existing `Button` component
