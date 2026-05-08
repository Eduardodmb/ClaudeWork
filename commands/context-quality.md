# Context Quality

Comprehensive quality audit for context assets. Ensures context remains accurate, actionable, and efficient.

## Purpose

**Context Quality Management** ensures:
- Context remains fresh and accurate
- No conflicting or redundant context
- Optimal token efficiency
- Actionability and usefulness

## When to Use

| Say | Action |
|-----|--------|
| "context quality", "audit context" | Full quality report |
| "check context health" | Quick health check |
| "stale context", "outdated context" | Find stale assets |
| "context conflicts" | Detect conflicts |

---

## Quality Dimensions

| Dimension | What It Measures | Target |
|-----------|------------------|--------|
| **Freshness** | Days since last update | < 30 days |
| **Completeness** | Required fields present | 100% |
| **Accuracy** | Validated against reality | > 95% |
| **Actionability** | Can be acted upon | Yes |
| **Efficiency** | Tokens per value delivered | Optimal |
| **Consistency** | No conflicts | Zero conflicts |
| **Coverage** | Domains/topics addressed | Complete for scope |

---

## Instructions

### 1. Run Full Quality Audit

Comprehensive analysis of all context:

```
QUALITY_AUDIT():
  1. Load all context assets from registry
  2. For each asset, calculate quality score:

  Quality Score Components:
  ─────────────────────────

  FRESHNESS (25 points)
  - Updated < 7 days: 25
  - Updated 7-14 days: 20
  - Updated 14-30 days: 15
  - Updated 30-60 days: 10
  - Updated > 60 days: 5
  - Never updated: 0

  COMPLETENESS (25 points)
  - All required fields: 25
  - Missing 1 field: 20
  - Missing 2 fields: 15
  - Missing 3+ fields: 5

  CONSISTENCY (25 points)
  - No conflicts: 25
  - Minor conflicts: 15
  - Major conflicts: 5
  - Critical conflicts: 0

  EFFICIENCY (25 points)
  - Tokens < 500: 25
  - Tokens 500-1000: 20
  - Tokens 1000-2000: 15
  - Tokens 2000-5000: 10
  - Tokens > 5000: 5

  3. Aggregate scores
  4. Generate report
```

### 2. Detect Stale Context

Find outdated context needing refresh:

```
STALE_CHECK():
  1. Scan registry for assets where:
     - lastUpdated > 30 days
     - AND no recent usage
     - AND not marked "stable"

  2. Categorize staleness:
     - Warning (30-60 days): Review recommended
     - Critical (60-90 days): Update required
     - Archive (> 90 days): Consider removal

  3. Generate staleness report
```

### 3. Detect Conflicts

Find contradictory context:

```
CONFLICT_DETECTION():
  1. Extract rules/assertions from all context
  2. Compare for conflicts:

  Conflict Types:
  - OVERRIDE: Project rule overrides global (usually OK)
  - CONTRADICTION: Two rules conflict (ERROR)
  - REDUNDANCY: Same rule in multiple places (WARNING)
  - AMBIGUITY: Rule interpretation unclear (WARNING)

  3. For each conflict:
     - Identify conflicting assets
     - Classify severity
     - Suggest resolution
```

### 4. Token Efficiency Analysis

Optimize context window usage:

```
TOKEN_ANALYSIS():
  1. Estimate tokens for each asset
  2. Calculate value score (usage * helpfulness)
  3. Compute efficiency = value / tokens

  Flag inefficient context:
  - High tokens, low usage → Summarize or archive
  - Low tokens, high usage → Elevate priority
  - Redundant content → Consolidate

  Provide recommendations:
  - Summarize: {asset_list}
  - Archive: {asset_list}
  - Consolidate: {asset_pairs}
```

### 5. Coverage Analysis

Identify gaps in context:

```
COVERAGE_ANALYSIS():
  1. Define expected domains:
     - Workflow & Standards
     - Infrastructure
     - Integrations (MCPs)
     - Domain Knowledge
     - Learning & Best Practices

  2. Map assets to domains
  3. Identify gaps:
     - Missing: Domain with no context
     - Sparse: Domain with < 3 assets
     - Stale: Domain not updated > 60 days

  4. Recommend additions
```

---

## Quality Gates

Required quality for different contexts:

| Context Level | Min Quality | Max Staleness | Required Fields |
|--------------|-------------|---------------|-----------------|
| **Enterprise Policy** | 90% | 14 days | All |
| **Team Standard** | 85% | 30 days | All |
| **Skill** | 80% | 60 days | Core |
| **Learning** | 70% | 90 days | Minimal |
| **Experimental** | 50% | No limit | Title only |

---

## Automated Quality Actions

The system can auto-remediate some issues:

| Issue | Auto-Action | Requires Approval |
|-------|-------------|-------------------|
| Missing timestamp | Add current timestamp | No |
| Missing tags | Infer from content | Yes |
| Duplicate detected | Suggest merge | Yes |
| Token bloat | Propose summary | Yes |
| Archive candidate | Move to archive | Yes |
| Conflict detected | Flag for resolution | No (alert only) |

---

## Output Format

### Full Audit Report

```
## Context Quality Audit

**Audit Date:** {timestamp}
**Assets Scanned:** {count}
**Overall Health:** [Green|Yellow|Red] ({score}%)

### Quality Summary

| Metric | Score | Status |
|--------|-------|--------|
| Freshness | {x}% | {status} |
| Completeness | {x}% | {status} |
| Consistency | {x}% | {status} |
| Efficiency | {x}% | {status} |

### Issues Found

**Critical ({count}):**
- ❌ {asset}: {issue}

**Warnings ({count}):**
- ⚠️ {asset}: {issue}

**Info ({count}):**
- ℹ️ {asset}: {suggestion}

### Stale Assets

| Asset | Last Updated | Recommendation |
|-------|--------------|----------------|
| {name} | {days}d ago | {action} |

### Conflicts Detected

| Asset A | Asset B | Type | Resolution |
|---------|---------|------|------------|
| {a} | {b} | {type} | {suggestion} |

### Token Budget

**Total Context Tokens:** ~{tokens}
**Efficiency Score:** {score}%

| Top Token Consumers | Tokens | Usage | Efficiency |
|---------------------|--------|-------|------------|
| {asset} | ~{n} | {usage} | {eff} |

### Recommendations

1. **Immediate:** {action}
2. **This Week:** {action}
3. **This Month:** {action}

---
Run `/context-quality --fix` to auto-remediate safe issues.
```

### Quick Health Check

```
## Context Health: [Green|Yellow|Red]

**Score:** {score}%
**Issues:** {critical} critical, {warnings} warnings
**Stale:** {count} assets need refresh

Top Issue: {description}
Action: {recommended_action}
```

---

## Scheduled Quality Checks

| Frequency | Check Type | Auto-Run |
|-----------|------------|----------|
| Every session start | Quick health | Yes |
| Weekly | Full audit | Suggested |
| Monthly | Coverage analysis | Suggested |
| On context add | Conflict check | Yes |

---

## Related

- `/context` - Context dashboard
- `/context-add` - Add new context
- `/context-lineage` - View dependencies
- OpenMetadata quality - Parallel data governance concept
