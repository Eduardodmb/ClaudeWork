# CMMC Documentation Monthly Update - Example Workflow

## Scenario

It's May 30, 2026. ACG has released the updated CMMC documentation. You need to extract it and compare it with the April version.

## Step-by-Step Walkthrough

### 1. Download the New PDF

```powershell
# Assuming you downloaded it to your CMMC folder
$newPdf = "C:\Users\emarquez\OneDrive\13 - ACG\CMMC\Securing Microsoft 365 in GCC High - 2026.05.pdf"

# Verify it exists
Test-Path $newPdf
# Should return: True
```

### 2. Run the Update Script

```powershell
cd $env:USERPROFILE\personal-claude-docs

# Run the updater
.\.claude\enterprise\scripts\update-cmmc-docs.ps1 `
    -PdfPath $newPdf `
    -VersionDate "2026.05.30"
```

**Expected Output:**
```
================================================================================
CMMC Documentation Updater
================================================================================

[1/5] Checking prerequisites...
  Python: Python 3.14.3
  pypdf: Installed

[2/5] Backing up current version...
  Backup created: C:\Users\emarquez\personal-claude-docs\.claude\enterprise\reference\cmmc2-backup-20260530-143022

[3/5] Preparing extraction script...

[4/5] Extracting new version...
  PDF: C:\Users\emarquez\OneDrive\13 - ACG\CMMC\Securing Microsoft 365 in GCC High - 2026.05.pdf
  Output: C:\Users\emarquez\personal-claude-docs\.claude\enterprise\reference\cmmc2-2026.05.30

[Processing sections...]
  Extraction complete!

[5/5] Comparing versions...
  Changelog created: C:\Users\emarquez\personal-claude-docs\.claude\enterprise\reference\cmmc2-2026.05.30\CHANGELOG.md

  Changes detected:
    Files added: 0
    Files removed: 0
    Files to compare: 8

================================================================================
Update Complete!
================================================================================
```

### 3. Review the Changelog

```powershell
# View the auto-generated changelog
cat .\.claude\enterprise\reference\cmmc2-2026.05.30\CHANGELOG.md
```

**Example Changelog:**
```markdown
# CMMC Documentation Changes - 2026.05.30

**Generated:** 2026-05-30 14:30:45

## Summary

- **Previous Version:** cmmc2
- **New Version:** cmmc2-2026.05.30
- **Files Added:** 0
- **Files Removed:** 0
- **Files Modified:** (See details below)

## File Comparison

Use git diff to see detailed changes:

```bash
git diff --no-index cmmc2/ cmmc2-2026.05.30/
```
```

### 4. Compare Specific Sections

Let's say you're particularly interested in Identity Architecture changes:

```powershell
# Compare the identity section
git diff --no-index `
    .\.claude\enterprise\reference\cmmc2\03-identity-architecture.md `
    .\.claude\enterprise\reference\cmmc2-2026.05.30\03-identity-architecture.md
```

**Example Output (showing changes):**
```diff
--- cmmc2/03-identity-architecture.md
+++ cmmc2-2026.05.30/03-identity-architecture.md
@@ -150,7 +150,10 @@

 ### 3.2.2 Phishing-Resistant Authentication

-Microsoft supports four primary paths for phishing resistance:
+Microsoft supports five primary paths for phishing resistance:
+
+> **NEW in May 2026:** Passkey-only authentication without fallback
+> is now available in GCC High tenants.

 1. Windows Hello for Business (WHfB)
 2. Microsoft Authenticator with Passkey
```

### 5. Review in Obsidian

Open your Obsidian vault and navigate to the new version:

```
_claude-reference/
├── cmmc2/                  ← Current version (April)
└── cmmc2-2026.05.30/       ← New version (May)
```

You can now read both side-by-side.

### 6. Search for Specific Changes

```powershell
# Find what changed about "Conditional Access"
git diff --no-index cmmc2/ cmmc2-2026.05.30/ | Select-String "Conditional Access" -Context 3
```

### 7. Decision Time

After review, you have two options:

#### Option A: Keep Both Versions (Recommended Initially)

```powershell
# Keep both for a week to ensure nothing is broken
# Just commit both to git
git add .\.claude\enterprise\reference\cmmc2-2026.05.30\
git commit -m "Add: CMMC docs version 2026.05.30 for review"
git push

# Update the version history table in USAGE-GUIDE.md
# (Manual edit to add the new row)
```

#### Option B: Replace Current Version

```powershell
# If you're confident the new version is good
cd .\.claude\enterprise\reference\

# Remove old version
Remove-Item -Path .\cmmc2 -Recurse -Force

# Rename new version to current
Rename-Item -Path .\cmmc2-2026.05.30 -NewName cmmc2

# Archive the backup (optional)
Move-Item -Path .\cmmc2-backup-* -Destination ..\..\archive\

# Commit
cd $env:USERPROFILE\personal-claude-docs
git add .\.claude\enterprise\reference\cmmc2\
git commit -m "Update: CMMC docs to version 2026.05.30

Major changes:
- Added passkey-only authentication option
- Updated conditional access policies
- New Azure Firewall requirements

See CHANGELOG.md for full details."
git push
```

### 8. Document Major Changes

For significant updates, capture learnings:

```powershell
# Add to your learning backlog
Add-Content .\.claude\enterprise\learning\ideas\backlog.md @"

[2026-05-30] CMMC Update 2026.05.30
- New phishing-resistant auth option: passkey-only mode
- GCC High now supports eliminating password fallback entirely
- Updated firewall rules for Teams background effects
- See: .claude/enterprise/reference/cmmc2/03-identity-architecture.md
"@

git add .\.claude\enterprise\learning\ideas\backlog.md
git commit -m "Learn: CMMC 2026.05.30 key changes"
git push
```

## Real-World Example: Finding What Changed About MFA

### Scenario
Your security team asks: "Did the CMMC guidance change regarding MFA requirements?"

### Process

```powershell
cd $env:USERPROFILE\personal-claude-docs\.claude\enterprise\reference

# Search both versions for MFA
git diff --no-index cmmc2/ cmmc2-2026.05.30/ | Select-String -Pattern "MFA|multi-factor|multifactor" -Context 2

# More targeted: just conditional access policies
git diff --no-index `
    cmmc2/03-identity-architecture.md `
    cmmc2-2026.05.30/03-identity-architecture.md `
    | Select-String -Pattern "A001|P001|MFA" -Context 5
```

This shows you exactly what changed in the MFA policy sections.

## Automation (Future Enhancement)

You could schedule this to run automatically:

```powershell
# Create a scheduled task (requires admin)
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 9am
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" `
    -Argument "-File C:\Users\emarquez\personal-claude-docs\.claude\enterprise\scripts\update-cmmc-docs.ps1 -PdfPath 'C:\Users\emarquez\OneDrive\13 - ACG\CMMC\Latest.pdf'"

Register-ScheduledTask -TaskName "CMMC-Monthly-Update" -Trigger $trigger -Action $action
```

**Note:** You'd still need to manually download the PDF and review changes.

## Tips for Efficient Comparison

### 1. Use VS Code's Diff Tool

```powershell
# Open both versions in VS Code diff view
code --diff `
    .\.claude\enterprise\reference\cmmc2\03-identity-architecture.md `
    .\.claude\enterprise\reference\cmmc2-2026.05.30\03-identity-architecture.md
```

### 2. Create a Comparison Summary

```powershell
# Generate a quick stats summary
$old = Get-ChildItem .\.claude\enterprise\reference\cmmc2\*.md
$new = Get-ChildItem .\.claude\enterprise\reference\cmmc2-2026.05.30\*.md

foreach ($oldFile in $old) {
    $newFile = $new | Where-Object { $_.Name -eq $oldFile.Name }
    if ($newFile) {
        $oldSize = $oldFile.Length
        $newSize = $newFile.Length
        $diff = $newSize - $oldSize
        $pctChange = [math]::Round(($diff / $oldSize) * 100, 1)

        Write-Host "$($oldFile.Name): ${pctChange}% size change ($diff bytes)"
    }
}
```

**Example Output:**
```
01-introduction.md: 0.5% size change (42 bytes)
02-scoping.md: -1.2% size change (-512 bytes)
03-identity-architecture.md: 8.3% size change (15234 bytes)
05-device-operations.md: 0.0% size change (0 bytes)
06-data-protection-architecture.md: 2.1% size change (3421 bytes)
07-microsoft-365-security.md: 0.3% size change (89 bytes)
08-appendices.md: 15.7% size change (21033 bytes)
```

Large % changes indicate significant updates in those sections.

## Troubleshooting

### Script Fails with "PDF not found"

```powershell
# Check the path
Test-Path "C:\Users\emarquez\OneDrive\13 - ACG\CMMC\Securing Microsoft 365 in GCC High - 2026.05.pdf"

# List PDF files in that directory
Get-ChildItem "C:\Users\emarquez\OneDrive\13 - ACG\CMMC\*.pdf" | Select-Object Name
```

### Extraction Creates Empty Files

```powershell
# Check if pypdf is working
python -c "from pypdf import PdfReader; print('OK')"

# Re-install if needed
python -m pip install --upgrade pypdf
```

### Git Diff Shows Everything as Changed

This might happen if line endings changed. Ignore whitespace:

```powershell
git diff --no-index --ignore-all-space cmmc2/ cmmc2-2026.05.30/
```

## Next Steps After Update

1. **Sync to other computers:**
   ```bash
   git pull  # On home or laptop
   ```

2. **Update Safari Circuits documentation** (if applicable):
   - Reference new sections in your security policies
   - Update implementation guides

3. **Notify your team:**
   - Share changelog with relevant stakeholders
   - Highlight impactful changes

4. **Schedule review:**
   - Put reminder in calendar for next month's update
   - Typically releases last Friday of each month
