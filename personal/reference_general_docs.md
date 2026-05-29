---
name: General Docs location
description: Where reusable scripts and tools are stored
type: reference
---

# General Docs Location

When Eduardo mentions "General Docs", he refers to:

```
C:\Users\emarquez\personal-claude-docs
```

**Not to be confused with:**
- `personal-claude-doc` (singular) - incorrect
- Vault directories in OneDrive

## Purpose

General Docs (`personal-claude-docs`) stores:
- Reusable automation scripts (`scripts/`)
- Claude Code configuration (`.claude/`)
- Git-synced content across computers

## Directory Structure

```
personal-claude-docs/
├── .claude/
│   ├── enterprise/          # Shared configuration
│   ├── users/emarquez-personal/  # Personal preferences
│   └── project-memory/      # Project-specific memory
├── scripts/                 # Reusable automation scripts
│   ├── generate_presentation.py
│   └── README.md
└── README.md
```

## How to Apply

When user says "save to General Docs" or "put in General Docs", use path:
`C:\Users\emarquez\personal-claude-docs\scripts\`

For scripts, documentation, or reusable tools.
