---
title: Azure DevOps Work Instruction
document_id: WI-DEVOPS-001
version: 1.0
effective_date: 2026-01-19
author: Safari Circuits IT
audience: All IT Team Members
---

# Azure DevOps Work Instruction

Welcome to Safari Circuits' Azure DevOps environment. This guide covers how to view teams, navigate boards, and log your work.

## Quick Start

| Item | Value |
|------|-------|
| URL | https://dev.azure.com/SafariCircuitsLLC |
| Project | Information Technology |
| Process | CMMI |

Sign in with your Safari Circuits Microsoft 365 account (`@safaricircuits.com`).

---

## 1. Understanding Our Structure

### Teams

| Team | Area | Focus |
|------|------|-------|
| Software Engineering | Custom development, integrations, Claude Code workflow |
| Data Services | Data pipelines, analytics, reporting |
| Infrastructure Management | Servers, networking, cloud resources |
| Cybersecurity | Security policies, compliance, threat management |
| Help Desk and Support | User support, ticket resolution |

You'll be assigned to one or more teams. Your team determines which boards and backlogs you see by default.

### Work Item Hierarchy

```
Epic (Strategic initiative)
  └── Feature (Deliverable capability)
        └── Requirement (What needs to be built)
              └── Task (Individual work unit)
```

**Most of your daily work will be Tasks.**

---

## 2. Navigating DevOps

### Accessing Your Board

1. Go to https://dev.azure.com/SafariCircuitsLLC/Information%20Technology
2. Click **Boards** in the left navigation
3. Select **Boards** or **Backlogs** depending on your preference

### Switching Teams

If you're on multiple teams:
1. Click the team name in the upper-left (below the project name)
2. Select the team you want to view

### Board vs Backlog View

| View | Best For |
|------|----------|
| **Board** | Kanban-style view, drag-and-drop status changes |
| **Backlog** | List view, hierarchy navigation, bulk operations |
| **Sprints** | Iteration-based planning (if using sprints) |

---

## 3. Logging Work

### Creating a Task

1. Navigate to **Boards → Backlogs**
2. Find the parent Requirement (or create one if needed)
3. Click the **+** button next to the Requirement
4. Select **Task**
5. Fill in the required fields:

| Field | Description | Required |
|-------|-------------|----------|
| Title | Brief description of the work | Yes |
| Assigned To | Who's doing the work (usually yourself) | Yes |
| State | Current status (start with Proposed) | Yes |
| Area Path | Your team area | Yes |
| Iteration Path | Current iteration/sprint | Recommended |
| Original Estimate | Hours estimated | Recommended |
| Remaining Work | Hours remaining | Recommended |

### Quick Task Creation from Board

1. Go to **Boards → Board**
2. Click **+ New Item** in any column
3. Enter title and press Enter
4. Click the card to add details

---

## 4. Work Item States (CMMI Process)

### Task States

| State | Meaning | When to Use |
|-------|---------|-------------|
| **Proposed** | Work identified, not started | Initial state for new tasks |
| **Active** | Work in progress | When you start working |
| **Closed** | Work complete | When finished and verified |

### State Flow

```
Proposed → Active → Closed
```

### Updating State

1. Open the work item
2. Change the **State** dropdown
3. **Important:** When closing a Task, add a **Completion Summary** (required field)
4. Save

**Or from the Board:** Drag the card to the appropriate column.

---

## 5. Tracking Time

### Fields for Time Tracking

| Field | Purpose |
|-------|---------|
| **Original Estimate** | Initial hours estimate (set once) |
| **Remaining Work** | Hours left (update as you work) |
| **Completed Work** | Hours spent (auto-calculated or manual) |

### Best Practice

1. Set **Original Estimate** when creating the task
2. Update **Remaining Work** daily or when significant progress is made
3. The system calculates burndown from Remaining Work

---

## 6. Daily Workflow

### Morning

1. Open DevOps
2. Check your **Assigned to me** query or team board
3. Identify tasks for the day
4. Move tasks to **Active** as you start them

### During the Day

1. Update **Remaining Work** as you progress
2. Add **Discussion** comments for notable updates
3. Link related items if needed

### End of Day

1. Update **Remaining Work** on active tasks
2. Close completed tasks (add Completion Summary)
3. Move tasks back to Proposed if blocked

---

## 7. Linking Work

### Types of Links

| Link Type | Use Case |
|-----------|----------|
| **Parent/Child** | Task belongs to Requirement |
| **Related** | Items that reference each other |
| **Predecessor/Successor** | Dependencies |

### Linking to Code (Future)

When we integrate with GitHub:
- Commits linked via `#WorkItemID` in message
- PRs linked via `AB#WorkItemID` in description

---

## 8. Queries

### Finding Your Work

1. Go to **Boards → Queries**
2. Use **Assigned to me** for your tasks
3. Use **My Team** queries for team visibility

### Creating Custom Queries

1. **Boards → Queries → New Query**
2. Build filter conditions
3. Save to **My Queries** or **Shared Queries**

---

## 9. Tips and Best Practices

### Do

- Update work items daily
- Add meaningful titles that describe the work
- Link tasks to their parent Requirements
- Use Discussion for context and decisions
- Close tasks promptly when done

### Don't

- Leave tasks in Active indefinitely
- Create duplicate work items
- Skip the Completion Summary when closing
- Forget to update Remaining Work

### Task Title Conventions

Use action verbs:
- `Implement: [feature description]`
- `Fix: [bug description]`
- `Update: [what's being changed]`
- `Configure: [system/setting]`
- `Document: [topic]`

---

## 10. Getting Help

| Resource | How to Access |
|----------|---------------|
| DevOps Documentation | Click **?** in DevOps header |
| IT Team | Teams channel or email |
| This Guide | Ask for latest version |

---

## Appendix: Area Paths

| Area Path | Team |
|-----------|------|
| Information Technology\Software Engineering | Software Engineering |
| Information Technology\Data Services | Data Services |
| Information Technology\Infrastructure | Infrastructure Management |
| Information Technology\Cybersecurity | Cybersecurity |
| Information Technology\Help Desk | Help Desk and Support |

Make sure your work items use the correct Area Path for your team.

---

*Last updated: January 19, 2026*
