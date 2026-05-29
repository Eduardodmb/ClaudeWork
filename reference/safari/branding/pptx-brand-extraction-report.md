---
title: PowerPoint Template Brand Extraction Report
type: audit
domain: branding
status: review-needed
created: 2026-01-20
source: Presentation Template (1).pptx
author: Safari Circuits IT
tags: [branding, pptx, audit, extraction]
---

# PowerPoint Template Brand Extraction Report

Analysis of brand components extracted from `Presentation Template (1).pptx`.

## Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Color Scheme | **INCONSISTENT** | Multiple red variants differ from brand standard |
| Fonts | OK | Century Gothic (not in current brand docs) |
| Logo SVGs | **INCONSISTENT** | Uses different red hex codes |
| Patterns | Not found | No circuit patterns in template |

## Color Discrepancies (Action Required)

### Primary Red Variations Found

| Source | Hex Code | Delta from Standard |
|--------|----------|---------------------|
| **Brand Library** | `#9B1C1C` | (baseline) |
| Theme Accent 3 | `#E51A37` | +4A +00 +1B (brighter, more orange) |
| Logo SVG (image3) | `#A22124` | +07 +05 +08 (slightly lighter) |
| Logo SVG (image8) | `#A22023` | +07 +04 +07 (slightly lighter) |

**Recommendation:** Standardize on `#9B1C1C` per brand library. Update PowerPoint theme and re-export logo SVGs.

## Extracted Theme: "2024 Safari"

### Color Scheme (DWH Color Scheme)

```json
{
  "dark1": "#000000",
  "light1": "#FFFFFF",
  "dark2": "#464646",
  "light2": "#FFFFFF",
  "accent1": "#7F7F7F",
  "accent2": "#012C54",
  "accent3": "#E51A37",
  "accent4": "#B9CCE5",
  "accent5": "#FAD2D8",
  "accent6": "#FFFFCC",
  "hyperlink": "#FA7100",
  "followedHyperlink": "#44B9E8"
}
```

### Font Scheme

| Role | Font |
|------|------|
| Major (Headings) | Century Gothic |
| Minor (Body) | Century Gothic |

**Note:** Century Gothic not documented in current brand standards. Add to brand documentation or confirm as approved font.

## Embedded SVG Assets

### image3.svg - Safari Logo (Red)
- **Type:** Full wordmark
- **Fill:** `#A22124` (non-standard)
- **ViewBox:** `0 0 430.68 85.88`
- **Status:** Needs color correction

### image8.svg - Safari Logo (Red, Responsive)
- **Type:** Full wordmark with responsive CSS class
- **Fill:** `#A22023` (non-standard)
- **CSS Class:** `.MsftOfcResponsive_Fill_a22023`
- **Status:** Needs color correction

### image10.svg - Safari Logo (White)
- **Type:** Full wordmark
- **Fill:** `#FFFFFF` (correct)
- **CSS Class:** `.MsftOfcThm_Background1_Fill_v2`
- **Status:** OK

## Comparison with Brand Library

### Brand Library Colors (safari-palette.json)

```json
{
  "safari-red": "#9B1C1C",
  "safari-red-light": "#B82424",
  "safari-red-dark": "#7B1616",
  "dark-background": "#0F172A",
  "surface": "#1E293B",
  "blue": "#60A5FA",
  "green": "#34D399"
}
```

### PowerPoint Theme Comparison

| PowerPoint Color | Closest Brand Match | Status |
|------------------|---------------------|--------|
| #E51A37 (accent3) | #9B1C1C (safari-red) | **MISMATCH** |
| #012C54 (accent2) | #0F172A (dark-background) | Similar (darker) |
| #44B9E8 (folHlink) | #60A5FA (blue) | Similar |
| #7F7F7F (accent1) | None | Add to palette? |
| #B9CCE5 (accent4) | None | Add to palette? |
| #FA7100 (hlink) | None | Add to palette? |

## Recommendations

### Immediate Actions

1. **Update PowerPoint Theme**
   - Change Accent 3 from `#E51A37` to `#9B1C1C`
   - Re-export logo SVGs with correct color

2. **Update Brand Library**
   - Add Century Gothic to approved fonts
   - Consider adding orange (#FA7100) for hyperlinks
   - Document navy (#012C54) as secondary dark

### Brand Skill: PowerPoint (.pptx)

```yaml
brand-skill-pptx:
  theme:
    name: "Safari 2024"
    colors:
      dk1: "#000000"
      lt1: "#FFFFFF"
      dk2: "#464646"
      lt2: "#FFFFFF"
      accent1: "#9B1C1C"  # Safari Red (CORRECTED)
      accent2: "#0F172A"  # Dark Background
      accent3: "#60A5FA"  # Blue
      accent4: "#34D399"  # Green
      accent5: "#F472B6"  # Pink
      accent6: "#FBBF24"  # Amber
      hlink: "#60A5FA"    # Blue
      folHlink: "#A78BFA" # Purple
    fonts:
      major: "Century Gothic"
      minor: "Century Gothic"
  assets:
    logo_red: "image3.svg"
    logo_white: "image10.svg"
  validation:
    - all_colors_from_palette
    - fonts_approved
    - logo_correct_color
```

## Files Extracted

All extracted files available at:
`C:\Users\dkmcintyre\OneDrive - Safari Circuits, LLC\Pictures\safari logos\pptx_extracted\`

| Path | Contents |
|------|----------|
| `ppt/theme/theme1.xml` | 2024 Safari theme definition |
| `ppt/media/image3.svg` | Logo (red) |
| `ppt/media/image8.svg` | Logo (red, responsive) |
| `ppt/media/image10.svg` | Logo (white) |

## Related

- [Brand Asset Review Pipeline](./brand-artifact-review-pipeline.md)
- [Safari Palette](./assets/colors/safari-palette.json)
- [Brand Standards](./standards/)
