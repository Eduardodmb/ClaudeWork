# Safari PDF Styling Guide

Reference for creating branded PDF documents with Safari Circuits styling. PDFs are typically generated from HTML or Word, so this guide focuses on source formatting.

## Generation Methods

| Method | Use Case | Tool |
|--------|----------|------|
| HTML → PDF | Technical docs, reports | Browser print, Puppeteer |
| Word → PDF | Business docs, proposals | Microsoft Word |
| Markdown → PDF | Developer docs | Pandoc, VS Code |
| PowerPoint → PDF | Presentations | Microsoft PowerPoint |

**Recommended:** Generate from HTML for maximum brand control.

---

## Brand Asset Requirements

### NEVER Fabricate Visual Assets

**All logos and visual elements must come from:**
`organizational-docs/shared/branding/assets/`

### Safari Logo

- **Source:** `shared/branding/assets/logos/svg/safari-logo.svg`
- **For Word/PowerPoint:** Use PNG version at 300 DPI minimum
- **Logo requires exactly 7 paths** - verify before use

---

## Page Setup

### Document Dimensions

| Paper Size | Width | Height | Use Case |
|------------|-------|--------|----------|
| Letter | 8.5" | 11" | Standard US docs |
| A4 | 210mm | 297mm | International |
| Presentation | 16:9 | - | Slides export |

### Margins

| Area | Measurement |
|------|-------------|
| Top | 1" (25mm) |
| Bottom | 1" (25mm) |
| Left | 1.25" (32mm) |
| Right | 1" (25mm) |

---

## Color Specifications

### Print-Safe Colors (CMYK Approximations)

| Color Name | Hex (Screen) | CMYK (Print) | Use |
|------------|--------------|--------------|-----|
| Safari Red | `#9B1C1C` | C:15 M:95 Y:90 K:20 | Primary brand |
| Dark Blue | `#0F172A` | C:85 M:75 Y:45 K:70 | Backgrounds |
| Phase Blue | `#60a5fa` | C:60 M:25 Y:0 K:0 | Accents |
| Phase Green | `#34d399` | C:65 M:0 Y:50 K:0 | Success |

### Background Colors

| Theme | Background | Notes |
|-------|------------|-------|
| Light | `#FEFDFF` (white) | Default for print |
| Dark | `#0F172A` | Use sparingly - ink heavy |

---

## Typography

### Primary Font: Poppins

| Style | Weight | Size | Use |
|-------|--------|------|-----|
| Title | 600 (SemiBold) | 28-32pt | Document title |
| H1 | 600 (SemiBold) | 20-24pt | Section headers |
| H2 | 600 (SemiBold) | 16-18pt | Subsections |
| H3 | 600 (SemiBold) | 13-14pt | Minor headers |
| Body | 300 (Light) | 10-11pt | Main text |
| Caption | 300 (Light) | 8-9pt | Footnotes, captions |

### Fallback Fonts

If Poppins unavailable:
1. **Segoe UI** (Windows)
2. **SF Pro** (macOS)
3. **Arial** (Universal fallback)

### Line Spacing

- Body text: 1.5x - 1.8x line height
- Headers: 1.2x line height
- Lists: 1.4x line height

---

## Document Structure

### Cover Page Elements

1. **Safari Logo** - Centered, 2-3" wide
2. **Document Title** - 28-32pt, centered
3. **Subtitle** - 14-16pt, muted color
4. **Divider Line** - Safari Red, 2-3" wide
5. **Metadata** - Date, classification, version

### Header (Pages 2+)

```
[Safari Logo (small)]          [Document Title]
─────────────────────────────────────────────
```

- Logo height: 0.3-0.4"
- Title: 9pt, right-aligned, muted gray
- Red underline: 2pt, Safari Red

### Footer

```
                                 Page X of Y
Safari Circuits | Month Year | Classification
```

- 8-9pt, muted gray
- Center or left-aligned

---

## Component Styling

### Tables

| Element | Style |
|---------|-------|
| Header row | Light gray background `#F8F7F5`, bold text |
| Body rows | Alternating white/light gray |
| Borders | Light gray `#E5E5E5`, 0.5pt |
| Cell padding | 8-12pt |

### Callout Boxes

- Left border: 4pt, Safari Red
- Background: 5% Safari Red tint
- Padding: 12-16pt
- Corner radius: 4pt (if supported)

### Bullet Lists

- Use `→` or `•` as bullet character
- Bullet color: Safari Red
- Indent: 0.25"
- Item spacing: 6pt

### Code Blocks

- Font: Consolas or Courier New
- Size: 9pt
- Background: Light gray `#F8F7F5`
- Border: 1pt light gray
- Padding: 8pt

---

## Image Guidelines

### Resolution Requirements

| Output | Minimum DPI |
|--------|-------------|
| Screen/web PDF | 150 DPI |
| Standard print | 300 DPI |
| High-quality print | 600 DPI |

### Image Placement

- Full-width images: Use 100% page width within margins
- Inline images: Wrap text, 8pt spacing
- Diagrams: Center, caption below
- Screenshots: Add 1pt gray border

---

## PDF Export Settings

### From HTML (Browser)

```css
@media print {
    body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    .cover { page-break-after: always; }
    .section { page-break-before: always; }
    .no-break { page-break-inside: avoid; }
}
```

### From Word

- **Format:** PDF/A (for archival) or Standard PDF
- **Quality:** High quality print
- **Embed fonts:** Yes (always)
- **Bookmarks:** Create from headings

### Compression

| Use Case | Quality Setting |
|----------|-----------------|
| Email/web | Smaller file size |
| Print | High quality |
| Archive | PDF/A, no compression |

---

## Accessibility

### Required Elements

- [ ] Document title in PDF properties
- [ ] Tagged PDF structure
- [ ] Alt text for all images
- [ ] Logical reading order
- [ ] Bookmarks from headings

### Contrast Requirements

- Body text: 4.5:1 minimum against background
- Large text (18pt+): 3:1 minimum
- Safari Red on white: ✓ passes (7.2:1)

---

## Checklist: PDF Document

### Brand Compliance
- [ ] Safari logo from official assets (not fabricated)
- [ ] Logo has all 7 paths (verify PNG quality)
- [ ] Safari Red `#9B1C1C` for accents
- [ ] Poppins font or approved fallback

### Structure
- [ ] Cover page with logo, title, metadata
- [ ] Headers on pages 2+
- [ ] Page numbers in footer
- [ ] Classification label if required

### Quality
- [ ] Images at 300 DPI minimum
- [ ] Fonts embedded
- [ ] PDF/A if archival
- [ ] Bookmarks from headings

### Accessibility
- [ ] Document title set
- [ ] Alt text on images
- [ ] Tagged structure
- [ ] Contrast verified

---

## Reference Files

- **HTML Source Template:** Use `html-deliverable-styling.md` patterns
- **Safari Logo (print):** `shared/branding/assets/logos/png/`
- **Brand Guidelines:** `shared/branding/README.md`
