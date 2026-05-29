# Context Sync Rules

How local Claude state syncs with the team repository.

## Sync Direction

```
LOCAL (user machine)                    REPO (organizational-docs)
~/.claude/state/                        shared/claude-workflow/
├── phase.md          ───────────────►  learnings/* (if valuable)
├── session.json                        team-context.md
└── learnings
                      ◄───────────────  (pull on session start)
```

## What Syncs Automatically

### Local → Repo (Push)

| Content | Trigger | Destination |
|---------|---------|-------------|
| Mistake correction | On capture | `learnings/corrections.md` |
| Effective pattern | Session end | `learnings/patterns.md` |
| Integration insight | On discovery | `learnings/integrations.md` |
| Major milestone | Phase complete | `team-context.md` |

### Repo → Local (Pull)

| Content | Trigger | Source |
|---------|---------|--------|
| Team learnings | Session start | `learnings/*.md` |
| Current context | Session start | `team-context.md` |
| Org standards | Always | `.claude/CLAUDE.md` |

## What Does NOT Sync

- Personal phase.md content (stays local)
- Session-specific state (ephemeral)
- Work-in-progress items (only completed learnings)
- User preferences (local only)

## Sync Protocol

### On Session Start (Claude does automatically)

```
1. cd organizational-docs && git pull (if repo accessible)
2. Read shared/claude-workflow/team-context.md
3. Read shared/claude-workflow/learnings/*.md (recent)
4. Load ~/.claude/state/phase.md (local state)
5. Merge context: team + local = working context
```

### On Learning Captured (Claude does automatically)

```
1. Evaluate: Is this team-valuable?
   - Mistake that others might make? → Yes
   - Pattern that saves time? → Yes
   - Personal preference? → No

2. If valuable:
   - Format for appropriate learnings file
   - Stage for commit
   - Note in session.json: pendingLearnings[]
```

### On Session End (Claude does automatically)

```
1. If pendingLearnings.length > 0:
   - cd organizational-docs
   - git add shared/claude-workflow/learnings/*
   - git commit -m "chore: add session learnings [auto]"
   - git push (if possible)

2. Update team-context.md if major milestone
3. Clear pendingLearnings
```

## Conflict Resolution

| Scenario | Resolution |
|----------|------------|
| Same learning from multiple users | Keep both, dedupe on review |
| Conflicting patterns | Flag for human review |
| Merge conflict | Pull latest, reapply local changes |

## Manual Triggers

While sync is automatic, users can force:

- `git pull` in organizational-docs → Get latest team context
- `git push` → Push local learnings immediately
- Edit `learnings/*.md` directly → Share without waiting for session end

## Monitoring

Check sync health:
```bash
# Last sync time
git -C ~/organizational-docs log -1 --format="%ar" -- shared/claude-workflow/

# Pending local learnings
cat ~/.claude/state/session.json | jq '.sync.pendingLearnings'
```
