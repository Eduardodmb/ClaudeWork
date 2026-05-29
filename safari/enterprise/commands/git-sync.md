# Git Auto-Sync

Automatic Git synchronization for team workflow. Auto-push on every commit, auto-pull on session start.

## Key Repository Paths

| Repo | Local Path | Remote |
|------|------------|--------|
| **organizational-docs** | `C:\Users\dkmcintyre\organizational-docs` | SafariCircuitsLLC/organizational-docs |

## Purpose

Makes Git sync invisible - Claude automatically keeps local and remote in sync without users thinking about it.

## When This Runs

| Trigger | Action |
|---------|--------|
| **Session start** | Auto-pull from all tracked repos |
| **After commit** | Auto-push to remote |
| **`/sync`** | Force pull + push |
| **Conflict detected** | Apply resolution rules or ask user |

---

## Auto-Pull Flow

Run on `/start-work` or `/sync`:

```
AUTO_PULL():
  1. Read ~/.claude/state/git-sync.json
  2. For each repo with autoPull == true:

     cd {repo.localPath}
     git fetch origin

     # Check for remote changes
     CHANGES=$(git rev-list HEAD..origin/{branch} --count)

     IF CHANGES > 0:
       IF working tree clean:
         git pull --rebase origin {branch}
         Report: "✓ Synced {CHANGES} changes from remote"

       ELIF uncommitted changes:
         git stash
         git pull --rebase origin {branch}
         git stash pop
         Report: "✓ Synced {CHANGES} changes (stashed local changes)"

       IF conflicts:
         CONFLICT_RESOLUTION()

     ELSE:
       Report: "✓ Already up to date"

  3. Update git-sync.json:
     - lastPull: now()
     - Add to syncHistory
```

---

## Auto-Push Flow

Run after `/quick-commit` or `/sync`:

```
AUTO_PUSH(commit_hash):
  1. Read ~/.claude/state/git-sync.json
  2. IF repos[activeRepo].autoPush == false:
     Report: "Push pending (auto-push disabled)"
     Add to pendingPushes
     RETURN

  3. cd {repo.localPath}
     git push origin {branch}

  4. IF push rejected (remote has changes):
     git pull --rebase origin {branch}
     IF conflicts: CONFLICT_RESOLUTION()
     git push origin {branch}

  5. IF still fails:
     Report: "⚠️ Push failed - manual intervention required"
     Add to pendingPushes
     RETURN

  6. Update git-sync.json:
     - lastPush: now()
     - pushCount++
     - Add to syncHistory

  7. Report: "✓ Pushed to origin/{branch}"
```

---

## Conflict Resolution

Read `organizational-docs/shared/claude-workflow/enforcement/conflict-rules.yaml` for resolution rules.

```
CONFLICT_RESOLUTION(files):
  1. For each conflicting file:
     - Match against conflict-rules.yaml patterns
     - Determine strategy

  2. IF strategy == prefer_remote:
     git checkout --theirs {file}
     git add {file}

  3. ELIF strategy == prefer_local:
     git checkout --ours {file}
     git add {file}

  4. ELIF strategy == manual:
     Report: "⚠️ Conflict requires manual resolution"
     List conflicting files
     Wait for user to resolve
     RETURN

  5. ELIF strategy == local_only:
     # Should never conflict - in .gitignore
     Skip

  6. After all auto-resolved:
     git commit -m "chore: auto-resolve merge conflicts"

  7. Record in git-sync.json conflicts array
```

### Resolution Strategies by File Type

| File Type | Strategy | Rationale |
|-----------|----------|-----------|
| `**/*.md` | prefer_remote | Team docs likely more current |
| `**/*.json` (config) | prefer_local | User settings |
| `**/*.ts`, `**/*.py` | manual | Code needs human review |
| `.githooks/**` | prefer_remote | Team standard hooks |
| `**/state/*.json` | local_only | Never sync (gitignore) |
| `**/learning/**` | prefer_remote | Team knowledge |

### Exceptions

| Pattern | Strategy |
|---------|----------|
| `CHANGELOG.md` | manual |
| `index.yaml` | manual |
| `phase.md` | local_only |

---

## Commands

### `/sync` - Full Sync

Force pull and push for all repos:

```bash
# Display
**Git Sync**

Pulling from organizational-docs...
✓ Synced 3 changes from remote

Pushing to organizational-docs...
✓ Pushed to origin/main (abc1234)

**Sync Complete**
- Last pull: just now
- Last push: just now
- Push count: 47
```

### `/pull` - Force Pull

Pull latest from remote (even if no autoPull):

```bash
git -C {repo.localPath} pull --rebase origin {branch}
```

### `/push-all` - Push Pending

Push all pending commits:

```bash
FOR repo IN pendingPushes:
  git -C {repo.localPath} push origin {branch}
```

### `/sync-status` - Show Sync Health

Display sync status for all tracked repos:

```
**Git Sync Status**

organizational-docs:
- Local: C:\Users\dkmcintyre\organizational-docs
- Remote: origin (SafariCircuitsLLC/organizational-docs)
- Branch: main
- Auto-push: ✓ Enabled
- Auto-pull: ✓ Enabled
- Last push: 2 hours ago
- Last pull: 5 minutes ago
- Pending: 0 commits
- Conflicts: None
```

---

## State File Structure

`~/.claude/state/git-sync.json`:

```json
{
  "version": "1.0",
  "repos": {
    "organizational-docs": {
      "localPath": "C:/Users/dkmcintyre/organizational-docs",
      "remote": "origin",
      "branch": "main",
      "autoPush": true,
      "autoPull": true,
      "lastPush": "2026-01-19T15:30:00Z",
      "lastPull": "2026-01-19T16:00:00Z",
      "pushCount": 47,
      "conflicts": []
    }
  },
  "activeRepo": "organizational-docs",
  "pendingPushes": [],
  "syncHistory": [
    {
      "timestamp": "2026-01-19T16:00:00Z",
      "type": "pull",
      "repo": "organizational-docs",
      "changes": 3
    }
  ]
}
```

---

## Integration Points

### With /start-work

Add step 0.5 (Auto-Pull Sync):
- Run AUTO_PULL() for all repos
- Display sync status in session header

### With /quick-commit

Add step 5 (Auto-Push):
- After successful commit, run AUTO_PUSH()
- Report push result

### With /status

Add Git Sync section:
- Last push/pull timestamps
- Pending pushes count
- Conflict warnings

---

## Natural Language Triggers

| Say | Action |
|-----|--------|
| "sync", "sync repos", "sync git" | Run `/sync` |
| "pull latest", "get latest", "update from remote" | Run AUTO_PULL() |
| "push changes", "push to remote" | Run AUTO_PUSH() |
| "sync status", "show sync", "git status" | Run `/sync-status` |

---

## Disabling Auto-Sync

To disable for a specific repo:

```json
// In git-sync.json
"repos": {
  "organizational-docs": {
    "autoPush": false,
    "autoPull": false
  }
}
```

Or say: "disable auto-push" / "disable auto-pull"

---

## Related

- `/start-work` - Includes auto-pull
- `/quick-commit` - Includes auto-push
- `/status` - Shows sync health
- `conflict-rules.yaml` - Resolution strategies
