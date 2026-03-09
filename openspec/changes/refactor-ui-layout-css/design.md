## Context

The trunk-xyz application is a React/Next.js 14 timeline and events management system with a recruitment pipeline feature. Currently, the application has minimal CSS styling (only basic dark mode support in globals.css) and relies on default browser styling for all components. The app structure includes:

- **Pages**: Timeline, Events, Recruitment Pipeline, Admin Dashboard
- **Components**: Button, Card, Header, PageHeader, Container, Timeline, EventFilters
- **Stack**: Next.js 14 (Pages Router), React, Tailwind CSS (already in use), TypeScript

The redesign will introduce a **neo-brutalism** aesthetic with a custom **Deep Ocean color palette** to replace the minimal styling. This is a cross-cutting change affecting all pages and components.

## Goals / Non-Goals

**Goals:**
1. Implement a complete neo-brutalism design system (Deep Ocean theme) across all UI components
2. Establish reusable component library with consistent styling patterns
3. Maintain semantic HTML structure and accessibility (WCAG compliance)
4. Ensure responsive design works across mobile, tablet, and desktop
5. Create a maintainable CSS architecture (Tailwind + custom config) for future development
6. Improve visual distinctiveness and brand identity

**Non-Goals:**
- Change application functionality or features
- Refactor component architecture or React hooks
- Modify database schema or API contracts
- Implement dark mode (Deep Ocean is light mode only; dark variant deferred)
- Add custom scrollbar styling
- Copy UI from reference design—create original design inspired by neo-brutalism principles

## Decisions

### 1. **Styling Approach: Tailwind CSS + Custom Configuration**
**Decision**: Extend existing Tailwind CSS setup with custom design tokens (colors, shadows, spacing).

**Rationale**:
- Tailwind already in use in the codebase (evident from existing classes)
- Utility-first approach aligns with neo-brutalism's dense spacing and layered styling
- Easier to maintain than multiple CSS files
- Built-in responsive utilities (mobile-first)

**Alternatives Considered**:
- CSS Modules: More explicit but harder to maintain consistency; would require more boilerplate
- CSS-in-JS (styled-components, emotion): Overkill for this project; adds runtime overhead
- Plain CSS: Would duplicate code and make maintenance difficult

### 2. **Color Palette: Deep Ocean Theme**
**Decision**: Use custom Deep Ocean palette (Cyan `#00D9FF`, Amber `#FFB81C`, Magenta `#FF4D7D`, Deep Navy `#0B1929`, Ice Blue `#F5F9FC`).

**Rationale**:
- Unique to this application—not a direct copy of reference design
- Cyan and Amber provide high contrast on ice blue canvas
- Deep navy replaces pure black for a softer, more sophisticated feel
- Magenta reserved for alerts/special states
- Tech-forward aesthetic suits timeline/events/recruitment context

**Alternatives Considered**:
- Pure black + bright colors: Too harsh; deep navy is more refined
- Reference palette (red/yellow/violet): Desired uniqueness; our palette is custom

### 3. **Typography: Space Grotesk Bold/Black Only**
**Decision**: Use Space Grotesk (Google Fonts) with weights 700 (Bold) and 900 (Black) only; uppercase text preferred.

**Rationale**:
- Bold, heavy typeface reinforces neo-brutalism aesthetic
- Uppercase adds visual impact and brand distinctiveness
- Space Grotesk available via Google Fonts (no license cost)
- Font stack: `font-family: "Space Grotesk", monospace; font-weight: 700 | 900`

**Alternatives Considered**:
- Inter, Poppins: Too polished; don't fit neo-brutalism vibe
- Custom fonts: Licensing complexity

### 4. **Shadows: Hard Offset Only (No Blur)**
**Decision**: Use hard-edged offset shadows (`4px 4px 0px 0px`, `8px 8px 0px 0px`, etc.) with deep navy color. Zero blur radius.

**Rationale**:
- Mechanical, structured feel aligns with neo-brutalism
- Creates visual weight and depth without softness
- Consistent, predictable shadow system
- Supports responsive scaling (smaller shadows on mobile)

**Alternatives Considered**:
- Soft shadows (blur + spread): Too corporate; contradicts aesthetic
- No shadows: Loses visual hierarchy and depth

### 5. **Borders: `border-4` (Thick Black Borders)**
**Decision**: Apply `border-4 border-[#0B1929]` (4px deep navy border) to all cards, buttons, inputs, badges.

**Rationale**:
- Visible structural outline reinforces neo-brutalism "honesty"
- Thick border provides visual weight
- Deep navy instead of pure black: softer but still high-contrast

**Alternatives Considered**:
- `border-2`: Too thin; loses visual impact
- No borders: Breaks neo-brutalism aesthetic

### 6. **Spacing Grid: 8px Base Unit**
**Decision**: All margins, padding, and gaps use multiples of 8px (8px, 16px, 24px, 32px, etc.).

**Rationale**:
- Consistent, predictable spacing system
- Dense layout supports compact information display (timeline/events)
- Aligns with Tailwind's default spacing scale

**Alternatives Considered**:
- 4px base: Too granular; harder to scale
- 16px base: Too loose; wastes space on small screens

### 7. **Responsive Strategy: Mobile-First with Breakpoints**
**Decision**: Design for mobile first; scale up typography and shadows at `sm:` (640px), `md:` (768px), `lg:` (1024px) breakpoints.

**Rationale**:
- Mobile users are primary audience
- Responsive design ensures usability across devices
- Tailwind breakpoints are industry standard
- Reduced shadows on mobile preserve aesthetic without overwhelming small screens

**Alternatives Considered**:
- Desktop-first: Harder to maintain responsiveness on mobile
- Flat design (no breakpoints): Poor mobile experience

### 8. **Component Library: Reusable Button, Card, Input, Badge**
**Decision**: Create styled component wrappers (React functional components) for Button, Card, Input, Badge with variant props.

**Rationale**:
- Consistency across pages
- Easier to update styling in one place
- TypeScript support for prop validation
- Supports dark mode variant in future (via className prop)

**Example structure**:
```tsx
<Button variant="primary">Call to Action</Button>
<Card header="Title" headerColor="cyan">Content</Card>
<Input type="text" placeholder="Search..." />
<Badge color="magenta">New</Badge>
```

### 9. **Component Hierarchy & Organization**
**Decision**: Store reusable styled components in `/web/src/components/` with page-specific overrides in `/web/src/features/[feature-name]/components/`.

**Rationale**:
- Clear separation of concerns
- Reusable components in `/components/`
- Feature-specific customizations in `/features/`
- Matches existing project structure (per CLAUDE.md)

### 10. **Texture & Decorative Elements**
**Decision**: Add subtle texture overlays (noise, halftone dots, grid patterns) to high-impact areas (hero sections, cards, backgrounds).

**Rationale**:
- Fills whitespace per neo-brutalism anti-pattern ("fill with texture")
- Adds visual depth and personality
- Can be added via CSS (`background-image: url(...)`) or React components

**Alternatives Considered**:
- No textures: Too clean; breaks aesthetic
- Heavy textures: Distracting; use sparingly

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| **Tailwind config bloat** | Create separate config file (`tailwind.config.deep-ocean.js`) to organize custom tokens; import into main config |
| **Performance with many custom colors** | Use CSS variables for colors; Tailwind can reference them via `var()` |
| **Browser support for modern CSS** | Target modern browsers (Chrome 90+, Safari 14+, Firefox 88+); no IE11 support needed |
| **Accessibility concerns with all-bold typography** | Ensure `font-weight: 700` minimum; use adequate line-height; test with WCAG contrast checker |
| **Mobile shadows too small** | Use responsive shadow utilities: `shadow-sm md:shadow-md`; scale appropriately |
| **Component prop explosion** | Keep variants simple (primary/secondary/outline); avoid over-customization |
| **Space Grotesk font loading delay** | Preload font in `_document.tsx`; use `font-display: swap` to prevent layout shift |

## Migration Plan

1. **Phase 1: Setup & Tokens** (1–2 days)
   - Add Space Grotesk font to `_document.tsx`
   - Update `tailwind.config.js` with Deep Ocean colors and custom shadows
   - Create `globals.css` with canvas background and base styles

2. **Phase 2: Core Components** (2–3 days)
   - Create/refactor Button, Card, Input, Badge components with neo-brutalism styling
   - Add responsive variants (mobile-first)
   - Test accessibility and focus states

3. **Phase 3: Page Integration** (2–3 days)
   - Apply new components to Timeline, Events, Recruitment, Admin pages
   - Ensure consistent spacing and layout
   - Validate responsive design on mobile/tablet/desktop

4. **Phase 4: Refinement & Testing** (1–2 days)
   - Add texture overlays and decorative elements
   - Fine-tune shadows, borders, and spacing
   - Cross-browser testing and accessibility audit

**Rollback Strategy**: All styling changes are purely additive (no file deletion). To rollback:
- Revert `tailwind.config.js` to original
- Remove custom component styling
- Restore original `globals.css`
- Rebuild application

## Open Questions

1. **Should we implement dark mode now or defer?** (Current plan: defer—focus on light mode Deep Ocean)
2. **Do we need custom textures (halftone dots, grids) immediately or iteratively?** (Current plan: start simple, add iteratively)
3. **Should admin dashboard have distinct styling or match timeline/events?** (Current plan: consistent styling across all pages)
4. **Timeline component styling: should events have colored headers per category?** (Current plan: primary color with variant support)
