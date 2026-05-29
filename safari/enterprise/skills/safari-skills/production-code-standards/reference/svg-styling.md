# Safari SVG Styling Guide

Reference for creating branded SVG diagrams, architecture visuals, and illustrations with Safari Circuits styling.

## When to Use SVG

| Use Case | Format | Notes |
|----------|--------|-------|
| Architecture diagrams | SVG | Scalable, editable, web-embeddable |
| Flowcharts | SVG | Clean lines, crisp text |
| System diagrams | SVG | Component boxes, connection arrows |
| Icons and logos | SVG | Always vector for brand assets |
| Data visualizations | SVG | Charts, graphs (consider D3.js) |

---

## Brand Asset Requirements (CRITICAL)

### Rule 1: NEVER Fabricate Visual Assets

**NEVER fabricate, generate, or create:**
- Safari logos or wordmarks
- Circuit board patterns
- Background decorations
- Visual patterns not in brand library

**Source all assets from:** `organizational-docs/shared/branding/assets/`

### Rule 2: Safari Logo in SVGs

When including the Safari logo, reference the source file:
- **Source:** `shared/branding/assets/logos/svg/safari-logo.svg`
- **Logo requires exactly 7 `<path>` elements with `fill="#9B1C1C"`**

---

## Color Palette

### Primary Colors

```xml
<!-- Safari Brand -->
<rect fill="#9B1C1C"/>  <!-- Safari Red - primary brand -->
<rect fill="#0F172A"/>  <!-- Dark Background -->

<!-- Phase/Status Colors -->
<rect fill="#60a5fa"/>  <!-- Blue - Phase 1 / Info -->
<rect fill="#34d399"/>  <!-- Green - Phase 2 / Success -->
<rect fill="#f59e0b"/>  <!-- Orange - Phase 4 / Warning -->
<rect fill="#a78bfa"/>  <!-- Purple - Phase 5 / Analytics -->
<rect fill="#ec4899"/>  <!-- Pink - Phase 6 / Special -->
```

### Background Options

| Theme | Background | Surface | Border |
|-------|------------|---------|--------|
| **Light** | `#FEFDFF` | `#FFFFFF` | `#E5E5E5` |
| **Dark** | `#0F172A` | `#1E293B` | `#475569` |

### Text Colors

| Theme | Primary | Secondary | Muted |
|-------|---------|-----------|-------|
| **Light** | `#1E1E1E` | `#2D2D2D` | `#6B7280` |
| **Dark** | `#F8FAFC` | `#E2E8F0` | `#94A3B8` |

---

## Typography in SVG

### Font Family

```xml
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap');
    text { font-family: 'Poppins', sans-serif; }
</style>
```

### Text Styles

```xml
<!-- Title (large) -->
<text font-size="24" font-weight="600" fill="#1E1E1E">Title</text>

<!-- Section Header -->
<text font-size="16" font-weight="600" fill="#9B1C1C">Section</text>

<!-- Body Text -->
<text font-size="12" font-weight="400" fill="#2D2D2D">Body text</text>

<!-- Label (small) -->
<text font-size="10" font-weight="500" fill="#6B7280" text-transform="uppercase">LABEL</text>

<!-- Caption -->
<text font-size="9" font-weight="300" fill="#94A3B8">Caption</text>
```

---

## Component Library

### Architecture Box

```xml
<!-- Component Box - Light Theme -->
<g class="component">
    <rect x="0" y="0" width="160" height="80" rx="8"
          fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>
    <rect x="0" y="0" width="4" height="80" rx="2" fill="#60a5fa"/>
    <text x="20" y="32" font-size="12" font-weight="600" fill="#1E1E1E">Component Name</text>
    <text x="20" y="50" font-size="10" font-weight="400" fill="#6B7280">Description</text>
</g>

<!-- Layer Box (spans width) -->
<g class="layer">
    <rect x="0" y="0" width="600" height="60" rx="6"
          fill="#F8F7F5" stroke="none"/>
    <rect x="0" y="0" width="4" height="60" fill="#60a5fa"/>
    <text x="20" y="24" font-size="10" font-weight="600" fill="#6B7280"
          text-transform="uppercase" letter-spacing="0.5">LAYER NAME</text>
</g>
```

### Connection Arrows

```xml
<!-- Arrow marker definition -->
<defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7"
            refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#9B1C1C"/>
    </marker>
    <marker id="arrowhead-gray" markerWidth="10" markerHeight="7"
            refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280"/>
    </marker>
</defs>

<!-- Primary connection (Safari Red) -->
<line x1="100" y1="50" x2="200" y2="50"
      stroke="#9B1C1C" stroke-width="2" marker-end="url(#arrowhead)"/>

<!-- Secondary connection (gray) -->
<line x1="100" y1="50" x2="200" y2="50"
      stroke="#6B7280" stroke-width="1.5" stroke-dasharray="4,2"
      marker-end="url(#arrowhead-gray)"/>
```

### Status Indicators

```xml
<!-- Status dot with label -->
<g class="status">
    <circle cx="8" cy="8" r="6" fill="#34d399"/>  <!-- Green = active -->
    <text x="20" y="12" font-size="11" fill="#2D2D2D">Active</text>
</g>

<!-- Phase badge -->
<g class="phase-badge">
    <rect x="0" y="0" width="32" height="32" rx="16" fill="#60a5fa"/>
    <text x="16" y="20" font-size="12" font-weight="700" fill="#FFFFFF"
          text-anchor="middle">P1</text>
</g>
```

### Data Flow Diagram

```xml
<!-- Source → Process → Destination pattern -->
<g class="data-flow">
    <!-- Source -->
    <rect x="0" y="20" width="100" height="50" rx="6"
          fill="#34d399" opacity="0.15" stroke="#34d399"/>
    <text x="50" y="50" text-anchor="middle" font-size="11" fill="#1E1E1E">Source</text>

    <!-- Arrow -->
    <line x1="110" y1="45" x2="170" y2="45"
          stroke="#9B1C1C" stroke-width="2" marker-end="url(#arrowhead)"/>

    <!-- Process -->
    <rect x="180" y="20" width="100" height="50" rx="6"
          fill="#60a5fa" opacity="0.15" stroke="#60a5fa"/>
    <text x="230" y="50" text-anchor="middle" font-size="11" fill="#1E1E1E">Process</text>

    <!-- Arrow -->
    <line x1="290" y1="45" x2="350" y2="45"
          stroke="#9B1C1C" stroke-width="2" marker-end="url(#arrowhead)"/>

    <!-- Destination -->
    <rect x="360" y="20" width="100" height="50" rx="6"
          fill="#a78bfa" opacity="0.15" stroke="#a78bfa"/>
    <text x="410" y="50" text-anchor="middle" font-size="11" fill="#1E1E1E">Destination</text>
</g>
```

---

## SVG Document Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 800 600"
     width="800" height="600">

    <!-- Styles -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap');
        text { font-family: 'Poppins', sans-serif; }
    </style>

    <!-- Definitions -->
    <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7"
                refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#9B1C1C"/>
        </marker>
    </defs>

    <!-- Background (optional) -->
    <rect width="100%" height="100%" fill="#FEFDFF"/>

    <!-- Title -->
    <text x="40" y="50" font-size="24" font-weight="600" fill="#1E1E1E">
        Diagram Title
    </text>

    <!-- Content goes here -->

    <!-- Footer -->
    <text x="40" y="580" font-size="9" fill="#94A3B8">
        Safari Circuits | January 2026
    </text>
</svg>
```

---

## Layer Color Coding

Use consistent colors for architecture layers:

| Layer Type | Color | Hex |
|------------|-------|-----|
| User/UI | Blue | `#60a5fa` |
| Application | Purple | `#a78bfa` |
| Context/Semantic | Safari Red | `#9B1C1C` |
| Streaming/Processing | Orange | `#f59e0b` |
| Data/Storage | Green | `#34d399` |
| Infrastructure | Gray | `#6B7280` |

---

## Export Guidelines

### For HTML embedding
- Use `viewBox` for responsive scaling
- Inline styles or `<style>` block for portability
- Optimize with SVGO before embedding

### For presentations
- Export at 2x resolution for retina
- Include white background if needed
- Font embedding or convert text to paths

### For print
- Convert text to outlines
- Use CMYK-safe colors where possible
- Embed all fonts

---

## Checklist: SVG Diagram

### Brand Compliance
- [ ] No fabricated logos or patterns
- [ ] Safari Red `#9B1C1C` used for primary accents
- [ ] Phase colors used consistently with HTML docs

### Typography
- [ ] Poppins font imported
- [ ] Text weights: 300 (body), 400 (regular), 600 (headers), 700 (badges)
- [ ] Text colors match theme (light or dark)

### Structure
- [ ] `viewBox` defined for scalability
- [ ] Markers defined in `<defs>` for arrows
- [ ] Consistent corner radius (`rx="6"` for small, `rx="8"` for medium)

### Accessibility
- [ ] `<title>` element for diagram name
- [ ] Sufficient contrast ratios
- [ ] Logical grouping with `<g>` elements

---

## Reference Files

- **Brand Colors:** `organizational-docs/shared/branding/README.md`
- **Safari Logo:** `organizational-docs/shared/branding/assets/logos/svg/safari-logo.svg`
- **Example SVGs:** `organizational-docs/shared/assets/diagrams/`
