# CMMC2 Documentation - Usage Guide

## Overview

This directory contains the extracted and organized "Securing Microsoft 365 in GCC High" CMMC Level 2 documentation from ACG. The 810-page PDF has been converted into structured markdown files for easier navigation, searching, and version tracking.

## Directory Structure

```
cmmc2/
├── README.md                           ← Main index
├── USAGE-GUIDE.md                      ← This file
├── 01-introduction.md                  ← Section 1 (3 pages)
├── 02-scoping.md                       ← Section 2 (45 pages)
├── 03-identity-architecture.md         ← Section 3 (271 pages)
├── 05-device-operations.md             ← Section 5 (147 pages)
├── 06-data-protection-architecture.md  ← Section 6 (125 pages)
├── 07-microsoft-365-security.md        ← Section 7 (65 pages)
└── 08-appendices.md                    ← Section 8 (132 pages)
```

**Note:** Section 4 is missing from the source document.

## How to Use

### In Obsidian (Recommended)

Since this is synced to your Obsidian vault via symlinks:

1. Navigate to `_claude-reference/cmmc2/` in your vault
2. Open `README.md` for the overview
3. Click section links to navigate
4. Use Obsidian's search (`Ctrl+Shift+F`) to find specific topics

### In VS Code

1. Open this directory in VS Code
2. Install "Markdown All in One" extension for better navigation
3. Use `Ctrl+P` to quick-open files
4. Use search across files for content discovery

### From Command Line

```bash
# Full text search
grep -r "phishing resistant" .

# View specific section
cat 03-identity-architecture.md | less

# Count occurrences
grep -c "conditional access" *.md
```

### In Claude Code Sessions

Reference specific sections in your prompts:

```
@.claude/enterprise/reference/cmmc2/README.md
@.claude/enterprise/reference/cmmc2/03-identity-architecture.md
```

## Key Topics by Section

### 1. Introduction (01-introduction.md)
- Document scope and purpose
- How to use the guide
- Relationship to System Security Plan (SSP)

### 2. Scoping (02-scoping.md)
- CUI (Controlled Unclassified Information) data flows
- Asset inventory requirements
- External Service Provider (ESP) management
- Contract intake and DFARS 252.204-7012

### 3. Identity Architecture (03-identity-architecture.md)
**Largest section - 271 pages**
- GCC High vs Commercial cloud
- Phishing-resistant authentication
  - Windows Hello for Business
  - Microsoft Authenticator Passkeys
  - FIDO2 NFC keys
  - PIV cards with Certificate-Based Authentication
- Conditional Access Policies
- Privileged Identity Management (PIM)
- Cross-tenant collaboration

### 5. Device Operations (05-device-operations.md)
- Modern endpoint management
- Intune configuration
- Mobile Device Management (MDM)
- Azure Virtual Desktop (AVD)
- RBAC and governance

### 6. Data Protection Architecture (06-data-protection-architecture.md)
- Compliance Manager
- Sensitivity labels
- Data Loss Prevention (DLP)
- Information Rights Management (IRM)
- Data governance

### 7. Microsoft 365 Security (07-microsoft-365-security.md)
- Security baselines
- Threat protection
- Security monitoring
- Incident response

### 8. Appendices (08-appendices.md)
- Compliance control mappings
- Intune baseline configurations
- AVD deployment runbooks
- Firewall requirements
- Licensing matrix

## Monthly Update Process

When ACG releases a new version (typically monthly):

### 1. Extract New Version

```powershell
cd $env:USERPROFILE\personal-claude-docs
.\.claude\enterprise\scripts\update-cmmc-docs.ps1 -PdfPath "C:\path\to\new\pdf.pdf" -VersionDate "2026.05.30"
```

The script will:
- Backup the current version
- Extract the new PDF
- Create a new directory (e.g., `cmmc2-2026.05.30`)
- Generate a `CHANGELOG.md` with detected changes

### 2. Review Changes

```powershell
# Compare full directories
git diff --no-index cmmc2/ cmmc2-2026.05.30/

# Compare specific sections
git diff --no-index cmmc2/03-identity-architecture.md cmmc2-2026.05.30/03-identity-architecture.md

# View changelog
cat cmmc2-2026.05.30\CHANGELOG.md
```

### 3. Update Current Version

If the new version is good:

```powershell
# Remove old version
Remove-Item -Path .\.claude\enterprise\reference\cmmc2 -Recurse -Force

# Rename new version to current
Rename-Item -Path .\.claude\enterprise\reference\cmmc2-2026.05.30 -NewName cmmc2
```

### 4. Commit to Git

```powershell
cd $env:USERPROFILE\personal-claude-docs
git add .claude/enterprise/reference/cmmc2
git commit -m "Update: CMMC docs version 2026.05.30"
git push
```

## Version History

Track version updates here:

| Version Date | Extracted | Major Changes | Committed |
|--------------|-----------|---------------|-----------|
| 2026.04.30   | 2026-05-26 | Initial extraction | - |

## Finding Specific Information

### Common Queries

| Topic | Section | Page Range |
|-------|---------|------------|
| GCC High licensing | 3. Identity Architecture | 71-341 |
| Phishing-resistant auth | 3.2.2 | See 03-identity-architecture.md |
| Conditional Access policies | 3.3 | See 03-identity-architecture.md |
| Intune configuration | 5. Device Operations | 342-488 |
| Sensitivity labels | 6.7 | See 06-data-protection-architecture.md |
| DLP policies | 6.8 | See 06-data-protection-architecture.md |
| Compliance controls | 8.1 Appendix A | See 08-appendices.md |

### Search Tips

```bash
# Find all mentions of a control (e.g., IA.L2-3.5.3)
grep -r "IA.L2-3.5.3" .

# Find configuration steps
grep -r "Configure\|Setting\|Enable" . | grep -i "authenticator"

# Find decision points
grep -r "vs\|versus\|compare\|decision" . | less
```

## Integration with Safari Circuits

For work-related usage, reference this in project planning:

```markdown
## Compliance Requirements

See CMMC2 reference:
- Identity: @.claude/enterprise/reference/cmmc2/03-identity-architecture.md
- Devices: @.claude/enterprise/reference/cmmc2/05-device-operations.md
```

## Notes

- **This is for reference only** - Always verify against current official CMMC requirements
- **Version date is in footer** - Each page shows "Securing Microsoft 365 in GCC High | YYYY.MM.DD"
- **Git is source of truth** - All versions tracked, easy to revert or compare
- **Syncs across machines** - Changes committed here appear on all computers via git pull

## Questions?

For issues with extraction or updates, the scripts are located at:
- Extractor: `.temp/organize_cmmc.py`
- Updater: `.claude/enterprise/scripts/update-cmmc-docs.ps1`
