---
id: STD-BRAND-002
title: Safari Color Palette
domain: governance
visualization: governance
sensitivity: internal
last_updated: 2026-02-10
---

# Safari Color Palette

## Purpose

This document defines the official color palette for Safari Circuits and Safari Trace products, ensuring visual consistency across all applications.

## Primary Colors

### Safari Red

The signature brand color representing precision and quality.

| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| Safari Red | `#9B1C1C` | 155, 28, 28 | 0, 69%, 36% | Primary brand, accents |
| Safari Red Light | `#DC2626` | 220, 38, 38 | 0, 72%, 51% | Hover states |
| Safari Red Dark | `#7F1D1D` | 127, 29, 29 | 0, 63%, 31% | Active states, depth |

### Color Swatches

```
┌───────────────────────────────────────────────────────┐
│                                                       │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐             │
│  │█████████│   │█████████│   │█████████│             │
│  │█████████│   │█████████│   │█████████│             │
│  │█████████│   │█████████│   │█████████│             │
│  └─────────┘   └─────────┘   └─────────┘             │
│   Red Light     Safari Red    Red Dark               │
│   #DC2626       #9B1C1C       #7F1D1D                │
│                                                       │
└───────────────────────────────────────────────────────┘
```

## Neutral Colors

### Dark Theme Palette

Safari Trace uses a dark theme by default for reduced eye strain in manufacturing environments.

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Background | `#0F172A` | 15, 23, 42 | Page background |
| Surface | `#1E293B` | 30, 41, 59 | Card backgrounds |
| Surface Elevated | `#334155` | 51, 65, 85 | Elevated elements |
| Border | `#475569` | 71, 85, 105 | Borders, dividers |
| Text Primary | `#F8FAFC` | 248, 250, 252 | Main text |
| Text Secondary | `#94A3B8` | 148, 163, 184 | Secondary text |
| Text Muted | `#64748B` | 100, 116, 139 | Disabled, hints |

### Neutral Scale

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  50    100   200   300   400   500   600   700   800   900   │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐│
│  │░░░│ │░░░│ │▒▒▒│ │▒▒▒│ │▓▓▓│ │▓▓▓│ │███│ │███│ │███│ │███││
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘│
│                                                               │
│  Slate Neutral Scale (Tailwind)                              │
│                                                               │
└───────────────────────────────────────────────────────────────┘

Hex Values:
50:  #F8FAFC    400: #94A3B8    800: #1E293B
100: #F1F5F9    500: #64748B    900: #0F172A
200: #E2E8F0    600: #475569    950: #020617
300: #CBD5E1    700: #334155
```

## Accent Colors

### Status Colors

| Name | Hex | Usage |
|------|-----|-------|
| Blue | `#3B82F6` | Links, info, primary actions |
| Green | `#22C55E` | Success, positive, complete |
| Amber | `#F59E0B` | Warning, attention needed |
| Red | `#EF4444` | Error, danger, critical |
| Purple | `#8B5CF6` | Special features, AI |

### Status Color Scale

Each status color has a full scale for different use cases:

```typescript
// Tailwind color configuration
const statusColors = {
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  green: {
    50: '#F0FDF4',
    500: '#22C55E',
    700: '#15803D',
  },
  amber: {
    50: '#FFFBEB',
    500: '#F59E0B',
    700: '#B45309',
  },
  red: {
    50: '#FEF2F2',
    500: '#EF4444',
    700: '#B91C1C',
  },
};
```

## Semantic Colors

### Application Contexts

| Context | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Safari Red | `#9B1C1C` | Primary actions, brand |
| Secondary | Slate | `#475569` | Secondary actions |
| Info | Blue | `#3B82F6` | Informational |
| Success | Green | `#22C55E` | Success states |
| Warning | Amber | `#F59E0B` | Warnings |
| Danger | Red | `#EF4444` | Errors, destructive |

### Manufacturing Status

| Status | Color | Hex | Badge |
|--------|-------|-----|-------|
| Running | Green | `#22C55E` | Production active |
| Idle | Amber | `#F59E0B` | Waiting |
| Down | Red | `#EF4444` | Stopped |
| Maintenance | Purple | `#8B5CF6` | Scheduled work |
| Setup | Blue | `#3B82F6` | Changeover |

## Color Accessibility

### Contrast Requirements

| Text Size | Minimum Contrast | WCAG Level |
|-----------|-----------------|------------|
| Normal text | 4.5:1 | AA |
| Large text (18px+) | 3:1 | AA |
| UI components | 3:1 | AA |

### Accessible Combinations

| Background | Text | Contrast | Pass |
|------------|------|----------|------|
| `#0F172A` | `#F8FAFC` | 15.8:1 | ✓ AAA |
| `#1E293B` | `#F8FAFC` | 11.7:1 | ✓ AAA |
| `#334155` | `#F8FAFC` | 7.5:1 | ✓ AAA |
| `#9B1C1C` | `#F8FAFC` | 7.2:1 | ✓ AAA |
| `#3B82F6` | `#0F172A` | 5.1:1 | ✓ AA |

### Color Blindness Considerations

```
Status indicators should not rely on color alone:

✓ Good: Color + Icon + Text
  [🟢 Running] [⚠️ Warning] [❌ Error]

✗ Avoid: Color only
  [●] [●] [●]
```

## Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Safari Brand Colors
        primary: {
          DEFAULT: '#9B1C1C',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#DC2626',
          500: '#9B1C1C',
          600: '#7F1D1D',
          700: '#6B1A1A',
          800: '#5C1A1A',
          900: '#4A1919',
        },
        // Use Tailwind Slate for neutrals
        // Status colors use Tailwind defaults
      },
    },
  },
};

export default config;
```

## CSS Variables

```css
/* globals.css */
:root {
  /* Brand Colors */
  --color-primary: 155 28 28;
  --color-primary-light: 220 38 38;
  --color-primary-dark: 127 29 29;

  /* Neutral Colors */
  --color-background: 15 23 42;
  --color-surface: 30 41 59;
  --color-border: 71 85 105;

  /* Text Colors */
  --color-text-primary: 248 250 252;
  --color-text-secondary: 148 163 184;
  --color-text-muted: 100 116 139;

  /* Status Colors */
  --color-info: 59 130 246;
  --color-success: 34 197 94;
  --color-warning: 245 158 11;
  --color-danger: 239 68 68;
}
```

## Usage Examples

### Buttons

```tsx
// Primary button
<button className="bg-primary-500 hover:bg-primary-400 active:bg-primary-600 text-white">
  Submit
</button>

// Secondary button
<button className="bg-slate-600 hover:bg-slate-500 active:bg-slate-700 text-white">
  Cancel
</button>

// Danger button
<button className="bg-red-600 hover:bg-red-500 text-white">
  Delete
</button>
```

### Status Badges

```tsx
const statusColors = {
  running: 'bg-green-500/20 text-green-400 border-green-500/50',
  idle: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
  down: 'bg-red-500/20 text-red-400 border-red-500/50',
};
```

## Related Documentation

- [Brand Guide](STD-BRAND-001-brand-guide.md)
- [Typography](STD-BRAND-003-typography.md)
- [Component Styling](STD-BRAND-004-component-styling.md)

---

*Standard Owner: Design/Engineering*
