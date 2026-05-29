# 2. Scoping

**CMMC2 Documentation** | Version 2026.04.30

**Pages:** 26-70

---

## Table of Contents

- 2.1 CUI Data Flows & Business Applications
  - 2.1.1 Identifying CUI: The COPR Framework
  - 2.1.2 The Four CUI Flow Categories
  - 2.1.3 Mapping Business Applications to CUI
  - 2.1.6 CUI Data Flows — Compliance Control Mapping
- 2.2 People, Technology, and Processes
  - 2.2.2 People in Scope
  - 2.2.3 Technology Inventory
  - 2.2.4 Processes in Scope
  - 2.2.5 Building the SSP Asset Inventory
- 2.3 External Service Provider Management
  - 2.3.2 FedRAMP Moderate Equivalency
  - 2.3.3 Building the ESP Inventory
  - 2.3.4 Common ESP Scenarios
  - 2.3.5 MSP Assessment Requirements
- 2.4 Contractual Ingestion & LOB Strategy
  - 2.4.1 DFARS 252.204-7012 — The Triggering Clause
  - 2.4.2 Identifying CMMC-Triggering Contracts

---

2. Scoping
2.1 CUI Data Flows & Business
Applications
Every CMMC assessment begins with a question the assessor will not answer for
you: what is in scope? The answer is determined entirely by where Controlled
Unclassified Information flows. You cannot protect what you have not traced, and
you cannot claim a system is out of scope if CUI touches it — even briefly. Data
flow mapping is not a compliance checkbox. It is the prerequisite that determines
the size and cost of every other control you implement.
CUI data flow diagrams are a required artifact for the System Security Plan (SSP)
under CMMC Level 2. NIST SP 800-171 3.12.4 requires a description of the
system boundary and the information flows crossing that boundary. Before
configuring a single Conditional Access policy or Intune profile, architects must
produce a defensible map of where CUI enters the organization, how it moves
between systems, and where it exits. Everything in this guide assumes that map
exists.
2.1.1 Identifying CUI: The COPR Framework
Before mapping how CUI flows, decide what counts as CUI in the first place. The
default assumption — "everything from the government is CUI" — is the single
largest driver of excessive audit scope and cost in CMMC programs. A more
defensible approach is the COPR framework, four dimensions that together
determine whether specific information triggers your CUI compliance burden:
• Creation — who produced the information? Government-created CUI and
contractor-created derivative work both qualify.
• Ownership — who has legal ownership? Ownership can sit with the
agency, prime, or subcontractor; it affects flow-down obligations but not
your handling obligations once information is in your possession.
• Possession — does the information sit, transit, or process on your systems
or with your personnel? Possession is the trigger. You are only responsible
for protecting CUI your organization actually possesses — not every piece
of government data your primes touch.
• Regulation — which dissemination controls apply (CUI//SP-EXPT,
CUI//SP-PROP, etc.)? Regulation affects handling requirements but not
scope inclusion.
Securing Microsoft 365 in GCC High | 2026.04.30
26

The practical consequence: a precise inventory of what you possess — plus a
deliberate architecture that prevents systems from taking possession unnecessarily
— dramatically reduces audit surface area. The AVD enclave patterns in Phase 3
and the shared-services tenant architecture in Phase 1 each exist to shrink the set of
systems that take possession of CUI, making the rest of this chapter's flow-mapping
exercise tractable.
ATTRIBUTION
The COPR framework as presented here is drawn from Ryan Bonner
(DEFCERT), whose Identifying CUI roundtable at CS5 2026 expanded on
the mental model in detail.
2.1.2 The Four CUI Flow Categories
All CUI movement in a DIB organization falls into one of four categories. Scoping
the CMMC assessment requires accounting for all four.
Category Description Common Mechanisms
Inbound CUI CUI received from external
parties and entering the
organization's boundary
Email (SAFE/AMRDEC),
SFTP, DoD portals (PIEE,
Procurement Integrated
Enterprise Environment),
physical mail with CD/
USB
Internal CUI CUI stored, processed, or
transmitted between
systems within the
boundary
M365 (Exchange,
SharePoint, Teams), ERP
(Deltek Costpoint, SAP),
PDM/PLM (SolidWorks
PDM, Windchill), shared
network drives
Outbound CUI CUI leaving the
organization to external
parties
Submissions to
government portals, reports
to prime contractors,
sharing with
subcontractors, deliverable
transmittals
CUI Data Flows & Business Applications
27

Category Description Common Mechanisms
CUI at Rest CUI persisted in storage
systems, regardless of
active use
SharePoint document
libraries, Exchange Online
mailboxes, OneDrive for
Business, endpoint local
disks, removable media
Inbound CUI is typically the most overlooked flow. Government-furnished
information (GFI) — drawings, specifications, contract attachments — arrives
through channels the IT team may not monitor. A contract manager who downloads
a ZIP file of CAD drawings from a DoD portal onto a personal laptop has moved
CUI across the boundary without any IT involvement.
Internal CUI is where complexity compounds. Once CUI enters, it propagates. An
email attachment becomes a SharePoint file becomes an ERP record becomes a
Teams message. Each hop is a new system that must be within the assessed
boundary.
Outbound CUI requires particular attention because it involves third parties.
Sharing CUI with a subcontractor who is not CMMC certified is a flow-down
requirement issue. The prime contractor's data flow diagram must capture where
CUI exits and to whom.
CUI at Rest in Exchange archives and SharePoint version history is frequently
missed. Retention policies, litigation holds, and eDiscovery collections can cause
CUI to persist long after the active project ends.
2.1.3 Mapping Business Applications to CUI
The table below maps application types commonly found in DIB organizations to
their CUI exposure. Every cell in this table represents a system boundary decision:
is this application inside the CMMC assessment scope?
Application CUI Type Flow Direction M365 Touchpoint
Email (Exchange
Online)
Contract data, GFI,
export-controlled
content
Inbound, Internal,
Outbound
Exchange Online
(GCC High)
Document Technical Internal, At Rest SharePoint Online,
Securing Microsoft 365 in GCC High | 2026.04.30
28

Application CUI Type Flow Direction M365 Touchpoint
management
(SharePoint /
OneDrive for
Business)
drawings, SOPs,
contract
deliverables
OneDrive for
Business (GCC
High)
ERP (Deltek
Costpoint, SAP)
Contract cost data,
labor charging,
procurement
records
Internal Integration via API
or manual export;
may feed Teams/
email notifications
PDM / PLM
(SolidWorks
PDM, Windchill,
Teamcenter)
ITAR/EAR-
controlled technical
data, manufacturing
drawings
Internal, Outbound Typically
standalone;
transmittals may
use email or
SharePoint
Project tracking
(Microsoft Teams /
Planner)
Program schedules,
action items
referencing CUI
Internal Teams (GCC
High); channels,
chats, files tab
Government file
exchange (SAFE,
AMRDEC)
GFI, contract
deliverables, test
reports
Inbound, Outbound None (external
system); landing
point is email or
local drive
Video
conferencing
(Teams)
CUI discussed
verbally or via
screen share
Internal, Outbound Teams meetings
(GCC High);
recordings land in
OneDrive/
SharePoint
Removable media
(USB, CD/DVD)
Any CUI type —
often GFI from
government
Inbound, Outbound None; physical
transfer; endpoint is
the boundary
CUI Data Flows & Business Applications
29

Application CUI Type Flow Direction M365 Touchpoint
systems touchpoint
WARNING
ERP and PDM/PLM systems are almost always on-premises or hosted in
commercial cloud environments. If these systems process CUI, they are in
scope for the CMMC assessment. Excluding them requires demonstrating
that CUI never enters them — a difficult position to defend for a
manufacturer or program office.
2.1.4 Creating the CUI Data Flow Diagram
The SSP data flow diagram does not need to be produced in a formal diagramming
tool. It needs to be accurate, current, and auditable. A Visio file, a draw.io export,
or even a structured Mermaid diagram embedded in the SSP is acceptable. What
matters is that it reflects reality.
2.1.4.1 Step 1 — Start with inbound flows
Identify every mechanism by which CUI first enters the organization. For most DIB
contractors, this is:
• Email (Exchange Online): contract awards, GFI attachments from primes,
DCSA correspondence
• Government portals: PIEE, SAFE/AMRDEC downloads, DIBBS
• Physical media: CD/USB delivered with government-furnished equipment
• Prime contractor systems: extranet portals, SFTP drops, SharePoint
external sharing invitations
For each inbound mechanism, document: the external party, the transfer
mechanism, the first internal system that receives the data, and the user account
involved.
2.1.4.2 Step 2 — Trace internal paths
Follow the data as it moves. A contract award PDF arrives via email (Exchange).
Securing Microsoft 365 in GCC High | 2026.04.30
30

The contracts manager saves it to SharePoint. The program manager copies sections
into a project brief in Teams. The estimating team pulls scope into Deltek
Costpoint. Each of these is a new node in the diagram.
Map the path, not just the endpoints. Assessors look for undocumented lateral
movement — a file share that nobody mentioned, a legacy on-premises server that
still holds archived drawings.
2.1.4.3 Step 3 — Identify outbound paths
Document where CUI leaves the boundary and to whom. Common outbound flows:
• Deliverable submissions to PIEE or SAFE
• Technical data packages shared with subcontractors (email, SharePoint
external sharing, SFTP)
• Reports and CDRLs transmitted to the prime contractor
• Warranty or repair data sent to OEMs
For each outbound flow, document the receiving party, whether that party is
CMMC certified (and at what level), and the transfer mechanism.
2.1.4.4 Step 4 — Mark the authorization boundary
Draw a line. Everything inside that line is assessed. The authorization boundary in a
CMMC context must include every system that processes, stores, or transmits CUI.
This includes:
• The cloud services (M365 tenant, Azure subscriptions)
• On-premises infrastructure that stores CUI (file servers, ERP databases)
• Endpoints that access CUI (managed workstations, mobile devices)
• Network infrastructure that carries CUI (switches, firewalls, VPN
concentrators)
Systems outside the boundary are out of scope only if there is a documented
mechanism preventing CUI from entering them. "We don't think anyone would save
CUI there" is not a mechanism.
ENVIRONMENT: GCC HIGH
In M365 GCC High deployments, the authorization boundary for cloud
services is defined by the tenant boundary itself. Microsoft operates GCC
CUI Data Flows & Business Applications
31

High in a physically separated environment from commercial M365. This
provides a defensible hard boundary for the cloud portion of the SSP.
• Inside the boundary: Exchange Online (GCC High), SharePoint
Online (GCC High), OneDrive for Business (GCC High), Teams
(GCC High), Azure AD / Entra ID (GCC High)
• Outside the boundary by default: Consumer OneDrive accounts,
commercial M365 tenants, personal Gmail, Zoom (unless separately
assessed), any SaaS tool not in the GCC High tenant
Personal devices accessing GCC High services must be evaluated. If a user
reads CUI email on a personal iPhone, that device has touched CUI. Either the
device is brought into scope (managed, compliant) or CUI access from
unmanaged devices is technically blocked via Conditional Access. A
Conditional Access policy requiring a compliant device is the standard
mechanism for keeping unmanaged endpoints out of scope.
Cross-cloud flows are a boundary-crossing event. Any flow from the GCC
High tenant to a commercial tenant — forwarding rules, Teams external
federation to commercial tenants, SharePoint external sharing to commercial
accounts — must be documented as an outbound flow crossing the
authorization boundary. Most of these should be blocked by policy.
TIP
Document the GCC High tenant ID in the SSP. Assessors will verify
that the tenant in scope matches the FedRAMP High authorization
held by Microsoft.
ENVIRONMENT: COMMERCIAL
For organizations pursuing NIST SP 800-171 compliance on a commercial
M365 tenant, the authorization boundary cannot rely on physical
infrastructure separation. The boundary is defined entirely by policy and
Securing Microsoft 365 in GCC High | 2026.04.30
32

technical controls.
NIST SP 800-171 3.12.4 requires the SSP to describe the system boundary,
including all components that process, store, or transmit CUI. In a commercial
tenant, this means:
• The tenant must be dedicated to CUI work, or CUI must be isolated
within the tenant using sensitivity labels, Conditional Access policies,
and SharePoint site architecture
• Guest accounts, external sharing, and cross-tenant collaboration
configurations must be documented as boundary-crossing
mechanisms
• Any SaaS application connected to the tenant via OAuth or API (e.g.,
Salesforce, DocuSign) that can access CUI-tagged content must be
evaluated for scope inclusion
The risk in commercial environments is boundary creep. CUI can easily flow
into personal OneDrive accounts, consumer email (via forwarding rules), or
third-party apps with broad Graph API permissions. The SSP boundary
statement must be supported by technical controls that enforce it — not just
policy statements.
2.1.5 Common CUI Entry Points to Audit
The following entry points consistently produce undocumented CUI flows in DIB
organizations. Audit each before finalizing the SSP boundary.
• Email attachments without CUI markings: Government senders do not
always mark CUI correctly. An unmarked PDF of a contract SOW is still
CUI. Filtering on markings alone misses a significant volume of inbound
CUI.
• Government-furnished CAD files on unmanaged workstations:
Engineers routinely copy GFI drawings to personal laptops for
convenience. If the workstation is not managed, it is out of scope — but the
CUI is on it.
• Contract PDFs stored in consumer OneDrive: Users who have both a
consumer Microsoft account and a work GCC High account sometimes
accidentally save to the wrong OneDrive. Consumer OneDrive is outside
CUI Data Flows & Business Applications
33

the CMMC boundary.
• Screen shares of CUI via Zoom or personal Teams accounts: Teams
meetings in the GCC High tenant are inside the boundary. A meeting in
Zoom, Google Meet, or a personal (consumer) Teams account is not.
Screen-sharing a drawing or contract in those platforms is an
undocumented outbound flow.
• USB transfers from government systems: Program offices frequently
hand off USB drives containing GFI at kickoff meetings. The drive is
received by an employee whose workstation may or may not be managed.
This is an inbound flow with no digital audit trail.
• Collaboration with primes via commercial SharePoint: Prime
contractors sometimes extend SharePoint access using commercial tenant
guest accounts. If a DIB subcontractor's user signs in with their GCC High
credentials to a commercial SharePoint site, that is a cross-boundary flow.
• ERP system integrations: Deltek Costpoint installations that pull data
from SharePoint or push notifications to Exchange may be moving CUI
through an integration account that is not in the SSP.
2.1.6 CUI Data Flows — Compliance Control
Mapping
ENVIRONMENT: GCC HIGH
The following CMMC Level 2 practices directly require data flow artifacts as
evidence. The SSP data flow diagram, combined with the boundary
documentation, satisfies the bulk of these requirements.
CMMC Practice Requirement Data Flow Artifact
AC.L2-3.1.3 — Control
CUI Flow
Control the flow of CUI
in accordance with
approved authorizations
Inbound and outbound
flow diagrams
identifying authorized
transfer mechanisms and
parties
CA.L2-3.12.4 — System
Security Plan
Develop, document, and
periodically update
system security plans
SSP data flow diagram;
authorization boundary
diagram; list of in-scope
systems
Securing Microsoft 365 in GCC High | 2026.04.30
34

CMMC Practice Requirement Data Flow Artifact
MP.L2-3.8.1 — Media
Protection
Protect system media
containing CUI, both
paper and digital
Removable media flows
documented; physical
media inventory; media
sanitization records
SC.L2-3.13.1 —
Boundary Protection
Monitor, control, and
protect communications
at the external boundary
Authorization boundary
definition; firewall/proxy
rules aligned to
documented flows; cross-
boundary flow controls
The AC.L2-3.1.3 and SC.L2-3.13.1 requirements together demand that the
boundary is technically enforced, not just documented. A flow diagram
without corresponding technical controls (Conditional Access, DLP policies,
firewall rules) will not satisfy these practices.
ENVIRONMENT: COMMERCIAL
For organizations using NIST SP 800-171 Rev. 3 on a commercial M365
tenant, the following requirements are directly supported by data flow
documentation.
Requirement Description Data Flow Artifact
3.1.3 — Information
Flow Control
Control the flow of CUI
in accordance with
approved authorizations
Inbound/outbound flow
diagrams; documented
authorized transfer
mechanisms
3.8.1 — Media
Protection
Protect system media
containing CUI
Removable media flow
documentation; media
handling procedures
3.12.4 — System
Security Plan
Periodically assess
security controls;
develop and implement
SSP data flow diagram;
authorization boundary
diagram; component
CUI Data Flows & Business Applications
35

Requirement Description Data Flow Artifact
plans of action inventory
NIST SP 800-171 Rev. 3 introduced more explicit requirements around
system-level boundary documentation compared to Rev. 2. Organizations
assessed against Rev. 3 should ensure the SSP includes a component
inventory tied directly to the data flow diagram — not just a narrative
boundary description.
2.2 People, Technology, and Processes
CMMC assesses the entire Organizational Security Control (OSC) environment —
not a subset of it. But "environment" is not self-defining. Every asset, every system
account, and every business process that an assessor can reasonably argue touches
CUI is in scope unless you have documented a defensible reason it is not. An
undefined boundary is an open invitation for scope creep during the assessment.
The goal of this chapter is to define that boundary tightly before any assessor
arrives. The work here produces three artifacts that feed directly into the System
Security Plan (SSP): an asset inventory classified by CMMC category, a people
inventory showing who has access to what, and a process map linking business
workflows to the systems that support them. Getting this right reduces assessment
burden, focuses implementation effort on the right systems, and gives the assessor a
clear picture of what they are evaluating.
2.2.1 Asset Categories
CMMC defines four asset categories. Classification is not a labeling exercise — it
determines which controls apply and whether the asset appears in the formal
assessment scope.
Category Definition Examples Assessment
Implication
CUI Assets Systems that Engineering All 110 CMMC
Securing Microsoft 365 in GCC High | 2026.04.30
36

Category Definition Examples Assessment
Implication
process, store, or
transmit CUI
directly.
workstations,
SharePoint sites
containing
drawings,
Exchange
mailboxes
receiving
government data,
file servers with
CUI directories.
Level 2 practices
apply. Full
assessment scope.
Security
Protection Assets
(SPA)
Systems that
provide security
functions for CUI
Assets but do not
process CUI
directly.
SIEM, IdP (Entra
ID), MFA system,
MDM (Intune),
vulnerability
scanner, Defender
for Endpoint,
network firewall.
All 110 CMMC
Level 2 practices
apply. Full
assessment scope.
An SPA
compromise can
expose CUI even
though the SPA
never holds CUI
itself.
Contractor Risk
Managed Assets
(CRMA)
Assets connected to
the environment
that could affect
CUI security,
managed through
documented
organizational risk
rather than full
CMMC controls.
Personal phones
used solely for
MFA push
notifications, guest
Wi-Fi networks
physically
separated from CUI
systems, time-
tracking SaaS with
no CUI access,
building badge
systems on an
isolated network.
Reduced
assessment
footprint. Must be
documented with a
risk acceptance
statement in the
SSP. Assessors will
verify the
separation claims.
Out of Scope
Assets
Systems physically
and logically
separated from the
CUI environment
with no pathway to
CUI data or CUI
systems.
A standalone lab
network for non-
program R&D, a
retail point-of-sale
system in a separate
facility, employee
personal devices
that are blocked
No CMMC
controls required.
Must be
demonstrably
isolated — "we
think they're
separate" is not
sufficient
People, Technology, and Processes
37

Category Definition Examples Assessment
Implication
from corporate
resources entirely.
documentation.
CLASSIFY ASSETS BEFORE YOU CONFIGURE THEM
Organizations that configure security controls first and classify assets later
invariably over-scope. Start with a list of every system in the organization,
classify each one, and then apply controls only to CUI Assets and SPAs.
This sequencing also reveals CRMA candidates — assets you can
defensibly exclude with a risk acceptance rather than a full control
implementation.
2.2.1.1 CUI Assets vs. SPAs — The Practical Distinction
The difference matters operationally. A CUI Asset holds or moves CUI. A SPA
protects CUI Assets but does not itself hold CUI. Both require full CMMC controls,
but the control emphasis differs: CUI Assets drive requirements like media
protection (MP), access control to data (AC), and audit logging of data access (AU).
SPAs drive requirements like configuration management (CM), system integrity
(SI), and personnel security for administrators (PS).
Entra ID is an SPA. It never holds CUI but it controls who can access everything
that does. A compromise of Entra ID is functionally equivalent to a compromise of
every CUI Asset it protects.
2.2.2 People in Scope
Every person with interactive access to a CUI Asset or an SPA is in scope for
CMMC. This includes both the access itself and the onboarding/offboarding
processes that govern it.
Role Access Type In Scope? Notes
CUI Users Direct CUI access Yes — CUI Asset Primary population.
Securing Microsoft 365 in GCC High | 2026.04.30
38

Role Access Type In Scope? Notes
(engineers, PMs,
program staff)
— read, create,
modify, transmit.
users All AC, AT, and IA
controls apply.
IT Administrators Privileged access to
CUI Assets and
SPAs —
configuration,
provisioning, key
management.
Yes — SPA
administrators
Privileged account
controls
(AC.L2-3.1.6)
apply. Separate
admin accounts
required.
Security Team
(ISSO, ISSM)
Read access to
logs, SIEM,
vulnerability data.
Write access to
security
configuration.
Yes — SPA
administrators
Likely overlap with
IT admin role in
small DIB
organizations.
Document the roles
explicitly
regardless.
HR (HRIS system
access)
System access only
— no CUI in HR
system.
Conditional If the HRIS does
not process CUI
and is not
integrated with a
CUI Asset or SPA,
it may be out of
scope. If it feeds
account
provisioning into
Entra ID, the HRIS
is an SPA.
Finance (ERP) Accounting system
access.
Conditional If the ERP
processes contract-
related data that
constitutes CUI
(e.g., cost reporting
on a CUI contract),
the ERP and its
users are in scope.
If the ERP is
finance-only with
no CUI, document
the separation.
Subcontractors Access to CUI
systems via VPN,
Yes Subcontractors
accessing CUI
People, Technology, and Processes
39

Role Access Type In Scope? Notes
Entra B2B, or
shared portals.
Assets or SPAs are
fully in scope. They
require CMMC
training, phishing-
resistant MFA, and
background
screening per your
contracts.
Managed Service
Provider (MSP)
Privileged remote
access to CUI
Assets or SPAs.
Yes — treated as
privileged
administrators
MSP access is one
of the highest-risk
vectors. The MSP's
own CMMC
posture, access
controls, and
supply chain status
must be
documented in the
SSP.
External Auditors /
Assessors
Time-limited read
access for audit
purposes.
Yes — temporary
privileged access
Access must be
formally
authorized, time-
bounded, and
logged. Auditors do
not require ongoing
accounts.
THIRD-PARTY ACCESS IS FREQUENTLY UNDER-DOCUMENTED
MSP and subcontractor access is among the most common gaps identified
in CMMC gap assessments. Document every third party with any form of
access to in-scope systems, the access method, the authorization date, and
the review cadence. An assessor who finds an undocumented MSP account
during the assessment will treat it as a control failure, not an oversight.
Securing Microsoft 365 in GCC High | 2026.04.30
40

2.2.3 Technology Inventory
The technology inventory is the backbone of the SSP. It must account for every
asset in the CUI and SPA categories and provide the assessor with a defensible
picture of the environment boundary.
2.2.3.1 Inventory Categories
Endpoints
• Managed Windows devices (laptops, desktops) — typically CUI Assets if
users access CUI on them, or SPAs if used exclusively for IT
administration.
• Mobile devices enrolled in Intune — CUI Assets if CUI email or
documents are accessible; CRMA if restricted to MFA push only with
MAM policies blocking CUI sync.
• Printers and MFPs — CUI Assets if they store or forward scanned CUI
documents; CRMA if they are isolated and print-only with no document
storage.
Servers
• On-premises file servers containing CUI directories — CUI Assets.
• On-premises domain controllers — SPAs (they control access to CUI
systems).
• On-premises application servers hosting CUI-processing applications —
CUI Assets.
• Infrastructure servers (DNS, DHCP, patch management) — SPAs.
Cloud Services
• M365 GCC High tenant — primary SPA and CUI Asset (Exchange Online,
SharePoint, Teams).
• Azure Government subscriptions — asset category depends on what runs
there; VMs processing CUI are CUI Assets.
• SaaS tools — must be evaluated individually. CUI in a SaaS that is not
FedRAMP Authorized in the appropriate impact level is a control gap, not a
CRMA candidate.
Network Devices
• Perimeter firewall — SPA.
• Core switches carrying CUI traffic — SPA.
People, Technology, and Processes
41

• VPN gateway providing remote access to CUI systems — SPA.
• Out-of-band management network — SPA.
• Guest Wi-Fi (physically separated, no routing to CUI VLANs) — CRMA if
properly documented.
OT/IoT Most DIB organizations have limited OT exposure, but some defense
manufacturers operate CNC equipment, test systems, or environmental monitoring
on networks adjacent to CUI systems. If the OT network has any path to a CUI
Asset or SPA, it must be classified. An air-gapped OT network with no CUI
processing may be out of scope; document the separation explicitly.
ENVIRONMENT: GCC HIGH
2.2.3.2 M365 GCC High as the Primary SPA
In a GCC High-aligned environment, the M365 GCC High tenant is
simultaneously the largest SPA and a CUI Asset in its own right. Entra ID
controls authentication to every CUI system. Exchange Online receives
government email containing CUI. SharePoint and OneDrive store CUI
documents. Teams facilitates CUI communication.
M365 GCC High
Component
CMMC Asset
Category Rationale
Entra ID SPA Controls identity and
access to all CUI Assets
and SPAs. No CUI
stored, but a breach
exposes everything.
Intune SPA Enforces device
compliance and
configuration baselines
across all managed
endpoints.
Defender for Endpoint
(MDE)
SPA Provides EDR coverage
across CUI Assets. Alerts
and telemetry feed the
security operations
function.
Securing Microsoft 365 in GCC High | 2026.04.30
42

M365 GCC High
Component
CMMC Asset
Category Rationale
Exchange Online CUI Asset Receives and stores
email containing CUI.
Subject to MP, AU, and
AC controls.
SharePoint / OneDrive CUI Asset Stores CUI documents.
Sensitivity labels and
DLP enforce access and
flow control.
Microsoft Teams CUI Asset CUI may be shared in
chats and channel files.
Treated as CUI Asset
when CUI channels are
in use.
Microsoft Purview SPA Provides classification,
DLP, and audit
capabilities that protect
CUI Assets.
Defender for Cloud
Apps (MCAS)
SPA Provides session control
and anomaly detection
for cloud access.
All devices enrolled in Intune are either CUI Assets (if the user accesses CUI
on the device) or SPAs (if the device is used exclusively for IT administration
with no CUI data). There is no enrolled device category that is automatically
out of scope.
ENVIRONMENT: COMMERCIAL
2.2.3.3 M365 Commercial as the Primary SPA
The same classification framework applies in a commercial M365
environment, but the boundary can be drawn more tightly if CUI is confined
People, Technology, and Processes
43

to specific SharePoint sites, specific distribution groups, or a specific sub-
environment. Commercial organizations voluntarily aligning to NIST SP
800-171 Rev. 3 have more flexibility in scoping decisions than organizations
undergoing formal CMMC assessment.
M365 Commercial
Component NIST Asset Category Notes
Entra ID SPA Same function as GCC
High — controls access
to all protected systems.
Intune SPA Device management and
compliance enforcement.
Defender for Endpoint SPA EDR coverage across
protected endpoints.
Exchange Online Conditional CUI Asset In scope only if CUI is
received or stored in
Exchange. If CUI is
confined to specific
mailboxes, document the
scoping boundary.
SharePoint / OneDrive Conditional CUI Asset If CUI is confined to
specific site collections,
the boundary can be
drawn at the site
collection level. Requires
strict access controls and
DLP to prevent CUI
from migrating to out-of-
scope sites.
Teams Conditional CUI Asset Can be scoped to specific
teams with CUI
sensitivity labels.
Requires robust DLP and
Securing Microsoft 365 in GCC High | 2026.04.30
44

M365 Commercial
Component NIST Asset Category Notes
guest access controls.
TIGHTER SCOPING REQUIRES STRONGER ENFORCEMENT
Claiming that CUI is "confined to specific SharePoint sites" only
holds if DLP policies actively prevent CUI from being copied to out-
of-scope locations. A tightly scoped environment with weak DLP is
worse than a broadly scoped environment with strong controls — the
assessor will identify the gap and the scoping argument collapses.
2.2.4 Processes in Scope
Asset and people inventories capture what exists. The process inventory captures
what happens — and connects business workflows to the systems and people
supporting them. Any process that results in CUI being created, received, handled,
or transmitted brings its supporting systems and personnel into scope.
Business Process CUI
Involvement? In-Scope Systems Notes
Contract Intake
and CUI
Identification
Yes — government
contracts and DDs
may contain CUI
upon receipt.
Exchange Online,
SharePoint,
document
management
system.
The intake process
is where CUI enters
the organization.
Marking and
classification
procedures start
here.
Engineering
Design and
Drawing
Management
Yes — technical
drawings, CAD
files, specifications,
and test data are
Engineering
workstations, CAD
servers, SharePoint/
OneDrive, PLM
The highest-volume
CUI workflow for
most defense
manufacturers.
People, Technology, and Processes
45

Business Process CUI
Involvement? In-Scope Systems Notes
typically CUI // SP-
CTI.
system. Every system in
this workflow is a
CUI Asset.
Program
Management and
Government
Reporting
Yes — program
status, cost reports,
and CDRLs often
contain CUI.
Exchange Online,
SharePoint, project
management tools,
ERP (if contract
cost data is CUI).
Reporting back to
the government is a
CUI transmission
event. Confirm the
transmission path
uses approved
channels.
Subcontractor
Management and
Data Sharing
Yes — sharing
technical data with
subcontractors is a
CUI flow event.
Email, SharePoint
external sharing,
secure file transfer
tools.
CUI flow to
subcontractors must
be authorized in
writing and covered
by a Subcontractor
Agreement
specifying CMMC
requirements.
External sharing
controls must be
enforced
technically, not just
contractually.
Incident Response Yes — IR
investigation may
involve access to
CUI systems and
CUI data logs.
SIEM, Defender
XDR, ticketing
system,
communication
channels used for
IR coordination.
The IR process
itself must be
documented in the
SSP. Systems used
for IR coordination
(e.g., a Slack
workspace used
during incidents)
may become in-
scope if CUI is
discussed in them.
Personnel
Onboarding and
Offboarding
Indirect — creates
and revokes access
to CUI Assets and
SPAs.
HRIS, Entra ID,
Intune, Active
Directory, ticketing
system.
The onboarding/
offboarding process
is the enforcement
point for
PS.L2-3.9.1 and
PS.L2-3.9.2.
Securing Microsoft 365 in GCC High | 2026.04.30
46

Business Process CUI
Involvement? In-Scope Systems Notes
Automated de-
provisioning is
strongly
recommended;
manual offboarding
processes are a
recurring control
gap.
For each process, the scoping question is binary: does this process result in CUI
being created, received, stored, or transmitted? If yes, every person who executes
the process and every system that supports it is in scope. Document the answer in
the SSP process narrative.
2.2.5 Building the SSP Asset Inventory
The SSP asset inventory is the formal record the assessor will review. It must be
complete, current, and defensible. An inventory that was accurate twelve months
ago and has not been updated since the last hardware refresh is a finding waiting to
happen.
2.2.5.1 Inventory Construction Sequence
Start with CUI Assets, then work outward:
1. Identify CUI Assets first. List every system where CUI is created, stored,
processed, or transmitted. These are non-negotiable. Anything that touches
CUI is in scope.
2. Identify SPAs. For each CUI Asset, ask: what systems control access to it,
monitor it, or protect it? Those are SPAs. Add them to the inventory.
3. Identify CRMA candidates. For assets connected to the environment but
not touching CUI directly, evaluate whether they can be managed as
CRMA. Document the risk acceptance.
4. Document out-of-scope assets. For anything claimed as out of scope,
document the physical and logical separation controls. "It's on a different
VLAN" is not sufficient without evidence that the VLAN is enforced at the
firewall with a deny-all default posture.
People, Technology, and Processes
47

2.2.5.2 Required Inventory Fields
Each asset record in the SSP must include at minimum:
Field Description
Asset Name / Identifier Hostname, asset tag, or service name.
Asset Type Endpoint, server, cloud service, network
device, mobile, OT/IoT.
CMMC Category CUI Asset, SPA, CRMA, or Out of Scope.
Asset Owner Individual responsible for the asset's
security configuration and patching.
Location Physical location (facility, rack) or cloud
region.
OS / Platform / Version Operating system and version, or service
tier and region for cloud assets.
IP Address / DNS Name Primary address. For cloud services, the
service endpoint.
Connected To Assets this system communicates with in
the CUI environment.
Last Updated Date the record was last verified.
USE ENTRA AND INTUNE AS YOUR SOURCE OF TRUTH
The Entra device inventory and Intune device inventory together capture
every managed endpoint in the tenant. Export both, cross-reference them,
and use the combined list as the starting point for your endpoint asset
inventory. Devices that appear in Entra but not in Intune — or vice versa —
are a hygiene gap worth resolving before an assessment. Chapter 11-2
covers the asset inventory implementation in detail.
Securing Microsoft 365 in GCC High | 2026.04.30
48

2.2.5.3 Network Diagram Requirement
The SSP must include a network diagram showing the relationships between in-
scope assets. The diagram does not need to be architectural-grade artwork, but it
must show:
• The CUI enclave boundary (logical or physical).
• Where CUI Assets reside relative to the boundary.
• Where SPAs sit relative to CUI Assets.
• External connections: internet egress, government network connections,
VPN termination points, cloud service connections.
• Any CRMA assets connected to the environment with their separation
controls indicated.
Assessors use the network diagram to identify undocumented connections. If a
system appears connected to CUI Assets on the diagram but is not in the asset
inventory, the assessor will ask why.
2.2.6 People & Technology — Compliance Control
Mapping
ENVIRONMENT: GCC HIGH
The asset inventory and scoping work in this chapter directly satisfies or
enables the following CMMC Level 2 practices:
CMMC Practice Requirement
Summary
Artifact Produced by
This Chapter
CA.L2-3.12.4 Develop, document, and
periodically update an
SSP that describes the
system boundary,
operational environment,
and implementation of
security controls.
SSP asset inventory,
network diagram, and
process narrative.
CM.L2-3.4.1 Establish and maintain Asset inventory identifies
People, Technology, and Processes
49

CMMC Practice Requirement
Summary
Artifact Produced by
This Chapter
baseline configurations
for all CUI Assets and
SPAs.
which systems require a
documented baseline
configuration.
AC.L2-3.1.1 Limit system access to
authorized users,
processes, and devices.
People inventory
identifies authorized
users per system.
AC.L2-3.1.2 Limit system access to
the types of transactions
and functions authorized
users are permitted to
execute.
Role × access type
mapping in the people
inventory.
RA.L2-3.11.1 Periodically assess risk
to organizational
operations, assets, and
individuals from the
operation of systems
processing CUI.
Risk assessment scope is
defined by the asset
inventory. Assets not in
the inventory cannot be
formally risk-assessed.
PS.L2-3.9.1 Screen individuals prior
to authorizing access to
systems containing CUI.
People inventory
identifies which roles
require screening under
this control.
PS.L2-3.9.2 Ensure that CUI is
protected during and
after personnel actions
such as terminations and
transfers.
Offboarding process
mapping identifies which
systems require de-
provisioning and in what
sequence.
ENVIRONMENT: COMMERCIAL
For organizations voluntarily aligning to NIST SP 800-171 Rev. 3, the same
scoping work maps to the following security requirements:
Securing Microsoft 365 in GCC High | 2026.04.30
50

NIST SP 800-171 Rev.
3 Requirement
Requirement
Summary
Artifact Produced by
This Chapter
3.12.4 Develop, document, and
periodically update an
SSP.
SSP asset inventory,
network diagram, and
process narrative.
3.4.1 Establish and maintain
baseline configurations
for organizational
systems.
Asset inventory identifies
systems requiring
documented baselines.
3.1.1 Limit system access to
authorized users,
processes acting on
behalf of users, and
devices.
People inventory
identifies authorized
users per system.
3.1.2 Limit system access to
the types of transactions
and functions authorized
users are permitted to
execute.
Role × access type
mapping in the people
inventory.
3.11.1 Periodically assess the
risk to organizational
operations and assets
resulting from the
operation of systems that
process, store, or
transmit CUI.
Risk assessment scope is
derived from the asset
inventory.
3.9.1 Screen individuals prior
to authorizing access to
systems containing CUI.
People inventory
identifies personnel
requiring screening.
3.9.2 Ensure that CUI is
protected during and
after personnel actions.
Offboarding process
mapping identifies de-
provisioning
requirements.
People, Technology, and Processes
51

2.3 External Service Provider
Management
External Service Providers (ESPs) represent one of the most consistent CMMC
assessment failure points for defense contractors. The problem is rarely intentional
— most organizations simply haven't mapped every cloud service, SaaS
subscription, and managed service relationship against the question: does this
system touch CUI, or does it support a security function that protects CUI? If the
answer to either is yes, that service is an ESP and must be inventoried, assessed,
and governed.
The CMMC Final Rule (32 CFR Part 170) establishes specific requirements for
ESPs before an organization can achieve certification. Cloud Service Providers
handling CUI must meet FedRAMP Moderate or equivalent. Managed Service
Providers with privileged access to the environment may require their own CMMC
certification. Software accessed from within the CUI boundary must be assessed for
CUI exposure. These are not optional controls — assessors will ask for an ESP
inventory, contractual flow-downs, and documented posture for every material
third-party service in the environment.
2.3.1 ESP Categories
The CMMC framework defines three categories of ESP that an Organization
Seeking Certification (OSC) must account for:
ESP Type Definition CMMC
Requirement Examples
Cloud Service
Provider (CSP)
Hosts or processes
CUI in a cloud
environment
Must meet
FedRAMP
Moderate
Authorized or
equivalent
M365 GCC High,
Azure Government,
AWS GovCloud
Managed Service
Provider (MSP)
Provides IT
services within or
connected to the
OSC environment
If privileged access
to CUI systems
exists, MSP is in
scope; may need
own CMMC
certification
IT support vendors,
NOC/SOC
providers, co-
managed IT firms
SaaS / Software Software-as-a- Must be assessed DocuSign,
Securing Microsoft 365 in GCC High | 2026.04.30
52

ESP Type Definition CMMC
Requirement Examples
ESP service accessed
from within the
CUI environment
for CUI exposure
and security
posture
Salesforce, Deltek,
GitHub
The distinction between categories matters because the assessment obligations
differ. A CSP requires FedRAMP verification. An MSP requires a contractual flow-
down and access control review. A SaaS tool may require either, depending on
whether CUI is stored or transmitted through it.
2.3.2 FedRAMP Moderate Equivalency
FedRAMP Moderate is based on the NIST SP 800-53 Moderate baseline — 325
security controls covering confidentiality, integrity, and availability requirements
appropriate for systems handling sensitive federal data. CMMC Level 2 requires
that any CSP handling CUI must meet FedRAMP Moderate Authorized status or
demonstrate equivalency.
"Equivalency" is not self-declared. A CSP claiming equivalency must demonstrate
documented controls mapped to the FedRAMP Moderate baseline, a third-party
security assessment, and a continuous monitoring program. In practice, most CSPs
used in DIB environments either hold FedRAMP authorization or do not — there is
limited middle ground. If a CSP cannot point to a FedRAMP authorization package
or a comparable third-party assessment, treat it as non-compliant for CUI handling.
How to verify FedRAMP status: The FedRAMP Marketplace at
marketplace.fedramp.gov is the authoritative source. Filter by "Authorized" status.
"In Process" does not satisfy the CMMC requirement.
ENVIRONMENT: GCC HIGH
Microsoft 365 GCC High is FedRAMP High Authorized — it exceeds the
Moderate baseline requirement. Azure Government is also FedRAMP High
authorized. Both are appropriate platforms for CUI handling under CMMC
Level 2.
External Service Provider Management
53

One important caveat: not all M365 services share the same authorization
boundary. The core workloads (Exchange Online, SharePoint Online, Teams,
OneDrive for Business) are covered under the M365 GCC High authorization.
Some third-party add-ins, Power Platform connectors, and preview features
may not be. Before enabling a new M365 service or connector in a GCC High
tenant, verify it falls within the authorization boundary documented in the
M365 GCC High FedRAMP System Security Plan.
The FedRAMP authorization for M365 GCC High and Azure Government
can be viewed in the FedRAMP Marketplace under Microsoft as the CSP.
Authorization packages are available to agencies and their contractors via
FedRAMP's secure repository.
ENVIRONMENT: COMMERCIAL
Commercial Microsoft 365 (non-GCC) is FedRAMP Moderate authorized for
specific plans — primarily E3 and E5 — under a shared responsibility model.
The authorization covers the platform infrastructure and core workloads, but
the tenant configuration and data handling responsibilities fall on the
customer.
For NIST SP 800-171 compliance using commercial M365, verify that your
specific subscription plan is covered by the current FedRAMP authorization,
that your tenant is configured to meet the relevant NIST 800-171 controls, and
that you have reviewed the Microsoft Customer Responsibility Matrix for the
applicable services. Commercial M365 does not provide the same boundary
isolation as GCC High — data residency, personnel screening, and
government-only logical separation are not guaranteed.
2.3.3 Building the ESP Inventory
An ESP inventory is not a one-time exercise. It must be maintained as a living
document and referenced in the System Security Plan (SSP). Build the initial
inventory using the following process:
Securing Microsoft 365 in GCC High | 2026.04.30
54

1. Start with the data flow diagram. Every external service that appears in
the data flow (Chapter 1) is a candidate ESP. If CUI flows to it, through it,
or it provides a service that protects CUI, add it to the inventory.
2. Interview business units. Ask: what cloud tools do you use for work?
What do you log into that isn't on the domain? What SaaS tools do you use
for proposals, contracts, engineering, or project management? Business
units routinely use tools that IT has never reviewed.
3. Review network egress logs and DNS. Shadow IT is real in every
organization. Review firewall egress logs and DNS query logs for
destinations that are not part of the authorized cloud environment.
Recurring SaaS hostnames (e.g., *.slack.com, *.notion.so, *.dropbo
x.com) indicate tools that must be assessed or blocked.
4. Pull the Entra ID Enterprise Application list. Authorized OAuth
applications registered in Entra ID represent SaaS tools that users have
connected to their M365 identity. Review the full list for applications with
access to mail, files, or calendar data — these have a CUI exposure path.
5. Interview the IT team. Identify every SaaS subscription the organization
pays for. Finance or procurement may have a more complete list than IT,
particularly for department-level software purchases.
Once the initial list is compiled, document each ESP in a structured inventory table.
The minimum columns are:
ESP Name Service
Type
CUI
Exposure
FedRAMP
Status
Contractu
al CUI
Handling
Risk
Dispositio
n
(provider
name)
CSP / MSP
/ SaaS
Direct /
Indirect /
None
Authorized
/ In Process
/ None
Yes / No /
Pending
Accept /
Mitigate /
Eliminate
The "Risk Disposition" column drives action. ESPs with direct CUI exposure and
no FedRAMP authorization must either be replaced with compliant alternatives or
have CUI removed from the workflow before assessment.
External Service Provider Management
55

2.3.4 Common ESP Scenarios
The following table covers ESP types that appear in most DIB environments, with
assessment guidance for each:
ESP CUI Exposure
Risk
Acceptable
Posture Notes
Microsoft 365
GCC High
Direct — primary
CUI storage and
communication
FedRAMP High
Authorized
Primary CUI
platform; verify
specific service
coverage
Azure
Government
Infrastructure —
session hosts,
storage, VMs
FedRAMP High
Authorized
Used for AVD
session hosts and
supplemental
storage
Deltek Costpoint
(cloud)
Indirect — contract
financials and labor
data
Verify FedRAMP
or third-party
equivalent
ERP systems often
contain contract
data with CUI
elements; confirm
authorization scope
DocuSign Potential —
contracts may carry
CUI markings
FedRAMP
Moderate
Authorized
(Government Cloud
plan)
Limit use to non-
CUI signature
workflows or
confirm
Government Cloud
plan is in use
Zoom High if used for
CUI discussions
Not authorized for
CUI
See warning below
Slack High if CUI is
shared in channels
Not FedRAMP
Moderate
authorized for CUI
See warning below
GitHub
(commercial)
High if source code
is CUI or export-
controlled
Use GitHub
Enterprise
GovCloud
Commercial
GitHub does not
meet FedRAMP
Moderate; ITAR-
controlled source
code must not be
stored there
Securing Microsoft 365 in GCC High | 2026.04.30
56

ESP CUI Exposure
Risk
Acceptable
Posture Notes
Salesforce
Government
Cloud
Indirect — CRM
with contract and
customer data
FedRAMP
Moderate
Authorized
(Government Cloud
plan)
Verify the
Government Cloud
plan is in use, not
commercial
Salesforce
ZOOM AND SLACK ARE NOT AUTHORIZED FOR CUI
Neither Zoom (standard or business plans) nor Slack (standard plans) are
FedRAMP Moderate authorized for CUI handling. If personnel are using
these tools to discuss, share, or review CUI — including contract
deliverables, technical data, or export-controlled information — the
organization has an active compliance gap.
The mitigation is straightforward: Microsoft Teams in the GCC High tenant
is the authorized alternative for both voice/video conferencing and
persistent messaging. Teams meets the FedRAMP High authorization
boundary. Block Zoom and Slack at the network layer for devices within
the CUI boundary, and enforce Teams as the only approved communication
platform for CUI-related work.
2.3.5 MSP Assessment Requirements
Managed Service Providers with privileged access to your CUI environment
represent a significant and often underestimated risk. Privileged access means
administrative rights — specifically the ability to read, modify, or delete CUI-
related configurations, data, or security controls. Examples include: Global
Administrator or Security Administrator access to the M365 GCC High tenant,
administrative access to Entra ID, and remote management access to CUI
endpoints.
An MSP with this level of access is, for CMMC purposes, operating within the CUI
boundary. Their personnel, processes, and tooling are in scope for assessment.
CMMC certification requirement for MSPs: Under the CMMC Final Rule,
External Service Provider Management
57

MSPs providing managed security services to an OSC may be required to hold their
own CMMC Level 2 certification. This requirement is most clearly triggered when
the MSP operates as a Managed Security Service Provider (MSSP) or performs
security-relevant functions (monitoring, incident response, vulnerability
management) on the OSC's behalf. Confirm the current requirement with your
C3PAO during scoping — the boundary between "in scope" and "out of scope" for
MSP certification has evolved through rulemaking.
Contractual flow-down requirements: DFARS 252.204-7012 (Safeguarding
Covered Defense Information) must flow down to subcontractors and service
providers that handle covered defense information. This includes MSPs. The flow-
down must be contractual — verbal agreements are not sufficient. At minimum, the
MSP contract must include:
• A definition of CUI and covered defense information as used in the
engagement
• An obligation for the MSP to comply with DFARS 7012 requirements
• Incident notification obligations (72-hour reporting requirement to DoD)
• Rights for the OSC to audit the MSP's compliance posture
Practical minimum requirements for MSPs that do not yet hold CMMC
certification:
• Written CUI handling procedures specific to the OSC engagement
• Documented access control policy covering the OSC environment
(including MFA enforcement and privileged access management)
• Background screening policy for personnel with access to the CUI
environment
• Incident notification SLA of 72 hours or less, consistent with DFARS 7012
• Annual review of access rights and security controls
Document all MSP relationships in the SSP, including the access scope, contractual
protections in place, and the MSP's assessed compliance posture.
Securing Microsoft 365 in GCC High | 2026.04.30
58

2.3.6 External Service Providers — Compliance
Control Mapping
ENVIRONMENT: GCC HIGH
The following CMMC Level 2 practices apply directly to ESP management:
CMMC Practice Requirement ESP Management
Artifact
CA.L2-3.12.1 Periodically assess the
security controls in
organizational systems to
determine if the controls
are effective
ESP assessments
documented and dated;
FedRAMP verification
records retained
CA.L2-3.12.4 Develop, document, and
periodically update
system security plans
ESP inventory included
in the SSP; external
systems section
completed
SR.L2-3.17.1 Establish and maintain a
supply chain risk
management plan
ESP risk assessment
covering CUI exposure,
FedRAMP status, and
contractual controls
SR.L2-3.17.2 Develop a plan for
managing supply chain
risks associated with the
research and
development, design,
manufacturing,
acquisition, delivery,
integration, operations
and disposal of systems,
system components, or
system services
Contractual CUI
handling clauses in all
ESP agreements;
DFARS 7012 flow-down
verified
Assessors reviewing these practices will expect to see: a current ESP
inventory, evidence of FedRAMP verification (screenshots or URLs from
marketplace.fedramp.gov), signed contracts with CUI flow-down language,
and documented risk dispositions for all material ESPs.
External Service Provider Management
59

ENVIRONMENT: COMMERCIAL
For organizations using commercial M365 and pursuing NIST SP 800-171
Rev. 3 compliance, the relevant controls are:
NIST 800-171 Rev. 3
Control Requirement ESP Management
Artifact
3.17.1 Establish a supply chain
risk management
program
ESP inventory with risk
assessment; documented
decision rationale for
each ESP
3.17.2 Assess the risks to
organizational operations
and assets from supply
chain issues
Formal risk assessment
for each ESP with CUI
exposure; FedRAMP or
equivalent verification
3.12.4 Develop, document, and
periodically update
system security plans
that describe system
boundaries, system
environments of
operation, how security
requirements are
implemented, and the
relationships with or
connections to other
systems
SSP external systems
section documents all
ESPs, access scope, and
data flows
In addition, the NIST SP 800-161 (Supply Chain Risk Management Practices)
publication provides detailed implementation guidance for the 3.17.x controls
and is referenced by NIST 800-171 assessors.
2.4 Contractual Ingestion & LOB
Strategy
CMMC compliance obligations do not begin at the time of an assessment — they
begin at contract award. The moment a contract containing DFARS 252.204-7012
Securing Microsoft 365 in GCC High | 2026.04.30
60

is executed, the organization is legally bound to protect Covered Defense
Information (CDI) under the requirements of NIST SP 800-171. That obligation
exists regardless of whether the organization has completed a CMMC assessment,
updated its System Security Plan, or even identified which systems will touch the
new CUI. The assessment merely verifies what the contract already requires.
This creates a business process problem that is predominantly organizational rather
than technical. A contract is awarded to a program or business development team.
The CUI handling obligation that comes with it is owned by IT and security.
Without a formal contract intake process that connects these two functions, new
awards silently expand the CUI scope, add systems to the assessment boundary, and
create potential compliance gaps from day one. Organizations that treat CMMC as a
one-time project rather than an ongoing contract management discipline accumulate
risk with every new award.
2.4.1 DFARS 252.204-7012 — The Triggering Clause
DFARS 252.204-7012, formally titled Safeguarding Covered Defense Information
and Cyber Incident Reporting, is the primary contractual mechanism through which
DoD imposes CUI protection requirements on defense contractors. When this
clause appears in a contract, the contractor is obligated to implement adequate
security across all systems that process, store, or transmit Covered Defense
Information — including email, file shares, collaboration platforms, and any cloud
services.
The clause is broad. It does not require that the prime contractor handle classified
information. CDI includes Controlled Technical Information (CTI), export-
controlled data, and any information that meets the definition of CUI under the
National Archives CUI Registry. It applies at the time of award, not at the time of
assessment.
2.4.1.1 Key DFARS 7012 Obligations
Obligation Requirement Timeline
Adequate security Implement all controls in
NIST SP 800-171
At time of award
Cyber incident reporting Report to DoD via
dibnet.dod.mil
Within 72 hours of
discovery
Media preservation Preserve images of
compromised systems and
90 days from incident
Contractual Ingestion & LOB Strategy
61

Obligation Requirement Timeline
relevant data
Cloud service use Use only cloud services
meeting FedRAMP
Moderate equivalency
At time of award
Subcontractor flow-down Flow 7012 to all
subcontractors that will
handle CDI
At subcontract award
The 72-hour cyber incident reporting requirement is operationally significant. It
requires that the organization have a documented incident response process capable
of identifying an incident, scoping the affected CDI, and submitting a report to DoD
— all within three days. This is not achievable without pre-existing detection
capabilities, a clear process owner, and pre-registered access to dibnet.dod.mil.
The cloud service requirement has direct platform implications. Any cloud service
used to process, store, or transmit CDI must meet FedRAMP Moderate
equivalency. Microsoft 365 GCC High satisfies this requirement. Standard
commercial Microsoft 365 (E3/E5 commercial tenant) does not meet this bar for
DoD CUI without additional compensating controls and documented risk
acceptance.
2.4.2 Identifying CMMC-Triggering Contracts
Not every DoD contract triggers a CMMC obligation. The obligation attaches when
a contract involves CUI — specifically when the contract includes DFARS
252.204-7012 or, for newer solicitations, DFARS 252.204-7021 (the CMMC clause
itself).
Starting in FY2025, DoD began including DFARS 252.204-7021 in solicitations for
contracts requiring CMMC Level 2 certification. This clause goes further than
7012: it requires the contractor to have achieved a CMMC Level 2 certification
(issued by a C3PAO) at the time of contract award, not merely self-attest to NIST
SP 800-171 compliance via SPRS. Organizations that currently self-attest should
identify contracts that include 7021 and treat them as driving a certification
requirement rather than a self-assessment.
Securing Microsoft 365 in GCC High | 2026.04.30
62

2.4.2.1 CUI Categories Common in the DIB
CUI Category Abbreviation Common Trigger
Controlled Technical
Information
CTI Engineering drawings,
specifications, test results
Export Controlled EXPT ITAR/EAR-controlled
data, hardware/software
designs
Contractor Bid or Proposal
Information
CBPI Bid packages, pricing,
teaming agreements
For Official Use Only FOUO Program documentation,
government
correspondence
Privacy / Personally
Identifiable Information
PII Personnel records,
background check data
2.4.2.2 Contract Review Checklist
Use this checklist when a new contract award or modification is received:
• Does the contract include DFARS 252.204-7012?
• Does the contract include DFARS 252.204-7021 (CMMC clause)?
• Does the Statement of Work reference CUI, CDI, CTI, or ITAR/EAR-
controlled information?
• Does the contract include government-furnished information (GFI) or
government-furnished equipment (GFE)?
• Does the contract require access to government networks, systems, or
portals?
• Does the contract involve export-controlled technology, software, or
hardware?
• Will performance of the contract require sharing information with
subcontractors?
A "yes" to any of these questions should trigger the full contract intake process
described in the next section.
Contractual Ingestion & LOB Strategy
63

2.4.3 Contract Intake Process
2.4.3.1 The Business Process Gap
The organizational dynamic at most defense contractors works against compliance.
Business development or program management receives a contract award. The
award notice goes into a contracts management system. The IT and security team
— who own the assessment boundary, the SSP, and the CMMC compliance posture
— may never see the contract unless there is a formal intake process that connects
the two functions.
This gap produces predictable failures: new systems stand up to support a contract
before they are evaluated for CUI scope; CUI arrives via email before the data flow
diagram is updated; subcontractors receive CDI before any flow-down review
occurs. By the time the compliance team becomes aware, the boundary has already
expanded and the exposure has occurred.
A formal contract intake workflow closes this gap. It does not need to be elaborate
— it needs to be mandatory.
2.4.3.2 Intake Workflow
Step 1  Contract award or modification received
→ Contracts team reviews for DFARS 252.204-7012 and 252.204-7021
Step 2  If 7012 or 7021 is present
→ Security / IT team notified within 5 business days of award
Step 3  Security intake review
→ What CUI categories will be received?
→ From whom will CUI be received (contracting officer, subcontractor
s, GFI)?
→ Via what mechanism (SAFE, encrypted email, portal, physical media)?
→ What systems will process or store the CUI?
Step 4  Data flow update
→ Add the new CUI flow to the SSP data flow diagram
→ Label source, destination, data type, and transport mechanism
Step 5  Asset scope review
→ Are any new endpoints, servers, or cloud workloads entering scope?
→ If yes, add to the asset inventory and apply baseline configuration
Step 6  Subcontractor review
→ Will any CUI be shared with subcontractors?
→ If yes, initiate subcontractor flow-down process (see below)
Step 7  SSP update
→ Document the new contract, CUI categories received, and any boundar
y changes
→ Update the SSP revision history
→ Notify the ISSO / compliance lead
Securing Microsoft 365 in GCC High | 2026.04.30
64

This workflow should be documented as a written procedure and referenced in the
SSP under the Configuration Management and Planning control families. Assessors
will ask how scope expansions are detected and managed — a documented intake
process with evidence of execution (intake tickets, notification emails, SSP revision
log) is the expected answer.
2.4.4 Subcontractor Flow-Down
DFARS 252.204-7012 places an affirmative obligation on prime contractors: if CUI
or CDI will be shared with a subcontractor, the prime must flow the clause down to
the subcontract as a binding obligation. The subcontractor must then meet the same
NIST SP 800-171 requirements as the prime. The prime is responsible for this
requirement — a subcontractor's non-compliance does not absolve the prime during
a DoD assessment or incident investigation.
As CMMC certification requirements expand, some subcontracts may require that
the sub hold a CMMC Level 2 certification rather than self-attest. Primes should
review subcontract terms proactively, particularly where DFARS 252.204-7021 is
present in the prime contract.
2.4.4.1 Subcontractor Management Checklist
• Include DFARS 252.204-7012 language verbatim in all subcontracts
where CDI will be shared
• Require each sub to provide their current SPRS score or CMMC Level
2 certification letter before CUI is shared
• Limit CUI shared with subs to the minimum necessary for performance
(need-to-know)
• Document the approved data sharing mechanism and prohibit sharing
outside that mechanism
• Review sub compliance posture at least annually, or upon contract
renewal
2.4.4.2 Approved Sharing Mechanisms
ENVIRONMENT: GCC HIGH
Sharing CUI with subcontractors who are not on GCC High requires
Contractual Ingestion & LOB Strategy
65

deliberate handling. A sub operating on a commercial Microsoft 365 tenant
does not meet the FedRAMP Moderate equivalency bar for DoD CUI. The
following mechanisms are approved for sharing CDI with external parties:
Mechanism Use Case Notes
SAFE (DoD Safe Access
File Exchange)
File transfer of CDI to
external parties
Free, DoD-hosted, does
not require sub to be on
GCC High
Encrypted email with
MIP sensitivity labels
Low-volume document
exchange
Requires recipient
capability to decrypt;
confirm before use
Entra External Identities
(B2B guest)
Structured collaboration
on GCC High SharePoint
Guest user governed by
your Conditional Access
and DLP policies
Physical media
(encrypted, tracked)
Large file transfers or
offline environments
Chain of custody
required; encryption
mandatory
Do not share CUI via consumer OneDrive, consumer Dropbox, unencrypted
email, or cross-tenant sharing to a standard commercial Microsoft 365 tenant.
These channels do not meet the DFARS cloud service equivalency
requirement and produce a material compliance gap.
ENVIRONMENT: COMMERCIAL
For NIST SP 800-171-scoped contracts that do not involve DoD CUI (e.g.,
regulated contracts with civilian agencies or commercial primes), the flow-
down obligation may come from the prime's contract terms rather than
DFARS directly. The substantive requirements are the same: document the
obligation in the subcontract, limit the scope of information shared, and
require sub compliance attestation.
Securing Microsoft 365 in GCC High | 2026.04.30
66

Mechanism Use Case Notes
Encrypted email Low-volume document
exchange
Use S/MIME or a portal-
based encrypted mail
service
SFTP / secure file
transfer
Structured file delivery Confirm server meets
applicable security
baseline
Managed file transfer
portal
High-volume or
recurring exchange
Verify FedRAMP
authorization or
equivalent if cloud-
hosted
Commercial
collaboration platform
(scoped)
Ongoing project
collaboration
Ensure the platform is
scoped to regulated users
only
Regardless of mechanism, document it. The SSP data flow diagram should
show where CUI leaves the boundary and under what controls.
2.4.5 Line of Business CUI Recognition Training
Technical controls protect CUI only if the people handling it recognize that it is
CUI. An employee who does not know that a set of engineering drawings received
from a contracting officer constitutes CTI will not apply a sensitivity label, will not
know to restrict forwarding, and may share the file through an unapproved channel.
The technical architecture cannot compensate for unrecognized CUI.
2.4.5.1 What CUI Looks Like
CUI is marked using the standard format defined by the National Archives CUI
Registry:
• CUI— baseline marking, no additional category specified
• CUI//SP-CTI— Controlled Technical Information (specified CUI)
• CUI//SP-EXPT— Export Controlled (specified CUI)
• CUI//FOUO— For Official Use Only (basic CUI)
Contractual Ingestion & LOB Strategy
67

Markings appear in document headers and footers, in email subject lines (when the
sender follows marking requirements), and in filename prefixes on some programs.
Personnel should be trained to recognize these patterns.
2.4.5.2 Unmarked CUI
A document does not need a marking to be CUI. The obligation attaches based on
the nature of the information and the contract context, not the presence of a label.
The applicable test is:
Would a reasonable government official expect this information to be
protected based on its content and the circumstances under which it was
shared?
If the answer is yes, treat it as CUI regardless of whether a marking is present.
Technical drawings received from a program office under a CDI-bearing contract
are CTI whether or not they carry a banner. Bid and proposal information generated
in support of a government contract is CBPI whether or not the document is labeled.
Employees should be trained to apply this "reasonable expectation" test when they
receive information that could be government-related, and to contact the
organization's CUI Program Manager (or designated security point of contact) when
they receive information they are uncertain how to classify.
2.4.5.3 Training Requirements
TRAINING IS NOT OPTIONAL
CMMC requires that all personnel who handle CUI receive CUI awareness
training. Personnel who work with CUI in a specific role (program
manager, system administrator, contracts officer) must also receive role-
based training. Undocumented training is treated as no training by
assessors. Maintain training completion records tied to individual
employees, contract scope, and date of completion.
Training records should capture:
• Employee name and role
• Training course name and version
• Date of completion
Securing Microsoft 365 in GCC High | 2026.04.30
68

• CUI categories covered
• Whether training was role-based or general awareness
Records must be retained and producible for assessors. A spreadsheet or LMS
export is acceptable. Verbal attestation is not.
2.4.6 Contract Flow-Downs — Compliance Control
Mapping
ENVIRONMENT: GCC HIGH
The following CMMC Level 2 practices are directly addressed by a mature
contract intake and CUI recognition program.
CMMC Practice Domain Requirement Contract Intake
Artifact
AT.L2-3.2.1 Awareness and
Training
Provide
awareness
training on
organizational
policies, threats,
and CUI handling
Training
completion
records by
employee and
contract
AT.L2-3.2.2 Awareness and
Training
Ensure personnel
with CUI access
receive role-based
training
Role-based
training records
for contracts, IT,
and program staff
IR.L2-3.6.1 Incident Response Establish an
operational
incident-handling
capability
Documented
72-hour reporting
process;
dibnet.dod.mil
registration
IR.L2-3.6.2 Incident Response Track, document,
and report
incidents
Incident log;
DFARS 7012
reporting
procedure
Contractual Ingestion & LOB Strategy
69

CMMC Practice Domain Requirement Contract Intake
Artifact
CM.L2-3.4.2 Configuration
Management
Establish and
maintain baseline
configurations
New systems
added to baseline
upon contract
scope expansion
CA.L2-3.12.4 Security
Assessment
Develop,
document, and
periodically
update SSPs
SSP updated with
each new CUI
contract; revision
history
maintained
MP.L2-3.8.1 Media Protection Protect system
media containing
CUI
Approved sharing
mechanisms
documented;
unapproved
channels
prohibited
SC.L2-3.13.11 System and
Communications
Employ FIPS-
validated
cryptography
Encryption
requirement
enforced for all
external CUI
transfer
mechanisms
ENVIRONMENT: COMMERCIAL
For organizations operating under NIST SP 800-171 Rev. 3 without a CMMC
certification requirement, the same contract intake and training practices
satisfy the following controls.
NIST Control Family Requirement
3.2.1 Awareness and Training Ensure personnel are
aware of CUI policies
and threats
Securing Microsoft 365 in GCC High | 2026.04.30
70