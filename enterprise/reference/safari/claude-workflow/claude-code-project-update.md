# Safari Trace Project Update for Claude Code

## Recent Changes - January 16, 2026

### Major Addition: Safari Studio Diagram Template System

We've added a complete template system for AI-powered, interactive architecture diagram generation using JSX.

## New Files Added

### Core Template Files

**Location:** `packages/studio/shared/`

1. **DiagramComponents.jsx**
   - Reusable SVG component library for diagrams
   - Components: ServiceNode, DatabaseNode, APINode, QueueNode, ActorNode, AdapterNode
   - Flow connectors with animation support
   - System boundaries, state machines, callout boxes
   - Imports `SafariTheme` from `../../../safari-brand-assets/theme/SafariTheme`

2. **DiagramPromptBuilder.js**
   - AI prompt construction system for Claude API
   - Context extraction from natural language input
   - Template selection logic (architecture, BPMN, data pipeline, decision tree)
   - Complexity detection
   - Generates structured JSON schema prompts

**Location:** `packages/studio/templates/architecture/`

3. **ArchitectureDiagramTemplate.jsx**
   - Base React template for architecture diagrams
   - 5 standard views (tabs):
     - System Overview - High-level component relationships
     - Module Architecture - Internal module structure
     - Integration Patterns - How systems connect
     - Data Model - Entity relationships
     - Workflow States - State machines
   - Tab navigation with Safari branding
   - Imports `SafariTheme` from `../../../safari-brand-assets/theme/SafariTheme`

### Documentation Files

**Location:** `docs/`

4. **FILE-PLACEMENT-GUIDE.md** - Installation instructions
5. **diagram-template-system.md** - Complete system architecture
6. **implementation-guide.md** - Step-by-step implementation guide
7. **safari-studio-templates-README.md** - Quick start overview

## How It Works

```
User Input (Natural Language)
  ↓
DiagramPromptBuilder extracts context & selects template
  ↓
Builds structured JSON prompt for Claude API
  ↓
Claude generates diagram data (JSON)
  ↓
ArchitectureDiagramTemplate renders interactive JSX diagram
  ↓
Safari-branded, interactive, exportable output
```

## Key Integration Points

### Brand Assets
- All templates import from existing `safari-brand-assets/theme/SafariTheme.js`
- No duplication of branding code
- Single source of truth for colors, typography, spacing, gradients

### Import Path Structure
```javascript
// From packages/studio/shared/ or packages/studio/templates/architecture/
import SafariTheme from '../../../safari-brand-assets/theme/SafariTheme';
```

This assumes directory structure:
```
C:\Users\dkmcintyre\
├── safari-brand-assets/
│   └── theme/
│       └── SafariTheme.js
└── safari-trace/
    └── packages/
        └── studio/
```

## Template System Features

### Standard Architecture Diagram Views
Every architecture diagram includes:
1. **System Overview** - Components, connections, zones
2. **Module Architecture** - Internal boundaries, shared infrastructure
3. **Integration Patterns** - REST, events, webhooks, file-based
4. **Data Model** - Entity tables with fields and relationships
5. **Workflow States** - State machines with transitions

### Color Coding (from SafariTheme)
- **Blue (#60a5fa)** - Internal systems/services
- **Green (#34d399)** - Integration/middleware layer
- **Pink (#f472b6)** - External APIs
- **Amber (#fbbf24)** - Databases/data stores
- **Purple (#a78bfa)** - User applications

### Interactive Elements
- Hover effects on all nodes
- Animated flow lines for data movement
- Tab navigation between views
- Responsive SVG layouts

## Safari Theme Structure Reference

The templates expect `SafariTheme` to have this structure:

```javascript
SafariTheme = {
  colors: {
    primary: '#9B1C1C',
    technical: { blue, green, pink, purple, amber },
    semantic: { internal, integration, external, data, user },
    text: { primary, secondary, tertiary, muted },
    state: { success, warning, error, info }
  },
  typography: {
    fontFamily: { primary, mono },
    fontSize: { xs, sm, base, lg, xl, '2xl', '3xl', '4xl' },
    fontWeight: { normal, medium, semibold, bold }
  },
  spacing: { xs, sm, md, lg, xl, '2xl', '3xl' },
  borderRadius: { sm, md, lg, xl },
  gradients: { header, background, blue, green, pink, purple, amber },
  backgrounds: { gradient }
}
```

## Next Implementation Steps

### Phase 1: Safari Studio UI
Create user interface components in `packages/studio/frontend/src/components/`:
- **TemplateSelector.jsx** - Template type selection UI
- **DiagramGenerator.jsx** - User input and generation orchestration
- **DiagramPreview.jsx** - Live preview of generated diagrams
- **DiagramExporter.jsx** - Export to HTML, PNG, PDF

### Phase 2: Claude API Integration
Create API service in `packages/studio/frontend/src/api/`:
- **claudeAPI.js** - Anthropic API client
- Implement prompt sending
- Handle JSON response parsing
- Add retry logic for malformed JSON

### Phase 3: Testing
- Test with sample prompts
- Validate generated JSON against schemas
- Test all 5 views render correctly
- Test with different system types (e-commerce, healthcare, etc.)

## Known Issues to Watch For

### Comment Syntax
When working with JSX files, ensure:
- All JSX comments use `{/* comment */}` syntax
- No unclosed HTML-style `<!-- comments`
- All multi-line comments are properly closed with `*/`

### Import Path Issues
If imports fail, verify:
- safari-brand-assets repo is at correct relative path
- SafariTheme.js exists at `safari-brand-assets/theme/SafariTheme.js`
- Adjust import paths if directory structure differs

### SVG Rendering
- Ensure all `<defs>` are inside `<svg>` tags
- Gradient IDs must be unique
- Pattern IDs must match their references

## Example Usage

```javascript
import ArchitectureDiagramTemplate from './packages/studio/templates/architecture/ArchitectureDiagramTemplate';
import { DiagramPromptBuilder } from './packages/studio/shared/DiagramPromptBuilder';

// User describes system
const userInput = "E-commerce platform with payment processing, inventory, and order fulfillment";

// Build AI prompt
const { prompt, template, complexity } = DiagramPromptBuilder.buildPrompt(userInput);

// Call Claude API (implementation needed)
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }]
  })
});

const data = await response.json();
const diagramData = JSON.parse(data.content[0].text);

// Render diagram
return <ArchitectureDiagramTemplate {...diagramData} />;
```

## File Sizes
- DiagramComponents.jsx: ~15 KB
- ArchitectureDiagramTemplate.jsx: ~17 KB  
- DiagramPromptBuilder.js: ~11 KB
- Total addition: ~2,957 lines of code

## Commit Information
- **Commit**: 48fc4b0
- **Message**: "Add Safari Studio diagram template system"
- **Date**: January 16, 2026
- **Files Added**: 8 files
- **Repository**: https://github.com/SafariCircuitsLLC/safari-trace

---

This template system enables Safari Studio to generate professional, branded, interactive architecture diagrams from natural language descriptions using Claude AI.
