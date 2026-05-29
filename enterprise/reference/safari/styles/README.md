# Safari Shared Styles

CSS theme and component library for Safari Circuits applications.

## Files

| File | Purpose |
|------|---------|
| `safari-theme.css` | CSS custom properties (variables) for colors, typography, spacing |
| `safari-components.css` | Pre-styled UI components (buttons, cards, inputs, etc.) |
| `index.css` | Combined import file |

## Quick Start

```html
<!-- Option 1: Import combined file -->
<link rel="stylesheet" href="/shared/styles/index.css">

<!-- Option 2: Import individually -->
<link rel="stylesheet" href="/shared/styles/safari-theme.css">
<link rel="stylesheet" href="/shared/styles/safari-components.css">
```

```css
/* In CSS/SCSS */
@import url('/shared/styles/index.css');
```

## Usage

### Theme Variables

```css
.my-component {
  background: var(--safari-bg-surface);
  color: var(--safari-text-primary);
  border-radius: var(--safari-radius-md);
  padding: var(--safari-space-4);
}
```

### Components

```html
<!-- Button -->
<button class="btn btn-primary btn-md">Click Me</button>

<!-- Card -->
<div class="card card-accent-blue">
  <h3 class="card-title">Card Title</h3>
  <p class="card-body">Card content goes here.</p>
</div>

<!-- Input -->
<div class="input-wrapper">
  <label class="input-label">Email</label>
  <input class="input" type="email" placeholder="you@example.com">
</div>

<!-- Badge -->
<span class="badge badge-success">Active</span>
```

## Safari Apps

Each Safari app has a unique accent color. Set the app context:

```html
<!-- Option 1: Data attribute -->
<body data-app="trace">

<!-- Option 2: Class -->
<body class="safari-app-trace">
```

| App | Accent Color | Variable |
|-----|--------------|----------|
| Trace | Purple `#a78bfa` | `--safari-app-accent` |
| Docs | Blue `#60a5fa` | `--safari-app-accent` |
| Analyze | Green `#34d399` | `--safari-app-accent` |
| Assist | Red `#9B1C1C` | `--safari-app-accent` |
| Studio | Orange `#f59e0b` | `--safari-app-accent` |

## Themes

### Dark Theme (Default)

Applied automatically. Dark backgrounds with light text.

### Light Theme

```html
<body data-theme="light">
<!-- or -->
<body class="safari-theme-light">
```

## Variable Reference

### Colors

| Variable | Value | Use |
|----------|-------|-----|
| `--safari-red` | `#9B1C1C` | Primary brand color |
| `--safari-blue` | `#60a5fa` | Information, links |
| `--safari-green` | `#34d399` | Success states |
| `--safari-orange` | `#f59e0b` | Warnings |
| `--safari-purple` | `#a78bfa` | Special features |
| `--safari-pink` | `#f472b6` | Highlights |

### Typography

| Variable | Value |
|----------|-------|
| `--safari-font-sans` | Poppins, system fallback |
| `--safari-font-mono` | JetBrains Mono |

### Spacing (8px grid)

| Variable | Value |
|----------|-------|
| `--safari-space-1` | 4px |
| `--safari-space-2` | 8px |
| `--safari-space-4` | 16px |
| `--safari-space-6` | 24px |
| `--safari-space-8` | 32px |

## Component Reference

### Buttons

Classes: `btn`, `btn-{variant}`, `btn-{size}`

Variants: `primary`, `secondary`, `ghost`, `danger`, `accent`
Sizes: `sm`, `md`, `lg`

### Cards

Classes: `card`, `card-elevated`, `card-accent-{color}`

Accent colors: `blue`, `green`, `red`, `orange`, `purple`, `pink`

### Inputs

Classes: `input`, `input-error`, `input-label`, `textarea`, `select`

### Badges

Classes: `badge`, `badge-{variant}`

Variants: `default`, `success`, `warning`, `error`, `info`, `brand`

### Tables

Classes: `table`, `table-striped`

### Other

- `sidebar`, `sidebar-nav-item`
- `header`, `header-title`
- `modal`, `modal-header`, `modal-body`, `modal-footer`
- `alert`, `alert-{variant}`
- `tabs`, `tab`
- `toggle`, `checkbox`
- `spinner`, `progress`
- `code`, `code-block`
- `avatar`, `badge`, `tooltip`

## Related

- **JS Theme:** `shared/branding/assets/theme/SafariTheme.js`
- **Brand Guidelines:** `shared/branding/README.md`
- **JSX Styling Guide:** `~/.claude/skills/safari-skills/production-code-standards/reference/jsx-styling.md`
