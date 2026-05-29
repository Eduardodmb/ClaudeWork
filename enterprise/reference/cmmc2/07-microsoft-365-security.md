# 7. Microsoft 365 Security

**CMMC2 Documentation** | Version 2026.04.30

**Pages:** 614-678

---

## Table of Contents

  - 7.1.1 Licensing
  - 7.1.2 Microsoft 365 Security Configuration
  - 7.2.2 The XDR-Sentinel Relationship
  - 7.2.5 Sentinel Content Deployment
  - 7.2.7 Workbooks
  - 7.2.8 SOAR Playbooks
  - 7.2.10 SIEM — Compliance Control Mapping
  - 7.3.1 Log Source Reference
  - 7.3.2 Operational Audit Procedures
  - 7.3.4 Organizing Evidence for the Assessment
  - 7.3.5 Working with Your C3PAO

---

boundary). Commercial Azure App Service URLs (azurewebsites.net) will
not be accessible from within the GCC High trust boundary.
DKE is not required by CMMC Level 2. It may be appropriate for
organizations anticipating CMMC Level 3 certification or handling categories
of CUI Specified that are subject to statutory or regulatory key custody
requirements.
ENVIRONMENT: COMMERCIAL
For commercial organizations, DKE is rarely warranted. The operational
constraints (no mobile, no browser, no Copilot) make it impractical for most
content. BYOK with a HSM-backed key in Azure Key Vault provides strong
key custody guarantees without DKE's access restrictions.
Consider DKE only if your organization is subject to a regulatory requirement
that explicitly prohibits cloud-provider access to key material — for example,
certain classified contract vehicles that permit only unclassified processing
with DKE as the access control boundary.
7. Microsoft 365 Security
7.1 Threat Defense
Defender for Endpoint covers the endpoint EDR layer: device onboarding, ASR
rules, tamper protection, and EDR in block mode. This chapter covers Microsoft
365 security in two parts: configuration of the administrative controls in SharePoint,
Teams, and Defender for Office 365 that define what is and isn't allowed; and the
security operations tools used to detect, investigate, and respond to threats.
Product / Admin Center Function Primary Concern
SharePoint Admin Unmanaged device access, Data exposure from
Securing Microsoft 365 in GCC High | 2026.04.30
614

Product / Admin Center Function Primary Concern
Center external sharing unmanaged or guest access
Teams Admin Center External access, guest
access, meeting policies
Unauthorized external
communication
Defender for Office 365
(MDO)
Safe Links, Safe
Attachments, anti-phishing
Phishing, BEC, malware in
email and files
Defender for Cloud Apps
(MDA)
SaaS visibility, OAuth
governance, session
controls
Data exfiltration, insider
threats, cloud misuse
Defender for Identity
(MDI)
Active Directory and Entra
ID anomaly detection
Credential theft, lateral
movement, reconnaissance
Defender XDR Portal Unified incident correlation
and response
Correlated triage across all
workloads
7.1.1 Licensing
ENVIRONMENT: GCC HIGH (CMMC)
MDO Plan 2, MDA, and MDI are included in Microsoft 365 GCC High E5
and Microsoft 365 GCC High E5 Security. If the tenant is on E3, they are
available as add-ons.
Product Minimum License
MDO Plan 1 (Safe Links, Safe
Attachments)
M365 E3 + Defender for Office 365 P1
add-on, or E5
MDO Plan 2 (Threat Explorer, AIR,
Attack Sim)
M365 E5 or E5 Security
Defender for Cloud Apps M365 E5, E5 Security, or MDA
standalone
Defender for Identity M365 E5, E5 Security, or MDI
standalone
Threat Defense
615

Portal: https://security.microsoft.us(GCC High XDR portal)
ENVIRONMENT: COMMERCIAL
Product Minimum License
MDO Plan 1 M365 Business Premium, E3 + P1 add-
on, or E5
MDO Plan 2 M365 E5 or E5 Security
Defender for Cloud Apps M365 E5, E5 Security, or MDA
standalone
Defender for Identity M365 E5, E5 Security, or MDI
standalone
Portal: https://security.microsoft.com
7.1.2 Microsoft 365 Security Configuration
7.1.2.1 SharePoint Admin Center
The SharePoint Admin Center governs tenant-wide sharing and unmanaged device
access. Two settings here are prerequisites for controls configured elsewhere in this
guide.
Unmanaged Device Access
This setting limits what SharePoint and OneDrive deliver to browser sessions on
devices that are not Intune-managed or hybrid-joined. It is the server-side
component that makes the Conditional Access "Use app enforced restrictions"
policy effective. Without this setting enabled, the CA policy has no enforcement
effect on SharePoint.
Securing Microsoft 365 in GCC High | 2026.04.30
616

ENVIRONMENT: GCC HIGH (CMMC)
Navigate to: SharePoint Admin Center (admin.sharepoint.us) →
Policies → Access control → Unmanaged devices
ENVIRONMENT: COMMERCIAL
Navigate to: SharePoint Admin Center (admin.sharepoint.com) →
Policies → Access control → Unmanaged devices
Setting Recommended Value
Unmanaged devices Allow limited, web-only access
Allow limited, web-only access blocks download, sync, and print from unmanaged
devices while permitting browser-based viewing. This satisfies the requirement to
protect data on unmanaged devices without blocking access entirely.
RELATIONSHIP TO CONDITIONAL ACCESS
The Conditional Access — App-Enforced Restrictions policy sends
SharePoint a session token indicating whether the device is compliant.
SharePoint's unmanaged device setting then determines what that non-
compliant session can do. Both must be configured for the control to
function end-to-end.
ENVIRONMENT: GCC HIGH (CMMC)
NIST SP 800-171 Rev. 3 3.1.19 requires protecting CUI on mobile and non-
organizational devices. This setting, combined with the CA app-enforced
restrictions policy, is the technical control satisfying that requirement for
Threat Defense
617

browser-based SharePoint access.
ENVIRONMENT: COMMERCIAL
For HIPAA and GLBA environments, this setting satisfies the "technical
safeguard" requirement for remote access to ePHI or GLBA-regulated data
without requiring device enrollment as a prerequisite.
External Sharing
Tenant-wide sharing settings establish the ceiling for what sensitivity label
container policies can permit. Labels can restrict sharing further on a per-site basis
but cannot exceed the tenant default.
Setting Recommended Value
SharePoint external sharing New and existing guests (requires sign-in)
OneDrive external sharing New and existing guests
Guests must sign in using the same
account invitations are sent to
On
Navigate to: SharePoint Admin Center → Policies → Sharing
7.1.2.2 Teams Admin Center
The Teams Admin Center governs external communication, guest participation, and
meeting behavior. These settings interact with sensitivity label container policies for
Teams channels.
External Access
External access allows your Teams users to search for, call, and chat with users in
Securing Microsoft 365 in GCC High | 2026.04.30
618

external Microsoft 365 tenants.
Navigate to: Teams Admin Center → Users → External access
Setting Recommended Value
Allow users to communicate with Teams
users in external organizations
On — restrict to specific domains if the
organization's external partner list is well-
defined
Allow users to communicate with Skype
for Business users
Off unless operationally required
Guest Access
Guest access allows external users to be added as members of Teams channels.
Navigate to: Teams Admin Center → Users → Guest access
Setting Recommended Value
Allow guest access in Teams On
Allow guests to make private calls Off
Allow guests to use IP video On
Allow guests to edit sent messages On
Allow guests to delete sent messages Off
Meeting Policies
Navigate to: Teams Admin Center → Meetings → Meeting policies → Global
(org-wide default)
Setting Recommended Value
Anonymous users can join a meeting Off
Who can bypass the lobby People in my organization and guests
Threat Defense
619

Setting Recommended Value
Allow external participants to give or
request control
Off
Allow meeting recording On
Allow transcription On
CONTAINER LABEL INTERACTION
Sensitivity labels applied to Teams channels can restrict guest access and
external sharing on a per-team basis, overriding these tenant defaults in a
more restrictive direction. See Sensitivity Labels for label container
settings.
7.1.2.3 Defender for Office 365
MDO adds threat protection layers on top of Exchange Online Protection (EOP),
which handles basic anti-spam and anti-malware. MDO Plan 1 adds pre-delivery
detonation; Plan 2 adds post-breach investigation and training.
Safe Links
Safe Links rewrites URLs in email and Office documents and checks the
destination at click time against Microsoft's threat intelligence feed. This catches
URLs that were benign at delivery but were weaponized after the fact — a common
technique in multi-stage phishing.
Setting Recommended Value
Enable Safe Links for email messages On
Enable Safe Links for Office apps On
Do not track when users click Safe Links Off (tracking required for audit evidence)
Do not allow users to click through to On for Restricted users
Securing Microsoft 365 in GCC High | 2026.04.30
620

Setting Recommended Value
original URL
Apply real-time URL scanning On
Safe Links policies scope to recipients. Create a stricter policy for privileged users
(executives, IT admins) that does not permit click-through.
Safe Attachments
Safe Attachments detonates email attachments in an isolated sandbox before
delivery. Delivery is delayed by up to 5 minutes while detonation completes. For
organizations where email latency is operationally sensitive, configure Dynamic
Delivery — this delivers the email body immediately and replaces the attachment
with a placeholder until detonation completes.
Setting Recommended Value
Safe Attachments unknown malware
response
Block
Dynamic Delivery On (for non-privileged users)
Enable redirect On — route malicious attachments to
security team mailbox
Apply Safe Attachments to SharePoint,
OneDrive, Teams
On (requires separate toggle in Global
Settings)
ENABLE FOR SHAREPOINT AND TEAMS
Safe Attachments for SharePoint/OneDrive/Teams is controlled by a
separate setting in Policies & rules → Threat policies → Global settings,
not within the Safe Attachments policy itself. It is off by default.
Anti-Phishing: Impersonation Protection
MDO's anti-phishing policy adds impersonation detection on top of EOP's spoof
Threat Defense
621

intelligence. Impersonation protection watches for emails that claim to be from a
specific user or domain without being that user or domain.
Users to protect (impersonation): Add executives, finance approvers, and any
user who sends wire transfer or payroll instructions. Attackers specifically target
these roles for BEC (Business Email Compromise).
Domains to protect (impersonation): Add your own domain(s) and any partner
domains from which you regularly receive sensitive instructions.
Setting Recommended Value
Enable users to protect On — add C-suite + finance + IT admins
Enable domains to protect On — add owned domains + key partner
domains
If message is detected as impersonated
user
Quarantine
If message is detected as impersonated
domain
Quarantine
Enable mailbox intelligence On
Enable intelligence for impersonation
protection
On
7.1.3 Security Operations
7.1.3.1 Attack Simulation Training
Attack Simulation Training (AST) sends simulated phishing emails to users and
measures click rates, credential submission rates, and reporting rates. It requires
MDO Plan 2.
ENVIRONMENT: GCC HIGH (CMMC)
NIST SP 800-171 Rev. 3 3.2.2 requires organizations to provide security
Securing Microsoft 365 in GCC High | 2026.04.30
622

awareness training. AST fulfills the practical exercise component of that
requirement. Schedule quarterly simulations across the tenant and configure
automatic training assignment for users who click.
Retain simulation results as audit evidence: Attack simulation training →
Reports → export to CSV. CMMC assessors may request this as evidence of
3.2.2 compliance.
ENVIRONMENT: COMMERCIAL
Configure at minimum two simulation campaigns per year. Use a mix of
techniques: credential harvest, link in attachment, and OAuth consent grant.
Users who click should be automatically enrolled in the corresponding micro-
training module (built into AST). Track improvement in click rates over time
as a security program KPI.
7.1.3.2 Threat Explorer and Real-Time Detections
Threat Explorer (MDO Plan 2) and Real-Time Detections (MDO Plan 1) provide an
interactive query interface over email metadata and delivery events. Use them to:
• Identify all emails from a sender during an incident
• Find all recipients of a phishing campaign across the tenant
• Determine the delivery action taken (delivered, junked, blocked,
quarantined)
• Trigger soft deletes of delivered phishing emails across all mailboxes
Soft deleting a delivered phishing campaign:
1. Threat Explorer → filter by sender domain or subject
2. Select matching messages → Take actions → Move to deleted items or
Soft delete
3. Review action status in the Action center
7.1.3.3 Automated Investigation and Response (AIR)
AIR (Plan 2) automatically investigates alerts, correlates related mailbox events,
Threat Defense
623

and recommends or executes remediation actions without analyst intervention. It is
integrated with the XDR incidents view — AIR investigations appear as sub-
investigations within an incident.
Enable AIR and configure the action approval setting:
Setting Value
Automated investigation trigger On
Remediation approval Auto-approve for High confidence
verdicts; Require approval for Medium
7.1.3.4 Defender for Cloud Apps
Defender for Cloud Apps is Microsoft's CASB (Cloud Access Security Broker). It
sits between users and cloud apps, providing visibility into SaaS usage, behavioral
analytics, and inline session controls.
Shadow IT Discovery
MDA discovers cloud apps in use across the tenant by analyzing traffic logs from
Defender for Endpoint (agent-based) or by ingesting firewall/proxy logs. The output
is an app catalog showing:
• App name and risk score (Microsoft-assigned, 0–10)
• Number of users and transactions
• Data uploaded/downloaded volumes
• Whether the app is sanctioned or unsanctioned
Enable cloud app discovery via MDE integration:
MDA settings → Cloud discovery → Automatic log upload → Connected apps
→ enable the Microsoft Defender for Endpoint integration. This routes endpoint
DNS and network telemetry to MDA automatically — no firewall log collection
needed.
Review the discovered app catalog monthly and Unsanction apps that pose risk
(file sharing via personal storage, unapproved generative AI tools, shadow ERP
integrations).
Securing Microsoft 365 in GCC High | 2026.04.30
624

App Governance
App Governance monitors OAuth app consent grants — third-party and internal
apps that have been granted permissions to the tenant. Compromised OAuth apps
are a common persistence mechanism: the attacker grants a malicious app Mail.Re
ador Files.ReadWrite.Allpermissions and retains access even after the user's
password is reset.
Key alert policies:
Alert Trigger
App with high privilege App granted Mail.ReadWriteor Direct
ory.ReadWrite.All
Unused app with sensitive permission OAuth app with broad permissions but < 5
users active in 90 days
App with anomalous data access App accessing significantly more data than
its baseline
Newly registered app accessing sensitive
data
New app (< 30 days old) accessing labeled
or sensitive content
Review the App governance dashboard monthly. Revoke consent for any app that
cannot be attributed to a known IT-approved integration.
Conditional Access App Control
MDA integrates with Entra Conditional Access to proxy sessions through MDA for
session-level controls. This enables policy enforcement on content within a session
— not just access control at the authentication layer.
Common use cases:
Scenario Session Policy
Unmanaged device accessing SharePoint Block download of Confidential-labeled
files
External contractor accessing Teams Block copy/paste of sensitive content
High-risk user (Adaptive Protection) Monitor all activity and block upload
Threat Defense
625

Scenario Session Policy
Any user accessing sensitive SharePoint
site
Apply watermark on viewed documents
Configure in Entra CA: create a Conditional Access policy with Session control →
Use Conditional Access App Control → Use custom policy. Then configure the
matching session policy in MDA.
ENVIRONMENT: GCC HIGH (CMMC)
NIST SP 800-171 Rev. 3 3.1.19 requires protecting CUI on mobile and non-
organizational devices. MDA session policies are the technical control that
satisfies this requirement for browser-based access to SharePoint/Teams from
unmanaged devices — blocking download of CUI without blocking access
entirely.
CMMC Control Mapping
NIST Control MDA Capability
3.1.19 — Unmanaged device access to
CUI
Session policy blocks CUI download
on unmanaged devices
3.13.1 — Monitor communications Cloud app discovery monitors data
flows to SaaS apps
3.14.6 — Monitor for unauthorized use Anomalous data access alerts in App
Governance
ENVIRONMENT: COMMERCIAL
For HIPAA and GLBA environments, session policies enforcing download
blocks on unmanaged devices satisfy the "technical safeguard" requirement
for remote access to ePHI or GLBA-regulated data, without requiring device
enrollment as a prerequisite.
Securing Microsoft 365 in GCC High | 2026.04.30
626

7.1.3.5 Defender for Identity
Defender for Identity (MDI) monitors on-premises Active Directory and Entra ID
for attack patterns associated with credential theft, lateral movement, and
reconnaissance. It reads AD audit events via a lightweight sensor installed on
domain controllers.
Sensor Deployment
Install the MDI sensor on every domain controller (primary and read-only). The
sensor reads the AD event log and network traffic in real time and forwards signals
to the MDI cloud service.
# Download sensor installer from MDI portal
# Settings → Sensors → Add sensor → Download installer
# Install on each DC (run as Domain Admin)
.\Azure ATP sensor Setup.exe /quiet NetFrameworkCommandLineArguments="/q" Acc
essKey="<workspace-access-key>"
For GCC High, the MDI workspace endpoint is<workspace-name>.atp.azure.u
s— verify the installer is configured to point to the correct sovereign cloud
endpoint before deploying.
After installation, verify sensor health in the MDI portal (Security.microsoft.us →
Settings → Identities → Sensors) — all DCs should show Running within 5
minutes.
Key Detection Categories
Category Example Detections
Reconnaissance LDAP enumeration, SMB session
enumeration, user/group discovery
Credential access Pass-the-hash, pass-the-ticket,
Kerberoasting, AS-REP roasting, NTLM
relay
Lateral movement Overpass-the-hash, suspected DCSync,
remote code execution via WMI/PSExec
Domain dominance Skeleton key attack, Golden Ticket,
DCSync from non-DC
Threat Defense
627

Category Example Detections
Exfiltration Unusual large LDAP query, suspected
NTDS.dit export
MDI triggers alerts that appear as incidents in the unified XDR portal, correlated
with any related MDE, MDO, or Entra signals.
Honeytoken Accounts
MDI supports configuring honeytoken accounts — AD accounts that should never
be used in normal operations. Any authentication or query against a honeytoken
account generates an immediate High severity alert.
Create 2–3 honeytoken accounts with names that appear valuable to an attacker
(e.g., svc-backup, admin-legacy) but are disabled or have no real permissions.
Register them in MDI: Settings → Honeytoken accounts.
Integration with Entra ID Protection
MDI feeds its user risk signals into Entra ID Protection. A user flagged by MDI for
pass-the-hash activity will have their Entra user risk score elevated, which can
trigger a Conditional Access policy requiring MFA re-authentication or blocking
access until the risk is remediated — without manual security team intervention.
Ensure the Entra ID Protection integration is enabled in MDI settings: Settings →
Microsoft Entra ID → Enable Entra ID Protection integration.
7.1.3.6 Unified XDR Incidents View
The Microsoft Defender XDR portal correlates alerts from MDE, MDO, MDA, and
MDI into unified incidents — a single case that links all related alerts, affected
users, devices, and emails. This is the primary triage interface for the security
operations team.
Incidents Triage Workflow
1. Incidents queue (security.microsoft.us/incidents) — sorted by severity.
High/Critical incidents should be triaged within 1 hour.
2. Open an incident → review the Attack story graph — this shows the kill
chain: initial access, execution, lateral movement, and data access in a
Securing Microsoft 365 in GCC High | 2026.04.30
628

visual timeline.
3. Review Evidence and response — affected mailboxes, devices, users, and
cloud apps, with recommended actions for each.
4. Execute remediation actions directly from the incident: isolate device, soft
delete emails, revoke user sessions, disable user account.
5. Close the incident with a classification: True positive (with threat type) or
False positive.
7.1.3.7 Advanced Hunting
Advanced Hunting provides a KQL query interface over the full 30-day event
history across all Defender workloads. Use it for proactive threat hunting and deep
incident investigation.
Useful starting queries:
// Emails delivered containing known phishing URLs
EmailEvents
| where ThreatTypes has "Phish"
| where DeliveryAction == "Delivered"
| summarize count() by SenderFromAddress, RecipientEmailAddress, Subject
| sort by count_ desc
// Devices with high-severity MDI alerts in past 7 days
AlertInfo
| where ServiceSource == "Microsoft Defender for Identity"
| where Severity == "High"
| where Timestamp > ago(7d)
| join AlertEvidence on AlertId
| summarize Alerts=count() by DeviceName, AccountUpn
| sort by Alerts desc
// OAuth apps with Mail.ReadWrite permission granted recently
CloudAppEvents
| where ActionType == "Consent to application"
| where RawEventData has "Mail.ReadWrite"
| where Timestamp > ago(30d)
| project Timestamp, AccountDisplayName, Application=tostring(RawEventData.Ap
pDisplayName)
7.1.3.8 Secure Score
Microsoft Secure Score aggregates configuration health across the entire Defender
XDR suite into a single score. Each recommended action has an associated point
value and maps to a control framework (NIST, ISO 27001, SOC 2).
Review Secure Score monthly and prioritize recommendations by:
1. Impact (points)
2. Implementation effort (Low/Medium/High)
Threat Defense
629

3. Regulatory relevance (filter by NIST 800-171 to see compliance-relevant
actions)
Secure Score is not a compliance score — a high score does not mean you are
compliant. Use it as an operational hygiene metric alongside your compliance
control matrix.
7.2 SIEM Strategy
Microsoft Sentinel is a cloud-native SIEM and SOAR platform. While Defender
XDR provides detection and response within the Microsoft security product family,
Sentinel provides the aggregation layer: pulling signals from XDR plus
infrastructure logs, non-Microsoft sources, and custom data, correlating them with
analytics rules, and retaining them for the long-term audit period that Advanced
Hunting's 30-day window cannot cover.
7.2.1 Why Sentinel for CMMC
CMMC Level 2 = NIST SP 800-171 Rev. 2's 110 practices. Three control families
make a SIEM practically necessary:
• AU — Audit and Accountability (3.3.1 – 3.3.9). Create audit records,
uniquely trace actions to users, review and correlate across sources, retain
(3 years is DIB practice), protect from tampering, and limit audit-
management privileges. This is one evidence surface covering Entra,
M365, Azure, and endpoints — not something you assemble from per-
product log viewers at assessment time.
• IR — Incident Response (3.6.1 – 3.6.3). Operational incident handling
with tracking and testing. Sentinel incidents and playbooks give assessors
the case-management framework they expect, with automated evidence
capture that raw ticket logs don't produce.
• SI — System and Information Integrity (3.14.6 – 3.14.7). Monitor for
unauthorized use; identify anomalous access. Analytics rules and UEBA
produce the behavioral evidence raw ingestion alone can't.
Is Sentinel literally required? No. Any SIEM that aggregates across the boundary
and retains immutably can pass — Splunk, Elastic, and QRadar are viable in Azure
Government. But for organizations already paying for M365 GCC High and Azure
Government, Sentinel is the lowest-friction path:
• Native connectors for Entra ID, Microsoft 365, Azure Activity, and
Defender XDR — no connector engineering.
Securing Microsoft 365 in GCC High | 2026.04.30
630

• Log Analytics archive tier hits the 3-year retention expectation cheaply.
• Immutable audit storage and Azure RBAC satisfy AU.L2-3.3.8 (protect
audit information) and AU.L2-3.3.9 (limit audit management) out of the
box.
• CMMC-specific Content Hub solutions ship posture assessment rules and a
compliance workbook — no custom authoring for the baseline assessment
artifacts.
For typical 50–500-seat DIB shops, Sentinel is the path a C3PAO will recognize
and validate fastest. The rest of this chapter treats Sentinel as the choice; the
conceptual deployment flow (connectors → posture rules → detection rules →
retention) generalizes to other SIEMs, but the specific Content Hub solutions and
Defender XDR unified-platform integration are Sentinel-only.
7.2.2 The XDR-Sentinel Relationship
Defender XDR is the detection plane — MDO, MDA, MDI, and MDE each
generate their own alerts and aggregate them into XDR incidents. Advanced
Hunting covers 30 days.
Sentinel is the aggregation and analytics plane — it ingests XDR incidents plus
additional log sources, applies analytics rules beyond what XDR provides, stores
logs for 90 days hot plus configurable cold retention spanning years, and hosts
workbooks and SOAR playbooks.
In practice: XDR for day-to-day incident response; Sentinel for long-horizon
hunting, compliance reporting, and cross-workload correlation.
7.2.3 Deployment at a Glance
This chapter covers two phases: one-time Workspace Setup and sequential
Content Deployment.
Workspace Setup — Azure Government infrastructure to host Sentinel:
Substep Output
1. Create resource group rg-sentinel-prod-usgovvaexists
2. Create Log Analytics workspace law-sentinel-prod-usgovvaexists
3. Add Microsoft Sentinel Sentinel blade is operational
SIEM Strategy
631

Substep Output
4. Verify sovereign-cloud alignment Workspace confirmed in USGov region
Content Deployment — seven sequential steps from bare workspace to
compliance-ready SIEM:
Step Produces
1. Install Content Hub solutions Data connector cards appear in the
connectors list
2. Configure each data connector Telemetry flowing (SigninLogs,
OfficeActivity, AzureActivity, etc.)
3. Enable CMMC 2.0 posture assessment Defender for Cloud prereqs complete;
CMMC posture rule templates created
4. Save workbook templates Tier 1 workbooks + CMMC 2.0 workbook
saved and parameterized
5. Demonstrate immediate operation Eight shared KQL queries produce
compliance-evidence screenshots
6. Verify NIST 800-171 data arrival SecurityRegulatoryCompliance
returns NIST rows; CMMC workbook
tiles and posture rules now fully
operational
7. Enable detection rule templates Threat-detection analytics rules active
from product solutions
Step 3 triggers a 12–24h Defender for Cloud assessment pass, but the only things
gated by that wait are CMMC workbook tile rendering and first-fire of the CMMC
posture rules — both verified in Step 6. Steps 4 and 5 proceed immediately and
produce the full client-demo deliverable without waiting.
Securing Microsoft 365 in GCC High | 2026.04.30
632

7.2.4 Sentinel Workspace Setup
7.2.4.1 Portal differences: Azure Government (GCC High) vs.
Commercial
GCC High Commercial
Azure portal portal.azure.us portal.azure.com
Log Analytics endpoint *.ods.opinsights.azure.us *.ods.opinsights.azure.com
Sentinel region usgovvirginia or
usgovtexas
Any supported Azure
region
Defender XDR connector Available Available
7.2.4.2 Workspace creation steps
1. Create the resource group
All Sentinel-related resources (the Log Analytics workspace, the Sentinel solution,
any automation account, and later data-collection rules) live in a single resource
group scoped to the Azure Government subscription.
1. Azure portal (portal.azure.usfor GCC High) → Resource groups →
Create.
2. Subscription: select the Azure Government subscription tied to the GCC
High tenant.
3. Resource group name: use a standard naming convention that encodes
purpose, environment, and region:
◦ rg-sentinel-prod-usgovva(Virginia)
◦ rg-sentinel-prod-usgovtx(Texas)
4. Region: USGov Virginiaor USGov Texas— must match the region you
will use for the Log Analytics workspace and must be an Azure
Government region, not a commercial region.
5. Click Review + create → Create.
2. Create the Log Analytics workspace
The workspace is where Sentinel stores all ingested log data. Create it inside the
resource group created in the previous step.
SIEM Strategy
633

1. Azure portal → Log Analytics workspaces → Create.
2. Subscription: same Azure Government subscription.
3. Resource group: select the resource group from the previous step (e.g., r
g-sentinel-prod-usgovva).
4. Name: use a naming convention that pairs with the resource group:
◦ law-sentinel-prod-usgovva
5. Region: same region as the resource group. This determines where log data
is stored at rest — for GCC High this must be an Azure Government
region.
6. Pricing tier: Per-GB (default). Commitment tiers are available at 100 GB/
day and above; evaluate after 30 days of ingestion data.
7. Retention: workspace default is 30 days. CMMC audit requirements
typically call for 3 years — plan on 365 days hot plus 2 years archive as
the baseline. See Log Retention for the per-table configuration model; the
workspace default can stay at 30 days for now and be tuned per-table once
ingestion is live.
8. Click Review + create → Create.
3. Add Microsoft Sentinel to the workspace
Sentinel is an overlay on top of Log Analytics — it adds the incidents queue,
analytics rules, data connectors, content hub, SOAR playbooks, and workbooks.
1. Azure portal → Microsoft Sentinel → Create (or Add).
2. Select the Log Analytics workspace created in the previous step (e.g., law-
sentinel-prod-usgovva).
3. Click Add. Sentinel provisions in under a minute. Once complete, the
Sentinel blade opens with an empty workspace ready for data connectors.
4. Verify sovereign-cloud alignment
Before connecting any data, confirm the workspace is in the correct cloud. The
Sentinel workspace overview has moved from the Azure portal to the Defender
portal:
1. Open the Defender portal: security.microsoft.us/sentinelsetting
s/siem-workspace?tid=[YOUR-TENANT-ID](replace [YOUR-TENANT-I
D]with your GCC High tenant ID).
2. Confirm the workspace Region shows an Azure Government region (USGo
v Virginiaor USGov Texas), not a commercial region.
3. Confirm the Subscription shows your Azure Government subscription, not
a commercial subscription.
4. If either check fails, the workspace was created in a commercial
Securing Microsoft 365 in GCC High | 2026.04.30
634

subscription or region — delete it and start over. A commercial workspace
cannot ingest GCC High log data.
Use a single workspace per tenant for most organizations ingesting less than 100
GB/day. Multi-workspace architectures are appropriate only when compliance
requirements or data residency mandates separating workload types.
7.2.5 Sentinel Content Deployment
After workspace creation, deploy Sentinel content in six steps: install Content Hub
solutions, configure data connectors, enable CMMC 2.0 posture assessment, save
workbook templates, demonstrate operation, and enable detection rule templates.
The Sentinel data connectors page is at Defender portal → Microsoft Sentinel →
Configuration → Data connectors (security.microsoft.usfor GCC High). A
fresh workspace shows only the pre-installed Microsoft 365 Insider Risk
Management (Preview) connector. The remaining connectors are installed via
Content Hub solutions — each solution bundles its data connector, analytics rules,
hunting queries, and workbooks as a single package.
7.2.5.1 Step 1: Install Content Hub solutions
Content Hub solutions deploy the data connectors you need. Install solutions before
attempting to configure individual connectors — the connectors do not appear in
the Data connectors list until their parent solution is installed.
Navigate to Microsoft Sentinel → Content management → Content hub in the
Defender portal.
Install the following solutions in priority order:
Priority 1 — Microsoft Security Products
Content Hub Solution Connector it installs What it ingests
Microsoft Defender XDR Microsoft Defender XDR All XDR incidents, alerts,
advanced hunting data, raw
event tables (EmailEvents,
DeviceProcessEvents,
IdentityLogonEvents, etc.)
Microsoft Entra ID Microsoft Entra ID Sign-in logs, audit logs,
provisioning logs, risk
SIEM Strategy
635

Content Hub Solution Connector it installs What it ingests
events
Microsoft 365 Microsoft 365 Exchange/SharePoint/
Teams audit events, DLP
alerts
Azure Activity Azure Activity Azure control plane
operations (resource
creation, deletion, RBAC
changes)
Microsoft Defender for
Cloud
Microsoft Defender for
Cloud
Azure resource security
alerts
Priority 2 — Infrastructure
Content Hub Solution Connector it installs What it ingests
Azure Firewall Azure Firewall Network traffic logs, threat
intelligence hits, IDPS
alerts
Azure Key Vault Azure Key Vault Key access and
management audit events
Azure Storage Azure Storage Account Storage access logs for
sensitive data stores
Windows Security Events Windows Security Events
via AMA
Windows Event Log from
servers (via Azure Monitor
Agent)
Priority 3 — Non-Microsoft Sources (Syslog / CEF)
Content Hub Solution Connector it installs What it ingests
Common Event Format CEF via AMA On-premises firewalls
(Palo Alto, Fortinet, Check
Point), network devices
that emit CEF-formatted
logs
Securing Microsoft 365 in GCC High | 2026.04.30
636

Content Hub Solution Connector it installs What it ingests
Syslog Syslog via AMA Linux servers, appliances
with raw syslog output, any
source that can forward
syslog
Both solutions install a data connector whose configuration pane walks through
AMA installation, Linux forwarder deployment, and Data Collection Rule creation.
Install the solution first, then configure the connector in the Data connectors blade.
Common sources routed through CEF or Syslog:
• On-premises firewalls (Palo Alto, Fortinet, Check Point, SonicWall)
• Network devices (switches, routers, wireless controllers)
• Linux servers
• Any appliance that can forward syslog or CEF
For all Content Hub solutions: select the solution → Install → wait for installation
to complete before moving to the next.
7.2.5.2 Step 2: Configure each data connector
After the Content Hub solutions are installed, the connectors appear in Microsoft
Sentinel → Configuration → Data connectors. Each connector now shows a
status of Not connected. Open each connector and follow its configuration pane:
1. Microsoft Defender XDR — in the unified Defender portal, this often
does not appear as a connector card in the Data connectors blade. The
Sentinel-to-Defender integration is handled through the platform
unification rather than through a traditional data connector. If your
Sentinel workspace shows Connected under the Defender portal's
Microsoft Sentinel settings, XDR incident and alert sync is already active
through the unified platform — no connector configuration required.
To verify:
◦ Defender portal → System → Settings → Microsoft Sentinel —
confirm your workspace shows as Connected.
◦ Once at least one XDR workload (MDE, MDO, MDI, or MDCA)
is onboarded, run SecurityIncident | take 10and SecurityA
lert | take 10in Sentinel → Logs to confirm data is flowing.
SIEM Strategy
637

If you do see a Microsoft Defender XDR connector card (older tenants or
certain configurations may still show it), open it and click Connect
incidents & alerts. Optionally enable raw event-table ingestion
(EmailEvents, DeviceProcessEvents, etc.) for advanced hunting in Sentinel
— raw tables increase ingestion volume and cost, so enable selectively
based on your hunting and compliance needs.
Note: this connector only produces data once at least one XDR workload is
onboarded. On a fresh workspace with no XDR workloads, the SecurityI
ncidentand SecurityAlerttables will not exist yet — this is expected,
not a configuration error.
2. Microsoft Entra ID — select which log categories to enable: Sign-in logs,
Audit logs, Non-interactive sign-in logs, Service principal sign-in logs,
Managed identity sign-in logs, Provisioning logs, ADFS sign-in logs (if
applicable), and Risky users / Risk detections (requires Entra ID P2).
Enable all categories relevant to your CMMC evidence requirements. Data
appears within 5 minutes — validate with SigninLogs | take 10.
3. Microsoft 365 — select workloads: Exchange, SharePoint, Teams.
Enable all three for CMMC audit coverage. Under Advanced Options, you
will be prompted to enable User and Entity Behavior Analytics (UEBA)
— enable it (see the UEBA note below). M365 audit logs can take 15–30
minutes to appear. Validate with OfficeActivity | take 10.
4. Azure Activity — this connector may not appear as a card in the Data
connectors blade. Configure it directly through subscription diagnostic
settings:
1. Azure portal → Subscriptions → select your Azure
Government subscription.
2. Activity log (left nav) → Export Activity Logs (or Diagnostic
settings).
3. Click Add diagnostic setting.
4. Name: diag-activity-to-sentinel.
5. Under Category details, check all categories: Administrative,
Security, ServiceHealth, Alert, Recommendation, Policy,
Autoscale, ResourceHealth.
6. Under Destination details, check Send to Log Analytics
workspace → select your Sentinel workspace.
7. Click Save.
8. Data starts flowing within 5–10 minutes. Validate with AzureActi
vity | take 10— resource group and workspace creation
events from the current session should appear.
Securing Microsoft 365 in GCC High | 2026.04.30
638

5. Microsoft Defender for Cloud — in GCC High, this often does not appear
as a connector card in the Data connectors blade even after the Content Hub
solution is installed. Defender for Cloud alerts and compliance data flow
into Sentinel through the Continuous export configuration on the
Defender for Cloud subscription itself (see Step 3 — Prereq 3 below), not
through a traditional Sentinel data connector. If you do see a Defender for
Cloud connector card, open it and enable bi-directional alert sync;
otherwise rely on continuous export as the primary path.
6. Azure Firewall — configure via Azure Firewall diagnostic settings
pointing to the Sentinel workspace. Send both Azure Firewall Application
Rule Logs and Azure Firewall Network Rule Logs.
7. Infrastructure connectors (Key Vault, Storage, Windows Security
Events) — each uses diagnostic settings or Data Collection Rules (DCRs)
pointing to the workspace. Follow the configuration pane for each.
USE SENTINEL → LOGS FOR KQL, NOT THE DEFENDER PORTAL
TOP-LEVEL SEARCH BAR
The Defender portal's top-level search bar is a global navigation search, not
a KQL surface — it will mangle your queries. Use Sentinel → Logs (or
equivalently, Log Analytics workspace → Logs in the Azure portal) for
direct KQL. Every KQL block in this chapter assumes that editor.
After connecting, allow 15–30 minutes for initial data to appear. Each connector
bullet above names the table to validate against; use those per-connector | take 1
0queries rather than a workspace-wide scan.
UEBA (User and Entity Behavior Analytics)
When configuring the Microsoft 365 connector's Advanced Options, Sentinel
prompts you to enable UEBA. Enable it. UEBA builds behavioral baselines per
user and entity by analyzing sign-in patterns, resource access, and activity volume,
then flags anomalies (impossible travel, atypical access, unusual data movement) as
enriched incidents.
Why it matters for CMMC:
• NIST 3.14.6 (monitor organizational systems) and 3.14.7 (identify
unauthorized use) are directly served by behavioral anomaly detection.
SIEM Strategy
639

• When a C3PAO asks "how do you detect compromised accounts or insider
threats?", UEBA is the answer — it produces the evidence that raw log
ingestion alone does not.
What it costs: UEBA analyzes data you are already ingesting (Entra sign-in logs,
M365 activity, Azure activity). It creates a few additional tables (BehaviorAnalyt
ics, UserAccessAnalytics, UserPeerAnalytics) but the storage increment is
small relative to the source tables. You are not paying for a new data source — you
are paying for ML enrichment on existing data.
Expectation: UEBA needs 14–21 days of ingested data to build meaningful
behavioral baselines. Until then, anomaly scores will be noisy or absent. Do not
evaluate its usefulness until it has had three weeks to learn.
7.2.5.3 Step 3: Enable CMMC 2.0 posture assessment
The Microsoft Sentinel: CMMC 2.0 solution provides compliance posture
assessment — not threat detection. It ships two analytics rule templates and a
compliance workbook. Detection rules come from the individual product solutions
installed in Step 1 (Entra ID, M365, Defender XDR, etc.).
The CMMC posture rules query the SecurityRegulatoryCompliancetable,
which is populated by Microsoft Defender for Cloud. Complete Prereq 1 → Prereq
2 → Prereq 3 so the table exists and begins receiving data, then install the solution
and enable its rule templates. The 12–24h wait only affects when tiles render and
posture incidents first fire — you can complete the install, rule-template creation,
workbook saves (Step 4), and the client-demo artifact captures (Step 5)
immediately.
Prereq 1: Enable Defender for Cloud plans
The Workload Protection page in Defender for Cloud may show "your
subscriptions are not protected by Microsoft Defender for Cloud" with an Enable
button that launches a blank Getting Started page. Skip the Getting Started page
entirely — it is a known GCC High UX issue. Enable plans through Environment
settings:
1. Azure portal (portal.azure.us) → Microsoft Defender for Cloud.
2. Management → Environment settings in the left nav.
3. Expand the hierarchy until your Azure Government subscription appears.
Click the subscription name (not the expand arrow).
4. Enable the Defender plans relevant to your environment:
Securing Microsoft 365 in GCC High | 2026.04.30
640

Plan Recommendation for
AVD / CMMC Why
Foundational CSPM On — automatic and free Baseline capability enabled
by default on every
subscription. Populates
MCSB only — it does not
run non-MCSB compliance
standards. Cannot be
turned off.
Defender CSPM On — required for
CMMC/NIST posture
assessment
The paid CSPM plan. Non-
MCSB compliance
standards (NIST SP
800-171, CMMC,
FedRAMP, etc.) only run
under Defender CSPM.
Without it, enabling NIST
SP 800-171 in Prereq 2
appears to succeed but
produces no data in Secur
ityRegulatoryComplian
ceand no tiles in the
CMMC workbook. This is
the single most common
trap in Sentinel-for-CMMC
deployments.
Defender for Servers (P1
or P2)
On if you have servers
(AVD session hosts count)
VM vulnerability
assessment, adaptive
application controls, file
integrity monitoring
Defender for Resource
Manager
On Monitors Azure
management-plane
operations (suspicious
ARM calls, control-plane
lateral movement)
Defender for Key Vault On if using Key Vault Anomalous access to
secrets and certificates
Defender for Storage On if using storage
accounts
Malware upload detection,
anomalous access patterns
Defender for DNS On Detects communication
from your VNet to known-
SIEM Strategy
641

Plan Recommendation for
AVD / CMMC Why
bad domains
Databases, App Service,
Containers
Off unless you run those
workloads
Don't pay for plans
covering workloads you
don't run
5. Click Save at the top.
Prereq 2: Enable the NIST SP 800-171 compliance standard
DEFENDER CSPM MUST BE ENABLED FIRST
Before toggling NIST on, confirm Defender CSPM is On in the
subscription's Defender plans (Prereq 1 table). Toggling NIST while only
Foundational CSPM is active appears to succeed — the standard shows as
enabled in the UI — but nothing assesses the subscription and SecurityRe
gulatoryCompliancenever receives NIST rows no matter how long you
wait.
1. Defender for Cloud → Regulatory compliance (left nav).
2. Click Manage compliance standards at the top of the blade (label may
also appear as "Manage compliance policies" in some portal versions —
same destination).
3. Select your Azure Government subscription.
4. Toggle NIST SP 800-171 Rev. 2 to On.
5. You will be prompted to configure parameters for two Azure Policy built-
ins that evaluate VM local Administrators group membership:
◦ "Audit Windows machines missing any of specified members
in the Administrators group" — inclusion list. Specify the Entra
group containing authorized VM administrators (e.g., EID_VM_Adm
inistrators).
◦ "Audit Windows machines that have the specified members in
the Administrators group" — exclusion list. Specify accounts or
groups that must not have local admin rights on VMs.
6. These parameters map to NIST control 3.1.1 (Limit system access to
authorized users). The parameters are optional — the standard assigns
regardless. If you do not have an approved admin group defined yet, leave
Securing Microsoft 365 in GCC High | 2026.04.30
642

the parameters empty and populate them later. The policy will audit only
what you configure.
7. Click Save.
Prereq 3: Configure continuous export to the Sentinel workspace
1. Defender for Cloud → Environment settings → [your Azure
Government subscription] → Continuous export → + Add continuous
export.
2. Configure the dialog:
◦ Export name: export-defender-to-sentinel(or similar).
◦ Export target: Log Analytics workspace (not Event hub).
◦ Exported data types: check all four — Security
recommendations, Security alerts, Secure score, and Regulatory
compliance. The last one populates SecurityRegulatoryCompli
ance; if unchecked, no posture data flows regardless of other
settings.
◦ Export frequency: Streaming for alerts and recommendations;
Regulatory compliance is Snapshots-only (fine).
◦ Target workspace: your Azure Government subscription → rg-s
entinel-prod-usgovva→ law-sentinel-prod-usgovva.
3. Scroll through the entire dialog before saving. The UI will accept a rule
with unchecked data-type boxes without error — the rule appears Enabled
in the list but produces no data. Re-open the saved rule and verify every
field, especially the four Exported data types checkboxes.
Data begins flowing in 15–30 minutes for most types, but Regulatory compliance
specifically takes 12–24 hours — Defender for Cloud's initial compliance scan
must run before there's anything to export. Don't wait for it. Proceed immediately
to the install below and complete Steps 4 and 5 — install, rule templates, workbook
saves, and the full client-demo deliverable all work without NIST data. Only
CMMC workbook tile rendering and first-fire of the two CMMC posture rules
depend on that data, and Step 6 verifies both.
Install the solution and enable the rule templates
This subsection installs the CMMC 2.0 solution and creates the two posture rule
templates. The CMMC compliance workbook itself is saved and configured later in
Step 4 → Save and configure the CMMC 2.0 workbook alongside the other client-
demo workbooks.
1. Microsoft Sentinel → Content management → Content hub → search
for CMMC 2.0 → Install.
SIEM Strategy
643

2. After installation, go to Microsoft Sentinel → Configuration →
Analytics → Rule templates → filter by source CMMC 2.0. You will see
two posture rule templates:
◦ CMMC 2.0 Level 1 (Foundational) Readiness Posture —
evaluates the 17 Level 1 practices.
◦ CMMC 2.0 Level 2 (Advanced) Readiness Posture — evaluates
the 110 Level 2 practices.
3. Create both rules. Enable Level 1 immediately for clients doing L1 self-
attestation; enable Level 2 for clients targeting L2 assessment. No harm
enabling both early — Level 2 shows gaps you will close during
implementation.
KNOWN ISSUE: INCORRECT MITRE ATT&CK MAPPING ON THE
POSTURE RULE TEMPLATES
The default CMMC posture rule templates may carry a MITRE ATT&CK
mapping (e.g., Discovery / T1082 System Information Discovery) that does
not reflect the rule's actual purpose — the rules assess compliance posture,
not adversary activity. This is a metadata labeling error in Microsoft's
template. It does not affect rule function, but incident triage dashboards will
show an incorrect MITRE tactic for posture-generated incidents. Consider
editing the MITRE mapping on the created rule to remove the inaccurate
tactic, or add a comment in the rule description noting that this is a posture
assessment, not a detection.
7.2.5.4 Step 4: Save workbook templates for client demonstration
Save each workbook below from Microsoft Sentinel → Threat management →
Workbooks → Templates. Open to verify it renders — first open may take 30–60
seconds while queries execute against your workspace. The CMMC 2.0 workbook
requires additional parameter configuration (covered in its own subsection below);
Securing Microsoft 365 in GCC High | 2026.04.30
644

the rest are save-open-screenshot. The set is grouped by client-demo readiness.
SAVING PARAMETER CHANGES REQUIRES THE AZURE PORTAL
The Defender portal's workbook viewer is read-only — the toolbar exposes
only Open in Azure, Share, Refresh, and Auto-refresh. Parameter changes
you make while viewing in the Defender portal are per-session only. To
persist parameter selections as the workbook's new defaults, click Open in
Azure in the toolbar → in the Azure portal click Edit → set parameter
values → Done Editing. The saved defaults then apply when the workbook
is opened from either portal.
Tier 1 — Save now, renders demo-worthy data today. These are the client-facing
wins for the interim status update:
Workbook Why it's demo-gold
Microsoft Entra ID Sign-in Logs Sign-in map, MFA status, Conditional
Access outcomes. Strongest visual in the
library. Evidence for AU.L2-3.3.1,
SI.L2-3.14.6.
Microsoft Entra ID Audit Logs Role changes, directory operations,
application management. Evidence for
AC.L2-3.1.5, AC.L2-3.1.7, AU.L2-3.3.2.
Conditional Access SISM (Summaries,
Insights, Security & Monitoring)
CA policy outcomes visualized — high-
impact client visual tied directly to the
Conditional Access chapter.
Office 365 M365 activity panorama — Exchange,
SharePoint, Teams in one consolidated
view.
SharePoint & OneDrive External-sharing detail. Direct evidence
for AC.L2-3.1.3 (CUI flow control).
Tier 2 — Save, but expect sparse content until Defender XDR signal or UEBA
baselines accumulate. Useful dashboards once incident telemetry or behavioral
analytics mature; save them now so they're configured and ready:
SIEM Strategy
645

• Identity & Access — leans heavily on UEBA-derived tables (IdentityIn
fo, BehaviorAnalytics, UserAccessAnalytics). UEBA needs 14–21
days of ingested data to build baselines; until then the workbook renders
empty even with valid sign-in and audit data in the workspace. Revisit at
the week-3 check-in.
• Exchange Online — populates from OfficeActivityfor mailbox audit
events; rich panels need MDO alerts to fire.
• Microsoft Defender for Office 365 Detection and Insights — requires
MDO incident telemetry. Dashboard is ready when alerts arrive.
Tier 3 — Defer until preconditions are met. Save each when the listed condition
becomes true, not before:
Workbook Save when
CybersecurityMaturityModelCertification(
CMMC)2.0
Save and configure in the subsection
below — waiting for NIST 800-171 Rev.
2 data to populate SecurityRegulatoryC
ompliancebefore tiles render.
Azure Firewall Azure Firewall is deployed in the
subscription and firewall diagnostic
settings stream to the workspace.
Azure Firewall Structured Logs Structured log format is enabled on the
firewall (preview/GA-dependent).
Azure Key Vault Security At least one Key Vault has diagnostic
settings sending AuditEventto the
workspace.
Common Event Format Logs Overview A network appliance or third-party source
is shipping CEF to the workspace via
AMA.
Syslog Connectors Overview Workbook A Linux forwarder or appliance is sending
Syslog via AMA.
Event Analyzer Power-user tool for exploring raw event
payloads — not client-facing. Skip for
demo deliverables.
Linux Machines Linux VMs are onboarded to the
workspace via AMA.
Microsoft Defender for Endpoint At least one device is fully onboarded to
Securing Microsoft 365 in GCC High | 2026.04.30
646

Workbook Save when
MDE and generating DeviceProcessEve
nts.
Microsoft Defender for Identity Skip permanently for cloud-only
tenants — MDI requires on-premises AD
sensor deployment.
Save the CMMC 2.0 workbook (configuration deferred to Step 6)
The CMMC compliance workbook depends on NIST SP 800-171 Rev. 2 rows in Se
curityRegulatoryCompliance— data that takes 12–24 hours to populate after
Prereq 3. Save the template now so it's available; opening it and setting parameters
before the data lands triggers per-tile "parameter not set" errors that resolve only
after the first Defender for Cloud assessment pass. The save is a one-click
operation; the open-and-configure flow happens in Step 6 → Finalize the CMMC
workbook and posture rules.
1. Go to Microsoft Sentinel → Threat management → Workbooks. Switch
to the Templates tab (not "My workbooks" — installed workbooks start
there).
2. Search for CMMC → the
CybersecurityMaturityModelCertification(CMMC)2.0 template card
appears.
3. Click the Save button on the template card — before clicking View
template. Save is available from the Templates tab but hidden from the live
template preview. Clicking View template first puts you into preview mode
where only Refresh and Auto refresh are exposed; you have to return to
Templates and click Save directly on the card.
4. Select the Azure Government region matching your Sentinel workspace (US
Gov Virginiaor USGov Texas).
Stop here. The workbook is saved and visible in My workbooks, but unconfigured.
Continue to Step 5 to assemble the immediate-operation deliverable; return to this
workbook in Step 6 once the discovery query confirms NIST 800-171 data has
SIEM Strategy
647

landed.
NIST SP 800-171 REV. 2 AND CMMC 2.0 LEVEL 2 ARE THE SAME 110
PRACTICES
CMMC 2.0 Level 2 was built to adopt NIST SP 800-171 Rev. 2 wholesale
— identical control set, no additions. This is why Defender for Cloud
typically does not offer CMMC 2.0 Level 2 as a separate assessable
standard in its Manage Compliance Standards list — it would be literally
duplicative. What you do see in the catalog:
• NIST SP 800-171 Rev. 2 — the correct standard to enable for
CMMC Level 2 assessment.
• CMMC Level 3 — the enhanced-requirements tier (adds NIST SP
800-172 practices on top of Level 2). Only relevant for clients
targeting Level 3.
The CMMC workbook renders from NIST 800-171 data — same controls,
same evidence, just differently labeled in the source table. This equivalence
is also why the workbook's CMMC 2.0 Level parameter (encountered in
Step 6) defaults to All and offers no Level 1 / Level 2 alternatives —
Defender for Cloud doesn't ship those as discrete standards, so the
dropdown has nothing to populate with.
Securing Microsoft 365 in GCC High | 2026.04.30
648

"SOLUTION" VS. "WORKBOOK" — THE SAME ARTIFACT, TWO
LAYERS
When you open the saved CMMC workbook from My workbooks in Step
6, its body header introduces itself with marketing copy starting "This
solution enables Compliance Teams, Architects, SecOps analysts and
Consultants..." — which is accurate but easy to misread as "this is a
solution, not a workbook." Both labels describe different layers of the same
package.
Sentinel content ships through Content Hub solutions — bundles that
typically include a workbook plus a set of analytics rule templates, and
sometimes hunting queries or playbooks. The CMMC 2.0 solution installed
in Step 1 bundles two artifacts referenced throughout this chapter:
• The CMMC 2.0 workbook (saved here in Step 4, configured in
Step 6).
• The two CMMC 2.0 Readiness Posture analytics rule templates
(turned into rules in Step 3).
The artifact you save and edit is a workbook (Azure Workbooks resource
type). The descriptive prose introducing it was authored once at the solution
level by Microsoft and rendered inside the workbook header — which is
why the workbook describes itself as a "solution."
7.2.5.5 Step 5: Demonstrate immediate operation of Sentinel and
key workbooks
The eight queries below produce audit evidence for specific CMMC Level 2
practices. Save them once, screenshot their results, and present them alongside the
Tier 1 workbooks saved in Step 4 for a complete client deliverable. This
demonstrates same-day value from the Sentinel deployment and reassures the client
that compliance-relevant telemetry is already flowing — independent of the 12–24h
wait for NIST 800-171 assessment data to populate the CMMC workbook tiles.
The deliverable combines three artifact categories, assembled in the order below.
1. Plumbing-evidence portal screenshots — prove the deployment is operational:
1. Defender portal → Microsoft Sentinel → Configuration → Data
connectors → filter by Connected status — shows the active connectors
SIEM Strategy
649

(Entra ID, Microsoft 365, Azure Activity, Defender XDR, etc.), direct
proof the wiring is live.
2. Defender portal → Microsoft Sentinel → Content management →
Content hub → Installed filter — the list of installed solutions establishes
deployment breadth.
3. Defender portal → Microsoft Sentinel → Configuration → Analytics
→ Rule templates — filtered count of available templates per source,
proving detection coverage is available to activate.
4. Azure portal → Log Analytics workspaces → law-sentinel-prod-usg
ovva→ Usage and estimated costs — GB/day ingestion chart and per-
table breakdown, proving data is actively flowing into the workspace.
2. Workbook narrative for the client deck (uses only Tier 1 workbooks saved in
Step 4) — this sequence answers five separate questions a compliance stakeholder
cares about, mapping cleanly to CMMC practice families AC, AU, CM, and SI:
1. Sign-in Logs (global sign-in map) — who is signing in.
2. Conditional Access SISM (policy outcomes) — whether CA enforced
correctly.
3. Audit Logs (role activations, directory changes) — what administrators
did.
4. SharePoint & OneDrive (external sharing) — how CUI is flowing
externally.
5. Office 365 (cross-workload activity) — the overall M365 activity envelope.
3. KQL evidence queries — eight saved queries that each produce audit evidence
for specific CMMC Level 2 practices. Screenshot each with results rendered for the
client deliverable; the mapping table below doubles as a one-page client handout:
Saved name (Category: Security,
Label: CMMC L2 Demo) CMMC L2 practices
Sign-in Volume by Country (7d) AU.L2-3.3.1, SI.L2-3.14.6
Privileged Role Activations (30d) AC.L2-3.1.5, AC.L2-3.1.7, AU.L2-3.3.2
Failed Sign-ins — Top 20 Users (7d) AC.L2-3.1.8, SI.L2-3.14.6, SI.L2-3.14.7
Azure Control-Plane Activity by Caller
(7d)
CM.L2-3.4.3, AU.L2-3.3.1
OfficeActivity - Events by RecordType
(7d)
AU.L2-3.3.1
Securing Microsoft 365 in GCC High | 2026.04.30
650

Saved name (Category: Security,
Label: CMMC L2 Demo) CMMC L2 practices
External Sharing Events - Sharepoint +
Teams
AC.L2-3.1.3, AC.L2-3.1.22
MIP Label Activity - Exchange (7d) MP.L2-3.8.1, SC.L2-3.13.11
DLP Policy Matches - Exchange (7d) AC.L2-3.1.3, MP.L2-3.8.7, SC.L2-3.13.8
Save each under Sentinel → Logs → Save → Query (Shared) using the settings
below.
Save-dialog settings for all eight queries:
• Name: the recommended name shown in each comment header.
• Description: paste the Evidence for:practice list from the comment
header (e.g., Evidence for AU.L2-3.3.1, SI.L2-3.14.6).
• Category: Security— the Category dropdown is a fixed picklist; pick Se
curityfor all eight.
• Labels: CMMC L2 Demo— Labels is the free-text field that creates the
custom grouping. Typing this on the first save creates the label; reuse it on
the remaining seven so all eight queries share the label and surface together
when filtering by label in the saved-query pane.
• Save to: ensure the workspace-shared option is selected (not personal/"my
SIEM Strategy
651

queries"), so the client team can see the saved queries too.
SAVING QUERIES IN SENTINEL IS NON-INTUITIVE — FIVE STACKED
GOTCHAS
Sentinel's Save Query experience has five quirks that together make it easy
to "lose" a query you just saved. Know these up front and you won't waste
time hunting:
1. Category is a fixed picklist; Labels is free-text. The naming feels
inverted — in most systems Categories are customizable and
Labels are fixed tags; in Sentinel's Save dialog it's the reverse. Pick
a Category from the fixed list (Securityfor compliance/evidence
work) and use Labels for custom groupings like CMMC L2 Demo.
2. Saves land in a Query Pack resource whose own blade does not
show queries. The DefaultQueryPack-{region}resource opens
to Resource Visualizer; there is no "list of queries in this pack"
page at the resource level in the portal. Don't hunt for your query
there — it's not a bug, it's the blade design.
3. The Queries pane in the Logs editor hides workspace-authored
queries by default. The Source / Provider filter defaults to
Microsoft / Solutions built-ins, which excludes your Query Pack
saves. Toggle Source → Query Packs (or Workspace) to see what
you actually saved.
4. Group by defaults to Category, not Labels. Your label-based
grouping won't appear until you change Group by: Category to
Group by: Labels in the Queries pane.
5. Forward slashes are not allowed in saved query names. The
Save dialog silently rejects the save (or strips the name). Use +, -,
or &amp;instead — e.g., External Sharing Events - Sharepo
int + Teams, not External Sharing Events — SharePoint/T
eams.
WORKFLOW THAT WORKS EVERY TIME
Sentinel → Logs → open the Queries pane (icon on left side of the editor)
→ set filter Source = Query Packs → set Group by = Labels → the CMMC
L2 Demogroup appears with exactly the queries saved under that label.
Securing Microsoft 365 in GCC High | 2026.04.30
652

// Sign-in volume by country over last 7 days — quickly shows global identity
activity
// Save as: Sign-in Volume by Country (7d)    |  Category: Security  |  Labe
l: CMMC L2 Demo
// Evidence for: AU.L2-3.3.1 (create and retain audit records),
//               SI.L2-3.14.6 (monitor organizational systems for unauthorize
d use)
SigninLogs
| where TimeGenerated > ago(7d)
| summarize SignInCount = count() by Location, bin(TimeGenerated, 1d)
| render timechart
// Privileged role activations in the last 30 days (PIM or direct assignment
s)
// Save as: Privileged Role Activations (30d)    |  Category: Security  |  La
bel: CMMC L2 Demo
// Evidence for: AC.L2-3.1.5 (principle of least privilege),
//               AC.L2-3.1.7 (prevent non-privileged users executing privileg
ed functions),
//               AU.L2-3.3.2 (ensure actions of individual users can be uniqu
ely traced)
AuditLogs
| where TimeGenerated > ago(30d)
| where OperationName contains "Add member to role"
| project TimeGenerated,
Actor = tostring(parse_json(tostring(InitiatedBy.user)).userPrincipalNam
e),
OperationName,
TargetRole = tostring(TargetResources[0].displayName)
| sort by TimeGenerated desc
// Failed sign-ins — top 20 users (potential password spray / brute force sig
nal)
// Save as: Failed Sign-ins — Top 20 Users (7d)    |  Category: Security  |
Label: CMMC L2 Demo
// Evidence for: AC.L2-3.1.8 (limit unsuccessful logon attempts),
//               SI.L2-3.14.6 (monitor unauthorized use),
//               SI.L2-3.14.7 (identify unauthorized use)
SigninLogs
| where TimeGenerated > ago(7d)
| where ResultType !in ("0", "50140")  // 50140 = MFA interrupt, not a true f
ailure
| summarize FailedCount = count() by UserPrincipalName, Location
| top 20 by FailedCount desc
// Azure control-plane changes by caller — admin-activity board
// Save as: Azure Control-Plane Activity by Caller (7d)    |  Category: Secur
ity  |  Label: CMMC L2 Demo
// Evidence for: CM.L2-3.4.3 (track, review, approve/disapprove, and log conf
iguration changes),
//               AU.L2-3.3.1 (create and retain audit records for control-pla
ne operations)
AzureActivity
| where TimeGenerated > ago(7d)
| where ActivityStatusValue == "Success"
| where OperationNameValue !endswith "/read"  // filter noisy read ops
| summarize Operations = count() by Caller, OperationNameValue
| top 50 by Operations desc
// OfficeActivity events by RecordType — workload-level M365 audit summary
// Run first to see which workloads (Exchange, SharePoint, Teams, MIP, DLP) a
SIEM Strategy
653

re emitting audit data
// Save as: OfficeActivity - Events by RecordType (7d)    |  Category: Securi
ty  |  Label: CMMC L2 Demo
// Evidence for: AU.L2-3.3.1 (create and retain audit records across M365 wor
kloads)
OfficeActivity
| where TimeGenerated > ago(7d)
| summarize Events = count() by RecordType
| top 20 by Events desc
// External sharing activity from SharePoint / Teams
// Save as: External Sharing Events - Sharepoint + Teams    |  Category: Secu
rity  |  Label: CMMC L2 Demo
// Note: forward slashes are not allowed in saved query names — use "+" or an
other separator.
// Evidence for: AC.L2-3.1.3 (control CUI flow in accordance with approved au
thorizations),
//               AC.L2-3.1.22 (control information posted or processed on pub
licly accessible systems)
OfficeActivity
| where TimeGenerated > ago(7d)
| where RecordType in ("SharePoint", "SharePointSharingOperation")
| where Operation in ("AnonymousLinkCreated", "SharingInvitationCreated", "Ad
dedToGroup")
| project TimeGenerated, UserId, Operation, OfficeObjectId, Site_Url, TargetU
serOrGroupName
| top 100 by TimeGenerated desc
// MIP label activity — sensitivity labels being applied or changed on Exchan
ge items
// Save as: MIP Label Activity - Exchange (7d)    |  Category: Security  |  L
abel: CMMC L2 Demo
// Evidence for: MP.L2-3.8.1 (protect CUI on media, including digital),
//               SC.L2-3.13.11 (employ cryptographic protection of CUI — labe
ls drive encryption)
OfficeActivity
| where TimeGenerated > ago(7d)
| where RecordType == "MIPLabel"
| summarize Events = count() by Operation, UserId
| top 20 by Events desc
// DLP policy matches on Exchange — CUI flow controls enforcing today
// Save as: DLP Policy Matches - Exchange (7d)    |  Category: Security  |  L
abel: CMMC L2 Demo
// Evidence for: AC.L2-3.1.3 (control CUI flow in accordance with approved au
thorizations),
//               MP.L2-3.8.7 (control use of removable media / external trans
port),
//               SC.L2-3.13.8 (implement cryptographic mechanisms to prevent
unauthorized disclosure of CUI during transmission)
OfficeActivity
| where TimeGenerated > ago(7d)
| where RecordType == "ComplianceDLPExchange"
| summarize Events = count() by Operation, UserId
| top 20 by Events desc
7.2.5.6 Step 6: Verify NIST 800-171 data arrival
12–24 hours after Prereq 3, run this discovery query in Sentinel → Logs to confirm
Securing Microsoft 365 in GCC High | 2026.04.30
654

NIST SP 800-171 data has landed in SecurityRegulatoryCompliance:
SecurityRegulatoryCompliance
| summarize count() by ComplianceStandard
Interpret the output:
Output Meaning
Zero rows Continuous export isn't yet producing Sec
urityRegulatoryCompliancedata. Re-
verify Prereq 3's data-type checkboxes —
the most common cause is that Regulatory
compliance was never actually checked.
Only Microsoft-cloud-security-benc
hmarkappears after 24h
Defender CSPM is not enabled on the
subscription. MCSB is the only
compliance standard the free Foundational
CSPM plan runs. Return to Prereq 1 and
toggle Defender CSPM to On, then wait
another 12–24h — NIST rows arrive on
the next assessment pass after enablement,
not immediately. This is the canonical
symptom of the Defender CSPM trap.
NIST-SP-800-171-Rev-2(or similar)
appears with any count
NIST data is live. Proceed to the
finalization tasks below.
Optional: force an immediate assessment pass
Skip this subsection if NIST-SP-800-171-Rev-2already appears in the
discovery query above. The scan only helps when data hasn't yet arrived —
running it once data is live just re-evaluates the same initiative and overwrites the
result with itself, taking 30 minutes to several hours of compute for no functional
change.
When the scan is useful: you've just enabled Defender CSPM or toggled the NIST
standard and don't want to wait 12–24 hours for the first scheduled pass, or you
corrected a Prereq 1 or 3 misconfiguration and want a fresh pass on-demand. The
scan triggers an Azure Policy compliance evaluation, which re-evaluates every
policy initiative assigned to the subscription — what Defender for Cloud's
regulatory compliance view is built from.
Prerequisite: Defender CSPM must already be On and the NIST standard already
toggled. Triggering the scan beforehand has no effect — there is no NIST initiative
SIEM Strategy
655

assigned yet.
From Azure Cloud Shell (inside portal.azure.us) or a local PowerShell with Con
nect-AzAccount -Environment AzureUSGovernment:
Set-AzContext -Subscription "<your-subscription-id>"
Start-AzPolicyComplianceScan -AsJob
Or via Azure CLI:
az cloud set --name AzureUSGovernment
Connect-AzAccount -TenantId "<your-tenant-id>"
az account set --subscription "<your-subscription-id>"
az policy state trigger-scan --no-wait
Expected timing after triggering: Microsoft describes the scan itself as "a long
time to run" — 30 minutes to several hours, depending on subscription size. After it
completes, Defender for Cloud still has to aggregate the policy-state results into the
regulatory compliance view, and continuous export still has to snapshot that data to
Log Analytics. Realistic end-to-end: 2–6 hours versus the default 12–24 hours. Re-
run the discovery query every hour or so until NIST-SP-800-171-Rev-2appears.
Finalize the CMMC workbook and posture rules
Once NIST data is live, finalize the two CMMC artifacts saved earlier — the
CMMC workbook from Step 4 and the two CMMC 2.0 Readiness Posture analytics
rules from Step 3:
1. Open the saved CMMC workbook — Defender portal → Microsoft
Sentinel → Threat management → Workbooks → My workbooks → click
CybersecurityMaturityModelCertification(CMMC)2.0. A pane opens
with three buttons: View saved workbook, View template, Delete. Click
View saved workbook — View template opens the read-only original and
does not honor your parameters.
2. Confirm workspace-scope parameters at the top of the workbook —
The parameter row at the top of the workbook contains three workspace-
scope parameters:
◦ Subscription: your Azure Government subscription.
◦ Workspace: your Sentinel workspace.
◦ Time range: Last 7 days (or whatever range you want for initial
render).
In a fresh save these typically already target the right workspace. The
Securing Microsoft 365 in GCC High | 2026.04.30
656

CMMC 2.0 Level parameter is not in this top row — it's a section-scoped
parameter that only renders after a Control Family column is expanded
(instruction 3).
3. Expand a Control Family column to reveal tiles and the Level
parameter — The workbook body presents two columns of Control
Family group checkboxes (column 1: Executive Summary, Controls
Crosswalk, Access Control, etc.; column 2: Maintenance, Media Protection,
Personnel Security, Physical Protection, etc.). Click the master Control
Family checkbox at the top of either column. The column expands and a
section appears below it containing per-tile data visualizations and the
CMMC 2.0 Level dropdown — already defaulting to All. Confirm Level =
All; do not change it. All is the only valid setting because Defender for
Cloud doesn't ship CMMC 2.0 Level 1 / Level 2 as discrete standards (see
the equivalence note in Step 4).
4. Verify Control Family tiles render and capture screenshot — With the
column expanded and Level = All, per-tile queries resolve against NIST-
tagged rows in SecurityRegulatoryComplianceand produce evidence
for each practice family. Capture a screenshot to supplement the client
deliverable from Step 5.
5. (Optional) Persist a top-row parameter default — Skip this unless you
want to change the saved default for Time range (e.g., Last 30 days instead
of Last 7 days). Only the top-row parameters can be persisted to the saved
workbook resource; the Control Family expand state and the section-scope
Level dropdown are per-session interactions — every time anyone reopens
this workbook, the column will be collapsed and Level will default to All.
This is by design in Azure Workbooks.
To change a top-row default:
◦ Click Open in Azure in the workbook toolbar to switch from the
Defender portal's read-only view to the Azure portal's editable
view.
◦ Click Edit to enter edit mode and change the parameter.
◦ Click the Save icon (floppy disk) in the workbook toolbar to persist
the new default.
◦ Click Done Editing to exit edit mode.
6. Confirm posture rules have fired — Defender portal → Microsoft
Sentinel → Configuration → Analytics → open each of the two CMMC
2.0 Readiness Posture rules from Step 3 → verify recent execution time
and any incidents produced. If neither has run in the last hour, the
SIEM Strategy
657

scheduled query trigger hasn't fired yet; give it another scheduling cycle.
After Step 6 passes, the CMMC posture assessment surface is fully operational and
the deliverable set is complete.
7.2.5.7 Step 7: Enable detection rule templates from product
solutions
Threat detection rules do not come from the CMMC 2.0 solution — they come
from the individual product Content Hub solutions installed in Step 1. Each solution
ships its own analytics rule templates.
After the Content Hub solutions are installed, go to Microsoft Sentinel →
Configuration → Analytics → Rule templates (no source filter). Browse or filter
by source to see rule templates from each connected product:
Source Example rule templates
Microsoft Entra ID Modified domain federation trust settings,
MFA Spamming followed by Successful
login, Azure RBAC (Elevate Access),
Suspicious application consent similar to
O365 Attack Toolkit, Bulk Changes to
Privileged Account Permissions
Microsoft 365 Malicious Inbox Rule, Mail redirect via
ExO transport rule, Multiple users email
forwarded to same destination,
SharePointFileOperation via previously
unseen IPs, Office Policy Tampering
Azure Activity Resource deletion alerts, RBAC role
assignment changes, policy modifications.
The Azure Activity source only appears in
the filter after the Azure Activity solution
is installed from Step 1 → Priority 1; if
you don't see it, install the solution first.
Microsoft Defender XDR LSASS Credential Dumping with
Procdump, Service Accounts Performing
Remote PS, C2-NamedPipe, Imminent
Ransomware, AV detections related to
specific malware families. Templates are
present immediately on solution install;
rules only fire once MDE / MDO / MDI
Securing Microsoft 365 in GCC High | 2026.04.30
658

Source Example rule templates
telemetry is flowing into the workspace.
CMMC 2.0 CMMC 2.0 Level 1 (Foundational) R
eadiness Posture(evaluates the 17
Level 1 practices) and CMMC 2.0 Level
2 (Advanced) Readiness Posture
(evaluates the 110 Level 2 practices).
Posture assessment, not threat detection
— created and enabled in Step 3. Out of
scope for this step.
Examples observed April 2026; Microsoft adds and removes templates over time, so
this list is illustrative rather than canonical. Filter Rule templates by source in your
SIEM Strategy
659

own tenant for the live set.
SCHEDULED VS. NRT RULE TYPES
The Rule type column on the Rule templates page is mostly Scheduled or
NRT (Near Real-Time) — Sentinel's two main analytics rule kinds.
• Scheduled runs a KQL query on an author-defined cadence
(typically every 5 minutes to every 24 hours) against a configurable
lookback window. The query can join across tables, summarize
over time windows, and use the full KQL surface — most useful
detections live here.
• NRT runs every minute against the last minute of data. To keep
that cadence cheap across every workspace, NRT restricts queries
to a single table with simple filtering — no multi-table joins, no
cross-table summarize, no lookups against externaldata. Fires
within ~1–2 minutes of an event landing.
Most templates are Scheduled because most useful detections need a wider
window than one minute or need to correlate across tables (e.g., "5 failed
sign-ins in 10 minutes followed by success" — Scheduled; "federation trust
setting changed" — NRT). The template author chose the rule type; you
cannot convert between them when enabling, only adjust the cadence and
lookback within the type's allowed bounds.
Other rule types you may see less frequently — Microsoft Security
(creates Sentinel incidents from alerts already generated by Microsoft
security products; largely superseded by direct alert sync), Fusion
(Microsoft's managed ML correlation engine, not customizable), Anomaly
(ML behavioral anomaly detection, surfaced under the Anomalies tab), and
Threat Intelligence (auto-matches incoming logs against TI feeds).
Minimum set to enable immediately — seven Microsoft Entra ID rule templates
that fire on data you already have post-Step 2 (no MDE / MDO / Linux onboarding
required). Ranked by attack-pattern severity and false-positive ratio:
# Rule Template Why it's in the
minimum set
CMMC L2
mapping
1 Modified domain Federation trust AC.L2-3.1.5,
Securing Microsoft 365 in GCC High | 2026.04.30
660

# Rule Template Why it's in the
minimum set
CMMC L2
mapping
federation trust
settings
manipulation is a
top-tier persistence
TTP (the
SolarWinds
technique). An
adversary who edits
the trust can mint
forged tokens and
bypass MFA
tenant-wide.
Extremely low
false-positive rate
— federation trust
changes are
deliberate and rare.
AC.L2-3.1.7,
IA.L2-3.5.3
2 Authentication
Methods Changed
for Privileged
Account
Adversary adds
their own MFA
method (FIDO2
key, Authenticator
app) to a
compromised
admin account for
persistence after a
phishing or token-
replay compromise.
Very high fidelity.
AC.L2-3.1.5,
IA.L2-3.5.3
3 MFA Spamming
followed by
Successful login
Catches MFA
fatigue / push-
bombing attacks
that ultimately
succeed —
currently a leading
initial-access vector
against MFA-
enabled users.
IA.L2-3.5.3,
SI.L2-3.14.6
4 Conditional Access
- A Conditional
Access user/group/
role exclusion has
changed
Adversary or
insider excludes a
backdoor account
from CA
enforcement to
bypass MFA /
AC.L2-3.1.5
SIEM Strategy
661

# Rule Template Why it's in the
minimum set
CMMC L2
mapping
device-compliance
controls. High
fidelity — CA
exclusions are
infrequent
administrative
actions.
5 Admin promotion
after Role
Management
Application
Permission Grant
Multi-step pattern:
a service principal
granted directory
role permissions,
then a user
promoted via that
principal. Specific
to a documented
adversary attack
chain.
AC.L2-3.1.5,
AC.L2-3.1.7
6 New User Assigned
to Privileged Role
General privilege-
escalation detection
— catches role
assignments
performed outside
approved PIM
workflows.
AC.L2-3.1.5
7 Privileged
Accounts - Sign in
Failure Spikes
Brute-force or
password-spray
activity targeting
admin accounts.
AC.L2-3.1.8,
SI.L2-3.14.6
Pair with NRT and Fusion. NRT Modified domain federation trust settings is the
same event as row 1 with ~1-minute latency; enable both — NRT for fastest fire,
Scheduled for redundancy on a high-stakes event. Advanced Multistage Attack
Detection (Fusion) — Microsoft's managed ML correlation engine — ships enabled
by default and creates cross-source incidents at no additional cost; confirm it shows
status Enabled under Active rules.
How to enable additional rules as data sources come online. Sort Rule templates
by Severity (High first), then check the Data sources column. A template that
queries DeviceProcessEvents(MDE) won't fire until MDE is onboarded;
templates against OfficeActivityneed M365 audit logs streaming. Enable
Securing Microsoft 365 in GCC High | 2026.04.30
662

templates whose data sources are already populated, and revisit the rest (e.g., LSASS
Credential Dumping with Procdump, Files Copied to USB Drives, AV detections
related to Ukraine threats, Local Admin Group Changes, Unusual Volume of file
deletion by users) as you onboard MDE, M365 audit logging, and other workloads.
REFERENCE SECTIONS BELOW
The sequential deployment flow ends with Step 7. The sections that follow
— Analytics Rules, Workbooks, SOAR Playbooks, Log Retention, and
SIEM — Compliance Control Mapping — are reference material to
return to during tuning and as detection coverage matures.
7.2.6 Analytics Rules
Analytics rules run KQL queries against ingested logs on a schedule and generate
Sentinel incidents when thresholds are met. Step 7 above covered enabling
Microsoft-provided templates; this section focuses on custom KQL rules you author
to fill detection gaps the templates don't cover.
7.2.6.1 Custom Analytics Rules — Examples
// GCC High: PIM activation outside business hours (ET)
// Detection-tuned variant of the panoramic demo query "Privileged Role Activ
ations (30d)" in Step 5.
// Same AuditLogs source, narrowed to a specific PIM-complete event and off-h
ours trigger.
AuditLogs
| where OperationName == "Add member to role in PIM completed (permanent)"
| extend ActivationHour = datetime_part("hour", TimeGenerated)
| where ActivationHour < 7 or ActivationHour > 19  // outside 7am-7pm ET
| project TimeGenerated, InitiatedBy, TargetResources, ActivationHour
// Conditional Access block spike — potential attack
SigninLogs
| where ResultType == "53003"  // CA block
| summarize BlockCount = count() by UserPrincipalName, bin(TimeGenerated, 1h)
| where BlockCount > 10
| project TimeGenerated, UserPrincipalName, BlockCount
// Sensitive label downgrade followed by external email
AuditLogs
| where OperationName == "SensitivityLabelUpdated"
| where parse_json(tostring(AdditionalDetails))["LabelEventType"] == "2"  //
2 = Downgrade
| join kind=inner (
EmailEvents
| where RecipientEmailAddress !endswith "@yourdomain.com"
SIEM Strategy
663

| where SentDateTime > ago(4h)
) on $left.UserId == $right.SenderFromAddress
| project TimeGenerated, UserId, SubjectLine=SubjectLine1
// External sharing: anonymous link creation or external guest invitation in
SharePoint/Teams
// Detection-tuned variant of the panoramic demo query "External Sharing Even
ts - Sharepoint + Teams" in Step 5.
// Adds AnonymousLinkUsed to the operations list and narrows via TargetUserOr
GroupType == "Guest" filter.
// Maps to AC.L2-3.1.3 (CUI flow control) and MP.L2-3.8.7 (media sanitization
/ external sharing)
OfficeActivity
| where RecordType in ("SharePoint", "SharePointSharingOperation")
| where Operation in (
"AnonymousLinkCreated",
"AnonymousLinkUsed",
"SharingInvitationCreated",
"AddedToGroup"
)
| where TargetUserOrGroupType == "Guest" or Operation startswith "Anonymous"
| project TimeGenerated, UserId, Operation, OfficeObjectId, Site_Url, TargetU
serOrGroupName
// Log tampering: audit log cleared (Windows Security and System logs) or dia
gnostic settings modified
// Maps to AU.L2-3.3.8 (protect audit information) and AU.L2-3.3.9 (limit aud
it management)
union
(
SecurityEvent
| where EventID in (1102, 104)  // 1102 = Security audit log cleared; 104
= System log cleared
| project TimeGenerated, Computer, EventID, Activity, Account
),
(
AzureActivity
| where OperationNameValue =~ "Microsoft.Insights/diagnosticSettings/dele
te"
or OperationNameValue =~ "Microsoft.Insights/diagnosticSettings/writ
e"
| where ActivityStatusValue == "Success"
| project TimeGenerated, CallerIpAddress, Caller, OperationNameValue, Res
ourceId
)
| sort by TimeGenerated desc
Note on PIM and elevated privilege coverage: The existing PIM
activation outside business hours rule above, combined with the built-in
template "New admin account creation," satisfies the elevated privilege
monitoring requirement for AC.L2-3.1.6 and IA.L2-3.5.3. No additional
rule is required for that control family.
7.2.7 Workbooks
Sentinel workbooks are interactive dashboards built on Log Analytics queries. Use
Securing Microsoft 365 in GCC High | 2026.04.30
664

them for executive security reporting, compliance evidence preparation, and threat-
hunting visual analysis.
For the GCC-High-specific list of which templates to save and when — grouped
Tier 1 (save now), Tier 2 (save but expect sparse content), Tier 3 (defer until
preconditions are met) — see Step 4: Save workbook templates for client
demonstration above.
CMMC 2.0 workbook prerequisites. The
CybersecurityMaturityModelCertification(CMMC)2.0 workbook requires NIST
SP 800-171 Rev. 2 enabled in Defender for Cloud, continuous export configured to
the Sentinel workspace, and 12–24 hours for the initial assessment pass to
complete. See Step 3: Enable CMMC 2.0 posture assessment for the full
prerequisite chain and validation query.
7.2.8 SOAR Playbooks
Sentinel playbooks are Logic Apps that trigger automatically on incident or alert
events.
Playbook Trigger Action
Enrich-IP-with-TI New incident Query threat intelligence
for IPs in the incident; add
verdict to incident
Block-AAD-User-on-High-
Risk
High-severity Entra
Identity Protection alert
Call Graph API to block
sign-in for the risky user
Revoke-Sessions-on-PIM-
Anomaly
PIM activation outside
hours alert
Revoke all active sessions
for the user via Graph API
Notify-SOC-on-MDE-
Isolation
Device isolation action in
MDE
Send Teams notification to
SOC channel with device
and analyst details
Post-Incident-to-
ServiceNow
Incident created Create a ServiceNow ticket
(or Jira issue) with incident
details
Create playbooks: Sentinel → Automation → Create → Playbook (Logic App
designer). For GCC High, Logic Apps must use Azure Government Logic Apps
(logic.azure.us endpoints).
SIEM Strategy
665

7.2.9 Log Retention
Retention Tier Cost Query
Performance Use
Interactive (hot) Higher Fastest (Log
Analytics)
Default for active
investigation;
90-day default
Long-term (cold) Lower Slower (restore
required)
CMMC 3-year
audit retention;
SOC 2 1-year
Archive Lowest Requires restore
job
7+ year retention
for regulatory
requirements
Configure retention per table: Log Analytics workspace → Tables → [Table] →
Manage table — set total retention period up to 12 years.
NIST SP 800-171 Rev. 2 does not specify a minimum log retention period, but
NIST SP 800-171A (assessment guide) requires that audit records be retained "for
an organization-defined time period." Industry practice for regulated organizations
is 3 years. Set Log Analytics retention to 365 days hot plus 2 years archive at
minimum.
7.2.10 SIEM — Compliance Control Mapping
ENVIRONMENT: GCC HIGH (CMMC)
7.2.10.1 SIEM CMMC Control Mapping
NIST Control Sentinel Capability
AU.L2-3.3.1 — Audit records Sentinel ingests and retains audit logs
from all connected sources (Entra,
M365, Azure, Intune)
AU.L2-3.3.2 — Audit review Analytics rules provide automated
Securing Microsoft 365 in GCC High | 2026.04.30
666

NIST Control Sentinel Capability
review; workbooks support periodic
manual review
AU.L2-3.3.5 — Audit analysis Custom KQL analytics rules correlate
events across sources
AU.L2-3.3.7 — Audit retention Long-term retention configured to 3+
years; audit records immutable in Log
Analytics
IR.L2-3.6.1 — Incident response Sentinel incidents provide the case
management and evidence collection
framework
IR.L2-3.6.2 — Incident reporting Sentinel playbooks automate
notification workflows to the security
team and stakeholders
SI.L2-3.14.6 — Monitoring for
unauthorized use
Behavioral analytics rules detect
anomalous access patterns
SI.L2-3.14.7 — Identify unauthorized
use
Entity behavior analytics (UEBA)
profiles users and devices for deviation
detection
For CMMC assessors, Sentinel provides the technical evidence that
AU.L2-3.3.1 and AU.L2-3.3.2 are implemented: audit records exist, are being
reviewed analytically, and are retained. Export Sentinel analytics rule
configurations and workbook screenshots as part of the audit evidence
package.
ENVIRONMENT: COMMERCIAL
7.2.10.2 NIST SP 800-171 Rev. 3 and SOC 2 Mapping
NIST SP 800-171 Rev. 3
SIEM Strategy
667

Control Sentinel Capability
3.3.1 — Audit records Multi-source log aggregation with
configurable retention
3.3.2 — Audit review Analytics rules and workbooks for
continuous and periodic review
3.3.5 — Audit analysis KQL correlation rules across all log
sources
3.14.6 — Monitoring Behavioral detection rules; UEBA
SOC 2 Type II
Trust Service Criteria Sentinel Implementation
CC7.2 — Monitoring for anomalies Analytics rules detecting anomalous
sign-ins, privilege changes, data access
CC7.3 — Evaluate security events Sentinel incidents with automated
enrichment and severity classification
CC7.4 — Respond to identified
anomalies
SOAR playbooks for automated
response; incident management
workflow
A1.2 — Monitoring for availability Azure resource health alerts ingested
via Azure Monitor connector
For SOC 2 Type II audits, provide the auditor with: the analytics rule list
(exported), 12 months of incident data (Sentinel incidents export), and
workbook screenshots showing monitoring dashboards were actively used
during the audit period.
7.3 Audit Readiness
Microsoft 365 and Azure Government produce audit logs at every layer of the stack
— identity, applications, data, devices, and infrastructure. This chapter maps those
Securing Microsoft 365 in GCC High | 2026.04.30
668

sources, explains how to operate them, and defines what a complete evidence
package looks like for CMMC Level 2 (GCC High) and SOC 2 Type II
(Commercial) assessments.
7.3.1 Log Source Reference
7.3.1.1 Microsoft 365 Unified Audit Log (UAL)
The UAL is the primary audit source for M365 workload events: Exchange (email
send/receive, mailbox access), SharePoint (file access, sharing, permission
changes), Teams (messages, membership changes), OneDrive, Purview (label
application, DLP matches), and Entra ID (sign-in events, group changes).
Access: Purview compliance portal → Audit → New search (or Search → Audit
log search in legacy portal)
Key parameters:
Parameter Notes
Date range Maximum 180 days per search; stagger
searches for longer periods
Activities Filter by specific operation types (e.g.,
FileAccessed, SensitivityLabelApplied)
Users Filter to specific UPNs for user-specific
investigation
File/folder Filter to specific SharePoint/OneDrive
paths
Record type Filter by workload (ExchangeItem,
SharePointFileOperation, etc.)
Retention:
• Purview Audit Standard (included in E3): 90 days
• Purview Audit Premium (included in E5 or as add-on): 1 year for most
operations; 10 years for Exchange, SharePoint, Teams with the 10-year
add-on license
Audit Readiness
669

PowerShell export:
# GCC High: use -Environment parameter
Connect-IPPSSession -Environment USGovernment
$results = Search-UnifiedAuditLog `
-StartDate (Get-Date).AddDays(-90) `
-EndDate (Get-Date) `
-RecordType SharePointFileOperation `
-ResultSize 5000
$results | Export-Csv -Path ".\UAL_SharePoint_90days.csv" -NoTypeInformation
7.3.1.2 Purview Audit Premium — High-Value Events
Purview Audit Premium (E5) adds additional high-value audit events not available
in Standard:
Event Value
MailItemsAccessed Records every time a mail item is accessed
— critical for email compromise
investigations
Send Records every sent message (vs. just
delivery)
SearchQueryInitiatedExchange Records mailbox search queries — detects
internal reconnaissance
SearchQueryInitiatedSharePoint Records SharePoint search queries
Enable Audit Premium for all user accounts: Purview → Audit → Audit retention
policies → create a 1-year policy for all users.
7.3.1.3 Entra ID Audit and Sign-In Logs
Sign-in logs: Every authentication event — user sign-ins, service principal sign-ins,
managed identity sign-ins. Each entry includes user, application, IP address,
location, device, Conditional Access policies applied, and result (success, failure,
interrupted).
Audit logs: All directory changes — user creation/deletion, group membership
changes, role assignments, application consent grants, PIM activations, password
resets.
Securing Microsoft 365 in GCC High | 2026.04.30
670

Access: Entra admin center → Monitoring → Sign-in logs / Audit logs (or
portal.azure.us for GCC High)
Retention in Entra: 30 days (P1/P2 license); 7 days without Entra ID P1. For
longer retention, export to Log Analytics (via Sentinel) or Azure Storage.
PowerShell export:
# Entra audit logs via Graph API
Connect-MgGraph -Scopes "AuditLog.Read.All" -Environment USGov  # USGov for G
CC High
Get-MgAuditLogDirectoryAudit -Filter "activityDateTime ge $(Get-Date -Format
'yyyy-MM-dd')Z" -All |
Select-Object ActivityDateTime, ActivityDisplayName, InitiatedBy, TargetR
esources, Result |
Export-Csv -Path ".\EntraAuditLog.csv" -NoTypeInformation
7.3.1.4 Azure Activity Log
The Azure Activity Log records all control-plane operations on Azure resources:
VM creation/deletion, storage account configuration changes, Key Vault access
policy changes, RBAC role assignments, network security group modifications.
Access: Azure portal → Monitor → Activity log (portal.azure.us for GCC High)
Retention: 90 days in the Azure portal. Route to Log Analytics (Sentinel) for
longer retention — required for compliance.
Critical events to monitor:
Operation Risk
Microsoft.Authorization/roleAssignments/
write
New RBAC role assignment — potential
privilege escalation
Microsoft.KeyVault/vaults/secrets/write Key Vault secret modification
Microsoft.Network/
networkSecurityGroups/write
NSG rule changes — potential firewall
bypass
Microsoft.Compute/virtualMachines/
delete
VM deletion — potential evidence
destruction
Microsoft.Storage/storageAccounts/write Storage account config change
Audit Readiness
671

7.3.1.5 Intune Audit Log
Records all administrative actions in Intune: policy creation/modification/deletion,
device wipes, compliance policy changes. See Intune Diagnostics & Audit
Evidence for details and export procedures.
7.3.1.6 Defender for Endpoint Audit Trail
MDE records: device onboarding/offboarding events, investigation actions (device
isolation, file quarantine, live response commands), alert state changes, and
exclusion modifications.
Access: security.microsoft.us → Settings → Endpoints → Advanced features; audit
trail available in the portal activity log.
7.3.1.7 Purview DLP and Label Activity
• DLP policy matches: Purview → Data loss prevention → Alerts (real-
time); Reports → DLP policy matches (historical)
• Label events: Purview → Data classification → Activity Explorer — all
label apply/change/remove events with justification text for downgrades
7.3.2 Operational Audit Procedures
7.3.2.1 Configuring Audit Log Retention Policies
In Purview Audit, create a retention policy before logs start rolling off:
1. Purview compliance portal → Audit → Audit retention policies → New
policy
2. Policy name: "Default 1-Year Retention"
3. Record types: All (or specify Exchange, SharePoint, AzureActiveDirectory,
etc.)
4. Duration: 1 year (requires Audit Premium / E5)
5. Priority: 1 (lowest number = highest priority)
For 10-year retention (E5 Compliance add-on): create a separate policy scoped to
MailItemsAccessed, Send, and FileAccessed with 10-year duration.
Securing Microsoft 365 in GCC High | 2026.04.30
672

7.3.2.2 Routing Logs to Sentinel / Log Analytics
Route all log sources to Sentinel for long-term retention and cross-source
correlation. See SIEM Strategy for connector configuration. Once in Log Analytics,
logs are queryable indefinitely (up to the workspace retention setting).
7.3.2.3 Alert on Audit Log Gaps
Configure an alert if audit logging is disabled or interrupted:
// Detect gaps in UAL ingestion (run as Sentinel analytics rule, daily)
OfficeActivity
| summarize LastEvent = max(TimeGenerated)
| where LastEvent < ago(4h)  // No events in 4 hours is a gap
| project LastEvent, Alert="Unified Audit Log ingestion gap detected"
7.3.3 Assessor Evidence Packages
ENVIRONMENT: GCC HIGH (CMMC)
7.3.3.1 CMMC Level 2 Evidence Package
A CMMC Level 2 assessment (C3PAO or government-led) requires evidence
that each practice is implemented. The following log-based artifacts satisfy
the audit domain (AU) practices and support other practice families.
AU Domain — Audit and Accountability
NIST Control Evidence Required Source
3.3.1 — Audit records Demonstrate audit
logging is enabled across
all in-scope systems
UAL configuration
screenshot; Entra
diagnostic settings
showing log routing to
Log Analytics; Azure
Activity Log routing
configuration
3.3.2 — Audit review Demonstrate logs are
reviewed
Sentinel analytics rules
list; evidence of alert
Audit Readiness
673

NIST Control Evidence Required Source
investigation (Sentinel
incident closure notes);
Purview Activity
Explorer review log
3.3.3 — Audit failure
alert
Demonstrate alerts fire if
logging fails
Sentinel rule alerting on
audit gap (KQL rule
export); Azure Monitor
alert for Entra diagnostic
failure
3.3.5 — Audit analysis Demonstrate correlation/
analysis capability
Sentinel analytics rules
(exported list with KQL);
workbook screenshots
3.3.6 — Reduction and
reporting
Demonstrate summary
reporting
Sentinel workbook
exports (monthly);
Compliance Manager
score history
3.3.7 — Authoritative
time source
Demonstrate logs use
consistent UTC time
source
Azure Monitor / Log
Analytics uses UTC —
document in SSP
3.3.8 — Protect audit
logs
Demonstrate logs are
protected from
modification
Log Analytics workspace
access control (only
Security Reader/
Contributor can access);
immutability policy on
storage export
3.3.9 — Limit audit
management
Demonstrate only
authorized personnel
manage audit
Entra PIM audit: who has
Log Analytics
Contributor and Security
Administrator roles
Assembling the Evidence Package
Prepare the following artifacts for each AU control:
1. UAL configuration — Screenshot of Purview Audit showing audit is
enabled, retention policy settings, and the audit retention policy
Securing Microsoft 365 in GCC High | 2026.04.30
674

covering all record types
2. Log routing — Screenshot of Entra diagnostic settings and Azure
Monitor settings showing export to Log Analytics workspace name
3. Analytics rules — Export from Sentinel: list of enabled analytics
rules with name, severity, and data source
4. 90-day audit log export — CSV export from UAL (at minimum
Exchange + SharePoint + Entra operations) covering the assessment
period
5. Sentinel incident log — Export of Sentinel incidents for the past 90
days showing triage and closure
6. Access control for audit logs — PIM role assignment report showing
who has Log Analytics access and when they last activated it
ENVIRONMENT: COMMERCIAL
7.3.3.2 SOC 2 Type II Evidence Package
SOC 2 Type II covers a 12-month audit period. The auditor tests whether
controls were operating effectively throughout the period — not just at a point
in time. Log-based evidence is used to demonstrate continuous operation.
Relevant Trust Service Criteria
TSC Criteria Evidence
CC7.2 Monitor for anomalies Sentinel analytics rules
list; sample alert
evidence from period
CC7.3 Evaluate security events Sentinel incident log (12
months); evidence of
investigation and closure
for significant incidents
CC7.4 Respond to anomalies Playbook exports;
incident response
documentation showing
Audit Readiness
675

TSC Criteria Evidence
playbook execution
CC6.1 Logical and physical
access
Entra sign-in logs
showing Conditional
Access enforced; Intune
compliance report
CC6.2 New access provisioning Entra audit log: user
creation + access
package assignment
events for the audit
period
CC6.3 Access removal Entra audit log: user
disable/delete events
correlated with HR
offboarding
CC6.6 Network protection Azure Firewall logs;
NSG flow logs in
Sentinel
A1.2 Monitoring for
availability
Azure Monitor
availability alerts; Log
Analytics uptime data
Assembling the SOC 2 Evidence Package
1. Sentinel analytics rules — List of rules enabled throughout the audit
period (take a snapshot at period start and end; show no gaps)
2. Sentinel incident log — 12-month export showing all incidents
created, severity, and closure status with disposition
3. Entra sign-in summary — Monthly aggregate: total sign-ins,
blocked by CA, MFA challenges, risky sign-ins (Entra Identity
Protection report)
4. Access provisioning/deprovisioning log — Entra audit log filtered to
user creation, group add, user disable, license removal operations for
the audit period
5. UAL export — Targeted exports for any significant security events
referenced in the incident log
6. Azure Activity log — RBAC changes, Key Vault access, network
Securing Microsoft 365 in GCC High | 2026.04.30
676

configuration changes for the audit period
SOC 2 auditors typically request evidence in the form of exports (CSV or
Excel) for sampling. Prepare the 12-month Entra audit export and 12-month
Sentinel incident list as the baseline; pull UAL exports for specific incidents
the auditor flags for deeper review.
7.3.4 Organizing Evidence for the Assessment
The evidence ingredients — logs, policies, configurations, screenshots — only
matter if an assessor can find and trust the specific artifact they ask for in the
moment. A defensible evidence package needs a single source of truth: one system
that maps each CMMC practice to the evidence satisfying it, the owner who
produced it, and the date it was last refreshed.
Three platforms dominate this space in the DIB market, each with a different sweet
spot:
• FutureFeed — the closest analog to QuickBooks for CMMC. Strong at
catalog-style evidence organization, practice-to-artifact mapping, and self-
assessment workflows. Best fit when the assessment is the primary driver
and the organization wants an opinionated structure.
• IntelliGRC — automation-forward, with particular strength in the Shared
Responsibility Matrix (SRM) model for MSPs managing compliance across
multiple client tenants. Best fit for service providers who need to reuse a
single evidence pattern across a book of business.
• StrikeGraph — AI-native, integrates tightly with modern SaaS stacks, and
offers a 60-day free trial path into a Level 2 self-assessment. Best fit when
the organization is still deciding whether to engage a C3PAO and wants a
low-commitment on-ramp.
The choice is less about which tool is objectively "best" than which maps most
naturally to how your team already documents work. Picking the wrong tool is a
recoverable mistake; not picking one — and defaulting to SharePoint folders and
ad-hoc spreadsheets — is the failure mode that burns C3PAO time during an
Audit Readiness
677

assessment and costs you a remediation cycle.
ATTRIBUTION
This comparison draws on roundtables and sessions at CS5 2026 with
Stuart Itkin (FutureFeed), Phillip Donald (IntelliGRC), and Justin Beals
(Strike Graph).
7.3.5 Working with Your C3PAO
A C3PAO is explicitly prohibited from consulting with, coaching, or implementing
solutions for a client they are actively assessing. The relationship therefore starts
further from you than your implementation partner's — and stays there.
7.3.5.1 Selection
Use selection conversations to stress-test boundary questions you know you'll care
about, not generic compliance credentials:
• "Do Teams meetings initiated from a secure enclave retain the enclave
boundary, or do they extend scope to peer tenants?"
• "Is an AVD KVM session a CUI-handling control or a CUI-processing
control?"
• "What evidence format do you prefer — catalog (FutureFeed-style),
document-driven, or SRM-driven?"
A C3PAO who answers these with a thoughtful, specific opinion that aligns with
your architecture is a better fit than one with a larger brand. "It depends" with no
follow-on framework is a warning sign.
7.3.5.2 Audit etiquette
The single most useful thing to know during an assessment is what to say when an
assessor asks about a control your team hasn't fully implemented or can't
immediately produce evidence for. Because the assessor cannot coach you,
improvising an answer in the moment usually costs more than silence. The three-
sentence script:
"We don't have the right person on the call. Let's circle back on this
during hot wash. We will provide you the control information then."
Securing Microsoft 365 in GCC High | 2026.04.30
678