# Merge Branch

Return branch findings to parent session and close the branch cleanly.

## Purpose

**Completes the branch lifecycle** by:
- Summarizing branch findings
- Creating handoff artifact for parent session
- Preserving learnings from the branch
- Closing branch with proper context chain

## When to Use

| Situation | Action |
|-----------|--------|
| Branch research complete | `/merge` |
| Branch goal achieved | `/merge` |
| Branch blocked, findings useful | `/merge --partial` |
| Branch abandoned, no value | `/abandon` (not merge) |

## Syntax

```
/merge                    # Standard merge with summary
/merge --partial          # Merge incomplete findings
/merge --learning "X"     # Merge with explicit learning
```

## Instructions

### 1. Verify Branch Status

```
VERIFY_BRANCH():
  1. Read session-graph.json
  2. Confirm current session has parent (is a branch)
  3. If not a branch:
     "This session has no parent. Use /end-work to close."
  4. Load parent session metadata
```

### 2. Generate Findings Summary

**Prompt for or auto-generate:**

```
GENERATE_FINDINGS():
  1. Analyze branch conversation for:
     - Key discoveries
     - Decisions made
     - Files created/modified
     - Conclusions reached

  2. Structure findings:
     {
       summary: "One sentence conclusion",
       discoveries: [...],
       decisions: [...],
       artifacts: [...],
       recommendation: "What parent should do with this"
     }
```

### 3. Create Merge Artifact

**Write to `~/.claude/worktrees/{branch_id}/findings.md`:**

```markdown
# Branch Findings: {branch_focus}

## Summary
{one_sentence_conclusion}

## Branch Info
- **Branch ID:** {branch_id}
- **Parent:** {parent_id} ({parent_focus})
- **Duration:** {duration}
- **Turns:** {turns}

## Key Discoveries
1. {discovery_1}
2. {discovery_2}
3. {discovery_3}

## Decisions Made
- {decision_1}
- {decision_2}

## Artifacts Created
- `{file_path}` - {description}

## Recommendation for Parent
{what_parent_should_do_with_findings}

## Learnings (for CLAUDE.md)
- [{date}] {learning_if_any}

---
*Merged: {timestamp}*
```

### 4. Update Session Graph

```
UPDATE_GRAPH_ON_MERGE():
  branch = sessions[branch_id]
  parent = sessions[branch.parent]

  branch.status = "merged"
  branch.mergedAt = now()
  branch.findingsPath = "~/.claude/worktrees/{branch_id}/findings.md"

  parent.mergedBranches.push({
    id: branch_id,
    focus: branch.focus,
    findings: branch.findingsPath,
    mergedAt: now()
  })

  SAVE session-graph.json
```

### 5. Capture Learnings

```
CAPTURE_LEARNINGS():
  IF branch produced learnings:
    1. Prompt: "Any learnings to add to CLAUDE.md?"
    2. If yes, append to Learnings section
    3. Note learning source as branch merge
```

### 6. Display Merge Output

```
╔═══════════════════════════════════════════════════════════════════╗
║  🔀 BRANCH MERGED                                                  ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  Branch: {branch_id}                                               ║
║  Focus:  "{branch_focus}"                                          ║
║  Parent: {parent_id} ({parent_focus})                              ║
║                                                                    ║
║  FINDINGS SUMMARY                                                  ║
║  ─────────────────────────────────────────────────────────────────║
║  {one_sentence_summary}                                            ║
║                                                                    ║
║  Key Discoveries:                                                  ║
║  • {discovery_1}                                                   ║
║  • {discovery_2}                                                   ║
║                                                                    ║
║  Recommendation: {recommendation}                                  ║
║                                                                    ║
║  ARTIFACTS                                                         ║
║  ─────────────────────────────────────────────────────────────────║
║  📄 ~/.claude/worktrees/{branch_id}/findings.md                    ║
║                                                                    ║
║  PARENT NOTIFICATION                                               ║
║  ─────────────────────────────────────────────────────────────────║
║  Parent session will see:                                          ║
║  "Branch '{focus}' merged with findings. Read: {findings_path}"    ║
║                                                                    ║
║  ───────────────────────────────────────────────────────────────  ║
║  ✅ Branch closed. Return to parent:                               ║
║                                                                    ║
║     claude --resume {parent_id}                                    ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

### 7. Parent Session Notification

**When parent session resumes or runs /pulse:**

```
CHECK_MERGED_BRANCHES():
  FOR each merged branch in parent.mergedBranches:
    IF not yet acknowledged:
      SHOW:

      ╔═══════════════════════════════════════════════════════════╗
      ║  📥 BRANCH FINDINGS AVAILABLE                              ║
      ╠═══════════════════════════════════════════════════════════╣
      ║                                                            ║
      ║  Branch: "{branch_focus}"                                  ║
      ║  Summary: {one_sentence_summary}                           ║
      ║                                                            ║
      ║  Read findings: {findings_path}                            ║
      ║                                                            ║
      ║  [1] Read now  [2] Acknowledge  [3] Defer                  ║
      ╚═══════════════════════════════════════════════════════════╝
```

## Partial Merge

When branch is incomplete but has useful findings:

```
/merge --partial

Partial merge captures:
- What was discovered so far
- Where work stopped
- What remains to be done
- Why merge is happening early
```

## Abandon vs Merge

| Action | When | Outcome |
|--------|------|---------|
| `/merge` | Findings valuable | Creates handoff, notifies parent |
| `/merge --partial` | Some findings | Partial handoff, notes incompleteness |
| `/abandon` | No value, false start | Archives without handoff |

## Related

- `/branch` - Create child session
- `/cockpit` - View all sessions
- `/rethink` - Pivot within session instead of branching
- `/end-work` - Close non-branch sessions
