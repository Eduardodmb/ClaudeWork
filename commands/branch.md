# Branch Session

Spawn a focused child session from the current session without disrupting current work.

## Purpose

**Enables continuous workflow** by:
- Capturing tangential work without losing current context
- Creating guided handoffs to new sessions
- Maintaining parent-child relationships for context continuity
- Supporting the IT strategy as an evolving DAG

## When to Use

| Situation | Use /branch | Don't Use |
|-----------|-------------|-----------|
| Related tangent, 5-15+ min of work | ✅ | |
| Research to inform current work | ✅ | |
| "What if we tried..." exploration | ✅ | |
| Quick thought, < 1 min | | Use `/reminder` |
| Completely unrelated work | | Use `/end-work` + new session |
| Rethinking current approach | | Use `/rethink` |

## Syntax

```
/branch "focus description"
/branch "focus description" --initiative "Initiative Name"
/branch "focus description" --workitem #1234
```

## Instructions

### 1. Checkpoint Current Session

**Before branching, preserve parent state:**

```
CHECKPOINT_FOR_BRANCH():
  1. Update ~/.claude/state/phase.md with current progress
  2. Update session.json with checkpoint marker
  3. Note branch point (turn number, timestamp)
  4. Capture context summary for handoff
```

### 2. Generate Branch ID

```
GENERATE_BRANCH_ID():
  # Use existing session ID format from Claude
  # Branch inherits project context
  branch_id = new_uuid()
  RETURN branch_id
```

### 3. Create Branch Metadata

**Write to `~/.claude/state/session-graph.json`:**

```json
{
  "sessions": {
    "{branch_id}": {
      "id": "{branch_id}",
      "parent": "{current_session_id}",
      "children": [],
      "focus": "{user_provided_focus}",
      "workItems": [],
      "initiative": "{inherited_or_specified}",
      "status": "pending",
      "turns": 0,
      "createdAt": "{now}",
      "branchContext": {
        "parentTurn": {current_turn},
        "parentFocus": "{parent_focus}",
        "reason": "{why_branching}",
        "handoff": "{context_summary}",
        "returnHint": "Summarize findings in ~/.claude/worktrees/{branch_id}/findings.md"
      }
    }
  }
}
```

### 4. Create Handoff File

**Write to `~/.claude/worktrees/{branch_id}/handoff.md`:**

```markdown
# Branch Handoff: {branch_id}

## Branch Info
- **Parent Session:** {parent_id}
- **Parent Focus:** {parent_focus}
- **Branch Focus:** {branch_focus}
- **Created:** {timestamp}

## Context from Parent

{summary of relevant context from parent session}

### Key Files Referenced
- {file1} - {why relevant}
- {file2} - {why relevant}

### Key Decisions Made
- {decision1}
- {decision2}

### Work Items Active
- #{id}: {title}

## Branch Scope

**Goal:** {branch_focus}

**Exit Criteria:**
- [ ] {what "done" looks like}

**Out of Scope:**
- {things to capture but not do}

## Return Protocol

When complete, run `/merge` to:
1. Summarize findings
2. Create handoff for parent
3. Close this branch

---
*Branch created from parent turn {turn_number}*
```

### 5. Update Parent Session

**Add child reference to parent in session-graph.json:**

```
parent.children.push(branch_id)
parent.lastBranchAt = now()
```

### 6. Display Branch Output

```
╔═══════════════════════════════════════════════════════════════════╗
║  🌿 BRANCH CREATED                                                 ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  Parent: {parent_id_short} ({parent_focus})                        ║
║  Branch: {branch_id}                                               ║
║  Focus:  "{branch_focus}"                                          ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │ Open in new terminal:                                       │   ║
║  │                                                             │   ║
║  │   claude --resume {branch_id}                               │   ║
║  │                                                             │   ║
║  └────────────────────────────────────────────────────────────┘   ║
║                                                                    ║
║  Branch receives:                                                  ║
║  • Handoff context from parent                                     ║
║  • Scoped focus: {branch_focus}                                    ║
║  • Worktree: ~/.claude/worktrees/{branch_id}/                      ║
║                                                                    ║
║  Parent session: ✓ Checkpointed, continue working here             ║
║                                                                    ║
║  When branch completes: Run /merge to return findings              ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

### 7. Branch Session Startup

**When branch session starts (via --resume), detect it's a branch:**

```
ON_BRANCH_SESSION_START():
  1. Read ~/.claude/worktrees/{session_id}/handoff.md
  2. Read branchContext from session-graph.json
  3. Display branch orientation:

  ╔═══════════════════════════════════════════════════════════════╗
  ║  🌿 BRANCH SESSION: {focus}                                    ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                                ║
  ║  Branched from: {parent_focus}                                 ║
  ║  Your mission:  {branch_focus}                                 ║
  ║                                                                ║
  ║  Context loaded from parent:                                   ║
  ║  • {key_context_1}                                             ║
  ║  • {key_context_2}                                             ║
  ║                                                                ║
  ║  When done: /merge to return findings to parent                ║
  ║                                                                ║
  ╚═══════════════════════════════════════════════════════════════╝

  4. Set session status to "active"
  5. Begin work with scoped focus
```

## Branch Types

| Type | Focus Pattern | Return Expectation |
|------|---------------|-------------------|
| **Research** | "research X", "investigate Y" | Findings document |
| **Spike** | "prototype X", "test approach" | Proof of concept |
| **Grooming** | "groom backlog for X" | Refined work items |
| **Documentation** | "document X" | Doc artifact |
| **Fix** | "fix issue with X" | Resolution |

## Examples

### Research Branch
```
> /branch "research Neo4j vs PostgreSQL for context graph"

🌿 BRANCH CREATED
Focus: "research Neo4j vs PostgreSQL for context graph"
Open: claude --resume e4f5a6b7...
```

### Grooming Branch
```
> /branch "groom Data Architecture backlog" --initiative "Data Architecture"

🌿 BRANCH CREATED
Focus: "groom Data Architecture backlog"
Initiative: Data Architecture
Open: claude --resume c8d9e0f1...
```

## Related

- `/merge` - Return branch findings to parent
- `/cockpit` - View all sessions as DAG
- `/rethink` - Pivot approach within current session
- `/reminder` - Quick capture without branching
- `/checkpoint` - Save progress without branching
