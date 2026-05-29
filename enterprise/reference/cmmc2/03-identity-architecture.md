# 3. Identity Architecture

**CMMC2 Documentation** | Version 2026.04.30

**Pages:** 71-341

---

## Table of Contents

- 3.1 Sovereign Cloud Considerations
  - 3.1.1 Microsoft's Cloud Instances
  - 3.1.3 Azure Government Secret and Top Secret
  - 3.1.5 21Vianet — China Operations
  - 3.1.6 Purchasing Microsoft 365 Licenses
- 3.2 Identity Foundation
  - 3.2.1 Cloud First Strategy
  - 3.2.2 Phishing-Resistant Authentication
  - 3.2.9 Directory Synchronization
  - 3.2.11 Access Governance
  - 3.3.1 Policy Catalog
  - 3.3.2 Pillar 1: Identity Protection
  - 3.3.3 Pillar 2: Risk Reduction
  - 3.3.4 Pillar 3: Device Compliance

---

NIST Control Family Requirement
3.2.2 Awareness and Training Provide role-based
training for personnel
with security
responsibilities
3.6.1 Incident Response Establish an incident-
handling capability
including reporting
3.6.2 Incident Response Track, document, and
report incidents to
appropriate officials
3.4.2 Configuration
Management
Establish and maintain
baseline configurations;
update upon scope
change
3.12.4 Assessment,
Authorization,
Maintenance
Develop and maintain a
system security plan
3.8.1 Media Protection Protect system media
containing CUI during
transport and disposal
3. Identity Architecture
3.1 Sovereign Cloud Considerations
Microsoft operates multiple physically and logically separated cloud environments.
Choosing the right one is not just a purchasing decision — it determines which
compliance authorizations apply, what data residency guarantees exist, and which
Microsoft 365 feature surface is available.
Identity Architecture
71

3.1.1 Microsoft's Cloud Instances
Instance Operated By Intended For Data
Residency
Compliance
Authorizatio
ns
Commercial
(Public)
Microsoft Any
commercial
organization,
global
Global
(configurable)
ISO 27001,
SOC 2,
FedRAMP
Moderate
GCC
(Government
Community
Cloud)
Microsoft US Federal,
State/Local,
Tribal, CUI
holders
US datacenters FedRAMP
Moderate,
CJIS, ITAR
GCC High Microsoft DoD DIB
contractors,
ITAR/EAR
holders, CUI
requiring IL4/
IL5
US
Government
datacenters
FedRAMP
High, DoD
IL4/IL5,
CMMC
DoD Microsoft US
Department of
Defense only
US
Government
datacenters
(DoD
dedicated)
FedRAMP
High, DoD
IL4/IL5/IL6
Azure
Government
Secret
Microsoft US Federal
agencies with
Secret
workloads
Classified
datacenters
DoD IL5+
(approximate
equivalent)
Azure
Government
Top Secret
Microsoft US
Intelligence
Community
Classified
datacenters
DoD IL6
Microsoft 365
operated by
21Vianet
21Vianet
(China)
Organizations
operating in
mainland
China
China
datacenters
Chinese
regulatory
requirements
Securing Microsoft 365 in GCC High | 2026.04.30
72

3.1.2 GCC vs GCC High — A Critical Distinction
GCC is not a separate cloud instance. It uses the commercial cloud infrastructure
with tenant-level screening controls applied. GCC High is a separate sovereign
cloud with its own endpoints, authentication infrastructure, and compliance
boundary.
GCC GCC High
Cloud infrastructure Commercial (shared) Separate sovereign cloud
Authentication endpoint login.microsoftonline.com login.microsoftonline.us
Portal portal.office.com portal.office365.us
Feature parity with
Commercial
High Moderate (lags by 6–18
months for some features)
CMMC compliance Level 1 only Level 2 and above
ITAR/EAR data Not recommended Yes
CUI requiring IL4 Borderline Yes
3.1.3 Azure Government Secret and Top Secret
These clouds exist for classified workloads and are not generally accessible to DIB
contractors. CMMC assessments operate at the GCC High boundary. Organizations
handling classified information use separate procurement pathways through DoD
and IC acquisition channels — not through commercial Microsoft sales.
3.1.4 Microsoft Cloud for Sovereignty (EU and
International)
For EU and international regulated industries, Microsoft Cloud for Sovereignty
provides data residency guarantees and transparency controls within the commercial
cloud boundary. It is not a separate cloud instance but a policy and tooling layer.
Relevant for multinational organizations but outside the scope of this guide.
Sovereign Cloud Considerations
73

3.1.5 21Vianet — China Operations
Microsoft 365 in mainland China is operated by Shanghai Blue Cloud Technology
Co., Ltd. (a subsidiary of 21Vianet), not Microsoft directly. This arrangement is
required under Chinese law covering cybersecurity and data localization.
The service is functionally similar to commercial M365 but uses a completely
separate identity tenant, separate URLs (partner.outlook.cn, portal.partne
r.microsoftonline.cn), and Chinese compliance frameworks. US-based
organizations with China operations require a separate 21Vianet tenant — these
cannot federate with a GCC High tenant.
Data in the 21Vianet instance is subject to Chinese law and government access
requests, which is incompatible with CUI and ITAR data handling requirements.
3.1.6 Purchasing Microsoft 365 Licenses
ENVIRONMENT: GCC HIGH
3.1.6.1 Purchasing Microsoft 365 Government (GCC High)
Step 1: Establish Eligibility
Organizations must demonstrate one of the following to access GCC High:
• Active DoD contract with CUI or ITAR/EAR obligations
• ITAR-controlled technical data
• CUI requiring DoD Impact Level 4 or 5 protection
• Other federal agency designation
Obtain a CAGE Code (Commercial and Government Entity Code) from the
SAM.gov system. The CAGE code is the primary identifier used to verify
DoD contractor status and is required before engaging any government
licensing channel.
Step 2: Validate Eligibility with Microsoft
Submit an eligibility validation form at the Microsoft 365 Government
eligibility page. Microsoft reviews the submission and, upon approval, grants
Securing Microsoft 365 in GCC High | 2026.04.30
74

access to the government licensing portal. This process typically takes 5–10
business days.
Step 3: Purchase Through an Authorized Channel
GCC High licenses are not available through the commercial Microsoft 365
admin center. Purchase through one of three authorized channels:
Channel Seat Threshold Examples
AOS-G (Authorized
Online Services –
Government)
Under 500 seats Carahsoft, Accenture
Federal Services,
ManTech, GDIT,
Connection, SHI
Government Solutions
LSP (Large Solution
Provider)
500+ seats CDW-G, Insight Direct,
PC Connection
CSP (Cloud Solution
Provider)
Any size Available through
Microsoft Partner Center
government channel
AOS-G partners specialize in sub-500-seat government cloud deployments.
They handle the eligibility paperwork, provisioning the initial GCC High
tenant, and ongoing license management. For most DIB contractors (typically
10–500 users), an AOS-G partner is the correct channel.
Step 4: Tenant Provisioning
A new GCC High tenant is provisioned separately from any existing
commercial M365 tenant. Existing commercial tenant data cannot be migrated
directly — a migration project is required. Plan for a minimum 90-day
migration timeline for organizations moving from commercial M365 to GCC
High.
3.1.6.2 License Tiers: G3 vs. G5 Decision Guide
The choice between G3 and G5 is not about "more compliance"—it is a
choice between manual labor and automated enforcement. Both paths are
Sovereign Cloud Considerations
75

100% compliant for CMMC Level 2, but they have vastly different
operational costs.
Strategy Recommended For Primary Advantage
Microsoft 365 G3 Startups / Small Teams
(<50 users)
Lowest upfront cost.
High manual effort for
log exports and admin
gating.
G5 Security Add-on Growing DIB
Contractors
Best value. Adds PIM
(Privileged Access) and
Auto-labeling without
the full G5 price tag.
Microsoft 365 G5 Enterprise / High-
Volume CUI
Maximum automation.
Native 1-year log
retention and insider risk
detection.
Executive Recommendation: The "CRAWL-WALK-RUN" Path
1. CRAWL (The Start): Buy G3 for everyone. It gets you into GCC
High and establishes the boundary. Your IT team will have to
manually manage admin accounts and log exports.
2. WALK (The Pivot): Six months before your CMMC assessment,
upgrade your IT and Engineering staff to the G5 Security Add-on.
This protects your "high-risk" users with Phishing-Resistant MFA and
PIM (Just-in-Time access) which auditors love to see.
3. RUN (The Scale): Only move to Full G5 if you have a massive
amount of CUI and need the system to "Auto-Label" files for you to
Securing Microsoft 365 in GCC High | 2026.04.30
76

prevent human error.
DECISION SUPPORT
For a practice-by-practice mapping of exactly which G5 features
satisfy specific CMMC and NIST controls, see Appendix D:
Licensing & Compliance Matrix.
GCC High Feature Availability Note
Not all commercial M365 features are available in GCC High. Microsoft
publishes a GCC High feature availability matrix that is updated as features
reach the government cloud. When evaluating third-party integrations or new
Microsoft features, verify GCC High availability before committing to an
architecture that depends on them.
ENVIRONMENT: COMMERCIAL
3.1.6.3 Purchasing Commercial M365 E5
Commercial M365 licenses are available directly:
1. Microsoft 365 Admin Center (admin.microsoft.com) → Billing →
Purchase services — self-service for small organizations
2. Microsoft Volume Licensing (Microsoft Customer Agreement or
Enterprise Agreement) — for 250+ seats with annual commitment
pricing
3. CSP partner — for organizations that prefer managed billing and
support through a Microsoft partner
4. Direct from Microsoft account team — for large enterprise
agreements with custom terms
No eligibility validation is required. A credit card or PO is sufficient to
provision an M365 E5 tenant within minutes.
Sovereign Cloud Considerations
77

3.1.6.4 License Tiers: E3 vs. E5 Decision Guide
For commercial organizations aligning to NIST SP 800-171, the decision
center is around EDR capabilities and Identity Governance. Unlike the G3
license in GCC High, the Commercial E3 license does not include the full
Defender EDR suite (Plan 2).
Strategy Recommended For Primary Advantage
Microsoft 365 E3 Non-CUI Workloads Foundation for basic
security. Lacks full EDR
and automated identity
gating.
E5 Security Add-on NIST 800-171
Compliance
Adds full Defender EDR,
PIM, and Advanced
DLP. The "compliance
sweet spot."
Microsoft 365 E5 Full Digital Governance Maximum automation +
Audit Premium + Insider
Risk.
Executive Recommendation: The "Compliance First" Path
1. START (The Minimum): For NIST 800-171 alignment, E3 is
insufficient on its own because it lacks Plan 2 EDR and PIM. Start
with E3 + E5 Security Add-on for all users who touch sensitive data.
2. GROW (The Automation): Move to Full E5 only when the volume
of logs exceeds your ability to manually review them, or when you
need native Purview Audit Premium (1-year retention) to satisfy
specific contractual or legal requirements.
DECISION SUPPORT
For a detailed feature breakdown of Commercial E3 vs. E5, see
Appendix D: Licensing & Compliance Matrix.
Securing Microsoft 365 in GCC High | 2026.04.30
78

3.2 Identity Foundation
3.2.1 Cloud First Strategy
Identity and access management for Commercial and Government organizations has
decisively shifted to the cloud. While some scenarios require air-gapped networks
(unpatchable systems, combat systems, nuclear reactors, submarines), the vast
majority of scenarios benefit from the security, productivity, and return on
investment provided by cloud-based IAM. Microsoft Entra is the cloud-based IAM
that underpins Microsoft 365. Windows for Hello Business Cloud Kerberos Trust is
the most modern Windows Hello for Business deployment model.
3.2.1.1 Cloud-First Advantages
Security
On-prem Active Directory is under attack with modern tools and no longer
defensible with legacy tools. Microsoft Entra provides:
• Conditional Access to integrate and automate
◦ MFA and Password-less credentials
◦ Better signals to measure risk, based on Artificial Intelligence
◦ Modern password management
• Access Governance to ensure the right access, to the right resources, for
the right people, for the right duration
• Blast-radius reduction to contain risk of on-prem components to
compromise the cloud environment
These three articles recommend the move to Microsoft Entra:
• NSA Security Advisory (Dec 2020) recommends Azure Active Directory
as the Authoritative Identity Provider.
• https://aka.ms/protectm365 recommends against identity federation (in
response to SolarWinds).
• https://aka.ms/ad2azuread provides information on moving from AD to
fully cloud based IAM.
Identity Foundation
79

Productivity
Microsoft Entra automates and simplifies low latency, anywhere, anytime access
across the expanding digital estate:
• Single Sign On across any user and any app
• Better experience through self-service
• Automated lifecycle management for workforce and external accounts
• Improved performance through globally distributed, infinitely elastic cloud
infrastructure
Return on Investment
Microsoft Entra reduces costs through infrastructure simplification and vendor
consolidation:
• Reduction of complex and costly 3rd party products and integration
• Reduction of the cost of procuring and maintaining aging infrastructure
• Short time to value
3.2.1 Phishing-Resistant Authentication
The security goal is simple: eliminate password-based phishing as an attack
vector. How you get there depends on your environment—not every workplace can
use a camera, a fingerprint reader, or a USB port.
This section covers four phishing-resistant paths. All four authenticate against
Microsoft Entra ID in the cloud. All four satisfy phishing-resistant MFA at NIST
SP 800-63B AAL2 and are the strongly recommended approach for any
environment handling CUI or sensitive data.
If phishing-resistant authentication is not operationally feasible, Microsoft
Authenticator push notifications satisfy the baseline MFA requirement but are
susceptible to MFA fatigue (push bombing) and real-time adversary-in-the-middle
attacks. See the note at the bottom of the path selection table.
Securing Microsoft 365 in GCC High | 2026.04.30
80

ENVIRONMENT: GCC HIGH / CMMC
CMMC IA.L2-3.5.3 — Multi-Factor Authentication: Employ multi-factor
authentication for local and network access to privileged accounts and for
network access to non-privileged accounts. The four phishing-resistant paths
in this section each satisfy this control and are strongly recommended.
Standard Authenticator push notifications satisfy the baseline MFA
requirement in IA.L2-3.5.3 but are not phishing-resistant — C3PAOs will
scrutinize this choice and it should be documented and justified in your SSP.
• Satisfying CMMC IA.L2-3.5.3 MFA with Windows Hello for
Business
• Achieve NIST AAL2 with Microsoft Entra ID
ENVIRONMENT: COMMERCIAL / NIST
NIST SP 800-171 Rev. 3 3.5.3 — Multi-Factor Authentication: Use multi-
factor authentication for local and network access to privileged accounts and
for network access to non-privileged accounts. Phishing-resistant methods
exceed the baseline MFA requirement and provide protection against
credential phishing attacks that satisfy the MFA requirement with a stolen
OTP or push notification.
OMB M-22-09 (federal civilian agencies): Requires phishing-resistant MFA
for all agency staff, contractors, and partners. The four paths in this section
satisfy the M-22-09 phishing-resistant requirement.
• Achieve NIST AAL2 with Microsoft Entra ID
• OMB M-22-09: Phishing-Resistant MFA
3.2.1.1 Choosing the Right Path
Your Environment Recommended Path
Standard office: cameras, fingerprint
readers, and USB work fine
Path 1 — Windows Hello for Business
Identity Foundation
81

Your Environment Recommended Path
Standard office: phone-based auth
preferred (BYOD users, contractors, or
devices without TPM 2.0)
Path 2 — Microsoft Authenticator with
Passkey
Harsh environment; no PKI and no desire
to build one
Path 3 — FIDO2 NFC Security Keys
Pure AVD enclave: users have no
corporate local device; all work happens
through a remote session
Path 3 — FIDO2 NFC Security Keys
Harsh environment (oil mist, dust,
moisture): cameras and USB unreliable;
existing PKI
Path 4 — PIV Cards with Entra CBA
DoD supply chain contract specifically
requiring PIV/CAC
Path 4 — PIV Cards with Entra CBA
Phishing-resistant authentication not
operationally feasible (baseline MFA only
— see warning below)
Microsoft Authenticator — push
notifications
STANDARD PUSH NOTIFICATIONS ARE NOT PHISHING-RESISTANT
Microsoft Authenticator push notifications satisfy the baseline multi-factor
authentication requirement — a second factor is required — but are not
phishing-resistant. They are susceptible to MFA fatigue attacks (push
bombing) and real-time adversary-in-the-middle phishing, where an
attacker captures a valid session token after the user approves a fraudulent
push request.
For GCC High environments pursuing CMMC Level 2, phishing-resistant
MFA is the strongly recommended standard. Standard push is a conscious
trade-off: document the decision, the risk acceptance rationale, and
compensating controls (number matching, additional context, Conditional
Access sign-in frequency) in your System Security Plan.
The key insight: all four phishing-resistant paths terminate at Entra ID. You are
not choosing between "cloud" and "on-prem." You are choosing the authenticator
that fits your workforce.
Securing Microsoft 365 in GCC High | 2026.04.30
82

3.2.2 Path 1: Windows Hello for Business — The
Easy Button
Windows Hello for Business (WHfB) is the default recommendation for any
environment where standard hardware is usable. There is no PKI to manage, no
cards to issue, and no readers to deploy. A biometric gesture or PIN, backed by a
hardware TPM, replaces the password entirely.
WHFB SATISFIES MFA AT THE WINDOWS LOGON SCREEN
When a user signs in with WHfB (PIN or biometric), Windows performs a
cryptographic authentication against Entra ID and receives a Primary
Refresh Token (PRT) carrying a phishing-resistant MFA claim. That PRT
is silently reused by every app the user opens — including background
services like the Intune enrollment scheduled task on Hybrid Joined
machines.
This means WHfB is not simply a credential that leads to MFA — it is the
MFA event at sign-in. Clients with a compliance requirement for "phishing-
resistant MFA to the desktop" satisfy that requirement through WHfB
directly, with no additional authentication step required.
References: Is Windows Hello for Business MFA? · NIST SP 800-63B
§5.1.9 (Multi-Factor Cryptographic Device) · OMB M-22-09: Phishing-
Resistant MFA
3.2.2.1 Cloud Kerberos Trust Deployment Model
For cloud users, use fully Intune-managed machines configured with Windows
Hello for Business with Cloud Kerberos Trust. It offers the best balance of user
experience (fast login, seamless SSO) and IT overhead (no AD FS, no user
certificate management).
For pure on-premises users, while security baselines can be managed by Microsoft
Defender for Endpoint (MDE), MDE does not handle identity enrollment.
Deploying Windows Hello for Business for these users requires an On-Premises
deployment model (either Key Trust or Certificate Trust). Because they cannot
reach Entra ID, this forces you to build an AD FS farm to act as the device
Identity Foundation
83

registration authority and rely on Group Policy (GPO) to push the enrollment
policies.
While Key Trust is a viable fallback here, it is functionally deprecated in favor of
Cloud Kerberos Trust for modern deployments. Cert Trust should be avoided
entirely unless you are strictly forced by legacy non-Windows infrastructure (such
as older 802.1x RADIUS/NAC appliances or legacy VPN gateways that strictly
require X.509 client certificates).
3.2.2.2 Hardware Assumptions
Infrastructure: Windows Server 2016+ Domain Controllers (2019/2022
recommended).
Endpoints: Windows 11 Enterprise with TPM 2.0.
3.2.2.3 How Cloud Kerberos Trust SSO Works
• Smart Card (legacy): Client presents X.509 Cert → DC validates Cert →
DC issues Kerberos TGT.
• Cloud Kerberos Trust:
1. User logs in to Windows (biometric or PIN).
2. Windows authenticates to Entra ID and receives a Cloud TGT
(partial ticket).
3. Windows presents this Cloud TGT to the local Domain Controller.
4. The DC (using a local AzureADKerberoscomputer object)
validates it and issues a standard On-Prem TGT.
5. Result: The user opens \\server\sharejust like with a Smart
Card—but never touched a certificate.
3.2.2.4 WHfB Deployment Model Comparison
Feature
Cloud Kerberos
Trust
(Recommended)
Key Trust
(Fallback)
Cert Trust
(Avoid)
User Experience Best. Login is
instant.
Good. Initial setup
waits up to 30 min
for key sync.
Poor. Slow cert
validation; CRL
failures.
IT Overhead Lowest. No PKI on
endpoints. No AD
FS. 100% Intune.
Medium. PKI for
DCs. Key sync to
AD user objects.
Highest. NDES/
SCEP for every
device.
Securing Microsoft 365 in GCC High | 2026.04.30
84

Feature
Cloud Kerberos
Trust
(Recommended)
Key Trust
(Fallback)
Cert Trust
(Avoid)
Compliance
Posture
High. FIPS
140-validated.
Phishing-Resistant
MFA flag.
High. FIPS
140-validated.
High, but
complexity breeds
misconfiguration.
Network
Requirements
Light. Client →
Internet only. DC
stays intranet.
Heavy. DC →
Internet for CRL
checks.
Heavy. Client →
NDES (intranet).
3.2.2.5 Network & Firewall Impact
For Cloud Kerberos Trust, your Domain Controllers do not require outbound
Internet access.
• Client (user device): Port 443 to Entra ID.
• Domain Controller: Standard RPC/LDAP from the client. Does not talk to
Azure.
• Entra Connect Server: Port 443 to Entra ID to sync the AzureADKerbero
sobject one time.
The AzureADKerberoscomputer object is created in AD by Entra Connect. DCs
use this local object to validate cloud tickets, keeping them air-gapped from the
internet.
3.2.2.6 Checklist: Windows Hello for Business
1. Infrastructure: Verify DCs are Windows Server 2016+ (2022
recommended).
2. Policy: Enable Cloud Kerberos Trust via Intune policy or GPO.
3. PKI: Retain for privileged admins; deprecate for standard users.
3.2.3 Path 2: Microsoft Authenticator with Passkey
— BYOD and Soft-Token Environments
Microsoft Authenticator supports device-bound passkeys — FIDO2 credentials
stored in the Authenticator app on a user's iOS or Android phone. This is the
lowest-friction path after WHfB: most users already have Authenticator installed
Identity Foundation
85

for Entra MFA, and passkey registration is self-service through MySignIns. No
hardware to ship, no PKI, no card readers.
Passkeys in Authenticator are phishing-resistant by design: the credential is
cryptographically bound to the specific Entra tenant, so an authentication response
cannot be replayed against a spoofed sign-in page.
WHEN TO CHOOSE PATH 2 OVER PATH 1
Choose Authenticator passkeys when the user's primary access path is a
browser or a device without WHfB capability — such as personal BYOD
devices, contractor-issued machines, or any scenario where provisioning a
Windows Hello credential on the local device is not feasible. Users who
have WHfB provisioned on their corporate Windows device should
continue using WHfB (Path 1). Both methods can coexist on the same
Entra account.
3.2.3.1 Prerequisites
• Authenticator app: Microsoft Authenticator version 6.2406.7535 or later
on iOS 16+ or Android 9+.
• Entra license: No additional license beyond M365 E3/G3 or F3.
• Authentication Methods policy: Passkeys (FIDO2) enabled in Entra with
Microsoft Authenticator allowed.
3.2.3.2 Enable Passkeys in Entra
Navigate to Entra Admin Center → Protection → Authentication methods →
Passkeys (FIDO2).
Setting Value
Enable Yes
Target All users or a scoped group
Self-service setup Allowed
Key restrictions Disabled (allows all FIDO2
authenticators), or restrict to Microsoft
Securing Microsoft 365 in GCC High | 2026.04.30
86

Setting Value
Authenticator's AAGUID if Authenticator-
only is required
To restrict passkey registration to Microsoft Authenticator only — excluding
hardware FIDO2 keys from this policy — enable Key restrictions and add
Microsoft Authenticator's AAGUID. Microsoft publishes current AAGUID values
in the Entra passkeys documentation. Users can still sign in with hardware FIDO2
keys if those keys were registered separately under an unrestricted policy.
3.2.3.3 User Registration (Self-Service)
Users register through MySignIns. The experience is consistent across all Entra
tenants.
Step 1 — Open Security Info
Navigate to https://mysignins.microsoft.com/security-infoand sign in.
Step 2 — Add a passkey
Click + Add sign-in method → select Passkey in Microsoft Authenticator.
Step 3 — Complete the pairing
The browser displays a QR code or a direct link:
1. Open Microsoft Authenticator on the mobile device.
2. Tap the passkey prompt or scan the QR code.
3. Approve with biometric (Face ID, Touch ID, or device PIN) to confirm
identity.
4. The passkey is created and tied to the user's Entra account.
Step 4 — Name and confirm
Name the passkey descriptively (e.g., iPhone 15 - Authenticator). Verify it
appears in the Security Info list.
3.2.3.4 Sign-In Experience
At any Entra sign-in page:
Identity Foundation
87

1. Enter the username.
2. Select Sign in with passkey (or the passkey prompt appears automatically
in supported browsers).
3. A push notification appears in Microsoft Authenticator.
4. The user approves with biometric or device PIN.
5. Sign-in completes — phishing-resistant MFA satisfied.
The response is cryptographically bound to the exact sign-in challenge; it cannot be
reused or redirected.
3.2.3.5 Tradeoffs
Authenticator
Passkey (Path 2) WHfB (Path 1) FIDO2 Hardware
Key (Path 3)
Hardware
required
User's own phone Corporate
Windows device
with TPM 2.0
FIDO2 key
(YubiKey, etc.)
Provisioning Self-service via
MySignIns
Intune or GPO
policy
Self-service via
MySignIns
MFA at Windows
logon
No — cloud apps
and browser only
Yes — PRT from
Windows logon
carries MFA claim
No (unless
configured for
Windows sign-in
separately)
Works inside an
AVD session
Yes Not for
provisioning;
already-provisioned
WHfB works for
connecting to AVD
Yes
Phone dependency Yes — phone must No No
Securing Microsoft 365 in GCC High | 2026.04.30
88

Authenticator
Passkey (Path 2) WHfB (Path 1) FIDO2 Hardware
Key (Path 3)
be available
AUTHENTICATOR PASSKEYS DO NOT REPLACE WHFB FOR
WINDOWS LOGON
A passkey in Authenticator authenticates against cloud apps and browser
sign-ins — it does not replace the Windows logon credential. A user
signing in to a corporate Windows device with an Authenticator passkey
still logs in to Windows with a password or PIN. WHfB (Path 1) is the
mechanism that eliminates the Windows password and mints a phishing-
resistant PRT at logon. For environments where MFA at the Windows
desktop is a compliance requirement, Path 1 or Path 3 are the appropriate
choices.
3.2.3.6 Checklist: Authenticator Passkey
1. Enable Passkeys (FIDO2) in Entra Authentication Methods scoped to the
target group.
2. Verify Authenticator app version meets the minimum on user devices.
3. Communicate the MySignIns self-service registration URL before
enforcing any CA policy.
4. Confirm registration via Entra → Users → [user] → Authentication
methods before switching policies from Report-Only to Enforced.
5. Conditional Access: Reference the built-in Phishing-resistant MFA
authentication strength — Authenticator passkeys satisfy this strength.
3.2.4 Path 3: FIDO2 NFC Security Keys — Harsh
Environments Without PKI
If you need NFC form factor but don't have (and don't want to build) a PKI, FIDO2
security keys with NFC deliver the same phishing-resistant posture without
certificates.
Examples: YubiKey 5 NFC, YubiKey 5C NFC, HID Crescendo Key. These are
tapped against an NFC reader or plugged in via USB—but in a harsh environment,
Identity Foundation
89

the NFC capability is what matters.
3.2.4.1 How It Works: FIDO2 NFC Keys
User taps FIDO2 NFC key on reader
→ Windows passes the FIDO2 assertion to Entra ID
→ Entra validates the cryptographic challenge response
→ Entra issues a token
→ User is signed in
No PKI. No certificates. No CRL infrastructure. Entra handles everything natively.
3.2.4.2 Tradeoffs vs. PIV
FIDO2 NFC Key PIV Card + Entra CBA
PKI required No Yes
Card management
(issuance, revocation)
Key lifecycle only Full certificate lifecycle
Compliance posture AAL2 phishing-resistant AAL2/AAL3 phishing-
resistant
Form factor Key fob (NFC or USB) Credit-card sized (NFC)
Best when No existing PKI; simpler
rollout
Existing PKI; regulatory
requirement for PIV/CAC
3.2.4.3 Registering a FIDO2 Key — Workflow for AVD-Only Users
Windows Hello for Business cannot be provisioned from inside a remote session
(see WHfB Setup). Users whose only access path is through AVD must register a
FIDO2 security key before their first sign-in if the A002 phishing-resistant CA
policy is enforced.
Registration happens through a browser and does not require a managed device.
Users can register from any PC, including a personal machine.
Step 1 — Navigate to Security Info
Open a browser and go to https://mysignins.microsoft.com/security-inf
o. Sign in with the user's Entra credentials (password + existing MFA if already
registered).
Securing Microsoft 365 in GCC High | 2026.04.30
90

Step 2 — Add the Security Key
Click + Add sign-in method → select Security key → select USB device (works
for both USB and NFC keys).
Follow the browser prompts:
1. When asked to insert the key, plug it in (or tap it on the NFC reader if using
an NFC key with a compatible reader attached)
2. Touch the gold contact or button when the key blinks — this is the user
presence check
3. Set a PIN for the key if prompted (required for FIDO2 PIN-backed
credentials)
4. Name the key (e.g., YubiKey - Primary)
The key is now registered as a credential on the user's Entra account.
Step 3 — Verify the Auth Strength
After registration, confirm the key satisfies the A002 policy. In the Entra Admin
Center, navigate to Users → [user] → Authentication methods and verify the
security key appears and is listed as phishing-resistant.
Step 4 — First AVD Sign-In
When the user connects to AVD (via https://client.wvd.microsoft.usin
GCC High or https://client.wvd.microsoft.comin Commercial, or the
Remote Desktop client):
1. Enter the username and select Sign in with a security key
2. Insert or tap the FIDO2 key and touch the contact when prompted
3. The sign-in satisfies the A002 phishing-resistant auth strength and the P006
compliant-device policy (the AVD session host is the compliant device, not
Identity Foundation
91

the user's local machine)
REGISTER BEFORE GO-LIVE — NO FALLBACK AFTER A002 IS
ENFORCED
If A002 (Require Phishing-Resistant Auth) is enforced and a user has not
pre-registered a FIDO2 key or other phishing-resistant method, they will be
blocked at sign-in with no actionable error message. Verify all users have a
registered method in Entra > Users > Authentication methods before
switching A002 from Report-Only to Enforced. See AVD Deployment
Timeline — Phase 2 for the recommended pre-enrollment step in the
deployment sequence.
NOTE
If your environment or contract specifically requires PIV/CAC (common in
DoD supply chain work), Path 4 is mandatory. FIDO2 keys, while
phishing-resistant, are not PIV-compliant.
3.2.5 Path 4: PIV Cards + Entra Cert-Based Auth —
Harsh Environments
Some workplaces make WHfB impractical: oil mist fogs cameras, moisture defeats
fingerprint readers, and airborne contaminants clog USB ports. In these
environments, an NFC PIV card is the right form factor—and Entra Certificate-
Based Authentication (CBA) is the cloud-native mechanism that makes it work
without an AD FS server.
THIS IS STILL CLOUD-FIRST
Entra CBA is a cloud feature (generally available since 2022). Your PKI
may live on-prem, but authentication happens against Entra ID. You are not
building a parallel on-prem auth stack.
Securing Microsoft 365 in GCC High | 2026.04.30
92

3.2.5.1 How It Works: PIV / CBA
User taps NFC PIV card on reader
→ Windows presents the card's X.509 certificate to Entra ID
→ Entra ID validates the certificate against trusted CA roots uploaded to
Entra
→ Entra issues a token
→ User is signed in (Entra ID, M365, cloud resources)
No AD FS. No on-prem proxy. The NFC reader appears to Windows as a standard
smart card reader, so the existing Windows smart card stack handles everything
below the Entra authentication layer.
3.2.5.2 What You Need
Hardware:
• NFC PIV-compliant cards (e.g., HID Crescendo, Yubico YubiKey 5 NFC
in PIV mode, Identiv uTrust)
• NFC smart card readers (e.g., HID OMNIKEY 5022, ACS
ACR1252U)—sealed or ruggedized models are available for harsh
environments
PKI requirements:
• An existing Certificate Authority (on-prem is fine)
• End-entity certificates issued to users, with the user's Entra UPN in the
Subject Alternative Name (SAN)
• CRL Distribution Points (CDPs) that Entra can reach—either internet-
accessible or published via a reverse proxy
Entra configuration:
Step 1 — Enable Certificate-Based Authentication
Navigate to Entra Admin Center → Protection → Authentication methods →
Certificate-based authentication. Set the policy to Enabled and scope it to All
users or a pilot group.
Step 2 — Upload your CA certificate chain
In the same blade, open the PKI tab and click + Add. For each certificate in your
chain (root first, then any intermediaries):
Identity Foundation
93

Field Value
Certificate Authority Upload the .ceror .crtfile (DER or
PEM format)
OCSP Responder URL Enter if you have one; leave blank if using
CRL only
CRL Distribution URL Paste the HTTP URL from your CDP
(must be internet-accessible)
Certificate Revocation Set to Online (Entra will check the CRL at
authentication time)
CA Type Root for the root CA; Intermediate for
any subordinate CAs
Repeat for each CA in the chain. Entra will not trust end-entity certificates unless
the complete chain back to a trusted root is uploaded here.
CRL URL MUST BE HTTP, NOT HTTPS
Entra CBA fetches CRLs over plain HTTP (per RFC 5280). Your CDP
URL must begin with http://, even in GCC High. The content is signed
by the CA, so integrity is preserved without TLS.
Step 3 — Configure Authentication Binding (what strength does a cert grant?)
In the Authentication binding tab, set the Default protection level to Multi-
factor authentication. This is the fallback for any certificate that doesn't match a
more specific rule.
To be more precise—for example, to grant MFA strength only to certificates issued
by your PIV card CA and single-factor to all others—add a rule:
1. Click + Add rule
2. Set Certificate field to Issuer (or Policy OID if your CA embeds an id-
piv-Auth OID)
3. Enter the issuer DN or OID value for your PIV card CA
4. Set Protection level to Multi-factor authentication
Securing Microsoft 365 in GCC High | 2026.04.30
94

5. Set the rule Priority to 1(lower number = higher priority)
USE POLICY OID FOR THE CLEANEST RULE
PIV cards typically embed the id-piv-Authentication OID (2.16.840.1.10
1.3.6.7) in the certificate policy extension. Binding on this OID rather
than the issuer DN is more specific and survives CA rekeying without rule
changes.
Step 4 — Configure Username Binding (how does Entra find the user?)
In the Username binding tab, define how Entra maps the certificate to an Entra
user account. Add a binding:
Field Typical Value
Certificate field PrincipalName(SAN UPN)
Attribute userPrincipalName
Priority 1
If your certificates carry the user's email in RFC822Nameinstead of a UPN in Princ
ipalName, map RFC822Name→ mailinstead. Add a second lower-priority rule as a
fallback if needed.
Identity Foundation
95

ENVIRONMENT: GCC HIGH
GCC HIGH UPN SUFFIX
In GCC High, user UPNs end in .onmicrosoft.us. Ensure the SAN
UPN in the issued PIV certificates matches the user's Entra UPN
exactly—including the suffix. A mismatch here is the most common
cause of binding failures at login.
ENVIRONMENT: COMMERCIAL
No corresponding requirement for Commercial tenants — standard .onmicro
soft.comUPN suffixes are used and certificate SAN matching follows the
same logic without sovereign-suffix considerations.
Step 5 — Enforce CBA via Conditional Access
Creating the CBA configuration above does not automatically require users to use
it. You must enforce it through Conditional Access.
Option A — Use a built-in authentication strength:
1. Navigate to Entra Admin Center → Protection → Conditional Access
→ Authentication strengths
2. Select the built-in Phishing-resistant MFA strength (includes CBA and
FIDO2; excludes TOTP/SMS)
3. Create or modify a CA policy: Users = PIV card users group, Conditions
as needed, Grant = Require authentication strength → Phishing-resistant
MFA
Option B — Create a custom authentication strength (recommended if you want
CBA-only):
1. Click + New authentication strength
Securing Microsoft 365 in GCC High | 2026.04.30
96

2. Name it (e.g., PIV Card - CBA Only)
3. Check Certificate-based authentication (Multi-factor) only
4. Reference this custom strength in your CA policy grant control
With Option B, users in the scoped group cannot satisfy the policy with FIDO2 or
Microsoft Authenticator—only a PIV cert will pass. This is appropriate if your
environment mandates PIV specifically.
3.2.5.3 CRL Accessibility: The One On-Prem Consideration
Entra CBA performs CRL checks when validating certificates. Your CDP URLs
(embedded in issued certificates) must resolve to an accessible endpoint. Options:
• Publish the CRL to a public URL (e.g., via Azure Blob Storage or a DMZ
web server)
• Use an OCSP responder with a public endpoint
• This is the one infrastructure piece that must be reachable from the
internet—but it is read-only and stateless
3.2.5.4 PKI Operational Overhead
If you already have a PKI, the additional work is:
• Upload CA certs to Entra (one-time)
• Issue certificates to PIV cards (ongoing, like any smart card program)
• Configure Conditional Access (one-time)
If you do not have a PKI, building one is a significant investment. In that case,
evaluate Path 3 first.
3.2.5.5 Windows Login Screen Behavior
This is where PIV + Entra CBA diverges from what most administrators expect. On
a traditional AD-joined machine, smart card logon routes through a domain
controller. On an Entra Joined machine, the path is entirely different — and
understanding the difference prevents a category of login failures that produce no
useful error message.
Step-by-step at the lock screen
1. The NFC reader presents the card to Windows as a standard smart card.
2. The Windows Smart Card credential provider activates and displays the
card as a logon option on the lock screen.
Identity Foundation
97

3. Windows prompts for the card's PIV PIN — not the user's Windows
password or Entra password. The PIN unlocks the card's private key.
4. Windows passes the certificate and the private key operation to the Web
Account Manager (WAM), which routes the authentication request to
Entra ID — not to a domain controller.
5. Entra validates the certificate against the uploaded CA chain, performs the
CRL check, evaluates the binding rules, and issues a Primary Refresh
Token (PRT).
6. Windows uses the PRT to complete sign-in. The user sees their desktop.
Tap card
→ Smart Card credential provider activates
→ PIN prompt (PIV card PIN — unlocks private key)
→ WAM routes certificate to Entra CBA (not to a DC)
→ Entra validates cert, CRL, and binding rules
→ PRT issued
→ Windows desktop
No Kerberos TGT. No domain controller in the path. The PRT is the session
credential from this point forward, used to obtain tokens for M365 and other Entra-
protected resources silently.
Traditional smart card logon vs. Entra CBA
Traditional Smart Card
(AD-joined)
PIV + Entra CBA (Entra
Joined)
After PIN entry Certificate → Domain
Controller
Certificate → WAM →
Entra ID
Credential issued Kerberos TGT Primary Refresh Token
(PRT)
DC required Yes No
On-prem file share access Native (Kerberos) Via Entra token or separate
Kerberos path
If your devices are Entra Joined (cloud-only path), there is no DC for the card to
talk to — and none is needed.
CA trust prerequisite on the device
The Windows Smart Card credential provider will only surface a card at the login
screen if Windows trusts the certificate's issuing CA. If the CA is not in the device's
Securing Microsoft 365 in GCC High | 2026.04.30
98

Trusted Root Certification Authorities store, the card is treated as unknown and
does not appear as a logon option — with no error message to the user.
Deploy the CA certificate chain to devices via Intune before users attempt PIV
logon:
• Navigate to Intune → Devices → Configuration → + Create policy
• Platform: Windows 10 and later / Profile type: Trusted certificate
• Upload the root CA certificate; repeat for any intermediate CAs
• Assign to the device group containing PIV workstations
IF THE CA IS NOT TRUSTED, THE CARD TILE SIMPLY DOES NOT
APPEAR
A user whose workstation is missing the issuing CA in its trusted root store
will see only the standard PIN/password credential options at the lock
screen. The PIV card tile will not appear, there is no error, and no event log
entry is surfaced to the user. Deploy the Intune trusted certificate profile
and verify presence with certutil -viewstore -enterprise Root
before rollout.
PIN lockout
PIV cards have a hardware PIN retry counter — typically 3 to 10 attempts
depending on the card model. Exceeding the limit permanently locks the PIN;
recovery requires a card management operation using the PIN Unblocking Key
(PUK), or re-issuance depending on your card program policy.
This is a physical security feature of the card, not a configurable Entra or Intune
setting. Communicate the PIN lockout threshold to users before rollout. Unlike an
Entra account lockout that clears after a time window, a locked PIV card PIN
requires hands-on card management.
3.2.5.6 Checklist: PIV / CBA
1. Hardware: Procure NFC PIV cards and ruggedized NFC readers for
affected workstations.
2. PKI: Confirm CDP endpoints are internet-accessible. Issue user certificates
with UPN in SAN.
3. Entra: Upload CA certificates. Configure certificate binding rules. Enable
Identity Foundation
99

Entra CBA.
4. Intune: Deploy trusted certificate profile (root + intermediate CAs) to PIV
workstations before rollout.
5. Conditional Access: Require phishing-resistant authentication strength for
affected users or locations.
6. Test: Sign in with a PIV card on an NFC reader and confirm PRT is issued
(dsregcmd /status→ AzureAdPrt: YES) before rollout.
3.2.6 FIDO2/Passkey Limitation on Windows
Desktop Apps
This section applies to Path 2 (Authenticator passkey) and Path 3 (FIDO2
security key) when those methods are combined with a Conditional Access
authentication strength that has Key restrictions enabled and a specific
AAGUID allowlist. Path 1 (WHfB) and Path 4 (PIV + CBA) are unaffected.
3.2.6.1 Symptom
A user successfully signs in with an Authenticator passkey or FIDO2 security key
in a browser, but the same credential fails when the user opens a Windows desktop
app — Teams, Outlook, OneDrive client, or any MSAL-based desktop application.
The user sees AADSTS5000022or "You can't get there from here." Entra sign-in logs
show the authentication strength evaluated against an AAGUID of 00000000-000
0-0000-0000-000000000000instead of the key's real AAGUID — the unique
fingerprint of this issue.
3.2.6.2 Mechanism
Windows desktop apps acquire tokens through the Web Account Manager
(WAM) broker — the OS-level component that brokers OAuth flows for native
applications. WAM relies on the Primary Refresh Token (PRT) for silent re-
authentication and handles step-up MFA when Conditional Access demands a
stronger credential than the PRT currently carries.
When the user satisfies the FIDO2 step-up challenge:
1. WAM presents the WebAuthn challenge to Windows.
2. The user taps the security key or approves the Authenticator passkey.
3. WAM returns the assertion to Entra ID through the PRT step-up pipeline.
4. The step-up pipeline does not carry the WebAuthn aaguidfield
through to Entra's authentication strength evaluator — the AAGUID
Securing Microsoft 365 in GCC High | 2026.04.30
100

claim arrives as all zeros.
5. Entra compares 00000000-0000-0000-0000-000000000000against the
configured AAGUID allowlist, finds no match, and blocks the sign-in.
Browser-based sign-ins succeed because the browser makes a direct WebAuthn call
(navigator.credentials.get()); the assertion is delivered to Entra without
passing through WAM/PRT, so the AAGUID claim survives intact.
3.2.6.3 Why Path 1 and Path 4 Are Not Affected
Path Why it bypasses the issue
Path 1 — WHfB The PRT minted at Windows logon
already carries the phishing-resistant MFA
claim. Desktop apps reuse the PRT silently
— there is no step-up event, and
authentication strength is satisfied without
any AAGUID lookup.
Path 4 — PIV + Entra CBA Entra's CBA authentication strength binds
on certificate issuer or Policy OID, not
AAGUID. The X.509 chain passes
through WAM cleanly, so strict CBA
enforcement works in desktop apps.
3.2.6.4 Decision Matrix
Scenario Recommendation
Corporate Windows device + AAGUID-
strict authentication strength
Path 1 (WHfB). PRT carries the phishing-
resistant claim natively; AAGUID
enforcement does not apply.
Browser, mobile, or BYOD workflow Path 2 (Authenticator passkey) or Path
3 (FIDO2 hardware key). WebAuthn
flow preserves AAGUID.
Corporate Windows + must permit FIDO2
keys on desktop apps
Lower the authentication strength to the
built-in Phishing-resistant MFA strength
(no AAGUID allowlist) for the affected
user group. Document the trade-off — any
registered phishing-resistant authenticator
now satisfies the policy, not only approved
makes and models.
Identity Foundation
101

Scenario Recommendation
Corporate Windows + PIV/CAC
environment
Path 4 (PIV + Entra CBA). Unaffected
by the limitation.
VALIDATE BEFORE ENFORCING AAGUID-RESTRICTED
AUTHENTICATION STRENGTHS
Microsoft Support has confirmed this as intended product behavior at
the time of writing; the behavior is not currently documented in public
Microsoft documentation. This is an architectural limitation in the WAM/
PRT step-up pipeline. Before enforcing an AAGUID-restricted
authentication strength tenant-wide, validate the symptom on a pilot device
by signing in to Outlook desktop vs. Outlook on the web with the same
key. The desktop sign-in fails with all-zeros AAGUID in the sign-in log
Authentication Details; the browser succeeds. If your corporate Windows
population needs phishing-resistant auth in desktop apps and you want
AAGUID-strict enforcement elsewhere, you must be on Path 1 (WHfB) or
Path 4 (PIV + Entra CBA) for those users.
3.2.6.5 Sign-In Log Diagnostic
In the Entra Sign-in logs → Authentication Details for a failed desktop-app sign-
in:
• Authentication method: Passkey (Microsoft Authenticator), Passk
ey, or FIDO2 security key
• AAGUID: 00000000-0000-0000-0000-000000000000
• Failure reason: authentication strength requirements not met
A genuine AAGUID mismatch from a non-approved key shows that key's actual
AAGUID. The all-zeros value indicates the WAM/PRT pipeline stripped the claim
— confirming this issue rather than a user attempting an unapproved authenticator.
3.2.6.6 References
The specific WAM/PRT AAGUID-stripping behavior is not documented as a
known issue on Microsoft Learn at the time of writing. The two pages below
establish the architectural building blocks the limitation rests on:
Securing Microsoft 365 in GCC High | 2026.04.30
102

• Passkey (FIDO2) authentication matrix with Microsoft Entra ID — Native-
app passkey support is mediated by an OS-level authentication broker. The
"Microsoft app support without authentication broker" table covers macOS,
iOS, and Android — Windows is absent because Windows desktop apps
route through the WAM broker.
• Create and Manage Custom Conditional Access Authentication Strengths
— Documents the AAGUID restriction mechanism and the verbatim "You
can't get there from here" error that desktop-app users encounter when the
all-zeros AAGUID fails the allowlist match. The page frames this error as a
user attempting an unapproved key; it does not acknowledge the AAGUID-
stripping case.
3.2.7 PKI Transition Strategy
If you are migrating from a smart card program to WHfB (Path 1), the question is
always: do we throw away the PKI?
No. You transition it from "daily driver" to "break glass."
• Coexistence: Smart cards and WHfB coexist at the Windows lock screen.
A user can tap a card or use their WHfB gesture.
• The shift: Stop issuing smart cards to standard users. Reserve them for
Tier 0 privileged admins and break glass accounts.
• Timeline: Run both in parallel until WHfB enrollment exceeds 95%, then
deprecate card issuance for standard users.
If you are on Path 4 (PIV + Entra CBA), your PKI remains the daily driver. The
transition is from ADFS-mediated authentication to Entra CBA—not from PKI to
no-PKI.
3.2.1 Directory Synchronization
3.2.1.1 Entra Connect Sync
Pre-requisites
A note on Entra Single Sign-On
To achieve single sign-on, meaning users who sign in at the Windows logon screen
(Ctrl+Alt+Del) should *not* be prompted again when accessing Entra
ID–authenticated applications. The delivery method depends on the scenario.
Identity Foundation
103

Scenario How Entra SSO can be delivered
Hybrid Entra Joined Windows 10/11 Windows obtains a Primary Refresh
Token (PRT) at workstation sign-in.
Domain-joined but not hybrid-joined
W10/W11
The device never registers with Entra ID,
so no PRT. Seamless SSO can help here.
Add the environment-specific autologon
endpoint (see note below) to Intranet Zone
and outgoing allow list. Also enable
intranet zone policy: Allow updates to
status bar via script through Group
Policy. Client versions 16.0.8730.xxxx or
later.
Legacy Windows 7/8.1 or Server
2008R2-2012R2
OS doesn’t support PRT. Seamless SSO
can help. Add the environment-specific
autologon endpoint (see note below) to
Intranet Zone and outgoing allow list. Also
enable intranet zone policy: Allow
updates to status bar via script through
Group Policy. Client versions
16.0.8730.xxxx or later.
Mac/Linux or non-WAM browsers
Chrome 114 (mid-2024) Native call-out to WAM [HKLM\
SOFTWARE\Policies\Google\Chrome]
"CloudAPAuthEnabled"=dword:00000001
Older Chrome Browsers (pre-mid-2024) Microsoft Single Sign On extension
ENVIRONMENT: GCC HIGH
Seamless SSO autologon endpoint: Add https://autologon.microsof
t.usto the Intranet Zone and outgoing allow list.
ENVIRONMENT: COMMERCIAL
Seamless SSO autologon endpoint: Add https://autologon.microsofto
Securing Microsoft 365 in GCC High | 2026.04.30
104

nline.comto the Intranet Zone and outgoing allow list.
A note on licensing
Users may require multiple accounts to support lab and writing environments.
Microsoft’s “one license per human” policy may help:
• Alex Simon's One-License-Per-Human Post
ENVIRONMENT: GCC HIGH
GCC High Considerations
• Use Microsoft Entra Connect version 1.1.644.0 or later (2.6.1.0 is
latest published 2026.02.02).
• If your firewall or proxy allows DNS unblocking, unblock
*.msappproxy.us URLs over port 443.
• If not, allow access to the Azure datacenter IP ranges, which are
updated weekly.
ENVIRONMENT: COMMERCIAL
No corresponding requirement for Commercial tenants.
Confirm UPN alignment with email addresses
Having routable UPNs for users that match their email addresses avoids headaches
down the line.
Staged Rollout To Managed Auth (confirm no federation)
When a tenant uses federated authentication Staged Rollout allows migration to
managed identities incrementally rather than requiring a big bang cutover.
Identity Foundation
105

Entra Hybrid Join
Entra Connect is required if configuring Entra Hybrid Join.
Password Hash Sync
We must configure Entra Connect to support Entra Hybrid Join.
Password Writeback
We must configure Password Writeback to support Self-Service Password Reset.
3.2.1.2 Self-Service Password Reset
Self-service password reset reduces helpdesk costs and enables secure password
recovery.
3.2.1 Entra Security Settings
These foundational security settings in Microsoft Entra ID (formerly Azure AD)
establish the "guardrails" for user autonomy and application integration. They
enforce the principle of least privilege (NIST SP 800-171 3.1.5) and prevent
unauthorized system access (3.1.1) across all regulated environments.
3.2.1.1 3.2.1.1 User | User settings
In a regulated environment, users should have the minimum permissions necessary
to perform their jobs. Unrestricted access to the administration portal or the ability
to create new tenants can lead to "shadow IT" and undocumented compliance
boundaries.
Setting Recommended Value Rationale
Restrict access to
Microsoft Entra
administration portal
Yes Prevents non-
administrators from
browsing the directory,
viewing other users'
details, and exploring the
tenant configuration.
Restrict non-admin users
from creating tenants
Yes Prevents users from
spinning up unauthorized,
Securing Microsoft 365 in GCC High | 2026.04.30
106

Setting Recommended Value Rationale
unmanaged Entra tenants
using corporate credentials,
which creates an
immediate compliance
boundary violation.
Users can create security
groups
No (Environment dependent)
Restricting group creation
to admins or an automated
governance process ensures
that the RBAC model
remains clean and
auditable.
Users can create
Microsoft 365 groups
No Prevents the sprawl of
unmanaged Teams and
SharePoint sites, which
often become
undocumented repositories
for sensitive data.
3.2.1.2 3.2.1.2 Enterprise applications | Consent and permissions |
User consent settings
User-led consent is one of the most significant risks to the authorization boundary.
If a user consents to a malicious or unvetted application, that app can bypass MFA
and Conditional Access to exfiltrate sensitive data directly from the tenant via the
Graph API.
Setting Recommended Value Rationale
User consent for
applications
Do not allow user consent Mandatory for GCC
High. This ensures that no
third-party application can
access organizational data
without an explicit security
review and admin grant.
Group owner consent for
apps accessing data
Do not allow group owner
consent
Prevents Team/Group
owners from bypassing IT
governance by authorizing
Identity Foundation
107

Setting Recommended Value Rationale
"bots" or "reporting tools"
that may exfiltrate data
from specific SharePoint
sites or Teams channels.
3.2.1.3 3.2.1.3 Enterprise applications | Consent and permissions |
Admin consent settings
Disabling user consent requires a formal process for users to request the
applications they need. The Admin Consent Workflow provides this "front door,"
creating an auditable request-and-approval trail for every integrated application.
Setting Recommended Value Rationale
Users can request admin
consent to apps they are
unable to consent to
Yes Provides a structured way
for users to request new
tools without resorting to
insecure workarounds.
Admin consent request
reviewers
Select 2-3 Admins Assign specific Global
Admins or Cloud
Application Admins to
receive and vet requests.
Selected users will receive
email notifications for
requests
Yes Ensures timely review of
application requests to
minimize productivity
friction.
Selected users will receive
request expiration
reminders
Yes Prevents requests from
languishing and ensures the
governance process
Securing Microsoft 365 in GCC High | 2026.04.30
108

Setting Recommended Value Rationale
remains active.
COMPLIANCE EVIDENCE
The Admin Consent Workflow directly satisfies NIST SP 800-171 3.1.22
(Control Publicly Accessible Content). By requiring admin review of all
applications, you ensure that no internal data is inadvertently exposed to a
public or unauthorized SaaS application.
3.2.1 Access Governance
Microsoft Entra ID Governance provides the controls that determine who gets
access, how that access is verified at provisioning time, how much standing
privilege exists in the environment, and how external users are scoped and
reviewed. Together these controls address the full identity lifecycle: onboarding,
elevation, collaboration, and offboarding.
3.2.2 User Onboarding and Identity Verification
3.2.2.1 The Helpdesk Attack Surface
Deploying phishing-resistant authentication (passkeys, FIDO2 keys, certificate-
based auth) removes the primary attack vector against end users. But it shifts
attacker focus to the one flow that cannot require a hardware token: helpdesk
provisioning and account recovery. Social engineering a helpdesk agent to issue a
Temporary Access Pass or reset MFA enrollment is now the path of least resistance
into a phishing-resistant tenant.
This is not theoretical. Microsoft's own analysis of identity attacks shows that after
organizations deploy phishing-resistant MFA broadly, the next wave of attacks
targets the provisioning workflow — impersonating employees, fabricating urgency
("I'm traveling and need my key replaced"), or exploiting gaps in identity
verification procedures.
The technical countermeasure is to make the provisioning and recovery flows as
Identity Foundation
109

rigorous as the authentication flow. Entra Verified ID and Face Check provide
this for both initial onboarding and recovery scenarios.
3.2.2.2 Entra Verified ID and Face Check
Entra Verified ID is a decentralized identity framework based on W3C Verifiable
Credentials. It allows a user to present a cryptographically signed credential —
issued by a trusted verifier — to prove their identity without sharing the underlying
document data with the relying party.
Face Check extends this with a real-time liveness check: the user presents a
government-issued ID credential and performs a facial comparison against their
Entra profile photo or the photo on the credential itself. This happens at onboarding
or at MFA re-enrollment, not at every login.
The practical workflow for a new employee onboarding:
1. HR issues a Verified ID invite link to the new hire's personal email
2. New hire scans government ID (passport, driver's license) in the Microsoft
Authenticator app
3. Identity verifier (Au10tix, IDEMIA, or TrueCredential) validates the docum
ent authenticity
and performs liveness detection
4. A signed Verifiable Credential is issued to the hire's Authenticator walle
t
5. The hire presents this credential during account setup — before their corp
orate credentials exist
6. Entra accepts the credential as proof of identity; account is provisioned
At MFA re-enrollment (e.g., lost key, new device), the same Face Check flow can
be required before a Temporary Access Pass is issued — eliminating the helpdesk
social engineering vector entirely.
3.2.2.3 Identity Verifiers
Microsoft Entra Verified ID works with certified identity verification partners.
Three are relevant for defense contractor and regulated commercial deployments:
Verifier Strengths GCC High Available
Au10tix Document authentication
across 190+ countries;
high-speed automated
verification; proven in
financial services and
government
Yes
Securing Microsoft 365 in GCC High | 2026.04.30
110

Verifier Strengths GCC High Available
IDEMIA Deep US government
heritage (TSA PreCheck,
DoD CAC programs);
biometric accuracy;
supports PIV/CAC
credential linkage
Yes
TrueCredential Purpose-built for Microsoft
Entra Verified ID; native
integration with Entra
External ID and MyAccess
workflows
Yes
All three integrate with Entra via the Verified ID SDK. The verification result is
returned as a claim in the Verified Credential — Entra can then gate account
provisioning, TAP issuance, or access package assignment on a verified identity
claim.
3.2.2.4 Inbound HR Provisioning
Automate account creation and deprovisioning by connecting your HR system of
record to Entra via inbound provisioning:
HR System Connector
Workday Entra Workday Inbound Provisioning
SAP SuccessFactors Entra SAP SuccessFactors Inbound
Provisioning
Any HR system with a CSV/API export Entra API-driven provisioning
The provisioning mapping determines which HR attributes flow into Entra:
department, job title, manager, country, contract end date. Critically, map the
worker type field (employee vs. contractor) — this drives group membership,
license assignment, and whether Entitlement Management routes the user through a
verification workflow.
Lifecycle Workflows automate the actions that accompany these HR events:
Identity Foundation
111

HR Event Automated Action
New hire created Send welcome email; assign licenses; add
to onboarding groups; trigger Verified ID
enrollment
Transfer (department/role change) Remove old group memberships; add new
groups; trigger access review for changed
access
Termination Disable account; revoke sessions; remove
group memberships; remove licenses;
retain account for 30 days for audit
Contract end date reached Same as termination — triggered by cont
ractEndDateattribute from HR system
ENVIRONMENT: GCC HIGH (CMMC)
3.2.2.5 US Person Verification
CMMC requires that access to CUI be limited to authorized users. For defense
contractors, "authorized" often has an additional constraint: US Persons only.
This is not directly enforced by Entra, but the combination of Verified ID
(government document verification) and HR provisioning attributes (employe
eCountry, citizenship) creates an auditable basis for US Person access
controls.
Implement a Conditional Access policy that requires membership in an sg-u
s-personssecurity group as a condition for accessing CUI-scoped
applications. Maintain group membership via HR provisioning — only
employees with citizenship = USor workAuthorization = US Person
in the HR system flow into this group automatically.
The Face Check / IDEMIA verification at onboarding provides the
government document basis for that HR attribute — creating a defensible
chain: government-verified ID → HR attribute → security group →
Conditional Access → CUI access.
CMMC Control Mapping
Securing Microsoft 365 in GCC High | 2026.04.30
112

NIST Control Entra Governance Capability
3.1.1 — Limit access to authorized
users
HR provisioning + Lifecycle
Workflows enforce account existence
only for active personnel
3.1.2 — Limit access to authorized
processes
Entitlement Management scopes access
packages to verified user populations
3.9.1 — Screen individuals before
access
Verified ID + Face Check provides
government document-backed identity
verification at onboarding
3.9.2 — Terminate access upon
separation
Lifecycle Workflow on HR termination
event; revokes sessions within minutes
of HR record update
ENVIRONMENT: COMMERCIAL
3.2.2.6 KYC and Regulatory Onboarding
For financial services (GLBA), healthcare (HIPAA), and higher education
(FERPA), Verified ID + Face Check addresses Know Your Customer (KYC)
and identity proofing requirements at account creation.
NIST SP 800-63-3 IAL2 (Identity Assurance Level 2) requires remote
identity proofing using a validated identity evidence source. Au10tix or
IDEMIA document verification + Face Check liveness detection satisfies
IAL2 without requiring an in-person proofing event — enabling fully remote
onboarding of high-trust accounts (financial advisors, HIPAA covered entity
employees, student financial aid access).
NIST SP 800-171 Rev. 3 Control Mapping
Control Entra Governance Capability
3.1.1 — Authorized access HR provisioning scopes accounts to
Identity Foundation
113

Control Entra Governance Capability
active personnel only
3.9.1 — Screen individuals Verified ID at onboarding; Face Check
for account recovery
3.9.2 — Terminate access Lifecycle Workflow automation on HR
termination
3.2.3 Privileged Identity Management
Standing administrative access — accounts that are always Global Administrator,
always Exchange Administrator, always have write access to production — is the
single largest blast radius risk in any M365 tenant. A compromised credential with
standing Global Admin access compromises the entire tenant immediately.
Privileged Identity Management (PIM) eliminates standing access by replacing it
with time-bound, approval-gated, just-in-time elevation.
3.2.3.1 Eligible vs. Active Assignments
The core PIM concept is the distinction between eligible and active assignments:
Assignment Type What It Means When to Use
Eligible The user can activate the
role but does not hold it
permanently. Activation
requires MFA, optional
approval, and produces an
audit record.
All privileged roles for
named admins
Active The user holds the role
permanently. No activation
step required.
Break-glass accounts only;
emergency access only
Active (time-bound) Active assignment that
expires after a set duration.
Temporary elevated access
for a project or audit period
Securing Microsoft 365 in GCC High | 2026.04.30
114

The goal is zero standing active assignments for any role that can modify security
configuration, add credentials to accounts, or access sensitive data at scale.
3.2.3.2 Roles That Must Be PIM-Gated
ENVIRONMENT: GCC HIGH (CMMC)
In a CMMC environment, the following roles must have no standing active
assignments — all named admins must be eligible only:
Role Blast Radius if Compromised
Global Administrator Full tenant takeover
Privileged Role Administrator Can assign any role, including Global
Admin
Security Administrator Can modify Conditional Access,
disable MFA
User Access Administrator Can grant any Azure RBAC role
Exchange Administrator Full mailbox access across all users
SharePoint Administrator Full document library access
Intune Administrator Can push malicious device
configurations
Application Administrator Can add credentials to any app
registration
Authentication Administrator Can reset MFA for non-privileged
users
Active (standing) assignments should exist only for break-glass accounts —
two or more cloud-only accounts with Global Admin, excluded from all
Conditional Access policies, credentials stored in a physical safe, and
monitored for any sign-in via an Azure Monitor alert.
CMMC Control Mapping
Identity Foundation
115

NIST Control PIM Capability
3.1.5 — Least privilege Eligible-only assignments; no standing
admin access
3.1.6 — Non-privileged accounts for
non-privileged functions
PIM requires separate activation step
— admins use standard account for
daily work
3.1.15 — Privileged remote access PIM activation requires phishing-
resistant MFA; activation is logged in
Entra audit log
3.3.1 — Audit records Every PIM activation generates an
audit log entry: who activated, which
role, duration, justification
3.3.2 — Audit review PIM alerts on activation of high-
sensitivity roles; integrate with Sentinel
for SOC review
ENVIRONMENT: COMMERCIAL
For commercial tenants, apply PIM at minimum to the top-tier roles (Global
Admin, Privileged Role Admin, Security Admin) and to any role with access
to regulated data (Exchange Admin for HIPAA environments, SharePoint
Admin for GLBA document repositories).
NIST SP 800-171 Rev. 3 Control Mapping
Control PIM Capability
3.1.5 — Least privilege Eligible-only assignments eliminate
standing access
3.1.6 — Non-privileged accounts Separate activation step enforces use of
standard account for daily work
Securing Microsoft 365 in GCC High | 2026.04.30
116

Control PIM Capability
3.3.1 — Audit records PIM activation log provides
timestamped record of every privilege
use
3.2.3.3 PIM Activation Settings
Configure these settings per role in Entra ID → Identity Governance →
Privileged Identity Management → Entra ID roles → [Role] → Settings:
Setting Recommended Value
Maximum activation duration 4 hours (Global Admin); 8 hours
(workload-specific roles)
Require MFA on activation Yes — phishing-resistant method required
Require justification on activation Yes — justification text written to audit
log
Require approval Yes for Global Admin and Privileged Role
Admin; No for workload roles (reduces
friction)
Approvers Security team lead; at least two approvers
configured so no single person is a
bottleneck
Send notifications Yes — email to approvers and role owners
on every activation
3.2.3.4 Access Reviews for Privileged Roles
PIM eligible assignments should be reviewed quarterly. Configure Access Reviews
in Entra ID Governance:
1. Entra ID → Identity Governance → Access reviews → New access
review
2. Scope: Team + Application → Entra ID roles → select all roles with
Identity Foundation
117

eligible assignments
3. Reviewers: Manager of each user (or designated Security Officer if
manager is not appropriate)
4. Recurrence: Quarterly
5. Upon completion: Auto-remove access if reviewer does not respond (deny-
by-default)
The access review report is direct evidence for compliance assessors and auditors
reviewing privilege management controls.
3.2.3.5 PIM for Azure Resource Roles
PIM also covers Azure RBAC roles on Azure Government subscriptions — not
just Entra directory roles. Apply the same eligible-only policy to:
• Owner on any subscription containing session hosts, storage accounts, or
Key Vault instances
• Contributor on resource groups containing sensitive workloads
• Key Vault Administrator on any Key Vault holding tenant encryption
keys
3.2.4 Entitlement Management
Entitlement Management governs what access a user can request, who approves it,
how long it lasts, and who reviews it periodically. It is particularly important for
external users — contractors, auditors, partner personnel — who need access to
specific resources but must not have the ability to self-provision broader access.
3.2.4.1 Access Packages
An access package bundles the resources a role needs — SharePoint sites, Teams,
application roles, security groups — into a single requestable unit. A contractor
working on a specific contract vehicle gets one access package; a government
auditor gets a different, more restricted one.
Access package components:
Component What It Controls
Resource roles SharePoint site access level, Team
membership, app role assignments
Securing Microsoft 365 in GCC High | 2026.04.30
118

Component What It Controls
Policy Who can request, who approves, how long
access lasts
Lifecycle Expiration date; access review schedule;
auto-extend or auto-expire
Catalog Organizational grouping of packages (e.g.,
"Project Resources", "IT Operations")
3.2.4.2 External User Access Packages
The most important use case for Entitlement Management in a regulated
environment is controlling the external user lifecycle. Without it, B2B guests can
be invited by any member, accumulate access over time, and remain in the tenant
indefinitely after their engagement ends.
With Entitlement Management:
1. External users can only gain access via a sponsored access package
request — no ad-hoc invitations permitted (enforced via Entra External
Collaboration Settings → restrict invitations to admins only)
2. The access package policy specifies the exact resources the external user
will receive — not broader SharePoint or Teams access
3. Access expires automatically at the contract end date — no manual cleanup
required
4. An access review fires 30 days before expiration — the sponsor confirms
whether access should be extended
5. If the sponsor does not respond, access is removed automatically
ENVIRONMENT: GCC HIGH (CMMC)
3.2.4.3 CUI-Scoped External Access
For CMMC environments, external access packages should be scoped to the
minimum resources needed for the contract scope:
Identity Foundation
119

External User Type Access Package
Contents Max Duration
Subcontractor (active
contract)
Tented SharePoint site
(CUI-Basic label);
Teams channel
Contract end date
Government auditor /
DCSA assessor
Read-only SharePoint
site; no Teams
90 days
Prime contractor
program office
Specific document
library; no email access
Contract period
Technical reviewer Single SharePoint
document library; view-
only
30 days
Configure the access package policy to require connected organization
approval — the external user's organization must be a pre-approved connected
organization in Entra External Identities before their request can be submitted.
This is the Entitlement Management equivalent of the DLP Allowed Domains
list: only known partner tenants can request access.
Restricting Ad-Hoc Guest Invitations
In Entra ID → External Identities → External collaboration settings:
• Guest invite settings: set to Only users assigned to specific
admin roles can invite(or No one in the organization ca
n invite)
• This forces all external access through Entitlement Management
access packages — no backdoor invitations
CMMC Control Mapping
NIST Control Entitlement Management Capability
3.1.1 — Limit access to authorized
users
Access packages define the exact
resources; auto-expiry removes access
when engagement ends
Securing Microsoft 365 in GCC High | 2026.04.30
120

NIST Control Entitlement Management Capability
3.1.2 — Limit access to authorized
processes
Package scope limits external users to
specific sites/teams — not tenant-wide
access
3.1.3 — Control CUI flow External packages scoped to CUI-
labeled containers; combined with DLP
Allowed Domains
3.9.2 — Terminate access Auto-expiry on contract end date;
access review 30 days prior
ENVIRONMENT: COMMERCIAL
3.2.4.4 Vendor and Partner Access Governance
Commercial organizations face the same external access sprawl problem
without a regulatory forcing function. Entitlement Management provides the
governance structure that prevents contractor access from persisting after
project completion.
Key policies for commercial environments:
• Time-limit all external access packages: maximum duration tied to
contract or SOW end date
• Require internal sponsor: every external access request must have a
named internal employee who is accountable for the access and
receives the access review notification
• Separate catalogs by sensitivity: create distinct catalogs for general
vendor access (SharePoint, Teams) and sensitive access (financial
data, HR systems). Sensitive catalogs require manager or CISO
approval.
• Access reviews quarterly: any external user with access longer than
90 days receives a quarterly review
NIST SP 800-171 Rev. 3 Control Mapping
Identity Foundation
121

Control Entitlement Management Capability
3.1.1 — Authorized access Access packages gate all external
access behind approval
3.1.2 — Authorized processes Package scope limits external users to
specific resource sets
3.9.2 — Terminate access Auto-expiry removes access without
manual IT intervention
3.2.4.5 Access Reviews for External Users
Configure a recurring access review specifically for external users with active
access packages:
1. Scope: All guest users across all catalogs
2. Reviewers: Package sponsors (the internal employee who requested or
approved the external access)
3. Recurrence: Quarterly (or at contract expiry — whichever is sooner)
4. Decisions: Approve to extend; Deny to remove; No response → auto-deny
5. Notifications: Remind reviewers 7 days and 2 days before deadline
The access review completion report — including sponsor decisions and auto-
denials — is direct audit evidence for compliance reviewers and auditors.
3.2.4.6 My Access Portal
myaccess.microsoft.com (commercial) / myaccess.microsoft.us (GCC High) is the
self-service portal where users request access packages, view their current access,
and extend or return access. For external users, the access package request link can
be shared directly — the external user authenticates with their own organizational
credentials and submits the request, which routes to the configured approvers
without requiring IT involvement.
This eliminates the IT ticket workflow for access provisioning while maintaining
full approval and audit trail.
Securing Microsoft 365 in GCC High | 2026.04.30
122

3.2.1 Cross-Tenant Collaboration
A former boss at Microsoft, Bharat Shah, once told us - Microsoft's Identity
Engineering team, "Logging in is great, I love logging in, I do it every day. But
what matters is what I do after I login." And what matters most today is
collaboration. And the most used tool for collaboration is Microsoft Teams. And
that collaboration is not restricted to your organization. This section helps you
manage cross-org collaboration while fulfilling your duty to protect Controlled
Unclassified Information.
3.2.1.1 Cross-Cloud Considerations
Many GCC High applications and features are not supported or are limited. This
section focuses on the limitations of Teams External Access for cross-cloud
collaboration. Cross-cloud Teams behavior is more restricted than cross-tenant
Teams behavior within the same cloud. The loss of group chat is the most
significant limitation (loss of emoji’s is another) and may prevent your organization
(or its externally focused users) from fully committing to GCC High. You want to
secure your business. But you want to ensure you still have a business to secure.
The documentation says it works. You enable External Access in settings, test a
chat with someone from another org — it works! You check the box and move on
to the next project. Wrong! Read on for why.
Teams External Access: Limitations
Teams External Access for cross-cloud collaboration is more restrictive than
collaboration between tenants within the same cloud (Commercial or GCC High). It
works for simple chat and calling, but the moment your users need to actually
collaborate — react to a message, add someone to a group discussion, share a file
in a meeting, work together in a channel — they can’t. And suddenly you’re
explaining to frustrated executives why they can’t work normally with external
partners despite “working for months to get this working”. Organizations may drive
to get everyone into GCC High to optimize internal collaboration, but you should
be aware of the limitations of external cross-cloud Teams collaboration.
Teams B2B Guest Access: Overview
Teams External Access and Cross-Cloud Meeting Join enable a degree of external
collaboration without provisioning accounts (B2B guest or local):
• Teams External Access for casual external contact (no group chatting, file
sharing, message reactions)
Identity Foundation
123

• Cross-Cloud Meeting Join for verified external user identities (conditional
access, lobby bypass)
For serious collaboration (group chatting, file sharing) you need to provision an
account (B2B Guest or local).
1. My Recommendation: Maximally leverage cross-cloud B2B using Entra
ID B2B Guests
2. Mainly GCC High – Swivel to Commercial When Needed: Some
organizations follow a “GCC High Unless” model, provision most of their
users in GCC High because they are not quite sure where CUI is being
handled, and employ a dual-account/swivel-seat model for users who also
need full-fidelity Teams collaboration with Commercial users.
3. Mainly Commercial – Swivel to GCC High When Needed: Some
organizations follow a “Commercial Unless” model, provision most of their
users in Commercial because CUI handling is a small part of their business,
and, to meet federal data handling requirements without issuing new
hardware, deploy a secure enclave in GCC High for handling CUI.
All three approaches can coexist. All three are defensible to a compliance assessor.
My recommendation for one account per user is simpler for users ("which account
did I use for that?") and based on three facts:
1. Users have crystal clear expectations for real-time, high-fidelity Internet
collaboration. Inconsistent collaboration experiences depending on which
account you happen to be using is not a great user experience.
2. Microsoft has clearly communicated its focus on B2B vs. Teams Shared
Channels and Cross-Cloud Meeting Join.
3. B2B Guest accounts enable a medium-fidelity, governed Teams
experience, the best cross-cloud compromise achievable today.
Securing Microsoft 365 in GCC High | 2026.04.30
124

3.2.1.2 Configuration
Teams External Access: Configuration
EXTERNAL ACCESS IS LIMITED, BUT IT DOES WORK.
People sometimes assume that cross-cloud Teams chat is not possible. It is
possible, but, in addition to enabling External Access, a verified domain is
required (which some enclave deployments don't configure right away) and
DNS records for standard federation. For any Microsoft Teams
organization to chat with an external organization, regardless of cloud type,
the SRV record for federation must exist in public DNS.
ENVIRONMENT: GCC HIGH
GCC High tenant SRV record
• Service: _sipfederationtls
• Protocol: _tcp
• Port: 5061
• Target: sipfed.online.gov.skypeforbusiness.us
ENVIRONMENT: COMMERCIAL
Commercial tenant SRV record
• Service: _sipfederationtls
• Protocol: _tcp
• Port: 5061
• Target: sipfed.online.lync.com
If these records are missing, the tenant is effectively invisible to external federated
chat requests.
Identity Foundation
125

• Gotcha #1: Changing to a verified domain may require some extra
steps.
◦ Federated chat requires a verified domain to host these SRV
records. After changing a user’s domain from an onmicrosoft
domain, you may need to hard refresh the browser, log out and
back in, or log in using an InPrivate/Incognito session to see the
custom domain appear in the Me control in the top-right corner of
the Teams window.
• Gotcha #2: A legacy SRV record may interfere with external
federation.
◦ Despite not being a documented requirement, if this _sipSRV
record exists in your DNS, it must point to the correct endpoint for
your cloud.
ENVIRONMENT: GCC HIGH
• Service: _sip
• Protocol: _tls
• Port: 443
• Target: sipdir.online.gov.skypeforbusiness.us
ENVIRONMENT: COMMERCIAL
• Service: _sip
• Protocol: _tls
• Port: 443
• Target: sipdir.online.lync.com
Securing Microsoft 365 in GCC High | 2026.04.30
126

Teams B2B Guest Access: Configuration
CRITICAL GCC HIGH CONSTRAINT
B2B Collaboration is OFF by default. You must configure Cross-Tenant
Access Settings to trust commercial partners manually before applying
Guest CA policies.
This section focuses on cross-cloud Teams collaboration via B2B, building on my
post about securing organizations that span Microsoft’s Commercial and GCC High
clouds. Thomas Turner also has a good video walkthrough of the end-user
experience. Here’s what works smoothly once everything’s set up:
• Global Address List (GAL) allows people to find each other for emailing
• People Picker in Teams allows people to find each other for chatting
• Share Dialog in SharePoint allows people to find each other for document
sharing
These settings enable cross-cloud guests in both tenants. Some clients prefer to
allow GCC High guests in their Commercial tenant and not vice versa.
• Supported Apps: Teams (chats, meetings, calling, file sharing),
SharePoint, OneDrive, Power BI (with limitations), 3rd party Entra-
integrated apps
• Not Supported: Planner, Stream, Yammer, Viva Engage, some Exchange/
Outlook features
• License Requirements: Entra ID P1/P2 (or Microsoft 365 E3/E5)
Entra ID Cross-Tenant Access Settings
In both tenants (Commercial and GCC High):
• Go to Microsoft Entra Admin Center → External Identities → Cross-
tenant access settings.
◦ Under Organizational Settings -> Add organization
▪ Under Inbound access:
▪ Allow B2B collaboration.
▪ Under Outbound access:
▪ Allow B2B collaboration.
◦ Under Microsoft cloud settings
Identity Foundation
127

▪ In Commercial: check Microsoft Azure Government
▪ In GCC High: check Microsoft Azure Commercial
Teams-Specific Settings
In Teams Admin Center → External Access:
• Add the other tenant’s domain (e.g., contoso.com) to the allowed
domains list.
• Ensure Teams and Skype for Business users in external organizations
are allowed to communicate.
In Teams Admin Center → Guest Access:
• Turn on Guest access and allow required features (chat, calls, file sharing).
Recommended Configuration
These additional settings simplify your end-user experience and strengthen your
security posture.
Entra ID Cross-Tenant Access Settings
In both tenants (Commercial and GCC High):
• Go to Microsoft Entra Admin Center → External Identities → Cross-
tenant access settings.
◦ Under Organizational Settings -> [your tenant in the other
cloud]
▪ Under Inbound access | Trust Settings:
▪ Trust multifactor authentication from
Microsoft Entra tenants (this prevents users
from needing to re-register MFA in your tenant)
▪ Trust compliant devices (if you manage device
compliance in the other cloud tenant)
▪ Trust Microsoft Entra hybrid joined devices (if
you manage Microsoft Entra hybrid joined devices
in the other cloud tenant)
▪ Automatically redeem invitations with the
tenant [your tenant in the other cloud]
▪ Under Outbound access | Trust settings
▪ Automatically redeem invitations with the
tenant [your tenant in the other cloud]
Securing Microsoft 365 in GCC High | 2026.04.30
128

Guest Creation
Invitation and Invitation Acceptance
You must invite the guest from the other tenant, and the guest must accept the
invitation. The need for guest acceptance can be bypassed with the Automatically
redeem invitations setting mentioned in the previous section.
Usage location
Be sure to set the Usage location attribute when creating the user. Some Microsoft
365 features won’t work without a valid usage location.
Guest vs. Member
The external user must be a Guest user type, not a Member user type**,** for
external access in Teams to work.
Add the Guest to a Team
The external Guest user must be added to a Team to complete the required Teams
initialization.
Tenant Switching
You should be able to switch back and forth between your Commercial Teams web
app and GCC High Teams web app.
In GCC High Teams, you can tenant-switch to your Commercial tenant, which
will open a new tab and navigate to https://teams.microsoft.com/v2/.
In Commercial Teams, you can tenant switch to the GCC High tenant, which will
open a new tab and navigate to the GCC High version of Teams. However, I have
seen it take several hours for that option to appear in the web app. If there is no
tenant switch option, you must navigate to https://gov.teams.microsoft.us/v2.
However, if you go there directly, you may encounter a “[your domain] isn’t in
our system. Make sure you typed it correctly.” error message. You can work
around this error by using the link that was sent to you when your account was
added to the GCC High Team.
Clean Testing: User Removal, Signing Out of Existing Browser Tab Sessions
If you are like me, you have lingering external users or browser tabs from previous
Identity Foundation
129

cross-cloud Teams chat testing. These browser tabs may receive messages, but not
allow sending messages with “Failed to send” errors. Do yourself a favor: sign out
of these browser tabs, remove previous external users from Teams, Entra, and
deleted users before testing. Even after doing all this, you may see multiple
identical entries in your Teams picker when adding the external user to a Team.
One of them (usually the one further down the list) should work. You may also see
chats with the dreaded “You can’t send messages because you are not a member
of the chat.” error message. You can ignore these chats; I’ve been unable to delete
them.
3.2.1.3 Automation
Teams External Access does not require a guest account for each user. Teams B2B
Guest access does. Here are three approaches you can take to automate the
provisioning of guest accounts.
Approach 1: Guest By Request
Some organizations are content to allow users to request access via My Access and
use Entitlement Management to implement a governed “access-on-demand” model
where users can search for content, request access, and have their guest access
lifecycle governed by Entitlement Management and Access Reviews. This doesn’t
provide a unified GAL or Teams Picker, but does provide users with governed
access to content published from the other tenant.
Approach 2: Cross-Tenant Sync
For companies that want to keep B2B users in sync, Microsoft offers cross-cloud
synchronization in preview. In GCCH, this will be part of the Microsoft Entra ID
Governance for Government SKU priced at $84/user/year. In Commercial, this will
be part of the Microsoft Entra Suite, also priced at $84/user/year. For a 20,000-user
company syncing half of their users to the other tenant, this would be 10,000 users x
$84/user/year = $840,000/year.
Approach 3: Mindline Identity Bridge
For companies that don’t need the additional capabilities in Entra ID Governance or
Entra ID Suite, they can use Mindline Identity Bridge priced at .10/user/month. For
a 20,000-user company syncing half of their users to the other tenant, this would be
10,000 users x $1.20/user/year = $12,000/year – a 98.6% savings.
Securing Microsoft 365 in GCC High | 2026.04.30
130

3.2.1.4 Compliance
We’ve covered the What and the How, we haven’t discussed the Why. We are
talking about GCC High because you need to control the storage and movement of
CUI. This is another reason to be skeptical about Teams External Access and Cross
Cloud Meeting Join. You can configure DLP to block exfiltration of CUI from your
GCC High environment, but having an actual Commercial B2B Guest User in a
GCC High Team enables much more control over access and storage of CUI. Here
is a table that shows the safety/feasibility of cross-tenant CUI access.
3.3 Conditional Access Policies
This framework implements defense-in-depth based on three pillars:
• Identity Protection: Use Restricted Management Administrative Units.
Require phishing-resistant authentication for admins. Employ emergency
break-glass accounts to prevent lockout. Enforce MFA for all roles
(admins, users, guests).
• Risk Reduction: Block legacy authentication, untrusted geographic
locations, and high-risk flows like device code flow. Block access, require
MFA, or require password changes based on risk.
• Device Compliance: Require compliant devices for unrestricted access.
Prevent thick-client access on unmanaged (BYOD) desktops. Enforce
limited web-only access and require Intune App Protection for mobile
access to Office 365.
Conditional Access Policies
131

3.3.1 Policy Catalog
3.3.1.1 Identity Protection
ID Policy Name Target
A001 Require MFA All Users
A002 Require Phishing Resistant
Auth
High-Value Targets
G001 Require MFA for All
Guests
External Users
P001 Require MFA for Admins Directory Roles
P002 Require MFA for Service
Management
Admin Portals
P003 Require MFA for Device
Registration
Device Join
3.3.1.2 Risk Reduction
ID Policy Name Risk Trigger
B000 MFA for Medium Risk
Sign-Ins
Sign-in Risk: Medium
B001 Block Legacy
Authentication
Legacy Clients
B002 Block Non-Approved
Locations
Geo-IP
B003 Block Device Code Flow Device Code
B004 Block Non-Approved
Service Account Usage
Service Account +
Location
B005 Block Non-Approved
Security Registration
MFA Registration +
Location
B006 Block Non-Approved Intune Apps + Location
Securing Microsoft 365 in GCC High | 2026.04.30
132

ID Policy Name Risk Trigger
Device Registration
B007 Block High Risk Sign-Ins Sign-in Risk: High
B008 Password Change High
Risk Users
User Risk: High
3.3.1.3 Device Compliance
ID Policy Name Grant Control
B009 [BYOD] Block Thick
Clients
Compliant Device
P004 [BYOD] Enforce Limited
Web Access
App Enforced Restrictions
P005 [BYOD] Enforce Mobile
App Protection
App Protection Policy
P006 Require Compliant Devices Compliant Device
3.3.1.4 Enclave Access Control
Applies only when deploying the AVD Secure Enclave pattern — an existing-
tenant overlay that enforces CUI access from authorized session hosts only. These
policies are scoped to AVD-Enclave-FCI-Usersand do not affect the broader user
population.
ID Policy Name Grant Control
P004 [Enclave] Require
Compliant Device
Require compliant device
(exclude AVD apps)
B009 [Enclave] Device Block Block (unless tagged
device)
B010 [Enclave] Network Block Block (unless AZFW
egress IP)
B011 [Enclave] Auth Context: Block auth context (unless
Conditional Access Policies
133

ID Policy Name Grant Control
Device Block (E5) tagged device)
B012 [Enclave] Auth Context:
Network Block (E5)
Block auth context (unless
AZFW egress IP)
3.3.2 Pillar 1: Identity Protection
3.3.2.1 Administrative Units
CA Security Groups
Conditional Access policies can be bypassed by manipulating the Security Groups
used to create them. Therefore, all Security Groups should be managed in a
Restricted Management Administrative Unit (RMAU)., named something like A
AD Restricted Management AU. Assign a set of trusted admins to the Groups Ad
ministratorrole of this AU. You can use Privileged Identity Management to
prevent users from having standing 24x7 membership in this group. Here are the
security groups to be protected:
Name Description
EID_Emergency_Admin_Exclusions should have two exclusions
EID_MFA_Exempt_Users exemption group for troubleshooting -
generally empty
EID_Phishing_Resistant_Auth_Enfor
cement
phishing resistant authentication
enforcement
EID_Service_Accounts service accounts that cannot perform MFA
EID_TAP_Users should only contain users during active
recovery
EID_Users_On_Managed_Devices group to enforce access from corporate
devices
Securing Microsoft 365 in GCC High | 2026.04.30
134

Temporary Access Passes
If TAP is the only way to bypass your strongest authentication factor, then TAP
becomes the “Golden Ticket.” If an attacker tricks the helpdesk into issuing a TAP,
they own the account. We want to restrict both who can be issued TAPs and who
can issue TAPs.
1. Who can be issued TAPs: Users in an EID_TAP_Usersgroup, in an
RMAU.
2. Who can issue TAPs: Use the least-privileged role for the target account
type:
Target account Role to use Why
Standard users Authentication
Administrator
Can issue TAPs to non-
admin users. Cannot issue
TAPs to admin accounts —
this is a platform-enforced
restriction.
Admin accounts Privileged Authentication
Administrator (PIM-
activated, approval
required)
Can issue TAPs to any user
including admins. Use only
when an admin needs
credential recovery — rare
and auditable.
Global Administrators can also issue TAPs to any user, but this is not a reason to
use the GA role for TAP issuance. GA carries implicit permission to do everything
— including modifying the CA policies that protect TAP usage. Use the least-
privileged role that can perform the task. There is no technical control that prevents
a GA from issuing TAPs; this is an operational discipline recommendation.
3. Delegate, Automate: Delegate to a small team. Better: automate with
facial recognition.
First, this limits the set of users who can be issued TAPs, rather than making TAP a
standing capability for all users. Second, using Authentication Administrator (rather
than GA) for standard user TAP issuance decouples TAP authority from tenant-
wide administrative power. Both limit the blast radius of a social engineering
attack.
Conditional Access Policies
135

Account Recovery
Resetting a password is relatively safe – the person whose password was reset by an
attacker will complain if their password doesn’t work. Adding a new passkey to an
account is more dangerous; a passkey can be added without disrupting a user’s
existing credentials. Here are the steps to enable passkey recovery based on these
conditional access policies:
1. Add the user to the EID_TAP_Usersgroup.
2. Provide the user with a one-time Temporary Access Pass.
3. Have the user provision a new passkey with the Temporary Access Pass.
4. Delete the Temporary Access Pass.
Securing Microsoft 365 in GCC High | 2026.04.30
136

5. Remove the user from the EID_TAP_Usersgroup.
DO NOT RECOVER ACCOUNTS BY EXCLUDING USERS FROM CA
POLICIES
A common helpdesk shortcut is to temporarily add a locked-out user to an
exclusion group — removing them from A002 Require Phishing Resis
tant Author a similar policy — until they re-register their credentials.
This creates real risk:
• It widens the blast radius of a compromised helpdesk account.
Any attacker who can social-engineer a password reset can also
social-engineer a CA exclusion — and the exclusion is quieter:
there is no "wrong password" moment to alert the user.
• The exclusion window is rarely minimal. "Temporary"
exceptions in production often outlast their intent — especially
when the removal step depends on a helpdesk ticket being closed.
• Policy scope is coarse. Excluding a user from a CA policy
removes them from every control in that policy, not just the
authentication method they lost.
The procedure above is the correct path: add the user to EID_TAP_Users,
issue a one-time TAP, let them re-provision their passkey or WHfB
credential, then remove them from the group. The TAP expires
automatically, does not modify any policy, and generates a clear audit trail.
The EID_TAP_Usersgroup is in the RMAU so the helpdesk cannot add
users to it without the appropriate role — limiting blast radius to a
deliberate, time-bounded action.
This procedure requires that the CA policy enforcing phishing-
resistant MFA uses the custom Phishing-resistant auth + TAP auth
strength — not the built-in "Phishing-resistant MFA" strength. The
built-in strength does not include TAP as an allowed method, so a user
authenticating with a TAP would still be blocked. If your phishing-resistant
MFA policy uses the built-in strength, you must switch it to the custom
strength that includes TAP before this recovery workflow will function.
3.3.2.2 Phishing Resistance
Phishing is the largest attack vector. Enforcing phishing-resistant authentication for
your users is the most effective way to defend against it.
Conditional Access Policies
137

Authentication methods | Policies | Passkey (FIDO2)
Enable and Target
• Enabled for all users.
Configure
• Allow self-service setup: Yes
• Enforce attestation: Yes
◦ Authenticator with Passkey with attestation enforced will fail
cross-device registration. This Microsoft Learn article and this Jan
Bakker post explain this.
• Enforce key restrictions: Yes
• Restrict specific keys: Allow
◦ 2fc0579f-8113-47ea-b116-bb5a8db9202a (YubiKey 5 Series with
NFC)
◦ a25342c0-3cdc-4414-8e46-f4807fca511c (YubiKey 5 Series with
NFC)
◦ cb69481e-8ff7-4039-93ec-0a2729a154a8 (YubiKey Nano)
◦ ee882879-721c-4913-9775-3dfcce97072a (YubiKey Nano)
◦ 19083c3d-8383-4b18-bc03-8f1c9ab2fd1b (YubiKey Nano)
◦ ff4dac45-ede8-4ec2-aced-cf66103f4335 (YubiKey Nano)
Securing Microsoft 365 in GCC High | 2026.04.30
138

• Microsoft Authenticator: [checked]
AAGUID-RESTRICTED KEY ALLOWLISTS BREAK WINDOWS
DESKTOP APP SIGN-IN
The Restrict specific keys allowlist above creates an authentication
strength that only accepts the listed AAGUIDs — exactly the strict posture
you want for the workforce. There is one architectural side effect to
validate before enforcing it: Microsoft Entra's WAM/PRT step-up flow on
Windows does not carry the WebAuthn AAGUID claim through to
authentication strength evaluation. Desktop apps (Teams, Outlook,
OneDrive client, MSAL-based clients) on Windows present the AAGUID
as 00000000-0000-0000-0000-000000000000, which fails the allowlist
match even when the user has tapped an approved key. Browser-based
sign-ins work because WebAuthn is called directly and the AAGUID claim
survives.
For corporate Windows users, Windows Hello for Business is the
supported workaround: the PRT minted at WHfB logon carries the
phishing-resistant claim natively and does not invoke the AAGUID
evaluator. Reserve AAGUID-restricted strengths for browser/mobile/
BYOD enforcement, or use the built-in Phishing-resistant MFA strength
(no AAGUID allowlist) for users who must sign into Windows desktop
apps with FIDO2 keys. See Phishing-Resistant Authentication — FIDO2/
Passkey Limitation on Windows Desktop Apps for the full mechanism,
decision matrix, and sign-in log diagnostic signature.
Authentication methods | Auth strengths | Phishing-resistant auth + TAP
• Windows Hello for Business / Platform Credential, OR
• Passkeys (FIDO2) (same options as in the authentication method), OR
• Temporary Access Pass (One-time use), OR
• Temporary Access Pass (Multi-use)
3.3.2.3 Break-Glass Accounts
Two break-glass accounts are excluded from all CA policies. This reduces the
chance of tenant lockout due to misconfiguration or outage. These accounts should:
• use security keys (e.g., YubiKey) for strong auth with minimal cloud
dependency
Conditional Access Policies
139

• be on the “.onmicrosoft” domain to have no dependencies on on-premises
• have a very long password that is stored securely
• be placed in the EID Restricted Management AU — this prevents any
admin below Global Administrator from resetting passwords, modifying
authentication methods, or changing group membership on these accounts.
Without RMAU protection, an Authentication Administrator or Helpdesk
Administrator who is compromised could reset a break-glass account
password and own the tenant.
These accounts are:
• svr_ea_01: [credentials stored in Keeper]
• svr_ea_02: [credentials stored in Keeper]
Alerting on Break-Glass Account Usage
Prerequisites: Connect Logs to Log Analytics
Before you can create an alert, you must ensure your Entra ID logs are being sent to
a workspace.
1. Log in to the Microsoft Entra admin center.
2. Go to Monitoring & health > Diagnostic settings.
3. Click + Add diagnostic setting.
4. Select SignInLogs (and ideally AuditLogs to track changes to the
account).
5. Check Send to Log Analytics workspace and select your workspace.
Create the Alert Rule
Once logs are flowing (this can take 15–30 minutes), follow these steps to create the
alert:
The KQL Query
Go to your Log Analytics Workspace, click on Logs, and run this query to verify
you see your accounts. Replace the placeholder with your specific UPNs:
SigninLogs
| where UserPrincipalName in ("svr_ea_01@yourdomain.onmicrosoft.com", "svr_e
a_02@yourdomain.onmicrosoft.com")
| project TimeGenerated, UserPrincipalName, IPAddress, Location, ResultType,
ResultDescription
Securing Microsoft 365 in GCC High | 2026.04.30
140

Configure Alert Logic
1. In the Log Analytics query window, click + New alert rule.
2. Condition:
◦ Measurement: Set "Threshold value" to 0.
◦ Aggregation granularity: 5 minutes (how often it checks).
◦ Operator: Greater than.
◦ This ensures that even one sign-in attempt triggers the alert.
3. Actions:
◦ Select or create an Action Group.
◦ Add "Email/SMS message/Push/Voice" notifications to alert your
Security Team immediately.
4. Details:
◦ Severity: 0 - Critical. Alert rule name: CRITICAL: Break Glass
Account Usage Detected
3.3.2.4 Expiration Periods
By default, Microsoft Entra ID uses a rolling 90-day window for its sign-in
frequency.
3.3.2.5 Rollout Methodology for Existing Tenants
For clients with existing CA policies, deploying new policies directly to all users
risks conflicts, broken workflows, and unexpected lockouts. Use a three-phase
rollout that moves from observation to targeted enforcement to full deployment.
Naming Convention
Prefix all new CA policies with EIDso they sort together in the Entra portal and are
visually distinct from the client's existing policies. This matches the group naming
convention used throughout this chapter (EID_Emergency_Admin_Exclusions, EI
D_TAP_Users, etc.).
In this book (section headings) In Entra (display name)
A001 Require MFA EID A001 Require MFA
A002 Require Phishing Resistant Auth EID A002 Require Phishing Resista
nt Auth
B009 Enclave Device Block EID B009 Enclave Device Block
Conditional Access Policies
141

In this book (section headings) In Entra (display name)
P004 Require Compliant Device EID P004 Require Compliant Device
The EIDprefix ensures all new policies group together alphabetically — above
legacy policies that typically start with words like "Block," "Company," or
"Require." As legacy policies are retired, the EIDblock becomes the complete
policy set.
Phase 1 — Report-only (1–2 weeks)
Deploy all new policies in Report-only mode. No users are blocked — the policies
evaluate but do not enforce. Review the CA sign-in logs to understand the full
impact across the tenant before enforcing anything.
What to look for Where to check
Policies that would block legitimate users Entra → Sign-in logs → filter by CA
policy name → look for "Report-only:
Failure" entries
Overlap with existing CA policies Compare "Report-only" results against
existing enforced policy outcomes — look
for duplicate grant controls or
contradictory conditions
Service accounts or automated processes
that would be blocked
Filter sign-in logs by non-interactive sign-
ins with "Report-only: Failure"
Phase 2 — Enforce on test group (1–2 weeks)
Create a security group EID_New_CA_Test_Userswith 5–10 representative users
— a mix of roles, departments, and device types. Switch the new policies from
Report-only to Enforce and scope them to this group only (Include: EID_New_CA_T
est_Users).
The test group experiences the real policies. Monitor for:
• Users unable to access resources they previously could
• MFA prompts that weren't expected (sign-in frequency conflicts with
existing policies)
• App compatibility issues (legacy apps that don't support the required auth
strength)
Securing Microsoft 365 in GCC High | 2026.04.30
142

• Workflow disruptions (automated processes, shared mailboxes, service
accounts)
Phase 3 — Expand to all users
Once the test group operates cleanly for 1–2 weeks:
1. Change the policy scope from EID_New_CA_Test_Usersto the target
population (e.g., All Users, EID_Phishing_Resistant_Auth_Enforcem
ent, etc.)
2. Remove any existing CA policies that the new policies replace
3. Delete the EID_New_CA_Test_Usersgroup or repurpose it for the next
rollout
DO NOT RUN CONFLICTING POLICIES IN PARALLEL
When expanding to all users, retire the old policies at the same time.
Running both the old and new policies simultaneously can produce
unexpected grant control stacking — for example, one policy requiring
MFA and another requiring phishing-resistant auth on the same resource,
causing users to be prompted twice or blocked entirely.
3.3.2.6 A001 Require MFA
Assignments – Users:
• Include: All users
• Exclude:
◦ EID_Emergency_Admin_Exclusions
◦ EID_MFA_Exempt_Users
◦ EID_Phishing_Resistant_Auth_Enforcement
◦ EID_Service_Accounts
• Assignments – Target resources:
◦ Include: All resources
◦ Exclude: None
Conditional Access Policies
143

• Access Controls – Grant: Require multifactor authentication
3.3.2.7 A002 Require Phishing Resistant Auth
Assignments – Users:
• Include: EID_Phishing_Resistant_Auth_Enforcement
• Exclude: EID_Emergency_Admin_Exclusions
Assignments – Target resources:
• Include: All resources
• Exclude: None
Access Controls – Grant: Require authentication strength:
• Phishing-resistant + TAP
3.3.2.8 G001 Require MFA for All Guests
Assignments – Users:
• Include: Guest or external users (all types)
• Exclude: EID_Emergency_Admin_Exclusions
Assignments – Target resources: Include “all resources”; Exclude: none
Access Controls – Grant: Require multifactor authentication
3.3.2.9 P001 Require MFA for Admins
Assignments | Users:
• Include: 14 recommended Directory roles
• Exclude: EID_Emergency_Admin_Exclusions,
EID_Phishing_Resistant_Auth_Enforcement
Assignments | Target resources: Include “all resources”; Exclude: none
Access Controls | Grant: Require multifactor authentication
Securing Microsoft 365 in GCC High | 2026.04.30
144

3.3.2.10 P002 Require MFA for Service Management
Assignments | Users:
• Include: All users
• Exclude: EID_Emergency_Admin_Exclusions,
EID_Phishing_Resistant_Auth_Enforcement
Assignments | Target resources: Include “Microsoft Admin Portals”
Access Controls | Grant: Require multifactor authentication
3.3.2.11 P003 Require MFA for Device Registration
Assignments | Users:
• Include: All users
• Exclude: EID_Emergency_Admin_Exclusions
Assignments | Target resources: User actions | Register or join devices
Access Controls | Grant: Require multifactor authentication
WHY P003 DOES NOT EXCLUDE
EID_PHISHING_RESISTANT_AUTH_ENFORCEMENT
Unlike A001, P001, and P002, P003 targets a user action (Register or join
devices) rather than a cloud app resource. Device registration flows occur
during OOBE, Autopilot provisioning, and manual Entra Join —
constrained contexts where passkey/FIDO2 support may not be reliable
depending on the device state and broker availability. Keeping P003 at
standard MFA for all users ensures device registration is not blocked by an
auth strength the registration flow cannot satisfy. The security impact is
minimal: device registration is a one-time event per device, typically
performed under IT supervision.
Conditional Access Policies
145

3.3.3 Pillar 2: Risk Reduction
3.3.3.1 B000 Multifactor re/authentication for Medium Risk Sign-
Ins
Assignments – Users:
• Include: All users
• Exclude: EID_Emergency_Admin_Exclusions
Assignments – Target resources: Include “all resources”
Conditions | Sign-in Risk: Medium
Access Controls | Grant: Require multifactor authentication
Session: Sign-in Frequency – Every time
3.3.3.2 B001 Block Legacy Authentication
Assignments | Users:
• Include: All users
• Exclude: EID_Emergency_Admin_Exclusions
Assignments | Target resources: Include “all resources”
Conditions | Client apps: Exchange ActiveSync clients, Other clients
Access Controls | Grant: Block
3.3.3.3 B002 Block Non-Approved Locations
Assignments – Users:
• Include: All users
• Exclude:
◦ EID_Emergency_Admin_Exclusions
Assignments – Target resources: Include “all resources”
Network: Include Any Location Except US — exclude any active travel named
locations (see procedure below)
Securing Microsoft 365 in GCC High | 2026.04.30
146

Access Controls | Grant: Block
Travel Exception Procedure
When a user needs to access resources from a non-approved location (conference,
client site, international travel), create a named location for the specific IP rather
than excluding the user's account from the policy.
Steps:
1. User submits a request with: destination, dates, and the IP address of the
hotel/office/conference Wi-Fi (or IP range if provided by the venue)
2. Admin creates a named location in Entra → Security → Named locations
→ + IP ranges location:
◦ Name: Travel - [User] - [Reason] - [Date](e.g., Travel
- JSmith - CMMC Conference - 2026-04-15)
◦ IP range: The specific IP or range provided by the user
◦ Mark as trusted location: No
3. Add the named location to B002's Network → Exclude list
4. After the travel dates pass, remove the named location from B002's
exclusion list and delete it
DO NOT USE USER EXCLUSION GROUPS FOR TRAVEL EXCEPTIONS
Excluding a user account from B002 removes geo-blocking for that user
from all locations — not just the travel destination. If the account is
compromised during travel, the attacker can authenticate from anywhere in
the world. Named location exceptions restrict access to the specific IP the
user reported, leaving all other locations blocked.
NAMING CONVENTION MAKES CLEANUP AUDITABLE
The Travel - [User] - [Reason] - [Date]naming convention
ensures stale exceptions are visible in the named locations list. Review
named locations monthly and remove any with dates in the past. A named
location that outlives its stated travel dates is an unreviewed exception —
the same risk as a standing user exclusion.
Conditional Access Policies
147

3.3.3.4 B003 Block Device Code Flow
Assignments | Users:
• Include: All users
• Exclude: EID_Emergency_Admin_Exclusions
Assignments | Target resources: Include “all resources”
Conditions | Authentication flows: Device code flow
Access Controls | Grant: Block
HERE IS WHY DEVICE CODE FLOW IS SO DANGEROUS
Device Code Flow provides a great backdoor to your otherwise-phishing-
resistant authentication setup:
1. I initiate a device code flow prompt (if available) from my location
and get a link: https//entra.com/CLICKME
2. I send you the link and ask you to click it.
3. You click it and are asked for your legitimate phishing resistant
authentication method.
4. You provide it and perform flawless phishing resistant
authentication to the link.
5. I get into your system.
3.3.3.5 B004 Block Non-Approved Service Account Usage
Assignments – Users:
• Include: EID_Service_Accounts
• Exclude: EID_Emergency_Admin_Exclusions
Assignments – Target resources: Include “all resources”
Network: Include Any Location Except Service Account Locations
Securing Microsoft 365 in GCC High | 2026.04.30
148

Access Controls | Grant: Block
3.3.3.6 B005 Block Non-Approved Security Registration
Assignments – Users:
• Include: All users
• Exclude: EID_Emergency_Admin_Exclusions
Assignments – Target resources: User actions | Register security information
Network: Include Any Location Except US
Access Controls | Grant: Block
3.3.3.7 B006 Block Non-Approved Device Registration
Assignments – Users:
• Include: All users
• Exclude: EID_Emergency_Admin_Exclusions
Assignments – Target resources:
• Microsoft Intune (0000000a-0000-0000-c000-000000000000)
• Microsoft Intune Enrollment (d4ebce55-015a-49b5-a083-c84d1797ae8c)
Network: Include Any Location Except US
Access Controls | Grant: Block
3.3.3.8 B007 Block High Risk Sign-Ins
Assignments – Users:
• Include: All users
• Exclude: EID_Emergency_Admin_Exclusions
Assignments – Target resources: Include “all resources”
Conditions | Sign-in Risk: High
Access Controls | Grant: Block
Conditional Access Policies
149

3.3.3.9 B008 Password Change High Risk Users
Assignments – Users:
• Include: All users
• Exclude: EID_Emergency_Admin_Exclusions
Assignments – Target resources: Include “all resources”
Conditions | User Risk: High
Access Controls | Grant: Require multifactor authentication + Require password
change
3.3.4 Pillar 3: Device Compliance
3.3.4.1 B009: [BYOD] Block Thick Client Access
BE SURE ABOUT UNMANAGED DEVICE USE
I’ve had clients insist that there was no access from BYOD/unmanaged
devices in their environment, enable this policy, and have their helpdesk
flooded with calls from users who can’t work. Be aware before blocking.
This policy will block Microsoft 365 sign-ins from thick clients on unmanaged
desktops (excluding iOS and Android devices). In practice, a user on a personal
laptop cannot sign in with Outlook desktop, the Teams desktop client, the OneDrive
sync client, etc. This drives those users to use web access, where P004 will apply
restrictions. Meanwhile, users on Hybrid AD-joined PCs will meet the policy’s
device requirement and can sign in with Outlook, Teams, and other clients with full
access (no restrictions). Mobile access is addressed by P005.
Assignments | Users:
• Include: EID_Users_On_Managed_Devices (do not add consultants or
other BYOD users to this group — they are simply not included rather than
explicitly excluded)
• Exclude: EID_Emergency_Admin_Exclusions
Securing Microsoft 365 in GCC High | 2026.04.30
150

Assignments | Target resources: All cloud apps
Conditions | Device Platforms:
• Device platforms
◦ Include: Windows, macOS
◦ Exclude: IOS and Android
Relies on P005 to secure access from unmanaged iOS/Android
• Client apps
◦ Include: All client apps
◦ Exclude: Browser
Relies on P004 to secure browser access from unmanaged desktops
Access Controls | Grant:
• Require device to be marked as compliant OR
• Require Microsoft Entra Hybrid joined device
USER EXPERIENCE
Blocked users will see the standard "You can't get there from here" message.
Conditional Access Policies
151

CONFIGURATION DETAILS
Here is the JSON for creating this conditional access programmatically. Key
grant controls are highlighted.
B009: [BYOD] Block Thick Client Access.json
{
"displayName": "B009: [BYOD] Block Thick Client Access",
"state": "enabled",
"conditions": {
"users": {
"includeGroups": [
"{{Object-ID-of-EID_Users_On_Managed_Devices}}"
],
"excludeGroups": [
"{{Object-ID-of-EID_Emergency_Admin_Exclusions}}"
]
},
Securing Microsoft 365 in GCC High | 2026.04.30
152

"applications": {
"includeApplications": [
"All"
]
},
"platforms": {
"includePlatforms": [
"windows",
"macOS"
],
"excludePlatforms": [
"iOS",
"android"
]
},
"clientAppTypes": [
"mobileAppsAndDesktopClients",
"exchangeActiveSync",
"other"
]
},
"grantControls": {
"operator": "OR",
"builtInControls": [
"compliantDevice",
"domainJoinedDevice"
]
}
}
3.3.4.2 P004 [BYOD] Enforce Limited Web Access
When a user accesses Exchange Online or Teams/SharePoint via a web browser on
an unmanaged device, this policy kicks in and signals the cloud apps to enforce
limited access. Exchange Online (OWA) will operate in a read-only mode for
attachments (users cannot download or save attachments from email). SharePoint
and OneDrive will similarly block the download, print, and sync options for files.
The Teams web app will allow chatting and online meetings, but if a user attempts
to open or download a file in Teams, they will only be able to view it online (no
download option). In short, users on unmanaged devices still have browser access
to email, Teams, and files, but cannot download files or attachments to those
devices, satisfying the data protection requirement. Users on Hybrid-joined devices
are not impacted by this limited-access policy when using supported browsers, so
they retain full functionality. You should verify that the user experience matches
expectations before enabling broadly.
Assignments – Users:
Conditional Access Policies
153

• Include: EID_Users_On_Managed_Devices
• Exclude: EID_Emergency_Admin_Exclusions
Assignments | Target resources: Office 365
Conditions:
• Client apps = Browser
Hybrid joined or compliant devices are not impacted because they satisfy
the managed device Conditional Access policy. This prevents them from
reaching this app-enforced restrictions policy, so SharePoint receives a full
access session instead of a limited one.
Session: Select “Use app enforced restrictions”
SharePoint must be configured to honor app-enforced restrictions. See the
Unmanaged Device Access settings in the SharePoint Admin Center for the
required server-side setting.
WARNING WHEN SETTING THIS POLICY IN REPORT ONLY MODE
You will receive a warning that this policy will trigger end user prompts
when the device is checked for compliance even in report only mode. I
accept this tradeoff to be able to enable all policies at the start of the
project.
USER EXPERIENCE
The limited experience will look like this.
Securing Microsoft 365 in GCC High | 2026.04.30
154

CONFIGURATION DETAILS
Here is the JSON for creating this conditional access programmatically. Key
session control is highlighted.
P004: [BYOD] Enforce Limited Web Access
{
"displayName": "P004 [BYOD] Enforce Limited Web Access",
"state": "enabled",
"conditions": {
"users": {
"includeGroups": [
"{{Object-ID-of-EID_Users_On_Managed_Devices}}"
],
"excludeGroups": [
"{{Object-ID-of-EID_Emergency_Admin_Exclusions}}"
]
},
"applications": {
"includeApplications": [
"2793995e-0a7d-40d7-bd35-6968ba142197"
]
},
"clientAppTypes": [
"browser"
],
"deviceStates": {
"excludeDeviceStates": [
"compliant",
"domainJoined"
]
}
},
"grantControls": {
Conditional Access Policies
155

"operator": "OR",
"builtInControls": [
"block"
]
},
"sessionControls": {
"applicationEnforcedRestrictions": {
"isEnabled": true
}
}
}
3.3.4.3 P005 [BYOD] Enforce Mobile App Protection
This Conditional Access policy requires the use of Intune app protection policies
(MAM) when accessing Office 365 from mobile devices. This enables the use of
Intune-defined app protection policies (more restrictive for BYOD devices, less
restrictive for MDM devices), providing additional control beyond the “Use app-
enforced restrictions” session control in the previous policy. We should test this
Securing Microsoft 365 in GCC High | 2026.04.30
156

policy, especially for managed mobile devices.
EDGE IS THE ONLY SUPPORTED MOBILE BROWSER
On iOS and Android, Microsoft Edge is the only browser that satisfies
"Require app protection policy." Safari, Chrome, Firefox, Samsung
Internet, and every other mobile browser are blocked at sign-in. Users see a
"use Microsoft Edge" prompt rather than the Office 365 content. Native
Microsoft 365 apps (Outlook, OneDrive, Teams, Word, Excel, PowerPoint)
satisfy the policy on their own.
Before enabling P005 in enforce mode:
• Communicate to users that mobile browser access requires Edge.
• For MDM-enrolled mobile devices, deploy Edge as a required app
via Intune so users do not hit the CA denial first and then get told
to install something.
• Test on at least one iOS and one Android device — the Edge
MAM enrollment prompt has account-add timing edge cases that
are easier to fix before they hit users.
See Microsoft's Require approved app or app protection policy and Manage
Microsoft Edge on iOS and Android with Intune for the supported-app
matrix and Edge MAM provisioning.
Assignments – Users:
• Include: EID_Users_On_Managed_Devices
• Exclude: EID_Emergency_Admin_Exclusions
Assignments | Target resources: Office 365
Conditions | Client Apps: Select Mobile apps and desktop clients
Conditions | Device platforms: Select Android, iOS
Grant
• Require app protection policy
Conditional Access Policies
157

USER EXPERIENCE
Users blocked by this policy will see an error like this.
CONFIGURATION DETAILS
Here is the JSON for creating this conditional access programmatically. Key
session control is highlighted.
P005: [BYOD] Enforce Mobile App Protection
{
"displayName": "P005 [BYOD] Enforce Mobile App Protection",
"state": "enabledForReportingButNotEnforced",
"conditions": {
Securing Microsoft 365 in GCC High | 2026.04.30
158

"userRiskLevels": [],
"signInRiskLevels": [],
"clientAppTypes": [
"mobileAppsAndDesktopClients"
],
"platforms": {
"includePlatforms": [
"android",
"iOS"
]
},
"users": {
"includeGroups": [
"GUID-FOR-EID_Users_On_Managed_Devices"
],
"excludeGroups": [
"GUID-FOR-EID_Emergency_Admin_Exclusions"
]
},
"applications": {
"includeApplications": [
"00000002-0000-0ff1-ce00-000000000000",
"00000003-0000-0ff1-ce00-000000000000"
]
}
},
"grantControls": {
"operator": "OR",
"builtInControls": [
"managedAppProtection"
]
}
}
3.3.4.4 P006 Require compliant devices for O365, Azure, and
Management
Assignments – Users:
• Include: EID_Users_On_Managed_Devices
• Exclude: EID_Emergency_Admin_Exclusions
Assignments | Target resources:
• Office 365
• Microsoft Admin Portals
• Windows Azure Service Management API — only include if the tenant has
Conditional Access Policies
159

an Azure subscription. In GCC High, this appears as Azure Government
Cloud Management API. If the tenant is M365-only with no Azure
subscription, this service principal does not exist in the tenant and should
be omitted.
Access Controls | Grant:
• Require device to be marked as compliant OR
• Require Microsoft Entra Hybrid Joined device
WARNING WHEN SETTING THIS POLICY IN REPORT ONLY MODE
You will receive a warning that this policy will trigger end user prompts
when the device is checked for compliance even in report only mode. I
accept this tradeoff to be able to enable all policies at the start of the
project.
USER EXPERIENCE
Users blocked by this policy will see an error like this.
Securing Microsoft 365 in GCC High | 2026.04.30
160

CONFIGURATION DETAILS
Here is the JSON for creating this conditional access programmatically. Key
session control is highlighted.
P006: Require Compliant Devices
{
"displayName": "P006 Require compliant devices for O365, Azure, and
Management",
"state": "enabledForReportingButNotEnforced",
"conditions": {
"userRiskLevels": [],
"signInRiskLevels": [],
Conditional Access Policies
161

"clientAppTypes": [
"all"
],
"users": {
"includeGroups": [
"GUID-FOR-EID_Users_On_Managed_Devices"
],
"excludeGroups": [
"GUID-FOR-EID_Emergency_Admin_Exclusions"
]
},
"applications": {
"includeApplications": [
"00000002-0000-0ff1-ce00-000000000000",
"00000003-0000-0ff1-ce00-000000000000",
"797f4846-ba00-4fd7-ba43-dac1f8f63013"
]
}
},
"grantControls": {
"operator": "OR",
"builtInControls": [
"compliantDevice",
"domainJoinedDevice"
]
}
}
4. Device Architecture
4.1 Virtual Desktop Strategy
Azure Virtual Desktop (AVD) is not a replacement for physical endpoints — it is a
targeted tool for specific user profiles and risk scenarios. This chapter frames the
strategic decision, establishes the architecture principles that govern all AVD
deployments in this guide, and provides a pre-deployment discovery checklist for
RPO engagements.
For implementation steps, see Scenario: Azure Virtual Desktop.
Securing Microsoft 365 in GCC High | 2026.04.30
162

4.1.1 When to Use AVD
ENVIRONMENT: GCC HIGH
The primary driver for AVD in a CMMC environment is keeping CUI off
unmanaged endpoints. A contractor connecting from a personal laptop is the
canonical use case: AVD delivers a compliant Windows 11 session without
requiring the organization to provision, ship, or manage a physical device.
User Profile Preferred Strategy Rationale
Full-time employee Physical GFE Better daily-use
experience; offline
capability; no session
latency
Contractor /
subcontractor
AVD Zero CUI footprint on
their device; instant
provisioning and
deprovisioning
Temporary auditor or
assessor
AVD Controlled access
window with no residual
data after session ends
"Break glass" user AVD Physical device lost or
stolen — user can
resume work from any
browser
High-risk CUI
workflow
AVD CUI stays inside the
Azure datacenter; drive
and clipboard redirection
blocked at the protocol
level
For full-time employees who handle CUI, both physical GFE and AVD are
defensible architectures. The deciding factors are workforce distribution
(remote-first teams benefit more from AVD), device management overhead,
and whether the client already has Azure Government infrastructure.
Organizations that are heavily invested in Azure Government often find AVD
cheaper to operate at scale than maintaining a physical device fleet.
Virtual Desktop Strategy
163

ENVIRONMENT: COMMERCIAL
Commercial environments generally do not need to deploy a secure enclave to
handle CUI. AVD remains useful in specific scenarios — delivering a
consistent managed desktop to remote contractors, providing a controlled
environment for high-risk workflows, or reducing physical hardware overhead
for distributed teams — but it is not driven by a regulatory enclave
requirement.
Use Case Rationale
Contractor / BYOD user needing
managed apps
AVD delivers a corporate desktop
without requiring device enrollment
Remote workforce with inconsistent
hardware
Guaranteed performance baseline
regardless of end-user device
Application delivery for legacy or
GPU workloads
Centralize specific workloads without
imaging every endpoint
"Break glass" access User can reach a managed desktop
from any device when their assigned
machine is unavailable
4.1.2 Architecture Principles
All AVD deployments in this guide follow a cloud-native architecture. Hybrid Join
for AVD is explicitly rejected.
Principle Decision Why
Identity Entra ID Join — no
Domain Controllers
Eliminates DC
dependency, supports
RBAC-based login without
GPO
Management Intune — no SCCM/
MECM
Consistent policy plane
with physical devices; no
on-prem management
Securing Microsoft 365 in GCC High | 2026.04.30
164

Principle Decision Why
infrastructure
Join model Cloud-only
(AADLoginForWindows)
Hybrid Join adds
complexity with no
compliance benefit for new
GCC High deployments
Host pool type Personal (assigned) One VM per user; no
FSLogix; clean audit trail;
no cross-session data
contamination risk
Network egress Azure Firewall with deny-
all default
No direct internet path
from session hosts; all
egress explicitly
enumerated
Region US Gov Virginia or US
Gov Arizona
FedRAMP High boundary;
data residency requirement
The rationale for the personal pool decision is detailed in Scenario: AVD → Host
Pool Model.
4.1.3 Security Baseline for Session Hosts
4.1.3.1 Trusted Launch
All session hosts must use Trusted Launch virtual machines. This is required for
Windows 11 and for Intune BitLocker compliance via vTPM.
Setting Required Value
Security type Trusted Launch Virtual Machines
Secure Boot Enabled
vTPM Enabled
Integrity Monitoring Enabled
Virtual Desktop Strategy
165

Set these in the Host Pool Security blade when creating the host pool. They cannot
be changed on existing VMs without redeployment.
4.1.3.2 Encryption Tiers
Standard Azure Storage Service Encryption (AES-256, platform-managed keys)
applies to all managed disks by default. For environments with higher sensitivity
requirements:
Tier Mechanism When to Use
Standard Platform-managed keys
(SSE) + BitLocker (Intune)
Baseline — satisfies
compliance requirements
for most organizations
Enhanced Customer-managed keys
(CMK) via Key Vault +
Disk Encryption Set
Organizations with
contractual or internal
requirements for key
lifecycle control
If using CMK: create the Disk Encryption Set and Key Vault in the same Azure
Government subscription and region as the session hosts. Keys must remain within
the US Gov boundary.
4.1.4 Pre-Deployment Discovery Checklist
Use these questions before scoping an AVD deployment. The answers drive
architecture decisions that are difficult to change after host pool creation.
4.1.4.1 Compute & Applications
• What is the reset model — persistent or ephemeral? Personal
(persistent) pools retain user profiles and installed apps between sessions.
Pooled (ephemeral) pools can be re-imaged on a schedule. This guide
covers personal pools only; pooled pools require FSLogix and a different
compliance conversation.
• Do any applications require a GPU? Standard D-series VMs are CPU-
only. CAD, engineering simulation, and media encoding workloads require
NV-series VMs. GPU quota in US Gov regions must be requested in
advance — lead time can be 2–4 weeks.
Securing Microsoft 365 in GCC High | 2026.04.30
166

• Is nested virtualization required? Docker, Hyper-V, and Android
emulators inside AVD require a VM size that supports nested virtualization
(v4/v5 series). Confirm with the development or DevOps team before
selecting VM size.
4.1.4.2 Network & Egress
• Does the client require source IP anchoring for SaaS apps? Some
government portals allowlist specific public IPs. If session hosts must
present a static public IP, a NAT Gateway attached to the session host
subnet is required.
• Is Azure Firewall Premium with TLS inspection in scope? TLS
inspection breaks AVD traffic unless the Firewall's root certificate is
deployed to session hosts via Intune as a trusted root. Confirm whether the
network team intends to enable TLS inspection before designing the
firewall policy.
• Is RDP Shortpath (UDP 3390) a requirement? Shortpath improves
multimedia performance but requires allowing UDP 3390 direct to session
hosts, bypassing the firewall inspection path for that traffic. For regulated
environments, the latency improvement rarely justifies the network
exception. Default recommendation: disable Shortpath and route all traffic
through the TCP gateway.
4.1.4.3 Identity & Authentication
• Will users connect from GFE or personal/BYOD devices? This drives
Conditional Access policy design. GFE users can use silent sign-on; BYOD
users should see "MFA every time" and download blocks enforced at the
policy level.
• Is FIDO2 / PIV card passthrough into the session required? The
standard PIV flow authenticates once at Entra and carries the token into the
session via SSO — no card passthrough needed. If a use case requires the
physical card inside the session (e.g., signing documents inside the VM),
RDP properties redirectsmartcards:i:1and redirectwebauthn:i:1
must be set, and the target application must support it over RDP.
• Is screen capture protection required? Enabling AVD screen capture
protection prevents the user from sharing their AVD window via Teams or
Zoom running on their local device. It is a strong data-in-place control but
breaks collaboration workflows where users screen-share their session.
Confirm with the client before enabling.
Virtual Desktop Strategy
167

4.1.4.4 Operations
• What is the patching model for personal pool VMs? Personal pool
session hosts cannot be re-imaged on a schedule the way pooled hosts can
— the VM is the user's persistent workspace. Patching options: (1) Intune
Windows Update for Business policies applied to session hosts, or (2)
periodic VM replacement with a new golden image via Drain Mode.
Confirm the client's tolerance for coordinated maintenance windows.
• What is the idle disconnect and session logoff policy? Security
frameworks require session termination after inactivity (NIST SP 800-171
3.1.10). A disconnect preserves open applications for reconnect but leaves
the session alive on the host. A logoff closes all applications. The
distinction is significant for user experience — confirm expected behavior
with stakeholders before configuring RDS session limits.
• Who owns the golden image and what is the update cadence? A custom
image with pre-installed applications requires an Azure Compute Gallery, a
build VM, and a documented update process. If the client cannot commit to
a quarterly or monthly image build cycle, the Microsoft-managed gallery
image with Intune app deployment is the lower-maintenance alternative.
4.1.5 AVD Next Steps
Next Step Article
Implementation checklist (host pool,
RBAC, KFM, verification)
Scenario: Azure Virtual Desktop
Azure Firewall rule reference (FQDN
tables, network rules, KQL)
AVD Firewall Reference
Deployment timeline (65-hour greenfield
estimate)
AVD Deployment Timeline
Compliance control mapping for AVD Scenario: AVD → Control Mapping
Securing Microsoft 365 in GCC High | 2026.04.30
168

4.2 Foundational Architecture &
Design
4.2.1 The Endpoint Security Boundary
Concept: Define what constitutes a managed, compliant endpoint.
Key Point: In a Zero Trust model, the device is the new perimeter. If it touches
sensitive organizational data, it must be managed.
The architecture applies the Microsoft Zero Trust model to compliance
requirements (CMMC Level 2 for GCC High; NIST SP 800-171 Rev. 3 for
Commercial):
• Verify Explicitly: Every device must prove its identity and health state (via
Compliance Policies) before accessing sensitive data.
• Use Least Privilege Access: Users operate as Standard Users; local
administrative rights are removed and managed via LAPS.
• Assume Breach: Configurations assume the network is hostile. Encryption
(BitLocker) and Attack Surface Reduction (ASR) rules are enforced
regardless of network location.
Compliance Context: This boundary enforces the distinction between an
Authorized Device (Managed, Compliant, permitted to access sensitive data) and
an Unmanaged Device (Guest/Personal, blocked from accessing organizational
data).
4.2.2 Configuration Architecture: The Open Intune
Baseline (OIB)
INTUNE BEST PRACTICE
Concept: The strategy for enforcing security controls within the boundary
using community-vetted, granular policies.
A critical design decision in this architecture is the exclusion of generic Microsoft
Foundational Architecture & Design
169

Security Baselines in favor of the Open Intune Baseline (OIB). No one says it
better than Intune MVP Jon Towles in his Intune Security Baselines: The Truth
Behind the Chaos blog post.
While building hundreds of granular policies from scratch is operationally
exhausting, OIB acts as a deployment accelerator. It aggregates frameworks like the
CIS Benchmarks and Microsoft Best Practices into a unified set of modular JSON
files designed explicitly for the Intune Settings Catalog and Endpoint Security
blades.
4.2.2.1 Why OIB Outperforms Built-in Baselines
ENVIRONMENT: GCC HIGH
Microsoft’s built-in baselines offer a "quick start" for commercial
environments, but they introduce significant risks and friction in a regulated
GCC High boundary:
1. Eliminating GCC High "Phantom Errors": Built-in baselines
frequently include hardcoded telemetry and diagnostic data settings
that attempt to communicate with commercial Microsoft endpoints.
Because those endpoints are blocked in GCC High, the profiles sit in
a perpetual "Error" state, ruining dashboard compliance reporting.
OIB’s modular nature allows administrators to surgically strip these
settings out prior to deployment.
2. Version Lifecycle Stability: Updating a Microsoft baseline version is
a destructive action that creates a completely new profile, forcing
administrators to manually migrate years of custom exceptions. OIB
relies on the Settings Catalog; when Microsoft adds new features,
existing OIB profiles remain perfectly intact and version-stable.
3. Preventing "Tattooing" and Conflicts: Built-in baselines frequently
overlap (e.g., both the Windows and Edge baselines configuring
SmartScreen), causing device conflict errors. Furthermore, removing
a built-in baseline often leaves the device "tattooed" with the
restriction permanently. OIB is meticulously designed by the
community to eliminate overlaps and cleanly revert when unassigned.
4. CMMC Defensibility: C3PAO assessors require a clear line of sight
from a NIST 800-171 control to the technical mechanism enforcing it.
Pointing an assessor to a modular, targeted OIB profile is
significantly easier to audit and defend than a monolithic baseline
Securing Microsoft 365 in GCC High | 2026.04.30
170

containing 800 unrelated settings.
GCC HIGH FEATURE PARITY & MODIFICATION
OIB is designed for the commercial cloud. It must be modified prior
to use in GCC High. Features relying on commercial-only APIs
(such as Expedited Telemetry reporting) or commercial identity
endpoints must be stripped or updated. The exact modifications
required to overlay CMMC and GCC High requirements onto OIB are
detailed in Open Intune Baseline Deployment.
ENVIRONMENT: COMMERCIAL
Microsoft’s built-in baselines offer a "quick start" but introduce significant
risks and operational friction in a regulated environment:
1. Version Lifecycle Stability: Updating a Microsoft baseline version is
a destructive action that creates a completely new profile, forcing
administrators to manually migrate years of custom exceptions. OIB
relies on the Settings Catalog; when Microsoft adds new features,
existing OIB profiles remain perfectly intact and version-stable.
2. Preventing "Tattooing" and Conflicts: Built-in baselines frequently
overlap (e.g., both the Windows and Edge baselines configuring
SmartScreen), causing device conflict errors. Furthermore, removing
a built-in baseline often leaves the device "tattooed" with the
restriction permanently. OIB is meticulously designed by the
community to eliminate overlaps and cleanly revert when unassigned.
3. Audit Defensibility: A modular, targeted OIB profile is significantly
easier to audit and defend than a monolithic baseline containing
hundreds of unrelated settings.
Foundational Architecture & Design
171

4.2.3 Device Personas (The Decision Matrix)
Concept: Not all devices are treated equally. There are two archetypes.
Action: Refer to the Technical Decision Matrix for assignment criteria.
• The Knowledge Worker (1:1): * Assigned to a specific user (Faculty/
Staff/Consultant).
◦ Prioritizes User Experience, SSO, and Stability (Windows
Autopatch).
◦ Typical for: Primary workstations, laptops traveling with users.
• The Shared Workspace (1:Many): * Public labs, conference rooms, or
kiosks.
◦ Prioritizes Uniformity (Windows Update for Business) and Reset-
ability (Shared PC Mode).
◦ Typical for: Hot-desking environments, secure enclaves.
4.2.4 The Shift: Imaging vs. Provisioning
Concept: The death of the "Golden Image."
Key Point: The architectural shift from "Monolithic Imaging" (Ghost/SCCM) to
"Modern Provisioning" (Autopilot).
Why: Instead of maintaining static images that decay immediately, we deploy a
standard OEM image and layer configurations on top dynamically. This
methodology is detailed in Provisioning with Windows Autopilot.
4.2.5 Identity Architecture Strategy
Concept: High-level introduction to the "Join" types.
Key Point: The decision fork between Entra Join (Cloud-only) vs. Hybrid Join
(Line of Sight).
• Entra Join (Cloud Only): The preferred modern standard. Eliminates
dependency on on-premise Domain Controllers.
• Hybrid Join: Maintained only for legacy backward compatibility where
direct line-of-sight to an on-prem DC is mandated by legacy applications.
Securing Microsoft 365 in GCC High | 2026.04.30
172

Why: This sets up Entra Join (The Cloud-Only Path) and Hybrid Deployment
(The Transition Path), explaining how each architecture maps to the Personas
defined above.
4.2.6 Hardware Prerequisites (Compliance &
Windows 11)
Concept: The non-negotiable hardware floor for compliance.
Checklist:
• TPM 2.0: Required for BitLocker & Windows 11. (Required for NIST SP
800-171 3.5 authentication controls).
• UEFI / Secure Boot: Must be enabled to support device attestation.
• 64-bit Architecture: Required for modern Windows 11 support.
• Processor Compatibility: Must support Virtualization-Based Security
(VBS) for features like Credential Guard.
4.3 Provisioning with Windows
Autopilot
Windows Autopilot is a provisioning mechanism, not a join type. It sits on top of
the join decisions made in Entra Join (The Cloud-Only Path) and Hybrid
Deployment (The Transition Path), replacing the manual imaging and
deployment workflows that precede enrollment. A device ships from an OEM
directly to an end user, and Autopilot configures it automatically—without IT ever
touching it.
What Autopilot Is What Autopilot Is Not
A cloud-based OOBE configuration
workflow
A device join type (that is Entra Join or
Hybrid Join)
A replacement for imaging/re-imaging A replacement for Intune policy
management
A way to assign profiles and skip OOBE Available without Intune licensing
Provisioning with Windows Autopilot
173

What Autopilot Is What Autopilot Is Not
steps
AUTOPILOT WORKS WITH BOTH JOIN TYPES
Autopilot with Entra Join is the primary, recommended path. Autopilot
with Hybrid Join is supported but requires additional on-prem infrastructure
(the Intune Connector for Active Directory) and line-of-sight to a Domain
Controller during provisioning.
4.3.1 Business Value & Capability Ranking
The capabilities below are listed in order of operational impact. Most deployments
realize the top three immediately; the remaining are additive.
4.3.1.1 1. Zero-Touch Provisioning
The highest-value capability. A device ships from an OEM directly to an end user
— IT never touches it. The user powers it on, signs in with their Entra ID
credentials, and the device self-configures: it joins Entra, enrolls in Intune, applies
all security baselines, installs required applications, and presents the desktop to the
user. The entire workflow replaces the traditional imaging station, staging desk, and
device hand-off.
Operational impact: Eliminates per-device IT labor for new hardware deployment.
For organizations shipping 10+ devices per quarter, the labor savings are
substantial. For geographically distributed teams, it removes the requirement for
users to be on-site or for hardware to route through IT before reaching the field.
4.3.1.2 2. Automatic Corporate Device Designation
Devices registered in Autopilot are automatically flagged as Corporate-owned in
Intune at the moment the hardware hash is registered — before the device is ever
turned on. This distinction matters because enrollment restrictions can (and should)
block personally-owned device enrollment from MDM management entirely.
Without Autopilot registration, a device a user manually enrolls enters Intune as
Securing Microsoft 365 in GCC High | 2026.04.30
174

Personal by default. IT must then manually change the ownership designation —
an operational gap that breaks enrollment restriction enforcement. With Autopilot,
ownership is established at registration time and never ambiguous.
This is also the mechanism for the Ownership field visible in 10-1: Modern Endp
oint Operationsdevice status — devices that read "Corporate" without having
been manually corrected are Autopilot-registered.
4.3.1.3 3. Guaranteed Security Baseline on First Boot
The Enrollment Status Page (ESP) blocks the user from reaching the desktop until
all required applications and device configuration policies have been applied. A
user cannot begin working on a device that is in a partial-policy state. For
compliance environments where device compliance gates resource access via
Conditional Access, this prevents the edge case of a freshly enrolled device that
passes compliance checks before its security policies have landed.
4.3.1.4 4. Group Tag Routing — Right Profile Without Manual
Group Management
Group Tags applied at hardware hash registration automatically route a device into
the correct Entra dynamic group — which carries the correct Autopilot deployment
profile, device naming convention, and initial app assignments. For organizations
with multiple departments, locations, or security tiers, this eliminates manual group
assignment after device registration and the human error that comes with it.
4.3.1.5 5. Autopilot Reset for Device Re-Assignment
When a device transfers from one user to another, Autopilot Reset wipes user data
and re-applies all device-phase policies without removing the device from Intune or
Autopilot registration. This is substantially faster than a full wipe-and-re-enroll
cycle and preserves the device's corporate designation and Autopilot record. See
Device Lifecycle & Onboarding for the re-assignment procedure.
4.3.1.6 6. Self-Deploying Mode for Shared / Kiosk Devices
(Commercial only)
Devices with no dedicated user — shared workstations, kiosks, AVD session host
pre-staging — can enroll and configure themselves with zero user interaction.
Authentication is handled by the device's TPM presenting a device certificate to
Entra. No user account is required at setup time.
Provisioning with Windows Autopilot
175

4.3.1.7 7. Pre-Provisioning (White Glove) for Large App Payloads
(Commercial only)
IT or a reseller pre-stages the device phase (installs heavy applications, applies
certificates) before shipping. The end user sees only the shorter user-phase of the
ESP. Reduces first-boot wait time for devices with large or slow-installing
application sets.
4.3.2 Classic Autopilot (v1) vs. Autopilot Device
Preparation (v2)
Two generations of Autopilot exist. Which generation you use is determined by
your cloud environment.
Classic Autopilot (v1) Device Preparation (v2)
Commercial ? All modes ? User-Driven only
GCC High ? Not supported ? User-Driven only
Deployment Modes User-Driven, Self-
Deploying, Pre-
Provisioning
User-Driven only
Hybrid Join ? User-Driven only ? Not supported
Hash Registration CSV import or OEM direct CSV import, OEM direct,
or Graph API
Enrollment Status Page ? Full (device + user phase) ? Full (device + user phase)
Securing Microsoft 365 in GCC High | 2026.04.30
176

ENVIRONMENT: GCC HIGH
GCC HIGH: CLASSIC AUTOPILOT (V1) IS NOT AVAILABLE
GCC High tenants must use Autopilot Device Preparation (v2). The
setup workflow is different from Classic Autopilot — see the GCC
High tab in the Implementation Guide below. Self-Deploying and
Pre-Provisioning modes are not available in GCC High.
ENVIRONMENT: COMMERCIAL
No corresponding requirement for Commercial tenants.
4.3.3 Deployment Modes
4.3.3.1 User-Driven Mode
The end user powers on the device, signs in with their Entra ID credentials, and
Autopilot completes the rest—applying the Autopilot profile, enrolling in Intune,
and running the Enrollment Status Page (ESP) before handing off the desktop. This
is the standard mode for 1:1 knowledge worker devices.
Works with: Entra Join and Hybrid Join | Available in: Commercial (v1 and v2),
GCC High (v2)
4.3.3.2 Self-Deploying Mode
The device enrolls and configures itself with no user interaction. Authentication is
handled by the device's TPM chip presenting a device certificate to Entra ID. There
is no user sign-in prompt during setup. Used for shared devices, kiosks, and AVD
session hosts that should be pre-configured before any user touches them.
Works with: Entra Join only | Available in: Commercial only (Classic Autopilot
Provisioning with Windows Autopilot
177

v1)
TPM 2.0 REQUIRED FOR SELF-DEPLOYING MODE
Self-Deploying mode requires TPM 2.0 with device attestation support.
Virtual machines require a virtual TPM explicitly enabled. Devices without
a qualifying TPM will fail at the attestation step with error 0x800705B4.
4.3.3.3 Pre-Provisioning (White Glove)
IT or a reseller pre-stages the device phase (applies OEM apps, baseline policies)
before shipping to the end user. The user then completes a shorter OOBE that only
runs the user-phase of the ESP. Reduces end-user wait time for large software
deployments.
Works with: Entra Join and Hybrid Join | Available in: Commercial only
(Classic Autopilot v1)
TRIGGERING TECHNICIAN FLOW
In Classic Autopilot v1, Pre-Provisioning is initiated at the OOBE language
screen by pressing Windows key 5 times. The device enters Technician
Flow, completes the device phase of the ESP (apps, certs, policies), then
seals. When the end user powers it on, they only see the shorter user phase.
4.3.4 Autopilot with Entra Join — The Primary
Path
This is the recommended combination. No on-prem infrastructure is required
beyond DNS records (Phase 1: DNS Discovery Records). The device contacts
Entra ID and Intune directly over the internet during OOBE.
Flow:
Device powers on ? OOBE starts ? Device queries Windows Autopilot Deployment
Service
Securing Microsoft 365 in GCC High | 2026.04.30
178

? Deployment Service returns Autopilot profile
? OOBE skips/shows steps per profile
? User signs in with Entra credentials (User-Driven) or TPM attests (Sel
f-Deploying)
? Device Entra Joins
? Intune enrollment triggers automatically
? ESP runs (installs required apps, applies policies)
? Desktop presented to user
4.3.5 Autopilot with Hybrid Join — Supported,
Higher Overhead
Hybrid Join via Autopilot requires the Intune Connector for Active Directory
installed on an on-prem Windows Server with line-of-sight to a Domain Controller.
The connector brokers the domain join on behalf of the device during OOBE.
Additional requirements vs. Entra Join:
• Windows Server 2016+ joined to your domain, with internet access
• Intune Connector for Active Directory installed and enrolled
• Device must be able to reach a Domain Controller during the Autopilot
OOBE (typically requires on-site provisioning or a VPN-capable pre-boot
environment)
• Only User-Driven mode is supported (no Self-Deploying for Hybrid)
4.3.5.1 When Hybrid Autopilot Makes Sense
Hybrid Autopilot is useful in one specific scenario: issuing new hardware to users
who still require on-prem AD resources. The device ships to the user, Autopilot
handles the Hybrid Join (AD domain join + Entra registration) in a single OOBE
workflow, and the user receives a clean, fully managed profile without requiring IT
to image the machine or bring it to a staging location.
This is the right tool when:
• The user needs Group Policy–delivered resources, legacy on-prem app
authentication, or file shares that require domain membership
• You are deploying new hardware (not re-joining an existing machine)
• You have the Intune Connector and a DC reachable during provisioning
4.3.5.2 What Hybrid Autopilot Does Not Do
Hybrid Autopilot is a provisioning tool for new or factory-reset devices going
through OOBE; it is not a migration tool. Applying it to an existing AD-only joined
Provisioning with Windows Autopilot
179

machine requires wiping that machine first to re-enter OOBE.
Entra Hybrid Join itself, however, does not require a wipe. An existing AD-joined
machine can be brought into Hybrid Join by configuring Entra Connect and the
targeted deployment GPO without touching user data. See Hybrid Deployment for
that procedure, or Migrating to Entra Join if the goal is to move to cloud-only.
Autopilot Reset on a Hybrid-joined device also differs from Entra Join: the device
must reach a Domain Controller during the reset to re-complete the domain join.
This means reset-in-field only works if the device is on-site or connected via VPN.
A Hybrid-joined device reset from a remote location without DC line-of-sight will
partially complete and leave the device in an unenrolled state.
4.3.5.3 Known Issues and Failure Modes
Hybrid Join via Autopilot introduces failure modes that don't exist in Entra Join
deployments. These are often intermittent and difficult to diagnose because the
domain join happens during OOBE — before the admin has a desktop, Event
Viewer, or diagnostic tools available.
Failure mode What happens Root cause Fix
DNS resolution
failure
Domain join
silently fails.
Device completes
OOBE as Entra-
joined only — no
AD computer
object is created.
No error is shown
to the user.
The device is on a
network segment
(guest Wi-Fi,
wrong VLAN,
hotel network) that
cannot resolve the
AD domain name
via DNS. The
Intune Connector
requests a domain
join, but the device
can't locate a DC.
Ensure the device is
on a network with
DNS resolution to
the AD domain.
For on-site
provisioning, use a
wired connection or
a Wi-Fi network on
the corporate
VLAN.
Intune Connector
timeout
ESP hangs at
"Joining your
organization's
network" for 30+
minutes, then fails.
The Intune
Connector for
Active Directory
has a 30-minute
timeout for creating
the computer object
in AD. Slow WAN
links, overloaded
DCs, or connector
service issues cause
Check the Intune
Connector service
on the on-prem
server (ODJConnec
torSvc). Verify the
connector server
has fast, reliable
connectivity to a
writable DC.
Review the
Securing Microsoft 365 in GCC High | 2026.04.30
180

Failure mode What happens Root cause Fix
the operation to
expire.
connector logs at
C:\ProgramData\
Microsoft\Intun
eConnector\Logs.
Computer object
pre-staging
conflict
Domain join fails
with an ambiguous
error during ESP.
Someone pre-
created the
computer object in
AD (common in
orgs that stage
objects in specific
OUs for GPO
targeting). The
connector tries to
create the object in
its configured OU
but the name
already exists in a
different OU.
Either delete the
pre-staged object
before Autopilot
runs, or configure
the connector to
target the same OU
where the object
was pre-created. Do
not pre-stage
objects for
Autopilot Hybrid
Join — let the
connector create
them.
VPN bootstrap
chicken-and-egg
Remote user cannot
complete Hybrid
Join because the
device can't reach a
DC.
The user is at home
or off-site. The
VPN client isn't
installed until ESP
completes, but the
domain join
requires DC access
before ESP
finishes. There is
no pre-boot VPN
available.
Hybrid Join
Autopilot is not
viable for remote
provisioning
without a pre-boot
VPN or Always On
VPN configured at
the network level.
Provision Hybrid
Join devices on-site
only, or use Entra
Join for remote
users and migrate
to Hybrid Join later
via Entra Connect.
Clock skew Kerberos
authentication to
the DC fails during
the domain join.
Device may show a
generic "Something
went wrong" error
or silently fall back
to Entra Join only.
New-in-box
hardware that has
been in a
warehouse may
have a significantly
drifted system
clock. Autopilot
syncs the clock via
NTP, but in some
Ensure the
provisioning
network allows
outbound NTP
(UDP 123) to tim
e.windows.com. If
provisioning in a
restricted network,
configure a local
Provisioning with Windows Autopilot
181

Failure mode What happens Root cause Fix
network
configurations the
domain join
attempt occurs
before the clock
sync completes,
and Kerberos
rejects the
authentication due
to time skew.
NTP server and
point the DHCP
scope's NTP option
at it. For persistent
issues, manually set
the clock at the
OOBE command
prompt (Ctrl+Shi
ft+F10→ w32tm
/resync /force)
before allowing
OOBE to proceed.
THESE FAILURES ARE SILENT
Most Hybrid Join failures during Autopilot do not produce a clear error
message. The device often completes OOBE in an Entra-joined-only state
— the user can sign in and work, but Group Policy, domain-authenticated
file shares, and on-prem apps that require a domain-joined machine fail
silently later. Always verify the join state after provisioning:
dsregcmd /status
Check that bothAzureAdJoined: YES and DomainJoined: YES appear.
If only AzureAdJoined is YES, the Hybrid Join failed and the device needs
to be reprovisioned on a network with DC line-of-sight.
Securing Microsoft 365 in GCC High | 2026.04.30
182

4.3.5.4 Keep Entra Join and Hybrid Join Profiles Strictly Separate
Provisioning with Windows Autopilot
183

DO NOT MIX ENTRA JOIN AND HYBRID JOIN AUTOPILOT PROFILES
— THEY CONFLICT
The Join type setting in an Autopilot Deployment Profile (Microsoft Ent
ra joinedvs. Hybrid Entra joined) fundamentally changes how the
device completes OOBE. If an Entra-joined device receives a Hybrid
profile, it will attempt to contact the Intune Connector for a domain join
that cannot succeed — provisioning will fail or the device will end up in an
ambiguous join state.
Enforce separation with dynamic device groups:
Group Membership Rule Assigned Profile
Autopilot-EntraJoin device.devicePhysic
alIds -any (_ -eq
"[OrderID]:EntraJoi
n")
Entra Join deployment
profile
Autopilot-HybridJoi
n
device.devicePhysic
alIds -any (_ -eq
"[OrderID]:HybridJo
in")
Hybrid Join deployment
profile
Use a Group Tag (-GroupTag "EntraJoin"or -GroupTag "HybridJoi
n") when collecting hardware hashes to route each device into the correct
group at registration time. Never assign both profiles to overlapping
groups.
Profile settings that behave differently between join types:
Setting Entra Join Profile Hybrid Join Profile
Join type Microsoft Entra joined Hybrid Entra joined
Intune Connector Not used Required
Domain Controller
reach during OOBE
Not required Required
Self-Deploying mode Supported Not supported
Securing Microsoft 365 in GCC High | 2026.04.30
184

Setting Entra Join Profile Hybrid Join Profile
(Commercial)
Pre-Provisioning (White
Glove)
Supported
(Commercial)
Supported
(Commercial), but DC
must be reachable
GCC High (v2) support Supported Not supported
ENVIRONMENT: GCC HIGH
GCC HIGH: HYBRID AUTOPILOT (V1) IS NOT AVAILABLE
Autopilot Device Preparation (v2) — the only Autopilot generation
available in GCC High — supports Entra Join only. There is no
Hybrid Join path via Autopilot in GCC High. Hybrid-join new
hardware in GCC High requires manual domain join followed by
Entra registration, or use of the Hybrid Deployment checklist.
ENVIRONMENT: COMMERCIAL
No corresponding requirement for Commercial tenants.
4.3.6 Enrollment Status Page (ESP)
The ESP blocks the user from reaching the desktop until required applications and
policies have been applied. It has two phases:
Provisioning with Windows Autopilot
185

Phase What It Covers When It Runs
Device phase Device-targeted apps,
certificates, device config
profiles
Before user sign-in (Self-
Deploying and Pre-
Provisioning)
User phase User-targeted apps, user
config profiles
After user signs in
Key settings:
Setting Recommended Value Reason
Show app and profile
configuration progress
Yes User transparency; helps
with troubleshooting
Block device use until all
apps and profiles are
installed
Yes Ensures baseline security
before user access
Allow users to reset device
if installation error occurs
No Prevents accidental
reprovisioning
Allow users to use device
if installation error occurs
after timeout
No Prevents unenrolled device
access
Error timeout (minutes) 60 Allows time for large app
installs on slow
connections
Securing Microsoft 365 in GCC High | 2026.04.30
186

4.3.7 Implementation Guide
OEM DIRECT REGISTRATION (BOTH ENVIRONMENTS)
Many OEMs (Dell, HP, Lenovo, Microsoft Surface) can pre-register
hardware hashes directly into your Intune tenant at order time — provide
your Tenant ID to your account representative. Devices arrive already
registered and require no manual hash collection. This works for both
Commercial and GCC High tenants.
ENVIRONMENT: GCC HIGH
GCC High tenants use Windows Autopilot Device Preparation (v2), which
replaces the Classic Autopilot deployment profile with a device preparation
policy assigned to a user group. The policy triggers automatically when a user
from the target group signs in during OOBE.
4.3.7.1 Step 1: Configure MDM User Scope
Complete the MDM User Scope configuration in Phase 2: Entra
Configuration and confirm these GCC High-specific MDM URLs are set:
• Navigate to Entra > Settings > Mobility > Microsoft Intune
◦ MDM User Scope: Autopilot Usersgroup (or All)
◦ MDM terms of use URL: https://portal.manage.micro
soft.us/TermsofUse.aspx
◦ MDM discovery URL: https://enrollment.manage.mic
rosoft.us/enrollmentserver/discovery.svc
◦ MDM compliance URL: https://portal.manage.micro
soft.us/?portalAction=Compliance
4.3.7.2 Step 2: Allow Device Join
• Navigate to Entra > Devices > All Devices > Manage > Device
settings
• Users may join devices to Microsoft Entra: Set to All (default)
Provisioning with Windows Autopilot
187

4.3.7.3 Step 3: Create the Device Group
This group receives devices as they complete provisioning. Assign your
Intune device policies (security baselines, compliance policies, app
deployments) to this group.
• Navigate to Entra > Groups > All Groups > New Group
◦ Group name: Autopilot Deployed
◦ Group type: Security
◦ Membership type: Assigned
◦ Owners: Add Intune Provisioning Clientas an owner
WHY "INTUNE PROVISIONING CLIENT" MUST BE AN OWNER
The Intune Provisioning Client service principal places devices into
this group during provisioning. Without it as an owner, device
placement fails silently.
4.3.7.4 Step 4: Create the User Group
Only users in this group will trigger the Device Preparation policy during
OOBE.
• Navigate to Entra > Groups > All Groups > New Group
◦ Group name: Autopilot Users
◦ Group type: Security
◦ Membership type: Assigned
◦ Add all users authorized to provision new devices as
members
4.3.7.5 Step 5: Create the Device Preparation Policy
• Navigate to Intune > Devices > Windows > Windows enrollment >
Device preparation policies > Create
Securing Microsoft 365 in GCC High | 2026.04.30
188

Setting Value
Name Autopilot Device Preparation
Device group Autopilot Deployed
Deployment mode User-driven
Join type Microsoft Entra joined
User account type Standard User
Allowed apps Add any applications required before
the user reaches the desktop
• Assignments: Assign to the Autopilot Usersgroup
4.3.7.6 Step 6 (Optional): Pre-Register Hardware Hashes via
Graph API
Pre-registration lets Intune identify the device at the first OOBE screen.
Without it, the Device Preparation policy still applies — it just activates on
sign-in rather than on machine startup.
Collect the hash (press CTRL+SHIFT+F10 during OOBE to open
PowerShell):
Install-Script -Name Get-WindowsAutoPilotInfo -Force
Set-ExecutionPolicy -ExecutionPolicy Unrestricted
Get-WindowsAutoPilotInfo.ps1 -OutputFile AutoPilotHardwareHash.csv
Upload to GCC High tenant via Microsoft Graph:
Install-Module -Name Microsoft.Graph -Force
Connect-MgGraph -Environment USGov
$csvFile = Import-Csv -Path ".\AutoPilotHardwareHash.csv"
foreach ($device in $csvFile) {
$body = @{
serialNumber       = $device.'Device Serial Number'
productKey         = $null
hardwareIdentifier = $device.'Hardware Hash'
} | ConvertTo-Json -Depth 10
Invoke-MgGraphRequest -Method POST `
-Uri "https://graph.microsoft.us/beta/deviceManagement/importedW
Provisioning with Windows Autopilot
189

indowsAutopilotDeviceIdentities" `
-Body $body -ContentType "application/json"
}
ENVIRONMENT: COMMERCIAL
4.3.7.7 Step 1: Register Hardware Hashes
For devices not pre-registered by the OEM, collect the hash and upload via the
portal:
# Collect hash and output to CSV (include a Group Tag to auto-assign to
a dynamic group)
Install-Script -Name Get-WindowsAutoPilotInfo
Get-WindowsAutoPilotInfo -OutputFile C:\AutopilotHash.csv -GroupTag "Eng
ineering"
• Navigate toIntune > Devices > Windows > Windows enrollment >
Devices
• Click Import and upload the CSV
BULK COLLECTION ACROSS MULTIPLE DEVICES
Run Get-WindowsAutoPilotInfowith the -ComputerName
parameter to collect hashes remotely, or deploy it as an Intune script
to re-register already-enrolled devices.
4.3.7.8 Step 2: Create an Autopilot Deployment Profile
Navigate to Intune > Devices > Windows > Windows enrollment >
Deployment profiles > + Create profile > Windows PC.
Setting User-Driven (Entra
Join) Self-Deploying
Deployment mode User-Driven Self-Deploying
Securing Microsoft 365 in GCC High | 2026.04.30
190

Setting User-Driven (Entra
Join) Self-Deploying
Join to Entra ID as Entra joined Entra joined
Microsoft Software
License Terms
Hide Hide
Privacy settings Hide Hide
Hide change account
options
Hide —
User account type Standard User —
Allow pre-provisioned
deployment
Yes (if using White
Glove)
No
Language OS Default OS Default
Automatically configure
keyboard
Yes Yes
Apply device name
template
Optional (e.g., DEPT-%SE
RIAL%)
Optional
Assign the profile to your Autopilot device group.
4.3.7.9 Step 3: Configure the Enrollment Status Page
Navigate to Intune > Devices > Windows > Windows enrollment >
Enrollment Status Page.
Create an ESP profile and assign it to the same device group as your Autopilot
Provisioning with Windows Autopilot
191

profile. Configure per the settings table in the ESP section above.
DEFAULT ESP PROFILE APPLIES TO ALL DEVICES
Intune ships with a default ESP that applies to all users and devices.
Assign a custom ESP at higher priority to ensure it wins.
4.3.7.10 Step 4: Assign Profiles to Groups
1. Create a static Entra ID security group named Autopilot Device
s
2. Add devices as hardware hashes are registered (Intune auto-populates
device objects)
3. Assign both the Deployment Profile and ESP to this group
For Hybrid Join Autopilot, also ensure the Intune Connector for Active
Directory service account has permissions to create computer objects in the
target OU.
4.3.7.11 Provision and Verify
To provision a device:
1. Factory reset (or unbox new device) and power on
2. Connect to internet — Ethernet is recommended for first run to avoid WiFi
driver issues during OOBE
3. OOBE runs. For Commercial (v1): the Autopilot profile is detected
automatically and configured steps are skipped. For GCC High (v2): the
Device Preparation policy triggers when the target user signs in.
4. ESP runs (device phase, then user phase)
5. Desktop is presented
Verification — Intune Portal:
• Navigate to Intune > Devices > Windows > Windows enrollment >
Securing Microsoft 365 in GCC High | 2026.04.30
192

Devices
• The device should move from "Registered" to "Enrolled" status
Verification — On Device:
dsregcmd /status
• AzureAdJoined : YES(Entra Join) or DomainJoined : YES+ AzureAdJ
oined : YES(Hybrid)
• MDMEnrolled : YES
Common Provisioning Errors (Commercial v1):
Error Code Meaning Fix
0x800705B4 TPM attestation timeout
(Self-Deploying)
Verify TPM 2.0 is enabled
and meets attestation
requirements
0x801c0003 Device not registered in
Autopilot
Register the hardware hash
and wait 15 min for sync
0x80180018 MDM terms of use
endpoint unreachable
Check DNS records and
firewall rules for Intune
endpoints
0x80070032 ESP app installation
timeout
Increase ESP timeout or
investigate failing app
Provisioning with Windows Autopilot
193

Error Code Meaning Fix
deployment
BYPASSING REGION, KEYBOARD, AND WIFI PROMPTS IN OOBE
Drop this JSON file before OOBE begins to pre-configure locale settings
— this works in both environments:
Path: C:\Windows\Provisioning\Autopilot\AutopilotConfigurati
on.json
{
"CloudAssignedLanguage": "en-US",
"CloudAssignedRegion": "US",
"CloudAssignedKeyboard": "us",
"CloudAssignedOobeConfig": 177
}
Pre-configure WiFi for OOBE connectivity by exporting from a working
machine and importing on the target:
netsh wlan export profile name="Corp-WiFi" key=clear folder="D:\Autopi
lot"
netsh wlan add profile filename="D:\Autopilot\Wi-Fi-Corp-WiFi.xml"
This is aone-time technician step to give the device network access
during Autopilot OOBE — before Intune enrollment completes and the
managed Wi-Fi profile is delivered. For ongoing Wi-Fi management after
enrollment, deploy Intune Wi-Fi configuration profiles as documented in
Mobile & Endpoint Security: Wi-Fi Configuration.
How to apply it:
• Commercial (v1, White Glove): Press Windows key 5 times at
the OOBE language screen to enter Technician Flow, drop the
JSON and WiFi files, then reseal.
• Any environment (v2 / no White Glove): Press
CTRL+SHIFT+F10 at any OOBE screen to open a command
prompt. Drop the files, then reboot to resume OOBE with prompts
bypassed.
Securing Microsoft 365 in GCC High | 2026.04.30
194

4.3.8 Group Tags and Device Naming
Group Tags allow a hardware hash import to automatically route devices into the
correct Entra group—and therefore the correct deployment profile and naming
convention—without any manual group assignment after registration.
4.3.8.1 How Group Tags Work
1. Specify a Group Tag when collecting the hardware hash:
Get-WindowsAutoPilotInfo -OutputFile AutopilotHWID.csv -GroupTag "Engi
neering"
2. Create aDynamic Device Group in Entra with the membership rule:
device.devicePhysicalIds -any (_ -eq "[OrderID]:Engineering")
3. Assign the Autopilot Deployment Profile (and ESP) to this dynamic group.
4. Devices taggedEngineeringare automatically placed in the group after
hash import and receive the Engineering profile at OOBE — no manual
group membership management required.
4.3.8.2 Device Naming Templates
Configure a naming template in the Autopilot Deployment Profile (Apply device
name template: Yes):
Pattern Example Result Use Case
DEPT-%SERIAL% ENG-5CG1234ABC Department-coded,
traceable names
CRP-%RAND:5% CRP-A3F72 Generic corporate naming
LOC-BLDG-%RAND:4% LOC-BLDG-3B9C Location-coded names
• The full device name (prefix + serial/random) must be = 15 characters
• %SERIAL%uses the hardware serial number (unique and traceable)
• %RAND:N%generates N random alphanumeric characters
Provisioning with Windows Autopilot
195

4.3.9 Retiring an Autopilot Device
For the full decommission procedure — including Intune retire, factory reset,
Autopilot record deletion, and Entra cleanup — see Device Lifecycle &
Onboarding: Device Retirement. Autopilot-registered devices require the
additional step of deleting the Autopilot device record before deleting from Entra;
that procedure is documented there.
4.4 Entra Join (The Cloud-Only Path)
4.4.1 Cloud-Only Architecture
4.4.1.1 Entra Join (No Domain Controllers)
For modern physical devices, the gold standard is 100% Entra Join. This removes
the dependency on line-of-sight to a Domain Controller, complex VPNs, and
Hybrid sync latency. The device identity lives solely in the cloud.
4.4.1.2 Instant Intune Enrollment
Unlike Hybrid Join, which requires a GPO to trigger enrollment, Entra Joined
devices enroll in Intune automatically the moment they join the
directory—provided the MDM User Scope is correctly configured.
4.4.2 Entra Join Deployment Checklist
Because we have removed the sync and GPO layers, this deployment is
significantly faster and less prone to retry loops. However, the DNS and Entra
configuration prerequisites are strict.
4.4.2.1 Phase 1: DNS Discovery Records
Devices act as clients that need to discover their management endpoints. Ensure
your public and private DNS entries have these records for every UPN suffix in use.
Host Name enterpriseregistratio
n.[yourdomain.com]
Record Type CNAME
Securing Microsoft 365 in GCC High | 2026.04.30
196

Host Name enterpriseregistratio
n.[yourdomain.com]
Value enterpriseregistration.windows.ne
t
Purpose Tells the device where to register its
identity in Entra ID.
ENVIRONMENT: GCC HIGH
Host Name enterpriseenrollmen
t.[yourdomain.com]
Record Type CNAME
Value enterpriseenrollment-s.manage.m
icrosoft.us
Purpose Tells the device where the GCC High
Intune enrollment server is located.
ENVIRONMENT: COMMERCIAL
Host Name enterpriseenrollmen
t.[yourdomain.com]
Record Type CNAME
Value enterpriseenrollment-s.manage.m
icrosoft.com
Purpose Tells the device where the Commercial
Intune enrollment server is located.
Entra Join (The Cloud-Only Path)
197

4.4.2.2 Phase 2: Entra Configuration (The Trigger)
In a cloud-only world, there is no GPO to push enrollment. The MDM User Scope
is the only trigger.
• [ ] Configure MDM User Scope:
◦ Navigate to Entra ID > Mobility (MDM and MAM) > Microsoft
Intune.
◦ MDM User Scope: Set to All (or target your device user group).
◦ WIP User Scope: Set to None.
▪ Warning: If set to "All," enrollment may default to MAM
(app management only) rather than full device
management.
• [ ] Configure enrollment restrictions:
◦ Go to the Microsoft Intune admin center.
◦ Navigate to Devices > Enrollment > Device platform restriction.
◦ Select the Windows restrictions tab and click Create restriction.
◦ Set Name to Block Personally Owned Devices.
◦ Set Description to Block enrollment of personally owned
devices.
◦ Click Next, set Personally owned devices to Block
◦ Assign to All users.
DEVICES ARE "PERSONAL" BY DEFAULT — DESIGNATE
CORPORATE DEVICES FIRST
When this restriction is active, Intune blocks enrollment of any device not
already designated as Corporate. Devices have no corporate designation
until you explicitly assign one. Enabling this restriction without a corporate
designation mechanism in place will block all new enrollments.
For Entra Joined devices, there are two supported methods to designate a
device as Corporate before enrollment:
• Autopilot registration (recommended): Devices pre-registered
through Provisioning with Windows Autopilot are automatically
marked Corporate by the Autopilot service at the start of OOBE.
• Corporate identifiers: Upload device serial numbers to Intune >
Devices > Enrollment > Corporate device identifiers. Any
device whose serial number matches is marked Corporate when it
enrolls — no Autopilot infrastructure required.
Securing Microsoft 365 in GCC High | 2026.04.30
198

4.4.2.3 Phase 3: Verification & Success Indicators
Once the device is joined, verify state before declaring success.
• [ ] Run Verification Command:
◦ Open Command Prompt and type: dsregcmd /status
• [ ] Verify Identity State:
◦ AzureAdJoined : YES— The device is natively cloud joined.
◦ DomainJoined : NO— This is correct for cloud-only. If this says
YES, the device was accidentally Hybrid Joined.
◦ AzureAdPrt : YES— The user has a valid cloud token.
• Verify Discovery: Scroll down to the Tenant Details section. This is
where you verify that the device is pointed at the correct cloud tenant:
ENVIRONMENT: GCC HIGH
• MdmUrl: Must point to https://enrollment.manage.microsoft.u
s/enrollmentserver/discovery.svc
• MdmTouUrl: Must point to https://portal.manage.microsoft.u
s/TermsofUse.aspx
CRITICAL SOVEREIGN CHECK
If MdmUrl points to a .com address, the machine is attempting to
enroll in Commercial.
ENVIRONMENT: COMMERCIAL
• MdmUrl: Must point to https://enrollment.manage.microsoft.c
om/enrollmentserver/discovery.svc
• MdmTouUrl: Must point to https://portal.manage.microsoft.co
Entra Join (The Cloud-Only Path)
199

m/TermsofUse.aspx
CRITICAL SOVEREIGN CHECK
If MdmUrl points to a .us address, the machine is attempting to enroll
in USGov.
• [ ] Visual Verification (Settings):
◦ Open Settings > Accounts > Access work or school.
◦ You should see the connection to your Entra ID tenant.
◦ Click the connection. You should see an Info button.
▪ If the Info button is missing: The device is joined but not
enrolled. Check the MDM User Scope in Phase 2.
4.4.3 Phishing-Resistant Windows Logon (optional
for Entra Join)
For Entra Join, Intune enrollment is interactive and can satisfy standard MFA CA
policies without WHfB in place. However, until phishing-resistant Windows logon
auth is configured users will receive per-app MFA prompts after each login because
the Windows-logon PRT carries no MFA claim.
CONFIGURE WINDOWS HELLO FOR BUSINESS AFTER
ENROLLMENT
See Windows Hello for Business Setup & Troubleshooting for Intune
policy configuration and diagnostic steps. For the full set of options
including PIV cards and FIDO2 NFC keys for constrained environments,
see Phishing-Resistant Authentication.
Securing Microsoft 365 in GCC High | 2026.04.30
200

4.4.4 Migrating Existing Machines
TRANSITIONING FROM DOMAIN OR HYBRID JOIN?
For environments where existing user profiles must be preserved during the
transition, see Scenario: Migrating to Entra Join. This checklist covers
greenfield deployments only.
4.5 Hybrid Deployment (The
Transition Path)
4.5.1 Hybrid Architecture
4.5.1.1 Entra Hybrid Join & Coexistence With Entra Join
Best practice is Entra Hybrid Join for existing machines where we want to preserve
user profiles. New machines get new profiles anyway so can start to employ Entra
Join. Once all users have gone through their hardware refresh cycle, the company is
100% Entra Joined.
4.5.1.2 Windows Hello for Business GPO
Entra Hybrid Join is a prerequisite for WHfB in this deployment — the device must
be domain-joined and Entra-registered before the Cloud Kerberos Trust can be
established. Once Hybrid Join is complete, Windows Hello for Business deployed
by GPO allows the background Intune enrollment process to meet the MFA
requirements of an "all resources" MFA Conditional Access policy without
prompting the user.
4.5.1.3 Intune Enrollment GPO
Hybrid Entra Joined machines are directed to enroll in Intune by an AD GPO (Entra
Joined machines enroll in Intune directly).
4.5.1.4 Conditional Access for Hybrid Join
Since we are deploying Windows Hello for Business before Intune enrollment, we
Hybrid Deployment (The Transition Path)
201

don't need to create an exception in our MFA Conditional Access policies for the
Microsoft Intune Enrollment app.
4.5.2 Hybrid Deployment Checklist
Microsoft endpoint management tends to be asynchronous. Machine checks in,
something happens, machine checks in again, the next step happens. This leads to
latency in policy application. Two approaches to these latencies are illustrated
below. I tend to be the guy on the left and want to see my changes right away. This
deployment and troubleshooting is written from that perspective - providing the
commands to push the process along. Once initial deployments are complete, a
more relaxed approach can make sense.
Securing Microsoft 365 in GCC High | 2026.04.30
202

4.5.2.1 Phase 1: Address Third Party Software
Third party encryption and antivirus can interfere with BitLocker and Defender for
Endpoint.
• [ ] Third Party Encryption:
◦ Decrypt third party encrypted disks and uninstall third party
encryption software.
◦ Otherwise, exclude this machine from BitLocker encryption to
avoid double encryption.
• [ ] Third Party Antivirus:
◦ Uninstall third party antivirus software.
◦ Otherwise, Defender for Endpoint in passive mode can coexist
with third party antivirus.
▪ Windows 10 & 11 (Automatic): Defender automatically
flips to Passive Mode.
▪ Windows Server (Manual): Set registry to force Passive
Mode before MDE onboarding.
▪ Path: HKLM\SOFTWARE\Policies\Microsoft\W
indows Advanced Threat Protection
▪ Name: ForceDefenderPassiveMode
▪ Type: REG_DWORD
▪ Value: 1
4.5.2.2 Phase 2: Create DNS Discovery Records
Before a device can enroll in Intune, it needs to know where to find your specific
Intune cloud environment. It does this by asking the public internet for directions
using your company's domain name (e.g., user@contoso.com).
You must create two CNAME (Canonical Name) records in the public (and
private) DNS settings for your domain (usually managed wherever you bought your
domain, like GoDaddy, Cloudflare, or Network Solutions).
You must create these two records for every email domain your users sign in with
(e.g., if users sign in with @contoso.comand @contoso.net, you need to create
these records on both domains).
First DNS Record: Entra Hybrid Join
Entra Hybrid Join requires the device to receive instructions from an authoritative
source in Active Directory. This either takes the form of a Group Policy Object
(GPO) or a Service Connection Point (SCP). This conveys the intention of a trusted
Hybrid Deployment (The Transition Path)
203

admin to manage settings on this device.
Host Name enterpriseregistratio
n.[yourdomain.com]
Record Type CNAME
Value enterpriseregistration.windows.ne
t
Purpose Tells the device where to register its
identity in Entra ID.
Second DNS Record: Intune Autoenrollment
WHY CLIENTS FAIL HERE
If these CNAME records are missing, Phase 3 (joining the domain) might
succeed, but Phase 5 (Intune Enrollment) will silently fail. The device will
be joined to the network, but it will be "blind" to the Intune management
servers.
ENVIRONMENT: GCC HIGH
Host Name enterpriseenrollmen
t.[yourdomain.com]
Record Type CNAME
Value enterpriseenrollment-s.manage.m
icrosoft.us
Purpose Tells the device where the GCC High
Intune enrollment server is located.
Securing Microsoft 365 in GCC High | 2026.04.30
204

ENVIRONMENT: COMMERCIAL
Host Name enterpriseenrollmen
t.[yourdomain.com]
Record Type CNAME
Value enterpriseenrollment-s.manage.m
icrosoft.com
Purpose Tells the device where the Commercial
Intune enrollment server is located.
4.5.2.3 Phase 3: Entra Hybrid Join
Entra Hybrid Join takes several steps and line-of-sight to a domain controller (may
need VPN).
• [ ] Entra Hybrid Join Targeted Deployment:
◦ GPOs allow you to create a targeted Entra Hybrid Join deployment.
◦ gpupdate /forceto sync GPOs to this device
◦ gpresult /r /scope computerto see what GPOs have been
applied to this device
◦ These are the registry keys applied by this GPO:
▪ HKLM\SOFTWARE\Microsoft\Windows\CurrentVersio
n\CDJ\AAD\TenantId
▪ HKLM\SOFTWARE\Microsoft\Windows\CurrentVersio
n\CDJ\AAD\TenantName
• [ ] Entra Connect:
◦ Entra Connect needs to be configured for Entra Hybrid Join.
◦ Synchronization Service Manager provides a real-time view of
adds, updates, and deletes.
• [ ] Entra Hybrid Join Process:
◦ A: User sign-in triggers Automatic Device Join task.
Hybrid Deployment (The Transition Path)
205

▪ Task Scheduler Library> Microsoft> Windows> Wo
rkplace Join
▪ Right-click the task named Automatic-Device-Join and
select Run.
▪ Alternatively, you can type dsregcmd /join.
▪ You can see the results in Event Viewer
▪ Applications and Services Logs> Microso
ft> Windows> User Device Registration >
Admin
▪ Event ID 304 ("The registration of the device was
successful").
▪ Event ID 305 (Registration failed). ex: 0x801c00
1d(SCP missing)
◦ B: Task queries AD for service connection point (or registry for
our targeted deployment).
▪ CRITICAL: May fail if VPN/Line-of-Sight is missing.
▪ CRITICAL: Fails if device can't resolve enterprisereg
istration.windows.netvia public DNS.
# If using SCP (and not a targeted deployment) run this to see
what your computers see in AD.
$scp = Get-ADObject -Filter 'objectClass -eq "serviceConnectio
nPoint" -and name -eq "62a0ff2e-97b9-4513-943f-0d221bd30080"'
-SearchBase (Get-ADRootDSE).configurationNamingContext -Proper
ties keywords
$scp.keywords
◦ C: Task creates a self-signed certificate and writes it to the
computer object in AD.
◦ D: Entra Connect detects and writes certificate to Azure DRS
which (eventually) writes to Entra.
▪ Synchronization Service Manager will display the
computer object being sync'd to Entra.
▪ The device will now show as "Pending" in the Entra
Securing Microsoft 365 in GCC High | 2026.04.30
206

Portal.
DEVICES STUCK IN PENDING
There is a common issue where an old "Entra
Registered" (BYOD) record exists for the same
machine.
Suggestion: If a device is stuck in "Pending," the
admin should check for a duplicate "Entra
Registered" record with the same name. If one
exists, it can sometimes block the "Hybrid Joined"
record from completing the handshake. Run
dsregcmd /debug /leave as SYSTEM to clear the
local state before retrying.
◦ E: Task keeps retrying until step D is complete and Entra issues an
ID token to the computer.
◦ F&G: Task processes ID token and sends cert request to DRS
which returns cert and updates Entra.
▪ The device status in the Entra Portal will now change from
"Pending" to a joined date and time.
◦ H: Device registration completed and task exits.
Once the background registration tasks finish, you must verify that
the device has not only joined the directory but has also
successfully "discovered" the Intune management endpoints.
1. Run the Verification Command: Open a Command
Prompt and type: dsregcmd /status
2. Verify Identity & Auth State: In the Device State and
User State sections, confirm the following:
▪ AzureAdJoined : YES— The device has a
unique identity in Entra ID.
▪ DomainJoined : YES— The device maintains
its anchor to your local Active Directory.
▪ AzureAdPrt : YES— CRITICAL. This
Hybrid Deployment (The Transition Path)
207

"Primary Refresh Token" is the secret sauce.
Without a YEShere, the "Silent" Intune enrollment
in Phase 5 will fail because the device cannot
authenticate to the service without prompting the
user.
3. Verify Discovery: Scroll down to the Tenant Details
section. This is where you verify that the device "sees"
your sovereign cloud tenant:
ENVIRONMENT: GCC HIGH
▪ MdmUrl: Must point to https://enrollmen
t.manage.microsoft.us/enrollmentser
ver/discovery.svc
▪ MdmTouUrl: Must point to https://porta
l.manage.microsoft.us/TermsofUse.as
px
CRITICAL SOVEREIGN CHECK
If MdmUrl points to a .com address, the
machine is attempting to enroll in
Commercial.
ENVIRONMENT: COMMERCIAL
▪ MdmUrl: Must point to https://enrollmen
t.manage.microsoft.com/enrollmentse
rver/discovery.svc
▪ MdmTouUrl: Must point to https://porta
l.manage.microsoft.com/TermsofUse.a
Securing Microsoft 365 in GCC High | 2026.04.30
208

spx
CRITICAL SOVEREIGN CHECK
If MdmUrl points to a .us address, the
machine is attempting to enroll in USGov.
4. Troubleshooting Discovery (The DNS Link):
▪ If the MDM URLs are blank: The device
identity is registered, but it is "blind" to the Intune
service.
▪ The Check: Verify your Public DNS (and
Internal DNS if split-brain) contains the following
CNAME record for every UPN suffix in use:
ENVIRONMENT: GCC HIGH
Host Name
enterpriseenroll
men
t.[yourdomain.com
]
Record Type CNAME
Value enterpriseenroll
ment-s.manage.mi
crosoft.us
Purpose Tells the device
where the GCC High
Intune enrollment
server is located.
Hybrid Deployment (The Transition Path)
209

ENVIRONMENT: COMMERCIAL
Host Name
enterpriseenroll
men
t.[yourdomain.com
]
Record Type CNAME
Value enterpriseenroll
ment-s.manage.mi
crosoft.com
Purpose Tells the device
where the
Commercial Intune
enrollment server is
located.
▪ The Scope: Ensure the user's account is included
in the MDM User Scope under Entra ID >
Mobility (MDM and MAM) > Microsoft Intune.
5. Success Indicator (Entra Portal): In the Entra Admin
Center, the device record should move from a "Pending"
status to displaying a specific Join Type (Microsoft Entra
hybrid joined) with a valid Registered date and time.
Securing Microsoft 365 in GCC High | 2026.04.30
210

4.5.2.4 Phase 4: Windows Hello for Business
WHFB MUST BE IN PLACE BEFORE PHASE 5
Unlike Entra Join, where enrollment is interactive, Intune enrollment for
Hybrid Joined machines runs as a background, non-interactive task. It
authenticates using the Primary Refresh Token (PRT) from the user's
current Windows logon session. If that PRT carries no MFA claim —
which is the case after a plain password login — the enrollment task fails
silently with Event ID 76 (0x8018002A: MFA required).
WHfB at Windows logon is what mints a PRT carrying the phishing-
resistant MFA claim the background task needs. It must be provisioned on
this machine before Phase 5 triggers.
For GPO configuration steps (Cloud Kerberos Trust + WHfB GPO), diagnostic
commands (dsregcmd /statusNgc fields, Event Viewer logs), and common
silent blockers, see Windows Hello for Business Setup & Troubleshooting.
For the full set of phishing-resistant Windows logon options including PIV cards
and FIDO2 NFC keys for environments where cameras, fingerprint readers, and
USB ports are not viable, see Phishing-Resistant Authentication.
4.5.2.5 Phase 5: Intune Enrollment
Entra Hybrid Join and Windows Hello for Business prepares machines for Intune
Hybrid Deployment (The Transition Path)
211

enrollment.
⚡⚡PERFORMANCE TIP: USE FILTERS VS. GROUPS + STOP WAITING
FOR GROUPS
When you are in the "Frenzied Deployment" phase, waiting 2-24 hours for
an Entra ID Dynamic Group to calculate membership is painful.
Best Practice: Target your policies to "All Devices" and use Intune
Filters (e.g., device.model -startsWith "Surface") to include/
exclude machines.
Why: Filters are evaluated by the Intune engine at check-in time
(milliseconds), whereas Dynamic Groups rely on the background Entra ID
sync cycle (hours).
• [ ] Verify Licensing:
◦ Does the user logging in have an Intune Plan 1 (or M365 G3/G5)
license assigned active?
• [ ] Entra Configuration for Intune Enrollment
◦ Entra ID > Mobility (MDM and MAM) > Microsoft Intune.
◦ MDM User Scope: Set to All (or includes the specific user).
◦ WIP User Scope: Set to None. (Critical! If set to All, enrollment
often defaults to MAM).
Securing Microsoft 365 in GCC High | 2026.04.30
212

• [ ] Intune Enrollment GPO:
◦ Computer Configuration > Administrative Templates > W
indows Components > MDM > Enable automatic MDM enroll
ment using default Microsoft Entra credentials
◦ To verify GPO application: run gpresult /r /scope compute
r.
▪ Look for policy named as above.
• [ ] Task Scheduler:
◦ Microsoft > Windows > EnterpriseMgmtand find the MDM
enrollment task
◦ You can check last run result for any errors
• [ ] Event Viewer Error Checking:
◦ Check Event Viewer: Applications and Services Logs > Mi
crosoft > Windows > DeviceManagement-Enterprise-Diagn
ostics-Provider > Admin.
◦ Look for Event ID 76 indicating failure (Example: 0x8018002A
due to missing MFA claim).
◦ Example Root Cause: Missing Primary Refresh Token (PRT).
◦ Example Fix: Ensure user has signed into Windows Hello for
Business or a Microsoft 365 App (Teams/Outlook) to acquire a
PRT.
• [ ] Manual Intune Enrollment
◦ If the device shows as "Managed by MDE" in the portal,
enrollment has failed.
◦ Force Retry Command:
%windir%\system32\deviceenroller.exe /c /AutoEnrollMDM
▪ Note: This command produces no output. Check Task
Manager to see deviceenroller.exerunning briefly, or
refresh the Event Viewer log after 30 seconds.
◦ Force Policy Sync (UI Method):
▪ If the Info button is present (see above), click it.
▪ Scroll down to Device sync status.
Hybrid Deployment (The Transition Path)
213

▪ Click the Sync button.
▪ Why: This forces the device to reach out to Intune
immediately for the latest policies, scripts, and app installs
without waiting for the scheduled background cycle.
◦ Success Indicators:
▪ Visual Verification (The "Info" Button)
▪ Open Settings > Accounts > Access work or
school.
▪ Click the connected domain/account (e.g., connec
ted to contoso.com).
▪ Success: You see an Info button. This confirms
the device is MDM enrolled.
▪ Failure: You only see a Disconnect button. This
usually means the device is Entra Registered but
not Intune Enrolled.
▪ Run dsregcmd /status
▪ User State
▪ WamDefaultSet: YES
▪ WamDefaultAuthority: organization
s
◦ Success: The device is Hybrid Joined, Intune enrolled, and
operating under policy. At this point the device should appear as
Compliant in the Intune portal (once compliance policies evaluate)
and the user should be able to access cloud resources without
additional MFA prompts after signing in with Windows Hello for
Business.
4.6 Windows Hello for Business Setup
& Troubleshooting
Windows Hello for Business (WHfB) is the primary path for phishing-resistant
authentication at the Windows logon screen. When a user signs in with WHfB (PIN
or biometric backed by TPM), Windows performs a cryptographic Entra ID
authentication that mints a Primary Refresh Token (PRT) carrying a phishing-
resistant MFA claim. That PRT is then used silently by every app the user opens —
Securing Microsoft 365 in GCC High | 2026.04.30
214

including the background Intune enrollment task on Hybrid Joined machines.
FULL SET OF PHISHING-RESISTANT LOGON OPTIONS
WHfB is the default recommendation for standard environments. For
environments where cameras, fingerprint readers, or USB ports are not
viable (oil mist, dust, industrial settings), PIV cards via Entra Certificate-
Based Authentication and FIDO2 NFC security keys are supported
alternatives. See Phishing-Resistant Authentication for a complete
decision guide.
WHFB CANNOT BE PROVISIONED INSIDE AN AVD SESSION
The setup procedure in this guide requires a direct Windows sign-in
session. WHfB provisioning runs at the Windows lock screen before any
remote session is established and requires direct access to the device's
TPM. This means:
• Physical endpoints and dedicated personal-pool VMs (console
access): WHfB provisions normally — this guide applies.
• AVD session hosts accessed remotely: A user signing in to AVD
via a browser or RD client is already inside a remote session by the
time the Windows desktop loads. WHfB cannot be provisioned
from within that session. The dsregcmd /statusfield SessionIs
NotRemote: NOwill block provisioning.
Note that WHfB can be used to authenticate to AVD — if the user has
WHfB provisioned on their local corporate device, that credential satisfies
the A002 phishing-resistant auth strength policy for the AVD connection
itself. The limitation is provisioning from within the session, not using an
already-provisioned credential to start one.
For pure AVD environments where users have no corporate local device
and access all resources through AVD, use FIDO2 security keys instead.
See Phishing-Resistant Authentication → Path 3 for the key registration
workflow.
Windows Hello for Business Setup & Troubleshooting
215

4.6.1 Why Windows Logon Authentication Matters
for Intune Enrollment
A Conditional Access policy requiring MFA for all cloud apps will intercept Intune
enrollment — enrollment is itself a cloud app authentication event. There are two
ways to handle this:
Approach Trade-off
Add a CA exception for the Intune
Enrollment app
Workable short-term; creates a permanent
gap in the "no exceptions" posture
required for a compliant zero-trust
deployment
Configure phishing-resistant Windows
logon auth first
Eliminates the exception entirely; the
enrollment authenticates using the MFA-
bearing PRT from Windows logon
For Entra Join, enrollment is interactive — the user can satisfy an MFA prompt in
the moment, so the exception is only needed until WHfB is provisioned. For
Hybrid Join, enrollment is a background, non-interactive task — the PRT from the
current Windows logon session is the only authentication the task can use. WHfB
must be in place before Intune enrollment is triggered, not after.
4.6.2 Setup
ENTRA JOIN (INTUNE POLICY)
For Entra Joined devices, WHfB enrollment is driven by an Intune policy. No
GPO or on-prem infrastructure is required.
Option A — Tenant-Wide Setting (Simplest)
Navigate to Intune > Devices > Windows > Windows enrollment >
Windows Hello for Business.
Securing Microsoft 365 in GCC High | 2026.04.30
216

Setting Value
Configure Windows Hello for Business Enabled
Use a Trusted Platform Module (TPM) Required
Minimum PIN length 6
Maximum PIN length 127
PIN expiration Never (biometric makes rotation low-
value)
Remember PIN history 0
Allow biometric authentication Allowed
Use enhanced anti-spoofing Allowed
Use certificate for on-premises
authentication
Disabled (use Cloud Kerberos Trust
instead)
TENANT-WIDE SETTING APPLIES TO ALL ENROLLED
DEVICES
This blade applies to every Windows device that enrolls in Intune. For
phased rollouts, use Option B to target specific groups instead.
Option B — Settings Catalog Profile (Targeted)
Create a Settings Catalog configuration profile and assign it to your target
group.
Search for and configure settings under the Windows Hello for Business
category:
Windows Hello for Business Setup & Troubleshooting
217

Setting Value
Use Windows Hello for Business Enabled
Use a hardware security device Enabled (requires TPM; blocks
software-only enrollment)
Use cloud Kerberos trust for on-
premises authentication
Enabled (if users access on-prem
resources)
Securing Microsoft 365 in GCC High | 2026.04.30
218

Setting Value
Enable PIN Recovery Enabled
Windows Hello for Business Setup & Troubleshooting
219

OPEN INTUNE BASELINE: WHY TWO POLICIES SET THESE
DIFFERENTLY
When deploying WHfB via the OIB, you will see two policies that
appear to contradict each other:
• Win - OIB - ES - Windows Hello for Business - D - WHfB
Configuration sets Use Certificate For On-Prem Auth
→ Disabled
• Win - OIB - SC - Windows Hello for Business - D - Cloud
Kerberos Trust sets Use Cloud Trust For On-Prem Aut
h→ Enabled
These are two distinct Windows settings controlling two entirely
different on-premises authentication models. The OIB is deliberately
disabling the old model and enabling the new one:
Certificate Trust
(disabled by OIB)
Cloud Kerberos
Trust (enabled by
OIB)
Mechanism Device presents a
client certificate to the
DC to obtain a
Kerberos ticket
Device presents a
cloud-issued partial
TGT; the DC
validates it using the A
zureADKerberos
object in AD
On-prem
requirement
Active Directory
Certificate Services
(ADCS) + certificate
enrollment
infrastructure
A single read-only Az
ureADKerberos
computer object (one
PowerShell command
— see Hybrid Join
tab)
Certificate lifecycle Yes — client
certificates must be
enrolled, renewed,
and revoked
None — no
certificates issued to
devices or users
Securing Microsoft 365 in GCC High | 2026.04.30
220

Certificate Trust
(disabled by OIB)
Cloud Kerberos
Trust (enabled by
OIB)
Internet access at
logon
Not required (but PKI
must be reachable)
Not required — DC
validates offline using
the synced Kerberos
object
Recommended for Environments with
existing PKI that
cannot yet migrate
All new deployments
and any environment
using Entra Join
The OIB ships with both policies because Certificate Trust is the
Windows default and must be explicitly disabled, while Cloud
Kerberos Trust is opt-in and must be explicitly enabled. Neither
policy alone is sufficient — both must be deployed together.
HYBRID JOIN (GPO)
For Hybrid Joined devices, WHfB is deployed via Group Policy. The Cloud
Kerberos Trust prerequisite must be configured first so that WHfB-
provisioned devices can still obtain Kerberos tickets for on-prem resources.
Step 1 — Configure Cloud Kerberos Trust
Run the following on the Entra Connect server (or any server with the Azur
eADHybridAuthenticationManagementmodule):
# Install module if not present
Install-Module -Name AzureADHybridAuthenticationManagement
# Create the AzureADKerberos computer object in AD
# This read-only object lets DCs validate cloud-issued Kerberos tickets
Set-AzureADKerberosServer -Domain contoso.com `
-DomainCredential (Get-Credential) `
-CloudCredential (Get-Credential)
Windows Hello for Business Setup & Troubleshooting
221

This creates a read-only AzureADKerberoscomputer object in your AD.
Entra Connect syncs it once. Your Domain Controllers use it to validate
cloud-issued partial Kerberos tickets without needing internet access
themselves.
Step 2 — Configure WHfB via GPO
In Group Policy Management, configure:
Computer Configuration\Administrative Templates\Windows Compo
nents\Windows Hello for Business
Policy Setting Value
Use Windows Hello for Business Enabled
Use cloud Kerberos trust for on-
premises authentication
Enabled
Use a hardware security device Enabled
Apply the GPO to the OU containing your Hybrid Joined workstations. Run g
pupdate /forceon a test machine to pull the policy immediately.
4.6.3 Diagnosing WHfB Provisioning
4.6.3.1 Partial Provisioning
Like the Entra Hybrid Join process, WHfB provisioning involves communication
between the device and cloud services. After WHfB setup completes, the public key
needs to be written back to the user's Entra ID (or on-prem AD) attribute before the
PIN or biometrics can actually authenticate. The event log under Applications an
d Services Logs > Microsoft > Windows > HelloForBusinesscaptures
each step of the provisioning chain. If something in that chain didn't fully complete
before the first post-setup login attempt, the credential providers appear but can't
back themselves with a valid key. WHfB options may be visible on the login screen
but not be functional, forcing a password login.
Securing Microsoft 365 in GCC High | 2026.04.30
222

4.6.3.2 dsregcmd /status
Run the following from a standard (non-elevated) command prompt while
logged in as the affected user. Running as Administrator returns the system context
instead of the user context, which will give misleading results.
dsregcmd /status
4.6.3.3 Ngc Prerequisite Check
If WHfB is not provisioning, find the NgcPrerequisiteChecksection in the
output. Every field that says NO is a reason WHfB will not launch the setup
prompt.
Field What It Checks Common Fix
IsDeviceJoined Device is Entra Joined or
Hybrid Joined
Complete the join process
(Entra Join or Hybrid
Deployment)
IsUserAzureAD Logged-in user has an
Entra identity with a valid
PRT
Ensure Entra Connect is
syncing this user; check
AzureAdPrt
PolicyEnabled WHfB policy is explicitly
set to ON
Check for conflicting
MDM policy or HKCU
registry override (see
below)
PostLogonEnabled System is allowed to
prompt immediately after
login
Leave enabled; if disabled,
users must enroll manually
via Settings
DeviceEligible Hardware meets TPM
requirements
Verify TPM 2.0 is enabled
in BIOS/UEFI; VMs need
a virtual TPM
SessionIsNotRemote User is at the console, not
in RDP
WHfB cannot be
provisioned over a standard
RDP session
CertEnrollment Certificate chain is
available (Cert Trust model
only)
Only relevant for Cert
Trust; for Cloud Kerberos
Trust, this should be NotRe
quired
Windows Hello for Business Setup & Troubleshooting
223

Field What It Checks Common Fix
PreReqResult Final verdict WillProvision= ready. W
illNotProvision= at
least one above is NO
User State — also check:
• NgcSet : NO→ the user has no WHfB container/PIN yet (normal before
first provisioning)
• AzureAdPrt : NO→ no valid PRT; provisioning will silently abort even if
all Ngc fields say YES
4.6.3.4 Event Viewer: Provisioning Decision Logs
Windows logs exactly why WHfB provisioning was skipped or launched during the
user's login sequence.
Navigate to: Applications and Services Logs > Microsoft > Windows > U
ser Device Registration > Admin
Event ID Meaning
358 Provisioning will be launched this login
360 Provisioning will not be launched — open
the event details for a yes/no prerequisite
checklist
362 Provisioning will not be launched (variant)
Open the event details. The description shows each prerequisite as yes/no. Scan for
any Noentries, such as:
• "User has logged on with AAD credentials: No"→ AzureAdPrt
issue
• "Windows Hello for Business policy is enabled: No"→ policy
conflict
4.6.3.5 Event Viewer: HelloForBusiness Logs
If provisioning starts but fails silently (TPM error, broken container), errors appear
Securing Microsoft 365 in GCC High | 2026.04.30
224

here.
Navigate to: Applications and Services Logs > Microsoft > Windows > H
elloForBusiness > Operational
Look for errors or warnings related to container creation, TPM communication, or
Event ID 7055.
4.6.4 Common Silent Blockers
Even with a clean dsregcmdoutput and correct GPO/Intune policy, these
environment factors will suppress the setup prompt:
Missing MFA Registration WHfB setup itself requires an MFA claim to bootstrap.
If the user has never registered a security method in Entra ID (no Authenticator app,
no phone), the WHfB prompt will silently skip. Ensure users complete security info
registration at mysignins.microsoft.combefore their first WHfB-eligible login.
Registry Conflict (GPO vs. MDM) Verify the policy wrote the correct keys:
• HKLM\SOFTWARE\Policies\Microsoft\PassportForWork→ UsePassp
ortForWorkshould be 1
• Check HKCU\SOFTWARE\Policies\Microsoft\PassportForWork— a
value of 0here (from an old user-scoped policy or MDM config) overrides
the computer-scoped key
Intune/MDM Override on Co-Managed Devices On co-managed Hybrid Joined
devices, Intune policies can win over GPOs for certain workloads. If the Intune
device configuration has WHfB set to "Not Configured" but a legacy compliance or
enrollment policy is disabling it, the GPO loses. Check the Device Configuration >
Windows Hello for Business enrollment policy in Intune for any conflicting setting.
Licensing WHfB requires Entra ID P1 or P2 (included in M365 G3/G5). Verify the
user has an active eligible license.
Windows Hello for Business Setup & Troubleshooting
225

4.6.5 Ongoing WHfB Management: GPO to
Bootstrap, Intune to Govern
4.6.5.1 The Deployment Bootstrap Problem
For Hybrid Joined devices, WHfB must be provisioned before Intune enrollment
can complete without a Conditional Access exception.
When a Hybrid Joined device first contacts Intune, the management extension
scheduled task runs a device registration as a background, non-interactive process.
This registration is an Entra authentication event. If your CA policy requires
phishing-resistant MFA for all cloud apps, the enrollment task must present a PRT
that already carries an MFA claim — it cannot prompt the user for a response
because it runs silently.
A Windows login with a password produces a PRT without an MFA claim. A
Windows login with WHfB produces a PRT with a phishing-resistant MFA claim.
The sequence that avoids a permanent CA exception:
1. GPO deploys the WHfB Cloud Kerberos Trust policy to the Hybrid Joined
OU.
2. User logs in with a password — the WHfB setup prompt appears on first
login after the policy applies.
3. User completes WHfB enrollment (PIN and optionally biometric).
4. User logs back in with WHfB — Entra mints a PRT with a phishing-
resistant MFA claim.
5. Intune enrollment scheduled task runs silently, presents the MFA-bearing
PRT, and enrollment completes.
Without this sequence, the only alternative is a permanent CA exception for the
Intune Enrollment cloud app. That exception is workable short-term but creates a
standing gap in the zero-trust posture — particularly problematic in CMMC-scoped
Securing Microsoft 365 in GCC High | 2026.04.30
226

environments where every CA exception requires a documented justification.
WHY GPO SPECIFICALLY FOR HYBRID JOIN
Hybrid Joined devices are domain members that are not yet Intune-
managed. They can receive GPO immediately. Intune MDM policies
cannot reach a device until enrollment is complete — which is the step we
are trying to enable. GPO is the only management channel available at this
stage of the device lifecycle.
4.6.5.2 Recommended Split: GPO for Provisioning, Intune OIB for
Settings
Once the device enrolls, Intune takes over ongoing WHfB management. The GPO
can remain in place — Intune policy wins for co-managed workloads once the
Device Configuration workload is set to Intune or Pilot Intune.
The table below distinguishes two categories of settings:
• Bootstrap-critical (GPO required): These settings must exist before
WHfB can provision. Since Intune cannot reach the device until enrollment
is complete, GPO is the only management channel available. Without these
two settings in place via GPO, the bootstrap sequence described above
cannot start.
• Policy settings (Intune OIB only): These settings are not required for
provisioning to succeed — WHfB will enroll using safe Windows defaults
if they are absent. There is no technical barrier to also setting them in GPO,
but doing so creates two authoritative sources for the same setting. If the
GPO value and the OIB value ever diverge, the co-management workload
switch will cause a silent regression. Keeping policy settings exclusively in
Intune eliminates that risk.
Setting Managed via Notes
Enable WHfB / Use
Hardware Security
Device
GPO (bootstrap-critical) →
Intune OIB
Must be set via GPO.
Without this, WHfB never
provisions and the
enrollment bootstrap
cannot complete. OIB
profile keeps it enforced
Windows Hello for Business Setup & Troubleshooting
227

Setting Managed via Notes
post-enrollment.
Use Cloud Kerberos
Trust
GPO (bootstrap-critical) →
Intune OIB
Must be set via GPO.
Without this, Hybrid Join
provisioning fails or on-
prem resource access
breaks from day one. OIB
Cloud Kerberos Trust
profile maintains it post-
enrollment.
PIN Complexity Intune OIB only Not required for
provisioning. Windows
defaults allow enrollment;
OIB enforces your
complexity policy after
enrollment. (Win - OIB -
ES - Windows Hello fo
r Business - D - WHfB
Configuration)
Enable PIN Recovery Intune OIB only Not required for
provisioning. Enables users
to self-reset their PIN at the
lock screen post-enrollment
without contacting IT.
Allow Biometric
Authentication
Intune OIB only Not required for
provisioning. Controls
whether face/fingerprint is
offered alongside PIN post-
enrollment.
Enhanced Anti-Spoofing Intune OIB only Not required for
provisioning. Required for
AAL2 compliance on
devices with Windows
Hello Enhanced Sign-In
Security; enforced via OIB
Securing Microsoft 365 in GCC High | 2026.04.30
228

Setting Managed via Notes
post-enrollment.
THE OIB SHIPS TWO INTERDEPENDENT WHFB POLICIES
See the Entra Join tab above for a breakdown of why the OIB deploys Use
Certificate For On-Prem Auth = Disabledalongside Use Cloud Tr
ust For On-Prem Auth = Enabled. Both must be deployed together;
one without the other leaves the device in a mixed state.
4.6.5.3 Co-Management Conflict Note
On co-managed Hybrid Joined devices, Intune wins over GPO for WHfB settings
when the Device Configuration workload is assigned to Intune or Pilot Intune.
When that workload switches, MDM policy values overwrite GPO-set registry keys
on the next sync.
Verify your target values are correct in Intune before switching the workload. A
GPO value that was enabling a required setting — such as Cloud Kerberos Trust —
can be silently overwritten by an Intune profile where that setting is Not
configured.
Check the active policy source on any device:
# GPO-sourced WHfB settings
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\PassportForWork"
# MDM-sourced WHfB settings
Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\PolicyManager\current\devic
e\PassportForWork"
4.6.5.4 Compliance and Enrollment Reporting
After Intune enrollment, WHfB status is visible in:
• Entra Admin Center → Protection → Authentication methods → User
registration details — tenant-wide view of which users have registered
phishing-resistant methods; export to CSV for CMMC IA.L2-3.5.3 audit
evidence.
• Entra Admin Center → Users → [user] → Authentication methods —
Windows Hello for Business Setup & Troubleshooting
229

per-user method list; confirms WHfB, passkey, or FIDO2 key registration.
• Intune → Reports → Device configuration — policy deployment status
for WHfB OIB profiles; surfaces devices where settings have not yet
applied.
4.7 Scenario: AVD — Dedicated
Sovereign Tenant
4.7.1 Executive summary — what this architecture
delivers
Organizations that handle CUI but are not ready to re-platform every workstation
and server want a single, well-bounded environment they can point to and say: CUI
lives here, nowhere else. The architecture in this chapter — a dedicated sovereign
GCC High tenant fronted by Azure Virtual Desktop and hardened with Azure
Firewall, Conditional Access, dedicated accounts, and Intune policies — delivers
exactly that.
What this gives you:
• A CMMC attestation anchor. When a prospect or customer asks where
the CUI they provide will live, the answer is this tenant and the AVD
session hosts inside it. For Level 1 self-attestation, this is the environment
being attested to. For a future Level 2 assessment, the same boundary is
what a C3PAO walks through.
• Workstation scope reduction. CUI work happens inside the AVD session
host, not on the user's physical laptop. Physical endpoints remain out of
CUI Asset scope — CRMAs at most — which takes BitLocker evidence,
device-compliance reporting, and endpoint hardening off the daily-driver
fleet and concentrates them on the session hosts.
• Controlled access, end to end. Conditional Access gates who can sign in
with phishing-resistant authentication. Azure Firewall constrains what
session hosts can reach outbound to an explicit FQDN allow-list. Intune
hardens the session host OS with the Open Intune Baseline. Dedicated
enclave accounts prevent daily-driver identity commingling with the CUI
environment.
• Contained data. SharePoint and OneDrive in the sovereign tenant hold
CUI; sensitivity labels tag it; DLP watches egress. Nothing leaves the
tenant without passing the controls documented in the Data pillar.
What this is not:
Securing Microsoft 365 in GCC High | 2026.04.30
230

• Not a full company-wide GCC High migration. The primary tenant
continues to run commercial workloads. Only the enclave is sovereign.
• Not a substitute for MDM on daily-driver endpoints. Laptops still need
basic hygiene; they are simply out of the CUI-assessment scope.
• Not an automatic Level 2 pass. The enclave is the environment; Level 2
adds the documentation, monitoring, and evidence workstreams described
in the rest of the book.
The smallest defensible CUI environment a DIB supplier can operate. The rest
of this chapter is the engineering to build it.
Azure Virtual Desktop deploys session hosts as Entra Joined virtual machines,
managed by Intune, authenticating through Entra ID—the same identity stack as
physical devices.
PREREQUISITE
Complete Entra Join (The Cloud-Only Path) (DNS records + MDM User
Scope) before starting this section. The AVD host pool join and Intune
enrollment depend on that foundation being in place.
4.7.2 AVD Architecture
4.7.2.1 AVD and Microsoft 365 GCC High as the Security
Boundary
In this model, organizations tightly control the identity, device, and data policies in
their GCC High tenant. User identities accessing AVDs in this environment should
be authenticated with phishing resistant authentication, but organizations may want
to leave the machines and the systems that manage them out of the scope of their
assessment. Depending on broadly you have enforced device-compliance, you may
want to avoid bringing connecting devices and the systems that manage them into
assessment scope by excluding from your equivalent of P006 Require compliant
devices for O365, Azure, and Management:
• Azure Virtual Desktop
• Azure Virtual Desktop Client
• Windows Sign In
Scenario: AVD — Dedicated Sovereign Tenant
231

Cross-tenant access settings allow your tenant to trust device claims from another
tenant. From a security perspective, I always thought it better to restrict access to
compliant devices, even if compliance for that device is managed by someone else.
However, I've been told by not activating that control, the system governing that
control does not come into assessment scope. Security is different than compliance.
4.7.2.2 Host Pool Model: Personal (Assigned)
This deployment uses a personal (assigned) host pool — each user is assigned a
dedicated VM that persists between sessions. Benefits:
• Clean audit trail. All events on a VM map unambiguously to one assigned
user, which supports NIST 800-171 account-management and audit-
accountability requirements without additional mitigation work.
• No FSLogix. Personal pools don't need FSLogix profile containers. The
Azure Files storage dependency, SMB firewall rules, and profile-mount
failure modes are all absent.
• Predictable user experience. A user's session host retains their installed
applications, browser profile, desktop layout, and local app state between
sessions. No "fresh profile on every login" anomalies.
• Simplified troubleshooting. When a user reports an issue, the session host
is theirs alone — IT isn't debugging a shared environment where one user's
actions affect others.
4.7.2.3 Authentication (Azure RBAC, No Domain Controllers)
In the AVD model, authentication is handled by Azure RBAC policies rather than
Domain Controller ACLs. Users authenticate using their Entra ID credentials
directly. There are no group policy logins, no Kerberos ticket requests to a DC, and
no VPN requirement for the authentication path.
Two RBAC roles govern access:
Role Assigned To Effect
Virtual Machine User
Login
Standard users / AVD user
group
Allows interactive sign-in
to session hosts
Virtual Machine
Administrator Login
IT admins Allows sign-in with local
admin rights
Without one of these roles, a user will receive an "Access Denied" error when
connecting—even if the VM is running and healthy.
Securing Microsoft 365 in GCC High | 2026.04.30
232

4.7.2.4 SSO via RDP Properties
To prevent double authentication prompts (once at the gateway, once at the VM),
SSO must be enabled at the Host Pool level using RDP properties:
Property Value Purpose
enablerdsaadauth:i:1 1 Enables Entra ID
authentication for the RDP
session
targetisaadjoined:i:1 1 Tells the RDP client the
target VM is Entra Joined
4.7.2.5 PIV Cards and CBA with AVD
For environments where users authenticate with NFC PIV cards (Path 2 in
Phishing-Resistant Authentication), the AVD connection flow differs from both
the traditional smart card experience and the Windows login screen behavior
described in that article.
The key point: the PIV card authenticates the user once, at the Entra gate. It is
not used again at the session host.
How the connection flow works
User taps PIV card at their local workstation
→ Entra CBA validates the certificate
→ Conditional Access: PIV cert satisfies phishing-resistant auth strength
→ AVD Gateway brokers the connection
→ SSO (enablerdsaadauth:i:1) carries the authenticated Entra token to the
session host
→ User sees the session host desktop — no second PIN prompt
The session host's Windows login screen is bypassed entirely by SSO. The enabler
dsaadauth:i:1RDP property tells the AVD client and gateway to pass the user's
existing Entra token — obtained from the PIV card authentication — directly into
the session host's credential provider. The user does not tap the card at the session
host because the session host is not the authentication boundary. Entra is.
Operational implications
• Users tap their card once to unlock their workstation. That authentication
session carries into AVD. The experience is seamless.
Scenario: AVD — Dedicated Sovereign Tenant
233

• The PIV card and NFC reader are at the user's physical workstation —
they never need to be present in or near the Azure datacenter.
• If the AVD session times out and triggers re-authentication, the user will be
prompted through Entra again, which may require a new card tap
depending on your Conditional Access Sign-in frequency setting.
MATCH CA SIGN-IN FREQUENCY TO SHIFT LENGTH
Set the Sign-in frequency on your PIV CA policy (CA policy → Session
→ Sign-in frequency) to 8–12 hours to avoid mid-session re-
authentication prompts for a standard work shift.
IF SSO RDP PROPERTIES ARE MISSING, PIV CARD LOGON TO THE
SESSION HOST WILL FAIL
Without enablerdsaadauth:i:1and targetisaadjoined:i:1, the
AVD client issues a second Windows credential prompt at the session host.
A PIV card cannot satisfy that prompt over RDP — the card is
physically at the user's desk, not at the session host. The session will either
fail or fall back to password authentication, breaking the PIV-only
enforcement posture.
4.7.3 Network Architecture
4.7.3.1 Azure Firewall Topology
GCC High AVD session hosts must not have public IP addresses. All outbound
internet traffic routes through an Azure Firewall deployed in a hub VNet, enforced
via a User Defined Route (UDR) applied to the session host subnet.
Session Host Subnet (10.x.x.0/24)
└─ UDR: 0.0.0.0/0 → Azure Firewall private IP
└─ Azure Firewall (Hub VNet)
├─ Application Rule Collections (FQDN-based)
└─ Network Rule Collections (port/protocol-based)
└─ Internet
The key architectural principle:session hosts have no direct internet path. The
Securing Microsoft 365 in GCC High | 2026.04.30
234

firewall is the only egress point, and every allowed destination is explicitly
enumerated. A deny-all rule at the lowest priority (4096) catches and logs any
traffic not matched by an explicit allow.
4.7.3.2 Required Traffic Categories
Azure Firewall rules for AVD GCC High fall into distinct categories, each with
different ownership:
Category Owner Examples
AVD Control Plane Microsoft (sovereign) *.wvd.microsoft.us,
*.servicebus.usgovclo
udapi.net
Identity & Auth Microsoft (sovereign) login.microsoftonlin
e.us, *.msftauth.net
M365 GCC High Microsoft (sovereign) *.mail.protection.off
ice365.us, *.teams.mic
rosoft.us
Windows Management Microsoft (global CDN) *.update.microsoft.co
m, *.delivery.mp.micro
soft.com
Defender for Endpoint Microsoft (sovereign) *.security.microsof
t.us, *.winatp-gw-us
w.microsoft.com
Customer Applications Customer-specific Line-of-business FQDNs,
SaaS providers
For the full reference rule set with FQDN tables and network rules, see AVD
Firewall Reference.
Scenario: AVD — Dedicated Sovereign Tenant
235

4.7.4 Device Join & Enrollment
AZURE GOVERNMENT COMPUTE CAPACITY — PLAN AHEAD
Azure Government regions (USGov Virginia, USGov Texas) are currently
experiencing significant compute oversubscription. VM provisioning
requests for AVD session hosts may fail with a quota or capacity error even
when your subscription has available quota on paper. If this happens:
1. Submit an Azure support request to increase your VM family
quota in the target region. Select Service and subscription limits
(quotas) as the issue type, and specify the VM SKU family (e.g.,
Dsv5, Dasv5) and the number of vCPUs needed.
2. Expect delay. Capacity fulfillment in Government regions can take
days to weeks depending on the SKU and region. This is a
Microsoft-side infrastructure constraint, not a configuration issue.
3. Plan provisioning early. Do not wait until the deployment window
to discover a quota shortfall. Submit the support request as soon as
the Azure Government subscription is established and the target
VM count and SKU are known — ideally during project kickoff,
not during the deployment sprint.
4. Consider both Government regions. If USGov Virginia is
constrained, USGov Texas may have availability (or vice versa).
Evaluate whether the alternate region meets your data-residency
and latency requirements before committing.
4.7.4.1 Entra Join and Intune Enrollment: No User Interaction
Required
AVD session hosts join Entra ID and enroll in Intune entirely in system context
during VM provisioning — before any user ever signs in. No user MFA challenge
is triggered, and no per-user Intune license is validated at enrollment time.
The provisioning flow is:
1. Azure deploys the VM and runs the AADLoginForWindows extension
under the SYSTEM account
2. The extension joins the VM to Entra ID using the tenant's device join
configuration
3. Intune MDM auto-enrollment fires automatically as a consequence of the
Securing Microsoft 365 in GCC High | 2026.04.30
236

Entra Join
4. Intune delivers compliance policies and configuration profiles to the device
The Intune license check occurs later — when the first user signs in, Intune
verifies that the user has an eligible license (M365 E3/E5). For a properly licensed
deployment this is transparent. No interactive enrollment, no MFA prompt, and no
per-VM manual step is required.
COMMON CLIENT CONCERN: "WILL PROVISIONING 20 VMS
TRIGGER 20 MFA CHALLENGES?"
No. The join and enrollment happen at the system level. The only MFA
challenge is the one the engineer authenticates with when deploying the
host pool through the Azure portal.
4.7.4.2 Entra Join Constraint
AVD session hosts join Entra ID using the AADLoginForWindows VM extension,
which runs at the SYSTEM account level during VM provisioning. This mechanism
is subject to the tenant-level "Users may join devices to Microsoft Entra ID"
policy in Entra > Devices > Device settings.
This policy must be set to All. There is no mechanism to scope the
AADLoginForWindows join to a service principal — the setting applies to user-
initiated and extension-initiated joins alike. If the policy is restricted to a named
group, the extension's join attempt will fail and session host provisioning will
Scenario: AVD — Dedicated Sovereign Tenant
237

partially complete: the VM is created but it is not Entra Joined or Intune-enrolled.
"USERS MAY JOIN DEVICES" MUST BE ALL — MITIGATE WITH
COMPENSATING CONTROLS, NOT BY ABANDONING THE
REQUIREMENT
Setting this to Allcreates a surface where any user in the tenant could
potentially join a personal device to Entra ID. The compensating controls
below close this gap without restricting AVD provisioning:
Control How It Mitigates
Enrollment restrictions (Intune) Block personally-owned device
enrollment — even if a device joins
Entra, it cannot enroll in MDM unless
it is corporate-owned
Conditional Access: require
compliant device (P006)
Any device that joined Entra but
bypassed Intune enrollment will fail
compliance checks and cannot access
M365 resources
B006: Block Non-Approved Device
Registration
Blocks device registration from non-
US locations, preventing foreign-IP
device joins
With these controls in place, the risk of "Users may join devices = All" is
substantially mitigated. Document this as a known constraint with
compensating controls in your SSP.
4.7.5 Data Protection
4.7.5.1 Encryption
AVD session hosts handle sensitive data in transit and at rest. The encryption
posture has three layers:
Securing Microsoft 365 in GCC High | 2026.04.30
238

Layer Mechanism Configuration
OS disk (at rest) BitLocker + Server-Side
Encryption (SSE)
Intune BitLocker policy
applies automatically to
Entra Joined session hosts;
SSE uses platform-
managed keys by default
Server-side encryption Azure Storage Service
Encryption (AES-256)
Enabled by default on all
managed disks — no
additional configuration
required
Customer-managed keys
(optional)
Azure Key Vault (GCC
High) + Disk Encryption
Set
Provides key lifecycle
control for higher-
sensitivity environments;
requires an Azure Key
Vault in the same Azure
Government subscription
For environments that require CMK: create a Disk Encryption Set referencing a
Key Vault in Azure Government, and associate it with the AVD host pool's
managed disk configuration at provisioning time. Keys must be stored in Key Vault
instances within the US Gov regions to stay within the FedRAMP High boundary.
4.7.5.2 Backup
In the assigned (personal) pool model, each user's data persists on their dedicated
VM's OS disk. There are no FSLogix profile containers — the VM itself is the
user's persistent workspace. Azure VM backup is the primary data protection
mechanism.
Resource Backup Approach Policy
Session host VMs Azure Backup for VMs Required — enable at
provisioning; data loss on
VM failure or accidental
deletion without it
Base image (if using
Shared Image Gallery)
Shared Image Gallery
replication
Replicate to at least two
US Gov regions for
resilience
Azure Backup policy for session host VMs:
Scenario: AVD — Dedicated Sovereign Tenant
239

• Navigate to Recovery Services vault > Backup > Azure Virtual Machine
• Policy type: Enhanced (supports hourly recovery points)
• Schedule: Daily at off-hours (e.g., 2:00 AM)
• Retention: Daily 30 days / Weekly 4 weeks / Monthly 12 months
• Enable Soft Delete on the vault to protect against accidental backup
deletion
ONEDRIVE KNOWN FOLDER MOVE AS A SUPPLEMENTAL LAYER
Deploying OneDrive KFM through Intune redirects Desktop, Documents,
and Pictures to OneDrive for Business, providing near-continuous cloud
protection for user working files independent of VM backup schedules. If a
VM must be rebuilt, files in KFM-redirected folders are immediately
available on the replacement VM without restoring from backup. Configure
via Settings Catalog: OneDrive > Silently move Windows known folders
to OneDrive.
4.7.6 Secure Enclave Pricing
An AVD secure enclave is not just VM compute. The full monthly cost includes the
Azure Firewall anchoring the network boundary, OS disks that run continuously
regardless of VM power state, backup storage, and Log Analytics ingestion. Each
component is priced independently in Azure Government — understanding the full
picture prevents budget surprises after deployment.
All prices are approximate as of early 2026 (Azure Government — US Gov
Virginia). Verify current rates at the Azure Government pricing calculator before
budgeting.
4.7.6.1 AVD Control Plane
The AVD service itself — host pools, workspaces, application groups, and the
gateway that brokers connections — is free. Microsoft does not charge per session,
per user, or per host pool. You pay only for the underlying Azure infrastructure
resources listed below.
Securing Microsoft 365 in GCC High | 2026.04.30
240

4.7.6.2 Session Host Compute
For a personal (assigned) pool, select a VM size based on the workload profile of
your users. Three tiers cover light, standard, and power-user scenarios — D8as_v6
is the recommended default for most deployments.
Tier VM Size vCPU RAM Best For
Light Standard_D4s_
v5
4 16 GB Email,
browser, light
Office — no
Teams video,
no large files
Standard Standard_D8as
_v6
8 32 GB General
knowledge
workers —
Office, Teams,
browser, line-
of-business
apps
Power User Standard_D16
as_v6
16 64 GB Data analysts,
developers,
users with
large datasets
or many
concurrent
applications
WINDOWS ENTERPRISE LICENSE IS INCLUDED IN M365 E3/E5
For AVD personal pools running Windows 11 Enterprise single-session,
the Windows license is covered by M365 E3 or E5 — there is no additional
OS license cost on the VM. Pricing below reflects compute only.
The "8 hr/day" column assumes 176 active hours per month (8 hours × 22 business
days) using Start VM on Connect to power down VMs outside active use.
Scenario: AVD — Dedicated Sovereign Tenant
241

Light — Standard_D4s_v5 (4 vCPU, 16 GB RAM)
Hourly Rate Monthly (24/7) Monthly (8 hr/day)
$0.192/hr $140/VM $34/VM
Standard — Standard_D8as_v6 (8 vCPU, 32 GB RAM)
Hourly Rate Monthly (24/7) Monthly (8 hr/day)
$0.384/hr $280/VM $68/VM
Power User — Standard_D16as_v6 (16 vCPU, 64 GB RAM)
Hourly Rate Monthly (24/7) Monthly (8 hr/day)
$0.768/hr $561/VM $135/VM
4.7.6.3 OS Disks
OS disks are billed continuously regardless of VM power state. Stopping a VM
saves compute cost but not disk cost.
Disk Type Size Monthly Cost/
VM Best For
Standard SSD E10 128 GB $8 Light users —
email, browser,
light Office;
acceptable
performance
Premium SSD P10 128 GB $20 Default — best
login performance,
recommended
baseline
Premium SSD P20 512 GB $70 Users with large
local data (CAD
Securing Microsoft 365 in GCC High | 2026.04.30
242

Disk Type Size Monthly Cost/
VM Best For
files, datasets)
START WITH PREMIUM SSD P10; EVALUATE STANDARD SSD AFTER
FIRST MONTH
The Windows 11 OS and standard productivity applications consume
40–70 GB. A P10 128 GB disk provides comfortable headroom and the
best login responsiveness. After the first month of use, users who run only
browser, email, and light Office are candidates for Standard SSD E10 —
saving $12/VM/month with a modest reduction in disk throughput. Do not
use Standard SSD for users running data-heavy applications or frequent
large file operations.
64 GB DISKS ARE NOT VIABLE FOR PERSONAL POOLS
A 64 GB OS disk leaves only 4–14 GB of free space after Windows 11 and
Office install. Windows Update staging alone can fill this within weeks.
Always provision at least 128 GB regardless of disk tier.
4.7.6.4 Azure Firewall
Azure Firewall is the most significant fixed infrastructure cost in a secure enclave.
It is billed by the hour regardless of traffic volume, plus a per-GB data processing
fee. A single Standard-tier instance covers a 20-user deployment comfortably.
SKU Hourly Rate Monthly (24/7) Data Processing
Azure Firewall
Standard
$1.25/hr $912 $0.016/GB
processed
Azure Firewall
Premium
$1.66/hr $1,212 $0.016/GB
processed
Scenario: AVD — Dedicated Sovereign Tenant
243

Standard vs. Premium for AVD: Standard tier is sufficient for the FQDN-based
rules that govern AVD egress. Premium adds TLS inspection and IDPS signatures
— warranted if the firewall is also inspecting general internet traffic from corporate
workloads, but not required for the AVD firewall rule set described in this guide.
Data processing cost estimate: A 20-user team producing 300 GB/month of
outbound traffic through the firewall adds approximately $5/month in data
processing fees — not a meaningful budget variable compared to the fixed hourly
cost.
AZURE FIREWALL IS A FIXED COST REGARDLESS OF USER COUNT
Unlike session host compute, Azure Firewall cost does not scale linearly
with users. A single Standard-tier firewall serves 5 users and 50 users at the
same $912/month. This makes the per-user firewall cost high for small
deployments and negligible for larger ones.
Supporting networking resources (one-time, low cost):
Resource Approx. Monthly Cost
Standard Public IP (Firewall SNAT
egress)
$4
AzureFirewallSubnet (required /26) No charge
Hub VNet No charge
VNet peering (hub ↔ spoke, per GB) $0.01/GB transferred
4.7.6.5 VM Backup
Azure VM Backup protects the OS disk (and any data disks) of each session host.
Because this is a personal pool with user data persisting on the VM disk, backup is
a required component of the architecture — not optional.
Backup cost has two components: the protected instance fee and backup storage
consumed.
Securing Microsoft 365 in GCC High | 2026.04.30
244

Component Approx. Monthly Cost
Protected instance fee (per VM, any size) $5/VM
Backup storage — LRS, 128 GB disk
(P10)
$3–6/VM
Backup storage — LRS, 512 GB disk
(P20)
$10–20/VM
Estimate for 20-user deployment with 128 GB disks: $160–220/month total
backup cost.
USE GRS ONLY IF A SECONDARY-REGION RECOVERY
REQUIREMENT EXISTS
Backup storage defaults to Locally Redundant Storage (LRS). Geo-
Redundant Storage (GRS) doubles the backup storage cost and is only
warranted if a regulatory or business continuity requirement mandates
recovery from a region failure.
4.7.6.6 Log Analytics + Microsoft Sentinel
CMMC Level 2 requires audit logging and continuous monitoring of systems that
process CUI (AU.L2-3.3.1, AU.L2-3.3.2, SI.L2-3.14.6, SI.L2-3.14.7). For an AVD
enclave where users access Exchange, SharePoint, OneDrive, and Teams, this
means connecting the full set of M365 and Azure data sources to a Sentinel-enabled
Log Analytics workspace.
Pricing stacks: Log Analytics charges for data storage, and Sentinel charges an
equal rate on top for SIEM analytics, incident correlation, and built-in detections.
Component Rate
Log Analytics data ingestion $2.76/GB (Pay-As-You-Go)
Sentinel analysis (on top of Log Analytics) $2.76/GB
Combined per-GB cost $5.52/GB
Scenario: AVD — Dedicated Sovereign Tenant
245

Component Rate
Data retention (first 31 days) Included
Data retention (beyond 31 days) $0.10/GB/month
Data source volume estimates (20-user enclave):
Data source Est. monthly volume Notes
AVD session diagnostics 3–5 GB Sign-in events, connection
logs, session host health
Azure Firewall logs 2–5 GB Rule evaluations, threat
intelligence hits — scales
with rule count and traffic
MDE device events 3–8 GB Endpoint telemetry, alert
data — scales with user
activity
Entra ID sign-in and audit
logs
1–2 GB CA policy evaluations,
admin actions, directory
changes
Exchange Online audit logs 5–15 GB Mailbox access, send/
receive, admin actions —
highest volume M365
source
SharePoint / OneDrive
audit logs
3–10 GB File access, sharing events,
DLP matches
Teams activity logs 2–5 GB Chat, channel, meeting
events
Defender XDR incidents
and alerts
2–5 GB Cross-workload incident
correlation
Total estimated ingestion 21–55 GB/month
Cost estimate for a 20-user enclave:
Securing Microsoft 365 in GCC High | 2026.04.30
246

Scenario Monthly ingestion Monthly cost
Lower activity (25 GB) 25 GB ~$138
Moderate activity (40 GB) 40 GB ~$221
Higher activity (55 GB) 55 GB ~$304
COMMITMENT TIERS REDUCE INGESTION COST SIGNIFICANTLY
If the workspace ingests more than 100 GB/day across all workloads
(shared with other environments), Commitment Tier pricing reduces the
per-GB rate substantially. Evaluate this once the workspace is established
and ingestion volume is measurable. For a standalone 20-user enclave,
volume is typically too low to benefit from commitment tiers.
SENTINEL IS A PER-WORKSPACE COST, NOT PER-USER
Like Azure Firewall, Sentinel cost is driven by data volume, not user count.
A 15-user enclave and a 20-user enclave on the same workspace produce
similar costs — the difference is marginal. If the enclave shares a
workspace with other organizational workloads, the Sentinel cost is
amortized across all connected data sources.
4.7.6.7 Total Enclave Cost — 20-User Deployment
The table below combines all resource categories for a 20-user personal pool using
D8as_v6 (32 GB) session hosts with Start VM on Connect (176 active hours/
month). Firewall and backup costs are fixed regardless of VM count.
Resource Monthly Cost Notes
Session host compute (20 ×
D8as_v6, 8 hr/day)
$1,360 Start VM on Connect, 176
hr/month
Scenario: AVD — Dedicated Sovereign Tenant
247

Resource Monthly Cost Notes
OS disks (20 × Premium
SSD P10, 128 GB)
$400 Billed 24/7 regardless of
power state
Azure Firewall Standard $912 Fixed regardless of user
count
Public IP $4 One per firewall
VM Backup (20 VMs, 128
GB)
$180 Instance fee + LRS storage
Log Analytics + Sentinel $221 Est. 40 GB/month
ingestion (full M365 +
Azure connectors)
Monthly Total $3,077
Annual Total $36,924
Nerdio Manager license not included. See Nerdio Manager for AVD below for
impact on total cost.
Standard SSD downgrade opportunity: For light users (email, browser, light
Office), replacing Premium SSD P10 with Standard SSD E10 reduces disk cost
from $20 to $8/VM/month. Migrating all 20 users to E10 saves $240/month
($2,880/year); a realistic split of 10 light users on E10 saves $120/month ($1,440/
year). This change is independent of Nerdio and requires only a disk SKU change
per VM.
AZURE FIREWALL DOMINATES FIXED COST FOR SMALL
DEPLOYMENTS
For a 20-user deployment, Azure Firewall represents 30% of total monthly
spend and does not decrease as the user count or compute footprint shrinks.
Organizations evaluating AVD on a per-user compute cost basis alone are
often surprised by this line item. It is the price of maintaining a defensible
network security boundary.
Securing Microsoft 365 in GCC High | 2026.04.30
248

4.7.7 Nerdio Manager for AVD
Nerdio Manager for Enterprise is a third-party AVD management platform that
adds cost optimization, automated image management, and operational tooling on
top of the native Azure AVD control plane.
POWER SCHEDULING DOES NOT REQUIRE NERDIO
8-hour/day VM scheduling is achievable with a free Azure Automation
Runbook — a straightforward script that stops VMs on a schedule and
pairs with Start VM on Connect for on-demand restarts. For organizations
that want to manage this themselves, Nerdio is not required for power
scheduling alone. Nerdio's value in a personal pool deployment is right-
sizing based on actual utilization data and operational efficiency for
image management and monitoring.
4.7.7.1 Business Benefits
Capability Description Impact
Power Scheduling Powers VMs off after
business hours and on
before shift start on a
configurable schedule
Achievable without Nerdio
via Azure Automation
Runbook — Nerdio adds
reliability, pre-stage warm-
up, and a managed UI
Start VM on Connect
integration
Starts the assigned VM
when a user initiates a
connection, even outside
scheduled hours
Native Azure AVD feature
— Nerdio surfaces this in
its scheduling UI alongside
power-off rules
Pre-stage scheduling Starts VMs 15–30 minutes
before scheduled shift start
Eliminates cold-start wait
time — VM is ready when
the user connects; not
easily replicated with a
basic runbook
Right-sizing
recommendations
Monitors per-VM CPU and
RAM utilization and flags
over-provisioned hosts
Primary Azure cost lever
when power scheduling is
already handled — enables
targeted downgrades based
Scenario: AVD — Dedicated Sovereign Tenant
249

Capability Description Impact
on evidence
Image management Scripted actions on a
golden image, automated
versioning, deployment to
host pool
Reduces image update
effort from 4–6 hours to
30–60 minutes per cycle
Cost attribution reports Per-user, per-VM, per-
resource-group cost
reporting
Makes AVD spend visible
and attributable for budget
reviews and chargeback
Multi-tenant MSP
dashboard
Manage multiple client
environments from a single
pane
Operational efficiency for
managed service providers
supporting multiple tenants
4.7.7.2 Projected Cost Savings — 20-User Personal Pool
With 8hr/day power scheduling already handled by an Azure Automation Runbook,
the remaining Azure cost savings Nerdio provides come from right-sizing —
downsizing VMs whose actual CPU and RAM utilization is well below their
provisioned tier.
The baseline assumes all 20 users on D8as_v6 (32 GB) at 8hr/day. After 30 days of
utilization monitoring, Nerdio identifies users whose workloads fit a smaller VM:
1. Review per-VM CPU and RAM utilization in Nerdio's dashboard after the
first month.
2. Downgrade users consistently below 40% RAM utilization to D4s_v5 (4
vCPU, 16 GB) — roughly half the compute cost.
3. Upgrade users regularly exceeding 70% RAM to D16as_v6 (64 GB) if
performance is impacted.
This produces a mixed fleet calibrated to actual usage rather than a uniform over-
provisioned tier.
Securing Microsoft 365 in GCC High | 2026.04.30
250

Right-Sizing Savings
Resource Baseline (8 hr/
day, no Nerdio)
Moderate Right-
Sizing (10 ×
D4s_v5)
Aggressive Right-
Sizing (20 ×
D4s_v5)
Session host
compute
$1,360 $1,020 $680
OS disks (20 × P10
128 GB)
$400 $400 $400
Azure Firewall
Standard
$912 $912 $912
Public IP $4 $4 $4
VM Backup (20
VMs, 128 GB)
$180 $180 $180
Log Analytics +
Sentinel
$221 $221 $221
Nerdio license — $100 $100
Monthly Total $3,077 $2,837 $2,497
Annual Total $36,924 $34,044 $29,964
Annual Savings
vs. Baseline
$2,880 (8%) $6,960 (19%)
Nerdio license estimate: $5/user/month × 20 users = $100/month. Actual pricing
Scenario: AVD — Dedicated Sovereign Tenant
251

varies — contact Nerdio for current enterprise rates.
RIGHT-SIZING SAVINGS ARE UTILIZATION-DEPENDENT
The moderate scenario (10 of 20 users on D4s_v5) is a realistic outcome for
a mixed knowledge-worker team. The aggressive scenario (all 20 on
D4s_v5) applies only if the entire team has light workloads — primarily
browser, email, and light Office use with no Teams video calls or data-
heavy applications. Without Nerdio's per-VM utilization data, right-sizing
is guesswork. That data is Nerdio's primary financial justification in a
deployment where power scheduling is already handled natively.
4.7.7.3 Resilience and Failsafe Configuration
Nerdio controls AVD costs through an Azure app registration (service principal)
with delegated permissions on your subscription. This design creates a dependency:
if Nerdio loses its Azure connection, all automated cost controls — power
scheduling, auto-start, pre-stage timers — stop functioning. VMs that are running at
the time of the disconnection continue running indefinitely until manually stopped.
This is the scenario some organizations have experienced as an unexpected spike in
cloud costs.
Root causes of Nerdio connection loss:
Cause Details
Service principal secret expiry App registration client secrets have a
configurable expiry (default 1–2 years in
Entra). When the secret expires, Nerdio
can no longer authenticate to Azure.
App registration deleted or permissions
revoked
If an administrator removes the Nerdio
app registration or removes its
subscription-level RBAC roles, Nerdio
loses access.
Nerdio service disruption Nerdio is a SaaS platform — an outage on
Nerdio's side prevents it from executing
any Azure actions, even if the service
principal is healthy.
Securing Microsoft 365 in GCC High | 2026.04.30
252

Mitigations:
1. Azure Cost Management budget alerts (independent of Nerdio). Create
a budget in Azure Cost Management scoped to the AVD resource group.
Set alert thresholds at 80% (warning) and 100% (critical) of the expected
monthly compute cost. Budget alerts fire independently of Nerdio — they
are evaluated directly against Azure billing data. This is the primary
financial safety net if Nerdio stops functioning.
2. Service principal expiry monitoring. In Entra > App registrations >
[Nerdio app] > Certificates & secrets, note the client secret expiry date.
Create a calendar reminder or an Entra Workbook alert 60 days before
expiry to rotate the secret and update it in Nerdio before it expires. Nerdio's
admin portal typically shows a warning when the credential is approaching
expiry — verify this alert is configured and going to a monitored inbox.
3. Azure Monitor alert on running VM count. Create a metric alert on the
AVD resource group: if the count of VMs in a "running" state during off-
hours (e.g., between 20:00 and 06:00) exceeds an expected baseline (e.g.,
more than 2 VMs running overnight), trigger an email to the IT admin. This
catches the "Nerdio stopped scheduling shutdowns" scenario within hours
rather than at billing review time.
Example: for a 20-user deployment with Start VM on Connect, you would
expect 0–2 VMs running at midnight on a weekday. An alert threshold of
5+ running VMs overnight is a reliable signal that power scheduling has
stopped.
4. Native AVD Scaling Plans as a documented fallback. Azure natively
supports scaling plans for personal host pools (Start VM on Connect +
scheduled deallocation). Important: Microsoft does not support running a
native AVD scaling plan and a third-party management tool (Nerdio) on the
same host pool simultaneously — they conflict. The native scaling plan is a
fallback for if Nerdio is decommissioned or unavailable for an extended
period, not a concurrent safety net.
To enable native scaling as a fallback: in the Azure Government portal,
navigate to Azure Virtual Desktop > Scaling Plans, create a plan for
personal pools with scheduled deallocation, and assign it to the host pool
after disabling Nerdio's power scheduling for that pool.
5. Regular Nerdio health validation. At least monthly, verify in the Nerdio
portal that the Azure connection status shows active and that the service
principal last-authenticated timestamp is recent. Include this in any routine
Scenario: AVD — Dedicated Sovereign Tenant
253

operational review.
TREAT AZURE COST MANAGEMENT ALERTS AS MANDATORY, NOT
OPTIONAL
Even with Nerdio functioning perfectly, Azure Cost Management budget
alerts are a valuable independent check. They protect against misconfigured
schedules, forgotten test VMs, and other cost anomalies that Nerdio would
not flag. Configure them at deployment time, not after the first unexpected
bill.
4.7.8 AVD Deployment Checklist
4.7.8.1 Phase 1: Host Pool, Application Group, and Workspace
A complete AVD deployment is three linked resources: a Host Pool (the VMs), an
Application Group (the entitlement surface — what users can see and connect to),
and a Workspace (the named container that appears in the Windows App client).
All three are created through the Host Pool creation wizard in a standard
deployment. All three remain required even for personal/assigned pools — the Host
Pool holds the VM, but users reach that VM only through an Application Group
inside a Workspace.
The Entra Join happens at the Host Pool level during VM provisioning.
• [ ] Host Pool Settings:
◦ When creating the Host Pool, ensure:
▪ Host pool type: Personal (one VM per user)
▪ Assignment type: Direct (pre-assign a specific VM to a
specific user — recommended when users are known in
advance) or Automatic (first user to connect claims the
next available VM)
▪ Domain to join: Select Microsoft Entra ID
▪ Enroll VM with Intune: Select Yes
• [ ] Application Group:
◦ The Host Pool wizard creates a default Desktop application group
linked to the new pool. Keep it — this is the entitlement object
Securing Microsoft 365 in GCC High | 2026.04.30
254

Phase 2 assigns users to.
◦ Note the Application Group name; you will reference it in Phase 2.
• [ ] Workspace:
◦ Attach the Application Group to a Workspace during the wizard, or
create a Workspace after and register the Application Group to it.
The Workspace is what users see as a named tile in their Windows
App client.
• [ ] RDP Properties (SSO):
◦ In the Host Pool RDP Properties blade, add or set:
▪ enablerdsaadauth:i:1
▪ targetisaadjoined:i:1
4.7.8.2 Phase 2: RBAC Permissions (Entitlement and Logon)
Users need two separate role assignments to connect successfully: Desktop
Virtualization User on the Application Group (entitles them to see the workspace)
and Virtual Machine User Login on the session host (authorizes the Windows
sign-in). Either role alone produces a failed connection with a confusing symptom
— empty workspace if only the Windows login is granted, "access denied at sign-
in" if only the entitlement is granted.
• [ ] Assign Desktop Virtualization User on the Application Group:
◦ Navigate to the Application Group created in Phase 1.
◦ Click Access control (IAM) > + Add > Add role assignment.
◦ Role: Desktop Virtualization User
◦ Members: Your AVD user group
◦ This is the entitlement layer — without it, the user's Workspace
appears empty in the Windows App client.
• [ ] Assign Virtual Machine User Login:
◦ Navigate to the Resource Group containing your AVD VMs.
◦ Click Access control (IAM) > + Add > Add role assignment.
◦ Role: Virtual Machine User Login
◦ Members: Your AVD user group
◦ This is the Windows login layer — without it, the connection
reaches the VM and then fails at sign-in with "access denied."
◦ Note: Assign at the Resource Group level to cover all session hosts
in the pool, including newly provisioned VMs.
Scenario: AVD — Dedicated Sovereign Tenant
255

• [ ] Assign Virtual Machine Administrator Login (Admins):
◦ Repeat the above for IT admin accounts using the Virtual
Machine Administrator Login role.
• [ ] (Direct assignment only) Map each user to a specific VM:
◦ If the Host Pool uses Direct assignment, map each user to their
VM: Host Pool → Application groups → Assignments, pick the
VM, assign a user.
◦ If using Automatic assignment, skip this step — the first user who
connects claims the next available VM and the mapping is
recorded automatically from that moment on.
4.7.8.3 Phase 3: Personal Pool Profile & Data Persistence
In a personal (assigned) pool, each user has a dedicated VM. Their Windows
profile, application settings, and local files persist on the VM's OS disk between
sessions. FSLogix and Shared PC Mode are not needed and must not be
deployed to personal pool VMs.
DO NOT DEPLOY FSLOGIX OR SHARED PC MODE TO PERSONAL
POOL VMS
Shared PC Mode deletes user profiles on logout — on a personal pool
where profile persistence is the goal, this destroys the user's work. FSLogix
profile container policies targeting Azure Files blob storage add cost and
complexity with no benefit when each VM has a single dedicated user.
OneDrive Known Folder Move — recommended supplemental data
protection:
KFM redirects Desktop, Documents, and Pictures to OneDrive for Business,
providing near-continuous protection for user working files independent of VM
backup schedules. Create a Settings Catalog profile in Intune and assign it to your
AVD session host group:
Setting Value Reason
Silently move Windows
known folders to OneDrive
Enabled Redirects Desktop/
Documents/Pictures
Securing Microsoft 365 in GCC High | 2026.04.30
256

Setting Value Reason
without user interaction
Tenant ID Your GCC High tenant ID Required for silent KFM
enrollment
Silently sign in users to
OneDrive with Windows
credentials
Enabled Single sign-on for
OneDrive using Entra ID
credentials
Prevent users from
redirecting their Windows
known folders
Enabled Locks KFM on — prevents
users from moving folders
back to local disk
KFM ACCELERATES VM REPLACEMENT
If a session host fails and must be rebuilt, a user with KFM active can log
in to their replacement VM and immediately access all KFM-redirected
files from OneDrive — no backup restore required for working files. Azure
VM backup (configured in Phase 1) covers application state and data stored
outside KFM-redirected folders.
4.7.8.4 Phase 4: Verification & Success Indicators
• [ ] Connect to a session host as an administrator.
• [ ] Run dsregcmd /statusand verify:
◦ AzureAdJoined : YES— Host is natively cloud joined
◦ DomainJoined : NO— Correct for cloud-only AVD. If YES, the
host was accidentally Hybrid Joined
◦ AzureAdPrt : YES— Valid cloud token present
• [ ] Verify GCC High Discovery:
ENVIRONMENT: GCC HIGH
◦ MdmUrl: Must point to https://enrollment.manage.micr
Scenario: AVD — Dedicated Sovereign Tenant
257

osoft.us/enrollmentserver/discovery.svc
◦ MdmTouUrl: Must point to https://portal.manage.micro
soft.us/TermsofUse.aspx
CRITICAL SOVEREIGN CHECK
If MdmUrlpoints to a .comaddress, the session host is
attempting to enroll in Commercial. Check the Host Pool
region and DNS records.
ENVIRONMENT: COMMERCIAL
◦ MdmUrl: Must point to https://enrollment.manage.micr
osoft.com/enrollmentserver/discovery.svc
◦ MdmTouUrl: Must point to https://portal.manage.micro
soft.com/TermsofUse.aspx
• [ ] Visual Verification:
◦ Open Settings > Accounts > Access work or school on the
session host.
◦ You should see the Entra ID connection with an Info button.
◦ If the Info button is missing: The host is joined but not enrolled.
Check MDM User Scope in Entra.
4.7.9 Architecture Validation (AVD-Specific)
These validation questions are specific to AVD. For general Entra Join validation,
see Entra Join (The Cloud-Only Path).
4.7.9.1 Data Protection: Validation Checklist
• "Are we restricting Clipboard and Drive Redirection?"
The Boundary: If users can copy/paste sensitive content from the
Securing Microsoft 365 in GCC High | 2026.04.30
258

secure AVD session to their unmanaged home PC, or redirect
local drives into the session, your data boundary is broken. These
are RDP Properties, not Intune settings. Set them in the Host
Pool RDP Properties blade:
◦ drivestoredirect:s:(empty string = no drive
redirection)
◦ redirectclipboard:i:0(disable clipboard)
• "Is Azure VM Backup enabled on all session hosts, and is the Recovery
Services vault in a US Gov region?"
The Sovereign Check: In a personal pool, user data persists on
the VM OS disk. Confirm that Azure Backup is enabled on every
session host and that the Recovery Services vault is in US Gov
Virginia or US Gov Arizona. A vault in a commercial Azure
region moves backup data outside the FedRAMP High boundary.
4.7.9.2 Sovereignty
• "Do global support staff have console access to these session hosts?"
The Law: A login to an AVD session host from a non-US IP
address by a non-US national may violate ITAR/EAR, regardless
of the host's location. Enforce a Conditional Access Policy
restricting AVD access to US-based IPs or named locations.
• "Is the AVD control plane in GCC High?"
The Check: Confirm the Host Pool is deployed in US Gov
Virginia or US Gov Arizona in the Azure Government portal (po
rtal.azure.us). Session hosts deployed in the wrong portal will
not benefit from the FedRAMP High boundary.
4.7.9.3 Network
• "Is all session host egress going through Azure Firewall?"
The Check: Verify the UDR on the session host subnet has a
0.0.0.0/0route pointing to the Azure Firewall private IP — not
to the VNet gateway or internet directly. In the Azure portal,
select the session host NIC > Effective routes and confirm the
default route next hop is VirtualAppliance.
Scenario: AVD — Dedicated Sovereign Tenant
259

• "Are any session hosts running with a public IP address?"
The Boundary: AVD session hosts should have no public IPs.
Users connect through the AVD Gateway (Microsoft-managed),
not directly to the VM. A public IP on a session host creates a
direct attack surface outside the firewall.
4.7.10 Session Host Image Management
4.7.10.1 Golden Image Strategy
The session host image determines the applications available to every user, the OS
security baseline applied before Intune policy lands, and the patching baseline at
VM provisioning time. For a personal pool, managing the golden image well
prevents per-VM configuration drift over time.
The recommended approach is a Shared Image Gallery (SIG) in Azure
Government with a repeatable build process.
Image build workflow:
1. Create a build VM (same size as production hosts — Standard_D8as_v6 or
D16as_v6) from the Windows 11 Enterprise gallery image in the Azure
Government portal.
2. Install and configure applications in the image:
◦ Microsoft 365 Apps (pre-configured, current channel)
◦ Line-of-business applications required by all users
◦ Nerdio agent (if using Nerdio Manager)
◦ Remove consumer bloat: default Start Menu pins, consumer
features via Group Policy
3. Run Windows Update to fully patch the image before capture.
4. Run Sysprep: %windir%\system32\sysprep\sysprep.exe /generaliz
e /oobe /shutdown
5. Capture the deallocated VM to an Image Version in Shared Image Gallery.
6. Replicate the image version to both US Gov Virginia and US Gov
Arizona.
Shared Image Gallery configuration:
Securing Microsoft 365 in GCC High | 2026.04.30
260

Setting Required Value
Gallery region US Gov Virginia (primary)
Replication regions US Gov Virginia, US Gov Arizona
Image definition OS state Generalized
Security type Trusted Launch (enables Secure Boot +
vTPM on session hosts)
Replication count 2 per region
BUILD THE GOLDEN IMAGE IN AZURE GOVERNMENT — NOT
COMMERCIAL AZURE
Building the image in a commercial subscription and importing it to Azure
Government is not a straightforward path and risks embedding commercial
endpoint references in the image. Create the build VM directly in your
Azure Government subscription.
AUTOMATE IMAGE BUILDS WITH AZURE IMAGE BUILDER
Azure Image Builder (AIB) automates the build → patch → sysprep →
capture → replicate pipeline using a Bicep or JSON template. For monthly
patch cycles, AIB reduces the process from 2–3 hours of manual steps to a
triggered pipeline job. AIB is available in Azure Government.
4.7.10.2 Image Update Cadence
In a personal pool, new image versions are not automatically applied to running
VMs — users keep their VM until it is explicitly replaced. Establish a documented
cadence:
Trigger Action
Monthly Patch Tuesday Build and validate new image version;
Scenario: AVD — Dedicated Sovereign Tenant
261

Trigger Action
stage in test pool 5 business days before
replacing production VMs
Major application version update New image version; coordinate VM
replacement timing with users
Critical/High CVSS vulnerability Expedited image build; replace affected
VMs within the change window
4.7.11 AVD Client Configuration
Users connect to their session hosts using either the Windows App (current client)
or the legacy Remote Desktop client. In GCC High, the feed subscription URL is
sovereign — this is the most common first-connection misconfiguration.
4.7.11.1 Feed Subscription URL (GCC High)
Client GCC High Feed URL
Windows App (recommended) https://rdweb.wvd.microsoft.us/ap
i/arm/feeddiscovery
Remote Desktop client (legacy) https://rdweb.wvd.microsoft.us/ap
i/arm/feeddiscovery
AVD Web Client https://client.wvd.microsoft.us
USING THE COMMERCIAL FEED URL BLOCKS ALL GCC HIGH
WORKSPACES
The commercial feed (rdweb.wvd.microsoft.com) will not display GCC
High host pools. Users will see an empty workspace or an auth error.
Always use the .ussovereign URL when subscribing.
Securing Microsoft 365 in GCC High | 2026.04.30
262

4.7.11.2 Supported Clients by Platform
Platform Client GCC High Support
Windows 10/11 Windows App (Microsoft
Store)
Full support
macOS Windows App (Mac App
Store)
Full support
iOS / iPadOS Windows App (App Store) Full support
Android Remote Desktop (Play
Store)
Supported; Windows App
not yet on Android
Web browser AVD Web Client (clien
t.wvd.microsoft.us)
Full support — sovereign
URL required
WINDOWS APP REPLACES THE REMOTE DESKTOP CLIENT
Microsoft is transitioning from the Remote Desktop client to Windows App
as the primary AVD client. Windows App handles GCC High feed
discovery automatically and receives updates through the Microsoft Store.
Use Windows App for all new deployments; the legacy client remains
functional but is not receiving feature investment.
4.7.11.3 Connecting with Windows App
Install
Platform Source
Windows 10/11 Microsoft Store — Windows App
macOS Mac App Store — search "Windows App"
iOS / iPadOS App Store — search "Windows App"
Scenario: AVD — Dedicated Sovereign Tenant
263

Subscribe to the GCC High Feed
1. Open Windows App
2. Click the + icon (top right) → Add Work or School account
3. Sign in with the user's GCC High Entra account — this triggers MFA
4. If the workspace does not appear after sign-in, select + Add → Workspace
and enter the feed URL manually:
https://rdweb.wvd.microsoft.us/api/arm/feeddiscovery
5. The assigned session host will appear as a desktop tile in the workspace
FEED AUTO-DISCOVERY
Windows App attempts feed discovery automatically on sign-in using the
account's tenant home region. For GCC High tenants this should resolve to
the sovereign endpoint without manual URL entry. If the workspace
appears empty, the manual URL entry in step 4 is the fix.
Connect and Verify
1. Click the session host tile — Windows App launches the RDP session
through the AVD Gateway
2. If prompted for credentials at the Windows login screen, SSO is not
configured — verify enablerdsaadauth:i:1is set in the host pool RDP
properties
3. Once connected, open a browser inside the session and navigate to http
s://myip.microsoft.com— confirm the egress IP matches the Azure
Firewall public IP
4. In the AVD session, open Settings → About (or run whoami /upnin a
terminal) to confirm you are signed in with the correct Entra identity
Validate the Connection in CA Sign-In Logs
After a successful connection, verify E001 fired correctly:
1. Entra admin center → Monitoring → Sign-in logs
2. Filter by the user's UPN and the last 30 minutes
3. Look for a sign-in to Azure Virtual Desktop — Status should be Success,
CA policy E001 should show Grant — Phishing-resistant MFA satisfied
Securing Microsoft 365 in GCC High | 2026.04.30
264

4.7.12 Monitoring & AVD Insights
AVD Insights is a native monitoring workbook built on Azure Monitor and Log
Analytics. It provides session host health, connection metrics, user experience data,
and alert history — and reuses the Log Analytics workspace already deployed in
Phase 1 for Azure Firewall diagnostics.
4.7.12.1 Enabling AVD Insights
1. In the Azure Government portal, navigate to Azure Virtual Desktop >
Host Pools > [your host pool] > Insights.
2. Enable diagnostic settings for the host pool — send Checkpoint, Error, M
anagement, and Feedlog categories to the Log Analytics workspace.
3. Enable data collection rules on session host VMs to forward Windows
event logs and performance counters:
◦ Event channels: System, Application, Microsoft-Windows-Ter
minalServices-LocalSessionManager/Operational
◦ Performance counters: CPU (% Processor Time), Memory (Avai
lable MBytes), Disk (% Free Space) at 60-second intervals
4.7.12.2 Key Monitoring Views
View What to Watch Action Threshold
Session Host Health Hosts in Unavailable state Alert on any single
Unavailable host —
personal pool, so 1
unavailable = 1 user
impacted
Connection Reliability Connection failure rate Alert if > 5% failures in a
1-hour window
User Experience Round-trip time RTT > 150ms sustained
indicates connectivity issue
between user and Azure
region
Resource Utilization CPU and RAM per VM > 85% sustained triggers
right-sizing review in
Nerdio
MDE Sensor Health Active sensor count
(Defender portal)
Alert if sensor count drops
below total VM count —
Scenario: AVD — Dedicated Sovereign Tenant
265

View What to Watch Action Threshold
indicates VM missed
onboarding
4.7.12.3 Recommended Log Analytics Alerts
// Alert: Session host entered Unavailable state
WVDAgentHealthStatus
| where Status == "Unavailable"
| summarize count() by SessionHostName, TimeGenerated
// Alert: High connection failure rate — last 1 hour
WVDConnections
| where TimeGenerated > ago(1h)
| summarize Total = count(), Failed = countif(State == "Failed") by bin(TimeG
enerated, 5m)
| extend FailureRate = todouble(Failed) / todouble(Total)
| where FailureRate > 0.05
4.7.13 Control Mapping
ENVIRONMENT: GCC HIGH
4.7.13.1 AVD Sovereign Tenant — CMMC Control Mapping
The AVD secure enclave architecture directly implements the following NIST
SP 800-171 Rev 2 controls through mechanisms specific to the AVD
deployment model. For the complete control matrix across all technologies,
see Appendix A: Compliance Controls.
CMMC Practice NIST 800-171 Control AVD Implementation
AC.L2-3.1.1 Limit system access to
authorized users
Virtual Machine User
Login RBAC role is
required for session host
interactive sign-in —
Entra group membership
alone grants nothing.
Users without explicit
role assignment receive
Securing Microsoft 365 in GCC High | 2026.04.30
266

CMMC Practice NIST 800-171 Control AVD Implementation
Access Denied at
connection time
regardless of license or
group state.
AC.L2-3.1.3 Control the flow of CUI
in accordance with
approved authorizations
RDP Properties redirec
tclipboard:i:0and dr
ivestoredirect:s:
prevent clipboard paste
and drive mapping out of
the session. CUI cannot
be transferred to an
unmanaged endpoint at
the protocol level.
AC.L2-3.1.14 Route remote access via
managed access control
points
All user sessions are
brokered through the
AVD Gateway
(Microsoft-managed
sovereign service).
Direct RDP to session
hosts is not possible —
session hosts have no
public IPs and the UDR
routes all traffic through
Azure Firewall. The
gateway is the single
managed ingress point.
AC.L2-3.1.15 Monitor and control
remote access sessions
Virtual Machine
Administrator Login is
restricted to named IT
admin accounts.
Privileged console
sessions are logged in
Entra sign-in logs,
separate from user
sessions, and subject to
the same phishing-
resistant CA
requirements.
Scenario: AVD — Dedicated Sovereign Tenant
267

CMMC Practice NIST 800-171 Control AVD Implementation
MA.L2-3.7.5 Require MFA for remote
maintenance sessions
Administrative access via
Virtual Machine
Administrator Login is
gated by Conditional
Access policy A002
(phishing-resistant auth
required). FIDO2 or
WHfB is enforced before
any privileged session is
established.
PE.L2-3.10.1 Limit physical access to
CUI to authorized
individuals
Session hosts run in
Azure Government
datacenters (US Gov
Virginia / US Gov
Arizona). No CUI
touches end-user
hardware — users see
only a rendered screen.
Physical access to CUI is
scoped to Microsoft's
FedRAMP High certified
facilities.
SC.L2-3.13.1 Monitor, control, and
protect communications
at external boundaries
Azure Firewall with
deny-all default (Priority
4096) and explicit FQDN
allow rules enforces
boundary control at all
session host egress. All
denied traffic is logged to
Log Analytics.
SC.L2-3.13.5 Implement subnetworks
for publicly accessible
system components
Session hosts have no
public IP addresses and
are not internet-routable.
All external connectivity
is inbound via the AVD
Gateway service tag and
outbound via Azure
Firewall private IP. The
session host subnet is
Securing Microsoft 365 in GCC High | 2026.04.30
268

CMMC Practice NIST 800-171 Control AVD Implementation
isolated from the public
internet.
SC.L2-3.13.8 Implement cryptographic
mechanisms to prevent
unauthorized disclosure
of CUI in transit
RDP sessions are
encrypted via TLS 1.2+
enforced by the AVD
Gateway. No
unencrypted remote
session path exists in this
architecture.
SC.L2-3.13.16 Protect the
confidentiality of CUI at
rest
Session host OS disks
are encrypted with
BitLocker (Intune policy)
and Azure Storage
Service Encryption
(AES-256). All data and
keys reside within the
Azure Government
FedRAMP High
boundary.
ENVIRONMENT: COMMERCIAL
4.7.13.2 AVD — NIST SP 800-171 Rev. 3 Control Mapping
The AVD architecture implements the following NIST SP 800-171 Rev. 3
requirements through mechanisms specific to the AVD deployment model.
For the complete control matrix, see Appendix A: Compliance Controls.
NIST SP 800-171 Rev.
3 Control Description AVD Implementation
3.1.1 Limit system access to
authorized users
Virtual Machine User
Login RBAC role is
required for session host
Scenario: AVD — Dedicated Sovereign Tenant
269

NIST SP 800-171 Rev.
3 Control Description AVD Implementation
interactive sign-in —
Entra group membership
alone grants nothing.
3.1.3 Control the flow of
information
RDP Properties redirec
tclipboard:i:0and dr
ivestoredirect:s:
prevent clipboard paste
and drive mapping out of
the session.
3.1.14 Route remote access via
managed access control
points
All sessions brokered
through the AVD
Gateway. Session hosts
have no public IPs — the
gateway is the single
managed ingress point.
3.1.15 Monitor and control
privileged remote access
sessions
Virtual Machine
Administrator Login
restricted to named
admin accounts;
privileged sessions
logged in Entra sign-in
logs.
3.7.5 Require MFA for remote
maintenance
Administrative access via
Virtual Machine
Administrator Login
gated by phishing-
resistant Conditional
Access.
3.10.1 Limit physical access to
organizational systems
Session hosts run in ISO
27001 / SOC 2 Type II
certified Azure
datacenters. No sensitive
data touches end-user
hardware.
3.13.1 Monitor and control Azure Firewall with
Securing Microsoft 365 in GCC High | 2026.04.30
270

NIST SP 800-171 Rev.
3 Control Description AVD Implementation
communications at
external boundaries
deny-all default and
explicit FQDN allow
rules enforces egress
boundary control.
3.13.5 Implement subnetworks Session hosts isolated
with no public IPs; all
external connectivity via
Azure Firewall private
IP.
3.13.8 Implement cryptographic
protections for data in
transit
RDP sessions encrypted
via TLS 1.2+ enforced
by AVD Gateway.
3.13.16 Protect the
confidentiality of data at
rest
OS disks encrypted with
BitLocker and Azure
Storage Service
Encryption (AES-256).
4.7.14 Related Reference
For the detailed Azure Firewall rule reference (application rule collections, network
rules, customer rule template, and troubleshooting KQL), see AVD Firewall
Reference.
For the complete compliance control matrix, see Appendix A: Compliance
Controls.
Scenario: AVD — Dedicated Sovereign Tenant
271

4.8 Scenario: AVD — Enclave in
Existing Tenant
4.8.1 The Problem This Solves
The standard AVD deployment treats AVD as a gateway to a GCC High tenant that
secures access to CUI data. That model rests on a greenfield GCC High tenant
assumption. The tenant boundary IS the enclave. If you are in the tenant, you are in
the controlled environment. AVD enables secure access to this controlled
environment without purchasing new laptops for everyone.
For an enclave in an existing tenant, the tenant boundary is NOT the enclave.
CUI data, non-CUI workflows, managed devices, and personal devices coexist in
the existing tenant. We limit assessment scope through AVD and associated CA
policies, security attributes, and network controls.
Greenfield Tenant Existing Tenant
Isolation provided by Tenant boundary Policy (CA + DLP +
device tags + network)
Threat model External attackers; data
residency
Internal: valid accounts on
unmanaged or lightly-
managed devices
AVD role Delivery mechanism Access control
enforcement point
Device compliance
requirement
Enclave data is only
reachable from AVDs
Tenant data must be
segmented to allow access
Securing Microsoft 365 in GCC High | 2026.04.30
272

Greenfield Tenant Existing Tenant
only from AVDs
RELATIONSHIP TO THE STANDARD AVD DEPLOYMENT
Complete Scenario: Azure Virtual Desktop first. That article deploys the
AVD host pool, session hosts, Azure Firewall, and the UDR that forces all
session host egress through the firewall. This article builds the enclave
layer on top of that foundation in two stages:
1. Precursors — Create the building blocks that enforcement policies
read: device tags, Named Location, and sensitivity labels
2. CA Policies — Configure P004 (compliant device), B009/B010
(device and network blocks), and optionally B011/B012 (auth
context blocks for E5 tenants)
3. DLP Policies — Configure the three Data Loss Prevention policies
that enforce data-layer controls (required for E3 tenants; defense-
in-depth for E5 tenants)
4.8.2 Enclave Architecture
The enclave is three interlocking layers, each targeting a distinct attack surface.
Any one layer limits exposure; together they defeat primary account compromise,
access from unmanaged devices, and data exfiltration risks.
Layer Attack Surface Mechanism What It Defeats
Users Account
compromise during
normal work
Dedicated CUI
accounts separate
from day-to-day
identities using
phishing-resistant
auth
Primary account
compromise
reaching CUI
Devices Access from
uncontrolled
endpoints
Device extension
attribute (extensio
nAttribute15) on
CUI access from
any device that is
not a tagged,
Scenario: AVD — Enclave in Existing Tenant
273

Layer Attack Surface Mechanism What It Defeats
session host +
Azure Firewall
egress as Named
Location, enforced
by P004 (compliant
device), B009
(device tag block),
and B010 (network
block)
compliant session
host routing
through the firewall
Data CUI files accessed
outside the enclave
or stored in non-
designated
locations
Purview sensitivity
labels with RMS
encryption (restricts
decryption to
enclave members),
mandatory labeling,
and three DLP
policies
(D001–D003)
Unlabeled content
in CUI sites, CUI
content in non-
designated sites,
and unlabeled
email from enclave
accounts
4.8.2.1 Users
Each enclave user operates with two separate Entra identities: a primary account for
day-to-day work (email, Teams, non-CUI tasks) and a dedicated CUI account used
exclusively to authenticate into the AVD enclave. The dedicated account:
• Is enrolled only in phishing-resistant authentication methods (FIDO2 or
Windows Hello for Business) — no password fallback, no SMS
• Is not used for day-to-day activities — no email, no web browsing, no
signing up for external services — which eliminates the most common
credential delivery vectors (phishing, credential stuffing from breach
databases)
• Is a member of AVD-Enclave-FCI-Users-MESGand scoped into enclave
CA and DLP policies
• Has a login history limited to AVD broker authentication and CUI
application access — anomalies stand out
The consequence: compromising a user's primary account through a phishing link
opened in their daily email does not compromise their CUI account. The accounts
have non-overlapping uses. The CUI account's attack surface is limited to the brief
window when the user is actively working in the enclave.
Securing Microsoft 365 in GCC High | 2026.04.30
274

4.8.2.2 Devices
Access to CUI resources is bound to AVD session hosts that are compliant (P004),
carry a device extension attribute (extensionAttribute15 = AVD-CUI-Authoriz
ed), and originate from the Azure Firewall public IP registered as a Named
Location in Entra. Three independent policies enforce this:
• P004 requires a compliant device for all cloud apps — excluding Azure
Virtual Desktop, Azure Virtual Desktop Client, and Windows Cloud Login
so the broker connection is not blocked
• B009 blocks access to all cloud apps (same exclusions) unless the request
originates from a tagged session host
• B010 blocks access to all cloud apps (same exclusions) unless the traffic
arrives from the Azure Firewall egress IP
P004, B009, and B010 are independent policies — a request must satisfy all three.
The session host must be compliant, carry the tag, AND route through the firewall.
The three AVD app exclusions allow enclave users to authenticate to the AVD
broker from any device; once inside the session, the session host satisfies all three
conditions.
4.8.2.3 Data
Purview sensitivity labels with RMS encryption protect CUI at the file level — only
members of AVD-Enclave-FCI-Users-MESGcan decrypt labeled files. Mandatory
labeling ensures every document FCI users create carries the CUI - AVDlabel, and
three DLP policies enforce data-layer controls:
• D001 blocks access to unlabeled content in designated CUI SharePoint
sites — nothing without a CUI - AVDlabel is accessible
• D002 blocks access to CUI-labeled files that appear in any SharePoint site
or OneDrive account not designated for CUI — this is the control that
prevents the client admin from accidentally extending the enclave by
creating a new site
• D003 blocks unlabeled outbound email from FCI accounts
RMS encryption on the CUI - AVDlabel restricts decryption to AVD-Enclave-FC
I-Users-MESG. If CUI-labeled content is shared with or emailed to anyone outside
the enclave group — internal or external — the recipient receives encrypted content
they cannot open. No DLP policy is needed to block this sharing; the encryption
makes the content useless to non-enclave recipients.
Combined with P004/B009/B010 restricting FCI authentication to the enclave, this
Scenario: AVD — Enclave in Existing Tenant
275

creates a closed loop: FCI users can only work from the enclave, can only create
labeled content, that labeled content can only persist in designated CUI sites, and
labeled content is unreadable by anyone outside the enclave group.
4.8.3 Enclave Prerequisites
4.8.3.1 Enclave Licensing
Requirement License
Device extension attributes (CA filter for
devices)
Entra ID P1 (included in Microsoft 365
E3/F3 GCC High and above)
Conditional Access Entra ID P1
Azure Firewall Azure Government subscription
Sensitivity labels (manual + mandatory) Microsoft Purview Information Protection
Plan 1 (included in M365 E3 GCC High)
DLP for Exchange, SharePoint, OneDrive Microsoft Purview Data Loss Prevention
Plan 1 (included in M365 E3 GCC High)
Authentication context on SharePoint sites
(B011/B012)
M365 E5 GCC High, SharePoint
Advanced Management, or M365 Copilot
license
Sensitivity labels for meetings and
calendar events
M365 E5 GCC High or M365 E5
Compliance add-on
Auto-labeling M365 E5 Compliance or Microsoft
Securing Microsoft 365 in GCC High | 2026.04.30
276

Requirement License
Purview add-on
Scenario: AVD — Enclave in Existing Tenant
277

WHAT E5 ADDS TO THE ENCLAVE — AND WHETHER YOU NEED IT
The enclave is fully functional at E3 licensing. P004, B009, B010, RMS
encryption, mandatory labeling, and DLP policies D001–D003 close all
practical access and exfiltration paths. E5 features are defense-in-depth —
they add narrow protections for edge cases. Do not purchase E5 specifically
for the enclave unless you need these features for other reasons.
E5 Feature What it adds to the
enclave Without it (E3)
Authentication context
(B011/B012)
Token-level
enforcement: CUI files
cannot be decrypted
without a c1claim
obtained from within
the enclave. Covers one
narrow scenario — an
FCI user who exfiltrates
a file past all other
controls and attempts to
decrypt it with cached
offline credentials
within the 3-day offline
window.
RMS encryption still
restricts decryption to A
VD-Enclave-FCI-User
s-MESG. B009/B010
prevent FCI users from
authenticating outside
the enclave. The offline-
credential scenario
requires a successful
exfiltration past Azure
Firewall, DLP, and
session host controls.
Sensitivity labels for
meetings
Allows the CUI - AVD
label to be applied to
calendar events,
protecting meeting
invites and attachments
with RMS encryption.
D003 blocks unlabeled
email from FCI
accounts but exempts
system-generated
calendar traffic
(acceptance notices,
cancellations) via the x-
ms-exchange-calenda
r-originator-id
header exception.
Meeting invites created
by the user are subject
to mandatory labeling in
Outlook, but calendar-
generated responses are
not.
Securing Microsoft 365 in GCC High | 2026.04.30
278

E5 Feature What it adds to the
enclave Without it (E3)
Auto-labeling Service-side policies
scan CUI SharePoint
sites and apply the CUI
- AVDlabel to pre-
existing or uploaded
content without user
action. Closes the gap
for content uploaded
through non-Office
channels (drag-and-
drop, API, migration
tools).
D001 blocks access to
unlabeled content in
CUI sites. Combined
with mandatory labeling
in Office apps, the only
gap is the brief DLP
crawl window after a
non-Office upload.
DLP for Teams chat
and channels
Detects CUI-labeled
content or sensitive data
pasted into Teams
messages, blocking
delivery to non-enclave
recipients. Closes the
copy-paste gap where a
user pastes CUI content
into a chat message
instead of sharing a file.
Files shared via Teams
are stored in SharePoint/
OneDrive and protected
by RMS encryption.
The gap is raw text
pasted into chat, which
is mitigated by session
host clipboard
restrictions at E3.
SharePoint Advanced
Management
Site-level conditional
access policies applied
directly or via
sensitivity labels. Data
access governance
reports. Restricted
content discoverability.
The CUI - AVDlabel's
Groups & sites scope
blocks unmanaged
device access and
restricts external sharing
at E3. DLP policies
provide the remaining
site-level controls.
4.8.3.2 Required Roles
Task Role Required
Write device extension attributes Device.ReadWrite.Allvia Microsoft
Graph (Intune Administrator or Cloud
Scenario: AVD — Enclave in Existing Tenant
279

Task Role Required
Device Administrator)
Create Conditional Access policies Conditional Access Administrator
Register Named Location Security Administrator
Create and publish sensitivity labels Compliance Administrator or Information
Protection Administrator
Create and manage DLP policies Compliance Administrator or DLP
Compliance Management role group
EXTENSION ATTRIBUTE WRITES ARE NOT SEPARATED FROM
GLOBAL ADMIN
Unlike Custom Security Attributes, device extension attributes can be
written by any identity with Device.ReadWrite.All— including Global
Administrators. This means a GA could tag any device as AVD-CUI-Autho
rized. Mitigate this by monitoring writes to extensionAttribute15in
the Entra audit log and alerting on unexpected changes. The DLP controls
(D002) provide a second layer — even if someone tags a non-enclave
device, they cannot persist CUI content outside designated sites.
4.8.3.3 Dedicated CUI Accounts
Each enclave user requires a second Entra account dedicated to CUI work, separate
from their primary identity.
Attribute Guidance
UPN convention A consistent suffix makes these accounts
identifiable — firstname.lastname-se
cure@contoso.us
License M365 E3 GCC High — sufficient for
AVD, SharePoint, and CUI-related
applications
Group membership AVD-Enclave-FCI-Users-MESGonly —
Securing Microsoft 365 in GCC High | 2026.04.30
280

Attribute Guidance
do not add to distribution lists, shared
mailboxes, or any group unrelated to CUI
Authentication methods Phishing-resistant methods (FIDO2 or
Windows Hello for Business) are strongly
recommended — no SMS or voice call.
Microsoft Authenticator push notifications
are permitted if phishing-resistant
authentication is not operationally
feasible; enable number matching and
additional context if so.
The goal is account hygiene, not account deprivation. CUI accounts can have
mailboxes and Teams access for CUI-related collaboration. What they should not
do is serve as the identity a user hands out to vendors, signs up for webinars with, or
uses for anything that generates inbound traffic unrelated to CUI work. The smaller
the account's exposure surface during normal hours, the less likely a credential
compromise during those hours reaches CUI.
4.8.3.4 Entra Group
Create the following group and place it in your existing EID Restricted
Management AU alongside the other CA security groups.
Group Name Purpose
AVD-Enclave-FCI-Users-MESG All dedicated CUI accounts that need
access via the enclave. Assigned to the
enclave host pool, scoped into P004/B009/
B010 (and B011/B012 for E5), and
targeted by DLP policies D001–D003 via
the label policy.
4.8.4 Precursors
The CA and DLP policies in the following sections each evaluate one or more of
these building blocks. Configure all precursors before enabling any policy.
Scenario: AVD — Enclave in Existing Tenant
281

4.8.4.1 Device Extension Attribute
Conditional Access uses a device filter to distinguish AVD session hosts from every
other device in the tenant. When a user authenticates from a session host, the
session host's Entra device object is evaluated by B009 (and B011 for E5 tenants).
The extensionAttribute15value is what these policies read to decide whether to
pass or block.
WHY EXTENSIONATTRIBUTE15 INSTEAD OF CUSTOM SECURITY
ATTRIBUTES?
Custom Security Attributes (CSAs) offer built-in RBAC separation and
predefined value validation, but they are only supported in Conditional
Access "Filter for applications" (on service principals). The CA "Filter for
devices" condition does not support CSAs — it supports extensionAttri
bute1-15along with built-in device properties like trustType, isCompli
ant, and operatingSystem. This is a platform limitation across all clouds,
not specific to GCC High.
Tag Session Hosts
Perform this step for each session host that should serve enclave users. Requires De
vice.ReadWrite.Allpermission in Microsoft Graph.
# 1. Connect to your GCC High tenant
Connect-MgGraph -Environment USGov -Scopes "Device.ReadWrite.All"
# 2. Build the payload
$params = @{
extensionAttributes = @{
extensionAttribute15 = "AVD-CUI-Authorized"
}
}
# 3. Tag the session host device object
# Replace the DeviceId with the Entra object ID of each session host
Update-MgDevice -DeviceId "<entra-device-object-id>" -BodyParameter $params
To verify the tag was applied:
Get-MgDevice -DeviceId "<entra-device-object-id>" |
Select-Object -ExpandProperty ExtensionAttributes |
Select-Object ExtensionAttribute15
The assignment is persistent across reboots and across the device rejoining Entra. If
a session host VM is replaced, the new VM's device object must be tagged before
Securing Microsoft 365 in GCC High | 2026.04.30
282

the affected user connects — B009 will block them until the tag is present.
4.8.4.2 Named Location
B010 (and B012 for E5 tenants) evaluates the Named Location to enforce that all
enclave traffic originates from the Azure Firewall egress IP.
Verify the UDR
Confirm that the session host subnet's route table has a default route pointing to the
Azure Firewall private IP (should be in place based on the previous chapter).
Azure portal → Networking → Route tables → [route table on AVD subnet]
Route name Address prefix Next hop type Next hop IP
default-to-fire
wall
0.0.0.0/0 Virtual appliance Azure Firewall
private IP
If this route is not present, add it before proceeding. Without it, session host traffic
bypasses the firewall and the Named Location condition will not be met.
Register the Firewall IP
1. Entra admin center → Security → Named locations → + IP ranges
location
2. Name: AVD Enclave Egress — AZFW
3. Mark as trusted location: Yes
4. IP range: Azure Firewall public IP in CIDR notation (e.g., 203.0.113.10/
32)
4.8.4.3 Sensitivity Labels
Create the CUI - AVD Label
This single label carries both file/email encryption settings and site-level access
controls. When creating the label, select both the Files & emails and Groups &
sites scopes so one label serves both purposes.
Scenario: AVD — Enclave in Existing Tenant
283

1. Microsoft Purview compliance portal (compliance.microsoft.us) →
Information protection → Labels → + Create a label
2. Label name: CUI - AVD
3. Display name: CUI - AVD Enclave
4. Description for users: Apply to documents and files containing
CUI within the AVD enclave. Access is restricted to authori
zed AVD enclave users. This label is separate from the orga
nization-wide CUI label — it applies enclave-specific RMS e
ncryption scoped to AVD-Enclave-FCI-Users-MESG.
5. Scope: Check both Files & emails and Groups & sites
Encryption settings (Files & emails scope):
6. Encrypt files and emails: On
7. Assign permissions now: Yes
8. User access to content expires: Never (or set per your data retention
policy)
9. Allow offline access: For a number of days — set to 3(shorter window
limits the risk of offline decryption of exfiltrated files)
10. Assign permissions → + Add users or groups: AVD-Enclave-FCI-User
s-MESG; set permissions to Co-Author (read, modify, print — no full
control)
Site protection settings (Groups & sites scope):
11. On Define protection settings for groups and sites, check External
sharing and Conditional Access settings
12. External sharing: Only people in your organization
13. Access from unmanaged devices: Block access (this is enforced
independently of B009/B010 and provides defense-in-depth)
Apply this label to each SharePoint site designated for CUI storage. The same label
protects files within those sites via RMS encryption and controls site-level sharing
and access policies.
Publish the Label Policy
1. Purview → Information protection → Label policies → + Publish label
2. Add the CUI - AVDlabel only — do not publish the organization-wide CUI
label or any other labels to FCI users. This ensures mandatory labeling
forces every document to carry the enclave-specific CUI - AVDlabel.
3. Publish to: AVD-Enclave-FCI-Users-MESG
4. Default label for documents: None — force explicit selection
Securing Microsoft 365 in GCC High | 2026.04.30
284

5. Require users to apply a label: Yes — this is the mandatory labeling
setting that closes the loop with DLP. FCI users cannot save a document in
Office apps without applying the CUI - AVDlabel.
MANDATORY LABELING IS LOAD-BEARING
Mandatory labeling ensures every document FCI users create carries the CU
I - AVDlabel. DLP Policy D002 blocks access to CUI-labeled files in non-
designated sites. Together, these two controls mean FCI users cannot
persist usable content anywhere except designated CUI sites — even if the
client admin grants them SharePoint permissions to other sites.
EXTEND COVERAGE WITH AUTO-LABELING
Once the label policy is stable, create an auto-labeling policy (Purview →
Information protection → Auto-labeling) to scan CUI SharePoint sites and
apply the label to pre-existing content without user action. Auto-labeling
requires M365 E5 Compliance or the Microsoft Purview add-on.
FORCE LABEL SYNC AFTER CREATION AND PUBLISHING
Sensitivity labels sync from Purview to the Azure Rights Management
service on an automatic schedule (typically every few hours). When
creating the CUI - AVDlabel for the first time, run Execute-AzureAdLabe
lSyncto force an immediate sync — otherwise the label may not be
immediately available for RMS encryption and testing. See Label Sync
Timing for details.
GCC High Notes
Item Value
Purview compliance portal compliance.microsoft.us
Scenario: AVD — Enclave in Existing Tenant
285

Item Value
Azure Rights Management endpoint api.aadrm.us
Label policy propagation Allow up to 24 hours after publishing
before labels appear in Office apps
VERIFY THE RMS ENDPOINT IN OFFICE APPS
GCC High Office apps must contact the sovereign RMS endpoint (api.aad
rm.us) to decrypt labeled files. If the tenant is correctly provisioned in
GCC High this is automatic, but verify before testing: open a labeled file in
Word, then check the RMS service endpoint in the Azure Information
Protection activity log. A connection attempt to api.aadrm.com
(commercial) indicates a misconfiguration that will silently fail label
decryption.
4.8.5 Conditional Access Policies
P004 enforces device compliance. B009 and B010 enforce device-tag and network
requirements. For E5 tenants, B011 and B012 add authentication-context
enforcement for CUI content. For E3 tenants without B011/B012, DLP policies
D001–D003 in the next section provide data-layer enforcement.
All three AVD-related apps — Azure Virtual Desktop, Azure Virtual Desktop
Client, and Windows Cloud Login — are excluded from P004, B009, and B010.
This allows enclave users to authenticate to the AVD broker from any device; once
inside the session, the session host satisfies all policy conditions.
ID Policy Name Grant/Block
P004 Require Compliant Device Require compliant device
B009 Enclave Device Block Block (unless tagged
device)
B010 Enclave Network Block Block (unless AZFW
egress IP)
Securing Microsoft 365 in GCC High | 2026.04.30
286

ID Policy Name Grant/Block
B011 Auth Context: Device
Block (E5 only)
Block (unless tagged
device)
B012 Auth Context: Network
Block (E5 only)
Block (unless AZFW
egress IP)
ENABLE IN REPORT ONLY MODE FIRST
Enable all CA policies in Report Only before switching to Enforce.
Enforcing B009 before extension attribute tags are assigned to session hosts
will lock enclave users out of all cloud apps. Validate each policy in CA
sign-in logs before enforcing. Similarly, enable DLP policies in Test mode
before switching to Turn it on right away.
4.8.5.1 P004 — Require Compliant Device
Requires device compliance for all cloud apps, with exclusions for the three AVD
apps so the broker connection is not blocked.
Users:
• Include: AVD-Enclave-FCI-Users-MESG
• Exclude: EID_Emergency_Admin_Exclusions
Target resources:
• Include: All cloud apps
• Exclude: Azure Virtual Desktop, Azure Virtual Desktop Client, W
indows Cloud Login
Grant: Require device to be marked as compliant
Logic: "Require a compliant device for all cloud apps — except the AVD broker
apps, which are accessed from the connecting device before the user reaches the
Scenario: AVD — Enclave in Existing Tenant
287

managed session host."
WHY EXCLUDE THE AVD APPS?
The connecting device — a personal laptop, a contractor's machine — is
intentionally not the managed endpoint. The AVD session host is.
Requiring device compliance on the broker connection defeats the enclave's
purpose, which is to provide a managed session to users whose physical
device is out of scope. Once inside the AVD session, the session host is a
compliant, Intune-managed device that satisfies P004 for all subsequent
cloud app access.
4.8.5.2 B009 — Enclave Device Block
Blocks all cloud app access from any device not carrying the AVD-CUI-Authorize
dextension attribute tag.
Users:
• Include: AVD-Enclave-FCI-Users-MESG
• Exclude: EID_Emergency_Admin_Exclusions
Target resources:
• Include: All cloud apps
• Exclude: Azure Virtual Desktop, Azure Virtual Desktop Client, W
indows Cloud Login
Conditions → Filter for devices:
• Rule type: Exclude filtered devices from policy
• Filter rule:
device.extensionAttribute15 -eq "AVD-CUI-Authorized"
Grant: Block
Logic: "Block all cloud apps for AVD-Enclave-FCI-Users-MESG— unless the
request comes from a device tagged AVD-CUI-Authorized. AVD broker apps are
excluded so the initial connection is not blocked."
Securing Microsoft 365 in GCC High | 2026.04.30
288

4.8.5.3 B010 — Enclave Network Block
Independently blocks all cloud app access from any traffic not originating from the
Azure Firewall egress IP. Together with B009, enforces AND logic.
Users:
• Include: AVD-Enclave-FCI-Users-MESG
• Exclude: EID_Emergency_Admin_Exclusions
Target resources:
• Include: All cloud apps
• Exclude: Azure Virtual Desktop, Azure Virtual Desktop Client, W
indows Cloud Login
Conditions → Locations:
• Include: Any location
• Exclude: AVD Enclave Egress — AZFW
Grant: Block
Logic: "Block all cloud apps for AVD-Enclave-FCI-Users-MESG— unless the
traffic arrives from the Azure Firewall public IP. AVD broker apps are excluded so
the initial connection is not blocked."
Combined logic (P004 + B009 + B010): All three policies must be satisfied. A
tagged device that is not compliant is blocked by P004. A compliant device without
the tag is blocked by B009. A tagged, compliant device not routing through the
firewall is blocked by B010. Only a request from a device that is compliant, tagged,
and routing through the AZFW IP passes all three.
4.8.5.4 B011 — Auth Context: Device Block (E5 Only)
Fires when a resource requests the c1auth context (CUI-labeled content or CUI
SharePoint sites). Blocks the context from any device not carrying the extension
attribute tag.
Users:
Scenario: AVD — Enclave in Existing Tenant
289

• Include: AVD-Enclave-FCI-Users-MESG
• Exclude: EID_Emergency_Admin_Exclusions
Target resources: Authentication context → c1 — CUI Access Required
Conditions → Filter for devices:
• Rule type: Exclude filtered devices from policy
• Filter rule:
device.extensionAttribute15 -eq "AVD-CUI-Authorized"
Grant: Block
Logic: "Block the c1auth context for AVD-Enclave-FCI-Users-MESG— unless
the request comes from a device tagged AVD-CUI-Authorized."
4.8.5.5 B012 — Auth Context: Network Block (E5 Only)
Independently blocks the c1auth context from any traffic not originating from the
Azure Firewall egress IP. Together with B011, enforces AND logic for auth context
access.
Users:
• Include: AVD-Enclave-FCI-Users-MESG
• Exclude: EID_Emergency_Admin_Exclusions
Target resources: Authentication context → c1 — CUI Access Required
Conditions → Locations:
• Include: Any location
• Exclude: AVD Enclave Egress — AZFW
Grant: Block
Logic: "Block the c1auth context for AVD-Enclave-FCI-Users-MESG— unless
the traffic arrives from the Azure Firewall public IP."
Combined logic (B011 + B012): Both policies must be satisfied. Only a session
from a tagged device routing through the AZFW IP can obtain a c1auth context
Securing Microsoft 365 in GCC High | 2026.04.30
290

claim and open labeled CUI files or access CUI SharePoint sites.
B011/B012 REQUIRE E5 LICENSING — DEPLOY IF YOU ALREADY
HAVE IT, DON'T BUY IT FOR THIS
Authentication context on SharePoint sites requires M365 E5, SharePoint
Advanced Management, or a Copilot license.
If the tenant does not have E5 licensing: Omit B011 and B012. The E3
controls already close the practical attack paths: RMS encryption restricts
decryption to AVD-Enclave-FCI-Users-MESG, B009/B010 prevent FCI
users from authenticating outside the enclave, session host lockdown limits
exfiltration vectors, and DLP policies D001–D003 enforce data-layer
controls at the service perimeter. Do not purchase E5 or SAM specifically
for auth context.
If the tenant already has E5 licensing: Deploy B011/B012 as free
defense-in-depth alongside D001–D003. Auth context adds one narrow
protection not covered by the other controls: if an FCI user exfiltrates a
CUI file past the Azure Firewall, DLP, and session host controls, and
attempts to decrypt it on a personal device using cached offline credentials
within the 3-day offline access window, auth context blocks decryption
because the cached token would not carry the c1claim. Without auth
context, RMS encryption still requires the user to be in AVD-Enclave-FCI-
Users-MESG, but cached offline credentials could allow decryption during
the offline window. This is a real but extremely narrow scenario — it
requires a successful exfiltration past multiple layers and a motivated
insider acting within a 3-day window.
4.8.6 Data Loss Prevention Policies
All three DLP policies evaluate the CUI - AVDsensitivity label configured in the
Sensitivity Labels precursor section. This label has the following properties relevant
to DLP evaluation:
Property Value DLP Relevance
Label name CUI - AVD The condition Content co
ntains sensitivity la
Scenario: AVD — Enclave in Existing Tenant
291

Property Value DLP Relevance
bel: CUI - AVDin
D001–D002 matches on
this name. This is distinct
from any organization-
wide CUIlabel.
RMS encryption Enabled — decryption
restricted to AVD-Enclav
e-FCI-Users-MESGwith
Co-Author permissions
Files matching the label are
encrypted; non-enclave
users cannot open them
even if DLP does not block
access
Offline access 3 days Limits the window during
which cached credentials
can decrypt exfiltrated files
Mandatory labeling Enforced via label policy
— CUI - AVDis the only
label published to FCI
users
Ensures every document
FCI users create carries the
CUI - AVDlabel, making
D002's block effective for
any content written to non-
designated sites
D001 enforces labeling within designated CUI sites. D002 blocks access to CUI
content that reaches non-designated locations. D003 blocks unlabeled email from
enclave accounts. Together with mandatory labeling and RMS encryption, these
three policies ensure FCI users can only create labeled content, that labeled content
can only persist in designated CUI sites, and that labeled content is unreadable by
anyone outside the enclave group.
Sharing and email delivery of CUI-labeled content to non-enclave recipients is not
blocked by DLP — it is rendered useless by RMS encryption on the CUI - AVD
label, which restricts decryption to AVD-Enclave-FCI-Users-MESG. This
Securing Microsoft 365 in GCC High | 2026.04.30
292

eliminates the need for a separate DLP policy to block sharing.
E3 VS. E5 DATA-LAYER ENFORCEMENT
E3 tenants (no B011/B012): RMS encryption and DLP policies
D001–D003 are the primary data-layer enforcement mechanism, working
alongside B009/B010. These controls close all practical attack paths
without E5 licensing.
E5 tenants (with B011/B012): Authentication context adds a narrow
additional protection for the offline-credential exfiltration scenario
described in the B011/B012 section above. DLP policies D001–D003
remain required — they catch edge cases (unlabeled content, content in
wrong locations, email routing) that auth context does not address.
Deploy D001–D003 regardless of licensing tier.
ID Policy Name Action
D001 Enforce Labeling in CUI
Sites
Block unlabeled content
D002 Block CUI in Wrong
Location
Block access
D003 Block Unlabeled Enclave
Email
Block outbound email
ENABLE IN TEST MODE FIRST
Enable all DLP policies in Test mode with policy tips before switching to
Turn it on right away. Validate each policy in the DLP alerts dashboard
and Activity Explorer before enforcing. Enforcing D001 before existing
CUI site content is labeled will block access to unlabeled legacy files.
Scenario: AVD — Enclave in Existing Tenant
293

Securing Microsoft 365 in GCC High | 2026.04.30
294

DLP BLOCK ACTIONS DO NOT APPLY TO SITE OWNERS OR SITE
COLLECTION ADMINISTRATORS
SharePoint site owners, site collection administrators, and Global
Administrators are exempt from DLP block actions on content within
their sites. This is a platform-level behavior — Microsoft exempts these
roles so they can access and remediate flagged content rather than being
locked out by their own DLP policies.
What this means for the enclave:
Account type D001/D002 block? RMS blocks labeled
content?
Global Admin / Site
Collection Admin
No — exempt from
DLP block actions
Yes — cannot decrypt
unless RMS Super User
Site Owner No — exempt from
DLP block actions
Yes — cannot decrypt
Regular user with site
access
Yes Yes — cannot decrypt
AVD-Enclave-FCI-Use
rs-MESGmember
Yes (for unlabeled
content)
Can decrypt
(authorized)
The gap: Global Administrators have implicit site collection admin access
to all SharePoint sites — this cannot be removed. Site owners have the
same DLP exemption by design. Both roles can read unlabeled content in
CUI sites because DLP doesn't block them and there's no encryption on
unlabeled files. Both roles also bypass the site-level access block from the C
UI - AVDsensitivity label.
What remains enforced regardless of admin role:
• RMS encryption on labeled files — admins can see filenames but
cannot decrypt CUI - AVDlabeled content unless they are in AVD-
Enclave-FCI-Users-MESG(or are RMS Super Users)
Mitigations for unlabeled content exposure to admins:
Scenario: AVD — Enclave in Existing Tenant
295

• Mandatory labeling ensures FCI users cannot create unlabeled
content in Office apps — the only unlabeled files that should exist
are pre-existing content or files uploaded through non-Office
channels
• Auto-labeling (E5) labels pre-existing and non-Office-uploaded
content, closing this gap over time
• CUI site owners should be trusted personnel — site ownership
carries the ability to read unlabeled content and should be treated
as a privileged role in the enclave's RBAC documentation
4.8.6.1 D001 — Enforce Labeling in CUI Sites
Blocks access to any file in a designated CUI SharePoint site that does not carry the
CUI - AVDsensitivity label. This ensures everything FCI users interact with is
properly labeled and encrypted. Note that site owners and site collection
administrators are exempt from this block — see the warning above.
Location: Designated CUI SharePoint sites (add each site explicitly)
Rule:
Component Configuration
Condition group (NOT) Content contains sensitivity label: CUI -
AVD— with the NOT operand enabled on
the condition group
Action Restrict access or encrypt the content in
Microsoft 365 locations → Block users
from receiving email or accessing →
Block everyone
Policy tip This file has not been labeled CU
I. Access is blocked until a CUI
label is applied.
Incident severity Medium
Notify Compliance Administrator
Securing Microsoft 365 in GCC High | 2026.04.30
296

Logic: "If a file in a designated CUI site does NOT carry the CUI - AVDsensitivity
label, block access for everyone."
TIMING
DLP evaluates content after upload. There is a brief crawl window
(typically seconds to minutes) where a newly uploaded unlabeled file may
be accessible before DLP blocks it. Mandatory labeling in Office apps
mitigates this — the gap only applies to files uploaded through non-Office
channels (drag-and-drop in browser, API, migration tools).
4.8.6.2 D002 — Block CUI in Non-Designated Locations
If a CUI-labeled file appears in any SharePoint site or OneDrive account that is not
a designated CUI location, block access to the file. This is the policy that prevents
the client admin from accidentally extending the enclave — even if they grant FCI
users permissions to a new site, any document the FCI user creates there will be
labeled CUI - AVD(mandatory labeling) and immediately blocked.
Location: All SharePoint sites and OneDrive accounts — EXCLUDE designated
CUI SharePoint sites
Rule:
Component Configuration
Condition Content contains sensitivity label: CUI -
AVD
Action Restrict access or encrypt the content in
Microsoft 365 locations → Block
everyone
Policy tip CUI content is not permitted in t
his location. Access has been blo
cked. Contact your Compliance Adm
inistrator.
Incident severity High
Scenario: AVD — Enclave in Existing Tenant
297

Component Configuration
Notify Compliance Administrator and Security
team
Logic: "If a CUI-labeled file appears anywhere outside the designated CUI sites,
block access immediately."
The file remains in its original location but is inaccessible — no one can open,
download, or share it. The Compliance Administrator receives an alert and can
investigate, then either move the file to a designated CUI site or delete it.
THE EXCLUSION LIST IS THE DESIGNATED SITE LIST
The list of excluded SharePoint sites in D002 is the authoritative list of
designated CUI locations. Only the Compliance Administrator (PIM-gated)
can modify this list. When a new CUI site is created, the Compliance
Administrator must add it to D002's exclusion list and D001's included
locations before CUI work can begin on that site.
4.8.6.3 D003 — Block Unlabeled Email from Enclave Accounts
Blocks outbound email from FCI accounts that does not carry the CUI - AVD
sensitivity label. Catches system-generated email, calendar invitations, and edge
cases where mandatory labeling in Office apps does not apply.
Location: Exchange — Include: AVD-Enclave-FCI-Users-MESGonly (mail-
enabled security group). This scopes the policy to FCI user mailboxes at the
location level — non-enclave users' email is not evaluated.
Rule:
Component Configuration
Condition (NOT group) Content contains sensitivity label: CUI -
AVD— with the NOT operand enabled on
the condition group
Securing Microsoft 365 in GCC High | 2026.04.30
298

Component Configuration
Exception (OR in NOT group) Header matches pattern — Header name:
x-ms-exchange-calendar-originato
r-id, Header value: [a-zA-Z0-9]
(exempts system-generated calendar items
— matches any message carrying this
header with an alphanumeric value)
Action Block users from receiving email →
Block everyone
Policy tip All email from enclave accounts m
ust carry a CUI - AVD sensitivity
label.
Incident severity Medium
Notify Compliance Administrator
Logic: "For email sent from AVD-Enclave-FCI-Users-MESGmailboxes: if the
email does NOT carry the CUI - AVDlabel, block it — unless it is a system-
generated calendar item."
LOCATION-LEVEL SCOPING VS. RULE-LEVEL SENDER CONDITIONS
The FCI group is applied at the Exchange location level (include only AV
D-Enclave-FCI-Users-MESG), not as a rule-level "Sender is a member of"
condition. Location-level scoping is more reliable — it removes non-
enclave mailboxes from evaluation before rule conditions are checked. This
also avoids a DLP limitation where group membership conditions may not
be available as rule-level conditions in all tenants.
4.8.6.4 Designating a New CUI Site
This procedure is performed by the Compliance Administrator (PIM-gated) —
not the client admin. Until all steps are complete, CUI work cannot proceed on the
site.
1. Create the SharePoint site (or confirm it exists)
Scenario: AVD — Enclave in Existing Tenant
299

2. Apply the CUI - AVDsensitivity label to the site (enables site-level sharing
and access controls)
3. Add the site URL to D001's included locations (enforces labeling within
the site)
4. Add the site URL to D002's excluded locations (allows CUI content to
persist)
5. Configure SharePoint permissions — grant AVD-Enclave-FCI-Users-MES
Gaccess
6. Validate in DLP Test mode before enabling enforcement on the new site
4.8.6.5 Site Membership Audit
DLP enforces write-side controls, but FCI account membership in non-CUI
SharePoint sites should be monitored as a governance control. A scheduled
PowerShell script (or Azure Automation runbook) should:
1. Enumerate all SharePoint sites where members of AVD-Enclave-FCI-User
s-MESGhave permissions
2. Compare against the designated CUI site list (sites in D001/D002)
3. Alert the Compliance Administrator if any FCI account has permissions to
a non-designated site
Run this audit weekly. Unexpected membership does not indicate a breach — DLP
Policy D002 blocks access to any CUI content written to non-designated sites —
but it indicates a permissions hygiene issue that should be corrected.
4.8.7 Verification
Enable all CA policies in Report Only mode and all DLP policies in Test mode
before enforcing. Validate each policy before switching to enforce.
Check How to Verify
Extension attribute assigned to session
hosts
Run Get-MgDevicefor the session host
and expand ExtensionAttributes— Ex
tensionAttribute15should return AVD-
CUI-Authorized
P004 allows AVD broker connection Sign in via AVD client from a personal
(non-compliant) device — session
Securing Microsoft 365 in GCC High | 2026.04.30
300

Check How to Verify
launches because AVD apps are excluded
from P004
B009 blocks direct cloud app access From a personal device (outside AVD),
open SharePoint with the CUI account —
should be blocked
B009 passes from AVD session Open SharePoint from inside the AVD
session — should succeed
B010 network binding From inside an AVD session, confirm
outbound IP matches Azure Firewall
public IP
B011/B012 (E5 only) auth context From a personal device outside AVD,
attempt to open a CUI-labeled file — CA
sign-in logs should show B011 or B012
Block with auth context c1
CA sign-in logs Entra → Sign-in logs → filter by AVD-Enc
lave-FCI-Users-MESG— B009 shows
Pass (from session host) and Block (from
personal device)
Mandatory labeling From inside the AVD session, create a
new document in Word — should not be
possible to save without applying the CUI
- AVDlabel
D001 blocks unlabeled content Upload an unlabeled file to a CUI
SharePoint site via drag-and-drop — after
DLP crawl, access should be blocked
RMS blocks non-enclave recipients From inside the AVD session, send a CUI-
labeled email to a non-enclave internal
user — email arrives but recipient cannot
decrypt the content
D002 blocks CUI in wrong location Upload a CUI-labeled file to a non-
designated SharePoint site — access
should be blocked for all users
D003 blocks unlabeled email From inside the AVD session, attempt to
send an email without a sensitivity label
— should be blocked
Scenario: AVD — Enclave in Existing Tenant
301

Check How to Verify
Label encryption From a personal device outside AVD,
attempt to open a CUI-labeled file —
should fail to decrypt (RMS encryption
restricts to AVD-Enclave-FCI-Users-MES
G)
RMS endpoint (GCC High) In Office app activity log, confirm RMS
calls go to api.aadrm.us, not api.aadr
m.com
DLP Activity Explorer Purview → Activity Explorer → filter by
DLP rule matches — confirm D001–D003
are firing as expected in Test mode
4.8.8 Operational Procedures
4.8.8.1 Adding a New Enclave User
1. Create a CUI account (firstname.lastname-secure@contoso.us), issue
a TAP, and have the user register their authentication method
2. Add the CUI account to AVD-Enclave-FCI-Users-MESG-MESG
3. Assign the user to the AVD Host Pool Application Group: Azure Portal →
Azure Virtual Desktop → Application groups → select the enclave
desktop application group → Assignments → + Add
4. Grant the Virtual Machine User Login role on the Resource Group: Azure
Portal → Resource Groups → select the enclave resource group →
Access control (IAM) → + Add role assignment → Virtual Machine
User Login → assign to the CUI account
5. Assign a personal pool session host (or confirm auto-assignment is
configured)
6. Verify the session host device object has extensionAttribute15 = AVD-
CUI-Authorized
Securing Microsoft 365 in GCC High | 2026.04.30
302

7. Have the user connect and confirm successful sign-in via CA sign-in logs
SIMPLIFY WITH GROUP-LEVEL ASSIGNMENTS
If AVD-Enclave-FCI-Users-MESG-MESGis assigned to the Application
Group and granted the Virtual Machine User Login role at the Resource
Group level at deployment time, steps 3 and 4 are handled automatically
when the user is added to the group in step 2. This is the recommended
configuration — verify it at initial deployment to reduce per-user
provisioning overhead.
4.8.8.2 Replacing a Session Host VM
A rebuilt or replaced session host gets a new Entra device object and does not
inherit the previous VM's extension attributes.
1. Tag the new device object with extensionAttribute15 = AVD-CUI-Aut
horizedvia the PowerShell script in the Device Extension Attribute
section
2. Confirm the tag is visible in Entra before notifying the user
3. Revoke or deregister the old device object
4.8.8.3 Offboarding an Enclave User
1. Remove the CUI account from AVD-Enclave-FCI-Users-MESG— P004,
B009, B010 (and B011/B012 for E5) no longer apply; DLP label policy
scope updates automatically
2. Deprovision the session host or reassign it
3. Disable the CUI account; delete after the applicable retention period
4.8.8.4 Handing Off to Client IT
The RBAC structure is designed for a graduated handoff. The enclave cannot be
self-extended by an admin who only has conventional roles.
Role Typical Holder Can Do Cannot Do
Global
Administrator
Client IT Manage users, reset
passwords, basic
Modify DLP
policies or label
Scenario: AVD — Enclave in Existing Tenant
303

Role Typical Holder Can Do Cannot Do
Intune operations policies (but can
write device
extension attributes
— monitor via
audit log)
Intune
Administrator or
Cloud Device
Administrator
Your team (PIM-
gated)
Write extensionA
ttribute15to tag/
untag session hosts
N/A
Conditional Access
Administrator
Your team (PIM-
gated)
Modify P004/B009/
B010/B011/B012
scope and
conditions
N/A
Compliance
Administrator
Your team (PIM-
gated)
Create, modify, and
publish sensitivity
labels, label
policies, and DLP
policies
D001–D003;
designate new CUI
sites
N/A
As the client team matures, transition these roles via PIM with an approval
workflow — not as standing assignments. The Compliance Administratorrole
is the highest-sensitivity handoff: it controls the DLP policies that define which
sites are designated for CUI and the label policies that enforce mandatory labeling.
The device tagging role (Intune Administrator or Cloud Device Administrator) is
the second highest: control of which devices can access CUI. Note that Global
Administrators can also write extension attributes — monitor extensionAttribut
e15changes in the Entra audit log to detect unauthorized tagging.
4.8.9 AVD Enclave — CMMC Control Mapping
Control Requirement How the Enclave
Satisfies It
AC.L2-3.1.1 Limit system access to Dedicated CUI accounts
Securing Microsoft 365 in GCC High | 2026.04.30
304

Control Requirement How the Enclave
Satisfies It
authorized users, processes,
and devices
are provisioned only for
users with an assessed need
for CUI access, enrolled in
phishing-resistant
authentication only. AVD-E
nclave-FCI-Users-MESG
group membership is the
explicit authorization gate
— access is not implied by
presence in the tenant.
AC.L2-3.1.2 Limit system access to
types of transactions and
functions authorized users
are permitted to execute
P004 requires device
compliance. B009 and
B010 restrict CUI access to
AVD-Enclave-FCI-User
s-MESGmembers on
tagged session hosts (exte
nsionAttribute15) at the
AZFW egress IP — no
other device or network
path can reach CUI
regardless of user
credentials. B011/B012
(E5) add auth context
enforcement at the token
level. DLP policies
D001–D003 further restrict
FCI users to designated
CUI sites and labeled
content only.
AC.L2-3.1.3 Control the flow of CUI in
accordance with approved
authorizations
Device tagging + location
binding prevents CUI from
being accessible from
devices outside the Azure
Firewall egress boundary.
RMS encryption restricts
file decryption to AVD-Enc
lave-FCI-Users-MESG—
content shared with or
emailed to non-enclave
recipients is unreadable.
DLP Policy D002 blocks
access to CUI-labeled files
Scenario: AVD — Enclave in Existing Tenant
305

Control Requirement How the Enclave
Satisfies It
that reach non-designated
locations. Mandatory
labeling ensures all FCI
user content is labeled and
subject to these controls.
AC.L2-3.1.14 Route remote access via
managed access control
points
All enclave session egress
passes through Azure
Firewall; the UDR enforces
this at the network layer
with no opt-out path for
session hosts
SC.L2-3.13.5 Implement subnetworks for
publicly accessible system
components
AVD session hosts are on
an isolated subnet; the
UDR and Azure Firewall
rules define the only
permitted egress paths
SC.L2-3.13.8 Implement cryptographic
mechanisms to prevent
unauthorized disclosure
AVD Gateway enforces
TLS 1.2+ on all RDP
sessions; Purview RMS
encryption protects labeled
files in transit and at rest —
only AVD-Enclave-FCI-U
sers-MESGcan decrypt,
and the 3-day offline
access window limits
exposure of exfiltrated files
4.9 Scenario: AVD — Privileged Admin
Workstation
4.9.1 The Problem This Solves
Several Microsoft PowerShell admin modules do not support FIDO2 passkey or
Windows Hello for Business authentication. Microsoft's own documentation
confirms this:
"Some PowerShell modules that use Internet Explorer instead of Edge
Securing Microsoft 365 in GCC High | 2026.04.30
306

aren't capable of performing FIDO2 authentication. For example,
PowerShell modules for SharePoint Online or Teams, or any PowerShell
scripts that require admin credentials, don't prompt for FIDO2."
For organizations enforcing phishing-resistant MFA as a Conditional Access
requirement — which CMMC Level 2 effectively mandates — this creates a gap:
admins who need to run Teams PowerShell, SharePoint Online PowerShell, or other
legacy modules cannot authenticate with their phishing-resistant credentials. The
common workaround is to exempt these admin accounts from the phishing-resistant
MFA requirement, which defeats the purpose.
The solution: Run admin PowerShell sessions inside an AVD session host that is
secured with phishing-resistant authentication. The admin authenticates to the AVD
broker with FIDO2 or WHfB. Inside the session, PowerShell modules authenticate
using a managed identity assigned to the session host VM — no passwords, no
certificates, no FIDO2 prompts, zero credentials stored or typed.
4.9.2 Architecture
Layer What it does
User → AVD broker Admin authenticates with phishing-
resistant MFA (FIDO2 / WHfB).
Conditional Access enforces this.
AVD session host Has a system-assigned managed identity
with the necessary admin Graph API
permissions
PowerShell module → Graph API Module authenticates via managed identity
— Connect-MicrosoftTeams -Identit
y, Connect-MgGraph -Identity, etc.
The phishing-resistant authentication happens at the session boundary. The
managed identity provides zero-credential access to the API. The admin never types
a password or handles a certificate.
Scenario: AVD — Privileged Admin Workstation
307

4.9.3 Which PowerShell Modules Support Managed
Identity
Module Managed identity
support Connection command
Microsoft Teams Yes Connect-MicrosoftTeam
s -Identity
Microsoft Graph Yes Connect-MgGraph -Iden
tity
Exchange Online Yes Connect-ExchangeOnlin
e -ManagedIdentity -O
rganization contoso.o
nmicrosoft.us
SharePoint Online (PnP) Yes Connect-PnPOnline -Ur
l https://contoso.sha
repoint.us -ManagedId
entity
SharePoint Online
Management Shell
No — use PnP or Graph
instead
N/A
Azure Az module Yes Connect-AzAccount -Id
entity
Security & Compliance No native managed identity
— use Connect-IPPSSess
ionwith certificate-based
auth as fallback
Certificate on session host
MODULES WITHOUT MANAGED IDENTITY SUPPORT
For modules that do not support managed identity authentication, use
certificate-based authentication as the fallback. Install a certificate on the
session host and configure the app registration to accept certificate
credentials. This is still zero-password — the certificate is bound to the
machine, not typed by the user.
Securing Microsoft 365 in GCC High | 2026.04.30
308

4.9.4 Prerequisites
4.9.4.1 Session Host VM
Use a personal host pool with one VM per admin. Each VM has its own system-
assigned managed identity with permissions scoped to that admin's role.
Requirement Configuration
VM type Personal pool — each admin gets a
dedicated session host
OS Windows 11 Enterprise (single-session)
Managed identity System-assigned — enabled on each
session host VM
PowerShell modules Pre-installed on the session host image
(Teams, Graph, Exchange Online, PnP,
Az)
Network Session hosts can reach Microsoft Graph
and M365 service endpoints
4.9.4.2 App Registration and Permissions
The managed identity authenticates as the VM's service principal. You must grant
the necessary Graph API application permissions to each session host's managed
identity.
Example: Teams admin session host
# Connect to Graph with admin credentials (one-time setup)
Connect-MgGraph -Environment USGov -Scopes "AppRoleAssignment.ReadWrite.All"
# Get the managed identity's service principal
$miObjectId = (Get-MgServicePrincipal -Filter "displayName eq 'avd-admin-team
s-01'").Id
# Get the Microsoft Graph service principal
$graphSP = Get-MgServicePrincipal -Filter "displayName eq 'Microsoft Graph'"
# Find the Teams admin app role (example: Organization.ReadWrite.All)
$appRole = $graphSP.AppRoles | Where-Object { $_.Value -eq "Organization.Read
Write.All" }
# Grant the permission to the managed identity
New-MgServicePrincipalAppRoleAssignment `
Scenario: AVD — Privileged Admin Workstation
309

-ServicePrincipalId $miObjectId `
-PrincipalId $miObjectId `
-ResourceId $graphSP.Id `
-AppRoleId $appRole.Id
Repeat for each Graph permission the admin role requires. Follow least privilege —
grant only the specific app roles needed for the admin's function, not broad
directory-wide permissions.
MANAGED IDENTITY PERMISSIONS ARE APPLICATION
PERMISSIONS, NOT DELEGATED
Managed identities authenticate as the application, not as a user. This
means:
• There is no user context — actions are performed as the service
principal, not as "admin@contoso.us"
• Audit logs show the managed identity's service principal name, not
the admin's UPN
• Permissions granted are application permissions, which are
typically broader than delegated permissions
Mitigate by:
• Using one session host per admin role (Teams admin, Exchange
admin) with only the permissions that role needs
• Logging which user was signed into the AVD session when the
managed identity was used (AVD sign-in logs correlate the user to
the session host)
• Reviewing managed identity permission grants in recurring access
reviews
4.9.4.3 Conditional Access
Create a CA policy requiring phishing-resistant MFA for admin access to the AVD
broker:
Users:
• Include: Admin security group (e.g., AVD-Admin-Workstation-Users)
Target resources: Azure Virtual Desktop, Azure Virtual Desktop Client,
Windows Cloud Login
Securing Microsoft 365 in GCC High | 2026.04.30
310

Grant: Require authentication strength: Phishing-resistant MFA
This ensures the admin authenticates with FIDO2 or WHfB before reaching the
session host. Once inside the session, the managed identity handles API
authentication — no second authentication prompt.
4.9.5 Usage
Once configured, the admin workflow is:
1. Open AVD client and connect to the admin session host
2. Authenticate with FIDO2 key (or WHfB) at the Entra login prompt
3. Open PowerShell inside the AVD session
4. Connect using managed identity:
# Teams administration
Connect-MicrosoftTeams -Identity
# Graph API operations
Connect-MgGraph -Identity
# Exchange Online administration
Connect-ExchangeOnline -ManagedIdentity -Organization contoso.onmicrosoft.us
# SharePoint administration (via PnP)
Connect-PnPOnline -Url https://contoso.sharepoint.us -ManagedIdentity
No passwords typed. No certificates managed. No FIDO2 compatibility issues. The
phishing-resistant authentication happened at the AVD broker; the managed identity
provides the API access.
4.9.6 Beyond PowerShell: Managed Identities as
Zero-Credential Infrastructure
Managed identities are not limited to PowerShell admin sessions. They can replace
stored credentials anywhere an Azure-hosted workload needs to access Microsoft
APIs:
Use case What managed identity replaces
PowerShell admin modules (this
scenario)
Passwords, certificates, FIDO2
workarounds
Scenario: AVD — Privileged Admin Workstation
311

Use case What managed identity replaces
Azure Automation runbooks Stored credentials or Run As accounts
(deprecated)
Azure Functions calling Graph API Client secrets in app settings
Logic Apps connecting to M365 OAuth connection credentials
Key Vault access from VMs Access policies based on service principal
secrets
Azure DevOps / GitHub Actions Workload identity federation replaces
long-lived client secrets
The principle is the same: the Azure resource has an identity issued by Entra, and
that identity authenticates to APIs without any stored or transmitted credential. This
eliminates an entire category of secret management — no Key Vault entries to
rotate, no certificates to renew, no passwords to store.
MANAGED IDENTITIES CAN OBVIATE KEY VAULT FOR MANY
SCENARIOS
Key Vault is often deployed to store secrets that managed identities make
unnecessary. If the workload consuming the secret runs on Azure (VMs,
App Service, Functions, AKS), evaluate whether a managed identity can
authenticate directly to the target API instead of retrieving a secret from
Key Vault. This removes a dependency, reduces latency, and eliminates the
secret lifecycle entirely.
4.10 Scenario: Shared PC Mode
This scenario covers physical shared devices — lab computers, training room
workstations, reception desks, and similar endpoints where multiple users share a
single machine with session isolation and automatic profile cleanup.
4.10.1 Lab: Shared PC Mode ("Wipe on Logout")
• Type: Settings Catalog
Securing Microsoft 365 in GCC High | 2026.04.30
312

• Goal: Enforce session isolation and data wiping.
EACH USER WILL GET A "FRESH" DESKTOP EVERY TIME
This may result in slow login experiences. Investigate if problematic.
Category
Shared PC Value Explanation
Account Model Azure AD Entra-joined devices use
Azure AD account model.
Use Domainonly for
Hybrid/Domain-joined
shared PCs.
Deletion Policy Delete immediately Account profiles are
deleted immediately after
sign-out.
Enable Account Manager true Activates the service that
deletes user profiles.
Enable Shared PC Mode true Switches the device into
Shared PC mode.
Maintenance Start Time 180 3am start time of
maintenance window.
Restrict Local Storage true Restricts user from using
local storage.
Set Power Policies false Don't apply SharedPC
defaults; configure power
via the Power Settings
policy below.
Sign In On Resume true Require signing in on
waking from sleep.
4.10.1.1 Exempting Admin Accounts from Profile Deletion
Shared PC Mode's Account Manager is a device-level service — it deletes profiles
Scenario: Shared PC Mode
313

for all non-active users after sign-out, regardless of group membership or Intune
assignment. You cannot exempt admins via Intune policy assignment or filters.
However, Windows supports a registry-based exemption mechanism. Adding an
account's SID to the SharedPC\Exemptionsregistry key tells the Account
Manager to skip that profile during cleanup. Deploy this via an Intune PowerShell
script assigned to the shared PC device group.
WHY EXEMPT ADMINS?
The exemption preserves admin profiles across sign-out, which supports
two workflows on a Shared PC. The first is troubleshooting convenience
— cached credentials, saved diagnostic tool layouts, familiar shell
configuration. The second is the "configure and copy default profile"
workflow, where an admin signs in, sets up the desired baseline (browser
bookmarks, app associations, desktop shortcuts, etc.), and copies that
profile into the default user template so every subsequent user inherits it.
Both are valid uses of the exemption today. If you'd prefer to retire the
configure-and-copy approach in favor of a model that's per-fleet, audited,
and survives Windows updates, the Customizing the Default User
Experience section below describes the policy-based alternative.
Step 1 — Identify the admin account SIDs:
# Run on any machine where the admin accounts have signed in,
# or look up the SID in Entra ID / Active Directory.
# Example: look up a specific user
Get-AzureADUser -ObjectId "admin@college.edu" | Select-Object DisplayName, On
PremisesSecurityIdentifier
Or for local accounts:
Get-LocalUser -Name "labadmin" | Select-Object Name, SID
Step 2 — Create the exemption script:
Save the following as Set-SharedPCExemptions.ps1. Replace the SID values
with the actual SIDs of your admin accounts.
# Exempt admin accounts from Shared PC Mode profile deletion
# Deploy via Intune > Devices > Scripts > Add (Windows 10 and later)
$exemptionPath = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\SharedPC\Ex
emptions"
Securing Microsoft 365 in GCC High | 2026.04.30
314

# Create the Exemptions key if it doesn't exist
if (-not (Test-Path $exemptionPath)) {
New-Item -Path $exemptionPath -Force | Out-Null
}
# Add each admin SID as a registry value (name = SID, value = 1)
$adminSIDs = @(
"S-1-12-1-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX"  # admin1@college.edu
"S-1-12-1-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX"  # admin2@college.edu
# Add additional admin SIDs as needed
)
foreach ($sid in $adminSIDs) {
New-ItemProperty -Path $exemptionPath -Name $sid -Value 1 -PropertyType D
Word -Force | Out-Null
Write-Output "Exempted SID: $sid"
}
Step 3 — Deploy via Intune:
1. Navigate to Intune > Devices > Scripts and remediations > Platform
scripts > Add > Windows 10 and later
2. Upload Set-SharedPCExemptions.ps1
3. Run this script using the logged-on credentials: No — run as System
4. Enforce script signature check: No (or sign the script per your org policy)
5. Run script in 64-bit PowerShell host: Yes
6. Assign to the shared PC device group
HOW THE EXEMPTION WORKS
The Account Manager service checks HKLM\SOFTWARE\Microsoft\Windo
ws\CurrentVersion\SharedPC\Exemptionsbefore deleting a profile. If
the signed-out user's SID appears as a value under this key, the profile is
preserved. All non-exempt profiles continue to be deleted per the Deletion
Policy. The exemption survives reboots and Shared PC Mode maintenance
windows.
If an admin account changes (e.g., a new IT staff member), update the
script with the new SID and re-deploy. Intune will re-run the script on the
next check-in cycle.
4.10.1.2 Admin Maintenance Procedure
Admins occasionally need full local access to a SharedPC-configured machine —
driver installs, log collection, third-party software updates, hardware
Scenario: Shared PC Mode
315

troubleshooting. The SharedPC CSP blocks all of those during normal operation,
and its blocking is more durable than most CSP behavior. This section explains the
mechanism and gives you a script-based workflow for opening a maintenance
window and closing it back up.
The procedure runs entirely on the target machine. There is no Intune-side action
— no assignment changes, no filter editing, no waiting for policy sync. The next
subsection explains why.
The enforcement mechanism: registry tattooing
Most Intune CSP settings live under HKLM\Software\Policies\...or HKLM\Sof
tware\Microsoft\Windows\CurrentVersion\Policies\.... When the policy
is un-provisioned in any way, the MDM stack walks those Policies hives and clears
the values it owns. The device returns to its pre-policy state.
The SharedPC CSP — and a small but consequential set of related Windows
configuration surfaces — writes registry values outside the Policies hives. Those
writes survive un-provisioning. This behavior is known as tattooing, and it has
been documented since at least 2021 (see Peter van der Woude's original write-up
on the BitLocker removable-data-drives setting and the follow-up community
thread on Removable Media tattooing). Microsoft changed the default CSP
processing model in 2020 to clear values on un-provisioning, but the SharedPC CSP
and a handful of others still tattoo because their writes target non-Policies paths.
This is why the maintenance procedure is script-based: un-assigning the policy
in Intune does not remove the tattooed registry surface that's actually enforcing the
restrictions. You'd wait 5–15 minutes for the sync, confirm un-provisioning, and
find Explorer just as locked down as before. Going straight to the registry — what
the window-opening script below does — is faster and produces an identical end
state.
For SharedPC, the tattooed surface lives at:
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\
This is theAllowed*family of CLSID-keyed allowlists that govern what the
Explorer shell namespace will navigate to and enumerate. The members commonly
seen in the wild are:
Registry name What it controls
AllowedNavigation Which CLSIDs can be navigated to
Securing Microsoft 365 in GCC High | 2026.04.30
316

Registry name What it controls
(sidebar, breadcrumbs, address bar drop-
downs)
AllowedEnumeration Which CLSIDs can be enumerated as
children of a namespace (what shows up
under This PC)
AllowedStorageLocations REG_DWORD bitmask of permitted
storage locations
WCOSNavigationBaselineAllowedlist Baseline navigation allowlist for WCOS /
Windows 11 kiosk-style scenarios
WCOSEnumerationBaselineAllowedlis
t
Baseline enumeration allowlist for the
same
Two things to know about this table in practice, both of which the scripts handle
defensively so you rarely need to think about them:
• WCOS baselines are conditional. Not every SharedPC profile provisions
the two WCOS*allowlists — they're specific to Windows Core OS / IoT /
kiosk SKUs and a few stricter enterprise baselines. Explorer queries for
them during namespace enumeration but tolerates their absence. Remove-S
haredPCTattoo.ps1skips any key that isn't present; Test-SharedPCMain
tenanceState.ps1treats absence as a passing check.
• AllowedStorageLocationsplacement varies. It's a REG_DWORDvalue,
not a key, and it's been observed in the wild both on the Explorerkey
directly and as a child value inside AllowedEnumeration(or other Allowe
d*/WCOS*subkeys). Remove-SharedPCTattoo.ps1handles the directly-
on-Explorer placement explicitly and picks up sub-key placements
incidentally via the recursive removal of each parent allowlist. Test-Share
dPCMaintenanceState.ps1walks all plausible parent locations.
When SharedPC is fully applied, everything in Explorer's local UI is blocked:
This PC won't enumerate drives, the address bar won't accept path input, Control
Panel won't open. The keys above each control a different facet of the shell
namespace — AllowedNavigationgoverns address-bar input, AllowedEnumerat
iongoverns drive enumeration under This PC — so a partial removal produces
partial relief. The window-opening script below removes all members of the family
in a single pass; there is no diagnostic reason to do it by parts.
One observable behavior worth knowing for troubleshooting: mapped network
Scenario: Shared PC Mode
317

drives stay visible under "Network locations" in This PC even when local fixed
drives are hidden. The Allowed*family filters the local CLSID-typed enumeration
path; mapped drives ride a different code path (the nethood delegate folder) and
aren't affected. Get-Volumeand GetLogicalDrives()always report the full drive
list because those APIs sit below the shell namespace layer entirely, so a clean drive
list from PowerShell while Explorer shows nothing is the signature of an Allowed*
tattoo, not a disk-level problem.
For canonical Microsoft references on what SharedPC actually sets, see the
SharedPC CSP node definitions and the Shared PC technical reference.
Maintenance workflow
This procedure opens a time-bounded maintenance window. The Intune
SharedPC assignment stays in place throughout, which means the next MDM sync
cycle (every 8 hours by default) will re-deliver the SharedPC settings and re-tattoo
the registry. Step 2 below covers the "just re-run the cleanup" remedy for that case.
If you're permanently decommissioning a device from the SharedPC fleet — a
different scenario that is not the subject of this procedure — unassign the SharedPC
profile in Intune first; what follows assumes the assignment stays intact.
1. Open the maintenance window. Run Remove-SharedPCTattoo.ps1on
the target device, in an elevated PowerShell session. The script backs up
affected keys to timestamped .regfiles under C:\IT_Tools\SharedPCBa
ckup\, removes the Allowed*family and the SharedPC key, stops the
SharedPC Account Manager service so it doesn't recreate state mid-
window, and restarts Explorer to flush the shell namespace cache. Then run
Test-SharedPCMaintenanceState.ps1— every check should pass
before you start work.
2. Perform maintenance. If you notice restrictions returning mid-window —
drives vanishing from This PC, Control Panel re-blocking — that means an
Intune policy sync ran and re-delivered the SharedPC settings, which re-
tattooed the registry. The remedy is to re-run Remove-SharedPCTattoo.p
s1. The default Intune sync cycle is 8 hours, so this is a real risk only on
long maintenance windows or when a sync is triggered manually (by the
user, by an Intune admin, or by a co-management agent). Each re-run
produces a fresh timestamped backup; the most recent backup is what Rest
ore-SharedPCTattoo.ps1will restore from in step 3.
3. Close the maintenance window. Run Restore-SharedPCTattoo.ps1
when work is complete. The script imports the most recent backup written
by the window-opening script (or a specific path if you pass -BackupPat
Securing Microsoft 365 in GCC High | 2026.04.30
318

h), restarts the SharedPC Account Manager service, restarts Explorer, and
verifies the keys are back in place. The device returns to its fully-restricted
state without any Intune-side action — the assignment was never disturbed.
MAINTENANCE WINDOW = UNRESTRICTED DESKTOP
Between steps 1 and 3, every SharedPC-derived restriction is gone — the
drive-hiding allowlists, the SharedPC key, and the Account Manager
service. AppLocker / WDAC and any other policies not delivered by the
SharedPC CSP remain in force, but a walk-up user gets an unrestricted
desktop. Schedule maintenance during off-hours or in a physically locked
room, RDP in rather than working at the console, and always run Restore-
SharedPCTattoo.ps1(and confirm it succeeds) before disconnecting.
Window-opening script: Remove-SharedPCTattoo.ps1
Run on the target device in an elevated PowerShell session at the start of a
maintenance window. The script writes timestamped .regbackups under C:\IT_T
ools\SharedPCBackup\, one per affected key — Restore-SharedPCTattoo.ps1
reads them at end-of-window. To roll back manually, double-click the .regfiles or
run reg.exe import <path>.
Download: Remove-SharedPCTattoo.ps1
<#
.SYNOPSIS
Removes tattooed registry remnants from the SharedPC CSP, opening
a maintenance window in which Explorer, Control Panel, and the
full drive namespace work normally.
.DESCRIPTION
The SharedPC CSP writes registry values outside the standard Policies
hives, so unassigning the policy in Intune does not remove them. This
script removes the Allowed* family of CLSID-keyed allowlists at
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\, removes the
SharedPC key, stops the Account Manager service, and restarts Explorer
to flush the shell namespace cache.
No Intune-side action is required first. The policy assignment is
not disturbed; this script simply removes the registry state that
is doing the actual enforcement, then Restore-SharedPCTattoo.ps1
puts it back at end-of-window.
.PARAMETER BackupRoot
Directory where backup .reg files will be written. A timestamped
subdirectory is created under this path. Default: C:\IT_Tools\SharedPCBac
kup.
Scenario: Shared PC Mode
319

.PARAMETER NoExplorerRestart
Skip the Explorer restart at the end. Use only if you intend to
restart Explorer manually or sign out and back in.
#>
[CmdletBinding()]
param(
[string]$BackupRoot = "C:\IT_Tools\SharedPCBackup",
[switch]$NoExplorerRestart
)
$ErrorActionPreference = 'Stop'
# Require elevation
$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($identity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Adminis
trator)) {
throw "This script must be run from an elevated PowerShell session."
}
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$backupDir = Join-Path $BackupRoot $timestamp
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Write-Host "Backups -> $backupDir" -ForegroundColor Cyan
# Keys to remove if present. Order matters only insofar as the SharedPC key
# is removed last so that the Account Manager has no chance to react.
$keysToRemove = @(
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\AllowedNavigatio
n',
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\AllowedEnumerati
on',
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\WCOSNavigationBa
selineAllowedlist',
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\WCOSEnumerationB
aselineAllowedlist',
'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\SharedPC'
)
# AllowedStorageLocations is a REG_DWORD value on the Explorer key (not a
# subkey of its own), so it is handled separately to avoid deleting the
# whole Explorer key by accident.
$explorerKey = 'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer'
# Stop the SharedPC Account Manager first so it does not race the registry re
moval.
$shpamsvc = Get-Service -Name shpamsvc -ErrorAction SilentlyContinue
if ($shpamsvc -and $shpamsvc.Status -eq 'Running') {
Write-Host "Stopping shpamsvc (SharedPC Account Manager)..." -ForegroundC
olor Yellow
Stop-Service -Name shpamsvc -Force
}
# Back up + remove each Allowed* / SharedPC key
foreach ($key in $keysToRemove) {
$psPath = $key -replace '^HKLM\\', 'HKLM:\'
if (Test-Path -LiteralPath $psPath) {
$safeName = ($key -replace '[\\:]', '_')
$backupFile = Join-Path $backupDir "$safeName.reg"
Securing Microsoft 365 in GCC High | 2026.04.30
320

Write-Host "Backing up $key" -ForegroundColor Gray
& reg.exe export $key $backupFile /y | Out-Null
Write-Host "Removing $key" -ForegroundColor Yellow
Remove-Item -LiteralPath $psPath -Recurse -Force
} else {
Write-Host "Skipping $key (not present)" -ForegroundColor DarkGray
}
}
# Handle the AllowedStorageLocations VALUE on the Explorer key
$explorerPsPath = $explorerKey -replace '^HKLM\\', 'HKLM:\'
if (Test-Path -LiteralPath $explorerPsPath) {
$existing = (Get-Item -LiteralPath $explorerPsPath).GetValue('AllowedStor
ageLocations', $null)
if ($null -ne $existing) {
$backupFile = Join-Path $backupDir 'AllowedStorageLocations_value.re
g'
Write-Host "Backing up AllowedStorageLocations value" -ForegroundColo
r Gray
& reg.exe export $explorerKey $backupFile /y | Out-Null
Write-Host "Removing AllowedStorageLocations value" -ForegroundColor
Yellow
Remove-ItemProperty -LiteralPath $explorerPsPath -Name 'AllowedStorag
eLocations' -Force
}
}
# Restart Explorer to flush the shell namespace cache. The Allowed* family is
# read at namespace enumeration time, but Explorer caches the result for the
# lifetime of the process.
if (-not $NoExplorerRestart) {
Write-Host "Restarting Explorer..." -ForegroundColor Yellow
Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500
Start-Process explorer.exe
}
Write-Host ""
Write-Host "Maintenance window opened." -ForegroundColor Green
Write-Host "Backup directory: $backupDir" -ForegroundColor Cyan
Write-Host "Run Test-SharedPCMaintenanceState.ps1 to verify."
exit 0
Verification script: Test-SharedPCMaintenanceState.ps1
Run after Remove-SharedPCTattoo.ps1and before starting work. Exit code 0 if
every check passes, 1 otherwise — suitable as a gate in a runbook or scheduled-task
wrapper.
Download: Test-SharedPCMaintenanceState.ps1
<#
.SYNOPSIS
Verifies that a Shared PC has been fully released from SharedPC CSP
enforcement and is ready for admin maintenance work.
.DESCRIPTION
Scenario: Shared PC Mode
321

Confirms that both the SharedPC CSP key AND the tattooed Allowed*
family of allowlists are absent, and that drive enumeration is
working at the volume layer. Intended to be run after
Remove-SharedPCTattoo.ps1 in the maintenance workflow.
Exit codes: 0 = all checks passed, 1 = one or more checks failed.
#>
[CmdletBinding()]
param()
function New-CheckResult {
param($Check, $Path, $Present, $ExpectedAbsent = $true)
[PSCustomObject]@{
Check   = $Check
Path    = $Path
Present = $Present
Passed  = if ($ExpectedAbsent) { -not $Present } else { $Present }
}
}
$results = @()
# Tattooed keys that must be absent
$keysExpectedAbsent = @{
'SharedPC key'                       = 'HKLM:\SOFTWARE\Microsoft\Windows\
CurrentVersion\SharedPC'
'AllowedNavigation'                  = 'HKLM:\SOFTWARE\Microsoft\Windows\
CurrentVersion\Explorer\AllowedNavigation'
'AllowedEnumeration'                 = 'HKLM:\SOFTWARE\Microsoft\Windows\
CurrentVersion\Explorer\AllowedEnumeration'
'WCOSNavigationBaselineAllowedlist'  = 'HKLM:\SOFTWARE\Microsoft\Windows\
CurrentVersion\Explorer\WCOSNavigationBaselineAllowedlist'
'WCOSEnumerationBaselineAllowedlist' = 'HKLM:\SOFTWARE\Microsoft\Windows\
CurrentVersion\Explorer\WCOSEnumerationBaselineAllowedlist'
}
foreach ($entry in $keysExpectedAbsent.GetEnumerator()) {
$present = Test-Path -LiteralPath $entry.Value
$results += New-CheckResult -Check $entry.Key -Path $entry.Value -Present
$present
}
# AllowedStorageLocations is a REG_DWORD value (not a key) that SharedPC can
# place either on the Explorer key directly OR as a child value of one of the
# Allowed*/WCOS* allowlist subkeys. Observed in the field inside AllowedEnume
ration
# on some devices. Check all plausible parent locations so the test isn't a
# false-negative when the value survives in a subkey Remove should have clear
ed.
$asCandidateParents = @(
'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer',
'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\AllowedNavigati
on',
'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\AllowedEnumerat
ion',
'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\WCOSNavigationB
aselineAllowedlist',
'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\WCOSEnumeration
BaselineAllowedlist'
)
$asFoundAt = $null
Securing Microsoft 365 in GCC High | 2026.04.30
322

foreach ($parent in $asCandidateParents) {
if (Test-Path -LiteralPath $parent) {
if ($null -ne (Get-Item -LiteralPath $parent).GetValue('AllowedStorag
eLocations', $null)) {
$asFoundAt = $parent
break
}
}
}
$results += New-CheckResult -Check 'AllowedStorageLocations value' `
-Path $(if ($asFoundAt) { "$asFoundAt\AllowedStorageLocations" } else {
'Explorer key or any Allowed*/WCOS* subkey' }) `
-Present ($null -ne $asFoundAt)
# SharedPC Account Manager service should be Stopped
$shpamsvc = Get-Service -Name shpamsvc -ErrorAction SilentlyContinue
$shpamRunning = ($shpamsvc -and $shpamsvc.Status -eq 'Running')
$results += New-CheckResult -Check 'shpamsvc not running' `
-Path 'Service: shpamsvc' -Present $shpamRunning
# Drive enumeration sanity -- at least one drive letter should be visible.
# Force-array with @() so .Count is defined when the filter yields a single C
imInstance.
$driveCount = @(Get-Volume | Where-Object { $_.DriveLetter }).Count
$results += New-CheckResult -Check 'Drive letters enumerable' `
-Path 'Get-Volume' -Present ($driveCount -gt 0) -ExpectedAbsent:$false
$results | Format-Table -AutoSize
if ($results | Where-Object { -not $_.Passed }) {
Write-Host "FAIL: one or more checks did not pass -- maintenance state is
not clean." -ForegroundColor Red
exit 1
} else {
Write-Host "PASS: all checks passed -- maintenance state is clean." -Fore
groundColor Green
exit 0
}
Restore script: Restore-SharedPCTattoo.ps1
Run at the end of the maintenance window to put the device back into its SharedPC
state. By default the script restores from the most recent timestamped subdirectory
under C:\IT_Tools\SharedPCBackup\— that's the backup from the most recent
Remove-SharedPCTattoo.ps1run, including any mid-window re-runs. Pass -Bac
kupPathto restore a specific session.
Download: Restore-SharedPCTattoo.ps1
<#
.SYNOPSIS
Restores the SharedPC tattoo state previously captured by
Remove-SharedPCTattoo.ps1, returning the device to its locked-down
SharedPC configuration.
.DESCRIPTION
Imports the timestamped .reg files written by Remove-SharedPCTattoo.ps1,
Scenario: Shared PC Mode
323

restarts the SharedPC Account Manager service, and restarts Explorer
so the shell picks up the restored Allowed* family of allowlists.
By default, restores from the most recent backup subdirectory under
BackupRoot. Pass -BackupPath to restore from a specific session.
No Intune-side action is required — the policy assignment was never
disturbed; this script simply puts back the registry state that the
window-opening script removed.
.PARAMETER BackupRoot
Root directory containing timestamped backup subdirectories.
Default: C:\IT_Tools\SharedPCBackup.
.PARAMETER BackupPath
Path to a specific timestamped backup subdirectory. If omitted,
the most recent directory under BackupRoot is used.
.PARAMETER NoExplorerRestart
Skip the Explorer restart at the end. The restored Allowed* family
will not take effect for the current Explorer session until it is
restarted or the user signs out and back in.
#>
[CmdletBinding()]
param(
[string]$BackupRoot = "C:\IT_Tools\SharedPCBackup",
[string]$BackupPath,
[switch]$NoExplorerRestart
)
$ErrorActionPreference = 'Stop'
# Require elevation
$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($identity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Adminis
trator)) {
throw "This script must be run from an elevated PowerShell session."
}
# Determine which backup to restore
if (-not $BackupPath) {
if (-not (Test-Path -LiteralPath $BackupRoot)) {
throw "No backup root found at $BackupRoot. Was Remove-SharedPCTatto
o.ps1 ever run on this machine?"
}
$latest = Get-ChildItem -LiteralPath $BackupRoot -Directory |
Sort-Object Name -Descending |
Select-Object -First 1
if (-not $latest) {
throw "No backup subdirectories found under $BackupRoot."
}
$BackupPath = $latest.FullName
}
if (-not (Test-Path -LiteralPath $BackupPath)) {
throw "Backup path does not exist: $BackupPath"
}
Write-Host "Restoring from: $BackupPath" -ForegroundColor Cyan
Securing Microsoft 365 in GCC High | 2026.04.30
324

$regFiles = @(Get-ChildItem -LiteralPath $BackupPath -Filter '*.reg')
if ($regFiles.Count -eq 0) {
throw "No .reg files found in $BackupPath."
}
foreach ($file in $regFiles) {
Write-Host "Importing $($file.Name)" -ForegroundColor Yellow
# reg.exe writes "The operation completed successfully." to stderr even o
n
# success. Under the script-wide $ErrorActionPreference='Stop', redirecti
ng
# that line with `2>&1` (or `2>$null`) folds it into the PS error stream,
# where PS 5.1 wraps it as a NativeCommandError and terminates the scrip
t.
# A try/catch swallows the termination but PS also resets $LASTEXITCODE t
o
# -1 during the error-unwind -- so a later $LASTEXITCODE check can't tell
# success from failure. Run the native call in a scriptblock with a local
# 'Continue' preference: stderr stays non-terminating AND $LASTEXITCODE
# reliably reflects reg.exe's real exit code.
$regExitCode = & {
$ErrorActionPreference = 'Continue'
& reg.exe import $file.FullName 2>&1 | Out-Null
$LASTEXITCODE
}
if ($regExitCode -ne 0) {
Write-Host "  WARNING: reg import returned exit code $regExitCode for
$($file.Name)" -ForegroundColor Red
}
}
# Restart the SharedPC Account Manager so it can resume profile cleanup dutie
s.
# Service operations are wrapped so a startup failure (e.g. restoring from a
# partial backup where the full SharedPC key set is absent) does not terminat
e
# the script; the Explorer restart and sanity check below should still run.
$shpamsvc = Get-Service -Name shpamsvc -ErrorAction SilentlyContinue
$shpamServiceWarning = $null
if ($shpamsvc) {
if ($shpamsvc.StartType -eq 'Disabled') {
Write-Host "Re-enabling shpamsvc (was Disabled)" -ForegroundColor Yel
low
try {
Set-Service -Name shpamsvc -StartupType Automatic
} catch {
$shpamServiceWarning = "Set-Service shpamsvc -StartupType Automat
ic failed: $($_.Exception.Message)"
Write-Host "  WARNING: $shpamServiceWarning" -ForegroundColor Red
}
}
if ($shpamsvc.Status -ne 'Running') {
Write-Host "Starting shpamsvc (SharedPC Account Manager)" -Foreground
Color Yellow
try {
Start-Service -Name shpamsvc
} catch {
$shpamServiceWarning = "Start-Service shpamsvc failed: $($_.Excep
tion.Message). This commonly indicates the restored backup did not include th
e full SharedPC key set."
Write-Host "  WARNING: $shpamServiceWarning" -ForegroundColor Red
}
Scenario: Shared PC Mode
325

}
}
# Restart Explorer so it re-enumerates the namespace with the restored Allowe
d* family
if (-not $NoExplorerRestart) {
Write-Host "Restarting Explorer..." -ForegroundColor Yellow
Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500
Start-Process explorer.exe
}
# Sanity-check: verify each key defined in each imported .reg file is now
# present in the registry. This replaces a previous hard-coded list of expect
ed
# keys (SharedPC, AllowedNavigation) which falsely flagged legitimate
# partial-backup restores on devices whose tattoo footprint didn't include
# those specific keys.
$missing = @()
foreach ($file in $regFiles) {
# Each .reg file contains one or more "[HKEY_...\path]" header lines.
# Extract them and verify each is present in the live registry.
$keyHeaders = @(Select-String -LiteralPath $file.FullName -Pattern '^\[(H
KEY_[^\]]+)\]' |
ForEach-Object { $_.Matches.Groups[1].Value } |
Sort-Object -Unique)
foreach ($header in $keyHeaders) {
if (-not (Test-Path -LiteralPath "Registry::$header")) {
$missing += "$($file.Name) -> $header"
}
}
}
$hadFailure = $false
Write-Host ""
if ($missing.Count -gt 0) {
Write-Host "FAIL: keys defined in the backup did not appear after impor
t:" -ForegroundColor Red
$missing | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
Write-Host "Inspect $BackupPath and re-run, or check for registry ACL iss
ues." -ForegroundColor Red
$hadFailure = $true
}
if ($shpamServiceWarning) {
Write-Host "NOTE: shpamsvc could not be returned to its running state:"
-ForegroundColor Yellow
Write-Host "  $shpamServiceWarning" -ForegroundColor Yellow
Write-Host "If the restored backup did not include the full SharedPC key
set," -ForegroundColor Yellow
Write-Host "this is expected -- shpamsvc will not start without the Share
dPC configuration." -ForegroundColor Yellow
$hadFailure = $true
}
if ($hadFailure) {
exit 1
}
Write-Host "Restore complete. All backed-up keys are present at their expecte
d locations." -ForegroundColor Green
Securing Microsoft 365 in GCC High | 2026.04.30
326

Write-Host "Backup source: $BackupPath" -ForegroundColor Cyan
exit 0
ALL THREE SCRIPTS IN SOURCE CONTROL
Treat all three scripts as production artifacts: store them in the same source-
control location as your Intune policy exports, version them alongside
policy changes, and require a code review for changes. The window-
opening script can destroy administratively-significant state if pointed at
the wrong machine, and the rollback path is the .regbackup it produces —
which only exists if the script ran cleanly to that point.
SAMPLE SHAREDPC TATTOO FOR TESTING
To exercise Restore-SharedPCTattoo.ps1(or test the full Remove →
Restore cycle) without a live SharedPC-provisioned device, download shar
edpc-sample-tattoo.zip— a sanitized capture of the real SharedPC
CSP footprint from an Intune-managed lab device. Three .regfiles plus a
README. Import the files on a test machine to simulate the tattoo, then
run the scripts against the simulated state.
4.10.2 Lab: Power Settings ("Always Ready for
Updates")
• Type: Settings Catalog
• Goal: Ensures machines never sleep so they can receive "Simultaneous"
updates.
Category / Setting Value Explanation
Administrative Templates /
Power Management /
Video and Display Settings
/
Turn off the display
(plugged in)
1200 sec Display goes dark after 20
minutes idle.
Scenario: Shared PC Mode
327

Category / Setting Value Explanation
Administrative Templates /
Power Management / Sleep
Settings /
Specify the system sleep
timeout (plugged in)
0 (never) Keeps a logged-in PC
awake — required for the
overnight maintenance
window to actually run.
Administrative Templates /
Power Management / Hard
Disk Settings /
Turn Off the hard disk
(plugged in)
1200 sec Drive spins down after 20
minutes idle. Does not
affect the PC's wake state.
Power /
Unattended Sleep Timeout
Plugged In
0 (never) Keeps the PC awake at the
lock screen when no user is
signed in — needed for
overnight updates on idle
machines.
4.10.3 Lab: Device Restrictions (The "Clean" Look)
• Type: Settings Catalog
• Goal: Enforces the "Kiosk-like" visual restrictions without breaking File
Securing Microsoft 365 in GCC High | 2026.04.30
328

Explorer.
ADMIN EXPERIENCE ON RESTRICTED LAB MACHINES
These restrictions apply device-wide — they affect every user who signs in,
including administrators. Default user experience customizations (browser
settings, app associations, desktop shortcuts) can be set up either through
the traditional admin-driven configure-and-copy default profile workflow
— supported by the admin-exemption mechanism above — or through
Intune policy. See Customizing the Default User Experience below for the
policy-based approach.
Admins who need to work on a restricted lab machine should follow the
Admin Maintenance Procedure above — run Remove-SharedPCTattoo.p
s1to open a maintenance window, do the work, then run Restore-Shared
PCTattoo.ps1to close it back up. Typing C:\directly into the File
Explorer address bar does not work around the restriction: the tattooed All
owed*family of allowlists at HKLM\SOFTWARE\Microsoft\Windows\Curr
entVersion\Explorer\blocks path-based navigation alongside the "This
PC" namespace, and there is no in-session workaround that doesn't involve
removing those allowlists from the registry.
Category/
Setting Value Explanation
Administrative Templates /
Control Panel/
Prohibit access to Control
Panel and PC settings
Enabled Blocks tampering with OS
settings.
Administrative Templates /
Personalization/
Prevent changing desktop
background
Enabled Blocks setting wallpaper.
Administrative Templates /
Personalization/
Prevent changing lock
screen image
Enabled Maintains org branding.
Administrative Templates / Restrict A, B, C and D Hides local drives to
Scenario: Shared PC Mode
329

Category/
Setting Value Explanation
Windows Components /
File Explorer/
Hide these specified drives
in My Computer
drives only prevent browsing system
files, mapped drives
visible. Admins can still
access drives by typing the
path directly in File
Explorer.
Windows Hello For
Business/
Use Windows Hello For
Business (Device)
false Prevent WHFB on shared
machines.
4.10.4 Lab: Windows Update Ring (The
"Uniformity" Engine)
• Type: Update ring for Windows 10 and later
• Goal: Ensures all shared machines update simultaneously rather than
staggering.
RELATIONSHIP TO THE ORGANIZATION-WIDE RING STRATEGY
This ring is a dedicated policy for shared devices. It operates independently
of the IT/Dev, Pilot, General Ops, and Critical Ops rings described in
Mobile & Endpoint Security: Windows Update Rings. Do not assign
shared PC devices to any of those rings.
Setting Name Recommended Value Why?
UPDATE SETTINGS
Microsoft product
updates
Allow Ensures Office/Edge get
patched alongside
Windows.
Windows drivers Allow Critical for Shared PC
stability.
Securing Microsoft 365 in GCC High | 2026.04.30
330

Setting Name Recommended Value Why?
Quality update deferral
period (days)
0 Critical: Ensures all
machines see the update
the moment it releases
(Uniformity).
Feature update deferral
period (days)
0 Same reason. We don't
want fragmentation.
Upgrade Windows 10
devices...
No Safety: Keep this "No".
You should control major
OS upgrades (e.g., moving
to Windows 12) using a
separate Feature Update
policy, not this ring.
Enable pre-release builds Not Configured Critical: Labs must be on
"General Availability"
channel, not Insider/Beta
channel.
USER EXPERIENCE
SETTINGS
Automatic update
behavior
Auto install and restart at
maintenance time
Matches "Shared PC"
maintenance window
(3am).
Active hours start 7 AM Covers early usage.
Active hours end 10 PM Covers evening usage.
Option to pause Windows
updates
Disable Shared PC users should
never be able to stop a
security patch.
Option to check for
Windows updates
Disable Shared PC users should not
be checking for updates.
Change notification
update level
Disable all notifications... Shared PC users should not
be deciding whether to
schedule reboots.
DEADLINE SETTINGS
Use deadline settings Allow Unlocks the settings below.
Scenario: Shared PC Mode
331

Setting Name Recommended Value Why?
Deadline for feature
updates
2 (days) Forces the install quickly.
Deadline for quality
updates
2 (days) If a machine was off for the
weekend, update it NOW.
Grace period 0 (days) Once the 2-day deadline
hits, reboot immediately
(during maintenance).
Auto reboot before
deadline
Yes If the machine is idle at the
login screen, reboot to
finish the patch.
4.10.5 Lab: AppLocker (Block execution of
unauthorized apps)
Type: Templates > Custom
Goal: Blocks unauthorized .exefiles from Downloads or USB since the OS isn't
frozen.
Setting Name Value Description
AppLocker Application
Control
Enforce Components Turns on the enforcement
engine.
Exe Rules Allow: C:\Windows\*,
C:\Program Files\*,
C:\Program Files (x8
6)\*
Allows installed software
and system files to run.
Exe Rules (Default
Behavior)
Block Implicitly blocks anything
not in the allowed paths
(e.g., portable games on
USB).
Name: Enforce EXE Restrictions
Description: Blocks everything not in Windows or Program Files
Securing Microsoft 365 in GCC High | 2026.04.30
332

OMA-URI: ./Vendor/MSFT/AppLocker/ApplicationLaunchRestrictions/N
ative/EXE/Policy(Make sure there are no spaces in this path)
Data type: String
Value: Paste the entire XML code block below:
<RuleCollection Type="Exe" EnforcementMode="Enabled">
<FilePathRule Id="fd686d83-a829-4351-8ff4-27c7de5755d2" Name="All files for
Administrators" Description="Allows members of the Administrators group to ru
n all applications." UserOrGroupSid="S-1-5-32-544" Action="Allow">
<Conditions>
<FilePathCondition Path="*" />
</Conditions>
</FilePathRule>
<FilePathRule Id="9428c9b1-60d4-493f-b839-9d1da1692257" Name="(Default Rul
e) All files located in the Windows folder" Description="Allows members of th
e Everyone group to run applications that are located in the Windows folde
r." UserOrGroupSid="S-1-5-32-545" Action="Allow">
<Conditions>
<FilePathCondition Path="%WINDIR%\*" />
</Conditions>
</FilePathRule>
<FilePathRule Id="921f6095-f287-4605-bf53-277437833072" Name="(Default Rul
e) All files located in the Program Files folder" Description="Allows members
of the Everyone group to run applications that are located in the Program Fil
es folder." UserOrGroupSid="S-1-5-32-545" Action="Allow">
<Conditions>
<FilePathCondition Path="%PROGRAMFILES%\*" />
</Conditions>
</FilePathRule>
<FilePathRule Id="a61c8b2c-a319-4cd0-9690-d2177cad7b51" Name="(Default Rul
e) All files located in the Program Files (x86) folder" Description="Allows m
embers of the Everyone group to run applications that are located in the Prog
ram Files (x86) folder." UserOrGroupSid="S-1-5-32-545" Action="Allow">
<Conditions>
<FilePathCondition Path="%OSDRIVE%\Program Files (x86)\*" />
</Conditions>
</FilePathRule>
</RuleCollection>
4.10.6 Lab: Office 365 Licensing
Type: Settings Catalog
Goal: Prevents licensing errors on shared hardware.
Category Setting Name Value Description
Microsoft Office
2016 (Machine) \
Licensing Settings
Use shared
computer
activation
Enabled Allows unlimited
users to activate
Office on the
Scenario: Shared PC Mode
333

Category Setting Name Value Description
machine without
consuming their
5-device limit.
4.10.7 Lab: Start Menu
Type: Templates > Device Restrictions
Goal: Pins academic apps to the Start Menu/Taskbar.
Setting Name Value Description
Start menu layout [Upload XML File] XML file pinning Word,
Excel, Chrome, and
required apps.
Start menu layout: Paste the entire XML code block below:
<LayoutModificationTemplate
xmlns:defaultlayout="http://schemas.microsoft.com/Start/2014/FullDefaultL
ayout"
xmlns:start="http://schemas.microsoft.com/Start/2014/StartLayout"
xmlns:taskbar="http://schemas.microsoft.com/Start/2014/TaskbarLayout"
Version="1">
<LayoutOptions StartTileGroupCellWidth="6" />
<DefaultLayoutOverride>
<StartLayoutCollection>
<defaultlayout:StartLayoutGroup Name="Lab Tools">
<start:DesktopApplicationTile Size="2x2" Column="0" Row="0" DesktopAp
plicationLinkPath="%ALLUSERSPROFILE%\Microsoft\Windows\Start Menu\Programs\Go
ogle Chrome.lnk" />
<start:DesktopApplicationTile Size="2x2" Column="2" Row="0" DesktopAp
plicationID="Microsoft.Windows.Explorer" />
<start:DesktopApplicationTile Size="2x2" Column="4" Row="0" DesktopAp
plicationID="Microsoft.MicrosoftEdge.Stable_8wekyb3d8bbwe!App" />
<start:DesktopApplicationTile Size="2x2" Column="0" Row="2" DesktopAp
plicationID="Microsoft.Office.WINWORD.EXE.15" />
<start:DesktopApplicationTile Size="2x2" Column="2" Row="2" DesktopAp
plicationID="Microsoft.Office.EXCEL.EXE.15" />
<start:DesktopApplicationTile Size="2x2" Column="4" Row="2" DesktopAp
plicationID="Microsoft.Office.POWERPNT.EXE.15" />
</defaultlayout:StartLayoutGroup>
</StartLayoutCollection>
</DefaultLayoutOverride>
<CustomTaskbarLayoutCollection PinListPlacement="Replace">
<defaultlayout:TaskbarLayout>
<taskbar:TaskbarPinList>
Securing Microsoft 365 in GCC High | 2026.04.30
334

<taskbar:DesktopApp DesktopApplicationLinkPath="%ALLUSERSPROFILE%\Mic
rosoft\Windows\Start Menu\Programs\Google Chrome.lnk" />
<taskbar:DesktopApp DesktopApplicationID="Microsoft.Windows.Explore
r" />
<taskbar:DesktopApp DesktopApplicationID="Microsoft.Office.WINWORD.EX
E.15" />
<taskbar:DesktopApp DesktopApplicationID="Microsoft.Office.EXCEL.EX
E.15" />
<taskbar:DesktopApp DesktopApplicationID="Microsoft.Office.POWERPNT.E
XE.15" />
</taskbar:TaskbarPinList>
</defaultlayout:TaskbarLayout>
</CustomTaskbarLayoutCollection>
</LayoutModificationTemplate>
4.10.8 Customizing the Default User Experience
There are two ways to seed the default user experience on a Shared PC. The
traditional approach is the configure-and-copy default profile workflow: an admin
signs in, sets up the desired baseline (browser bookmarks, app defaults, desktop
shortcuts, printer mappings), and copies the profile to C:\Users\Defaultso every
new user inherits those settings. The admin-exemption mechanism in Exempting
Admin Accounts from Profile Deletion is what keeps the admin profile available for
this work between sign-outs.
The alternative covered in this section is Intune policy-based delivery: every
customization is expressed as a Settings Catalog policy, an Administrative
Template, or a platform script, assigned to the device group. A few characteristics
worth considering when choosing between the two:
• Per-fleet propagation — a single policy change rolls out to every machine
in the device group; no per-machine repeat needed
• Update durability — Windows feature updates that reset or invalidate the
default profile registry hive don't disturb policies, since policies re-apply on
every check-in
• Compatibility with "delete immediately" — Shared PC Mode's profile-
deletion policy doesn't fight policy-delivered customizations, which apply
at sign-in rather than living in a copied profile
• Auditable — Intune surfaces what's deployed and where; manually
configured profiles produce no equivalent record
The rest of this section walks through the policy-based approach for the most
common customization categories.
Scenario: Shared PC Mode
335

4.10.8.1 Browser Configuration (Edge)
Type: Settings Catalog — Administrative Templates > Microsoft Edge
Setting Value What it replaces
Configure the home page
URL
https://portal.colleg
e.edu(or your institution's
portal)
Manually setting the
homepage in Edge
Configure the new tab page
URL
Same as above, or about:b
lank
New tab page
configuration
Configure Managed
Bookmarks
JSON array of bookmarks
(see below)
Manually adding
bookmarks
Configure the default
search provider
Enabled, with search URL
for your preferred provider
Changing default search
engine
Control which extensions
are installed silently
Extension IDs for any
required browser
extensions
Manually installing
extensions
Managed Bookmarks example (paste into the "Configure Managed Bookmarks"
value field):
[
{"toplevel_name": "College Resources"},
{"name": "Internal Portal", "url": "https://portal.college.edu"},
{"name": "Library", "url": "https://library.college.edu"},
{"name": "Canvas LMS", "url": "https://college.instructure.com"},
{"name": "Office 365", "url": "https://www.office.com"}
]
4.10.8.2 Default Application Associations
Type: Settings Catalog
Setting: Default Associations Configuration File
What it replaces: Manually setting "Open with" defaults in Settings and copying
the profile.
How to create the XML:
1. On a reference machine, configure the desired default app associations
Securing Microsoft 365 in GCC High | 2026.04.30
336

(e.g., .pdf→ Adobe Acrobat, .docx→ Word)
2. Export the associations:
DISM /Online /Export-DefaultAppAssociations:"C:\IT_Tools\DefaultAppAss
ociations.xml"
3. In the Settings Catalog policy, upload the exported XML underDefault
Associations Configuration File
This applies device-wide — every user who signs in gets the same default app
associations without any profile copy.
4.10.8.3 Desktop Shortcuts
Type: Intune Platform Script
What it replaces: Manually creating desktop shortcuts and copying the profile.
Deploy a PowerShell script that creates shortcuts in C:\Users\Public\Desktop.
Public Desktop shortcuts appear for every user on the machine automatically.
# Deploy via Intune > Devices > Scripts > Platform scripts
# Run as: System | Run in 64-bit host: Yes
$publicDesktop = "C:\Users\Public\Desktop"
$shell = New-Object -ComObject WScript.Shell
# Example: Canvas LMS shortcut
$shortcut = $shell.CreateShortcut("$publicDesktop\Canvas LMS.lnk")
$shortcut.TargetPath = "https://college.instructure.com"
$shortcut.IconLocation = "C:\Program Files (x86)\Microsoft\Edge\Application\m
sedge.exe,0"
$shortcut.Save()
# Example: Internal Portal shortcut
$shortcut = $shell.CreateShortcut("$publicDesktop\Internal Portal.lnk")
$shortcut.TargetPath = "https://portal.college.edu"
$shortcut.IconLocation = "C:\Program Files (x86)\Microsoft\Edge\Application\m
sedge.exe,0"
$shortcut.Save()
4.10.8.4 Printer Mappings
Type: Settings Catalog (Universal Print) or Intune Platform Script
Option 1 — Universal Print (preferred): If the college uses Universal Print,
deploy printer mappings via the Settings Catalog Universal Print policy. This
provisions printers automatically for every user on the device.
Scenario: Shared PC Mode
337

Option 2 — Platform Script: For traditional print servers, deploy a PowerShell
script:
# Deploy via Intune > Devices > Scripts > Platform scripts
# Run as: System | Run in 64-bit host: Yes
# Add network printer
Add-PrinterPort -Name "IP_Lab_Printer" -PrinterHostAddress "10.1.50.25" -Erro
rAction SilentlyContinue
Add-Printer -Name "Lab Building A - HP LaserJet" -DriverName "HP Universal Pr
inting PCL6" -PortName "IP_Lab_Printer" -ErrorAction SilentlyContinue
# Set as default
(Get-WmiObject -Query "SELECT * FROM Win32_Printer WHERE Name='Lab Building A
- HP LaserJet'").SetDefaultPrinter() | Out-Null
4.10.8.5 File Explorer Defaults
Type: Settings Catalog — Administrative Templates > File Explorer
Setting Value What it replaces
Default folder for the Open
File Dialog
This PC Changing File Explorer's
default open location
Turn off caching of
thumbnails
Enabled Reduces profile size on
shared PCs
Turn off display of recent
search entries
Enabled Prevents user search
history from persisting
4.10.8.6 Office First-Run and Privacy Prompts
Type: Settings Catalog — Administrative Templates > Microsoft Office
Setting Value What it replaces
Disable First Run Movie Enabled Suppresses the Office
"Welcome" animation on
every new profile
Disable First Run on
application boot
Enabled Skips the "What's New"
pane
Disable Opt-in Wizard on
first run
Enabled Suppresses the privacy/
telemetry opt-in prompt
Securing Microsoft 365 in GCC High | 2026.04.30
338

Setting Value What it replaces
Send personal information Disabled Prevents Office from
prompting for optional
connected experiences
4.10.8.7 Notification Suppression
Type: Settings Catalog — Administrative Templates > Notifications
Setting Value What it replaces
Turn off toast notifications
on the lock screen
Enabled Prevents notifications from
appearing on the lock
screen between user
sessions
Turn off Notifications
Network Usage
Enabled Reduces unnecessary
network traffic on shared
hardware
WHAT ABOUT PER-USER ACCESSIBILITY SETTINGS?
Accessibility preferences (high contrast, display scaling, narrator,
magnifier) are intentionally per-user settings. Forcing them device-wide via
policy would create problems for users who don't need them. If specific lab
machines require accessibility defaults (e.g., an accessibility-focused lab),
create a separate Settings Catalog policy with the appropriate display and
ease-of-access settings and assign it to that device group only.
4.11 Scenario: Migrating to Entra Join
This scenario applies when existing machines — currently domain-joined or Entra
Hybrid Joined — need to move to full Entra Join without wiping user profiles.
Greenfield deployments (new hardware, new profiles) do not need this; go directly
Scenario: Migrating to Entra Join
339

to Entra Join (The Cloud-Only Path).
PREREQUISITE
Complete the Entra Join prerequisites (DNS records and MDM User Scope)
in Entra Join (The Cloud-Only Path) before running the migration on
any machine.
4.11.1 The Profile Identity Problem
When a machine transitions from Domain or Hybrid Join to full Entra Join,
Windows treats the cloud identity as a completely new owner. The operating system
no longer recognizes CONTOSO\useras the same person as user@contoso.com—
they have different SIDs. The result is that the user receives a fresh profile on their
first cloud login: application settings, local Documents, desktop icons, and registry-
stored preferences do not carry over automatically.
For a hardware refresh this is acceptable — users expect a clean start. For an in-
place migration of an existing machine, it is a support burden. ForensiT User
Profile Wizard is the industry standard tool for mapping the old SID to the new
one so the existing profile follows the user through the transition.
4.11.2 Migration with ForensiT User Profile Wizard
1. Install ForensiT User Profile Wizard as a local admin
2. Run the ForensiT User Profile Wizard Deployment Kit
3. Step 2 of 13: Create a new migration project: EntraMigration
4. Step 3 of 13: Enter name of new domain: contoso.comand select Azure
AD
5. Migrate to Azure AD (select Azure AD as the target directory type)
6. Generate the ForensiTAzureID.xml
◦ Set-ExecutionPolicy -Scope LocalMachine RemoteSigned
◦ C:\Program Files (x86)\ForensiT\User Profile Wizard C
orporate\Deployment Kit\bin\Save-AzureADUser
7. Create a Provisioning Package (this is how User Profile Wizard joins
machines to Entra)
◦ Install Windows Assessment and Deployment Kit
◦ Launch Start → All → W → Windows Kits → Windows
Imaging and Configuration Designer
Securing Microsoft 365 in GCC High | 2026.04.30
340

▪ Project: EntraJoin
▪ Follow instructions to NOT change machine names
8. Export Provisioning Package
◦ C:\Users\<username>\Documents\Windows Imaging and Con
figuration Designer (WICD)\EntraJoin\EntraJoin.ppkg
9. Configure User Profile Wizard to migrate profiles to Azure AD
10. Step 3 of 13:
◦ Enter name of new domain: contoso.com
◦ Select Azure AD
◦ Azure ID file path: C:\Program Files (x86)\ForensiT\User
Profile Wizard Corporate\Deployment Kit\bin\ForensiTA
zureID.xml
◦ Provisioning Package: C:\Users\<username>\Documents\Windo
ws Imaging and Configuration Designer (WICD)\EntraJoi
n\EntraJoin.ppkg
11. Step 6 of 13:
◦ Existing domain: CONTOSO
◦ Migrating from existing Azure AD tenant: No
12. Step 8 of 13:
◦ Check Use lookup file to get new account names, create lookup
file, and set path
▪ Generally AD usernames are just everything before @ in
the Entra UPN
▪ C:\Users\<username>\Documents\ForensiTUserLook
up.csv
◦ Clear the Skip migration if user is not found in lookup file
checkbox
◦ Clear the Rename Profile Folder checkbox due to compatibility
concerns
13. Step 10 of 13: Enter local administrator account to run user profile wizard
14. Step 11 of 13: Let the default script run to execute the migration
15. Step 12 of 13: No need for any other per-user script to run
16. Create single deployment file:
◦ C:\ProgramData\ForensiT\User Profile Wizard Corporat
e\Deployment Files\EntraJoin\Migrate-ToEntra.exe
17. Quit any applications that may interfere with the profile migration,
such as VPN clients or endpoint security agents.
18. Run the migration.
Scenario: Migrating to Entra Join
341