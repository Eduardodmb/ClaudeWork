# 6. Data Protection Architecture

**CMMC2 Documentation** | Version 2026.04.30

**Pages:** 489-613

---

## Table of Contents

- 6.1 Data Protection Requirements
  - 6.2.2 Device Asset Inventory
  - 6.2.3 Cloud Application Asset Inventory
  - 6.2.4 Asset Inventory — Compliance Control Mapping
- 6.3 Compliance Manager Assessment
  - 6.3.2 NIST SP 800-171 Assessment
  - 6.4.1 Foundational
  - 6.4.2 Managed
  - 6.4.3 Optimized
  - 6.4.4 Strategic
- 6.5 Structured Data Governance
  - 6.5.3 Purview Data Map: Registering Azure SQL
  - 6.5.6 Business Glossary and Source-of-Truth Certification
  - 6.5.8 Phased Implementation
  - 6.6.2 Core SIT Groups
  - 6.6.4 Environment-Specific SITs
  - 6.6.6 OCR Limitation: Engineering CAD Drawings
- 6.7 Sensitivity Labels
  - 6.7.2 Label Scopes: Encryption vs. Container
  - 6.7.4 Policy-First Design
  - 6.7.6 Auto-Labeling
  - 6.7.7 Container Labels
  - 6.7.9 Label Downgrade Reporting
- 6.8 Data Loss Prevention
  - 6.8.1 Policy Priority and Execution Order
  - 6.8.3 Restricted / CUI — External Sharing Alerts
  - 6.8.6 PII SITs — External Sharing Alerts
  - 6.8.7 Finance SITs — External Sharing Alerts
  - 6.8.8 Internal Label — External Sharing Alerts
  - 6.8.9 Endpoint DLP
  - 6.8.11 Alert Tuning
  - 6.9.1 Activity Explorer
  - 6.9.2 Insider Risk Management
  - 6.9.4 DSPM for AI Readiness
- 6.10 Information Protection Scanner
  - 6.10.1 Architecture
  - 6.10.2 Sizing the Scanner Node
  - 6.10.3 Installation
  - 6.10.4 Discovery Mode vs. Enforcement Mode
  - 6.10.6 Environment-Specific Considerations
  - 6.11.2 Business Justification
  - 6.11.8 Risk Register
  - 6.11.9 Communication Plan
  - 6.11.10 Change Record
  - 6.12.2 Tented Projects — Sensitivity-Labeled Containers

---

NIST SP 800-171 Rev. 3 Control How Structured Policy Buildout
Satisfies It
3.14.1 — Identify, report, and correct
system flaws in a timely manner
WUfB rings provide structured, risk-
tiered patch deployment with defined
deferral periods.
6. Data Protection Architecture
6.1 Data Protection Requirements
Microsoft Purview Information Protection addresses four fundamental problems in
regulated data environments:
1. Discovery — Where is sensitive data? Content Explorer maps labeled
content across SharePoint, OneDrive, Exchange, and Teams. The Purview
Information Protection Scanner extends coverage to on-premises file
shares.
2. Classification — What is it? Sensitivity labels create a consistent
taxonomy that travels with files regardless of location or sharing state.
3. Flow Control — Where can it go? Data Loss Prevention (DLP) policies
enforce boundary constraints — blocking external shares, email forwards,
or clipboard paste based on label or content match.
4. Encryption — Even if data leaves the boundary, sensitivity label
encryption makes it unreadable without the right Entra ID identity and an
active license in the issuing tenant.
ENVIRONMENT: GCC HIGH
6.1.1 CMMC Scope
For CMMC Level 2, Purview addresses the following controls within the
information protection domain:
Data Protection Architecture
489

CMMC Practice Purview Mechanism
AC.L2-3.1.3 (CUI Flow Control) DLP policies prevent CUI from being
sent to external recipients, uploaded to
non-approved services, or shared with
users outside the tenant boundary.
SC.L2-3.13.11 (FIPS Encryption) Sensitivity label encryption uses
AES-256 and RSA-2048 through
Microsoft's FIPS 140-2 validated
cryptographic modules. Encryption is
document-level and persists
independent of storage location.
SC.L2-3.13.16 (CUI at Rest) Labels applying encryption protect CUI
at rest in SharePoint, OneDrive,
Exchange mailboxes, and Teams —
including items in shared drives and
archived conversations.
MP.L2-3.8.1 (Media Protection) Sensitivity labels persist when CUI is
exported to USB or local disk. Intune
Device Control (configured in Chapter
10) restricts unencrypted export to
removable media.
MP.L2-3.8.7 (Removable Media) Defender for Endpoint Device Control
provides the enforcement layer;
Purview Endpoint DLP provides the
data-awareness layer — triggering
policy based on label or content match
during copy-to-USB events.
6.1.2 CUI Label Taxonomy
The DoD CUI Registry defines over 20 categories. For most DIB
organizations, a practical starting taxonomy covers the categories that appear
most frequently in engineering and program management workflows:
Securing Microsoft 365 in GCC High | 2026.04.30
490

Label Scope Encryption
Public Approved for public
release; no restrictions.
None
Internal Internal business
information not cleared
for external release.
None
CUI Controlled Unclassified
Information — default
label for unmarked CUI.
Required — AES-256
via sensitivity label
CUI // SP-CTI Controlled Technical
Information —
engineering drawings,
specifications, test data.
Required
CUI // SP-EXPT Export Controlled —
ITAR/EAR-regulated
Required
Data Protection Requirements
491

Label Scope Encryption
technical data.
START WITH CUI, NOT THE FULL REGISTRY
Attempting to implement all 20+ CUI sub-categories at initial
deployment creates user confusion and drives low adoption. Start with
the three encrypted labels (CUI, SP-CTI, SP-EXPT). Users can
request additional sub-categories as the program matures. A CMMC
assessor needs to see that CUI is labeled and encrypted — not that
every category is pre-built on day one.
GCC HIGH PURVIEW IS SOVEREIGN — VERIFY YOUR PORTAL
URL
Purview in GCC High uses sovereign endpoints. Confirm that your
compliance portal URL is compliance.microsoft.us. If it resolves
to compliance.microsoft.com, sensitivity label encryption keys
may be managed in the commercial cloud, which is out of scope for
CUI. Verify your Azure Information Protection service endpoint in
the Purview admin center before deploying labels.
ENVIRONMENT: COMMERCIAL
6.1.3 NIST SP 800-171 Rev. 3 Scope
For organizations voluntarily aligning to NIST SP 800-171 Rev. 3, Purview
addresses the following security requirements within the information
protection domain:
Securing Microsoft 365 in GCC High | 2026.04.30
492

NIST SP 800-171 Rev. 3
Requirement Purview Mechanism
3.1.3 (Information Flow Control) DLP policies prevent sensitive data
from being sent to external recipients,
uploaded to non-approved cloud
services, or shared outside the
organization.
3.13.11 (FIPS Cryptography) Sensitivity label encryption uses
AES-256 and RSA-2048 through
Microsoft's FIPS 140-2 validated
cryptographic modules. Encryption
persists at the document level
regardless of storage location.
3.13.16 (Confidentiality at Rest) Labels applying encryption protect
sensitive data at rest in SharePoint,
OneDrive, Exchange mailboxes, and
Teams — including archived and
shared content.
3.8.1 (Media Protection) Sensitivity labels persist when data is
exported to USB or local disk. Intune
Device Control restricts unencrypted
export to removable media.
3.8.7 (Removable Storage Devices) Defender for Endpoint Device Control
blocks unauthorized write access to
removable media; Purview Endpoint
DLP provides content-awareness
triggering based on label or sensitive
information type match.
6.1.4 Sensitive Data Label Taxonomy
Commercial organizations have more flexibility in label taxonomy than
CMMC-scoped environments. The goal is a taxonomy that maps to how your
organization actually describes its sensitive data — not to a regulatory
registry. A practical starting taxonomy for most commercial M365
deployments:
Data Protection Requirements
493

Label Scope Encryption
Public Approved for external
release.
None
Internal Business content that
originates within the
organization. Default
label for unlabeled
content.
None
Confidential Content subject to
regulatory requirements
(GLBA, FERPA,
HIPAA, PCI-DSS) or
business-sensitive
material such as
financials, HR records,
and strategy documents.
Optional (recommended
for external shares)
Restricted Data requiring the most
stringent access controls
— M&A activity,
executive
communications, board
materials, credentials,
regulated PII/PHI.
Required — AES-256
via sensitivity label
FEWER LABELS DRIVE HIGHER ADOPTION
Purview deployments consistently show that taxonomies with more
than 5 labels result in poor adoption and significant mis-labeling.
Start with Public, Internal, Confidential, and Restricted. Add sub-
labels (e.g., Confidential // Legal, Confidential // Finance) only after
baseline adoption is established across the organization.
Securing Microsoft 365 in GCC High | 2026.04.30
494

6.2 Asset Inventory
A complete asset inventory is the prerequisite for every protection, monitoring, and
compliance capability in this guide. You cannot label what you haven't found,
cannot apply compliance policies to unmanaged devices, and cannot govern cloud
apps you don't know exist. Asset inventory in Microsoft 365 spans three domains:
data, devices, and cloud applications.
6.2.1 Data Asset Inventory
6.2.1.1 Content Explorer (Cloud Data)
Content Explorer is found in the Purview compliance portal under Data
classification → Content Explorer. It shows all labeled content across Exchange,
SharePoint, OneDrive, and Teams — searchable by label, sensitive information
type (SIT), or location. The view displays item counts per label per location, which
is useful for tracking auto-labeling coverage over time.
The display is limited to one million items. For volume reporting beyond that
threshold, use Activity Explorer.
Access requires the Content Explorer Content Viewer or Content Explorer List
Viewer role. These are separate from the Compliance Administrator role because
they grant read access to actual file content — assign them deliberately and to a
limited audience.
6.2.1.2 Activity Explorer (Labeling Activity)
Activity Explorer is found under Data classification → Activity Explorer. It
shows labeling events over time: label applied, label changed, label removed, DLP
policy matches, and endpoint file events.
To track auto-labeling coverage progress, filter by Label applied combined with
Auto-labeling as the activity source. This shows how many files were labeled by
service-side policies versus user-applied labels, which is the primary progress
metric during a labeling rollout.
6.2.1.3 On-Premises Data (Purview Scanner)
The Purview Information Protection Scanner runs on a Windows Server node and
Asset Inventory
495

scans on-premises file shares and SharePoint Server sites. Results are stored in a
SQL Server database. The portal shows summary counts, but per-file detail requires
a direct SQL query.
For auditors requiring per-file evidence, query the SQL database directly. See
Information Protection Scanner for SQL query examples.
6.2.1.4 Structured Data (Purview Data Map)
For data replicated into Azure SQL, Azure Synapse, or other databases from ERP,
CRM, or HRIS systems, the Purview Data Map extends asset inventory to tables
and columns. It registers the data source as a cataloged asset and classifies sensitive
columns — bank account numbers, SSNs, PII — using the same SIT engine as
M365.
See Structured Data Governance for configuration steps.
6.2.2 Device Asset Inventory
Two overlapping inventories serve different purposes for auditors and operations
teams.
6.2.2.1 Entra Device Inventory (Identity Plane)
Access via the Entra admin center under Devices → All devices (portal.azure.com
or portal.azure.us for GCC High).
This inventory records every device that has registered or joined the tenant —
broader scope than Intune. Key fields include: device name, OS and version, join
type (Entra Joined, Hybrid Entra Joined, or Entra Registered), compliance state (a
single pass/fail badge reported from Intune), registered owner, and last sign-in.
This inventory does not contain hardware specs, software inventory, or per-policy
compliance detail. Scope includes BYOD devices that registered via Entra (for
example, for Entra MFA) but were never enrolled in Intune.
To export: Devices → Download (CSV) — provides the full device list with all
fields.
What it answers for auditors: What devices have an identity in this directory? Are
any stale (last sign-in greater than 90 days)? What is the join type distribution?
Securing Microsoft 365 in GCC High | 2026.04.30
496

6.2.2.2 Intune Device Inventory (Management Plane)
Access via the Intune admin center under Devices → All devices
(endpoint.microsoft.com or endpoint.microsoft.us for GCC High).
Scope is limited to devices enrolled for Intune management — narrower than Entra
but far richer per device. Key fields include: manufacturer, model, serial number,
IMEI/MEID for mobile devices, RAM, storage, CPU, OS version, last check-in,
compliance state, enrolled date, primary user, encryption status, and Intune
management profile.
Software inventory is available per device under Devices → [Device] →
Discovered apps, which lists all installed applications with version numbers.
To export: Devices → Export (CSV) for the hardware inventory; per-device
Discovered apps export for software inventory.
What it answers for auditors: Are all managed devices encrypted? Are OS
versions current? What applications are installed on managed devices? When did
each device last check in?
6.2.2.3 The Gap Between Entra and Intune
Devices present in Entra but absent from Intune represent unmanaged endpoints
with directory identities — the highest-risk category. These devices can
authenticate against M365 resources without being subject to compliance policies.
To identify the gap:
# Connect to both services
Connect-MgGraph -Scopes "Device.Read.All","DeviceManagementManagedDevices.Rea
d.All" -Environment USGov
# Entra device IDs
$entraDevices = Get-MgDevice -All | Select-Object -ExpandProperty DeviceId
# Intune device IDs (azureADDeviceId maps to Entra DeviceId)
$intuneDevices = Get-MgDeviceManagementManagedDevice -All | Select-Object -Ex
pandProperty AzureAdDeviceId
# Devices in Entra but not Intune
$entraOnly = $entraDevices | Where-Object { $_ -notin $intuneDevices }
Write-Host "$($entraOnly.Count) devices registered in Entra but not enrolled
in Intune"
Remediation: require Intune enrollment as a Conditional Access grant control for all
resource access. This forces unmanaged devices to enroll or be blocked before they
can reach M365 workloads.
Asset Inventory
497

6.2.3 Cloud Application Asset Inventory
6.2.3.1 Defender for Cloud Apps — Shadow IT Discovery
Microsoft Defender for Cloud Apps (MDA) discovers all cloud apps accessed from
managed endpoints by analyzing DNS queries and network traffic forwarded from
Defender for Endpoint.
Access via security.microsoft.com (or security.microsoft.us for GCC High) under
Cloud Apps → Cloud Discovery → Dashboard.
Each discovered app shows its risk score (0–10), user count, traffic volume, and
whether it has been marked as sanctioned or unsanctioned. The Cloud App Catalog
contains risk assessments for over 31,000 apps — each scored on security,
compliance, and legal dimensions.
Establishing the sanctioned app list:
1. Review discovered apps sorted by user count.
2. Mark IT-approved apps as Sanctioned — these form the baseline allowed
list.
3. Mark prohibited apps (personal storage, unapproved AI tools) as
Unsanctioned — MDA can generate a block list exportable to proxy or
firewall for enforcement.
6.2.3.2 Microsoft Entra Application Registration Inventory
Access via the Entra admin center under Applications → App registrations (all
applications) and Enterprise applications.
• App registrations — first-party apps your organization has registered:
service principals for automation, custom apps, and integrations.
• Enterprise applications — all apps, first and third party, that have been
granted access to the tenant, including OAuth consent grants.
To export: each blade has a Download option for CSV.
OAuth consent grant audit:
Overprivileged OAuth apps granted permissions such as Mail.ReadWrite, File
s.ReadWrite.All, or Directory.ReadWrite.Allrepresent a significant risk
vector. Review these quarterly using the App Governance dashboard in Defender
Securing Microsoft 365 in GCC High | 2026.04.30
498

for Cloud Apps. See Threat Defense for App Governance alert configuration.
6.2.4 Asset Inventory — Compliance Control
Mapping
ENVIRONMENT: GCC HIGH (CMMC)
CMMC Level 2 does not have a dedicated asset inventory control family, but
asset inventory evidence is required across multiple domains:
NIST Control Asset Inventory Connection
CM.L2-3.4.1 — Baseline
configurations
Intune device inventory confirms all in-
scope devices are under management
and have baselines applied
CM.L2-3.4.2 — Security configuration
enforcement
Intune compliance report demonstrates
baseline enforcement; gap analysis
(Entra vs. Intune) identifies unmanaged
devices
SI.L2-3.14.1 — Flaw remediation Intune software inventory identifies
devices with outdated OS or
application versions
MP.L2-3.8.3 — Sanitization Device inventory identifies devices
leaving scope (retired, reassigned)
requiring sanitization
AC.L2-3.1.1 — Authorized access Intune enrollment report confirms only
authorized, managed devices have
access to CUI resources via
Conditional Access with compliant
device requirement
RA.L2-3.11.1 — Risk assessments Content Explorer label coverage report
provides the data inventory input to risk
assessment
CA.L2-3.12.4 — System security plan Asset inventory (devices, apps, data
Asset Inventory
499

NIST Control Asset Inventory Connection
locations) is a required input to the SSP
Audit Evidence Package — Asset Inventory
Provide to CMMC assessors:
1. Intune device inventory CSV — all managed devices, enrollment
date, compliance state, last check-in
2. Entra device list CSV — full tenant device list; compare to Intune for
gap evidence
3. Content Explorer label coverage report — screenshot or export
4. Sanctioned/unsanctioned cloud app list from MDA Cloud Discovery
5. Entra enterprise application list — OAuth grants
ENVIRONMENT: COMMERCIAL
NIST SP 800-171 Rev. 3 Control Mapping
Control Asset Inventory Connection
3.4.1 — Baseline configurations Intune device inventory with
compliance state
3.4.2 — Configuration enforcement Gap analysis between Entra and Intune
enrollment
3.14.1 — Flaw identification Intune discovered apps for software
version tracking
3.1.1 — Authorized access Enrolled device list as the authorized
device registry
SOC 2 Type II — CC6.1 (Logical Access)
The combination of Entra device inventory and Intune device inventory,
Securing Microsoft 365 in GCC High | 2026.04.30
500

supplemented by MDA cloud app discovery, satisfies the SOC 2 CC6.1
requirement to identify and manage the inventory of information assets.
Provide the Intune device CSV, the Content Explorer label summary, and the
MDA sanctioned app list to SOC 2 auditors as evidence of asset inventory
controls.
6.3 Compliance Manager Assessment
Purview Compliance Manager provides assessment templates that map Microsoft
365 configuration actions to specific compliance framework controls. Each
assessment identifies Microsoft-managed controls (Microsoft's responsibility as
the cloud provider) and customer-managed controls (your organization's
responsibility as the tenant administrator).
Navigate to Purview Compliance Portal > Compliance Manager > Assessments
and create a new assessment using the template for your framework.
ENVIRONMENT: GCC HIGH
6.3.1 CMMC Level 2 Assessment
Create a new assessment using the CMMC Level 2 template.
ASSESSMENT SCOPE
The CMMC Level 2 assessment in Compliance Manager maps to
NIST SP 800-171 Rev. 2 controls — consistent with the DoD CMMC
Final Rule mandate. It does not constitute a formal CMMC
assessment or C3PAO audit, but serves as an internal readiness
measurement tool and evidence repository for your SSP.
Compliance Manager Assessment
501

6.3.1.1 Priority Customer-Managed Actions: Data Protection
— CMMC Level 2
The following are the highest-priority customer-managed action items in the
CMMC Level 2 assessment addressed by Purview configuration,
corresponding to the controls in Section 11-1: Data Protection Requirements.
Action Item CMMC Control Purview
Implementation Evidence
Implement data
classification and
labeling
AC.L2-3.1.3 Sensitivity labels
with CUI scope
published to users
and applied via
auto-labeling
policies in
SharePoint,
OneDrive, and
Exchange
Purview Content
Explorer —
labeled item count
by label; Activity
Explorer — label-
applied events
Encrypt CUI at
rest
SC.L2-3.13.16 Sensitivity labels
(CUI, SP-CTI,
SP-EXPT)
configured with
AES-256
encryption
restricting access
to tenant-internal
identities
Compliance
Manager
improvement
action status;
Purview Activity
Explorer —
protection-applied
events
Enforce FIPS-
validated
cryptography
SC.L2-3.13.11 Microsoft's FIPS
140-2 validated
cryptographic
modules underpin
sensitivity label
encryption in
GCC High — no
additional
configuration
required
Reference
Microsoft's FIPS
140-2
cryptographic
module validation
certificates in
your SSP
Implement data AC.L2-3.1.3 DLP policies in DLP policy match
Securing Microsoft 365 in GCC High | 2026.04.30
502

Action Item CMMC Control Purview
Implementation Evidence
loss prevention
for CUI
Exchange, Teams,
SharePoint, and
OneDrive
blocking external
sharing of CUI-
labeled or CUI-
matching content
reports; Purview
DLP Alerts —
override and
incident review
Control
removable media
for CUI
MP.L2-3.8.1,
MP.L2-3.8.7
Intune Device
Control XML
(Chapter 10)
restricts USB
write access;
Purview Endpoint
DLP policy
blocks copy of
labeled content to
removable media
MDE Device
Control events
(Advanced
Hunting);
Purview Endpoint
DLP alerts
6.3.1.2 Classify & Protect: Setup Steps — CMMC
• [ ] Create the label taxonomy from Section 11-1: Public, Internal,
CUI, CUI // SP-CTI, CUI // SP-EXPT.
• [ ] Configure encryption on CUI, SP-CTI, and SP-EXPT labels.
Restrict decryption to your tenant's Entra ID groups representing
CUI-authorized personnel.
• [ ] Publish labels to all users with a default label policy. Set Internal
as the document default; require justification to downgrade from CUI.
• [ ] Enable auto-labeling for Exchange and SharePoint using built-in
Sensitive Information Types for CUI categories (e.g., U.S. export-
controlled content, DoD contract numbers).
• [ ] Enable container labels on SharePoint sites and Teams used for
CUI — enforce private membership, external sharing off, and
unmanaged device restrictions.
6.3.1.3 Detect & Enforce: DLP Setup Steps — CMMC
• [ ] Create DLP policies for Exchange, SharePoint, OneDrive, and
Teams:
Compliance Manager Assessment
503

◦ Block or encrypt external sharing of CUI-labeled content.
◦ Require business justification + manager approval for
overrides.
◦ Show policy tips in-client; notify the security team on
incidents.
• [ ] Enable Endpoint DLP on managed Windows devices:
◦ Control copy-to-USB, print, clipboard, and browser upload
when content matches CUI labels or Sensitive Information
Types.
◦ Block sync to personal cloud storage (consumer OneDrive,
Google Drive, Dropbox).
6.3.1.4 Improvement Score Expectations — CMMC Level 2
A newly provisioned GCC High M365 tenant typically scores 30–40% on the
CMMC Level 2 assessment before customer configuration — the Microsoft-
managed controls (datacenter physical security, platform encryption, service
availability) are already credited. After deploying the configurations in this
book (Conditional Access, Intune baselines, Defender, and Purview labels/
DLP), expect 60–75% score. The remaining gap is typically administrative
controls — policy documentation, physical security attestations, and personnel
security actions — that Compliance Manager cannot verify programmatically
and must be manually attested.
Securing Microsoft 365 in GCC High | 2026.04.30
504

ENVIRONMENT: COMMERCIAL
6.3.2 NIST SP 800-171 Assessment
Create a new assessment using the NIST 800-171 template.
ASSESSMENT TEMPLATE VERSION
Compliance Manager includes a NIST SP 800-171 assessment
template. If the template reflects Rev. 2, the control mappings are
substantively the same as Rev. 3 for the Purview data protection
domain covered in this chapter — the customer action items apply to
both revisions. Verify the template version in the assessment detail
view and note the revision in your security plan documentation.
6.3.2.1 Priority Customer-Managed Actions: Data Protection
— NIST SP 800-171
The following are the highest-priority customer-managed action items in the
NIST 800-171 assessment addressed by Purview configuration, corresponding
to the controls in Section 11-1: Data Protection Requirements.
Action Item
NIST SP
800-171 Rev. 3
Requirement
Purview
Implementation Evidence
Implement data
classification and
labeling
3.1.3 (Information
Flow Control)
Sensitivity labels
published to all
users and applied
via auto-labeling
policies in
SharePoint,
OneDrive, and
Exchange
Purview Content
Explorer —
labeled item count
by label; Activity
Explorer — label-
applied events
Encrypt sensitive
data at rest
3.13.16
(Confidentiality at
Rest)
Confidential and
Restricted labels
configured with
Compliance
Manager
improvement
Compliance Manager Assessment
505

Action Item
NIST SP
800-171 Rev. 3
Requirement
Purview
Implementation Evidence
AES-256
encryption
restricting access
to tenant-internal
identities
action status;
Activity Explorer
— protection-
applied events
Use FIPS-
validated
cryptography
3.13.11 (FIPS
Cryptography)
Microsoft's FIPS
140-2 validated
cryptographic
modules underpin
sensitivity label
encryption by
default in
Microsoft 365
Reference
Microsoft's FIPS
140-2
cryptographic
module validation
certificates in
your security plan
Implement data
loss prevention
3.1.3 (Information
Flow Control)
DLP policies in
Exchange, Teams,
SharePoint, and
OneDrive
blocking external
sharing of
Restricted-labeled
or sensitive
content
DLP policy match
reports; Purview
DLP Alerts —
override and
incident review
Control
removable media
3.8.1, 3.8.7
(Media
Protection)
Intune Device
Control restricts
USB write access;
Purview Endpoint
DLP blocks copy
of sensitive
labeled content to
removable storage
MDE Device
Control events
(Advanced
Hunting);
Purview Endpoint
DLP alerts
6.3.2.2 Classify & Protect: Setup Steps — NIST
• [ ] Create the label taxonomy from Section 11-1: Public, Internal,
Confidential, Restricted.
• [ ] Configure encryption on the Restricted label. Restrict decryption
Securing Microsoft 365 in GCC High | 2026.04.30
506

to your tenant's Entra ID groups. Optionally enable encryption on
Confidential for content shared externally.
• [ ] Publish labels to all users with a default label policy. Set Internal
as the document default; require justification to downgrade from
Confidential.
• [ ] Enable auto-labeling for Exchange and SharePoint using built-in
Sensitive Information Types (credit card numbers, SSNs, passport
numbers, health record patterns) and any custom patterns relevant to
your business.
• [ ] Enable container labels on SharePoint sites and Teams used for
Restricted content — enforce private membership and disable
external sharing.
6.3.2.3 Detect & Enforce: DLP Setup Steps — NIST
• [ ] Create DLP policies for Exchange, SharePoint, OneDrive, and
Teams:
◦ Block or encrypt external sharing of Restricted content.
◦ Require business justification for overrides on Confidential
content sent externally.
◦ Show policy tips in-client; notify the security team on
incidents involving high-confidence sensitive information
type matches.
• [ ] Enable Endpoint DLP on managed Windows devices:
◦ Audit or block copy-to-USB and browser upload when
content matches Restricted labels.
◦ Block sync to personal cloud storage (consumer OneDrive,
Google Drive, Dropbox).
6.3.2.4 Improvement Score Expectations — NIST SP 800-171
A newly provisioned commercial M365 tenant typically scores 40–50% on
the NIST 800-171 assessment before customer configuration — higher than a
new GCC High tenant because several commercial defaults align with NIST
requirements. After deploying the configurations in this book (Conditional
Access, Intune baselines, Defender, and Purview labels/DLP), expect 65–80%
score. The remaining gap is typically administrative and physical controls —
policy documentation and personnel security actions — that require attestation
rather than technical configuration.
Compliance Manager Assessment
507

6.4 Purview Deployment Blueprint
The Microsoft Purview engineering team recently identified the 4-pillar model, the
“crawl, walk, run” approach, and the focus on data classification vs. data protection
as counterproductive. Maxime Bombardier from Microsoft introduces the new
model and the change in thinking here:
“What if we changed the behavior within organizations from labeling
3-5% of documents to secure and flipped this around to securing
everything and training users on what not to secure? What are labels for?
Are they for classification? Or are they for protection? They are for
protection.”
The Purview deployment blueprint guides the recommendations in this document.
Last week a Microsoft 365 Copilot deployment blueprint was released to cover
internal oversharing. You can see this diagram indicates to start with default and
site level labelling and then advancing to various forms of auto-labeling scenarios.
6.4.1 Foundational
Microsoft’s new guidance aims to shift the focus from classification to protection.
The first step is to design sensitivity labels for minimal disruption yet maximal
protection by default. We propose labeling documents as Confidential by default,
allowing users to remove the Confidential label if needed, and avoiding email
Securing Microsoft 365 in GCC High | 2026.04.30
508

encryption. The focus is on protecting by default and removing protection by
exception.
Enable container sensitivity labels by enabling assignment to Microsoft 365 groups
in Microsoft Entra ID and synchronizing labels from Security & Compliance to
Entra. This enables setting a default label for new/modified docs and enables
automatic labeling for existing docs. Here are the required (one-time) PowerShell
scripts for these Entra and Security & Compliance settings.
# install graph modules
Install-Module Microsoft.Graph -Scope CurrentUser
Install-Module Microsoft.Graph.Beta -Scope CurrentUser
# connect to MIcrosoft Graph
Connect-MgGraph -Scopes "Directory.ReadWrite.All"
# attempt to create to ensure it exists
# EnableMIPLabels: can Microsoft Information Protection labels be assigned to
Unified Groups
$template = Get-MgBetaDirectorySettingTemplate | Where-Object { $_.DisplayNam
e -eq "Group.Unified" }
$settingParams = @{
TemplateId = $template.Id
Values = @(
@{
Name = "EnableMIPLabels"
Value = "True"
}
)
}
New-MgBetaDirectorySetting -BodyParameter $settingParams
# verify new directory setting and set it again
$grpUnifiedSetting = Get-MgBetaDirectorySetting -Search DisplayName:"Group.Un
ified"
$valueParams = @{
Values = @(
@{
Name = "EnableMIPLabels"
Value = "True"
}
)
}
Update-MgBetaDirectorySetting -DirectorySettingId $grpUnifiedSetting.Id -Body
Parameter $valueParams
Import-Module ExchangeOnlineManagement
Connect-IPPSSession -UserPrincipalName "XXX@XXX.COM"
Execute-AzureAdLabelSync
Disconnect-ExchangeOnline
6.4.2 Managed
The focus of this phase is recommending stronger protection for identified sensitive
data:
Purview Deployment Blueprint
509

· A new higher-protection sensitivity label less-easily removed by end users
· Well-known sites, including sites used by leadership can be labeled with this more
sensitive label
· Similarly, detected credentials is a high-confidence detection and so can be auto-
labeled
· Documents identified based on trainable classifiers and sensitive info types can
suggest labels
With the foundation in place, we can focus on unlabeled content and risky behavior
detection:
· Data Loss Prevention rules for unlabeled content
· Insider Risk Management + Adaptive Protection to detect risky behavior
6.4.3 Optimized
We can then move to auto-labeling (vs. just recommending labels) as we better
understand our data.
· Client-side auto-labeling based on sensitive content
· Service-side auto-labeling based on context
· Custom Sensitive Info Types and Custom Trainable Classifiers
· Scripting sensitivity labels in SharePoint Online
6.4.4 Strategic
In this final phase, we implement operational procedures and expand beyond Office
365:
· Review unlabeled sites, discrepancies between item and site labels, risky user
behavior
· Secure collaboration with trusted partners (pull this forward)
· Tented projects (pull this forward)
Securing Microsoft 365 in GCC High | 2026.04.30
510

· Scanning on-premises assets
· Bring Your Own Key (BYOK) and Double Key Encryption (DKE)
· Accountability chain and lifecycle management
· Azure SQL and non-Microsoft 365 — see Structured Data Governance for
Purview Data Map, column-level classification, Power BI RLS, and Copilot
grounding for replicated ERP/CRM data
6.5 Structured Data Governance
The previous chapters in this section address data protection for unstructured
content — files in SharePoint, OneDrive, Exchange, and Teams. Sensitivity labels,
DLP policies, and the Purview Information Protection scanner all operate on
documents. This chapter addresses a different surface: structured data in
relational databases, typically Azure SQL or Azure Synapse, where the governing
tool is the Purview Data Map rather than Purview Information Protection.
6.5.1 The Escaped-RBAC Problem
Almost every organization that has moved beyond spreadsheets has a version of this
problem. A system of record — an ERP, CRM, HRIS, or project management
platform — enforces access control natively. Sales representatives see their
territory. HR sees their region. Finance sees everything. That access model is built
into the application and maintained by its own role administration.
The problem arrives when someone needs better reporting than the system provides.
The natural solution is to replicate data into Azure SQL and build Power BI reports
against it. This is the correct architectural move — but it has a consequence that is
easy to miss: the moment data lands in Azure SQL, the source system's RBAC
no longer applies. The database does not know that a sales representative is only
supposed to see the Pacific Northwest. It knows only that the user has read access to
the sales table.
The result is a governance gap with a predictable shape:
In the Source System In Azure SQL (unaddressed)
Sales rep sees own territory Sales rep can query all territories
Structured Data Governance
511

In the Source System In Azure SQL (unaddressed)
HR sees own region HR can query all regions
Finance sees everything Finance sees everything
Access revoked on termination SQL access persists until manually
removed
Field-level restrictions enforced by app All columns readable by anyone with table
access
This gap is not a security failure — it is an architectural reality that requires an
explicit governance response. Purview Data Map provides the discovery and
classification layer; Power BI Row-Level Security provides the enforcement layer.
6.5.2 Purview Data Map vs. Purview Information
Protection
These are distinct capabilities that share the Purview brand but serve different
surfaces:
Purview Information
Protection Purview Data Map
Primary surface M365 content (files, email,
Teams messages)
Structured data sources
(Azure SQL, Synapse,
ADLSg2, on-prem SQL)
Governance unit Document / email Table, column, data asset
Classification Sensitivity labels applied to
files
Sensitive Information
Types mapped to columns
Portal Purview compliance portal Purview governance portal
(purview.microsoft.co
m)
Enforcement DLP policies, label
encryption
Power BI RLS, column
masking, access policies
AI grounding Copilot scoped by label +
permission
Copilot grounded in
certified, cataloged sources
Securing Microsoft 365 in GCC High | 2026.04.30
512

Both portals are part of the Microsoft Purview product family. Both are required for
a complete governance posture when an organization has structured data outside
M365.
ENVIRONMENT: GCC HIGH
PURVIEW DATA MAP AVAILABILITY IN GCC HIGH
Purview Data Map (formerly Azure Purview) is available in Azure
Government. Access the governance portal at purview.microsoft.u
s. Confirm that your Azure SQL instance is deployed in an Azure
Government region before registering it as a data source — cross-
cloud scanning (Azure Government SQL → commercial Purview) is
not supported.
ENVIRONMENT: COMMERCIAL
The Purview governance portal for commercial tenants is at purview.micros
oft.com. Azure SQL instances in any commercial Azure region can be
registered as data sources.
6.5.3 Purview Data Map: Registering Azure SQL
The Purview Data Map is a metadata catalog. It does not store your data — it stores
facts about your data: schema, column names, detected sensitive information types,
data lineage, and business glossary terms. Registering a data source teaches
Purview what exists. Scanning it classifies what it finds.
6.5.3.1 Prerequisites
• Purview account: Create a Microsoft Purview account in the Azure portal.
The account requires a managed identity that will be used to authenticate to
data sources.
• Azure SQL firewall: Allow the Purview managed identity to reach the
Structured Data Governance
513

Azure SQL server. The simplest approach is to enable Allow Azure
services and resources to access this server in the SQL server firewall
settings, then restrict further using Purview's managed private endpoints if
required.
• SQL permissions: Grant the Purview managed identity db_datareader
on the target databases. This is read-only access used only for schema
discovery and data sampling during classification.
-- Run in each database Purview will scan
CREATE USER [your-purview-account-name] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [your-purview-account-name];
6.5.3.2 Registering the Data Source
1. In the Purview governance portal, navigate to Data Map > Sources.
2. Click Register and select Azure SQL Database.
3. Select your subscription and SQL server. Choose whether to register
individual databases or all databases on the server.
4. Assign the source to a Collection — a logical grouping that controls who
can see and manage the asset. Create collections that mirror your
organizational structure (e.g., Finance, Operations, HR).
6.5.3.3 Running a Classification Scan
Once registered, create a scan to discover and classify the data:
1. Select the registered source and click New scan.
2. Choose a scan rule set — start with the built-in AzureSqlDatabase rule
set, which includes Purview's library of Sensitive Information Types (SITs)
covering financial account numbers, PII, health data, and credentials.
3. Set the scan scope: select specific databases and schemas, or scan
everything.
4. Schedule the scan — run immediately for initial discovery, then weekly or
monthly for ongoing monitoring.
After the scan completes, each table and column is annotated with detected
classifications. A column containing 16-digit numbers in a payment context will be
detected as Credit Card Number. A column with 9-digit patterns will be detected
as U.S. Social Security Number. Custom classifications can be added for business-
specific patterns (routing numbers, employee IDs, contract numbers).
6.5.3.4 Reading Scan Results
Navigate to Data Map > Assets and filter by source to see classified tables and
Securing Microsoft 365 in GCC High | 2026.04.30
514

columns. For each asset you can see:
View What It Shows
Schema All tables and columns with their detected
classifications
Lineage Where data came from and where it flows
(populated when Power BI datasets are
also registered)
Contacts Assigned owners and stewards
Glossary terms Business definitions linked to this asset
Classifications Sensitive Information Types detected in
this column
6.5.4 Column-Level Classification
Purview's classification engine samples data during the scan and matches column
values against its SIT library. For structured data from ERP or CRM systems, the
most commonly detected types include:
Sensitive Information
Type Typical Source Risk if Exposed
Bank Account Number AP/AR systems Financial fraud
Routing Number Payment processing Financial fraud
Credit Card Number Point-of-sale, e-commerce PCI-DSS scope, fraud
U.S. Social Security
Number
HR, payroll Identity theft
Date of Birth HR, CRM PII — privacy regulation
Email Address CRM, ERP Low individually; high in
aggregate
Street Address CRM, ERP PII in regulated contexts
IP Address Log tables Network intelligence
Structured Data Governance
515

6.5.4.1 Custom Classifications
For business-specific sensitive columns not covered by built-in SITs — contract
numbers, internal project codes, employee badge numbers — create custom
classifications:
1. Navigate to Management > Classification rules in the Purview
governance portal.
2. Create a Regular expression rule (for structured patterns like PRJ-\d{6})
or a Dictionary rule (for enumerated values like internal department
codes).
3. Add the rule to a custom scan rule set and re-scan affected sources.
6.5.4.2 Column Masking in Azure SQL
Classification in Purview is a metadata operation — it labels but does not restrict.
For columns classified as sensitive, enforce Dynamic Data Masking in Azure SQL
to limit what low-privilege users see in query results without changing the
underlying data:
-- Mask bank account numbers — show only last 4 digits
ALTER TABLE dbo.Payments
ALTER COLUMN BankAccountNumber ADD MASKED WITH (FUNCTION = 'partial(0,"XXXX-X
XXX-XXXX-",4)');
-- Mask SSNs — show only last 4 digits
ALTER TABLE dbo.Employees
ALTER COLUMN SSN ADD MASKED WITH (FUNCTION = 'partial(0,"XXX-XX-",4)');
-- Grant unmasked access to privileged roles only
GRANT UNMASK TO [FinanceAdmins];
Dynamic Data Masking operates at the SQL engine level — no application changes
required — and applies to all query interfaces including Power BI DirectQuery
connections.
6.5.5 Power BI Row-Level Security
Classification identifies what data is sensitive. Row-Level Security (RLS) enforces
who can see which rows. For organizations that replicated ERP data into Azure
SQL to escape reporting limitations, RLS in the Power BI semantic model is the
primary enforcement mechanism that restores the access discipline the source
system provided.
Securing Microsoft 365 in GCC High | 2026.04.30
516

6.5.5.1 Mapping Source System Roles to RLS
Begin with the source system's role model. Document each role and its data scope
before writing any DAX:
Source System Role Data Scope Power BI RLS
Equivalent
Sales Representative Assigned territory /
neighborhood
Rows where Territory =
USERPRINCIPALNAME()
lookup
Builder / Contractor Assigned project or
neighborhood
Rows where Project IN
(user's project list)
Regional Manager Multiple territories Rows where Region = US
ERPRINCIPALNAME()
lookup
Accounting All financial data No row filter (full access)
Executive / Leadership All data No row filter (full access)
This mapping becomes the blueprint for your RLS roles in Power BI Desktop.
6.5.5.2 Implementing RLS in Power BI Desktop
RLS is defined in the Power BI Desktop file (.pbix) before publishing to the
Power BI service.
Step 1: Create a user mapping table in Azure SQL
Rather than hardcoding territory assignments in DAX, maintain a mapping table
that mirrors the source system's role assignments:
CREATE TABLE dbo.UserTerritoryMapping (
UserPrincipalName NVARCHAR(255) NOT NULL,
Territory         NVARCHAR(100) NOT NULL,
AccessLevel       NVARCHAR(50) NOT NULL -- 'Territory', 'Region', 'All'
);
Populate this table from the source system's role export and refresh it on the same
schedule as the ERP replication.
Step 2: Define RLS roles in Power BI Desktop
Structured Data Governance
517

In Power BI Desktop, go to Modeling > Manage roles and create a role for each
access tier:
-- Role: Territory Rep
-- Filter on the Sales table
[Territory] = LOOKUPVALUE(
UserTerritoryMapping[Territory],
UserTerritoryMapping[UserPrincipalName], USERPRINCIPALNAME()
)
-- Role: Regional Manager
-- Filter on the Sales table (region-scoped)
[Region] = LOOKUPVALUE(
UserTerritoryMapping[Territory],
UserTerritoryMapping[UserPrincipalName], USERPRINCIPALNAME()
)
For users who should see all data (accounting, executives), do not assign them to
any RLS role — users not assigned to a role see all data.
Step 3: Publish and assign roles in the Power BI service
After publishing the report to a Power BI workspace:
1. Navigate to the semantic model settings in the Power BI service.
2. Select Security and assign Entra ID users or security groups to each RLS
role.
3. Use Test as role to verify each role's filter behavior before communicating
Securing Microsoft 365 in GCC High | 2026.04.30
518

access to end users.
SYNC RLS ASSIGNMENTS FROM ENTRA ID GROUPS
Rather than managing individual user assignments in Power BI, assign
Entra ID security groups to RLS roles. The groups can be maintained in
Entra with the same lifecycle management (provisioning, de-provisioning
on termination) that governs other access. When a sales rep's territory
changes, updating the mapping table and the Entra group membership is all
that is required — no changes to the Power BI report.
DIRECTQUERY VS. IMPORT MODE AFFECTS RLS BEHAVIOR
RLS works correctly in both Import and DirectQuery mode, but the timing
differs. In Import mode, data is refreshed on a schedule and RLS filters
apply to the cached dataset — a terminated user's access is removed when
their Entra account is disabled, not when data refreshes. In DirectQuery
mode, every query hits Azure SQL live, and SQL-level permissions
(Dynamic Data Masking, row-level security in SQL itself) are an additional
enforcement layer. For highly sensitive data with frequent role changes,
DirectQuery with SQL-native RLS provides the strongest posture.
6.5.5.3 Testing RLS Before Deployment
Test each role using View as in the Power BI service:
1. Open the published report.
2. Select More options (...) on the semantic model > Security.
3. Use Test as role and enter a test user's UPN to verify they see only the
rows their role permits.
4. Confirm that totals and aggregates reflect only in-scope data — not just that
individual row details are hidden.
Aggregate leakage is the most common RLS mistake: a sales rep who cannot see
other territories' individual records may still see a company-wide total if the DAX
measure is not filtered correctly. Validate every card, KPI, and summary visual.
Structured Data Governance
519

6.5.6 Business Glossary and Source-of-Truth
Certification
The Purview Data Catalog addresses a problem that technical controls cannot:
inconsistent definitions. When multiple teams use the same word to mean different
things — "sale" means contract signed to Sales, means revenue recognized to
Finance, means unit closed to Operations — reports contradict each other and AI
responses become unreliable.
6.5.6.1 Building the Business Glossary
In the Purview governance portal, navigate to Data Catalog > Business glossary
and create terms for each canonical concept:
Term Definition Owner Related Assets
Sale A contract executed
by a buyer,
confirmed with a
deposit, and not
subsequently
cancelled. Excludes
reservations and
holds.
VP Sales dbo.Contracts, d
bo.SalesTransac
tions
Cancellation A signed contract
subsequently
voided by either
party prior to
closing. Distinct
from an expired
reservation.
VP Sales dbo.Contracts
Closed Unit A sale that has
completed escrow
and transferred
title. The
authoritative count
for revenue
recognition.
Controller dbo.Closings
Active Inventory Units that are built
or under
construction, not
VP Operations dbo.Units
Securing Microsoft 365 in GCC High | 2026.04.30
520

Term Definition Owner Related Assets
yet sold or
cancelled.
Once terms are defined, link them to the columns in the Data Map that represent
them. A Power BI developer or Copilot querying "how many sales did we close in
Q1?" now has an authoritative, agreed-upon definition to draw from rather than
relying on column names or stale documentation.
6.5.6.2 Certifying Authoritative Sources
Purview's endorsement feature allows data stewards to mark assets as
authoritative. This is the technical mechanism for declaring that Azure SQL
(replicated from the ERP) is the source of truth — not the Excel exports individual
users have saved to SharePoint.
To endorse an asset:
1. Navigate to the asset in the Data Catalog.
2. Select Edit > Certification and choose Certified.
3. Assign a data steward as the certifying contact.
Certified assets are surfaced preferentially in Purview search results and, when
integrated with Microsoft Fabric, in Copilot's data grounding pipeline. Non-
certified assets (desktop exports, unmanaged SharePoint files) are discoverable but
not promoted as authoritative.
6.5.6.3 Data Stewardship
Technical certification is only as durable as the human process behind it. Assign
explicit steward roles for each certified data domain:
Domain Steward Role Responsibilities
Sales data Sales Operations Validate glossary terms,
approve new column
classifications, review
access reports quarterly
Financial data Controller Certify financial assets,
approve column masking
Structured Data Governance
521

Domain Steward Role Responsibilities
policy changes
HR / Payroll HR Manager Approve access to HR
schema, review user
mapping table changes
Customer PII Privacy Officer (or
equivalent)
Review scan results for
new PII columns, escalate
classification gaps
These are not full-time roles — they are accountability assignments that take a few
hours per quarter once the initial catalog is established.
6.5.7 Copilot Governance: Scoping AI to Certified
Sources
Microsoft 365 Copilot draws from the data its grounding pipeline can reach: M365
content the user has access to, and (with Copilot in Power BI or Fabric) the
semantic models the user can query. The governance work done in earlier steps
directly shapes what Copilot can and cannot draw from.
Sensitivity labels limit which M365 content Copilot will surface. A document
labeled Restricted and encrypted to a Finance group will not appear in a sales rep's
Copilot response.
Power BI RLS limits which rows Copilot in Power BI returns. A sales rep asking
"how are we tracking against target?" receives data filtered to their territory — not
because Copilot has territory logic, but because the semantic model it queries
enforces RLS against their identity.
Purview certification guides which data sources Copilot and Microsoft Fabric treat
as authoritative when multiple assets contain similar data. When a user asks a
Fabric Copilot question against the data catalog, certified assets are weighted higher
than uncertified ones.
The ungoverned path to bad AI: If individual users continue exporting ERP data
to Excel and storing it on SharePoint, Copilot will find those files and may return
answers grounded in stale, ungoverned exports rather than the certified SQL source.
The technical controls (RLS, masking, certification) cannot compensate for an
uncontrolled export pipeline. Governance requires a change management
Securing Microsoft 365 in GCC High | 2026.04.30
522

conversation alongside the technical deployment:
"The Excel exports you've been using for ad-hoc analysis are not going
away — but they are not authoritative. Any report or AI response that
needs to be trusted by leadership or customers should come from Power
BI, which draws from the governed source."
6.5.8 Phased Implementation
The structured data governance work described in this chapter is substantial. A
practical sequencing:
Phase Focus Outcome
1 — Discovery Register Azure SQL in
Purview Data Map. Run
initial scan. Document
tables, columns, detected
classifications. Map source
system roles to SQL tables.
Written data estate map;
column classification
report
2 — Enforce Access Implement Power BI RLS
aligned to source system
roles. Apply Dynamic Data
Masking to highest-
sensitivity columns.
Source system access
model restored in reporting
layer
3 — Catalog Build business glossary for
key terms. Certify
authoritative assets. Assign
stewards. Remove or label
non-authoritative
SharePoint exports.
Single source of truth
established; AI grounding
trustworthy
4 — Sustain Automate mapping table
updates from source
system role changes.
Schedule Purview re-scans
for new tables. Quarterly
steward reviews.
Governance maintained
without manual
intervention
Structured Data Governance
523

ENVIRONMENT: GCC HIGH
6.5.9 Structured Data — CMMC Control
Mapping
Structured data governance addresses CMMC controls in the access control
and media protection families, extending coverage beyond M365 content to
Azure SQL workloads:
CMMC Practice Structured Data Governance
Mechanism
AC.L2-3.1.1 (Authorized Access) Power BI RLS restricts report access to
authorized users. Azure SQL Dynamic
Data Masking limits field-level
exposure. User mapping table
maintained in sync with Entra ID
provisioning lifecycle.
AC.L2-3.1.3 (CUI Flow Control) Purview Data Map classification
identifies columns containing CUI-
equivalent data (account numbers, PII)
in Azure SQL. Column masking
prevents unauthorized read of sensitive
fields.
AC.L2-3.1.5 (Least Privilege) RLS roles are scoped to minimum
required data access. Accounting and
executive roles with full access are
explicitly documented and reviewed.
Service accounts used for Power BI
refresh are granted db_datareader
only.
AU.L2-3.3.1 (Audit Logging) Azure SQL Auditing logs all query
activity to a Log Analytics workspace.
Power BI usage metrics track which
reports and datasets are accessed by
which users.
MP.L2-3.8.1 (Media Protection) Purview Data Map scan results feed the
asset inventory for CUI in Azure SQL.
Securing Microsoft 365 in GCC High | 2026.04.30
524

CMMC Practice Structured Data Governance
Mechanism
Classified columns are tracked in the
data catalog as part of the SSP data
inventory.
CM.L2-3.4.2 (Security Configuration) Azure SQL server configuration
(firewall rules, auditing enabled, TDE
enforced, managed identity
authentication only) is documented as a
baseline configuration in the SSP.
ENVIRONMENT: COMMERCIAL
6.5.10 Structured Data — NIST SP 800-171 Rev.
3 Control Mapping
Structured data governance extends NIST SP 800-171 coverage to Azure SQL
workloads beyond M365 content:
NIST Requirement Structured Data Governance
Mechanism
3.1.1 (Authorized Access) Power BI RLS restricts report access to
authorized users. Azure SQL Dynamic
Data Masking limits field-level
exposure.
3.1.3 (Information Flow Control) Purview Data Map classification
identifies sensitive columns. Column
masking and RLS control the flow of
sensitive data to reporting consumers.
3.1.5 (Least Privilege) RLS roles scoped to minimum required
data access. Service accounts for Power
BI refresh granted read-only database
Structured Data Governance
525

NIST Requirement Structured Data Governance
Mechanism
access.
3.3.1 (Audit Logging) Azure SQL Auditing logs query
activity to Log Analytics. Power BI
usage metrics track report and dataset
access.
3.4.2 (Security Configuration) Azure SQL baseline configuration
(firewall, auditing, TDE, managed
identity) documented as part of the
system security plan.
6.5.11 Structured Data Next Steps
Topic Where
Sensitivity labels for M365 files Sensitivity Labels
DLP policies for M365 content Data Loss Prevention Policies
Purview deployment phasing Purview Deployment Blueprint
Scanning on-premises file shares Purview Information Protection Scanner
Asset inventory across M365 Asset Inventory
6.6 Sensitive Information Types
Sensitive Information Types (SITs) are the detection engine that drives auto-
labeling, DLP policies, and Insider Risk Management. Every policy in this chapter
references one or more SIT groups. Getting SIT configuration right before
deploying any label or policy prevents both false positives (over-blocking) and false
negatives (missed detections).
Securing Microsoft 365 in GCC High | 2026.04.30
526

6.6.1 How SITs Work
Each SIT evaluates content using a combination of pattern matching (regex),
keyword proximity, and checksum validation. The result is a confidence level:
Confidence Level Meaning Typical Use
High (85–100) Pattern + corroborating
keywords found
Block or auto-label
Medium (75–84) Pattern found, fewer
keywords
Alert or policy tip
Low (65–74) Pattern only, no
corroboration
Audit / Discovery only
Policies should reference the confidence level explicitly. A DLP rule that fires at
Low confidence on Credit Card will generate excessive false positives in any
organization that sends invoices by email.
6.6.2 Core SIT Groups
6.6.2.1 Financial SITs
Used in DLP Finance alert policies and auto-labeling of Confidential content.
Sensitive Info Type Detection Method Notes
Credit Card Number Luhn checksum + keyword
proximity
See false positive
mitigation below
U.S. Bank Account
Number
ABA routing + account
pattern
SWIFT Code ISO 9362 pattern
International Banking
Account Number (IBAN)
Country-specific regex +
checksum
U.S. Individual Taxpayer
Identification Number
(ITIN)
SSN-format + ITIN
keyword
Sensitive Information Types
527

6.6.2.2 PII SITs
Used in DLP PII alert policies and auto-labeling.
Sensitive Info Type Detection Method Notes
U.S. Social Security
Number (SSN)
Pattern + keyword Avoid Low confidence in
email
All Full Names NER model High false-positive rate in
isolation; pair with other
SITs
U.S. Driver's License
Number
State-specific patterns 50 distinct patterns
U.S. Individual Taxpayer
Identification Number
(ITIN)
Pattern + keyword Overlaps with SSN pattern
U.S. Physical Addresses NER model Useful for HR/benefits data
detection
6.6.2.3 Credential SITs
Used in the highest-priority DLP alert policies (AD Credential Protection).
Sensitive Info Type Detection Method Notes
General Password Pattern + keyword
proximity
Fires on "password:"
followed by a value
Azure Active Directory
Client Secret
Pattern Rotate immediately on
detection
Azure SAS Token Pattern
Software Development
Credentials
Pattern bundle npm tokens, API keys,
connection strings
6.6.3 The Credit Card False Positive Problem
Credit Card Number is the most common source of false positives. Purchase orders,
Securing Microsoft 365 in GCC High | 2026.04.30
528

invoices, and financial reports contain 16-digit numbers that match the Luhn
checksum but are not card numbers. Two mitigations:
1. Keyword Exclusion Dictionary
Create a custom keyword dictionary with terms that indicate a billing context rather
than a card number:
Invoice #
PO Number
Purchase Order
Account Number
Reference Number
Order ID
Quote Number
Configure the SIT tonot match when these terms appear within 300 characters of
the pattern. In the Purview portal: SITs → Credit Card Number → Edit → Add
exclusion keywords.
2. Confidence Level Gating
Do not trigger block actions at Low or Medium confidence for Credit Card. Use the
following tiered approach:
Confidence Action
High (85+) Alert + require justification
Medium (75–84) Policy tip only
Low (65–74) Audit log only, no user notification
6.6.4 Environment-Specific SITs
ENVIRONMENT: GCC HIGH (CMMC)
6.6.4.1 CUI-Specific Sensitive Information Types
CMMC Level 2 (NIST SP 800-171 Rev. 3 3.1.3, 3.13.1) requires identifying
and controlling CUI. The following SITs detect content that must be labeled
and protected as CUI.
Sensitive Information Types
529

Distribution Statement Keywords
Create a custom keyword SIT named CUI — Distribution Statement with
the following keyword groups:
Keyword Group Terms
Distribution Statement B Distribution Statement B, Dist S
tmt B, DISTRIBUTION B
Distribution Statement C Distribution Statement C, Dist S
tmt C, DISTRIBUTION C
Distribution Statement D Distribution Statement D, Dist S
tmt D, DISTRIBUTION D
Distribution Statement E Distribution Statement E, Dist S
tmt E, DISTRIBUTION E
Distribution Statement F Distribution Statement F, Dist S
tmt F, DISTRIBUTION F
Set minimum match count to 1 and confidence to High — Distribution
Statement text is unambiguous.
ITAR / EAR Export Control Keywords
Create a custom keyword SIT named CUI — Export Control:
Keyword Group Terms
ITAR ITAR, International Traffic in A
rms, 22 CFR 120, USML, Defense Art
icle
EAR EAR, Export Administration Regul
ations, 15 CFR 730, ECCN, Commerce
Control List
CUI Export Control CUI//EXPT, CUI//SP-EXPT
Securing Microsoft 365 in GCC High | 2026.04.30
530

DoD Contract Number Pattern
Create a custom regex SIT named CUI — DoD Contract Number:
\bW\d{2}[A-Z]\d{2}[A-Z\d]{6,10}\b
This matches DODAAC-based contract numbers in the formatW81XWH-2
2-C-0001. Pair with keyword proximity: Contract, Award, Task Order.
CUI Designation Indicator
Built-in SIT: U.S. Defense Contract Number — supplement with a custom
SIT that matches the CUI banner line format:
CUI//(SP-[\w]+)?
This catches the formal CUI designation block required by NARA 32 CFR
Part 2002.
All four CUI SITs should be bundled into a custom SIT group namedCUI
Bundle for use in a single auto-labeling policy rule.
ENVIRONMENT: COMMERCIAL
6.6.4.2 Regulatory SIT Groupings
For commercial organizations, SITs map to regulatory frameworks. Group
them as named SIT collections for use in DLP policies and auto-labeling.
GLBA Financial SIT Group
SIT Regulation
Credit Card Number PCI-DSS
U.S. Bank Account Number GLBA
Sensitive Information Types
531

SIT Regulation
SWIFT Code GLBA / wire fraud
IBAN GLBA / international
U.S. Individual Taxpayer Identification
Number
GLBA
HIPAA / HITECH SIT Group
Use the built-in U.S. Health Insurance Act SIT bundle, which includes:
• U.S. Social Security Number (SSN)
• Drug Enforcement Agency (DEA) Number
• National Drug Code
• All Full Names (paired with medical terms)
FERPA SIT Group (Higher Education)
FERPA does not have a prescribed SIT set. Build a custom keyword SIT
named Student PII with terms:
Student ID
EMPL ID
Grade Report
Transcript
Enrollment Status
Financial Aid
FAFSA
Pair with All Full Names or SSN at High confidence to reduce false positives
from general HR content.
PCI-DSS SIT Group
For retail or payment processors, bundle: Credit Card Number, CVV (custom
regex \b\d{3,4}\bwith keyword CVV, Security Code, CVC), and U.S. Bank
Account Number.
Securing Microsoft 365 in GCC High | 2026.04.30
532

6.6.5 Trainable Classifiers
Trainable classifiers use machine learning rather than pattern matching. They are
appropriate when content cannot be identified by a regex or keyword list — for
example, recognizing "intellectual property" from context.
6.6.5.1 Pre-Trained Classifiers
Microsoft provides several pre-trained classifiers ready for use in policies without
additional training:
Classifier Use Case
Source Code Detects code files across 25+ languages
Resumes Detects HR candidate data
Financial Statements Balance sheets, P&L statements
HR — Harassment Policy violation detection
Threat Threatening language
Profanity Policy enforcement
6.6.5.2 Custom Trainable Classifiers
When pre-trained classifiers do not match your content, create a custom classifier:
1. Seed phase — Upload 50–200 representative positive documents to a
SharePoint library designated as the seed site. Documents should be real
examples of the content category (e.g., NDAs, engineering change orders,
board resolutions).
2. Test phase — Purview presents 200 test documents; reviewers mark each
as positive or negative. Iterate until precision exceeds 70%.
3. Publish — The classifier becomes available in auto-labeling and DLP
conditions.
Custom classifiers take 24–48 hours to initially train. Retrain quarterly or when
precision drops below acceptable thresholds.
Sensitive Information Types
533

6.6.5.3 Classifier Limitations
• Trainable classifiers operate on text content only. Scanned PDFs, image-
only files, and CAD drawings require OCR preprocessing.
• The built-in OCR in Purview handles standard scanned documents but fails
on engineering CAD title blocks, which use non-standard fonts and
drawing frames.
6.6.6 OCR Limitation: Engineering CAD Drawings
Standard Purview OCR cannot reliably extract text from CAD title blocks because:
• Title block fonts (e.g., ISOCT, Romans) are not in OCR training sets
• Drawing frames and borders confuse layout analysis
• Multi-layer PDFs exported from AutoCAD or SolidWorks contain vector
text that OCR treats as graphics
6.6.6.1 Solution: Azure AI Document Intelligence
For organizations with large engineering document repositories, a Logic App
pipeline can fill this gap:
SharePoint (new PDF) → Logic App trigger
→ Azure AI Document Intelligence (custom model)
→ extracted title block fields (drawing number, revision, classificatio
n)
→ Purview REST API
→ Apply sensitivity label based on classification field value
Implementation steps:
1. Train an Azure AI Document Intelligence custom extraction model on
50+ title block samples using Document Intelligence Studio.
2. Map the extracted classificationfield to label GUIDs using a Logic
App variable or Azure Key Vault secret.
3. Call the Purview labeling REST API to apply the label to the file in
SharePoint.
4. Log the label action to a Log Analytics workspace for audit trail (satisfies
NIST SP 800-171 Rev. 3 3.3.1).
This architecture is separate from Purview's native auto-labeling pipeline and
requires an Azure AI Services resource in the same tenant region.
Securing Microsoft 365 in GCC High | 2026.04.30
534

6.7 Sensitivity Labels
Sensitivity labels are the foundation of Microsoft Purview's protection strategy.
Everything else — DLP policies, Insider Risk Management, Copilot governance —
depends on content being labeled. Labels must be designed before any other policy
is deployed.
6.7.1 Label Taxonomy
ENVIRONMENT: GCC HIGH (CMMC)
6.7.1.1 CUI-Aligned Label Hierarchy
CMMC Level 2 and NIST SP 800-171 Rev. 3 3.1.3 require organizations to
control the flow of CUI based on the CUI Registry categories. The label
hierarchy maps to the NARA CUI Framework:
Priority Label CUI
Mapping Scope Encryption
0 Public Not CUI Files, Email No
1 General Not CUI —
internal
operational
data
Files, Email,
Site, Group
No
2 CUI — Basic CUI Basic
(single-
category,
standard
safeguarding)
Files, Email,
Site, Group
Recommende
d
3 CUI —
Specified
CUI
Specified
(enhanced
safeguarding
required by
law)
Files, Email,
Site, Group
Required
Sensitivity Labels
535

CUI — Basic covers the majority of defense contractor CUI: technical data,
export control, procurement-sensitive, and privacy data subject to standard
NIST 800-171 safeguarding requirements.
CUI — Specified covers categories where the authorizing law requires
enhanced controls beyond NIST 800-171: ITAR technical data, Tax Return
information, legal privilege, and Personally Identifiable Information subject to
the Privacy Act.
The CUI Registry at archives.gov/cui is authoritative. Map your
specific data types to registry categories before finalizing label
names.
Content Marking — CUI Banner
NARA 32 CFR Part 2002 requires a CUI designation indicator and CUI
category markings on documents. Configure footer content marking:
CUI
For Specified categories, configure the footer as a dynamic marking using the
label name:
CUI//SP-EXPT   (ITAR / Export Control)
CUI//SP-PRVCY  (Privacy Act)
Encryption on CUI — Basic
NIST SP 800-171 Rev. 3 3.13.10 requires protecting CUI at rest and in transit.
For files stored outside GCC High (contractor systems, partner sharing),
encryption via Rights Management is the control:
• Assign Permissions Now: Grant Readand Changerights to the
tenant's authenticated users group. This ensures files remain readable
inside the tenant but cannot be opened by external parties without a
decryption ceremony.
• Do not expire: CUI documents may be retained for years; expiring
keys creates recovery support burden.
• Allow offline access for 7 days: Balances security with usability for
field personnel.
Encryption on CUI — Specified
Securing Microsoft 365 in GCC High | 2026.04.30
536

For CUI Specified, restrict decryption rights further:
• Assign permissions to a specific Entra security group (e.g., sg-cui-s
pecified-access) rather than all authenticated users.
• Disable offline access (Neveroffline access period).
• Enable content expiry only if the data has a defined retention period
(e.g., FOIA-exempt period).
ENVIRONMENT: COMMERCIAL
6.7.1.2 Regulatory-Aligned Label Hierarchy
For commercial organizations, labels map to data sensitivity tiers rather than
government classification categories:
Priority Label Scope Encryption Auto-
labeling
0 Public Files, Email No No
1 Internal Files, Email,
Site, Group
No Yes
2 Confidential Files, Email,
Site, Group
No Yes
3 Restricted Files, Email,
Site, Group
Yes No
Public — Data open to public inspection by law or released through public
channels. No controls required.
Internal — Operational content that originates within the organization and
may be shared externally when appropriate. Label is informational only; no
encryption or sharing restrictions. Applied automatically as a baseline for
unlabeled content.
Sensitivity Labels
537

Confidential — Content subject to regulatory requirements: GLBA, FERPA,
HIPAA, PCI-DSS. Applied automatically when financial or PII SITs are
detected at high confidence. No encryption by default (avoids user friction
during the Foundational deployment phase), but external sharing is alerted via
DLP.
Restricted — Content requiring the most stringent access controls: board
materials, M&A data, HR disciplinary records, credentials. Encryption
enabled with Assign Permissions Now. Not applied automatically —
requires intentional user action with a mandatory justification prompt.
User-Facing Descriptions
Write label descriptions for end users, not administrators. The description
appears in Office client tooltips:
Label User Description
Public Data that is publicly available or has
been approved for public release.
Internal For internal use. May be shared
externally when appropriate. No special
handling required.
Confidential Contains sensitive personal or financial
information subject to regulatory
requirements. Share only with
authorized parties.
Restricted Highly sensitive. External sharing not
permitted. Access from authorized
devices only.
6.7.2 Label Scopes: Encryption vs. Container
When creating a sensitivity label in Purview, you choose one or more scopes —
each scope applies the label to a different class of object. A single label can carry
multiple scopes simultaneously, which is why one label can both encrypt a file
Securing Microsoft 365 in GCC High | 2026.04.30
538

AND control the SharePoint site it lives in.
Scope What it protects What it configures
Files & emails (encryption
scope)
Individual documents,
emails, and PDFs
RMS encryption with
usage rights; offline access
window; co-author/reader
permissions; authentication
context requirements
Groups & sites (container
scope)
SharePoint sites, Teams,
Microsoft 365 Groups
External sharing settings;
unmanaged device access
restrictions; privacy
(public/private); default
share link permissions
Schematized data assets
(E5)
Azure SQL, Synapse, Data
Lake
Label propagation in
Purview Data Map for
structured data
Meetings (E5) Calendar events and
meeting invites
RMS encryption on
meeting content,
watermarking
6.7.2.1 The Critical Distinction
• Encryption scope protects the content. The file travels encrypted. If it's
exfiltrated, emailed externally, or copied to removable media, it remains
unreadable to anyone outside the authorized group.
• Container scope protects the location. The SharePoint site enforces
sharing and access policies on every file inside it — including files that
don't individually carry the label yet.
These complement each other rather than duplicate. A file with encryption scope is
safe regardless of where it travels. A site with container scope blocks unmanaged
device access to every file in the site, not just labeled ones.
6.7.2.2 Recommended Configuration for CUI Labels
Encryption scope (Files & emails):
Sensitivity Labels
539

Setting Recommended Value Why
Encrypt files and emails On RMS encryption is the non-
negotiable file-level control
Assign permissions now Yes Policy-enforced, not user-
chosen
Users or groups Specific CUI handler group
(e.g., AVD-Enclave-FCI-U
sers)
Scopes decryption rights to
authorized users only
Permissions Co-Author (read, modify,
print — no full control)
Co-Author prevents users
from modifying label
permissions themselves
User access expires Never (or per retention
policy)
Prevents lockout on older
documents
Allow offline access 3–7 days Short window limits risk of
offline decryption of
exfiltrated files
Container scope (Groups & sites):
Setting Recommended Value Why
External sharing Only people in your
organization
Prevents accidental
external sharing at the site
level
Access from unmanaged
devices
Block access (or Web-
only)
Forces managed devices
for CUI site access,
independent of any CA
policy
Default share link Specific people Prevents "Anyone with the
link" from being the
default
Privacy Private CUI sites should not be
Securing Microsoft 365 in GCC High | 2026.04.30
540

Setting Recommended Value Why
discoverable via search
ENABLING CONTAINER SUPPORT REQUIRES A ONE-TIME TENANT
CONFIGURATION
Before container labels take effect, you must enable sensitivity labels for
Microsoft 365 Groups and SharePoint sites at the tenant level. See the
Container Labels section for the PowerShell commands. This is a one-time
step per tenant — not per label.
6.7.3 Label Sync Timing
Sensitivity labels are created and published in Purview, but the Azure Rights
Management (RMS) service maintains its own copy of the label configuration for
encryption operations. These two copies sync automatically on a schedule —
typically every few hours — which means a label you just created or modified may
not be immediately available for RMS encryption, decryption, or Microsoft 365
Groups container labeling.
This delay is a common source of confusion. Clients create a label, publish it,
immediately try to apply it to a test document, and see it fail to encrypt or decrypt
— concluding that something is misconfigured. In most cases, the label simply
hasn't propagated yet.
To force an immediate sync:
Import-Module ExchangeOnlineManagement
Connect-IPPSSession
Sensitivity Labels
541

Execute-AzureAdLabelSync
THIS IS A ONE-TIME SYNC, NOT A CONTINUOUS ONE
Execute-AzureAdLabelSynctriggers a single sync pass — it pulls the
current label configuration from Purview to the RMS service. It does not
establish an ongoing sync. Labels will continue to sync automatically on
the default schedule, but any new label changes require either waiting for
the next automatic sync or re-running this command.
Run this command after:
• Creating a new sensitivity label
• Modifying encryption settings on an existing label
• Modifying the published label policy
• Applying a container label to M365 Groups and SharePoint sites
(see Container Labels)
• Any time you need to skip the automatic sync delay during testing
or initial deployment
MAKING LABEL DEPLOYMENT DETERMINISTIC
Running Execute-AzureAdLabelSyncafter every label configuration
change eliminates the "is it broken or is it still syncing?" ambiguity during
deployment and testing. Build it into your label creation procedure so you
and the client know the sync has completed before moving to the next step.
6.7.4 Policy-First Design
Before creating labels in the Purview portal, document the label policy decisions:
Question Decision Needed
How many labels? More labels = more user confusion. Limit
to 3–5 published labels.
Default label for new files? Typically Internalor General— not Pu
Securing Microsoft 365 in GCC High | 2026.04.30
542

Question Decision Needed
blic.
Default label for email? Typically the same or one level lower than
files.
Mandatory labeling? Yes — required for regulated
environments.
Justification on downgrade? Yes — critical for audit trail. Pair with
downgrade reporting script.
User ability to remove labels? Allow with justification; track in Activity
Explorer.
6.7.5 Incremental Rollout to a Test Group
Deploying sensitivity labels — especially with mandatory labeling and encryption
— changes how users save files, send email, and access documents. A direct-to-
production rollout risks user frustration, helpdesk flood, and workflow breakage.
Use a three-phase rollout to surface issues before they affect the full user
population.
Key concept: The label itself is tenant-wide once created, but visibility and
enforcement are controlled by the label policy. You can create a label, publish it
only to a test group, and the rest of the tenant sees nothing. This makes staged
rollouts straightforward.
6.7.5.1 Phase 1 — Create but don't publish (1 week)
1. Create the label in Purview with the target configuration (encryption scope,
container scope, permissions, offline access window)
2. Do not publish it — without a label policy, the label is invisible to end
users
3. Validate the label configuration using a test account with Compliance Adm
inistratoror Information Protection Administratorrole — these
roles see all labels regardless of policy
4. Run Execute-AzureAdLabelSyncto force immediate sync to RMS
5. Apply the label to a test file, encrypt/decrypt, verify permissions behave as
expected
This phase catches configuration errors (wrong permission group, overly restrictive
Sensitivity Labels
543

settings, missed offline access) before any end user is affected.
6.7.5.2 Phase 2 — Publish to a test group (1–2 weeks)
1. Create a label policy named Label Policy - Test(or similar) and
publish it to a security group — e.g., EID_Sensitivity_Label_Test_Use
rs— containing 5–10 representative users
2. Enable mandatory labeling and justification on downgrade in the test
policy — the test should reflect real production behavior, not a softer test
configuration
3. Set the default label to match the production plan
4. Let test users work normally for 1–2 weeks — creating documents, sharing,
collaborating, attempting external sends
What to monitor in Activity Explorer:
• Label application events — are users applying the intended labels?
• Label downgrade events — are users justifying downgrades appropriately?
• DLP rule matches — are protected documents triggering expected DLP
policies?
• User notifications and policy tips — are users seeing and responding to
them?
Criteria to advance to Phase 3:
• No unresolved label-related helpdesk tickets in the past 7 days
• Mandatory labeling is applying without breaking user workflows
• Encryption is working across Office apps, Outlook, SharePoint, and mobile
clients
• External sharing behavior matches expectations
6.7.5.3 Phase 3 — Expand to the broader population
Once the test group operates cleanly:
Approach How When to use
Expand the existing test
policy
Edit Label Policy - Tes
tand add the broader
group (or All Users) to
the publish scope
Fastest — no new policy to
maintain. Use if the test
policy settings match
production requirements
exactly.
Securing Microsoft 365 in GCC High | 2026.04.30
544

Approach How When to use
Create a production
policy
Create Label Policy - P
roductionwith the target
scope, then retire the test
policy
Preferred for larger
deployments — keeps the
test policy available for
future label changes,
allows different default
labels or mandatory
settings between test and
production populations
LABEL POLICIES ARE HOW YOU SCOPE EXPOSURE, NOT LABELS
THEMSELVES
A label is created once and exists tenant-wide. Multiple label policies can
publish the same label to different groups with different defaults,
mandatory settings, and justification requirements. This lets you roll out the
same label progressively across departments or regions without creating
duplicate labels.
DON'T SKIP MANDATORY LABELING IN THE TEST PHASE
If the test group runs without mandatory labeling but production will have
it on, you're testing a different configuration than you'll deploy. Users will
hit the mandatory labeling prompt for the first time when the policy
expands — creating a wave of confusion at exactly the wrong moment.
Test with the real settings.
6.7.6 Auto-Labeling
Auto-labeling applies labels based on SIT detection without user involvement. Two
modes operate independently:
Client-side auto-labeling — runs in Office apps while the user is editing. Shows a
notification bar recommending or applying the label. Requires the Office client to
be policy-aware (M365 Apps for Enterprise, not Office LTSC).
Sensitivity Labels
545

Service-side auto-labeling — runs in the Purview backend on existing content in
Exchange, SharePoint, and OneDrive. Applies labels to already-stored files without
user involvement. Operates as a simulation first; review results before enabling
enforcement.
6.7.6.1 Auto-Labeling Policy Design
Label Trigger SITs Confidence Mode
Internal / General No SITs — applied
to all unlabeled
Office files
N/A Default label policy
Confidential / CUI
— Basic
Financial SIT
group or PII SIT
group
High Auto-apply
CUI — Specified
(GCC High)
CUI Bundle
(Distribution
Statements, ITAR/
EAR, DoD
Contract)
High Auto-apply
Restricted No SIT trigger —
user-applied only
N/A Recommend only
SERVICE-SIDE SIMULATION
Always run service-side auto-labeling in Simulation mode for at least 7
days before enabling enforcement. Review the simulation report in the
Purview portal to identify false positives before labels are written to
production files.
6.7.7 Container Labels
Container labels apply to Microsoft Teams, SharePoint sites, and Microsoft 365
Groups. They do not encrypt files — they control site-level settings.
Prerequisites — Container labels require a one-time setup:
# Enable MIP labels for M365 Groups in Entra
Securing Microsoft 365 in GCC High | 2026.04.30
546

Install-Module Microsoft.Graph.Beta -Scope CurrentUser
Connect-MgGraph -Scopes "Directory.ReadWrite.All"
$template = Get-MgBetaDirectorySettingTemplate | Where-Object { $_.DisplayNam
e -eq "Group.Unified" }
$settingParams = @{
TemplateId = $template.Id
Values = @(@{ Name = "EnableMIPLabels"; Value = "True" })
}
New-MgBetaDirectorySetting -BodyParameter $settingParams
# Sync labels from Purview to Entra
Import-Module ExchangeOnlineManagement
Connect-IPPSSession
Execute-AzureAdLabelSync
Container Label Settings
Label External Sharing Default Share
Link
Unmanaged
Device Access
Public Allowed (Anyone) Anyone with the
link
Full access
Internal / General Authenticated
guests only
Specific people Full access
Confidential / CUI
— Basic
Existing guests
only
Specific people Web-only (read)
Restricted / CUI —
Specified
No external sharing Specific people Blocked
6.7.8 Mandatory Labeling and Justification
Enable mandatory labeling in the label policy to require users to select a label
before saving or sending. In the label policy settings:
• Require users to apply a label: On
• Require users to provide justification to remove a label or lower its
classification: On
• Provide users with a link to a custom help page: Link to your
organization's data classification policy
Justification text is captured in the Unified Audit Log under the SensitivityLabe
lUpdatedoperation and is surfaced in Activity Explorer.
Sensitivity Labels
547

6.7.9 Label Downgrade Reporting
The following PowerShell script queries the Unified Audit Log for label downgrade
and removal events in the past 7 days and emails a formatted HTML report.
# Connect to Security & Compliance
Connect-IPPSSession
# Build label ID-to-name lookup
$LabelLookup = @{}
Get-Label | Select-Object ImmutableId, DisplayName | ForEach-Object {
if ($_.ImmutableId) {
$LabelLookup[$_.ImmutableId.ToString()] = $_.DisplayName
}
}
# Query audit log — downgrades and removals only
$EndDate = Get-Date
$StartDate = $EndDate.AddDays(-7)
$Events = Search-UnifiedAuditLog `
-StartDate $StartDate -EndDate $EndDate `
-Operations "SensitivityLabelUpdated","FileSensitivityLabelChanged","Sens
itivityLabelRemoved","FileSensitivityLabelRemoved" `
-ResultSize 5000
$Report = @()
foreach ($EventObj in $Events) {
$Data = $EventObj.AuditData | ConvertFrom-Json
# LabelEventType: 1=Upgrade, 2=Downgrade, 3=Remove
if ($Data.SensitivityLabelEventData.LabelEventType -in 2, 3) {
$ActionType = if ($Data.SensitivityLabelEventData.LabelEventType -eq
3) { "Removed" } else { "Downgraded" }
$OldLabel = if ($LabelLookup.ContainsKey("$($Data.SourceLabel)")) {
$LabelLookup["$($Data.SourceLabel)"] } else { $Data.SourceLabel }
$NewLabel = if ($Data.SensitivityLabelEventData.LabelEventType -eq 3)
{ "(Removed)" }
elseif ($LabelLookup.ContainsKey("$($Data.DestinationLabe
l)")) { $LabelLookup["$($Data.DestinationLabel)"] }
else { $Data.DestinationLabel }
$Report += [PSCustomObject]@{
Time          = $EventObj.CreationDate
User          = $EventObj.UserIds
Action        = $ActionType
File          = $Data.ObjectId
OldLabel      = $OldLabel
NewLabel      = $NewLabel
Justification = $Data.SensitivityLabelJustificationText
}
}
}
if ($Report.Count -gt 0) {
$Report | Export-Csv -Path ".\LabelDowngrades_$(Get-Date -Format 'yyyy-M
M-dd').csv" -NoTypeInformation -Encoding UTF8
Write-Host "$($Report.Count) downgrade/removal events exported." -Foregro
undColor Yellow
} else {
Write-Host "No downgrade events found in the past 7 days." -ForegroundCol
or Green
Securing Microsoft 365 in GCC High | 2026.04.30
548

}
Schedule this script to run weekly via a Logic App or Azure Automation runbook
and send results to your security team. Retain the CSV output as audit evidence for
compliance assessments (satisfies NIST SP 800-171 Rev. 3 3.3.2 audit record
review requirements).
6.8 Data Loss Prevention
DLP policies enforce the decisions that labels represent. A file labeled Confidential
or Restricted (or CUI — Basic / CUI — Specified in GCC High) should be
blocked from leaving via unauthorized channels — DLP is what does the blocking.
Policies operate across Exchange, SharePoint, OneDrive, Teams, and Endpoint
(Windows devices).
6.8.1 Policy Priority and Execution Order
Purview evaluates DLP policies in priority order, lowest number first. When a
policy match triggers, evaluation continues unless the policy includes a Stop
processing more policies rule. Assign priorities deliberately:
Priority Range Category
0–3 Credential protection — highest risk,
always enforce
4–8 Restricted / CUI-Specified — encrypt,
block, alert
9–14 Confidential / CUI-Basic — alert and
policy tip
15–20 PII / Finance SIT-based alerts
21–25 Internal label alerts
26+ Endpoint controls and policy tips
6.8.2 Credential Protection
Credentials (passwords, API keys, connection strings) shared externally represent
an immediate breach risk. These policies operate independently of sensitivity labels.
Data Loss Prevention
549

Priority Policy Workload Rollout Action
0 Exchange —
AD Credential
Alert
Exchange Test group →
All users
Alert + block
send
1 OneDrive —
AD Credential
Alert
OneDrive Test group →
All users
Alert + restrict
access
2 SharePoint —
AD Credential
Alert
SharePoint Simulation →
Enforced
tenant-wide
Alert + restrict
access
3 Teams — AD
Credential
Alert
Teams Test group →
All users
Alert only
Rule condition: Content contains SIT→ General Password OR Software
Development Credentials OR Azure Active Directory Client Secret
Rule action (Exchange): Block the email from being sent; notify the user with a
policy tip explaining why.
Rule action (OneDrive/SharePoint): Remove external sharing links; notify the
site owner.
ROLLOUT METHOD DEPENDS ON WHETHER THE WORKLOAD
SUPPORTS USER/GROUP SCOPING
Exchange, OneDrive, and Teams DLP all support scoping a policy to a user
or group of senders — deploy Enforced to a small test group, observe real
friction, then expand. Test-group enforcement produces real user behavior
data (override rates, policy-tip responses, helpdesk volume) that simulation
mode cannot.
SharePoint DLP is the exception. SharePoint policies are site-scoped, not
user-scoped — there is no way to enforce a SharePoint DLP policy against
a subset of users. Use Simulation mode tenant-wide for 30 days to build
a false-positive baseline without user impact, tune the policy, then promote
to Enforced. This is the only Purview workload where simulation is the
primary rollout mechanism rather than a last resort.
Securing Microsoft 365 in GCC High | 2026.04.30
550

6.8.3 Restricted / CUI — External Sharing Alerts
Any external sharing of content at the highest classification tier should generate an
alert and, optionally, block the action.
Priority Policy Workload Action
4 Exchange —
Restricted External
Sharing Alert
Exchange Alert + override
with justification
5 OneDrive —
Restricted External
Sharing Alert
OneDrive Alert + restrict
access
6 SharePoint —
Restricted External
Sharing Alert
SharePoint Alert + restrict
access
Rule condition: Content is labeled→ Restricted (or CUI — Specified in
GCC High) AND Content is shared→ With people outside the organization
Rule action: Generate an incident report to the compliance team; notify the user;
require override justification.
ENVIRONMENT: GCC HIGH (CMMC)
6.8.3.1 CUI Authorized Transfer Controls
NIST SP 800-171 Rev. 3 3.1.3 requires controlling CUI flow to external
parties. DLP's Allowed Domains feature restricts CUI sharing to pre-
approved partner tenants, even if your tenant's general external sharing
settings would otherwise permit it.
Configuring Allowed Domains for CUI
In the DLP rule for CUI — Basic or CUI — Specified external sharing:
1. Set the action to Block external sharing.
2. Add an exception: Recipient domain is one of → list the approved
Data Loss Prevention
551

partner GCC High tenant domains (e.g., partner.onmicrosoft.us).
3. Require justification for any override — captured in the audit log.
This creates an allowlist: CUI can be sent to prime-contractor.onmicroso
ft.usbut blocked to gmail.com, hotmail.com, and any unknown tenant.
CMMC Control Mapping
NIST Control DLP Enforcement
3.1.3 — Control CUI flow Allowed Domains exception list on
CUI policies
3.13.1 — Monitor communications Alert on all external CUI sharing
3.13.8 — Implement cryptographic
mechanisms
Encryption enforced by label; DLP
blocks unencrypted external send
3.3.1 — Audit log Incident reports to compliance mailbox
ENVIRONMENT: COMMERCIAL
6.8.3.2 Sector-Specific External Sharing Controls
For commercial organizations, tailor the external sharing block by regulatory
context.
GLBA / Financial Services
Block external sharing of Financial SIT content to non-business domains. Add
exceptions for known external auditors, regulators (SEC, FDIC), and
accounting firms by domain.
HIPAA / Healthcare
HIPAA requires authorization before sharing PHI externally. Configure the
DLP rule with Block and require justification + manager approval using the
Securing Microsoft 365 in GCC High | 2026.04.30
552

Require business justification override option. Log all overrides to a
dedicated audit mailbox.
FERPA / Higher Education
FERPA prohibits disclosing student PII without consent. Block Student PII
SIT matches from Exchange to any external domain. Exception: configured
partner institutions in dual-enrollment or transfer agreements.
6.8.4 Confidential / CUI-Basic — External Sharing
Alerts
Content at the Confidential tier requires alerting but not automatic blocking during
initial deployment (Foundational phase). Escalate to blocking in the Managed phase
once false-positive rates are understood.
Priority Policy Workload Action
7 Exchange —
Confidential Label
External Sharing
Alert
Exchange Alert
8 OneDrive —
Confidential Label
External Sharing
Alert
OneDrive Alert
9 SharePoint —
Confidential Label
External Sharing
Alert
SharePoint Alert
6.8.5 Copilot — Sensitive Label Enforcement
Microsoft 365 Copilot respects sensitivity labels when summarizing or referencing
content. This DLP policy prevents Copilot from surfacing labeled content to users
who lack access permissions — a prerequisite before deploying Copilot in any
Data Loss Prevention
553

regulated environment.
Priority Policy Workload Action
10 Copilot Chat —
Sensitive Label
Enforcement
Microsoft 365
Copilot and Copilot
Chat
Block
Rule condition: Content is labeled→ Confidential OR Restricted (OR CUI
— Basic / CUI — Specified in GCC High)
Rule action: Block Copilot from accessing, processing, or referencing the content.
DEPLOY COPILOT DLP BEFORE COPILOT
This policy must be deployed and verified before Microsoft 365 Copilot is
enabled for any user. Without it, Copilot will summarize sensitive content
for any user with Copilot access regardless of label.
6.8.6 PII SITs — External Sharing Alerts
These policies detect content containing PII SITs at the point of sharing and
generate security team alerts.
Priority Policy Workload Confidence
11 Exchange — PII
External Sharing
Alert
Exchange High + Medium
12 SharePoint — PII
External Sharing
Alert
SharePoint High + Medium
13 OneDrive — PII
External Sharing
Alert
OneDrive High + Medium
Rule design (two rules per policy):
Securing Microsoft 365 in GCC High | 2026.04.30
554

• High Confidence rule: PII SIT group at High confidence+ Shared
externally→ Alert with High severity
• Medium Confidence rule: PII SIT group at Medium confidence+ S
hared externally→ Alert with Medium severity
Separate rules prevent High severity alerts from being suppressed when Medium
confidence matches dominate.
6.8.7 Finance SITs — External Sharing Alerts
Priority Policy Workload Confidence
14 Exchange —
Finance External
Sharing Alert
Exchange High + Medium
15 OneDrive —
Finance External
Sharing Alert
OneDrive High + Medium
16 SharePoint —
Finance External
Sharing Alert
SharePoint High + Medium
6.8.8 Internal Label — External Sharing Alerts
Low-priority audit trail for content labeled Internal that is shared externally. These
alerts are informational — Internal does not restrict sharing, but the alert provides a
baseline for anomaly detection.
Priority Policy Workload Action
17 OneDrive —
Internal Label
External Sharing
Alert
OneDrive Alert (Low
severity)
18 Exchange —
Internal Label
External Sharing
Alert
Exchange Alert (Low
severity)
Data Loss Prevention
555

Priority Policy Workload Action
19 SharePoint —
Internal Label
External Sharing
Alert
SharePoint Alert (Low
severity)
6.8.9 Endpoint DLP
Endpoint DLP extends policy enforcement to Windows device actions: USB copy,
Bluetooth transfer, browser upload, print, and RDP clipboard paste.
Priority Policy Workload Action
20 Endpoint — Block
External Cloud
Uploads
Devices (Intune-
enrolled)
Block
21 Endpoint — Block
USB Copy of
Sensitive Files
Devices (Intune-
enrolled)
Block
Endpoint — Block External Cloud Uploads
• Condition: Content is labeled→ Confidential OR Restricted
• Action: Block upload to unapproved cloud storage (list approved services
— SharePoint, OneDrive, approved line-of-business apps)
• User notification: Policy tip explaining the block; link to approved transfer
method
Endpoint — Block USB Copy
• Condition: Content is labeled→ Confidential OR Restricted
• Action: Block copy to removable media; audit log entry
• Override: Require justification (written to Unified Audit Log)
ENVIRONMENT: GCC HIGH (CMMC)
CMMC Endpoint Requirements
Securing Microsoft 365 in GCC High | 2026.04.30
556

NIST SP 800-171 Rev. 3 3.8.7 prohibits the use of removable media unless
approved and limited to documented needs. Endpoint DLP implements this
control technically:
• Block USB copy for all CUI-labeled content with no override option
• Block Bluetooth transfer for CUI content
• Block print of CUI content on non-organizationally-owned printers
(use Printer groupsto define approved printers)
• Block RDP clipboard paste of CUI content to non-corporate remote
sessions
Configure Printer Groups in Endpoint DLP settings to define corporate-
approved print destinations. CUI — Specified policies should use Block alw
ays(no override); CUI — Basic may use Block with overrideduring
transition.
ENVIRONMENT: COMMERCIAL
Commercial Endpoint Controls
For commercial organizations, USB and cloud upload controls apply to
Restricted content. For Confidential content, use Override with justification
rather than hard block during the initial deployment phase — this reduces help
desk calls while still building an audit trail.
Set Block with overrideon USB copy for Confidential, and escalate to Bl
ock alwaysfor Restricted. Review endpoint DLP alerts weekly for the first
90 days to calibrate.
6.8.10 Policy Tips
Policy tips deliver just-in-time education at the point of risk — when the user is
sending an email or uploading a file. They reduce false positives by allowing users
to self-serve corrections before a DLP violation is logged.
Data Loss Prevention
557

6.8.10.1 PII Policy Tips
Policy Workload Trigger
Exchange — Policy Tip —
PII
Exchange PII SIT at any confidence
OR Confidential label
detected in outbound email
OneDrive — Policy Tip —
PII
OneDrive PII SIT or Confidential
label on a file being shared
externally
SharePoint — Policy Tip
— PII
SharePoint Same as OneDrive
Tip message example:
"This message appears to contain personal information (names, SSNs, or
financial account numbers). Before sending, confirm the recipient is
authorized to receive this data and that it is protected per your
organization's data handling policy."
6.8.10.2 Finance Policy Tips
Policy Workload Trigger
Exchange — Policy Tip —
Finance
Exchange Finance SIT at any
confidence OR
Confidential label
OneDrive — Policy Tip —
Finance
OneDrive Finance SIT or
Confidential label on
shared file
SharePoint — Policy Tip
— Finance
SharePoint Same as OneDrive
6.8.10.3 Email CC List Warning
A lightweight policy tip that displays a banner on outbound messages with a large
CC list — a common vector for accidental data disclosure.
Securing Microsoft 365 in GCC High | 2026.04.30
558

Policy Workload Trigger Action
Exchange — CC
List Warning
Exchange CC recipient count
> 10
Display policy tip;
allow send
This policy has no SIT condition — it fires on recipient count alone. It does not
block sending; it prompts the user to verify the CC list is intentional.
6.8.11 Alert Tuning
After initial deployment, tune DLP alerts weekly:
1. Review the DLP Alerts dashboard in the Microsoft Purview compliance
portal.
2. For each false-positive alert category, identify the SIT or label condition
causing the match.
3. Adjust confidence level thresholds, add keyword exclusions, or scope the
policy to exclude known-safe sites or distribution groups.
4. Document tuning decisions in your DLP policy change log — this record
serves as audit evidence for compliance assessments.
6.9 Incident Response & Insider Risk
DLP policies generate alerts when data crosses a policy boundary. Insider Risk
Management (IRM) operates differently — it correlates behavioral signals over
time to identify users whose pattern of activity poses risk, even when no individual
action crosses a DLP threshold. The two systems complement each other: DLP
stops transactions, IRM stops actors.
6.9.1 Activity Explorer
Activity Explorer is the first stop in any label-related incident investigation. It
provides a timeline of labeling and DLP actions across Exchange, SharePoint,
OneDrive, and Endpoint:
• Sensitivity label applied — who applied what label to which file
• Sensitivity label changed — includes the from-label, to-label, and
justification text
• Sensitivity label removed — with justification if mandatory labeling is
enabled
Incident Response & Insider Risk
559

• DLP policy matched — which rule triggered, which workload, override or
no override
• File uploaded to cloud — endpoint DLP events for cloud upload attempts
• File copied to USB — endpoint events for removable media
Accessing Activity Explorer:
Purview compliance portal → Data classification → Activity explorer
Filter by Label activity→ Label downgradedor Label removedto identify
mass downgrade events. Filter by user to build a timeline for a specific insider risk
investigation.
6.9.1.1 Investigating a Mass Downgrade Event
If IRM or a DLP alert surfaces a mass downgrade pattern:
1. Filter Activity Explorer: Activity= Sensitivity label changed, Labe
l action= Downgrade, Date range= past 7 days, User= suspect user
2. Export to CSV for offline analysis
3. Cross-reference with file download events in the same period (SharePoint
audit log)
4. Cross-reference with email send events from Exchange (Unified Audit
Log)
If the user downloaded files after downgrading labels, this is a strong indicator of
intentional exfiltration and should be escalated per your incident response plan.
6.9.2 Insider Risk Management
6.9.2.1 Policy Configuration
IRM policies correlate signals from Purview labels, DLP events, HR system
offboarding feeds, and Entra ID sign-in anomalies into a risk score per user.
Setting Value
Policy template Data theft by departing users / Data leaks
Content to prioritize Sensitivity labels — Confidential,
Restricted (or CUI equivalents)
Securing Microsoft 365 in GCC High | 2026.04.30
560

Setting Value
Scoring Get alerts for all activity above threshold
Triggering event User performs an exfiltration activity
Triggering threshold Custom (see below)
6.9.2.2 Triggering Events
The IRM policy activates risk scoring for a user when any of the following occur:
• Sends email with attachments to recipients outside the organization
• Sends email with attachments to free public email domains (gmail.com,
yahoo.com, etc.)
• Sends email with attachments to their own personal email address
• Uses a browser to upload files to the web (Endpoint DLP signal required)
• File copied to a remote desktop session
• Sensitivity label downgraded or removed, then file downloaded, then
exfiltrated
The last trigger — the Downgrade-Download-Exfiltrate sequence — is the
highest-fidelity signal for intentional insider theft and should always be included.
6.9.2.3 Policy Indicators
Category Indicator
Label activity Downgrading sensitivity labels on files
Label activity Removing sensitivity labels from files
Label activity Removing sensitivity labels from
SharePoint sites
Cloud activity Unusual mass downloading from a cloud
app
Cloud activity Unusual mass sharing from a cloud app
Endpoint activity File copy to USB (if Endpoint DLP is
configured)
Incident Response & Insider Risk
561

Category Indicator
Endpoint activity Browser upload to unapproved cloud
storage
6.9.2.4 Detection Sequences
Enable all three cumulative detection sequences:
Sequence Description
Download → Exfiltrate Large-scale download from M365, then
external send
Downgrade/Remove → Exfiltrate Label stripped to evade DLP, then external
send
Downgrade/Remove → Download →
Exfiltrate
Full bypass pattern: strip label, download
locally, exfiltrate
6.9.2.5 Cumulative Exfiltration and Boosters
Setting Value
Cumulative exfiltration Detect when volume exceeds
organizational norms
Booster — Daily volume Activity is above the user's typical daily
volume
Booster — Unusual recipient Email sent to a domain not previously
used by the user
Boosters increase the risk score for an individual event without requiring a separate
policy match. They are additive — a downgrade event with a daily-volume booster
and an unusual-recipient booster generates a much higher score than a downgrade
alone.
Securing Microsoft 365 in GCC High | 2026.04.30
562

6.9.2.6 Adaptive Protection
ENVIRONMENT: GCC HIGH (CMMC)
Adaptive Protection dynamically applies a DLP action based on a user's
current IRM risk level. This directly supports NIST SP 800-171 Rev. 3 3.13.3
(separate user functionality from system management functions based on
risk).
IRM Risk Level Adaptive DLP Action
Minor Policy tip added to all external sends
Moderate Override-with-justification required for
all external sends
Elevated Block all external sharing; alert
compliance team
Enable Adaptive Protection under IRM → Adaptive Protection → link to
DLP policies. The linked DLP policy must have a condition Adaptive prote
ction risk level iswith separate rules for each tier.
CMMC Control Mapping
NIST Control IRM Capability
3.1.3 — Control CUI flow Adaptive Protection blocks external
CUI access for high-risk users
3.3.1 — Create audit logs All IRM alerts and risk score events
written to Unified Audit Log
3.3.2 — Review audit logs Activity Explorer enables investigation
of label downgrade timelines
3.6.1 — Incident response plan IRM alert → case → investigation
workflow
3.14.2 — Security monitoring IRM cumulative exfiltration detection
Incident Response & Insider Risk
563

ENVIRONMENT: COMMERCIAL
Adaptive Protection is valuable for commercial organizations with GLBA,
HIPAA, or PCI requirements, where a high-risk user (flagged by IRM) should
face stronger DLP controls without IT manual intervention.
A practical commercial configuration:
IRM Risk Level Adaptive DLP Action
Minor Policy tip on Confidential label
external sends
Moderate Block Confidential label external
sends; require justification
Elevated Block all external sends; notify CISO
Start with Adaptive Protection in Test mode for 30 days to calibrate false
positive rates before enabling enforcement. Users whose risk score spikes due
to a legitimate high-volume file migration (e.g., SharePoint restructure) should
be excluded via an IRM policy exception during the migration window.
6.9.3 HR Connector — Offboarding Trigger
IRM can use departure date from HR as a triggering event — activating a
departing user policy before the user's last day, not after.
Configure an HR data connector in the Purview compliance portal:
1. Data connectors → HR connector
2. Map CSV columns: EmailAddress, ResignationDate, TerminationDat
e, LastWorkingDay
3. Schedule daily import via Azure Logic App or scheduled task
Once the connector is active, any user whose ResignationDateis within 30 days
will automatically be enrolled in the departing-user IRM policy. Risk scoring
begins immediately — not on the last day.
Securing Microsoft 365 in GCC High | 2026.04.30
564

6.9.4 DSPM for AI Readiness
Data Security Posture Management (DSPM) for AI provides visibility into how AI
tools (Microsoft 365 Copilot, Copilot Chat) interact with labeled content. It answers
the question: "What sensitive data can Copilot reach, and for whom?"
Key DSPM for AI views:
View What It Shows
Oversharing summary Files labeled Confidential or above shared
with broad permissions (org-wide,
Anyone)
AI interactions with sensitive data Copilot prompts that referenced
Confidential or Restricted content
Users with access to labeled content Which users can reach restricted or
sensitive files through Copilot
Why labeling today prevents Copilot risk tomorrow:
Copilot cannot summarize or retrieve content that the user does not have access to.
But if content is unlabeled and stored in a broadly accessible SharePoint site,
Copilot will summarize it for any licensed Copilot user with SharePoint access —
regardless of whether the content is sensitive.
The DSPM for AI report surfaces exactly this exposure: unlabeled sensitive content
in broadly-shared locations. Labeling that content, combined with the Copilot DLP
policy (see DLP Policies), closes the gap before Copilot is deployed.
Pre-Copilot Checklist:
1. Run DSPM for AI in discovery mode
2. Remediate overshared sites (remove "Everyone" and "Everyone except
external users" sharing permissions)
3. Apply appropriate sensitivity labels to unlabeled sensitive content
identified by service-side auto-labeling
4. Confirm Copilot DLP policy is enabled and verified
5. Review DSPM for AI weekly for the first 60 days after Copilot launch
Incident Response & Insider Risk
565

6.9.5 Incident Response Workflow
When a DLP alert or IRM case is generated, follow this workflow:
Alert generated (DLP violation or IRM high risk score)
↓
Triage in Purview Alerts or IRM Cases
↓
Open Activity Explorer — build user timeline
↓
Pull SharePoint/Exchange audit log for file/email evidence
↓
Determine: false positive or confirmed incident?
↓ (confirmed)
Open IRM Case → assign investigator
↓
Collect evidence package (Activity Explorer export + audit log CSV)
↓
Notify HR, Legal, and Security per incident response plan
↓
Apply Adaptive Protection elevated restriction if not already triggered
↓
Close case with disposition (no action / warning / HR action / law enforcemen
t)
↓
Document in incident response log (NIST 3.6.2 audit evidence)
Purview IRM cases include a built-in evidence collection feature —Forensic
evidence — that captures screen recordings on managed Windows devices for
confirmed high-risk users (requires additional licensing). Enable this capability only
after legal review, as it may be subject to employee privacy agreements.
6.10 Information Protection Scanner
Cloud-native auto-labeling covers Exchange, SharePoint Online, and OneDrive.
Content stored on on-premises file shares, NAS devices, and local SharePoint
Server requires the Microsoft Purview Information Protection Scanner — a
Windows service that connects to your on-premises repositories and applies labels
using the same SIT-based rules configured in the Purview portal.
6.10.1 Architecture
The scanner consists of two components:
Component Role
Scanner node Windows Server running the AIP Unified
Securing Microsoft 365 in GCC High | 2026.04.30
566

Component Role
Labeling client; connects to file shares via
SMB or SharePoint Server via HTTPS
SQL Server database Stores scanner job configuration, scan
results, and per-file label status
The scanner node authenticates to the Purview service using an Entra service
principal (app registration). It reads files, evaluates SIT conditions, and either
reports matches (discovery mode) or writes labels to the files (enforcement mode).
On-premises network:
File share (\\server\share) ──SMB──▶ Scanner node (Windows Server)
SharePoint Server ──HTTPS──▶ Scanner node
Scanner node ──HTTPS──▶ Purview compliance portal (label policies)
Scanner node ──SQL──▶ SQL Server (scan results database)
6.10.2 Sizing the Scanner Node
Scanner throughput depends on CPU, RAM, and network bandwidth to the file
share. Use these guidelines:
File Repository Size Scanner Node Sizing SQL Server
< 1 million files 4 vCPU, 8 GB RAM SQL Express (free, 10 GB
limit)
1–10 million files 8 vCPU, 16 GB RAM SQL Server Standard or
Developer
> 10 million files 16 vCPU, 32 GB RAM;
consider multiple scanner
nodes
SQL Server Standard with
dedicated instance
SQL Express limitations: The free SQL Express edition has a 10 GB database size
limit. For large environments, SQL Express will fill up before the scan completes,
halting the job. Use SQL Server Standard or SQL Server Developer (free for non-
production) for any repository exceeding ~2 million files.
Network bandwidth: The scanner reads file content across the network. Budget 1
Gbps network connectivity between the scanner node and the file share for
Information Protection Scanner
567

production workloads. Scanning over a WAN link to remote offices will be slow —
deploy a scanner node at each remote office instead.
6.10.3 Installation
# On the scanner node — install the AIP Unified Labeling client
# Download from Microsoft Download Center
Install-AIPScanner -SqlServerInstance "SQL01\SCANNER" -Profile "OnPremScan"
# Authenticate the scanner to Entra (run once)
Set-AIPAuthentication `
-AppId "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" `
-AppSecret "your-client-secret" `
-TenantId "yourtenant.onmicrosoft.com" `
-DelegatedUser "scanneraccount@yourtenant.onmicrosoft.com"
# Add a repository to scan
Add-AIPScannerRepository -Path "\\fileserver01\shares\engineering"
Add-AIPScannerRepository -Path "\\fileserver01\shares\finance"
The DelegatedUseraccount requires:
• Read access to all repositories being scanned
• Azure Information Protection Scannerlicense (included in M365
E3/E5 and AIP P1/P2)
• A Purview sensitivity label policy published to the account
6.10.4 Discovery Mode vs. Enforcement Mode
The scanner operates in two modes, controlled by the content scan job settings in
the Purview portal or via PowerShell.
6.10.4.1 Discovery Mode (Recommend)
Scans files and generates a report of what was found — which files match which
SITs, how many files would be labeled — without writing any labels to files. Use
this mode first.
Set-AIPScannerConfiguration -ReportLevel Info -JustificationMessage "" -Sched
ule OneTime
Start-AIPScan
When to use: Initial assessment of on-premises data before committing to
enforcement. Run discovery for at least one full scan cycle before enabling
enforcement.
Output: Report files in %localappdata%\Microsoft\MSIP\Scanner\Reports\
Securing Microsoft 365 in GCC High | 2026.04.30
568

— CSV files listing every file scanned, the matching SITs, the confidence level,
and the recommended label.
6.10.4.2 Enforcement Mode (Auto-label)
Writes sensitivity labels to files in place. The Office property msip_labelsis set in
the file's metadata. Files labeled in enforcement mode will be recognized by Office
apps and the Purview DLP engine immediately.
Set-AIPScannerConfiguration -ReportLevel Debug -Enforce On
Start-AIPScan
TEST ON A SUBSET FIRST
Before enabling enforcement on a full repository, scope the scan to a test
folder with representative file types. Verify that Office files are labeled
correctly and that non-Office files (PDFs, images) are handled as expected.
Some applications may reject files whose metadata has been modified by
the scanner.
Files the scanner can label:
File Type Label Written to Notes
Word, Excel, PowerPoint
(.docx, .xlsx, .pptx)
Office property metadata Full label support
PDF PDF metadata Requires Acrobat or PDF
labeling extension
Text files (.txt, .csv, .xml) File metadata (alternate
data stream on NTFS)
No visual marking
Images, CAD, executables Discovery only Cannot write labels
6.10.5 Extracting Scan Results from SQL
The scanner stores all scan results in the SQL database. The Purview portal does not
expose a complete per-file report for on-premises scans — you must query the SQL
database directly.
Information Protection Scanner
569

-- Summary: files by recommended label
SELECT
RecommendedLabel,
COUNT(*) AS FileCount,
SUM(FileSize) / 1048576 AS TotalSizeMB
FROM dbo.ScannerFiles
WHERE RecommendedLabel IS NOT NULL
GROUP BY RecommendedLabel
ORDER BY FileCount DESC;
-- Detail: files matching a specific SIT
SELECT
RepositoryPath,
FileName,
MatchedSIT,
ConfidenceLevel,
RecommendedLabel,
CurrentLabel,
LastModifiedDate
FROM dbo.ScannerFiles
WHERE MatchedSIT LIKE '%Social Security%'
OR MatchedSIT LIKE '%Credit Card%'
ORDER BY LastModifiedDate DESC;
-- Files labeled in enforcement mode
SELECT
RepositoryPath,
FileName,
CurrentLabel,
LabelSetDate,
LabelSetBy
FROM dbo.ScannerFiles
WHERE LabelSetDate IS NOT NULL
ORDER BY LabelSetDate DESC;
Export results to CSV for audit evidence:
Invoke-Sqlcmd -ServerInstance "SQL01\SCANNER" -Database "AIPScanner" -Query
@"
SELECT RepositoryPath, FileName, MatchedSIT, ConfidenceLevel, Recommended
Label, CurrentLabel
FROM dbo.ScannerFiles
WHERE RecommendedLabel IS NOT NULL
"@ | Export-Csv -Path ".\ScannerResults_$(Get-Date -Format 'yyyy-MM-dd').csv"
-NoTypeInformation
Securing Microsoft 365 in GCC High | 2026.04.30
570

6.10.6 Environment-Specific Considerations
ENVIRONMENT: GCC HIGH (CMMC)
6.10.6.1 On-Premises CUI Discovery for CMMC
NIST SP 800-171 Rev. 3 3.1.22 requires organizations to control CUI posted
or processed on publicly accessible systems. More broadly, 3.14.1 requires
identifying CUI "at rest" in all storage locations — including on-premises file
servers.
The scanner fulfills this requirement by:
1. Discovery scan — generates a per-file report identifying which files
contain CUI indicators (Distribution Statement keywords, ITAR/EAR
keywords, DoD contract numbers)
2. Enforcement scan — applies the CUI — Basic or CUI — Specified
label to identified files, making them subject to DLP policies even
when accessed via the on-premises network
Air-Gapped Networks
If the scanner node cannot reach the Purview compliance portal (air-gapped or
classified networks), configure the scanner in offline mode:
Set-AIPScannerConfiguration -OnlineConfiguration Off
Import-AIPScannerConfiguration -FileName "C:\ScannerConfig\policy.msip"
Export the scanner policy from the portal and deliver it to the air-gapped node
via approved transfer media. Labels applied in offline mode are consistent
with cloud policy — they will be recognized by any Office app with the same
label policy deployed.
CMMC Control Mapping
NIST Control Scanner Capability
3.1.22 — CUI on public-facing systems Discovery mode identifies CUI in file
shares before any internet exposure
Information Protection Scanner
571

NIST Control Scanner Capability
3.3.1 — Audit records SQL scan results provide a
timestamped record of all files and their
label status
3.14.1 — Identify CUI at rest Full-repository discovery scan with
per-file SIT match report
3.4.1 — Baseline configurations Labeled files are subject to DLP
endpoint controls
ENVIRONMENT: COMMERCIAL
6.10.6.2 On-Premises Discovery for Commercial Organizations
For commercial organizations with on-premises file servers (common in
manufacturing, healthcare, and legal), the scanner provides the asset inventory
function that Content Explorer provides for cloud content.
Initial Assessment Workflow
1. Run discovery mode across all file shares
2. Export SQL results to identify:
◦ File shares with the highest density of financial / PII SIT
matches
◦ File shares with no labeled content (highest risk)
◦ File types that cannot be labeled (CAD, legacy formats) —
flag for manual review
3. Prioritize enforcement on the highest-density locations first
4. Schedule quarterly re-scans to catch newly deposited sensitive content
HIPAA / Healthcare
For healthcare organizations, run discovery with the HIPAA SIT bundle
enabled. The scan results provide the data inventory required by HIPAA
Security Rule §164.308(a)(1)(ii)(A) (Risk Analysis — identifying locations of
ePHI).
Securing Microsoft 365 in GCC High | 2026.04.30
572

GLBA / Financial Services
Run annual discovery scans and export SQL results as evidence for GLBA
Safeguards Rule information inventory requirements.
6.10.7 Scheduling and Maintenance
Configure the scanner to run on a schedule in the Purview portal (Information
protection → Scanner → Scan jobs):
Schedule Use Case
One-time Initial discovery or enforcement run
Daily Active repositories with frequent file
changes
Weekly Archival or low-activity repositories
Continuous High-value repositories requiring near-
real-time labeling
Continuous mode re-queues files for re-scan as soon as they are modified. Use this
for repositories where new sensitive content is deposited frequently (e.g., contracts
intake folders, engineering submittals).
Monitor scanner health via the Windows Event Log on the scanner node (Applicat
ionlog, source Azure Information Protection Scanner) and via the scanner
status report in the Purview portal.
6.11 CAB Runbook: Sensitivity Labels
and DLP Policies
This runbook supports a Change Advisory Board (CAB) submission for deploying a
sensitivity label taxonomy and foundational Data Loss Prevention (DLP) policies in
Microsoft Purview. Complete the bracketed fields before submitting to your CAB.
CAB Runbook: Sensitivity Labels and DLP Policies
573

6.11.1 Change Summary
Field Value
Change Title Deploy Microsoft Purview Sensitivity
Label Taxonomy and Foundational DLP
Policies
Change Type Standard — New Capability
Risk Level Medium
Estimated Downtime None — configuration changes only; no
service interruption expected
Rollback Available Yes — labels and policies can be disabled
or deleted within minutes
Implementation Window [Insert maintenance window date/time and
duration]
Implementer [Insert name, title]
Backup Implementer [Insert name, title]
CAB Sponsor [Insert name, title]
Ticket / Change ID [Insert change management ticket number]
6.11.2 Business Justification
ENVIRONMENT: GCC HIGH (CMMC)
CMMC Level 2 requires that Controlled Unclassified Information (CUI) be
identified, marked, and protected from unauthorized disclosure. This change
implements the technical controls required by:
• NIST SP 800-171 Rev. 2 3.1.3 — Control the flow of CUI in
accordance with approved authorizations
• NIST SP 800-171 Rev. 2 3.13.1 — Monitor, control, and protect
communications at external boundaries
Securing Microsoft 365 in GCC High | 2026.04.30
574

• NIST SP 800-171 Rev. 2 3.13.16 — Protect the confidentiality of
CUI at rest
Without sensitivity labels, the organization cannot consistently identify CUI
across Microsoft 365, and DLP policies cannot enforce information flow
controls against unlabeled content. This change is the prerequisite for all
subsequent Purview-based compliance controls.
ENVIRONMENT: COMMERCIAL
This change implements data classification and loss prevention controls
required to meet regulatory obligations and reduce the risk of unauthorized
disclosure of sensitive business information. Applicable frameworks include:
• NIST SP 800-171 Rev. 3 3.1.3 — Control the flow of CUI in
accordance with approved authorizations
• HIPAA 45 CFR § 164.312(e) — Encryption and integrity controls
for ePHI in transit
• GLBA Safeguards Rule 16 CFR Part 314 — Implement safeguards
to control access to customer financial data
Without a deployed label taxonomy, DLP policies cannot reliably identify
sensitive content at the point of sharing. This change is the prerequisite for all
subsequent information protection controls.
6.11.3 Scope of Change
6.11.3.1 In Scope — Phase A: Sensitivity Labels
1. Enable MIP container labels for Microsoft 365 Groups in Entra ID (one-
time PowerShell command — no user-facing impact)
2. Create four sensitivity labels in the Microsoft Purview compliance portal
CAB Runbook: Sensitivity Labels and DLP Policies
575

ENVIRONMENT: GCC HIGH (CMMC)
Label CUI Mapping Encryption Container
Support
Public Not CUI No No
General Not CUI —
internal
operational data
No Yes
CUI — Basic CUI Basic
(standard
safeguarding)
Recommended Yes
CUI — Specified CUI Specified
(enhanced
safeguarding)
Required Yes
ENVIRONMENT: COMMERCIAL
Label Sensitivity Tier Encryption Container
Support
Public Publicly available
data
No No
Internal Internal
operational data
No Yes
Confidential Regulated content
(PII, financial)
No Yes
Restricted Board-level / HR
/ credentials
Yes Yes
3. Publish a label policy targeting all users with the following settings:
◦ Default label for files and emails: General (or Internal)
Securing Microsoft 365 in GCC High | 2026.04.30
576

◦ Mandatory labeling: On — users must select a label before saving
or sending
◦ Justification required on downgrade or removal: On
6.11.3.2 In Scope — Phase B: Foundational DLP Policies
Ten DLP policies deployed across Exchange, SharePoint, OneDrive, and Teams:
Priority Policy Name Workload Initial
Rollout Action
0 Exchange —
Credential
Alert
Exchange Enforced, test
group → All
users
Block send +
alert
1 OneDrive —
Credential
Alert
OneDrive Enforced, test
group → All
users
Block access +
alert
2 SharePoint —
Credential
Alert
SharePoint Simulation
tenant-wide →
Enforced
Block access +
alert
3 Teams —
Credential
Alert
Teams Enforced, test
group → All
users
Alert only
4 Exchange —
CUI Specified
/ Confidential
Label External
Sharing
Exchange Enforced, test
group → All
users
Alert +
override with
justification
5 OneDrive —
CUI Specified
/ Confidential
Label External
Sharing
OneDrive Enforced, test
group → All
users
Block access +
alert
6 SharePoint —
CUI Specified
/ Confidential
Label External
Sharing
SharePoint Enforced
tenant-wide
(label-based
condition is
deterministic)
Block access +
alert
7 Exchange — Exchange Enforced, test Alert
CAB Runbook: Sensitivity Labels and DLP Policies
577

Priority Policy Name Workload Initial
Rollout Action
Confidential
Label External
Sharing
group → All
users
8 OneDrive —
Confidential
Label External
Sharing
OneDrive Enforced, test
group → All
users
Alert
9 SharePoint —
Confidential
Label External
Sharing
SharePoint Enforced
tenant-wide
(label-based
condition is
deterministic)
Alert
Rollout pattern. Exchange, OneDrive, and Teams DLP support user/group scoping
— deploy Enforced to the documented test group, observe real friction (override
rates, helpdesk volume, alert count), then expand to All users. SharePoint DLP is
site-scoped rather than user-scoped, so test-group enforcement is not available. For
SharePoint policies with SIT-based conditions (Priority 2, Credential Alert), use
Simulation mode tenant-wide for 30 days to baseline false positives before
promoting to Enforced. For SharePoint policies with label-based conditions
(Priorities 6 and 9), the condition is deterministic — a file either carries the label or
does not — and simulation is unnecessary; deploy Enforced from the start.
6.11.3.3 Out of Scope — Reserved for Phase 2 Submission
The following capabilities are excluded from this change and will be addressed in a
subsequent CAB submission:
• Endpoint DLP (USB copy, cloud upload, print, RDP clipboard controls)
• Microsoft 365 Copilot label enforcement
• Client-side and service-side auto-labeling policies
• Insider Risk Management integration
• PII and Finance SIT-based detection policies
6.11.4 Prerequisites
All prerequisites must be verified before the implementation window opens.
Securing Microsoft 365 in GCC High | 2026.04.30
578

# Prerequisite Verified By Notes
1 Microsoft Purview
compliance portal
access — Global
Administrator or
Compliance
Administrator role
[Name] Required to create
labels and policies
2 Exchange Online
Administrator role
[Name] Required for IPPS
session during
container label sync
3 Microsoft Entra ID
P1 or P2 license for
at least one admin
account
[Name] Required for
container label
enablement
4 Microsoft 365 E3/
E5 or equivalent
licenses for all in-
scope users
[Name] Sensitivity labels
require M365 Apps
for Enterprise; DLP
requires E3
minimum
5 No existing
conflicting label
policies in the
tenant
[Name] Check in Purview
portal →
Information
Protection → Label
policies
6 Approved list of
partner/external
domains authorized
to receive CUI or
sensitive content
[Name] Required for Phase
B DLP Allowed
Domains
configuration
7 Security team
distribution group
or mailbox for DLP
incident reports —
substitute the
client's real address
everywhere the
runbook shows [YO
UR_DLP_ALERT_EM
AIL]
[Name] Client-provided.
Must be an active,
monitored mailbox
or group before
Phase B begins.
CAB Runbook: Sensitivity Labels and DLP Policies
579

# Prerequisite Verified By Notes
8 Change freeze
status confirmed —
no competing
changes to
Exchange transport
rules or mail flow
during window
[Name] Avoid overlapping
with mail flow
configuration
changes
9 SharePoint Admin
Center —
unmanaged device
access set to Allow
limited, web-only
access
[Name] Required for
sensitivity label
container controls
to restrict
unmanaged device
access. See
SharePoint Admin
Center —
Unmanaged Device
Access
6.11.5 Implementation Plan
Estimated total implementation time: 90–120 minutes for a tenant with no pre-
existing label configuration.
6.11.5.1 Phase A: Sensitivity Labels (~45 minutes)
Step A-1: Enable container labels in Entra ID (~10 minutes)
1. Open PowerShell as an account with Global Administrator or Entra roles.
2. Run the following commands:
# Install required modules if not present
Install-Module Microsoft.Graph.Beta -Scope CurrentUser -Force
Install-Module ExchangeOnlineManagement -Scope CurrentUser -Force
# Enable MIP labels for M365 Groups
Connect-MgGraph -Scopes "Directory.ReadWrite.All"
$template = Get-MgBetaDirectorySettingTemplate | Where-Object { $_.DisplayNam
e -eq "Group.Unified" }
$settingParams = @{
TemplateId = $template.Id
Values = @(@{ Name = "EnableMIPLabels"; Value = "True" })
}
New-MgBetaDirectorySetting -BodyParameter $settingParams
# Sync labels from Purview to Entra
Securing Microsoft 365 in GCC High | 2026.04.30
580

Connect-IPPSSession
Execute-AzureAdLabelSync
Disconnect-ExchangeOnline
3. Verify: In Entra ID → Groups → Settings, confirm EnableMIPLabels =
True.
Step A-2: Create sensitivity labels (~20 minutes)
Navigate to Microsoft Purview compliance portal → Information Protection →
Labels → + Create a label. Create labels in order from least to most sensitive —
label priority is determined by creation order.
The table below lists every setting in wizard order. Fill in each row as you step
through the wizard.
ENVIRONMENT: GCC HIGH (CMMC)
Setting Public General CUI —
Basic
CUI —
Specified
Name Public General CUI - Basic CUI - Speci
fied
Display
name
Public General CUI — Basic CUI — Speci
fied
Description
for users
Data approv
ed for publ
ic release.
Internal op
erational d
ata. No spe
cial handli
ng require
d.
Controlled
Unclassifie
d Informati
on. Standar
d NIST 80
0-171 safeg
uarding req
uired.
Controlled
Unclassifie
d Informati
on. Enhance
d safeguard
ing require
d. Confiden
tial distri
bution.
Label color Green Blue Yellow Red
Scope —
Files & other
data assets
On On On On
CAB Runbook: Sensitivity Labels and DLP Policies
581

Setting Public General CUI —
Basic
CUI —
Specified
Scope —
Emails
On On On On
Scope —
Meetings
Off Off Off Off
Scope —
Groups &
sites
Off On On On
Control
access
Off Off On On
Apply
content
marking
Off On On On
Assign
permissions
now or let
users decide
— — Assign
permissions
now
Assign
permissions
now
User access
to content
expires
— — Never Never
Allow offline
access
— — 30 days 7 days
Assigned
users or
groups
— — All Employe
es(or tenant
authenticated
users group)
Confidential
group — e.g.,
sg-cui-spec
ified-acces
s
Permissions — — Co-Author Co-Author
Footer text — General CUI — Basic CUI — Speci
fied
Auto- Off Off Off Off
Securing Microsoft 365 in GCC High | 2026.04.30
582

Setting Public General CUI —
Basic
CUI —
Specified
labeling for
files and
emails
Privacy and
external user
access (check
this
protection
setting)
— On On On
External
sharing and
Conditional
Access (check
this
protection
setting)
— On On On
Private
teams
discoverabili
ty and
shared
channel
settings
(check this
protection
setting)
— Off Off Off
Auto apply
settings
— None None None
Privacy — Public or
Private
Private Private
Let group
owners add
people
outside the
organization
— On Off Off
CAB Runbook: Sensitivity Labels and DLP Policies
583

Setting Public General CUI —
Basic
CUI —
Specified
as guests
External
sharing —
Content can
be shared
with
— Anyone Existing
guests
Only people
in your
organization
Access from
unmanaged
devices
— Full access Allow
limited, web-
only access
Block access
ENVIRONMENT: COMMERCIAL
Setting Public Internal Confidential Restricted
Name Public Internal Confidentia
l
Restricted
Display
name
Public Internal Confidentia
l
Restricted
Description
for users
Data that i
s publicly
available o
r has been
approved fo
r public re
lease.
For interna
l use. May
be shared e
xternally w
hen appropr
iate. No sp
ecial handl
ing require
d.
Contains se
nsitive per
sonal or fi
nancial inf
ormation su
bject to re
gulatory re
quirements.
Share only
with author
ized partie
s.
Highly sens
itive. Exte
rnal sharin
g not permi
tted. Acces
s from auth
orized devi
ces only.
Label color Green Blue Yellow Red
Securing Microsoft 365 in GCC High | 2026.04.30
584

Setting Public Internal Confidential Restricted
Scope —
Files & other
data assets
On On On On
Scope —
Emails
On On On On
Scope —
Meetings
Off Off Off Off
Scope —
Groups &
sites
Off On On On
Control
access
Off Off Off On
Apply
content
marking
Off On On On
Assign
permissions
now or let
users decide
— — — Assign
permissions
now
User access
to content
expires
— — — Never
Allow offline
access
— — — Never
Assigned
users or
groups
— — — EID_Sensiti
vity_Labe
l_Restricte
d
Permissions — — — Co-Author
Footer text — Internal Confidentia
l
Restricted
CAB Runbook: Sensitivity Labels and DLP Policies
585

Setting Public Internal Confidential Restricted
Auto-
labeling for
files and
emails
Off Off Off Off
Privacy and
external user
access (check
this
protection
setting)
— On On On
External
sharing and
Conditional
Access (check
this
protection
setting)
— On On On
Private
teams
discoverabili
ty and
shared
channel
settings
(check this
protection
setting)
— Off Off Off
Auto apply
settings
— None None None
Privacy — Public Private Private
Let group
owners add
people
outside the
organization
as guests
— On Off Off
Securing Microsoft 365 in GCC High | 2026.04.30
586

Setting Public Internal Confidential Restricted
External
sharing —
Content can
be shared
with
— Anyone Existing
guests
Only people
in your
organization
Access from
unmanaged
devices
— Full access Allow
limited, web-
only access
Block access
CREATE THE RESTRICTED GROUP BEFORE THIS STEP
EID_Sensitivity_Label_Restrictedmust be a Microsoft 365
Group. Create it in the Microsoft 365 admin center
(admin.microsoft.com → Teams & groups → Active teams & groups)
before running this wizard. Microsoft 365 Groups cannot be created
in the Entra ID portal or the Intune portal.
Repeat the wizard for each of the four labels. After all labels are created, run the
post-creation sync before proceeding to Step A-3:
Import-Module ExchangeOnlineManagement
Connect-IPPSSession
Execute-AzureAdLabelSync
This forces the new labels to sync from Purview to the Azure RMS service and to
Entra ID for container label application. Without this sync, labels may not be
immediately available for encryption operations or for application to SharePoint
sites. SeeLabel Sync Timingfor the full explanation.
ENVIRONMENT: GCC HIGH (CMMC)
Verification: All four labels should appear in the Information Protection →
CAB Runbook: Sensitivity Labels and DLP Policies
587

Labels list with correct priority order (Public = 0, General = 1, CUI — Basic
= 2, CUI — Specified = 3). Each label should show a green checkmark
indicating successful creation.
ENVIRONMENT: COMMERCIAL
Verification: All four labels should appear in the Information Protection →
Labels list with correct priority order (Public = 0, Internal = 1, Confidential =
2, Restricted = 3). Each label should show a green checkmark indicating
successful creation.
Step A-3: Publish label policy (~15 minutes)
1. Navigate to Information Protection → Label policies → Publish labels.
2. Select all four labels.
3. Assign to: All users and groups (or a pilot group if a phased rollout is
preferred — see Risk Register).
4. Configure policy settings:
◦ Require justification for label removal or downgrade: On
◦ Require users to apply a label to their emails and documents: On
◦ Require users to apply a label to their Fabric and Power BI content:
On
◦ Provide a help link: [Insert link to internal data classification
policy]
5. Set default labels:
◦ Default label for documents: General (or Internal)
◦ Default label for emails: General (or Internal)
6. Name the policy: [ORG] — Standard Label Policy v1.0
LABEL PROPAGATION
Sensitivity labels appear in Office clients (Word, Excel, Outlook) within 24
hours of policy publication. Plan the communication timeline accordingly.
Securing Microsoft 365 in GCC High | 2026.04.30
588

Step A-4: Enable co-authoring for encrypted files (~5 minutes) — Microsoft
Docs
Without this setting, users on Office desktop apps must check out encrypted labeled
files before editing, blocking real-time collaboration. Enabling it allows multiple
users to edit encrypted files simultaneously and enables AutoSave for those files.
THIS SETTING IS EFFECTIVELY IRREVERSIBLE
Once enabled, this setting cannot be turned off from the Purview portal.
Disabling it requires PowerShell and will cause labeling metadata to be lost
from any unencrypted Word, Excel, and PowerPoint files that were labeled
while the setting was active. Enable only after confirming no scripts,
Exchange mail flow rules, or third-party tools in your environment read
sensitivity label metadata from the old custom document properties
location. Standard Microsoft 365 services (DLP policies, auto-labeling,
Defender for Cloud Apps) all support the new metadata format and require
no changes.
1. Navigate to Microsoft Purview portal → Settings → Solution settings →
Information Protection → Co-authoring for files with sensitivity labels.
2. Read the prerequisites and summary displayed on the page.
3. Select Turn on co-authoring for files with sensitivity labels → Apply.
4. Wait 24 hours before relying on co-authoring for encrypted documents.
6.11.5.2 Phase B: Foundational DLP Policies (~45–75 minutes)
Step B-1: Verify the security alert mailbox
Before creating policies, confirm that the security team mailbox or distribution
group that will receive DLP incident reports is active and monitored: [YOUR_DLP_A
LERT_EMAIL]
There is no separate global setting for this in the DLP portal. The recipient is
configured within the Incident reports rows of each policy table in B-2 and B-3
below.
Step B-2: Create credential alert policies (Priorities 0–3)
For each policy: DLP → Policies → Create policy → Custom → Custom policy
→ full directory scope → single rule.
CAB Runbook: Sensitivity Labels and DLP Policies
589

Setting Exchange
(P0)
OneDrive
(P1)
SharePoint
(P2) Teams (P3)
Policy name Exchange — C
redential Al
ert
OneDrive — C
redential Al
ert
SharePoint —
Credential A
lert
Teams — Cred
ential Alert
Locations Exchange
email
OneDrive
accounts
SharePoint
sites
Teams chat
and channel
messages
Included
users/groups
EID_Sensitiv
ity_Label_Te
st_Users—
expand to All
after validation
← same Not supported
— SharePoint
scopes by site
URL, not by
user/group
EID_Sensitiv
ity_Label_Te
st_Users—
expand to All
after validation
Condition —
Sensitive info
type
All credentials
(bundled SIT
— covers
passwords,
API keys,
tokens, and
secrets)
← same ← same ← same
Action Block the
email; notify
the user
Restrict access
or encrypt the
content →
Block
everyone
except the
content owner,
last modifier,
and site admin
Restrict access
or encrypt the
content →
Block
everyone
except the
content owner,
last modifier,
and site admin
Alert only
User
notifications
On On On Off
Incident
reports —
Admin alert
On On On On
Incident
reports —
Recipients
[YOUR_DLP_AL
ERT_EMAIL]
← same ← same ← same
Incident Every rule ← same ← same ← same
Securing Microsoft 365 in GCC High | 2026.04.30
590

Setting Exchange
(P0)
OneDrive
(P1)
SharePoint
(P2) Teams (P3)
reports —
Alert
frequency
match
Alert severity High High High Medium
Policy mode Enforced (test
group) →
Enforced (All)
Enforced (test
group) →
Enforced (All)
Simulation
tenant-wide —
promote to
Enforced after
reviewing alert
log
Enforced (test
group) →
Enforced (All)
Step B-3: Create label-based external sharing policies (Priorities 4–9)
For each policy: DLP → Policies → Create policy → Custom → Custom policy
→ full directory scope → single rule.
ENVIRONMENT: GCC HIGH (CMMC)
Sensitive label policies (Priorities 4–6)
Setting Exchange (P4) OneDrive (P5) SharePoint (P6)
Policy name Exchange — CUI
Specified Labe
l External Sha
ring
OneDrive — CUI
Specified Labe
l External Sha
ring
SharePoint — C
UI Specified L
abel External
Sharing
Locations Exchange email OneDrive
accounts
SharePoint sites
Included users/
groups
EID_Sensitivit
y_Label_Test_U
sers— expand
to All after
validation
← same Not supported —
deploying
Enforced across
all sites; false
positive risk is
low given the
CAB Runbook: Sensitivity Labels and DLP Policies
591

Setting Exchange (P4) OneDrive (P5) SharePoint (P6)
tight condition
(labeled content +
shared externally)
Condition —
Content is
labeled
CUI — Specified ← same ← same
Condition —
Content is
shared
With people
outside the
organization
← same ← same
Exceptions →
Recipient
domain is
Required — list
approved GCC
High partner
domains (added in
the Exceptions
section of the
rule, not within
the Content is
shared condition)
← same ← same
Action Alert + require
override
justification
Restrict access or
encrypt the
content → Block
everyone except
the content
owner, last
modifier, and site
admin
Restrict access or
encrypt the
content → Block
everyone except
the content
owner, last
modifier, and site
admin
User
notifications
On On On
Incident reports
— Admin alert
On On On
Incident reports
— Recipients
[YOUR_DLP_ALER
T_EMAIL]
← same ← same
Incident reports
— Alert
Every rule match ← same ← same
Securing Microsoft 365 in GCC High | 2026.04.30
592

Setting Exchange (P4) OneDrive (P5) SharePoint (P6)
frequency
Alert severity High High High
Policy mode Enforced Enforced Enforced
Confidential label policies (Priorities 7–9)
Setting Exchange (P7) OneDrive (P8) SharePoint (P9)
Policy name Exchange — Con
fidential Labe
l External Sha
ring
OneDrive — Con
fidential Labe
l External Sha
ring
SharePoint — C
onfidential La
bel External S
haring
Locations Exchange email OneDrive
accounts
SharePoint sites
Included users/
groups
EID_Sensitivit
y_Label_Test_U
sers— expand
to All after
validation
← same Not supported —
deploying
Enforced across
all sites; alert-
only action means
false positives
have no user
impact
Condition —
Content is
labeled
CUI — Basic ← same ← same
Condition —
Content is
shared
With people
outside the
organization
← same ← same
Exceptions →
Recipient
domain is
Required — list
approved GCC
High partner
domains (added in
the Exceptions
← same ← same
CAB Runbook: Sensitivity Labels and DLP Policies
593

Setting Exchange (P7) OneDrive (P8) SharePoint (P9)
section of the
rule, not within
the Content is
shared condition)
Action Alert only Alert only Alert only
User
notifications
On On On
Incident reports
— Admin alert
On On On
Incident reports
— Recipients
[YOUR_DLP_ALER
T_EMAIL]
← same ← same
Incident reports
— Alert
frequency
Every rule match ← same ← same
Alert severity Medium Medium Medium
Policy mode Enforced Enforced Enforced
ENVIRONMENT: COMMERCIAL
Restricted label policies (Priorities 4–6)
Setting Exchange (P4) OneDrive (P5) SharePoint (P6)
Policy name Exchange — Con
fidential Labe
l External Sha
ring
OneDrive — Con
fidential Labe
l External Sha
ring
SharePoint — C
onfidential La
bel External S
haring
Locations Exchange email OneDrive
accounts
SharePoint sites
Securing Microsoft 365 in GCC High | 2026.04.30
594

Setting Exchange (P4) OneDrive (P5) SharePoint (P6)
Included users/
groups
EID_Sensitivit
y_Label_Test_U
sers— expand
to All after
validation
← same Not supported —
deploying
Enforced across
all sites; false
positive risk is
low given the
tight condition
(labeled content +
shared externally)
Condition —
Content is
labeled
Restricted ← same ← same
Condition —
Content is
shared
With people
outside the
organization
← same ← same
Exceptions →
Recipient
domain is
Optional — list
approved
regulatory
recipients
(auditors,
regulators, law
firms), added in
the Exceptions
section of the rule
← same ← same
Action Alert + require
override
justification
Restrict access or
encrypt the
content → Block
everyone except
the content
owner, last
modifier, and site
admin
Restrict access or
encrypt the
content → Block
everyone except
the content
owner, last
modifier, and site
admin
User
notifications
On On On
Incident reports
— Admin alert
On On On
CAB Runbook: Sensitivity Labels and DLP Policies
595

Setting Exchange (P4) OneDrive (P5) SharePoint (P6)
Incident reports
— Recipients
[YOUR_DLP_ALER
T_EMAIL]
← same ← same
Incident reports
— Alert
frequency
Every rule match ← same ← same
Alert severity High High High
Policy mode Enforced Enforced Enforced
Confidential label policies (Priorities 7–9)
Setting Exchange (P7) OneDrive (P8) SharePoint (P9)
Policy name Exchange — Con
fidential Labe
l External Sha
ring
OneDrive — Con
fidential Labe
l External Sha
ring
SharePoint — C
onfidential La
bel External S
haring
Locations Exchange email OneDrive
accounts
SharePoint sites
Included users/
groups
EID_Sensitivit
y_Label_Test_U
sers— expand
to All after
validation
← same Not supported —
deploying
Enforced across
all sites; alert-
only action means
false positives
have no user
impact
Condition —
Content is
labeled
Confidential ← same ← same
Condition —
Content is
shared
With people
outside the
organization
← same ← same
Securing Microsoft 365 in GCC High | 2026.04.30
596

Setting Exchange (P7) OneDrive (P8) SharePoint (P9)
Exceptions →
Recipient
domain is
Optional ← same ← same
Action Alert only Alert only Alert only
User
notifications
On On On
Incident reports
— Admin alert
On On On
Incident reports
— Recipients
[YOUR_DLP_ALER
T_EMAIL]
← same ← same
Incident reports
— Alert
frequency
Every rule match ← same ← same
Alert severity Medium Medium Medium
Policy mode Enforced Enforced Enforced
Step B-4: Verify policy priority order
1. Navigate to DLP → Policies.
2. Confirm policies are ordered 0 through 9 as specified. Adjust priority
manually if the portal has assigned different numbers.
6.11.6 Validation Plan
Complete all validation steps before closing the change ticket. Document pass/fail
for each item.
# Test Expected Result Validated By
V-1 Send an email
containing a
Exchange —
Credential Alert
[Name]
CAB Runbook: Sensitivity Labels and DLP Policies
597

# Test Expected Result Validated By
plaintext password
to an external
address
triggers; email is
blocked; user
receives policy tip
V-2 Upload a file
containing a test
credential string to
OneDrive and share
externally
OneDrive —
Credential Alert
triggers; external
sharing link is
removed
[Name]
V-3 Create a new Word
document; attempt
to save without
applying a label
Mandatory labeling
prompt appears;
document cannot
be saved until a
label is selected
[Name]
V-4 Apply the highest
sensitivity label to a
test file; share
externally via
SharePoint
SharePoint —
Sensitive Label
External Sharing
policy triggers;
alert generated to
security mailbox
[Name]
V-5 From a test-group
member, post a
message in a Teams
channel containing
a test credential
string
Teams —
Credential Alert
triggers; alert
generated to
security mailbox;
sender sees policy
tip
[Name]
V-6 Downgrade a
labeled document
from the highest
sensitivity label to
Public
Justification prompt
appears; downgrade
is recorded in
Activity Explorer
and Unified Audit
Log
[Name]
V-7 Verify labels
appear in Office
clients (Word,
Outlook) for a test
user account
Labels visible in
the sensitivity label
picker with correct
display names and
tooltips
[Name]
V-8 Open Activity All test events [Name]
Securing Microsoft 365 in GCC High | 2026.04.30
598

# Test Expected Result Validated By
Explorer in
Purview and
confirm test events
from V-1 through
V-6 are visible
appear with user,
workload, label,
and justification
data
6.11.6.1 30-Day Post-Deployment Review
Within 30 days of implementation:
1. Review DLP Alerts dashboard for false-positive alert volume on credential
policies across the test group.
2. Review the SharePoint simulation log (Priority 2) — if false-positive rate is
acceptable, promote to Enforced tenant-wide and submit a minor change
request.
3. Promote the test-group-scoped policies (Exchange, OneDrive, Teams
credential and label-sharing alerts) from the test group to All users once
friction metrics are acceptable.
4. Export Activity Explorer data to confirm label adoption rates are trending
upward.
5. Present findings to the CAB sponsor before the Phase 2 submission.
6.11.7 Rollback Plan
Labels and DLP policies can be reversed without service interruption.
Scenario Rollback Procedure Estimated Time
Label policy causes user
disruption (help desk
volume spike)
Set mandatory labeling to
Off in the label policy
settings; this removes the
forced prompt while
leaving labels available
5 minutes
DLP policy causes
legitimate mail to be
blocked
Set the affected policy to
Simulation mode or
disable the specific rule;
does not require deleting
the policy
5 minutes
Labels need to be removed Unpublish the label policy 24+ hours
CAB Runbook: Sensitivity Labels and DLP Policies
599

Scenario Rollback Procedure Estimated Time
entirely first; wait 24 hours for
client propagation to clear;
then delete labels. Labels
cannot be deleted while
active in a policy.
Container label sync causes
Groups configuration issue
Revert EnableMIPLabels
to Falsevia the Entra
directory settings
PowerShell commands
10 minutes
LABEL DELETION IS PERMANENT
Sensitivity labels that have been applied to files cannot be removed by
deleting the label definition — the label metadata persists in the file.
Rollback of the label policy only affects new labeling behavior, not
already-labeled content. Do not delete label definitions unless directed by
Microsoft support.
6.11.8 Risk Register
ENVIRONMENT: GCC HIGH (CMMC)
Risk Likelihood Impact Mitigation
Mandatory
labeling generates
help desk volume
in the first week
High Low Pre-deployment
communication
with brief user
guidance; set a
5-business-day
support buffer
Credential DLP
blocks a
legitimate
Low High Audit Exchange
transport rules
and known
Securing Microsoft 365 in GCC High | 2026.04.30
600

Risk Likelihood Impact Mitigation
automated
process (service
account, pipeline)
automation
accounts before
deployment; add
sender exclusions
for identified
service accounts
CUI — Specified
encryption
prevents a user
from opening a
file on a non-
corporate device
Medium Medium Scope CUI —
Specified label
permissions to a
security group;
add authorized
external devices
to the group
before
deployment
External partner
blocks due to
Allowed Domains
list being
incomplete
Medium Medium Confirm the
approved partner
domain list with
the security team
before
deployment; test
with a known
partner tenant
before go-live
Labels do not
appear in Office
clients within
expected
timeframe
Low Low Policy
propagation can
take up to 24
hours; inform
users not to
expect immediate
availability;
verify via test
account
CAB Runbook: Sensitivity Labels and DLP Policies
601

ENVIRONMENT: COMMERCIAL
Risk Likelihood Impact Mitigation
Mandatory
labeling generates
help desk volume
in the first week
High Low Pre-deployment
communication
with brief user
guidance; set a
5-business-day
support buffer
Credential DLP
blocks a
legitimate
automated
process (service
account, pipeline)
Low High Audit Exchange
transport rules
and known
automation
accounts before
deployment; add
sender exclusions
for identified
service accounts
Restricted
encryption
prevents file
access for an
authorized
external party
Medium Medium Scope Restricted
encryption to a
security group;
add authorized
users before
deployment; test
access with the
recipient before
go-live
DLP alert volume
overwhelms the
security mailbox
Medium Medium Set alert
aggregation to
daily digest for
Medium-severity
alerts; reserve
real-time alerts
for High-severity
policies only
Labels do not
appear in Office
clients within
expected
timeframe
Low Low Policy
propagation can
take up to 24
hours; inform
users not to
Securing Microsoft 365 in GCC High | 2026.04.30
602

Risk Likelihood Impact Mitigation
expect immediate
availability
6.11.9 Communication Plan
Audience Message Timing Delivered By
All Microsoft 365
users
New sensitivity
labels are being
added to Office
applications. You
will be asked to
select a label when
saving documents
or sending email. A
brief guide is
available at [link].
5 business days
before go-live
[Name /
Communication
channel]
IT Help Desk Sensitivity label
training brief:
expected user
questions, where
labels appear, how
to reset a label, and
escalation path for
legitimate DLP
blocks
3 business days
before go-live
[Name]
Security /
Compliance team
DLP incident report
mailbox is live as
of [date]. Review
the alert dashboard
at [Purview portal
link] within 48
hours of go-live.
Escalation path for
enforcement
disputes: [Name/
ticketing queue].
Day of go-live [Name]
CAB Runbook: Sensitivity Labels and DLP Policies
603

Audience Message Timing Delivered By
CAB Sponsor Post-
implementation
summary within 5
business days of
go-live confirming
validation results
and help desk ticket
volume
Within 5 business
days
[Name]
6.11.10 Change Record
Field Value
Submitted by [Name]
Submission date [Date]
CAB review date [Date]
CAB decision [ ] Approved [ ] Approved with conditions
[ ] Deferred [ ] Rejected
Conditions / Notes
Approved by [Name, title]
Implementation date (actual)
Closed by [Name]
Closure date
6.12 Secure Collaboration
Cross-Tenant Collaboration covers the identity mechanics — Entra B2B guest
access, Cross-Tenant Access Settings, and Teams federation. This chapter covers
the data layer: what guests and external users can do with content once they're in,
and how to protect sensitive projects from oversharing without blocking legitimate
collaboration.
Securing Microsoft 365 in GCC High | 2026.04.30
604

6.12.1 Shared Channels vs. Guest Access — Data
Exposure Comparison
Teams provides two fundamentally different external collaboration models. The
choice determines what data the external user can reach and how it is governed.
Shared Channels Guest Access (B2B)
External user account
required
Yes — Entra ID (their own
tenant)
Yes — Entra B2B guest in
your tenant
External user can access
SharePoint
Channel files only, in your
tenant's SPO
All sites they are granted
access to
External user sees your
org's Teams
No — they work from their
own Teams client
Yes — they switch into
your tenant
Content stored in Your tenant's SharePoint Your tenant's SharePoint
Sensitivity label
enforcement
Applied by your tenant's
policies
Applied by your tenant's
policies
DLP scope Your tenant's DLP policies
apply
Your tenant's DLP policies
apply
Guest sees other guests in
the team
No Yes (unless hidden)
Suitable for Ongoing project
collaboration with known
partners
Temporary or broad access
needs
Recommendation: Prefer shared channels for structured partner collaboration —
the external user has a narrower blast radius (one channel's files, not the whole site)
and works from their familiar Teams environment. Use B2B guest access when the
external user needs broader access (multiple channels, other SharePoint sites, or
Exchange calendar access).
6.12.2 Tented Projects — Sensitivity-Labeled
Containers
A "tented project" is a Teams team or SharePoint site whose container label
enforces access controls independently of the files inside it. The label is applied to
Secure Collaboration
605

the container, not individual files, and the container label settings govern:
• Whether external sharing is permitted at all
• The default sensitivity label applied to new files created inside the
container
• Whether unmanaged (non-enrolled) devices can access the content
6.12.2.1 Setting Up a Tented Project
1. Create a sensitivity label for the container
In the Purview portal, create a label (e.g., Project — NDA) scoped to Sites and
Groups in addition to Files and Email. Configure the site and group settings:
Setting Value
Privacy of Teams connected to this label Private
External user access Do not add guest users / Allow existing
guests
External sharing from labeled SharePoint
sites
Existing guests only
Unmanaged device access Web-only (no download)
Default sharing link type Specific people
2. Apply the label when creating the Team
When creating a new Team, select the sensitivity label from the Sensitivity
dropdown. For an existing Team: Team settings → Edit → Sensitivity.
3. Set a default file label for new content
In the container label's Files settings, configure Default label for documents to
automatically apply a file-level label (e.g., Confidential or CUI — Basic) to all new
documents created within the site. This ensures files created inside the tented
project are labeled from the moment of creation rather than relying on users to label
manually.
4. Lock the container label
Configure the label policy to require justification when downgrading a site's
Securing Microsoft 365 in GCC High | 2026.04.30
606

sensitivity label. This prevents a user from switching a Project — NDA site to
Internal to loosen sharing restrictions.
ENVIRONMENT: GCC HIGH (CMMC)
6.12.2.2 CUI-Labeled Project Sites
For CMMC environments, the tented project pattern directly maps to the
requirement to control CUI by project or contract. Create a labeled container
per contract vehicle:
Container Label External
Sharing
Default File
Label Typical Use
CUI — Program
(Confidential)
Existing guests
only (approved
prime only)
CUI — Basic Active contract
work
CUI — Specified
Program
No external
sharing
CUI — Specified ITAR or Privacy
Act-covered work
General —
Partner
New and existing
guests
Internal Non-CUI partner
coordination
NIST SP 800-171 Rev. 3 3.1.3 (control CUI flow) and 3.1.1 (limit access to
authorized users) are satisfied together by the container label: access is scoped
to team members, external sharing is restricted to the approved partner
domain, and the default file label ensures all content is labeled for DLP
enforcement.
ENVIRONMENT: COMMERCIAL
6.12.2.3 NDA-Protected Projects
For commercial organizations, tented projects are most valuable for M&A due
diligence, board committee work, and external legal engagements where a
small group of internal and external parties needs to collaborate on sensitive
Secure Collaboration
607

content that must not be visible to the broader organization.
Configure the container label with Private team privacy and No external
sharing for the most sensitive projects, then add specific B2B guests or
shared channel participants as needed. The container label's privacy setting
prevents the team from appearing in Teams search results for internal users
who are not members.
6.12.3 MIP-Protected Files and External Recipients
When a file is encrypted with a sensitivity label's Rights Management protection,
the behavior for external recipients depends on whether they can be authenticated
against your tenant's RMS service.
6.12.3.1 How External Decryption Works
When an external user opens a Rights Management-protected file:
1. The Office app (or Azure Information Protection viewer) contacts your
tenant's RMS endpoint to request a decryption license.
2. Your tenant checks whether the user's identity is in the label's permission
list.
3. If authorized, the tenant issues a use license scoped to the user's rights
(View, Edit, Print, etc.).
4. The file decrypts locally in the app.
The external user must have an Entra ID account — either from their own Entra
ID tenant, or a Microsoft Account (for commercial tenants only). They do not need
a Purview license; the license requirement is on the tenant that issued the label.
6.12.3.2 External User Account Requirements
ENVIRONMENT: GCC HIGH (CMMC)
GCC High's RMS endpoint only accepts authentication from accounts that can
authenticate against Azure Government (login.microsoftonline.us). This
Securing Microsoft 365 in GCC High | 2026.04.30
608

means:
External User Account Type Can Open GCC High RMS-
Protected Files?
Entra ID account in another GCC High
tenant
Yes — if added to label permissions
Entra ID account in a commercial
tenant
Only if Cross-Cloud B2B trust is
configured (see Cross-Tenant
Collaboration)
Microsoft Account (personal) No
Google / federated identity No
This is a critical constraint: a defense prime contractor in GCC High cannot
simply email an RMS-protected file to a subcontractor on a commercial tenant
and expect them to open it without additional configuration. The options are:
1. Cross-Cloud B2B: configure Entra External Identities cross-cloud
trust to allow the commercial tenant's users to authenticate against
GCC High (requires steps in both tenants — see 6-6).
2. Unprotect for external delivery: downgrade to a label without
encryption for the specific document being shared, using a justified
override, and share via a Confidential SharePoint link instead of email
attachment.
3. Move the partner to GCC High: the cleanest solution for long-term
DoD supply chain relationships.
ENVIRONMENT: COMMERCIAL
For commercial tenants, any external user with an Entra ID or Microsoft
Account can be added to a label's permission list. The practical guidance:
• Add external users by email address in the label's Assign
Permissions Now settings, or use a security group that includes
Secure Collaboration
609

external guests.
• External users who receive a protected file and do not have an Entra
ID account will be prompted to create a free Microsoft Account —
this is acceptable for low-sensitivity content but not for Restricted.
• For Restricted content, restrict permissions to your tenant's own
security groups only and do not grant external access. Share via a
tented SharePoint site with B2B guest access instead.
6.12.3.3 Rights Matrix for External Collaboration
When adding external parties to a label's permissions, assign the minimum rights:
Scenario Recommended Rights
External reviewer (read-only) Viewer (View, Print)
External co-author (active collaboration) Co-Author (View, Edit, Save — no Print,
no Copy)
External approver (must be able to
forward)
Reviewer (View, Reply, Forward)
No external access ever Do not add external users; configure label
as internal-only
The Co-Author rights set (not Co-Owner) is the appropriate choice for most
partner collaboration — it allows editing but prevents the external party from re-
sharing or modifying permissions.
6.12.4 Authorized Partner File Sharing — End-to-
End Workflow
The following workflow combines tented projects, DLP Allowed Domains, and
label permissions into a structured process for sharing sensitive content with an
authorized partner.
Setup (one-time per partner relationship):
Securing Microsoft 365 in GCC High | 2026.04.30
610

1. Add the partner's tenant domain to the DLP Allowed Domains exception
list for sensitive label policies (see DLP Policies).
2. Configure Cross-Tenant Access Settings to allow B2B guest creation from
the partner tenant (see Cross-Tenant Collaboration).
3. Create a tented project site with the appropriate sensitivity label (CUI —
Basic in GCC High; Confidential in commercial).
4. Invite partner users as B2B guests or configure a shared channel.
Per-deliverable:
1. Author the document inside the tented site — it inherits the default file
label (e.g., CUI — Basic in GCC High; Confidential in commercial).
2. If the document requires Rights Management encryption, add the specific
partner users (or partner tenant domain) to the label's external permissions.
3. Share via the tented SharePoint site link (not email attachment) — DLP
Allowed Domains ensures only the approved partner domain can access.
4. Insider Risk Management monitors for unusual download volumes from the
partner-accessible site.
Offboarding a partner:
1. Remove B2B guests from the team and site.
2. Revoke any outstanding SharePoint sharing links.
3. If RMS-protected files were shared, revoke the use license via the RMS
portal (requires Azure Information Protection P2).
6.12.5 Bring Your Own Key (BYOK) and Double
Key Encryption (DKE)
Standard Purview label encryption uses Microsoft-managed keys stored in Azure
Key Vault. BYOK and DKE are advanced options for organizations that need to
control or restrict Microsoft's access to encryption keys.
6.12.5.1 BYOK — Customer-Managed Keys
With BYOK, you supply the root key in your own Azure Key Vault. Microsoft's
RMS service uses your key for encryption operations but cannot export it. BYOK
protects against:
• Compelled disclosure via legal process served to Microsoft
• Microsoft insider access to key material
BYOK applies to the entire tenant's RMS service — it is not per-label. All
Secure Collaboration
611

sensitivity label encryption in the tenant uses the customer-managed key.
ENVIRONMENT: GCC HIGH (CMMC)
BYOK is available in GCC High. The Azure Key Vault instance must be
deployed in an Azure Government region (usgovvirginia, usgovtexas).
The key must be an HSM-backed RSA 2048 or 4096 key.
# Connect to AIP service (GCC High endpoint)
Connect-AipService -EnvironmentName AzureUSGovernment
# Import your BYOK key
Use-AipServiceKeyVaultKey -KeyVaultKeyUrl "https://your-keyvault.vault.u
sgovcloudapi.net/keys/rms-key/version"
# Set as active tenant key
Set-AipServiceKeyProperties -KeyIdentifier "https://your-keyvault.vaul
t.usgovcloudapi.net/keys/rms-key/version" -Active $true
CMMC does not explicitly require BYOK, but NIST SP 800-171 Rev. 3
3.13.10 (employ cryptographic mechanisms) and the emerging CMMC Level
3 requirements around key management may make BYOK appropriate for
organizations handling CUI Specified categories.
ENVIRONMENT: COMMERCIAL
BYOK is appropriate for commercial organizations subject to HIPAA (where
a Business Associate Agreement with Microsoft does not fully address key
access concerns), financial services firms subject to OCC or FINRA
examination, and any organization whose legal counsel advises retaining
exclusive key control.
The Azure Key Vault for BYOK can be in any commercial Azure region. Use
HSM-backed keys (--kty RSA-HSM) for FIPS 140-2 Level 3 key protection.
6.12.5.2 Double Key Encryption (DKE)
DKE encrypts content with two keys: Microsoft's key and a second key that you
host on-premises or in your own Azure infrastructure. Microsoft's RMS service
cannot decrypt DKE-protected content alone — both keys are required
Securing Microsoft 365 in GCC High | 2026.04.30
612

simultaneously. This means:
• Microsoft has zero access to DKE-protected content
• Content cannot be decrypted during eDiscovery by Microsoft
• Content cannot be accessed if your DKE key server is offline
DKE is appropriate only for the most sensitive CUI Specified categories (e.g., SAP-
adjacent data, classified program information handled in unclassified systems). The
operational costs are significant:
Limitation Impact
No mobile access iOS/Android Office apps cannot decrypt
DKE content
No web access Office for the web (browser) cannot
decrypt DKE content
No eDiscovery Content is opaque to Microsoft Purview
eDiscovery and Compliance Search
No Copilot Microsoft 365 Copilot cannot process
DKE-protected files
Key server availability If your DKE key service is down, no one
can open DKE-protected files
DKE Architecture:
User opens DKE-protected file in Office desktop app
→ Office contacts Microsoft RMS (first key decryption)
→ Office contacts your DKE key service (second key decryption)
→ Both keys required to produce the content encryption key
→ File decrypts locally in Office
Deploy the DKE key service as an Azure App Service or on-premises IIS service
using the Microsoft DKE reference implementation. The service must be reachable
by all users who will open DKE-protected content.
ENVIRONMENT: GCC HIGH (CMMC)
In GCC High, the DKE key service should be deployed in Azure Government
(azurewebsites.usor on-premises within the GCC High network
Secure Collaboration
613