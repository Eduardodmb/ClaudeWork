---
id: STD-BRAND-003
title: Safari Typography
domain: governance
visualization: governance
sensitivity: internal
last_updated: 2026-02-10
---

# Safari Typography

## Purpose

This document defines typography standards for Safari Circuits and Safari Trace products to ensure consistent, readable, and professional text presentation.

## Font Families

### Primary Font: Inter

Inter is the primary typeface for all Safari applications, chosen for its excellent readability on screens.

| Property | Value |
|----------|-------|
| Family | Inter |
| Type | Sans-serif |
| License | Open Font License |
| Source | Google Fonts |
| Weights | 400, 500, 600, 700 |

### Monospace Font: JetBrains Mono

JetBrains Mono is used for code, data values, and technical content.

| Property | Value |
|----------|-------|
| Family | JetBrains Mono |
| Type | Monospace |
| License | Open Font License |
| Source | Google Fonts |
| Weights | 400, 500, 700 |

### Font Stack

```css
/* Primary font stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Monospace font stack */
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

## Type Scale

### Heading Sizes

| Level | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| H1 | 36px / 2.25rem | 1.2 | 700 | Page titles |
| H2 | 30px / 1.875rem | 1.25 | 700 | Section headers |
| H3 | 24px / 1.5rem | 1.3 | 600 | Subsections |
| H4 | 20px / 1.25rem | 1.4 | 600 | Card titles |
| H5 | 18px / 1.125rem | 1.4 | 600 | Small headers |
| H6 | 16px / 1rem | 1.5 | 600 | Label headers |

### Body Sizes

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| Large | 18px / 1.125rem | 1.6 | Lead paragraphs |
| Base | 16px / 1rem | 1.5 | Body text |
| Small | 14px / 0.875rem | 1.5 | Secondary text |
| XSmall | 12px / 0.75rem | 1.4 | Captions, labels |

### Type Scale Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  H1  Safari Trace Dashboard                 36px / Bold     │
│                                                             │
│  H2  Production Overview                    30px / Bold     │
│                                                             │
│  H3  Active Work Orders                     24px / Semi     │
│                                                             │
│  H4  Line SMT-01 Status                     20px / Semi     │
│                                                             │
│  Body  The current shift has processed      16px / Regular  │
│        1,234 units with 99.2% yield.                        │
│                                                             │
│  Small  Last updated 5 minutes ago          14px / Regular  │
│                                                             │
│  Caption  WO-2026-00142                     12px / Regular  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Font Weights

| Weight | Value | Name | Usage |
|--------|-------|------|-------|
| Regular | 400 | `font-normal` | Body text |
| Medium | 500 | `font-medium` | Emphasis, labels |
| Semibold | 600 | `font-semibold` | Subheadings, buttons |
| Bold | 700 | `font-bold` | Headlines, strong emphasis |

## Text Colors

### Dark Theme (Default)

| Name | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | White/Slate 50 | `#F8FAFC` | Headlines, main text |
| Secondary | Slate 400 | `#94A3B8` | Supporting text |
| Muted | Slate 500 | `#64748B` | Placeholders, disabled |
| Inverse | Slate 900 | `#0F172A` | Text on light backgrounds |

### Status Text Colors

| Status | Color | Hex |
|--------|-------|-----|
| Link | Blue 400 | `#60A5FA` |
| Success | Green 400 | `#4ADE80` |
| Warning | Amber 400 | `#FBBF24` |
| Error | Red 400 | `#F87171` |

## Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
  },
};

export default config;
```

## CSS Classes

### Heading Classes

```css
/* Typography utility classes */
.text-h1 {
  @apply text-4xl font-bold leading-tight tracking-tight;
}

.text-h2 {
  @apply text-3xl font-bold leading-snug;
}

.text-h3 {
  @apply text-2xl font-semibold leading-snug;
}

.text-h4 {
  @apply text-xl font-semibold;
}

.text-h5 {
  @apply text-lg font-semibold;
}

.text-h6 {
  @apply text-base font-semibold;
}
```

### Body Classes

```css
.text-body-lg {
  @apply text-lg leading-relaxed;
}

.text-body {
  @apply text-base leading-normal;
}

.text-body-sm {
  @apply text-sm leading-normal;
}

.text-caption {
  @apply text-xs leading-tight text-slate-400;
}
```

## Usage Guidelines

### Hierarchy

```
Page Structure:
┌─────────────────────────────────────────────────────────────┐
│  H1: Page Title                                             │
│  └── Lead paragraph (lg)                                    │
│                                                             │
│  H2: Major Section                                          │
│  └── H3: Subsection                                         │
│      └── Body text with H4 inline headers                   │
│                                                             │
│  H2: Another Section                                        │
│  └── Body text                                              │
│      └── Small text for details                             │
│          └── Caption for metadata                           │
└─────────────────────────────────────────────────────────────┘
```

### Line Length

| Context | Optimal | Maximum |
|---------|---------|---------|
| Body text | 60-75 characters | 90 characters |
| Headings | No limit | Natural break |
| Code | 80 characters | 120 characters |

```css
/* Constrain line length for readability */
.prose {
  max-width: 65ch;
}
```

### Text Alignment

| Alignment | Usage |
|-----------|-------|
| Left | Default for all text |
| Center | Page titles, empty states |
| Right | Numbers in tables, dates |
| Justify | Avoid (causes uneven spacing) |

## Code Typography

### Inline Code

```tsx
<code className="font-mono text-sm bg-slate-800 px-1.5 py-0.5 rounded">
  WO-2026-00142
</code>
```

### Code Blocks

```tsx
<pre className="font-mono text-sm bg-slate-900 p-4 rounded-lg overflow-x-auto">
  <code>{codeContent}</code>
</pre>
```

### Data Values

```tsx
// Serial numbers, IDs, codes
<span className="font-mono text-sm">
  SN-2026-00142-001
</span>

// Quantities and measurements
<span className="font-mono tabular-nums">
  1,234.56
</span>
```

## Responsive Typography

```css
/* Base sizes adjust for screen size */
html {
  font-size: 14px; /* Mobile */
}

@media (min-width: 640px) {
  html {
    font-size: 15px; /* Tablet */
  }
}

@media (min-width: 1024px) {
  html {
    font-size: 16px; /* Desktop */
  }
}
```

## Font Loading

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

## Accessibility

### Minimum Sizes

| Element | Minimum Size |
|---------|--------------|
| Body text | 16px |
| Interactive elements | 14px |
| Captions | 12px |

### Readable Line Height

```
Body text: 1.5 (150%)
Headings: 1.2-1.3 (120-130%)
```

### Focus States

```css
/* Ensure text links are visible */
a:focus {
  @apply outline-none ring-2 ring-primary-400 ring-offset-2 ring-offset-slate-900;
}
```

## Related Documentation

- [Brand Guide](STD-BRAND-001-brand-guide.md)
- [Color Palette](STD-BRAND-002-color-palette.md)
- [Component Styling](STD-BRAND-004-component-styling.md)

---

*Standard Owner: Design/Engineering*
