# Work Queue Management

## Queue-Based Model (AI-Assisted Workflow)

Traditional priority (P0/P1/P2/P3) replaced with queue-based sequencing optimized for AI-assisted work velocity.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  CAPTURED   │────▶│  GROOMED    │────▶│   QUEUED    │────▶│    DONE     │
│             │     │             │     │             │     │             │
│ Raw idea    │     │ Work-ready  │     │ In ADO,     │     │ Completed   │
│ ungroomed   │     │ estimated   │     │ sequenced   │     │ verified    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                              │
                          ┌───────────────────┼───────────────────┐
                          ▼                   ▼                   ▼
                      [ready]            [blocked]          [in-progress]
```

## Work Item States

| State | Meaning | Can Work? | Dashboard |
|-------|---------|-----------|-----------|
| `captured` | Raw idea, needs grooming | No | Gray |
| `groomed` | Has criteria + estimate, ready to queue | Queue it | Yellow |
| `ready` | In queue, can be worked now | Yes | Green |
| `blocked` | Waiting on dependency | No | Red |
| `in-progress` | Currently being worked | Active | Blue |
| `review` | Needs validation/approval | Waiting | Orange |
| `done` | Completed and verified | N/A | Gray |

## Queue Attributes (Replaces Priority)

| Attribute | Purpose | Example |
|-----------|---------|---------|
| **Effort** | Time estimate | XS/S/M/L/XL |
| **Blocked By** | What's stopping this | Item #21, "external: credentials" |
| **Unblocks** | What's waiting on this | Items #22, #23 |
| **Initiative** | Parent strategic goal | Safari Trace SSO |
| **Sequence** | Queue position | 1, 2, 3... (dynamic) |
| **Assigned** | Who + AI assist level | Dallas + Claude |

## Effort Estimation (AI-Adjusted)

| Size | Solo Human | Human + Claude | Claude-Primary |
|------|------------|----------------|----------------|
| XS | 1 hour | 15 min | 5 min |
| S | 4 hours | 1 hour | 15 min |
| M | 1-2 days | 2-4 hours | 1 hour |
| L | 3-5 days | 1 day | 2-4 hours |
| XL | 1-2 weeks | 2-3 days | 1 day |

**Default assumption:** Human + Claude collaboration

## Initiative Rollup & Forecasting

Strategic initiatives aggregate work items for delivery estimation:

```
Initiative: Safari Trace SSO (#25)
├── Total Items: 5
├── Status Breakdown:
│   ├── Done: 1 (2hr actual)
│   ├── In-Progress: 1 (est: 1hr remaining)
│   ├── Ready: 1 (est: 2hr)
│   └── Blocked: 2 (waiting on #21 domain integration)
│
├── Team Capacity: 6hr/day effective (Dallas + Claude)
├── Blocker ETA: #21 expected 2026-01-19
│
└── Estimated Delivery: 2026-01-20
    (Ready work: 3hr = today)
    (Blocked work: 4hr = after blocker clears + 1 day)
```

## Sequencing Logic

Queue order determined by:

1. **Unblocks others** - High value items that clear dependencies
2. **Ready now** - No blockers, can start immediately
3. **Initiative deadline** - Part of time-sensitive strategic goal
4. **Effort (small first)** - Quick wins build momentum
5. **Value density** - Business impact per hour invested

## Grooming Checklist

Items need "good enough" before entering queue (fail-fast mentality):

| Field | Required | Notes |
|-------|----------|-------|
| Title | Yes | Action verb + object |
| Description | Minimal | Why this matters (1-2 sentences) |
| Acceptance Criteria | Good enough | Refine as you go |
| Effort | Yes | XS/S/M/L/XL |
| Initiative | If applicable | Parent strategic goal |
| Blocked By | If applicable | What's stopping this |
| Unblocks | If applicable | What's waiting |
| ADO Type | Yes | Task, Requirement, Feature |

**Philosophy:** Build to learn, not just to ship. Don't over-think ambiguity - try something to figure out what's next.

## Quick Commands

| Command | Action |
|---------|--------|
| `/brain-dump` | Capture new ideas (ungroomed) |
| `/reminder` | Capture single item during work |
| `/groom [#]` | Groom item for queue |
| `/queue` | Show ready items in sequence |
| `/blocked` | Show blocked items + blockers |
| `/forecast [initiative]` | Show delivery estimate |
| `/promote-to-ado [#]` | Create ADO work item |

## Dashboard Views

| View | Purpose | Key Metrics |
|------|---------|-------------|
| **Queue** | What to work on next | Ready items, sequence |
| **Blocked** | What's stuck | Blockers, unblock dates |
| **Initiatives** | Strategic delivery | Rollup estimates |
| **Capacity** | Team bandwidth | Hours available, utilization |
| **Velocity** | Throughput trend | Items/day, hours/day |

## Review Cadence

| Review | Frequency | Focus |
|--------|-----------|-------|
| **Session Start** | Each `/start-work` | Queue top 3, any blockers? |
| **Session End** | Each `/end-work` | What completed? Queue updated? |
| **Weekly** | Friday | Initiative forecasts, capacity planning |
| **Monthly** | 1st of month | Velocity trends, process improvement |

## Metrics

| Metric | Target | Why |
|--------|--------|-----|
| Queue depth (ready) | 5-10 items | Enough runway, not overwhelming |
| Blocked items | < 20% of total | Minimize waiting |
| Velocity (items/day) | Track trend | Measure improvement |
| Forecast accuracy | +/- 20% | Reliable delivery estimates |
| Time captured → done | < 1 week for S/M | Fast flow |

## Migration from Priority Model

| Old | New |
|-----|-----|
| P0 - Urgent | `ready` + sequence 1-3 |
| P1 - High | `ready` or `blocked` with initiative |
| P2 - Medium | `groomed` awaiting queue |
| P3 - Low | `captured` or deferred |

---

*Queue-based model optimized for AI-assisted work velocity. Priority replaced by sequencing and dependency management.*
