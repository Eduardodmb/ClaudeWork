---
id: BP-STYLE-001
title: Safari HTML Deliverable Styling Guide
domain: governance
visualization: governance
sensitivity: internal
last_updated: 2026-02-10
---

# Safari HTML Deliverable Styling Guide

Reference for creating branded HTML deliverables (whitepapers, guides, reports) with Safari Circuits styling.

## Brand Asset Requirements (CRITICAL)

### Rule 1: NEVER Fabricate Visual Assets

**NEVER fabricate, generate, or create inline SVGs for:**
- Logos
- Patterns or watermarks
- Circuit board designs
- Background decorations
- Icons or visual elements

**Why:** Fabricated assets create brand inconsistency and often look unprofessional. Even simple geometric patterns should come from approved brand assets.

### Rule 2: Use Only Approved Brand Assets

All visual elements must come from `organizational-docs/shared/branding/assets/`:

| Asset Type | Location | Notes |
|------------|----------|-------|
| Logos | `assets/logos/svg/` | Use `safari-logo.svg` (full wordmark) |
| Patterns | `assets/patterns/` | Large files - reference externally or omit |
| Icons | `assets/logos/svg/` | Use `safari-icon-diamond-s.svg` |

**If an asset doesn't exist:** Ask the user before proceeding. Do not create a substitute.

### Rule 3: When Patterns Are Too Large

The official `safari-circuit-board-pattern.svg` is ~270KB - too large for inline embedding. Options:

1. **Omit the pattern** (recommended for clean documents)
2. **Reference externally** via `<img src="path/to/pattern.svg">`
3. **Ask the user** if they want a simplified pattern created as a new brand asset

**Never:** Create a "simplified version" inline - this violates brand governance.

---

## Safari Logo Requirements (CRITICAL)

**NEVER fabricate or truncate the Safari logo SVG.** Always use the complete 7-path logo.

### Complete Safari Logo SVG

The Safari wordmark logo requires **exactly 7 `<path>` elements** with `fill="#9B1C1C"`. Incomplete logos (2-3 paths) will render as broken characters resembling "A" and "/" instead of "SAFARI".

**Source file:** `organizational-docs/shared/branding/assets/logos/svg/safari-logo.svg`

**Full inline SVG (copy exactly):**

```html
<!-- Safari Logo - MUST have all 7 paths -->
<svg class="page-header-logo" viewBox="0 0 430.7 86.02" xmlns="http://www.w3.org/2000/svg">
    <path fill="#9B1C1C" d="m79.5,85.81c3.1-6.7,5.8-12.9,8.7-19,5-10.8,10-21.5,15.1-32.2.5-1,1.7-2.2,2.6-2.2,7-.2,14.1-.2,21.1-.2.4,0,.9.3,1.5.5-2.6,6-5.1,11.8-7.9,18.1,4.1,0,7.5.1,10.9-.1.7,0,1.6-1,1.9-1.8,2.7-8.3,5.4-16.7,8-25.1,1.1-3.8-.4-5.6-4.5-5.6h-25.8c.3-1.2.4-2.2.8-3,1.8-4.1,3.7-8.2,5.4-12.3.8-1.9,1.9-2.7,4.1-2.7,13.2.1,26.4.2,39.6,0,5.8-.1,9.2,4.7,8.3,9.3-1.1,5.6-2.7,11-4.2,16.5-2.9,10.3-6.1,20.5-9.1,30.7-2.7,9.1-5.3,18.2-8,27.3-.2.7-1.3,1.8-2,1.8-7.5.1-15.1,0-22.6,0-.2,0-.3-.2-1-.6,1.2-4,2.5-8.2,3.8-12.3.8-2.7-.1-4-2.9-4-2.3,0-4.7.3-6.9-.1-3-.4-4.3,1-5.4,3.5-1.6,3.9-3.4,7.7-5.2,11.4-.4.8-1.4,2-2.2,2-7.9.1-15.6.1-24.1.1h0Z"/>
    <path fill="#9B1C1C" d="m257,85.81c1.5-4.8,2.8-9,4-13.2q1.1-3.8-2.9-3.8c-2.7,0-5.4.2-8.1-.1-2-.2-2.9.7-3.6,2.3-1.8,4-3.7,8-5.4,12-.7,1.7-1.6,2.7-3.7,2.7-6.6-.1-13.3,0-19.9.1-.7,0-1.3-.2-2.6-.5,2-4.4,3.8-8.6,5.7-12.7,5.8-12.7,11.7-25.3,17.5-38.1.8-1.7,1.5-2.5,3.5-2.5,7.2.1,14.5,0,22.5,0-2.8,6.4-5.4,12.2-8.2,18.6,4.1,0,7.5.1,11-.1.6,0,1.6-1.1,1.8-1.9,2.7-8.4,5.3-16.8,7.9-25.1,1.1-3.5-.4-5.4-4.1-5.4h-26.6c1.6-3.7,2.9-6.9,4.2-10,.5-1.1,1.2-2.2,1.4-3.3.8-4,3.1-4.9,7.1-4.8,12.2.3,24.4.1,36.6.1,7.1,0,10.7,4.2,8.9,11.1-2,7.8-4.4,15.6-6.6,23.3-4.5,15.6-9.1,31.2-13.7,46.8-1.3,4.4-1.2,4.4-5.9,4.4-6.8.1-13.4.1-20.8.1h0Z"/>
    <path fill="#9B1C1C" d="m360,50.81c7.4,5.7,3.6,11.6,1.1,17.4-2.2,5.1-4.6,10.2-7.1,15.2-.5,1-1.9,2.3-3,2.3-6.9.2-13.9.1-21.6.1,1.6-3.7,2.8-6.8,4.2-10,2.8-6.2,5.6-12.4,8.3-18.5,2-4.5.3-7.3-4.6-7.5-1.3-.1-2.7-.3-3.9,0-1.1.3-2.5,1-2.9,2-5,10.5-9.8,20.9-14.5,31.5-.9,2.1-2.1,2.8-4.3,2.7-5.9-.2-11.9-.1-17.8-.1-1,0-1.9-.2-3.5-.3,2.2-4.8,4.1-9.1,6.1-13.4,4.7-10.3,9.4-20.7,14.2-31,1-2.3,2-4.6,3.2-6.8.4-.7,1.3-1.5,1.9-1.5,12.1-.1,24.3-.1,37-.1-1,2.9-2,5.4-2.9,8,.2.2.4.3.6.5,8.5-5.3,17-10.6,25.8-16.1-4.2-5.7-8.1-11.1-12.3-17.1-1.5,3.1-2.6,5.7-3.9,8.2-.4.8-1.3,1.7-2,1.7-12.1.1-24.1.1-36.9.1,2-4.6,4.1-8.6,5.7-12.9,1.5-4.1,4-5.3,8.3-5.2,14.1.3,28.2.1,42.3.2,5.2,0,9.1,3.4,9.3,8.1.1,1.9-.4,4-1.1,5.8-4.5,10.2-9.1,20.4-13.9,30.5-2.2,4.8-6.4,6-11.8,6.2h0Z"/>
    <path fill="#9B1C1C" d="m0,85.51c2.7-6,5.1-11.5,7.8-17,.3-.6,1.9-.9,2.8-.9,9.9-.1,19.7.1,29.6-.1,5.2-.1,10.7-.5,14.4-4.8,1.9-2.2,3.5-5.1,4.2-8s-1.1-5.3-4-6.6c-4.3-1.9-8.6-3.6-12.8-5.6-4-1.9-6.3-5.3-7.4-9.5-2.6-10.1,1.7-22.3,10-28.1C48.9,1.91,53.5.21,58.8.31c12.9.1,25.8,0,38.7,0,.8,0,1.6.1,2.9.2-.7,1.7-1.2,3.3-1.9,4.8-1.6,3.5-3.3,6.8-4.7,10.4-.8,2.1-2.1,2.8-4.3,2.7-7.6-.1-15.1-.1-22.7,0-1.8,0-3.5.6-5.2,1-2.5.6-3.7,2.4-3.9,4.7-.3,2.5,1.3,4.2,3.5,5.1,3.2,1.2,6.4,2.3,9.7,3.2,9.7,2.7,14.1,10.4,14.1,19.2,0,14-7.8,24.1-21,30.5-8.2,4-16.9,3.7-25.6,3.8-12,.2-24,0-35.9,0-.7-.1-1.2-.2-2.5-.4Z"/>
    <path fill="#9B1C1C" d="m430.7.31c-2.1,4.8-4,9-5.9,13.1-9.1,19.9-18.2,39.7-27.2,59.6-1.7,3.6-3.2,7.3-5,10.9-.4.8-1.3,1.8-2,1.8-7.5.1-15,.1-23.2.1,1.6-3.8,3-7,4.5-10.2,8.2-18,16.4-35.9,24.7-53.8,3-6.4,5.9-12.9,9-19.2.4-.9,1.6-2.1,2.5-2.1,7.1-.3,14.4-.2,22.6-.2h0Z"/>
    <path fill="#9B1C1C" d="m225.8,32.51c-2.7,6-5.1,11.5-7.7,16.8-.4.8-2,1.2-3.1,1.3-5.8.1-11.7.2-17.5.1-1.8,0-2.6.7-3.4,2.2-4.6,10.2-9.3,20.3-13.9,30.5-.9,2-1.9,2.6-4.1,2.6-6-.2-12.1-.1-18.1-.1-.9,0-1.8-.1-3.3-.2,1.8-4,3.4-7.6,5-11.2,6-13.1,12.1-26.2,18.1-39.4,1-2.2,2.3-3,4.8-3,13.4.1,26.8,0,40.2.1.9,0,1.6.1,3,.3h0Z"/>
    <path fill="#9B1C1C" d="m185.7,18.31c1.9-4.3,3.6-8.1,5.3-11.8.6-1.4,1.1-2.8,2-4,.8-1,2.1-2.1,3.1-2.1,14.4-.1,28.8-.1,43.1,0,.2,0,.4.1,1,.3-2,4.4-4.4,8.7-5.9,13.3-1.3,4-3.7,4.5-7.4,4.4-12.5-.2-24.9-.1-37.4-.1h-3.8Z"/>
</svg>
```

### Logo Verification Checklist

Before generating any HTML deliverable, verify:

- [ ] Logo SVG has `viewBox="0 0 430.7 86.02"`
- [ ] Logo SVG has exactly **7 `<path>` elements**
- [ ] All paths have `fill="#9B1C1C"`
- [ ] No paths are truncated or missing

### Common Error: Incomplete Logo

**Wrong (renders as "A" and "/"):**
```html
<!-- BROKEN - Only 2-3 paths -->
<svg viewBox="0 0 430.7 86.02">
    <path fill="#9B1C1C" d="m79.5,85.81c3.1-6.7..."/>
    <path fill="#9B1C1C" d="m257,85.81c1.5-4.8..."/>
</svg>
```

**Correct (renders as "SAFARI"):**
```html
<!-- CORRECT - All 7 paths present -->
<svg viewBox="0 0 430.7 86.02">
    <path fill="#9B1C1C" d="..."/> <!-- Path 1: A (italic) -->
    <path fill="#9B1C1C" d="..."/> <!-- Path 2: R -->
    <path fill="#9B1C1C" d="..."/> <!-- Path 3: I -->
    <path fill="#9B1C1C" d="..."/> <!-- Path 4: S -->
    <path fill="#9B1C1C" d="..."/> <!-- Path 5: F (second part) -->
    <path fill="#9B1C1C" d="..."/> <!-- Path 6: A (first) -->
    <path fill="#9B1C1C" d="..."/> <!-- Path 7: A (second part) -->
</svg>
```

---

## HTML Deliverable Structure

### Standard Page Layout

Multi-page HTML deliverables should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Document Title] - Safari Circuits</title>
    <style>
        /* Safari brand styles - see below */
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="page cover-page">
        <div class="cover-content">
            <div class="cover-logo">
                <!-- Full 7-path Safari logo here -->
            </div>
            <h1 class="cover-title">[Document Title]</h1>
            <p class="cover-subtitle">[Subtitle]</p>
            <p class="cover-date">[Date]</p>
        </div>
        <div class="cover-footer">
            <p>Safari Circuits, LLC | Confidential</p>
        </div>
    </div>

    <!-- Content Pages -->
    <div class="page">
        <div class="page-header">
            <div class="page-header-logo">
                <!-- Full 7-path Safari logo here -->
            </div>
            <span class="page-header-title">[Document Title]</span>
        </div>
        <div class="page-content">
            <!-- Page content -->
        </div>
        <div class="page-footer">
            <span class="page-number">Page 1</span>
        </div>
    </div>
</body>
</html>
```

### CSS Classes

```css
/* Page layout - A4/Letter print-ready */
.page {
    width: 210mm;
    min-height: 297mm;
    padding: 20mm;
    margin: 0 auto 20px;
    background: #0F172A; /* Safari dark background */
    color: #F8FAFC;
    position: relative;
    box-sizing: border-box;
}

@media print {
    .page {
        page-break-after: always;
        margin: 0;
    }
}

/* Cover page */
.cover-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.cover-logo {
    width: 300px;
    margin-bottom: 60px;
}

.cover-title {
    font-size: 48px;
    font-weight: 700;
    color: #F8FAFC;
    margin-bottom: 20px;
    line-height: 1.2;
}

.cover-subtitle {
    font-size: 24px;
    color: #94A3B8;
    margin-bottom: 40px;
}

/* Page header with logo */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 2px solid #9B1C1C;
    margin-bottom: 30px;
}

.page-header-logo {
    width: 120px;
    height: auto;
}

.page-header-title {
    font-size: 14px;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Page footer */
.page-footer {
    position: absolute;
    bottom: 20mm;
    left: 20mm;
    right: 20mm;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #64748B;
    border-top: 1px solid #334155;
    padding-top: 10px;
}
```

---

## Color Palette (Print-Ready)

| Element | Hex | CSS Variable | Print CMYK Approximation |
|---------|-----|--------------|--------------------------|
| Safari Red | `#9B1C1C` | `--color-primary` | C0 M82 Y82 K39 |
| Dark Background | `#0F172A` | `--color-bg-base` | C94 M85 Y62 K80 |
| Surface | `#1E293B` | `--color-bg-surface` | C80 M68 Y48 K50 |
| Primary Text | `#F8FAFC` | `--color-text-primary` | C2 M1 Y1 K1 |
| Secondary Text | `#94A3B8` | `--color-text-secondary` | C40 M30 Y25 K0 |
| Muted Text | `#64748B` | `--color-text-muted` | C55 M42 Y35 K5 |
| Border | `#334155` | `--color-border` | C70 M55 Y42 K25 |

---

## Typography

```css
/* Font stack */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 16px;
    line-height: 1.6;
}

/* Headings */
h1 { font-size: 36px; font-weight: 700; line-height: 1.2; }
h2 { font-size: 28px; font-weight: 600; line-height: 1.3; margin-top: 40px; }
h3 { font-size: 22px; font-weight: 600; line-height: 1.4; margin-top: 30px; }
h4 { font-size: 18px; font-weight: 600; line-height: 1.4; margin-top: 24px; }

/* Code */
code, pre {
    font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}

pre {
    background: #1E293B;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 14px;
}

/* IMPORTANT: Override code color inside dark containers (cards, gradients, dark boxes).
   The global code color (safari-red) is unreadable on dark backgrounds. */
.team-card code,
.highlight-box code,
[class*="card"] code,
[style*="background"] code {
    color: rgba(255,255,255,0.95);
}
```

---

## Tables

```css
table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
}

th {
    background: #1E293B;
    color: #F8FAFC;
    font-weight: 600;
    text-align: left;
    padding: 12px 16px;
    border-bottom: 2px solid #9B1C1C;
}

td {
    padding: 12px 16px;
    border-bottom: 1px solid #334155;
    color: #E2E8F0;
}

tr:nth-child(even) {
    background: rgba(30, 41, 59, 0.5);
}
```

---

## Callout Boxes

```css
.callout {
    padding: 20px;
    border-radius: 8px;
    margin: 24px 0;
    border-left: 4px solid;
}

.callout-info {
    background: rgba(96, 165, 250, 0.1);
    border-color: #60A5FA;
}

.callout-warning {
    background: rgba(251, 191, 36, 0.1);
    border-color: #FBBF24;
}

.callout-success {
    background: rgba(52, 211, 153, 0.1);
    border-color: #34D399;
}

.callout-danger {
    background: rgba(155, 28, 28, 0.1);
    border-color: #9B1C1C;
}
```

---

## Diagrams (SVG Styling)

When creating diagrams for deliverables:

```css
/* SVG diagram styling */
.diagram-container {
    background: #1E293B;
    padding: 30px;
    border-radius: 12px;
    margin: 24px 0;
    text-align: center;
}

.diagram-container svg {
    max-width: 100%;
    height: auto;
}

/* Diagram colors */
.diagram-primary { fill: #9B1C1C; }
.diagram-secondary { fill: #60A5FA; }
.diagram-accent { fill: #34D399; }
.diagram-muted { fill: #64748B; }
.diagram-text { fill: #F8FAFC; }
.diagram-line { stroke: #475569; stroke-width: 2; }
.diagram-arrow { fill: #475569; }
```

---

## Checklist: HTML Deliverable

Before finalizing any HTML deliverable:

### Brand Assets (CRITICAL)
- [ ] **No fabricated SVGs** - all visual elements from `shared/branding/assets/`
- [ ] **No inline patterns** - if pattern needed, reference externally or omit
- [ ] **No generated watermarks** - only use approved decorative elements
- [ ] If asset doesn't exist, asked user before creating substitute

### Logo
- [ ] Cover page uses full 7-path Safari logo
- [ ] All page headers use full 7-path Safari logo
- [ ] Logo SVG has `viewBox="0 0 430.7 86.02"`
- [ ] All 7 paths have `fill="#9B1C1C"`

### Styling
- [ ] Dark background (`#0F172A`) applied
- [ ] Safari Red (`#9B1C1C`) used for accents/borders
- [ ] Inter font for body text
- [ ] JetBrains Mono for code blocks
- [ ] Proper color contrast (WCAG AA minimum)
- [ ] `<code>` elements inside dark containers override color to white/light (not inherited safari-red)

### Layout
- [ ] Print-ready page dimensions (A4/Letter)
- [ ] Page breaks between sections
- [ ] Consistent header/footer on all pages
- [ ] Page numbers included

### Content
- [ ] No truncated tables or code blocks
- [ ] All diagrams render correctly
- [ ] Links are properly styled
- [ ] Confidentiality notice if required

---

## Diagram Components

For diagrams in HTML deliverables, use the **Safari HTML Diagram Component Library** instead of Mermaid.

### Why Inline SVG (Not Mermaid)

| Approach | Works in React | Works in HTML | Recommendation |
|----------|---------------|---------------|----------------|
| Mermaid CDN | Yes | No (unreliable) | Avoid in HTML exports |
| Inline SVG | Yes | Yes | **Use this** |
| External SVG | Yes | Partial (file:// issues) | Avoid |

### Component Library Reference

**Location:** `organizational-docs/shared/assets/diagrams/html-diagram-components.html`

Open this file in a browser to see live examples with copy-paste SVG snippets.

| Component | Use Case | Example |
|-----------|----------|---------|
| **Arrows** | Directional connections, data flow | Static, animated, bidirectional |
| **Boxes** | Components, systems, entities | Solid, gradient, outline, dashed |
| **Flow Steps** | Process sequences, numbered steps | Horizontal, vertical with labels |
| **Component Cards** | System components with descriptions | Gradient cards with role/desc |
| **Layer Diagrams** | Architecture tiers, stack visualization | Horizontal layers with labels |
| **Architecture Diagrams** | Multi-component systems | Source → Processor → Outputs |
| **Process Flows** | Decision trees, branching logic | Diamonds, branches, converge |
| **Badges** | Category labels, status indicators | Colored pills |

### Quick SVG Patterns

**Arrow with marker:**
```html
<svg width="200" height="50">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#9B1C1C"/>
    </marker>
  </defs>
  <line x1="20" y1="25" x2="180" y2="25" stroke="#9B1C1C" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>
```

**Rounded box with label:**
```html
<rect x="10" y="10" width="140" height="50" rx="8" fill="#9B1C1C"/>
<text x="80" y="40" fill="white" font-family="Poppins" font-size="12" font-weight="600" text-anchor="middle">Label</text>
```

**Animated data flow:**
```html
<line x1="20" y1="25" x2="180" y2="25" stroke="#60A5FA" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)">
  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.5s" repeatCount="indefinite"/>
</line>
```

### ID Namespacing (CRITICAL)

When embedding multiple SVGs in one HTML document, **namespace all IDs** to prevent collisions:

```html
<!-- Diagram 1 -->
<marker id="arrow-diagram1" ...>

<!-- Diagram 2 -->
<marker id="arrow-diagram2" ...>
```

Failure to namespace causes broken arrows and missing gradients.

---

## References

- **Safari Logo Source:** `organizational-docs/shared/branding/assets/logos/svg/safari-logo.svg`
- **Safari Theme:** `organizational-docs/shared/branding/assets/theme/SafariTheme.js`
- **Brand Standards:** `organizational-docs/shared/branding/STD-BRAND-*.md`
- **Diagram Components:** `organizational-docs/shared/assets/diagrams/html-diagram-components.html`
- **Production Code Standards:** `~/.claude/skills/safari-skills/production-code-standards/SKILL.md`
