# End Work Session

Properly close a work session following the Boris workflow.

## Instructions

When the user runs `/end-work`, perform these steps in order:

### 0. Detect Session Type

**First, determine the session type** by checking:

```bash
# Check if in a git repository
git rev-parse --git-dir 2>/dev/null

# Check for package.json, pyproject.toml, go.mod, etc.
ls package.json pyproject.toml go.mod Cargo.toml 2>/dev/null

# Check what files were modified this session (from conversation context)
```

**Session Types:**

| Type | Indicators | Verification Approach |
|------|------------|----------------------|
| **Code** | In git repo, has package.json/etc., code files modified | Full: tests, typecheck, lint, git |
| **Config** | MCP setup, settings changes, .claude files modified | MCP health check, config validation |
| **Research** | No file changes, investigation/analysis only | N/A - summarize findings |
| **Documentation** | Only .md files modified, no code | Markdown lint (optional), git |

**Announce the detected type:**
```
Session Type: [Code/Config/Research/Documentation]
Verification: [Full/Partial/None]
```

### 0.5. Auto-Checkpoint (GSD - REQUIRED)

**Always create a checkpoint before ending to preserve context:**

1. **Update `~/.claude/state/phase.md`** with:
   - What was completed this session
   - What's still in progress
   - Key files modified
   - Important decisions made
   - Next steps for next session

2. **Update `~/.claude/state/session.json`** with:
   - Increment `phase.checkpointCount`
   - Update `phase.lastCheckpoint` timestamp
   - Set `phase.contextTurns` (estimate from session)
   - Set `completed: true`

3. **Display checkpoint confirmation:**
```
**Checkpoint saved** - Context preserved for next session
- Completed: [N] items
- In progress: [N] items
- Key files: [list]
```

This ensures the next `/start-work` can resume cleanly without context rot.

### 1. Run Verification Loop (Boris Phase 3)

**Adapt verification based on session type:**

#### Code Sessions
```bash
# Run tests (adapt to project)
npm test  # or pytest, go test, etc.

# Type check (if applicable)
npm run typecheck  # or tsc --noEmit

# Lint
npm run lint  # or eslint, ruff, etc.
```

#### Config Sessions
```bash
# Verify MCP connectivity
claude mcp list

# Validate JSON configs if modified
# Check that tools/integrations work
```

#### Research Sessions
- No verification needed
- Summarize key findings instead

#### Documentation Sessions
```bash
# Optional: markdown lint
# Check links if applicable
```

If any verification fails:
- Report the failures
- Ask: "Would you like to fix these before ending the session?"
- If yes, fix issues first
- If no, document as blockers for next session

### 2. Review Changes Match Plan

If a plan was created at session start:
- Compare accomplishments to the original plan
- Note any deviations and why
- Identify any planned items not completed

### 3. Check for Uncommitted Changes

**Skip if not in a git repository.**

For Code/Documentation sessions in a git repo:
```bash
git status
git diff --stat
```

If there are uncommitted changes:
- List the modified/new files
- Ask: "Would you like to commit these changes?"
- If yes, create descriptive commit message following conventions

For Config sessions (non-repo):
- List files that were created/modified during session
- Note their locations for reference

### 4. Summarize Accomplishments

Create a concise summary of:
- What was completed
- Key files created or modified
- Important decisions made
- Any problems encountered and how resolved

### 5. Update CLAUDE.md with Learnings (Boris Principle 4)

**Critical Boris step**: Check if any learnings should be captured:
- Did Claude make any mistakes that should be documented?
- Were there any corrections or patterns to remember?
- Any project-specific knowledge gained?

If yes, update `.claude/CLAUDE.md` in the Learnings section:
```markdown
## Learnings & Corrections
- [2026-01-18] Description of issue and correct approach
```

### 6. Update Project Documentation

For each active project touched during the session:
- Update `PLAN.md` with progress (mark completed items)
- Update `README.md` if scope or status changed

### 7. Update Index if Needed

If new skills, runbooks, or documentation were created:
- Update `index.yaml` with new entries
- Verify STD-001 compliance

### 8. Identify Next Steps

Based on the session work, clearly identify:
- **Immediate**: Next task for next session
- **Blockers**: Any impediments
- **Dependencies**: Waiting on others

### 9. Automatic DevOps Sync (IT Profile - REQUIRED)

**This step is MANDATORY for IT profile sessions.** Work items are created and updated automatically.

#### 9.0. Final Change Detection (Multi-User Coordination)

**Before making any updates, check for external changes:**

```
FINAL_CHANGE_DETECTION():
  1. Read work-tracker.json for all tracked items
  2. For each item with baselineSnapshot:
     current = wit_get_work_item(adoId, project)

     IF current.rev != baseline.rev:
       ADD to externalChanges queue
       CLASSIFY change type (state, assignment, scope, comment)
       ASSESS severity (critical, high, medium, low)
```

#### 9.1. Resolve Conflicts (if external changes detected)

**For each item with external changes, show resolution UI:**

```
╔══════════════════════════════════════════════════════════════╗
║ ⚠️  CONFLICT DETECTED: Work Item #{adoId}                    ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  YOUR CHANGES:                                               ║
║  • [summary of local work done]                              ║
║  • Status: [what you intended to update]                     ║
║                                                              ║
║  EXTERNAL CHANGES (by {changedBy}, {time ago}):              ║
║  • {changeType}: {old value} → {new value}                   ║
║  • {additional changes}                                      ║
║                                                              ║
║  RECOMMENDED: {Replace|Supplement|Rework}                    ║
║  Reason: {explanation}                                       ║
║                                                              ║
║  Choose: [R]eplace / [S]upplement / re[W]ork / S[k]ip        ║
╚══════════════════════════════════════════════════════════════╝
```

**Resolution Actions:**

| Choice | Action |
|--------|--------|
| **Replace** | Overwrite ADO with your changes (use when your work supersedes) |
| **Supplement** | Add your changes on top (use for parallel/complementary work) |
| **Rework** | Discard local changes, accept ADO state (use when your work is invalidated) |
| **Skip** | Don't sync this item now, keep local for later review |

**Decision Logic:**

```
IF externalChange.newState IN ["Closed", "Removed"]:
  IF userWork.completed:
    RECOMMEND: "Supplement" (add your completion details)
  ELSE:
    RECOMMEND: "Rework" (item closed by someone else)

ELIF externalChange.assignedTo != currentUser:
  RECOMMEND: "Rework" (coordinate with new assignee)

ELIF externalChange.fieldChanges.includes("Description", "AcceptanceCriteria"):
  RECOMMEND: "Review" (scope may have changed)

ELIF externalChange.severity == "low":
  RECOMMEND: "Supplement" (minor updates, safe to add)

ELSE:
  RECOMMEND: "user_choice" (multiple factors)
```

**Execute resolution for each item before proceeding.**

#### 9.2. Process Inferred Work (from work-tracker.json)

```
PROCESS_INFERRED_WORK():
  1. Read ~/.claude/state/work-tracker.json
  2. Get all items in activeWork queue

  FOR each item in activeWork:
    IF item.adoId == null AND item.confidence >= 0.70:
      # Create new work item
      IF item.confidence >= 0.90:
        CREATE immediately (no prompt)
      ELSE:
        SHOW: "Create work item: [title]? (Y/n)"
        IF user confirms OR no response in 5s:
          CREATE work item

    IF item.adoId != null:
      # Update existing work item
      ADD progress comment with session summary

  3. Report: "📋 Work Items: [N] created, [M] updated"
```

**Inference runs automatically throughout the session. This step processes the queue.**

For each work item touched during the session:

**Close completed Tasks:**
```
wit_update_work_item:
  - id: [work item ID]
  - updates:
    - path: "/fields/System.State", value: "Closed"
    - path: "/fields/Custom.CompletionSummary", value: "[summary of what was done]"
```

**Log AI Productivity Metrics (for completed items):**

Add a comment with structured metrics for ROI tracking:
```
wit_add_work_item_comment:
  - workItemId: [ID]
  - project: "Information Technology"
  - comment: |
      [AI-METRICS]
      baseline_hours: [estimate if done solo - use effort table below]
      actual_hours: [actual time spent with Claude]
      ai_level: [primary|collaborative|light]
      multiplier: [baseline / actual]
      completed: [YYYY-MM-DD]
      [/AI-METRICS]
```

**Effort → Baseline Hours Table:**

| Effort Size | Baseline (Solo Human) | Typical Actual (Human + Claude) |
|-------------|----------------------|--------------------------------|
| XS | 1 hour | 15 min |
| S | 4 hours | 1 hour |
| M | 8-16 hours | 2-4 hours |
| L | 24-40 hours | 8 hours |
| XL | 80+ hours | 16-24 hours |

**Example metrics comment:**
```
[AI-METRICS]
baseline_hours: 16
actual_hours: 2
ai_level: collaborative
multiplier: 8x
completed: 2026-01-18
[/AI-METRICS]
```

**Link commits to work items** (if in git repo):
```
wit_add_artifact_link:
  - workItemId: [ID]
  - project: "Information Technology"
  - linkType: "Fixed in Commit"
  - projectId: [project GUID]
  - repositoryId: [repo GUID]
  - commitId: [commit SHA]
```

**Update in-progress items:**
- If work continues next session, leave as Active
- Add comment with session progress if significant

**Report work item updates:**
```
**Work Items Updated**:
- #123 Task: Fix login bug → Closed (8x multiplier)
- #124 Task: Update API docs → Active (in progress)
- Commits linked: abc1234, def5678
```

### 10. Complete Session Log

Update the session log in `projects/sessions/` with:
- End time and duration
- Accomplishments summary
- Files changed with commit hashes
- Verification status (tests passed/failed)
- Work items updated (IDs and final states)
- **AI productivity metrics** (baseline hours, actual hours, multiplier)
- Learnings captured
- Next steps

### 11. Final Status Check

**Adapt based on session type:**

#### Code/Documentation Sessions (in git repo)
```bash
git log -3 --oneline
git status
```
Confirm everything is committed and pushed.

#### Config Sessions
```bash
# Verify integrations are working
claude mcp list
```
Confirm all configurations are saved and functional.

#### Research Sessions
- Confirm findings are documented
- No further checks needed

## Output Format

```
## Session Complete

**Session Type**: Code | Config | Research | Documentation

**Verification** (adapted to session type)
- Tests: ✓ Passed (24/24)        # Code sessions
- Typecheck: ✓ Passed            # Code sessions
- Lint: ✓ Passed                 # Code sessions
- MCP Connectivity: ✓ Connected  # Config sessions
- Git: N/A (not a repo)          # When applicable

**Plan Adherence**: 4/5 items completed
- Skipped: Integration tests (deferred to next session)

**Duration**: 2h 15m (14:30 - 16:45)

**Accomplished**
- Created 3 new slash commands (start-work, end-work, status)
- Set up session logging structure
- Updated Boris workflow with session management

**Commits**
- `abc1234` feat: add session management commands
- `def5678` docs: update Boris workflow

**Work Items Updated** (Azure DevOps)
- #123 Task: Fix login bug → Closed (8x multiplier: 16hr baseline → 2hr actual)
- #124 Task: Update API docs → Active (in progress)
- Commits linked: abc1234 → #123, def5678 → #124

**AI Productivity (this session)**
- Baseline hours saved: 14 hrs
- Multiplier: 8x
- AI assist level: collaborative

**Learnings Captured**: Yes
- Added to CLAUDE.md: "Always run verification before end-work"

**Next Steps**
1. Complete integration tests
2. Test new commands in next session
3. Consider Azure DevOps integration

**Blockers**: None

**Session Log**: projects/sessions/2026-01-18-session-01.md (updated)

---
[SESSION_SIGNOFF]
```

## Session Sign-Off (Personality)

**Always end with a clear, standardized sign-off** so the team knows the session is wrapped up.

### Sign-Off Format

```
---
✅ **Session Complete** - [SIGN_OFF_PHRASE]

Run `/start-work` when you're ready for the next adventure!
```

### Sign-Off Phrases (rotate randomly)

**Standard:**
- "Work done! Go grab a coffee, you've earned it."
- "Session wrapped! Time to stretch those legs."
- "All buttoned up! Nice work today."
- "That's a wrap! Another productive session in the books."

**Fun/Playful:**
- "See ya later, alligator! 🐊"
- "After a while, crocodile! 🐊"
- "Catch you on the flip side!"
- "Peace out, trout! 🐟"
- "Hasta la vista, baby!"
- "And that's the way the cookie crumbles!"
- "Exit stage left!"
- "Elvis has left the building!"

**Day-Specific (match to current day):**
- Monday: "Happy Monday! Week's off to a great start."
- Tuesday: "Taco Tuesday vibes! 🌮"
- Wednesday: "Happy Hump Day! We're over the hill! 🐪"
- Thursday: "Almost Friday! The weekend is calling!"
- Friday: "Happy Friyay! 🎉 Go enjoy your weekend!"
- Saturday: "Weekend warrior mode! Nice work!"
- Sunday: "Sunday session wrapped! Ready for the week ahead."

**Time-of-Day:**
- Before noon: "Morning productivity unlocked!"
- Afternoon: "Solid afternoon session!"
- Evening (after 5pm): "Burning the midnight oil! Get some rest!"
- Late night (after 9pm): "Night owl session complete! 🦉 Go sleep!"

### Selection Logic

1. Check current day of week
2. Check current time
3. 50% chance: Use day/time-specific phrase
4. 50% chance: Use random fun phrase
5. Always include the ✅ **Session Complete** header

### Example Outputs

**Friday evening:**
```
---
✅ **Session Complete** - Happy Friyay! 🎉 Go enjoy your weekend!

Run `/start-work` when you're ready for the next adventure!
```

**Wednesday afternoon:**
```
---
✅ **Session Complete** - Happy Hump Day! We're over the hill! 🐪

Run `/start-work` when you're ready for the next adventure!
```

**Random fun:**
```
---
✅ **Session Complete** - See ya later, alligator! 🐊

Run `/start-work` when you're ready for the next adventure!
```

## Key Boris Alignment

| Boris Principle | How End-Work Enforces It |
|-----------------|--------------------------|
| Verification loops | Adapts verification to session type (tests for code, MCP health for config) |
| Continuous improvement | Prompts for CLAUDE.md learnings (all session types) |
| Maintain documentation | Updates project docs and index (all session types) |
| Review changes | Compares to original plan (all session types) |
| Clean commits | Ensures everything is committed (git repos only) |
| Work tracking | Updates Azure DevOps work items with completion summaries and commit links |

## Session Type Quick Reference

| Session Type | Verification | Git Checks | DevOps Updates | Typical Files |
|--------------|--------------|------------|----------------|---------------|
| Code | Full (tests, lint, typecheck) | Yes | Close Tasks, link commits | .ts, .py, .go, etc. |
| Config | MCP health, JSON validation | If in repo | Close Tasks | .json, .yaml, .claude/* |
| Research | None | No | Add comments only | None or notes only |
| Documentation | Optional markdown lint | If in repo | Close Tasks | .md files |

## Related
- `/start-work` - Begin a session
- `/status` - Quick context check
- `/validate-work` - Comprehensive validation
- `.claude/boris-workflow.md` - Full workflow reference
