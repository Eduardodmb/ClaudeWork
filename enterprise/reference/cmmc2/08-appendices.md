# 8. Appendices

**CMMC2 Documentation** | Version 2026.04.30

**Pages:** 679-810

---

## Table of Contents

- 8.1 Appendix A: Compliance Controls
  - 8.1.1 CMMC Level 2 Controls
- 8.2 Appendix B: Intune Baseline Configurations
  - 8.2.1 Why this curation exists
  - 8.2.2 Defender for Endpoint (EDR) Onboarding
  - 8.2.3 Removable Media (Device Control)
  - 8.2.4 Exploit Protection
  - 8.2.21 Win - OIB - Compliance - U - Device Health - v3.1
- 8.3 AVD Deployment Runbook
  - 8.3.2 Tenant Device Settings
  - 8.3.4 Step 2: Deploy the Virtual Network
  - 8.3.5 Step 3: Create the User Defined Route
  - 8.3.8 Step 6: Create the AVD Host Pool
  - 8.3.9 Step 7: Assign Users to the Application Group
  - 8.3.12 Step 11: Validate
- 8.4 Appendix C: AVD Firewall Reference
  - 8.4.1 Rule Structure and Priority Model
  - 8.4.3 Network Rule Collections
  - 8.4.5 Firewall Troubleshooting KQL
  - 8.4.6 Update Procedure
  - 8.5.1 Deployment Parameters
  - 8.5.2 The 30-Day Commitment
  - 8.5.5 Prerequisites (Outside the 65-Hour Clock)
  - 8.5.10 Phase 4 — AVD Build
  - 8.5.12 Phase 6 — Firewall Tuning
  - 8.5.13 Phase 7 — CA Policy Enforcement
  - 8.5.15 Phase 9 — Documentation & Handoff
- 8.6 Appendix D: Licensing & Compliance Matrix
  - 8.6.1 G3 vs. G5 for CMMC Level 2
  - 8.6.2 E3 vs. E5 for NIST SP 800-171 Rev. 3
  - 8.6.3 Technical Comparison Reference

---

This preserves your ability to produce accurate evidence at the hot wash — the
dedicated post-session window for gap discussion — rather than burning a finding
on a question you could have answered correctly given preparation time.
8. Appendices
8.1 Appendix A: Compliance Controls
ENVIRONMENT: GCC HIGH
8.1.1 CMMC Level 2 Controls
THIS MATRIX MAPS TECHNICAL IMPLEMENTATION TO
MICROSOFT 365 CAPABILITIES. ADMINISTRATIVE CONTROLS
(POLICY, HR, PHYSICAL SECURITY) ARE NOTED WHERE
SPECIFIC MICROSOFT TECHNOLOGIES SUPPORT THEM.
AUTHOR'S NOTE ON NIST VERSIONS
You may notice that NIST has labeled SP 800-171 Rev 2 as
"Withdrawn" in favor of Rev 3. For CMMC Level 2 compliance,
Revision 2 remains the mandatory standard. The DoD's CMMC
Final Rule (32 CFR Part 170) specifically mandates Rev 2. All
technical configurations in this book — including Entra ID
Conditional Access and Intune Device Compliance — are designed to
meet the Rev 2 assessment objectives.
CMMC Practice Microsoft Technology Book Reference
ACCESS CONTROL
(AC)
Appendices
679

CMMC Practice Microsoft Technology Book Reference
AC.L2-3.1.1 (Authorized
Access)
Entra ID (Conditional
Access)
Conditional Access
Policies
AC.L2-3.1.2
(Transaction Recovery)
Entra ID (Logs), Purview
Audit
Audit Readiness
AC.L2-3.1.3 (CUI Flow
Control)
Teams (Private
Channels), Exchange
Secure Collaboration
AC.L2-3.1.5 (Least
Privilege)
Entra ID PIM (Just-in-
Time Access)
Access Governance
AC.L2-3.1.14 (Remote
Access)
Azure Virtual Desktop
(AVD Gateway as the
single managed remote
access point — no direct
RDP, no VPN required
for CUI access)
Scenario: Azure Virtual
Desktop
AC.L2-3.1.15 (Privileged
Remote Access)
Azure Virtual Desktop
(Virtual Machine
Administrator Login role
— restricts privileged
console access to named
admin accounts, logged
in Entra sign-in logs)
Scenario: Azure Virtual
Desktop
AC.L2-3.1.16 (Wireless
Access)
Intune (Wi-Fi Config
Profiles)
OIB Deployment — Wi-
Fi Configuration
AC.L2-3.1.18 (Mobile
Devices)
Intune (MAM/MDM) Mobile Device
Management & App
Protection
AWARENESS &
TRAINING (AT)
AT.L2-3.2.2 (Insider
Threat)
Defender for Office 365
(Simulations)
Threat Defense
AUDIT &
ACCOUNTABILITY
Securing Microsoft 365 in GCC High | 2026.04.30
680

CMMC Practice Microsoft Technology Book Reference
(AU)
AU.L2-3.3.1 (System
Auditing)
Microsoft Sentinel,
Purview Audit
SIEM Strategy
AU.L2-3.3.2 (User
Accountability)
Entra ID (Sign-in Logs) Identity Foundation
AU.L2-3.3.5 (Audit
Analysis)
Microsoft Sentinel
(Analytics Rules)
SIEM Strategy
AU.L2-3.3.7 (Audit
Retention)
Azure Storage
(Diagnostic Settings)
Audit Readiness
CONFIGURATION
MANAGEMENT (CM)
CM.L2-3.4.1 (Baseline
Config)
Intune (Device
Compliance Policies);
Entra ID device object
hygiene (accurate
inventory of managed
endpoints)
OIB Deployment, Entra
Device Hygiene
CM.L2-3.4.6 (Least
Functionality)
MDE Attack Surface
Reduction (ASR) Rules
— blocks execution of
unnecessary system
features and living-off-
the-land binaries
Defender for Endpoint
CM.L2-3.4.7
(Unauthorized Software)
Defender for Endpoint
(Software Inventory)
Threat Defense
CM.L2-3.4.9 (User-
Installed Software)
Intune (Endpoint
Privilege Management)
OIB Deployment
IDENTIFICATION &
AUTHENTICATION
(IA)
IA.L2-3.5.1 Entra ID (User Identity Foundation
Appendix A: Compliance Controls
681

CMMC Practice Microsoft Technology Book Reference
(Identification) Accounts)
IA.L2-3.5.3 (MFA) Entra ID (Conditional
Access)
Conditional Access
Policies
IA.L2-3.5.7 (Password
Complexity)
Entra ID (Password
Protection)
Identity Foundation
INCIDENT
RESPONSE (IR)
IR.L2-3.6.1 (Incident
Handling)
Microsoft Sentinel
(Incident Management);
MDE Incidents and
automated investigation
provide the response
workflow
SIEM Strategy, Defender
for Endpoint
IR.L2-3.6.2 (Incident
Reporting)
Defender XDR (Alerts);
MDE incident timeline
and audit log satisfy
documentation
requirements
Threat Defense,
Defender for Endpoint
MAINTENANCE (MA)
MA.L2-3.7.5 (Remote
Maintenance)
Azure Virtual Desktop
(Secure Admin
Workstations — Virtual
Machine Administrator
Login gated by phishing-
resistant CA)
Virtual Desktop Strategy,
Scenario: Azure Virtual
Desktop
MEDIA
PROTECTION (MP)
MP.L2-3.8.1 (Media
Protection)
BitLocker (Intune
Policy)
OIB Deployment
MP.L2-3.8.7 (Portable
Storage)
Defender for Endpoint
(Device Control)
Threat Defense
Securing Microsoft 365 in GCC High | 2026.04.30
682

CMMC Practice Microsoft Technology Book Reference
PERSONNEL
SECURITY (PS)
PS.L2-3.9.2 (Personnel
Termination)
Entra ID (Account
Disable/Revocation)
Identity Foundation
PHYSICAL
PROTECTION (PE)
PE.L2-3.10.1 (Physical
Access)
Azure Virtual Desktop
(CUI never touches end-
user hardware — users
see only a rendered
screen; data remains in
Azure Government
FedRAMP High
datacenters)
Virtual Desktop Strategy,
Scenario: Azure Virtual
Desktop
RISK ASSESSMENT
(RA)
RA.L2-3.11.2
(Vulnerability Scan)
Defender Vulnerability
Management
Threat Defense
SECURITY
ASSESSMENT (CA)
CA.L2-3.12.1 (Security
Controls)
Compliance Manager /
Secure Score
Audit Readiness
CA.L2-3.12.3
(Continuous Monitoring)
Microsoft Sentinel; MDE
Secure Score, device
health reports, and alert
pipeline provide
continuous monitoring
evidence
SIEM Strategy, Defender
for Endpoint
SYSTEM &
COMMUNICATIONS
(SC)
SC.L2-3.13.1 (Network Azure Firewall (deny-all AVD Firewall
Appendix A: Compliance Controls
683

CMMC Practice Microsoft Technology Book Reference
Boundary Monitoring) with explicit allow rules,
FQDN-based egress
control for AVD session
hosts)
Reference, Scenario:
Azure Virtual Desktop
SC.L2-3.13.5
(Subnetworks / No
Public Exposure)
Azure Virtual Desktop
(session hosts have no
public IPs; inbound via
AVD Gateway service
tag only; outbound via
Azure Firewall UDR)
Scenario: Azure Virtual
Desktop
SC.L2-3.13.8 (Data in
Transit)
TLS 1.2+ (Office 365
Defaults); AVD Gateway
enforces TLS on all RDP
sessions
Secure Collaboration,
Scenario: Azure Virtual
Desktop
SC.L2-3.13.11 (FIPS
Encryption)
Intune (BitLocker FIPS
Policy)
OIB Deployment
SC.L2-3.13.16 (Data at
Rest)
Purview Information
Protection (Encryption)
Sensitivity Labels
SYSTEM &
INFORMATION
INTEGRITY (SI)
SI.L2-3.14.1 (Flaw
Remediation)
Intune (Windows
Autopatch/Updates)
OIB Deployment
SI.L2-3.14.2 (Malicious
Code)
Defender Antivirus Threat Defense
SI.L2-3.14.4 (Malicious
Code Protection
Updates)
MDE platform and
signature updates
managed by Microsoft
— no separate update
infrastructure required
Defender for Endpoint
SI.L2-3.14.7 (Identify
Unauthorized Use)
MDE behavioral
analytics and anomaly
detection — surfaces
Defender for Endpoint
Securing Microsoft 365 in GCC High | 2026.04.30
684

CMMC Practice Microsoft Technology Book Reference
unexpected process
execution, lateral
movement, and data
exfiltration patterns
ENVIRONMENT: COMMERCIAL
8.1.2 NIST SP 800-171 Rev. 3 Controls
THIS MATRIX MAPS COMMERCIAL
MICROSOFT 365 CAPABILITIES TO
NIST SP 800-171 REV. 3 SECURITY
REQUIREMENTS. ORGANIZATIONS
MAY VOLUNTARILY ALIGN TO THIS
FRAMEWORK FOR STRUCTURED
SECURITY PROGRAM MANAGEMENT.
CONTROL IDENTIFIERS FOLLOW THE
REV. 3 NUMBERING; VERIFY AGAINST
NIST
SP
800-171
REV. 3
FOR THE
AUTHORITATIVE
TEXT.
NIST SP 800-171 Rev.
3 Requirement
Microsoft 365
Technology Book Reference
ACCESS CONTROL
(AC)
3.1.1 (Authorized
Access)
Entra ID (Conditional
Access)
Conditional Access
Policies
3.1.2 (Transaction
Recovery)
Entra ID (Logs), Purview
Audit
Audit Readiness
3.1.3 (Information Flow
Control)
Teams (Private
Channels), Exchange
Online
Secure Collaboration
Appendix A: Compliance Controls
685

NIST SP 800-171 Rev.
3 Requirement
Microsoft 365
Technology Book Reference
3.1.5 (Least Privilege) Entra ID PIM (Just-in-
Time Access)
Access Governance
3.1.14 (Remote Access) Azure Virtual Desktop or
Conditional Access with
compliant-device
requirement
Scenario: Azure Virtual
Desktop
3.1.15 (Privileged
Remote Access)
Entra PIM with phishing-
resistant MFA; Azure
Bastion or AVD Virtual
Machine Administrator
Login
Scenario: Azure Virtual
Desktop
3.1.16 (Wireless Access) Intune (Wi-Fi
Configuration Profiles)
OIB Deployment — Wi-
Fi Configuration
3.1.18 (Mobile Devices) Intune (MAM/MDM) Mobile Device
Management & App
Protection
AWARENESS &
TRAINING (AT)
3.2.2 (Insider Threat
Awareness)
Defender for Office 365
(Attack Simulation
Training)
Threat Defense
AUDIT &
ACCOUNTABILITY
(AU)
3.3.1 (System Auditing) Microsoft Sentinel,
Purview Audit
SIEM Strategy
3.3.2 (User
Accountability)
Entra ID (Sign-in Logs) Identity Foundation
3.3.5 (Audit Analysis) Microsoft Sentinel
(Analytics Rules)
SIEM Strategy
Securing Microsoft 365 in GCC High | 2026.04.30
686

NIST SP 800-171 Rev.
3 Requirement
Microsoft 365
Technology Book Reference
3.3.7 (Audit Retention) Azure Storage
(Diagnostic Settings)
Audit Readiness
CONFIGURATION
MANAGEMENT (CM)
3.4.1 (Baseline
Configuration)
Intune (Device
Compliance Policies)
OIB Deployment
3.4.6 (Least
Functionality)
MDE Attack Surface
Reduction (ASR) Rules
— blocks execution of
unnecessary system
features and living-off-
the-land binaries
Defender for Endpoint
3.4.7 (Unauthorized
Software)
Defender for Endpoint
(Software Inventory)
Threat Defense
3.4.9 (User-Installed
Software)
Intune (Endpoint
Privilege Management)
OIB Deployment
IDENTIFICATION &
AUTHENTICATION
(IA)
3.5.1 (Identification) Entra ID (User
Accounts)
Identity Foundation
3.5.3 (Multifactor
Authentication)
Entra ID (Conditional
Access)
Conditional Access
Policies
3.5.7 (Password
Complexity)
Entra ID (Password
Protection, banned-
password list)
Identity Foundation
3.5.12 (Replay-Resistant
Authentication)
Windows Hello for
Business (TPM-bound,
phishing-resistant
credential — added in
Rev. 3)
Phishing-Resistant
Authentication
Appendix A: Compliance Controls
687

NIST SP 800-171 Rev.
3 Requirement
Microsoft 365
Technology Book Reference
INCIDENT
RESPONSE (IR)
3.6.1 (Incident Handling) Microsoft Sentinel
(Incident Management);
MDE automated
investigation and
response
SIEM Strategy, Defender
for Endpoint
3.6.2 (Incident
Reporting)
Defender XDR (Alerts
and incident timeline)
Threat Defense,
Defender for Endpoint
MAINTENANCE (MA)
3.7.5 (Remote
Maintenance MFA)
Entra PIM with
Conditional Access
requiring phishing-
resistant MFA for
privileged remote
sessions
Identity Foundation
MEDIA
PROTECTION (MP)
3.8.1 (Media Protection) BitLocker (Intune
Policy)
OIB Deployment
3.8.7 (Portable Storage
Devices)
Defender for Endpoint
(Device Control)
Threat Defense
PERSONNEL
SECURITY (PS)
3.9.2 (Personnel
Termination)
Entra ID (Account
disable, token revocation,
access package removal)
Identity Foundation
PHYSICAL
PROTECTION (PE)
3.10.1 (Physical Access Microsoft Azure Virtual Desktop Strategy
Securing Microsoft 365 in GCC High | 2026.04.30
688

NIST SP 800-171 Rev.
3 Requirement
Microsoft 365
Technology Book Reference
to Systems) datacenter physical
controls (SOC 2 Type II,
ISO 27001 certified
facilities)
RISK ASSESSMENT
(RA)
3.11.2 (Vulnerability
Scanning)
Defender Vulnerability
Management
Threat Defense
SECURITY
ASSESSMENT (CA)
3.12.1 (Security Controls
Assessment)
Compliance Manager /
Secure Score
Audit Readiness
3.12.3 (Continuous
Monitoring)
Microsoft Sentinel; MDE
Secure Score and device
health reports
SIEM Strategy, Defender
for Endpoint
SYSTEM &
COMMUNICATIONS
PROTECTION (SC)
3.13.1 (Network
Boundary Protection)
Azure Firewall or NSG
with deny-all default;
FQDN-based egress
filtering for workloads
Threat Defense
3.13.5 (Subnetworks) Azure Virtual Network
with private endpoints;
no public IP exposure for
internal workloads
Scenario: Azure Virtual
Desktop
3.13.8 (Cryptographic
Protection in Transit)
TLS 1.2+ enforced by
Microsoft 365 defaults;
Conditional Access
blocks legacy
authentication
Secure Collaboration
Appendix A: Compliance Controls
689

NIST SP 800-171 Rev.
3 Requirement
Microsoft 365
Technology Book Reference
3.13.11 (FIPS
Cryptography)
Intune (BitLocker
AES-256, FIPS-validated
cryptographic module
policy)
OIB Deployment
3.13.16 (Confidentiality
at Rest)
Purview Information
Protection (sensitivity
label-based encryption)
Sensitivity Labels
SYSTEM &
INFORMATION
INTEGRITY (SI)
3.14.1 (Flaw
Remediation)
Intune (Windows Update
/ Autopatch rings)
OIB Deployment
3.14.2 (Malicious Code
Protection)
Microsoft Defender
Antivirus
Threat Defense
3.14.4 (Malicious Code
Updates)
MDE platform and
signature updates
managed by Microsoft
— no separate update
infrastructure required
Defender for Endpoint
3.14.7 (Identify
Unauthorized Use)
MDE behavioral
analytics and anomaly
detection — surfaces
unexpected process
execution, lateral
movement, and data
exfiltration patterns
Defender for Endpoint
8.2 Appendix B: Intune Baseline
Configurations
The following sections contain verbatim policy exports from the Open Intune
Baseline (OIB) project, adapted for GCC High deployments. Each policy is
Securing Microsoft 365 in GCC High | 2026.04.30
690

exported in Intune's native settings catalog format. These configurations satisfy the
device hardening requirements mapped in Chapter 10 and the CMMC control
matrix in Appendix A.
8.2.1 Why this curation exists
Readers often arrive at this appendix expecting a single Microsoft-published
"canonical Intune baseline for GCC High" they can download and deploy. No such
baseline exists. What exists is a tiered ecosystem of partial sources, each useful but
none turnkey for a GCC High CMMC Level 2 deployment. This appendix curates
one out of those sources so the book ships with a deployment-ready set rather than a
pointer to four incompatible ones.
Source What it covers Why it isn't the answer
on its own
Microsoft Security
Baselines (built into Intune
at Endpoint security →
Security baselines)
Windows, Microsoft
Defender for Endpoint,
M365 Apps for Enterprise,
Microsoft Edge
Available in GCC High but
commercial-flavored —
endpoint references inside
the baselines do not auto-
rewrite to sovereign
equivalents (*.usdomains,
USGov Azure suffixes, se
curity.microsoft.us).
Useful starting point, not
turnkey.
Microsoft STIG-audit
baseline for GCC High
Audits Windows device
configuration against DISA
STIG recommendations
Listed on the Microsoft
Intune In development for
Intune page. Audit-only,
not configuration —
reports compliance, does
not enforce it.
Open Intune Baseline
(OIB) at
openintunebaseline.com
Comprehensive, MECE-
organized policy set
covering Endpoint
Security, Configuration,
Compliance, Apps, and
Platform Scripts
Community-maintained
and commercial-targeted
by default. GCC High
deployment requires
manual substitution of
sovereign endpoints
throughout. The OIB
maintainer publishes GCC
High compatibility
commentary but does not
maintain a separate
Appendix B: Intune Baseline Configurations
691

Source What it covers Why it isn't the answer
on its own
sovereign branch.
CISA SCuBA (Secure
Cloud Business
Applications) baselines
Service-side M365
configuration for Entra,
Exchange, SharePoint,
Teams, Power Platform,
Defender. Maps to
FedRAMP and CMMC.
Mostly M365 service
configuration, not Intune
device policy. Limited
overlap with what this
appendix covers.
DISA STIGs at
public.cyber.mil/stigs
Federal Defense hardening
baselines as JSON/XCCDF
DoD-flavored, calibrated
for higher-side defense
networks. A different
baseline philosophy than
OIB — designed for
classified-network
hardening rather than
CMMC L2 commercial-
defense supply chain.
Some sections are Intune-
importable.
The de facto canonical baseline for a GCC High CMMC Level 2 deployment is
OIB + sovereign endpoint substitutions + CMMC control mappings + MDE
Security Settings Management considerations + server-specific tuning. That is
what this appendix produces, exported in Intune-native format and organized to
import directly. If Microsoft publishes a sovereign-cloud configuration baseline
(versus the audit-only STIG baseline currently in development), this appendix will
adopt it as the upstream and document the deltas rather than curating from scratch.
8.2.1 Defender for Endpoint (EDR) Onboarding
CMMC Control Mapping Matrix
Because EDR onboarding is tied directly to your specific tenant's Microsoft Graph
connector, it cannot be imported via an OIB JSON file. It must be created manually.
8.2.1.1 Step 1: Enable the Connection in Defender
First, you have to tell Defender to allow Intune to talk to it.
1. Open a new tab and log in to your Microsoft Defender portal (security.m
Securing Microsoft 365 in GCC High | 2026.04.30
692

icrosoft.usfor GCC High, security.microsoft.comfor
Commercial).
2. In the left-hand navigation pane, scroll down and click Settings, then select
Endpoints.
3. Under the General section on the left menu, click Advanced features.
4. Scroll down the list of features until you find Microsoft Intune connection
.
5. Toggle this setting to On.
6. Click Save preferences at the bottom of the page.
8.2.1.2 Step 2: Enable the Connection in Intune
Now you need to flip the switches on the Intune side.
1. Return to the Intune tab (Endpoint security > Microsoft Defender for
Endpoint).
2. Click the Refresh button at the top of the page. The connection status
should change from "Unavailable" to "Available" or "Enabled".
3. The blue information banner and the grayed-out settings will disappear,
revealing the connector toggles.
4. Under MDM Compliance Policy Settings, turn on: Connect Windows
devices version 10.0.15063 and above to Microsoft Defender for
Endpoint.
5. (Optional but Recommended): Turn on Block unsupported OS versions if
it is an option.
6. Click Save at the top.
8.2.1.3 Step 3: Enable the Connection in Intune
1. Log in to the Intune Admin Center.
2. Navigate to Endpoint Security > Endpoint detection and response.
3. Click Create Profile.
4. Select Platform: Windows.
5. Select Profile: Endpoint detection and response, then click Create.
6. Name the profile Win - Custom - ES - Defender for Endpoint Onb
oarding.
7. In the Configuration settings step, configure the following:
◦ Microsoft Defender for Endpoint client configuration package
type: Select Auto from connector (labeled Onboard from
connector in some UI versions). This lets Intune pull the
onboarding blob directly from the MDE–Intune connector enabled
in Steps 1 and 2, so the package stays current if Microsoft rotates
the onboarding payload. Pick plain Onboard only if the connector
Appendix B: Intune Baseline Configurations
693

is unavailable — and if so, fix the connector first rather than
pasting a manual blob that will drift out of date.
◦ Sample Sharing: Select None (Recommended for CMMC to
prevent inadvertent CUI leakage to Microsoft).
◦ [Deprecated] Telemetry Reporting Frequency: Leave as Not
configured (Crucial for GCC High to prevent constant error
states).
8. Click Review + save and assign to your deployment rings.
8.2.1 Removable Media (Device Control)
CMMC Control Mapping Matrix
This appendix walks through the modern Intune Reusable Settings UI for Device
Control. For the threat model and the underlying XML rule format that Intune
generates from your form input, see Open Intune Baseline Deployment § USB
Device Control & SOC Alerting. Together, the chapter and this appendix cover the
full flow: Intune defines what's blocked and allowed, Defender for Endpoint
provides the SOC alert when an unapproved device is plugged in.
The implementation has two parts:
1. Reusable Settings — one identifying the broad class the rule applies to (all
removable storage), one identifying your approved hardware (the allowlist).
Built once per organization, referenced by every Device Control policy.
2. A Device Control policy that blocks all removable storage write/execute
access except for the allowlist, with AuditDeniedactions to surface alerts
to Defender.
8.2.1.1 Pick the matching pattern before you start
A Reusable Setting is a tenant-level identifier list — a named bucket of hardware
identifiers. By itself it doesn't enforce anything or bind to any user or device. The
enforcement happens at the Device Control policy entry (Allow / Deny /
AuditDeny), and per-user or per-group binding happens via a SID condition on that
entry. Three patterns are common; pick the one that matches your operational
model before you start clicking.
Pattern 1: Class allowlist (loosest)
One Reusable Setting for the entire organization, identifying an approved vendor
and model. Any individual drive of that vendor/model is accepted, on any device,
by any signed-in user.
Securing Microsoft 365 in GCC High | 2026.04.30
694

Reusable Setting name Filter fields Resulting scope
Approved SanDisk Ultr
a USB 3.0
VID_PIDonly Any SanDisk Ultra USB
3.0 on any tenant device
Use when: the organization buys USBs in bulk for general workforce use and a
vendor-line allowlist is sufficient (e.g., commercial environments, low-sensitivity
data).
Don't use when: you're handling CUI. A user buying their own SanDisk Ultra at
Best Buy and plugging it in defeats this control — there's no per-individual-drive
audit trail and no proof that the drive came through your issuance process.
Pattern 2: Per-drive pool, scoped to an Entra security group
A pool of physically-issued drives — each identified individually by vendor/model
+ serial — usable by any signed-in member of a named Entra ID security group.
The pool inventory lives in N Reusable Settings (one per pool drive, each with VI
D_PID+ SerialNumberId, Match all); the user-group binding lives on the Allow
rule's entry Sid field, set to the group's Entra Object ID.
Reusable Setting
name (one per
pool drive)
Filter fields On the Allow
rule's entry Resulting scope
Pool USB — SanD
isk Ultra 32GB
SN BM2408002394
4
VID_PID+ Serial
NumberId, Match
all
Sid= Entra
security group
Object ID (e.g., USB
Users)
Each pool drive
works on any
tenant device, but
only when a USB U
sersmember is
signed in
The mechanism is the entry's Sidfield, which accepts an Entra group's Object ID
identically to a user's Object ID — see Device control policies → Entries ("For
user groups and users that are stored in Microsoft Entra ID, use the object id in the
condition") and the device control walkthroughs → "Allow different levels of
access to devices for specific users or groups" ("Device control also supports group
SIDs… the rules are the same for User 2 or any other user in that group"). One Sid
per entry — a single rule scopes to exactly one group; layered access (e.g., one
group read-only, another read/write) requires multiple entries.
Use when: a defined population of users (a CUI-handling team, a research
Appendix B: Intune Baseline Configurations
695

subgroup, an engineering subset) shares a pool of company-issued drives. Drive
churn and user churn are decoupled: adding a drive = one new Reusable Setting
plus an update to the Allow rule's Included Devices; onboarding/offboarding a user
= one Entra group edit. The drive-to-user assignment for a given session is recorded
in your asset register or sign-out ledger rather than the policy itself.
Don't use when: your CMMC media-protection (MP.L2-3.8.x) evidence requires
the per-issuance drive-to-user binding to live in the policy itself rather than in an
out-of-band ledger. Some C3PAOs accept a sign-out log as equivalent evidence;
some don't. When in doubt, default to Pattern 3. Microsoft also notes that user/
group conditions referencing Entra ID should only be used in environments with
reliable Entra ID connectivity — generally fine for GCC High, but the SID
resolution path depends on a reachable Entra endpoint at sign-in.
Scale ceiling: Intune caps a Device Control profile at 100 reusable groups per
profile, so one policy holds up to ~100 pool drives. For larger pools, split into
multiple policies assigned to the same device groups.
Pattern 3: Per-drive bound to a specific user (strongest)
One Reusable Setting per drive AND a SID condition on the Allow rule's entry that
references it. The drive only works when the named user is signed in.
Reusable Setting
name Filter fields On the Allow
rule's entry Resulting scope
SanDisk Ultra 3
2GB — Alice Coh
en — issued 202
6-04-28
VID_PID+ Serial
NumberId, Match
all
SID condition
matching Alice's
Entra ID Object ID
This specific drive,
on any tenant
device, but only
when Alice is
signed in
The user name and date in the Reusable Setting name are labels for your audit
trail — Intune doesn't read them. They're there so a future operator looking at a list
of 50 Reusable Settings can tell which physical drive belongs to whom and when it
was issued.
Use when: handling CUI with cleared-personnel media issuance, and your assessor
expects the per-issuance binding to be visible in the policy itself. This is the
strongest audit trail. Pairs naturally with a written issuance log in your asset-
management system.
Don't use when: the user population is in the hundreds and a Reusable Setting +
Securing Microsoft 365 in GCC High | 2026.04.30
696

entry update per issuance becomes operationally untenable. Drop to Pattern 2 in that
case and treat the asset-management system's issuance log as the user-to-drive
mapping.
Recommendation for CMMC L2
For CUI-handling drives, the choice is between Pattern 2 (pool + group, with an
out-of-band sign-out ledger as the per-issuance audit trail) and Pattern 3 (per-drive
bound to one named user, with the binding in the policy itself). Pattern 2 is
operationally lighter and decouples drive churn from user churn; Pattern 3 produces
the strongest per-issuance evidence — drive identity, user identity, and issuance
date all visible in the policy — at the cost of a Reusable Setting + entry edit per
issuance event.
Pattern 1 is appropriate only for data that is explicitly out of scope for CMMC.
The walkthrough in Step 1 below populates the same Reusable Setting fields for
Patterns 2 and 3 — VID_PID+ SerialNumberIdwith Match all. What differs is
operational: the Reusable Setting Name convention, how many Reusable Settings
you create, and what goes on the Allow rule's entry Sid field. Pattern 1 fills only VI
D_PID; the rest of the procedure is identical.
8.2.1.2 Step 1: Create the Reusable Setting (the allowlist)
1. Navigate to Endpoint Security → Attack Surface Reduction →
Reusable Settings → Add.
2. Basics tab:
◦ Name: Custom - Device Control - Approved <Vendor> USB
s(e.g., Custom - Device Control - Approved SanDisk Ultr
a USB 3.0).
◦ Description: include the date, approved vendor and model, and the
device-issuance owner team.
3. Configuration settings tab:
◦ Expand the Device Control group, click Add, and choose
Removable storage as the Object type.
◦ Match type: for Patterns 2 and 3 (per-drive identification), set to
Match all so every populated identifier must match. For Pattern 1
(class allowlist) only VID_PIDis populated, so Match any vs
Match all is moot — leave at the default.
◦ The row Intune just added will show a yellow ⚠ "Configure
settings" link. Click it; the Configure removable storage instance
panel opens on the right.
4. In the right-hand panel, populate the fields determined by the pattern you
Appendix B: Intune Baseline Configurations
697

chose above — VID_PIDonly for Pattern 1, VID_PID+ SerialNumberId
for Patterns 2 and 3. Leave the remaining fields blank unless your reference
device's USB descriptor is non-standard and VID_PIDdoesn't uniquely
identify it (see "Where to find the values" below).
For Pattern 2 (pool with group binding), repeat Step 1 once per drive in the pool —
each pool drive gets its own Reusable Setting. The pool inventory is the list of these
Reusable Settings; in Step 3 below, all of them are referenced from the Allow rule's
Included Devices, and the group SID lives on the Allow rule's entry.
Field reference for the Configure removable storage instance panel
Examples below assume Pattern 3 (per-drive, bound to a specific user — the
strongest audit trail) and use a real SanDisk Ultra USB 3.0 32 GB drive (model
SDCZ48-032G, printed serial BM24080023944) issued to a hypothetical Alice
Cohen. Note that the Windows-enumerated serial bears no resemblance to the
printed serial — see the warning below the table. Replace these values with what
your own reference device actually reports — the format is what matters.
Field What it matches When to use it Example value
(Pattern 3)
Name (required) Friendly label
inside the Reusable
Setting only — not
used for matching.
Pattern 1: vendor/
model. Pattern 2: P
ool USB —prefix
+ vendor/model +
printed drive serial.
Pattern 3: vendor/
model + user +
issuance date +
printed drive serial
Always SanDisk Ultra 3
2GB — Alice Coh
en — issued 202
6-04-28 — print
ed SN BM2408002
3944
VID_PID Combined Vendor
ID + Product ID,
format VVVV_PPPP
(with underscore).
Wildcards
supported: _PPPP
matches any
vendor's PID, VVV
V_matches any
All three patterns.
Identifies the model
line from one
vendor
0781_5581
Securing Microsoft 365 in GCC High | 2026.04.30
698

Field What it matches When to use it Example value
(Pattern 3)
product from one
vendor
SerialNumberId The specific
device's serial
number as
enumerated by
Windows (the
trailing segment of
the device instance
path, after the
second \). Read
the warning below
— this is often not
the serial printed
on the device
label.
Patterns 2 and 3 —
pins the rule to one
physical drive
090161F88D8B340
9C34C61DDA02006
26A2A8843694973
47CAE0D2ECAC687
71998BBC0000000
0000000000000CE
312D0E00862C208
15581078A30C705
InstancePathId Full Windows
device instance
path: {BusId}\{De
viceId}\{Serial
NumberId}.
Wildcards
supported
(recommended —
append *to handle
the trailing slot
indicator)
Rarely used
directly — Serial
NumberIdis more
specific and VID_P
IDis more general
USB\VID_0781&PI
D_5581\090161F8
8D8B3409*
VID Vendor ID alone (4
hex chars)
Approve every
device from a
specific vendor
(broader than
VID_PID; not
usually appropriate
for CMMC)
0781
PID Product ID alone Rarely useful on its
own — pair with
VID for model-line
matching
5581
PrimaryId Microsoft's primary Class-level RemovableMediaD
Appendix B: Intune Baseline Configurations
699

Field What it matches When to use it Example value
(Pattern 3)
device-class
identifier
matching (e.g., any
removable storage
device)
evices
DeviceId The middle
segment of the
device instance
path — vendor/
product/revision
string. Format
varies by
manufacturer;
SanDisk Ultra
reports Disk_US
B_____SanDis
k_3.2Gen1while
generic flash drives
report USBSTOR\DI
SK&VEN_…&PRO
D_…&REV_…form
Filter by USB
device class
without binding to
a specific VID/PID
hex pair
USBSTOR\Disk_US
B_____SanDis
k_3.2Gen1
HardwareId Vendor/product
hardware ID string
from Device
Manager (top of the
Hardware Ids list,
including revision
suffix). Format
varies by
manufacturer
Equivalent to
DeviceId for most
flash drives. Note:
HardwareId values
aren't unique —
different physical
devices can share
the same string
USBSTOR\Disk_US
B_____SanDis
k_3.2Gen11.00
FriendlyNameId The user-visible
name Windows
reports for the
device
Useful for
matching devices
Windows tags as
"Generic Mass
Storage" or vendor-
named generics
SanDisk 3.2Gen1
USB Device
BusId Physical bus
interface
Filter by interface
— USB, SD, 1394
USB
Securing Microsoft 365 in GCC High | 2026.04.30
700

Field What it matches When to use it Example value
(Pattern 3)
(FireWire)
Appendix B: Intune Baseline Configurations
701

LONG WINDOWS-ENUMERATED SERIALS — VERIFY CROSS-
MACHINE BEFORE COMMITTING TO PATTERNS 2 OR 3
Some USB descriptors expose unusually long composite serial numbers —
100+ hexadecimal characters — that look synthetic but are real, captured
from the drive's USB descriptor. This is common on drives with hardware-
attestation features, IEEE 1667 silos, or certain SanDisk Ultra firmware
revisions. The SerialNumberIdexample above is one such case: a real
SanDisk Ultra USB 3.0 32 GB drive whose casing prints BM24080023944
reports a ~130-character hex string to Windows, completely unrelated to
the printed label.
When you encounter a long enumerated serial, three things to do:
1. Verify the serial is per-drive, not per-machine. Plug the same
drive into a second Windows machine and read the device instance
path's trailing segment again. If it matches the first machine, the
serial is the drive's identity and Patterns 2 and 3 work. If it differs,
Windows is synthesizing the serial per-bus — fall back to a class-
or hardware-ID match using HardwareIdinstead of SerialNumbe
rId, accepting that you've lost per-drive specificity.
2. Don't type or hand-transcribe the serial. A 130-character hex
string is impossible to type accurately, and even careful copy-paste
can lose characters at the edges or normalize whitespace. Always
copy directly from Device Manager → Properties → Details →
Device instance path → right-click → Copy. The Intune Reusable
Setting SerialNumberIdfield accepts the full string verbatim.
3. Embed the printed (label) serial in the Reusable Setting Name
so audit logs cross-reference cleanly. Future operators looking at a
Defender event or an Intune policy report will see only the long
Windows-enumerated serial; the Name field is the only place to
record the human-readable label that ties back to your asset
register. Suggested format: <Vendor> <Model> — <user> — iss
ued <date> — printed SN <label-serial>.
This isn't a bug or a misconfiguration. It's how some firmwares and some
drive families expose themselves to Windows. Always trust the
InstancePathId trailing segment — that's what Intune Device Control
matches against, and it's what Defender Advanced Hunting events report.
The printed label serves only as a human-readable cross-reference in your
operational records.
Securing Microsoft 365 in GCC High | 2026.04.30
702

Practical guidance
Which fields to populate depends on which of the three patterns you've chosen — V
ID_PIDonly for Pattern 1, VID_PID+ SerialNumberId(with Match all) for
Patterns 2 and 3. The remaining fields below (InstancePathId, DeviceId, Hardw
areId, FriendlyNameId, BusId) are alternative or additional matchers — populate
them when your reference device exposes a non-standard USB descriptor and VI
D_PIDalone doesn't uniquely identify it (see "Where to find the values" below).
• Where to find the values for any specific device:
1. Plug the approved device into a Windows reference workstation.
2. Open Device Manager → Disk drives (for USB flash drives) or
Universal Serial Bus controllers (for non-storage USB
peripherals).
3. Right-click the device → Properties → Details tab.
4. From the Property dropdown, select each of the following — what
Device Manager shows maps directly to the Intune fields:
Device Manager Property value Maps to Intune field
Hardware Ids (USB\VID_0781&PID_5
581...)
First line gives VID(0781), PID(558
1), and the underscore-joined VID_PI
D(0781_5581)
Hardware Ids (USBSTOR\DiskSanDis
k_Ultra...style line)
HardwareId
Device instance path (USB\VID_078
1&PID_5581\BM24080023944)
Whole string → InstancePathId.
Trailing segment after the last \→ Se
rialNumberId. Middle segment → D
eviceId. First segment (USB, USBSTO
R) → BusId.
Friendly name FriendlyNameId
Don't trust the printed serial number on the device label. Windows
enumerates the serial via the device's USB descriptor; some manufacturers
print a different SKU/lot code. Always confirm via the Device instance
path's trailing segment.
5. Click OK to close the side panel, then Next through any remaining tabs,
then Review + create.
Appendix B: Intune Baseline Configurations
703

8.2.1.3 Step 2: Create the class-level "all removable storage"
Reusable Setting
The per-drive Reusable Setting from Step 1 identifies your approved hardware. The
Device Control rule in Step 3 also needs a Reusable Setting that identifies the broad
set the rule applies to — i.e., "all removable storage devices." This is what goes in
the rule's Included Devices field, while the per-drive allowlist from Step 1 goes in
Excluded Devices. Without this class-level setting, the rule has no scope.
You only need to create this one once per tenant; it's reused by every Device
Control policy.
1. Repeat the navigation from Step 1: Endpoint Security → Attack Surface
Reduction → Reusable Settings → Add.
2. Basics tab:
◦ Name: Custom - Device Control - All Removable Media
(class)
◦ Description: Class-level identifier matching all remova
ble storage devices. Referenced by Device Control rul
es' Included Devices field. Pair with per-drive allow
lists in Excluded Devices.
3. Configuration settings tab:
◦ Expand Device Control, click Add, choose Removable storage as
the Object type.
◦ Match type: Match any.
◦ Click Configure settings in the row.
4. In the Configure removable storage instance panel, populate only the
Name and PrimaryId fields:
◦ Name: All RemovableMediaDevices (class)
◦ PrimaryId: RemovableMediaDevices
Leave every other field blank. PrimaryId is Microsoft's class-level identifier
— RemovableMediaDevicesmatches every USB flash drive, SD card, and
similar removable storage media regardless of vendor, model, or serial.
5. Click OK → Next → Review + create.
You now have two Reusable Settings: the per-drive allowlist from Step 1, and this
Securing Microsoft 365 in GCC High | 2026.04.30
704

class-level "all removable storage" set. Step 3 references both.
8.2.1.4 Step 3: Create the Device Control policy
1. Return to Endpoint Security → Attack Surface Reduction and click
Create Policy.
2. Platform: Windows. (Currently the only option — Microsoft's docs note
that Device Control isn't supported on Windows Server even though "This
policy applies to" wording shows it.)
3. Profile: Device Control. Do not select "Attack Surface Reduction
Rules" — that's a sibling profile type for ASR rules (Office macro blocks,
credential stealing, etc.) and won't expose the Device Control category you
need to reference your Reusable Setting. Click Create.
4. Basics tab:
◦ Name: Win - Custom - ES - Device Control / Removable
Media
◦ Description: Blocks all removable media except allowed
USB drives used by approved users.
5. Configuration settings tab. The Device Control wizard exposes several
categories — Defender, Device Control, Device Installation Rest
rictions, Removable Storage Access, and others. For an MDE-
managed allowlist using Reusable Settings, you'll work in two of them:
1. Expand the Defendercategory and set Device Control Enabled
to Enabled. Without this, the rules in the Device Control
category won't take effect on managed devices.
2. Expand the Device Controlcategory. This is where the rule
rows live. The pattern is two rules: one that blocks all removable
storage for everyone, and a second that allows your approved
drives — scoped (via the Allow entry's Sid) to the right user,
group, or "everyone," depending on the pattern you chose. This is
the Block-then-Allow pattern Microsoft documents in the device
control walkthroughs. Don't put approved drives in Excluded
Devices on the Block rule — Excluded Devices removes a drive
from a rule's scope for every signed-in user, defeating any per-user
or per-group binding. The carve-out lives in a second rule whose
Allow entry's Sidscopes who is allowed.
Appendix B: Intune Baseline Configurations
705

Rule A: Block all removable storage (applies to everyone)
3. Click + Add under the ID section to create the first rule row. The
row has five columns: Name, Included Devices, Excluded Devices,
Access, plus a checkbox.
4. Name (free-form text, required): This name appears in toast
notifications shown to end users when their USB attempt is
blocked, and in Defender Advanced Hunting RemovableStorag
ePolicyTriggeredevents. Suggested: Block removable stora
ge — all users.
5. Included Devices: click + Set reusable settings → select the
class-level Reusable Setting from Step 2 (PrimaryId = Removabl
eMediaDevices). Click OK.
6. Excluded Devices: leave empty for all three patterns. The
approved-drive carve-out lives in Rule B, not here.
7. Access: click the cell labeled Configure access(truncated as Co
nfigure insta...in narrow column widths, with a yellow ⚠
until you complete it). The Configure Access panel opens,
showing a row table with columns Type / Options / Access mask /
Sid / Computer ID. Two Entries are required — one for
enforcement, one for audit. Both leave Sidempty so the rule
applies to everyone.
Entry 1 — Deny:
Column Value Notes
Type Deny The action
Options None Dropdown is Type-
aware. For Denyit
shows two choices: N
one(= no override;
any AuditDenied
entry you add will
fire normally) and Di
sable(= suppress
any matching
AuditDenied entry
— block silently
Securing Microsoft 365 in GCC High | 2026.04.30
706

Column Value Notes
with no toast and no
Defender event).
Leave at Noneso the
AuditDenied entry
below can generate
the SOC alert. Disab
lewould defeat the
audit pipeline you're
building.
Access mask Open the dropdown
— check all 7 boxes
(Read, Write,
Execute, File read,
File write, File
execute, Print). The
cell will read "7
selected" when
closed
Print is technically
irrelevant for storage
devices (it's a no-op),
but checking it
makes the rule
maximally simple
and deferential to
"block everything."
No downside
Sid Empty Per-user/per-group
scoping lives on Rule
B's Allow entry. A
Sid here would scope
the deny to specific
users — leaving
everyone else
unrestricted, the
inverse of "block
everyone."
Computer ID Empty Per-device targeting
is handled at the
policy assignment
layer, not here
Click + Add at the top of the Configure Access panel to add a
second row.
Entry 2 — AuditDenied:
Appendix B: Intune Baseline Configurations
707

Column Value Notes
Type AuditDenied When you change
Type from Denyto A
uditDenied, the
Options dropdown
refreshes to show the
audit-specific
choices
Options Send notificatio
n and event
The dropdown for Au
ditDeniedshows
four choices —
typically None, Send
notification, Sen
d event, Send not
ification and ev
ent(UI labels; the
underlying integer
values are 0/1/2/3 per
Microsoft's reference
docs). The fourth
option (= integer
value 3) is what
makes the toast
appear AND fires the
RemovableStorage
PolicyTriggered
event in Defender
Advanced Hunting
that drives your SOC
alert
Access mask Same as Entry 1 —
all 7 boxes checked.
The cell will read "7
selected"
Match the Deny
entry exactly —
every blocked
operation gets
audited. Mismatch
between Deny and
AuditDenied access
masks would
produce blocks that
don't get audited,
defeating the SOC
pipeline
Sid Empty Match the Deny
Securing Microsoft 365 in GCC High | 2026.04.30
708

Column Value Notes
entry; both Rule A
entries apply to
everyone
Computer ID Empty Same as Entry 1
Without an AuditDenied entry, the SOC alerting in Step 4 will
not fire — the Defender custom detection rule listens for Removab
leStoragePolicyVerdict == "Deny"events, and those events
come from AuditDenied entries, not from Deny entries directly.
The Nonevalue on the Deny entry's Options dropdown is
permissive (lets the AuditDenied fire) — it does not mean "no
audit needed."
Click Save to close the Configure Access panel. The yellow ⚠ on
the Access cell will clear.
Rule B: Allow approved drives (scoped to the right user/group)
8. Click + Add under the ID section again to create a second rule
row.
9. Name (free-form text, required): Suggested format: Allow remova
ble storage — <scope>. Examples — Pattern 1: Allow approv
ed removable storage — all users. Pattern 2: Allow approv
ed removable storage — USB Users. Pattern 3: Allow approv
ed removable storage — Alice Cohen.
10. Included Devices: click + Set reusable settings → select your
per-drive allowlist Reusable Setting(s) from Step 1. Click OK.
▪ Pattern 1 (class allowlist): the one vendor/model Reusable
Setting.
▪ Pattern 2 (pool + group): all N pool-drive Reusable
Settings.
▪ Pattern 3 (per-user): the one Reusable Setting for that user
× drive issuance (e.g., SanDisk Ultra 32GB — Alice C
ohen — issued 2026-04-28 — printed SN BM240800
23944).
Appendix B: Intune Baseline Configurations
709

11. Excluded Devices: leave empty.
12. Access: click Configure access. For Patterns 2 and 3, two
Entries are required — one to grant access, one to audit it.
Pattern 1 (no per-user binding, out-of-CMMC-scope data) can skip
the AuditAllowed entry; Patterns 2 and 3 cannot, because NIST
800-171 3.3.2 (uniquely trace actions to users) requires a system-
of-record audit of who used which drive when, not just an out-of-
band sign-out ledger.
Entry 1 — Allow:
Column Value Notes
Type Allow Allow has the
highest precedence
— when a drive
matches both Rule
A's Deny and Rule
B's Allow, and the
user matches the
Allow's Sid, Allow
wins for that user.
Users who don't
match the Sidfall
through to Rule A's
Deny.
Options None Standard for Allow
Access mask Open the dropdown
— check all 7 boxes.
The cell will read "7
selected"
Full read/write/
execute access on
approved drives. For
tighter restrictions
(e.g., read-only
access for a specific
group), check only
the read bits
Sid Patterns 2 and 3
user/group binding
lives here. Paste an
Entra Object ID (a
GUID, e.g., 1234567
8-1234-1234-123
4-123456789012).
Microsoft accepts an
Entra group Object
ID identically to a
user Object ID; both
map to the same <Si
d>element on the
entry
Securing Microsoft 365 in GCC High | 2026.04.30
710

Column Value Notes
For Pattern 2, this is
the security group's
Object ID — Entra
→ Groups →
<group> → Object
ID. For Pattern 3,
this is the user's
Object ID — Entra
→ Users → <user>
→ Object ID. Empty
for Pattern 1 —
every signed-in user
gets Allow on
approved drives
Computer ID Empty Per-device targeting
is handled at the
policy assignment
layer, not here
Click + Add at the top of the Configure Access panel to add a
second row.
Entry 2 — AuditAllowed: (required for Patterns 2 and 3; skip for
Pattern 1)
Column Value Notes
Type AuditAllowed Generates a Removab
leStoragePolicyT
riggeredevent with
RemovableStorage
PolicyVerdict ==
"Allow"for every
approved-drive
access — the system-
of-record evidence
CMMC 3.3.2
expects, and the
input for Pattern 2's
sign-out-ledger
reconciliation
Appendix B: Intune Baseline Configurations
711

Column Value Notes
Options Send event Same four choices as
AuditDenied (None,
Send notificatio
n, Send event, Sen
d notification a
nd event). Send ev
entis the audit-only
choice — produces
the Defender event
without a user-facing
toast. Use Send not
ification and ev
entonly if you want
users to see
"approved drive in
use" toasts on every
access (most
operations don't)
Access mask Same 7 boxes as
Entry 1
Match the Allow
entry so every
authorized operation
gets audited. If event
volume becomes a
real problem (large
user pool with heavy
file-copy workloads,
not a hypothetical
concern), narrow the
mask to just file-
write — preserves
the per-write
evidence trail and
drops the per-read
noise. Decide after
measuring, not pre-
emptively
Sid Same Entra Object
ID as Entry 1
Mismatched Sid
would produce gaps
where one user is
allowed but
unaudited (or vice
versa) — defeating
3.3.2 traceability
Securing Microsoft 365 in GCC High | 2026.04.30
712

Column Value Notes
Computer ID Empty Same as Entry 1
Click Save to close the Configure Access panel.
13. (Optional) Layered access — different groups, different access
masks (e.g., one group full read/write, another read-only) —
requires its own additional Allow rule with its own Sid.
Microsoft's device control walkthroughs show the canonical multi-
tier example.
XML IMPORT IS THE ALTERNATIVE FOR ADVANCED
POLICIES
For multi-rule policies, complex condition logic, or migrations
from existing MDE XML rule sets, paste the Policy Rule XML
directly into Intune instead of using the form-based path above.
Sample XML — including the AuditDeniedaction that triggers
SOC alerting — is in Chapter 29 § USB Device Control & SOC
Alerting. Intune accepts the XML directly; no <?xml>declaration
needed.
6. Scope tags — accept Default unless you have RBAC scope tags in use.
7. Assignments — target the device groups in scope for removable media
restriction. Typically that's the workstation device group plus any non-
datacenter servers (branch-office, retail, industrial-floor) where physical
USB access is a real risk; datacenter rack servers are usually out of scope.
See Chapter 12 § Server Endpoint Security set for the conditions that
justify forking to a separate Svr -variant (different approved-drive list,
different ops group, separate alerting).
8. Review + create.
8.2.1.5 Step 4: SOC alerting via Defender for Endpoint
The Device Control policy enforces the block. Surfacing real-time alerts when an
unapproved device is plugged into a managed endpoint requires a separate Defender
custom detection rule that watches for RemovableStoragePolicyTriggered
Appendix B: Intune Baseline Configurations
713

events with a Denyverdict. Full KQL and the detection-rule creation steps are in
Chapter 29 § USB Device Control & SOC Alerting → Defender for Endpoint.
8.2.1.6 Verification
After deployment to a pilot device:
Check Where Expected
Policy reached the device Intune → Devices →
<device> → Endpoint
security configuration
Device Control profile
shows Succeeded
Approved device works Plug in the SanDisk on the
pilot device
Read/write access works as
before
Unapproved device is
blocked
Plug in any other USB
drive
Write attempts fail; toast
notification "Your IT
administrator…"
MDE recorded the deny Defender portal →
Hunting → Advanced
hunting, run the Chapter
29 KQL query
Row appears with Removab
leStoragePolicyVerdic
t == "Deny"
MDE recorded the allow
(Patterns 2 & 3 only)
Defender → Advanced
hunting, same query
Row appears with Removab
leStoragePolicyVerdic
t == "Allow"for the
approved-drive plug-in,
with AccountSidmatching
the user (or a member of
the group)
Custom detection fires Defender → Incidents New incident at the
configured severity within
5 minutes of the deny event
8.2.1 Exploit Protection
CMMC Control Mapping Matrix
Windows 11 ships with the four system-wide process mitigations NIST 800-171
3.14.1 cares about already enabled by default:
Securing Microsoft 365 in GCC High | 2026.04.30
714

Acronym What it stands for What it stops
DEP Data Execution Prevention Code execution from
memory regions marked as
data (heap, stack) —
defeats classic shellcode
injection that smuggles
attacker code into a buffer
and jumps to it
ASLR Address Space Layout
Randomization
Predictable memory
addresses that exploits rely
on. Two flavors matter
here: BottomUp
randomizes stack/heap base
addresses on every process
start;
ForceRelocateImages
("mandatory ASLR")
relocates module images
even when a binary wasn't
compiled with the /DYNAMI
CBASElinker flag
SEHOP Structured Exception
Handler Overwrite
Protection
Exploits that corrupt the
exception-handler chain to
hijack control flow when
an exception fires
CFG Control Flow Guard Indirect calls or jumps to
addresses the compiler
didn't sanction — defeats
many use-after-free and
ROP (return-oriented
programming) payloads
The gap CMMC L2 expects you to close is tamper protection: a user with local
admin can flip any of these off from Windows Security → App & browser
control → Exploit protection settings unless you push the lockdown explicitly.
This appendix delivers both halves — explicit enforcement plus tamper protection
Appendix B: Intune Baseline Configurations
715

— through one Intune Settings Catalog policy backed by the ExploitGuard CSP.
WHY NOT THE XML UPLOAD PATH
The legacy workflow (export an XML from a "golden" Windows machine
via Export-ProcessMitigation, upload to an Endpoint Security →
Attack Surface Reduction → Exploit Protection profile) still works but isn't
what Microsoft is steering new tenants toward. Intune profiles created after
April 5, 2022 use the Settings Catalog format; both paths write to the same
CSP node. Settings Catalog is more legible in policy reports, easier to diff,
and doesn't carry an external XML artifact you have to track. Per-program
EMET-style mitigations (Office, Acrobat, line-of-business apps) remain
XML-territory — see "Going further" below.
8.2.1.1 Step 1: Create the Settings Catalog policy
1. In the Intune admin center, navigate to Devices → Configuration →
Create → New policy.
2. Platform: Windows 10 and later. Profile type: Settings catalog. Click
Create.
3. Basics tab:
◦ Name: Win - Custom - ES - Exploit Protection
◦ Description: Enforces DEP, ASLR (BottomUp + ForceReloca
teImages), SEHOP, and CFG system-wide and prevents us
er override via the Windows Security UI.
4. Configuration settings tab → + Add settings. In the picker, search for
Exploit Guard to filter to the relevant category, then add the two settings
in the table below to the policy.
Setting Value What it does
Disallow Exploit
Protection Override
Enabled Removes the per-
mitigation toggles from
Windows Security →
App & browser
control so users
Securing Microsoft 365 in GCC High | 2026.04.30
716

Setting Value What it does
(including local admins)
cannot disable
mitigations from the
GUI. CSP node: Exploi
tGuard/DisallowExpl
oitProtectionOverri
de. This is the load-
bearing tamper-
protection setting —
without it, the rest is
advisory.
Exploit Protection
Settings
(paste the XML below) Pins per-mitigation
values in the policy
itself rather than relying
on Windows defaults —
gives a C3PAO an
explicit policy artifact
rather than "trust the
OS." CSP node: Exploi
tGuard/ExploitProte
ctionSettings.
The minimal XML to paste into the Exploit Protection Settings value
(covers system-wide DEP / ASLR / SEHOP / CFG, with mandatory ASLR
enabled):
<MitigationPolicy>
<SystemConfig>
<DEP Enable="true" EmulateAtlThunks="false" />
<ASLR ForceRelocateImages="true" RequireInfo="false" BottomUp="tru
e" HighEntropy="true" />
<ControlFlowGuard Enable="true" SuppressExports="false" />
<StructuredExceptionHandling SEHOP="true" SEHOPTelemetry="false"
/>
</SystemConfig>
</MitigationPolicy>
The one upgrade beyond Windows defaults isASLR ForceRelocateImage
s="true"(mandatory ASLR — modules built without /DYNAMICBASEare
relocated anyway). If you have known-incompatible legacy software, set
this to falseand document the exception in your SSP.
5. Scope tags — accept Default unless you have RBAC scope tags in use.
6. Assignments — target the workstation device group, and Servers-ES(or
Appendix B: Intune Baseline Configurations
717

your server endpoint-security group) as a second target on the same policy.
The policy is server-safe on modern Microsoft server roles; see Chapter 12
§ Server Endpoint Security set for the conditions that justify forking to a
separate Svr -variant.
7. Review + create.
8.2.1.2 Verification
After deployment to a pilot device:
Check Where Expected
Policy reached the device Intune → Devices →
<device> → Device
configuration
Win - Custom - ES - E
xploit Protection
shows Succeeded
Mitigations enforced PowerShell on the pilot
device: Get-ProcessMiti
gation -System
DEP ON; ASLR BottomUp:
ON, ForceRelocateImage
s: ON, HighEntropy: ON;
SEHOP ON; CFG ON
Tamper protection
enforced
On the pilot device, open
Windows Security →
App & browser control
→ Exploit protection
settings
The system-settings toggles
show "Some settings are
managed by your
organization" and are not
user-editable
Registry tattoo Get-ItemProperty 'HKL
M:\SOFTWARE\Policies\
Microsoft\Windows Def
ender ExploitGuard\Ex
ploit Protection'
DisallowExploitProtec
tionOverride = 1; Expl
oitProtectionSettings
populated with the XML
you pasted
8.2.1.3 Going further (out of scope for the baseline)
• Per-program (EMET-style) mitigations. Office, Edge, Acrobat, and any
line-of-business binary that processes untrusted content are good candidates
for per-program hardening — child-process restriction, strict handle
checks, EAF / EAF+, validate stack integrity, etc. Add <AppConfig Execu
table="winword.exe">…</AppConfig>blocks to the MitigationPolic
yXML above. Microsoft's Customize exploit protection reference has the
full attribute list.
• Audit-mode rollout for compatibility-sensitive mitigations. For per-
Securing Microsoft 365 in GCC High | 2026.04.30
718

program mitigations on binaries you're not sure are compatible, add the Aud
it="true"attribute first, watch the Microsoft-Windows-Security-Mit
igations/KernelModeand UserModeevent channels for affected
processes, then promote to enforce after a clean run.
• Servers with legacy line-of-business code. The baseline default is to
assign this same policy to both workstation and server groups (see Step 1
→ Assignments). Fork to a separate Svr - Custom - ES - Exploit Pr
otectionpolicy only when you have legacy server software that breaks
under mandatory ASLR, or per-program mitigations that need audit-mode
rollout role-by-role. See Chapter 12 § Server Endpoint Security set.
8.2.1 Win - OIB - ES - Attack Surface Reduction - D
- ASR Rules (L2) - v3.7
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - ES - Attack Surface
Reduction - D - ASR Rules (L2) - v3.7
Description DO NOT ASSIGN THIS POLICY
WITHOUT VALIDATING VIA AUDIT
MODE FIRST!
https://learn.microsoft.com/en-us/
defender-endpoint/attack-surface-
reduction-rules-deployment-
operationalize
Profile type Settings catalog
Category Attack surface reduction
Policy type Attack Surface Reduction Rules
Platform supported Windows 10 and later
Created Thursday, February 26, 2026 2:33:51
AM
Last modified Thursday, February 26, 2026 2:33:51
AM
Scope tags Default
Appendix B: Intune Baseline Configurations
719

Table 1. Basics - Win - OIB - ES - Attack Surface Reduction - D - ASR Rules (L2) - v3.7
Name Value
Defender
Attack Surface Reduction Rules
Block Adobe Reader from creating child
processes
Block
Block process creations originating
from PSExec and WMI commands
Warn
Block execution of potentially
obfuscated scripts
Warn
Block persistence through WMI event
subscription
Block
Block Win32 API calls from Office
macros
Block
Block Office applications from creating
executable content
Block
Block credential stealing from the
Windows local security authority
subsystem
Block
Block use of copied or impersonated
system tools
Block
Block executable files from running
unless they meet a prevalence, age, or
trusted list criterion
Audit
Block JavaScript or VBScript from
launching downloaded executable
content
Block
Block Office communication application
from creating child processes
Warn
Block Office applications from injecting
code into other processes
Block
Block all Office applications from
creating child processes
Block
Block rebooting machine in Safe Mode Audit
Block untrusted and unsigned
processes that run from USB
Block
Securing Microsoft 365 in GCC High | 2026.04.30
720

Use advanced protection against
ransomware
Block
Block executable content from email
client and webmail
Block
Block abuse of exploited vulnerable
signed drivers (Device)
Block
Enable Controlled Folder Access Audit Mode
Table 2. Settings - Win - OIB - ES - Attack Surface Reduction - D - ASR Rules (L2) - v3.7
8.2.1 Win - OIB - ES - Defender Antivirus - D - AV
Configuration - v3.3
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - ES - Defender Antivirus - D
- AV Configuration - v3.3
Description
Profile type Settings catalog
Category Antivirus
Policy type Microsoft Defender Antivirus
Platform supported Windows 10 and later
Created 21 August 2024 12:15:30
Last modified 05 December 2024 19:34:28
Scope tags Default
Table 5. Basics - Win - OIB - ES - Defender Antivirus - D - AV Configuration - v3.3
Name Value
Defender
Allow Archive Scanning Allowed. Scans the archive files.
Allow Behavior Monitoring Allowed. Turns on real-time behavior
monitoring.
Appendix B: Intune Baseline Configurations
721

Allow Cloud Protection Allowed. Turns on Cloud Protection.
Allow Email Scanning Allowed. Turns on email scanning.
Allow Full Scan Removable Drive
Scanning
Allowed. Scans removable drives.
Allow scanning of all downloaded files
and attachments
Allowed.
Allow Realtime Monitoring Allowed. Turns on and runs the real-
time monitoring service.
Allow Scanning Network Files Allowed. Scans network files.
Allow Script Scanning Allowed.
Allow User UI Access Allowed. Lets users access UI.
Avg CPU Load Factor 50
Check For Signatures Before Running
Scan
Enabled
Cloud Block Level High
Cloud Extended Timeout 50
Disable Catchup Full Scan Disabled
Disable Catchup Quick Scan Disabled
Enable Low CPU Priority Enabled
Enable Network Protection Enabled (block mode)
PUA Protection PUA Protection on. Detected items are
blocked. They will show in history along
with other threats.
Real Time Scan Direction Monitor all files (bi-directional).
Schedule Quick Scan Time 660
Signature Update Interval 1
Submit Samples Consent Send safe samples automatically.
Disable Local Admin Merge Disable Local Admin Merge
Allow On Access Protection Allowed.
Threat Severity Default Action Not configured
Remediation action for High severity
threats
Remove. Removes files from system.
Securing Microsoft 365 in GCC High | 2026.04.30
722

Remediation action for Severe threats Remove. Removes files from system.
Remediation action for Low severity
threats
Block. Blocks file execution.
Remediation action for Moderate
severity threats
Remove. Removes files from system.
Metered Connection Updates Allowed
Table 6. Settings - Win - OIB - ES - Defender Antivirus - D - AV Configuration - v3.3
8.2.1 Win - OIB - ES - Defender Antivirus - D -
Security Experience - v3.3
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - ES - Defender Antivirus - D
- Security Experience - v3.3
Description NOTE: The "Tamper Protection" setting
requires an active Defender for
Endpoint P1/P2 or Defender for
Business license.
https://learn.microsoft.com/en-us/
defender-endpoint/prevent-changes-to-
security-settings-with-tamper-protection
Profile type Settings catalog
Category Antivirus
Policy type Windows Security Experience
Platform supported Windows 10 and later
Created Thursday, February 26, 2026 5:39:10
AM
Last modified Thursday, February 26, 2026 5:39:10
AM
Scope tags Default
Appendix B: Intune Baseline Configurations
723

Table 3. Basics - Win - OIB - ES - Defender Antivirus - D - Security Experience - v3.3
Name Value
Defender
Controlled Configuration (Device) Tamper Protection (On)
Windows Defender Security Center
Disable Family UI (Enable) The users cannot see the
display of the family options area in
Windows Defender Security Center.
Disable Enhanced Notifications (Disable) Windows Defender Security
Center will display critical and non-
critical notifications to users..
Hide Windows Security Notification
Area Control
Disabled
Table 4. Settings - Win - OIB - ES - Defender Antivirus - D - Security Experience - v3.3
8.2.1 Win - OIB - ES - Encryption - D - BitLocker
(OS Disk) - v3.7
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - ES - Encryption - D -
BitLocker (OS Disk) - v3.7
Description
Profile type Settings catalog
Category Disk encryption
Policy type BitLocker
Platform supported Windows 10 and later
Created Thursday, February 26, 2026 5:31:54
AM
Last modified Thursday, February 26, 2026 5:31:54
AM
Scope tags Default
Securing Microsoft 365 in GCC High | 2026.04.30
724

Table 5. Basics - Win - OIB - ES - Encryption - D - BitLocker (OS Disk) - v3.7
Name Value
Administrative Templates
Operating System Drives
Enforce drive encryption type on
operating system drives
Enabled
Select the encryption type: (Device) Full encryption
Require additional authentication at
startup
Enabled
Configure TPM startup key and PIN: Do not allow startup key and PIN with
TPM
Configure TPM startup PIN: Do not allow startup PIN with TPM
Configure TPM startup: Require TPM
Allow BitLocker without a compatible
TPM (requires a password or a startup
key on a USB flash drive)
False
Configure TPM startup key: Do not allow startup key with TPM
Disallow standard users from changing
the PIN or password
Enabled
Choose how BitLocker-protected
operating system drives can be
recovered
Enabled
Omit recovery options from the
BitLocker setup wizard
True
Allow data recovery agent False
Configure storage of BitLocker recovery
information to AD DS:
Store recovery passwords and key
packages
Do not enable BitLocker until recovery
information is stored to AD DS for
operating system drives
True
Save BitLocker recovery information to
AD DS for operating system drives
True
Configure user storage of BitLocker
recovery information:
Require 48-digit recovery password
Do not allow 256-bit recovery key
Appendix B: Intune Baseline Configurations
725

BitLocker Drive Encryption
Choose drive encryption method and
cipher strength (Windows 10 [Version
1511] and later)
Enabled
Select the encryption method for
removable data drives:
AES-CBC 256-bit
Select the encryption method for fixed
data drives:
XTS-AES 256-bit
Select the encryption method for
operating system drives:
XTS-AES 256-bit
BitLocker
Require Device Encryption Enabled
Allow Warning For Other Disk
Encryption
Disabled
Allow Standard User Encryption Enabled
Configure Recovery Password Rotation Refresh on for Entra ID-joined devices
Table 6. Settings - Win - OIB - ES - Encryption - D - BitLocker (OS Disk) - v3.7
8.2.1 Win - OIB - ES - Windows LAPS - D - LAPS
Configuration - v3.1
CMMC Control Mapping Matrix
The Layer 1 default. Manages the built-in Administratoraccount on every device
— backs up the password to Microsoft Entra ID, rotates every 7 days, and enforces
a 21-character passphrase. Universally compatible across Windows 10 and
Windows 11 (no 24H2+ dependency). Server-safe; assign to both workstation and
server device groups, excluding domain controllers (which manage their own admin
accounts via AD).
Name Value
Basics
Name Win - OIB - ES - Windows LAPS - D -
LAPS Configuration - v3.1
Description OIB Layer 1 default. Manages the built-
in Administrator account. Universally
compatible (pre-24H2 and 24H2+).
Securing Microsoft 365 in GCC High | 2026.04.30
726

Profile type Settings catalog
Category Account protection
Policy type Local admin password solution
(Windows LAPS)
Platform supported Windows 10 and later
Created 09 August 2023 15:01:36
Last modified 05 December 2024 19:37:03
Scope tags Default
Table 27. Basics - Win - OIB - ES - Windows LAPS - D - LAPS Configuration - v3.1
Name Value
Backup Directory Backup the password to Microsoft
Entra ID only
Password Age Days 7
Password Complexity Passphrase (short words with unique
prefixes)
Password Length 21
Post Authentication Actions Reset the password, logoff the
managed a...expandReset the
password, logoff the managed account,
and terminate any remaining
processes: upon expiration of the grace
period, the managed account password
is reset, any interactive logon sessions
using the managed account are logged
off, and any remaining processes are
terminated.
Post Authentication Reset Delay 1
Table 28. Settings - Win - OIB - ES - Windows LAPS - D - LAPS Configuration - v3.1
Appendix B: Intune Baseline Configurations
727

8.2.2 Win - OIB - ES - Windows LAPS - D - LAPS
Configuration (24H2+) - v3.6
OPTIONAL ADVANCED VARIANT — UNIFORM WIN11 24H2+ FLEETS
ONLY, PAIRED WITH (24H2+) LSP
This is the (24H2+) variant that uses Automatic Account Management
to create and manage a custom local administrator account on each device,
replacing the built-in Administrator(which the matched (24H2+) LSP
variant disables). Deploying this LAPS variant without the matching LSP
variant works but adds a redundant custom account; deploying that LSP
variant without this LAPS variant leaves devices with no local admin
account at all. See the matched-pair note in Chapter 12 → Layered
Deployment Strategy.
Name Value
Basics
Name Win - OIB - ES - Windows LAPS - D -
LAPS Configuration (24H2+) - v3.6
Description NOTE: For 24H2+ devices only.
Profile type Settings catalog
Category Account protection
Policy type Local admin password solution
(Windows LAPS)
Platform supported Windows 10 and later
Created 09 August 2023 16:01:36
Last modified 12 May 2025 14:28:22
Scope tags Default
Table 27a. Basics - Win - OIB - ES - Windows LAPS - D - LAPS Configuration (24H2+) - v3.6
Name Value
Backup Directory Backup the password to Microsoft
Entra ID only
Password Age Days 7
Securing Microsoft 365 in GCC High | 2026.04.30
728

Password Complexity Passphrase (short words with unique
prefixes)
Passphrase Length 4
Password Length 21
Post Authentication Actions Reset the password, logoff the
managed a...expandReset the
password, logoff the managed account,
and terminate any remaining
processes: upon expiration of the grace
period, the managed account password
is reset, any interactive logon sessions
using the managed account are logged
off, and any remaining processes are
terminated.
Post Authentication Reset Delay 1
Automatic Account Management
Enabled
The target account will be automatically
managed
Automatic Account Management Name
Or Prefix
Not configured
Automatic Account Management Target Manage a new custom administrator
account
Automatic Account Management
Enable Account
The target account will be enabled
Automatic Account Management
Randomize Name
The name of the target account will not
use a random numeric suffix.
Table 28a. Settings - Win - OIB - ES - Windows LAPS - D - LAPS Configuration (24H2+) - v3.6
8.2.1 Win - OIB - ES - Windows Firewall - D -
Firewall Configuration - v3.1
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - ES - Windows Firewall - D -
Firewall Configuration - v3.1
Description
Appendix B: Intune Baseline Configurations
729

Profile type Settings catalog
Category Firewall
Policy type Windows Firewall
Platform supported Windows 10 and later
Created 09 August 2023 16:01:44
Last modified 05 December 2024 19:36:05
Scope tags Default
Table 21. Basics - Win - OIB - ES - Windows Firewall - D - Firewall Configuration - v3.1
Name Value
Auditing
Object Access Audit Filtering Platform
Connection
Failure
Object Access Audit Filtering Platform
Packet Drop
Failure
Firewall
Disable Stateful Ftp True
Enable Domain Network Firewall True
Default Inbound Action for Domain
Profile
Block
Default Outbound Action Allow
Disable Inbound Notifications True
Log Max File Size 16384
Disable Stealth Mode False
Enable Log Dropped Packets Enable Logging Of Dropped Packets
Enable Log Success Connections Enable Logging Of Successful
Connections
Log File Path %SystemRoot%\System32\logfiles\
firewall\domainfw.log
Enable Private Network Firewall True
Disable Inbound Notifications True
Default Outbound Action Allow
Securing Microsoft 365 in GCC High | 2026.04.30
730

Log Max File Size 16384
Default Inbound Action for Private
Profile
Block
Enable Log Dropped Packets Enable Logging Of Dropped Packets
Enable Log Success Connections Enable Logging Of Successful
Connections
Log File Path %SystemRoot%\System32\logfiles\
firewall\privatefw.log
Enable Public Network Firewall True
Log Max File Size 16384
Allow Local Policy Merge False
Default Outbound Action Allow
Disable Inbound Notifications True
Default Inbound Action for Public
Profile
Block
Enable Log Ignored Rules Disable Logging Of Ignored Rules
Enable Log Dropped Packets Enable Logging Of Dropped Packets
Enable Log Success Connections Enable Logging Of Successful
Connections
Log File Path %SystemRoot%\System32\logfiles\
firewall\publicfw.log
Allow Local Ipsec Policy Merge False
Table 22. Settings - Win - OIB - ES - Windows Firewall - D - Firewall Configuration - v3.1
8.2.1 Win - OIB - ES - Windows Hello for Business -
D - WHfB Configuration - v3.2
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - ES - Windows Hello for
Business - D - WHfB Configuration -
v3.2
Appendix B: Intune Baseline Configurations
731

Description
Profile type Settings catalog
Category Account protection
Policy type Account Protection
Platform supported Windows 10 and later
Created Thursday, February 26, 2026 5:34:12
AM
Last modified Thursday, February 26, 2026 5:34:12
AM
Scope tags Default
Table 7. Basics - Win - OIB - ES - Windows Hello for Business - D - WHfB Configuration - v3.2
Name Value
Windows Hello For Business
Device-scoped settings
Require Security Device true
Minimum PIN Length 6
Use Windows Hello For Business
(Device)
true
Use Certificate For On Prem Auth Disabled
Enable Pin Recovery true
Facial Features Use Enhanced Anti
Spoofing
true
Table 8. Settings - Win - OIB - ES - Windows Hello for Business - D - WHfB Configuration - v3.2
8.2.2 Win - OIB - SC - Windows Hello for Business -
D - Cloud Kerberos Trust - v3.5
Name Value
Basics
Name Win - OIB - SC - Windows Hello for
Business - D - Cloud Kerberos Trust -
v3.5
Securing Microsoft 365 in GCC High | 2026.04.30
732

Description NOTE: Requires setup of Cloud
Kerberos Trust to function.
https://learn.microsoft.com/en-us/
windows/security/identity-protection/
hello-for-business/deploy/hybrid-cloud-
kerberos-trust
Profile type Settings catalog
Platform supported Windows 10 and later
Created Thursday, February 26, 2026 5:34:12
AM
Last modified Thursday, February 26, 2026 5:34:12
AM
Scope tags Default
Table 17. Basics - Win - OIB - SC - Windows Hello for Business - D - Cloud Kerberos Trust - v3.5
Name Value
Kerberos
Cloud Kerberos Ticket Retrieval
Enabled
Enabled
Windows Hello For Business
Device-scoped settings
Use Cloud Trust For On Prem Auth Enabled
Table 18. Settings - Win - OIB - SC - Windows Hello for Business - D - Cloud Kerberos Trust - v3.5
8.2.1 Win - OIB - SC - Device Security - D - Audit
and Event Logging - v3.7
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - SC - Device Security - D -
Audit and Event Logging - v3.7
Description
Profile type Settings catalog
Appendix B: Intune Baseline Configurations
733

Platform supported Windows 10 and later
Created 11 April 2024 19:37:59
Last modified 01 October 2025 11:31:43
Scope tags Default
Table 35. Basics - Win - OIB - SC - Device Security - D - Audit and Event Logging - v3.7
Name Value
Administrative Templates
Audit Process Creation
Include command line in process
creation events
Enabled
Application
Control Event Log behavior when the
log file reaches its maximum size
Disabled
Specify the maximum log file size (KB) Enabled
Maximum Log Size (KB) 32768
Security
Control Event Log behavior when the
log file reaches its maximum size
Disabled
Specify the maximum log file size (KB) Enabled
Maximum Log Size (KB) 196608
Setup
Control Event Log behavior when the
log file reaches its maximum size
Disabled
Specify the maximum log file size (KB) Enabled
Maximum Log Size (KB) (Device) 32768
System
Control Event Log behavior when the
log file reaches its maximum size
Disabled
Specify the maximum log file size (KB) Enabled
Maximum Log Size (KB) 32768
Auditing
Account Logon Audit Credential Success+ Failure
Securing Microsoft 365 in GCC High | 2026.04.30
734

Validation
Account Logon Logoff Audit Account
Lockout
Failure
Account Logon Logoff Audit Group
Membership
Success
Account Logon Logoff Audit Logoff Success
Account Logon Logoff Audit Logon Success+ Failure
Account Management Audit Application
Group Management
Success+ Failure
Audit Authentication Policy Change Success
Audit Authorization Policy Change Success
Audit Changes to Audit Policy Success
Audit File Share Access Success+Failure
Audit Other Logon Logoff Events Success+Failure
Audit Security Group Management Success
Audit Security System Extension Success
Audit Special Logon Success
Audit User Account Management Success+Failure
Detailed Tracking Audit PNP Activity Success
Detailed Tracking Audit Process
Creation
Success
Object Access Audit Detailed File
Share
Failure
Object Access Audit Other Object
Access Events
Success+ Failure
Object Access Audit Removable
Storage
Success+ Failure
Policy Change Audit MPSSVC Rule
Level Policy Change
Success+ Failure
Policy Change Audit Other Policy
Change Events
Failure
Privilege Use Audit Sensitive Privilege
Use
Success+ Failure
Appendix B: Intune Baseline Configurations
735

System Audit I Psec Driver Success+ Failure
System Audit Other System Events Success+ Failure
System Audit Security State Change Success
System Audit System Integrity Success+ Failure
Table 36. Settings - Win - OIB - SC - Device Security - D - Audit and Event Logging - v3.7
8.2.1 Win - OIB - SC - Device Security - D - Local
Security Policies - v3.0
CMMC Control Mapping Matrix
The Layer 1 default. Hardens UAC behavior, NTLM session security, anonymous
SAM access, SMB signing, and related local security options while keeping the
built-in Administratoraccount enabled (the LAPS v3.1 policy rotates its
password). Universally compatible across Windows 10 and Windows 11 — no
24H2+ dependency. The only meaningful difference from the (24H2+) v3.6 variant
below is the Accounts Enable Administrator Account Statusrow, which is
Enable here and Disable there.
Name Value
Basics
Name Win - OIB - SC - Device Security - D -
Local Security Policies - v3.0
Description OIB Layer 1 default. Keeps the built-in
Administrator account enabled.
Universally compatible (pre-24H2 and
24H2+).
Profile type Settings catalog
Platform supported Windows 10 and later
Created 09 August 2023 15:01:22
Last modified 05 December 2024 19:42:06
Scope tags Default
Table 43. Basics - Win - OIB - SC - Device Security - D - Local Security Policies - v3.0
Name Value
Local Policies Security Options
Securing Microsoft 365 in GCC High | 2026.04.30
736

Accounts Enable Administrator Account
Status
Enable
Accounts Enable Guest Account Status Disable
Accounts Limit Local Account Use Of
Blank Passwords To Console Logon
Only
Enabled
Interactive Logon Smart Card Removal
Behavior
Lock Workstation
Microsoft Network Client Digitally Sign
Communications Always
Enable
Microsoft Network Client Send
Unencrypted Password To Third Party
SMB Servers
Disable
Microsoft Network Server Digitally Sign
Communications Always
Enable
Network Access Do Not Allow
Anonymous Enumeration Of SAM
Accounts
Enabled
Network Access Do Not Allow
Anonymous Enumeration Of Sam
Accounts And Shares
Enabled
Network Access Restrict Anonymous
Access To Named Pipes And Shares
Enable
Network Access Restrict Clients
Allowed To Make Remote Calls To
SAM
O:BAG:BAD:(A;;RC;;;BA)
Network Security Do Not Store LAN
Manager Hash Value On Next
Password Change
Enable
Network Security LAN Manager
Authentication Level
Send NTLMv2 responses only. Refuse
LM and NTLM
Network Security Minimum Session
Security For NTLMSSP Based Clients
Require NTLM and 128-bit encryption
Network Security Minimum Session
Security For NTLMSSP Based Servers
Require NTLM and 128-bit encryption
User Account Control Behavior Of The
Elevation Prompt For Administrators
Prompt for consent on the secure
desktop
Appendix B: Intune Baseline Configurations
737

User Account Control Behavior Of The
Elevation Prompt For Standard Users
Prompt for credentials on the secure
desktop
User Account Control Detect
Application Installations And Prompt
For Elevation
Enable
User Account Control Only Elevate UI
Access Applications That Are Installed
In Secure Locations
Enabled: Application runs with
UIAccess integrity only if it resides in
secure location.
User Account Control Run All
Administrators In Admin Approval Mode
Enabled
User Account Control Switch To The
Secure Desktop When Prompting For
Elevation
Enabled
User Account Control Use Admin
Approval Mode
Enable
User Account Control Virtualize File
And Registry Write Failures To Per
User Locations
Enabled
Table 44. Settings - Win - OIB - SC - Device Security - D - Local Security Policies - v3.0
8.2.2 Win - OIB - SC - Device Security - D - Local
Security Policies (24H2+) - v3.6
OPTIONAL ADVANCED VARIANT — UNIFORM WIN11 24H2+ FLEETS
ONLY, PAIRED WITH (24H2+) LAPS
This is the (24H2+) variant that disables the built-in Administrator
account. Must be paired with (24H2+) LAPS, which provisions a custom
managed admin account to replace it. Deploying (24H2+) LSP without
(24H2+) LAPS leaves devices with no local admin account at all —
recovery requires WinRE console or a separate Intune policy to re-enable.
See the matched-pair note in Chapter 12 → Layered Deployment Strategy.
Name Value
Basics
Securing Microsoft 365 in GCC High | 2026.04.30
738

Name Win - OIB - SC - Device Security - D -
Local Security Policies (24H2+) - v3.6
Description NOTE: For 24H2+ devices only.
Disables built-in Administrator account.
Profile type Settings catalog
Platform supported Windows 10 and later
Created 01 April 2025 15:02:22
Last modified 12 May 2025 14:28:34
Scope tags Default
Table 43a. Basics - Win - OIB - SC - Device Security - D - Local Security Policies (24H2+) - v3.6
Name Value
Local Policies Security Options
Accounts Enable Administrator Account
Status
Disable
Accounts Enable Guest Account Status Disable
Accounts Limit Local Account Use Of
Blank Passwords To Console Logon
Only
Enabled
Interactive Logon Smart Card Removal
Behavior
Lock Workstation
Microsoft Network Client Digitally Sign
Communications Always
Enable
Microsoft Network Client Send
Unencrypted Password To Third Party
SMB Servers
Disable
Microsoft Network Server Digitally Sign
Communications Always
Enable
Network Access Do Not Allow
Anonymous Enumeration Of SAM
Accounts
Enabled
Network Access Do Not Allow
Anonymous Enumeration Of Sam
Accounts And Shares
Enabled
Network Access Restrict Anonymous
Access To Named Pipes And Shares
Enable
Appendix B: Intune Baseline Configurations
739

Network Access Restrict Clients
Allowed To Make Remote Calls To
SAM
O:BAG:BAD:(A;;RC;;;BA)
Network Security Do Not Store LAN
Manager Hash Value On Next
Password Change
Enable
Network Security LAN Manager
Authentication Level
Send NTLMv2 responses only. Refuse
LM and NTLM
Network Security Minimum Session
Security For NTLMSSP Based Clients
Require NTLM and 128-bit encryption
Network Security Minimum Session
Security For NTLMSSP Based Servers
Require NTLM and 128-bit encryption
User Account Control Behavior Of The
Elevation Prompt For Administrators
Prompt for consent on the secure
desktop
User Account Control Behavior Of The
Elevation Prompt For Standard Users
Prompt for credentials on the secure
desktop
User Account Control Detect
Application Installations And Prompt
For Elevation
Enable
User Account Control Only Elevate UI
Access Applications That Are Installed
In Secure Locations
Enabled: Application runs with
UIAccess integrity only if it resides in
secure location.
User Account Control Run All
Administrators In Admin Approval Mode
Enabled
User Account Control Switch To The
Secure Desktop When Prompting For
Elevation
Enabled
User Account Control Use Admin
Approval Mode
Enable
User Account Control Virtualize File
And Registry Write Failures To Per
User Locations
Enabled
Table 44a. Settings - Win - OIB - SC - Device Security - D - Local Security Policies (24H2+) - v3.6
8.2.1 Win - OIB - SC - Device Security - D - Login
and Lock Screen - v3.1
CMMC Control Mapping Matrix
Securing Microsoft 365 in GCC High | 2026.04.30
740

Name Value
Basics
Name Win - OIB - SC - Device Security - D -
Login and Lock Screen - v3.1
Description
Profile type Settings catalog
Platform supported Windows 10 and later
Created Thursday, February 26, 2026 5:39:13
AM
Last modified Thursday, February 26, 2026 5:39:13
AM
Scope tags Default
Table 13. Basics - Win - OIB - SC - Device Security - D - Login and Lock Screen - v3.1
Name Value
Above Lock
Allow Cortana Above Lock Block
Allow Toasts Block
Administrative Templates
Personalization
Prevent enabling lock screen camera Enabled
Prevent enabling lock screen slide
show
Enabled
Logon
Turn off app notifications on the lock
screen
Enabled
Credential User Interface
Do not display the password reveal
button
Enabled
Windows Logon Options
Configure the mode of automatically
signing in and locking last interactive
user after a restart or cold boot
Enabled
Configure the mode of automatically Enabled if BitLocker is on and not
Appendix B: Intune Baseline Configurations
741

signing in and locking last interactive
user after a restart or cold boot
(Device)
suspended
Sign-in and lock last interactive user
automatically after a restart
Enabled
Authentication
Allow Aad Password Reset Allow
Privacy
Let Apps Activate With Voice Above
Lock
Force deny. Windows apps cannot be
activated by voice while the screen is
locked, and users cannot change it.
Table 14. Settings - Win - OIB - SC - Device Security - D - Login and Lock Screen - v3.1
8.2.2 Win - OIB - SC - Device Security - U - Power
and Device Lock - v3.6
Name Value
Basics
Name Win - OIB - SC - Device Security - U -
Power and Device Lock - v3.6
Description
Profile type Settings catalog
Platform supported Windows 10 and later
Created Thursday, February 26, 2026 5:39:14
AM
Last modified Thursday, February 26, 2026 5:39:14
AM
Scope tags Default
Table 15. Basics - Win - OIB - SC - Device Security - U - Power and Device Lock - v3.6
Name Value
Administrative Templates
Sleep Settings
Require a password when a computer
wakes (on battery)
Enabled
Securing Microsoft 365 in GCC High | 2026.04.30
742

Require a password when a computer
wakes (plugged in)
Enabled
Specify the system sleep timeout (on
battery)
Enabled
System Sleep Timeout (seconds): 600
Specify the system sleep timeout
(plugged in)
Enabled
System Sleep Timeout (seconds): 900
Video and Display Settings
Turn off the display (on battery) Enabled
On battery power, turn display off after
(seconds)
300
Turn off the display (plugged in) Enabled
When plugged in, turn display off after
(seconds)
600
Power
Unattended Sleep Timeout On Battery 600
Unattended Sleep Timeout Plugged In 900
Table 16. Settings - Win - OIB - SC - Device Security - U - Power and Device Lock - v3.6
8.2.1 Win - OIB - SC - Windows Update for Business
- D - Reports and Telemetry - v3.0
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - SC - Windows Update for
Business - D - Reports and Telemetry -
v3.0
Description NOTE: Contains policies required for
Windows Update for Business Reports.
Further configuration required:
https://learn.microsoft.com/en-us/
windows/deployment/update/wufb-
reports-enable
Appendix B: Intune Baseline Configurations
743

Profile type Settings catalog
Platform supported Windows 10 and later
Created Thursday, February 26, 2026 3:39:16
AM
Last modified Thursday, February 26, 2026 3:46:34
AM
Scope tags Default
Table 19. Basics - Win - OIB - SC - Windows Update for Business - D - Reports and Telemetry - v3.0
Name Value
System
Allow device name to be sent in
Windows diagnostic data
Allowed.
Allow Telemetry Security
Configure Telemetry Opt In Change
Notification
Disable telemetry change notifications.
Configure Telemetry Opt In Settings Ux Disable Telemetry opt-in Settings.
Windows Update For Business
Allow Temporary Enterprise Feature
Control
Allowed
Table 20. Settings - Win - OIB - SC - Windows Update for Business - D - Reports and Telemetry - v3.0
8.2.1 Win - OIB - Compliance - U - Defender for
Endpoint - v3.1
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - Compliance - U - Defender
for Endpoint - v3.1
Description
Profile type Compliance policy
Platform supported Windows 10 and later
Securing Microsoft 365 in GCC High | 2026.04.30
744

Scope tags Default
Table 1. Basics - Win - OIB - Compliance - U - Defender for Endpoint - v3.1
Name Value
Compliance Settings
Password Required No
Password Block Simple No
Password Required To Unlock From
Idle
No
Password Required Type deviceDefault
Require Healthy Device Report No
Early Launch Anti Malware Driver
Enabled
No
BitLocker Enabled No
Secure Boot Enabled No
Code Integrity Enabled No
Memory Integrity Enabled No
Kernel DMA Protection Enabled No
Virtualization Based Security Enabled No
Firmware Protection Enabled No
Storage Require Encryption No
Active Firewall Required No
Defender Enabled Yes
Signature Out Of Date Yes
RTP Enabled Yes
Antivirus Required No
Anti Spyware Required No
Device Threat Protection Enabled No
Device Threat Protection Required
Security Level
unavailable
Configuration Manager Compliance No
Appendix B: Intune Baseline Configurations
745

Required
TPM Required No
Table 2. Compliance Settings - Win - OIB - Compliance - U - Defender for Endpoint - v3.1
8.2.1 Win - OIB - Compliance - U - Device Health -
v3.1
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - Compliance - U - Device
Health - v3.1
Description
Profile type Compliance policy
Platform supported Windows 10 and later
Scope tags Default
Table 1. Basics - Win - OIB - Compliance - U - Device Health - v3.1
Name Value
Compliance Settings
Password Required No
Password Block Simple No
Password Required To Unlock From
Idle
No
Password Required Type deviceDefault
Require Healthy Device Report No
Early Launch Anti Malware Driver
Enabled
No
BitLocker Enabled Yes
Secure Boot Enabled Yes
Code Integrity Enabled Yes
Memory Integrity Enabled No
Securing Microsoft 365 in GCC High | 2026.04.30
746

Kernel DMA Protection Enabled No
Virtualization Based Security Enabled No
Firmware Protection Enabled No
Storage Require Encryption No
Active Firewall Required No
Defender Enabled No
Signature Out Of Date No
RTP Enabled No
Antivirus Required No
Anti Spyware Required No
Device Threat Protection Enabled No
Device Threat Protection Required
Security Level
unavailable
Configuration Manager Compliance
Required
No
TPM Required No
Table 2. Compliance Settings - Win - OIB - Compliance - U - Device Health - v3.1
8.2.1 Win - OIB - Compliance - U - Device Security -
v3.1
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - Compliance - U - Device
Security - v3.1
Description
Profile type Compliance policy
Platform supported Windows 10 and later
Scope tags Default
Appendix B: Intune Baseline Configurations
747

Table 1. Basics - Win - OIB - Compliance - U - Device Security - v3.1
Name Value
Compliance Settings
Password Required No
Password Block Simple No
Password Required To Unlock From
Idle
No
Password Required Type deviceDefault
Require Healthy Device Report No
Early Launch Anti Malware Driver
Enabled
No
BitLocker Enabled No
Secure Boot Enabled No
Code Integrity Enabled No
Memory Integrity Enabled No
Kernel DMA Protection Enabled No
Virtualization Based Security Enabled No
Firmware Protection Enabled No
Storage Require Encryption No
Active Firewall Required Yes
Defender Enabled No
Signature Out Of Date No
RTP Enabled No
Antivirus Required Yes
Anti Spyware Required Yes
Device Threat Protection Enabled No
Device Threat Protection Required
Security Level
unavailable
Configuration Manager Compliance
Required
No
Securing Microsoft 365 in GCC High | 2026.04.30
748

TPM Required Yes
Table 2. Compliance Settings - Win - OIB - Compliance - U - Device Security - v3.1
8.2.1 Win - OIB - Compliance - U - Password - v3.1
CMMC Control Mapping Matrix
Name Value
Basics
Name Win - OIB - Compliance - U - Password
- v3.1
Description
Profile type Compliance policy
Platform supported Windows 10 and later
Scope tags Default
Table 1. Basics - Win - OIB - Compliance - U - Password - v3.1
Name Value
Compliance Settings
Password Required Yes
Password Block Simple Yes
Password Required To Unlock From
Idle
No
Password Minutes Of Inactivity Before
Lock
15
Password Minimum Length 8
Password Required Type numeric
Require Healthy Device Report No
Early Launch Anti Malware Driver
Enabled
No
BitLocker Enabled No
Secure Boot Enabled No
Code Integrity Enabled No
Appendix B: Intune Baseline Configurations
749

Memory Integrity Enabled No
Kernel DMA Protection Enabled No
Virtualization Based Security Enabled No
Firmware Protection Enabled No
Storage Require Encryption No
Active Firewall Required No
Defender Enabled No
Signature Out Of Date No
RTP Enabled No
Antivirus Required No
Anti Spyware Required No
Device Threat Protection Enabled No
Device Threat Protection Required
Security Level
unavailable
Configuration Manager Compliance
Required
No
TPM Required No
Table 2. Compliance Settings - Win - OIB - Compliance - U - Password - v3.1
8.3 AVD Deployment Runbook
This runbook covers the sequence of steps to deploy a production-ready Azure
Virtual Desktop secure enclave in GCC High — from an empty subscription to 20
Entra-joined, Intune-enrolled session hosts. Steps are ordered to respect Azure
resource dependencies.
For architecture context, firewall rules, and cost guidance, see Scenario: Azure
Virtual Desktop. For the full 65-hour phased timeline, see AVD Deployment
Timeline.
8.3.1 AVD Runbook Prerequisites
Complete these before starting. None of the steps below can proceed without them.
Securing Microsoft 365 in GCC High | 2026.04.30
750

Item Where to Configure
Azure Government subscription active,
engineer has Subscription Owner
Azure Government portal — portal.azu
re.us
GCC High Entra tenant active, engineer
has Global Administrator
Entra admin center — entra.microsof
t.us
M365 GCC High E3 or E5 licenses
assigned to all users
Microsoft 365 admin center
MDM auto-enrollment enabled for All
users
Entra admin center > Mobility (MDM and
MAM) > Microsoft Intune > MDM user
scope: All
"Users may join devices to Microsoft
Entra ID" set to All
Entra admin center > Devices > Device
settings
SET MDM USER SCOPE TO ALL BEFORE PROVISIONING SESSION
HOSTS
If MDM user scope is set to a named group rather than All, the
AADLoginForWindows extension will join the VM to Entra but Intune
enrollment will silently fail. Verify this setting before deploying any
session hosts.
8.3.2 Tenant Device Settings
Configure these in the Entra admin center > Devices > Device settings before
provisioning any session hosts. These are tenant-wide settings that apply to all
Entra-joined devices.
Setting Value Reason
Users may join devices to
Microsoft Entra ID
All Required for AVD
provisioning — the
AADLoginForWindows
extension joins as
SYSTEM, not as a named
AVD Deployment Runbook
751

Setting Value Reason
user. See compensating
controls below.
Additional local
administrators on all
Microsoft Entra joined
devices (Global
Administrator role)
Disabled Global Admin is a tenant-
level role and must not
carry local machine admin
rights on session hosts. Use
LAPS for local admin
access instead.
Registering user is added
as local administrator
during Microsoft Entra
join
Disabled AVD session hosts are
joined by a system
extension, not a user. Users
must not have local admin
rights on CUI session hosts
— doing so would
undermine AC, AU, and SI
domain controls.
Enable Microsoft Entra
Local Administrator
Password Solution
(LAPS)
Enabled Rotates the local admin
password per device on a
configurable schedule and
stores it in Entra with a full
access audit trail. Satisfies
MA.L2-3.7.5 and
IA.L2-3.5.3.
Users can see their own
BitLocker recovery key
No BitLocker recovery keys
provide full disk
decryption capability. In a
CUI enclave, key retrieval
must be an IT admin
function only, with an audit
trail. Supports
Securing Microsoft 365 in GCC High | 2026.04.30
752

Setting Value Reason
MP.L2-3.8.x.
AFTER ENABLING LAPS HERE, CONFIGURE THE ROTATION
POLICY IN INTUNE
Enabling LAPS in Entra activates the feature but does not set rotation
schedule or complexity. Create a Local Administrator Password Solution
policy in Intune > Endpoint security > Account protection and target it
to your AVD device group. Set backup directory to Azure Active
Directory, rotation to every 30 days, and complexity to the maximum
available setting.
"USERS MAY JOIN DEVICES" SET TO ALL — REQUIRED
COMPENSATING CONTROLS
Setting this to All creates a surface where any user could join a personal
device to Entra. Close this gap with:
• Intune enrollment restrictions — block personally-owned device
enrollment
• Conditional Access — require compliant device for all resource
access
• B06: Block Device Registration from Non-Approved Network
Locations — prevents joins from outside trusted locations
Document this as a known constraint with compensating controls in your
CMMC SSP.
8.3.3 Step 1: Create the Resource Group
All AVD resources should live in a dedicated resource group for cost attribution
and RBAC scoping.
1. Navigate to Azure Government portal > Resource groups > Create
AVD Deployment Runbook
753

2. Set Subscription to your AVD subscription
3. Set Resource group name — e.g., rg-avd-prod-usgovva
4. Set Region to US Gov Virginia
5. Add tags as required by your tagging policy (e.g., environment: product
ion, workload: avd)
6. Select Review + Create > Create
8.3.4 Step 2: Deploy the Virtual Network
AVD session hosts require a VNet with two subnets: one dedicated to Azure
Firewall (required size /26) and one for session hosts.
1. Navigate to Virtual networks > Create
2. Set Resource group to rg-avd-prod-usgovva
3. Set Name — e.g., vnet-avd-usgovva
4. Set Region to US Gov Virginia
5. Under IP addresses, the portal defaults to 10.0.0.0/16for the VNet
address space. You may use any RFC 1918 range that does not conflict
with your on-premises or peered networks.
6. The wizard creates a defaultsubnet automatically at 10.0.0.0/24. You
may rename it for clarity, but the name has no functional impact. Do not
add AzureFirewallSubnetmanually — enabling Azure Firewall in the
next step creates it automatically at 10.0.1.0/26.
Subnet Default CIDR Purpose
default(or your chosen
name)
10.0.0.0/24 AVD session host NICs
AzureFirewallSubnet auto-created at 10.0.1.0/
26
Created automatically
when Azure Firewall is
enabled below
7. Under Security, configure as follows:
Option Setting Reason
Virtual network
encryption
Disabled AVD traffic is already
TLS-encrypted at the
application layer. No
CMMC requirement is
Securing Microsoft 365 in GCC High | 2026.04.30
754

Option Setting Reason
unmet without this.
Azure Bastion Disabled Admin access to session
hosts uses the AVD client
and Azure portal Run
Command — not direct
RDP. Bastion adds ~$170/
month for a capability this
architecture does not need.
Azure Firewall Enabled Enable here to provision
the firewall inline with the
VNet. Select Standard tier
and create a new public IP.
Azure DDoS Network
Protection
Disabled The enclave has one public
IP (firewall egress only)
and no inbound internet
traffic. The default
platform-level DDoS
protection is sufficient.
DDoS Standard (~$2,944/
month) is warranted only
for public-facing
workloads.
8. Select Review + Create > Create
FIREWALL DEPLOYMENT TAKES 5–10 MINUTES
The VNet and firewall provision together. Do not proceed to Step 3 until
both show as succeeded. Note the firewall private IP address from the
firewall's Overview blade — you will need it for the UDR in Step 3.
Once the firewall is provisioned, add the required application and network rules for
AVD. See AVD Firewall Reference for the complete rule set.
AVD Deployment Runbook
755

8.3.5 Step 3: Create the User Defined Route
The UDR forces all session host outbound traffic through the Azure Firewall,
enforcing the deny-all-by-default posture.
1. Navigate to Route tables > Create
2. Set Resource group to rg-avd-prod-usgovva
3. Set Name — e.g., udr-avd-sessionhosts
4. Set Region to US Gov Virginia
5. Set Propagate gateway routes to No
6. Select Review + Create > Create
After creation, add the default route:
1. Open udr-avd-sessionhosts> Routes > Add
2. Set Route name: route-all-to-firewall
3. Set Destination: 0.0.0.0/0
4. Set Next hop type: Virtual appliance
5. Set Next hop address: the Azure Firewall private IP from Step 2
6. Select Add
Associate the UDR with the session host subnet:
1. Open udr-avd-sessionhosts> Subnets > Associate
2. Select your VNet and the session host subnet (defaultunless renamed —
not AzureFirewallSubnet)
3. Select OK
8.3.6 Step 4: Create the Log Analytics Workspace
Required for AVD Insights, firewall logs, and Defender for Endpoint telemetry.
1. Navigate to Log Analytics workspaces > Create
2. Set Resource group to rg-avd-prod-usgovva
3. Set Name — e.g., law-avd-usgovva
4. Set Region to US Gov Virginia
5. Select Review + Create > Create
Once created, enable diagnostic logging on the firewall:
1. Open the firewall resource > Diagnostic settings > Add diagnostic setting
2. Name it diag-afw-avd
Securing Microsoft 365 in GCC High | 2026.04.30
756

3. Check AzureFirewallApplicationRule, AzureFirewallNetworkRule,
AzureFirewallDnsProxy
4. Check Send to Log Analytics workspace and select law-avd-usgovva
5. Set Destination table to Resource specific
6. Leave Archive to a storage account, Stream to an event hub, and Send
to partner solution unchecked
7. Select Save
RESOURCE SPECIFIC VS. AZURE DIAGNOSTICS
Resource specific stores each log category in its own table (AZFWApplicat
ionRule, AZFWNetworkRule, AZFWDnsQuery), which is faster to query and
less expensive to retain than the consolidated AzureDiagnosticstable.
Use Azure Diagnostics only if you are aggregating logs from multiple
resource types into a single table for a SIEM or compliance requirement.
8.3.7 Step 5: Create the AVD Workspace
1. Navigate to Azure Virtual Desktop > Workspaces > Create
2. Set Resource group to rg-avd-prod-usgovva
3. Set Workspace name — e.g., avdws-prod
4. Set Location to US Gov Virginia
5. Skip the Application groups tab — the application group will be created
with the host pool in Step 6
6. On the Advanced tab, select law-avd-usgovvaas the Log Analytics
workspace. Leave the storage account and event hub checkboxes
unchecked.
7. Select Review + Create > Create
After creation, configure the full diagnostic settings:
1. Open avdws-prod> Diagnostic settings > Add diagnostic setting
2. Name it diag-avdws-prod
3. Check all four log categories: Checkpoint, Error, Management, Feed
4. Check Send to Log Analytics workspace and select law-avd-usgovva
5. Set Destination table to Resource specific
6. Select Save
AVD Deployment Runbook
757

8.3.8 Step 6: Create the AVD Host Pool
1. Navigate to Azure Virtual Desktop > Host pools > Create
2. Basics tab:
Setting Value
Resource group rg-avd-prod-usgovva
Host pool name hp-avd-prod
Location US Gov Virginia
Host pool type Personal
Assignment type Automatic
Load balancing algorithm Breadth-first
Preferred app group type Desktop
3. Virtual machines tab: Leave empty — session hosts are added in Step 9
4. Workspace tab: Select avdws-prod
5. Diagnostics tab: Select law-avd-usgovvaas the Log Analytics
workspace. Check all eight log categories. Leave archive to storage account
and stream to event hub unchecked.
Securing Microsoft 365 in GCC High | 2026.04.30
758

6. Select Review + Create > Create
PERSONAL POOL: ONE VM PER USER, ALWAYS
With Automatic assignment, AVD permanently assigns each user to a
specific VM on their first connection — no admin action required. Every
subsequent connection returns that user to the same VM — their desktop,
files, and application state are exactly as they left them. Users cannot land
on a different VM.
Assignments do not release automatically. If a user leaves or needs to free
their VM for someone else, an admin must remove the assignment
manually: Host pool > Session hosts > select the VM > Remove user
assignment. Until cleared, the VM remains reserved for that user even if
they never connect again. Direct assignment requires the same admin step
to unassign, but also requires admin action to assign in the first place —
making Automatic the better choice for most deployments.
CAPACITY MUST EQUAL OR EXCEED USER COUNT
With Automatic assignment, AVD assigns one VM per user. If all session
hosts are assigned and a new user attempts to connect, AVD will find no
available VM and deny the connection — there is no queue. The number of
session hosts in the pool must always equal or exceed the number of users
who need access. To add capacity, open the host pool > Session hosts >
Add and provision additional VMs.
After creation, configure RDP properties:
1. Open hp-avd-prod> RDP properties
2. Set the following under Device redirection:
Property Value Reason
Clipboard redirection Disabled Prevent CUI from leaving
the session
AVD Deployment Runbook
759

Property Value Reason
Drive redirection Disabled Prevent local drive
mounting
Camera redirection Disabled
Printer redirection Disabled (or selectively
enabled)
WebAuthn redirection Enabled Allows YubiKeys and
Windows Hello to
authenticate inside the
session — extends
phishing-resistant auth to
resources accessed within
AVD
USB redirection Disabled Generic USB redirection
includes storage devices —
a direct CUI exfiltration
path. WebAuthn uses a
separate channel and is
unaffected by this setting.
Smart card redirection Enabled Allows CAC/PIV cards to
authenticate inside the
session. No data
exfiltration risk.
3. Under Advanced, add the following custom RDP properties:
Property Value Reason
enablerdsaadauth:i:1 Enables SSO via Entra ID,
preventing a second
authentication prompt at
the VM
screencaptureprotecti
on:i:2
Blocks screen capture on
both client and server,
preventing screenshots of
CUI from inside the
session
Securing Microsoft 365 in GCC High | 2026.04.30
760

4. This is a set of RDP properties I have found to work. Enter each on its own
line in the Advanced → Custom RDP properties field:
watermarking:i:1
screen capture protection:i:2
targetisaadjoined:i:1
drivestoredirect:s:
usbdevicestoredirect:s:
redirectclipboard:i:0
redirectprinters:i:0
audiomode:i:0
videoplaybackmode:i:1
devicestoredirect:s:
redirectcomports:i:0
redirectsmartcards:i:1
enablecredsspsupport:i:1
redirectwebauthn:i:1
use multimon:i:1
enablerdsaadauth:i:1
5. SelectSave
Enable Start VM on Connect:
1. Open hp-avd-prod> Properties
2. Set Start VM on connect to Yes
3. Select Save
START VM ON CONNECT REQUIRES A ROLE ASSIGNMENT
The AVD service principal (Windows Virtual Desktop) must have the
Desktop Virtualization Power On Off Contributor role on the
subscription or resource group. Assign this before session hosts are added.
Navigate to the resource group > Access control (IAM) > Add role
assignment > Desktop Virtualization Power On Off Contributor >
Assign access to: User, group, or service principal > Search: "Azure
Virtual Desktop".
8.3.9 Step 7: Assign Users to the Application Group
Azure automatically creates a Desktop Application Group named hp-avd-prod-DA
Gwhen the host pool is created and associates it with the workspace. No manual
creation is needed.
AVD Deployment Runbook
761

Assign users:
1. Navigate to Azure Virtual Desktop > Application groups
2. Open hp-avd-prod-DAG> Assignments > Add
3. Add the users or security group that should have access to AVD
4. Select Select
8.3.10 Step 8: Configure Entra SSO for AVD
Entra SSO eliminates the second authentication prompt users would otherwise see
when connecting to a session host. It requires enabling RDP on two AVD service
principals and scoping that permission to a device group containing your session
hosts.
Create the AVD device group:
1. Navigate to Entra admin center > Groups > New group
2. Set Group type to Security
3. Set Membership type to Dynamic Device
4. Set Group name — e.g., AVD Session Hosts
5. Under Dynamic device members, add the following rule:
(device.displayName -startsWith "avd-")
6. SelectCreate
DYNAMIC GROUP PROCESSING TAKES A FEW MINUTES
The group will not contain devices immediately. Once session hosts are
provisioned in Step 10, they will be added automatically within 5–15
minutes based on the naming rule. If your session hosts use a different
name prefix, adjust the rule accordingly.
Run the SSO configuration script:
The following script enables RDP on the two Entra service principals that back
AVD SSO and scopes the permission to your device group. It requires the Microso
ft.Graph.Authenticationand Microsoft.Graph.ApplicationsPowerShell
modules and must be run by a Global Administrator.
Securing Microsoft 365 in GCC High | 2026.04.30
762

1. Replace AVD DEVICE GROUP HEREin the script with the object ID of the A
VD Session Hostsgroup created above
2. Run the script:
Import-Module Microsoft.Graph.Authentication
Import-Module Microsoft.Graph.Applications
function Set-RdpEnabledForServicePrincipal {
param (
[Parameter(Mandatory = $true)]
[string] $ServicePrincipalId
)
$config = Get-MgServicePrincipalRemoteDesktopSecurityConfiguration -Servi
cePrincipalId $ServicePrincipalId
if (-not $config -or $config.IsRemoteDesktopProtocolEnabled -ne $true) {
Update-MgServicePrincipalRemoteDesktopSecurityConfiguration -ServiceP
rincipalId $ServicePrincipalId -BodyParameter @{ isRemoteDesktopProtocolEnabl
ed = $true }
Write-Host "RDP enabled for service principal $ServicePrincipalId"
} else {
Write-Host "RDP already enabled for service principal $ServicePrincip
alId"
}
}
Connect-MgGraph -Environment USGov -Scopes "Application.Read.All","Applicatio
n-RemoteDesktopConfig.ReadWrite.All"
$MSRDspId = (Get-MgServicePrincipal -Filter "AppId eq 'a4a365df-50f1-4397-bc5
9-1a1564b8bb9c'").Id
$WCLspId  = (Get-MgServicePrincipal -Filter "AppId eq '270efc09-cd0d-444b-a71
f-39af4910ec45'").Id
Set-RdpEnabledForServicePrincipal -ServicePrincipalId $MSRDspId
Set-RdpEnabledForServicePrincipal -ServicePrincipalId $WCLspId
$tdg = New-Object -TypeName Microsoft.Graph.PowerShell.Models.MicrosoftGraphT
argetDeviceGroup
$tdg.Id = "<Object ID of AVD Session Hosts group>"
$tdg.DisplayName = "AVD Session Hosts"
New-MgServicePrincipalRemoteDesktopSecurityConfigurationTargetDeviceGroup -Se
rvicePrincipalId $MSRDspId -BodyParameter $tdg
New-MgServicePrincipalRemoteDesktopSecurityConfigurationTargetDeviceGroup -Se
rvicePrincipalId $WCLspId -BodyParameter $tdg
3. Verify output confirms RDP is enabled on both service principals
Enable SSO on the host pool:
1. Open hp-avd-prod> RDP properties > Connections
2. Set Microsoft Entra single sign-on to Enabled
3. Select Save
AVD Deployment Runbook
763

8.3.11 Step 10: Add Session Hosts
Session hosts are Entra-joined and Intune-enrolled automatically during
provisioning — no user interaction, no MFA challenge. See Entra Join and Intune
Enrollment: No User Interaction Required for details.
1. Open hp-avd-prod> Session hosts > Add
2. Virtual machines tab:
Setting Value
Resource group rg-avd-prod-usgovva
Name prefix avd(Azure appends -0, -1, etc. — dashes
are not allowed in the prefix)
Virtual machine type Azure virtual machine
Availability options No infrastructure redundancy required
VM size Standard_D8as_v6 (or D16as_v6 for
power users)
Number of VMs 20
Security type Trusted Launch
Secure Boot Enabled
vTPM Enabled
Integrity monitoring Enabled
OS disk type Premium SSD LRS
OS disk size 128 GB (default)
Boot diagnostics Enabled with managed storage account
3. Image: Select Windows 11 Enterprise (single-session) from the gallery.
Personal pools use single-session — one user per VM, with persistent
desktop and user data.
4. Network tab:
Securing Microsoft 365 in GCC High | 2026.04.30
764

Setting Value
Virtual network vnet-avd-usgovva
Subnet default(or your session host subnet
name)
Network security group None
Public inbound ports None
NSG NOT REQUIRED WITH AZURE FIREWALL
Session hosts have no public IPs and no inbound internet path. The Azure
Firewall and UDR provide the network perimeter. An NSG on the session
host subnet would be redundant for outbound control and adds no
meaningful inbound protection in this topology.
5. Domain to join tab:
Setting Value
Select which directory you would like to
join
Microsoft Entra ID
Enroll VM with Intune Yes
Add VM to a single group Optional — specify a device group if
targeting scoped Intune policies
6. Virtual machine administrator account: Set a local admin username and
password (stored in the VM, not synced to Entra)
AVD Deployment Runbook
765

7. Select Review + Create > Add
PROVISIONING TIME
20 VMs typically take 25–45 minutes to fully provision. Monitor progress
under Host pool > Session hosts. Each VM transitions through:
Provisioning → Available. Intune enrollment completes within 5–15
minutes of the VM reaching Available state.
8.3.12 Step 11: Validate
Entra Join:
• Entra admin center > Devices > All devices — each session host should
appear as Join type: Microsoft Entra joined, MDM: Microsoft Intune
Intune Enrollment:
• Intune admin center > Devices > All devices — each session host should
appear with Enrollment type: AzureAD, Compliance: Compliant (once
compliance policies have been applied and evaluated)
AVD connectivity:
• Open the AVD client (remote.apps.powerapps.usfor GCC High) and
sign in as a test user
• Verify the session launches, SSO completes without a second prompt, and
clipboard/drive redirection is blocked
Firewall logging:
• In Log Analytics, run: AZFWApplicationRule | limit 50
• Verify traffic is flowing through the firewall and expected FQDNs are
being allowed
Start VM on Connect:
• Power off a session host from the Azure portal
• Sign in as the assigned user via the AVD client
Securing Microsoft 365 in GCC High | 2026.04.30
766

• Verify the VM starts automatically and the session connects within 2–3
minutes
8.4 Appendix C: AVD Firewall
Reference
This appendix provides the Azure Firewall rule reference for Azure Virtual Desktop
deployments in GCC High. Rules use Microsoft-maintained FQDN tags wherever
they exist and explicit FQDNs only where no tag is available. For architecture
Appendix C: AVD Firewall Reference
767

context and the network topology, see Scenario: Azure Virtual Desktop.
COMMERCIAL EQUIVALENTS
This appendix targets GCC High deployments. Microsoft's FQDN tags (Wi
ndowsVirtualDesktop, Office365, MicrosoftIntune, WindowsUpdate,
WindowsDiagnostics, MicrosoftActiveProtectionService) are
documented as cloud-aware. For commercial tenants, substitute the explicit
.usdomain suffixes in the remaining rules with .comequivalents — the
tag-based rules do not change.
FQDN TAG CONTENT GAPS IN GCC HIGH — PAIR TAGS WITH
EXPLICIT FALLBACKS
Service tags (IP-based) are reliably cloud-aware and resolve to sovereign IP
ranges automatically. FQDN tags (FQDN-based) do not always carry
their full sovereign FQDN list. The Azure Firewall FQDN tags overview
documents that customers cannot inspect or modify tag contents —
Microsoft hand-curates the FQDN list per tag, and sovereign endpoints
sometimes lag or are missing entirely. Observed in deployments: *.wvd.az
ure.us(the GCC High AVD broker domain) is documented under the Win
dowsVirtualDesktopservice tag but is not reliably present in the Window
sVirtualDesktopFQDN tag — traffic falls through to the deny-all even
when the rule is correctly configured.
The pattern in this appendix is to pair every FQDN tag with explicit
sovereign FQDNs as a fallback. The tag still buys forward compatibility
for what Microsoft does maintain in it; the explicit fallback closes the gap.
If you find another denied FQDN that should be covered by a tag, add it
explicitly to the corresponding rule rather than assuming the tag is wrong.
8.4.1 Rule Structure and Priority Model
Rules are organized into application rule collections and network rule collections.
Within each collection, rules are evaluated top-to-bottom. Collections are evaluated
lowest-priority-number first. The deny-all catch-all at priority 4096 terminates any
Securing Microsoft 365 in GCC High | 2026.04.30
768

traffic not matched by an explicit allow.
APPLICATION RULES AND NETWORK RULES HAVE SEPARATE
PRIORITY NAMESPACES
In the Azure Firewall UI, Application rule collections and Network rule
collections are configured in separate tabs with independent priority
numbering. A network rule at Priority 200 and an application rule at
Priority 200 do not conflict — they are evaluated independently.
Application rule collections (FQDN-based, for TCP/HTTP/HTTPS traffic):
Priority Collection Scope
100 AVD-Control-Plane AVD platform (tag) +
deployment-specific
storage, ServiceBus, Key
Vault, ARM, Graph, agent
hub
110 Cert-Services Third-party CRL/OCSP
(Entrust, DigiCert,
GlobalSign)
120 M365 Microsoft 365 (Office365
tag) and Intune
(MicrosoftIntune tag)
130 Windows-Management Windows Update,
diagnostics, activation,
browser, NCSI,
SmartScreen, CRL/OCSP
140 Defender-For-Endpoint MDE sensor
communication (MAPS tag
+ portal)
150 Third-Party-Security Proofpoint URL Defense,
PhishAlarm
200–299 Customer-* Customer-specific
application rules (see
template)
Appendix C: AVD Firewall Reference
769

Priority Collection Scope
4096 Deny-All-Log Catch-all deny with
logging
Network rule collections (IP/port-based, evaluated before application rules for
matching traffic):
Priority Collection Scope
200 Essential-Ports DNS, IMDS, Azure health
probe, NTP
210 Teams-Media Teams audio/video UDP
ports
220 Azure-Services Entra ID, Azure Monitor,
KMS activation via service
tags
8.4.2 Application Rule Collections
8.4.2.1 Priority 100: AVD-Control-Plane
Rule Name Protocol Target Purpose
AVD-Platform HTTPS:443 fqdnTag: Windows
VirtualDesktop
plus explicit
FQDNs: *.wvd.az
ure.us, ecs.offi
ce.com, *.attes
t.azure.us
AVD gateway,
broker, attestation,
side-by-side stack,
connection center,
and Azure
Attestation. *.wv
d.azure.uscovers
the GCC High
broker domain that
the FQDN tag does
not reliably carry
(see the FQDN-tag-
gap warning
above). ecs.offic
e.comis the AVD
Securing Microsoft 365 in GCC High | 2026.04.30
770

Rule Name Protocol Target Purpose
connection center
— Microsoft's
endpoint reference
documents it
without a service
tag, so it must be
listed explicitly.
*.attest.azur
e.uscovers Azure
Attestation regional
endpoints (shared
ugv.ugv.attes
t.azure.us, shar
eduga.uga.attes
t.azure.us, etc.)
used by Trusted
Launch VMs at
boot to validate
TPM and Secure
Boot state. The Azu
reAttestation
service tag exists
but is IP-based
(NSG / network
rules only); for
application-rule
FQDN coverage
the wildcard is
required.
AVD-Deployment HTTPS:443 *.blob.core.usg
ovcloudapi.net,
*.table.core.us
govcloudapi.net,
*.servicebus.us
govcloudapi.net,
*.vault.usgovcl
oudapi.net, mana
gement.usgovclo
udapi.net, pasf
f.usgovcloudap
i.net, graph.mic
rosoft.us, agent
hubprod.azureed
ge.us, fs.micros
Storage,
ServiceBus, Key
Vault, ARM,
Graph, agent hub,
and Windows
config service —
deployment-
specific endpoints
not covered by the
tag
Appendix C: AVD Firewall Reference
771

Rule Name Protocol Target Purpose
oft.com
AVD-Deployment-
Http
HTTP:80 ctldl.windowsup
date.com, fs.mic
rosoft.com
Certificate trust list
and Windows
config service —
HTTP-only access
path (the HTTPS
access path is
covered by AVD-
Deployment)
8.4.2.2 Priority 110: Cert-Services
Rule Name Protocol Target FQDNs Purpose
Cert-Services HTTPS:443,
HTTP:80
*.entrust.net,
*.digicert.com,
*.globalsign.co
m
CRL/OCSP for
third-party
certificate
authorities
8.4.2.3 Priority 120: M365
Rule Name Protocol Target Purpose
Office365 HTTPS:443 fqdnTag: Office3
65plus explicit
FQDNs: *.edge.s
kype.com
Exchange,
SharePoint, Teams
signaling, and
Microsoft identity
endpoints (logi
n.microsoftonli
ne.us, *.msftaut
h.net, *.aadcd
n.msftauth.net).
The explicit *.edg
e.skype.com
covers the Teams/
Skype
configuration
Securing Microsoft 365 in GCC High | 2026.04.30
772

Rule Name Protocol Target Purpose
endpoints (e.g., con
fig.edge.skyp
e.com) that the
Office365 FQDN
tag does not
reliably carry in
GCC High.
Intune HTTPS:443 fqdnTag: Microso
ftIntuneplus
explicit FQDNs:
*.manage.micros
oft.us
Intune portal,
MDM enrollment,
policy delivery.
The explicit *.man
age.microsoft.u
scovers the Intune
service endpoints
(manage.microsof
t.us, r.manage.m
icrosoft.us, etc.)
documented by
Microsoft that the
MicrosoftIntune
FQDN tag does not
reliably carry in
GCC High.
TEAMS MEDIA TRAFFIC GOES THROUGH NETWORK RULES, NOT
APPLICATION RULES
Teams audio and video (real-time media) use UDP ports 3478–3481 and
49152–53247 (ephemeral). These cannot be matched by FQDN-based
application rules because UDP traffic is evaluated by Azure Firewall
network rules only. See Network Rules: Teams-Media below.
8.4.2.4 Priority 130: Windows-Management
Rule Name Protocol Target Purpose
WindowsUpdate HTTPS:443, fqdnTag: Windows Windows Update,
Appendix C: AVD Firewall Reference
773

Rule Name Protocol Target Purpose
HTTP:80 Updateplus
explicit FQDNs: a
dl.windows.com
Delivery
Optimization,
WSUS catalog, and
App metadata
WindowsDiagnosti
cs
HTTPS:443 fqdnTag: Windows
Diagnosticsplus
explicit FQDNs:
*.events.data.m
icrosoft.com,
*.wosc.service
s.microsoft.com
Windows
telemetry,
Connected User
Experiences, and
OneSettings
(Windows OS
configuration
delivery). The
explicit *.event
s.data.microsof
t.comcovers
versioned telemetry
subdomains (e.g., v
20.events.dat
a.microsoft.co
m); the explicit *.w
osc.services.mi
crosoft.com
covers Microsoft's
newer OneSettings
namespace (prod.c
lient.wosc...)
under the unified s
ervices.microso
ft.comumbrella,
which the tag's
curated list has not
yet picked up. Both
wildcards are
forward-compatible
with future
subdomain rollouts.
WNS HTTPS:443 *.wns.windows.c
om
Windows Push
Notification
Service — toast/tile
notifications,
Microsoft Store
update push, MDM
notification
Securing Microsoft 365 in GCC High | 2026.04.30
774

Rule Name Protocol Target Purpose
channel. Not
currently covered
by any FQDN tag.
Store-Licensing-
Activation
HTTPS:443,
HTTP:80
*.sls.microsof
t.com, licensin
g.mp.microsof
t.com, displayca
talog.mp.micros
oft.com, title
s.gcch.mos.sv
c.usgovcloud.mi
crosoft, service
s.autopatch.mic
rosoft.us, cdn.o
neget.org, enter
priseregistrati
on.windows.net
Windows/Office
activation, Store
catalog, Autopatch
control plane,
Package
Management, and
Entra registration
Edge-Browser HTTPS:443 edge.microsof
t.com, msedge.ap
i.cdp.microsof
t.com
Edge update and
configuration
NCSI HTTP:80 www.msftconnect
test.com, window
s.msn.com, windo
ws.msn.cn
Network
Connectivity Status
Indicator
SmartScreen-
Watson
HTTPS:443 *.smartscreen.m
icrosoft.com,
*.urs.microsof
t.com, *.watso
n.microsoft.com
SmartScreen URL
reputation +
Watson error
reporting
CRL-OCSP HTTP:80,
HTTPS:443
ocsp.msocsp.com,
mscrl.microsof
t.com, oneocsp.m
icrosoft.com, cr
l.microsoft.com,
crl2.microsof
t.com, *.pki.cor
e.windows.net, w
ww.microsoft.co
m, go.microsof
Microsoft
certificate
revocation list and
OCSP distribution
Appendix C: AVD Firewall Reference
775

Rule Name Protocol Target Purpose
t.com
8.4.2.5 Priority 140: Defender-For-Endpoint
Rule Name Protocol Target Purpose
MAPS HTTPS:443 fqdnTag: Microso
ftActiveProtect
ionService
Cloud-delivered
protection (block-
at-first-sight,
reputation, sample
submission)
MDE-Portal HTTPS:443 *.security.micr
osoft.us, securi
ty.microsoft.us,
*.winatp-gw-us
w.microsoft.com
Defender portal
(GCC High), MDE
West gateway
8.4.2.6 Priority 150: Third-Party-Security
Rule Name Protocol Target FQDNs Purpose
Proofpoint HTTPS:443,
HTTP:80
urldefense.us,
*.urldefense.us,
addin-us.securi
tyeducation.com
Proofpoint URL
Defense rewrite/
click-through,
PhishAlarm
reporting add-in
8.4.3 Network Rule Collections
8.4.3.1 Priority 200: Essential-Ports
Traffic that cannot be expressed as FQDNs (IP-based or protocol-based
infrastructure requirements).
Securing Microsoft 365 in GCC High | 2026.04.30
776

Rule
Name Protocol Source Destinatio
n
Destinatio
n Port Purpose
DNS UDP, TCP Session
host subnet
Any 53 DNS
resolution
(use Azure
DNS or
your DNS
resolver IP)
IMDS TCP Session
host subnet
169.254.16
9.254
80 Azure
Instance
Metadata
Service —
required for
VM identity
tokens
Azure-
HealthProb
e
TCP Session
host subnet
168.63.129.
16
80 Azure load
balancer
health
probe —
required for
VM
reachability
NTP UDP Session
host subnet
Any 123 NTP time
sync
IMDS AND AZURE HEALTH PROBE MUST BE ALLOWED
169.254.169.254(IMDS) and 168.63.129.16(health probe) are link-
local addresses that Azure uses for internal platform communication. If
your UDR sends all traffic to the firewall and these destinations are blocked
by the deny-all rule, VMs will lose their managed identity tokens and
health probe responses — causing enrollment failures, Intune policy
application errors, and VM unavailability in the load balancer.
8.4.3.2 Priority 210: Teams-Media
Teams real-time audio and video require UDP. Azure Firewall cannot inspect UDP
by FQDN — these ports must be opened by IP range or service tag.
Appendix C: AVD Firewall Reference
777

Rule
Name Protocol Source Destinatio
n
Destinatio
n Ports Purpose
Teams-
STUN-
TURN
UDP Session
host subnet
AzureClou
d.usgovvi
rginia, Az
ureClou
d.usgovar
iz
3478–3481 STUN/
TURN for
Teams
media relay
Teams-
Media-
Ephemeral
UDP Session
host subnet
AzureClou
d
49152–532
47
Teams
audio/video
media
streams
WHY SUCH A WIDE PORT RANGE?
Teams uses ephemeral UDP ports (49152–53247) for peer-to-peer and
relay media. The Microsoft transport relay selects from this range based on
session negotiation. Narrowing the range causes intermittent audio/video
failures that are difficult to diagnose because HTTPS signaling continues to
work.
8.4.3.3 Priority 220: Azure-Services
Service-tag rules for Azure platform services where IP-range coverage is more
reliable than FQDN matching, and for KMS activation's non-HTTPS port.
Rule
Name Protocol Source
Destinatio
n (Service
Tag)
Destinatio
n Ports Purpose
AzureActiv
eDirectory
TCP Session
host subnet
AzureActi
veDirecto
ry
443 Entra ID IP
range
coverage
AzureMonit
or
TCP Session
host subnet
AzureMoni
tor
443 Log
Analytics,
diagnostics,
Azure
Monitor
Securing Microsoft 365 in GCC High | 2026.04.30
778

Rule
Name Protocol Source
Destinatio
n (Service
Tag)
Destinatio
n Ports Purpose
KMS-
Activation
TCP Session
host subnet
AzureClou
d
1688 Windows
KMS
license
activation
8.4.4 Customer Application Rule Template
Customer-specific applications are added at Priority 200–299. Each customer
deployment adds its own collection with a unique priority number within that range.
8.4.4.1 Assessment Checklist
Before deploying, inventory the applications your AVD users will access and
categorize each:
• Government portals — agency-specific web applications (common:
SAM.gov, USASpending.gov, MAX.gov)
• File sharing / transfer — SFTP servers, managed file transfer services,
large file upload portals
• Line-of-business SaaS — CRM, ERP, project management, HR
systems
• Authentication chains — OAuth providers for those SaaS apps (may
require additional auth FQDNs)
• Vendor-specific tooling — specialized software with cloud licensing or
telemetry (e.g., engineering software license servers, GIS platforms)
• Video conferencing (non-Teams) — Zoom, Webex, Google Meet each
have their own FQDN/port requirements
• Print/scan services — cloud print services if local printing is required
from AVD sessions
8.4.4.2 Template Structure
Collection: Customer-[AppName]
Priority: 200 (increment by 1 for each additional collection)
Action: Allow
Rules:
[AppName]-Primary    HTTPS:443    [primary FQDNs]       Primary application
Appendix C: AVD Firewall Reference
779

[AppName]-Auth       HTTPS:443    [auth FQDNs]          OAuth/SAML auth cha
in
[AppName]-CDN        HTTPS:443    [CDN FQDNs]           Static assets / CDN
[AppName]-API        HTTPS:443    [API FQDNs]           API endpoints
8.4.4.3 Common Categories and Known FQDNs
Category Common FQDNs to Add Notes
Salesforce *.salesforce.com, *.fo
rce.com, *.my.salesfor
ce.com
The *.my.salesforce.co
mentry is required — the
base *.salesforce.com
does not cover custom
subdomain auth redirects
ServiceNow *.service-now.com, *.s
ervicenow.com
Two domains used across
product versions
Zoom *.zoom.us, *.zoomgov.c
om, *.zoom.com
UDP 8801–8802 may be
needed for media; add
network rule if required
Workday *.workday.com, *.mywor
kday.com, *.wd[n].mywo
rkday.com
wd[n]varies by tenant;
identify your tenant's
subdomain first
Adobe Acrobat (cloud) *.acrobat.com, *.arcla
bs.com, *.adobelogin.c
om
License activation uses *.a
dobelogin.com— if
missing, Acrobat starts in
trial mode
Esri / ArcGIS *.arcgis.com, *.esri.c
om, *.arcgisonline.com
GIS platform with many
CDN subdomains; start
with wildcard, narrow after
logging
IDENTIFY UNKNOWN FQDNS BEFORE DENY-ALL GOES LIVE
Before adding the deny-all rule, run the firewall in allow-with-logging
mode for 2–4 weeks with session hosts in production use. Export the
firewall logs, extract the unique FQDNs, and use them to build your
customer-specific rule collections. The KQL queries in the Troubleshooting
section below are designed for this workflow.
Securing Microsoft 365 in GCC High | 2026.04.30
780

8.4.5 Firewall Troubleshooting KQL
These queries run against the Log Analytics workspace connected to your Azure
Firewall diagnostic settings. The firewall must have diagnostic settings configured
to send AzureFirewallApplicationRuleand AzureFirewallNetworkRulelogs
to the workspace.
8.4.5.1 Query 1: All Denied Traffic (Triage)
Surfaces every denied connection — application and network rule denials — sorted
by frequency.
AzureDiagnostics
| where Category in ("AzureFirewallApplicationRule", "AzureFirewallNetworkRul
e")
| where msg_s contains "Deny"
| extend
RuleCollection = extract(@"Rule Collection:\s*([^.]+)", 1, msg_s),
SourceIP = extract(@"from\s+([\d.]+):\d+", 1, msg_s),
DestFQDN = extract(@"to\s+([\S]+):\d+", 1, msg_s),
DestPort = extract(@"to\s+[\S]+:(\d+)", 1, msg_s),
Protocol = extract(@"Protocol:\s*(\S+)", 1, msg_s)
| summarize DenyCount = count(), LastSeen = max(TimeGenerated) by SourceIP, D
estFQDN, DestPort, Protocol, RuleCollection
| order by DenyCount desc
| take 100
8.4.5.2 Query 2: Single Host Investigation
When a user reports a specific application is broken, filter to their session host IP to
see only their denied connections.
// Replace with the session host private IP of the affected user's session
let TargetIP = "10.x.x.x";
AzureDiagnostics
| where Category in ("AzureFirewallApplicationRule", "AzureFirewallNetworkRul
e")
| where msg_s contains "Deny"
| where msg_s contains TargetIP
| extend
SourceIP = extract(@"from\s+([\d.]+):\d+", 1, msg_s),
DestFQDN = extract(@"to\s+([\S]+):\d+", 1, msg_s),
DestPort = extract(@"to\s+[\S]+:(\d+)", 1, msg_s),
Protocol = extract(@"Protocol:\s*(\S+)", 1, msg_s)
| where SourceIP == TargetIP
| project TimeGenerated, SourceIP, DestFQDN, DestPort, Protocol
| order by TimeGenerated desc
Appendix C: AVD Firewall Reference
781

8.4.5.3 Query 3: FQDN Baseline (Before Deny-All Activation)
Run this during the allow-with-logging validation period to build your customer
application rule list. This query shows every unique FQDN reached by session hosts
— sorted by frequency — which becomes the input for building Priority 200+
customer collections.
// Set time range to cover representative business usage (1–2 weeks recommend
ed)
AzureDiagnostics
| where Category == "AzureFirewallApplicationRule"
| where msg_s contains "Allow"
| extend
DestFQDN = extract(@"to\s+([\S]+):\d+", 1, msg_s),
DestPort = extract(@"to\s+[\S]+:(\d+)", 1, msg_s),
SourceIP = extract(@"from\s+([\d.]+):\d+", 1, msg_s)
| where isnotempty(DestFQDN)
// Exclude already-documented infrastructure FQDNs to focus on unknown destin
ations
| where DestFQDN !endswith ".microsoft.com"
and DestFQDN !endswith ".microsoft.us"
and DestFQDN !endswith ".windows.net"
and DestFQDN !endswith ".usgovcloudapi.net"
| summarize
HitCount = count(),
UniqueHosts = dcount(SourceIP),
LastSeen = max(TimeGenerated)
by DestFQDN, DestPort
| order by HitCount desc
EXPORT AND CATEGORIZE THE BASELINE
Export the results of Query 3 to CSV and sort by HitCount. The top entries
by hit count are the applications your users depend on most heavily. Group
the FQDNs by application (often recognizable by domain) and build one
customer rule collection per application. Low-frequency FQDNs that
appear from only one or two hosts are candidates for closer review before
allowing.
8.4.6 Update Procedure
The Bicep template is the source of truth for the rule set. Do not edit rules through
the Azure portal — portal edits drift silently from the template, get overwritten on
the next deployment, and leave no CAB-reviewable diff. Every rule change flows
through the template.
Securing Microsoft 365 in GCC High | 2026.04.30
782

8.4.6.1 When to deploy an update
• New application FQDNs discovered via the Query 3 baseline that need to
be promoted into an allow rule.
• Microsoft documentation changes to required endpoints for AVD, M365,
Intune, or MDE that are not absorbed by the existing FQDN tags (the Wind
owsVirtualDesktop, Office365, MicrosoftIntune, WindowsUpdate, W
indowsDiagnostics, and MicrosoftActiveProtectionServicetags
auto-update; changes outside those tags' scope surface as new denies in
Query 1).
• A new workload added to the AVD environment (new SaaS, new line-of-
business app, new security tool).
• Retirement of a rule for a decommissioned application.
8.4.6.2 Prerequisites
• Azure CLI installed on the change operator's workstation, authenticated to
Azure Government.
• Read/write access to the target resource group via a PIM-activated role
(typically Firewall Contributor or Network Contributor).
• The Bicep template (avd-firewall.bicep) and the deployment script (lo
ad-firewall.azcli) under version control — every change reviewed and
approved before deployment.
• An approved CAB ticket for CM.L2-3.4.3 evidence.
8.4.6.3 Deployment script: load-firewall.azcli
The three deployment commands wrapped as a runnable Azure CLI script.
Commands 1 and 2 run once per firewall; command 3 runs on every rule update.
Replace the placeholder values (<subscription-guid>, <firewall-name>, <rg-
name>, <policy-name>) with the customer-specific values before running.
Download: load-firewall.azcli
# 1. Connect to Azure Government
az cloud set --name AzureUSGovernment
az account set --subscription <subscription-guid>
az login
# 2. One-time: associate the firewall with the policy object represented by t
he Bicep template.
# az network firewall update --name <firewall-name> --resource-group <rg-nam
e> --firewall-policy <policy-name>
# 3. Every update: deploy the Bicep template to the resource group.
az deployment group create --resource-group <rg-name> --template-file avd-fir
ewall.bicep
Appendix C: AVD Firewall Reference
783

8.4.6.4 Bicep template: avd-firewall.bicep
The full Azure Firewall policy expressed as a Bicep template — one resource per
rule collection, parameterized on location, policy name, and AVD subnet CIDR.
Deploy with the Deployment script above; the deployment is idempotent and a
previous-template redeploy is the rollback path.
Download: avd-firewall.bicep
param location string = 'usgovvirginia'
param firewallPolicyName string = 'fwp-avd-prod-usgovva'
param avdSubnetAddressSpace string = '10.0.0.0/24'
// 1. Create the Firewall Policy
resource firewallPolicy 'Microsoft.Network/firewallPolicies@2023-09-01' = {
name: firewallPolicyName
location: location
properties: {
sku: {
tier: 'Standard'
}
}
}
// 2. Network Rule Collections (Evaluated First)
resource networkRuleCollectionGroup 'Microsoft.Network/firewallPolicies/ruleC
ollectionGroups@2023-09-01' = {
parent: firewallPolicy
name: 'DefaultNetworkRuleCollectionGroup'
properties: {
priority: 200
ruleCollections: [
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'Essential-Ports'
priority: 200
action: { type: 'Allow' }
rules: [
{
ruleType: 'NetworkRule'
name: 'DNS'
ipProtocols: ['UDP', 'TCP']
sourceAddresses: [avdSubnetAddressSpace]
destinationAddresses: ['*']
destinationPorts: ['53']
}
{
ruleType: 'NetworkRule'
name: 'IMDS'
ipProtocols: ['TCP']
sourceAddresses: [avdSubnetAddressSpace]
destinationAddresses: ['169.254.169.254/32']
destinationPorts: ['80']
}
{
ruleType: 'NetworkRule'
name: 'Azure-HealthProbe'
ipProtocols: ['TCP']
Securing Microsoft 365 in GCC High | 2026.04.30
784

sourceAddresses: [avdSubnetAddressSpace]
destinationAddresses: ['168.63.129.16/32']
destinationPorts: ['80']
}
{
ruleType: 'NetworkRule'
name: 'NTP'
ipProtocols: ['UDP']
sourceAddresses: [avdSubnetAddressSpace]
destinationAddresses: ['*']
destinationPorts: ['123']
}
]
}
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'Teams-Media'
priority: 210
action: { type: 'Allow' }
rules: [
{
ruleType: 'NetworkRule'
name: 'Teams-STUN-TURN'
ipProtocols: ['UDP']
sourceAddresses: [avdSubnetAddressSpace]
destinationAddresses: ['AzureCloud.usgovvirginia', 'AzureCloud.us
govariz']
destinationPorts: ['3478-3481']
}
{
ruleType: 'NetworkRule'
name: 'Teams-Media-Ephemeral'
ipProtocols: ['UDP']
sourceAddresses: [avdSubnetAddressSpace]
destinationAddresses: ['AzureCloud']
destinationPorts: ['49152-53247']
}
]
}
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'Azure-Services'
priority: 220
action: { type: 'Allow' }
rules: [
{
ruleType: 'NetworkRule'
name: 'AzureActiveDirectory'
ipProtocols: ['TCP']
sourceAddresses: [avdSubnetAddressSpace]
destinationAddresses: ['AzureActiveDirectory']
destinationPorts: ['443']
}
{
ruleType: 'NetworkRule'
name: 'AzureMonitor'
ipProtocols: ['TCP']
sourceAddresses: [avdSubnetAddressSpace]
destinationAddresses: ['AzureMonitor']
destinationPorts: ['443']
}
{
Appendix C: AVD Firewall Reference
785

ruleType: 'NetworkRule'
name: 'KMS-Activation'
ipProtocols: ['TCP']
sourceAddresses: [avdSubnetAddressSpace]
destinationAddresses: ['AzureCloud']
destinationPorts: ['1688']
}
]
}
]
}
}
// 3. Application Rule Collections (Evaluated Second)
resource applicationRuleCollectionGroup 'Microsoft.Network/firewallPolicies/r
uleCollectionGroups@2023-09-01' = {
parent: firewallPolicy
name: 'DefaultApplicationRuleCollectionGroup'
dependsOn: [
networkRuleCollectionGroup
]
properties: {
priority: 300
ruleCollections: [
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'AVD-Control-Plane'
priority: 100
action: { type: 'Allow' }
rules: [
{
ruleType: 'ApplicationRule'
name: 'AVD-Platform'
protocols: [{ protocolType: 'Https', port: 443 }]
fqdnTags: ['WindowsVirtualDesktop']
targetFqdns: [
'*.wvd.azure.us'
'ecs.office.com'
'*.attest.azure.us'
]
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'AVD-Deployment'
protocols: [{ protocolType: 'Https', port: 443 }]
targetFqdns: [
'*.blob.core.usgovcloudapi.net'
'*.table.core.usgovcloudapi.net'
'*.servicebus.usgovcloudapi.net'
'*.vault.usgovcloudapi.net'
'management.usgovcloudapi.net'
'pasff.usgovcloudapi.net'
'graph.microsoft.us'
'agenthubprod.azureedge.us'
'fs.microsoft.com'
]
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'AVD-Deployment-Http'
Securing Microsoft 365 in GCC High | 2026.04.30
786

protocols: [{ protocolType: 'Http', port: 80 }]
targetFqdns: [
'ctldl.windowsupdate.com'
'fs.microsoft.com'
]
sourceAddresses: [avdSubnetAddressSpace]
}
]
}
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'Cert-Services'
priority: 110
action: { type: 'Allow' }
rules: [
{
ruleType: 'ApplicationRule'
name: 'Cert-Services'
protocols: [
{ protocolType: 'Https', port: 443 }
{ protocolType: 'Http', port: 80 }
]
targetFqdns: ['*.entrust.net', '*.digicert.com', '*.globalsign.co
m']
sourceAddresses: [avdSubnetAddressSpace]
}
]
}
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'M365'
priority: 120
action: { type: 'Allow' }
rules: [
{
ruleType: 'ApplicationRule'
name: 'Office365'
protocols: [{ protocolType: 'Https', port: 443 }]
fqdnTags: ['Office365']
targetFqdns: ['*.edge.skype.com']
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'Intune'
protocols: [{ protocolType: 'Https', port: 443 }]
fqdnTags: ['MicrosoftIntune']
targetFqdns: ['*.manage.microsoft.us']
sourceAddresses: [avdSubnetAddressSpace]
}
]
}
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'Windows-Management'
priority: 130
action: { type: 'Allow' }
rules: [
{
ruleType: 'ApplicationRule'
name: 'WindowsUpdate'
protocols: [
Appendix C: AVD Firewall Reference
787

{ protocolType: 'Https', port: 443 }
{ protocolType: 'Http', port: 80 }
]
fqdnTags: ['WindowsUpdate']
targetFqdns: [
'adl.windows.com'
]
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'WindowsDiagnostics'
protocols: [{ protocolType: 'Https', port: 443 }]
fqdnTags: ['WindowsDiagnostics']
targetFqdns: [
'*.events.data.microsoft.com'
'*.wosc.services.microsoft.com'
]
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'WNS'
protocols: [{ protocolType: 'Https', port: 443 }]
targetFqdns: ['*.wns.windows.com']
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'Store-Licensing-Activation'
protocols: [
{ protocolType: 'Https', port: 443 }
{ protocolType: 'Http', port: 80 }
]
targetFqdns: [
'*.sls.microsoft.com'
'licensing.mp.microsoft.com'
'displaycatalog.mp.microsoft.com'
'titles.gcch.mos.svc.usgovcloud.microsoft'
'services.autopatch.microsoft.us'
'cdn.oneget.org'
'enterpriseregistration.windows.net'
]
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'Edge-Browser'
protocols: [{ protocolType: 'Https', port: 443 }]
targetFqdns: [
'edge.microsoft.com'
'msedge.api.cdp.microsoft.com'
]
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'NCSI'
protocols: [{ protocolType: 'Http', port: 80 }]
targetFqdns: [
'www.msftconnecttest.com'
'windows.msn.com'
Securing Microsoft 365 in GCC High | 2026.04.30
788

'windows.msn.cn'
]
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'SmartScreen-Watson'
protocols: [{ protocolType: 'Https', port: 443 }]
targetFqdns: [
'*.smartscreen.microsoft.com'
'*.urs.microsoft.com'
'*.watson.microsoft.com'
]
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'CRL-OCSP'
protocols: [
{ protocolType: 'Http', port: 80 }
{ protocolType: 'Https', port: 443 }
]
targetFqdns: [
'ocsp.msocsp.com'
'mscrl.microsoft.com'
'oneocsp.microsoft.com'
'crl.microsoft.com'
'crl2.microsoft.com'
#disable-next-line no-hardcoded-env-urls
'*.pki.core.windows.net'
'www.microsoft.com'
'go.microsoft.com'
]
sourceAddresses: [avdSubnetAddressSpace]
}
]
}
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'Defender-For-Endpoint'
priority: 140
action: { type: 'Allow' }
rules: [
{
ruleType: 'ApplicationRule'
name: 'MAPS'
protocols: [{ protocolType: 'Https', port: 443 }]
fqdnTags: ['MicrosoftActiveProtectionService']
sourceAddresses: [avdSubnetAddressSpace]
}
{
ruleType: 'ApplicationRule'
name: 'MDE-Portal'
protocols: [{ protocolType: 'Https', port: 443 }]
targetFqdns: [
'*.security.microsoft.us'
'security.microsoft.us'
'*.winatp-gw-usw.microsoft.com'
]
sourceAddresses: [avdSubnetAddressSpace]
}
]
Appendix C: AVD Firewall Reference
789

}
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'Third-Party-Security'
priority: 150
action: { type: 'Allow' }
rules: [
{
ruleType: 'ApplicationRule'
name: 'Proofpoint'
protocols: [
{ protocolType: 'Https', port: 443 }
{ protocolType: 'Http', port: 80 }
]
targetFqdns: [
'urldefense.us'
'*.urldefense.us'
'addin-us.securityeducation.com'
]
sourceAddresses: [avdSubnetAddressSpace]
}
]
}
{
ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
name: 'Deny-All-Log'
priority: 4096
action: { type: 'Deny' }
rules: [
{
ruleType: 'ApplicationRule'
name: 'Deny-All-Application'
protocols: [
{ protocolType: 'Https', port: 443 }
{ protocolType: 'Http', port: 80 }
]
targetFqdns: ['*']
sourceAddresses: [avdSubnetAddressSpace]
}
]
}
]
}
}
8.4.6.5 Post-deployment validation
Run these checks immediately after every deployment before closing the CAB
ticket:
1. Rule count and structure. In the Azure portal, confirm the firewall policy
shows the expected collection names and priorities. The count of rules per
collection should match the template. Any discrepancy means the
deployment silently failed or the template does not reflect what was
intended.
2. Re-run Query 1 (All Denied Traffic). Check the 15 minutes immediately
Securing Microsoft 365 in GCC High | 2026.04.30
790

following the deployment for new denies on traffic that was previously
allowed. A spike is an early warning that a rule was accidentally narrowed
or removed.
3. Smoke-test the common paths — one user signs into AVD, opens Teams,
opens Outlook, opens a SharePoint site, triggers a Windows Update check.
If any path that worked before the deployment now fails, compare the
Bicep diff against the deployment target and prepare rollback.
4. Export the rule listing (az network firewall policy rule-collecti
on-group show) and attach to the CAB ticket as evidence of the post-
deployment state.
8.4.6.6 Rollback
Rollback is a redeploy of the previous template:
git checkout <previous-commit> -- avd-firewall.bicep
az deployment group create --resource-group <rg-name> --template-file avd-fir
ewall.bicep
git checkout HEAD -- avd-firewall.bicep
The deployment is idempotent — redeploying the prior state restores the prior rule
set. If a rule is actively breaking production, rollback is always faster than
attempting a forward-fix.
8.4.6.7 CAB evidence
Every deployment should close its CAB ticket with:
• The Git commit hash of the Bicep template deployed.
• The diff between the previous and new template.
• The az deployment group createcommand output.
• The Query 1 validation result (empty result or explained exceptions).
• The smoke-test log.
This package satisfies CM.L2-3.4.3 (Configuration Change Control) and
CM.L2-3.4.4 (Security Impact Analysis) for the AVD network boundary.
8.5 Appendix D: AVD Deployment
Timeline
This timeline covers a greenfield GCC High Azure Virtual Desktop deployment
— 20 personal-pool session hosts, one engineer, 65 hours budgeted. It is calibrated
Appendix D: AVD Deployment Timeline
791

for a cloud-only tenant with no existing Azure infrastructure, no on-premises AD,
and no Intune baseline. Adjust phase durations proportionally if infrastructure is
partially in place.
For architecture context and network topology, see Scenario: Azure Virtual
Desktop and the AVD Firewall Reference.
8.5.1 Deployment Parameters
Parameter Value
Tenant state Greenfield — no existing Azure or M365
GCC High configuration
Host pool type Personal (1 VM per user — no FSLogix,
no Shared PC Mode)
Session hosts 20 VMs, Windows 11 Enterprise single-
session
Users 20 (1:1 VM-to-user assignment)
Team One engineer
Total budget 65 hours
Azure region US Gov Virginia (recommended)
8.5.2 The 30-Day Commitment
A 30-day delivery timeline is achievable. The 65 implementation hours fit
comfortably within 30 calendar days for one engineer. What is not achievable in 30
days is provisioning a GCC High tenant and Azure Government subscription from
scratch — those processes are controlled entirely by Microsoft and your client's
licensing infrastructure, not by your team.
The practitioner's position should be stated explicitly at contract signing:
"We can deliver a production-ready secure enclave within 30 days from
the date you provide us with Global Admin access to your GCC High
Entra tenant and Subscription Owner access to your Azure Government
Securing Microsoft 365 in GCC High | 2026.04.30
792

subscription. The clock starts when access is granted, not when the
contract is signed."
Setting this expectation in writing at contract signing prevents the most common
source of delivery disputes on time-sensitive engagements.
8.5.3 Required Access (Non-Negotiable)
Two access grants are required before a single implementation hour can be logged.
Both must be in hand before Day 1.
Access Role Required Why
GCC High Entra tenant Global Administrator Required to configure
Conditional Access, Intune
enrollment, Entra Join
policies, and device
compliance. Scoped roles
are insufficient — tenant-
wide policy changes
require Global Admin
during initial build.
Azure Government
subscription
Subscription Owner Required to create resource
groups, deploy VNets,
Azure Firewall, host pools,
and assign RBAC.
Contributor role is
insufficient — RBAC
assignments require
Owner.
DO NOT BEGIN IMPLEMENTATION WITHOUT BOTH ACCESS
GRANTS
Starting work without Global Admin or Subscription Owner is the fastest
path to a failed engagement. You will hit a permission wall during Phase 1
or Phase 2, lose calendar days waiting for access to be granted, and absorb
the schedule impact while the client perceives a delivery failure. Require
both access grants as a contract condition, not a courtesy request.
Appendix D: AVD Deployment Timeline
793

8.5.4 Provisioning Lead Times (Customer
Responsibility)
These timelines are outside the engineer's control. Clients who say "we need this in
30 days" must be made aware of them at the earliest opportunity — ideally before
the contract is signed.
Item Typical Lead Time Notes
GCC High Entra tenant
provisioning
10–15 business days Requires an AOS-G
(Authorized Cloud Service
Provider) reseller and
Microsoft vetting. Cannot
be self-provisioned.
Azure Government
subscription provisioning
5–10 business days Requires an existing EA or
MCA-Gov agreement.
New subscriptions
occasionally require
manual Microsoft
approval.
EA / Volume Licensing
process
Indeterminate Organizations without an
active EA must negotiate
one before subscription
provisioning can begin. If
the EA admin has left the
organization, Microsoft
requires a formal process to
designate a new one — this
alone can take 2–4 weeks.
M365 GCC High license
procurement
3–5 business days after EA
is active
Must be in place before
identity and Intune phases
Securing Microsoft 365 in GCC High | 2026.04.30
794

Item Typical Lead Time Notes
begin.
THE EA ADMINISTRATOR GAP IS THE LEAST VISIBLE AND MOST
DISRUPTIVE RISK
An organization that has lost its EA administrator cannot provision or
modify subscriptions until Microsoft acknowledges a new one. If your
client does not know who their EA administrator is, treat this as a red flag
and require resolution before contract execution. Do not assume the client's
Microsoft account team will resolve it quickly — Microsoft account
representatives go on leave, change accounts, and have no SLA obligation
to expedite internal licensing processes.
8.5.5 Prerequisites (Outside the 65-Hour Clock)
All items below must be resolved before implementation begins. Each is a hard
blocking dependency.
Item Owner Blocks
Global Admin access to
GCC High Entra tenant
granted to engineer
Customer All phases
Subscription Owner access
to Azure Government
subscription granted to
engineer
Customer Phase 1
M365 GCC High E3 or E5
licenses procured for all 20
users
Customer Phases 2, 5
List of 20 users with
confirmed UPNs
Customer Phase 4
IP address plan approved Engineer + Customer Phase 1
Appendix D: AVD Deployment Timeline
795

Item Owner Blocks
(VNet CIDR, subnet
CIDRs)
Region confirmed (US Gov
Virginia recommended)
Customer Phase 1
"Users may join devices to
Microsoft Entra ID" policy
change approved
Customer leadership Phase 4
8.5.6 Phase Summary
Phase Focus Hours Cumulative
1 Azure Network
Foundation
9 9
2 Identity &
Conditional Access
8 17
3 Intune Baseline 7.5 24.5
4 AVD Build 10–12 34.5–36.5
5 MDE Onboarding 3 37
6 Firewall Tuning 8 45
7 CA Policy
Enforcement
4 49
8 End-to-End Testing 7 56
9 Documentation &
Handoff
4 60
Contingency 5 65
Securing Microsoft 365 in GCC High | 2026.04.30
796

8.5.7 Phase 1 — Azure Network Foundation
Hours 1–9
Activity Hours
VNet, session host subnet, Azure Firewall
subnet, UDR (0.0.0.0/0 → Firewall)
2
Azure Firewall deployment and initial
application rule configuration
3.5
Network rules (Essential-Ports, Teams-
Media)
1
Log Analytics workspace + Azure
Firewall diagnostic settings
0.5
NSG on session host subnet 0.5
DNS configuration 0.5
Azure Backup vault (for VM disk backup) 1
Personal pool note: Because user data persists on the VM OS disk (no FSLogix),
Azure Backup on VM disks is required here, not deferred. A user whose VM is
deleted without a backup loses their profile and all locally stored data.
The Azure Firewall provisions in 10–15 minutes. Use that wait time to begin Phase
2 preparation.
Start from the AVD Firewall Reference rule collections rather than building rules
from scratch. The initial rule set covers Priority 100–140 baseline; customer
application rules are tuned in Phase 6.
8.5.8 Phase 2 — Identity & Conditional Access
Hours 9–17
Appendix D: AVD Deployment Timeline
797

Activity Hours
Break-glass accounts (2) — .onmicrosof
t.comdomain, YubiKey or long password
in vault
0.5
Restricted Management AU creation and
security group assignment
0.5
Entra security groups
(EID_Emergency_Admin_Exclusions,
EID_MFA_Exempt_Users,
EID_Phishing_Resistant_Auth_Enforceme
nt, EID_Service_Accounts,
EID_TAP_Users,
EID_Users_On_Managed_Devices,
AVD_Users)
1
Authentication methods: passkey
(FIDO2), TAP policy, phishing-resistant
auth strength definition
1
Conditional Access policies — all 13
policies in Report-Only mode
4
Verify break-glass accounts excluded from
all policies
0.5
Confirm "Users may join devices to
Microsoft Entra ID" = All
0.5
CA policies stay in Report-Only through Phase 6. Enabling Block or Grant
controls before AVD is verified working will block enrollment, Intune sync, and
MDE onboarding. Enforce in Phase 7 only.
WHfB provisioning gap — address in user onboarding communication before
go-live. Windows Hello for Business cannot be provisioned over an RDP session.
Every user must register a passkey or Microsoft Authenticator method at mysignin
s.microsoft.combefore their first AVD login. If phishing-resistant CA is
enforced at go-live and a user has not pre-registered, their session will be blocked
with no actionable error message.
Securing Microsoft 365 in GCC High | 2026.04.30
798

8.5.9 Phase 3 — Intune Baseline
Hours 17–24
Activity Hours
MDM User Scope → All (or targeted
AVD_Users group)
0.5
Enrollment restrictions — block
Personally Owned Windows device
enrollment
0.5
OIB import and assignment to AVD
session host Entra group
2.5
Compliance policy for AVD session hosts
(MDE risk level, BitLocker, OS version)
1
Windows Update rings (conservative ring
for session hosts)
0.5
OneDrive KFM policy (Settings Catalog:
Silently move known folders, Tenant ID,
SSO, Prevent redirect)
0.5
Verify first manually-enrolled test VM
receives all policies
2
Do not deploy FSLogix or Shared PC Mode policies to personal pool VMs.
Shared PC Mode deletes user profiles on logout — on a personal pool where profile
persistence is the goal, this destroys the user's work. FSLogix policies targeting
blob/SMB storage are not needed because each VM has a dedicated user whose
profile stays on the local disk.
Verify the test VM fully before provisioning the remaining 19 VMs. A policy error
discovered on VM 1 is a 30-minute fix; the same error discovered after provisioning
all 20 requires 20 remediation actions.
8.5.10 Phase 4 — AVD Build
Hours 24–34
Appendix D: AVD Deployment Timeline
799

Activity Hours
Host Pool creation — Personal type,
Direct assignment, US Gov Virginia
0.5
Application Group + Workspace creation 0.5
RDP Properties: enablerdsaadauth:i:1,
targetisaadjoined:i:1, redirectcli
pboard:i:0, drivestoredirect:s:
0.5
RBAC: Virtual Machine User Login →
AVD_Users group (Resource Group
scope)
0.5
RBAC: Virtual Machine Administrator
Login → IT admin accounts
0.5
AVD service principal — Virtual Machine
Contributor on Resource Group (required
for Start VM on Connect)
0.5
20 VM provisioning in batches —
Windows 11 Enterprise, Entra join, Intune
enroll
3
Start VM on Connect configuration 1
Direct user-to-VM assignments (20 users
→ 20 VMs)
1
Sample verification: dsregcmd /status,
Intune enrollment, sovereign MdmUrl
check
2
(Optional) Nerdio Manager — service
principal onboarding, power schedule
configuration
1–2
Start VM on Connect is not optional. Without it, all 20 VMs run 24/7 at full
compute cost. The AVD service principal must have Virtual Machine Contributor
on the resource group or it silently fails to start VMs on user connection — users
receive a generic "remote session couldn't be started" error with no indication of
root cause.
Use Direct assignment (not Automatic) for a named 20-user deployment. Direct
Securing Microsoft 365 in GCC High | 2026.04.30
800

assignment makes user-to-VM mapping explicit, simplifies support ("which VM is
yours?"), and enables consistent VM naming (e.g., ENCL-USR-01through ENCL-US
R-20).
THE ENTRA JOIN CONSTRAINT — "USERS MAY JOIN DEVICES"
MUST BE ALL
The AADLoginForWindowsVM extension that Entra-joins the session hosts
runs at SYSTEM level and is subject to the tenant-level "Users may join
devices to Microsoft Entra ID" policy. It cannot be scoped to a service
principal. This policy must be set to All or VM provisioning silently fails at
the join step. Mitigate with enrollment restrictions (blocks personal device
MDM enrollment) and P006 (requires compliant device for resource
access). See Scenario: Azure Virtual Desktop for the full compensating
control set.
8.5.11 Phase 5 — MDE Onboarding
Hours 34–37
Activity Hours
Enable MDE–Intune connector at securi
ty.microsoft.us
0.5
Create EDR policy (Auto from connector,
All samples, Expedited telemetry)
0.5
Create Antivirus policy (Tamper
Protection on, Real-Time Protection on,
Cloud-Delivered Protection: High)
0.5
Assign both policies to AVD session host
Entra group
0.5
Verify all provisioned VMs show sensor
health: Active in Defender portal
1
Allow 15–30 minutes after policy assignment for devices to check in and onboard
before checking the Defender portal.
Appendix D: AVD Deployment Timeline
801

8.5.12 Phase 6 — Firewall Tuning
Hours 37–45
Activity Hours
End-to-end connectivity test: user
connects, opens Teams, Outlook,
SharePoint
1
KQL Query 1 (All Denied Traffic) —
review and categorize denies
1.5
Add customer application FQDNs to
Customer-* collections (Priority 200+)
2
Teams audio/video test — verify UDP
3478–3481 and 49152–53247 pass
1
Second deny log review after rule
additions
1
Activate deny-all catch-all rule (Priority
4096)
0.5
Final connectivity sweep with deny-all
active
1
Inventory customer applications before this phase. A Microsoft-only workload
(Teams, Outlook, SharePoint) resolves in 4 hours. Each undiscovered SaaS
application adds 30–90 minutes to identify and build its FQDN chain (primary
domain, OAuth redirect, CDN, API endpoint). The Customer Application Rule
Template and KQL queries are designed for this workflow.
This phase has the highest schedule variance in the engagement. Two or three
undiscovered SaaS applications can consume the contingency reserve on their own.
8.5.13 Phase 7 — CA Policy Enforcement
Hours 45–49
Securing Microsoft 365 in GCC High | 2026.04.30
802

Enable CA policies from Report-Only to Enforced in risk order. Allow 15–30
minutes between enabling each high-risk policy and confirming no unexpected
blocks in Entra sign-in logs.
Policy Enable Order Risk Level
B001 Block Legacy
Authentication
1 Low
B003 Block Device Code
Flow
2 Low
B005 / B006 Block Non-
Approved Registration
3 Low
B002 Block Non-Approved
Locations
4 Medium
A001 Require MFA 5 Medium — verify all 20
users have MFA registered
first
A002 Require Phishing-
Resistant Auth
6 High — verify all users
have passkey or WHfB
enrolled
P006 Require Compliant
Devices
7 High — verify all 20 VMs
are Intune-compliant
before enabling
B007 / B008 High Risk
Sign-In Blocks
8 Low operational impact
DO NOT ENABLE P006 BEFORE VERIFYING ALL VMS ARE INTUNE-
COMPLIANT
If any of the 20 session hosts is non-compliant when P006 is enforced,
users assigned to that VM will be blocked from all M365 resources. Check
Intune > Devices > All Devices and confirm every VM shows Compliant
before enabling this policy.
Appendix D: AVD Deployment Timeline
803

8.5.14 Phase 8 — End-to-End Testing
Hours 49–56
Activity Hours
Full user simulation: connect, work
session, disconnect, reconnect — verify
profile persists on personal VM
1.5
Verify clipboard is blocked (attempt paste
from local machine into session)
0.5
Verify drive redirection is blocked
(attempt to map local drive into session)
0.5
MDE portal: confirm all 20 VMs at sensor
health Active
0.5
Intune portal: confirm all 20 VMs
compliant
0.5
Entra sign-in logs: review for unexpected
CA blocks since enforcement
1
Azure Backup: run test backup job, verify
recovery point created for a sample VM
1
Start VM on Connect: power down a VM,
connect as that user, verify VM auto-starts
0.5
ASR rule review: check Defender portal
for false-positive hits across the pool
1
8.5.15 Phase 9 — Documentation & Handoff
Hours 56–60
Deliverable Hours
As-built: VNet/subnet CIDRs, firewall
rule collections, AVD host pool
1
Securing Microsoft 365 in GCC High | 2026.04.30
804

Deliverable Hours
configuration
Runbook: user onboarding (VM
assignment, MFA pre-enrollment, first-
login steps)
1
Runbook: user offboarding (retire Intune,
disable Entra device, delete VM if
decommissioning)
0.5
Runbook: VM replacement (re-provision,
re-assign user, restore profile from Azure
Backup)
0.5
Customer walkthrough: Defender portal,
Intune compliance dashboard, firewall
deny logs
1
8.5.16 Contingency Reserve — 5 Hours
Likely Draw Estimated Hours
Azure Government subscription approval
delay (calendar, not implementation hours
— but unblocking activities take time)
1–2
Firewall tuning overrun — each
undiscovered SaaS application beyond the
Microsoft baseline
0.5–1.5 per app
CA enforcement rollback — diagnosing
unexpected blocks after enabling P006 or
A002
1–2
The 5-hour contingency is adequate for a well-prepared engagement. If the
customer cannot confirm their application inventory before Phase 6, treat the
contingency as pre-consumed and have a change-order conversation before starting.
Appendix D: AVD Deployment Timeline
805

8.6 Appendix D: Licensing &
Compliance Matrix
The choice between Microsoft 365 G3 (E3) and G5 (E5) is not merely a feature
decision—it is a "manual effort vs. automated enforcement" decision for
compliance. For an executive-level overview of the CRAWL-WALK-RUN
licensing path and when to upgrade, see License Tiers: G3 vs. G5 Decision Guide.
ENVIRONMENT: GCC HIGH
8.6.1 G3 vs. G5 for CMMC Level 2
While a CMMC Level 2 assessment can be passed on a G3 license, it requires
significant manual overhead for evidence collection (audit logs) and
administrative gating (privileged access). G5 "auto-satisfies" several high-
friction practices through automation and advanced telemetry.
In GCC High, the primary difference is the Purview Compliance and
Defender XDR suites. Note that Defender for Endpoint Plan 2 is uniquely
included in G3 GCC High, whereas it is a G5/add-on feature in Commercial.
CMMC
Practice Capability M365 GCC
High G3
M365 GCC
High G5
Compliance
Impact
AC.L2-3.1.5
(Least
Privilege)
Privileged
Identity
Management
(PIM)
No (Manual
admin
accounts)
Yes (JIT
Elevation)
G5 automates
"Just-in-
Time" access,
removing
standing
admin risk.
AC.L2-3.1.1
(Authorized
Access)
Entitlement
Management
No (Manual
invitations)
Yes (Access
Packages)
G5 provides
self-service
access
requests with
automated
expiry.
Securing Microsoft 365 in GCC High | 2026.04.30
806

CMMC
Practice Capability M365 GCC
High G3
M365 GCC
High G5
Compliance
Impact
AU.L2-3.3.1
(System
Auditing)
Audit Log
Retention
90 Days
(Standard)
1 Year
(Premium)
Critical:
CMMC
typically
requires 1
year of logs.
G3 requires
manual
export to
Sentinel/
Storage.
AU.L2-3.3.5
(Audit
Analysis)
Purview
Audit
Premium
No Yes G5 includes M
ailItemsAcc
essedevents,
a key
requirement
for forensics.
SC.L2-3.13.1
6 (CUI at
Rest)
Information
Protection
Manual
Labeling
Only
Auto-
Labeling
G5 can
automatically
encrypt CUI
based on
content scan
(SITs).
SI.L2-3.14.7
(Identify
Unauthorized
)
Defender for
Identity /
Cloud Apps
Add-on
Required
Included G5 provides
behavioral
analytics
across
identity and
SaaS apps.
IR.L2-3.6.1
(Incident
Handling)
Automated
Investigation
(AIR)
No Yes G5 "self-
heals"
common
alerts (e.g.,
auto-isolating
a
compromised
user).
Appendix D: Licensing & Compliance Matrix
807

8.6.1.1 The "E5 Security" Middle Ground
For organizations on G3 that need the security features but not the compliance
features (Audit Premium/Insider Risk), the M365 G5 Security Add-on is the
most common path. It includes the full Defender XDR suite and Entra ID P2
(PIM), but excludes the advanced Purview compliance tools.
ENVIRONMENT: COMMERCIAL
8.6.2 E3 vs. E5 for NIST SP 800-171 Rev. 3
While NIST SP 800-171 compliance can be achieved on an E3 license, it
requires significant manual overhead for audit log retention and privileged
access gating. E5 automates several high-friction requirements through
advanced telemetry, behavioral analytics, and automated enforcement.
In Commercial tenants, the gap between E3 and E5 is wider because
Defender for Endpoint Plan 2 (EDR) is an E5-level feature. E3 includes
only Plan 1 (Basic protection).
NIST
800-171
Requiremen
t
Capability
M365
Commercial
E3
M365
Commercial
E5
Compliance
Impact
3.14.1 /
3.14.3 (EDR/
Flaw
Remediation)
Defender for
Endpoint
Plan 1 (Basic) Plan 2 (Full
EDR)
E3 lacks full
behavioral
EDR and
automated
remediation
required for
modern 171
Rev 3.
3.1.5 (Least
Privilege)
Entra ID P2
(PIM)
No Yes E3 requires
separate
"Admin-
Securing Microsoft 365 in GCC High | 2026.04.30
808

NIST
800-171
Requiremen
t
Capability
M365
Commercial
E3
M365
Commercial
E5
Compliance
Impact
only"
accounts with
standing
access.
3.3.1 / 3.3.2
(Audit
Retention)
Purview
Audit
Premium
90 Days 1 Year E3 requires a
custom Log
Analytics /
Sentinel
strategy to
meet
retention.
3.13.16 (Data
Confidentialit
y)
Purview
Auto-labeling
No Yes E5
automatically
finds and
encrypts data,
reducing
"human
error" risk.
3.11.2
(Vulnerability
Scan)
Defender
Vulnerability
Mgmt
No Yes E5 provides
real-time
vulnerability
tracking for
endpoints.
3.1.2
(Transaction
Recovery)
Insider Risk
Management
No Yes E5 detects
data
exfiltration
patterns (USB
copy, large
downloads)
natively.
8.6.2.1 Decision Summary: When to Upgrade
• Stay on E3 if: You have a small user count and a robust SIEM
(Sentinel) strategy to handle log retention and manual account gating.
Appendix D: Licensing & Compliance Matrix
809

• Move to E5 if: You have a distributed workforce, handle high
volumes of CUI/PII, and want to reduce "Total Cost of Compliance"
by automating incident response and access reviews.
8.6.3 Technical Comparison Reference
Feature G3 / E3 G5 / E5 / G5 Security
Entra ID P2 (PIM,
Identity Governance)
— ✅
Defender for Endpoint
(EDR)
GCCH: ✅ / COMM: ⚠ ✅
Defender for Office 365
Plan 2
— ✅
Defender for Identity
(MDI)
— ✅
Defender for Cloud Apps
(MDA)
— ✅
Purview Audit Premium
(1-year logs)
— ✅
Purview Auto-labeling — ✅
Insider Risk
Management
— ✅
Endpoint Privilege
Management (EPM)
— ✅ (Starting July 2026)
Note: ✅ = Included | — = Add-on Required | ⚠ = Plan 1 only (no EDR)
Securing Microsoft 365 in GCC High | 2026.04.30
810