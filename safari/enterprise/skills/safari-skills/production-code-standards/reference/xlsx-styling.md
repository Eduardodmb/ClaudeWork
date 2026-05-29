# Safari Excel (XLSX) Styling Guide

Reference for creating branded Excel workbooks with Safari Circuits styling.

## When to Use Excel

| Use Case | Format | Notes |
|----------|--------|-------|
| Financial models | XLSX | Calculations, scenarios |
| Data analysis | XLSX | Pivots, charts |
| Project tracking | XLSX | Status, timelines |
| Exports/reports | XLSX | Data delivery |

---

## Brand Asset Requirements

### NEVER Fabricate Visual Assets

Excel rarely needs logos, but if included:
- **Source:** `shared/branding/assets/logos/png/safari-logo.png`
- **Placement:** Header row or cover sheet only

---

## Workbook Setup

### Default Settings

| Setting | Value |
|---------|-------|
| Default font | Poppins 10pt (or Segoe UI fallback) |
| Column width | Auto-fit content |
| Row height | 18pt minimum |
| Gridlines | Show (print: hide) |

### Theme Colors

Create custom theme: **Safari Theme**

| Slot | Color | Hex | Use |
|------|-------|-----|-----|
| Text/Background Dark 1 | Dark Blue | `#0F172A` | Headers |
| Text/Background Light 1 | Off-white | `#FEFDFF` | Background |
| Text/Background Dark 2 | Text | `#1E1E1E` | Body text |
| Text/Background Light 2 | Surface | `#F8F7F5` | Alt rows |
| Accent 1 | Safari Red | `#9B1C1C` | Primary |
| Accent 2 | Phase Blue | `#60a5fa` | Secondary |
| Accent 3 | Phase Green | `#34d399` | Positive |
| Accent 4 | Phase Orange | `#f59e0b` | Warning |
| Accent 5 | Phase Purple | `#a78bfa` | Analytics |
| Accent 6 | Phase Pink | `#ec4899` | Special |

---

## Typography

### Font Hierarchy

| Use | Font | Size | Style |
|-----|------|------|-------|
| Sheet title | Poppins | 14pt | Bold |
| Section header | Poppins | 11pt | Bold |
| Column header | Poppins | 10pt | Bold |
| Body data | Poppins | 10pt | Regular |
| Notes/caption | Poppins | 9pt | Italic |

### Number Formats

| Data Type | Format | Example |
|-----------|--------|---------|
| Currency | `$#,##0.00` | $1,234.56 |
| Percentage | `0.0%` | 85.5% |
| Date | `MMM D, YYYY` | Jan 15, 2026 |
| Integer | `#,##0` | 1,234 |
| Decimal | `#,##0.00` | 1,234.56 |

---

## Table Styling

### Header Row

```
Background: #0F172A (Dark Blue)
Font: Poppins 10pt, Bold, White
Alignment: Center (or left for text)
Border: Bottom 2pt, Safari Red
```

### Data Rows

```
Background: Alternating White / #F8F7F5
Font: Poppins 10pt, Regular, #1E1E1E
Alignment: Left (text), Right (numbers), Center (dates)
Border: Bottom 1pt, #E5E5E5
```

### Total Row

```
Background: #F8F7F5
Font: Poppins 10pt, Bold, #1E1E1E
Border: Top 2pt, Safari Red
```

### Table Style Definition

Create as: **Safari Table**

| Element | Fill | Font | Border |
|---------|------|------|--------|
| Header | `#0F172A` | White, Bold | Bottom 2pt red |
| Odd row | White | Dark, Regular | Bottom 1pt gray |
| Even row | `#F8F7F5` | Dark, Regular | Bottom 1pt gray |
| Total | `#F8F7F5` | Dark, Bold | Top 2pt red |

---

## Conditional Formatting

### Status Indicators

| Status | Icon | Background | Text |
|--------|------|------------|------|
| Good/Complete | ✓ | Light green | Green |
| Warning | ⚠ | Light orange | Orange |
| Bad/Blocked | ✕ | Light red | Red |
| Neutral | – | White | Gray |

### Data Bars

- Positive: Phase Blue `#60a5fa`
- Negative: Safari Red `#9B1C1C`
- Bar only (no numbers hidden)

### Color Scales

**Performance scales:**
- High: Phase Green `#34d399`
- Medium: Phase Orange `#f59e0b`
- Low: Safari Red `#9B1C1C`

---

## Chart Styling

### Color Palette (in order)

1. Safari Red `#9B1C1C`
2. Phase Blue `#60a5fa`
3. Phase Green `#34d399`
4. Phase Orange `#f59e0b`
5. Phase Purple `#a78bfa`
6. Phase Pink `#ec4899`

### Chart Elements

| Element | Style |
|---------|-------|
| Background | White or transparent |
| Title | Poppins 12pt, Bold, centered above |
| Axis labels | Poppins 9pt, Gray |
| Data labels | Poppins 9pt, outside/end |
| Legend | Below chart, horizontal |
| Gridlines | Light gray, horizontal only |
| Border | None |

### Chart Types by Use Case

| Data Type | Recommended Chart |
|-----------|------------------|
| Comparison | Clustered bar/column |
| Trend over time | Line chart |
| Part of whole | Pie (≤5 slices) or Donut |
| Distribution | Histogram |
| Correlation | Scatter plot |

---

## Sheet Organization

### Cover/Summary Sheet

```
┌─────────────────────────────────────────┐
│ A1: [Safari Logo]                       │
│ A3: Workbook Title (14pt, Bold)         │
│ A4: Description (10pt, Gray)            │
│ A6: Prepared by: Name                   │
│ A7: Date: Jan 26, 2026                  │
│ A9: Table of Contents:                  │
│ A10: → Sheet 1 (hyperlink)              │
│ A11: → Sheet 2 (hyperlink)              │
└─────────────────────────────────────────┘
```

### Data Sheet Structure

```
Row 1: Sheet title (merged, centered)
Row 2: Description or filters
Row 3: (blank spacer)
Row 4: Column headers
Row 5+: Data
Last row: Totals (if applicable)
```

### Sheet Naming

- Use clear, short names: "Summary", "Data", "Analysis"
- No special characters
- Max 31 characters
- Prefix with number for ordering: "01_Summary"

---

## Print Setup

### Page Layout

| Setting | Value |
|---------|-------|
| Orientation | Landscape (usually) |
| Scaling | Fit to 1 page wide |
| Margins | Normal (0.75") |
| Header | Left: Logo, Right: Date |
| Footer | Center: Page X of Y |

### Print Titles

- Rows to repeat: Row with column headers
- Gridlines: Off for printing
- Black and white: Consider for copying

---

## Data Validation

### Dropdown Lists

- Use named ranges for list sources
- Clear error messages
- Input messages for guidance

### Input Validation

| Data Type | Validation | Message |
|-----------|------------|---------|
| Dates | Date between range | "Enter date YYYY-MM-DD" |
| Numbers | Whole number > 0 | "Enter positive number" |
| Text | Text length ≤ 100 | "Max 100 characters" |
| Selection | List from range | "Select from list" |

---

## Named Ranges & Structure

### Naming Convention

```
tbl_[SheetName]_[Description]
rng_[SheetName]_[Description]
val_[Description]
```

Examples:
- `tbl_Sales_Data` - Main data table
- `rng_Dates_Column` - Date column range
- `val_TaxRate` - Single value

### Table References

Always use structured references in formulas:
```
=SUM(tbl_Sales[Revenue])
=AVERAGE(tbl_Sales[Margin])
```

---

## Checklist: Excel Workbook

### Setup
- [ ] Safari Theme colors applied
- [ ] Poppins font (or Segoe UI fallback)
- [ ] Consistent column widths
- [ ] Print area defined

### Tables
- [ ] Safari Table style applied
- [ ] Header row frozen
- [ ] Alternating row colors
- [ ] Totals row styled

### Data Quality
- [ ] Number formats consistent
- [ ] Data validation on inputs
- [ ] Named ranges for key data
- [ ] No merged cells in data areas

### Charts
- [ ] Theme colors used
- [ ] Clear titles and labels
- [ ] Appropriate chart type
- [ ] Legend positioned clearly

### Documentation
- [ ] Cover sheet with title/date
- [ ] Sheet names are clear
- [ ] Notes explain calculations
- [ ] Version number if tracked

---

## Reference Files

- **Safari Logo:** `shared/branding/assets/logos/png/safari-logo.png`
- **Template:** `shared/templates/safari-workbook-template.xlsx`
- **Brand Guidelines:** `shared/branding/README.md`
