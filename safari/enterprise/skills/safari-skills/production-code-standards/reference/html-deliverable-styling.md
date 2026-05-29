# Safari HTML Deliverable Styling Guide

Reference for creating branded HTML deliverables (whitepapers, guides, reports, roadmaps) with Safari Circuits styling.

## Theme Selection

Safari supports TWO official themes for different contexts:

| Theme | Use Case | Background | Primary Text |
|-------|----------|------------|--------------|
| **Light** | Internal docs, roadmaps, reports | `#FEFDFF` | `#1E1E1E` |
| **Dark** | Presentations, external whitepapers | `#0F172A` | `#F8FAFC` |

**Default:** Use Light theme unless presenting to external audience or creating slides.

---

## Brand Asset Requirements (CRITICAL)

### Rule 1: NEVER Fabricate Visual Assets

**NEVER fabricate, generate, or create inline SVGs for:**
- Logos
- Patterns or watermarks
- Circuit board designs
- Background decorations
- Icons or visual elements

**Why:** Fabricated assets create brand inconsistency and often look unprofessional.

### Rule 2: Use Only Approved Brand Assets

All visual elements must come from `organizational-docs/shared/branding/assets/`:

| Asset Type | Location | Notes |
|------------|----------|-------|
| Logos | `assets/logos/svg/` | Use `safari-logo.svg` (full wordmark) |
| Patterns | `assets/patterns/` | Large files - reference externally or omit |
| Icons | `assets/logos/svg/` | Use `safari-icon-diamond-s.svg` |

**If an asset doesn't exist:** Ask the user before proceeding. Do not create a substitute.

---

## Safari Logo Requirements (CRITICAL)

**NEVER fabricate or truncate the Safari logo SVG.** Always use the complete 7-path logo.

The Safari wordmark logo requires **exactly 7 `<path>` elements** with `fill="#9B1C1C"`. Incomplete logos (2-3 paths) will render as broken characters resembling "SA /" instead of "SAFARI".

**Source file:** `organizational-docs/shared/branding/assets/logos/svg/safari-logo.svg`

### GENERATION RULE (MANDATORY)

**When generating ANY HTML deliverable, you MUST read the source SVG file** at `organizational-docs/shared/branding/assets/logos/svg/safari-logo.svg` **BEFORE writing the HTML.** Do NOT reproduce the logo from memory. The SVG contains 7 complex path elements that are easily truncated during generation. Every logo instance in the document (cover, page headers, footer) must have all 7 paths.

**Common failure mode:** Claude truncates to 2-3 paths to save tokens, producing only the "A", "S", and "I" letterforms. This renders as "SA /" instead of "SAFARI". This happens on page-header logos while the cover logo is correct — because the cover is written first (when context is fresh) and headers are generated later (when the model is cutting corners).

**Prevention:** Copy the full SVG from the source file for the FIRST logo instance, then copy-paste that same block for every subsequent logo in the document. Never re-type or abbreviate.

**Full inline SVG (copy exactly — all 7 paths required):**

```html
<!-- Safari Logo - MUST have all 7 paths. NEVER truncate. -->
<svg viewBox="0 0 430.7 85.9" xmlns="http://www.w3.org/2000/svg">
    <path fill="#9B1C1C" d="M79.5,85.7c3.1-6.7,5.8-12.9,8.7-19c5-10.8,10-21.5,15.1-32.2c0.5-1,1.7-2.2,2.6-2.2c7-0.2,14.1-0.2,21.1-0.2c0.4,0,0.9,0.3,1.5,0.5c-2.6,6-5.1,11.8-7.9,18.1c4.1,0,7.5,0.1,10.9-0.1c0.7,0,1.6-1,1.9-1.8c2.7-8.3,5.4-16.7,8-25.1c1.1-3.8-0.4-5.6-4.5-5.6c-8.4,0-16.9,0-25.8,0c0.3-1.2,0.4-2.2,0.8-3c1.8-4.1,3.7-8.2,5.4-12.3c0.8-1.9,1.9-2.7,4.1-2.7c13.2,0.1,26.4,0.2,39.6,0c5.8-0.1,9.2,4.7,8.3,9.3c-1.1,5.6-2.7,11-4.2,16.5c-2.9,10.3-6.1,20.5-9.1,30.7c-2.7,9.1-5.3,18.2-8,27.3c-0.2,0.7-1.3,1.8-2,1.8c-7.5,0.1-15.1,0-22.6,0c-0.2,0-0.3-0.2-1-0.6c1.2-4,2.5-8.2,3.8-12.3c0.8-2.7-0.1-4-2.9-4c-2.3,0-4.7,0.3-6.9-0.1c-3-0.4-4.3,1-5.4,3.5c-1.6,3.9-3.4,7.7-5.2,11.4c-0.4,0.8-1.4,2-2.2,2C95.7,85.7,88,85.7,79.5,85.7L79.5,85.7z"/>
    <path fill="#9B1C1C" d="M257,85.7c1.5-4.8,2.8-9,4-13.2c1.1-3.8,1.1-3.8-2.9-3.8c-2.7,0-5.4,0.2-8.1-0.1c-2-0.2-2.9,0.7-3.6,2.3c-1.8,4-3.7,8-5.4,12c-0.7,1.7-1.6,2.7-3.7,2.7c-6.6-0.1-13.3,0-19.9,0.1c-0.7,0-1.3-0.2-2.6-0.5c2-4.4,3.8-8.6,5.7-12.7c5.8-12.7,11.7-25.3,17.5-38.1c0.8-1.7,1.5-2.5,3.5-2.5c7.2,0.1,14.5,0,22.5,0c-2.8,6.4-5.4,12.2-8.2,18.6c4.1,0,7.5,0.1,11-0.1c0.6,0,1.6-1.1,1.8-1.9c2.7-8.4,5.3-16.8,7.9-25.1c1.1-3.5-0.4-5.4-4.1-5.4c-7.4,0-14.7,0-22.1,0c-1.2,0-2.4,0-4.5,0c1.6-3.7,2.9-6.9,4.2-10c0.5-1.1,1.2-2.2,1.4-3.3c0.8-4,3.1-4.9,7.1-4.8c12.2,0.3,24.4,0.1,36.6,0.1c7.1,0,10.7,4.2,8.9,11.1c-2,7.8-4.4,15.6-6.6,23.3c-4.5,15.6-9.1,31.2-13.7,46.8c-1.3,4.4-1.2,4.4-5.9,4.4C271,85.7,264.4,85.7,257,85.7L257,85.7z"/>
    <path fill="#9B1C1C" d="M360,50.7c7.4,5.7,3.6,11.6,1.1,17.4c-2.2,5.1-4.6,10.2-7.1,15.2c-0.5,1-1.9,2.3-3,2.3c-6.9,0.2-13.9,0.1-21.6,0.1c1.6-3.7,2.8-6.8,4.2-10c2.8-6.2,5.6-12.4,8.3-18.5c2-4.5,0.3-7.3-4.6-7.5c-1.3-0.1-2.7-0.3-3.9,0c-1.1,0.3-2.5,1-2.9,2c-5,10.5-9.8,20.9-14.5,31.5c-0.9,2.1-2.1,2.8-4.3,2.7c-5.9-0.2-11.9-0.1-17.8-0.1c-1,0-1.9-0.2-3.5-0.3c2.2-4.8,4.1-9.1,6.1-13.4c4.7-10.3,9.4-20.7,14.2-31c1-2.3,2-4.6,3.2-6.8c0.4-0.7,1.3-1.5,1.9-1.5c12.1-0.1,24.3-0.1,37-0.1c-1,2.9-2,5.4-2.9,8c0.2,0.2,0.4,0.3,0.6,0.5c8.5-5.3,17-10.6,25.8-16.1C372.1,19.4,368.2,14,364,8c-1.5,3.1-2.6,5.7-3.9,8.2c-0.4,0.8-1.3,1.7-2,1.7c-12.1,0.1-24.1,0.1-36.9,0.1c2-4.6,4.1-8.6,5.7-12.9c1.5-4.1,4-5.3,8.3-5.2c14.1,0.3,28.2,0.1,42.3,0.2c5.2,0,9.1,3.4,9.3,8.1c0.1,1.9-0.4,4-1.1,5.8c-4.5,10.2-9.1,20.4-13.9,30.5C369.6,49.3,365.4,50.5,360,50.7L360,50.7z"/>
    <path fill="#9B1C1C" d="M0,85.4c2.7-6,5.1-11.5,7.8-17c0.3-0.6,1.9-0.9,2.8-0.9c9.9-0.1,19.7,0.1,29.6-0.1c5.2-0.1,10.7-0.5,14.4-4.8c1.9-2.2,3.5-5.1,4.2-8c0.7-2.9-1.1-5.3-4-6.6c-4.3-1.9-8.6-3.6-12.8-5.6c-4-1.9-6.3-5.3-7.4-9.5C32,22.8,36.3,10.6,44.6,4.8c4.3-3,8.9-4.7,14.2-4.6c12.9,0.1,25.8,0,38.7,0c0.8,0,1.6,0.1,2.9,0.2c-0.7,1.7-1.2,3.3-1.9,4.8c-1.6,3.5-3.3,6.8-4.7,10.4c-0.8,2.1-2.1,2.8-4.3,2.7c-7.6-0.1-15.1-0.1-22.7,0c-1.8,0-3.5,0.6-5.2,1c-2.5,0.6-3.7,2.4-3.9,4.7c-0.3,2.5,1.3,4.2,3.5,5.1c3.2,1.2,6.4,2.3,9.7,3.2c9.7,2.7,14.1,10.4,14.1,19.2c0,14-7.8,24.1-21,30.5c-8.2,4-16.9,3.7-25.6,3.8c-12,0.2-24,0-35.9,0C1.8,85.7,1.3,85.6,0,85.4z"/>
    <path fill="#9B1C1C" d="M430.7,0.2c-2.1,4.8-4,9-5.9,13.1c-9.1,19.9-18.2,39.7-27.2,59.6c-1.7,3.6-3.2,7.3-5,10.9c-0.4,0.8-1.3,1.8-2,1.8c-7.5,0.1-15,0.1-23.2,0.1c1.6-3.8,3-7,4.5-10.2c8.2-18,16.4-35.9,24.7-53.8c3-6.4,5.9-12.9,9-19.2c0.4-0.9,1.6-2.1,2.5-2.1C415.2,0.1,422.5,0.2,430.7,0.2L430.7,0.2z"/>
    <path fill="#9B1C1C" d="M225.8,32.4c-2.7,6-5.1,11.5-7.7,16.8c-0.4,0.8-2,1.2-3.1,1.3c-5.8,0.1-11.7,0.2-17.5,0.1c-1.8,0-2.6,0.7-3.4,2.2c-4.6,10.2-9.3,20.3-13.9,30.5c-0.9,2-1.9,2.6-4.1,2.6c-6-0.2-12.1-0.1-18.1-0.1c-0.9,0-1.8-0.1-3.3-0.2c1.8-4,3.4-7.6,5-11.2c6-13.1,12.1-26.2,18.1-39.4c1-2.2,2.3-3,4.8-3c13.4,0.1,26.8,0,40.2,0.1C223.7,32.1,224.4,32.2,225.8,32.4L225.8,32.4z"/>
    <path fill="#9B1C1C" d="M185.7,18.2c1.9-4.3,3.6-8.1,5.3-11.8c0.6-1.4,1.1-2.8,2-4c0.8-1,2.1-2.1,3.1-2.1c14.4-0.1,28.8-0.1,43.1,0c0.2,0,0.4,0.1,1,0.3c-2,4.4-4.4,8.7-5.9,13.3c-1.3,4-3.7,4.5-7.4,4.4c-12.5-0.2-24.9-0.1-37.4-0.1C188.6,18.2,187.5,18.2,185.7,18.2z"/>
</svg>
```

### Logo Verification Checklist

- [ ] **Read the source SVG file before generating** — do NOT reproduce from memory
- [ ] Logo SVG has `viewBox="0 0 430.7 85.9"`
- [ ] Logo SVG has exactly **7 `<path>` elements**
- [ ] All paths have `fill="#9B1C1C"`
- [ ] No paths are truncated or missing
- [ ] **ALL logo instances** in the document have 7 paths (cover, every page-header, footer)

---

## Light Theme (Default for Internal Docs)

**Use for:** Roadmaps, internal reports, documentation, strategy docs

### CSS Variables - Light Theme

```css
:root {
    /* Brand Colors */
    --safari-red: #9B1C1C;
    --safari-red-light: #B82424;
    --safari-red-dark: #7B1616;

    /* Backgrounds */
    --background: #FEFDFF;
    --surface: #FFFFFF;
    --surface-alt: #F8F7F5;

    /* Text */
    --text-primary: #1E1E1E;
    --text-secondary: #2D2D2D;
    --text-muted: #6B7280;

    /* Borders */
    --border: #E5E5E5;
    --border-light: #F0F0F0;

    /* Phase Colors (for roadmaps, timelines) */
    --phase-blue: #60a5fa;
    --phase-green: #34d399;
    --phase-orange: #f59e0b;
    --phase-purple: #a78bfa;
    --phase-pink: #ec4899;
}
```

### Typography - Light Theme

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.8;
    color: var(--text-primary);
    background: var(--background);
    font-weight: 300;
}

h1 { font-size: 2.2rem; font-weight: 600; margin-bottom: 24px; }
h2 { font-size: 1.5rem; font-weight: 600; margin-top: 48px; margin-bottom: 20px;
     padding-bottom: 10px; border-bottom: 2px solid var(--border-light); }
h3 { font-size: 1.15rem; font-weight: 600; color: var(--text-secondary); margin-top: 32px; }

.lead { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 32px; }
.lead strong { color: var(--text-primary); font-weight: 600; }
.cover-meta strong { color: var(--text-primary); }
```

### Color Usage Rules (ENFORCED)

Safari Red (`#9B1C1C`) is reserved for **structural accents only** — never on readable text.

| Element | Color Variable | Usage |
|---------|---------------|-------|
| h1, h2 | `--text-primary` | Main headings — high contrast on any background |
| h3 | `--text-secondary` | Sub-headings — slightly lighter for hierarchy |
| Body text | `--text-primary` | Default reading text |
| Bold/strong in body | `--text-primary` + `font-weight: 600` | **Never** red |
| `.lead` text | `--text-muted` | Subtitle/intro paragraphs |
| Muted labels | `--text-muted` | Metadata, captions, timestamps |

**Allowed red usages (structural accents):**
- Page header bar: `border-bottom: 3px solid var(--safari-red)`
- Cover divider line: `background: var(--safari-red)`
- Highlight box left border: `border-left: 4px solid var(--safari-red)`
- Table header bottom border: `border-bottom: 2px solid var(--border)` (not red — use `--border`)
- Phase card accent borders (e.g., `.phase-3`)
- Timeline dots (e.g., `.timeline-phase:nth-child(3)`)
- Phase number badges (e.g., `.phase-3 .phase-number`)

**Prohibited red usages:**
- Headings (h1, h2, h3)
- Body text or inline `<strong>`
- `.lead strong` or `.cover-meta strong`
- Any text meant to be read

---

## Dark Theme (for Presentations/External)

**Use for:** External whitepapers, presentations, slides

### CSS Variables - Dark Theme

```css
:root {
    /* Brand Colors */
    --safari-red: #9B1C1C;

    /* Backgrounds */
    --background: #0F172A;
    --surface: #1E293B;
    --surface-alt: #334155;

    /* Text */
    --text-primary: #F8FAFC;
    --text-secondary: #E2E8F0;
    --text-muted: #94A3B8;

    /* Borders */
    --border: #475569;
    --border-light: #334155;
}
```

---

## Document Structure

### Cover Page

```html
<div class="cover">
    <div class="cover-content">
        <!-- IMPORTANT: Copy the full 7-path Safari logo from the "Full inline SVG" section above.
             NEVER use a placeholder comment. NEVER abbreviate. All 7 paths are required. -->
        <svg class="cover-logo" viewBox="0 0 430.7 85.9" xmlns="http://www.w3.org/2000/svg">
            <path fill="#9B1C1C" d="M79.5,85.7c3.1-6.7,5.8-12.9,8.7-19c5-10.8,10-21.5,15.1-32.2c0.5-1,1.7-2.2,2.6-2.2c7-0.2,14.1-0.2,21.1-0.2c0.4,0,0.9,0.3,1.5,0.5c-2.6,6-5.1,11.8-7.9,18.1c4.1,0,7.5,0.1,10.9-0.1c0.7,0,1.6-1,1.9-1.8c2.7-8.3,5.4-16.7,8-25.1c1.1-3.8-0.4-5.6-4.5-5.6c-8.4,0-16.9,0-25.8,0c0.3-1.2,0.4-2.2,0.8-3c1.8-4.1,3.7-8.2,5.4-12.3c0.8-1.9,1.9-2.7,4.1-2.7c13.2,0.1,26.4,0.2,39.6,0c5.8-0.1,9.2,4.7,8.3,9.3c-1.1,5.6-2.7,11-4.2,16.5c-2.9,10.3-6.1,20.5-9.1,30.7c-2.7,9.1-5.3,18.2-8,27.3c-0.2,0.7-1.3,1.8-2,1.8c-7.5,0.1-15.1,0-22.6,0c-0.2,0-0.3-0.2-1-0.6c1.2-4,2.5-8.2,3.8-12.3c0.8-2.7-0.1-4-2.9-4c-2.3,0-4.7,0.3-6.9-0.1c-3-0.4-4.3,1-5.4,3.5c-1.6,3.9-3.4,7.7-5.2,11.4c-0.4,0.8-1.4,2-2.2,2C95.7,85.7,88,85.7,79.5,85.7L79.5,85.7z"/>
            <path fill="#9B1C1C" d="M257,85.7c1.5-4.8,2.8-9,4-13.2c1.1-3.8,1.1-3.8-2.9-3.8c-2.7,0-5.4,0.2-8.1-0.1c-2-0.2-2.9,0.7-3.6,2.3c-1.8,4-3.7,8-5.4,12c-0.7,1.7-1.6,2.7-3.7,2.7c-6.6-0.1-13.3,0-19.9,0.1c-0.7,0-1.3-0.2-2.6-0.5c2-4.4,3.8-8.6,5.7-12.7c5.8-12.7,11.7-25.3,17.5-38.1c0.8-1.7,1.5-2.5,3.5-2.5c7.2,0.1,14.5,0,22.5,0c-2.8,6.4-5.4,12.2-8.2,18.6c4.1,0,7.5,0.1,11-0.1c0.6,0,1.6-1.1,1.8-1.9c2.7-8.4,5.3-16.8,7.9-25.1c1.1-3.5-0.4-5.4-4.1-5.4c-7.4,0-14.7,0-22.1,0c-1.2,0-2.4,0-4.5,0c1.6-3.7,2.9-6.9,4.2-10c0.5-1.1,1.2-2.2,1.4-3.3c0.8-4,3.1-4.9,7.1-4.8c12.2,0.3,24.4,0.1,36.6,0.1c7.1,0,10.7,4.2,8.9,11.1c-2,7.8-4.4,15.6-6.6,23.3c-4.5,15.6-9.1,31.2-13.7,46.8c-1.3,4.4-1.2,4.4-5.9,4.4C271,85.7,264.4,85.7,257,85.7L257,85.7z"/>
            <path fill="#9B1C1C" d="M360,50.7c7.4,5.7,3.6,11.6,1.1,17.4c-2.2,5.1-4.6,10.2-7.1,15.2c-0.5,1-1.9,2.3-3,2.3c-6.9,0.2-13.9,0.1-21.6,0.1c1.6-3.7,2.8-6.8,4.2-10c2.8-6.2,5.6-12.4,8.3-18.5c2-4.5,0.3-7.3-4.6-7.5c-1.3-0.1-2.7-0.3-3.9,0c-1.1,0.3-2.5,1-2.9,2c-5,10.5-9.8,20.9-14.5,31.5c-0.9,2.1-2.1,2.8-4.3,2.7c-5.9-0.2-11.9-0.1-17.8-0.1c-1,0-1.9-0.2-3.5-0.3c2.2-4.8,4.1-9.1,6.1-13.4c4.7-10.3,9.4-20.7,14.2-31c1-2.3,2-4.6,3.2-6.8c0.4-0.7,1.3-1.5,1.9-1.5c12.1-0.1,24.3-0.1,37-0.1c-1,2.9-2,5.4-2.9,8c0.2,0.2,0.4,0.3,0.6,0.5c8.5-5.3,17-10.6,25.8-16.1C372.1,19.4,368.2,14,364,8c-1.5,3.1-2.6,5.7-3.9,8.2c-0.4,0.8-1.3,1.7-2,1.7c-12.1,0.1-24.1,0.1-36.9,0.1c2-4.6,4.1-8.6,5.7-12.9c1.5-4.1,4-5.3,8.3-5.2c14.1,0.3,28.2,0.1,42.3,0.2c5.2,0,9.1,3.4,9.3,8.1c0.1,1.9-0.4,4-1.1,5.8c-4.5,10.2-9.1,20.4-13.9,30.5C369.6,49.3,365.4,50.5,360,50.7L360,50.7z"/>
            <path fill="#9B1C1C" d="M0,85.4c2.7-6,5.1-11.5,7.8-17c0.3-0.6,1.9-0.9,2.8-0.9c9.9-0.1,19.7,0.1,29.6-0.1c5.2-0.1,10.7-0.5,14.4-4.8c1.9-2.2,3.5-5.1,4.2-8c0.7-2.9-1.1-5.3-4-6.6c-4.3-1.9-8.6-3.6-12.8-5.6c-4-1.9-6.3-5.3-7.4-9.5C32,22.8,36.3,10.6,44.6,4.8c4.3-3,8.9-4.7,14.2-4.6c12.9,0.1,25.8,0,38.7,0c0.8,0,1.6,0.1,2.9,0.2c-0.7,1.7-1.2,3.3-1.9,4.8c-1.6,3.5-3.3,6.8-4.7,10.4c-0.8,2.1-2.1,2.8-4.3,2.7c-7.6-0.1-15.1-0.1-22.7,0c-1.8,0-3.5,0.6-5.2,1c-2.5,0.6-3.7,2.4-3.9,4.7c-0.3,2.5,1.3,4.2,3.5,5.1c3.2,1.2,6.4,2.3,9.7,3.2c9.7,2.7,14.1,10.4,14.1,19.2c0,14-7.8,24.1-21,30.5c-8.2,4-16.9,3.7-25.6,3.8c-12,0.2-24,0-35.9,0C1.8,85.7,1.3,85.6,0,85.4z"/>
            <path fill="#9B1C1C" d="M430.7,0.2c-2.1,4.8-4,9-5.9,13.1c-9.1,19.9-18.2,39.7-27.2,59.6c-1.7,3.6-3.2,7.3-5,10.9c-0.4,0.8-1.3,1.8-2,1.8c-7.5,0.1-15,0.1-23.2,0.1c1.6-3.8,3-7,4.5-10.2c8.2-18,16.4-35.9,24.7-53.8c3-6.4,5.9-12.9,9-19.2c0.4-0.9,1.6-2.1,2.5-2.1C415.2,0.1,422.5,0.2,430.7,0.2L430.7,0.2z"/>
            <path fill="#9B1C1C" d="M225.8,32.4c-2.7,6-5.1,11.5-7.7,16.8c-0.4,0.8-2,1.2-3.1,1.3c-5.8,0.1-11.7,0.2-17.5,0.1c-1.8,0-2.6,0.7-3.4,2.2c-4.6,10.2-9.3,20.3-13.9,30.5c-0.9,2-1.9,2.6-4.1,2.6c-6-0.2-12.1-0.1-18.1-0.1c-0.9,0-1.8-0.1-3.3-0.2c1.8-4,3.4-7.6,5-11.2c6-13.1,12.1-26.2,18.1-39.4c1-2.2,2.3-3,4.8-3c13.4,0.1,26.8,0,40.2,0.1C223.7,32.1,224.4,32.2,225.8,32.4L225.8,32.4z"/>
            <path fill="#9B1C1C" d="M185.7,18.2c1.9-4.3,3.6-8.1,5.3-11.8c0.6-1.4,1.1-2.8,2-4c0.8-1,2.1-2.1,3.1-2.1c14.4-0.1,28.8-0.1,43.1,0c0.2,0,0.4,0.1,1,0.3c-2,4.4-4.4,8.7-5.9,13.3c-1.3,4-3.7,4.5-7.4,4.4c-12.5-0.2-24.9-0.1-37.4-0.1C188.6,18.2,187.5,18.2,185.7,18.2z"/>
        </svg>

        <h1>Document Title</h1>
        <h2>Subtitle or Description</h2>

        <div class="thesis-box">
            <span>Key Point 1</span> + <span>Key Point 2</span> + <span>Key Point 3</span><br>
            = Core Message
        </div>

        <div class="cover-divider"></div>

        <div class="cover-meta">
            <strong>Safari Circuits</strong> | January 2026 | Internal
        </div>
    </div>
</div>
```

```css
.cover {
    min-height: 100vh;
    background: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 80px 60px;
    page-break-after: always;
}

.cover-logo { width: 320px; margin-bottom: 60px; }

.cover h1 {
    font-size: 3.2rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
}

.cover h2 {
    font-size: 1.4rem;
    font-weight: 300;
    color: var(--text-muted);
    margin-bottom: 50px;
}

.thesis-box {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: white;
    padding: 30px 40px;
    border-radius: 12px;
    margin: 30px 0;
    font-size: 1.1rem;
}

.thesis-box span { color: var(--phase-green); }

.cover-divider {
    width: 120px;
    height: 3px;
    background: var(--safari-red);
    margin: 50px auto;
    border-radius: 2px;
}
```

### Page Header

```html
<div class="page-header">
    <!-- IMPORTANT: Use the SAME full 7-path logo as the cover. NEVER truncate. -->
    <svg class="page-header-logo" viewBox="0 0 430.7 85.9" xmlns="http://www.w3.org/2000/svg">
        <path fill="#9B1C1C" d="M79.5,85.7c3.1-6.7,5.8-12.9,8.7-19c5-10.8,10-21.5,15.1-32.2c0.5-1,1.7-2.2,2.6-2.2c7-0.2,14.1-0.2,21.1-0.2c0.4,0,0.9,0.3,1.5,0.5c-2.6,6-5.1,11.8-7.9,18.1c4.1,0,7.5,0.1,10.9-0.1c0.7,0,1.6-1,1.9-1.8c2.7-8.3,5.4-16.7,8-25.1c1.1-3.8-0.4-5.6-4.5-5.6c-8.4,0-16.9,0-25.8,0c0.3-1.2,0.4-2.2,0.8-3c1.8-4.1,3.7-8.2,5.4-12.3c0.8-1.9,1.9-2.7,4.1-2.7c13.2,0.1,26.4,0.2,39.6,0c5.8-0.1,9.2,4.7,8.3,9.3c-1.1,5.6-2.7,11-4.2,16.5c-2.9,10.3-6.1,20.5-9.1,30.7c-2.7,9.1-5.3,18.2-8,27.3c-0.2,0.7-1.3,1.8-2,1.8c-7.5,0.1-15.1,0-22.6,0c-0.2,0-0.3-0.2-1-0.6c1.2-4,2.5-8.2,3.8-12.3c0.8-2.7-0.1-4-2.9-4c-2.3,0-4.7,0.3-6.9-0.1c-3-0.4-4.3,1-5.4,3.5c-1.6,3.9-3.4,7.7-5.2,11.4c-0.4,0.8-1.4,2-2.2,2C95.7,85.7,88,85.7,79.5,85.7L79.5,85.7z"/>
        <path fill="#9B1C1C" d="M257,85.7c1.5-4.8,2.8-9,4-13.2c1.1-3.8,1.1-3.8-2.9-3.8c-2.7,0-5.4,0.2-8.1-0.1c-2-0.2-2.9,0.7-3.6,2.3c-1.8,4-3.7,8-5.4,12c-0.7,1.7-1.6,2.7-3.7,2.7c-6.6-0.1-13.3,0-19.9,0.1c-0.7,0-1.3-0.2-2.6-0.5c2-4.4,3.8-8.6,5.7-12.7c5.8-12.7,11.7-25.3,17.5-38.1c0.8-1.7,1.5-2.5,3.5-2.5c7.2,0.1,14.5,0,22.5,0c-2.8,6.4-5.4,12.2-8.2,18.6c4.1,0,7.5,0.1,11-0.1c0.6,0,1.6-1.1,1.8-1.9c2.7-8.4,5.3-16.8,7.9-25.1c1.1-3.5-0.4-5.4-4.1-5.4c-7.4,0-14.7,0-22.1,0c-1.2,0-2.4,0-4.5,0c1.6-3.7,2.9-6.9,4.2-10c0.5-1.1,1.2-2.2,1.4-3.3c0.8-4,3.1-4.9,7.1-4.8c12.2,0.3,24.4,0.1,36.6,0.1c7.1,0,10.7,4.2,8.9,11.1c-2,7.8-4.4,15.6-6.6,23.3c-4.5,15.6-9.1,31.2-13.7,46.8c-1.3,4.4-1.2,4.4-5.9,4.4C271,85.7,264.4,85.7,257,85.7L257,85.7z"/>
        <path fill="#9B1C1C" d="M360,50.7c7.4,5.7,3.6,11.6,1.1,17.4c-2.2,5.1-4.6,10.2-7.1,15.2c-0.5,1-1.9,2.3-3,2.3c-6.9,0.2-13.9,0.1-21.6,0.1c1.6-3.7,2.8-6.8,4.2-10c2.8-6.2,5.6-12.4,8.3-18.5c2-4.5,0.3-7.3-4.6-7.5c-1.3-0.1-2.7-0.3-3.9,0c-1.1,0.3-2.5,1-2.9,2c-5,10.5-9.8,20.9-14.5,31.5c-0.9,2.1-2.1,2.8-4.3,2.7c-5.9-0.2-11.9-0.1-17.8-0.1c-1,0-1.9-0.2-3.5-0.3c2.2-4.8,4.1-9.1,6.1-13.4c4.7-10.3,9.4-20.7,14.2-31c1-2.3,2-4.6,3.2-6.8c0.4-0.7,1.3-1.5,1.9-1.5c12.1-0.1,24.3-0.1,37-0.1c-1,2.9-2,5.4-2.9,8c0.2,0.2,0.4,0.3,0.6,0.5c8.5-5.3,17-10.6,25.8-16.1C372.1,19.4,368.2,14,364,8c-1.5,3.1-2.6,5.7-3.9,8.2c-0.4,0.8-1.3,1.7-2,1.7c-12.1,0.1-24.1,0.1-36.9,0.1c2-4.6,4.1-8.6,5.7-12.9c1.5-4.1,4-5.3,8.3-5.2c14.1,0.3,28.2,0.1,42.3,0.2c5.2,0,9.1,3.4,9.3,8.1c0.1,1.9-0.4,4-1.1,5.8c-4.5,10.2-9.1,20.4-13.9,30.5C369.6,49.3,365.4,50.5,360,50.7L360,50.7z"/>
        <path fill="#9B1C1C" d="M0,85.4c2.7-6,5.1-11.5,7.8-17c0.3-0.6,1.9-0.9,2.8-0.9c9.9-0.1,19.7,0.1,29.6-0.1c5.2-0.1,10.7-0.5,14.4-4.8c1.9-2.2,3.5-5.1,4.2-8c0.7-2.9-1.1-5.3-4-6.6c-4.3-1.9-8.6-3.6-12.8-5.6c-4-1.9-6.3-5.3-7.4-9.5C32,22.8,36.3,10.6,44.6,4.8c4.3-3,8.9-4.7,14.2-4.6c12.9,0.1,25.8,0,38.7,0c0.8,0,1.6,0.1,2.9,0.2c-0.7,1.7-1.2,3.3-1.9,4.8c-1.6,3.5-3.3,6.8-4.7,10.4c-0.8,2.1-2.1,2.8-4.3,2.7c-7.6-0.1-15.1-0.1-22.7,0c-1.8,0-3.5,0.6-5.2,1c-2.5,0.6-3.7,2.4-3.9,4.7c-0.3,2.5,1.3,4.2,3.5,5.1c3.2,1.2,6.4,2.3,9.7,3.2c9.7,2.7,14.1,10.4,14.1,19.2c0,14-7.8,24.1-21,30.5c-8.2,4-16.9,3.7-25.6,3.8c-12,0.2-24,0-35.9,0C1.8,85.7,1.3,85.6,0,85.4z"/>
        <path fill="#9B1C1C" d="M430.7,0.2c-2.1,4.8-4,9-5.9,13.1c-9.1,19.9-18.2,39.7-27.2,59.6c-1.7,3.6-3.2,7.3-5,10.9c-0.4,0.8-1.3,1.8-2,1.8c-7.5,0.1-15,0.1-23.2,0.1c1.6-3.8,3-7,4.5-10.2c8.2-18,16.4-35.9,24.7-53.8c3-6.4,5.9-12.9,9-19.2c0.4-0.9,1.6-2.1,2.5-2.1C415.2,0.1,422.5,0.2,430.7,0.2L430.7,0.2z"/>
        <path fill="#9B1C1C" d="M225.8,32.4c-2.7,6-5.1,11.5-7.7,16.8c-0.4,0.8-2,1.2-3.1,1.3c-5.8,0.1-11.7,0.2-17.5,0.1c-1.8,0-2.6,0.7-3.4,2.2c-4.6,10.2-9.3,20.3-13.9,30.5c-0.9,2-1.9,2.6-4.1,2.6c-6-0.2-12.1-0.1-18.1-0.1c-0.9,0-1.8-0.1-3.3-0.2c1.8-4,3.4-7.6,5-11.2c6-13.1,12.1-26.2,18.1-39.4c1-2.2,2.3-3,4.8-3c13.4,0.1,26.8,0,40.2,0.1C223.7,32.1,224.4,32.2,225.8,32.4L225.8,32.4z"/>
        <path fill="#9B1C1C" d="M185.7,18.2c1.9-4.3,3.6-8.1,5.3-11.8c0.6-1.4,1.1-2.8,2-4c0.8-1,2.1-2.1,3.1-2.1c14.4-0.1,28.8-0.1,43.1,0c0.2,0,0.4,0.1,1,0.3c-2,4.4-4.4,8.7-5.9,13.3c-1.3,4-3.7,4.5-7.4,4.4c-12.5-0.2-24.9-0.1-37.4-0.1C188.6,18.2,187.5,18.2,185.7,18.2z"/>
    </svg>
    <span class="page-header-title">Document Title</span>
</div>
```

```css
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 40px;
    border-bottom: 3px solid var(--safari-red);
}

.page-header-logo { height: 28px; }

.page-header-title {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0.02em;
}
```

---

## Component Library

### Phase Cards (for Roadmaps)

```html
<div class="phase-grid">
    <div class="phase-card phase-1">
        <div class="phase-header">
            <div class="phase-number">P1</div>
            <div>
                <div class="phase-title">Phase Name</div>
                <div class="phase-subtitle">Q1 2026</div>
            </div>
        </div>
        <div class="phase-body">Description of what this phase accomplishes.</div>
        <ul class="phase-deliverables">
            <li>Deliverable 1</li>
            <li>Deliverable 2</li>
        </ul>
        <span class="phase-duration">8 weeks</span>
    </div>
</div>
```

```css
.phase-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin: 32px 0;
}

.phase-card {
    background: var(--surface);
    border-radius: 12px;
    padding: 24px;
    border: 2px solid var(--border-light);
    transition: transform 0.2s, box-shadow 0.2s;
}

.phase-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

/* Phase colors - left border accent */
.phase-card.phase-1 { border-left: 4px solid var(--phase-blue); }
.phase-card.phase-2 { border-left: 4px solid var(--phase-green); }
.phase-card.phase-3 { border-left: 4px solid var(--safari-red); }
.phase-card.phase-4 { border-left: 4px solid var(--phase-orange); }
.phase-card.phase-5 { border-left: 4px solid var(--phase-purple); }
.phase-card.phase-6 { border-left: 4px solid var(--phase-pink); }

.phase-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    color: white;
}

.phase-1 .phase-number { background: var(--phase-blue); }
.phase-2 .phase-number { background: var(--phase-green); }
.phase-3 .phase-number { background: var(--safari-red); }
.phase-4 .phase-number { background: var(--phase-orange); }
.phase-5 .phase-number { background: var(--phase-purple); }
.phase-6 .phase-number { background: var(--phase-pink); }

.phase-deliverables li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--safari-red);
}

.phase-duration {
    display: inline-block;
    background: var(--surface-alt);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-muted);
}
```

### Timeline

```html
<div class="timeline">
    <div class="timeline-track"></div>
    <div class="timeline-phases">
        <div class="timeline-phase">
            <div class="timeline-dot"></div>
            <div class="timeline-label">Phase 1</div>
            <div class="timeline-quarter">Q1</div>
        </div>
        <!-- Repeat for each phase -->
    </div>
</div>
```

```css
.timeline {
    position: relative;
    padding: 32px 0;
    margin: 32px 0;
}

.timeline-track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--border);
    transform: translateY(-50%);
    border-radius: 2px;
}

.timeline-phases {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
}

.timeline-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.timeline-phase:nth-child(1) .timeline-dot { background: var(--phase-blue); }
.timeline-phase:nth-child(2) .timeline-dot { background: var(--phase-green); }
.timeline-phase:nth-child(3) .timeline-dot { background: var(--safari-red); }
.timeline-phase:nth-child(4) .timeline-dot { background: var(--phase-orange); }
.timeline-phase:nth-child(5) .timeline-dot { background: var(--phase-purple); }
.timeline-phase:nth-child(6) .timeline-dot { background: var(--phase-pink); }
```

### Architecture Stack

```html
<div class="arch-stack">
    <div class="arch-layer user">
        <div class="arch-layer-title">User Layer</div>
        <div class="arch-components">
            <span class="arch-component">Component 1</span>
            <span class="arch-component">Component 2</span>
        </div>
    </div>
    <!-- Repeat for each layer -->
</div>
```

```css
.arch-layer {
    background: var(--surface-alt);
    border-radius: 8px;
    padding: 20px 24px;
    margin-bottom: 8px;
    border-left: 4px solid var(--border);
}

.arch-layer.user { border-left-color: var(--phase-blue); }
.arch-layer.trace { border-left-color: var(--phase-purple); }
.arch-layer.context { border-left-color: var(--safari-red); }
.arch-layer.streaming { border-left-color: var(--phase-orange); }
.arch-layer.sources { border-left-color: var(--phase-green); }

.arch-layer-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
}

.arch-component {
    background: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-secondary);
    border: 1px solid var(--border);
}
```

### Metric Cards

```html
<div class="metric-grid">
    <div class="metric-card">
        <div class="metric-value">85%</div>
        <div class="metric-label">Metric Name</div>
    </div>
</div>
```

```css
.metric-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin: 24px 0;
}

.metric-card {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}

.metric-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--phase-green);
    margin-bottom: 4px;
}

.metric-label {
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 400;
}
```

### Highlight Box

```html
<div class="highlight-box">
    <p><strong>Key Point:</strong> Important information highlighted here.</p>
</div>
```

```css
.highlight-box {
    background: linear-gradient(135deg, rgba(155, 28, 28, 0.05) 0%, rgba(155, 28, 28, 0.1) 100%);
    border-left: 4px solid var(--safari-red);
    padding: 20px 24px;
    border-radius: 0 8px 8px 0;
    margin: 24px 0;
}
```

### Tables

```css
table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    font-size: 0.9rem;
}

th {
    background: var(--surface-alt);
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: var(--text-primary);
    border-bottom: 2px solid var(--border);
}

td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-light);
    color: var(--text-secondary);
}

tr:hover td { background: var(--surface-alt); }
```

### Footer

```html
<div class="footer">
    <!-- IMPORTANT: Use the SAME full 7-path logo. NEVER truncate. -->
    <svg class="footer-logo" viewBox="0 0 430.7 85.9" xmlns="http://www.w3.org/2000/svg">
        <path fill="#9B1C1C" d="M79.5,85.7c3.1-6.7,5.8-12.9,8.7-19c5-10.8,10-21.5,15.1-32.2c0.5-1,1.7-2.2,2.6-2.2c7-0.2,14.1-0.2,21.1-0.2c0.4,0,0.9,0.3,1.5,0.5c-2.6,6-5.1,11.8-7.9,18.1c4.1,0,7.5,0.1,10.9-0.1c0.7,0,1.6-1,1.9-1.8c2.7-8.3,5.4-16.7,8-25.1c1.1-3.8-0.4-5.6-4.5-5.6c-8.4,0-16.9,0-25.8,0c0.3-1.2,0.4-2.2,0.8-3c1.8-4.1,3.7-8.2,5.4-12.3c0.8-1.9,1.9-2.7,4.1-2.7c13.2,0.1,26.4,0.2,39.6,0c5.8-0.1,9.2,4.7,8.3,9.3c-1.1,5.6-2.7,11-4.2,16.5c-2.9,10.3-6.1,20.5-9.1,30.7c-2.7,9.1-5.3,18.2-8,27.3c-0.2,0.7-1.3,1.8-2,1.8c-7.5,0.1-15.1,0-22.6,0c-0.2,0-0.3-0.2-1-0.6c1.2-4,2.5-8.2,3.8-12.3c0.8-2.7-0.1-4-2.9-4c-2.3,0-4.7,0.3-6.9-0.1c-3-0.4-4.3,1-5.4,3.5c-1.6,3.9-3.4,7.7-5.2,11.4c-0.4,0.8-1.4,2-2.2,2C95.7,85.7,88,85.7,79.5,85.7L79.5,85.7z"/>
        <path fill="#9B1C1C" d="M257,85.7c1.5-4.8,2.8-9,4-13.2c1.1-3.8,1.1-3.8-2.9-3.8c-2.7,0-5.4,0.2-8.1-0.1c-2-0.2-2.9,0.7-3.6,2.3c-1.8,4-3.7,8-5.4,12c-0.7,1.7-1.6,2.7-3.7,2.7c-6.6-0.1-13.3,0-19.9,0.1c-0.7,0-1.3-0.2-2.6-0.5c2-4.4,3.8-8.6,5.7-12.7c5.8-12.7,11.7-25.3,17.5-38.1c0.8-1.7,1.5-2.5,3.5-2.5c7.2,0.1,14.5,0,22.5,0c-2.8,6.4-5.4,12.2-8.2,18.6c4.1,0,7.5,0.1,11-0.1c0.6,0,1.6-1.1,1.8-1.9c2.7-8.4,5.3-16.8,7.9-25.1c1.1-3.5-0.4-5.4-4.1-5.4c-7.4,0-14.7,0-22.1,0c-1.2,0-2.4,0-4.5,0c1.6-3.7,2.9-6.9,4.2-10c0.5-1.1,1.2-2.2,1.4-3.3c0.8-4,3.1-4.9,7.1-4.8c12.2,0.3,24.4,0.1,36.6,0.1c7.1,0,10.7,4.2,8.9,11.1c-2,7.8-4.4,15.6-6.6,23.3c-4.5,15.6-9.1,31.2-13.7,46.8c-1.3,4.4-1.2,4.4-5.9,4.4C271,85.7,264.4,85.7,257,85.7L257,85.7z"/>
        <path fill="#9B1C1C" d="M360,50.7c7.4,5.7,3.6,11.6,1.1,17.4c-2.2,5.1-4.6,10.2-7.1,15.2c-0.5,1-1.9,2.3-3,2.3c-6.9,0.2-13.9,0.1-21.6,0.1c1.6-3.7,2.8-6.8,4.2-10c2.8-6.2,5.6-12.4,8.3-18.5c2-4.5,0.3-7.3-4.6-7.5c-1.3-0.1-2.7-0.3-3.9,0c-1.1,0.3-2.5,1-2.9,2c-5,10.5-9.8,20.9-14.5,31.5c-0.9,2.1-2.1,2.8-4.3,2.7c-5.9-0.2-11.9-0.1-17.8-0.1c-1,0-1.9-0.2-3.5-0.3c2.2-4.8,4.1-9.1,6.1-13.4c4.7-10.3,9.4-20.7,14.2-31c1-2.3,2-4.6,3.2-6.8c0.4-0.7,1.3-1.5,1.9-1.5c12.1-0.1,24.3-0.1,37-0.1c-1,2.9-2,5.4-2.9,8c0.2,0.2,0.4,0.3,0.6,0.5c8.5-5.3,17-10.6,25.8-16.1C372.1,19.4,368.2,14,364,8c-1.5,3.1-2.6,5.7-3.9,8.2c-0.4,0.8-1.3,1.7-2,1.7c-12.1,0.1-24.1,0.1-36.9,0.1c2-4.6,4.1-8.6,5.7-12.9c1.5-4.1,4-5.3,8.3-5.2c14.1,0.3,28.2,0.1,42.3,0.2c5.2,0,9.1,3.4,9.3,8.1c0.1,1.9-0.4,4-1.1,5.8c-4.5,10.2-9.1,20.4-13.9,30.5C369.6,49.3,365.4,50.5,360,50.7L360,50.7z"/>
        <path fill="#9B1C1C" d="M0,85.4c2.7-6,5.1-11.5,7.8-17c0.3-0.6,1.9-0.9,2.8-0.9c9.9-0.1,19.7,0.1,29.6-0.1c5.2-0.1,10.7-0.5,14.4-4.8c1.9-2.2,3.5-5.1,4.2-8c0.7-2.9-1.1-5.3-4-6.6c-4.3-1.9-8.6-3.6-12.8-5.6c-4-1.9-6.3-5.3-7.4-9.5C32,22.8,36.3,10.6,44.6,4.8c4.3-3,8.9-4.7,14.2-4.6c12.9,0.1,25.8,0,38.7,0c0.8,0,1.6,0.1,2.9,0.2c-0.7,1.7-1.2,3.3-1.9,4.8c-1.6,3.5-3.3,6.8-4.7,10.4c-0.8,2.1-2.1,2.8-4.3,2.7c-7.6-0.1-15.1-0.1-22.7,0c-1.8,0-3.5,0.6-5.2,1c-2.5,0.6-3.7,2.4-3.9,4.7c-0.3,2.5,1.3,4.2,3.5,5.1c3.2,1.2,6.4,2.3,9.7,3.2c9.7,2.7,14.1,10.4,14.1,19.2c0,14-7.8,24.1-21,30.5c-8.2,4-16.9,3.7-25.6,3.8c-12,0.2-24,0-35.9,0C1.8,85.7,1.3,85.6,0,85.4z"/>
        <path fill="#9B1C1C" d="M430.7,0.2c-2.1,4.8-4,9-5.9,13.1c-9.1,19.9-18.2,39.7-27.2,59.6c-1.7,3.6-3.2,7.3-5,10.9c-0.4,0.8-1.3,1.8-2,1.8c-7.5,0.1-15,0.1-23.2,0.1c1.6-3.8,3-7,4.5-10.2c8.2-18,16.4-35.9,24.7-53.8c3-6.4,5.9-12.9,9-19.2c0.4-0.9,1.6-2.1,2.5-2.1C415.2,0.1,422.5,0.2,430.7,0.2L430.7,0.2z"/>
        <path fill="#9B1C1C" d="M225.8,32.4c-2.7,6-5.1,11.5-7.7,16.8c-0.4,0.8-2,1.2-3.1,1.3c-5.8,0.1-11.7,0.2-17.5,0.1c-1.8,0-2.6,0.7-3.4,2.2c-4.6,10.2-9.3,20.3-13.9,30.5c-0.9,2-1.9,2.6-4.1,2.6c-6-0.2-12.1-0.1-18.1-0.1c-0.9,0-1.8-0.1-3.3-0.2c1.8-4,3.4-7.6,5-11.2c6-13.1,12.1-26.2,18.1-39.4c1-2.2,2.3-3,4.8-3c13.4,0.1,26.8,0,40.2,0.1C223.7,32.1,224.4,32.2,225.8,32.4L225.8,32.4z"/>
        <path fill="#9B1C1C" d="M185.7,18.2c1.9-4.3,3.6-8.1,5.3-11.8c0.6-1.4,1.1-2.8,2-4c0.8-1,2.1-2.1,3.1-2.1c14.4-0.1,28.8-0.1,43.1,0c0.2,0,0.4,0.1,1,0.3c-2,4.4-4.4,8.7-5.9,13.3c-1.3,4-3.7,4.5-7.4,4.4c-12.5-0.2-24.9-0.1-37.4-0.1C188.6,18.2,187.5,18.2,185.7,18.2z"/>
    </svg>
    <p>Safari Circuits IT | January 2026 | Confidential</p>
    <p>Source: <a href="https://github.com/SafariCircuitsLLC/organizational-docs">organizational-docs</a></p>
</div>
```

```css
.footer {
    text-align: center;
    padding: 40px;
    color: var(--text-muted);
    font-size: 0.85rem;
    border-top: 1px solid var(--border-light);
    margin-top: 60px;
}

.footer-logo {
    height: 24px;
    margin-bottom: 16px;
    opacity: 0.6;
}
```

---

## Print & Responsive

```css
/* Print styles */
@media print {
    .cover { page-break-after: always; }
    .content { page-break-inside: avoid; }
    .phase-card { break-inside: avoid; }
}

/* Responsive */
@media (max-width: 768px) {
    .phase-grid { grid-template-columns: 1fr; }
    .metric-grid { grid-template-columns: repeat(2, 1fr); }
    .cover h1 { font-size: 2.4rem; }
}
```

---

## Checklist: HTML Deliverable

### Brand Assets (CRITICAL)
- [ ] **No fabricated SVGs** - all visual elements from `shared/branding/assets/`
- [ ] **Safari logo has all 7 paths** - verify before each use
- [ ] Logo SVG has `viewBox="0 0 430.7 85.9"`

### Theme Selection
- [ ] Light theme for internal docs (default)
- [ ] Dark theme only for external/presentations
- [ ] CSS variables properly set for chosen theme

### Structure
- [ ] Cover page with full logo
- [ ] Page header with logo and title
- [ ] Footer with logo and metadata
- [ ] Print styles included

### Components Used Correctly
- [ ] Phase cards have proper color classes
- [ ] Timeline dots match phase colors
- [ ] Architecture layers have semantic classes
- [ ] Metric cards use dark gradient background

---

## Reference Files

- **Safari Logo:** `organizational-docs/shared/branding/assets/logos/svg/safari-logo.svg`
- **Example (Light):** `organizational-docs/deliverables/internal/it-roadmap.html`
- **Example (Dark):** `organizational-docs/deliverables/internal/context-governance-whitepaper.html`
- **Production Standards:** `~/.claude/skills/safari-skills/production-code-standards/SKILL.md`
