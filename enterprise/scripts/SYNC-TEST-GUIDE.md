# Sync Testing Guide

Complete guide to verify that your Claude Code setup is synchronized across computers.

## Quick Test (Home Computer - Current)

### Step 1: Verify Local Setup

```powershell
# Run verification script
& "$env:USERPROFILE\personal-claude-docs\.claude\enterprise\scripts\verify-sync.ps1"

# Or with detailed output
& "$env:USERPROFILE\personal-claude-docs\.claude\enterprise\scripts\verify-sync.ps1" -Detailed
```

**Expected Result:** All checks pass (green ✓)

### Step 2: Test Commands in Claude Code

In this Claude Code session, try:

```
/pulse
/learn Test learning capture
/status
/checkpoint
```

**Expected Result:** All commands work without errors

### Step 3: Commit and Push Changes

```powershell
cd $env:USERPROFILE\personal-claude-docs
git add .
git commit -m "Add enterprise commands, agents, and learning structure"
git push
```

**Expected Result:** Changes pushed to GitHub successfully

## Full Test (Work Computer - After Sync)

### Step 1: Pull Latest Changes

```powershell
cd $env:USERPROFILE\personal-claude-docs
git pull
```

**Expected Result:** New files downloaded (commands, agents, scripts)

### Step 2: Verify Setup

```powershell
& "$env:USERPROFILE\personal-claude-docs\.claude\enterprise\scripts\verify-sync.ps1" -Detailed
```

**Expected Result:** All checks pass, same command count as home computer

### Step 3: Test Commands

Start a new Claude Code session and try the same commands:

```
/pulse
/learn Testing sync between computers
/status
```

**Expected Result:** Commands work identically to home computer

### Step 4: Test Sync Back

Make a change on work computer:

```powershell
cd $env:USERPROFILE\personal-claude-docs
# Add a test file
echo "Test from work computer" > .claude\enterprise\test-sync.txt
git add .
git commit -m "Test sync from work computer"
git push
```

Then on home computer:

```powershell
cd $env:USERPROFILE\personal-claude-docs
git pull
Get-Content .claude\enterprise\test-sync.txt
```

**Expected Result:** File appears on home computer with correct content

## Verification Checklist

### Home Computer (eduar)

- [ ] personal-claude-docs repo exists at `C:\Users\eduar\personal-claude-docs`
- [ ] Symlink `~\.claude\enterprise` → `personal-claude-docs\.claude\enterprise`
- [ ] 13+ commands available in `~\.claude\enterprise\commands`
- [ ] 3+ agents available in `~\.claude\enterprise\agents`
- [ ] Learning structure exists
- [ ] Commands work in Claude Code session
- [ ] Git status clean (or committed)
- [ ] Changes pushed to GitHub

### Work Computer (emarquez)

- [ ] personal-claude-docs repo exists at `C:\Users\emarquez\personal-claude-docs`
- [ ] Symlink `~\.claude\enterprise` → `personal-claude-docs\.claude\enterprise`
- [ ] Same command count as home computer
- [ ] Same agent count as home computer
- [ ] Commands work in Claude Code session
- [ ] Git pull brings latest changes
- [ ] Test push/pull cycle completes

## Troubleshooting

### Commands don't work after pull

**Issue:** Commands show in file system but not available in Claude Code

**Fix:** Restart Claude Code or start a new session

### Symlinks broken after pull

**Issue:** `verify-sync.ps1` shows symlink errors

**Fix:** Re-run setup script
```powershell
& "$env:USERPROFILE\personal-claude-docs\.claude\scripts\setup-personal.ps1"
```

### Git conflicts on pull

**Issue:** Merge conflicts when pulling changes

**Fix:** 
```powershell
git status
# Review conflicts
git merge --abort  # if needed
git pull --rebase  # alternative approach
```

### Different file counts between computers

**Issue:** Home has 13 commands, work has 8 commands

**Fix:** Ensure both computers pulled latest changes
```powershell
cd $env:USERPROFILE\personal-claude-docs
git fetch --all
git status  # Check if behind origin
git pull
```

## Expected File Structure

After successful sync, both computers should have:

```
~/.claude/
├── enterprise/ (symlink → personal-claude-docs/.claude/enterprise/)
│   ├── commands/
│   │   ├── brain-dump.md
│   │   ├── checkpoint.md
│   │   ├── end-work.md
│   │   ├── implement.md
│   │   ├── learn.md
│   │   ├── plan.md
│   │   ├── pulse.md
│   │   ├── quick-commit.md
│   │   ├── README.md
│   │   ├── reminder.md
│   │   ├── research.md
│   │   ├── start-work.md
│   │   ├── status.md
│   │   └── validate-work.md
│   ├── agents/
│   │   ├── codebase-analyzer.md
│   │   ├── codebase-locator.md
│   │   ├── pattern-finder.md
│   │   └── README.md
│   ├── learning/
│   │   ├── ideas/
│   │   │   ├── backlog.md
│   │   │   └── lifecycle.md
│   │   ├── best-practices/
│   │   └── PIPELINE.md
│   ├── scripts/
│   │   ├── verify-sync.ps1
│   │   └── SYNC-TEST-GUIDE.md
│   ├── CLAUDE.md
│   └── boris-workflow.md
└── personal/ (symlink → personal-claude-docs/.claude/users/emarquez-personal/)
    ├── CLAUDE.md
    └── ...
```

## Sync Workflow

### Daily Work Pattern

**Home Computer:**
```powershell
# Morning
cd $env:USERPROFILE\personal-claude-docs
git pull  # Get latest from work

# Work...

# Evening
git add .
git commit -m "Description of changes"
git push
```

**Work Computer:**
```powershell
# Morning
cd $env:USERPROFILE\personal-claude-docs
git pull  # Get latest from home

# Work...

# Evening  
git add .
git commit -m "Description of changes"
git push
```

### When to Commit

**Commit after:**
- Adding new commands or agents
- Creating new learnings or memories
- Updating CLAUDE.md
- Discovering new patterns to document

**Don't commit:**
- Session-specific state
- Temporary test files
- Personal API keys or secrets
- Computer-specific configuration (those go in machine-specific CLAUDE.md)

## Validation Commands

Quick one-liners to verify sync:

```powershell
# Check command count
(Get-ChildItem "$env:USERPROFILE\.claude\enterprise\commands\*.md" | Where-Object { $_.Name -ne "README.md" }).Count

# Check agent count
(Get-ChildItem "$env:USERPROFILE\.claude\enterprise\agents\*.md" | Where-Object { $_.Name -ne "README.md" }).Count

# Check git status
Push-Location "$env:USERPROFILE\personal-claude-docs"; git status; Pop-Location

# Check if behind origin
Push-Location "$env:USERPROFILE\personal-claude-docs"; git fetch; git status; Pop-Location

# List all commands
Get-ChildItem "$env:USERPROFILE\.claude\enterprise\commands\*.md" | Where-Object { $_.Name -ne "README.md" } | Select-Object -ExpandProperty BaseName | ForEach-Object { "/$_" }
```

## Success Criteria

✅ Sync is working correctly when:

1. **Verification script passes** on both computers
2. **Same file counts** for commands and agents
3. **Commands work identically** on both computers
4. **Git pull** brings changes from other computer
5. **Git push** sends changes to other computer
6. **No symlink errors** in verification
7. **No git conflicts** on routine pulls

## Maintenance

**Weekly:** Run verification script on both computers
**After major changes:** Test sync cycle (push from one, pull on other)
**If issues:** Check symlinks, re-run setup script if needed

## Related Documentation

- `personal-claude-docs/.claude/enterprise/CLAUDE.md` - Enterprise configuration
- `personal-claude-docs/.claude/users/emarquez-personal/CLAUDE.md` - Personal preferences
- `~/.claude/CLAUDE.md` - Machine-specific loader (loads above files)
