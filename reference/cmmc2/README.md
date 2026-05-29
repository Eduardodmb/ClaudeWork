# Securing Microsoft 365 in GCC High - CMMC2

**Version:** 2026.04.30
**Extracted:** 2026-05-26
**Total Pages:** 810
**Source:** ACG CMMC Documentation

## Overview

Comprehensive guide for implementing CMMC Level 2 compliance using Microsoft 365 GCC High.

## Document Structure

### 1. Introduction
- **File:** [`01-introduction.md`](./01-introduction.md)
- **Pages:** 23-25

  **Key Topics:**
  - 1.1 Executive Introduction

### 2. Scoping
- **File:** [`02-scoping.md`](./02-scoping.md)
- **Pages:** 26-70

  **Key Topics:**
  - 2.1 CUI Data Flows & Business Applications
  - 2.2 People, Technology, and Processes
  - 2.3 External Service Provider Management
  - 2.4 Contractual Ingestion & LOB Strategy

### 3. Identity Architecture
- **File:** [`03-identity-architecture.md`](./03-identity-architecture.md)
- **Pages:** 71-341

  **Key Topics:**
  - 3.1 Sovereign Cloud Considerations
  - 3.2 Identity Foundation

### 5. Device Operations
- **File:** [`05-device-operations.md`](./05-device-operations.md)
- **Pages:** 342-488

  **Key Topics:**
  - 5.1 Modern Endpoint Operations
  - 5.3 Mobile Device Management & App Protection
  - 5.4 Open Intune Baseline Deployment
  - 5.7 Intune RBAC & Governance

### 6. Data Protection Architecture
- **File:** [`06-data-protection-architecture.md`](./06-data-protection-architecture.md)
- **Pages:** 489-613

  **Key Topics:**
  - 6.1 Data Protection Requirements
  - 6.3 Compliance Manager Assessment
  - 6.5 Structured Data Governance
  - 6.7 Sensitivity Labels
  - 6.8 Data Loss Prevention
  - 6.10 Information Protection Scanner

### 7. Microsoft 365 Security
- **File:** [`07-microsoft-365-security.md`](./07-microsoft-365-security.md)
- **Pages:** 614-678

### 8. Appendices
- **File:** [`08-appendices.md`](./08-appendices.md)
- **Pages:** 679-810

  **Key Topics:**
  - 8.1 Appendix A: Compliance Controls
  - 8.2 Appendix B: Intune Baseline Configurations
  - 8.3 AVD Deployment Runbook
  - 8.4 Appendix C: AVD Firewall Reference
  - 8.6 Appendix D: Licensing & Compliance Matrix


## Version Tracking

To compare with future versions:
```bash
# Extract new version to separate directory
# Then use git diff to compare
git diff --no-index cmmc2-2026-04/ cmmc2-2026-05/
```

## Usage

Each section is a standalone markdown file covering a major topic.
Use Obsidian, VS Code, or any markdown viewer for best experience.

