#Requires -Version 5.1
<#
.SYNOPSIS
    Bootstrap ClaudeWork - work computer full setup.

.DESCRIPTION
    TEMPLATE - copy this file to ClaudeWork repo as .setup\setup-work.ps1

    Runs in two steps:
      1. Calls setup-personal.ps1 to wire ~/.claude/ -> personal-claude-docs
      2. Wires the work Obsidian vault (00_Claude) -> ~/.claude/

    Run once on work computer (emarquez / C:\Users\emarquez\OneDrive\).

.PARAMETER Force
    Remove and recreate existing symlinks/junctions.
#>

[CmdletBinding()]
param([switch]$Force, [switch]$BackupExisting)

$ErrorActionPreference = "Stop"

function Write-Step { param([string]$m) Write-Host "  -> $m" -ForegroundColor Cyan }
function Write-Ok   { param([string]$m) Write-Host "  OK  $m" -ForegroundColor Green }
function Write-Skip { param([string]$m) Write-Host "  --  $m" -ForegroundColor Gray }
function Write-Warn { param([string]$m) Write-Host "  !!  $m" -ForegroundColor Yellow }
function Write-Fail { param([string]$m) Write-Host "  XX  $m" -ForegroundColor Red }

Write-Host ""
Write-Host "============================================" -ForegroundColor Blue
Write-Host "  ClaudeWork Setup - Work Computer (emarquez)" -ForegroundColor Blue
Write-Host "============================================" -ForegroundColor Blue
Write-Host ""

$claudeRoot  = "C:\Users\emarquez\.claude"
$claudeDocs  = "C:\Users\emarquez\personal-claude-docs"
$vaultPath   = "C:\Users\emarquez\OneDrive\16 - Obsidian\00_Claude"

# ─── 1. Run setup-personal.ps1 ───────────────────────────────────────────────

$setupScript = "$claudeDocs\.claude\scripts\setup-personal.ps1"

if (-not (Test-Path $setupScript)) {
    Write-Fail "personal-claude-docs not found at $claudeDocs"
    Write-Host "  Clone it first:" -ForegroundColor Gray
    Write-Host "  git clone https://github.com/Eduardodmb/ClaudeDocs.git $claudeDocs" -ForegroundColor Gray
    exit 1
}

Write-Step "Step 1: Wire ~/.claude/ -> personal-claude-docs"
$params = @{}
if ($Force)          { $params['Force']          = $true }
if ($BackupExisting) { $params['BackupExisting'] = $true }
& $setupScript @params

# ─── 2. Wire Obsidian vault -> ~/.claude/ ────────────────────────────────────

Write-Host ""
Write-Step "Step 2: Wire 00_Claude vault -> ~/.claude/"

if (-not (Test-Path $vaultPath)) {
    Write-Warn "Vault not found at $vaultPath (OneDrive not synced?). Skipping."
    exit 0
}

$canSymlink = $false
try {
    $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
        [Security.Principal.WindowsBuiltInRole]::Administrator)
    $devMode = (Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" `
        -ErrorAction SilentlyContinue).AllowDevelopmentWithoutDevLicense -eq 1
    $canSymlink = $isAdmin -or $devMode
} catch {}

$vaultLinks = @(
    @{ Link = "$vaultPath\04-Commands\_claude-commands";  Target = "$claudeRoot\commands";  Label = "vault/commands" },
    @{ Link = "$vaultPath\03-Skills\_claude-skills";      Target = "$claudeRoot\skills";    Label = "vault/skills"   },
    @{ Link = "$vaultPath\02-Learnings\_claude-learning"; Target = "$claudeRoot\learning";  Label = "vault/learning" },
    @{ Link = "$vaultPath\05-Reference\_claude-reference";Target = "$claudeRoot\reference"; Label = "vault/reference"}
)

foreach ($l in $vaultLinks) {
    $lp = $l.Link; $tg = $l.Target; $lb = $l.Label

    if (-not (Test-Path $tg)) { Write-Warn "${lb}: target missing ($tg)"; continue }

    if (Test-Path $lp) {
        $existing = Get-Item $lp -Force
        $isLink   = $existing.Attributes -band [IO.FileAttributes]::ReparsePoint
        if ($Force) {
            if ($isLink) {
                try   { [System.IO.Directory]::Delete($lp) }
                catch { try { Remove-Item $lp -Force -Recurse } catch { Write-Warn "${lb}: remove failed"; continue } }
            } else {
                $isEmpty = (@(Get-ChildItem $lp -Force -ErrorAction SilentlyContinue)).Count -eq 0
                if ($isEmpty) {
                    Remove-Item $lp -Force -Recurse
                } elseif ($BackupExisting) {
                    $bk = "$lp.bak-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
                    Rename-Item $lp $bk
                    Write-Warn "${lb}: backed up to $bk"
                } else {
                    # With -Force alone, remove the directory and its contents
                    Remove-Item $lp -Force -Recurse -ErrorAction Stop
                }
            }
        } else {
            if ($isLink) { Write-Skip $lb } else { Write-Warn "${lb}: real dir (use -Force)" }
            continue
        }
    }

    if ($canSymlink) { New-Item -ItemType SymbolicLink -Path $lp -Target $tg -Force | Out-Null }
    else             { cmd /c mklink /J "$lp" "$tg" 2>&1 | Out-Null }

    if (Test-Path $lp) { Write-Ok $lb } else { Write-Fail "${lb}: creation failed" }
}

Write-Host ""
Write-Host "  Work computer wired. 00_Claude vault mirrors ~/.claude/ content." -ForegroundColor Cyan
Write-Host ""
