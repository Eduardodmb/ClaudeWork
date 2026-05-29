# Safari Brand Guidelines

Brand standards for Safari Circuits and Safari Trace.

## Contents

### Documentation

- [Brand Guide](STD-BRAND-001-brand-guide.md) - Logo usage, voice, identity
- [Color Palette](STD-BRAND-002-color-palette.md) - Official color specifications
- [Typography](STD-BRAND-003-typography.md) - Font families, sizes, weights
- [Component Styling](STD-BRAND-004-component-styling.md) - UI component patterns
- [Visual Identity Methodology](STD-BRAND-005-visual-identity-methodology.md) - Design principles

### Assets (Source of Truth)

All brand assets are now consolidated in this repository:

```
shared/branding/assets/
├── logos/
│   ├── svg/                          # Vector logos
│   │   ├── safari-logo.svg           # Full logo (dark backgrounds)
│   │   ├── safari-logo-white.svg     # Full logo (light backgrounds)
│   │   ├── safari-icon-diamond-s.svg # Icon only
│   │   ├── safari-icon-diamond-s-red.svg
│   │   ├── safari-circle-circuit-red.svg
│   │   └── safari-circle-circuit-white.svg
│   └── png/                          # Raster exports
├── patterns/
│   ├── safari-circuit-board-pattern.svg
│   └── safari-circuit-board-pattern-red.svg
├── colors/
│   └── safari-palette.json           # Machine-readable palette
└── theme/
    └── SafariTheme.js                # JS theme configuration
```

## Quick Reference

### Primary Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Safari Red | `#9B1C1C` | `--safari-red` | Primary brand, accents |
| Safari Red Light | `#B82424` | `--safari-red-light` | Hover states |
| Safari Red Dark | `#7B1616` | `--safari-red-dark` | Active states |

### Background Colors (Dark Theme)

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Background | `#0F172A` | `--bg-dark` | Page background |
| Surface | `#1E293B` | `--bg-surface` | Card backgrounds |
| Border | `#334155` | `--border` | Borders, dividers |

### Text Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#FFFFFF` | `--text-primary` | Main text |
| Secondary | `#94A3B8` | `--text-secondary` | Secondary text |
| Muted | `#64748B` | `--text-muted` | Disabled, hints |

### Technical Accent Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Blue | `#60A5FA` | `--accent-blue` | Links, data, info |
| Green | `#34D399` | `--accent-green` | Success, active |
| Pink | `#F472B6` | `--accent-pink` | Highlights |
| Purple | `#A78BFA` | `--accent-purple` | Special features |
| Amber | `#FBBF24` | `--accent-amber` | Warnings |

## Integration

### For Safari Trace (Next.js)

Assets are available at runtime via the git submodule or can be copied to `public/`:

```typescript
import { SafariBrandAssets, SafariBrandColors } from '@/lib/theme/brand-assets';

// Use logo
<img src={SafariBrandAssets.logos.diamondIconRed} alt="Safari" />

// Use colors
<div style={{ backgroundColor: SafariBrandColors.brand.primary.safariRed }}>
```

### For Tailwind CSS

```typescript
// tailwind.config.ts
import { tailwindThemeExtension } from '@/lib/theme/safari-theme';

export default {
  theme: {
    extend: tailwindThemeExtension,
  },
};
```

### For Other Applications

Import the theme directly:

```javascript
import SafariTheme from './brand-assets/theme/SafariTheme.js';

const primaryColor = SafariTheme.colors.brand.primary; // #9B1C1C
```

## Migration Note

**2026-01-20**: Brand assets consolidated from `safari-brand-assets` repo into `organizational-docs/shared/branding/assets/`. The git submodule approach has been replaced with direct asset storage for simpler management.
