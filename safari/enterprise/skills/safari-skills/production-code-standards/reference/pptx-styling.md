# Safari PowerPoint (PPTX) Styling Guide

Reference for creating branded PowerPoint presentations with Safari Circuits styling.

## When to Use PowerPoint

| Use Case | Format | Notes |
|----------|--------|-------|
| Executive presentations | PPTX | Board, leadership |
| External pitches | PPTX | Clients, partners |
| Training materials | PPTX | Step-by-step content |
| Conference talks | PPTX | Speaker support |

---

## Brand Asset Requirements

### NEVER Fabricate Visual Assets

**All visual elements must come from:**
`organizational-docs/shared/branding/assets/`

### Safari Logo for PowerPoint

- **Format:** PNG (transparent background)
- **Source:** `shared/branding/assets/logos/png/safari-logo.png`
- **White version:** `shared/branding/assets/logos/png/safari-logo-white.png` (for dark slides)

---

## Slide Setup

### Dimensions

| Aspect Ratio | Width | Height | Use Case |
|--------------|-------|--------|----------|
| **16:9** (Default) | 13.33" | 7.5" | Modern screens |
| 4:3 | 10" | 7.5" | Legacy projectors |

### Theme Colors

Set in **Design → Variants → Colors → Customize**:

| Slot | Color | Hex | Use |
|------|-------|-----|-----|
| Dark 1 | Dark Background | `#0F172A` | Dark slide background |
| Light 1 | Off-white | `#FEFDFF` | Light background, text on dark |
| Dark 2 | Text Primary | `#1E1E1E` | Body text on light |
| Light 2 | Surface | `#F8F7F5` | Alternate backgrounds |
| Accent 1 | Safari Red | `#9B1C1C` | Primary accent |
| Accent 2 | Phase Blue | `#60a5fa` | Secondary accent |
| Accent 3 | Phase Green | `#34d399` | Tertiary accent |
| Accent 4 | Phase Orange | `#f59e0b` | Warning/attention |
| Accent 5 | Phase Purple | `#a78bfa` | Analytics/special |
| Accent 6 | Phase Pink | `#ec4899` | Special/creative |

---

## Typography

### Font Setup

**Primary:** Poppins
**Fallback:** Segoe UI

### Text Styles

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Slide Title | Poppins | 44pt | SemiBold |
| Section Title | Poppins | 60pt | Bold |
| Body | Poppins | 18-24pt | Light |
| Bullets | Poppins | 20pt | Light |
| Caption | Poppins | 14pt | Light |
| Footer | Poppins | 10pt | Light |

### Text Color Rules

| Background | Title Color | Body Color |
|------------|-------------|------------|
| Light (`#FEFDFF`) | `#1E1E1E` | `#2D2D2D` |
| Dark (`#0F172A`) | `#F8FAFC` | `#E2E8F0` |

---

## Slide Layouts

### 1. Title Slide (Dark)

```
┌─────────────────────────────────────────────────┐
│ [Background: #0F172A]                           │
│                                                 │
│              [Safari Logo - white]              │
│                                                 │
│          PRESENTATION TITLE                     │
│          Subtitle or occasion                   │
│                                                 │
│          ─────────────────                      │
│          (Safari Red line)                      │
│                                                 │
│          Presenter Name | Date                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 2. Section Divider (Dark)

```
┌─────────────────────────────────────────────────┐
│ [Background: #0F172A]                           │
│                                                 │
│    01                                           │
│    SECTION NAME                                 │
│    ───────────                                  │
│                                                 │
│                             [small Safari logo] │
└─────────────────────────────────────────────────┘
```

### 3. Content Slide (Light)

```
┌─────────────────────────────────────────────────┐
│ [Safari logo]                    SECTION TITLE  │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Slide Title                                     │
│                                                 │
│ • Bullet point one                              │
│ • Bullet point two                              │
│ • Bullet point three                            │
│                                                 │
│                                                 │
│ Footer text                              Page # │
└─────────────────────────────────────────────────┘
```

### 4. Two-Column Layout

```
┌─────────────────────────────────────────────────┐
│ Slide Title                                     │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Left Column            │  Right Column          │
│                        │                        │
│ • Point A              │  [Image or diagram]    │
│ • Point B              │                        │
│ • Point C              │                        │
│                        │                        │
└─────────────────────────────────────────────────┘
```

### 5. Metric/KPI Slide

```
┌─────────────────────────────────────────────────┐
│ Key Metrics                                     │
│ ─────────────────────────────────────────────── │
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │   85%   │  │   120   │  │  $1.2M  │         │
│  │ Metric 1│  │ Metric 2│  │ Metric 3│         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                                                 │
│  Description or context below                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Component Styling

### Shapes

| Element | Fill | Border | Corner Radius |
|---------|------|--------|---------------|
| Content box | White or Light 2 | None or 1pt gray | 8pt |
| Accent box | Safari Red @ 10% | 4pt left Safari Red | 0 |
| Metric card | Dark gradient | None | 10pt |

### Metric Cards

```
Background: Linear gradient #0F172A → #1E293B
Value: 36pt, Bold, Phase Green
Label: 12pt, Light, #94A3B8
Padding: 20pt
Border radius: 10pt
```

### Bullet Points

- Level 1: `→` (Safari Red) | 20pt | 0.5" indent
- Level 2: `•` (Phase Blue) | 18pt | 1" indent
- Level 3: `–` (Text Muted) | 16pt | 1.5" indent

### Tables

- Header: Surface Gray background, SemiBold
- Rows: Alternating white/light gray
- Borders: 0.5pt, `#E5E5E5`
- Cell padding: 8pt

### Charts

- Use theme accent colors
- Remove gridlines or make very light
- Data labels: 10-12pt, outside bars
- Legend: Below chart, 10pt

---

## Animations (Use Sparingly)

### Recommended

| Animation | Use | Duration |
|-----------|-----|----------|
| Fade | General entrance | 0.3s |
| Appear | Quick reveals | Instant |
| Wipe | Sequential reveals | 0.5s |

### Avoid

- Fly in (too dated)
- Bounce/Spin (unprofessional)
- Complex motion paths
- Sound effects

---

## Master Slide Setup

### Required Masters

1. **Title Slide** - Dark background, centered logo
2. **Section Header** - Dark, large section number
3. **Title and Content** - Light, left-aligned title
4. **Two Content** - Two-column layout
5. **Comparison** - Side-by-side comparison
6. **Blank** - Just header/footer
7. **Closing Slide** - Dark, thank you/contact

### Footer Configuration

- Left: Custom text (company name)
- Center: (leave empty or date)
- Right: Slide number
- Apply to all slides

---

## Image Guidelines

### Resolution

- Minimum: 150 DPI for screen
- Recommended: 300 DPI for flexibility
- Maximum file size: 5MB per image

### Placement Rules

- Full-bleed images: Extend to slide edge
- Framed images: 8pt padding from edge
- Screenshots: Add subtle drop shadow

### Icons

- Use simple line icons
- Single color (Safari Red or match section)
- Size: 48-72pt for emphasis icons

---

## Exporting

### To PDF

1. File → Export → Create PDF/XPS
2. Options: Full quality, embed fonts

### To Video

1. File → Export → Create a Video
2. Resolution: 1080p or 4K
3. Timing: 5 seconds per slide (or recorded)

### Sharing

- Save as .pptx for editing
- Save as .pdf for read-only
- Compress images before sharing large decks

---

## Checklist: PowerPoint Presentation

### Setup
- [ ] 16:9 aspect ratio
- [ ] Theme colors configured
- [ ] Poppins font installed
- [ ] Master slides customized

### Brand Compliance
- [ ] Safari logo from official assets
- [ ] White logo on dark slides
- [ ] Red logo on light slides
- [ ] No fabricated visual elements

### Content
- [ ] Title slide with logo, title, date
- [ ] Section dividers between major topics
- [ ] Consistent bullet formatting
- [ ] Speaker notes if presenting

### Visual Quality
- [ ] Images at 150+ DPI
- [ ] Charts use theme colors
- [ ] Minimal animations
- [ ] Footer on all content slides

---

## Reference Files

- **Safari Logo (red):** `shared/branding/assets/logos/png/safari-logo.png`
- **Safari Logo (white):** `shared/branding/assets/logos/png/safari-logo-white.png`
- **Template:** `shared/templates/safari-presentation-template.pptx`
- **Brand Guidelines:** `shared/branding/README.md`
