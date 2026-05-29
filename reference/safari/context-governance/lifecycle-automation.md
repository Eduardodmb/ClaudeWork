---
title: Context Lifecycle Automation
type: automation-specification
domain: ai-operations
status: active
version: 1.0
created: 2026-01-20
author: Safari Circuits IT
tags: [automation, lifecycle, context, governance, workflow]
related:
  - ./implementation-plan.md
  - ./metrics-dashboard.md
  - ../../domains/information-technology/architecture/context-governance-architecture.md
---

# Context Lifecycle Automation

## Overview

This document specifies the automation rules for managing context asset lifecycles. Automation covers staleness detection, promotion workflows, quality gate enforcement, and notification/alerting.

**Goal:** Zero manual intervention for routine governance operations while maintaining full audit trail.

---

## Lifecycle Stages

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         CONTEXT LIFECYCLE                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CAPTURE        STRUCTURE       VALIDATE        PROMOTE        ENFORCE      │
│     │               │               │               │               │        │
│     ▼               ▼               ▼               ▼               ▼        │
│  ┌─────┐       ┌─────────┐     ┌────────┐     ┌──────────┐    ┌────────┐   │
│  │Idea │ ───► │Learning │ ──► │ Skill  │ ──► │ Standard │ ─► │ Policy │   │
│  └─────┘       └─────────┘     └────────┘     └──────────┘    └────────┘   │
│     │               │               │               │               │        │
│     │               │               │               │               │        │
│  Auto-capture   Manual         3x success      Team review    Governance    │
│  from session   documentation  promotion       approval       enforcement   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

| Stage | Description | Entry Criteria | Exit Criteria |
|-------|-------------|----------------|---------------|
| **Idea** | Raw thought captured | Session capture | Groomed with acceptance criteria |
| **Learning** | Documented pattern | Structured format | Used successfully 3+ times |
| **Skill** | Encoded expertise | SKILL.md created | Stable, tested, documented |
| **Standard** | Team convention | Adoption by team | Formal review passed |
| **Policy** | Enforced rule | Governance approval | Automated enforcement |

---

## Automatic Staleness Detection

### Detection Rules

| Asset Type | Fresh Threshold | Warn Threshold | Stale Threshold | Action |
|------------|-----------------|----------------|-----------------|--------|
| `state` | 7 days | 10 days | 14 days | Auto-archive |
| `idea` | 14 days | 21 days | 30 days | Prompt for grooming |
| `learning` | 20 days | 30 days | 45 days | Request update |
| `skill` | 50 days | 75 days | 100 days | Review notification |
| `command` | 50 days | 75 days | 100 days | Review notification |
| `standard` | 90 days | 120 days | 180 days | Governance review |
| `policy` | 180 days | 270 days | 365 days | Mandatory review |

### Detection Algorithm

```typescript
function detectStaleness(asset: ContextAsset): StalenessStatus {
  const daysSinceUpdate = daysBetween(asset.updated, now());
  const thresholds = STALENESS_THRESHOLDS[asset.type];

  if (daysSinceUpdate < thresholds.fresh) {
    return { status: 'fresh', score: 100 - (daysSinceUpdate * thresholds.decayRate) };
  } else if (daysSinceUpdate < thresholds.warn) {
    return { status: 'warn', score: 50 };
  } else if (daysSinceUpdate < thresholds.stale) {
    return { status: 'stale', score: 25 };
  } else {
    return { status: 'critical', score: 0, action: thresholds.action };
  }
}
```

### Detection Schedule

| Job | Schedule | Scope |
|-----|----------|-------|
| Quick scan | Every 15 minutes | Changed assets only |
| Full scan | Daily at 00:00 UTC | All assets |
| Deep audit | Weekly (Sunday) | All assets + lineage |

### Automatic Actions

| Condition | Action | Reversible |
|-----------|--------|------------|
| State stale > 14d | Archive to `archived/` | Yes (manual restore) |
| Idea stale > 30d | Move to `ideas/archive/` | Yes |
| Learning stale > 45d | Add `needs-review` tag | Yes |
| Skill/Command stale > 100d | Create review work item | N/A |
| Policy stale > 365d | Flag for governance review | N/A |

---

## Promotion Workflow Triggers

### Idea to Learning

**Trigger:** Idea groomed with acceptance criteria

```yaml
promotion:
  from: idea
  to: learning
  triggers:
    - condition: has_acceptance_criteria
      check: "asset.metadata.acceptanceCriteria.length > 0"
    - condition: has_owner
      check: "asset.owner != null"
    - condition: has_domain
      check: "asset.domain != null"
  actions:
    - move_file:
        from: "learning/ideas/{filename}"
        to: "learning/best-practices/{domain}/{filename}"
    - update_registry:
        type: learning
        status: active
    - notify:
        channel: teams
        message: "Idea '{title}' promoted to Learning"
```

### Learning to Skill

**Trigger:** Learning used successfully 3+ times

```yaml
promotion:
  from: learning
  to: skill
  triggers:
    - condition: usage_count
      check: "asset.metrics.usageCount >= 3"
    - condition: success_rate
      check: "asset.metrics.successRate >= 0.9"
    - condition: no_recent_issues
      check: "asset.metrics.issuesLast30Days == 0"
  actions:
    - create_skill:
        template: "templates/SKILL.md.template"
        path: "skills/{name}/SKILL.md"
    - migrate_content:
        preserve_history: true
    - update_lineage:
        add_upstream: "{learning_id}"
    - notify:
        channel: teams
        message: "Learning '{title}' ready for skill creation"
```

### Skill to Standard

**Trigger:** Team adoption threshold reached

```yaml
promotion:
  from: skill
  to: standard
  triggers:
    - condition: team_adoption
      check: "asset.metrics.teamAdoption >= 0.8"
    - condition: stability
      check: "asset.metrics.daysSinceLastChange >= 30"
    - condition: documentation
      check: "asset.completeness >= 0.95"
  actions:
    - create_review:
        type: "standard_proposal"
        assignee: "team_lead"
    - notify:
        channel: teams
        message: "Skill '{title}' proposed as team standard"
  approval_required: true
```

### Standard to Policy

**Trigger:** Governance approval

```yaml
promotion:
  from: standard
  to: policy
  triggers:
    - condition: governance_approved
      check: "asset.metadata.governanceApproval == true"
    - condition: enforcement_ready
      check: "asset.metadata.enforcementMechanism != null"
  actions:
    - update_claude_md:
        section: "Enforced Best Practices"
        content: "{policy_summary}"
    - enable_enforcement:
        rule_id: "{policy_id}"
    - audit_log:
        event: "policy_enabled"
        details: "{full_policy}"
    - notify:
        channel: governance
        message: "New policy '{title}' now enforced"
```

---

## Quality Gate Enforcement

### Gate Definitions

| Gate | Applied To | Checks | Blocking |
|------|------------|--------|----------|
| **Capture** | New assets | Valid format, required fields | Yes |
| **Structure** | All updates | Schema validation | Yes |
| **Validate** | Promotions | Quality score >= threshold | Yes |
| **Promote** | Stage changes | All prior gates + approval | Yes |

### Capture Gate

```typescript
function captureGate(asset: NewAsset): GateResult {
  const checks = [
    { name: 'has_title', pass: asset.title?.length > 0 },
    { name: 'has_type', pass: VALID_TYPES.includes(asset.type) },
    { name: 'valid_path', pass: isValidPath(asset.path) },
    { name: 'has_content', pass: asset.content?.length > 50 },
  ];

  const failed = checks.filter(c => !c.pass);
  return {
    passed: failed.length === 0,
    failures: failed.map(c => c.name),
    action: failed.length > 0 ? 'reject' : 'allow'
  };
}
```

### Structure Gate

```typescript
function structureGate(asset: ContextAsset): GateResult {
  const schema = SCHEMAS[asset.type];
  const validation = validateSchema(asset, schema);

  const checks = [
    { name: 'schema_valid', pass: validation.valid },
    { name: 'yaml_frontmatter', pass: hasValidFrontmatter(asset) },
    { name: 'no_broken_links', pass: checkInternalLinks(asset) },
    { name: 'required_tags', pass: hasRequiredTags(asset) },
  ];

  return {
    passed: checks.every(c => c.pass),
    failures: checks.filter(c => !c.pass).map(c => c.name),
    action: checks.every(c => c.pass) ? 'allow' : 'request_fix'
  };
}
```

### Validate Gate

```typescript
function validateGate(asset: ContextAsset): GateResult {
  const quality = calculateQuality(asset);
  const thresholds = QUALITY_THRESHOLDS[asset.type];

  const checks = [
    { name: 'freshness', pass: quality.freshness >= thresholds.freshness },
    { name: 'completeness', pass: quality.completeness >= thresholds.completeness },
    { name: 'consistency', pass: quality.consistency >= thresholds.consistency },
  ];

  return {
    passed: checks.every(c => c.pass),
    score: quality.overall,
    failures: checks.filter(c => !c.pass).map(c => c.name),
    action: checks.every(c => c.pass) ? 'allow' : 'block_until_fixed'
  };
}
```

### Quality Thresholds by Stage

| Stage | Freshness | Completeness | Consistency |
|-------|-----------|--------------|-------------|
| Idea | N/A | 50% | N/A |
| Learning | 70% | 80% | 80% |
| Skill | 80% | 90% | 90% |
| Standard | 90% | 95% | 95% |
| Policy | 95% | 100% | 100% |

---

## Notification and Alerting

### Notification Channels

| Channel | Use Case | Integration |
|---------|----------|-------------|
| Teams | Team notifications | Microsoft Teams MCP |
| DevOps | Work item creation | Azure DevOps MCP |
| Email | Escalations | SMTP |
| Dashboard | Real-time display | Web UI |
| CLI | Session alerts | Claude Code |

### Notification Rules

```yaml
notifications:
  - event: asset_stale
    severity: warn
    channels: [teams, cli]
    template: |
      Context asset '{asset.title}' is stale (last updated {asset.updated}).
      Owner: {asset.owner}
      Action: Review and update or archive.

  - event: quality_degraded
    severity: alert
    channels: [teams, devops]
    template: |
      Quality score dropped for '{asset.title}':
        Before: {old_score}%
        After: {new_score}%
      Investigate and remediate.
    devops_action: create_task

  - event: promotion_ready
    severity: info
    channels: [teams]
    template: |
      '{asset.title}' is ready for promotion from {from_stage} to {to_stage}.
      Criteria met: {criteria_summary}

  - event: policy_violation
    severity: critical
    channels: [teams, cli, email]
    template: |
      POLICY VIOLATION DETECTED
      Policy: {policy.title}
      Asset: {asset.title}
      Violation: {violation_details}
      Action Required: Immediate remediation
```

### Escalation Matrix

| Severity | Initial | 1 Hour | 4 Hours | 24 Hours |
|----------|---------|--------|---------|----------|
| Info | Dashboard | - | - | - |
| Warn | Teams | CLI reminder | - | - |
| Alert | Teams + DevOps | CLI + Email | Team lead | - |
| Critical | All channels | Page on-call | Manager | Governance |

---

## Automation Implementation

### Event-Driven Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           EVENT BUS                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐          │
│  │  File      │   │  Registry  │   │  Session   │   │  Schedule  │          │
│  │  Watcher   │   │  Monitor   │   │  Events    │   │  Trigger   │          │
│  └─────┬──────┘   └─────┬──────┘   └─────┬──────┘   └─────┬──────┘          │
│        │                │                │                │                  │
│        └────────────────┴────────────────┴────────────────┘                  │
│                                   │                                          │
│                                   ▼                                          │
│                         ┌─────────────────┐                                  │
│                         │  Event Router   │                                  │
│                         └────────┬────────┘                                  │
│                                  │                                           │
│        ┌─────────────────────────┼─────────────────────────┐                │
│        │                         │                         │                 │
│        ▼                         ▼                         ▼                 │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐                │
│  │  Staleness    │    │  Promotion    │    │  Quality      │                │
│  │  Handler      │    │  Handler      │    │  Handler      │                │
│  └───────┬───────┘    └───────┬───────┘    └───────┬───────┘                │
│          │                    │                    │                         │
│          └────────────────────┴────────────────────┘                         │
│                               │                                              │
│                               ▼                                              │
│                    ┌─────────────────────┐                                   │
│                    │  Action Executor    │                                   │
│                    └─────────────────────┘                                   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Event Types

| Event | Trigger | Payload |
|-------|---------|---------|
| `asset.created` | New asset added | Full asset data |
| `asset.updated` | Asset modified | Changed fields |
| `asset.deleted` | Asset removed | Asset ID, path |
| `asset.stale` | Staleness detected | Asset ID, status |
| `quality.changed` | Score changed | Old/new scores |
| `promotion.ready` | Criteria met | Asset, target stage |
| `gate.failed` | Gate check failed | Gate name, failures |
| `session.checkpoint` | Session saved | Session summary |

### Handler Implementation

```typescript
// Staleness handler
async function handleStalenessEvent(event: AssetStaleEvent) {
  const asset = await registry.get(event.assetId);
  const action = STALENESS_ACTIONS[asset.type][event.status];

  switch (action) {
    case 'archive':
      await archiveAsset(asset);
      await notify('asset_archived', asset);
      break;
    case 'tag':
      await addTag(asset, 'needs-review');
      await notify('review_needed', asset);
      break;
    case 'work_item':
      await createWorkItem({
        type: 'Task',
        title: `Review stale asset: ${asset.title}`,
        assignedTo: asset.owner
      });
      break;
  }

  await auditLog('staleness_action', { event, action });
}

// Promotion handler
async function handlePromotionReady(event: PromotionReadyEvent) {
  const asset = await registry.get(event.assetId);
  const workflow = PROMOTION_WORKFLOWS[`${event.fromStage}_to_${event.toStage}`];

  // Check if approval required
  if (workflow.approval_required) {
    await createApprovalRequest(asset, workflow);
    await notify('promotion_pending_approval', { asset, workflow });
  } else {
    await executePromotion(asset, workflow);
    await notify('promotion_complete', { asset, workflow });
  }
}
```

---

## Scheduled Jobs

| Job | Schedule | Description |
|-----|----------|-------------|
| `staleness-scan` | */15 * * * * | Quick staleness check |
| `quality-audit` | 0 * * * * | Hourly quality calculation |
| `full-scan` | 0 0 * * * | Daily full registry scan |
| `lineage-rebuild` | 0 0 * * 0 | Weekly lineage graph rebuild |
| `report-generate` | 0 8 * * 1 | Weekly governance report |

### Job Definitions

```yaml
jobs:
  staleness-scan:
    schedule: "*/15 * * * *"
    handler: stalenessScanner
    timeout: 60s
    retry: 2

  quality-audit:
    schedule: "0 * * * *"
    handler: qualityAuditor
    timeout: 300s
    retry: 1

  full-scan:
    schedule: "0 0 * * *"
    handler: fullScanner
    timeout: 600s
    retry: 3
    dependencies:
      - staleness-scan
      - quality-audit
```

---

## Audit Trail

### Audit Events

| Event | Fields | Retention |
|-------|--------|-----------|
| Asset created | who, what, when, why | 365 days |
| Asset updated | who, what, changes, when | 365 days |
| Asset promoted | who, from, to, criteria, when | Permanent |
| Gate result | asset, gate, result, failures | 90 days |
| Notification sent | type, recipient, content | 30 days |
| Action executed | action, asset, result | 365 days |

### Audit Log Format

```json
{
  "timestamp": "2026-01-20T12:00:00Z",
  "event": "asset.promoted",
  "actor": "automation",
  "asset": {
    "id": "uuid-1234",
    "title": "TypeScript Best Practices",
    "type": "learning"
  },
  "details": {
    "from_stage": "learning",
    "to_stage": "skill",
    "criteria_met": ["usage_count", "success_rate", "no_recent_issues"],
    "approval": null
  },
  "result": "success"
}
```

---

## Configuration

### Automation Config Schema

```yaml
automation:
  enabled: true
  dry_run: false

  staleness:
    scan_interval: "15m"
    thresholds:
      state: { fresh: 7, warn: 10, stale: 14 }
      idea: { fresh: 14, warn: 21, stale: 30 }
      learning: { fresh: 20, warn: 30, stale: 45 }
      skill: { fresh: 50, warn: 75, stale: 100 }
      policy: { fresh: 180, warn: 270, stale: 365 }

  promotion:
    auto_promote: ["idea_to_learning"]
    require_approval: ["learning_to_skill", "skill_to_standard", "standard_to_policy"]

  quality:
    audit_interval: "1h"
    thresholds:
      learning: { freshness: 70, completeness: 80, consistency: 80 }
      skill: { freshness: 80, completeness: 90, consistency: 90 }
      standard: { freshness: 90, completeness: 95, consistency: 95 }

  notifications:
    default_channel: "teams"
    escalation_enabled: true

  audit:
    enabled: true
    retention_days: 365
```

---

## Implementation Phases

### Phase 1: Staleness Detection (Week 1)

- [ ] File watcher implementation
- [ ] Staleness calculation
- [ ] Auto-tagging stale assets
- [ ] Basic notifications

### Phase 2: Quality Gates (Week 2)

- [ ] Gate check framework
- [ ] Capture gate
- [ ] Structure gate
- [ ] Validate gate

### Phase 3: Promotion Workflows (Week 3)

- [ ] Workflow engine
- [ ] Criteria evaluation
- [ ] Approval integration
- [ ] Promotion execution

### Phase 4: Full Automation (Week 4)

- [ ] Event-driven architecture
- [ ] Scheduled jobs
- [ ] Audit logging
- [ ] Monitoring dashboard

---

## Related Documents

- [Context Governance Implementation Plan](./implementation-plan.md)
- [Governance Metrics Dashboard](./metrics-dashboard.md)
- [Context Governance Architecture](../../domains/information-technology/architecture/context-governance-architecture.md)

---

*Document Location:* `organizational-docs/shared/context-governance/lifecycle-automation.md`
