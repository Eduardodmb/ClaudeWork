# Start Work Session

Begin a new work session. Loads context, shows pending work, asks for focus.

## Steps (run in parallel where possible)

### 1. Gather State (parallel)
Run these simultaneously:
- `git status` in current directory (if git repo)
- `git rev-parse --git-dir` to check if in repo
- Check for project files: `ls package.json pyproject.toml go.mod Cargo.toml 2>/dev/null`
- `claude mcp list` to check MCP connectivity
- Read most recent file from `~/projects/sessions/*.md`
- Read `~/.claude/learning/implementation-tracking/status.md`
- **Read `~/.claude/state/phase.md`** (GSD checkpoint context)
- **Read `~/.claude/state/session.json`** (phase tracking)

Create `~/projects/sessions/` if it doesn't exist.

### 1.1. Load GSD Context (REQUIRED)

**Always load the last checkpoint to prevent context rot:**

1. Read `~/.claude/state/phase.md` for:
   - Last phase name and status
   - What was completed
   - What's in progress
   - Key files and decisions
   - Next steps

2. Read `~/.claude/state/session.json` for:
   - Phase number and checkpoint count
   - Context turns from last session
   - Last checkpoint timestamp

3. **Display context continuity:**
```
**Last Checkpoint**: [date/time]
**Phase**: [name] (Phase [N])
**Resuming**: [in-progress items from checkpoint]
```

If no checkpoint exists, note "Fresh start - no previous checkpoint".

### 1.5. Initialize Work Tracking (IT Profile - REQUIRED)

**For IT profile, DevOps tracking is always-on.** Initialize work-tracker.json at session start:

```
INITIALIZE_WORK_TRACKING():
  1. Read ~/.claude/state/work-tracker.json

  2. IF previous session not completed:
     # Handle orphaned session
     SHOW orphan warning with sync options

  3. Initialize new session:
     work-tracker.json = {
       "currentSession": {
         "id": "[date]-[session-number]",
         "startTime": "now",
         "lastSync": null,
         "completed": false,
         "checkpointCount": 0
       },
       "activeWork": [],
       "baselineSnapshots": {},
       ...
     }

  4. Load DevOps MCP tools automatically

  5. Query wit_my_work_items for context

  6. Capture baselines for multi-user sync:
     FOR each item in activeWork with adoId:
       baseline = wit_get_work_item(adoId, expand: "fields")
       work-tracker.baselineSnapshots[adoId] = {
         rev: baseline.rev,
         state: baseline.state,
         assignedTo: baseline.assignedTo,
         changedDate: baseline.changedDate,
         capturedAt: now()
       }
```

**Display active work items in summary:**
```
**Active Work Items**:
- #123 Task: Fix login bug (Active)
- #124 Task: Update API docs (Proposed)

📋 **Work Tracking**: Enabled (auto-sync at checkpoints)
```

If user states focus that matches an existing work item, note the match.
If focus doesn't match any item, it will be auto-tracked via inference.

### 1.6. Detect Environment Type

Based on gathered state, classify the working environment:

| Environment | Indicators |
|-------------|------------|
| **Code Project** | In git repo + has package.json/pyproject.toml/etc. |
| **Config/Home** | In ~/.claude or home directory, no project files |
| **Documentation** | In git repo but only .md files present |
| **Standalone** | Not in git repo, no project structure |

This informs what verification will be available at `/end-work`.

### 2. Check for Blockers
If uncommitted changes exist, warn and ask whether to commit first or continue.

### 3. Display Summary
Show concise output with a **personality greeting** based on day/time:

```
## Session Started

[GREETING]


**Environment**: [Code Project | Config/Home | Documentation | Standalone]
**Context**: [Fresh|Warm|Hot] | Phase [N]: [name] | Last checkpoint: [time]
**Verification**: [Full | MCP Health | Git Only | None]
**MCPs**: [list connected MCPs]

**Resuming from checkpoint**:
- [In-progress item 1 from phase.md]
- [In-progress item 2 from phase.md]

**Active Work Items** (from Azure DevOps):
- #123 Task: Fix login bug (Active)
- #124 Task: Update API docs (Proposed)

**Pending** (from implementation queue):
- [ ] High priority item 1
- [ ] High priority item 2

**What would you like to focus on?**
(Or say "start fresh" to begin a new phase)
```

**Verification mapping:**
| Environment | Verification Available |
|-------------|----------------------|
| Code Project | Full (tests, lint, typecheck, git) |
| Config/Home | MCP health, config validation |
| Documentation | Git status, optional markdown lint |
| Standalone | None |

### 4. Wait for User Response
Do NOT assess complexity or enter plan mode yet. Let the user state their focus, then handle naturally in conversation.

## Fallbacks

| Condition | Action |
|-----------|--------|
| No session logs exist | Say "First tracked session" |
| No implementation-tracking | Skip pending section |
| Not in git repo | Set environment to Config/Home or Standalone |
| Directory missing | Create it silently |
| No MCPs connected | Note "No MCPs configured" |
| MCP health check fails | Warn about connectivity issues |
| Azure DevOps MCP not connected | Skip Active Work Items section |
| No active work items | Show "No active work items assigned" |
| No phase.md exists | Show "Context: Fresh start - no previous checkpoint" |
| No session.json exists | Create with phase.number = 1 |

## Output Format

Keep it minimal. Six sections max:
1. Environment + **context health** + verification available + MCPs
2. **Resuming from checkpoint** (from phase.md)
3. Last session context (if exists)
4. Active work items (if Azure DevOps connected)
5. Pending high-priority items (if exist)
6. Focus question

## What This Command Does NOT Do

- Display Boris principles (you know them)
- Assess task complexity (do when user states task)
- Enter plan mode (do when appropriate)
- Create session log file (do when focus is stated)

These happen naturally in conversation after the user responds.

## Session Type Inference

When user states their focus, infer the **session type** for `/end-work`:

| User Focus | Likely Session Type |
|------------|---------------------|
| "fix bug", "add feature", "refactor" | Code |
| "set up MCP", "configure", "install" | Config |
| "research", "investigate", "understand" | Research |
| "update docs", "write README" | Documentation |

The environment detection provides the baseline; user focus refines it.

## Work Item Linking (after user states focus)

When the user states their focus:

1. **Match to existing work item**: If focus matches an active work item title/description, confirm: "This matches #123 - shall I track work against it?"

2. **Create new work item**: If no match, offer: "Would you like me to create a Task for this work?"
   - If yes, create Task under appropriate Feature/Epic
   - Set state to Active
   - Add to session context for `/end-work`

3. **Track session work items**: Maintain list of work items touched during session for `/end-work` to update.

## Skill Suggestions (after user states focus)

After the user states their focus, suggest relevant skills from the 119 available:

1. **Parse focus keywords**: Extract key terms from user's stated focus
2. **Match against skill-index.json**: Compare keywords to skill triggers
3. **Display top 3-5 relevant skills**:

```
**Relevant Skills** for this work:
- /brainstorm - structured ideation for new features
- /write-plan - detailed implementation planning
- /TDD - test-driven development workflow
```

**Task-to-skill mappings:**

| Focus Keywords | Suggested Skills |
|----------------|------------------|
| plan, design, new feature | brainstorming, writing-plans |
| bug, fix, error | systematic-debugging, verification |
| document, write, create doc | docx, pdf, doc-coauthoring |
| review, PR, code | code-reviewer, receiving-code-review |
| present, slides | pptx, brand-guidelines |
| data, analyze, spreadsheet | xlsx, data-pipeline |

## Session State Management

After user states focus, create/update session state:

**Write to `~/.claude/state/session.json`:**
```json
{
  "sessionId": "[date]-[session-number]",
  "startTime": "[now]",
  "lastActivity": "[now]",
  "focus": "[user's stated focus]",
  "activeWorkItems": [work_item_ids],
  "environment": "[detected environment]",
  "suggestedSkills": [skill_names],
  "usedSkills": [],
  "completed": false
}
```

This enables `/resume-session` to provide smart context on return.

## Session Greeting (Personality)

**Always start with a warm, personalized greeting** to set a positive tone for the session.

### Greeting Format

```
## Session Started

👋 [GREETING]

**Environment**: ...
```

### Day-Specific Greetings (use based on current day)

| Day | Greeting Options |
|-----|------------------|
| Monday | "Happy Monday! Let's kick off the week strong!" / "Monday motivation activated!" / "New week, new wins!" |
| Tuesday | "Happy Tuesday! Taco vibes optional. 🌮" / "Tuesday's looking good!" |
| Wednesday | "Happy Hump Day! 🐪 We're halfway there!" / "Wednesday warrior mode!" / "Over the hump we go!" |
| Thursday | "Happy Thursday! The weekend is in sight!" / "Throwback Thursday? Nah, Throw-forward Thursday!" |
| Friday | "Happy Friyay! 🎉" / "TGIF! Let's close out strong!" / "Friday feeling! What are we shipping today?" |
| Saturday | "Weekend warrior! 💪 Bonus points for working today." / "Saturday session? That's dedication!" |
| Sunday | "Sunday session! Getting ahead of the week." / "Easy like Sunday morning... let's do this!" |

### Time-Based Greetings

| Time | Greeting Options |
|------|------------------|
| Early (before 8am) | "Early bird catches the worm! ☀️" / "Up and at 'em!" |
| Morning (8am-12pm) | "Good morning! Ready to make things happen?" / "Morning! Let's get after it!" |
| Afternoon (12pm-5pm) | "Good afternoon! Momentum is building!" / "Afternoon session, let's go!" |
| Evening (5pm-9pm) | "Evening session! Burning the productive oil!" |
| Night (after 9pm) | "Night owl mode! 🦉 Let's wrap this up and get some rest!" |

### Fun Variations (mix in occasionally)

- "Alright alright alright! Let's do this!"
- "Welcome back! What trouble are we getting into today?"
- "The band is back together! What's on the agenda?"
- "Claude reporting for duty! 🫡"
- "Let's make some magic happen! ✨"
- "Ready when you are, captain!"
- "Another day, another adventure!"

### Selection Logic

1. Check current day of week
2. Check current time of day
3. 70% chance: Use day+time appropriate greeting
4. 30% chance: Use random fun greeting
5. Always include 👋 emoji in header

### Example Outputs

**Friday morning:**
```
## Session Started

👋 Happy Friyay! 🎉 Let's close out the week strong!

**Environment**: Config/Home
...
```

**Wednesday afternoon:**
```
## Session Started

👋 Happy Hump Day! 🐪 We're over the hill!

**Environment**: Code Project
...
```

**Random fun:**
```
## Session Started

👋 Alright alright alright! Let's do this!

**Environment**: Documentation
...
```

## Related
- `/end-work` - Close session (uses detected session type for verification)
- `/status` - Quick context without starting session
