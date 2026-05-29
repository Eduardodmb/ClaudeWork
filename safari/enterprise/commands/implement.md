# /implement - Context-Engineered Implementation Phase

> Based on Dex Horthy's Frequent Intentional Compaction methodology from HumanLayer

## Purpose
Execute an approved implementation plan phase-by-phase, with verification checkpoints and intentional context compaction between phases.

## Prerequisites
- Plan approved (`~/.claude/worktrees/{task-id}/plan.md` with `status: approved`)
- Research available for reference

## Initial Response
When invoked, respond:
> "I'll implement the approved plan. Which task-id should I work on?"

If plan not found:
> "No approved plan found for {task-id}. Run /plan first to create one."

## Process

### Step 1: Load Minimal Context
- Read plan.md completely
- Check for existing progress markers (checkboxes)
- If progress exists, resume from first unchecked item
- Read ONLY files needed for current phase (not all referenced files)

### Step 2: Execute Current Phase
For each change in the phase:
1. Read the specific file section
2. Make the change
3. Mark checkbox in plan: `- [x]`
4. Verify with automated checks

**During implementation:**
- Follow plan intent, adapt to reality
- If plan doesn't match reality, STOP and document:
  - Expected: {what plan said}
  - Actual: {what you found}
  - Impact: {why this matters}
  - Request guidance before proceeding

### Step 3: Phase Verification
Run all automated verification from plan:
```
npm run test -- --grep "relevant tests"
npm run lint
npm run build
```

### Step 4: Human Checkpoint (MANDATORY)
After automated verification passes:

> **Phase {N} Complete**
>
> Automated checks passed:
> - Tests: PASS
> - Lint: PASS
> - Build: PASS
>
> **Manual verification needed:**
> - [ ] {item from plan}
> - [ ] {item from plan}
>
> Please verify and approve before I proceed to Phase {N+1}.

**DO NOT proceed without explicit approval.**

### Step 5: Compact Progress
After phase approval, update progress file:

`~/.claude/worktrees/{task-id}/progress.md`:
```markdown
---
last_updated: YYYY-MM-DD HH:MM
current_phase: {N}
status: in_progress | blocked | complete
---

# Progress: {Task Title}

## Completed Phases
- [x] Phase 1: {name} - {date}
- [x] Phase 2: {name} - {date}

## Current Phase
Phase {N}: {name}
- Started: {timestamp}
- Blocked: {reason if applicable}

## Context Refresh Notes
{Key state needed to resume if context resets}
- Files modified: ...
- Tests passing: ...
- Next step: ...
```

### Step 6: Context Management
If context exceeds 40%:
1. Update progress.md with full state
2. Compact plan.md (mark completed phases as done)
3. Start fresh session with: "Resume /implement for {task-id}"

## Resume Protocol
When resuming implementation:
1. Read progress.md first
2. Trust completed checkboxes
3. Resume from first unchecked item
4. Don't re-verify completed work

## Critical Rules

### Follow the Plan
- Plan is the guide, but reality matters
- If mismatch: stop, document, ask
- Never silently deviate

### Verify Everything
- Run automated checks after each phase
- Get human approval before proceeding
- Build, test, lint - every time

### Maintain Momentum
- You're implementing a solution, not checking boxes
- Keep end goal in mind
- If stuck for >2 attempts, ask for help

### Context Discipline
- Only load files needed for current phase
- Compress progress frequently
- If approaching 40%, checkpoint and continue

## Error Handling
If implementation fails:
1. Document exactly what failed
2. Check if plan needs updating
3. Ask: "Should I update the plan, try alternative, or escalate?"

Never loop on failing approaches.
