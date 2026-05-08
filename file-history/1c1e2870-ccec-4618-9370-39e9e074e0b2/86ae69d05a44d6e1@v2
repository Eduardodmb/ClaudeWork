# Setup Obsidian Context Management Vault
# Purpose: Create Obsidian vault structure with symbolic links to ~/.claude/ directories
# Run as Administrator for symbolic link creation

param(
    [string]$VaultPath = "C:\Users\emarquez\OneDrive\Claude-Context-Management",
    [string]$ClaudePath = "C:\Users\emarquez\.claude"
)

Write-Host "Setting up Obsidian Context Management Vault..." -ForegroundColor Cyan
Write-Host "Vault location: $VaultPath" -ForegroundColor Yellow
Write-Host "Claude directory: $ClaudePath" -ForegroundColor Yellow
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "WARNING: Not running as Administrator. Symbolic links may fail." -ForegroundColor Red
    Write-Host "Falling back to directory junctions (which don't require admin)." -ForegroundColor Yellow
    Write-Host ""
}

# Create vault directory structure
Write-Host "Creating vault folders..." -ForegroundColor Green
$folders = @(
    "00-Dashboard",
    "01-Personal-Context",
    "02-Learnings",
    "03-Skills",
    "04-Commands",
    "05-Reference",
    "99-Archive"
)

foreach ($folder in $folders) {
    $path = Join-Path $VaultPath $folder
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Force -Path $path | Out-Null
        Write-Host "  ✓ Created $folder" -ForegroundColor Gray
    } else {
        Write-Host "  → $folder already exists" -ForegroundColor DarkGray
    }
}

# Create symbolic links or junctions
Write-Host ""
Write-Host "Creating links to Claude directories..." -ForegroundColor Green

$links = @(
    @{ Source = "$ClaudePath\CLAUDE.md"; Target = "$VaultPath\01-Personal-Context\CLAUDE.md"; Type = "File" },
    @{ Source = "$ClaudePath\learning"; Target = "$VaultPath\02-Learnings\_claude-learning"; Type = "Directory" },
    @{ Source = "$ClaudePath\skills"; Target = "$VaultPath\03-Skills\_claude-skills"; Type = "Directory" },
    @{ Source = "$ClaudePath\commands"; Target = "$VaultPath\04-Commands\_claude-commands"; Type = "Directory" },
    @{ Source = "$ClaudePath\reference"; Target = "$VaultPath\05-Reference\_claude-reference"; Type = "Directory" }
)

foreach ($link in $links) {
    if (Test-Path $link.Target) {
        Write-Host "  → $($link.Target) already exists, skipping" -ForegroundColor DarkGray
        continue
    }

    if (-not (Test-Path $link.Source)) {
        Write-Host "  ✗ Source not found: $($link.Source)" -ForegroundColor Red
        continue
    }

    try {
        if ($isAdmin) {
            # Create symbolic link (requires admin)
            if ($link.Type -eq "File") {
                New-Item -ItemType SymbolicLink -Path $link.Target -Target $link.Source -Force | Out-Null
            } else {
                New-Item -ItemType SymbolicLink -Path $link.Target -Target $link.Source -Force | Out-Null
            }
            Write-Host "  ✓ Symlink: $($link.Target)" -ForegroundColor Gray
        } else {
            # Fallback: Create junction for directories (no admin needed)
            if ($link.Type -eq "Directory") {
                cmd /c mklink /J "$($link.Target)" "$($link.Source)" | Out-Null
                Write-Host "  ✓ Junction: $($link.Target)" -ForegroundColor Gray
            } else {
                # Files can't use junctions, copy instead
                Copy-Item -Path $link.Source -Destination $link.Target -Force
                Write-Host "  ✓ Copied: $($link.Target) (no admin for symlink)" -ForegroundColor Yellow
            }
        }
    } catch {
        Write-Host "  ✗ Failed to create link: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Create dashboard files
Write-Host ""
Write-Host "Creating dashboard templates..." -ForegroundColor Green

$dashboardFiles = @{
    "Context-Review-Weekly.md" = @"
---
tags: [context-review, weekly]
review-date: {{date:YYYY-MM-DD}}
---

# Context Review - {{date:YYYY-MM-DD}}

## 1. Stale Content (>90 days)

``````dataview
TABLE file.mtime as "Last Modified"
FROM "02-Learnings" OR "03-Skills" OR "04-Commands"
WHERE file.mtime < date(today) - dur(90 days)
SORT file.mtime ASC
LIMIT 20
``````

**Actions:**
- [ ] Review and archive/update stale items

---

## 2. Recent Additions (This Week)

``````dataview
TABLE file.ctime as "Created"
FROM "02-Learnings" OR "03-Skills"
WHERE file.ctime > date(today) - dur(7 days)
SORT file.ctime DESC
``````

**Quality Check:**
- [ ] All items have proper tags?
- [ ] Descriptions clear?

---

## 3. Personal Context Updates

**What changed this week?**
- New preferences:
- Patterns noticed:

**CLAUDE.md updates needed?**
- [ ] Update "Current Focus Areas"
- [ ] Add technical preferences
- [ ] Document stakeholder context

---

## Review Complete

**Next review:** {{date+7d:YYYY-MM-DD}}
"@

    "Context-Quality-Dashboard.md" = @"
# Context Quality Dashboard

## Overview Stats

``````dataview
TABLE length(rows) as "Count"
FROM "02-Learnings" OR "03-Skills" OR "04-Commands"
GROUP BY file.folder
``````

---

## Graph View

Open Graph View (Ctrl+G) and filter:
- \`path:02-Learnings OR path:03-Skills\`
- Color by: \`tag:befirst\`, \`tag:infrastructure\`

---

## Freshness Report

### Recently Updated
``````dataview
TABLE file.mtime as "Last Modified"
FROM "02-Learnings" OR "03-Skills"
WHERE file.mtime > date(today) - dur(30 days)
SORT file.mtime DESC
LIMIT 20
``````

### Stale (Needs Review)
``````dataview
TABLE file.mtime as "Last Modified"
FROM "02-Learnings" OR "03-Skills"
WHERE file.mtime < date(today) - dur(90 days)
SORT file.mtime ASC
``````

---

## Tag Coverage

``````dataview
TABLE length(rows) as "Count"
FROM "02-Learnings" OR "03-Skills"
WHERE file.tags
GROUP BY file.tags
SORT length(rows) DESC
``````
"@

    "README.md" = @"
# Context Management Vault

This Obsidian vault provides a graphical interface for reviewing and improving Claude Code context quality.

## Quick Start

1. Install Obsidian from https://obsidian.md/
2. Open this folder as a vault
3. Install community plugins:
   - Dataview (required for queries)
   - Calendar (for scheduling reviews)
   - Templater (for templates)
   - Tag Wrangler (for tag management)
4. Open \`Context-Quality-Dashboard.md\` to see overview

## Folder Structure

| Folder | Purpose |
|--------|---------|
| \`00-Dashboard/\` | Weekly review templates and dashboards |
| \`01-Personal-Context/\` | CLAUDE.md (symlink to ~/.claude/) |
| \`02-Learnings/\` | Learning files (symlink to ~/.claude/learning) |
| \`03-Skills/\` | Skill files (symlink to ~/.claude/skills) |
| \`04-Commands/\` | Command files (symlink to ~/.claude/commands) |
| \`05-Reference/\` | Reference docs (symlink to ~/.claude/reference) |
| \`99-Archive/\` | Archived/stale context |

## Weekly Review Process

**When:** Every Friday, 4:00 PM (30 minutes)

1. Create new note from \`Context-Review-Weekly.md\` template
2. Run Dataview queries to find stale content
3. Triage: Keep/Archive/Update/Promote
4. Update CLAUDE.md personal section
5. Create action items for next week

## Features

- **Graph View**: Visualize context relationships
- **Dataview Queries**: Find stale, untagged, or duplicate content
- **Tag Management**: Organize context by domain/type/status
- **Templates**: Consistent review process

## Documentation

See \`C:\Users\emarquez\.claude\learning\context-review-system.md\` for complete guide.
"@
}

foreach ($file in $dashboardFiles.Keys) {
    $filePath = Join-Path "$VaultPath\00-Dashboard" $file
    if (-not (Test-Path $filePath)) {
        $dashboardFiles[$file] | Out-File -FilePath $filePath -Encoding UTF8
        Write-Host "  ✓ Created $file" -ForegroundColor Gray
    } else {
        Write-Host "  → $file already exists" -ForegroundColor DarkGray
    }
}

# Create Obsidian configuration
Write-Host ""
Write-Host "Creating Obsidian configuration..." -ForegroundColor Green

$obsidianConfigDir = Join-Path $VaultPath ".obsidian"
if (-not (Test-Path $obsidianConfigDir)) {
    New-Item -ItemType Directory -Force -Path $obsidianConfigDir | Out-Null
}

# Minimal config to enable plugins
$configJson = @{
    "pluginEnabledStatus" = @{
        "file-recovery" = $true
        "graph" = $true
        "tag-pane" = $true
        "page-preview" = $true
        "daily-notes" = $true
        "command-palette" = $true
    }
} | ConvertTo-Json -Depth 10

$configPath = Join-Path $obsidianConfigDir "config.json"
if (-not (Test-Path $configPath)) {
    $configJson | Out-File -FilePath $configPath -Encoding UTF8
    Write-Host "  ✓ Created config.json" -ForegroundColor Gray
}

# Create community plugins config
$communityPluginsJson = @(
    "dataview",
    "calendar",
    "templater-obsidian",
    "tag-wrangler",
    "obsidian-kanban"
) | ConvertTo-Json

$communityPluginsPath = Join-Path $obsidianConfigDir "community-plugins.json"
if (-not (Test-Path $communityPluginsPath)) {
    $communityPluginsJson | Out-File -FilePath $communityPluginsPath -Encoding UTF8
    Write-Host "  ✓ Created community-plugins.json (install plugins manually in Obsidian)" -ForegroundColor Gray
}

# Complete
Write-Host ""
Write-Host "✓ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install Obsidian from https://obsidian.md/" -ForegroundColor White
Write-Host "2. Open Obsidian and select 'Open folder as vault'" -ForegroundColor White
Write-Host "3. Navigate to: $VaultPath" -ForegroundColor White
Write-Host "4. Install community plugins:" -ForegroundColor White
Write-Host "   - Dataview (required)" -ForegroundColor Gray
Write-Host "   - Calendar, Templater, Tag Wrangler, Kanban (recommended)" -ForegroundColor Gray
Write-Host "5. Open 00-Dashboard/Context-Quality-Dashboard.md to start exploring" -ForegroundColor White
Write-Host ""
Write-Host "Documentation: C:\Users\emarquez\.claude\learning\context-review-system.md" -ForegroundColor Yellow
