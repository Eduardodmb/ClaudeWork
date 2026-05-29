# Personal Claude Code — Enterprise Configuration

> Shared across all personal computers via ClaudeDocs (`personal-claude-docs` repo).
> Loaded by `~/.claude/CLAUDE.md` on every session via `@enterprise/CLAUDE.md`.

---

## Multi-Computer Architecture

This configuration is shared across all personal computers through `ClaudeDocs`.
Each machine has a thin `~/.claude/CLAUDE.md` that loads this file and the personal layer.

```
HOME COMPUTER  (eduar / D:\OneDrive\)
┌──────────────────────────────────────────────────────┐
│  ~/.claude/  (ClaudeHome repo)                       │
│    commands/ ──symlink──► ClaudeDocs/enterprise/commands
│    skills/   ──symlink──► ClaudeDocs/enterprise/skills
│    learning/ ──symlink──► ClaudeDocs/enterprise/learning
│    reference/──symlink──► ClaudeDocs/enterprise/reference
│    enterprise/─symlink──► ClaudeDocs/enterprise/
│    personal/ ──symlink──► ClaudeDocs/users/emarquez-personal/
│                                                      │
│  01_Claude_Home/  (ACTIVE vault - wired)             │
│    _claude-commands ──symlink──► ~/.claude/commands  │
│    _claude-skills   ──symlink──► ~/.claude/skills    │
│    _claude-learning ──symlink──► ~/.claude/learning  │
│    _claude-reference──symlink──► ~/.claude/reference │
│                                                      │
│  00_Claude/  (on disk via OneDrive, NOT wired)       │
└──────────────────────────────────────────────────────┘

WORK COMPUTER  (emarquez / C:\Users\emarquez\OneDrive\)
┌──────────────────────────────────────────────────────┐
│  ~/.claude/  (ClaudeWork repo)                       │
│    commands/ ──symlink──► ClaudeDocs/enterprise/commands
│    skills/   ──symlink──► ClaudeDocs/enterprise/skills
│    learning/ ──symlink──► ClaudeDocs/enterprise/learning
│    reference/──symlink──► ClaudeDocs/enterprise/reference
│    enterprise/─symlink──► ClaudeDocs/enterprise/
│    personal/ ──symlink──► ClaudeDocs/users/emarquez-personal/
│                                                      │
│  00_Claude/  (ACTIVE vault - wired)                  │
│    _claude-commands ──symlink──► ~/.claude/commands  │
│    _claude-skills   ──symlink──► ~/.claude/skills    │
│    _claude-learning ──symlink──► ~/.claude/learning  │
│    _claude-reference──symlink──► ~/.claude/reference │
│                                                      │
│  01_Claude_Home/  (on disk via OneDrive, NOT wired)  │
└──────────────────────────────────────────────────────┘
```

Both vaults (`01_Claude_Home` and `00_Claude`) exist on every computer via OneDrive.
Only the active vault for that computer is wired.

### Loading Order (every Claude session)

```
~/.claude/CLAUDE.md
  @enterprise/CLAUDE.md   ← this file  (Boris Cherny practices, workflow)
  @personal/CLAUDE.md     ← personal preferences, tech stack, current focus
  ## Machine-specific     ← local paths, nothing else
```

On work computer the work-specific section (Safari Circuits, ADO, BeFirst) follows — personal context always loads first.

### Setup Script Ownership

| Script | Lives in | Responsibility |
|--------|----------|---------------|
| `setup-personal.ps1` | ClaudeDocs | Wire `~/.claude/` → ClaudeDocs only |
| `setup-home.ps1` | ClaudeHome `.setup/` | Call setup-personal + wire `01_Claude_Home` → `~/.claude/` |
| `setup-work.ps1` | ClaudeWork `.setup/` | Call setup-personal + wire `00_Claude` → `~/.claude/` |

### New Machine Setup

```powershell
# 1. Clone repos
git clone https://github.com/Eduardodmb/ClaudeDocs.git "$env:USERPROFILE\personal-claude-docs"

# Home computer
git clone https://github.com/Eduardodmb/ClaudeHome.git "$env:USERPROFILE\.claude"
& "$env:USERPROFILE\.claude\.setup\setup-home.ps1"

# Work computer
git clone https://github.com/Eduardodmb/ClaudeWork.git "$env:USERPROFILE\.claude"
& "$env:USERPROFILE\.claude\.setup\setup-work.ps1"
```

---

## Core Principles (Always Follow)

1. **Think first, read before touching** — Investigate relevant files BEFORE making changes. Never speculate about code you haven't opened.
2. **Check in before major changes** — Present plan and get confirmation before significant modifications.
3. **Minimal changes only** — Each change should impact as little code as possible. No scope creep.
4. **Verify after every change** — Run tests, typecheck, lint after each modification.
5. **Explain at a high level** — Concise summary of what changed and why. No narration of internal process.
6. **Never speculate** — If you haven't read a file, say so. Don't make claims about unread code.
7. **Keep docs current** — Update CLAUDE.md with learnings when mistakes are made.
8. **Self-improving** — Every correction is a learning opportunity. Propose captures proactively.
9. **Automatic workflow** — Session management happens automatically. User just works.

---

## CLAUDE.md Hierarchy

```
~/.claude/CLAUDE.md           ← Global personal config (always loaded)
  ↓ @enterprise/CLAUDE.md     ← This file
  ↓ @personal/CLAUDE.md       ← Personal preferences
{project}/CLAUDE.md           ← Project-specific (loaded per-project)
{project}/{subdir}/CLAUDE.md  ← Subdirectory overrides
```

- Use `/init` in any new project to auto-generate its CLAUDE.md
- Project CLAUDE.md: codebase overview, build commands, key paths, gotchas
- Use `@filename` in conversation or CLAUDE.md to inject file contents

---

## Session Workflow (Automatic)

```
[First message] → START → WORK → CHECKPOINT → VALIDATE → [Session ends] → CLOSE
```

| Phase | Trigger | Action (silent) |
|-------|---------|----------------|
| **Start** | First message | Load state, assess context health |
| **Work** | User requests | Plan mode for complex tasks, incremental changes |
| **Checkpoint** | ~40 turns or topic shift | Compress context, update state |
| **Validate** | After code changes | Run tests/lint |
| **Close** | "done", "bye" | Full checkpoint, propose learning captures |

### Context Health

| Usage | State | Action |
|-------|-------|--------|
| 0–40% | Smart Zone | Continue |
| 40–60% | Degrading | `/compact`, checkpoint to file |
| >60% | Dumb Zone | Stop — start fresh with artifacts |

**`/compact`** compresses context while preserving key facts. Use it proactively.

---

## Context Maturation Pipeline

Every session should advance knowledge along this lifecycle:

```
Idea → Learning → Skill → Standard → Governance
  ↑                                      |
  └──────────────── Feedback ────────────┘
```

| Stage | Location | Promotion Trigger |
|-------|----------|-------------------|
| **Idea** | `learning/ideas/backlog.md` | Reviewed and validated |
| **Learning** | `learning/best-practices/` | Used successfully 3+ times |
| **Skill** | `skills/{name}/SKILL.md` | Stable, documented, tested |
| **Standard** | CLAUDE.md Learnings section | Applied consistently |

### Auto-Capture Triggers

| User Says | Claude Does |
|-----------|-------------|
| "I learned that..." | Offer to capture in `learning/ideas/backlog.md` |
| "I keep doing..." | Suggest creating a skill |
| "Next time I should..." | Capture in ideas backlog |
| Any correction | Propose CLAUDE.md learning addition |
| Pattern repeats 3+ times | Suggest formalizing as a skill |

---

## Research → Plan → Implement (RPI)

For non-trivial tasks, use structured phases:

```
/research → research.md → /plan → plan.md → /implement → code
     ↓                       ↓                   ↓
 Sub-agents          Human Review Gate      Checkpoints
```

| Complexity | Criteria | Approach |
|------------|----------|----------|
| **Simple** | Single file, clear change | Standard execution |
| **Medium** | Multi-file, feature work | `/research` → `/plan` → `/implement` |
| **Complex** | Large refactor, architecture | Full RPI with subagents |

**One bad research line → 10 bad plan lines → 100 bad code lines.**
Always get human approval at Plan phase before implementing.

Subagents for discovery (keeps main context clean):
- `agents/codebase-locator.md` — find WHERE files live
- `agents/codebase-analyzer.md` — understand HOW code works
- `agents/pattern-finder.md` — find existing patterns to follow

Task artifacts → `~/.claude/worktrees/{task-id}/`

---

## Custom Slash Commands

Commands in `~/.claude/commands/*.md` → `/command-name` in any session.

### Built-in Claude Code Commands

| Command | Action |
|---------|--------|
| `/init` | Auto-generate CLAUDE.md for current project |
| `/compact` | Compress context window |
| `/clear` | Reset session context entirely |
| `/fast` | Toggle fast mode |
| `/memory` | View/edit persistent memory |

### Personal Commands (add as you create them)

| Command | Purpose |
|---------|---------|
| `/start-work` | Load session context, check state |
| `/end-work` | Full checkpoint, capture learnings |
| `/checkpoint` | Mid-session state save |
| `/status` | Where am I, what's in progress |
| `/research` | Spawn subagents for discovery |
| `/plan` | Structure implementation plan (needs approval) |
| `/implement` | Execute approved plan |
| `/validate-work` | Run tests, lint, typecheck |
| `/quick-commit` | Stage, commit, push with smart message |
| `/brain-dump` | Capture unstructured thoughts |
| `/pulse` | Mid-session health check |
| `/learn` | Capture a learning |

---

## Natural Language → Command Mappings

| User Says | Execute |
|-----------|---------|
| "start work", "let's get started" | `/start-work` |
| "end work", "wrap up", "done for now" | `/end-work` |
| "what's the status" | `/status` |
| "validate", "check everything" | `/validate-work` |
| "commit and push" | `/quick-commit` |
| "brain dump" | `/brain-dump` |
| "reminder:", "don't forget" | `/reminder` |
| "checkpoint", "save progress" | `/checkpoint` |
| "research this", "investigate" | `/research` |
| "create a plan" | `/plan` |
| "implement the plan" | `/implement` |
| "pulse", "am I on track" | `/pulse` |
| "I learned that..." | Offer to capture learning |

---

## Hooks System

Configure in `~/.claude/settings.json` under `"hooks"`. Personal hooks live in
`~/.claude/personal/hooks/` (symlink to `users/emarquez-personal/hooks/`).

| Event | Fires When | Good For |
|-------|-----------|----------|
| `PreToolUse` | Before any tool call | Validation, safety checks |
| `PostToolUse` | After any tool call | Auto-format, notifications |
| `Stop` | Claude finishes responding | Checkpoint, post-session cleanup |

---

## Auto-Memory System

Persistent memory across sessions at `~/.claude/projects/{path}/memory/`.
Loaded automatically. Separate from `learning/` (memory = Claude's working knowledge; learning/ = curated knowledge base).

| Type | Content |
|------|---------|
| `user_*.md` | Who you are, expertise, preferences |
| `feedback_*.md` | Corrections and validated approaches |
| `project_*.md` | Ongoing work, goals, deadlines |
| `reference_*.md` | Where to find things externally |

`MEMORY.md` = index file. Keep under 200 lines.

---

## Anti-Patterns to Avoid

- Starting to code without reading existing code first
- Making "while I'm here" scope-creep changes
- Skipping verification (tests/lint) after changes
- Speculating about code behavior without reading it
- Large changes mixing unrelated concerns
- Writing comments that explain WHAT (code is self-documenting) — only write WHY
- Adding error handling for impossible scenarios
- Creating new files when editing existing ones works

---

## Git Workflow for This Repo

```bash
# After adding learnings, skills, or commands:
cd ~/personal-claude-docs
git add .claude/enterprise/  .claude/users/
git commit -m "Learn: [what you discovered]"
git push

# On another computer after pulling:
git pull
# No re-run of setup needed - symlinks already point here
```

---

## Maintenance Schedule

| Cadence | Action |
|---------|--------|
| **Weekly** | Review `learning/ideas/backlog.md`, capture week's learnings, commit |
| **Monthly** | Update personal/CLAUDE.md goals, archive stale content, review skills |
| **Quarterly** | Deep review, promote patterns to skills, plan next quarter |

---

## Learnings & Corrections

*Format: `[YYYY-MM-DD] Context: Learning.`*

- [2026-05-08] Architecture: `personal-claude-docs` is the shared personal baseline. `~/.claude/` is machine-specific. Obsidian vaults are OneDrive-only (not git). Symlinks connect all three.
- [2026-05-08] CLAUDE.md loading: `~/.claude/CLAUDE.md` uses `@enterprise/CLAUDE.md` and `@personal/CLAUDE.md` to load shared content. Enterprise symlink at `~/.claude/enterprise` → `personal-claude-docs/.claude/enterprise/`.
- [2026-05-08] Hooks: Configure in `settings.json`. Fire on PreToolUse, PostToolUse, Stop. Use for auto-format, git checkpoints, desktop notifications.

---

## Sources

- [Boris Cherny's Claude Code workflow](https://x.com/bcherny/status/2007179832300581177)
- [Claude Code documentation](https://docs.anthropic.com/claude/docs/claude-code)
- [Dex Horthy / HumanLayer — Advanced Context Engineering](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents)
- [12-Factor Agents](https://github.com/humanlayer/12-factor-agents)
