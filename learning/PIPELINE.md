# Learning to CLAUDE.md Enforcement Pipeline

## Overview

This pipeline ensures that best practices learned from videos, research, and experience are systematically promoted into CLAUDE.md files where they become **enforced team standards**.

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐     ┌──────────────────┐
│   LEARN         │────▶│   DOCUMENT       │────▶│   PROMOTE       │────▶│   ENFORCE        │
│                 │     │                  │     │                 │     │                  │
│ - YouTube       │     │ - best-practices/│     │ - Review        │     │ - CLAUDE.md      │
│ - Articles      │     │ - youtube-       │     │ - Validate      │     │ - Skills         │
│ - Experience    │     │   analyses/      │     │ - Approve       │     │ - Hooks          │
└─────────────────┘     └──────────────────┘     └─────────────────┘     └──────────────────┘
```

## Stage 1: LEARN

**Input:** Raw content (videos, articles, trial-and-error)

**Actions:**
1. Watch/read content
2. Extract key insights
3. Note Safari-specific relevance

**Output:** Mental model of the practice

## Stage 2: DOCUMENT

**Input:** Key insights from learning

**Actions:**
1. Create file in `youtube-analyses/` or update `best-practices/{domain}.md`
2. Use standard templates with YAML metadata
3. Tag with `implementation_status: documented`
4. Rate `safari_relevance: high|medium|low`

**Output:** Documented practice with metadata

## Stage 3: PROMOTE

**Input:** Documented practice with `safari_relevance: high`

**Promotion Criteria:**
- [ ] Practice is validated (tested in real work)
- [ ] Practice has clear enforcement rules
- [ ] Practice applies across multiple projects
- [ ] Team agrees this should be standard

**Actions:**
1. Update `implementation_status: validated`
2. Write enforcement rule in promotion format:
   ```markdown
   ## [Practice Name]

   **Do:** [What to do]
   **Don't:** [What not to do]
   **Why:** [Reasoning]
   **Source:** [Link to learning doc]
   ```
3. Add to `~/.claude/learning/promoted/` queue

**Output:** Promotion-ready practice

## Stage 4: ENFORCE

**Input:** Promotion-ready practice

**Target Locations:**

| Scope | File | When to Use |
|-------|------|-------------|
| Global (all projects) | `~/.claude/CLAUDE.md` | Universal practices |
| Safari projects | `safari-trace/.claude/CLAUDE.md` | Safari-specific |
| Specific domain | Project CLAUDE.md | Project-specific |

**Enforcement Levels:**

| Level | Format in CLAUDE.md | Claude Behavior |
|-------|---------------------|-----------------|
| **MUST** | "ALWAYS do X" / "NEVER do Y" | Claude will follow strictly |
| **SHOULD** | "Prefer X over Y" | Claude will default to this |
| **MAY** | "Consider X when..." | Claude will use judgment |

**Output:** Enforced practice in CLAUDE.md

## Promotion Template

When adding to CLAUDE.md, use this format:

```markdown
### [Practice Name]

**Rule:** [MUST|SHOULD|MAY] [action]

**Do:**
- Specific action 1
- Specific action 2

**Don't:**
- Anti-pattern 1
- Anti-pattern 2

**Why:** [Brief explanation]

**Source:** [Link to learning/best-practices/{file}.md]
```

## Tracking Promotions

Update `implementation-tracking/status.md` when promoting:

```markdown
| Practice | Source | Status | Promoted To | Date |
|----------|--------|--------|-------------|------|
| Component naming | ui-design.md | Enforced | global CLAUDE.md | 2026-01-18 |
```

## Quick Commands

### Promote a Practice
1. Verify practice in `best-practices/`
2. Write enforcement rule
3. Add to appropriate CLAUDE.md
4. Update tracking status

### Review Promoted Practices
```bash
# List all enforced rules across CLAUDE.md files
grep -r "MUST\|SHOULD\|NEVER\|ALWAYS" ~/.claude/*.md
grep -r "MUST\|SHOULD\|NEVER\|ALWAYS" ~/safari-trace/.claude/*.md
```

## Example Promotion

### Before (in best-practices/ui-design.md):
```markdown
## Component Naming
Use PascalCase for component names. Prefix Safari-specific components with "Safari".
Status: validated
```

### After (in CLAUDE.md):
```markdown
### Component Naming Convention

**Rule:** MUST use PascalCase for React components

**Do:**
- `SafariButton.tsx`
- `UserProfileCard.tsx`
- `DataTable.tsx`

**Don't:**
- `safari-button.tsx` (kebab-case)
- `safarButton.tsx` (camelCase)
- `Button.tsx` without Safari prefix for branded components

**Why:** Consistency across codebase, easy identification of Safari-branded vs generic components

**Source:** [best-practices/ui-design.md](~/.claude/learning/best-practices/ui-design.md)
```

---

*This pipeline ensures learning doesn't stay as documentation - it becomes enforced behavior.*
