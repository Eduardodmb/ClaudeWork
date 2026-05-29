# Safari Circuits Presentation Creation Workflow

**Status:** Validated - Successfully used for CMMC Level 2 vendor comparison (May 2026)

---

## Overview

Automated workflow for creating Safari Circuits executive presentations using configuration-driven approach.

## Successful Pattern

### 1. Research & Content Development
- Gather all data in project `01-Research/` folder
- Create detailed markdown outline in `02-Drafts/`
- Include all content: comparison tables, cost analysis, recommendations
- Format with clear structure (slide-by-slide breakdown)

### 2. Configuration File Creation
- Convert markdown outline to YAML configuration
- Structure: title_slide + slides array
- Slide types: `content`, `table`, `section_header`
- Use color coding: 🟢 (advantage), 🟡 (adequate), 🔴 (concern)

**Location:** Same folder as outline (`02-Drafts/`)

**Example:**
```yaml
title_slide:
  title: "Presentation Title"
  subtitle: "Presenter\nDate"

slides:
  - type: content
    title: "Slide Title"
    content:
      - "Bullet 1"
      - "Bullet 2"

  - type: table
    title: "Comparison"
    columns: ["Criteria", "Vendor A", "Vendor B"]
    rows:
      - ["Cost", "🟢 $100K", "🔴 $200K"]
```

### 3. Automated Generation
- Use script: `C:\Users\emarquez\personal-claude-docs\scripts\generate_presentation.py`
- Automatically cleans Safari template (keeps first/last slides)
- Generates color-coded tables
- Output to `02-Drafts/`

**Command:**
```powershell
cd "{project}\02-Drafts"
py "C:\Users\emarquez\personal-claude-docs\scripts\generate_presentation.py" `
   config.yaml -o presentation.pptx
```

### 4. Manual Review & Refinement
- User opens generated presentation
- Reviews content, formatting, flow
- Makes manual adjustments in PowerPoint
- Refines charts, adds graphics, adjusts layout

### 5. Finalization
- User moves final version to `03-Deliverables/`
- Renames with Safari naming convention: `YYYYMMDD Description.pptx`
- Ready for SharePoint publication

---

## Key Success Factors

| Factor | Why It Worked |
|--------|---------------|
| **Configuration-based** | Separates content from formatting; easy to iterate |
| **Template cleaning** | Starts fresh with only brand elements |
| **Color coding** | Visual consistency across comparison tables |
| **Two-phase approach** | Generate draft → Manual refinement |
| **Project structure** | Clear progression: Drafts → Deliverables |

---

## Learnings from CMMC Presentation

**What worked well:**
1. YAML config captured all content clearly
2. Comparison tables (15 criteria) rendered correctly with color coding
3. Template cleaning removed clutter
4. Manual refinement phase allowed for final polish
5. File size reduced from 1.5MB (uncleaned) to 136KB (final)

**Content structure that worked:**
- Executive Summary upfront (recommendation first)
- Context/background (why this matters)
- Vendor overview (high-level)
- Detailed comparisons (cost, features, criteria matrices)
- Clear recommendation with justification
- Why NOT alternatives (address objections)
- Next steps with timeline

**For future presentations:**
- Start with detailed markdown outline (easier to review/iterate)
- Create YAML config from outline
- Generate initial draft with script
- Allow time for manual refinement
- Use consistent naming: `YYYYMMDD Description.pptx`

---

## Related Files

- **Script:** `personal-claude-docs/scripts/generate_presentation.py`
- **Template:** `S:\...\Grand Rapids IT Hub\10_Templates\01_PPT_Template.pptx`
- **Example config:** `Safari-CMMC-Level-2\02-Drafts\cmmc-presentation-config.yaml`
- **Example outline:** `Safari-CMMC-Level-2\02-Drafts\executive-presentation-outline-2026-05-11.md`

---

## Future Enhancements

Ideas for improving the workflow:
- [ ] Support for charts (bar, pie) generation
- [ ] Image insertion from config
- [ ] Speaker notes generation
- [ ] Multiple template support (not just Safari)
- [ ] Reusable slide library (common slides)

---

**Last Updated:** 2026-05-12
**Validated By:** CMMC Level 2 Vendor Comparison presentation
