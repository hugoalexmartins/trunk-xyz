## 1. Setup and Dependencies

- [x] 1.1 Install Tailwind CSS: `pnpm add -D tailwindcss postcss autoprefixer`
- [x] 1.2 Install next-themes: `pnpm add next-themes`
- [x] 1.3 Initialize Tailwind config: `npx tailwindcss init -p`
- [x] 1.4 Create tailwind.config.js with custom configuration
- [x] 1.5 Create globals.css with Tailwind directives (@tailwind, @layer, etc.)
- [x] 1.6 Update Next.js config if needed for CSS optimization

## 2. Design Tokens and Configuration

- [x] 2.1 Define color palette in tailwind.config.js
  - [x] 2.1.1 Primary colors (brand blues)
  - [x] 2.1.2 Secondary colors (supporting purples)
  - [x] 2.1.3 Semantic colors (success, warning, error)
  - [x] 2.1.4 Neutral colors (grays for backgrounds/borders)

- [x] 2.2 Configure typography scale
  - [x] 2.2.1 Font family settings
  - [x] 2.2.2 Font sizes (xs, sm, base, lg, xl, 2xl, 3xl)
  - [x] 2.2.3 Font weights (regular, medium, semibold, bold)
  - [x] 2.2.4 Line heights

- [x] 2.3 Configure spacing scale (4px base)
- [x] 2.4 Configure shadow system (multiple elevation levels)
- [x] 2.5 Configure border radius scale

## 3. Theme System Implementation

- [x] 3.1 Set up next-themes provider in _app.tsx
- [x] 3.2 Create theme context and hook (useTheme)
- [x] 3.3 Add theme toggle component to header
- [x] 3.4 Implement dark mode CSS classes
- [x] 3.5 Configure Tailwind for light/dark mode variants
- [x] 3.6 Test theme persistence in localStorage

## 4. Base UI Components

- [x] 4.1 Create Button component with variants (primary, secondary, danger)
- [x] 4.2 Create Card component with theme support
- [x] 4.3 Create Input component with styling and validation states
- [x] 4.4 Create Badge/Tag component for event types
- [x] 4.5 Create Label component for form labels
- [x] 4.6 Create Alert/Toast component for notifications
- [x] 4.7 Create Loading spinner component

## 5. Layout Components

- [x] 5.1 Create Container component with max-width
- [x] 5.2 Create Header component with navigation and theme toggle
- [x] 5.3 Create PageHeader component for page titles
- [ ] 5.4 Create Grid layout components
- [ ] 5.5 Create Flex layout utilities

## 6. Apply Styling to Pages

- [x] 6.1 Style /timeline page
  - [x] 6.1.1 Header and title styling
  - [x] 6.1.2 Filter controls styling
  - [x] 6.1.3 Event cards styling
  - [x] 6.1.4 Empty state styling

- [x] 6.2 Style /events/new page
  - [x] 6.2.1 Form styling
  - [x] 6.2.2 Input field styling
  - [x] 6.2.3 Button styling and states
  - [x] 6.2.4 Error message styling

- [x] 6.3 Style /recruitment page
  - [x] 6.3.1 Pipeline list styling
  - [x] 6.3.2 Stats cards styling
  - [x] 6.3.3 Recent activity styling

- [x] 6.4 Style /recruitment/[pipelineId] page
  - [x] 6.4.1 Header and breadcrumb styling
  - [x] 6.4.2 Stats display styling
  - [x] 6.4.3 Timeline styling

## 7. Component Styling Updates

- [x] 7.1 Update EventCard component with new styling
- [x] 7.2 Update Timeline component with new styling
- [x] 7.3 Update EventFilters component with new styling
- [x] 7.4 Update EventForm component with new styling
- [x] 7.5 Update EventTypeIcon/Badge components with colors
- [x] 7.6 Update all reusable components with theme support

## 8. Dark Mode Implementation

- [x] 8.1 Ensure all colors work in light mode
- [x] 8.2 Ensure all colors work in dark mode
- [x] 8.3 Test theme toggle functionality
- [x] 8.4 Verify no flickering on page load
- [x] 8.5 Test system preference detection
- [x] 8.6 Test theme persistence across sessions

## 9. Responsive Design

- [x] 9.1 Add mobile-first breakpoints to config
- [x] 9.2 Ensure timeline works on mobile
  - [x] 9.2.1 Single column layout
  - [x] 9.2.2 Touch-friendly filter buttons
  - [x] 9.2.3 Readable event cards

- [x] 9.3 Ensure forms work on mobile
  - [x] 9.3.1 Full-width inputs
  - [x] 9.3.2 Stacked buttons
  - [x] 9.3.3 Large touch targets

- [x] 9.4 Ensure navigation works on mobile
  - [x] 9.4.1 Responsive header layout
  - [x] 9.4.2 Theme toggle visibility
  - [x] 9.4.3 Menu adaptations

- [x] 9.5 Test on tablet breakpoint
- [x] 9.6 Test on desktop breakpoint

## 10. Interactive States

- [x] 10.1 Add hover states to all buttons
- [x] 10.2 Add focus states to all inputs
- [x] 10.3 Add focus states to all interactive elements
- [x] 10.4 Add active states to navigation links
- [x] 10.5 Add disabled states to buttons and inputs
- [x] 10.6 Add loading states

## 11. Testing and Polish

- [ ] 11.1 Test in light mode across all pages
- [ ] 11.2 Test in dark mode across all pages
- [ ] 11.3 Test responsive layouts at all breakpoints
- [ ] 11.4 Test accessibility (contrast, focus indicators)
- [ ] 11.5 Cross-browser testing (Chrome, Firefox, Safari)
- [ ] 11.6 Cross-device testing (mobile, tablet, desktop)
- [ ] 11.7 Performance check (bundle size with Tailwind)

## 12. Documentation

- [ ] 12.1 Create design system documentation
- [ ] 12.2 Document color tokens and their usage
- [ ] 12.3 Document component library
- [ ] 12.4 Create styling guide for developers
- [ ] 12.5 Update CLAUDE.md with styling guidelines
