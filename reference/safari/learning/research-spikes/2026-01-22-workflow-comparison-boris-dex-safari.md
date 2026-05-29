---
title: Workflow Comparison - Boris Cherny, Dex Horthy, Safari
date: 2026-01-22
type: research-spike
status: complete
sources:
  - https://twitter-thread.com/t/2007179832300581177
  - https://github.com/humanlayer/advanced-context-engineering-for-coding-agents
  - https://karozieminski.substack.com/p/boris-cherny-claude-code-workflow
  - https://paddo.dev/blog/how-boris-uses-claude-code/
tags: [claude-code, workflow, context-engineering, best-practices]
---

# Workflow Comparison: Boris Cherny, Dex Horthy & Safari

## Executive Summary

Three approaches to Claude Code productivity, each optimizing for different constraints:

| Approach | Core Philosophy | Key Metric |
|----------|-----------------|------------|
| **Boris** | Parallelization & verification | 259 PRs / 30 days |
| **Dex** | Context management & compaction | Stay under 40% utilization |
| **Safari** | Context governance & lifecycle | Learnings compound over time |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BORIS CHERNY WORKFLOW                                │
│                    "Treat AI as schedulable capacity"                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│   │ Tab 1   │  │ Tab 2   │  │ Tab 3   │  │ Tab 4   │  │ Tab 5   │          │
│   │ (git 1) │  │ (git 2) │  │ (git 3) │  │ (git 4) │  │ (git 5) │          │
│   └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘          │
│        │            │            │            │            │                 │
│        └────────────┴─────┬──────┴────────────┴────────────┘                 │
│                           │                                                  │
│                    System Notifications                                      │
│                           │                                                  │
│   ┌───────────────────────┴───────────────────────┐                         │
│   │              CLAUDE.MD (2.5k tokens)          │                         │
│   │         Institutional Memory / Mistakes       │                         │
│   └───────────────────────────────────────────────┘                         │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  Web / Mobile Sessions (5-10)                                        │   │
│   │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                           │   │
│   │  │ Web │ │ Web │ │ Web │ │Phone│ │Phone│  ── & prefix starts task  │   │
│   │  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘                           │   │
│   │     └───────┴───────┴───────┴───────┘                               │   │
│   │                      │                                               │   │
│   │              /teleport (one-way)                                     │   │
│   │                      ▼                                               │   │
│   │              Local Terminal                                          │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Key Commands: /commit-push-pr, Plan Mode (Shift+Tab+Tab), /permissions    │
│   Subagents: code-simplifier, verify-app                                    │
│   Model: Opus 4.5 with thinking (always)                                    │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEX HORTHY WORKFLOW                                  │
│              "Stay under 40% context window utilization"                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Context Window Utilization                                                 │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │ 0%        20%        40%        60%        80%        100%         │    │
│   │ ├──────────┼──────────┼──────────┼──────────┼──────────┤           │    │
│   │ │  SMART ZONE        │ DEGRADING │    DUMB ZONE        │           │    │
│   │ │  ████████████████  │ ░░░░░░░░░ │                     │           │    │
│   │ │  Continue working  │ Compact!  │ STOP - start fresh  │           │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│   Research → Plan → Implement (RPI) Workflow                                 │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│   │  RESEARCH   │────▶│    PLAN     │────▶│  IMPLEMENT  │                   │
│   │             │     │             │     │             │                   │
│   │ Subagents   │     │ HUMAN GATE  │     │ Phase by    │                   │
│   │ discover    │     │ (mandatory) │     │ phase       │                   │
│   │             │     │             │     │             │                   │
│   │ research.md │     │ plan.md     │     │ progress.md │                   │
│   └─────────────┘     └─────────────┘     └─────────────┘                   │
│         │                   │                   │                            │
│         ▼                   ▼                   ▼                            │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │              Frequent Intentional Compaction (FIC)                   │   │
│   │                                                                      │   │
│   │  Raw Output ──▶ Structured Artifact ──▶ Fresh Context               │   │
│   │  (logs, JSON)    (markdown summary)      (clean start)              │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Human Leverage Priority:                                                   │
│   Bad research → 1000s of bad code lines                                    │
│   Bad plan → 100s of bad code lines                                         │
│   Bad code → individual line issues                                         │
│                                                                              │
│   Focus review on RESEARCH and PLAN, not line-by-line code                  │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                         SAFARI CIRCUITS WORKFLOW                             │
│                "Context as a governed, evolving asset"                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Context Lifecycle (Maturation Pipeline)                                    │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                                                                       │  │
│   │  Idea ──▶ Learning ──▶ Skill ──▶ Standard ──▶ Governance             │  │
│   │    │                                              │                   │  │
│   │    └──────────────── Feedback Loop ───────────────┘                   │  │
│   │                                                                       │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   Automatic Session Workflow                                                 │
│   ┌────────┐   ┌────────┐   ┌────────────┐   ┌──────────┐   ┌──────────┐   │
│   │ START  │──▶│  WORK  │──▶│ CHECKPOINT │──▶│ VALIDATE │──▶│   END    │   │
│   │ (auto) │   │        │   │  (~50 turns)│   │ (tests)  │   │  (auto)  │   │
│   └────────┘   └────────┘   └────────────┘   └──────────┘   └──────────┘   │
│       │                           │                              │          │
│       ▼                           ▼                              ▼          │
│   Load phase.md            Update phase.md              Full checkpoint     │
│   Check MCPs               Capture learnings            Update work items   │
│   Load context             Flag staleness               Git sync            │
│                                                                              │
│   Context Health Indicators                                                  │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │ Fresh (< 30 turns) │ Warm (30-60) │ Hot (> 60 - checkpoint!)      │    │
│   │ ████████████████   │ ░░░░░░░░░░░░ │                               │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│   Unique Safari Additions                                                    │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ • DevOps Auto-Sync (ADO work item inference)                        │   │
│   │ • Git Auto-Sync (pull on start, push after commit)                  │   │
│   │ • Work Item Sync (multi-user conflict detection)                    │   │
│   │ • Safari MCP (standardized context access across LLM interfaces)    │   │
│   │ • Context Registry (quality, lineage, discovery metadata)           │   │
│   │ • Natural language → slash command mapping                          │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   /research ──▶ /plan ──▶ /implement (RPI from Dex)                         │
│   + automatic /start-work, /end-work, /checkpoint                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Comparison

### Session Management

| Aspect | Boris | Dex | Safari |
|--------|-------|-----|--------|
| **Concurrent sessions** | 10-15 (5 terminal + 5-10 web) | 1 (aggressive compaction) | 1 (sophisticated context mgmt) |
| **Git strategy** | Separate checkouts per session | Single working dir | Single with auto-sync |
| **Session handoff** | Teleport web → terminal | N/A | N/A (potential enhancement) |
| **Abandonment rate** | 10-20% expected | Minimal (compaction saves) | Minimal (checkpoints save) |

### Context Management

| Aspect | Boris | Dex | Safari |
|--------|-------|-----|--------|
| **Primary mechanism** | CLAUDE.md (2.5k tokens) | Artifact files (research.md, plan.md) | CLAUDE.md + registry + lifecycle |
| **Compaction trigger** | Session end | 40% utilization | ~50 turns or topic shift |
| **Learning capture** | Add mistakes to CLAUDE.md | Manual artifact updates | Auto-capture + promotion pipeline |
| **Quality tracking** | Informal | Informal | Formal (freshness, completeness) |

### Human Review Points

| Phase | Boris | Dex | Safari |
|-------|-------|-----|--------|
| **Research** | Optional | HIGH PRIORITY | Via /research |
| **Planning** | Plan Mode iteration | MANDATORY GATE | Via /plan + approval |
| **Implementation** | Auto-accept after plan | Phase-by-phase | Via /implement |
| **Verification** | Critical (2-3x quality) | Part of implementation | /validate-work |

### Tooling & Automation

| Tool | Boris | Dex | Safari |
|------|-------|-----|--------|
| **Slash commands** | /commit-push-pr, custom | N/A | 25+ commands |
| **Subagents** | code-simplifier, verify-app | codebase discovery | codebase-locator, pattern-finder |
| **Hooks** | PostToolUse (formatting) | N/A | N/A |
| **Integrations** | Slack, BigQuery, Sentry MCPs | N/A | ADO, Teams, Power BI MCPs |

---

## Key Insights

### Boris's Core Principles
1. **Parallelization over serialization** - Run many sessions, expect some to fail
2. **Verification is critical** - Give Claude feedback loops for 2-3x quality
3. **Plan before execute** - Iterate in Plan Mode, then auto-accept
4. **Institutional memory** - CLAUDE.md captures mistakes to prevent recurrence
5. **Model quality over speed** - Opus 4.5 "wrong fast answer is slower than right slow answer"

### Dex's Core Principles
1. **40% rule** - Beyond 40% context utilization, performance degrades
2. **Frequent Intentional Compaction** - Pause to distill, then start fresh
3. **Human leverage at research/plan** - Bad research cascades to thousands of bad lines
4. **Subagents for discovery** - Keep main context clean
5. **Prioritize correctness > completeness > size**

### Safari's Core Principles
1. **Context as governed asset** - Lifecycle stages from Idea → Governance
2. **Automatic workflows** - Users work, system manages sessions
3. **Self-improving** - Learnings compound over time
4. **Multi-system integration** - ADO, Git, Teams sync automatically
5. **Quality metrics** - Track freshness, completeness, lineage

---

## Synthesis Recommendations

### Keep from Boris
- [x] CLAUDE.md institutional memory (already implemented)
- [x] Verification emphasis (align with /validate-work)
- [ ] **Consider**: 2-3 parallel sessions for complex work (research, implement, verify)
- [ ] **Consider**: Teleport pattern for mobile → local handoff

### Keep from Dex
- [x] 40% context rule (implemented in context health indicators)
- [x] RPI workflow (/research → /plan → /implement)
- [x] Subagent strategy (codebase-locator, etc.)
- [x] Human review at research/plan phases

### Keep from Safari
- [x] Context lifecycle and promotion pipeline
- [x] Automatic session management
- [x] DevOps/Git auto-sync
- [x] Natural language → command mapping
- [x] Context quality governance

### Gaps to Address

| Gap | Recommendation |
|-----|----------------|
| Single session limitation | Experiment with 2-3 focused parallel sessions |
| No teleport usage | Adopt for mobile research → local landing |
| Manual verification | Strengthen /validate-work with browser testing |

---

## Resources

### Primary Sources
- [Boris's Original Thread](https://twitter-thread.com/t/2007179832300581177)
- [HumanLayer Advanced Context Engineering](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents)
- [12-Factor Agents](https://github.com/humanlayer/12-factor-agents)

### Analysis
- [VentureBeat Coverage](https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are)
- [Karo Zieminski Breakdown](https://karozieminski.substack.com/p/boris-cherny-claude-code-workflow)
- [Paddo.dev Analysis](https://paddo.dev/blog/how-boris-uses-claude-code/)
- [InfoQ Technical Summary](https://www.infoq.com/news/2026/01/claude-code-creator-workflow/)

### Teleport Documentation
- [Claude Code on the Web](https://code.claude.com/docs/en/claude-code-on-the-web)
- [Teleportation Deep-dive](https://medium.com/@proflead/stop-copy-pasting-code-how-to-teleport-your-claude-sessions-058d50cf5024)
