# Validate Work

Comprehensive validation aligned with Boris workflow principles.

## Instructions

When the user runs `/validate-work`, perform validation in two tiers:

---

## Tier 1: Boris Verification Loop (Always Run)

These are Boris's core verification steps - run on every validate:

### 1. Code Verification
```bash
# Tests
npm test  # or project-appropriate test command

# Type check
npm run typecheck  # or tsc --noEmit

# Lint
npm run lint  # or eslint .
```

**Output:**
```
Code Verification (Boris Phase 3)
├── Tests:     ✓ 24/24 passed
├── Typecheck: ✓ No errors
└── Lint:      ✓ No warnings
```

### 2. Changes Review
```bash
git diff --stat
git status
```

Check that:
- All changes are intentional
- No debug code or temporary files
- Changes are minimal and focused (Boris: simplicity)

**Output:**
```
Changes Review
├── Modified: 3 files (+45, -12 lines)
├── Staged: All changes staged
└── Focus: ✓ Changes are minimal and related
```

### 3. Anti-Pattern Check

Scan for Boris anti-patterns:
- [ ] Starting to code without reading existing code
- [ ] Making changes "while you're in there"
- [ ] Skipping verification steps
- [ ] Large PRs with multiple unrelated changes
- [ ] Speculating about code behavior

**Output:**
```
Anti-Pattern Check
├── Read before write: ✓ Relevant files were read
├── Scope creep: ✓ No unrelated changes
├── Verification: ✓ Tests run this session
└── PR size: ✓ Focused changes
```

---

## Tier 2: Strategic Validation (Run with `/validate-work full`)

Extended validation across organizational domains:

### 4. Documentation Validation

**STD-001 Compliance:**
- Skills follow `SKILL-XXX-title.md` convention
- Work Instructions follow `WI-XXX-title.md` convention
- YAML metadata blocks present

**Index Synchronization:**
- All skills listed in `index.yaml`
- Doc line counts current
- Cross-references valid

**Output:**
```
Documentation Validation
├── STD-001 Compliance: ✓ 22 files compliant
├── Index Sync: ✓ All entries current
└── Cross-References: ✓ All links valid
```

### 5. Skills Validation

Check skill completeness:
- Required metadata (ID, Version, Category, Status)
- Purpose and Trigger Phrases
- Steps and Output defined

**Output:**
```
Skills Validation
├── Completeness: ✓ 16 skills documented
├── Coverage: 5 categories covered
└── Status: 12 active, 4 draft
```

### 6. Project Management Validation

Check project health:
- Active projects have current PLAN.md
- Session logs are maintained
- Next steps are defined

**Output:**
```
Project Management Validation
├── Active Projects: 2 with current plans
├── Session Logs: 5 this month
└── Task Continuity: ✓ No orphaned tasks
```

### 7. Strategy Coherence

Check alignment with IT strategy:
- Work connects to strategic priorities
- Documentation supports decisions
- No strategic disconnects

Reference: `SKILL-015-it-strategy-prioritization.md`

**Output:**
```
Strategy Coherence
├── Priority Alignment: ✓ Work matches current priorities
├── Domain Coverage: 9/9 domains documented
└── Overall Score: 94% coherent
```

---

## Output Modes

### `/validate-work` (default)
Runs Tier 1 only - Boris verification loop:
- Code verification (test, typecheck, lint)
- Changes review
- Anti-pattern check

### `/validate-work full`
Runs Tier 1 + Tier 2:
- All Boris verification
- Documentation validation
- Skills validation
- Project management
- Strategy coherence

### `/validate-work quick`
Fast check only:
- Git status
- Uncommitted changes warning

---

## Summary Output

```
╔═══════════════════════════════════════════════════════════════╗
║                    VALIDATION REPORT                           ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  BORIS VERIFICATION (Tier 1)                                  ║
║  ├── Tests:          ✓ 24/24 passed                          ║
║  ├── Typecheck:      ✓ No errors                             ║
║  ├── Lint:           ✓ No warnings                           ║
║  ├── Changes:        ✓ 3 files, minimal scope                ║
║  └── Anti-Patterns:  ✓ None detected                         ║
║                                                               ║
║  STRATEGIC VALIDATION (Tier 2) - if full                     ║
║  ├── Documentation:  ✓ STD-001 compliant                     ║
║  ├── Skills:         ✓ 16 complete                           ║
║  ├── Projects:       ✓ Plans current                         ║
║  └── Strategy:       ✓ 94% coherent                          ║
║                                                               ║
║  OVERALL: ✓ VALID                                            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Key Boris Alignment

| Boris Principle | How Validate-Work Enforces It |
|-----------------|------------------------------|
| Verification loops | Tests, typecheck, lint as primary checks |
| Simplicity | Checks for scope creep and focused changes |
| Think first | Detects "code without reading" anti-pattern |
| Never speculate | Anti-pattern detection for speculation |
| Continuous improvement | Validates documentation is maintained |

---

## Integration with Session Workflow

```
/start-work
    │
    ▼
  DO WORK (with incremental verification)
    │
    ├──► /validate-work (during work, as needed)
    │
    ▼
/validate-work full (before ending)
    │
    ▼
/end-work
```

Run `/validate-work` during work to catch issues early.
Run `/validate-work full` before `/end-work` for comprehensive check.

---

## Related
- `/start-work` - Begin session
- `/end-work` - Close session (runs verification)
- `/status` - Quick context check
- `.claude/boris-workflow.md` - Workflow principles
