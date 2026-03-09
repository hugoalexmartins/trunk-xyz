## Context

The trunk-xyz application has a complete neo-brutalism design system with Button, Card, Input, and Badge components using the Deep Ocean color palette. The root page (`/`) currently redirects to login. We need to create an engaging public landing page that showcases the application's value while maintaining consistency with the new design system.

The landing page will be the first impression for unauthenticated users and should encourage signup while providing enough information about the application's key features.

## Goals / Non-Goals

**Goals:**
1. Create a visually striking landing page using neo-brutalism design
2. Showcase key features with Card components
3. Provide prominent, accessible Call-to-Action (CTA) buttons for signup/login
4. Implement mobile-first responsive design
5. Ensure authenticated users bypass the landing page (redirect to timeline)
6. Create an engaging visual focal point using creative elements

**Non-Goals:**
- Change authentication flow or login/signup functionality
- Modify existing user or event data models
- Implement blog, documentation, or additional marketing pages
- Add video embeds or external dependencies beyond current stack
- Implement analytics or tracking on the landing page

## Decisions

### 1. **Landing Page Architecture: Single Next.js Page Component**
**Decision**: Create `/web/src/pages/index.tsx` as the landing page, replacing current root redirect.

**Rationale**:
- Follows existing Next.js Pages Router pattern
- Leverages current design system components
- No new dependencies required
- Easy to protect with ProtectedRoute if needed

**Alternatives Considered**:
- App Router: Project uses Pages Router; inconsistent with codebase
- Separate landing page app: Overcomplicated; single page sufficient

### 2. **Hero Section Layout: Full-Width with Centered Content**
**Decision**: Hero section spans full viewport height with centered CTA buttons and creative visual element in the middle.

**Rationale**:
- Eye-catching first impression
- Clear focal point directs user attention
- Responsive: adapts text size and button layout on mobile

**Components**:
- Large Space Grotesk 900 heading (text-6xl sm:text-8xl)
- Subheading with brief value proposition
- Two primary buttons: "Sign Up" and "Login" side-by-side (stacked on mobile)
- Creative visual element (emoji art / SVG / ASCII art) centered above buttons

### 3. **Feature Showcase: 3-4 Cards in Responsive Grid**
**Decision**: Below hero, display 3-4 key features in a responsive grid (1 column mobile, 2 columns tablet, 4 columns desktop).

**Rationale**:
- Cards leverage existing design system
- Grid adapts naturally to screen sizes
- Each feature gets visual prominence with header colors
- Consistent with application's design language

**Features to Showcase**:
- Timeline: Track events chronologically
- Recruitment Pipeline: Manage candidate journeys
- User Management: Role-based access control
- Real-time Updates: See changes instantly

### 4. **Visual Element: Emoji Art / SVG Pattern**
**Decision**: Use emoji art or simple SVG pattern as the creative focal point instead of image asset.

**Rationale**:
- No image asset management needed
- Maintains playful neo-brutalism aesthetic
- Loads instantly (no HTTP requests)
- Scales perfectly on all devices
- Fits brand personality

**Options**:
- Option A: Emoji art arrangement (e.g., timeline events 📅 🏢 👥)
- Option B: SVG geometric pattern matching neo-brutalism style
- Option C: ASCII art timeline representation

**Selected**: Emoji art (fun, accessible, on-brand)

### 5. **Navigation: Conditional Rendering Based on Auth State**
**Decision**: Check authentication state; show landing page for unauthenticated users, redirect to `/timeline` for authenticated users.

**Rationale**:
- Seamless user experience
- Authenticated users go directly to app content
- Landing page purely for public discovery

**Implementation**:
- Use `useAuth()` hook to check user state
- If authenticated: client-side redirect via `useRouter().push('/timeline')`
- If unauthenticated: render landing page

### 6. **CTA Button Routing: Direct Links to Auth Pages**
**Decision**: "Sign Up" button links to `/auth/signup`, "Login" button links to `/auth/login`.

**Rationale**:
- Simple, direct routing
- Existing auth pages already styled with new design system
- No form handling needed on landing page

**Alternatives Considered**:
- Modal forms: Adds complexity; existing pages are better
- Inline forms: Clutters landing page layout

### 7. **Responsive Strategy: Mobile-First Design**
**Decision**: Base design targets mobile, scale up with Tailwind breakpoints (sm, md, lg).

**Rationale**:
- Mobile users are primary audience
- Hero section text sizes: text-4xl mobile → text-8xl desktop
- Button layout: stacked mobile → side-by-side desktop
- Feature grid: 1 column mobile → 2/4 columns tablet/desktop

### 8. **Styling: Neo-Brutalism with Deep Ocean Palette**
**Decision**: Use thick borders (border-4), hard shadows (shadow-neo-md/lg/xl), bold typography (Space Grotesk 900), and Deep Ocean colors.

**Rationale**:
- Consistent with refactor-ui-layout-css
- Visually distinctive and memorable
- High contrast ensures accessibility

**Color Usage**:
- Canvas (#F5F9FC): Background
- Ink (#0B1929): Text, borders
- Primary (#00D9FF): CTA buttons, feature headers
- Secondary (#FFB81C): Alternate feature headers
- Accent (#FF4D7D): Highlight or alert features

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| **Users may not understand app purpose** | Feature cards clearly explain core value props |
| **Emoji art may not render consistently** | Test emoji on multiple browsers; fallback to SVG if needed |
| **Landing page adds server load** | Simple page with no API calls; minimal performance impact |
| **Authenticated users see flicker during redirect** | Use `useAuth()` to check before render; prevent layout shift |
| **Mobile viewport may feel cluttered** | Responsive design tested on 375px, 768px, 1440px widths |
| **SEO not optimized** | Out of scope; can add meta tags and structured data in future |

## Migration Plan

1. **Create landing page** at `/web/src/pages/index.tsx`
2. **Remove existing redirect** from root page (if one exists)
3. **Test unauthenticated flow** - landing page displays correctly
4. **Test authenticated flow** - users redirected to timeline
5. **Test responsive design** - mobile, tablet, desktop viewports
6. **Deploy to production** - monitor for any routing issues

**Rollback Strategy**: If needed, revert index.tsx and restore previous root page behavior.

## Open Questions

1. **Which features should be highlighted?** (Timeline, Recruitment, User Management, Real-time Updates)
2. **Should we add a footer with links or additional info?** (Current scope: hero + feature cards only)
3. **Do we want a "Learn More" link in feature cards?** (Out of scope for now; can add later)
4. **Should landing page appear in navigation menu?** (No - it's only for unauthenticated users)
