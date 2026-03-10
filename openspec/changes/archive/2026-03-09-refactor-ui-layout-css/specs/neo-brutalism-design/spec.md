## ADDED Requirements

### Requirement: Deep Ocean Color Palette Implementation
The system SHALL use the Deep Ocean neo-brutalism color palette as the primary design system, with defined colors for canvas, text, primary actions, secondary actions, accents, and neutral backgrounds.

#### Scenario: Canvas background displays ice blue
- **WHEN** user views any page
- **THEN** the page background is ice blue (`#F5F9FC`)

#### Scenario: Text and borders use deep navy
- **WHEN** text, borders, or shadows are rendered
- **THEN** they use deep navy color (`#0B1929`) instead of pure black

#### Scenario: Primary buttons use cyan
- **WHEN** a primary action button is rendered
- **THEN** it displays with cyan background (`#00D9FF`) and deep navy text

#### Scenario: Secondary buttons use amber
- **WHEN** a secondary action button is rendered
- **THEN** it displays with amber background (`#FFB81C`) and deep navy text

#### Scenario: Accent elements use magenta
- **WHEN** alerts, warnings, or special states are displayed
- **THEN** they use magenta color (`#FF4D7D`)

### Requirement: Neo-Brutalism Typography System
The system SHALL use Space Grotesk font family with bold (700) and black (900) weights, uppercase text, and text-stroke effects for headings.

#### Scenario: Space Grotesk font loads on first page view
- **WHEN** a page is loaded
- **THEN** Space Grotesk font is loaded from Google Fonts without blocking page render

#### Scenario: Display text uses black weight with stroke
- **WHEN** display-size headings are rendered (`text-8xl`, `text-9xl`)
- **THEN** they use font-weight 900, uppercase, and `-webkit-text-stroke: 2px #0B1929`

#### Scenario: Body text uses bold weight
- **WHEN** body copy is rendered (`text-lg`, `text-xl`)
- **THEN** it uses font-weight 700, deep navy color, and uppercase where appropriate

#### Scenario: Light font weights are never used
- **WHEN** text is rendered
- **THEN** font-weight is minimum 700 (no light, thin, or regular weights)

### Requirement: Hard Offset Shadow System
The system SHALL implement hard-edged offset shadows with zero blur radius, using deep navy color, always positioned bottom-right.

#### Scenario: Small shadows render on interactive elements
- **WHEN** a button, input, or small card is rendered
- **THEN** it displays with shadow `4px 4px 0px 0px #0B1929`

#### Scenario: Medium shadows render on cards
- **WHEN** a card component is rendered
- **THEN** it displays with shadow `8px 8px 0px 0px #0B1929`

#### Scenario: Large shadows render on hover
- **WHEN** a card is hovered
- **THEN** shadow expands to `16px 16px 0px 0px #0B1929` and card lifts up 2px

#### Scenario: Shadows scale down on mobile
- **WHEN** page is viewed on mobile (under 640px)
- **THEN** shadows are reduced to `2px 2px 0px 0px #0B1929` or removed for elements

#### Scenario: Active button shadows disappear
- **WHEN** a button is clicked/active
- **THEN** shadow is removed (`shadow-none`), creating pressed effect

### Requirement: Thick Border System
The system SHALL apply thick (4px) deep navy borders to all interactive and container elements, with no mid-range corner radius.

#### Scenario: Buttons have thick borders
- **WHEN** a button is rendered
- **THEN** it displays `border-4 border-[#0B1929]`

#### Scenario: Cards have thick borders
- **WHEN** a card is rendered
- **THEN** it displays `border-4 border-[#0B1929]` with colored header bar

#### Scenario: Input fields have thick borders
- **WHEN** an input field is rendered
- **THEN** it displays `border-4 border-[#0B1929]`

#### Scenario: Corners are sharp or fully round
- **WHEN** border-radius is applied
- **THEN** it is either `rounded-none` (sharp) or `rounded-full` (pill shape) — no mid-range rounding

### Requirement: Button Component Styling
The system SHALL provide button components with primary and secondary variants, mechanical click interactions, and proper focus states.

#### Scenario: Primary button renders correctly
- **WHEN** `<Button variant="primary">Action</Button>` is rendered
- **THEN** it displays with cyan background, deep navy text, thick border, shadow, and uppercase typography

#### Scenario: Secondary button renders correctly
- **WHEN** `<Button variant="secondary">Action</Button>` is rendered
- **THEN** it displays with amber background, deep navy text, thick border, shadow, and uppercase typography

#### Scenario: Button has mechanical press effect
- **WHEN** button is clicked (active state)
- **THEN** it translates 2px right and 2px down, shadow disappears, creating mechanical press effect

#### Scenario: Button has keyboard focus state
- **WHEN** button receives keyboard focus
- **THEN** it displays a visible focus ring (thick outline) or background color shift

#### Scenario: Button height is consistent
- **WHEN** button is rendered
- **THEN** height is `h-12` to `h-14` (48-56px)

### Requirement: Card Component Styling
The system SHALL provide card components with thick borders, colored headers, deep shadows, and lift effect on hover.

#### Scenario: Card renders with white background
- **WHEN** a card is rendered
- **THEN** it displays ice blue background (`#F5F9FC`), thick black border, deep shadow

#### Scenario: Card header displays colored bar
- **WHEN** a card header is specified
- **THEN** it displays a colored bar (cyan, amber, or magenta) with bottom border separator

#### Scenario: Card lifts on hover
- **WHEN** card is hovered
- **THEN** it translates up 2px (`-translate-y-2`) and shadow expands to `16px 16px 0px 0px #0B1929`

#### Scenario: Card has proper padding and spacing
- **WHEN** card is rendered
- **THEN** internal padding uses 8px base unit (16px, 24px, 32px multiples)

### Requirement: Input Field Styling
The system SHALL provide input fields with thick borders, large bold text, focus state with background color change, and no soft focus rings.

#### Scenario: Input field renders correctly
- **WHEN** an input field is rendered
- **THEN** it displays ice blue or white background, thick deep navy border, large bold text, deep navy placeholder

#### Scenario: Input focus state changes background
- **WHEN** input field receives focus
- **THEN** background shifts to light cyan (`#E8F4F8`) and shadow is added, no soft ring

#### Scenario: Input maintains high contrast
- **WHEN** input is rendered
- **THEN** text and border are deep navy for high contrast on light background

### Requirement: Badge Component Styling
The system SHALL provide badge components with pill or square shapes, colored backgrounds, thick borders, and rotation effects.

#### Scenario: Badge renders with color
- **WHEN** `<Badge color="cyan">New</Badge>` is rendered
- **THEN** it displays cyan background, thick deep navy border, rounded-full (pill shape), uppercase text

#### Scenario: Badge has slight rotation
- **WHEN** badge is rendered or hovered
- **THEN** it has `rotate-3` (3-degree rotation)

#### Scenario: Badge is positioned absolutely
- **WHEN** badge is rendered
- **THEN** it is positioned absolutely for overlapping with cards or containers

### Requirement: Responsive Design System
The system SHALL implement mobile-first responsive design with breakpoints for tablet and desktop, with typography and spacing scaling appropriately.

#### Scenario: Mobile typography is smaller
- **WHEN** page is viewed on mobile (under 640px)
- **THEN** typography is `text-4xl` for headings, `text-lg` for body

#### Scenario: Tablet typography is larger
- **WHEN** page is viewed on tablet (640px–1024px)
- **THEN** typography scales to `text-6xl` for headings, `text-xl` for body

#### Scenario: Desktop typography is largest
- **WHEN** page is viewed on desktop (over 1024px)
- **THEN** typography scales to `text-8xl` for headings, large display sizes

#### Scenario: Grid stacks on mobile
- **WHEN** a multi-column grid is rendered on mobile
- **THEN** it displays as single column (`grid-cols-1`)

#### Scenario: Grid becomes 2–3 columns on desktop
- **WHEN** page is viewed on tablet or desktop
- **THEN** grid displays `md:grid-cols-2` or `lg:grid-cols-3`

#### Scenario: Mobile shadows are reduced
- **WHEN** page is viewed on mobile
- **THEN** shadows are reduced to `2px 2px 0px 0px` to avoid overwhelming small screens

#### Scenario: Button width is full on mobile
- **WHEN** button is rendered on mobile
- **THEN** it displays full-width (`w-full`)

### Requirement: Spacing Grid System
The system SHALL use 8px base unit for all margins, padding, and gaps, ensuring dense, consistent spacing throughout.

#### Scenario: Spacing uses 8px multiples
- **WHEN** components are spaced (padding, margin, gap)
- **THEN** they use values in multiples of 8px (8px, 16px, 24px, 32px, 40px, 48px, etc.)

#### Scenario: Intentional asymmetry is applied
- **WHEN** layout is designed
- **THEN** it prefers 60/40 splits over 50/50 symmetry where applicable

#### Scenario: Slight rotations break monotony
- **WHEN** decorative elements or badges are placed
- **THEN** they may use `rotate-1`, `-rotate-2`, `rotate-3` to break grid monotony

### Requirement: Fast Mechanical Interactions
The system SHALL implement fast transitions (100–300ms) with mechanical easing for interactive elements, avoiding soft animations.

#### Scenario: Button transitions are fast
- **WHEN** button is hovered or clicked
- **THEN** transitions use `duration-100` to `duration-200`, `ease-linear` or `ease-out` easing

#### Scenario: Card transitions are fast
- **WHEN** card is hovered
- **THEN** lift and shadow expansion use `duration-200`, `ease-out` easing

#### Scenario: Slow transitions are never used
- **WHEN** elements transition
- **THEN** duration is never `duration-500` or higher, easing is never `ease-in-out`

#### Scenario: Motion respects prefers-reduced-motion
- **WHEN** user has `prefers-reduced-motion: reduce` setting
- **THEN** all animations and rotations are disabled, transitions become instant

### Requirement: Accessibility and Contrast
The system SHALL maintain high contrast throughout, support keyboard navigation, and respect accessibility standards (WCAG 2.1 AA minimum).

#### Scenario: Text has high contrast
- **WHEN** text is rendered
- **THEN** it uses deep navy (`#0B1929`) on ice blue (`#F5F9FC`) or white on dark background for contrast ratio ≥ 4.5:1

#### Scenario: Focus states are visible
- **WHEN** user navigates with keyboard
- **THEN** focused elements display thick visible focus rings or background color changes

#### Scenario: Touch targets are minimum 44x44px
- **WHEN** interactive elements are rendered
- **THEN** buttons, inputs, badges are minimum 44×44px for touch accessibility

#### Scenario: Semantic HTML is maintained
- **WHEN** components are built
- **THEN** proper heading hierarchy (`<h1>`, `<h2>`, etc.), landmark regions (`<main>`, `<nav>`), and ARIA labels are used

### Requirement: No Custom Scrollbar Styling
The system SHALL NOT style scrollbars with `::-webkit-scrollbar` or similar pseudo-elements; browser defaults SHALL be used.

#### Scenario: Default scrollbar is displayed
- **WHEN** page content overflows vertically or horizontally
- **THEN** browser default scrollbar is displayed, no custom styling applied

#### Scenario: Scrollbar works in all browsers
- **WHEN** user scrolls on any browser
- **THEN** scrollbar behavior is consistent with native browser implementation

### Requirement: Component Library Structure
The system SHALL organize styled components in `/web/src/components/` for reusable elements, with page-specific customizations in `/web/src/features/[feature-name]/components/`.

#### Scenario: Reusable button component exists
- **WHEN** developer needs a button
- **THEN** they import `Button` from `/web/src/components/Button`

#### Scenario: Reusable card component exists
- **WHEN** developer needs a card
- **THEN** they import `Card` from `/web/src/components/Card`

#### Scenario: Feature-specific components override defaults
- **WHEN** a feature needs custom styling
- **THEN** it creates components in `/web/src/features/[feature-name]/components/`

### Requirement: Tailwind CSS Configuration
The system SHALL extend Tailwind CSS config with Deep Ocean colors, custom shadows, and typography settings.

#### Scenario: Custom colors are available in Tailwind
- **WHEN** developer uses `bg-deep-ocean-canvas`, `text-deep-ocean-ink`, `bg-deep-ocean-primary`
- **THEN** Tailwind applies Deep Ocean colors from config

#### Scenario: Custom shadows are available in Tailwind
- **WHEN** developer uses `shadow-neo-sm`, `shadow-neo-md`, `shadow-neo-lg`
- **THEN** Tailwind applies hard offset shadows from config

#### Scenario: Typography config includes Space Grotesk
- **WHEN** Tailwind renders text
- **THEN** default font-family is Space Grotesk, weights available are 700 and 900 only

## MODIFIED Requirements

### Requirement: Global Styles
The system SHALL define canvas background color as ice blue, text color as deep navy, and border colors as deep navy throughout.

#### Scenario: Page background is ice blue
- **WHEN** any page loads
- **THEN** body background is `#F5F9FC` (ice blue)

#### Scenario: Default text is deep navy
- **WHEN** text is rendered without specific styling
- **THEN** color is `#0B1929` (deep navy)

#### Scenario: Dark mode is deferred
- **WHEN** dark mode is requested
- **THEN** it is NOT implemented in this phase; light mode only (Deep Ocean theme)
