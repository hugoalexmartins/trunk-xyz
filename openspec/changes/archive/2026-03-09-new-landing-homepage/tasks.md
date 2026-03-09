## 1. Setup & Project Structure

- [x] 1.1 Create landing page component at `/web/src/pages/index.tsx`
- [x] 1.2 Remove or replace any existing root page redirect
- [x] 1.3 Verify page is accessible at `http://localhost:3000/`

## 2. Hero Section Implementation

- [x] 2.1 Create hero section container with full-viewport height
- [x] 2.2 Add main headline with Space Grotesk 900 typography (responsive sizes)
- [x] 2.3 Add subheading with value proposition
- [x] 2.4 Create creative visual element (emoji art) - center above buttons
- [x] 2.5 Add "Sign Up" button (Button variant="primary") routing to `/auth/signup`
- [x] 2.6 Add "Login" button (Button variant="secondary") routing to `/auth/login`
- [x] 2.7 Make buttons responsive (stacked on mobile, side-by-side on desktop)
- [x] 2.8 Add neo-brutalism styling (thick borders, hard shadows, Deep Ocean colors)
- [x] 2.9 Set hero background to canvas color (#F5F9FC)

## 3. Feature Showcase Section

- [x] 3.1 Create feature showcase grid below hero section
- [x] 3.2 Create "Timeline" feature card with description and header color
- [x] 3.3 Create "Recruitment Pipeline" feature card with description and header color
- [x] 3.4 Create "User Management" feature card with description and header color
- [x] 3.5 Create fourth feature card (e.g., "Real-time Updates") with description
- [x] 3.6 Use Card component with colored headers (primary, secondary, accent variants)
- [x] 3.7 Make feature grid responsive (1 column mobile, 2 tablet, 4 desktop)
- [x] 3.8 Add padding and spacing using 8px grid multiples

## 4. Responsive Design

- [x] 4.1 Test hero section on mobile viewport (375px)
- [x] 4.2 Test hero section on tablet viewport (768px)
- [x] 4.3 Test hero section on desktop viewport (1440px)
- [x] 4.4 Verify headline text sizing is responsive (text-4xl → text-8xl)
- [x] 4.5 Verify buttons stack on mobile, side-by-side on desktop
- [x] 4.6 Verify feature grid changes column count (1 → 2 → 4)
- [x] 4.7 Verify shadows scale appropriately (neo-sm on mobile, neo-lg+ on desktop)
- [x] 4.8 Test touch targets on mobile (buttons/cards ≥44×44px)

## 5. Authentication & Routing

- [x] 5.1 Implement useAuth hook to check user authentication state
- [x] 5.2 Add client-side redirect for authenticated users to `/timeline`
- [x] 5.3 Ensure landing page does not use ProtectedRoute (publicly accessible)
- [x] 5.4 Test: Unauthenticated user sees landing page
- [x] 5.5 Test: Authenticated user is redirected to `/timeline`
- [x] 5.6 Test: Sign Up button navigates to `/auth/signup`
- [x] 5.7 Test: Login button navigates to `/auth/login`
- [x] 5.8 Test: After logout, user can see landing page again

## 6. Design System Integration

- [x] 6.1 Import Button component (primary, secondary variants)
- [x] 6.2 Import Card component with colored header support
- [x] 6.3 Use Deep Ocean color palette (canvas, ink, primary, secondary, accent)
- [x] 6.4 Apply Space Grotesk typography (font-black for headline, font-bold for body)
- [x] 6.5 Use neo-brutalism shadow classes (shadow-neo-md, shadow-neo-lg, shadow-neo-xl)
- [x] 6.6 Use border-4 border-ink on cards and other elements
- [x] 6.7 Verify all colors meet contrast ratio requirements (≥4.5:1)

## 7. Accessibility

- [x] 7.1 Ensure all text has sufficient contrast (Deep Ocean palette)
- [x] 7.2 Add keyboard navigation support (Tab through buttons)
- [x] 7.3 Verify focus states are visible (Button component focus ring)
- [x] 7.4 Test keyboard navigation on desktop
- [x] 7.5 Ensure buttons and cards are keyboard-accessible
- [x] 7.6 Test with screen reader (semantic HTML, ARIA labels)
- [x] 7.7 Verify touch targets are mobile-friendly (≥44×44px)
- [x] 7.8 Test prefers-reduced-motion support

## 8. Quality Assurance & Testing

- [x] 8.1 Run `pnpm tc` (TypeScript check) - all types pass
- [x] 8.2 Run `pnpm run lint` - no ESLint errors
- [x] 8.3 Run `pnpm --filter=web test` - all tests pass
- [x] 8.4 Run `pnpm build:check` - Next.js build succeeds
- [x] 8.5 Test on Chrome browser
- [x] 8.6 Test on Firefox browser
- [x] 8.7 Test on Safari browser
- [x] 8.8 Test on Edge browser

## 9. Visual Polish & Content

- [x] 9.1 Review hero section text for typos and clarity
- [x] 9.2 Ensure emoji art/visual element is visually appealing
- [x] 9.3 Verify feature card copy is concise and compelling
- [x] 9.4 Check button text is clear ("Sign Up" vs "Register", "Login" vs "Sign In")
- [x] 9.5 Ensure whitespace and padding feels balanced
- [x] 9.6 Verify color choices feel cohesive with brand identity
- [x] 9.7 Do a final visual review on mobile, tablet, and desktop

## 10. Documentation & Deployment

- [x] 10.1 Add comments to component explaining landing page purpose
- [x] 10.2 Document the emoji art/creative element (what it represents)
- [x] 10.3 Update CLAUDE.md if landing page needs developer notes
- [x] 10.4 Create a git commit with landing page implementation
- [x] 10.5 Push changes to feature branch
- [x] 10.6 Create PR with description and screenshots
- [x] 10.7 Get design review approval
- [x] 10.8 Merge to main after all CI checks pass
