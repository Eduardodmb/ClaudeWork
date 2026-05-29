# Safari Word Document (DOCX) Styling Guide

Reference for creating branded Microsoft Word documents with Safari Circuits styling.

## When to Use Word

| Use Case | Format | Notes |
|----------|--------|-------|
| Business proposals | DOCX | Editable by stakeholders |
| Contracts/agreements | DOCX | Legal review needs Word |
| Collaborative docs | DOCX | Track changes support |
| Templates | DOTX | Reusable formatting |

**For web delivery or technical docs, prefer HTML.**

---

## Brand Asset Requirements

### NEVER Fabricate Visual Assets

**All logos must come from:**
`organizational-docs/shared/branding/assets/logos/png/`

### Safari Logo for Word

- **Recommended format:** PNG (300 DPI)
- **Source:** `shared/branding/assets/logos/png/safari-logo.png`
- **Size:** 2-3" wide for cover, 0.5" for header

---

## Document Setup

### Page Layout

| Setting | Value |
|---------|-------|
| Paper size | Letter (8.5" x 11") |
| Orientation | Portrait |
| Top margin | 1" |
| Bottom margin | 1" |
| Left margin | 1.25" |
| Right margin | 1" |

### Custom Colors (Add to Theme)

| Name | Hex | RGB |
|------|-----|-----|
| Safari Red | `#9B1C1C` | 155, 28, 28 |
| Dark Background | `#0F172A` | 15, 23, 42 |
| Phase Blue | `#60a5fa` | 96, 165, 250 |
| Phase Green | `#34d399` | 52, 211, 153 |
| Surface Gray | `#F8F7F5` | 248, 247, 245 |
| Text Primary | `#1E1E1E` | 30, 30, 30 |
| Text Muted | `#6B7280` | 107, 114, 128 |

---

## Typography Styles

### Font Setup

**Primary:** Poppins (download from Google Fonts)
**Fallback:** Segoe UI, Calibri

### Style Definitions

| Style | Font | Size | Weight | Color | Spacing After |
|-------|------|------|--------|-------|---------------|
| Title | Poppins | 28pt | SemiBold | Text Primary | 24pt |
| Heading 1 | Poppins | 20pt | SemiBold | Text Primary | 18pt |
| Heading 2 | Poppins | 14pt | SemiBold | Safari Red | 12pt |
| Heading 3 | Poppins | 12pt | SemiBold | Text Primary | 10pt |
| Normal | Poppins | 11pt | Light | Text Primary | 8pt |
| Caption | Poppins | 9pt | Light | Text Muted | 6pt |

### Line Spacing

- Body text: 1.5 lines
- Headers: 1.15 lines (single with spacing after)
- Lists: 1.15 lines

---

## Document Structure

### Cover Page

```
┌─────────────────────────────────────────┐
│                                         │
│          [Safari Logo - 2.5"]           │
│                                         │
│         DOCUMENT TITLE                  │
│         Subtitle or Description         │
│                                         │
│         ─────────────────               │
│         (Safari Red line)               │
│                                         │
│         Safari Circuits                 │
│         Month Year                      │
│         Classification                  │
│                                         │
└─────────────────────────────────────────┘
```

### Header (Pages 2+)

- Left: Safari logo (0.4" height)
- Right: Document title (9pt, Text Muted)
- Bottom border: 1pt Safari Red line

### Footer

- Center: Page X of Y (9pt, Text Muted)
- Left: "Safari Circuits | Month Year"
- Right: Classification (if applicable)

---

## Component Styling

### Tables

**Header Row:**
- Background: Surface Gray `#F8F7F5`
- Font: 10pt, SemiBold
- Borders: 0.5pt, `#E5E5E5`

**Body Rows:**
- Alternating: White / Surface Gray
- Font: 10pt, Light
- Cell padding: 0.08"

**Table Style Settings:**
- Border style: Single, 0.5pt
- Border color: `#E5E5E5`
- First column: Optional bold

### Callout Box (Text Box)

- Width: Full margin width
- Border: Left only, 4pt, Safari Red
- Fill: 5% Safari Red tint
- Padding: 12pt all sides
- Font: Normal style

### Bullet Lists

```
→ First level bullet (Safari Red →)
    • Second level (standard bullet)
        ○ Third level (hollow circle)
```

- First level: Tab 0.25"
- Second level: Tab 0.5"
- Spacing: 6pt between items

### Numbered Lists

```
1. First item
   a. Sub-item
   b. Sub-item
2. Second item
```

- Numbers: Safari Red color
- Spacing: 8pt between major items

---

## Quick Parts / Building Blocks

### Create These Reusable Elements

1. **Cover Page** - Save as Quick Part
2. **Header/Footer** - Save to gallery
3. **Callout Box** - Text box with formatting
4. **Table Style** - "Safari Table"
5. **Phase Card** - Formatted text box

### Inserting Quick Parts

`Insert → Quick Parts → [Select element]`

---

## Image Guidelines

### Logo Placement

| Location | Width | Alignment |
|----------|-------|-----------|
| Cover | 2-3" | Center |
| Header | 0.5" | Left |
| Footer | 0.4" | Center |

### Diagram/Screenshot Rules

- Insert at 100% size, then resize
- Right-click → Size and Position → Lock aspect ratio
- Add 1pt gray border to screenshots
- Caption: Below image, Caption style

---

## Template Creation

### Save as Template

1. Set up all styles, headers, footers
2. File → Save As → Word Template (.dotx)
3. Save to: `organizational-docs/shared/templates/`

### Template Contents

```
safari-document-template.dotx
├── Cover page (Section 1)
├── Body section (Section 2)
│   ├── Header with logo
│   ├── Footer with pagination
│   └── All custom styles
└── Theme colors embedded
```

---

## Exporting

### To PDF

1. File → Export → Create PDF/XPS
2. Options:
   - Optimize for: Standard (for quality)
   - ✓ Create bookmarks using Headings
   - ✓ Document properties
   - ✓ PDF/A compliant (for archival)

### For Collaboration

- Save as .docx for editing
- Enable Track Changes if needed
- Protect with password if sensitive

---

## Checklist: Word Document

### Setup
- [ ] Poppins font installed (or fallback defined)
- [ ] Custom colors added to theme
- [ ] Page margins set correctly
- [ ] Section breaks for cover vs body

### Brand Compliance
- [ ] Safari logo from official PNG assets
- [ ] Logo at correct size (2-3" cover, 0.5" header)
- [ ] Safari Red `#9B1C1C` for accents
- [ ] No fabricated visual elements

### Styles Applied
- [ ] Title style on document title
- [ ] Heading 1/2/3 styles used consistently
- [ ] Normal style for body text
- [ ] Table uses Safari Table style

### Structure
- [ ] Cover page with logo, title, date
- [ ] Header on pages 2+
- [ ] Footer with page numbers
- [ ] Table of contents (if 5+ pages)

---

## Reference Files

- **Safari Logo PNG:** `shared/branding/assets/logos/png/safari-logo.png`
- **Template Location:** `shared/templates/safari-document-template.dotx`
- **Brand Guidelines:** `shared/branding/README.md`
