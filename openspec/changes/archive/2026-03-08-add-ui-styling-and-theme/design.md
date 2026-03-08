## Context

The application currently has basic styling with Tailwind classes scattered throughout components. There is no cohesive design system, color palette, or theme support. The UI is functional but lacks professional polish needed for production. Users expect modern, responsive design with dark mode support.

## Goals / Non-Goals

**Goals:**
- Implement Tailwind CSS as primary styling framework
- Create comprehensive theme system with color palette and tokens
- Build reusable themed components library
- Apply consistent styling to all pages and components
- Support dark mode with theme toggle
- Ensure responsive design across all screen sizes
- Establish design system foundation for future work

**Non-Goals:**
- Complete component library (only core components in this phase)
- Animation library (can be added later)
- Custom design tools or Figma integration
- Advanced accessibility features (covered separately)

## Decisions

### 1. Tailwind CSS for Styling
**Decision**: Use Tailwind CSS utility-first framework

**Rationale:**
- Rapid development with utility classes
- Small bundle size with PurgeCSS
- Consistent spacing and scaling
- Excellent TypeScript support
- Large ecosystem and community

**Alternatives considered:**
- CSS Modules: more control but verbose, harder to maintain
- styled-components: good but requires runtime overhead
- SCSS/SASS: powerful but steeper learning curve

### 2. next-themes for Dark Mode
**Decision**: Use next-themes library for dark mode implementation

**Rationale:**
- Zero flickering dark mode
- System preference detection
- Persistent theme preference
- SSR-safe implementation
- Minimal overhead

**Alternatives considered:**
- Manual context API: works but more boilerplate
- CSS media queries only: can't control manually
- Custom theme provider: duplicates work

### 3. Color Palette & Design Tokens
**Decision**: Define design tokens in Tailwind config with semantic naming

**Rationale:**
- Single source of truth for colors
- Easy to maintain and update
- Supports both light and dark modes
- Type-safe with Tailwind's TypeScript support

**Theme Structure:**
```
Primary: Brand colors (blue)
Secondary: Supporting colors (purple)
Success: Positive actions (green)
Warning: Cautionary states (yellow)
Error: Destructive actions (red)
Neutral: Backgrounds and borders (gray)
```

### 4. Component Structure
**Decision**: Separate styled components from logic components

**Rationale:**
- Cleaner separation of concerns
- Reusable styled components across pages
- Easier to maintain theme changes
- Better for design system evolution

**Pattern:**
- `/components/ui/` - Low-level styled components
- `/components/` - Feature components (use UI components)
- `/components/layout/` - Layout wrappers

### 5. Typography System
**Decision**: Establish type scale with fixed sizes and weights

**Rationale:**
- Consistent hierarchy across app
- Responsive type scaling
- Easy to maintain

**Sizes:**
- xs, sm, base, lg, xl, 2xl, 3xl - body text
- h1, h2, h3, h4, h5, h6 - headings

## Risks / Trade-offs

**Risk: Tailwind file size growth**
- Large number of utility classes could increase build size
→ Mitigation: Use PurgeCSS (built-in Next.js) to remove unused styles

**Risk: Learning curve for developers**
- Team needs to learn Tailwind conventions
→ Mitigation: Good documentation and component examples

**Risk: Dark mode CSS flicker on page load**
- Users might see flash of light theme
→ Mitigation: Use next-themes script injection for instant theme

**Risk: Token management complexity**
- Too many colors/tokens hard to maintain
→ Mitigation: Start with essential palette, add as needed

**Risk: Component over-abstraction**
- Too many small components makes code harder to follow
→ Mitigation: Keep components focused, avoid premature abstraction

## Implementation Approach

1. **Setup Phase**
   - Install Tailwind CSS and dependencies
   - Configure tailwind.config.js with color tokens
   - Set up next-themes for dark mode
   - Create theme provider wrapper

2. **Foundation Phase**
   - Build base UI components (Button, Card, Input, etc.)
   - Create layout components (Container, Header, Footer)
   - Establish spacing and typography utilities

3. **Application Phase**
   - Apply styling to pages (timeline, recruitment, events/new)
   - Update existing components with theme-aware styles
   - Implement dark mode toggle in navigation

4. **Polish Phase**
   - Responsive refinements for mobile/tablet
   - Hover/focus states for all interactive elements
   - Loading and error states
   - Animations for transitions

## Open Questions

1. Should we use Tailwind UI components or build from scratch? (Recommend: build from scratch for full control)
2. What are the brand colors? (Suggest: use current blue as primary)
3. Should we support all breakpoints or focus on mobile-first? (Recommend: mobile-first only)
4. How many color variations needed? (Suggest: light, normal, dark variants of primary colors)
