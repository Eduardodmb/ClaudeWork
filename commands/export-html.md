# Export HTML

Generate a branded HTML deliverable from a markdown source file.

## Instructions

When the user runs `/export-html` or says "export to HTML", "create HTML version", "generate shareable HTML":

### Step 1: Identify Source Document

If not specified, ask the user which markdown file to export. Otherwise, read the specified file.

### Step 2: Parse YAML Frontmatter

Extract visualization metadata from the source:

```yaml
---
id: DOC-001
title: Document Title
domain: governance
visualization: technical | strategic | process | governance | business
sensitivity: internal | confidential | public
---
```

### Step 3: Determine Theme

Apply STD-VIS-001 visualization governance:

| visualization | Theme | Background | Diagram Style |
|---------------|-------|------------|---------------|
| `technical` | Dark | #0F172A | Dark containers |
| `strategic` | Mixed | Light body, dark diagrams | Accent colors |
| `process` | Light | #FEFDFF | Light containers |
| `governance` | Light + Red | #FEFDFF | Red accent borders |
| `business` | Light | #FEFDFF | Amber/Green accents |

### Step 4: Generate HTML Structure

Use the standard Safari HTML deliverable structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[title] - Safari Circuits</title>
    <style>
        /* Import Poppins font */
        /* Apply theme-specific CSS variables */
        /* Include standard Safari styling */
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover">
        <!-- Full 7-path Safari logo SVG -->
        <h1>[title]</h1>
        <h2>[subtitle if present]</h2>
        <div class="cover-divider"></div>
        <p class="cover-meta">Safari Circuits, LLC | [date] | [sensitivity]</p>
    </div>

    <!-- Content Pages -->
    <div class="content">
        <div class="page-header">
            <!-- Full 7-path Safari logo SVG -->
            <span class="page-header-title">[title]</span>
        </div>

        <!-- Converted markdown content -->
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>Safari Circuits, LLC | [sensitivity]</p>
    </div>
</body>
</html>
```

### Step 5: Convert Content

Transform markdown to HTML:

| Markdown | HTML |
|----------|------|
| `# Heading` | `<h1>Heading</h1>` |
| `## Heading` | `<h2>Heading</h2>` |
| Tables | `<table>` with Safari styling |
| Code blocks | `<pre><code>` with dark background |
| Lists | `<ul>` or `<ol>` |
| Links | `<a>` styled appropriately |
| Bold/Italic | `<strong>` / `<em>` |

### Step 6: Handle Diagrams

**CRITICAL:** Do NOT use Mermaid in HTML exports. Instead:

1. **If diagram exists:** Convert to inline SVG using primitives from `html-diagram-components.html`
2. **If Mermaid block present:** Translate to equivalent inline SVG
3. **If too complex:** Create a simplified representation or note "[Diagram available in Safari Docs Portal]"

Reference: `organizational-docs/shared/assets/diagrams/html-diagram-components.html`

### Step 7: Apply Safari Logo

**MUST use all 7 paths.** Read the complete logo from:
`organizational-docs/shared/branding/assets/logos/svg/safari-logo.svg`

Never truncate. The logo requires exactly 7 `<path>` elements with `fill="#9B1C1C"`.

### Step 8: Write Output

Save to: `organizational-docs/deliverables/{audience}/[kebab-case-title].html`

Where `{audience}` is determined by `sensitivity`:
- `public` → `deliverables/external/`
- `internal` → `deliverables/internal/`
- `confidential` → `deliverables/leadership/`

### Step 9: Validate

Check:
- [ ] Logo has all 7 paths
- [ ] Theme matches visualization type
- [ ] All diagrams render (no raw Mermaid)
- [ ] Tables are properly styled
- [ ] Code blocks have dark background
- [ ] File saved to correct location

### Step 10: Report

```
✅ HTML Export Complete

Source: [source path]
Output: [output path]
Theme: [theme applied]
Diagrams: [count] inline SVG

Open in browser to preview.
```

## Quick Usage

```
/export-html docs/standards/STD-VIS-001.md
```

or

```
User: "export the context governance whitepaper to HTML"
Claude: [reads source, applies governance theme, generates HTML]
```

## Related

- `html-deliverable-styling.md` - Full styling reference
- `html-diagram-components.html` - Diagram primitives
- `STD-VIS-001` - Visualization governance standard
- `/document` - Create new documentation
