# Safari Circuits Team Standards - Boris Workflow

This global CLAUDE.md establishes team-wide best practices based on Boris Cherny's Claude Code workflow.

## Core Principles (Always Follow)

1. **Automatic workflow** - Session management, context checkpoints, and learnings happen automatically. Users never invoke workflow commands - they just work.
2. **Think first, read the codebase** - Always investigate relevant files BEFORE making changes. Never speculate about code you haven't opened.
3. **Check in before major changes** - Present your plan and get verification before significant modifications.
4. **Explain changes at a high level** - Provide concise explanations of what changes you made and why.
5. **Keep it simple** - Make every change as minimal as possible. Each change should impact as little code as possible.
6. **Maintain documentation** - Keep architecture documentation current. Update CLAUDE.md with learnings when mistakes are made.
7. **Never speculate** - If you haven't read a file, don't make claims about it.
8. **Verification loops** - Tests, typecheck, and lint after every change.
9. **Self-improving** - Capture learnings automatically. Every correction feeds back into better future sessions.

---

## Iterative Objectives (Inferred from Commit Patterns)

Context matures through a lifecycle. Every session should advance context along this pipeline:

```
Idea â†’ Learning â†’ Skill â†’ Standard â†’ Governance
  â†‘                                      |
  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Feedback Loop â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Automatic Actions Per Session

| Objective | Claude Action | Trigger |
|-----------|---------------|---------|
| **Consolidate** | Always write to `organizational-docs`, never OneDrive | Any file creation |
| **Automate** | Run `/end-work` automatically when task complete | Task completion signal |
| **Capture** | Propose CLAUDE.md learning when I make a mistake | Correction received |
| **Formalize** | Suggest skill creation when pattern repeats 3+ times | Pattern detection |
| **Visualize** | Offer to create diagram when explaining architecture | Complex explanation |
| **Govern** | Track context usage and flag staleness | Session checkpoint |
| **Stay on topic** | Capture tangential thoughts via `/reminder`, route appropriately | Off-topic input |

### Context Maturation Stages

| Stage | Description | Location | Promotion Trigger |
|-------|-------------|----------|-------------------|
| **Idea** | Raw thought, unvalidated | `learning/ideas/backlog.md` | Groomed with acceptance criteria |
| **Learning** | Validated insight from session | `learning/best-practices/` | Used successfully 3+ times |
| **Skill** | Reusable encoded expertise | `skills/{name}/SKILL.md` | Stable, documented, tested |
| **Standard** | Team-wide convention | `docs/standards/STD-*.md` | Adopted across projects |
| **Governance** | Measured, enforced policy | CLAUDE.md or registry | Automated enforcement |

### Evolution Metrics (from Jan 18-20 commits)

| Area | Changes | Focus |
|------|---------|-------|
| Skills | 51 | Building AI expertise |
| Commands | 32 | Workflow automation |
| Branding | 29 | Visual identity |
| Learning | 25 | Knowledge capture |
| Strategy | 20 | Leadership docs |

**Key insight:** Skills evolve fastest, followed by workflow automation. Prioritize capturing expertise as skills.

---

## Key Repository Paths

**Known repositories - Claude should NEVER search for these:**

| Repo | Local Path | Remote |
|------|------------|--------|
| **organizational-docs** | `C:\Users\dkmcintyre\organizational-docs` | SafariCircuitsLLC/organizational-docs |

### Documentation Write Rules (ENFORCED)

**MUST write to:** `C:\Users\dkmcintyre\organizational-docs`

**NEVER write to:** OneDrive locations (archive only for CSVs, PDFs, HTML exports)

### Key Documentation Paths

| Content Type | Path in organizational-docs |
|--------------|----------------------------|
| Architecture docs | `domains/information-technology/architecture/` |
| Integration patterns | `shared/integration-patterns/` |
| Product docs | `products/{product}/` |
| Active projects | `projects/active/{project}/` |
| Claude workflow | `shared/claude-workflow/` |
| Standards | `docs/standards/` |
| Shareable deliverables | `deliverables/{audience}/` |

---

## Session Workflow (AUTOMATIC)

```
[First message] â†’ AUTO-START â†’ WORK â†’ AUTO-CHECKPOINT â†’ AUTO-VALIDATE â†’ [Session ends] â†’ AUTO-CLOSE
```

| Phase | Trigger | Claude Does (silently) |
|-------|---------|------------------------|
| **Start** | First user message | Load `~/.claude/state/phase.md`, load context |
| **Work** | User requests | Plan mode for complex tasks, incremental changes |
| **Checkpoint** | ~50 turns, task complete, topic shift | Update phase.md silently |
| **Validate** | Code changes made | Run tests/lint in background |
| **End** | User says bye, explicit close | Full checkpoint, update work items |

**Context Health:** Fresh (< 30 turns) â†’ Warm (30-60) â†’ Hot (> 60, checkpoint needed)

**Full details:** See `/checkpoint`, `/start-work`, `/end-work` skills

### Focus Management (Staying on Topic)

When user shares off-topic thoughts, **auto-invoke `/reminder`**:
- Acknowledge briefly â†’ Categorize â†’ Confirm: `âœ“ [category]: "[item]" â†’ [destination]` â†’ Return to work

---

## Natural Language â†’ Slash Command Mappings

| User Says | Execute |
|-----------|---------|
| "start work", "begin session", "let's get started" | `/start-work` |
| "end work", "wrap up", "done for now" | `/end-work` |
| "what's the status", "where are we" | `/status` |
| "validate", "check everything" | `/validate-work` |
| "commit and push", "push changes" | `/quick-commit` |
| "review changes", "what changed" | `/review-changes` |
| "brain dump", "get this out of my head" | `/brain-dump` |
| "reminder:", "don't forget", "we should" | `/reminder` |
| "groom the backlog", "refine backlog" | `/groom` |
| "checkpoint", "save progress" | `/checkpoint` |
| "sync to devops", "update devops" | `/sync-devops` |
| "context status", "context health" | `/context` |
| "research this", "investigate", "explore codebase" | `/research` |
| "create a plan", "plan this out" | `/plan` |
| "implement the plan", "execute plan" | `/implement` |
| "I just took a screenshot", "latest screenshot", "most recent screenshot" | `/screenshot` (single) |
| "search for images", "find screenshots", "screenshots from today" | `/screenshot` (search) |
| "create work item", "update work item", "check backlog", "track this in devops", "work on [item]" | Activate Azure DevOps MCP |
| "push to github", "create PR", "review PR", "check github", "create branch", "merge branch" | Activate GitHub tools |
| "pulse", "check in", "where am I", "am I on track" | `/pulse` |
| "branch off", "spawn session", "explore this separately", "tangent" | `/branch` |
| "cockpit", "dashboard", "show sessions", "what's active" | `/cockpit` |
| "this isn't working", "pivot", "rethink", "try different approach" | `/rethink` |
| "merge findings", "return to parent", "done with branch" | `/merge` |

**Important**: When matched, read full instructions in `~/.claude/commands/*.md`

---

## MCP Loading (Profile-Based)

MCP loading is **profile-based**, not on-demand. IT profile gets automatic DevOps tracking.

| MCP | IT Profile | Business Profile | Notes |
|-----|------------|------------------|-------|
| **Azure DevOps** | **Always-On** | Off | Work items auto-tracked |
| **GitHub** | On-Demand | Off | Triggered by git/PR keywords |
| **MS-365** | On-Demand | On-Demand | Triggered by email/calendar keywords |

### DevOps Auto-Tracking (IT Profile - ENFORCED)

**Users should NEVER manually say "track this in DevOps".** Work is captured automatically:

| Event | Claude Does |
|-------|-------------|
| Session start | Load DevOps MCP, initialize work-tracker.json |
| Every 10 turns | Light inference scan for work signals |
| Checkpoint (40 turns) | Full inference + create high-confidence items |
| End work | Create remaining items, close completed, link commits |

**Inline acknowledgment when work detected:**
```
📋 Tracking: "Fix auth timeout bug" (Bug, 0.92)
```

**Opt-out:** User can say "don't track [topic]" to exclude specific work from inference.

### On-Demand MCPs

| MCP | Trigger Phrases |
|-----|----------------|
| **GitHub** | "push to github", "create PR", "review PR", "create branch", "merge branch" |
| **MS-365** | "check email", "send email", "calendar", "schedule meeting" |

**Behavior:**
- Trigger phrase activates MCP
- User can say "don't need [MCP]" to deactivate

---

## Task Complexity Assessment

| Complexity | Criteria | Approach |
|------------|----------|----------|
| **Simple** | Single file, clear change | Standard execution |
| **Medium** | Multi-file, feature work | `/research` â†’ `/plan` â†’ `/implement` |
| **Complex** | Large refactor, architecture | Full RPI with subagents |

---

## Context Engineering (Dex Horthy / HumanLayer)

> Based on [Advanced Context Engineering for Coding Agents](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents) and [12-Factor Agents](https://github.com/humanlayer/12-factor-agents)

### The 40% Rule (CRITICAL)

**Stay under 40% context window utilization.** Beyond this threshold, LLM performance degrades - the "dumb zone."

| Utilization | Quality | Action |
|-------------|---------|--------|
| 0-40% | Smart Zone | Continue working |
| 40-60% | Degrading | Compact and checkpoint |
| >60% | Dumb Zone | STOP - start fresh with artifacts |

### Research â†’ Plan â†’ Implement (RPI) Workflow

For non-trivial tasks, use structured phases with intentional compaction:

```
/research â†’ research.md â†’ /plan â†’ plan.md â†’ /implement â†’ code
     â†“                         â†“                    â†“
  Sub-agents            Human Review Gate     Phase Checkpoints
```

| Phase | Command | Output | Review Point |
|-------|---------|--------|--------------|
| Research | `/research` | `worktrees/{task}/research.md` | Findings summary |
| Plan | `/plan` | `worktrees/{task}/plan.md` | **MANDATORY human approval** |
| Implement | `/implement` | Code + progress.md | After each phase |

### Frequent Intentional Compaction (FIC)

**Core principle:** Compress verbose outputs into structured artifacts. Never let raw tool output accumulate.

| Input Type | Compression Strategy |
|------------|---------------------|
| Search results | Summarize to file paths + relevance |
| File contents | Extract only needed sections |
| Build logs | Capture errors + relevant context only |
| Conversation history | Checkpoint to progress.md |

### Human Leverage Points

One bad research line â†’ 10 bad plan lines â†’ 100 bad code lines

**Review priority:**
1. Research findings (highest leverage)
2. Implementation plan (mandatory approval)
3. Code (lowest leverage - verify through tests)

### Subagent Strategy

Use subagents for discovery to prevent main context pollution:

| Agent | Location | Purpose |
|-------|----------|---------|
| `codebase-locator` | `~/.claude/agents/` | Find WHERE files live |
| `codebase-analyzer` | `~/.claude/agents/` | Understand HOW code works |
| `pattern-finder` | `~/.claude/agents/` | Find existing patterns |

### Worktrees

Active task artifacts live in `~/.claude/worktrees/{task-id}/`:
- `research.md` - Compressed discoveries
- `plan.md` - Implementation blueprint
- `progress.md` - Execution checkpoint

## Anti-Patterns to Avoid

- Starting to code without reading existing code
- Making changes "while you're in there"
- Skipping verification steps
- Large PRs with multiple unrelated changes
- Speculating about code behavior without reading

---

## Enforced Best Practices

### Safari Branding (MUST)

| Name | Hex | Usage |
|------|-----|-------|
| Safari Red | #9B1C1C | Primary brand |
| Dark Background | #0F172A | App backgrounds |
| Blue | #60a5fa | Internal systems |
| Green | #34d399 | Success/integration |

### TypeScript Conventions (MUST)

- Use `type` over `interface`
- Use string literal unions instead of `enum`
- Never use `any` without explicit approval

### Documentation Standard (SHOULD)

- Parsimony over comprehensiveness
- YAML metadata headers on all docs
- One concept per document
- Tables over paragraphs

---

## Learnings & Corrections

- [2026-01-18] Power BI MCP: GitHub releases may be in `Releases/` folder. Install MCPs to user directory when lacking admin access.
- [2026-01-18] CMMI process: Cannot create work items directly as Closed. Must create as Proposed, then update. Tasks require `Custom.CompletionSummary` when closing.
- [2026-01-19] Chrome MCP: Browser automation is SLOW. Only use for complex multi-step workflows, not one-off simple tasks.
- [2026-01-19] Session closure: ALWAYS run `/end-work` automatically when task complete. The workflow is meant to be automatic.
- [2026-01-19] Documentation: NEVER write to OneDrive - always use `organizational-docs` git repo.
- [2026-01-20] Safari brand styling: Read actual SVG/JSX assets in `organizational-docs/shared/assets/diagrams/` for real colors, not markdown brand docs.
- [2026-01-20] Brand governance: NEVER fabricate inline SVGs or generate visual patterns. Only reference existing assets from `shared/branding/assets/`. If a visual element doesn't exist in the brand library, ask the user before proceeding. Brand assets source of truth: `organizational-docs/shared/branding/README.md`.
- [2026-01-21] Context Engineering: Adopted Dex Horthy's RPI workflow (Research â†’ Plan â†’ Implement). Stay under 40% context utilization. Use `/research`, `/plan`, `/implement` for non-trivial tasks. Subagents in `~/.claude/agents/`. Task artifacts in `~/.claude/worktrees/`.
- [2026-01-21] MCP Python modules: Package names often differ from module names. Check `entry_points.txt` in dist-info folder for correct command. Some packages install as executables (e.g., `mcp-server-openmetadata`, `spark-mcp`) not `python -m` modules.
- [2026-01-21] Prioritization: Initially dropped P1-P4 tiers. Reinstated 2026-01-28 as dependency-driven model (P1=Foundation, P2=Enabler, P3=Value, P4=Future) after grooming the Context Governance Platform epic. Dependency chain position drives priority, not subjective urgency.
- [2026-01-28] Graph DB architecture: Neo4j Community Edition (Docker Compose) selected as the headless, LLM-agnostic context store. File-based `context-registry.json` doesn't scale for 50 users. Graph naturally models context relationships (skills, learnings, domains, users). Safari MCP is the Claude adapter; other LLM adapters plug into the same graph.
- [2026-01-28] Consolidation principle: When duplicate work items exist, create a fresh consolidated item and archive originals with `Archived; Consolidated` tags + Related links. Never delete â€” archive for traceability. Applied to #1071 and #1123 â†’ consolidated into #1131.
- [2026-01-28] DevOps portfolio structure: Epic #1128 (Safari Context Governance Platform) is the master epic. 5 Features (#1129-#1133) with Predecessor/Successor dependency chain. 19 Requirements (#1134-#1152). Feature #1052 reparented under the epic.
- [2026-01-22] Safari logo in HTML deliverables: The Safari wordmark logo requires **exactly 7 `<path>` elements**. Incomplete logos (2-3 paths) render as "SA /" instead of "SAFARI". The `html-deliverable-styling.md` template now includes the **full inline SVG** in all 3 template sections (cover, page-header, footer) â€” never use placeholder comments like `<!-- Full 7-path logo -->` which cause truncation during generation. Before generating any HTML deliverable, READ `shared/branding/assets/logos/svg/safari-logo.svg` to ensure accuracy.
- [2026-01-27] Work item status: Keep ALL created work items in **Proposed** status. Claude CLI is used for planning and grooming, not immediate execution. Users work items one-by-one either in terminal or DevOps UI. Never auto-close or auto-activate items unless explicitly asked.
- [2026-01-28] Date/time awareness: **ALWAYS check the current date** (from env/system prompt: `Today's date`) before writing any date or year references in deliverables. Never assume the current year from training data â€” verify from session metadata. When referencing "current" or "today" in articles, diagrams, or docs, use the verified date. Historical ranges (e.g., "2025â€“2027") are fine when describing past-to-future spans, but present-tense references ("In 2025, we...") must use the actual current year.
- [2026-01-28] ADO parent links: `wit_update_work_item` with `/fields/System.Parent` does NOT reliably set parent relationships. Use `wit_work_items_link` with `type: "parent"` instead â€” this creates the proper hierarchy link.
- [2026-01-28] SVGs in HTML deliverables: **ALWAYS inline SVGs** directly into HTML documents. Never use `<img src="...svg">` â€” browsers block external SVG loading from `file://` protocol, and `<img>` tags cannot render SVGs that use `<text>`, `<filter>`, `<marker>`, or gradient features. When inlining multiple SVGs in one document, namespace all `id` attributes (e.g., `bgGrad-tl`, `glow-par`) to prevent collisions. The whitepaper already follows this pattern correctly.
- [2026-01-28] Work item creation governance: Three-tier model â€” Tier 1 (free: Requirements/Tasks), Tier 2 (visibility: Features/scope changes â†’ `scope-change` tag), Tier 3 (escalation: Epics/strategic changes â†’ `escalation-needed` tag + user warning). Never block creation; add visibility tags. Work Evolution Dashboard surfaces Tier 2/3 items for lead review.
- [2026-01-28] Bootstrap profiles: IT profile (full DevOps) vs Business profile (document skills + context capture, no DevOps). Script supports `-Silent` for unattended rollout, `-Profile` for role selection. Phase 3 will use Entra ID groups for auto-detection.
- [2026-01-28] Enterprise content sync: `~/.claude/` has enterprise layer (synced from org-docs repo) and personal layer (user-created). Bootstrap script (`setup-claude-team-standards.ps1 -Sync`) refreshes enterprise content. Personal content is never overwritten. Contributing back via PR to org-docs.
- [2026-01-29] Large HTML generation on Windows: When HTML deliverables exceed Edit tool context limits, use a temp file + PowerShell .ps1 script to assemble the file. Write content sections to a script that outputs the complete HTML via `Out-File`. This bypasses token limits while producing self-contained, single-file deliverables.
- [2026-02-11] Session health management: Long-running sessions (>4 hours, >100 turns, multi-day) degrade LLM quality like long-running database queries degrade DB performance. `/start-work` now scans for orphaned sessions and shows Session Health Dashboard. Use `/pulse` for mid-session checks. Target: 1-2 hour sessions, 20-40 turns, single work item focus. Checkpoint at 40 turns. Split sessions when scope expands. See `~/.claude/skills/session-health/SKILL.md` and `~/.claude/commands/pulse.md`.
- [2026-02-13] Session branching (DAG model): IT strategy is an evolving DAG with parallel work streams. Use `/branch` to spawn focused child sessions for tangents/research without losing parent context. Use `/merge` to return findings. Use `/rethink` to pivot approach in-place when something isn't working (preserves context + captures learning). Use `/cockpit` for dashboard view of all sessions by initiative. Session graph stored in `~/.claude/state/session-graph.json`. This prevents the pattern of "end session, start new one, lose context chain."
- [2026-02-13] DevOps auto-tracking: Changed from on-demand ("track this in devops") to **always-on for IT profile**. Work is automatically inferred and tracked throughout sessions. Users should NEVER have to manually request work tracking. Inference runs every 10 turns (light) and at checkpoints (full). High-confidence items (>= 0.90) auto-create; medium (0.70-0.89) confirm at end-work. See `/devops-sync` command.

---

## Azure DevOps Integration

| Setting | Value |
|---------|-------|
| Organization | SafariCircuitsLLC |
| Project | Information Technology |
| Project ID | 18ba500c-2736-41cc-b6d7-695a3751dc96 |
| Default Team | Software Engineering |
| Default Area | Information Technology\Software Engineering |
| Process | CMMI |

**Work Item Hierarchy:** Epic â†’ Feature â†’ Requirement/Task

**States (CMMI):** Proposed â†’ Active â†’ Resolved â†’ Closed (Tasks skip Resolved)

**Note:** Tasks require `Custom.CompletionSummary` when closing.

### Work Item Lifecycle & Governance Tags

**Claude CLI is used for planning/grooming, not execution.** All created items stay in Proposed until manually worked.

| State | Tag | Meaning | Next Action |
|-------|-----|---------|-------------|
| Proposed | *(none)* | **Backlog** - captured for future reference | Groom when prioritized |
| Proposed | `Groomed` | **Ready** - high priority, next in line | Pull into Active when starting |
| Active | *(any)* | **In Progress** - actively being worked | Complete and move to Resolved |
| Resolved | *(none)* | **Dev Complete** - needs business validation | Business user reviews deliverable |
| Resolved | `Validated` | **Confirmed** - business approved | Safe to close |
| Closed | *(any)* | **Done** - work complete and accepted | Archive |

**Governance Checkpoints:**
1. **Grooming Gate**: Proposed â†’ Proposed+Groomed (Claude + user during `/groom`)
2. **Validation Gate**: Resolved â†’ Resolved+Validated (business user confirms deliverable)
3. **Closure Gate**: Only close Resolved+Validated items (ensures acceptance)

**Claude Behavior:**
- Create all work items as **Proposed** (backlog)
- Add `Groomed` tag only during explicit grooming sessions
- Never auto-close items; leave at Resolved for validation
- Suggest `Validated` tag when user confirms deliverable works

### Prioritization (Dependency-Driven)

Work is prioritized by **dependency chain position** â€” what blocks downstream capabilities gets done first.

| Tier | Label | Meaning | Example |
|------|-------|---------|---------|
| **P1** | Foundation | Blocks all downstream work; must complete first | DevOps Process Foundation, Neo4j Graph DB |
| **P2** | Enabler | Unlocks user-facing capability; depends on P1 | Safari MCP Platform, User Onboarding Workflows |
| **P3** | Value | Delivers directly to users; depends on P2 | 50-User Rollout, Per-Team Context Packages |
| **P4** | Future | No active dependencies; captured for later | Multi-LLM adapters beyond Claude, advanced analytics |

**How it works:**
- Features use ADO Predecessor/Successor links to express the dependency chain
- Priority tier is encoded in the `P1-Foundation`, `P2-Enabler`, `P3-Value`, `P4-Future` tags
- ADO's built-in Priority field maps: P1=1, P2=2, P3=3, P4=4
- Work naturally flows: complete P1 â†’ unblocks P2 â†’ enables P3

**Governance tags (still active):**

| Tag | Meaning | When to Use |
|-----|---------|-------------|
| `Groomed` | Ready to work | Fully specified, next in line |
| `Validated` | Business approved | Resolved items confirmed by stakeholder |
| `urgent` | Time-bound deadline | Expiring certs, compliance dates, broken prod |
| `blocked` | Cannot proceed | Waiting on dependency, access, or decision |
| `Archived` | Superseded/consolidated | Old item replaced by new consolidated item |
| `Consolidated` | Merged into another item | Used with `Archived`; check Related links for target |
| `scope-change` | Plan-impacting change | Claude auto-tags Tier 2 creation actions |
| `escalation-needed` | Strategic change needs lead review | Claude auto-tags Tier 3 creation actions |

**Consolidation Principle:** When duplicates exist, create a fresh consolidated item and archive originals. Always add a Related link from archived â†’ consolidated item with a comment explaining the consolidation. This preserves full traceability.

### Work Item Creation Governance (ENFORCED)

When creating work items, Claude applies tiered governance automatically:

| Tier | Action | Claude Behavior |
|------|--------|----------------|
| **1 â€” Free** | Create Requirement or Task | Create immediately as Proposed. No tags. No friction. |
| **2 â€” Visibility** | Create Feature, add child to Feature, modify Groomed item scope | Create as Proposed + add `scope-change` tag. Item surfaces on Work Evolution Dashboard. |
| **3 â€” Escalation** | Create Epic, reparent Feature under different Epic | Warn user: "This changes strategic alignment â€” consider discussing with IT Director." Create if user proceeds + add `escalation-needed` tag. |

**Never block creation.** All tiers allow the user to proceed. Tiers 2-3 add visibility tags, not gates.

**Work Evolution Dashboard:** ADO dashboard showing `scope-change` and `escalation-needed` items for lead review. See `devops/work-instructions/work-evolution-dashboard.md`.

### Team Mapping

| Area | Team |
|------|------|
| Software Engineering | Software Engineering |
| Data Services | Data Services |
| Infrastructure | Infrastructure Management |
| Security | Cybersecurity |
| Support | Help Desk and Support |

**Full workflow details:** See `~/.claude/reference/devops-workflow.md`

---

## Sync Features

### DevOps Sync (On-Demand)
Claude syncs to ADO **only when user activates DevOps** via language triggers (see Conditional MCP Loading).
- User triggers DevOps context â†’ Claude loads DevOps MCP
- Sync happens at checkpoints and `/end-work` when DevOps is active
- Say "don't track this" to prevent inference

**Full details:** See `/devops-sync` skill

### Git Auto-Sync
- Auto-pull on session start
- Auto-push after every commit
- Conflict resolution by file type (docs: prefer remote, config: prefer local, code: manual)

**Full details:** See `/git-sync` skill

### Work Item Sync (Multi-User Coordination)
Detects external changes to tracked work items at checkpoints and session end.
- Captures baselines at session start
- Detects changes at checkpoints (high/critical severity shown immediately)
- Full conflict resolution at `/end-work` with Replace/Supplement/Rework options
- Queue management prevents lost updates in multi-user scenarios

**Full details:** See `~/.claude/skills/work-item-sync/SKILL.md`

### Context Governance
Claude auto-captures learnings and patterns, manages context as a governed asset.

**Full details:** See `/context` command

---

## Architectural Objectives for Context

Two driving principles govern context enhancement:

### 1. Context Management (Operations & Governance)

How context is accessed, validated, and controlled:

| Layer | Purpose | Components |
|-------|---------|------------|
| **CPI** | Packaging | Versioned contracts, exports, compatibility |
| **SCL** | Operations | SELECT, RESOLVE, OPTIMIZE, ALLOCATE, LINK |
| **Governance** | Enforcement | Ownership, Classification, Lineage, Quality, Discovery, Access |

### 2. Context Evolution (Lifecycle Progression)

How context matures from idea to governed standard:

```
Capture â†’ Structure â†’ Validate â†’ Promote â†’ Enforce
   â†“          â†“          â†“          â†“         â†“
 Ideas    Learnings   Skills   Standards   Policy
```

| Dimension | Measures |
|-----------|----------|
| **Quality** | Freshness, completeness, consistency, token efficiency |
| **Lineage** | Upstream dependencies, downstream impacts |
| **Discovery** | Tags, domains, full-text search |

### 3. Context Storage (Neo4j Graph Database)

The context backend is a **headless, LLM-agnostic graph database** â€” Neo4j Community Edition via Docker Compose.

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Database** | Neo4j Community Edition | Native graph; Cypher queries; free |
| **Deployment** | Docker Compose (on-prem) | Persistent volumes, backup/restore, env configs |
| **Architecture** | Headless store + adapters | Graph DB is the platform; MCP is one adapter |
| **Multi-LLM** | Adapter pattern | Claude (MCP), Gemini (future), REST (generic) |
| **Migration** | JSON â†’ Neo4j | `context-registry.json` migrated to graph nodes/edges |

**Why graph over relational/document:**
- Context is inherently relational (skills depend on learnings, domains contain skills, users access domains)
- Graph traversal answers "what context is relevant?" naturally via relationship hops
- LLM-agnostic tags (`llm:claude`, `llm:gemini`, `llm:universal`) filter at query time
- 4-tier resolution (Personal > Domain > Project > Enterprise) maps to graph depth

**Epic tracking:** #1128 â†’ Feature #1130 (Neo4j Context Graph Database)

### Reference Architecture

**Definitive specification:** `organizational-docs/deliverables/internal/context-governance-whitepaper.html`

The whitepaper defines:
- Three-layer architecture (CPI â†’ SCL â†’ Governance)
- Industry statistics on context management ROI
- Safari MCP integration patterns
- Implementation roadmap phases

### Safari MCP - Internal Context Server

Safari MCP bridges the Context Governance system with the Model Context Protocol, enabling standardized access to context assets across all LLM interfaces.

| Component | Purpose |
|-----------|---------|
| **Resources** | Read context assets (`safari://context/*`) |
| **Tools** | SCL operations (SELECT, RESOLVE, OPTIMIZE, ALLOCATE, LINK) |
| **Prompts** | Pre-built context queries |

**MCP Resource URIs:**

| URI Pattern | Content |
|-------------|---------|
| `safari://context/enterprise-policy` | `~/.claude/CLAUDE.md` |
| `safari://context/project/{repo}` | `{repo}/.claude/CLAUDE.md` |
| `safari://context/skill/{name}` | `~/.claude/skills/{name}/SKILL.md` |
| `safari://context/command/{name}` | `~/.claude/commands/{name}.md` |
| `safari://context/learning/{path}` | `~/.claude/learning/{path}` |
| `safari://context/registry` | `~/.claude/state/context-registry.json` |

**MCP Tools:**

| Tool | Description |
|------|-------------|
| `safari:context_select` | Query context by domain, type, tags, freshness |
| `safari:context_resolve` | Resolve references, detect conflicts |
| `safari:context_optimize` | Fit context to token budget |
| `safari:context_capture` | Store new context with governance |
| `safari:context_quality` | Audit quality metrics |
| `safari:context_lineage` | Query upstream/downstream dependencies |
| `safari:context_promote` | Move through lifecycle stages |

**Benefits:**
- Unified access to context across Claude Code, API, other LLMs
- Governance enforcement through MCP tool validation
- Multi-client support with standardized interface
- Auditability via context registry

**Full details:** See `~/.claude/learning/best-practices/safari-mcp.md`

---

## MCP Trust Policy (ENFORCED)

Only install and use MCPs from trusted sources. This policy protects against supply chain attacks and ensures enterprise security compliance.

### Trusted Sources (Tier 1 - Auto-Approved)

| Source Type | Verification | Examples |
|-------------|--------------|----------|
| **Anthropic** | npm scope `@anthropic/*` or `@modelcontextprotocol/*` | `@modelcontextprotocol/server-postgres` |
| **Microsoft** | Domain `mcp.svc.cloud.microsoft/*` or scope `@microsoft/*` | Microsoft Entra MCP |
| **First-Party Vendors** | Publisher org matches product owner | Grafana â†’ `grafana/mcp-grafana`, Confluent â†’ `@confluentinc/mcp-confluent`, Figma â†’ `figma/figma-mcp` |

### Community Sources (Tier 2 - Require Approval)

MCPs from individual developers or unofficial sources require explicit user approval before first use.

| Indicator | Risk Level |
|-----------|------------|
| Publisher â‰  product owner | ðŸŸ¡ Medium |
| Low npm/PyPI downloads | ðŸŸ¡ Medium |
| No recent commits (>6 months) | ðŸŸ  Elevated |
| Known security issues | ðŸ”´ High |

**Verification Checklist (Tier 2):**
- [ ] Publisher identity verified (GitHub profile, company affiliation)
- [ ] Package has reasonable download count (>1,000/month)
- [ ] Repository actively maintained (commits within 6 months)
- [ ] No open security advisories
- [ ] Code reviewed or audited by community

### Claude Behavior

| Tier | Action |
|------|--------|
| **Tier 1** | Install/use without additional confirmation |
| **Tier 2** | WARN user: "This MCP is from [source]. Approve before first use?" |
| **Unknown** | REFUSE and suggest Tier 1 alternative if available |

### Current MCP Inventory

| MCP | Source | Tier | Status |
|-----|--------|------|--------|
| `azure-devops` | `@azure-devops/mcp` | 1 (Microsoft) | âœ… Approved |
| `microsoft-entra` | `mcp.svc.cloud.microsoft` | 1 (Microsoft) | âœ… Approved |
| `ms-365` | `@softeria/ms-365-mcp-server` | 2 (Commercial) | âœ… Approved (2026-02-02) |
| `powerbi-desktop` | `maxanatsko/pbi-desktop-mcp-public` | 2 (Community) | âœ… Approved (user-verified) |
| `chrome-devtools` | `chrome-devtools-mcp` | 2 (Community) | âœ… Approved (user-verified) |
| `confluent-kafka` | `@confluentinc/mcp-confluent` | 1 (Confluent) | âœ… Approved |
| `grafana` | `grafana/mcp-grafana` | 1 (Grafana) | âœ… Approved |
| `safari-context` | Safari Circuits internal | 1 (Internal) | âœ… Approved |

**Note:** `ms-365` replaces `teams-mcp` (2026-02-02). Provides Outlook email, Teams, Calendar, OneDrive, Excel, OneNote, To Do, Planner, SharePoint via single MCP.

### Adding New MCPs

When user requests a new MCP:
1. **Identify source** - Check npm/PyPI publisher, GitHub org
2. **Classify tier** - Apply trust criteria above
3. **Tier 1**: Proceed with installation
4. **Tier 2**: Present verification checklist, ask for approval
5. **Document** - Add to inventory table above after approval

---

## Reference Documentation

Detailed reference material extracted to reduce CLAUDE.md size:

| Reference | Location | Contents |
|-----------|----------|----------|
| **MCP Catalog** | `~/.claude/reference/mcp-catalog.md` | Power BI, Teams, Fireflies, Chrome, Data Platform MCPs |
| **Infrastructure** | `~/.claude/reference/infrastructure.md` | Tech standards, decision log, on-prem resources |
| **DevOps Workflow** | `~/.claude/reference/devops-workflow.md` | GitHub + ADO + Claude naming conventions, sync points |
| **Work Queue** | `~/.claude/reference/work-queue.md` | Queue model, states, effort sizing |

**Read these when working with specific integrations or needing detailed reference.**

---

## Learning Catalog

Best practices documented in `~/.claude/learning/` and promoted here when validated.

| Location | Purpose |
|----------|---------|
| `~/.claude/learning/best-practices/` | Domain-specific practices |
| `~/.claude/learning/ideas/backlog.md` | Work queue |
| `~/.claude/learning/PIPELINE.md` | Promotion workflow |

---

## Eduardo's Personal Context (Local Override)

This section contains Eduardo-specific preferences and context that override or supplement team standards.

### Work Style & Communication

**Decision-Making:**
- Present 2-3 options with clear tradeoffs, let me choose
- Flag risks proactively, don't hide complexity
- I prefer "here's what could go wrong" over optimistic estimates

**Communication Preference:**
- Start with brief summary, provide details on request
- Use tables for comparisons (easier to scan)
- Technical depth is fine—I'm hands-on when needed

**Time & Focus:**
- Usually work in 1-2 hour focused blocks
- Frequent context switches between priorities (IT + BeFirst + Team)
- End-of-day sessions: prefer quick wins over starting large tasks

**Things That Frustrate Me:**
- Surprises in production (always test dev first)
- Documentation drift (update docs WITH code changes)
- Changes without rollback plan
- Over-engineering when simple works

**Things I Value:**
- Clear explanation of tradeoffs
- Proactive risk identification
- Documentation as you build, not after
- Learning from mistakes (capture in CLAUDE.md learnings)
- Incremental progress over big-bang changes

### Role & Team Context

**Position:** IT Manager, Safari Circuits
**Reports to:** Scott (IT Director)
**Team structure:**
- IT Infrastructure team (network, servers, security)
- BeFirst development oversight (Eduardo + external developers)
- Operations support (Julien, Arturo—key stakeholders)

**Responsibilities:**
- BeFirst platform health and modernization
- Azure migration planning
- Team Claude Code adoption and standardization
- Cross-functional IT/operations coordination

**Decision Authority:**
- Can approve: Dev environment changes, documentation, internal tools
- Need sign-off: Production changes, budget items, architectural pivots

### BeFirst Platform Preferences

**Core Principles:**
- Data integrity > Speed (always)
- Incremental changes > Big rewrites
- Operations team impact assessment required
- Every change needs dev testing first

**Documentation Standards:**
- BeFirst_Docs must stay current (single source of truth)
- Knowledge base for operations team (not just IT)
- Commit deliverables to Git (HTML, DOCX, PDF)
- Update CLAUDE.md when learnings emerge

**Stakeholder Awareness:**
- **Julien (Operations):** Needs advance notice on Portal changes
- **Arturo (Manufacturing):** Focus on reliability, minimal disruption
- **Scott (IT Director):** Involve in strategic/architectural decisions

### Current Focus Areas (Review Monthly)

**Active as of 2026-05-08:**
- [ ] BeFirst documentation completeness (this repo)
- [ ] Knowledge base for operations team
- [ ] Planning API/Portal architecture improvements
- [ ] Claude Code team adoption and training

**Backlog (future quarters):**
- [ ] Azure migration planning (Q3 2026)
- [ ] Database consolidation evaluation
- [ ] DevOps CI/CD pipeline setup

### Technical Preferences

**Database Work:**
- Always use transactions for multi-table updates
- Explain query performance implications
- Flag when indexes might help
- Test queries in dev before production

**Code Changes:**
- Read existing code first, match patterns
- Keep changes minimal and focused
- Update related documentation
- Consider operations team's debugging needs

**SQL Explanations:**
- Include performance notes (table scans, index usage)
- Explain JOINs clearly (which tables, why)
- Show sample output when helpful

### Context Review Schedule

**Weekly (Friday PM):** Quick review
- Stale learnings to promote/archive?
- New patterns to capture?
- CLAUDE.md additions needed?

**Monthly (first Monday):** Deep review
- Update "Current Focus Areas"
- Review context quality metrics
- Archive completed initiatives
- Plan next month's priorities

**Tool:** Use Obsidian Context Dashboard (see context-review-system.md)

### Notes for Claude

- I'm building this system as I go—suggestions welcome
- When I correct you, auto-propose CLAUDE.md learning addition
- Use `/reminder` to capture my tangential thoughts
- Assume I've read team standards—focus on BeFirst-specific context

---

## Sources

- Based on [Boris Cherny's Claude Code workflow](https://x.com/bcherny/status/2007179832300581177)
- Context Engineering: [Dex Horthy / HumanLayer](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents)
- 12-Factor Agents: [HumanLayer Production Principles](https://github.com/humanlayer/12-factor-agents)
- Team documentation: organizational-docs repository
