---
title: AI Brand Artifact Review Pipeline
type: process
domain: branding
status: draft
created: 2026-01-20
author: Safari Circuits IT
tags: [branding, ai, governance, review, quality]
---

# AI Brand Artifact Review Pipeline

Systematic review process for AI-generated brand artifacts ensuring consistency with Safari Circuits visual identity and voice.

## Overview

This pipeline ensures all AI-generated artifacts align with brand standards before deployment. Artifacts flow through stages: Generation → Review → Feedback → Approval/Rejection.

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Generate   │───▶│   Review    │───▶│  Feedback   │───▶│  Decision   │
│  Artifact   │    │  (Present)  │    │  (Iterate)  │    │ Approve/Rej │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                                     │                   │
       │                                     │                   ▼
       │                                     │           ┌─────────────┐
       └─────────────────────────────────────┴──────────▶│   Library   │
                                                         └─────────────┘
```

## Review Stages

### Stage 1: Generation

AI generates artifact using brand skills and approved assets only.

| Check | Requirement |
|-------|-------------|
| Asset Source | Only from `shared/branding/assets/` |
| Color Palette | Only from `safari-palette.json` |
| Typography | Approved font stack only |
| Layout | Per file-type brand skill |

### Stage 2: Presentation

Each artifact is presented with contextual information:

```yaml
artifact:
  name: "document-header.svg"
  type: svg
  purpose: "Header graphic for architecture documents"

brand_coherence:
  colors_used:
    - "#9B1C1C (Safari Red)" ✓
    - "#0F172A (Dark Background)" ✓
  assets_referenced:
    - "safari-logo.svg" ✓
  typography: "Inter, system-ui" ✓

quality_score:
  palette_compliance: 100%
  asset_compliance: 100%
  layout_compliance: 95%
  overall: 98%

notes: |
  Uses approved circuit trace pattern as background.
  Logo positioned per STD-BRAND-002 guidelines.
```

### Stage 3: Feedback

Reviewer can:

| Action | Result |
|--------|--------|
| **Approve** | Artifact moves to library |
| **Reject** | Artifact discarded, reason logged |
| **Request Changes** | Specific feedback captured, returns to generation |
| **Flag for Human Design** | Escalates to human designer |

### Stage 4: Library Integration

Approved artifacts are:
1. Added to `shared/branding/assets/` with metadata
2. Registered in brand asset inventory
3. Available for future AI generation

## Quality Gates

### Mandatory Checks (All File Types)

| Gate | Criteria | Blocking |
|------|----------|----------|
| **Color Compliance** | All colors from `safari-palette.json` | Yes |
| **Asset Compliance** | No fabricated/generated graphics | Yes |
| **Typography** | Approved fonts only | Yes |
| **Accessibility** | Contrast ratios meet WCAG 2.1 AA | Yes |

### File-Type Specific Checks

See individual brand skills below.

## Brand Skills by File Type

### Document Generation

| Extension | Skill | Primary Concerns |
|-----------|-------|------------------|
| `.html` | `brand-skill-html` | CSS variables, embedded SVGs, responsive |
| `.pdf` | `brand-skill-pdf` | Vector graphics, CMYK colors, bleed |
| `.docx` | `brand-skill-docx` | Styles, headers/footers, cover page |
| `.pptx` | `brand-skill-pptx` | Slide masters, theme colors, layouts |
| `.xlsx` | `brand-skill-xlsx` | Header formatting, chart colors |

### Code/Design Assets

| Extension | Skill | Primary Concerns |
|-----------|-------|------------------|
| `.svg` | `brand-skill-svg` | viewBox, fill colors, stroke width |
| `.jsx` | `brand-skill-jsx` | CSS-in-JS theming, component props |
| `.css` | `brand-skill-css` | Custom properties, color variables |
| `.js` | `brand-skill-js` | Theme objects, color constants |

### Visual Media

| Extension | Skill | Primary Concerns |
|-----------|-------|------------------|
| `.png` | `brand-skill-png` | Resolution, transparency, compression |
| `.img` | `brand-skill-img` | Color profile, dimensions |
| `.mpg` | `brand-skill-mpg` | Intro/outro, lower thirds, watermark |

### Business Intelligence

| Extension | Skill | Primary Concerns |
|-----------|-------|------------------|
| `.pbit` | `brand-skill-powerbi` | Theme JSON, visual colors, fonts |
| `.pbix` | `brand-skill-powerbi` | Same as .pbit |

## Asset Inventory

### Approved Logo Assets

| Asset | File | Usage |
|-------|------|-------|
| Full Wordmark | `safari-logo.svg` | Headers, documents |
| White Wordmark | `safari-logo-white.svg` | Dark backgrounds |
| Diamond S Icon | `safari-icon-diamond-s.svg` | Favicon, small spaces |
| Diamond S Red | `safari-icon-diamond-s-red.svg` | Red variant |
| Circuit Circle | `safari-circle-circuit-red.svg` | Watermarks, backgrounds |
| Circuit Circle White | `safari-circle-circuit-white.svg` | Dark backgrounds |

### Approved Patterns

| Pattern | File | Usage |
|---------|------|-------|
| Circuit Board | `safari-circuit-board-pattern.svg` | Full backgrounds |
| Circuit Board Red | `safari-circuit-board-pattern-red.svg` | Accent backgrounds |

### Pending Review (Discovered Assets)

| Asset | Source | Status |
|-------|--------|--------|
| `PCBA-Graphic-S.svg` | OneDrive/safari logos | Needs brand review |

## Color Reference

From `safari-palette.json`:

```json
{
  "brand": {
    "primary": {
      "safari-red": "#9B1C1C",
      "safari-red-light": "#B82424",
      "safari-red-dark": "#7B1616"
    },
    "neutrals": {
      "white": "#FFFFFF",
      "cream": "#F5F5F0"
    },
    "technical": {
      "blue": "#60A5FA",
      "green": "#34D399",
      "pink": "#F472B6",
      "purple": "#A78BFA",
      "amber": "#FBBF24"
    }
  },
  "dark": {
    "background": {
      "base": "#0F172A",
      "surface": "#1E293B",
      "elevated": "#243044",
      "dialog": "#2E3A54"
    }
  }
}
```

## Review Pipeline Commands

### `/brand-review`

Initiates review of pending artifacts:

```
/brand-review [--type svg|html|pdf|...] [--all]
```

### `/brand-approve`

Approves current artifact:

```
/brand-approve [artifact-id] --reason "Meets all brand guidelines"
```

### `/brand-reject`

Rejects current artifact:

```
/brand-reject [artifact-id] --reason "Uses non-approved color #FF0000"
```

### `/brand-feedback`

Provides feedback for iteration:

```
/brand-feedback [artifact-id] --changes "Replace header logo with white variant for dark bg"
```

## Integration with Context Governance

This pipeline integrates with Safari MCP context governance:

| Safari MCP Tool | Brand Pipeline Usage |
|-----------------|---------------------|
| `context_capture` | Store approved artifacts |
| `context_quality` | Audit brand compliance |
| `context_promote` | Elevate to brand library |

## Implementation Phases

### Phase 1: Foundation
- [x] Document review pipeline
- [ ] Create individual brand skills
- [ ] Build review command infrastructure

### Phase 2: Automation
- [ ] Automated color extraction
- [ ] Automated asset validation
- [ ] Quality score calculation

### Phase 3: Intelligence
- [ ] Pattern recognition for brand violations
- [ ] Suggested corrections
- [ ] Learning from rejections

## Related

- [Brand Standards](./standards/)
- [Asset Library](./assets/)
- [Safari Palette](./assets/colors/safari-palette.json)
- [Context Governance](../../deliverables/internal/context-governance-whitepaper.html)
