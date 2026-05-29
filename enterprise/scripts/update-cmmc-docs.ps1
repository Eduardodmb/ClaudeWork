# CMMC Documentation Update Script
# Extracts new monthly PDF and compares with previous version

param(
    [Parameter(Mandatory=$true)]
    [string]$PdfPath,

    [Parameter(Mandatory=$false)]
    [string]$VersionDate = (Get-Date -Format "yyyy.MM.dd")
)

$ErrorActionPreference = "Stop"

# Paths
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $ScriptDir))
$TempDir = Join-Path $RootDir ".temp"
$ExtractorScript = Join-Path $TempDir "organize_cmmc.py"
$ReferenceDir = Join-Path $RootDir ".claude\enterprise\reference"
$CurrentVersion = "cmmc2"
$NewVersion = "cmmc2-$VersionDate"

Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host "CMMC Documentation Updater" -ForegroundColor Cyan
Write-Host "=" * 80 -ForegroundColor Cyan

# Verify PDF exists
if (-not (Test-Path $PdfPath)) {
    Write-Host "[ERROR] PDF not found: $PdfPath" -ForegroundColor Red
    exit 1
}

Write-Host "`n[1/5] Checking prerequisites..." -ForegroundColor Yellow

# Check Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "  Python: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "  [ERROR] Python not found" -ForegroundColor Red
    exit 1
}

# Check pypdf
try {
    python -c "import pypdf" 2>&1 | Out-Null
    Write-Host "  pypdf: Installed" -ForegroundColor Green
} catch {
    Write-Host "  Installing pypdf..." -ForegroundColor Yellow
    python -m pip install pypdf | Out-Null
    Write-Host "  pypdf: Installed" -ForegroundColor Green
}

# Backup current version
Write-Host "`n[2/5] Backing up current version..." -ForegroundColor Yellow
$CurrentPath = Join-Path $ReferenceDir $CurrentVersion
$BackupPath = Join-Path $ReferenceDir "cmmc2-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

if (Test-Path $CurrentPath) {
    Copy-Item -Path $CurrentPath -Destination $BackupPath -Recurse
    Write-Host "  Backup created: $BackupPath" -ForegroundColor Green
} else {
    Write-Host "  No current version to backup" -ForegroundColor Gray
}

# Create extraction script if needed
Write-Host "`n[3/5] Preparing extraction script..." -ForegroundColor Yellow
if (-not (Test-Path $ExtractorScript)) {
    Write-Host "  [ERROR] Extractor script not found: $ExtractorScript" -ForegroundColor Red
    Write-Host "  Please run the initial extraction first" -ForegroundColor Yellow
    exit 1
}

# Modify script to output to new version directory
$TempScript = Join-Path $TempDir "update_cmmc_temp.py"
$scriptContent = Get-Content $ExtractorScript -Raw
$scriptContent = $scriptContent -replace 'output_base = Path\(r".*?"\)', "output_base = Path(r`"$ReferenceDir\$NewVersion`")"
$scriptContent = $scriptContent -replace 'version_date = ".*?"', "version_date = `"$VersionDate`""
Set-Content -Path $TempScript -Value $scriptContent

# Extract new version
Write-Host "`n[4/5] Extracting new version..." -ForegroundColor Yellow
Write-Host "  PDF: $PdfPath" -ForegroundColor Gray
Write-Host "  Output: $ReferenceDir\$NewVersion" -ForegroundColor Gray

# Update PDF path in temp script
$scriptContent = Get-Content $TempScript -Raw
$scriptContent = $scriptContent -replace 'pdf_path = r".*?"', "pdf_path = r`"$PdfPath`""
Set-Content -Path $TempScript -Value $scriptContent

python $TempScript

if ($LASTEXITCODE -eq 0) {
    Write-Host "  Extraction complete!" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Extraction failed" -ForegroundColor Red
    exit 1
}

# Compare versions
Write-Host "`n[5/5] Comparing versions..." -ForegroundColor Yellow

if (Test-Path $CurrentPath) {
    $changelogPath = Join-Path $ReferenceDir "$NewVersion\CHANGELOG.md"

    # Get file list comparison
    $oldFiles = Get-ChildItem -Path $CurrentPath -Filter "*.md" -File | Select-Object -ExpandProperty Name
    $newFiles = Get-ChildItem -Path (Join-Path $ReferenceDir $NewVersion) -Filter "*.md" -File | Select-Object -ExpandProperty Name

    $addedFiles = $newFiles | Where-Object { $_ -notin $oldFiles }
    $removedFiles = $oldFiles | Where-Object { $_ -notin $newFiles }
    $commonFiles = $oldFiles | Where-Object { $_ -in $newFiles }

    # Create changelog
    $changelog = @"
# CMMC Documentation Changes - $VersionDate

**Generated:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Summary

- **Previous Version:** $(Split-Path -Leaf $CurrentPath)
- **New Version:** $NewVersion
- **Files Added:** $($addedFiles.Count)
- **Files Removed:** $($removedFiles.Count)
- **Files Modified:** (See details below)

"@

    if ($addedFiles.Count -gt 0) {
        $changelog += "`n## New Files`n`n"
        foreach ($file in $addedFiles) {
            $changelog += "- ``$file```n"
        }
    }

    if ($removedFiles.Count -gt 0) {
        $changelog += "`n## Removed Files`n`n"
        foreach ($file in $removedFiles) {
            $changelog += "- ``$file```n"
        }
    }

    $changelog += "`n## File Comparison`n`n"
    $changelog += "Use git diff to see detailed changes:`n`n"
    $changelog += "``````bash`n"
    $changelog += "git diff --no-index $CurrentVersion/ $NewVersion/`n"
    $changelog += "```````n`n"

    # Save changelog
    Set-Content -Path $changelogPath -Value $changelog
    Write-Host "  Changelog created: $changelogPath" -ForegroundColor Green

    # Display summary
    Write-Host "`n  Changes detected:" -ForegroundColor Cyan
    Write-Host "    Files added: $($addedFiles.Count)" -ForegroundColor $(if ($addedFiles.Count -gt 0) { "Yellow" } else { "Gray" })
    Write-Host "    Files removed: $($removedFiles.Count)" -ForegroundColor $(if ($removedFiles.Count -gt 0) { "Yellow" } else { "Gray" })
    Write-Host "    Files to compare: $($commonFiles.Count)" -ForegroundColor Gray

} else {
    Write-Host "  No previous version to compare" -ForegroundColor Gray
}

# Cleanup
Remove-Item $TempScript -Force -ErrorAction SilentlyContinue

Write-Host "`n" + ("=" * 80) -ForegroundColor Cyan
Write-Host "Update Complete!" -ForegroundColor Green
Write-Host "=" * 80 -ForegroundColor Cyan

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Review the new version: $ReferenceDir\$NewVersion" -ForegroundColor White
Write-Host "2. Compare changes: git diff --no-index $CurrentVersion/ $NewVersion/" -ForegroundColor White
Write-Host "3. If satisfied, replace current version:" -ForegroundColor White
Write-Host "   - Rename $NewVersion to $CurrentVersion" -ForegroundColor White
Write-Host "4. Commit to git:" -ForegroundColor White
Write-Host "   cd `"$RootDir`"" -ForegroundColor Gray
Write-Host "   git add .claude/enterprise/reference/cmmc2" -ForegroundColor Gray
Write-Host "   git commit -m `"Update: CMMC docs $VersionDate`"" -ForegroundColor Gray
Write-Host "   git push" -ForegroundColor Gray
