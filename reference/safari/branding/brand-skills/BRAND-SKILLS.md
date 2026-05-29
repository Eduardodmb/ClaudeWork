---
title: Safari Brand Skills Reference
type: skill-collection
domain: branding
status: draft
created: 2026-01-20
author: Safari Circuits IT
tags: [branding, skills, ai, document-generation]
---

# Safari Brand Skills Reference

Comprehensive brand skills for AI-assisted document and artifact generation. Each skill defines rules for a specific file type.

## Quick Reference

### Color Palette

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Safari Red | `#9B1C1C` | `--safari-red` | Primary brand, logos, accents |
| Safari Red Light | `#B82424` | `--safari-red-light` | Hover states |
| Safari Red Dark | `#7B1616` | `--safari-red-dark` | Active states |
| Dark Background | `#0F172A` | `--dark-bg` | App backgrounds |
| Surface | `#1E293B` | `--surface` | Cards, panels |
| Elevated | `#243044` | `--elevated` | Dialogs, dropdowns |
| Blue | `#60A5FA` | `--blue` | Links, info |
| Green | `#34D399` | `--green` | Success, integration |
| Pink | `#F472B6` | `--pink` | Highlights |
| Purple | `#A78BFA` | `--purple` | Special |
| Amber | `#FBBF24` | `--amber` | Warnings |

### Typography

| Role | Font | Fallback |
|------|------|----------|
| Headings | Century Gothic | Inter, system-ui |
| Body | Century Gothic | Inter, system-ui |
| Code | JetBrains Mono | Consolas, monospace |

### Logo Assets

| Asset | File | When to Use |
|-------|------|-------------|
| Full Wordmark | `safari-logo.svg` | Headers, documents, large spaces |
| White Wordmark | `safari-logo-white.svg` | Dark backgrounds |
| Diamond S Icon | `safari-icon-diamond-s.svg` | Favicon, small spaces |
| Diamond S Red | `safari-icon-diamond-s-red.svg` | Red variant for icons |
| Circuit Circle | `safari-circle-circuit-red.svg` | Watermarks, decorative |

---

## HTML Documents (.html)

### brand-skill-html

```yaml
skill: brand-skill-html
version: 1.0
applies_to: [.html, .htm]

css_variables:
  required:
    - "--safari-red: #9B1C1C"
    - "--dark-bg: #0F172A"
    - "--surface: #1E293B"
    - "--text-primary: #F8FAFC"
    - "--text-secondary: #94A3B8"

structure:
  head:
    - meta charset UTF-8
    - meta viewport responsive
    - title with Safari prefix optional
    - embedded CSS variables
  body:
    - header with logo (if applicable)
    - main content area
    - footer with attribution

fonts:
  link: |
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  fallback: "Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"

logo_embedding:
  method: inline_svg
  source: organizational-docs/shared/branding/assets/logos/svg/
  never: fabricate or generate SVG patterns

background_patterns:
  allowed:
    - safari-circuit-board-pattern.svg
    - safari-circuit-board-pattern-red.svg
  method: CSS background-image with data URI or file reference
  opacity: 0.03 to 0.08 for subtle watermark

validation:
  - all colors from safari-palette.json
  - no inline color literals except from palette
  - all images from assets folder
  - responsive design required
```

### Example CSS Block

```css
:root {
  /* Safari Brand Colors */
  --safari-red: #9B1C1C;
  --safari-red-light: #B82424;
  --safari-red-dark: #7B1616;

  /* Dark Theme */
  --background: #0F172A;
  --surface: #1E293B;
  --elevated: #243044;
  --border: #334155;

  /* Text */
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;

  /* Technical Colors */
  --blue: #60A5FA;
  --green: #34D399;
  --pink: #F472B6;
  --purple: #A78BFA;
  --amber: #FBBF24;
}
```

---

## SVG Graphics (.svg)

### brand-skill-svg

```yaml
skill: brand-skill-svg
version: 1.0
applies_to: [.svg]

colors:
  fill_colors:
    - "#9B1C1C"  # Safari Red
    - "#FFFFFF"  # White
    - "#0F172A"  # Dark Background
    - "#60A5FA"  # Blue
    - "#34D399"  # Green
  stroke_colors: same as fill
  never:
    - "#FF0000"  # Pure red
    - "#000000"  # Pure black (use #0F172A)
    - Any color not in palette

structure:
  required:
    - xmlns attribute
    - viewBox attribute
    - accessible title element
  optional:
    - style block for responsive colors
    - aria-label for accessibility

css_classes:
  pattern: "safari-{element}-{color}"
  examples:
    - "safari-fill-red"
    - "safari-stroke-white"
    - "safari-bg-dark"

validation:
  - all fill/stroke from palette
  - viewBox proportions maintained
  - no embedded raster images
  - no external references
```

---

## PowerPoint (.pptx)

### brand-skill-pptx

```yaml
skill: brand-skill-pptx
version: 1.0
applies_to: [.pptx, .pptm, .potx]

theme:
  name: "Safari 2024"
  colors:
    dk1: "#000000"
    lt1: "#FFFFFF"
    dk2: "#464646"
    lt2: "#FFFFFF"
    accent1: "#9B1C1C"  # Safari Red
    accent2: "#0F172A"  # Dark Background
    accent3: "#60A5FA"  # Blue
    accent4: "#34D399"  # Green
    accent5: "#F472B6"  # Pink
    accent6: "#FBBF24"  # Amber
    hlink: "#60A5FA"
    folHlink: "#A78BFA"
  fonts:
    major: "Century Gothic"
    minor: "Century Gothic"

slide_masters:
  title_slide:
    - Logo placement: bottom-right
    - Background: dark gradient or solid
  content_slide:
    - Header: Century Gothic Bold
    - Body: Century Gothic Regular
  section_divider:
    - Large title with circuit pattern background

assets_to_embed:
  - safari-logo.svg (red for light backgrounds)
  - safari-logo-white.svg (for dark backgrounds)
  - safari-circuit-board-pattern.svg (backgrounds)

validation:
  - theme colors match brand
  - fonts are Century Gothic
  - logo colors correct
  - no stock photos without approval
```

---

## Power BI (.pbit, .pbix)

### brand-skill-powerbi

```yaml
skill: brand-skill-powerbi
version: 1.0
applies_to: [.pbit, .pbix]

theme_json:
  name: "Safari Analytics"
  dataColors:
    - "#9B1C1C"  # Safari Red (primary)
    - "#60A5FA"  # Blue
    - "#34D399"  # Green
    - "#F472B6"  # Pink
    - "#A78BFA"  # Purple
    - "#FBBF24"  # Amber
    - "#B82424"  # Red Light
    - "#7B1616"  # Red Dark

  background: "#0F172A"
  foreground: "#F8FAFC"
  tableAccent: "#9B1C1C"

  visualStyles:
    "*":
      background:
        - color: "#1E293B"
      border:
        - color: "#334155"
      title:
        - fontFamily: "Century Gothic"
        - fontSize: 14
        - color: "#F8FAFC"

visuals:
  cards:
    background: "#1E293B"
    border: "#334155"
    calloutValue: "#9B1C1C"

  charts:
    axisColor: "#94A3B8"
    gridlineColor: "#334155"
    labelColor: "#F8FAFC"

logo_placement:
  position: "top-right or bottom-right"
  asset: "safari-icon-diamond-s.svg"
  size: "40x40 px max"

validation:
  - all data colors from palette
  - dark theme backgrounds
  - Safari font or fallback
  - logo properly sized
```

### Power BI Theme JSON Template

```json
{
  "name": "Safari Analytics",
  "dataColors": [
    "#9B1C1C", "#60A5FA", "#34D399",
    "#F472B6", "#A78BFA", "#FBBF24"
  ],
  "background": "#0F172A",
  "foreground": "#F8FAFC",
  "tableAccent": "#9B1C1C",
  "textClasses": {
    "title": {
      "fontFace": "Century Gothic",
      "color": "#F8FAFC"
    },
    "label": {
      "fontFace": "Century Gothic",
      "color": "#94A3B8"
    }
  }
}
```

---

## CSS Stylesheets (.css)

### brand-skill-css

```yaml
skill: brand-skill-css
version: 1.0
applies_to: [.css, .scss, .less]

custom_properties:
  required_prefix: "--safari-" or "--sf-"
  color_variables: from safari-palette.json
  spacing: 4px base unit

structure:
  organization:
    1. CSS custom properties (variables)
    2. Reset/normalize
    3. Base typography
    4. Layout utilities
    5. Components
    6. Utilities

naming:
  convention: BEM or utility-first
  component_prefix: "sf-"
  examples:
    - ".sf-button"
    - ".sf-card"
    - ".sf-header"

validation:
  - no magic color values
  - all colors via variables
  - responsive breakpoints consistent
  - accessibility contrast ratios met
```

---

## JavaScript/JSX (.js, .jsx, .ts, .tsx)

### brand-skill-js

```yaml
skill: brand-skill-js
version: 1.0
applies_to: [.js, .jsx, .ts, .tsx]

theme_object:
  export_name: "safariTheme" or "theme"
  structure:
    colors:
      primary: "#9B1C1C"
      background: "#0F172A"
      # ... full palette
    fonts:
      heading: "Century Gothic, Inter, sans-serif"
      body: "Century Gothic, Inter, sans-serif"
    spacing:
      unit: 4
      scale: [0, 4, 8, 12, 16, 24, 32, 48, 64]

css_in_js:
  framework_support:
    - styled-components
    - emotion
    - tailwind
  pattern: theme tokens, not raw values

component_props:
  color_props: accept theme keys, not hex values
  variant_props: "primary" | "secondary" | "dark"

validation:
  - no hardcoded colors
  - theme imported from central location
  - TypeScript types for theme
```

---

## PDF Documents (.pdf)

### brand-skill-pdf

```yaml
skill: brand-skill-pdf
version: 1.0
applies_to: [.pdf]

generation_method:
  preferred: HTML to PDF conversion
  tools: puppeteer, wkhtmltopdf, Prince

color_space:
  digital: sRGB
  print: CMYK conversion required
  cmyk_equivalents:
    safari_red: "C:0 M:82 Y:82 K:39"

layout:
  margins: 0.75in all sides
  header:
    - Safari logo (left or right)
    - Document title
    - Page numbers
  footer:
    - Copyright
    - Confidentiality notice (if applicable)

fonts:
  embedded: required for brand fonts
  fallback: system fonts if embedding fails

validation:
  - vector graphics preferred
  - images 300 DPI minimum for print
  - fonts embedded or outlined
  - accessibility tags (PDF/UA)
```

---

## Word Documents (.docx)

### brand-skill-docx

```yaml
skill: brand-skill-docx
version: 1.0
applies_to: [.docx, .doc]

styles:
  heading1:
    font: "Century Gothic"
    size: 24pt
    color: "#9B1C1C"
    spacing_after: 12pt
  heading2:
    font: "Century Gothic"
    size: 18pt
    color: "#0F172A"
  body:
    font: "Century Gothic"
    size: 11pt
    color: "#333333"
    line_spacing: 1.15

theme:
  colors: match PowerPoint theme
  fonts: Century Gothic throughout

header_footer:
  header:
    - Safari logo (small, right-aligned)
  footer:
    - Page numbers
    - Document title

cover_page:
  background: dark or with circuit pattern
  logo: centered or bottom-right
  title: large, Safari Red or white

validation:
  - consistent styles throughout
  - no direct formatting (use styles)
  - images properly positioned
  - tables use brand colors
```

---

## Excel Spreadsheets (.xlsx)

### brand-skill-xlsx

```yaml
skill: brand-skill-xlsx
version: 1.0
applies_to: [.xlsx, .xls]

cell_styles:
  header_row:
    background: "#9B1C1C"
    font_color: "#FFFFFF"
    font: "Century Gothic Bold"
    font_size: 11pt
  data_rows:
    alternating: "#FFFFFF" / "#F5F5F0"
    font: "Century Gothic"
    font_size: 10pt
  total_row:
    background: "#0F172A"
    font_color: "#FFFFFF"
    font: "Century Gothic Bold"

charts:
  colors: from safari-palette dataColors
  background: "#FFFFFF" or "#0F172A"
  gridlines: "#E5E5E5" or "#334155"
  font: "Century Gothic"

conditional_formatting:
  positive: "#34D399" (green)
  negative: "#9B1C1C" (red)
  neutral: "#60A5FA" (blue)
  warning: "#FBBF24" (amber)

validation:
  - header formatting applied
  - chart colors from palette
  - no rainbow color schemes
  - print area defined
```

---

## Images (.png, .jpg)

### brand-skill-img

```yaml
skill: brand-skill-img
version: 1.0
applies_to: [.png, .jpg, .jpeg, .webp]

specifications:
  logo_exports:
    format: PNG with transparency
    resolution: 2x for retina
    sizes: [16, 32, 64, 128, 256, 512]

  social_media:
    og_image: 1200x630
    twitter_card: 1200x675
    linkedin: 1200x627

  documentation:
    max_width: 1200px
    format: PNG for screenshots, JPEG for photos

color_profile:
  required: sRGB IEC61966-2.1
  embed_profile: yes

compression:
  png: maximum compression
  jpeg: quality 85
  webp: quality 80

validation:
  - color profile embedded
  - dimensions appropriate for use
  - file size optimized
  - alt text documented
```

---

## Validation Checklist

All generated artifacts must pass:

- [ ] Colors from `safari-palette.json` only
- [ ] Fonts from approved list only
- [ ] Logo assets from brand library only
- [ ] No fabricated patterns or graphics
- [ ] Accessibility requirements met
- [ ] File optimized for intended use

## Related

- [Brand Artifact Review Pipeline](./brand-artifact-review-pipeline.md)
- [Safari Palette JSON](./assets/colors/safari-palette.json)
- [PowerPoint Extraction Report](./pptx-brand-extraction-report.md)
