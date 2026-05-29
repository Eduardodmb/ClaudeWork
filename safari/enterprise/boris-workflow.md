# Boris Workflow Skill

## Metadata
- **ID**: SKILL-OPS-001
- **Version**: 1.0.0
- **Category**: operations
- **Status**: draft
- **Author**: Claude (based on Boris Cherny's workflow)
- **Source**: https://x.com/bcherny/status/2007179832300581177

## Purpose
Implement the Claude Code creator's workflow for maximum productivity and code quality. This skill codifies Boris Cherny's approach to using Claude Code effectively with parallel agents, plan mode, verification loops, and continuous improvement.

## Trigger Phrases
- "Use the Boris workflow"
- "Start a Boris-style session"
- "Work in parallel mode"
- "Use plan mode workflow"

## Required Context
- Project codebase or documentation repository
- Clear understanding of the task scope
- Access to testing/build tools

## Core Principles

### 1. Think First, Code Later
- **Always** read relevant code before making changes
- Never speculate about code you haven't opened
- Investigate and understand before answering questions

### 2. Simplicity Over Complexity
- Make every change as simple as possible
- Minimize code impact for each change
- Avoid massive or complex changes

### 3. Plan Mode Strategy
- Start sessions in Plan mode (Shift+Tab twice in CLI)
- Iterate on the plan until satisfied
- Switch to auto-accept mode for execution

### 4. Continuous Improvement
- Update CLAUDE.md whenever Claude makes a mistake
- Tag @claude in PR reviews to capture learnings
- Build institutional knowledge over time

### 5. Verification Loops
- Tests, typecheck, and lint after every change
- Verification improves quality by 2-3x
- Never skip verification steps

## Steps

### Phase 1: Session Setup
1. **Assess Task Complexity**
   - Single-file change → Standard session
   - Multi-file feature → Consider parallel agents
   - Large refactor → Use Plan mode + subagents

2. **Enter Plan Mode** (for non-trivial tasks)
   - Use Shift+Tab twice or `/plan` command
   - Describe the goal and constraints
   - Iterate on the plan with Claude

3. **Review Plan**
   - Ensure plan covers all affected areas
   - Verify plan aligns with existing architecture
   - Check for potential breaking changes

### Phase 2: Execution
1. **Read Before Write**
   - Open and read all relevant files
   - Understand existing patterns
   - Identify integration points

2. **Make Minimal Changes**
   - One logical change at a time
   - Keep diffs small and reviewable
   - Preserve existing code style

3. **Provide High-Level Updates**
   - Explain what changes you made
   - Note any decisions or trade-offs
   - Flag anything needing human review

### Phase 3: Verification
1. **Run Tests**
   ```bash
   npm test  # or project-specific test command
   ```

2. **Type Check**
   ```bash
   npm run typecheck  # or tsc --noEmit
   ```

3. **Lint**
   ```bash
   npm run lint  # or eslint .
   ```

4. **Fix Issues**
   - Address any failures before continuing
   - Document recurring issues in CLAUDE.md

### Phase 4: Completion
1. **Review Changes**
   - Use `/review-changes` or git diff
   - Ensure changes match the original plan

2. **Commit and Push**
   - Use descriptive commit messages
   - Reference issue numbers if applicable

3. **Update Documentation**
   - Update CLAUDE.md with learnings
   - Update architecture docs if needed

## Output
- Completed task with all tests passing
- Clean, minimal code changes
- Updated documentation reflecting learnings

## Subagents

Reference these subagents for specialized tasks:

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `code-simplifier` | Simplify complex code | After completing a feature |
| `code-architect` | Design review | Before large changes |
| `verify-app` | Thorough testing | Before merging |
| `build-validator` | Build verification | Before deployment |

## Session Management

The Boris workflow includes structured session management to maintain continuity and documentation across work sessions.

### Session Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                    SESSION LIFECYCLE                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  /start-work                                                │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Check for uncommitted changes                    │   │
│  │  2. Load last session context                        │   │
│  │  3. Show active project status                       │   │
│  │  4. Check strategy alignment                         │   │
│  │  5. Remind Boris principles                          │   │
│  │  6. Create session log                               │   │
│  │  7. Ask for today's focus                            │   │
│  └─────────────────────────────────────────────────────┘   │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    DO WORK                           │   │
│  │  - Follow Boris principles                           │   │
│  │  - Use Plan mode for complex tasks                   │   │
│  │  - Run verification loops                            │   │
│  │  - Commit incrementally                              │   │
│  └─────────────────────────────────────────────────────┘   │
│       │                                                     │
│       ▼                                                     │
│  /end-work                                                  │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Summarize accomplishments                        │   │
│  │  2. Commit any uncommitted changes                   │   │
│  │  3. Update project PLAN.md                           │   │
│  │  4. Update index.yaml if needed                      │   │
│  │  5. Identify next steps                              │   │
│  │  6. Complete session log                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Session Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/start-work` | Begin a session | Start of each work period |
| `/end-work` | Close a session | Before stepping away |
| `/status` | Quick context check | Anytime during work |

### Session Logs

Sessions are logged in `projects/sessions/` with the format:
```
YYYY-MM-DD-session-NN.md
```

Each log captures:
- Start/end times and duration
- Focus area and accomplishments
- Files changed with commit references
- Decisions made and rationale
- Next steps for continuity

### Why Session Management Matters

1. **Continuity** - Pick up exactly where you left off
2. **Accountability** - Track what was accomplished
3. **Strategy Alignment** - Ensure work connects to goals
4. **Documentation** - Automatic work journal
5. **Context Loading** - Claude understands the project state

## Slash Commands

Use these for common operations:

| Command | Description |
|---------|-------------|
| `/start-work` | Begin session with context |
| `/end-work` | Close session with documentation |
| `/status` | Quick context check |
| `/validate-work` | Multi-domain validation check |
| `/commit-push-pr` | Full git workflow |
| `/quick-commit` | Stage and commit |
| `/test-and-fix` | Run tests, fix failures |
| `/review-changes` | Review uncommitted changes |
| `/first-principles` | Problem deconstruction |

## Example

**Input:** "Add a new API endpoint for user preferences"

**Workflow:**
1. Enter Plan mode
2. Draft plan: Create route, add validation, write tests
3. User approves plan
4. Read existing route files to understand patterns
5. Create minimal endpoint following existing patterns
6. Add input validation
7. Write unit tests
8. Run verification loop (test → typecheck → lint)
9. Fix any issues
10. Commit with descriptive message
11. Update API documentation

## Anti-Patterns to Avoid

- Starting to code without reading existing code
- Making changes "while you're in there"
- Skipping verification steps
- Large PRs with multiple unrelated changes
- Speculating about code behavior without reading

## Related Skills
- `documentation-writer` - For documentation tasks
- `domain-expert` - For domain questions
- `code-review` - For reviewing changes

## Changelog
- 1.1.0 (2026-01-18): Added session management (start-work, end-work, status commands)
- 1.0.0 (2026-01-18): Initial version based on Boris Cherny's workflow
