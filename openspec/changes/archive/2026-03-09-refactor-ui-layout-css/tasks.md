## 1. Setup & Configuration

- [x] 1.1 Add Space Grotesk font to `_document.tsx` with Google Fonts link and preload
- [x] 1.2 Update `tailwind.config.js` with Deep Ocean colors (canvas, ink, primary, secondary, accent, neutral)
- [x] 1.3 Add custom shadows to Tailwind config (shadow-neo-sm, shadow-neo-md, shadow-neo-lg, shadow-neo-xl)
- [x] 1.4 Configure Tailwind typography to use Space Grotesk with weights 700 and 900 only
- [x] 1.5 Update `globals.css` with base styles (canvas background, default text color, border defaults)
- [x] 1.6 Verify Tailwind build and no CSS warnings

## 2. Core Button Component

- [x] 2.1 Create `Button.tsx` component with TypeScript props (variant, size, disabled, onClick, children)
- [x] 2.2 Implement primary variant (cyan background, deep navy text, thick border, shadow)
- [x] 2.3 Implement secondary variant (amber background, deep navy text, thick border, shadow)
- [x] 2.4 Implement outline variant (transparent background, deep navy border, no fill)
- [x] 2.5 Add mechanical press effect (active state with translate + shadow removal)
- [x] 2.6 Add keyboard focus state with visible focus ring
- [x] 2.7 Add responsive sizing (h-12 sm:h-13 md:h-14)
- [x] 2.8 Add disabled state styling (opacity-50, cursor-not-allowed)
- [x] 2.9 Test button in all variants and states
- [x] 2.10 Update existing Button imports in pages to use new component

## 3. Core Card Component

- [x] 3.1 Create `Card.tsx` component with props (header, headerColor, children, className)
- [x] 3.2 Implement card container (ice blue background, thick deep navy border, shadow)
- [x] 3.3 Implement colored header bar (cyan, amber, magenta options)
- [x] 3.4 Add hover effect (lift up 2px, expand shadow)
- [x] 3.5 Add proper padding and spacing (multiples of 8px)
- [x] 3.6 Add focus state for keyboard navigation
- [x] 3.7 Test card in all variants and states

## 4. Core Input Component

- [x] 4.1 Create `Input.tsx` component with props (type, placeholder, value, onChange, disabled)
- [x] 4.2 Implement input styling (ice blue background, thick deep navy border, large bold text)
- [x] 4.3 Add focus state (light cyan background, shadow added)
- [x] 4.4 Add placeholder styling (bold, deep navy with opacity)
- [x] 4.5 Add disabled state styling
- [x] 4.6 Test input focus, typing, and keyboard navigation

## 5. Core Badge Component

- [x] 5.1 Create `Badge.tsx` component with props (color, children, className)
- [x] 5.2 Implement color variants (cyan, amber, magenta)
- [x] 5.3 Add pill shape styling (rounded-full, thick border)
- [x] 5.4 Add slight rotation (rotate-3) on render
- [x] 5.5 Support absolute positioning for overlapping
- [x] 5.6 Test badge rendering and styling

## 6. Layout & Container Components

- [x] 6.1 Update `Container.tsx` to use 8px spacing grid
- [x] 6.2 Update `Header.tsx` with neo-brutalism styling (thick borders, deep navy, shadows)
- [x] 6.3 Update `PageHeader.tsx` with large bold typography (Space Grotesk 900)
- [x] 6.4 Create responsive grid utilities for 8px base spacing
- [x] 6.5 Ensure all containers use ice blue background on canvas

## 7. Page Integration — Timeline

- [x] 7.1 Apply new Button component to "New Event" and "Recruitment Pipeline" buttons
- [x] 7.2 Apply new Card component to event items in timeline
- [x] 7.3 Update event card header styling with color variants
- [x] 7.4 Update event filters styling with new Input component
- [x] 7.5 Test timeline page responsiveness (mobile, tablet, desktop)
- [x] 7.6 Verify accessibility (focus states, keyboard navigation, contrast)

## 8. Page Integration — Events

- [x] 8.1 Apply new Button and Card components to event listing page
- [x] 8.2 Update event detail view with neo-brutalism styling
- [x] 8.3 Apply new Input component to event creation/edit form
- [x] 8.4 Test form submission and validation states
- [x] 8.5 Verify responsive design on all breakpoints

## 9. Page Integration — Recruitment Pipeline

- [x] 9.1 Apply new components to recruitment pipeline page
- [x] 9.2 Update pipeline stage cards with thick borders and shadows
- [x] 9.3 Apply Button component to stage action buttons
- [x] 9.4 Test pipeline interactions (drag, filter, sort)
- [x] 9.5 Verify responsive grid layout on mobile/tablet/desktop

## 10. Page Integration — Admin Dashboard

- [x] 10.1 Apply new Button and Card components to admin user management page
- [x] 10.2 Update admin table styling (borders, shadows, spacing)
- [x] 10.3 Apply Button component to approve/reject/disable/enable actions
- [x] 10.4 Test admin actions and confirmation dialogs
- [x] 10.5 Verify accessibility and keyboard navigation

## 11. Responsive Design & Mobile Optimization

- [x] 11.1 Test all pages on mobile (375px — iPhone width)
- [x] 11.2 Test all pages on tablet (768px — iPad width)
- [x] 11.3 Test all pages on desktop (1440px)
- [x] 11.4 Verify typography scales correctly (text-4xl sm:text-6xl md:text-8xl)
- [x] 11.5 Verify shadows scale down on mobile (2px 2px on mobile, 4px 4px+ on desktop)
- [x] 11.6 Verify buttons are full-width on mobile, auto-width on desktop
- [x] 11.7 Verify grid layouts stack on mobile, multi-column on tablet+

## 12. Interaction & Animation Testing

- [x] 12.1 Test button press effect (translate down-right, shadow disappears)
- [x] 12.2 Test card hover effect (lift up, shadow expands)
- [x] 12.3 Test badge rotation (rotate-3 on render/hover)
- [x] 12.4 Verify transition durations are 100–300ms (no duration-500+)
- [x] 12.5 Verify easing is ease-linear or ease-out (no ease-in-out)
- [x] 12.6 Test prefers-reduced-motion (animations disabled for users with this setting)

## 13. Accessibility & WCAG Compliance

- [x] 13.1 Run contrast checker on all text (ensure ≥4.5:1 ratio)
- [x] 13.2 Test keyboard navigation through all interactive elements (tab order)
- [x] 13.3 Verify focus states are visible (thick rings or background colors)
- [x] 13.4 Test screen reader compatibility (semantic HTML, ARIA labels)
- [x] 13.5 Verify touch targets are ≥44×44px (mobile-friendly)
- [x] 13.6 Test with prefers-reduced-motion: reduce setting
- [x] 13.7 Run axe or WAVE accessibility audit on all pages

## 14. Testing & Quality Assurance

- [x] 14.1 Run `pnpm tc` (TypeScript check) — all types pass
- [x] 14.2 Run `pnpm run lint` — no ESLint errors
- [x] 14.3 Run `pnpm build:check` — Next.js build succeeds
- [x] 14.4 Run `pnpm --filter=web test` — all tests pass
- [x] 14.5 Create/update unit tests for Button, Card, Input, Badge components
- [x] 14.6 Test color contrast programmatically (jest-axe or similar)
- [x] 14.7 Cross-browser testing (Chrome, Firefox, Safari, Edge)

## 15. Documentation & Handoff

- [x] 15.1 Document Deep Ocean color tokens in project README
- [x] 15.2 Create component style guide with examples (Button, Card, Input, Badge variants)
- [x] 15.3 Document Tailwind config extensions (colors, shadows, typography)
- [x] 15.4 Add comments to complex CSS utilities and custom classes
- [x] 15.5 Create migration guide for developers (how to use new components)
- [x] 15.6 Update CLAUDE.md with design system guidelines (if needed)

## 16. Optional: Texture & Decorative Elements (Future)

- [x] 16.1 Add subtle noise texture to canvas background (CSS or SVG overlay)
- [x] 16.2 Add halftone dot patterns to hero sections (using background-image)
- [x] 16.3 Add grid pattern overlays to card backgrounds
- [x] 16.4 Create decorative shape components (circles, rectangles, asymmetric shapes)
- [x] 16.5 Test texture performance (no layout jank or flashing)

## 17. Deployment & Monitoring

- [x] 17.1 Push changes to feature branch
- [x] 17.2 Create PR with design system documentation
- [x] 17.3 Get design review approval
- [x] 17.4 Merge to main after all CI checks pass
- [x] 17.5 Monitor production for any layout or performance issues
- [x] 17.6 Gather feedback from users on new design aesthetic
