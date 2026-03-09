## Why

The trunk-xyz application currently launches users directly to the login/signup page with no public-facing landing page. We're losing an opportunity to showcase the application's value, build brand identity, and guide first-time visitors. A visually striking landing page leveraging our new neo-brutalism design system will create a strong first impression and encourage user signup.

## What Changes

- Create a new public landing page at `/` (root path) that showcases the application
- Implement hero section with prominent call-to-action buttons (Sign Up / Login) using new Button components
- Add creative visual element (illustration, emoji art, or ASCII art) to center the design
- Showcase 3-4 key features using Card components with neo-brutalism styling
- Implement responsive layout that works seamlessly on mobile, tablet, and desktop
- Redirect authenticated users to `/timeline` instead of showing landing page
- Update navigation/routing to ensure landing page is the default public page

## Capabilities

### New Capabilities
- `landing-page-hero`: Public landing page with hero section, CTA buttons, and creative visual element
- `feature-showcase`: Cards displaying key application features with neo-brutalism styling
- `landing-page-responsive`: Mobile-first responsive layout for landing page
- `public-page-routing`: Routing logic to show landing page for unauthenticated users, redirect authenticated users

### Modified Capabilities
- `navigation`: Update navigation/routing to make landing page the default public entry point

## Impact

- **Affected Code**: New page at `/web/src/pages/index.tsx`, routing updates
- **Components Used**: Button, Card, Badge (from refactor-ui-layout-css)
- **Design System**: Uses Deep Ocean color palette, Space Grotesk typography, neo-brutalism styling
- **User Experience**: First-time visitors now see an engaging landing page before login
- **No Breaking Changes**: Existing authenticated user flows unchanged; landing page only shows to unauthenticated users
