# Neo-Brutalism Design System Specification

## Overview
Neo-brutalism is a "digital punk rebellion" against polished corporate design, combining raw structural honesty with high-saturation colors and rebellious DIY aesthetics. This spec defines the complete visual design system for the application, covering colors, typography, spacing, components, and interaction patterns.

## Design Tokens

### Color Palette (Light Mode) — Deep Ocean Theme
- **Canvas**: `#F5F9FC` (ice blue background for calm, tech-forward feel)
- **Ink**: `#0B1929` (deep navy black for text, borders, shadows—darker than pure black)
- **Primary**: `#00D9FF` (electric cyan/teal for CTAs, highlights, interactive elements)
- **Secondary**: `#FFB81C` (golden amber for secondary CTAs and accent elements)
- **Accent**: `#FF4D7D` (hot magenta for warnings, special states, visual pop)
- **Neutral**: `#E8F4F8` (light cyan for secondary backgrounds, hover states)

### Typography System
- **Font Family**: Space Grotesk (Google Fonts)
- **Weights Used**: Black (900), Bold (700), Medium (500) — light weights forbidden
- **Scale Hierarchy**:
  - Display: `text-8xl` to `text-9xl` (large headlines)
  - Heading 2: `text-6xl` to `text-8xl` (section headers)
  - Body: `text-lg` to `text-xl` (body copy)
- **Text Styling**:
  - Heavy uppercase preferred
  - Tight line-height (`leading-none`)
  - Text stroke effects: `-webkit-text-stroke: 2px black`

### Spacing & Grid
- **Base Unit**: 8px (all margins, padding, gaps use multiples of 8px)
- **Density**: Dense spacing throughout
- **Asymmetry**: Prefer 60/40 splits over 50/50 symmetry
- **Rotations**: Slight rotations (`rotate-1`, `-rotate-2`) break monotony

### Borders & Corners
- **Border Style**: Solid black, thick (`border-4`)
- **Border Radius**:
  - Sharp corners (`rounded-none`) for buttons, cards, inputs
  - Fully round (`rounded-full`) for badges/pills
  - **No mid-range rounding** (no `rounded-md`, `rounded-lg`)

### Shadows
Hard, offset shadows with zero blur, always bottom-right direction, using deep navy ink color:
- **Small**: `4px 4px 0px 0px #0B1929`
- **Medium**: `8px 8px 0px 0px #0B1929`
- **Large**: `12px 12px 0px 0px #0B1929`
- **Extra Large**: `16px 16px 0px 0px #0B1929`

## Component Specifications

### Buttons
- **Style**: Rectangular, sharp corners (`rounded-none`)
- **Height**: `h-12` to `h-14`
- **Border**: `border-4 border-[#0B1929]` (deep navy border)
- **Shadow**: `shadow-[4px_4px_0px_0px_#0B1929]` (deep navy shadow)
- **Primary Button**: Cyan background (`bg-[#00D9FF]`), deep navy text
- **Secondary Button**: Amber background (`bg-[#FFB81C]`), deep navy text
- **Typography**: Bold, uppercase, deep navy color
- **Active State**: `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none` (mechanical press)
- **Hover State**: Subtle lift or color shift (primary→secondary or accent)

### Cards
- **Background**: Ice blue (`#F5F9FC`)
- **Border**: `border-4 border-[#0B1929]` (deep navy border)
- **Shadow**: Deep shadow (`shadow-[12px_12px_0px_0px_#0B1929]`)
- **Header**: Colored bar (Cyan, Amber, or Magenta) with bottom border separator (`border-b-4`)
- **Hover Effect**: `hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_#0B1929]` (lift and expand shadow)
- **Content**: Ice blue background with deep navy text for high contrast

### Input Fields
- **Background**: Light cyan (`#E8F4F8`) or white
- **Border**: `border-4 border-[#0B1929]` (deep navy border)
- **Typography**: Large, bold text in deep navy
- **Focus State**: Cyan border glow effect, background shift to light cyan, shadow added—no soft ring outline
- **Placeholder**: Bold, deep navy with slight opacity

### Badges
- **Shape**: Pill (`rounded-full`) or square
- **Styling**: Colored background (Cyan, Amber, or Magenta), `border-4 border-[#0B1929]`
- **Positioning**: Absolutely positioned (overlapping elements)
- **Text**: Deep navy, bold, uppercase
- **Animation**: Slight rotation (`rotate-3`) on hover

### Layout Containers
- **Spacing**: 8px grid base
- **Overlapping**: Elements positioned absolutely for visual chaos zones
- **Texture**: Halftone dots, grid patterns, noise textures as decorative overlays
- **Asymmetry**: Intentional unbalanced layouts

## Motion & Interaction

### Transitions
- **Duration**: 100–300ms (fast, not sluggish)
- **Easing**: `ease-linear`, `ease-out` (mechanical, not organic)
- **Avoid**: `ease-in-out` (too smooth, too slow)

### Interactive Patterns
- **Buttons**: Press down effect on active
- **Cards**: Lift up on hover with shadow expansion
- **Badges**: Spin or rotate slightly
- **Inputs**: Color burst on focus (yellow background)

### Anti-Patterns to Avoid
- Blur effects or soft shadows with `blur-*` values
- Opacity transparency on backgrounds (except low-opacity overlays)
- Smooth gradients (use solid colors)
- Subtle grays (`#333`, `#666`, `#999`) — use primary colors or deep navy
- Rounded mid-range corners
- Minimalist whitespace — fill with texture or patterns
- Slow transitions (`duration-500` or higher)
- **Custom scrollbar styling** — Use browser defaults, do NOT style `::-webkit-scrollbar`

## Responsive Design

### Mobile-First Approach
- Start with single-column layouts
- Scale up typography with breakpoints: `text-4xl sm:text-6xl md:text-8xl`
- Stack grids on mobile: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Breakpoint Behavior
- **Mobile**: Reduced shadows (avoid overwhelming small screens), maintain aesthetic
- **Tablet & Desktop**: Full shadows and interactive effects
- **Menus**: Hamburger with bordered styling on mobile

### Touch & Interaction
- **Minimum targets**: 44×44px
- **Full-width buttons** on mobile
- **Readable text** at all sizes

## Accessibility

- **Contrast**: High contrast built-in (black on cream `#FFFDF5`, white on black)
- **Focus States**: Thick visible focus rings or background color changes
- **Semantic HTML**: Proper heading hierarchy, landmark regions
- **Keyboard Navigation**: All interactive elements keyboard-accessible
- **Motion**: Respect `prefers-reduced-motion` media query (reduce rotation, disable animations)
- **Text**: Bold, uppercase text is readable; high contrast aids dyslexia

## Implementation Notes

### CSS Architecture
- Use CSS modules or Tailwind CSS with custom configuration
- Define custom shadows in Tailwind config
- Extend color palette with neo-brutalism colors
- Create utility classes for border styles and spacing
- Typography should be configured with Space Grotesk font

### Component Library
- Build reusable components (Button, Card, Input, Badge)
- Each component respects the design tokens
- Props control colors, sizes, and interactive states
- Ensure consistent styling across all pages

### Dark Mode Considerations
- Invert colors if dark mode is needed: Canvas ↔ Ink
- Maintain same contrast ratios
- Preserve shadow and border structure

## Color Reference Summary

**Deep Ocean Theme:**
| Element | Color | Hex |
|---------|-------|-----|
| Canvas/Background | Ice Blue | `#F5F9FC` |
| Text/Borders/Shadows | Deep Navy | `#0B1929` |
| Primary CTA | Electric Cyan | `#00D9FF` |
| Secondary CTA | Golden Amber | `#FFB81C` |
| Accent/Alert | Hot Magenta | `#FF4D7D` |
| Neutral Background | Light Cyan | `#E8F4F8` |

**Application Context:**
- This design is tailored for a timeline/events management application (recruitment pipeline)
- Colors chosen for tech-forward professionalism with energetic visual impact
- NOT a literal copy of reference design—unique palette distinguishing your brand

## References
- Design philosophy inspired by: https://ko-microgpt.vercel.app/
- Neo-brutalism design guide: https://github.com/woduq1414/ko-microgpt
