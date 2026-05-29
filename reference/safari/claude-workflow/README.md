---
id: WF-CL-001
title: Claude Workflow - Shared Context Layer
domain: operations
visualization: process
sensitivity: internal
last_updated: 2026-02-10
---

# Claude Workflow - Shared Context Layer

This directory contains the **team-wide context layer** for Claude Code sessions across Safari Circuits.

## Purpose

```
LOCAL (~/.claude/state/)          SHARED (this directory)
├── phase.md         ──sync──►    ├── learnings/
├── session.json                  ├── state-templates/
└── (user-specific)               └── team-context.md
```

**Flow:**
1. User works locally → learnings captured
2. Valuable learnings → promoted to `learnings/`
3. Team pulls updates → everyone benefits
4. Workflow improves continuously

## Directory Structure

```
shared/claude-workflow/
├── README.md                 # This file
├── team-context.md           # Current team-wide context (auto-updated)
├── learnings/                # Aggregated learnings from all sessions
│   ├── corrections.md        # Mistakes and fixes
│   ├── patterns.md           # Effective patterns discovered
│   └── integrations.md       # Tool/MCP learnings
├── state-templates/          # Templates for local state files
│   ├── phase.md              # Template for ~/.claude/state/phase.md
│   └── session.json          # Template for session tracking
└── sync/                     # Sync configuration
    └── sync-rules.md         # What syncs and when
```

## How Context Flows

### From User → Team (Promotion)

When a user discovers something valuable:
1. Claude captures it in local `~/.claude/state/phase.md`
2. At session end, Claude evaluates for team relevance
3. If valuable: auto-commit to `shared/claude-workflow/learnings/`
4. Team gets it on next pull

### From Team → User (Inheritance)

When a user starts work:
1. Claude reads `organizational-docs/.claude/CLAUDE.md` (org standards)
2. Claude reads `shared/claude-workflow/team-context.md` (current context)
3. Claude reads local `~/.claude/state/phase.md` (personal state)
4. User gets accumulated team wisdom automatically

## Auto-Sync Rules

| Event | Local Action | Repo Action |
|-------|--------------|-------------|
| Mistake corrected | Add to local learnings | Commit to `learnings/corrections.md` |
| New pattern works | Note in phase.md | Promote to `learnings/patterns.md` |
| MCP/tool insight | Update local CLAUDE.md | Commit to `learnings/integrations.md` |
| Session end | Checkpoint locally | Push if learnings exist |
| Session start | Load local state | Pull latest team context |

## For New Team Members

1. Clone `organizational-docs`
2. Claude automatically loads team context
3. Start working - you inherit all team learnings
4. Your discoveries feed back to the team

## Maintenance

- **Weekly:** Review `learnings/` for promotion to org CLAUDE.md
- **Monthly:** Archive old learnings, update team-context.md
- **Quarterly:** Review workflow effectiveness, refine sync rules
