# /plan - Context-Engineered Planning Phase

> Based on Dex Horthy's Frequent Intentional Compaction methodology from HumanLayer

## Purpose
Transform research findings into a detailed, executable implementation plan that serves as the primary human review artifact. This is the highest-leverage review point: one bad plan line cascades into 100 bad code lines.

## Prerequisites
- Research phase complete (`~/.claude/worktrees/{task-id}/research.md` exists)
- OR user provides sufficient context for planning

## Initial Response
When invoked, respond:
> "I'll create an implementation plan. Do you have a research file to build from, or should we start fresh with your task description?"

## Process

### Step 1: Load Context
- Read the research artifact completely
- Read all files referenced in research
- Verify understanding with user before proceeding

### Step 2: Present Design Options (if applicable)
For non-trivial tasks, present 2-3 approaches with pros/cons:

| Approach | Pros | Cons | Files Touched |
|----------|------|------|---------------|
| A: ... | ... | ... | ~5 |
| B: ... | ... | ... | ~12 |

Ask user to choose before detailed planning.

### Step 3: Propose Phase Breakdown
Break work into testable phases. Each phase should:
- Be independently verifiable
- Not break existing functionality
- Produce a checkpoint-able state

Present phase summary and get approval before detail writing.

### Step 4: Write Detailed Plan
Create `~/.claude/worktrees/{task-id}/plan.md`:

```markdown
---
date: YYYY-MM-DD
task_id: {task-id}
research_file: research.md
estimated_phases: {N}
status: draft | approved | in_progress | complete
---

# Implementation Plan: {Task Title}

## Overview
{What we're building and why}

## Current State
{Summary from research - what exists today}

## Desired End State
{What success looks like, with verification methods}

## Scope Boundaries
**In Scope:**
- ...

**Explicitly Out of Scope:**
- ...

---

## Phase 1: {Phase Name}

### Overview
{What this phase accomplishes}

### Changes Required
- [ ] `path/to/file.ts:45` - {specific change description}
- [ ] `path/to/file.ts:120` - {specific change description}

### Success Criteria
**Automated Verification:**
- `npm run test -- --grep "relevant tests"`
- `npm run lint`

**Manual Verification:**
- [ ] {UI behavior to check}
- [ ] {Edge case to verify}

### Human Checkpoint
PAUSE after automated verification passes. Wait for approval before Phase 2.

---

## Phase 2: {Phase Name}
{Same structure as Phase 1}

---

## Testing Strategy
{Overall testing approach}

## Rollback Plan
{How to undo if something goes wrong}

## References
- Research: `./research.md`
- Related docs: ...
```

### Step 5: Get Approval
Present plan summary. Ask explicitly:
> "Please review the plan. Any changes needed before we proceed to implementation?"

Update plan based on feedback. Do NOT proceed to implementation without explicit approval.

## Key Guidelines

### Be Skeptical
- Question vague requirements
- Verify against actual code, not assumptions
- No unresolved questions in final plan

### Be Specific
- Include file paths with line numbers
- Write testable success criteria
- Use actual command syntax (not pseudocode)

### Be Practical
- Incremental, testable changes
- Consider rollback scenarios
- Include edge cases

### Be Concise
- Target: Plan under 200 lines
- Remove redundancy
- Every line earns its place

## Context Management
- Plan file is the "compressed intent"
- If creating plan requires significant research, go back to /research
- Stay under 40% context utilization
