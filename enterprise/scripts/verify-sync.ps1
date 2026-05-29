# Verify Claude Code Sync Setup
# Run this on each computer to verify symlinks and sync are working

param(
    [switch]$Detailed
)

Write-Host "`n=== Claude Code Sync Verification ===" -ForegroundColor Cyan
Write-Host "Computer: $env:COMPUTERNAME" -ForegroundColor Yellow
Write-Host "User: $env:USERNAME" -ForegroundColor Yellow
Write-Host "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm')`n" -ForegroundColor Yellow

$errors = @()
$warnings = @()
$success = @()

# 1. Check personal-claude-docs exists
Write-Host "[1/8] Checking personal-claude-docs repository..." -ForegroundColor Cyan
$claudeDocsPath = "$env:USERPROFILE\personal-claude-docs"
if (Test-Path $claudeDocsPath) {
    $success += "[OK] personal-claude-docs found at: $claudeDocsPath"

    # Check if it's a git repo
    if (Test-Path "$claudeDocsPath\.git") {
        $success += "[OK] personal-claude-docs is a git repository"
    } else {
        $errors += "[ERR] personal-claude-docs is not a git repository"
    }
} else {
    $errors += "[ERR] personal-claude-docs not found at: $claudeDocsPath"
}

# 2. Check ~/.claude exists
Write-Host "[2/8] Checking ~/.claude directory..." -ForegroundColor Cyan
$claudeHomePath = "$env:USERPROFILE\.claude"
if (Test-Path $claudeHomePath) {
    $success += "[OK] ~/.claude found at: $claudeHomePath"
} else {
    $errors += "[ERR] ~/.claude not found at: $claudeHomePath"
}

# 3. Check enterprise symlink
Write-Host "[3/8] Checking enterprise symlink..." -ForegroundColor Cyan
$enterpriseLink = "$claudeHomePath\enterprise"
$enterpriseTarget = "$claudeDocsPath\.claude\enterprise"

if (Test-Path $enterpriseLink) {
    $linkItem = Get-Item $enterpriseLink
    if ($linkItem.LinkType -eq "SymbolicLink" -or $linkItem.LinkType -eq "Junction") {
        $target = $linkItem.Target
        if ($target -eq $enterpriseTarget) {
            $success += "[OK] enterprise symlink correctly points to: $enterpriseTarget"
        } else {
            $warnings += "[WARN] enterprise symlink points to: $target (expected: $enterpriseTarget)"
        }
    } else {
        $errors += "[ERR] enterprise exists but is not a symlink/junction"
    }
} else {
    $errors += "[ERR] enterprise symlink not found at: $enterpriseLink"
}

# 4. Check personal symlink
Write-Host "[4/8] Checking personal symlink..." -ForegroundColor Cyan
$personalLink = "$claudeHomePath\personal"
$personalTarget = "$claudeDocsPath\.claude\users\emarquez-personal"

if (Test-Path $personalLink) {
    $linkItem = Get-Item $personalLink
    if ($linkItem.LinkType -eq "SymbolicLink" -or $linkItem.LinkType -eq "Junction") {
        $success += "[OK] personal symlink found"
    } else {
        $errors += "[ERR] personal exists but is not a symlink/junction"
    }
} else {
    $warnings += "[WARN] personal symlink not found (may not be set up yet)"
}

# 5. Check commands availability
Write-Host "[5/8] Checking commands..." -ForegroundColor Cyan
$commandsPath = "$claudeHomePath\enterprise\commands"
if (Test-Path $commandsPath) {
    $commandFiles = Get-ChildItem -Path $commandsPath -Filter "*.md" | Where-Object { $_.Name -ne "README.md" }
    $commandCount = $commandFiles.Count

    if ($commandCount -gt 0) {
        $success += "[OK] $commandCount commands found"

        if ($Detailed) {
            Write-Host "`n  Available commands:" -ForegroundColor Gray
            $commandFiles | ForEach-Object {
                Write-Host "    /$($_.BaseName)" -ForegroundColor DarkGray
            }
        }

        # Check for essential commands
        $essentialCommands = @("pulse", "start-work", "end-work", "checkpoint", "learn")
        $missing = @()
        foreach ($cmd in $essentialCommands) {
            if (-not (Test-Path "$commandsPath\$cmd.md")) {
                $missing += $cmd
            }
        }

        if ($missing.Count -eq 0) {
            $success += "[OK] All essential commands present"
        } else {
            $warnings += "[WARN] Missing essential commands: $($missing -join ', ')"
        }
    } else {
        $warnings += "[WARN] No command files found in commands directory"
    }
} else {
    $errors += "[ERR] Commands directory not found at: $commandsPath"
}

# 6. Check agents availability
Write-Host "[6/8] Checking agents..." -ForegroundColor Cyan
$agentsPath = "$claudeHomePath\enterprise\agents"
if (Test-Path $agentsPath) {
    $agentFiles = Get-ChildItem -Path $agentsPath -Filter "*.md" | Where-Object { $_.Name -ne "README.md" }
    $agentCount = $agentFiles.Count

    if ($agentCount -gt 0) {
        $success += "[OK] $agentCount agents found"

        if ($Detailed) {
            Write-Host "`n  Available agents:" -ForegroundColor Gray
            $agentFiles | ForEach-Object {
                Write-Host "    $($_.BaseName)" -ForegroundColor DarkGray
            }
        }
    } else {
        $warnings += "[WARN] No agent files found in agents directory"
    }
} else {
    $warnings += "[WARN] Agents directory not found (may not be set up yet)"
}

# 7. Check learning structure
Write-Host "[7/8] Checking learning structure..." -ForegroundColor Cyan
$learningPath = "$claudeHomePath\enterprise\learning"
if (Test-Path $learningPath) {
    $success += "[OK] Learning directory found"

    $learningDirs = @("ideas", "best-practices")
    foreach ($dir in $learningDirs) {
        if (Test-Path "$learningPath\$dir") {
            $success += "[OK] learning/$dir exists"
        } else {
            $warnings += "[WARN] learning/$dir not found"
        }
    }
} else {
    $warnings += "[WARN] Learning directory not found"
}

# 8. Check git status
Write-Host "[8/8] Checking git status..." -ForegroundColor Cyan
Push-Location $claudeDocsPath
try {
    $branch = git branch --show-current 2>$null
    if ($branch) {
        $success += "[OK] Git branch: $branch"
    }

    $status = git status --porcelain 2>$null
    if ($status) {
        $warnings += "[WARN] Uncommitted changes in personal-claude-docs"
        if ($Detailed) {
            Write-Host "`n  Uncommitted files:" -ForegroundColor Gray
            $status | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
        }
    } else {
        $success += "[OK] No uncommitted changes"
    }

    $unpushed = git log origin/$branch..$branch --oneline 2>$null
    if ($unpushed) {
        $warnings += "[WARN] Unpushed commits in personal-claude-docs"
        if ($Detailed) {
            Write-Host "`n  Unpushed commits:" -ForegroundColor Gray
            $unpushed | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
        }
    } else {
        $success += "[OK] No unpushed commits"
    }
} catch {
    $warnings += "[WARN] Could not check git status"
} finally {
    Pop-Location
}

# Results Summary
Write-Host "`n=== Results ===" -ForegroundColor Cyan

if ($success.Count -gt 0) {
    Write-Host "`nSUCCESS ($($success.Count)):" -ForegroundColor Green
    $success | ForEach-Object { Write-Host "  $_" -ForegroundColor Green }
}

if ($warnings.Count -gt 0) {
    Write-Host "`nWARNINGS ($($warnings.Count)):" -ForegroundColor Yellow
    $warnings | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
}

if ($errors.Count -gt 0) {
    Write-Host "`nERRORS ($($errors.Count)):" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
}

# Overall status
Write-Host ""
if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "[OK] ALL CHECKS PASSED" -ForegroundColor Green
    exit 0
} elseif ($errors.Count -eq 0) {
    Write-Host "[WARN] PASSED WITH WARNINGS" -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "[ERR] VERIFICATION FAILED" -ForegroundColor Red
    exit 1
}
