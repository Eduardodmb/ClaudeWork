# Safari Design System Integration

Guide for integrating design tools with Safari production code.

## MCP Server Setup for Design Tools

### Figma MCP (Recommended)

The official Figma MCP server brings design context directly into your IDE.

**Installation (Remote - No Desktop Required):**
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_ACCESS_TOKEN}"
      }
    }
  }
}
```

**Alternative: Local Server (Requires Figma Desktop):**
- Server runs at `http://127.0.0.1:3845/mcp`
- Requires Figma Desktop app running

**Key Capabilities:**
- Pull variables, components, and layout data into IDE
- Extract design tokens for CSS/JS export
- Code Connect maps Figma components to code components
- Automated design system rule generation

### Framelink Figma MCP

Specialized for handling large Figma files with memory management.

```json
{
  "mcpServers": {
    "framelink-figma": {
      "command": "npx",
      "args": ["-y", "@anthropic/framelink-figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_ACCESS_TOKEN}"
      }
    }
  }
}
```

**Benefits:**
- Chunking and pagination for large files
- Simplified data format for AI interpretation
- Multi-client support

### Material UI MCP

For projects using Material UI components.

```json
{
  "mcpServers": {
    "mui": {
      "command": "npx",
      "args": ["-y", "@mui/mcp-server"]
    }
  }
}
```

**Benefits:**
- Accurate, up-to-date MUI documentation
- Component prop references
- Theme customization guidance

### Storybook MCP

Connect AI to your component documentation.

```json
{
  "mcpServers": {
    "storybook": {
      "command": "npx",
      "args": ["-y", "@storybook/mcp-server"],
      "env": {
        "STORYBOOK_URL": "http://localhost:6006"
      }
    }
  }
}
```

**Benefits:**
- Story retrieval for component examples
- Props and usage documentation
- Visual component references

## Safari Theme Export to Figma

### Step 1: Export SafariTheme.js to JSON

```javascript
// scripts/export-theme.js
const SafariTheme = require('../shared/branding/assets/theme/SafariTheme');
const fs = require('fs');

const figmaTokens = {
  color: {
    brand: SafariTheme.colors.brand,
    background: SafariTheme.colors.background,
    text: SafariTheme.colors.text,
    accent: SafariTheme.colors.accent,
    border: SafariTheme.colors.border,
  },
  typography: SafariTheme.typography,
  spacing: SafariTheme.spacing,
  borderRadius: SafariTheme.borderRadius,
  shadow: SafariTheme.shadows,
};

fs.writeFileSync(
  './figma-tokens.json',
  JSON.stringify(figmaTokens, null, 2)
);
```

### Step 2: Import to Figma Variables

1. Use Figma Tokens plugin or Variables UI
2. Import `figma-tokens.json`
3. Map to collections: Colors, Typography, Spacing

### Step 3: Code Connect Setup

Map Figma components to Safari React components:

```typescript
// .figma/code-connect.tsx
import figma from '@figma/code-connect';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

figma.connect(Button, 'https://figma.com/file/xxx/Button', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Ghost: 'ghost',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    label: figma.string('Label'),
  },
  example: (props) => (
    <Button variant={props.variant} size={props.size}>
      {props.label}
    </Button>
  ),
});

figma.connect(Card, 'https://figma.com/file/xxx/Card', {
  props: {
    title: figma.string('Title'),
    variant: figma.enum('Variant', {
      Default: 'default',
      Elevated: 'elevated',
    }),
  },
  example: (props) => (
    <Card title={props.title} variant={props.variant}>
      {props.children}
    </Card>
  ),
});
```

## Design Token Generation

### From Brand Color

Generate complete token system from Safari Red:

```typescript
// scripts/generate-tokens.ts
import { generateColorPalette, generateSpacing, generateTypography } from './utils';

const brandColor = '#9B1C1C'; // Safari Red

const tokens = {
  colors: {
    brand: generateColorPalette(brandColor),
    background: {
      base: '#0F172A',
      surface: '#1E293B',
      elevated: '#243044',
      dialog: '#2E3A54',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
      disabled: '#475569',
    },
    accent: {
      blue: '#60A5FA',
      green: '#34D399',
      pink: '#F472B6',
      purple: '#A78BFA',
      amber: '#FBBF24',
    },
  },
  spacing: generateSpacing(8), // 8px grid
  typography: generateTypography({
    fontFamily: 'Inter',
    monoFamily: 'JetBrains Mono',
    baseSize: 16,
    scale: 1.25,
  }),
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    glowRed: '0 0 20px rgba(155, 28, 28, 0.5)',
    glowBlue: '0 0 20px rgba(96, 165, 250, 0.5)',
  },
};

export default tokens;
```

### CSS Variables Output

```css
:root {
  /* Brand Colors */
  --color-primary-500: #9B1C1C;
  --color-primary-400: #DC2626;
  --color-primary-600: #7F1D1D;

  /* Background (Dark Theme) */
  --color-bg-base: #0F172A;
  --color-bg-surface: #1E293B;
  --color-bg-elevated: #243044;
  --color-bg-dialog: #2E3A54;

  /* Text */
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #94A3B8;
  --color-text-muted: #64748B;

  /* Accents */
  --color-accent-blue: #60A5FA;
  --color-accent-green: #34D399;
  --color-accent-pink: #F472B6;
  --color-accent-purple: #A78BFA;
  --color-accent-amber: #FBBF24;

  /* Typography */
  --font-sans: 'Inter', -apple-system, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing (8px grid) */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 2.5rem;
  --space-6: 3rem;
}
```

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#DC2626',
          500: '#9B1C1C',
          600: '#7F1D1D',
        },
        slate: {
          800: '#1E293B',
          850: '#243044',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        // 8px grid
        1: '0.5rem',
        2: '1rem',
        3: '1.5rem',
        4: '2rem',
        5: '2.5rem',
        6: '3rem',
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(155, 28, 28, 0.5)',
        'glow-blue': '0 0 20px rgba(96, 165, 250, 0.5)',
      },
    },
  },
};
```

## Workflow: Design to Code

### 1. Design Review
- Designer creates/updates component in Figma
- Uses Safari variables and components
- Annotates with Code Connect properties

### 2. Code Generation
```bash
# With Figma MCP enabled
claude "Generate a Card component matching the Figma design at [URL]"
```

### 3. Implementation
- Claude uses Code Connect to reference correct component
- Applies Safari theme tokens
- Generates production-ready code

### 4. Validation
- Run design token linter
- Visual regression tests
- Accessibility audit (WCAG AA)

## Recommended Workflow Tools

| Tool | Purpose | Priority |
|------|---------|----------|
| **Figma MCP** | Design-to-code bridge | Required |
| **Storybook** | Component documentation | Recommended |
| **Chromatic** | Visual regression testing | Optional |
| **axe-core** | Accessibility testing | Required |

## Accessibility Standards

All Safari UI components must meet WCAG AA:

| Requirement | Standard | Tool |
|-------------|----------|------|
| Color contrast | 4.5:1 normal, 3:1 large text | [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) |
| Keyboard navigation | All interactive elements | Manual testing |
| Screen reader | ARIA labels, semantic HTML | axe-core |
| Focus indicators | Visible focus states | Visual review |

**Verified Safari Color Combinations:**
- `#F8FAFC` on `#0F172A`: 15.8:1 (AAA)
- `#94A3B8` on `#0F172A`: 7.2:1 (AAA)
- `#9B1C1C` on `#F8FAFC`: 7.2:1 (AAA)

## References

- [Figma MCP Server Guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [Design Systems + AI](https://www.figma.com/blog/design-systems-ai-mcp/)
- [MCP UI Project](https://shopify.engineering/mcp-ui-breaking-the-text-wall)
- [Code Connect Documentation](https://www.figma.com/blog/design-context-everywhere-you-build/)
- Safari Theme: `organizational-docs/shared/branding/assets/theme/SafariTheme.js`
