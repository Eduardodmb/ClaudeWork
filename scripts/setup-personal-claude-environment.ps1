#Requires -Version 5.1
<#
.SYNOPSIS
    Bootstrap Personal Claude Environment with Obsidian Integration

.DESCRIPTION
    Creates a personal Claude Code environment with:
    - Standard folder structure (learning, skills, commands, reference, agents)
    - Files stored in Obsidian vault for easy access
    - Symlinks from .claude to Obsidian for Claude Code to use
    - Personal CLAUDE.md template

.PARAMETER ObsidianVaultPath
    Path to your Obsidian vault's Claude folder
    Default: C:\Users\$env:USERNAME\OneDrive\16 - Obsidian\00_Claude

.PARAMETER Force
    Recreate symlinks even if they already exist

.EXAMPLE
    .\setup-personal-claude-environment.ps1

.EXAMPLE
    .\setup-personal-claude-environment.ps1 -ObsidianVaultPath "D:\MyVault\Claude" -Force
#>

[CmdletBinding()]
param(
    [Parameter()]
    [string]$ObsidianVaultPath = "C:\Users\$env:USERNAME\OneDrive\16 - Obsidian\00_Claude",

    [Parameter()]
    [switch]$Force
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Step { param([string]$Message) Write-Host "→ $Message" -ForegroundColor Cyan }
function Write-Success { param([string]$Message) Write-Host "✓ $Message" -ForegroundColor Green }
function Write-Warning { param([string]$Message) Write-Host "⚠ $Message" -ForegroundColor Yellow }
function Write-Error { param([string]$Message) Write-Host "✗ $Message" -ForegroundColor Red }

# Header
Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║   Personal Claude Environment Bootstrap              ║" -ForegroundColor Blue
Write-Host "║   Obsidian-Integrated Setup                          ║" -ForegroundColor Blue
Write-Host "╚════════════════════════════════════════════════════════╝`n" -ForegroundColor Blue

# Validate paths
$claudeRoot = "$env:USERPROFILE\.claude"
Write-Step "Validating paths..."
Write-Host "  Claude root: $claudeRoot"
Write-Host "  Obsidian vault: $ObsidianVaultPath"

if (-not (Test-Path $claudeRoot)) {
    Write-Error "Claude directory not found. Run Claude Code at least once first."
    exit 1
}

# Create Obsidian folder structure
Write-Step "Creating folder structure in Obsidian vault..."

$folders = @(
    "learning\best-practices",
    "learning\ideas",
    "skills",
    "commands",
    "reference",
    "agents",
    "state"
)

foreach ($folder in $folders) {
    $fullPath = Join-Path $ObsidianVaultPath $folder
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Success "Created: $folder"
    } else {
        Write-Host "  Already exists: $folder" -ForegroundColor Gray
    }
}

# Create starter files in Obsidian vault
Write-Step "Creating starter files..."

# CLAUDE.md template
$claudeMdPath = Join-Path $ObsidianVaultPath "CLAUDE.md"
if (-not (Test-Path $claudeMdPath)) {
    $claudeMdContent = @"
# Personal Claude Environment

Last updated: $(Get-Date -Format "yyyy-MM-dd")

## About This Setup

This is your personal Claude Code configuration, organized for:
- Knowledge capture (learnings)
- Reusable workflows (skills)
- Custom commands
- Reference documentation
- AI agent definitions

Files live in your Obsidian vault and are symlinked to ~/.claude for Claude Code to use.

---

## Core Principles

1. **Capture as you learn** - Document insights when you discover them
2. **Build reusable skills** - Turn repeated patterns into skills
3. **Keep context fresh** - Review and update regularly
4. **Simple over complex** - Minimal structure, maximum value

---

## Folder Structure

| Folder | Purpose | What Goes Here |
|--------|---------|----------------|
| **learning/** | Knowledge base | Best practices, lessons learned, ideas backlog |
| **skills/** | Reusable workflows | Task automations, coding patterns, procedures |
| **commands/** | Custom slash commands | Personal /commands for Claude Code |
| **reference/** | Quick lookup | Technology docs, API references, cheat sheets |
| **agents/** | AI agent definitions | Specialized subagents for complex tasks |

---

## Your Preferences

### Work Style
- [ ] Document your preferred communication style
- [ ] Note your typical work hours/rhythms
- [ ] List technologies you use most often
- [ ] Capture any pet peeves or "don't do this" rules

### Common Tasks
- [ ] What do you build most often?
- [ ] What problems do you solve repeatedly?
- [ ] What workflows could be automated?

### Learning Goals
- [ ] Technologies you're learning
- [ ] Skills you want to develop
- [ ] Areas where you want Claude's help most

---

## Quick Start

### Capture a Learning
Create a file in `learning/best-practices/{topic}.md`:
``````markdown
---
topic: {topic-name}
created: $(Get-Date -Format "yyyy-MM-dd")
tags: [tag1, tag2]
---

# {Topic Name}

## What I Learned
...

## When to Use
...

## Example
``````

### Create a Skill
Create a folder in `skills/{skill-name}/`:
- `SKILL.md` - Main documentation
- Supporting files as needed

### Add a Command
Create `commands/{command-name}.md` following Claude Code command format.

---

## Maintenance

### Weekly Review
- Capture any new learnings from the week
- Update skills that evolved
- Archive obsolete content

### Monthly Cleanup
- Review `learning/ideas/backlog.md`
- Promote validated learnings to best-practices
- Update this CLAUDE.md with new preferences

---

## Personal Notes

Add your own sections here for:
- Current projects
- Active learning areas
- Reminders for Claude
- Context that helps Claude help you better

"@
    Set-Content -Path $claudeMdPath -Value $claudeMdContent -Encoding UTF8
    Write-Success "Created: CLAUDE.md"
} else {
    Write-Host "  Already exists: CLAUDE.md" -ForegroundColor Gray
}

# learning/ideas/backlog.md
$backlogPath = Join-Path $ObsidianVaultPath "learning\ideas\backlog.md"
if (-not (Test-Path $backlogPath)) {
    $backlogContent = @"
# Ideas Backlog

Capture ideas here as they come. Review weekly and promote to best-practices when validated.

## Format
``````markdown
- [ ] **Idea title** - Brief description (captured: yyyy-mm-dd)
``````

---

## Captured Ideas

- [ ] **Example idea** - This is how you'd capture a quick idea (captured: $(Get-Date -Format "yyyy-MM-dd"))

"@
    Set-Content -Path $backlogPath -Value $backlogContent -Encoding UTF8
    Write-Success "Created: learning/ideas/backlog.md"
}

# learning/best-practices/README.md
$learningReadmePath = Join-Path $ObsidianVaultPath "learning\best-practices\README.md"
if (-not (Test-Path $learningReadmePath)) {
    $learningReadmeContent = @"
# Best Practices

Validated learnings that have proven useful multiple times.

## Organization

Create one file per topic:
- `{technology}.md` - Technology-specific practices
- `{pattern}.md` - Design patterns or approaches
- `{workflow}.md` - Process improvements

## Template

``````markdown
---
topic: {topic-name}
created: yyyy-mm-dd
updated: yyyy-mm-dd
tags: [tag1, tag2]
validated: true
---

# {Topic Name}

## Context
When does this apply?

## The Practice
What to do (or not do)

## Why It Works
Explanation and tradeoffs

## Examples
Real-world usage
``````
"@
    Set-Content -Path $learningReadmePath -Value $learningReadmeContent -Encoding UTF8
    Write-Success "Created: learning/best-practices/README.md"
}

# README in other folders
$readmeFiles = @{
    "skills\README.md" = @"
# Skills

Reusable workflows and automations.

Each skill is a folder with `SKILL.md` and supporting files.

## Template Structure

``````
skills/{skill-name}/
├── SKILL.md          (main documentation)
├── example.txt       (examples)
└── template.md       (templates if needed)
``````

See organizational-docs reference for SKILL.md format.
"@
    "commands\README.md" = @"
# Commands

Custom slash commands for Claude Code.

Each command is a `.md` file that Claude reads when you use `/{command-name}`.

## Format

``````markdown
# Command: /{command-name}

## Purpose
What this command does

## Usage
/{command-name} [args]

## Instructions for Claude
Step-by-step what Claude should do when this command is invoked
``````
"@
    "reference\README.md" = @"
# Reference

Quick lookup documentation and cheat sheets.

Organize by technology or domain:
- `git-commands.md`
- `sql-snippets.md`
- `api-endpoints.md`
- etc.
"@
    "agents\README.md" = @"
# Agents

Specialized subagent definitions for complex tasks.

Use when you need Claude to spawn a focused subagent for:
- Code exploration
- Research
- Analysis
- Multi-step workflows

See Claude Code docs for agent format.
"@
}

foreach ($file in $readmeFiles.Keys) {
    $filePath = Join-Path $ObsidianVaultPath $file
    if (-not (Test-Path $filePath)) {
        Set-Content -Path $filePath -Value $readmeFiles[$file] -Encoding UTF8
        Write-Success "Created: $file"
    }
}

# Create symlinks from .claude to Obsidian vault
Write-Step "Creating symlinks from .claude to Obsidian vault..."

$symlinks = @(
    @{Source = "learning"; Target = Join-Path $ObsidianVaultPath "learning"},
    @{Source = "skills"; Target = Join-Path $ObsidianVaultPath "skills"},
    @{Source = "commands"; Target = Join-Path $ObsidianVaultPath "commands"},
    @{Source = "reference"; Target = Join-Path $ObsidianVaultPath "reference"},
    @{Source = "agents"; Target = Join-Path $ObsidianVaultPath "agents"}
)

foreach ($link in $symlinks) {
    $linkPath = Join-Path $claudeRoot $link.Source
    $targetPath = $link.Target

    # Check if symlink already exists
    if (Test-Path $linkPath) {
        if ($Force) {
            Write-Warning "Removing existing: $($link.Source)"
            Remove-Item $linkPath -Force -Recurse
        } else {
            Write-Host "  Already exists: $($link.Source)" -ForegroundColor Gray
            continue
        }
    }

    # Create symlink
    try {
        New-Item -ItemType SymbolicLink -Path $linkPath -Target $targetPath -Force | Out-Null
        Write-Success "Linked: $($link.Source) → Obsidian"
    } catch {
        Write-Error "Failed to create symlink for $($link.Source): $_"
    }
}

# Also symlink CLAUDE.md
$claudeMdLink = Join-Path $claudeRoot "CLAUDE.md"
$claudeMdTarget = Join-Path $ObsidianVaultPath "CLAUDE.md"

if (Test-Path $claudeMdLink) {
    if ($Force) {
        Write-Warning "Backing up existing CLAUDE.md..."
        Copy-Item $claudeMdLink "$claudeRoot\CLAUDE.md.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        Remove-Item $claudeMdLink -Force
    } else {
        Write-Warning "CLAUDE.md already exists in .claude (keeping existing)"
        Write-Host "  Run with -Force to replace with Obsidian version" -ForegroundColor Yellow
    }
}

if (-not (Test-Path $claudeMdLink)) {
    New-Item -ItemType SymbolicLink -Path $claudeMdLink -Target $claudeMdTarget -Force | Out-Null
    Write-Success "Linked: CLAUDE.md → Obsidian"
}

# Create .gitignore in Obsidian vault
$gitignorePath = Join-Path $ObsidianVaultPath ".gitignore"
if (-not (Test-Path $gitignorePath)) {
    $gitignoreContent = @"
# Claude state files (local only)
state/
*.jsonl
*.json

# Logs
*.log

# Temp files
*.tmp
.DS_Store
Thumbs.db
"@
    Set-Content -Path $gitignorePath -Value $gitignoreContent -Encoding UTF8
    Write-Success "Created: .gitignore"
}

# Summary
Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   ✓ Personal Claude Environment Ready                ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "Your setup:" -ForegroundColor Cyan
Write-Host "  • Files live in: " -NoNewline; Write-Host $ObsidianVaultPath -ForegroundColor Yellow
Write-Host "  • Claude reads from: " -NoNewline; Write-Host $claudeRoot -ForegroundColor Yellow
Write-Host "  • Edit in Obsidian, Claude uses automatically" -ForegroundColor Gray

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "  1. Open Obsidian and navigate to 00_Claude folder"
Write-Host "  2. Read CLAUDE.md and customize for your preferences"
Write-Host "  3. Start capturing learnings in learning/best-practices/"
Write-Host "  4. Build your first skill in skills/"

Write-Host "`nQuick commands:" -ForegroundColor Cyan
Write-Host "  • Start Claude Code and it will use your new structure"
Write-Host "  • Everything you create in Obsidian is available to Claude"
Write-Host "  • Backup: The Obsidian vault folder (synced via OneDrive)"

Write-Host ""
