## ADDED Requirements

### Requirement: UserShellLayout wraps all authenticated pages
The `UserShellLayout` component SHALL render a sticky header, a scrollable main content area, and a footer for all `/user/*` pages.

#### Scenario: Layout structure renders correctly
- **WHEN** a `/user/*` page renders
- **THEN** the page contains a sticky header at the top, a `<main>` content region, and a footer at the bottom

#### Scenario: Content scrolls independently of header and footer
- **WHEN** user scrolls the page
- **THEN** header remains pinned at the top and footer remains at the bottom of the viewport on long pages

### Requirement: Sticky header with scroll shadow
The header SHALL be sticky (`position: sticky; top: 0`) and SHALL display a drop shadow when the page is scrolled.

#### Scenario: Header is visible after scrolling
- **WHEN** user scrolls down past the top of the page
- **THEN** header remains visible at the top of the viewport

#### Scenario: Shadow appears on scroll
- **WHEN** `window.scrollY > 0`
- **THEN** header gains a neo-brutalism drop shadow class

#### Scenario: Shadow is absent at top of page
- **WHEN** `window.scrollY === 0`
- **THEN** header has no drop shadow

### Requirement: Desktop navigation with active state
The header SHALL display nav links (Dashboard, Timeline, Events) on desktop screens with a thick bottom border on the active route.

#### Scenario: Nav links are visible on desktop
- **WHEN** viewport width is ≥ 768px
- **THEN** Dashboard, Timeline, and Events nav links are visible in the header

#### Scenario: Active route is highlighted
- **WHEN** user is on `/user/dashboard`
- **THEN** the Dashboard nav link has a thick bottom border in the primary accent color

#### Scenario: Inactive routes have no border
- **WHEN** a nav link does not match the current route
- **THEN** it has no bottom border highlight

### Requirement: User dropdown in header
The header SHALL display a user avatar (initials) that opens a dropdown showing the user's name and email, with links to Profile, Change Password, and Logout.

#### Scenario: Avatar shows user initials
- **WHEN** authenticated user views the header
- **THEN** a circular avatar displays the user's initials derived from their name or email

#### Scenario: Dropdown opens on click
- **WHEN** user clicks the avatar
- **THEN** a dropdown panel appears showing name, email, Profile link, Change Password link, and Logout button

#### Scenario: Dropdown closes on outside click
- **WHEN** dropdown is open and user clicks outside it
- **THEN** dropdown closes

#### Scenario: Logout action clears session
- **WHEN** user clicks Logout in the dropdown
- **THEN** the logout mutation is called and user is redirected to `/auth/login`

### Requirement: Mobile hamburger and slide-in drawer
On mobile screens, the header SHALL hide nav links and show a hamburger icon that opens a slide-in drawer.

#### Scenario: Hamburger is visible on mobile
- **WHEN** viewport width is < 768px
- **THEN** hamburger icon is shown and desktop nav links are hidden

#### Scenario: Drawer opens on hamburger click
- **WHEN** user taps the hamburger icon
- **THEN** a drawer slides in from the left containing nav links and user information

#### Scenario: Drawer closes on backdrop click
- **WHEN** drawer is open and user taps the backdrop overlay
- **THEN** drawer closes

#### Scenario: Drawer closes on nav link click
- **WHEN** user taps a nav link inside the drawer
- **THEN** drawer closes and user navigates to the selected route

### Requirement: Footer with nav links, copyright, and social icons
The footer SHALL display navigation links, a copyright line, and social icon placeholders styled with neo-brutalism.

#### Scenario: Footer nav links are present
- **WHEN** user views the footer
- **THEN** links for Dashboard, Timeline, and Events are rendered

#### Scenario: Copyright text is displayed
- **WHEN** user views the footer
- **THEN** a copyright line with the app name is visible

#### Scenario: Social icon placeholders are rendered
- **WHEN** user views the footer
- **THEN** at least 2 social icon placeholders are displayed

#### Scenario: Footer has neo-brutalism top border
- **WHEN** user views the footer
- **THEN** it has a thick top border in the deep navy ink color
