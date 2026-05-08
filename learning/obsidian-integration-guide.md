# Obsidian Integration Guide

**Purpose:** Use Obsidian as a thinking tool that feeds validated knowledge into Claude Code.

## Setup

### 1. Create Obsidian Vault

**Location:** `C:\Users\emarquez\OneDrive\ObsidianVault\` (or any OneDrive folder)

**Structure:**
```
ObsidianVault/
├── 00-Inbox/              # Quick captures, unprocessed
├── 01-Daily/              # Daily notes
├── 02-Projects/           # Project-specific notes
│   └── BeFirst/
├── 03-Areas/              # Ongoing responsibilities
│   ├── IT-Management/
│   └── Team-Leadership/
├── 04-Resources/          # Reference material
└── 05-Archive/            # Completed/inactive
```

### 2. Capture Workflow

**In Obsidian:**
1. Brain dump freely (Daily notes, Inbox)
2. Link related concepts
3. Refine over time
4. Tag with #to-claude when validated

**Extract to Claude:**
1. Copy validated insights from Obsidian
2. Add to `~/.claude/CLAUDE.md` (personal section)
3. Or create file in `~/.claude/learning/`
4. Claude picks up automatically next session

### 3. Sync Strategy

| Content Type | Primary Location | Sync Method |
|--------------|------------------|-------------|
| **Raw thoughts** | Obsidian vault (OneDrive) | OneDrive sync |
| **Validated knowledge** | `~/.claude/` files | Git (organizational-docs) |
| **Project docs** | Git repos | Git version control |
| **Quick reference** | Obsidian + CLAUDE.md | Dual-maintain |

## Obsidian Plugins for Claude Workflow

### Recommended:
- **Templater** - Daily note templates with prompts
- **Dataview** - Query notes tagged #to-claude
- **Git** - Backup vault to GitHub (optional)
- **Copy as HTML** - Export to share with non-Obsidian users

### Dataview Query Example:
```dataview
TABLE file.mtime as "Last Modified"
FROM #to-claude AND -"05-Archive"
SORT file.mtime DESC
```

Shows all notes ready to extract to Claude context.

## Daily Note Template

Create in Obsidian: `Templates/Daily.md`

```markdown
# {{date:YYYY-MM-DD}}

## Morning Brain Dump
-

## Work Sessions
### Session 1:
**Focus:**
**Outcome:**
**Learnings:** #to-claude

### Session 2:
**Focus:**
**Outcome:**
**Learnings:** #to-claude

## Decisions Made
-

## Questions for Tomorrow
-

## Context for Claude
<!-- Extract validated items here, then copy to ~/.claude/CLAUDE.md -->
```

## When to Use What

| Scenario | Tool |
|----------|------|
| "I need to think through this problem" | Obsidian |
| "I want Claude to remember my preference" | CLAUDE.md |
| "Quick capture during meeting" | Obsidian |
| "Document technical decision" | Git repo + CLAUDE.md |
| "Link concepts across projects" | Obsidian graph |
| "Ensure Claude knows this pattern" | ~/.claude/learning/ |

## Example: Obsidian → Claude Flow

**1. In Obsidian (thinking):**
```markdown
# BeFirst Database Migration Approach

## Problem
Current 4-database setup is complex, considering consolidation.

## Options
- Option A: Keep separate (current state)
  - Pro: Clear separation of concerns
  - Con: Complex ETL, sync issues

- Option B: Consolidate to single DWH
  - Pro: Simpler queries, single source
  - Con: Large migration effort, risk

## Decision Factors
- Team bandwidth (limited)
- Production uptime requirements (critical)
- Future Azure migration plans

## My Thinking
Start with Option A, plan Option B for Azure migration phase.
Incremental > big bang.

#to-claude #befirst #decision
```

**2. Extract to CLAUDE.md (validated knowledge):**
```markdown
### BeFirst Database Strategy (2026-05-08)
- **Current**: 4-database architecture (PROD_DWH, MES, MACHINES, TESTERS)
- **Approach**: Maintain separation for now, consolidate during Azure migration
- **Rationale**: Incremental changes, minimize production risk
- **Review date**: Q3 2026 (Azure planning phase)
```

## Benefits of This Approach

1. **Obsidian strengths**: Flexible thinking, graph view, quick capture
2. **Claude strengths**: Automatic context loading, version control, team sharing
3. **Best of both**: Use each tool for what it's good at
4. **No duplication**: Clear boundaries between scratchpad and formalized knowledge

## Maintenance

- **Weekly**: Review Obsidian notes tagged #to-claude
- **Extract**: Move validated insights to CLAUDE.md or learning/
- **Archive**: Move extracted notes to Obsidian Archive
- **Sync**: OneDrive handles Obsidian, Git handles Claude context
