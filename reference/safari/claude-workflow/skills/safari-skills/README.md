# Safari Circuits Skills

Custom Claude Code skills for Safari Circuits engineering workflows.

## Available Skills

| Skill | Description | Use When |
|-------|-------------|----------|
| **production-code-standards** | Near production-ready code generation with Safari patterns | Writing TypeScript, C#, React, MCP servers |

## Installation

These skills are already installed in `~/.claude/skills/safari-skills/`.

To invoke during a session, Claude should read the relevant SKILL.md when generating code for Safari products.

## Skill: Production Code Standards

**Purpose:** Generate near production-ready code that follows Safari Circuits engineering patterns.

**What It Includes:**
- TypeScript standards (strict typing, Zod validation, async patterns)
- C#/.NET standards (clean architecture, DI, EF Core)
- Safari brand UI (colors, typography, spacing from SafariTheme.js)
- API design patterns (RESTful conventions, error handling)
- Code review checklist
- Design tools integration (Figma MCP, Storybook)

**Reference Files:**
- `reference/typescript-patterns.md` - Detailed TypeScript patterns
- `reference/design-system-integration.md` - Figma MCP setup and token export

## Context Sources

These skills are built from analysis of:

1. **Safari MCP Server** (`~/.claude/`) - TypeScript/MCP patterns
2. **BeFirst APIs** - C#/.NET backend patterns
3. **Safari Trace Brand** - Brand guidelines from `organizational-docs/shared/branding/`
4. **Industry MCPs** - Figma, Material UI, Storybook integration patterns

## Adding New Skills

Follow the pattern:
```
safari-skills/
├── {skill-name}/
│   ├── SKILL.md           # Main skill documentation
│   ├── reference/         # Supporting reference files
│   └── scripts/           # Optional automation scripts
└── README.md
```

## Related Resources

- **Global CLAUDE.md:** `~/.claude/CLAUDE.md`
- **Safari Theme:** `organizational-docs/shared/branding/assets/theme/SafariTheme.js`
- **Brand Standards:** `organizational-docs/shared/branding/STD-BRAND-*.md`
- **Existing Engineering Skills:** `~/.claude/skills/alirezarezvani-skills/engineering-team/`
