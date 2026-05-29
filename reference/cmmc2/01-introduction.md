# 1. Introduction

**CMMC2 Documentation** | Version 2026.04.30

**Pages:** 23-25

---

## Table of Contents

- 1.1 Executive Introduction
  - 1.1.1 Who This Guide Is For
  - 1.1.2 How to Use This Guide
  - 1.1.4 Relationship to the System Security Plan
  - 1.1.5 A Note on Versioning

---

1. Introduction
1.1 Executive Introduction
Every CMMC assessment begins with a question the assessor will not answer for
you: what is in scope?
For Defense Industrial Base (DIB) contractors, the moment a contract containing
DFARS 252.204-7012 is executed, the organization is legally bound to protect
Covered Defense Information (CDI). That obligation exists regardless of whether
the organization has completed a CMMC assessment or updated its System Security
Plan (SSP).
The defense industry does not suffer from a lack of compliance theory. What the
industry suffers from is a massive execution gap. Knowing that you need to "control
the flow of CUI" does not tell an IT Director how to configure Entra conditional
access policies, build a set of Intune configuration and compliance policies, deploy
Microsoft Purview sensitivity labels and DLP policies, or configure a secure
enclave of Azure Virtual Desktops.
Securing GCC High was written to close that gap. It is a practitioner-level
implementation reference for defense contractors deploying and hardening
Microsoft 365 in GCC High. It is organized around the same sequence a security
architect would follow in the field: establish the compliance boundary first, then
build identity, then devices, then data protection, then monitoring. Each phase
depends on the one before it.
1.1.1 Who This Guide Is For
This guide is not a high-level policy document; it is a deployable blueprint. It is
written specifically for:
• IT architects and security engineers responsible for designing or
validating a GCC High deployment against strict CMMC Level 2
requirements.
• Compliance officers and program managers who need to understand the
actual technical controls underlying their SSP.
• Managed Service Providers (MSPs) who support defense contractors and
Introduction
23

need a defensible, repeatable implementation reference to ensure their
clients survive an assessment.
1.1.2 How to Use This Guide
The guide follows a deliberate, architectural sequence. Skipping ahead is possible
but not recommended—controls in later phases assume that earlier phases are in
place. A Conditional Access policy that requires a compliant device is only
meaningful if devices are correctly enrolled and configured. Device enrollment is
only meaningful if the identity foundation is in place. Work in order.
Each chapter includes:
• Architecture guidance — the strategic "what to build and why."
• Implementation checklists — the exact configuration steps, scripts, and
XML/JSON payloads.
• CMMC / NIST control mapping — direct references connecting technical
configurations back to the Appendix A control matrix.
The Living Blueprint (Companion Repository)
Microsoft 365 GCC High and the CMMC regulatory landscape evolve
rapidly. Because hardcoded scripts and portal interfaces change, this
physical book is designed to work in tandem with our living digital
repository.
For the most up-to-date JSON payloads, KQL queries, Open Intune
Baseline (OIB) modifications, and continuous architectural updates from
our field deployments, access the companion site at docs.mindline.com.
A running list of what has changed since this edition went to print is
maintained at docs.mindline.com/docs/changelog.
A Note on Implementation: You hold the exact configurations required to build a
compliant enclave. However, implementing these controls—without bringing your
engineering, manufacturing, and business development workflows to a grinding
halt—is the true challenge of CMMC compliance.
If your organization requires hands-on engineering, architecture validation, or
strategic advisory to deploy this blueprint effectively without disrupting operations,
our team at Mindline specializes in exactly this. We bridge the gap between DoD
regulatory requirements and operational reality.
Securing Microsoft 365 in GCC High | 2026.04.30
24

1.1.3 Scope of This Guide
This guide covers Microsoft 365 GCC High and, where noted, commercial M365
tenants pursuing NIST SP 800-171 compliance. Where the two environments
diverge, content is explicitly separated and labeled for GCC High and
Commercial.
This guide does not cover:
• Classified environments (IL4, IL5, or higher).
• On-premises Active Directory or Exchange deployments not connected to
Entra ID.
• Non-Microsoft security tooling, except where it integrates directly with the
M365 stack.
1.1.4 Relationship to the System Security Plan
This guide is a technical implementation reference, not a System Security Plan. The
SSP is the organization's responsibility.
However, every chapter is structured to produce the exact artifacts and
configurations that your SSP must reference: data flow diagrams, asset inventories,
policy configurations, Conditional Access baselines, and audit log retention
settings. Working through this guide in order produces the technical reality that
your SSP describes.
1.1.5 A Note on Versioning
CMMC Level 2 controls in this guide reference NIST SP 800-171 Rev. 2, as
required by the CMMC Final Rule (32 CFR Part 170). Commercial environment
references use NIST SP 800-171 Rev. 3, which is the current published standard for
organizations not subject to CMMC. Where content is tabbed by environment, the
GCC High tab reflects Rev. 2 control identifiers and the Commercial tab reflects
Rev. 3. Microsoft 365 feature availability in GCC High frequently lags commercial
availability; all feature references and sovereign cloud endpoints have been verified
against GCC High at the time of publication.
Executive Introduction
25