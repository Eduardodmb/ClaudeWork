---
id: STD-BRAND-004
title: Safari Component Styling
domain: governance
visualization: governance
sensitivity: internal
last_updated: 2026-02-10
---

# Safari Component Styling

## Purpose

This document defines styling patterns for UI components in Safari Trace, ensuring visual consistency and maintainability across the application.

## Design Principles

### Core Principles

| Principle | Description |
|-----------|-------------|
| Consistency | Same patterns across all components |
| Dark-first | Designed for dark theme manufacturing environments |
| Accessibility | WCAG AA minimum compliance |
| Performance | Minimal CSS, efficient rendering |

## Spacing System

### Spacing Scale

Based on 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `0` | 0px | Reset |
| `1` | 4px | Tight spacing |
| `2` | 8px | Compact spacing |
| `3` | 12px | Default small |
| `4` | 16px | Default medium |
| `5` | 20px | Component padding |
| `6` | 24px | Section spacing |
| `8` | 32px | Large spacing |
| `10` | 40px | Section breaks |
| `12` | 48px | Page sections |

### Component Spacing

```
Card Component:
┌────────────────────────────────────────────┐
│ p-6 (24px padding)                         │
│  ┌──────────────────────────────────────┐  │
│  │ Header            mb-4 (16px)        │  │
│  └──────────────────────────────────────┘  │
│  ┌──────────────────────────────────────┐  │
│  │ Content           space-y-3 (12px)   │  │
│  │ ├── Item 1                           │  │
│  │ ├── Item 2                           │  │
│  │ └── Item 3                           │  │
│  └──────────────────────────────────────┘  │
│  ┌──────────────────────────────────────┐  │
│  │ Footer            mt-6 (24px)        │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0 | Sharp edges |
| `sm` | 4px | Subtle rounding |
| `DEFAULT` | 6px | Default components |
| `md` | 8px | Cards, modals |
| `lg` | 12px | Large containers |
| `xl` | 16px | Hero elements |
| `full` | 9999px | Circular elements |

## Shadows

### Dark Theme Shadows

Dark themes require subtle shadows with glows:

```css
/* Elevation levels */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.3);
}

.shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.4),
              0 1px 2px -1px rgb(0 0 0 / 0.4);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.4),
              0 2px 4px -2px rgb(0 0 0 / 0.4);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.4),
              0 4px 6px -4px rgb(0 0 0 / 0.4);
}

/* Glow effect for focus/active */
.shadow-glow-primary {
  box-shadow: 0 0 0 3px rgb(155 28 28 / 0.3);
}
```

## Components

### Buttons

#### Primary Button

```tsx
<button className="
  bg-primary-500
  hover:bg-primary-400
  active:bg-primary-600
  text-white
  font-semibold
  px-4 py-2
  rounded-md
  transition-colors
  focus:outline-none
  focus:ring-2
  focus:ring-primary-400
  focus:ring-offset-2
  focus:ring-offset-slate-900
  disabled:opacity-50
  disabled:cursor-not-allowed
">
  Submit
</button>
```

#### Button Variants

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Primary | `bg-primary-500` | `text-white` | None |
| Secondary | `bg-slate-600` | `text-white` | None |
| Outline | `bg-transparent` | `text-slate-200` | `border-slate-500` |
| Ghost | `bg-transparent` | `text-slate-300` | None |
| Danger | `bg-red-600` | `text-white` | None |

#### Button Sizes

| Size | Padding | Text | Height |
|------|---------|------|--------|
| sm | `px-3 py-1.5` | `text-sm` | 32px |
| md | `px-4 py-2` | `text-base` | 40px |
| lg | `px-6 py-3` | `text-lg` | 48px |

### Cards

```tsx
<div className="
  bg-slate-800
  border border-slate-700
  rounded-lg
  shadow-md
  overflow-hidden
">
  <div className="p-6">
    <h3 className="text-lg font-semibold text-white mb-2">
      Card Title
    </h3>
    <p className="text-slate-400">
      Card content goes here.
    </p>
  </div>
</div>
```

#### Card Variants

| Variant | Styles |
|---------|--------|
| Default | `bg-slate-800 border-slate-700` |
| Elevated | `bg-slate-700 border-slate-600` |
| Interactive | Add `hover:border-slate-600 cursor-pointer` |
| Selected | Add `border-primary-500 ring-1 ring-primary-500` |

### Form Inputs

#### Text Input

```tsx
<input
  type="text"
  className="
    w-full
    bg-slate-900
    border border-slate-600
    rounded-md
    px-4 py-2
    text-white
    placeholder-slate-500
    focus:outline-none
    focus:border-primary-500
    focus:ring-1
    focus:ring-primary-500
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
  placeholder="Enter value..."
/>
```

#### Select

```tsx
<select className="
  w-full
  bg-slate-900
  border border-slate-600
  rounded-md
  px-4 py-2
  text-white
  focus:outline-none
  focus:border-primary-500
  focus:ring-1
  focus:ring-primary-500
">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

#### Form States

| State | Border | Background |
|-------|--------|------------|
| Default | `border-slate-600` | `bg-slate-900` |
| Hover | `border-slate-500` | `bg-slate-900` |
| Focus | `border-primary-500` | `bg-slate-900` |
| Error | `border-red-500` | `bg-slate-900` |
| Disabled | `border-slate-700` | `bg-slate-800` |

### Tables

```tsx
<table className="w-full">
  <thead>
    <tr className="border-b border-slate-700">
      <th className="text-left p-3 text-sm font-semibold text-slate-300">
        Header
      </th>
    </tr>
  </thead>
  <tbody className="divide-y divide-slate-800">
    <tr className="hover:bg-slate-800/50">
      <td className="p-3 text-slate-200">
        Cell
      </td>
    </tr>
  </tbody>
</table>
```

### Badges

```tsx
// Status badges
const badgeStyles = {
  success: 'bg-green-500/20 text-green-400 border-green-500/50',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
  error: 'bg-red-500/20 text-red-400 border-red-500/50',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  neutral: 'bg-slate-500/20 text-slate-400 border-slate-500/50',
};

<span className={`
  inline-flex items-center
  px-2.5 py-0.5
  rounded-full
  text-xs font-medium
  border
  ${badgeStyles.success}
`}>
  Active
</span>
```

### Modals

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Backdrop */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Modal */}
  <div className="
    relative
    bg-slate-800
    border border-slate-700
    rounded-lg
    shadow-xl
    max-w-md w-full
    mx-4
  ">
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Modal Title
      </h2>
      <p className="text-slate-400">
        Modal content
      </p>
    </div>
    <div className="flex justify-end gap-3 p-4 border-t border-slate-700">
      <button className="btn-secondary">Cancel</button>
      <button className="btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

### Tooltips

```tsx
<div className="
  bg-slate-700
  text-white
  text-sm
  px-3 py-2
  rounded-md
  shadow-lg
  max-w-xs
">
  Tooltip content
</div>
```

## Animation

### Transitions

```css
/* Default transition */
.transition-default {
  @apply transition-all duration-200 ease-out;
}

/* Fast interaction feedback */
.transition-fast {
  @apply transition-all duration-150 ease-out;
}

/* Smooth entrance */
.transition-slow {
  @apply transition-all duration-300 ease-out;
}
```

### Animation Classes

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 200ms ease-out;
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 200ms ease-out;
}
```

## Layout Patterns

### Page Layout

```tsx
<div className="min-h-screen bg-slate-900">
  {/* Header */}
  <header className="h-16 bg-slate-800 border-b border-slate-700">
    ...
  </header>

  {/* Main content */}
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    ...
  </main>
</div>
```

### Grid System

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>

// Dashboard layout
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 lg:col-span-8">Main content</div>
  <div className="col-span-12 lg:col-span-4">Sidebar</div>
</div>
```

## Dark Theme Variables

```css
:root {
  /* Surfaces */
  --surface-background: theme('colors.slate.900');
  --surface-card: theme('colors.slate.800');
  --surface-elevated: theme('colors.slate.700');

  /* Borders */
  --border-default: theme('colors.slate.700');
  --border-subtle: theme('colors.slate.800');

  /* Text */
  --text-primary: theme('colors.slate.50');
  --text-secondary: theme('colors.slate.400');
  --text-muted: theme('colors.slate.500');
}
```

## Component Library Reference

```typescript
// lib/components/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { Select } from './Select';
export { Badge } from './Badge';
export { Modal } from './Modal';
export { Table } from './Table';
export { Tooltip } from './Tooltip';
```

## Related Documentation

- [Brand Guide](STD-BRAND-001-brand-guide.md)
- [Color Palette](STD-BRAND-002-color-palette.md)
- [Typography](STD-BRAND-003-typography.md)

---

*Standard Owner: Design/Engineering*
