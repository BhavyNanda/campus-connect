---
name: Collegiate Radiant
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#5a4138'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#8e7166'
  outline-variant: '#e2bfb2'
  surface-tint: '#a73a00'
  primary: '#a33900'
  on-primary: '#ffffff'
  primary-container: '#cc4900'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb599'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#545c72'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c748b'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb599'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#7f2b00'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '800'
    lineHeight: 3.5rem
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '800'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.025em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses an energetic, organized, and welcoming digital campus ecosystem. Designed for modern university students, faculty, and campus organizations, it balances collegiate warmth with crisp academic utility.

The aesthetic synthesizes modern minimalism with soft tactile layering: sunlight-infused background warmth (#FEF9E7) reduces cognitive fatigue during late-night study sessions, while elevated pure-white cards establish immediate visual focus for schedules, event feeds, and collaborative hubs. Vibrant, punchy accents instill optimism and dynamic campus life, preventing the interface from feeling like sterile administrative software.

The experience must evoke clarity, community connection, and active momentum.

## Colors

The palette establishes an inviting hierarchy through warm contrast:

- **Canvas & Surfaces**: The default application canvas utilizes a soft, sunny parchment tint (`#FEF9E7`). Cards, modal dialogs, and popovers emerge on crisp white (`#FFFFFF`), outlined subtly with `#E2E8F0` to distinguish resting layers from the warm backdrop.
- **Primary Action (`#EA580C`)**: High-energy coral-orange reserved strictly for key interactive moments: primary buttons, active submission states, urgent notifications, and event registration.
- **Secondary Accent (`#F59E0B`)**: Warm academic gold used for status badges, star ratings, deadlines, and secondary highlights.
- **Text & Contrast Foundations (`#0F172A`)**: Deep midnight slate serves as the dominant typography color and header background color, ensuring AA/AAA contrast ratios against light-yellow and white surfaces.
- **Supporting Neutral (`#64748B`)**: Muted slate for metadata, secondary captions, timestamps, and resting iconography.

## Typography

Plus Jakarta Sans drives the typography across all devices, delivering contemporary geometry with rounded terminals that soften high-density information.

- Use bold and extra-bold weights for display and headline styles to anchor complex dashboard layouts.
- Rely on medium and regular weights with generous line heights (`1.5` to `1.6`) for body text to maintain scanning comfort when browsing course syllabi, announcements, or student discussion feeds.
- Uppercase tracking (`letterSpacing: 0.05em`) is reserved exclusively for small contextual labels, pill tags, and academic status indicators (`label-sm`).

## Layout & Spacing

The system runs on an 8pt structural rhythm within a 12-column responsive fluid grid:

- **Desktop (1024px+)**: Max content container of `1280px` centered with `margin: 2rem` and `gutter: 1.5rem`. Left navigation rails span 3 columns; feed and course schedules inhabit the remaining 9 columns.
- **Tablet (768px - 1023px)**: 8-column layout with `gutter: 1.25rem` and `margin: 1.5rem`. Navigational elements collapse into a contextual top bar or slide-out sheet.
- **Mobile (below 768px)**: 4-column layout with `margin-mobile: 1rem` and `gutter-mobile: 1rem`. Multi-column modular cards collapse into a stacked single-column stream.
- **Component Breathing Room**: Card interiors enforce standard padding of `space-lg` (1.5rem), tapering to `space-md` (1rem) on mobile viewports to prioritize screen efficiency.

## Elevation & Depth

Visual hierarchy uses ambient diffusion rather than harsh drop shadows, creating a gentle floating card effect on top of the sunny canvas:

- **Level 0 (Canvas Base)**: Flat `#FEF9E7` background with no elevation.
- **Level 1 (Default Cards & Tiles)**: Background `#FFFFFF`, 1px border using `#E2E8F0`, and shadow `0 2px 8px -2px rgba(15, 23, 42, 0.04), 0 1px 4px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Hovered Cards & Interactive Dropdowns)**: Background `#FFFFFF`, 1px border `#CBD5E1`, and shadow `0 10px 20px -3px rgba(15, 23, 42, 0.07), 0 4px 6px -2px rgba(15, 23, 42, 0.03)`.
- **Level 3 (Modals, Overlays, Floating Action Bars)**: Background `#FFFFFF`, shadow `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)`.
- **Dark Mode / Deep Navy Sections**: When high-contrast contrast modules (e.g., student union night events, portal hero banners) apply `#0F172A` background, cards within use `rgba(255, 255, 255, 0.06)` with borders of `rgba(255, 255, 255, 0.1)`.

## Shapes

The design adopts a distinct hybrid curvature approach:

- **Cards & Surface Modules**: Strictly rounded to `1rem` (16px, `rounded-lg`), delivering friendly, self-contained units that frame collegiate schedules and social cards.
- **Interactive Controls (Inputs, Buttons)**: Form inputs, segmented controls, and secondary buttons utilize `0.5rem` (8px, base roundedness) for clean structural interaction.
- **Category Chips & Status Tags**: Fully pill-shaped (`9999px`) to immediately set metadata, academic disciplines, and club tags apart from functional rectilinear controls.

## Components

### Buttons
- **Primary**: Solid coral-orange `#EA580C` background, white `#FFFFFF` text, `0.5rem` radius, bold weight. Focus ring with `2px offset` using `#F59E0B`.
- **Secondary**: Crisp white `#FFFFFF` background, deep slate `#0F172A` text, 1px border `#E2E8F0`. Hover shifts background to `#F8FAFC` and border to `#CBD5E1`.
- **Ghost/Tertiary**: No initial background or border; `#0F172A` text; subtle `#FEF9E7` wash on hover.

### Chips & Badges
- **Pill Category Tags**: Height `28px`, full border-radius `9999px`, horizontal padding `0.75rem`.
  - *Academic*: Light slate-blue tint (`rgba(15, 23, 42, 0.06)`), text `#0F172A`.
  - *Social / Campus Life*: Light amber tint (`#FEF3C7`), text `#B45309`.
  - *Urgent / Deadline*: Soft coral tint (`#FFEDD5`), text `#C2410C`.

### Cards
- Pure white background (`#FFFFFF`), `16px` border-radius, `1px` border of `#E2E8F0`, and Level 1 ambient shadow.
- Header and body sections separated by standard `1.5rem` padding without harsh horizontal dividing lines unless structuring high-density tables.

### Input Fields
- Background `#FFFFFF`, border `1px solid #CBD5E1`, border-radius `0.5rem`, height `44px` (ideal for touch ergonomics).
- Label placed outside top left (`label-lg`, `#0F172A`). Placeholder text in `#94A3B8`.
- Focus state activates a crisp `2px solid #EA580C` border outline.

### Checkboxes & Radio Controls
- Base size `20px x 20px` with `0.25rem` radius for checkboxes and `9999px` for radios.
- Unchecked: `#FFFFFF` fill with `1.5px solid #CBD5E1`.
- Checked: `#EA580C` fill with white checkmark/dot indicator.

### Campus-Specific Extensions
- **Course Schedule Strip**: Horizontal card featuring a left 4px accent border color-coded by subject, containing room number badges, time pills, and professor avatars.
- **Student ID Barcode Tile**: Elevated high-contrast card featuring student profile summary on Level 1 elevation with an integrated quick-scan barcode/QR code module.