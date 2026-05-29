---
title: Governance Metrics Dashboard
type: metrics-specification
domain: ai-operations
status: active
version: 1.0
created: 2026-01-20
author: Safari Circuits IT
tags: [metrics, dashboard, governance, quality, monitoring]
related:
  - ./implementation-plan.md
  - ./lifecycle-automation.md
  - ../../domains/information-technology/architecture/context-governance-architecture.md
---

# Governance Metrics Dashboard

## Overview

This document specifies the metrics, KPIs, and dashboard design for monitoring context governance health. The dashboard provides visibility into context freshness, completeness, lineage coverage, quality trends, and discovery usage.

---

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CONTEXT GOVERNANCE DASHBOARD                                     [Refresh] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │   FRESHNESS     │  │  COMPLETENESS   │  │    LINEAGE      │             │
│  │      87%        │  │      94%        │  │      72%        │             │
│  │   ▲ +5% WoW     │  │   ▲ +2% WoW     │  │   ▲ +8% WoW     │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  QUALITY TREND (30 Days)                                            │   │
│  │  ███████████████████████████████████████████████████████████████    │   │
│  │  Fresh ────  Stale - - -  Critical . . .                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │  ASSETS BY TYPE                 │  │  STALE ASSETS (Action Needed)   │  │
│  │  Skills       ████████████  25  │  │  1. learning/ideas/backlog.md   │  │
│  │  Commands     ██████████    20  │  │     Stale 15 days | Owner: IT   │  │
│  │  Learnings    ████████      15  │  │  2. skills/deprecated/old-skill │  │
│  │  Policies     ███            5  │  │     Stale 45 days | Owner: IT   │  │
│  └─────────────────────────────────┘  └─────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DISCOVERY USAGE (7 Days)                                           │   │
│  │  Searches: 142    Top Query: "typescript standards"                 │   │
│  │  Click-through: 68%   Avg. Time to Find: 8.2s                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Metrics

### 1. Context Freshness Score

Measures how current context assets are.

| Dimension | Definition | Target |
|-----------|------------|--------|
| Fresh | Updated within decay threshold | > 80% |
| Warm | 1-2x decay threshold | < 15% |
| Stale | > 2x decay threshold | < 5% |

**Calculation:**

```
Freshness Score = (Fresh Assets / Total Assets) * 100

Per-asset freshness:
  fresh_score = max(0, 100 - (days_since_update * decay_rate))

Decay rates:
  state: 10/day (stale at 10 days)
  learning: 5/day (stale at 20 days)
  skill: 2/day (stale at 50 days)
  policy: 1/day (stale at 100 days)
```

**Data Source:** `context-registry.json` -> `assets[].updated`

**Visualization:**
- Gauge chart (0-100%)
- Trend line (30 days)
- Heat map by asset type

---

### 2. Completeness Metrics

Measures metadata completeness across all assets.

| Field | Weight | Required For |
|-------|--------|--------------|
| `title` | 15% | All assets |
| `description` | 20% | All assets |
| `domain` | 15% | All assets |
| `tags` (min 2) | 15% | All assets |
| `owner` | 15% | All assets |
| `quality.freshness` | 10% | Skills, Commands |
| `lineage` | 10% | Skills, Commands |

**Calculation:**

```
Asset Completeness = Sum(field_present * weight) / Sum(weights)
Overall Completeness = Avg(Asset Completeness)
```

**Data Source:** `context-registry.json` -> `assets[]`

**Visualization:**
- Donut chart (completeness %)
- Table of incomplete assets
- Field-level breakdown

---

### 3. Lineage Coverage

Measures how well context relationships are documented.

| Metric | Definition | Target |
|--------|------------|--------|
| Linked Assets | Assets with any lineage | > 80% |
| Upstream Coverage | Assets with upstream refs | > 70% |
| Downstream Coverage | Assets with downstream refs | > 60% |
| Orphan Assets | No links at all | < 10% |

**Calculation:**

```
Lineage Coverage = (Assets with lineage / Total Assets) * 100

Upstream Coverage = (Assets with upstream / Linkable Assets) * 100
Downstream Coverage = (Assets with downstream / Linkable Assets) * 100
```

**Data Source:** `context-registry.json` -> `assets[].lineage`

**Visualization:**
- Network graph (mini)
- Coverage percentages
- Orphan asset list

---

### 4. Quality Trends

Time-series analysis of quality metrics over 30/60/90 days.

| Trend | Positive Indicator | Negative Indicator |
|-------|-------------------|-------------------|
| Freshness | Increasing % fresh | Increasing % stale |
| Completeness | Approaching 100% | Declining % |
| Lineage | More connections | Orphan growth |
| Discovery | Higher usage | Declining searches |

**Calculation:**

```
Week-over-Week Change = ((Current - Previous) / Previous) * 100
Trend Direction = Sign of 7-day moving average slope
```

**Data Source:** Historical snapshots (daily)

**Visualization:**
- Multi-line trend chart
- WoW change indicators
- Anomaly highlighting

---

### 5. Discovery Usage Stats

Measures how users find and use context.

| Metric | Definition | Target |
|--------|------------|--------|
| Search Volume | Queries per period | Increasing |
| Click-through Rate | Clicks / Searches | > 60% |
| Time to Find | Avg search to click | < 10s |
| Zero Results | Searches with no results | < 5% |
| Top Queries | Most common searches | N/A |

**Calculation:**

```
CTR = (Search Result Clicks / Total Searches) * 100
Time to Find = Avg(click_timestamp - search_timestamp)
Zero Results Rate = (Zero Result Searches / Total Searches) * 100
```

**Data Source:** Search logs, click events

**Visualization:**
- Search volume over time
- CTR trend
- Top queries table
- Zero-result queries list

---

## Dashboard Components

### KPI Cards (Top Row)

| Card | Metric | Color Logic |
|------|--------|-------------|
| Freshness | Overall freshness % | Green > 80, Yellow > 60, Red < 60 |
| Completeness | Overall completeness % | Green > 90, Yellow > 70, Red < 70 |
| Lineage | Lineage coverage % | Green > 80, Yellow > 60, Red < 60 |
| Quality | Composite score | Green > 85, Yellow > 70, Red < 70 |

### Quality Trend Chart

- **Type:** Multi-line area chart
- **Period:** 30 days (configurable)
- **Lines:** Fresh, Stale, Critical
- **Annotations:** Deployments, major changes

### Assets by Type

- **Type:** Horizontal bar chart
- **Categories:** Skills, Commands, Learnings, Policies
- **Color:** By freshness status
- **Interaction:** Click to filter

### Stale Assets Table

| Column | Description |
|--------|-------------|
| Asset | Link to asset |
| Type | skill, command, etc. |
| Days Stale | Days past threshold |
| Owner | Responsible team |
| Action | Update/Archive button |

### Discovery Panel

- **Search volume:** Sparkline
- **Top queries:** Word cloud or table
- **CTR:** Gauge
- **Time to find:** Avg with trend

---

## Alert Thresholds

### Critical Alerts (Page On-Call)

| Condition | Threshold | Action |
|-----------|-----------|--------|
| Freshness drops | < 50% | Immediate review |
| Critical assets stale | Any policy stale > 14d | Update or archive |
| Quality score crash | > 20% drop in 24h | Investigate cause |

### Warning Alerts (Team Notification)

| Condition | Threshold | Action |
|-----------|-----------|--------|
| Freshness declining | < 70% | Review stale list |
| Orphan assets growing | > 15% | Update lineage |
| Zero-result rate high | > 10% | Improve tagging |

### Info Alerts (Dashboard Only)

| Condition | Threshold | Display |
|-----------|-----------|---------|
| New assets added | Any | Highlight new |
| Completeness improved | > 5% WoW | Celebrate |
| High search volume | > 2x avg | Show trending |

---

## Data Pipeline

### Collection Schedule

| Source | Frequency | Method |
|--------|-----------|--------|
| Registry scan | Every 15 min | File read |
| Quality calculation | Hourly | Compute |
| Lineage update | Daily | Graph rebuild |
| Search logs | Real-time | Event stream |
| Trend snapshot | Daily at 00:00 | Aggregate |

### Storage

| Data | Storage | Retention |
|------|---------|-----------|
| Current metrics | In-memory | N/A |
| Daily snapshots | JSON file | 90 days |
| Search logs | Log file | 30 days |
| Alert history | JSON file | 180 days |

### Pipeline Architecture

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Registry    │───►│  Collector   │───►│  Calculator  │
│  (source)    │    │  (15 min)    │    │  (hourly)    │
└──────────────┘    └──────────────┘    └──────┬───────┘
                                               │
┌──────────────┐    ┌──────────────┐           │
│  Dashboard   │◄───│  Aggregator  │◄──────────┘
│  (display)   │    │  (on-demand) │
└──────────────┘    └──────────────┘
```

---

## Implementation

### Phase 1: Core Metrics (Week 1)

- [ ] Freshness calculation
- [ ] Completeness calculation
- [ ] KPI card display
- [ ] Basic CLI output

### Phase 2: Trends (Week 2)

- [ ] Historical data storage
- [ ] Trend calculations
- [ ] Trend visualization
- [ ] WoW comparisons

### Phase 3: Discovery (Week 3)

- [ ] Search logging
- [ ] Usage metrics
- [ ] Discovery panel
- [ ] Zero-result tracking

### Phase 4: Alerts (Week 4)

- [ ] Alert threshold config
- [ ] Notification integration
- [ ] Alert history
- [ ] Dashboard integration

---

## CLI Access

### Quick Status Command

```bash
/context status

Context Governance Status
========================
Freshness:    87% (▲ +5% WoW)
Completeness: 94% (▲ +2% WoW)
Lineage:      72% (▲ +8% WoW)

Stale Assets: 3 (action needed)
  - learning/ideas/backlog.md (15 days)
  - skills/deprecated/old-skill (45 days)
  - commands/legacy-cmd.md (22 days)
```

### Detailed Audit Command

```bash
/context audit --full

Context Governance Audit Report
===============================
Generated: 2026-01-20T12:00:00Z

FRESHNESS ANALYSIS
------------------
Total Assets: 65
Fresh (< threshold): 57 (87%)
Warm (1-2x threshold): 5 (8%)
Stale (> 2x threshold): 3 (5%)

COMPLETENESS ANALYSIS
---------------------
Fully complete: 61 (94%)
Missing fields:
  - asset-1: missing description
  - asset-2: missing tags
  - asset-3: missing owner, tags

LINEAGE ANALYSIS
----------------
With lineage: 47 (72%)
Orphans: 18 (28%)

Top orphans:
  - learning/idea-1.md
  - commands/standalone-cmd.md
```

---

## Integration Points

### OpenMetadata Dashboard

When OpenMetadata is deployed, these metrics feed into the unified catalog:

| Safari Metric | OpenMetadata Feature |
|---------------|---------------------|
| Freshness | Data Freshness widget |
| Completeness | Data Quality scores |
| Lineage | Lineage explorer |
| Discovery | Search analytics |

### DevOps Integration

| Metric | DevOps Action |
|--------|---------------|
| Stale policy | Create work item |
| Quality drop | Alert in Teams |
| New orphans | Flag for review |

---

## Success Criteria

| Metric | Current | 30-Day Target | 90-Day Target |
|--------|---------|---------------|---------------|
| Freshness | TBD | > 80% | > 90% |
| Completeness | TBD | > 90% | > 95% |
| Lineage | TBD | > 70% | > 85% |
| Discovery CTR | TBD | > 50% | > 70% |

---

## Related Documents

- [Context Governance Implementation Plan](./implementation-plan.md)
- [Context Lifecycle Automation](./lifecycle-automation.md)
- [Context Governance Architecture](../../domains/information-technology/architecture/context-governance-architecture.md)

---

*Document Location:* `organizational-docs/shared/context-governance/metrics-dashboard.md`
