---
name: Editorial Monolith
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 5rem
    fontWeight: '400'
    lineHeight: 5.25rem
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 2.75rem
    fontWeight: '400'
    lineHeight: 3.25rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 3rem
    fontWeight: '400'
    lineHeight: 3.5rem
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '400'
    lineHeight: 2.5rem
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '400'
    lineHeight: 2.5rem
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 1.375rem
    fontWeight: '500'
    lineHeight: 1.875rem
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.85rem
    letterSpacing: 0.01em
  body-md:
    fontFamily: Manrope
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.6rem
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Manrope
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.35rem
    letterSpacing: 0.015em
  label-caps-lg:
    fontFamily: Manrope
    fontSize: 0.8125rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.18em
  label-caps-sm:
    fontFamily: Manrope
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.22em
  price-display:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.05em
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
  space-2xl: 5rem
  space-3xl: 8rem
---

## Brand & Style

This design system establishes an ultra-refined, gallery-grade digital maison. The brand targets discerning patrons of modern luxury couture, couture bridal, and contemporary artisanal silhouettes. 

The aesthetic is purely minimal and architectural, treating the digital interface as a pristine white cube gallery. Interface chrome, micro-copy, and navigation are intentionally restrained, stepping back entirely so that the intricate textiles, gilded zardozi, handwoven silks, and saturated palettes of the garment photography (deep jewel tones, saffron, sindoori red, raw indigo) command absolute visual primacy.

The experience relies on razor-sharp precision, deliberate asymmetry, generous editorial pacing, and smooth, high-contrast monochrome state transitions.

## Colors

The interface strictly operates on an uncompromising monochromatic spectrum. Color is treated exclusively as content, never as chrome. 

### Core Swatches
- **Primary Canvas (`#FFFFFF`)**: Pure White foundation, providing crystalline clarity and maximum dynamic range against rich photography.
- **Secondary Surface (`#F4F4F4`)**: Subtle gallery-wash grey used for off-canvas drawers, understated product grid backgrounds, and architectural content blocks.
- **Hairline Border (`#E5E5E5`)**: Ultra-delicate neutral separator for subtle structural definition without visual clutter.
- **Structural Border & Text (`#000000`)**: Absolute Black for primary editorial headlines, crisp typographic labels, structural dividing rules, and active states.
- **Muted Text (`#666666` / `#767676`)**: Subdued grey for metadata, sku codes, secondary breadcrumbs, and dimensional guides.

### Interactive Behaviors
Hover and active states use instant, tactile chromatic inversion: pure black components transition to pure white with black borders, and ghost states snap cleanly into black solids.

## Typography

The typographic pairing contrasts classical haute-couture expression against utilitarian rationalism.

- **Playfair Display** commands the editorial narrative. Rendered primarily in book and regular weights, it evokes traditional bespoke print publications, lookbooks, and high-fashion ateliers. Headlines should favor sentence case for an understated editorial poise, reserving italics for collection names, material nuances, and craft notes.
- **Manrope** provides crisp, functional contrast for all user interface structures, commerce data, descriptions, and metadata.
- **Uppercase Kerning Discipline**: All uppercase labels, category pills, buttons, and navigation tags use strict letter tracking (`0.18em` to `0.22em`) to produce a disciplined, airy rhythm.

## Layout & Spacing

The layout philosophy mirrors the compositional pacing of high-end art monographs: vast breathing room, sharp boundary lines, and controlled density.

### Grid Framework
- **Desktop (1200px+)**: 12-column layout with 4rem outer margins and 2.5rem gutters. Product listings utilize 2-column or 3-column asymmetric modules rather than dense multi-item grids.
- **Tablet (768px – 1199px)**: 8-column layout with 2rem outer margins and 1.5rem gutters.
- **Mobile (< 768px)**: 4-column layout with 1.25rem outer margins and 1rem gutters. Editorial full-bleed imagery spans edge-to-edge.

### Editorial Composition
To elevate perception beyond standard commercial storefronts, use rhythmic shifts between full-width vertical campaign banners, 4:5 portrait garment stills, and staggered offset imagery accompanied by deliberate whitespace islands.

## Elevation & Depth

This design system rejects dropshadows, blurs, and skeuomorphic layering in favor of absolute planarity. Depth is achieved strictly through structural delineation and tonal contrast:

1. **Planar Baseline**: Surfaces are flat `#FFFFFF` or `#F4F4F4`. Stacked depths and elevations rely on hairline `#E5E5E5` strokes rather than soft shadows.
2. **Hairline Structural Framing**: Cards, side panels, and sticky bars use a 1px border (`#E5E5E5` resting, `#000000` focused or active).
3. **Modals & Drawers**: Cart overlays and size guides deploy as full-height sheet panels sliding from the canvas edge, separated by a crisp 1px `#000000` boundary against a translucent solid veil (`rgba(0, 0, 0, 0.45)` backdrop, with zero blur).
4. **Z-Index Layering**: Floating UI elements (such as sticky purchase bars or navigation) maintain crisp opacity with a `#FFFFFF` fill and a single 1px solid bottom divider.

## Shapes

The shape vocabulary is strictly architectural and uncompromisingly sharp (`roundedness: 0`). 

- All buttons, product image containers, badges, inputs, dialogs, and flyout menus have 0px border radii.
- The sharp edge reinforces haute couture editorial codes, emphasizing structural silhouettes, horizontal registers, and architectural discipline.

## Components

### Buttons
- **Primary Action**: Solid `#000000` background, pure `#FFFFFF` typography (`label-caps-lg`), 0px radius, 52px height. On hover, inverts smoothly to `#FFFFFF` background with a 1px solid `#000000` border and `#000000` text.
- **Secondary Action**: Pure `#FFFFFF` background, 1px solid `#000000` border, `#000000` text. On hover, inverts to solid `#000000` background with pure `#FFFFFF` text.
- **Tertiary / Text Link**: Unframed `#000000` text with an ultra-thin 1px underline positioned with 4px offset. On hover, opacity shifts from `1.0` to `0.5`.

### Product Cards
- **Structure**: Sharp 0px corners, no exterior border by default. Clean aspect ratio of 3:4 or 4:5 for imagery.
- **Background**: Soft `#F4F4F4` photographic frame to isolate garments shot on neutral studio sets.
- **Meta Treatment**: Garment title in `body-sm` (`#000000`), craft/technique descriptor in `label-caps-sm` (`#666666`), and price in `price-display`.
- **Badge**: Minimalist pure white rect overlay placed at top-left with 1px hairline border; typography set in `label-caps-sm`.

### Form Fields & Inputs
- **Text Inputs**: Flat bottom-line border style or clean full-box outline with 1px `#E5E5E5`. Height 48px, 0px radius.
- **Focus State**: Transitions to a crisp 1px solid `#000000` line. Placeholder text in `#767676`, moving to floating uppercase label in `label-caps-sm`.
- **Checkboxes & Radios**: Geometric squares with 0px radius. Unselected is a 1px `#E5E5E5` border; checked state fills with solid `#000000` containing a sharp geometric white check or solid inner square.

### Chips & Filter Tags
- **Appearance**: Rectangular outline badges, 36px height, 1px `#E5E5E5` border, typography in `label-caps-sm`.
- **Selected State**: Solid `#000000` fill with `#FFFFFF` text. No drop shadows.

### Editorial Swatches & Fabric Selectors
- **Color/Fabric Variants**: Minimal 24x24px squares framed in 1px `#E5E5E5`. Active state adds a 2px outer gap followed by a 1px pure `#000000` outer boundary line.