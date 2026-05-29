# Safari Brand Assets

Official brand asset files for Safari Circuits.

## Structure

```
assets/
├── logos/svg/           # Vector logo files
├── logos/png/           # Raster exports (when needed)
├── patterns/            # Background patterns
├── colors/              # Color palette definitions
└── theme/               # JavaScript theme configurations
```

## Logo Files

| File | Description | Use Case |
|------|-------------|----------|
| `safari-logo.svg` | Full wordmark logo | Headers, marketing |
| `safari-logo-white.svg` | Full logo (white) | Dark/red backgrounds |
| `safari-icon-diamond-s.svg` | Diamond S icon | Favicons, app icons |
| `safari-icon-diamond-s-red.svg` | Diamond S (Safari Red) | Light backgrounds |
| `safari-circle-circuit-red.svg` | Circle with circuit | Decorative, loading |
| `safari-circle-circuit-white.svg` | Circle circuit (white) | Dark backgrounds |

## Patterns

| File | Size | Description |
|------|------|-------------|
| `safari-circuit-board-pattern.svg` | 400x400px | Gray circuit on transparent |
| `safari-circuit-board-pattern-red.svg` | 400x400px | Red circuit on transparent |

## Usage

### Web Applications

Copy assets to your `public/` directory or reference via URL:

```html
<img src="/assets/logos/svg/safari-logo.svg" alt="Safari Circuits">
```

### React/Next.js

```jsx
import SafariTheme from '@/assets/theme/SafariTheme.js';

<div style={{
  backgroundColor: SafariTheme.colors.background.dark,
  backgroundImage: `url('/assets/patterns/safari-circuit-board-pattern.svg')`
}}>
```

### CSS Background Pattern

```css
.circuit-background {
  background-color: #0f172a;
  background-image: url('/assets/patterns/safari-circuit-board-pattern.svg');
  background-repeat: repeat;
  background-size: 400px 400px;
}
```

## Version History

| Date | Change |
|------|--------|
| 2026-01-20 | Migrated from safari-brand-assets repo to organizational-docs |
| 2026-01-16 | Added circuit-trace-divider variants |
| 2026-01-16 | Initial creation |
