# 5. Device Operations

**CMMC2 Documentation** | Version 2026.04.30

**Pages:** 342-488

---

## Table of Contents

- 5.1 Modern Endpoint Operations
  - 5.1.1 The Management Model
  - 5.1.2 How Policy Reaches Devices
  - 5.2.1 Enrollment Methods
- 5.3 Mobile Device Management & App Protection
- 5.4 Open Intune Baseline Deployment
  - 5.4.2 Step 1 — Download the IntuneManagement tool
  - 5.4.3 Step 2 — Download the OIB JSON files
  - 5.4.5 Step 4 — Sign in and grant consent
  - 5.4.7 Step 6 — Verify the import
  - 5.4.8 Step 7 — Apply environment-specific modifications
  - 5.4.9 Step 8 — Assign policies
  - 5.4.11 CMMC Control Mapping Matrix
  - 5.4.13 NIST SP 800-171 Rev. 3 Control Mapping
  - 5.4.18 Wi-Fi Configuration
  - 5.4.19 Intune Diagnostics & Audit Evidence
  - 5.4.20 Policy Troubleshooting
  - 5.4.21 Intune Audit Log
  - 5.4.22 Device Compliance Audit Evidence
  - 5.4.25 Diagnostic Tools Reference
  - 5.5.1 CMMC Relevance
  - 5.5.5 Onboarding Devices via Intune
  - 5.6.1 Why Not the Built-In M365 Apps Policy?
  - 5.6.3 Step 1: Create the Configuration XML
  - 5.6.6 Step 4: Upload to Intune
  - 5.6.7 Step 5: Assign and Monitor
  - 5.6.8 Company Portal Deployment
- 5.7 Intune RBAC & Governance
  - 5.7.4 Scope Tags vs. Assignment Filters
  - 5.7.5 Cleanup Checklist for Disorganized Environments
  - 5.8.5 Pre-Imaging Checklist
  - 5.8.6 Ongoing Hygiene
  - 5.8.8 Reference Commands
  - 5.9.1 The Top-Down Approach
  - 5.9.2 Group Policy Analytics
  - 5.9.3 Policy Framework and Naming Convention
  - 5.9.4 Policy Taxonomy by Tier

---

5. Device Operations
5.1 Modern Endpoint Operations
5.1.1 The Management Model
Traditional endpoint management required a device to be on the corporate
network—or connected via VPN—to receive Group Policy updates, software
deployments, and compliance checks. Modern management inverts this: Intune is
the source of truth, and devices communicate directly with Microsoft's cloud
services over the internet regardless of location.
Traditional (GPO/SCCM) Modern (Intune/Cloud-Native)
Domain Controller required for policy
delivery
Policy delivered over internet, no DC
required
VPN required for remote management Native cloud communication from any
network
Software deployed from on-prem
distribution points
Apps delivered from Intune or Microsoft
CDN
Compliance enforced at login (Group
Policy)
Compliance evaluated continuously,
access gated by Conditional Access
Manual imaging and re-imaging Zero-touch provisioning via Autopilot
5.1.2 How Policy Reaches Devices
Intune does not push policy to devices on demand. Devices check in on a schedule
and pull pending policy changes, app assignments, and compliance evaluations.
5.1.2.1 Check-In Cycle
Trigger Frequency
Scheduled check-in (enrolled devices) Every 8 hours
Securing Microsoft 365 in GCC High | 2026.04.30
342

Trigger Frequency
After device restart Within minutes of boot
After user signs in Within minutes of sign-in
After an Intune policy change Within 15 minutes (Intune sends a push
notification to wake the device)
Manual sync (user-initiated) Settings > Accounts > Access work or
school > Info > Sync
Admin-forced sync Intune portal > Devices > [device] > Sync
FORCE A SYNC DURING TROUBLESHOOTING
When you need a device to pull a new policy immediately, use Intune >
Devices > [device] > Sync from the portal, or have the user go to Settings
> Accounts > Access work or school, click the connection, and click Info
> Sync. Allow 5–10 minutes after sync before checking policy application.
5.1.2.2 Policy Conflict Resolution
When multiple policies target the same setting, Intune resolves conflicts using this
hierarchy:
1. Endpoint Security policies (highest priority — security baselines,
compliance policies, antivirus)
2. Settings Catalog / Configuration profiles (evaluated by assignment
priority)
3. Administrative Templates (ADMX-backed GPO equivalents)
4. Device Restrictions templates (lowest priority)
If two policies at the same level conflict on the same setting, Intune marks the
setting as "Conflict" and neither value applies — the device retains whatever
value was previously set (or the Windows default). Conflicts surface in Intune >
Devices > [device] > Device configuration.
Modern Endpoint Operations
343

5.1.3 Reading Device Status
5.1.3.1 Key Status Indicators in Intune
Navigate to Intune > Devices > Windows > All devices and select a device to view
its status summary.
Field What It Tells You
Compliance state Whether the device meets your
compliance policies. Non-compliant
devices are typically blocked by
Conditional Access.
Last check-in When the device last communicated with
Intune. Devices not seen in 30+ days may
be stale or off-network.
Enrollment type How the device was enrolled (Autopilot,
manual, bulk token, etc.)
Managed by Should read "Intune" for fully managed
devices. "MDM/WIP" indicates app-only
MAM enrollment.
Ownership Corporate or Personal. Corporate
designation is required if enrollment
restrictions block personal devices.
5.1.3.2 On-Device Verification
dsregcmd /status
Key fields to check:
Field Expected Value If Wrong
AzureAdJoined YES Device is not Entra joined
— check join type
DomainJoined NO (cloud-only) or YES
(Hybrid)
Mismatch indicates
misconfiguration
Securing Microsoft 365 in GCC High | 2026.04.30
344

Field Expected Value If Wrong
MDMUrl .microsoft.us(GCC
High) or .microsoft.com
(Commercial)
Enrolling to wrong cloud
MDMEnrolled YES Check MDM User Scope
in Entra
AzureAdPrt YES User has a valid cloud
token — required for SSO
and CA
5.1.4 Windows Update Rings Overview
Update rings control when Windows quality and feature updates are offered to
devices. Each ring defines three key settings that together determine exactly when a
device will force-reboot to apply an update.
Setting What It Controls
Deferral period How many days after Microsoft publishes
an update before the device is even
allowed to see it. Use this to let early
adopters or Microsoft's own fleet validate
the update before it reaches your users.
Deadline How many days after the device first
discovers the update before the reboot
becomes mandatory. Users can postpone
within this window.
Grace period A minimum buffer (in days) given to the
user after the install reaches "Pending
Restart" state, even if the deadline has
already passed. Prevents a forced reboot
from happening mid-meeting when a
device was offline during the deadline
window.
The diagram below shows how these three settings interact from the moment
Microsoft publishes an update to the mandatory forced reboot:
Modern Endpoint Operations
345

RECOMMENDED RING SETTINGS
A two-ring model works well for most organizations: a Pilot ring (0-day
deferral, 2-day deadline, 1-day grace) for IT staff, and a Production ring
(7-day deferral, 5-day deadline, 2-day grace) for all users. This gives you a
one-week window to catch problematic updates before they reach the full
fleet without leaving devices unpatched for extended periods.
5.2 Device Lifecycle & Onboarding
This page covers the full arc of a managed device — from first enrollment through
Securing Microsoft 365 in GCC High | 2026.04.30
346

re-assignment to final decommission. For new device provisioning via Windows
Autopilot, see Provisioning with Windows Autopilot. This page covers the
scenarios that Autopilot doesn't handle on its own.
5.2.1 Enrollment Methods
5.2.1.1 Windows Autopilot (Primary)
The recommended path for new corporate hardware. See Provisioning with
Windows Autopilot.
5.2.1.2 Windows Enrollment Assistant
For a single device that needs enrollment without a full OOBE reset — typically an
existing machine being added to management mid-lifecycle.
1. Download the Windows Enrollment Assistant from Intune > Devices >
Windows > Windows enrollment > Enrollment assistant
2. Run the installer on the device as a local administrator
3. Sign in with the user's Entra ID credentials when prompted
4. The device enrolls in Intune as a managed device without requiring a wipe
or re-image
WHEN TO USE THIS VS. AUTOPILOT
Use the Enrollment Assistant for isolated cases: a device missed during a
rollout, a contractor machine being brought under management, or an
executive's machine where a full wipe is not practical. For any bulk
scenario, use Autopilot or bulk enrollment tokens instead.
5.2.1.3 Bulk Enrollment Token (Provisioning Package)
For enrolling multiple devices without user interaction — useful for shared devices,
kiosks, or lab machines that are not candidates for Autopilot (e.g., older hardware
pre-dating Autopilot support).
1. In Windows Configuration Designer (available from the Microsoft Store),
create a new Provision desktop devices project
Device Lifecycle & Onboarding
347

2. Under Account Management, set:
◦ Enroll in Azure AD: Yes
◦ Bulk token expiry: Set to the maximum (180 days) — tokens
expire and must be renewed
3. Export the provisioning package (.ppkgfile)
4. Apply the package at OOBE (place on USB and connect during setup) or
silently via:
Add-ProvisioningPackage -PackagePath "C:\Packages\BulkEnroll.ppkg" -Fo
rceInstall
BULK TOKEN SCOPE
Devices enrolled via bulk token are enrolled under the token's service
account — they appear as Corporate but are not user-affiliated until a user
signs in. Ensure your Conditional Access policies account for device-only
enrollment scenarios.
5.2.1.4 BYOD / Personal Device Enrollment (MAM)
For personal devices accessing organizational resources, the recommended posture
is Mobile Application Management (MAM) without enrollment — the device
itself is never managed, only the apps and data within them.
• Configure App Protection Policies in Intune targeting the user group
• Users install the Microsoft Authenticator and Company Portal apps
• When they open a managed app (Outlook, Teams, Edge), they are
prompted to register and apply the protection policy
• No MDM profile is installed — IT cannot wipe the device, only corporate
app data
BLOCK FULL MDM ENROLLMENT FOR PERSONAL DEVICES
Ensure your enrollment restrictions block Personally Owned device
enrollment so users cannot accidentally (or intentionally) enroll personal
devices under full MDM management.
Securing Microsoft 365 in GCC High | 2026.04.30
348

5.2.2 Device Re-Assignment
When a device is transferred from one user to another without a factory reset,
residual user data and profile configuration from the previous owner remain on the
device. The cleanest procedure depends on whether the device was provisioned via
Autopilot.
5.2.2.1 Re-Assignment via Autopilot Reset (Recommended)
Autopilot Reset wipes the user's data and profile, re-runs the ESP, and re-presents
the device at the login screen — without removing it from Intune or Autopilot
registration.
From the Intune portal (remote):
1. Navigate to Intune > Devices > Windows > All devices > [device]
2. Select Autopilot Reset
3. The device reboots into a clean OOBE-like state, re-applies all policies, and
presents the login screen to the new user
From the device (local, admin required):
• Hold Shift and select Restart, then navigate to Troubleshoot > Reset this
Device Lifecycle & Onboarding
349

PC > Remove everything > Cloud download
AUTOPILOT RESET VS. FRESH START VS. WIPE
Action Removes
User Data
Removes
Intune
Enrollment
Removes
Autopilot
Registratio
n
Reinstalls
Windows
Autopilot
Reset
Yes No No No
Fresh Start Yes No No Yes (clean
Windows)
Wipe
(Intune)
Yes Yes No Yes
Full Retire +
Delete
Yes Yes Yes Manual
Use Autopilot Reset for re-assignment. Use Wipe only when
decommissioning.
5.2.2.2 Re-Assignment without Autopilot Reset
If a quick hand-off is required without a full reset:
1. Have the previous user sign out and remove their account from Settings >
Accounts > Other users
2. The new user signs in — Windows creates a new local profile from their
Entra ID credentials
3. Their user-targeted Intune policies (apps, certificates, user config) apply on
first sign-in
This is acceptable for a temporary transfer. For permanent re-assignment, an
Autopilot Reset is preferred to ensure a clean state.
Securing Microsoft 365 in GCC High | 2026.04.30
350

5.2.3 Device Retirement
Before re-provisioning, transferring to a non-managed party, or physically
disposing of a device, remove all management records in this order. Order matters
— see the warning below.
5.2.3.1 Step 1: Store the BitLocker Recovery Key
Retrieve and securely store the recovery key before any wipe or reset action
removes access.
• Navigate to Intune > Devices > [device] > Recovery keys
• Copy the recovery key and store it in your key management system
5.2.3.2 Step 2: Retire the Device in Intune
• Navigate to Intune > Devices > Windows > All devices > [device] >
Retire
• This removes the Intune MDM enrollment and wipes corporate data
(including certificates and managed app data)
• The device must check in for the Retire action to complete — allow ~2–5
minutes, or have the user open the Company Portal app to force a sync
5.2.3.3 Step 3: Factory Reset the Device
Wipe the device so no organizational data or configuration remains.
From Intune (remote wipe):
• Intune > Devices > [device] > Wipe — select Wipe device and continue
even if device loses power for devices being physically disposed of
On-device:
• Settings > System > Recovery > Reset this PC > Remove everything >
Local reinstall
• Or: reboot into manufacturer recovery (e.g., F11) and select factory reset
5.2.3.4 Step 4: Disable the Device in Entra ID
Disabling the device prevents any further authentication attempts using the device's
credentials while you complete cleanup.
Device Lifecycle & Onboarding
351

• Navigate to Entra > Devices > All devices > [device] > Disable
5.2.3.5 Step 5: Delete from Autopilot (Autopilot-registered devices
only)
SKIP THIS STEP IF THE DEVICE WAS NOT REGISTERED IN
AUTOPILOT
For devices enrolled via bulk token, Enrollment Assistant, or manual
enrollment, skip to Step 6.
• Navigate to Intune > Devices > Windows > Windows enrollment >
Windows Autopilot > Devices
• Find the device by serial number:
Get-CimInstance win32_bios | Select-Object SerialNumber
• Select the device record and clickDelete
5.2.3.6 Step 6: Delete the Device from Entra ID
• Navigate to Entra > Devices > All devices > [device] > Delete
ORDER MATTERS — DO NOT SKIP STEPS OR REORDER
• Do not delete from Entra before retiring from Intune — this
leaves orphaned MDM enrollment records
• Delete from Autopilot before Entra — if the Autopilot record
exists when you delete from Entra, the Autopilot sync will recreate
the Entra device object within 24 hours
• Store the BitLocker key first — once you wipe the device, the
key escrow in Intune is your only recovery option
Securing Microsoft 365 in GCC High | 2026.04.30
352

AT-SCALE STALE DEVICE CLEANUP
The steps above cover retiring an individual device. For identifying and
removing stale or duplicate device objects across the tenant — including
the correct cleanup order for Hybrid Joined devices and a PowerShell script
that automates discovery — see Entra Device Hygiene — Stale and
Duplicate Object Cleanup.
5.2.4 Device Inventory and Naming Standards
5.2.4.1 Viewing Enrolled Devices
Navigate to Intune > Devices > Windows > All devices to see all enrolled
Windows devices. Key filters:
Filter Use Case
Last check-in > 30 days Identify stale devices that may have left
the organization or been wiped outside
Intune
Compliance = Non-compliant Devices blocked by Conditional Access —
investigate and remediate
Ownership = Personal Verify no personal devices slipped past
enrollment restrictions
Enrollment type = Autopilot Confirm Autopilot-provisioned devices vs.
manually enrolled
5.2.4.2 Exporting the Device Inventory
For compliance audit evidence or asset management:
Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"
Get-MgDeviceManagementManagedDevice -All | Select-Object DeviceName, SerialNu
mber, EnrolledDateTime, LastSyncDateTime, ComplianceState, OwnerType | Expor
t-Csv -Path ".\IntuneDeviceInventory.csv" -NoTypeInformation
Device Lifecycle & Onboarding
353

5.2.4.3 Naming Standards
Device names set during Autopilot provisioning (via the naming template in the
Deployment Profile) should follow a consistent convention that enables filtering
and identification without querying Intune:
Component Example Purpose
Department code ENG, FIN, OPS Identifies the owning
department
Location code CHQ(City Hall), LAB Identifies physical location
for shared devices
Identifier %SERIAL%or %RAND:5% Unique per-device
identifier
Example: CHQ-ENG-5CG1234ABC— City Hall, Engineering, serial number.
See Group Tags and Device Naming in the Autopilot guide for the naming
template syntax.
5.3 Mobile Device Management & App
Protection
WHERE WINDOWS ENDPOINT HARDENING LIVES
This chapter covers iOS and Android device management. For Windows
endpoint configuration via the Open Intune Baseline (OIB) — settings
catalog policies, compliance policies, the IntuneManagement tool import
flow, the CMMC Control Mapping Matrix, USB device control, update
rings, and Wi-Fi configuration — see Open Intune Baseline Deployment.
5.3.1 Mobile Enrollment and App Protection
Mobile security in Intune spans two distinct architectural models: Mobile Device
Management (MDM), where Intune controls the entire device; and Mobile
Securing Microsoft 365 in GCC High | 2026.04.30
354

Application Management (MAM) — also called App Protection Policies (APP)
— where Intune controls only the data inside specific managed apps, leaving the
rest of the device untouched. The right model depends on whether the device is
corporate-owned or personally owned (BYOD), and — on Android — how strong a
separation between work and personal data is required.
The three postures most organizations land on:
Posture Device Ownership What Intune Controls
Corporate MDM Corporate-owned Entire device —
enrollment, configuration,
apps, wipe
BYOD MAM (App
Protection)
Personally owned Data inside managed apps
only; device untouched
BYOD Work Profile
(Android)
Personally owned A managed work container
alongside the user's
personal space
5.3.1.1 The Role of the Company Portal and Broker Apps
The single most commonly misunderstood part of Intune mobile is which app
delivers policy to the device for each scenario. The Intune Company Portal is
required in some scenarios, not required in others, and sometimes required installed
but not signed in. Android and iOS behave differently, and corporate and BYOD
behave differently within each platform.
Scenario Broker / Required App Company Portal?
iOS Corporate (Apple
ADE)
— No — optional for end-user
self-service only
Android Corporate (Fully
Managed)
Microsoft Intune app
(DPC)
No — Company Portal is
not used
iOS BYOD (MAM / App
Protection)
Microsoft Authenticator No
Android BYOD (MAM /
App Protection)
Intune Company Portal Yes — installed, not
signed in, not enrolled
Android BYOD (Work Intune Company Portal Yes — drives the Work
Mobile Device Management & App Protection
355

Scenario Broker / Required App Company Portal?
Profile) Profile enrollment
Two points worth internalizing:
• On Android Fully Managed, the Device Policy Controller is the
Microsoft Intune app, not Company Portal. This is the single biggest
source of confusion in Android corporate enrollment — documentation and
end-user instructions frequently reference "Company Portal" by reflex
when Intune is the actual requirement.
• On Android BYOD MAM, Company Portal must be present on the device
as the broker that the Intune App SDK inside each managed app uses to
fetch policy. The user does not sign into it, does not enroll, and does not
interact with it after install. It just has to exist. Without it, App Protection
policies will not apply to Outlook, Teams, and other managed apps.
5.3.1.2 Corporate MDM Enrollment
Corporate-owned devices enroll into full MDM. Intune controls the entire device,
provisions configuration and apps, and can wipe the device entirely.
iOS / iPadOS — Apple Automated Device Enrollment (ADE)
Prerequisites:
• Apple Business Manager (ABM) tenant
• ABM linked to Intune via an MDM server token
• Devices purchased through an ABM-registered reseller (or Apple direct) so
they appear in ABM automatically
Enrollment flow:
1. Device is unboxed and powered on.
2. During Apple Setup Assistant, the device contacts Apple and is handed to
Intune.
3. Intune applies the ADE enrollment profile — supervised mode, non-
removable MDM, and any Setup Assistant panes configured to skip.
4. User signs in with their Entra ID work account; device is registered to that
user.
Company Portal is not required for enrollment. It can optionally be pushed as a
Securing Microsoft 365 in GCC High | 2026.04.30
356

required app so users can reset their passcode, view compliance state, or initiate
remote actions on their own device.
For legacy inventory not registered in ABM, Apple Configurator enrollment
(tethered to a Mac) wipes and enrolls the device into supervised MDM. Useful for
one-time migration of an existing fleet.
Android — Android Enterprise Fully Managed (COBO)
Android Fully Managed creates a corporate-only device with no personal profile or
personal space. Intune controls everything.
Enrollment methods:
Method When to Use
QR code Small-scale rollouts — QR is generated by
the Intune Fully Managed enrollment
profile and scanned during device OOBE
Google Zero-Touch Enrollment Large-scale rollouts on supported OEMs
(Pixel and most major brands) — devices
assigned in the Zero-Touch portal auto-
enroll on first boot
Samsung Knox Mobile Enrollment (KME) Samsung-specific equivalent to Zero-
Touch — assigned via the Knox portal
afw#setuptoken Manual text entry during OOBE — useful
for one-offs, not scale
The Microsoft Intune app is the DPC (Device Policy Controller) on Fully
Managed Android. Company Portal is not used on this platform.
5.3.1.3 BYOD App Protection (MAM)
App Protection Policies protect corporate data inside managed apps — Outlook,
Teams, OneDrive, Edge, Word, Excel, PowerPoint, and any line-of-business app
that integrates with the Intune App SDK. Policies target the user identity, not the
device. The device is never enrolled into MDM.
Typical protections:
• Require PIN or biometric to open managed apps
Mobile Device Management & App Protection
357

• Block copy/paste, Save As, and data transfer to unmanaged apps
• Block save-to-personal-cloud
• Enforce app-level encryption
• Selective wipe of corporate data only — personal data is never touched
iOS BYOD (MAM)
• Enrollment: none
• Broker: Microsoft Authenticator
• Company Portal: not required
User experience: the user installs Outlook (and Teams, OneDrive, etc.) from the
App Store, signs in with their work account, and APP policy applies automatically
on first launch. Most users already have Authenticator installed for MFA, so no
additional setup is typically needed.
Android BYOD (MAM)
• Enrollment: none
• Broker: Intune Company Portal
• Company Portal: required — installed on the device, but the user does
not sign in and the device is not enrolled
User experience: the user installs Company Portal from Google Play (no sign-in),
installs Outlook (and Teams, OneDrive, etc.), then signs into the managed apps
with their work account. APP policy applies automatically. The Intune App SDK
inside each managed app uses Company Portal as the broker to fetch policy from
Intune.
This is the exact opposite of iOS: on iOS the broker is Authenticator; on Android
the broker is Company Portal.
5.3.1.4 Android BYOD Work Profile (MDM with Container)
Work Profile is the middle path between MAM-only BYOD and Fully Managed
corporate. It creates a managed work container alongside the user's personal space.
Work apps, data, and email live inside the container; personal data is never touched.
• Enrollment: Work Profile enrollment driven by Company Portal
• Company Portal: required — user signs in to provision the work container
• Intune control scope: only the work container — Intune can wipe the
container without affecting personal data
Securing Microsoft 365 in GCC High | 2026.04.30
358

Work Profile is the right choice when MAM alone is considered insufficient — for
regulated data, when device-level compliance conditions are needed in Conditional
Access, or when the organization wants a stronger separation than app-level
controls provide.
5.3.1.5 Choosing MAM vs. Work Profile on Android
Consideration MAM (App Protection
Only) Work Profile
User friction Minimal — install
Company Portal, install
apps, sign in
Moderate — Work Profile
provisioning takes several
minutes
Separation strength App-level (data inside
managed apps)
Container-level (fully
isolated work space)
Device-level compliance
signals
Not available — no device
enrollment
Available — Work Profile
reports device compliance
to CA
Support for unenrolled-
device-blocking CA
policies
Not applicable — device is
not a CA subject
Yes — device compliance
can gate access
Appropriate for regulated
data (CUI, ePHI, PCI)
Marginal — depends on
regulatory interpretation
Preferred
Remote wipe scope App data only (selective
wipe)
Work container only
(personal data preserved)
The general rule: start with MAM for most BYOD scenarios. Escalate to Work
Profile when the data classification, regulatory exposure, or Conditional Access
posture require device-level compliance signals.
5.3.1.6 End-User Communication Templates
Clear platform-specific guidance reduces help desk load. The single biggest source
of support tickets in BYOD rollouts is users on Android not installing Company
Portal, or users on iOS installing Company Portal unnecessarily.
iOS BYOD users:
To access company email and files on your personal iPhone or iPad:
Mobile Device Management & App Protection
359

1. Install Microsoft Authenticator from the App Store (you may
already have this for MFA).
2. Install Microsoft Outlook (and Teams, OneDrive as needed)
from the App Store.
3. Sign in with your work account. You may be asked to set an app
PIN.
You do not need to enroll your device or install the Company Portal app.
Android BYOD users:
To access company email and files on your personal Android device:
1. Install the Intune Company Portal app from Google Play. Do
not sign in or enroll the device — just leave it installed.
2. Install Microsoft Outlook (and Teams, OneDrive as needed)
from Google Play.
3. Sign into Outlook with your work account. You may be asked to
set an app PIN.
Your personal data and apps remain untouched — the company can only
manage data inside the work apps.
5.3.1.7 Play Integrity on Android App Protection
Android App Protection policies can evaluate Google Play Integrity verdicts to
detect rooted, emulated, or otherwise tampered devices and block access
accordingly. The underlying Graph schema settings still carry the legacy
"SafetyNet" prefix (requiredAndroidSafetyNetDeviceAttestationType, requ
iredAndroidSafetyNetAppsVerificationType), but Google retired SafetyNet
Attestation and Intune now evaluates verdicts via the Play Integrity API.
Google's Strong Integrity verdict definition is currently enforced. App Protection
policies left at nonefor device attestation accept any device — including rooted
ones — without challenge. Recommended baseline: enable at least basic integrity
for device attestation; consider basic & device integrity for higher-sensitivity data.
5.4 Open Intune Baseline Deployment
To achieve a defensible, conflict-free Intune configuration we use the Open Intune
Baseline (OIB) as a robust, granular configuration starting point. We then tailor
this baseline for the target environment and applicable compliance controls.
Securing Microsoft 365 in GCC High | 2026.04.30
360

This approach satisfies requirements for a baseline Intune deployment while
ensuring long-term operational stability and auditability.
ARCHITECTURAL DECISION
For the reasoning behind replacing generic Microsoft Security Baselines
with community-vetted, granular OIB JSON imports, refer to Chapter 9:
Foundational Architecture and Design.
OIB aggregates best practices into a unified set of granular JSON files deployable
using the IntuneManagement tool by Mikael Karlsson. The procedure below walks
through downloading both tools, connecting to your tenant, importing the policies,
and preparing them for assignment.
Do not assign any imported policies to groups until you have reviewed and
applied the modifications documented in the sections below.
5.4.1 Layered Deployment Strategy
OIB ships ~59 Settings Catalog policies plus 4 Compliance policies because it's an
opinionated comprehensive baseline. For CMMC Level 2 specifically, only ~21 of
these are strictly mandatory — the remainder are defense-in-depth hardening or
situational policies that may not apply to a given environment. This guide structures
the OIB deployment in three layers so a CMMC L2 engagement can deliver the
audit-defensible minimum without scope-creeping into discretionary hardening.
5.4.1.1 Layer 1 — CMMC-Mandatory Baseline (21 policies)
Every CMMC L2 environment needs these. Each policy maps to a specific NIST
SP 800-171 Rev. 2 control; absence of any is a finding during a C3PAO
assessment. The policies below correspond directly to the CMMC Control Mapping
Matrix further in this chapter.
The 21 policies are presented in two tables matching the Intune admin center's
blade layout: Configuration (Endpoint Security and Settings Catalog policies
surfaced under Devices → Configuration) and Compliance (the four OIB
Compliance policies under Devices → Compliance). Each table is alphabetical by
full policy name to match the portal's sort order, so a reader scanning their tenant
Open Intune Baseline Deployment
361

can find the corresponding row at the same alphabetic position.
PHISHING-RESISTANT MFA IMPLEMENTATION CHOICE
The list below uses Win - OIB - ES - Windows Hello for Business
- D - WHfB Configurationas the Layer 1 implementation of CMMC
3.5.3 (multi-factor authentication). WHfB is the recommended Microsoft-
stack default and the path of least resistance for a Windows fleet, but 3.5.3
itself is implementation-agnostic — FIDO2 security keys or PIV+CBA
smart cards satisfy the same control. If your environment has an existing
investment in one of those alternatives, replace the WHfB policy with the
appropriate Intune profile (FIDO2 security key sign-in policy, or
certificate-based authentication policy). The Conditional Access policies in
Chapter 14 enforce phishing-resistant MFA at the network-access layer
regardless of which Windows-side method is deployed.
Configuration policies (17)
Endpoint Security and Settings Catalog policies. Both surface under Devices →
Configuration in the Intune admin center.
Policy NIST 800-171 control Source
Win - Custom - ES - D
efender for Endpoint
Onboarding
3.14.3 (alert monitoring) Manual (tenant-specific
onboarding blob)
Win - Custom - ES - D
evice Control / Remov
able Media
3.8.7 (removable media
control)
Manual (Reusable Settings
+ Device Control profile)
Win - Custom - ES - E
xploit Protection
3.14.1 (flaw remediation) Manual (Settings Catalog
— Exploit Guard category)
Win - OIB - ES - Atta
ck Surface Reduction
- D - ASR Rules (L2)
3.4.6 (least functionality) OIB Settings Catalog
Win - OIB - ES - Defe
nder Antivirus - D -
AV Configuration
3.14.2 (malicious code
protection)
OIB Settings Catalog
Securing Microsoft 365 in GCC High | 2026.04.30
362

Policy NIST 800-171 control Source
Win - OIB - ES - Defe
nder Antivirus - D -
Security Experience
3.4.5 (Tamper Protection
— restrict nonessential
programs)
OIB Settings Catalog
Win - OIB - ES - Encr
yption - D - BitLocke
r (OS Disk)
3.13.11 / 3.8.6
(cryptographic protection
of CUI)
OIB Settings Catalog
Win - OIB - ES - Loca
l Group Membership -
D - Local Administrat
ors
3.1.5 (least privilege) OIB Settings Catalog
Win - OIB - ES - Wind
ows Firewall - D - Fi
rewall Configuration
3.13.1 (boundary
protection)
OIB Settings Catalog
Win - OIB - ES - Wind
ows Hello for Busines
s - D - WHfB Configur
ation
3.5.3 (multi-factor
authentication)
OIB Settings Catalog
Win - OIB - ES - Wind
ows LAPS - D - LAPS C
onfiguration
3.1.5 (least privilege) OIB Settings Catalog
Win - OIB - SC - Devi
ce Security - D - Aud
it and Event Logging
3.3.1 / 3.3.2 (audit events) OIB Settings Catalog
Win - OIB - SC - Devi
ce Security - D - Loc
al Security Policies
3.1.9 (banner) + general
security hardening
OIB Settings Catalog
Win - OIB - SC - Devi
ce Security - D - Log
in and Lock Screen
3.1.10 (session lock) OIB Settings Catalog
Win - OIB - SC - Devi
ce Security - U - Pow
er and Device Lock
3.1.10 (session lock) OIB Settings Catalog
Win - OIB - SC - Wind
ows Hello for Busines
s - D - Cloud Kerbero
3.5.3 (multi-factor
authentication — hybrid
SSO trust to on-prem AD;
OIB Settings Catalog
Open Intune Baseline Deployment
363

Policy NIST 800-171 control Source
s Trust skip if cloud-only)
Win - OIB - SC - Wind
ows Update for Busine
ss - D - Reports and
Telemetry
3.1.3 (control flow of CUI
— restrict telemetry)
OIB Settings Catalog
Compliance policies (4)
User-scoped device compliance policies under Devices → Compliance. These act
as the signal Conditional Access uses to gate access to protected resources.
Policy NIST 800-171 control Source
Win - OIB - Complianc
e - U - Defender for
Endpoint
3.14.3 (alert monitoring) OIB Compliance
Win - OIB - Complianc
e - U - Device Health
3.13.11 / 3.8.6
(cryptographic protection)
OIB Compliance
Win - OIB - Complianc
e - U - Device Securi
ty
3.13.1 + 3.14.2 (boundary
protection, malicious code)
OIB Compliance
Win - OIB - Complianc
e - U - Password
3.5.7 / 3.5.8 (password
complexity, reuse)
OIB Compliance
Total: 21 policies — 17 Configuration (14 OIB Settings Catalog imports + 3
manual creations) and 4 Compliance (OIB Compliance imports). This is the
Securing Microsoft 365 in GCC High | 2026.04.30
364

consultant-deliverable for a CMMC L2 baseline engagement.
OPTIONAL ADVANCED POSTURE — (24H2+) LAPS + LSP, DEPLOYED
AS A MATCHED PAIR
The Layer 1 default above manages the built-in Administratoraccount
on every device. For uniform Windows 11 24H2+ fleets that want a
stronger posture, OIB ships a coupled pair of (24H2+) variants:
• Win - OIB - ES - Windows LAPS - D - LAPS Configuratio
n (24H2+)uses the Automatic Account Management feature
(introduced in Windows 11 24H2) to create and manage a custom
local administrator account on each device.
• Win - OIB - SC - Device Security - D - Local Security
Policies (24H2+)correspondingly disables the built-in Adminis
trator, since LAPS has provisioned a replacement that's
password-rotated and Entra-backed.
Treat the two as a matched pair. Do not deploy LSP (24H2+) without also
deploying LAPS (24H2+) on the same device — disabling the built-in
Administrator without a LAPS-managed replacement leaves the device
with no local admin account for emergency recovery. Recovery from that
state requires WinRE console or re-enabling the account through a separate
Intune policy after the fact.
For mixed fleets (some pre-24H2 devices), assign each (24H2+) policy
with osVersion >= 10.0.26100and let the Layer 1 default cover the
older endpoints. See Appendix B § Windows LAPS (24H2+) and Appendix
B § Local Security Policies (24H2+) for the full settings.
5.4.1.2 Layer 2 — Defense-in-Depth (33 policies, follow-on)
Recommended hardening above CMMC minimums but not required for assessment
pass. Suitable as a follow-on engagement after the Layer 1 baseline operates
cleanly:
• Microsoft Edge family (5 policies, D + U scopes) — security, updates,
extensions, password management, profiles/sign-in/sync
• Microsoft Office family (4 policies) — D-scope security and updates; U-
scope config and security
• OneDrive (2) — D-scope and U-scope tenant-only sync configuration
Open Intune Baseline Deployment
365

• Defender Antivirus Update Rings (3) — Pilot/UAT/Production rollout
management for AV signatures (operational risk management; default
Defender automatic update satisfies CMMC 3.14.4 without these rings)
• Device Security hardening (~11) — Administrator Protection, Config
Refresh, Enhanced Phishing Protection, Printing, Remote Desktop Services
and RPC, Script File Associations, Security Hardening, Timezone, User
Rights, Windows Package Manager, Device Guard / Credential Guard /
HVCI
• Microsoft Accounts, Microsoft Store - D — corporate identity and app
store surface controls
• Credential Management Passwordless, Windows Apps In-Box
Removal, Defender AV Additional Configuration — modern auth,
attack-surface reduction, AV layer extras
• Delivery Optimisation, Feature Configuration, Settings Sync —
Windows Update and modern Windows experience tuning
5.4.1.3 Layer 3 — Situational / Opt-In (13 policies)
Deploy only if the underlying feature is in scope:
Policy Skip if...
Win - OIB - SC - Internet Explore
r (Legacy) - D - Security
You don't have IE-mode site requirements
Win - OIB - SC - Device Security
- D - Windows Subsystem for Linux
WSL is not allowed
Win - OIB - SC - Device Security
- U - Windows Sandbox
Sandbox is not allowed
Win - OIB - ES - Encryption - U -
Personal Data Encryption
BitLocker alone meets your encryption
posture
Win - OIB - ES - Attack Surface R
eduction - D - ASR Rules (Audit M
ode)
Past initial validation phase (this replaces
Layer 1's ASR L2 temporarily, doesn't add
to it)
Win - OIB - SC - Device Security
- D - Location and Privacy
You're already managing this elsewhere
Win - OIB - SC - Device Security
- U - Windows Spotlight and Org M
essages
Spotlight is already disabled by other
means
Securing Microsoft 365 in GCC High | 2026.04.30
366

Policy Skip if...
Win - OIB - SC - Microsoft Edge -
U - User Experience
Browser cosmetics aren't in scope
Win - OIB - SC - Microsoft Store
- U - Configuration
Users have no Store access
Win - OIB - SC - Windows User Exp
erience - U - Copilot
Copilot is not in use
5.4.1.4 Recommended deployment
For a CMMC L2 baseline engagement: deploy Layer 1 only (21 policies; 20 if
your tenant is cloud-only and skips Cloud Kerberos Trust). The remaining OIB
policies are out of scope for CMMC and can be addressed in a follow-on
engagement or as client-led projects after the baseline is validated.
For a comprehensive defense-in-depth deployment: deploy Layer 1 + Layer 2
(~53 policies), then evaluate Layer 3 per environment.
Both approaches use the same import procedure below — the difference is which
JSON files you select in the Bulk Import dialog at Step 5. For a Layer 1–only
deployment, copy the Layer 1 OIB JSON filenames listed above into a separate
folder and point the Bulk Import dialog at that folder; the OIB Compliance imports
come from the CompliancePoliciessubfolder of the OIB ZIP, the manual
Open Intune Baseline Deployment
367

creations are authored separately per their appendix sections.
EXTRACT TO A SHORT, LOCAL PATH
Do not extract to your Downloads folder or any OneDrive-synced location.
The Downloads folder creates problems:
• Long paths. OIB JSON filenames are verbose. Combined with a
user profile path like C:\Users\Michael.LastName\Downloads\
OpenIntuneBaseline-main\DeviceConfiguration\..., the
total path easily exceeds the Windows 260-character limit. The tool
silently skips files it cannot open.
• OneDrive Known Folder Move. Many enterprise builds redirect
Downloads to OneDrive. Files appear local but may be cloud-only
placeholders (Files On-Demand) that the tool cannot read.
• Browser download protection. Edge and Chrome apply Mark of
the Web (MOTW) restrictions to downloaded ZIPs. Unblock the
ZIP itself before extracting — otherwise the extracted files inherit
the block flag.
Use a short, local path outside your user profile: C:\IT_Tools\is
recommended.
5.4.2 Step 1 — Download the IntuneManagement
tool
The IntuneManagement tool is a collection of graphical PowerShell scripts rather
than a traditional .exeinstaller.
1. Go to the Micke-K/IntuneManagement GitHub repository. Click the green
Code button → Download ZIP.
2. Unblock the ZIP before extracting. Right-click the downloaded ZIP →
Properties → check Unblock → OK. This prevents the block flag from
propagating to every extracted file.
3. Extract the ZIP and move the inner IntuneManagement-masterfolder to
C:\IT_Tools\IntuneManagement.
4. Verify the scripts are unblocked. Open PowerShell as Administrator and
Securing Microsoft 365 in GCC High | 2026.04.30
368

run:
Get-ChildItem -Path "C:\IT_Tools\IntuneManagement" -Recurse
| Unblock-File
5.4.3 Step 2 — Download the OIB JSON files
1. Go to the Open Intune Baseline GitHub repository. Click the green Code
button → Download ZIP.
2. Unblock the ZIP before extracting (same as Step 1 — right-click →
Properties → Unblock).
3. Extract the ZIP to C:\IT_Tools\OpenIntuneBaseline.
4. Navigate into the extracted folder. GitHub ZIPs create a wrapper folder
(e.g., OpenIntuneBaseline-maininside OpenIntuneBaseline). Open
that inner folder and confirm you can see the policy subfolders as
immediate children:
◦ DeviceConfiguration— Settings Catalog profiles
◦ EndpointSecurity— Endpoint Security profiles (ASR,
BitLocker, Defender AV, Firewall, LAPS, WHfB)
◦ CompliancePolicies— (if present in the version you
downloaded)
WHICH VERSION?
The OIB folder and file names include a version number (e.g., v3.7). Note
this version — it appears in the policy names after import and helps you
track which baseline you deployed.
5.4.4 Step 3 — Launch the tool and configure for
your cloud
1. Navigate to the IntuneManagement folder and run Start_PS7.cmd
(PowerShell 7) or Start.cmd(PowerShell 5.1).
Open Intune Baseline Deployment
369

ENVIRONMENT: GCC HIGH
2. Before signing in, configure the tool for the sovereign cloud:
◦ Click File → Settings in the top left
◦ Under the MSAL section, check Show Azure AD login
menu
◦ Click Save
ENVIRONMENT: COMMERCIAL
No additional configuration needed — the tool defaults to the Commercial
cloud. Proceed to the next step.
5.4.5 Step 4 — Sign in and grant consent
ENVIRONMENT: GCC HIGH
1. Click the Profile icon (top right) to sign in. A pre-login window
appears — select Azure US Government.
2. Authenticate with a Global Administrator account. A Global
Administrator is required for the first sign-in because the consent step
below grants the IntuneManagement app Microsoft Graph API
permissions (read/write to Intune policies, device configurations, and
endpoint security profiles) on behalf of the organization.
ENVIRONMENT: COMMERCIAL
1. Click the Profile icon (top right) to sign in.
2. Authenticate with a Global Administrator account. A Global
Administrator is required for the first sign-in because the consent step
below grants the IntuneManagement app Microsoft Graph API
permissions (read/write to Intune policies, device configurations, and
Securing Microsoft 365 in GCC High | 2026.04.30
370

endpoint security profiles) on behalf of the organization.
3. After signing in, click the Profile icon again and select Request Consent.
An Entra ID consent prompt appears listing the Microsoft Graph
permissions the tool requires. Review the permissions and click Accept.
4. Close and relaunch the tool. The consent grant does not take effect until
the app acquires a new token. Relaunch the tool, sign in again (selecting
Azure US Government for GCC High), and confirm you can navigate the
Intune data in the left panel.
SUBSEQUENT SIGN-INS
After the initial consent, any account with Intune Administrator or
Global Administrator can sign in — the consent is granted to the app
registration, not the individual user. You do not need to repeat the consent
step unless the tool is updated with new permission requirements.
5.4.6 Step 5 — Import the OIB policies
IMPORT TERMINOLOGY
In the IntuneManagement tool, Import means "push JSON files into
Intune" (create policies in the tenant) and Export means "pull policies from
Intune and save as JSON files." The tool is a pass-through — JSON files go
directly to the Microsoft Graph API.
The tool has two import modes: Bulk → Import imports an entire folder
structure at once across all policy types. The per-section Import button in
the main window imports only the policy type you're currently viewing
(e.g., Antivirus only). For an OIB deployment, use Bulk → Import.
1. Click Bulk → Import from the top menu
2. Click Select Folder and browse to the inner folder that contains the policy
Open Intune Baseline Deployment
371

subfolders directly (e.g., C:\IT_Tools\OpenIntuneBaseline\OpenIntun
eBaseline-main). You should see DeviceConfiguration, EndpointSec
urity, etc. as immediate children of the folder you select. If you select the
outer wrapper folder, the tool will report no policies found.
3. The tool scans the folder recursively and displays all discovered JSON
policy files, grouped by type (Device Configuration, Endpoint Security,
etc.)
4. Select the policies for your deployment scope. For a CMMC L2 baseline
engagement, select only the Layer 1 JSON files. For a comprehensive
defense-in-depth deployment, select Layer 1 + Layer 2 (and Layer 3 entries
that apply to your environment). You can also import everything and
remove individual policies later, but a clean tenant policy list is easier to
maintain and easier for an assessor to review than a list of unassigned
policies.
5. Click Import to start the operation
6. The tool creates each policy in your Intune tenant via Microsoft Graph.
Securing Microsoft 365 in GCC High | 2026.04.30
372

Watch the progress log for errors.
Open Intune Baseline Deployment
373

COMMON IMPORT ISSUES
Symptom Cause Fix
"No policies found" or
empty import list
Selected the outer
wrapper folder instead
of the inner folder
containing DeviceConf
iguration, EndpointS
ecurity, etc.
Browse one level deeper
— select the OpenIntun
eBaseline-main
folder, not the parent
"No policies found"
(correct folder selected)
Files extracted to an
OneDrive-synced folder
and are cloud-only
placeholders (Files On-
Demand)
Re-extract to a local
path outside OneDrive
(e.g., C:\IT_Tools\)
"No policies found"
(correct folder, local
path)
Long file paths
exceeding 260
characters — the tool
silently skips files it
cannot open
Shorten the path.
Extract directly to C:\I
T_Tools\rather than a
deeply nested location
"No policies found"
(all above checked)
Blocked files. The ZIP
was not unblocked
before extraction, and
the block flag
propagated to all JSON
files
Run Get-ChildItem
-Path "C:\IT_Tools\
OpenIntuneBaseline"
-Recurse | Unblock-
File
"No policies found"
(all above checked)
IntuneManagement tool
version does not
recognize the OIB
folder structure or JSON
format
Download the latest
version of both the
IntuneManagement tool
and OIB
"Insufficient
privileges" error
Account lacks required
role or consent was not
granted
Ensure you completed
the consent step (Step 4)
and are signed in with
Global Admin or Intune
Admin
"Resource not found"
or "BadRequest" on a
OIB JSON references a
setting or template not
Skip that policy and
create it manually using
Securing Microsoft 365 in GCC High | 2026.04.30
374

Symptom Cause Fix
specific policy available in your
tenant's cloud or license
tier
the OIB JSON as a
reference
Duplicate policy
names
You ran the import
twice
Delete the duplicates
from Intune before re-
importing
MSAL / token errors
in GCC High
Sovereign cloud not
selected before sign-in
Close the tool, reopen,
verify Azure US
Government is set in
File → Settings →
MSAL, then sign in
again
Consent prompt does
not appear
Browser popup blocked
or consent already
granted
Check browser popup
settings; if consent was
previously granted, this
step is not needed again
5.4.7 Step 6 — Verify the import
1. Open the Microsoft Intune admin center (intune.microsoft.usfor
GCC High, intune.microsoft.comfor Commercial)
2. Navigate to Devices → Configuration and Endpoint Security — you
should see the OIB policies listed with names like Win - OIB - ES - At
tack Surface Reduction - D - ASR Rules (L2) - v3.7
3. Open several policies and confirm settings are populated (not empty)
4. Do not assign any policy to a group yet — first apply the environment-
specific modifications below
5.4.8 Step 7 — Apply environment-specific
modifications
After import, review each policy against the modifications documented in the
following sections before assigning to any device or user group:
• GCC High tenants: Apply the GCC High Critical Modifications
Open Intune Baseline Deployment
375

documented below under the GCC High tab (telemetry, cryptography,
identity routing)
• All tenants: Customize the settings in the CMMC Control Mapping
Matrix (GCC High tab) or NIST SP 800-171 Rev. 3 Control Mapping
(Commercial tab) — specifically banner text, lock screen timeout,
removable media policy, and the compliance policy
• Existing GPO environments: Cross-reference against your GPO gap
analysis to ensure high-value settings from the existing estate are preserved
5.4.9 Step 8 — Assign policies
Once modifications are complete:
1. Create a pilot device group (5–10 devices representing your hardware
diversity)
2. Assign all OIB policies to the pilot group
3. Monitor Devices → Monitor → Assignment failures and Configuration
→ Per-policy status for conflicts or errors
4. After 48 hours of clean pilot operation, expand assignment to broader
device groups in waves
DO NOT ASSIGN TO "ALL DEVICES" ON DAY ONE
OIB policies will overwrite existing Intune, GPO, and local security
settings. A phased rollout lets you catch conflicts (duplicate settings, policy
fights, app-breaking hardening) before they affect production users. If the
client has existing ad-hoc Intune policies, expect conflicts — the pilot
phase is where you identify and retire them.
ENVIRONMENT: GCC HIGH
5.4.10 GCC High Critical Modifications
OIB is designed for the Commercial cloud, we must apply the following
changes for GCC High and CMMC compliance.
Securing Microsoft 365 in GCC High | 2026.04.30
376

5.4.10.1 Telemetry & Reporting
OIB enables deep Windows diagnostic data and Defender telemetry which are
not supported in GCC High, leading to "Error" states in Intune profiles.
• Action: Edit the imported OIB EDR and Windows Data Collection
profiles. Set Expedite telemetry reporting frequency to Not
Configured. Ensure diagnostic data is limited to "Required" (Basic) to
prevent data spill risks.
5.4.10.2 Cryptography & FIPS Compliance
OIB establishes strong BitLocker defaults, but CMMC/DoD assessments
often scrutinize cryptographic modules strictly.
• Action: Verify the OIB Disk Encryption profile enforces XTS-AES
256-bit encryption. If your specific contract requires strict FIPS 140-2
validation, ensure the local security policy for "System cryptography:
Use FIPS compliant algorithms" is enabled (Note: test thoroughly as
it can break apps).
5.4.10.3 Identity Routing
OIB will provision standard Windows Hello for Business (WHfB) settings,
but it does not account for sovereign cloud routing.
• Action: Ensure the Entra ID Connect sync and Kerberos routing for
Cloud Trust point specifically to US Government endpoints (e.g., *.l
ogin.microsoftonline.us).
ENVIRONMENT: COMMERCIAL
No corresponding requirement for Commercial tenants.
Open Intune Baseline Deployment
377

ENVIRONMENT: GCC HIGH
5.4.11 CMMC Control Mapping Matrix
Here are the baseline profiles mapped to their corresponding NIST SP
800-171 controls for your System Security Plan (SSP). Note that some
controls utilize the Open Intune Baseline (OIB) JSON files, while others
require manual configuration or custom XML to meet strict compliance
requirements.
Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification NIST 800-171
Control
Audit
Method
Attack Surface
Reduction - D
Win - OIB
- ES - At
tack Surf
ace Reduc
tion - D
- ASR Rul
es (L2) -
v3.7
Ensure "Block Office apps
from creating child processes"
and "Block credential stealing"
set to Block.
3.1.1, 3.14.1
(Limit system
access; Flaw
remediation)
MDE
Advanced
Hunting KQL
(DeviceEven
ts); Intune
ASR Report.
Exploit
Protection
Win - Cus
tom - ES
- Exploit
Protectio
n
(manually
created —
Settings
Catalog
policy)
Verify DEP, ASLR (BottomUp
+ ForceRelocateImages),
SEHOP, and CFG enforced
system-wide and that Disallo
wExploitProtectionOverri
deis set.
3.14.1 (Identify
and correct
system flaws)
PowerShell G
et-ProcessM
itigation
-System;
Windows
Security app
shows
"managed by
your
organization."
Defender for
Endpoint
(EDR)
Win - Cus
tom - ES
- Defende
r for End
point Onb
oarding
(manually
created —
onboarding
blob is
tenant-
specific)
Verify Auto-onboard via
Intune Connector is active.
3.14.3 (Monitor
system security
alerts and
advisories)
MDE Device
Inventory;
Intune EDR
Onboarding
Status.
Defender
Antivirus (AV
Configuration)
Win - OIB
- ES - De
fender An
tivirus -
Verify Real-time protection:
On, Cloud-delivered
protection: High, scan
schedule, and any role-specific
3.14.2 (Provide
protection from
malicious code)
MDE
Antivirus
Report; Local
Get-MpPrefe
Securing Microsoft 365 in GCC High | 2026.04.30
378

Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification NIST 800-171
Control
Audit
Method
D - AV Co
nfigurati
on - v3.3
exclusions. rence.
Windows
Firewall
Win - OIB
- ES - Wi
ndows Fir
ewall - D
- Firewal
l Configu
ration -
v3.1
Verify all three profiles
(Domain, Private, Public) set to
Block inbound with
Outbound: Allow.
3.13.1
(Monitor,
control, and
protect
communications
at boundaries)
Intune
Firewall
Status
Report; Local
Get-NetFire
wallProfil
e.
BitLocker (OS
Disk)
Win - OIB
- ES - En
cryption
- D - Bit
Locker (O
S Disk) -
v3.7
Verify XTS-AES 256-bit
encryption is enforced for OS
and fixed drives.
Note: Windows may attempt to
independently enable
encryption.
3.13.11, 3.8.6
(FIPS 140-2
would require
additional
configuration
and testing;
Protect CUI on
mobile devices)
Intune
Encryption
Report; Local
manage-bde
-status.
Windows Hello
for Business -
D
Win - OIB
- ES - Wi
ndows Hel
lo for Bu
siness -
D - WHfB
Configura
tion - v
3.2
Win - OIB
- SC - Wi
ndows Hel
lo for Bu
siness -
D - Cloud
Kerberos
Trust - v
3.5
Verify Require TPM,
Minimum PIN: 6, and US
Gov routing URLs.
3.5.3 (Use
multifactor
authentication
for local and
network access)
Entra ID
Sign-in Logs
(Auth
Requirement:
MFA); Local
dsregcmd /s
tatus.
Windows
LAPS
Win - OIB
- ES - Wi
ndows LAP
S - D - L
APS Confi
guration
Configure Windows LAPS.
Enable backup to Entra ID,
enforce 14+ characters, set
rotation to 30 days, and
manage the built-in Administr
atoraccount. For uniform
Windows 11 24H2+ fleets that
want Automatic Account
Management and built-in Admi
3.1.1, 3.1.5
(Limit access;
Least privilege)
Entra ID
LAPS Audit
Logs; Intune
Device Local
Admin status.
Open Intune Baseline Deployment
379

Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification NIST 800-171
Control
Audit
Method
nistratordisable, see the
optional (24H2+) matched pair
under Layered Deployment
Strategy.
Local
Administrators
Win - OIB
- ES - Lo
cal Group
Membershi
p - D - L
ocal Admi
nistrator
s
Verify the policy is set to
Replace mode and the
Members list is restricted to Ad
ministrator(LAPS-
managed) plus your designated
Tier 1 break-glass account.
3.1.5 (Employ
the principle of
least privilege)
Intune Profile
Status; Local
Get-LocalGr
oupMember
-Group "Adm
inistrator
s".
Local Security Win - OIB
- SC - De
vice Secu
rity - D
- Local S
ecurity P
olicies
Edit profile to add Interactive
Logon Message Text and
Interactive Logon Message
Title. Replace with your
Banner Text. The Layer 1
default keeps the built-in Admi
nistratoraccount enabled.
For uniform Windows 11
24H2+ fleets that want it
disabled (with a LAPS-
managed custom admin
replacement), see the optional
(24H2+) matched pair under
Layered Deployment Strategy.
3.1.9 (Provide
privacy and
security notices)
Local
Registry: HKL
M\SOFTWAR
E\...\Polic
ies\System\
LegalNotice
Text.
Security
Experience
Win - OIB
- ES - De
fender An
tivirus -
D - Secur
ity Exper
ience - v
3.3
Ensure Hide Windows
Security Notification Area
and Enable Tamper
Protection are enforced.
3.4.5 (Restrict
nonessential
programs)
MDE
Security
Center
(Tamper
Protection
status).
Removable
Media
Win - Cus
tom - ES
- Device
Control /
Removable
Media
(manually
created —
keyed to
approved
hardware
IDs unique
to each
Verify the policy denies all
write access while allowing
approved hardware IDs.
3.8.1, 3.8.7
(Control
removable
media)
MDE
Advanced
Hunting KQL
(RemovableS
toragePolic
yTriggere
d).
Securing Microsoft 365 in GCC High | 2026.04.30
380

Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification NIST 800-171
Control
Audit
Method
tenant)
Login and
Lock Screen
Win - OIB
- SC - De
vice Secu
rity - U
- Power a
nd Device
Lock - v
3.6
Win - OIB
- SC - De
vice Secu
rity - D
- Login a
nd Lock S
creen - v
3.1
Adjust the OIB default to
ensure Max Inactivity Time
Device Lock is 15 Minutes
(900 seconds) or less.
3.1.10 (Session
lock)
Intune Profile
Status.
Reports and
Telemetry
Win - OIB
- SC - Wi
ndows Upd
ate for B
usiness -
D - Repor
ts and Te
lemetry -
v3.0
Set "Allow Telemetry" to
Basic/Security and completely
remove "Expedite telemetry
reporting frequency".
3.1.3 (Control
the flow of
CUI)
Intune Profile
Status.
Audit and
Event Logging
Win - OIB
- SC - De
vice Secu
rity - D
- Audit a
nd Event
Verify Object Access, Account
Logon, and Privilege Use audit
subcategories are enabled with
both Success and Failure
recording, and that maximum
log size is sufficient (≥ 200
3.3.1, 3.3.2
(Create audit
logs; Trace user
actions)
Intune Profile
Status; Local
auditpol /g
et /categor
y:*.
Open Intune Baseline Deployment
381

Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification NIST 800-171
Control
Audit
Method
Logging -
v3.7
MB) for retention.
TRANSITIONING EXISTING MDE DEPLOYMENTS
Clients often worry that pushing the Defender for Endpoint (MDE)
onboarding policy via Intune will break existing standalone MDE
installations. It will not.
• MDE is Built-In: On Windows 10/11, MDE is not a
separately installed application; it is a dormant sensor built
into the OS. The Intune policy simply passes a configuration
file pointing that sensor to your Intune tenant.
• No Interruption: If the device is already reporting to your
tenant (e.g., previously onboarded via local script or GPO),
Intune simply detects the active sensor, registers a "Success"
state, and continues without interrupting protection. (Note: If
the device is reporting to a completely different company's
tenant, it must be offboarded first).
• Configuration Takeover: While the onboarding itself is
harmless, Intune will immediately overwrite legacy local or
GPO security configurations (like AV scans and ASR rules).
This is the desired behavior, as Intune must become the
single, authoritative source of truth for your CMMC System
Security Plan.
Securing Microsoft 365 in GCC High | 2026.04.30
382

WHY HIDE THE WINDOWS SECURITY NOTIFICATION AREA?
Clients often worry that hiding the security notification area means
turning off their antivirus. It does not. Hiding this area simply
removes the Windows Security "shield" icon from the user's taskbar
and suppresses local pop-up alerts. The underlying protections
(Defender AV, ASR, Exploit Protection) remain fully active in the
background. In a CMMC and Zero Trust architecture, this is enforced
for two reasons:
1. Preventing Tampering: It removes the user interface,
preventing standard users from attempting to pause real-time
protection, add exclusions for risky files, or bypass
SmartScreen blocks.
2. Centralizing Operations: Security alerts are routed silently
to the Microsoft Defender portal for the IT/SOC team to
investigate, rather than causing user panic or generating
unnecessary helpdesk tickets for routine background scans.
INTUNE ENDPOINT PRIVILEGE MANAGEMENT (EPM)
EPM is an add-on license that allows standard users to elevate
specific, approved applications without needing IT to type in the
LAPS password. While LAPS is practically mandatory for CMMC to
secure the default admin account, EPM is highly recommended for
operational sanity so your helpdesk isn't overwhelmed with UAC
elevation requests for legacy DoD apps. EPM is being included in the
Microsoft 365 E5/G5 SKUs starting July 1, 2026.
5.4.12 Intune Compliance Policy — GCC High
OIB includes four user-scoped compliance policies that validate the device
state. These policies act as the signal used by Entra ID Conditional Access to
block non-compliant devices from accessing protected data.
Open Intune Baseline Deployment
383

OIB Compliance Policy What it validates
Win - OIB - Compliance - U - Password - v3.1 Password complexity and length
requirements
Win - OIB - Compliance - U - Device Security - v
3.1
Firewall, Antivirus/Antispyware,
Secure Boot
Win - OIB - Compliance - U - Device Health - v
3.1
BitLocker encryption, device health
attestation
Win - OIB - Compliance - U - Defender for Endpoi
nt - v3.1
MDE machine risk score threshold
WHY FOUR SEPARATE COMPLIANCE POLICIES INSTEAD OF
ONE?
OIB splits compliance into granular policies for the same reason it
splits configuration profiles:
• Phased rollout — deploy Device Health and Device Security
immediately, but hold the Password policy until you've
communicated the forced password reset to users
• Different non-compliance actions — Password violations
may warrant a grace period while BitLocker/Firewall
violations are marked non-compliant immediately
• Targeted exclusions — the Defender for Endpoint policy
only applies to devices onboarded to MDE; exclude devices
without P2 licensing
• Faster diagnosis — if a device is non-compliant, four
granular policies immediately show which category failed
rather than requiring you to hunt through a single monolithic
policy
If you have a single combined compliance policy from a previous
deployment, retire it once the four OIB policies are validated and
covering the same settings.
After import, review and adjust the OIB compliance policies against the
requirements below. The OIB defaults may not match your compliance
requirements exactly — verify each setting value.
Securing Microsoft 365 in GCC High | 2026.04.30
384

Policy Type: Windows 10 and later
Policy
Section Setting Name Required Value NIST SP 800-171 Rev. 2
(CMMC)
Non-
Compliance
Action
Device
Health
Require
BitLocker
Require 3.13.11, 3.8.6 (FIPS-
validated cryptography;
Protect CUI on portable
storage)
Mark non-
compliant
immediately.
Device
Health
Require Secure
Boot
Require 3.14.1 (Identify and correct
system flaws)
Mark non-
compliant
immediately.
System
Security
Minimum OS
version
10.0.22631.xxxx
(Current - 2 N)
3.14.1 (Flaw remediation) Grace
period: 3
days.
System
Security
Firewall Require 3.13.1 (Monitor, control, and
protect communications)
Mark non-
compliant
immediately.
System
Security
Antivirus /
Antispyware
Require 3.14.2 (Provide protection
from malicious code)
Mark non-
compliant
immediately.
System
Security
Require a
password to
unlock mobile
devices
Require (Minimum
length: 8, Block
simple passwords)
3.5.7, 3.5.8 (Password
complexity; Prohibit
password reuse)
Mark non-
compliant
immediately.
Defender Machine Risk Medium or lower 3.14.3 (Monitor system Mark non-
Open Intune Baseline Deployment
385

Policy
Section Setting Name Required Value NIST SP 800-171 Rev. 2
(CMMC)
Non-
Compliance
Action
for
Endpoint
Score security alerts and
advisories)
compliant
immediately.
PASSWORD POLICY CHANGES FORCE PASSWORD RESETS
Since your machine has no way to know if your local account existing
password is compliant, you will be forced to change your password
the next time you login.
WINDOWS HELLO FOR BUSINESS SETUP
For WHfB Intune policy configuration (Entra Join) and Cloud
Kerberos Trust setup (Hybrid Join), see Windows Hello for Business
Setup & Troubleshooting.
One OIB-specific step: in the imported OIB Account Protection
policy, explicitly enable Use Cloud Trust for On-Prem Auth. This
setting is separate from the WHfB policy itself and is easy to miss
during an OIB import.
ENVIRONMENT: COMMERCIAL
5.4.13 NIST SP 800-171 Rev. 3 Control Mapping
Here are the baseline profiles mapped to their corresponding NIST SP
800-171 Rev. 3 security requirements for your security plan documentation.
These same technical configurations apply regardless of regulatory track;
where Rev. 3 introduced new or reorganized requirements (notably 3.5.12 for
Securing Microsoft 365 in GCC High | 2026.04.30
386

replay-resistant authentication), those identifiers replace their Rev. 2
equivalents.
Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification
NIST SP
800-171 Rev. 3
Requirement
Audit
Method
Attack Surface
Reduction - D
Win - OIB
- ES - At
tack Surf
ace Reduc
tion - D
- ASR Rul
es (L2) -
v3.7
Ensure "Block Office apps
from creating child processes"
and "Block credential stealing"
set to Block.
3.1.1, 3.14.1
(Limit system
access; Flaw
remediation)
MDE
Advanced
Hunting KQL
(DeviceEven
ts); Intune
ASR Report.
Exploit
Protection
Win - Cus
tom - ES
- Exploit
Protectio
n
(manually
created —
Settings
Catalog
policy)
Verify DEP, ASLR (BottomUp
+ ForceRelocateImages),
SEHOP, and CFG enforced
system-wide and that Disallo
wExploitProtectionOverri
deis set.
3.14.1 (Identify
and correct
system flaws)
PowerShell G
et-ProcessM
itigation
-System;
Windows
Security app
shows
"managed by
your
organization."
Defender for
Endpoint
(EDR)
Win - Cus
tom - ES
- Defende
r for End
point Onb
oarding
(manually
created —
onboarding
blob is
tenant-
specific)
Verify Auto-onboard via
Intune Connector is active.
3.14.3 (Monitor
system security
alerts and
advisories)
MDE Device
Inventory;
Intune EDR
Onboarding
Status.
Defender
Antivirus (AV
Configuration)
Win - OIB
- ES - De
fender An
tivirus -
D - AV Co
nfigurati
on - v3.3
Verify Real-time protection:
On, Cloud-delivered
protection: High, scan
schedule, and any role-specific
exclusions.
3.14.2 (Provide
protection from
malicious code)
MDE
Antivirus
Report; Local
Get-MpPrefe
rence.
Windows
Firewall
Win - OIB
- ES - Wi
ndows Fir
ewall - D
Verify all three profiles
(Domain, Private, Public) set to
Block inbound with
Outbound: Allow.
3.13.1
(Monitor,
control, and
protect
Intune
Firewall
Status
Report; Local
Open Intune Baseline Deployment
387

Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification
NIST SP
800-171 Rev. 3
Requirement
Audit
Method
- Firewal
l Configu
ration -
v3.1
communications
at boundaries)
Get-NetFire
wallProfil
e.
BitLocker (OS
Disk)
Win - OIB
- ES - En
cryption
- D - Bit
Locker (O
S Disk) -
v3.7
Verify XTS-AES 256-bit
encryption is enforced for OS
and fixed drives.
3.13.11, 3.8.1
(FIPS-validated
cryptography;
Protect media)
Intune
Encryption
Report; Local
manage-bde
-status.
Windows Hello
for Business -
D
Win - OIB
- ES - Wi
ndows Hel
lo for Bu
siness -
D - WHfB
Configura
tion - v
3.2
Win - OIB
- SC - Wi
ndows Hel
lo for Bu
siness -
D - Cloud
Kerberos
Trust - v
3.5
Verify Require TPM and
Minimum PIN: 6.
3.5.3, 3.5.12
(Multifactor
authentication;
Replay-resistant
authentication)
Entra ID
Sign-in Logs
(Auth
Requirement:
MFA); Local
dsregcmd /s
tatus.
Windows
LAPS
Win - OIB
- ES - Wi
ndows LAP
S - D - L
APS Confi
guration
Configure Windows LAPS.
Enable backup to Entra ID,
enforce 14+ characters, set
rotation to 30 days, and
manage the built-in Administr
atoraccount. For uniform
Windows 11 24H2+ fleets that
want Automatic Account
Management and built-in Admi
nistratordisable, see the
optional (24H2+) matched pair
under Layered Deployment
Strategy.
3.1.1, 3.1.5
(Limit access;
Least privilege)
Entra ID
LAPS Audit
Logs; Intune
Device Local
Admin status.
Local
Administrators
Win - OIB
- ES - Lo
cal Group
Membershi
Verify the policy is set to
Replace mode and the
Members list is restricted to Ad
ministrator(LAPS-
3.1.5 (Employ
the principle of
least privilege)
Intune Profile
Status; Local
Get-LocalGr
oupMember
Securing Microsoft 365 in GCC High | 2026.04.30
388

Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification
NIST SP
800-171 Rev. 3
Requirement
Audit
Method
p - D - L
ocal Admi
nistrator
s
managed) plus your designated
Tier 1 break-glass account.
-Group "Adm
inistrator
s".
Local Security Win - OIB
- SC - De
vice Secu
rity - D
- Local S
ecurity P
olicies
Edit profile to add Interactive
Logon Message Text and
Interactive Logon Message
Title. Replace with your
Banner Text. The Layer 1
default keeps the built-in Admi
nistratoraccount enabled.
For uniform Windows 11
24H2+ fleets that want it
disabled (with a LAPS-
managed custom admin
replacement), see the optional
(24H2+) matched pair under
Layered Deployment Strategy.
3.1.9 (Provide
privacy and
security notices)
Local
Registry: HKL
M\SOFTWAR
E\...\Polic
ies\System\
LegalNotice
Text.
Security
Experience
Win - OIB
- ES - De
fender An
tivirus -
D - Secur
ity Exper
ience - v
3.3
Ensure Hide Windows
Security Notification Area
and Enable Tamper
Protection are enforced.
3.4.5 (Restrict
nonessential
programs)
MDE
Security
Center
(Tamper
Protection
status).
Removable
Media
Win - Cus
tom - ES
- Device
Control /
Removable
Media
(manually
created —
keyed to
approved
hardware
IDs unique
to each
tenant)
Verify the policy denies all
write access while allowing
approved hardware IDs.
3.8.1, 3.8.7
(Control
removable
media)
MDE
Advanced
Hunting KQL
(RemovableS
toragePolic
yTriggere
d).
Login and
Lock Screen
Win - OIB
- SC - De
vice Secu
rity - U
- Power a
nd Device
Lock - v
Adjust the OIB default to
ensure Max Inactivity Time
Device Lock is 15 Minutes
(900 seconds) or less.
3.1.10 (Session
lock)
Intune Profile
Status.
Open Intune Baseline Deployment
389

Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification
NIST SP
800-171 Rev. 3
Requirement
Audit
Method
3.6
Win - OIB
- SC - De
vice Secu
rity - D
- Login a
nd Lock S
creen - v
3.1
Reports and
Telemetry
Win - OIB
- SC - Wi
ndows Upd
ate for B
usiness -
D - Repor
ts and Te
lemetry -
v3.0
Set "Allow Telemetry" to
Basic/Security.
3.1.3 (Control
the flow of
sensitive
information)
Intune Profile
Status.
Audit and
Event Logging
Win - OIB
- SC - De
vice Secu
rity - D
- Audit a
nd Event
Verify Object Access, Account
Logon, and Privilege Use audit
subcategories are enabled with
both Success and Failure
recording, and that maximum
log size is sufficient (≥ 200
3.3.1, 3.3.2
(Create audit
logs; Trace user
actions)
Intune Profile
Status; Local
auditpol /g
et /categor
y:*.
Securing Microsoft 365 in GCC High | 2026.04.30
390

Deliverable
Scope
Profile
Source /
Filename
Critical Setting Verification
NIST SP
800-171 Rev. 3
Requirement
Audit
Method
Logging -
v3.7
MB) for retention.
TRANSITIONING EXISTING MDE DEPLOYMENTS
Clients often worry that pushing the Defender for Endpoint (MDE)
onboarding policy via Intune will break existing standalone MDE
installations. It will not.
• MDE is Built-In: On Windows 10/11, MDE is not a
separately installed application; it is a dormant sensor built
into the OS. The Intune policy simply passes a configuration
file pointing that sensor to your Intune tenant.
• No Interruption: If the device is already reporting to your
tenant (e.g., previously onboarded via local script or GPO),
Intune simply detects the active sensor, registers a "Success"
state, and continues without interrupting protection. (Note: If
the device is reporting to a completely different company's
tenant, it must be offboarded first).
• Configuration Takeover: While the onboarding itself is
harmless, Intune will immediately overwrite legacy local or
GPO security configurations (like AV scans and ASR rules).
This is the desired behavior, as Intune must become the
single, authoritative source of truth for your security program
documentation.
Open Intune Baseline Deployment
391

WHY HIDE THE WINDOWS SECURITY NOTIFICATION AREA?
Clients often worry that hiding the security notification area means
turning off their antivirus. It does not. Hiding this area simply
removes the Windows Security "shield" icon from the user's taskbar
and suppresses local pop-up alerts. The underlying protections
(Defender AV, ASR, Exploit Protection) remain fully active in the
background. In a Zero Trust architecture, this is enforced for two
reasons:
1. Preventing Tampering: It removes the user interface,
preventing standard users from attempting to pause real-time
protection, add exclusions for risky files, or bypass
SmartScreen blocks.
2. Centralizing Operations: Security alerts are routed silently
to the Microsoft Defender portal for the IT/SOC team to
investigate, rather than causing user panic or generating
unnecessary helpdesk tickets for routine background scans.
INTUNE ENDPOINT PRIVILEGE MANAGEMENT (EPM)
EPM is an add-on license that allows standard users to elevate
specific, approved applications without needing IT to type in the
LAPS password. While LAPS is practically mandatory to secure the
default admin account, EPM is highly recommended for operational
sanity so your helpdesk isn't overwhelmed with UAC elevation
requests for legacy apps. EPM is being included in the Microsoft 365
E5/G5 SKUs starting July 1, 2026.
5.4.14 Intune Compliance Policy — Commercial
OIB includes four user-scoped compliance policies that validate the device
state. These policies act as the signal used by Entra ID Conditional Access to
block non-compliant devices from accessing protected data.
Securing Microsoft 365 in GCC High | 2026.04.30
392

OIB Compliance Policy What it validates
Win - OIB - Compliance - U - Password - v3.1 Password complexity and length
requirements
Win - OIB - Compliance - U - Device Security - v
3.1
Firewall, Antivirus/Antispyware,
Secure Boot
Win - OIB - Compliance - U - Device Health - v
3.1
BitLocker encryption, device health
attestation
Win - OIB - Compliance - U - Defender for Endpoi
nt - v3.1
MDE machine risk score threshold
WHY FOUR SEPARATE COMPLIANCE POLICIES INSTEAD OF
ONE?
OIB splits compliance into granular policies for the same reason it
splits configuration profiles:
• Phased rollout — deploy Device Health and Device Security
immediately, but hold the Password policy until you've
communicated the forced password reset to users
• Different non-compliance actions — Password violations
may warrant a grace period while BitLocker/Firewall
violations are marked non-compliant immediately
• Targeted exclusions — the Defender for Endpoint policy
only applies to devices onboarded to MDE; exclude devices
without P2 licensing
• Faster diagnosis — if a device is non-compliant, four
granular policies immediately show which category failed
rather than requiring you to hunt through a single monolithic
policy
If you have a single combined compliance policy from a previous
deployment, retire it once the four OIB policies are validated and
covering the same settings.
After import, review and adjust the OIB compliance policies against the
requirements below. The OIB defaults may not match your compliance
requirements exactly — verify each setting value.
Open Intune Baseline Deployment
393

Policy Type: Windows 10 and later
Policy
Section
Setting
Name Required Value NIST SP 800-171 Rev. 3
Non-
Compliance
Action
Device
Health
Require
BitLocker
Require 3.13.11, 3.8.1 (FIPS-validated
cryptography; Protect media)
Mark non-
compliant
immediately.
Device
Health
Require
Secure Boot
Require 3.4.1 (Establish and maintain
baseline configurations)
Mark non-
compliant
immediately.
System
Security
Minimum OS
version
10.0.22631.xxxx
(Current - 2 N)
3.4.1, 3.14.1 (Maintain
baseline; Flaw remediation)
Grace
period: 3
days.
System
Security
Firewall Require 3.13.1 (Monitor, control, and
protect communications)
Mark non-
compliant
immediately.
System
Security
Antivirus /
Antispyware
Require 3.14.2 (Provide protection from
malicious code)
Mark non-
compliant
immediately.
System
Security
Require a
password to
unlock mobile
devices
Require
(Minimum length:
8, Block simple
passwords)
3.5.7, 3.5.8, 3.5.12 (Password
complexity; Prohibit reuse;
Replay-resistant authentication)
Mark non-
compliant
immediately.
Defender Machine Risk Medium or lower 3.14.6 (Monitor system security Mark non-
Securing Microsoft 365 in GCC High | 2026.04.30
394

Policy
Section
Setting
Name Required Value NIST SP 800-171 Rev. 3
Non-
Compliance
Action
for
Endpoint
Score alerts) compliant
immediately.
PASSWORD POLICY CHANGES FORCE PASSWORD RESETS
Since your machine has no way to know if your local account existing
password is compliant, you will be forced to change your password
the next time you login.
WINDOWS HELLO FOR BUSINESS SETUP
For WHfB Intune policy configuration (Entra Join) and Cloud
Kerberos Trust setup (Hybrid Join), see Windows Hello for Business
Setup & Troubleshooting.
One OIB-specific step: in the imported OIB Account Protection
policy, explicitly enable Use Cloud Trust for On-Prem Auth. This
setting is separate from the WHfB policy itself and is easy to miss
during an OIB import.
5.4.15 USB Device Control & SOC Alerting
In high-security environments, simply blocking write access via the Settings
Catalog may not be enough. To mirror the capabilities of tools like McAfee HBSS,
you can whitelist specific, company-approved USB drives (e.g., a SanDisk Ultra
USB 3.0) while generating real-time SOC alerts when unapproved devices are
plugged in.
This requires splitting the workload: Intune acts as the enforcement engine, while
Defender for Endpoint acts as the auditor.
Open Intune Baseline Deployment
395

5.4.15.1 Intune
Instead of basic Administrative Templates, use Endpoint Security > Attack
Surface Reduction > Device Control. This relies on XML-based rule sets.
Step 1: The Approved Hardware XML Create an XML file to define your
approved USB model using its Vendor ID (VID) and Product ID (PID). Here is an
example targeting a common SanDisk Ultra USB 3.0 (VID: 0781, PID: 5581).
Note: In XML, the ampersand connecting the VID and PID must be escaped as &am
p;.
<Group Id="{aaa512fa-275f-40e2-a39c-b92c08b3e352}">
<MatchType>MatchAny</MatchType>
<DescriptorIdList>
<HardwareId>USB\VID_0781&amp;PID_5581</HardwareId>
</DescriptorIdList>
</Group>
Step 2: The Policy Rule XML Create a second XML file that blocks write/execute
access for all removable media, but explicitly excludes the SanDisk group you just
created. Crucially, it sets the block action to AuditDenied, which tells Defender to
generate an alert.
<PolicyRule Id="{c544a991-5786-2819-949e-a032cb790d0e}">
<Name>Block USB Writes, Allow SanDisk Ultra USB 3.0</Name>
<IncludedIdList>
<GroupId>{9b28fae8-72f7-4267-a1a5-685f747a4345}</GroupId>
</IncludedIdList>
<ExcludedIdList>
<GroupId>{aaa512fa-275f-40e2-a39c-b92c08b3e352}</GroupId>
</ExcludedIdList>
<Entry Id="{f8ddbbc5-8855-4776-a9f4-ee58c3a21414}">
<Type>Deny</Type>
<Options>0</Options>
<AccessMask>6</AccessMask>
</Entry>
<Entry Id="{7c518c86-38e5-40a9-86ee-e9f79f136817}">
<Type>AuditDenied</Type>
<Options>3</Options>
<AccessMask>6</AccessMask>
</Entry>
</PolicyRule>
Step 3: Deployment Upload the Approved Hardware XML to the Reusable
Settings tab in Intune. Then, create a new ASR policy (Profile: Device Control)
and link your Policy Rule XML.
Securing Microsoft 365 in GCC High | 2026.04.30
396

5.4.15.2 Defender for Endpoint
Intune does not send real-time alerts. To get the HBSS-style popup for the security
team, you must configure a Custom Detection Rule in Microsoft Defender.
Navigate to Hunting > Advanced hunting and run the following KQL query:
// Detect blocked Removable Storage devices
DeviceEvents
| where ActionType == "RemovableStoragePolicyTriggered"
| extend parsed=parse_json(AdditionalFields)
| extend RemovableStorageAccess = tostring(parsed.RemovableStorageAccess)
| extend RemovableStoragePolicyVerdict = tostring(parsed.RemovableStoragePoli
cyVerdict)
| extend MediaDescription = tostring(parsed.DeviceDescription)
| where RemovableStoragePolicyVerdict == "Deny"
| project Timestamp, DeviceName, InitiatingProcessAccountName, ActionType, Re
movableStorageAccess, MediaDescription
ClickCreate detection rule in the top right corner and set the severity to Medium
or High. This will automatically open an incident in your SOC dashboard whenever
a user attempts to write to an unapproved USB drive.
5.4.16 Intune Compliance Policy — Shared Baseline
OIB includes four user-scoped compliance policies that validate the device state.
These policies act as the signal used by Entra ID Conditional Access to block non-
compliant devices from accessing protected data.
OIB Compliance Policy What it validates
Win - OIB - Compliance - U - Pass
word - v3.1
Password complexity and length
requirements
Win - OIB - Compliance - U - Devi
ce Security - v3.1
Firewall, Antivirus/Antispyware, Secure
Boot
Win - OIB - Compliance - U - Devi
ce Health - v3.1
BitLocker encryption, device health
attestation
Win - OIB - Compliance - U - Defe MDE machine risk score threshold
Open Intune Baseline Deployment
397

OIB Compliance Policy What it validates
nder for Endpoint - v3.1
WHY FOUR SEPARATE COMPLIANCE POLICIES INSTEAD OF ONE?
OIB splits compliance into granular policies for the same reason it splits
configuration profiles:
• Phased rollout — deploy Device Health and Device Security
immediately, but hold the Password policy until you've
communicated the forced password reset to users
• Different non-compliance actions — Password violations may
warrant a grace period while BitLocker/Firewall violations are
marked non-compliant immediately
• Targeted exclusions — the Defender for Endpoint policy only
applies to devices onboarded to MDE; exclude devices without P2
licensing
• Faster diagnosis — if a device is non-compliant, four granular
policies immediately show which category failed rather than
requiring you to hunt through a single monolithic policy
If you have a single combined compliance policy from a previous
deployment, retire it once the four OIB policies are validated and covering
the same settings.
After import, review and adjust the OIB compliance policies against the
requirements below. The OIB defaults may not match your compliance
requirements exactly — verify each setting value.
Policy Type: Windows 10 and later
Policy Section Setting Name Required Value Non-Compliance
Action
Device Health Require BitLocker Require Mark non-
compliant
immediately.
(Blocks access to
Securing Microsoft 365 in GCC High | 2026.04.30
398

Policy Section Setting Name Required Value Non-Compliance
Action
protected resources
immediately)
Device Health Require Secure
Boot
Require Mark non-
compliant
immediately.
System Security Minimum OS
version
10.0.22631.xxxx
(Current - 2 N)
Grace period: 3
days. (Allows time
for patching)
System Security Firewall Require Mark non-
compliant
immediately.
System Security Antivirus /
Antispyware
Require Mark non-
compliant
immediately.
System Security Require a password
to unlock mobile
devices
Require (Minimum
length: 8, Block
simple passwords)
Mark non-
compliant
immediately.
(Enforces NIST
3.5.7 & 3.5.8)
Defender for
Endpoint
Machine Risk
Score
Medium or lower Mark non-
compliant
immediately.
(Reacts to active
Open Intune Baseline Deployment
399

Policy Section Setting Name Required Value Non-Compliance
Action
threats)
PASSWORD POLICY CHANGES FORCE PASSWORD RESETS
Since your machine has no way to know if your local account existing
password is compliant, you will be forced to change your password the next
time you login.
WINDOWS HELLO FOR BUSINESS SETUP
For WHfB Intune policy configuration (Entra Join) and Cloud Kerberos
Trust setup (Hybrid Join), see Windows Hello for Business Setup &
Troubleshooting.
One OIB-specific step: in the imported OIB Account Protection policy,
explicitly enable Use Cloud Trust for On-Prem Auth. This setting is
separate from the WHfB policy itself and is easy to miss during an OIB
import.
5.4.17 Windows Update Rings
Windows Update for Business, managed through Intune Update rings for
Windows 10 and later policies, controls when devices receive Windows quality
updates (monthly security patches) and feature updates (major OS version changes).
A single update ring for all devices creates operational risk in two directions: push
too fast and a bad patch disables a fleet simultaneously; push too slow and known
vulnerabilities stay open. A tiered ring strategy creates a controlled validation
window — a bad patch that disrupts IT/Dev devices on day zero is caught and
Securing Microsoft 365 in GCC High | 2026.04.30
400

rolled back before it reaches General Ops on day seven.
QUALITY VS. FEATURE UPDATE DEFERRALS
These are two independent deferral values in each ring:
• Quality update deferral: Controls delay of monthly security
patches (Patch Tuesday). The short ring values below (0–10 days)
apply here.
• Feature update deferral: Controls delay of major Windows
version upgrades (e.g., 22H2 → 23H2). These are set to much
longer values across all rings — the ring values below are not the
right cadence for major OS changes, which require separate testing
and a deliberate cutover.
5.4.17.1 Ring Strategy
Ring Scope Quality
Deferral
Feature
Deferral
Restart
Behavior
IT & Dev IT staff,
administrators
0 days 30 days Restart prompt
after install
Pilot Early adopters,
department
leads
3 days 60 days Maintenance
window restart
General Ops City Hall and
office staff
7 days 90 days Maintenance
window restart
Critical Ops Public Safety,
24/7 services
10 days 180 days Maintenance
window restart
(see note)
Assignments: Create one Entra ID security group per ring and assign it exclusively
to that ring's policy. A device can only be in one update ring — if it matches
multiple ring assignments, the highest-priority policy wins, which makes exclusive
group assignment the safest approach.
Open Intune Baseline Deployment
401

Intune Policy Name Assigned Group
WUR - IT and Dev Update Ring - IT Dev
WUR - Pilot Update Ring - Pilot
WUR - General Ops Update Ring - General Ops
WUR - Critical Ops Update Ring - Critical Ops
5.4.17.2 Intune Configuration
Navigate to Intune > Devices > Windows > Update rings for Windows 10 and
later > Create profile.
IT & Dev Ring
Setting Value Rationale
Quality update deferral
period (days)
0 IT staff are the canary —
they see patches
immediately
Feature update deferral
period (days)
30 Enough time to read
release notes and test
critical apps
Microsoft product updates Allow Patches Office and Edge
alongside Windows
Windows drivers Allow IT can absorb driver
instability; helps surface
hardware issues early
Automatic update behavior Auto install and restart at
scheduled time
IT machines can restart on
a defined schedule
Active hours start 8 AM
Active hours end 7 PM
Deadline for quality
updates
2 days Ensures stragglers are
patched within 48 hours
Securing Microsoft 365 in GCC High | 2026.04.30
402

Setting Value Rationale
Deadline for feature
updates
5 days
Grace period 0 days
Auto reboot before
deadline
Yes If device is idle at login
screen, reboot
Option to pause Windows
updates
Enable Allow IT staff to pause
during a critical incident
Pilot Ring
Setting Value Rationale
Quality update deferral
period (days)
3 3-day soak after IT/Dev
validates
Feature update deferral
period (days)
60
Microsoft product updates Allow
Windows drivers Allow
Automatic update behavior Auto install and restart at
maintenance time
Active hours start 8 AM
Active hours end 7 PM
Deadline for quality
updates
5 days
Deadline for feature
updates
7 days
Grace period 1 day
Auto reboot before
deadline
No
Open Intune Baseline Deployment
403

Setting Value Rationale
Option to pause Windows
updates
Disable Pilot users should not be
pausing patches
General Ops Ring
Setting Value Rationale
Quality update deferral
period (days)
7 Full week soak; covers any
delayed Microsoft issue
reports
Feature update deferral
period (days)
90
Microsoft product updates Allow
Windows drivers Allow
Automatic update behavior Auto install and restart at
maintenance time
Active hours start 7 AM
Active hours end 7 PM
Deadline for quality
updates
7 days
Deadline for feature
updates
14 days
Grace period 2 days
Auto reboot before
deadline
No
Option to pause Windows
updates
Disable
Securing Microsoft 365 in GCC High | 2026.04.30
404

Critical Ops Ring
Setting Value Rationale
Quality update deferral
period (days)
10 10-day soak; patch is
validated by all other rings
before it arrives
Feature update deferral
period (days)
180 Major OS changes require
explicit coordination with
command staff
Microsoft product updates Allow
Windows drivers Allow
Automatic update behavior Auto install and restart at
maintenance time
Restart occurs in the
maintenance window (see
active hours)
Active hours start 6 AM
Active hours end 11 PM Maintenance window is 11
PM–6 AM — during shift
overlap or low activity
Deadline for quality
updates
14 days Hard deadline: device will
restart within the next
maintenance window after
day 14
Deadline for feature
updates
30 days
Grace period 3 days
Auto reboot before
deadline
No
Option to pause Windows
updates
Enable Allows command staff or
device owner to hold a
patch during an active
incident; 35-day maximum
Open Intune Baseline Deployment
405

Setting Value Rationale
enforced by Intune
CRITICAL OPS: CHANGE MANAGEMENT REQUIRED BEFORE
ROLLOUT
First responders currently control their own reboots. The ring above
configures maintenance-window restarts (11 PM–6 AM) rather than
random forced reboots, but this still represents a change from the current
self-managed model.
Before deploying this ring to Public Safety devices, coordinate with
command staff to:
1. Communicate that reboots will occur automatically in the 11 PM–6
AM window — not during active shifts
2. Confirm shift patterns to verify the maintenance window is
appropriate (overnight shifts may need adjustment)
3. Clarify the pause option: the "Option to pause Windows updates"
setting allows command staff or a delegated IT liaison to hold a
patch for up to 35 days during a critical incident, but this is not a
permanent bypass
4. Identify dedicated vs. shift-shared devices — dedicated devices
tied to a single officer can use the officer's schedule; shared devices
(e.g., in-vehicle or at a desk) should use the maintenance window
approach
The 14-day quality update deadline is a hard enforcement point: even if the
device misses every maintenance window, it will restart at day 14. This
deadline cannot be extended indefinitely without a separate policy
exception.
5.4.17.3 Compliance Policy Alignment
The Compliance Policy earlier in this chapter sets Minimum OS version with a
3-day grace period. Devices in the Critical Ops ring defer quality updates for 10
days — meaning they will temporarily run an older patch level than the compliance
requirement checks for, triggering a non-compliant state and potentially blocking
Conditional Access for public safety staff.
Securing Microsoft 365 in GCC High | 2026.04.30
406

Action required: Create a separate Compliance Policy targeting the Update Ring
- Critical Opsgroup with a grace period of 14 days on the Minimum OS
version setting. This matches the quality update deadline and prevents false non-
compliance signals from blocking access to protected resources on actively-
updated-but-deferred devices.
5.4.17.4 Shared PC Update Ring
The Shared PC update ring defined in Scenario: Shared PC Mode operates
independently of this ring strategy. Shared PCs use a 0-day quality deferral with
forced maintenance-window restarts — effectively IT & Dev urgency combined
with Shared PC discipline. Do not assign shared PC devices to any of the four rings
above; keep them in their dedicated Shared PC ring.
5.4.18 Wi-Fi Configuration
Intune provides built-in Wi-Fi configuration profiles — no PowerShell or netsh
scripts needed for ongoing management. Deploy Wi-Fi profiles to configure devices
to automatically connect to corporate wireless networks with the correct SSID,
security type, and credentials.
NETSH IS FOR OOBE BOOTSTRAPPING ONLY
The netsh wlan export/addapproach documented in Provisioning with
Windows Autopilot is a one-time technician step during Autopilot
provisioning — the device needs Wi-Fi connectivity before it has enrolled
in Intune and received a Wi-Fi profile. For ongoing Wi-Fi management
after enrollment, use the Intune Wi-Fi profiles documented below.
5.4.18.1 Creating a Wi-Fi Profile
Intune → Devices → Configuration → + Create → Templates → Wi-Fi
Platform: Windows 10 and later
Open Intune Baseline Deployment
407

Setting WPA2-Personal (Shared
Secret)
WPA2/WPA3-Enterprise
(802.1X)
Wi-Fi type Basic Enterprise
Wi-Fi name (SSID) The network name devices
should connect to
Same
Connect automatically Yes Yes
Connect when network is
not broadcasting
Yes (if the SSID is hidden) Yes (if hidden)
Security type WPA/WPA2-Personal WPA/WPA2-Enterprise
Pre-shared key Enter the shared password N/A
EAP type N/A PEAP or EAP-TLS
Certificate N/A Reference a SCEP or
PKCS certificate profile
deployed via Intune
Trusted root CA N/A Reference the root CA
certificate profile
For most organizations migrating from GPO-managed Wi-Fi with shared
passwords, WPA2-Personal (Basic) is the starting point. The target state is WPA2/
WPA3-Enterprise with certificate authentication — this eliminates shared
passwords and provides per-device authentication, but requires a certificate
infrastructure (Intune SCEP/PKCS with a Certificate Connector or cloud PKI).
5.4.18.2 Department-Specific Wi-Fi Targeting
Different departments, buildings, or device roles often require different Wi-Fi
configurations — different SSIDs, different passwords, or different network
segments. Use Intune assignment filters or device groups to target the right Wi-Fi
profile to the right devices.
Example: Police and Fire department devices on different networks
Wi-Fi Profile SSID Assigned to Filter / Group
Wi-Fi - Police CPD-MDT-Secure All Devices Filter: device.dev
Securing Microsoft 365 in GCC High | 2026.04.30
408

Wi-Fi Profile SSID Assigned to Filter / Group
D1 MDT iceName -starts
With "CPDM-1"
Wi-Fi - Police
D2 MDT
CPD-MDT-Secure All Devices Filter: device.dev
iceName -starts
With "CPDM-2"
Wi-Fi - CFD Bat
talion
CFD-Apparatus All Devices Filter: device.dev
iceName -starts
With "CFD-"
Wi-Fi - City Ge
neral
CityNet-Corp All Devices No filter — all
managed devices
FILTERS VS. DEVICE GROUPS FOR WI-FI TARGETING
Intune filters are evaluated at policy delivery time and take effect on the
next device sync — faster than waiting for dynamic group membership to
recalculate. For department-specific Wi-Fi where the device naming
convention is consistent, filters are the preferred targeting mechanism. Use
dynamic device groups when the targeting logic requires attributes that
filters don't support (e.g., Entra ID extension attributes).
5.4.18.3 CMMC Relevance
Wi-Fi configuration profiles satisfy AC.L2-3.1.16 (Wireless Access) — they
enforce that managed devices connect only to authorized wireless networks with
approved security settings. Combined with Conditional Access policies requiring
compliant devices, this ensures CUI is only accessed over controlled wireless
connections.
Open Intune Baseline Deployment
409

5.4.1 Intune Diagnostics & Audit Evidence
5.4.2 Policy Troubleshooting
5.4.2.1 Policy Delivery and Check-In
Intune policies push to devices on check-in, which occurs approximately every 8
hours. A check-in can also be triggered manually without waiting for the scheduled
interval.
Force a check-in on device: Settings → Accounts → Work or school → Info →
Sync
Force a check-in from Intune portal: Devices → [Device] → Sync
Check-in status is visible per profile at: Devices → [Device] → Device
configuration. Each profile listed shows its assignment status — Succeeded,
Pending, Error, or Conflict.
5.4.2.2 Diagnosing Policy Conflicts
A policy conflict occurs when two policies configure the same setting with different
values. Intune reports the setting as "Conflict" and does not apply either value —
the setting is effectively unmanaged until the conflict is resolved.
Finding conflicts:
1. Navigate to Devices → [Device] → Device configuration
2. Filter the profile list by "Conflict" status
3. Drill into the conflicting profile to identify which specific setting is in
conflict
Resolution: Determine which policy should own the setting and remove or
reconcile the conflicting setting from the other policy. For settings managed by
Security Baselines, note that baseline settings take precedence — a custom profile
that overlaps with a baseline will frequently conflict.
5.4.2.3 Filter Troubleshooting
Assignment filters allow targeting based on device properties (OS version,
manufacturer, Entra group membership) without creating additional groups. A filter
that evaluates to false silently skips policy assignment — this is one of the most
Securing Microsoft 365 in GCC High | 2026.04.30
410

common causes of a policy not applying despite correct group membership.
Testing a filter: Tenant administration → Filters → [Filter] → Device preview —
enter a specific device to see whether it matches the filter criteria and why.
5.4.2.4 MDM Diagnostic Report
The MDM Diagnostic Report is a full snapshot of all policies applied to a specific
Windows device, generated on the device itself.
Generate on device: Settings → Accounts → Access work or school → [Account]
→ Info → Create report
This produces a ZIP file at %TEMP%\MDMDiagReportcontaining:
File Contents
MDMDiagReport.xml All MDM policies applied, their values,
and error codes
MDMDiagHtmlReport.html Human-readable summary of enrollment
status, configuration policies, compliance
results, certificate profiles, Wi-Fi and VPN
profiles
DeviceEnrollment.log Enrollment events and errors
The HTML report is the fastest way to confirm what policies are applied and
whether any returned errors. Share this file with the help desk or use it during
remote troubleshooting sessions.
5.4.2.5 Remote Log Collection
For devices that cannot be physically accessed, Intune supports remote diagnostic
log collection without user involvement.
Trigger from portal: Devices → [Device] → Collect diagnostics (Windows)
This instructs the device to collect and upload a log bundle to Intune. Logs are
available for download from the portal within 15–30 minutes.
Collected logs include:
Open Intune Baseline Deployment
411

• Windows event logs: System, Application, Security, MDM
• Registry exports for common MDM keys
• Scheduled task status
• Installed applications list
Use remote log collection when investigating a policy failure or enrollment issue on
a device at a remote site.
5.4.3 Intune Audit Log
The Intune audit log records all administrative actions taken in the Intune portal or
via API — policy creation, modification, deletion, device wipes, compliance policy
changes, and app assignments.
Access: Tenant administration → Audit logs
Key fields per entry:
Field Description
Date Timestamp (UTC)
Initiated by UPN of the admin who performed the
action
Activity Action type (e.g., Create, Update, Delete,
DeviceWipe)
Target resource Policy name, device name, or app name
Result Success or Failure
Retention: Intune audit logs are retained for 1 year by default. For longer retention,
export to Azure Monitor Log Analytics or Azure Storage via Diagnostic Settings.
Export to Log Analytics:
In the Azure portal: Intune → Diagnostic settings → Add diagnostic setting →
select AuditLogsand OperationalLogs→ route to a Log Analytics workspace.
Securing Microsoft 365 in GCC High | 2026.04.30
412

ENVIRONMENT: GCC HIGH (CMMC)
For GCC High, route diagnostic logs to a Log Analytics workspace in Azure
Government. The ingestion endpoint uses the *.ods.opinsights.azure.us
domain. Confirm your Log Analytics workspace is deployed in an Azure
Government region (USGov Virginia or USGov Texas) before configuring the
diagnostic setting.
ENVIRONMENT: COMMERCIAL
For commercial tenants, route diagnostic logs to any Log Analytics workspace
in the standard Azure regions. The ingestion endpoint uses the *.ods.opinsi
ghts.azure.comdomain.
5.4.4 Device Compliance Audit Evidence
Compliance policy results are per-device, per-policy, and time-stamped. This is the
primary evidence source for demonstrating that managed devices meet
configuration baselines.
Access: Devices → Monitor → Device compliance — provides an overview and
supports per-policy drill-down.
Exporting compliance state:
# Using Microsoft Graph — works for both commercial and GCC High with the app
ropriate environment parameter
# GCC High
Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All" -Environmen
t USGov
# Commercial
# Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"
$devices = Get-MgDeviceManagementManagedDevice -All
$devices | Select-Object DeviceName, ComplianceState, LastSyncDateTime, Opera
tingSystem, OSVersion |
Export-Csv -Path ".\DeviceCompliance_$(Get-Date -Format 'yyyy-MM-dd').cs
v" -NoTypeInformation
Open Intune Baseline Deployment
413

Per-device compliance evidence: Devices → [Device] → Device compliance —
lists every compliance policy assigned to the device and each policy's result:
Compliant, Noncompliant, or Not applicable. This per-device view is the
configuration evidence an auditor typically requests.
5.4.5 Configuration Profile Evidence
Configuration profiles define the security baseline applied to each device. Profile
assignment status and compliance state constitute evidence that security controls are
enforced.
Access: Devices → Configuration profiles → [Profile] → Device status — lists
every device the profile is assigned to and the application result per device.
Key evidence artifacts:
Artifact Location Purpose
Profile name and settings Configuration profiles →
[Profile] → Properties
Documents the security
controls configured
Device assignment list Configuration profiles →
[Profile] → Device status
Shows which devices
received the profile and
whether it applied
successfully
Per-device status Succeeded / Error /
Conflict / Not applicable
Confirms recency of
enforcement and identifies
failures
Last report time Device status → Last
report column
Confirms the profile state
is current
For audit packages, export the profile assignment report and supplement with a
screenshot or Graph API export of the profile settings.
Securing Microsoft 365 in GCC High | 2026.04.30
414

5.4.6 Intune Diagnostics — Compliance Control
Mapping
ENVIRONMENT: GCC HIGH (CMMC)
5.4.6.1 CMMC Evidence Requirements
The following Intune artifacts directly satisfy CMMC Level 2 assessment
objectives:
NIST Control Assessment Objective Intune Evidence
CM.L2-3.4.1 — Baseline
configurations
Demonstrate a baseline
configuration is
established and applied
Configuration profile
export; device profile
assignment report
showing Succeeded
CM.L2-3.4.2 — Security
config enforcement
Demonstrate baseline is
enforced and deviations
are identified
Device compliance
report; noncompliant
device list; compliance
policy settings export
CM.L2-3.4.6 — Least
functionality
Demonstrate unnecessary
services and features are
disabled
ASR rules policy export;
app control policy;
configuration profile
showing disabled
features
CM.L2-3.4.9 — User-
installed software
Demonstrate controls on
user software installation
Endpoint Privilege
Management policy;
Win32 app blocklist
policy export
SI.L2-3.14.1 — Flaw
remediation
Demonstrate patches are
applied
Windows Update for
Business ring
configuration; device
update compliance report
SI.L2-3.14.2 —
Malicious code
protection
Demonstrate AV is
deployed and active
Defender for Endpoint
onboarding policy status;
Tamper Protection
Open Intune Baseline Deployment
415

NIST Control Assessment Objective Intune Evidence
configuration
AC.L2-3.1.1 —
Authorized access
Demonstrate only
authorized devices access
the system
Entra device compliance
state in Conditional
Access; Intune
compliance policy list
AU.L2-3.3.1 — Audit
records
Demonstrate audit
logging of admin actions
Intune audit log export (1
year)
5.4.6.2 CMMC Evidence Package — Intune Artifacts
For a CMMC assessment, prepare the following exports from Intune:
1. Configuration profile export — screenshot or Graph API export of
every configuration profile showing the security settings applied
2. Device compliance report — CSV export of all managed devices
with compliance state (target greater than 95% compliant; document
exceptions for any noncompliant devices)
3. Compliance policy settings export — the conditions each device
must meet: encryption, Secure Boot, OS version minimum, and others
4. Audit log export — 90-day export of the Intune audit log showing
administrative actions with initiator identity
5. Enrollment report — all managed devices with enrollment date, OS,
and last check-in, demonstrating that all in-scope devices are under
management
ENVIRONMENT: COMMERCIAL
5.4.6.3 NIST SP 800-171 and SOC 2 Evidence
For commercial organizations undergoing SOC 2 Type II audits or NIST SP
800-171 assessments, the same Intune artifacts apply but the framing differs.
SOC 2 Type II — Relevant Trust Service Criteria
Securing Microsoft 365 in GCC High | 2026.04.30
416

TSC Criteria Intune Evidence
CC6.1 Logical and physical
access controls
Device compliance
policy; Entra Conditional
Access requiring
compliant device
CC6.6 Logical access security
measures
Configuration profiles
enforcing encryption,
screen lock, and USB
disable
CC6.8 Prevention of
unauthorized software
App control policies;
Endpoint Privilege
Management
CC7.1 Configuration
monitoring
Noncompliant device
alerts; compliance policy
enforcement
CC7.2 Monitoring for anomalies Intune noncompliance
notifications; integration
with Microsoft Sentinel
NIST SP 800-171 Rev. 3 Control Mapping
Control Intune Evidence
3.4.1 — Baseline configurations Configuration profile assignments with
Succeeded status
3.4.2 — Configuration change control Intune audit log showing configuration
changes with initiator identity
3.4.6 — Least functionality ASR rules policy; disabled services
configuration
3.14.1 — Flaw remediation Windows Update ring compliance
report
3.14.2 — Malicious code protection Defender policy assignment and device
status
Open Intune Baseline Deployment
417

For SOC 2 auditors, export the Intune audit log for the audit period (typically
12 months) and the device compliance state as of the audit date. Most SOC 2
auditors accept Intune portal screenshots supplemented by a Graph API CSV
export as sufficient evidence for configuration management controls.
5.4.7 Diagnostic Tools Reference
Tool Access Use
Intune portal — Device
diagnostics
Intune → Devices →
[Device] → Collect
diagnostics
Remote log collection
without user involvement
MDM Diagnostic Report On device: Settings →
Work account → Info →
Create report
Full policy report on the
device
Intune Troubleshooting
blade
Intune → Troubleshoot +
support → Troubleshoot →
select user
See all devices, policies,
and app assignments for a
specific user
Graph Explorer graph.microsoft.com
(commercial) or
graph.microsoft.us (GCC
High)
Query device compliance,
configuration, and audit
data via API
CMTrace Included in Configuration
Manager client; works on
standalone systems
Parse Intune log files in
real time with color-coded
error and warning
indicators
5.5 Defender for Endpoint and the
Endpoint Security baseline
Microsoft Defender for Endpoint (MDE) is the EDR (Endpoint Detection and
Response) platform for Intune-managed devices and the foundation of the SOC-side
compliance evidence chain — alert monitoring (3.14.3), malicious-code protection
Securing Microsoft 365 in GCC High | 2026.04.30
418

(3.14.2), system monitoring (3.14.6). MDE is one part of a broader Endpoint
Security baseline in Intune. The same Intune blade (Endpoint security) also
configures volume encryption (BitLocker), phishing-resistant authentication
(Windows Hello for Business), local-admin posture (LAPS, Local Administrators),
boundary protection (Windows Firewall), exploit mitigation, and removable-media
control — none of which are Defender features per se, but all of which co-locate
with MDE in the same admin surface and ship as one OIB baseline.
This chapter covers both: MDE specifically (onboarding paths, custom-detection
rules, Sentinel integration) and the 12 Layer 1 policies that make up the OIB
Endpoint Security baseline.
SCOPE OF THIS CHAPTER
The 12 Layer 1 policies covered here are 9 OIB-shipped (ASR, Defender
Antivirus AV Configuration, Defender Antivirus Security Experience,
BitLocker, Local Administrators, Windows Firewall, WHfB Configuration,
Cloud Kerberos Trust, LAPS) plus 3 manually authored (EDR
Onboarding, Exploit Protection, Device Control / Removable Media). Four
are Defender for Endpoint features specifically (ASR, AV Configuration,
Security Experience, EDR Onboarding); the rest configure other Windows
endpoint subsystems. Eleven of the twelve live under Intune's Endpoint
security blade — Cloud Kerberos Trust is the exception, a Settings Catalog
policy that pairs with WHfB Configuration to enable hybrid Entra-to-AD
trust (skip for cloud-only tenants).
The full 21-policy Layer 1 baseline — which adds Audit and Event
Logging, Local Security Policies, Login and Lock Screen, Power and
Device Lock, Reports and Telemetry, and the four OIB Compliance
policies — is documented in Open Intune Baseline Deployment § Layered
Deployment Strategy. The three Defender Antivirus Update Ring policies
(Pilot/UAT/Production) belong to Layer 2 — see the note in the
workstation ES section below.
Defender for Endpoint and the Endpoint Security baseline
419

ENVIRONMENT: GCC HIGH
5.5.1 CMMC Relevance
CMMC Practice NIST 800-171 Rev. 2
Control How MDE Satisfies It
SI.L2-3.14.7 Identify unauthorized use
of organizational systems
MDE behavioral
analytics and anomaly
detection surface
unexpected process
execution, lateral
movement, and data
exfiltration patterns
CA.L2-3.12.3 Monitor security controls
on an ongoing basis
MDE Secure Score,
device health reports, and
alert pipeline provide
continuous monitoring
evidence
IR.L2-3.6.1 Establish an operational
incident-handling
capability
MDE Incidents,
automated investigation,
and the Microsoft
Defender portal provide
the response workflow
IR.L2-3.6.2 Track, document, and
report incidents
MDE incident timeline
and audit log satisfy
documentation
requirements; exportable
for assessors
CM.L2-3.4.6 Employ the principle of
least functionality
Attack Surface
Reduction (ASR) rules
block execution of
unnecessary system
features and built-in
living-off-the-land
binaries
SI.L2-3.14.4 Update malicious code
protection mechanisms
MDE platform and
signature updates are
Securing Microsoft 365 in GCC High | 2026.04.30
420

CMMC Practice NIST 800-171 Rev. 2
Control How MDE Satisfies It
managed by Microsoft
— no separate update
infrastructure required
ENVIRONMENT: COMMERCIAL
5.5.2 NIST SP 800-171 Rev. 3 Relevance
NIST SP 800-171 Rev. 3
Requirement How MDE Satisfies It
3.14.7 (Identify unauthorized use) MDE behavioral analytics and anomaly
detection surface unexpected process
execution, lateral movement, and data
exfiltration patterns
3.12.3 (Continuous monitoring) MDE Secure Score, device health
reports, and alert pipeline provide
continuous monitoring evidence
3.6.1 (Incident handling) MDE Incidents, automated
investigation, and the Microsoft
Defender portal provide the response
workflow
3.6.2 (Incident reporting) MDE incident timeline and audit log
satisfy documentation requirements;
exportable for security program
reviews
3.4.6 (Least functionality) Attack Surface Reduction (ASR) rules
block execution of unnecessary system
features and built-in living-off-the-land
binaries
Defender for Endpoint and the Endpoint Security baseline
421

NIST SP 800-171 Rev. 3
Requirement How MDE Satisfies It
3.14.4 (Malicious code updates) MDE platform and signature updates
are managed by Microsoft — no
separate update infrastructure required
LICENSE NOTE
GCC High: M365 E3 GCC High and M365 E5 GCC High both include
MDE Plan 2 — no separate license is required. Commercial: M365 E3
includes MDE Plan 1; M365 E5 includes MDE Plan 2, which adds full
EDR, automated investigation and response (AIR), and threat and
vulnerability management. For the full EDR capabilities described in this
chapter, Plan 2 (E5 or a standalone MDE add-on) is required. Verify your
license by checking Microsoft Defender > Settings > Endpoints >
Licenses.
5.5.3 Management Models: Intune MDM vs. MDE
Security Settings Management
Not every device that needs endpoint protection will be fully enrolled in Intune.
Workstations in isolated environments, servers, and machines belonging to users
without M365 licenses are common examples. MDE provides a second
management path — Security Settings Management — that allows these devices
to receive Endpoint Security policies from Intune without full MDM enrollment.
Compared to Intune-managed devices, three things are narrower for MDE-
managed:
• Policy scope — Endpoint Security only (Antivirus, Firewall, ASR, EDR).
No Configuration profiles, Compliance policies, App deployments, or
Platform Scripts.
• Targeting must use device groups — user-group assignments are silently
ignored. No error, no policy tip; the policy simply does not apply.
Securing Microsoft 365 in GCC High | 2026.04.30
422

• Identity surface — appears in Intune as Managed by: MDEwith a
synthetic Entra registration created automatically by MDE (Join Typeis
blank).
MDE-ATTACHED DEVICES SILENTLY IGNORE USER-GROUP
ASSIGNMENTS
If you assign an Endpoint Security policy to a user group, Intune-managed
devices receive it normally but MDE-attached devices receive nothing —
no error, no alert, no policy tip. The policy simply does not apply. Always
use device security groups when targeting MDE-attached machines, and
build the targeting around device groups from the start so a single OIB
Endpoint Security policy can reach every workstation in the tenant
regardless of management mode.
5.5.3.1 Licensing: per-user for client OS, subscription-level for
server OS
Client OS (Windows 10/11, macOS) — MDE P2 is a per-user license (standalone
or part of an E5 Security add-on). Assign it to a user account in the Microsoft 365
Admin Center; when that user signs into an onboarded device, the device consumes
one of the user's concurrent device slots (typically up to 5 per user). For kiosks,
shared workstations, and lab machines without a regular signed-in user, create a
service account as the licensing anchor.
Server OS (Windows Server, Linux) — Defender for Servers P1/P2 is purchased
and enabled at the Azure subscription level through Defender for Cloud. There is
no per-user assignment. Once the plan is enabled, server onboarding flows through
Defender for Cloud auto-provisioning (Azure VMs), Azure Arc (on-premises and
other clouds), or local script (servers that can't run Arc).
5.5.3.2 Onboarding paths
Device population Onboarding mechanism Where covered
Intune MDM-managed Intune EDR policy pushes
the sensor automatically
Onboarding Devices via
Intune below
MDE-managed
workstations
Local script, Group Policy,
or MECM
Onboarding MDE-
Attached Workstations
Defender for Endpoint and the Endpoint Security baseline
423

Device population Onboarding mechanism Where covered
below
MDE-managed servers Defender for Cloud auto-
provisioning (Azure Arc
for non-Azure servers)
Onboarding MDE-
Attached Servers below
Servers are also where the management surface diverges. Server-specific features
— vulnerability assessment, adaptive application controls, file integrity monitoring
— are managed in Azure portal → Defender for Cloud, not the Defender security
portal. The Defender security portal handles alert triage and device inventory for
both populations; Defender for Cloud handles server onboarding, licensing, and
infrastructure-security features.
5.5.3.3 Policy architecture
One Endpoint Security policy set covers all workstations — Intune-managed and
MDE-managed alike — because the settings are identical for both populations.
Most of those workstation policies also work on servers as-is; the ones that need a
dedicated Svr -variant are AV Configuration (different exclusions for SQL, IIS,
Exchange, AD DS NTDS/SYSVOL paths), Local Administrators (different
membership: Tier 1 server admins, not the workstation primary user), and Firewall
Rules (servers must allow inbound on service ports rather than blocking all
inbound).
Workstation Endpoint Security set
The workstation set has two parts: 9 OIB-shipped policies that import as Settings
Catalog JSON (8 surface under Endpoint Security; Cloud Kerberos Trust surfaces
under Settings Catalog and pairs with WHfB Configuration), and 3 manual
creations that must be authored once per tenant (the EDR onboarding blob is
tenant-specific; Exploit Protection and Device Control are tenant-customized
policies — Exploit Protection enforces process mitigations and the override
lockdown, Device Control is keyed to your approved hardware IDs — and neither
ships pre-packaged in OIB).
9 OIB Settings Catalog imports. Already in your tenant if you've completed the
OIB import process — see Open Intune Baseline Deployment for the step-by-step.
Assign these to the Workstations-ESdevice group, which contains both Intune-
managed and MDE-managed workstations:
1. Win - OIB - ES - Attack Surface Reduction - D - ASR Rules
Securing Microsoft 365 in GCC High | 2026.04.30
424

(L2)
2. Win - OIB - ES - Defender Antivirus - D - AV Configuration
3. Win - OIB - ES - Defender Antivirus - D - Security Experien
ce
4. Win - OIB - ES - Encryption - D - BitLocker (OS Disk)
5. Win - OIB - ES - Local Group Membership - D - Local Adminis
trators
6. Win - OIB - ES - Windows Firewall - D - Firewall Configurat
ion
7. Win - OIB - ES - Windows Hello for Business - D - WHfB Conf
iguration
8. Win - OIB - SC - Windows Hello for Business - D - Cloud Ker
beros Trust(skip for cloud-only tenants)
9. Win - OIB - ES - Windows LAPS - D - LAPS Configuration
DEFENDER AV UPDATE RINGS ARE LAYER 2, NOT LAYER 1
The OIB project ships three additional ES policies — Win - OIB - ES -
Defender Antivirus Updates - Ring 1 - Pilot, Ring 2 - UAT,
and Ring 3 - Production— for staged rollout of Defender signature
updates. These are not part of Layer 1. CMMC 3.14.4 (update malicious
code protection mechanisms) is satisfied by Defender's default automatic
signature update behavior, which works out of the box without any policy.
The three ring policies provide operational risk management (catch a bad
signature on pilot machines before fleet-wide rollout) — valuable for a
mature operation, but not compliance-mandatory and not required for an
MDE deployment to function. They live in Layer 2 (defense-in-depth) and
can be added in a follow-on engagement after the Layer 1 baseline operates
cleanly.
3 manual creations. Not in the OIB Settings Catalog import — author once per
tenant:
Policy Why manual Where documented
Win - Custom - ES - D
efender for Endpoint
Onboarding
Onboarding blob is tenant-
specific; cannot be pre-
packaged in OIB JSON
Step 2: Create an Endpoint
Detection & Response
Policy below; Appendix B
§ Defender for Endpoint
Defender for Endpoint and the Endpoint Security baseline
425

Policy Why manual Where documented
Win - Custom - ES - E
xploit Protection
Settings Catalog policy
enforcing DEP, ASLR,
SEHOP, CFG plus Disall
owExploitProtectionOv
erridefor tamper
protection; OIB does not
pre-package it
Appendix B § Exploit
Protection
Win - Custom - ES - D
evice Control / Remov
able Media
Device Control rules are
keyed to approved
hardware IDs unique to
each tenant; OIB cannot
pre-package the per-drive
identifiers
Appendix B § Removable
Media
Server Endpoint Security set — new policies to create
These three policies do not ship in OIB and must be created. Build each one from
the corresponding workstation policy as a starting point, then tune for server
workloads. Assign the new server policies to the Servers-ESdevice group:
Server policy (new) Server-specific tuning
Svr - OIB - ES - Defender Antivir
us - D - AV Configuration
Schedule scans during low-load windows.
Add Microsoft-documented exclusions for
the server roles in scope: SQL data files,
IIS application paths, Exchange databases,
AD DS NTDS/SYSVOL paths. The
exclusion list is the load-bearing reason
for the fork — applying the workstation
AV policy to a server with no exclusions
risks AV scanning live database files and
locking them mid-write.
Svr - OIB - ES - Local Group Memb
ership - D - Local Administrators
Membership differs from the workstation
version — Tier 1 server admins (and any
role-specific service accounts that
legitimately need local admin), not the
workstation's primary user. Satisfies
CMMC 3.1.5 Least Privilege on the server
tier.
Svr - OIB - ES - Firewall - D - F Servers accept inbound traffic on service
Securing Microsoft 365 in GCC High | 2026.04.30
426

Server policy (new) Server-specific tuning
irewall Rules ports (SQL 1433, IIS 80/443, AD DS
ports, etc.); workstation firewall blocks all
inbound. Author server firewall rules from
Microsoft's role-specific server firewall
guidance, not from the workstation
baseline.
Six of the workstation policies cover servers without forking — assign each to S
ervers-ESas a second target rather than authoring Svr -variants:
• Win - OIB - ES - Windows LAPS - D - LAPS Configuration—
manages the built-in Administratoraccount uniformly on workstations
and member servers. Exclude domain controllers from the assignment
(DCs manage their own admin accounts via AD, not LAPS).
• Win - OIB - ES - Defender Antivirus - D - Security Experien
ce— Tamper Protection enabled is the only load-bearing setting; the UI-
hiding settings are no-ops on headless Server Core but harmless on Server
with Desktop Experience.
• Win - OIB - ES - Attack Surface Reduction - D - ASR Rules—
server-safe in practice. Office-trigger rules (block Office child processes,
block macro injection, block JavaScript/VBScript from launching
downloaded content, etc.) become silent no-ops on servers without Office
or email clients; credential-stealing and persistence rules (block PSExec/
WMI process creation, block credential stealing from LSASS, block
persistence through WMI subscription) apply equally to both fleets.
• Win - OIB - ES - Defender for Endpoint - D - EDR— the EDR
onboarding blob is tenant-specific, not fleet-specific. Assignment-only
difference. (For MDE-Attached servers that aren't Intune-managed,
onboarding flows through Defender for Cloud instead — see Onboarding
MDE-Attached Servers.)
• Win - Custom - ES - Exploit Protection— server-safe on modern
Microsoft server roles.
• Win - Custom - ES - Device Control / Removable Media—
applies on branch-office, retail, and industrial-floor servers; skip on
datacenter racks (no physical access).
Fork to a separate Svr -variant only when you've identified a concrete tuning
need:
• legacy line-of-business binary that breaks under mandatory ASLR (Exploit
Protection)
Defender for Endpoint and the Endpoint Security baseline
427

• distinct approved-drive list or ops group for server maintenance USBs, or
separate Defender custom-detection rules for server alerting (Device
Control)
• 24H2+ Server SKU where you want Automatic Account Management and
built-in Administratordisable behavior of the (24H2+) LAPS+LSP pair
(LAPS)
• audit-only rollout of selected ASR rules on servers for change-management
caution, or an allow-list for a server workload that conflicts with a specific
rule (ASR Rules)
• Tamper Protection or notification posture that should be different on
servers vs. workstations (Security Experience — rare)
Forks are mechanical when the time comes — copy the workstation policy, retarget
the assignment, change the differing settings.
Optionally, depending on your server estate:
Optional server policy When to create it
Svr - OIB - ES - Encryption - D -
BitLocker
Physical servers only. Azure VMs are
encrypted at the platform layer (Azure
Storage Service Encryption plus optional
Azure Disk Encryption); a duplicate
BitLocker policy is redundant in cloud-
only deployments. Server BitLocker
content also differs from workstation:
TPM-only protector (no startup PIN, so
unattended reboots work) and Fixed Data
Drive encryption for any data volumes
hosting CUI.
The non-ES OIB policies (Configuration, Compliance, Apps, Scripts) keep their
existing assignments and are naturally scoped to Intune-managed devices — MDE-
managed devices cannot accept these policy types regardless of how they're
targeted.
5.5.3.4 Onboarding MDE-Attached Workstations
Since these devices are not enrolled in Intune, you cannot use the Intune EDR
policy to push the onboarding package. Pick the deployment mechanism that fits the
fleet: local script for ad-hoc and small groups, Group Policy for domain-joined
estates, or MECM for environments with an existing ConfigMgr infrastructure. All
three paths produce the same end state.
Securing Microsoft 365 in GCC High | 2026.04.30
428

Prerequisites (all paths)
1. MDE P2 license assigned to a user account. For kiosk or shared machines
with no regular signed-in user, create a dedicated licensing-anchor service
account and assign the P2 license to it.
2. In the Defender portal, Settings → Endpoints → Advanced features,
ensure Microsoft Intune connection is on (this is what makes MDE-
attached devices appear in Intune for Security Settings Management).
3. In Intune, Endpoint security → Microsoft Defender for Endpoint,
ensure Allow Microsoft Defender for Endpoint to enforce Endpoint
Security configurations is turned on.
4. Confirm the correct tenant cloud before downloading any package — secu
rity.microsoft.usfor GCC High, security.microsoft.comfor
Commercial. A GCC High tenant that runs a Commercial-downloaded
package will fail at the discovery stage every time.
Path A: Local onboarding script
Best for small populations, lab machines, and one-off fixes.
1. Open the Defender portal and go to Settings → Endpoints →
Onboarding.
2. Select the operating system (Windows 10/11).
3. Select deployment method Local script (for up to 10 machines).
4. Click Download onboarding package — a .zipcontaining WindowsDefe
nderATPLocalOnboardingScript.cmd.
5. Copy the .cmdto the target workstation and run it from an elevated
command prompt. The script writes the onboarding blob to the registry
and starts the sensor.
6. Verify on the device within 10–15 minutes:
◦ Get-MpComputerStatusshows AMRunningMode = Normaland O
nboardingState = 1.
◦ Event log Microsoft-Windows-SENSE/Operationalshows
event ID 5 ("Onboarded to Microsoft Defender for Endpoint").
7. Verify in the Defender portal (Device inventory) within 15–30 minutes:
the device appears with Sensor health = Active.
Path B: Group Policy
Best for domain-joined fleets where machines are not Entra-joined and not in
Intune.
1. Download the onboarding package as in Path A, but select deployment
Defender for Endpoint and the Endpoint Security baseline
429

method Group Policy.
2. The .zipcontains WindowsDefenderATPOnboardingScript.cmdand a
structured folder. Extract to a domain controller share readable by Domain
Computers (e.g., \\dc01\netlogon\MDE\).
3. In Group Policy Management, create or edit a GPO scoped to the target OU
(workstations only — do not mix with server OUs).
4. Navigate to Computer Configuration → Preferences → Control Panel
Settings → Scheduled Tasks. Create an immediate task that runs Windows
DefenderATPOnboardingScript.cmdas SYSTEM. A scheduled task is
more reliable than a startup script because it executes without waiting for a
reboot.
5. Link the GPO to the workstation OU and force an update: gpupdate /for
ceon a pilot machine.
6. Verify on the device with the same checks as Path A.
7. Confirm tenant-wide rollout by watching the Defender portal Device
inventory count climb over the next 24 hours as machines pick up the GPO
on their next policy cycle.
Path C: Microsoft Endpoint Configuration Manager (MECM)
Best for environments with an existing ConfigMgr infrastructure, particularly large
Windows fleets with mixed server and workstation populations.
1. Download the onboarding package as in Path A, but select deployment
method System Center Configuration Manager (current branch) or
Microsoft Endpoint Configuration Manager. This produces a .zip
tuned for MECM deployment.
2. In the MECM console, navigate to Assets and Compliance → Endpoint
Protection → Microsoft Defender ATP Policies.
3. Select Create Microsoft Defender ATP Policy and import the .onboardi
ngfile from the downloaded package.
4. Configure the policy settings: set Sample sharing to None (CMMC best
practice), leave telemetry reporting at default, save the policy.
5. Deploy the policy to a device collection containing the target workstations.
Use a pilot collection first before rolling to production collections.
6. Monitor deployment status in Monitoring → Deployments until the policy
shows compliant across the pilot collection.
7. Verify on individual devices with the same checks as Path A, and verify
fleet-wide appearance in the Defender portal's Device inventory.
Convergence point (all paths)
Regardless of the onboarding mechanism, once the sensor is reporting, the device
Securing Microsoft 365 in GCC High | 2026.04.30
430

appears in two places:
• Defender portal → Device inventory — with Sensor health = Active and
Onboarding state = Onboarded.
• Intune → Devices → All devices — with Managed by = MDE (not
Intune).
At that point, add the device to the Workstations-ESEntra device group (via
dynamic rule or manual assignment) and the Win - OIB - ES - *policy set
applies automatically — the same canonical OIB Endpoint Security set already
targeting your Intune-managed workstations. No further per-device action is
required, and no separate MDE-only policy set is needed.
5.5.3.5 Onboarding MDE-Attached Servers
Servers follow a different onboarding path through Defender for Cloud:
1. Azure portal → Defender for Cloud → Environment settings →
[subscription]
2. Enable Defender for Servers Plan 1 or Plan 2 on the subscription
3. For Azure VMs: Defender for Cloud auto-provisions the MDE agent — no
manual action needed
4. For on-premises or other cloud servers: install the Azure Arc agent first to
connect the server to Azure, then Defender for Cloud auto-provisions MDE
through Arc
5. For servers that cannot run Arc: use the local onboarding script from the
Defender portal (same as workstations)
Once onboarded, the server appears in both the Defender portal (device inventory)
and Intune (Managed by: MDE). The Endpoint Security policies assigned to the Se
rvers-ESdevice group — both the forked Svr -set and the workstation policies
Defender for Endpoint and the Endpoint Security baseline
431

that target both groups — apply automatically.
DEFENDER FOR CLOUD VS. DEFENDER PORTAL — WHICH
MANAGES WHAT?
Both portals show the same servers, but they serve different purposes:
Portal What it manages
Defender portal (security.micros
oft.us)
Alerts, incidents, device inventory,
threat hunting — the SOC/security
operations view
Defender for Cloud (Azure portal) Server onboarding, licensing,
vulnerability assessment, adaptive
application controls, file integrity
monitoring, regulatory compliance
dashboard — the infrastructure
security view
Intune Endpoint Security policy assignment
— Antivirus, Firewall, ASR, EDR
only
You do not need to choose between them. Defender for Cloud handles
onboarding and server-specific security features. The Defender portal
handles alert triage and investigation. Intune handles policy delivery via
Security Settings Management.
5.5.4 Portal & Tenant Endpoints
ENVIRONMENT: GCC HIGH
GCC High MDE operates on the US Government sovereign cloud. The portal
and all telemetry remain within the US Government cloud boundary.
Securing Microsoft 365 in GCC High | 2026.04.30
432

Value
Portal https://security.microsoft.us
Onboarding package endpoint *.security.microsoft.us
Data residency United States (FedRAMP High
boundary)
SIEM / Streaming API Event Hub or Sentinel — GCC High
workspace required
Tenant verification: In the Defender portal, navigate to Settings >
Endpoints > General > About. Confirm Cloud shows US Government.
ENVIRONMENT: COMMERCIAL
Value
Portal https://security.microsoft.com
Onboarding package endpoint *.security.microsoft.com
Data residency Per your M365 tenant geography
SIEM / Streaming API Event Hub or Sentinel — any
workspace
5.5.5 Onboarding Devices via Intune
For Intune-managed devices, the recommended onboarding method is Intune
MDM — no scripts, no GPO, no manual package distribution. Intune deploys the
MDE sensor directly through the Endpoint Security policy.
Defender for Endpoint and the Endpoint Security baseline
433

5.5.5.1 Step 1: Enable the MDE–Intune Integration
ENVIRONMENT: GCC HIGH
1. Sign in to https://security.microsoft.uswith a Global Admin
or Security Admin account
2. Navigate to Settings > Endpoints > Advanced features
3. Enable Microsoft Intune connection
4. Save
ENVIRONMENT: COMMERCIAL
1. Sign in to https://security.microsoft.com
2. Navigate to Settings > Endpoints > Advanced features
3. Enable Microsoft Intune connection
4. Save
Once connected, Intune and the Defender portal share device state — compliance
policies can reference MDE risk levels, and Intune shows the MDE onboarding
status per device.
5.5.5.2 Step 2: Create an Endpoint Detection & Response Policy
• Navigate to Intune > Endpoint security > Endpoint detection and
response > Create policy
• Platform: Windows 10, Windows 11, and Windows Server
• Profile: Endpoint detection and response
Setting Value Reason
Microsoft Defender for
Endpoint client
configuration package
type
Auto from connector Intune retrieves the
onboarding blob
automatically from the
MDE–Intune connector;
stays current if Microsoft
rotates the onboarding
payload. Pick plain
Securing Microsoft 365 in GCC High | 2026.04.30
434

Setting Value Reason
Onboard only if the
connector is unavailable,
and fix the connector rather
than pasting a manual blob
that will drift out of date
Sample sharing None CMMC best practice.
Automated investigation's
submission of suspect files
can inadvertently send CUI
to Microsoft Commercial
analysis infrastructure.
Sample sharing must be off
for CUI-scoped tenants
[Deprecated] Telemetry
reporting frequency
Not configured Deprecated setting.
Configuring it in GCC
High produces persistent
error states in the Intune
policy assignment report.
Leave unconfigured
• Assign to All Devices (or your managed device group)
5.5.5.3 Step 3: Verify Onboarding
Allow 15–30 minutes after policy assignment for devices to check in and onboard.
In the Defender portal:
• Navigate to Assets > Devices
• Onboarded devices appear with a Sensor health of Active
• Devices show Onboardedin the Onboarding state column
In Intune:
• Navigate to Intune > Devices > [device] > Endpoint security
• Microsoft Defender for Endpoint shows Onboarded
On-device verification:
Get-Service -Name Sense | Select-Object Status, StartType
Defender for Endpoint and the Endpoint Security baseline
435

Statusshould be Running, StartTypeshould be Automatic.
5.5.6 Key Policies
5.5.6.1 Tamper Protection
Tamper Protection prevents local administrators, malware, and scripts from
disabling MDE components (real-time protection, behavior monitoring, cloud-
delivered protection). Enable this before any other MDE configuration.
• Navigate to Intune > Endpoint security > Antivirus > Create policy
• Platform: Windows 10, Windows 11
• Profile: Microsoft Defender Antivirus
Setting Value
Allow Tamper Protection Allowed
Turn on cloud-delivered protection Enabled
Cloud-delivered protection level High
Turn on real-time protection Enabled
DO NOT MANAGE TAMPER PROTECTION VIA SETTINGS CATALOG
Tamper Protection can only be reliably managed through the Endpoint
Security > Antivirus profile. If configured via Settings Catalog at the same
time, conflicts will result and Intune marks the setting as Conflict —
leaving the device in an indeterminate state.
5.5.6.2 Attack Surface Reduction (ASR) Rules
ASR rules block specific high-risk behaviors that malware commonly exploits —
Office macros launching child processes, credential scraping, script obfuscation —
without requiring signature updates.
The OIB ships a pre-configured ASR policy (Win - OIB - ES - Attack Surfac
Securing Microsoft 365 in GCC High | 2026.04.30
436

e Reduction - D - ASR Rules (L2)) covering 18 rules. For the complete rule
list and configured modes, see Attack Surface Reduction in the Appendix. This
section covers the enforcement mode progression and the rules that require
judgment before deploying.
Enforcement Modes
Mode Behavior Appropriate State
Audit Behavior is allowed; event
logged silently
Initial deployment
validation only — 2–4
weeks to surface
compatibility issues. Never
a permanent production
state for high-value rules
Warn Behavior is blocked; user
sees a notification and can
choose to allow it once
Intermediate state for rules
where legitimate use is
possible but needs
visibility before
committing to Block
Block Behavior is terminated
silently; no user override
Target production state for
all managed devices
Deploy new ASR rules in Audit for 2–4 weeks, advance to Warn to confirm block
behavior with user visibility, then promote to Block. Audit and Warn events both
appear in Defender portal > Reports > Attack surface reduction rules and in the
Windows Event Log (Event ID 1121 = blocked/warned, 1122 = audited).
POLICY CONFLICT RESOLUTION: BLOCK BEATS WARN BEATS
AUDIT
When multiple Intune policies target the same device with different modes
for the same ASR rule, the strictest mode wins — Block overrides Warn,
Warn overrides Audit. The weaker policy is silently overridden; its events
continue to be logged, but the enforced behavior is the stricter value. Verify
no higher-priority policy is silently promoting your Audit or Warn rules to
Block before concluding your validation period.
Defender for Endpoint and the Endpoint Security baseline
437

Rules Requiring Judgment
Most OIB rules ship at Block and need no customization. The rules below ship at
Warn or Audit because the OIB acknowledges legitimate compatibility impact or
higher false positive risk.
Rule OIB Mode Rationale
Block all Office
applications from creating
child processes
Block Highest-value rule — stops
macro-launched malware.
Has a known OAuth
compatibility impact in
thick-client Outlook; see
the note below
Block Office
communication application
from creating child
processes
Warn Affects Outlook OAuth
flows and Teams
integrations. OIB ships at
Warn — the user can
override once — rather
than Block, to surface
impacted workflows during
the validation period before
committing to full
enforcement
Block executable files by
prevalence, age, or trusted
list
Audit High false positive rate for
custom or legacy line-of-
business applications.
Validate thoroughly before
promoting to Warn or
Block
Block rebooting machine
in Safe Mode
Audit Administrators legitimately
use Safe Mode for recovery
and troubleshooting.
Evaluate operational
impact before promoting
Enable Controlled Folder
Access
Audit Mode Protects Documents,
Desktop, and other
common folders from
unauthorized writes —
effective ransomware
mitigation. Ships at Audit
because many legitimate
applications write to
Securing Microsoft 365 in GCC High | 2026.04.30
438

Rule OIB Mode Rationale
protected folders. Identify
and exclude affected apps
Defender for Endpoint and the Endpoint Security baseline
439

Rule OIB Mode Rationale
before promoting to Block
Securing Microsoft 365 in GCC High | 2026.04.30
440

BLOCK OFFICE CHILD PROCESSES BREAKS OAUTH IN THICK-
CLIENT OUTLOOK — RESOLVE BY WORKFLOW CHANGE, NOT
POLICY WEAKENING
When Block all Office applications from creating child proc
essesis set to Block, Outlook cannot spawn the WebView2 child process
it requires to display OAuth authentication popups. Adding any OAuth-
authenticated external account — Gmail, Google Workspace, third-party
calendar connectors — in classic Outlook silently fails. The authentication
window never opens.
Why it breaks: Outlook's "Add Account" flow for modern-auth providers
launches WebView2 as a child process to render the OAuth consent screen.
The ASR rule terminates this at the OS level before WebView2 initializes,
so the failure appears unrelated to any policy — and only manifests on
managed devices where Block mode is active.
The correct response is a decision, not a workaround. This rule is one of
the highest-value ASR controls because it directly blocks macro-launched
malware — a primary delivery mechanism for ransomware and credential
stealers. Weakening the rule in response to a compatibility complaint is not
an acceptable permanent state for any managed device environment.
Before relaxing the rule, ask the workflow question first:
Option 1 — Workflow change (preferred): Access Gmail in a browser.
This achieves the same user outcome without weakening the device's
security posture. For environments processing regulated or sensitive data,
this is the strongly recommended path: connecting a personal Gmail
account to the same thick-client Outlook instance that handles sensitive
business mail creates a commingling risk — the same application window,
clipboard, and attachment handling context for both regulated and personal
data. The ASR rule is surfacing a workflow that should not exist on a
managed device in the first place.
Option 2 — ASR rule exclusion (if business-justified): If connecting an
OAuth provider to thick-client Outlook is a genuine, documented business
requirement approved by the security team, add Outlook to the per-rule
exclusion list rather than changing the rule mode. This is narrower than
Warn or Audit — it allows only Outlook to spawn child processes while the
rule remains enforced for Word, Excel, PowerPoint, and all other Office
apps.
Defender for Endpoint and the Endpoint Security baseline
441

• Navigate to Intune > Endpoint security > Attack surface
reduction > [your ASR policy] > Edit
• Under Attack Surface Reduction Only Exclusions, add:
%ProgramFiles%\Microsoft Office\root\Office16\OUTLOOK.EXE
Note: exclusions apply to all rules in that policy, not a single rule.
To limit scope, isolate the child-process rules into their own ASR
policy and add the exclusion only there.
Option 3 — Warn mode (structured validation): The OIB ships Block
Office communication application from creating child proces
sesat Warn for exactly this reason — users can override once, which
surfaces the workflow in your Audit logs without leaving the rule entirely
unenforced. Use Warn as a time-limited validation step, not a permanent
state. Audit mode (fully allow + log) is appropriate only during initial
deployment and is a finding if used as a long-term configuration for a high-
value rule.
5.5.6.3 EDR in Block Mode
EDR in Block Mode enables MDE to remediate detections even when a third-party
antivirus product is the primary AV. For environments running only MDE as the
AV (the typical Intune-managed posture), this provides an additional remediation
layer for post-breach detections.
• In the Endpoint detection and response policy (Step 2 above), set:
◦ EDR in block mode: Enabled
5.5.7 Microsoft Sentinel Integration
For organizations operating a SOC or requiring a SIEM for continuous monitoring
(GCC High: CA.L2-3.12.3 / Commercial: NIST SP 800-171 Rev. 3 3.12.3), MDE
integrates natively with Microsoft Sentinel.
Securing Microsoft 365 in GCC High | 2026.04.30
442

5.5.7.1 Connection Method
ENVIRONMENT: GCC HIGH
1. In Microsoft Sentinel (Azure Government), navigate to Content hub
and install the Microsoft Defender XDR solution
2. Navigate to Data connectors > Microsoft Defender XDR
3. Connect — Sentinel begins ingesting MDE incidents, alerts, and
device events into the SecurityIncident, SecurityAlert, and Dev
iceEventstables
4. Confirm data is flowing: run DeviceEvents | take 10in the Log
Analytics workspace
GCC HIGH SENTINEL WORKSPACE REQUIREMENT
The Sentinel workspace must be in Azure Government (azure.us)
to receive data from the GCC High MDE tenant. A Commercial
Azure workspace cannot receive GCC High telemetry.
ENVIRONMENT: COMMERCIAL
1. In Microsoft Sentinel, navigate to Content hub and install the
Microsoft Defender XDR solution
2. Navigate to Data connectors > Microsoft Defender XDR
3. Connect — Sentinel begins ingesting MDE incidents, alerts, and
device events
4. Confirm: run DeviceEvents | take 10in Log Analytics
Defender for Endpoint and the Endpoint Security baseline
443

ENVIRONMENT: GCC HIGH
5.5.7.2 Key Tables for CMMC Audit Evidence
Table Contains CMMC Use
SecurityIncident MDE incidents
(aggregated alerts)
IR.L2-3.6.2 incident
documentation
SecurityAlert Individual MDE alerts CA.L2-3.12.3 monitoring
evidence
DeviceEvents Process creation, file
events, network
connections
SI.L2-3.14.7
unauthorized use
detection
DeviceLogonEvents Interactive and remote
logons per device
IA.L2-3.5.1
identification evidence
DeviceNetworkEvents Outbound/inbound
connections
SC.L2-3.13.1 network
boundary monitoring
ENVIRONMENT: COMMERCIAL
5.5.7.3 Key Tables for Security Program Evidence
Table Contains NIST SP 800-171 Rev.
3 Use
SecurityIncident MDE incidents
(aggregated alerts)
3.6.2 — incident
documentation
SecurityAlert Individual MDE alerts 3.12.3 — continuous
monitoring evidence
DeviceEvents Process creation, file
events, network
connections
3.14.7 — unauthorized
use detection
Securing Microsoft 365 in GCC High | 2026.04.30
444

Table Contains NIST SP 800-171 Rev.
3 Use
DeviceLogonEvents Interactive and remote
logons per device
3.5.1 — user
identification evidence
DeviceNetworkEvents Outbound/inbound
connections
3.13.1 — network
boundary monitoring
5.5.7.4 Recommended Workbook
The Microsoft Defender for Endpoint workbook (available in Sentinel's
Workbooks gallery) provides a pre-built dashboard covering device health, alert
trends, and ASR rule hits — useful for periodic security reviews and as evidence of
continuous monitoring for compliance assessments and security program
documentation.
5.6 M365 Apps Deployment via ODT
5.6.1 Why Not the Built-In M365 Apps Policy?
Intune includes a pre-built Microsoft 365 Apps for Windows app type that appears
to be the obvious choice. In practice, it is the most common source of deployment
failures in Intune environments. Its limitations:
Limitation Impact
Cloud-streamed install Requires uninterrupted connectivity to the
Office CDN for the full install duration.
Any interruption fails the deployment
silently.
No app exclusions Installs the full suite including Access,
Publisher, and Skype for Business — apps
most organizations do not want.
No update channel control Cannot reliably target Monthly Enterprise
Channel or Semi-Annual Enterprise
M365 Apps Deployment via ODT
445

Limitation Impact
Channel at deploy time.
Weak detection logic Uses a simple file-presence check; does
not validate version, channel, or activation
state.
No retry granularity Failures surface as generic 0x80070005
errors with no actionable log path for the
end user or helpdesk.
Conflicts with existing Office Does not handle the uninstall of prior
Office versions; installs on top and
produces licensing conflicts.
The Office Deployment Tool (ODT) approach packages the install as a Win32
app, giving full control over app selection, update channel, architecture, and
detection — and leverages the Intune Management Extension's retry and logging
engine.
5.6.2 ODT Prerequisites
Tool Source
Office Deployment Tool (setup.exe) Microsoft Download Center — Office
Deployment Tool
IntuneWinAppUtil.exe GitHub — microsoft/Microsoft-
Win32-Content-Prep-Tool — download
the "Source code" zip from the latest
release; despite the label, it contains the
compiled binary
Office Customization Tool (web) config.office.com — generates the config
uration.xml
A workstation with internet access and local administrator rights is sufficient. No
SCCM infrastructure is required.
Securing Microsoft 365 in GCC High | 2026.04.30
446

5.6.3 Step 1: Create the Configuration XML
Use the Office Customization Tool at config.office.com to generate a configurat
ion.xmltailored to the organization. Key decisions:
Suite and Apps
• Select only the apps the organization needs. For most organizations: Word,
Excel, PowerPoint, Outlook, Teams, OneNote. Explicitly exclude
Access, Publisher, Groove, Lync, and Skype for Business.
Update Channel
• Monthly Enterprise Channel — updates once per month on a predictable
schedule. Recommended for most organizations requiring stability without
a 6-month lag.
• Semi-Annual Enterprise Channel — maximum stability, updates in
January and July. Required by some compliance programs.
• Avoid "Current Channel" for managed corporate devices; it updates
multiple times per month with no predictability.
Architecture
• Always select 64-bit. 32-bit Office is only warranted for legacy COM add-
ins; new deployments have no reason to use it.
Language
• Set a primary language matching the OS locale. Include MatchPreviousMa
tchas a fallback if re-deploying to existing machines with mixed language
installs.
Remove existing versions
• Enable Remove all MSI versions of Office if any users have Office 2016/
2019 MSI still installed. This runs an automated uninstall before the new
install begins.
Shared Computer Activation
• Enable for AVD session hosts and any shared workstation scenario. Do not
enable for personal assigned devices.
A minimal example targeting Monthly Enterprise Channel, 64-bit, core apps only:
M365 Apps Deployment via ODT
447

<Configuration>
<Add OfficeClientEdition="64" Channel="MonthlyEnterprise" AllowCdnFallbac
k="TRUE">
<Product ID="O365ProPlusRetail">
<Language ID="en-us" />
<ExcludeApp ID="Access" />
<ExcludeApp ID="Groove" />
<ExcludeApp ID="Lync" />
<ExcludeApp ID="Publisher" />
<ExcludeApp ID="Bing" />
</Product>
</Add>
<Updates Enabled="TRUE" Channel="MonthlyEnterprise" />
<RemoveMSI />
<Display Level="None" AcceptEULA="TRUE" />
<Property Name="FORCEAPPSHUTDOWN" Value="TRUE" />
</Configuration>
ALLOWCDNFALLBACK
AllowCdnFallback="TRUE"allows the installer to pull from the Office
CDN if a local source is not available. This is appropriate for cloud-native
deployments. Remove it only if you are sourcing from an on-premises file
share.
Save the file as configuration.xml.
5.6.4 Step 2: Build the Package Folder
Create a clean working folder — for example, C:\ODT-Package\— and place the
following inside it:
C:\ODT-Package\
├── setup.exe          ← the Office Deployment Tool binary
└── configuration.xml  ← your config from Step 1
Donot pre-download the Office source files into this folder. The installer will
stream from the CDN at install time on each target device. Pre-downloading (~4
GB) is only necessary for fully air-gapped environments.
5.6.5 Step 3: Package as a Win32 App (.intunewin)
Run IntuneWinAppUtil.exe to wrap the package folder into an .intunewinfile:
Securing Microsoft 365 in GCC High | 2026.04.30
448

IntuneWinAppUtil.exe -c "C:\ODT-Package" -s setup.exe -o "C:\Output"
Flag Value
-c Source folder containing all package files
-s The setup file that Intune will execute
(always setup.exefor ODT)
-o Output folder for the resulting .intunewi
nfile
This produces setup.intunewinin C:\Output\. The file is AES-256 encrypted
and ready for upload.
5.6.6 Step 4: Upload to Intune
1. Navigate to Intune > Apps > Windows > Add
2. Select App type: Windows app (Win32)
3. Upload setup.intunewin
5.6.6.1 App Information
Field Value
Name Microsoft 365 Apps — Monthly Ente
rprise(or match your channel)
Publisher Microsoft
Description Brief description noting the channel and
excluded apps
Logo Download from Microsoft's brand portal
5.6.6.2 Program (Install / Uninstall Commands)
Install command:
setup.exe /configure configuration.xml
M365 Apps Deployment via ODT
449

Uninstall command:
setup.exe /uninstall O365ProPlusRetail /config configuration.xml
• Install behavior: System
• Device restart behavior: App install may force restart — set to Determine
behavior based on return codes
• Return codes: Accept defaults (0= Success, 1707= Success, 3010= Soft
reboot, 1641= Hard reboot, 1618= Retry)
5.6.6.3 Requirements
Setting Value
Operating system architecture 64-bit
Minimum OS Windows 10 21H2 or later
5.6.6.4 Detection Rule
Use a Registry detection rule — more reliable than a file-presence check.
Field Value
Rule type Registry
Key path HKEY_LOCAL_MACHINE\SOFTWARE\Micro
soft\Office\ClickToRun\Configurat
ion
Value name VersionToReport
Securing Microsoft 365 in GCC High | 2026.04.30
450

Field Value
Detection method Key exists
WHY REGISTRY AND NOT FILE DETECTION?
The VersionToReportkey is written by the Office Click-to-Run service
only after a successful activation. A file-presence check (winword.exe)
can return a false positive if a prior broken install left files on disk. The
registry key confirms the Click-to-Run service is healthy.
5.6.6.5 Dependencies and Supersedence
• Dependencies: None required if Company Portal is deployed separately
(see below).
• Supersedence: If replacing an older version of this same app, configure
supersedence here rather than deploying alongside it. Set the older app to
Uninstall under supersedence behavior.
5.6.7 Step 5: Assign and Monitor
Assign the app to a device group (not a user group) using Required intent. Using a
device group ensures installation occurs during the Enrollment Status Page (ESP)
before the first user signs in.
DO NOT USE AVAILABLE INTENT FOR M365 APPS
"Available" intent publishes the app in Company Portal for self-service
install. M365 Apps should be treated as a required baseline, not an optional
user-initiated install. Users who accidentally uninstall from Company
Portal will have the app reinstalled automatically on the next Intune sync if
Required intent is set.
Monitoring: Navigate to Intune > Apps > Windows > [App Name] > Device
install status. Common failure codes and their meaning:
M365 Apps Deployment via ODT
451

Code Meaning Resolution
0x87D1041C App not detected after
install — detection rule
mismatch
Verify registry key path
and value name
0x80070005 Access denied during
install
Confirm Install behavior
is set to System, not User
0x80073D02 In-use files blocked the
install
Set FORCEAPPSHUTDOWNto
TRUEin configuration.xml
0x800704C7 Install cancelled by user Install behavior must be
System; user cannot cancel
a system-context install
For detailed logs, review %ProgramData%\Microsoft\IntuneManagementExtens
ion\Logs\IntuneManagementExtension.logand C:\Windows\Temp\ODT-*.lo
gon the target device.
5.6.8 Company Portal Deployment
The Company Portal app should be deployed before M365 Apps as part of the
Enrollment Status Page (ESP) device phase.
Add Company Portal via Intune > Apps > Windows > Add > Microsoft Store
app (new) and search for Company Portal. This uses the WinGet-based Microsoft
Store integration and does not require manual package management.
If the Store integration is unavailable, download the Company Portal .appxbundle
offline and sideload it via a Win32 wrapper using Add-AppxPackage.
Alternatively, sync Company Portal as a built-in app under Tenant Administration
Securing Microsoft 365 in GCC High | 2026.04.30
452

> Customization > Company Portal.
ESP ORDERING
In the Enrollment Status Page profile, set Company Portal as a tracking
app in the Device Setup phase. This ensures the device is not handed to the
user until Company Portal is installed and the user has a consistent self-
service experience from first login.
5.6.9 Update Channel Management Post-
Deployment
After deployment, the update channel is governed by the Office Update policy in
Intune, not by re-deploying the package. To change or enforce the channel:
1. In Intune, navigate to Apps > App configuration policies > Add >
Managed devices
2. Target Windows 10/11 and select Microsoft 365 Apps
3. Set Channelunder the Update settings group
Alternatively, use an Administrative Template (ADMX) policy:
• Path: User Configuration > Administrative Templates > Microso
ft Office 2016 > Updates
• Setting: Update Channel → set to MonthlyEnterprise(or the
appropriate channel GUID)
Do not rely on the configuration.xmlchannel setting to enforce updates post-
install; it only applies at install time. The Intune policy or ADMX setting is what
governs ongoing update behavior.
5.7 Intune RBAC & Governance
A well-functioning Intune environment has three properties: admins can only touch
what they own, policies land on the right devices, and the audit trail is clean. Most
disorganized environments have the same root cause — everything deployed under
a single scope, too many admins with full Intune Administrator rights, and no
Intune RBAC & Governance
453

tagging taxonomy established before deployment began. This chapter addresses all
three.
5.7.1 The Three-Layer Model
Intune delegation is built on three interlocking concepts. They must all be
configured together — any one alone is incomplete.
Layer What It Controls Configured In
Role What actions an admin can
perform (read, create,
update, delete, remote
actions)
Intune > Tenant
administration > Roles
Role Assignment Which admins get the role,
and which scope tags they
can see
Attached to each Role
Scope Tag Which objects (devices,
policies, apps) an admin
can see and act on
Applied to each object
The consequence: an admin with a role assignment scoped to Scope Tag: Financ
ecan only see devices, policies, and apps tagged Finance— even if they have full
permissions within that scope. A policy with no scope tag (or the default All Devi
cestag) is visible to every admin. A disorganized environment typically has
most objects on All Devicesand most admins at Intune Administrator — fix
the tags first, then tighten the roles.
5.7.2 Scope Tag Taxonomy
Define the taxonomy before applying any tags. Retrofitting tags onto a live
environment is possible but disruptive — policies reassigned to a new scope tag
disappear from admins who had been managing them under All Devices.
Securing Microsoft 365 in GCC High | 2026.04.30
454

5.7.2.1 Recommended Starting Taxonomy
Scope Tag Covers Managed By
All Devices(default) Tenant-wide policies that
apply to every device
Senior IT / Intune Owner
IT-Operations IT staff devices, admin
workstations
IT Operations team
Corporate-Standard General workforce devices Helpdesk / Level 2
Executives Executive devices with
tighter restrictions
Senior IT only
Kiosk-Shared Shared PC / kiosk devices Helpdesk
Adjust to match your organizational structure. The goal is that no scope tag covers
more than one team's operational boundary — if two teams share a scope tag, one
of them can accidentally modify or delete the other's work.
5.7.2.2 What Must Be Tagged
Every object that an admin manages must carry a scope tag. Objects with no
explicit tag default to All Devicesand are visible to all Intune-scoped admins.
Work through this checklist after establishing your taxonomy:
Object Type Where to Apply Tags
Devices Automatic via dynamic Entra group +
scope tag assignment, or manual
Configuration profiles Intune > Devices > Configuration >
[profile] > Properties > Scope tags
Compliance policies Intune > Devices > Compliance > [policy]
> Properties > Scope tags
Apps (required and available) Intune > Apps > All apps > [app] >
Properties > Scope tags
Update rings Intune > Devices > Windows > Update
rings > [ring] > Properties > Scope tags
Intune RBAC & Governance
455

Object Type Where to Apply Tags
Scripts and remediations Intune > Devices > Scripts > [script] >
Properties > Scope tags
APP SCOPE TAGS ARE THE MOST COMMONLY MISSED
Configuration profiles and compliance policies get tagged early; apps are
often left on All Devicesbecause they were deployed before the
taxonomy existed. An Intune admin scoped to Corporate-Standardwho
cannot see the M365 Apps deployment cannot troubleshoot an app
installation failure on a device they own. Audit app scope tags separately
from policy scope tags.
5.7.3 Custom Roles
The built-in Intune Administrator role grants full read/write access across all
devices, policies, and apps in the tenant. It is appropriate for the one or two people
who own the Intune configuration — not for helpdesk staff or department-level
admins. The three custom roles below cover the most common delegation scenarios.
5.7.3.1 Role: Helpdesk
Helpdesk staff need to remotely assist users and run device actions. They do not
need to create or modify policies.
Permission Category Access
Managed devices Read, Retire, Wipe, Sync, Reboot, Remote
lock, Reset passcode, Update device
category
Remote tasks Remote lock, Sync, Reboot, Custom
notifications
Apps Read only
Policies / Configuration profiles Read only
Securing Microsoft 365 in GCC High | 2026.04.30
456

Permission Category Access
Reports Read
Role assignment scope: Corporate-Standardand Kiosk-Shared— not IT-Ope
rationsor Executivesunless explicitly required.
5.7.3.2 Role: Policy Admin
Policy Admins own configuration profiles and compliance policies for their scope.
They cannot deploy or modify apps and cannot perform device wipe or retire
actions.
Permission Category Access
Managed devices Read, Sync
Configuration profiles Read, Create, Update, Delete, Assign
Compliance policies Read, Create, Update, Delete, Assign
Scripts and remediations Read, Create, Update, Delete, Assign
Apps Read only
Remote tasks Sync only
5.7.3.3 Role: App Admin
App Admins manage the app catalog and deployment assignments. They cannot
modify device compliance or configuration policies.
Permission Category Access
Apps Read, Create, Update, Delete, Assign,
Relate
App configurations Read, Create, Update, Delete, Assign
App protection policies Read, Create, Update, Delete, Assign
Managed devices Read, Sync
Intune RBAC & Governance
457

Permission Category Access
Configuration profiles Read only
Compliance policies Read only
USE PIM FOR POLICY ADMIN AND APP ADMIN
Policy changes and app deployments affect every device in the assigned
scope. Treat Policy Admin and App Admin as eligible roles in PIM rather
than standing assignments — the same reasoning that applies to Entra roles
applies here. Helpdesk is typically a standing assignment since remote
actions need to happen without activation delays.
5.7.4 Scope Tags vs. Assignment Filters
These two features are frequently confused. They solve different problems and
operate independently.
Scope Tags Assignment Filters
Purpose Controls admin visibility
— which admins can see
and manage an object
Controls policy targeting
— which devices receive a
policy
Applied to The object (policy, app,
device)
The policy assignment
Evaluated by The Intune RBAC engine
at admin login
The Intune policy
evaluation engine at device
check-in
Based on Admin's role assignment Device properties (OS,
manufacturer, model, Entra
group)
Effect if not set Object visible to all admins
(defaults to All Devices)
Policy targets every device
in the assigned group
Securing Microsoft 365 in GCC High | 2026.04.30
458

In practice: Scope tags answer "who can manage this?" Assignment filters answer
"which devices should get this?" A policy can have a scope tag of Corporate-Stan
dard(only Corporate-Standard admins can edit it) and an assignment filter of devi
ce.manufacturer -eq "Microsoft"(only Surface devices receive it). These are
orthogonal.
5.7.4.1 Common Filter Expressions
Assignment filters use OData-style syntax on device properties. Useful patterns:
Use Case Filter Rule
Target only Windows 11 (device.osVersion -startsWith "1
0.0.22")
Exclude virtual machines (device.model -ne "Virtual Machin
e")
Target a specific manufacturer (device.manufacturer -eq "Microso
ft")
Target Autopilot-enrolled devices (device.enrollmentProfileName -eq
"Autopilot-Corporate")
Combine conditions (device.osVersion -startsWith "1
0.0.22") and (device.manufacturer
-eq "Microsoft")
ASSIGNMENT FILTERS DO NOT REPLACE GROUPS
A filter is applied on top of a group assignment — the device must be in the
assigned group AND satisfy the filter. A filter that evaluates to false
silently skips the assignment with no error in Intune. If a policy is not
landing on a device, check both group membership and filter evaluation in
the device's policy report.
Intune RBAC & Governance
459

5.7.5 Cleanup Checklist for Disorganized
Environments
If scope tags were never established and most admins are at Intune Administrator,
work through this sequence. Do not rush — reassigning scope tags on live policies
causes temporary visibility gaps for affected admins.
1. Audit current admin roles. In Intune > Tenant administration > Roles >
All roles > Assignments, list every admin and their current role. Identify
anyone at Intune Administrator who should be at a narrower role.
2. Define your scope tag taxonomy. Agree on tags before creating any —
changing a tag name after it is applied to 200 objects requires re-tagging all
200 objects manually.
3. Create the scope tags. Intune > Tenant administration > Roles > Scope
(Tags) > Create.
4. Tag devices first. Assign scope tags to device groups using dynamic Entra
groups where possible. Devices with no scope tag default to All Devices.
5. Tag policies, compliance policies, and update rings. Work through each
profile in configuration, compliance, and update rings.
6. Tag apps. Audit the app catalog separately — apps are the most commonly
missed.
7. Create custom roles using the permission sets above. Do not modify built-
in roles; create new ones.
8. Create role assignments for each custom role, scoping each to the
appropriate scope tags and admin groups.
9. Downgrade Intune Administrator standing assignments. Once custom
roles are validated, convert full Intune Administrator grants to PIM-eligible
assignments for the admins who genuinely need them, and remove the role
from those who do not.
10. Validate. Sign in as a test account for each role and confirm the scope is
correct — the right objects are visible, the right actions are available, and
objects outside the scope are not visible.
Securing Microsoft 365 in GCC High | 2026.04.30
460

5.8 Entra Device Hygiene — Stale and
Duplicate Object Cleanup
Every managed tenant accumulates orphaned and duplicate device objects over
time. Left unaddressed, they produce Conditional Access evaluation failures,
inaccurate compliance dashboards, and a device inventory that no longer reflects
operational reality. Cleaning them up is not optional: CM.L2-3.4.1 requires a
maintained, accurate inventory of organizational systems. A tenant with hundreds
of stale objects does not have one.
For decommissioning an individual device through the standard retirement
workflow, see Device Lifecycle & Onboarding — Device Retirement. This article
covers the hygiene operation at scale: identifying why duplicates accumulate,
applying decision logic to determine which object to keep, executing the cleanup in
the correct order, and automating ongoing detection.
5.8.1 Why Stale and Duplicate Objects Accumulate
Root Cause What Happens
Hybrid Join + Entra Registration
coexisting
A device gets both a Hybrid Azure AD
Joined object (synced from on-prem AD
via Entra Connect) and an Entra
Registered object (created when a user
signs into a Microsoft 365 app or adds a
work account via Settings). Two objects,
same physical device.
Re-imaging without deregistering The device is wiped or re-imaged without
running the pre-imaging cleanup checklist.
The freshly imaged machine registers
again and creates a new object; the old one
goes stale.
Autopilot re-registrations A device is reset or re-enrolled through
Autopilot. If the previous Autopilot profile
or device object was not removed first, a
second object appears alongside the
original.
Domain rejoin or domain migration A machine is unjoined and rejoined to on-
Entra Device Hygiene — Stale and Duplicate Object Cleanup
461

Root Cause What Happens
premises AD. Entra Connect syncs a new
computer object with a new GUID while
the old Entra object remains.
Co-management migration timing During SCCM-to-Intune co-management
rollout, enrollment timing mismatches can
create a second device record before the
original is removed.
Older Windows builds Windows 10 2004 and later (and Windows
11) automatically remove stale Entra
Registered objects when Hybrid Join
completes. Older builds do not — both
objects persist indefinitely unless
manually cleaned up.
5.8.2 Operational Impact
These are not cosmetic issues. They produce failures that are directly observable in
production:
• Conditional Access evaluation failures. CA policy evaluation may
resolve to the stale or non-compliant duplicate instead of the active
managed device, blocking the user with no apparent cause.
• Inaccurate compliance reporting. Non-compliant duplicate objects
suppress the overall compliance percentage, triggering false positives in
compliance dashboards and SSP artifact exports.
• BitLocker key confusion. Multiple device objects can each hold BitLocker
recovery keys. Deleting the wrong object permanently loses the valid
recovery key.
• Device limit exhaustion. Entra enforces a default limit of 50 registered
devices per user. Duplicate accumulation consumes slots and can
eventually block new registrations.
• Dynamic group targeting errors. Dynamic groups and filters may resolve
to the stale duplicate, causing policy conflicts, unexpected app assignments,
or missed compliance enforcement.
Securing Microsoft 365 in GCC High | 2026.04.30
462

5.8.3 Identification — Which Object to Keep
When two or more Entra device objects represent the same physical device, apply
the following priority in order:
Priority Criterion Keep Remove
1 Trust type Hybrid Azure AD
Joined (ServerAd)
Entra Registered (W
orkplace) —
when a Hybrid
object exists for the
same device
2 Last sign-in
activity
Most recent appro
ximateLastSignI
nDateTime
Older or null sign-
in date
3 Intune managed isManaged = Tru
e, active Intune
record
Not managed or
orphaned Intune
record
4 Compliance state Compliant Non-compliant or
unknown
5 Account enabled accountEnabled
= True
accountEnabled
= False
6 OS version Current build Older build (likely
pre-reimage)
7 Display name Matches current
hostname
Hostname
mismatch or stale
name
Default rule: If a Hybrid Joined object and an Entra Registered object exist for the
same machine, the Registered object is almost always the one to remove — unless
Entra Device Hygiene — Stale and Duplicate Object Cleanup
463

the device was intentionally converted to cloud-only join.
APPROXIMATELASTSIGNINDATETIMELAGS UP TO 14 DAYS
This property is not real-time. A device that signed in recently may show an
older timestamp. Treat it as directional, not precise. Do not use it as the sole
disqualification criterion.
5.8.4 Cleanup Process
5.8.4.1 Phase 1 — Identify and Disable (Stale threshold: 90+ days)
1. Pull a report of all device objects where approximateLastSignInDateTi
meis older than 90 days. See Reference Commands below.
2. Cross-reference each device against Intune, Autopilot, and on-premises AD
to confirm it is genuinely stale — not a device with irregular sign-in
patterns (see Variable Stale Thresholds below).
3. Check BitLocker keys before touching any device object. Export and
store recovery keys. If you delete the wrong object, the key is gone
permanently.
4. Disable the device in Entra ID (accountEnabled = $false). Do not
delete yet.
5. Document the disabled device (display name, object ID, trust type, last
sign-in) in a tracking spreadsheet or remediation ticket.
5.8.4.2 Phase 2 — Delete (30-day grace period after disable)
6. Wait 30 days after disabling. If no user or system reports an issue, proceed
to delete.
7. For Hybrid Joined devices — clean up on-premises AD first. Disable or
delete the computer object in the relevant domain. Wait for Entra Connect
to complete a sync cycle. If you delete the Entra object without first
removing the AD object, Entra Connect will recreate it on the next sync.
8. Delete the Entra device object.
9. If the device has an Intune record, delete it: Intune > Devices > All devices
or via Graph.
10. If the device has an Autopilot registration, remove it: Intune > Devices >
Windows enrollment > Devices. The hardware hash persists separately
and must be removed; it is not deleted when the device object is deleted.
Securing Microsoft 365 in GCC High | 2026.04.30
464

11. Verify the object does not reappear after the next Entra Connect sync cycle
(typically within 30 minutes for delta syncs).
5.8.4.3 Cleanup Order
On-prem AD (disable/delete computer object)
↓ Wait for Entra Connect sync
Entra ID (disable → wait 30 days → delete)
↓
Intune (delete device record)
↓
Autopilot (remove hardware hash, if applicable)
DELETING FROM INTUNE DOES NOT DELETE FROM ENTRA — AND
VICE VERSA
These are separate object stores. A wipe from Intune does not remove the
Entra device object, and deleting from Entra does not retire the Intune
enrollment. Both must be cleaned explicitly.
5.8.5 Pre-Imaging Checklist
The cleanup process above is remedial. The root cause is a missing pre-imaging
checklist. Before re-imaging or replacing any device, the technician should
complete the following:
1. Sign in to the device with a local admin or domain admin account.
2. Run dsregcmd /statusand record the join type: Hybrid (DomainJoined
+ AzureAdJoined), Cloud-only (AzureAdJoined), or Registered (Workpl
aceJoined).
3. If Entra Registered is present: Settings > Accounts > Access work or
school > Disconnect.
4. If Hybrid Joined: run dsregcmd /leavefrom an elevated prompt.
5. Remove from Intune if managed: Intune > Devices > find device > Delete,
or allow the /leavecommand to trigger automatic unenrollment.
6. If enrolled in Autopilot: Intune > Devices > Windows enrollment >
Devices > find by serial > Delete.
7. Disable or delete the computer object in on-premises AD if the device is
being decommissioned or renamed.
8. Force an Entra Connect delta sync or wait for the next cycle to confirm the
Entra object has been removed.
9. Document the decommission in the asset tracking system.
Entra Device Hygiene — Stale and Duplicate Object Cleanup
465

10. Proceed with re-image or replacement.
5.8.6 Ongoing Hygiene
5.8.6.1 Monthly Stale Device Detection
Schedule a monthly PowerShell script or Azure Automation runbook to flag devices
with no sign-in activity in 90+ days and output results to a shared mailbox, Teams
channel, or ITSM ticket. The Find-DuplicateEntraDevices.ps1 script below can be
scheduled directly.
Use Entra ID > Devices > Activity as a quick visual check between automated
runs.
5.8.6.2 Entra Connect Sync Scope Review
Review the OU scope for Entra Connect quarterly. Verify that decommissioned
OUs, test OUs, and staging containers are excluded from sync scope. Confirm that
the userCertificateattribute is syncing correctly — Hybrid Join depends on it
for device registration.
5.8.6.3 Windows Build Verification
Windows 10 2004 and later automatically remove stale Entra Registered objects
when Hybrid Join completes. Spot-check a sample of devices by running dsregcmd
/statusand confirming only one join type is present. If automatic cleanup is not
working, investigate GPO or registry overrides and confirm the build meets the
minimum requirement.
5.8.7 Multi-Domain and Multi-Connector
Environments
Organizations running multiple on-premises AD domains — each with its own
Entra Connect instance syncing to the same Entra tenant — require additional
coordination during cleanup.
Duplicate objects across domains: A device that moves between domains, or is
accidentally joined to the wrong domain, will produce duplicate Entra objects —
one from each Entra Connect instance. Before deleting, confirm which domain the
Securing Microsoft 365 in GCC High | 2026.04.30
466

device actually belongs to. Deleting the wrong AD object and then triggering a sync
can re-create the unwanted Entra object.
Sync schedule coordination: Each Entra Connect instance may run on its own
sync schedule. Know the schedule for each instance before executing bulk changes.
After on-premises changes, force a delta sync on the relevant instance:
Import-Module ADSync
Start-ADSyncSyncCycle -PolicyType Delta
Confirm the sync result in Entra before proceeding to delete.
5.8.7.1 Variable Stale Thresholds
Devices used in operational roles with irregular sign-in patterns — field equipment,
shared terminals, kiosks, vehicle-mounted devices — may have legitimate gaps of
several months between Entra sign-in events. Use a longer stale threshold (180
days) for these device classes and exclude them from standard automation via a
dynamic group based on device name prefix, OU, or Intune group tag. Apply the
standard 90-day threshold only to office workstations and user laptops.
5.8.8 Reference Commands
All commands use the Microsoft Graph PowerShell SDK (Microsoft.Graph
module).
5.8.8.1 Connect
# Read-only
Connect-MgGraph -Scopes "Device.Read.All","BitLockerKey.Read.All"
# With write permission (required for disable/delete operations)
Connect-MgGraph -Scopes "Device.ReadWrite.All","BitLockerKey.Read.All"
5.8.8.2Find Stale Devices (90+ days without sign-in)
$cutoff = (Get-Date).AddDays(-90).ToString("yyyy-MM-ddTHH:mm:ssZ")
Get-MgDevice -All -Filter "approximateLastSignInDateTime le $cutoff" |
Select-Object DisplayName, Id, DeviceId, ApproximateLastSignInDateTime,
TrustType, AccountEnabled, OperatingSystem, OperatingSystemVersion |
Sort-Object ApproximateLastSignInDateTime |
Export-Csv -Path "StaleDevices.csv" -NoTypeInformation
Entra Device Hygiene — Stale and Duplicate Object Cleanup
467

5.8.8.3 Find Duplicate Device Names
Get-MgDevice -All |
Group-Object DisplayName |
Where-Object { $_.Count -gt 1 } |
Select-Object Name, Count,
@{N='DeviceIds';E={ ($_.Group | ForEach-Object {
"$($_.TrustType) | LastSign=$($_.ApproximateLastSignInDateTime) |
Enabled=$($_.AccountEnabled) | Id=$($_.Id)"
}) -join "`n" }} |
Format-List
5.8.8.4Disable a Device
Update-MgDevice -DeviceId <ObjectId> -AccountEnabled:$false
5.8.8.5Delete a Device
Remove-MgDevice -DeviceId <ObjectId>
5.8.8.6Check BitLocker Recovery Keys
# List keys by Entra device ID (not object ID)
Get-MgInformationProtectionBitlockerRecoveryKey -Filter "deviceId eq '<Device
Id>'" |
Select-Object Id, CreatedDateTime, DeviceId, VolumeType
# Export full key value
Get-MgInformationProtectionBitlockerRecoveryKey -BitlockerRecoveryKeyId <KeyI
d> -Property "key" |
Select-Object Id, Key, CreatedDateTime
5.8.8.7Find Devices by Trust Type
# Hybrid Azure AD Joined
Get-MgDevice -All -Filter "trustType eq 'ServerAd'" |
Select-Object DisplayName, Id, ApproximateLastSignInDateTime, AccountEnab
led
# Entra Registered only
Get-MgDevice -All -Filter "trustType eq 'Workplace'" |
Select-Object DisplayName, Id, ApproximateLastSignInDateTime, AccountEnab
led
5.8.9 Find-DuplicateEntraDevices.ps1
The script below automates the identification process: it connects to Microsoft
Graph, retrieves all device objects, groups by display name, applies the
prioritization logic above to recommend Keep / Disable / Review for each
duplicate, outputs a console summary, and exports two CSV reports. With -Includ
Securing Microsoft 365 in GCC High | 2026.04.30
468

eDeletePermission -DisableStale, it will disable recommended devices after a
confirmation prompt.
<#
.SYNOPSIS
Identifies and reports duplicate device objects in Microsoft Entra ID.
.DESCRIPTION
Connects to Microsoft Graph, exports all device objects, identifies
duplicates by DisplayName, and applies decision logic to recommend which
devices to keep, disable, or review. Generates console output and CSV rep
orts.
Decision logic priority:
1. Prefer Hybrid Joined (ServerAd) or Entra Joined (AzureAd) over Regis
tered (Workplace)
2. Among same trust type, prefer most recent ApproximateLastSignInDateT
ime
3. Among same date, prefer IsManaged, then IsCompliant, then AccountEna
bled
4. Mark recommended action: Keep / Disable (stale duplicate) / Review
(both active)
.PARAMETER IncludeDeletePermission
Connects with Device.ReadWrite.All scope. Required if using -DisableStal
e.
.PARAMETER DisableStale
After generating reports, disable devices marked as "Disable (stale dupli
cate)"
with a confirmation prompt. Requires -IncludeDeletePermission.
.PARAMETER StaleThresholdDays
Days since last sign-in after which a device is considered stale. Defaul
t: 90.
.EXAMPLE
.\Find-DuplicateEntraDevices.ps1
Read-only scan with default 90-day stale threshold.
.EXAMPLE
.\Find-DuplicateEntraDevices.ps1 -StaleThresholdDays 180
Read-only scan using 180-day threshold (appropriate for field/operational
devices).
.EXAMPLE
.\Find-DuplicateEntraDevices.ps1 -IncludeDeletePermission -DisableStale
Scan and disable stale duplicates (with confirmation prompt).
#>
[CmdletBinding(SupportsShouldProcess)]
param(
[switch]$IncludeDeletePermission,
[switch]$DisableStale,
[int]$StaleThresholdDays = 90
)
$ScriptDir    = Split-Path -Parent $MyInvocation.MyCommand.Definition
$DateStamp    = Get-Date -Format "yyyy-MM-dd"
$Transcript   = Join-Path $ScriptDir "EntraDeviceAudit_${DateStamp}.log"
Entra Device Hygiene — Stale and Duplicate Object Cleanup
469

Start-Transcript -Path $Transcript -Append | Out-Null
Write-Host "Transcript: $Transcript" -ForegroundColor Cyan
# --- Prerequisites ---
if (-not (Get-Module -ListAvailable -Name Microsoft.Graph.Identity.DirectoryM
anagement)) {
$install = Read-Host "Microsoft.Graph module not found. Install now? (Y/
N)"
if ($install -eq 'Y') {
Install-Module Microsoft.Graph -Scope CurrentUser -Force -AllowClobbe
r
} else {
Write-Host "Cannot proceed. Exiting." -ForegroundColor Red
Stop-Transcript | Out-Null; return
}
}
# --- Connect ---
if ($DisableStale -and -not $IncludeDeletePermission) {
Write-Host "ERROR: -DisableStale requires -IncludeDeletePermission." -For
egroundColor Red
Stop-Transcript | Out-Null; return
}
$Scopes = if ($IncludeDeletePermission) { @("Device.ReadWrite.All") } else {
@("Device.Read.All") }
try {
Connect-MgGraph -Scopes $Scopes -ErrorAction Stop | Out-Null
Write-Host "Connected." -ForegroundColor Green
} catch {
Write-Host "Connection failed: $_" -ForegroundColor Red
Stop-Transcript | Out-Null; return
}
# --- Retrieve devices ---
$Properties = @(
"DisplayName","DeviceId","Id","ApproximateLastSignInDateTime","TrustTyp
e",
"IsManaged","IsCompliant","AccountEnabled","OperatingSystem",
"OperatingSystemVersion","ProfileType","ManagementType","RegistrationDate
Time"
)
try {
$AllDevices = Get-MgDevice -All -Property ($Properties -join ',') -ErrorA
ction Stop | Select-Object $Properties
Write-Host "Retrieved $($AllDevices.Count) devices." -ForegroundColor Gre
en
} catch {
Write-Host "Retrieval failed: $_" -ForegroundColor Red
Disconnect-MgGraph | Out-Null; Stop-Transcript | Out-Null; return
}
# --- Trust type ranking ---
function Get-TrustTypeRank { param([string]$TrustType)
switch ($TrustType) {
"ServerAd"  { 3 }   # Hybrid Azure AD Joined
"AzureAd"   { 2 }   # Entra Joined
"Workplace" { 1 }   # Entra Registered
default     { 0 }
}
}
Securing Microsoft 365 in GCC High | 2026.04.30
470

# --- Identify duplicates ---
$StaleDate      = (Get-Date).AddDays(-$StaleThresholdDays)
$DeviceGroups   = $AllDevices | Group-Object -Property DisplayName
$DuplicateGroups = $DeviceGroups | Where-Object { $_.Count -gt 1 }
$NonDuplicates  = $DeviceGroups | Where-Object { $_.Count -eq 1 }
$Results = [System.Collections.Generic.List[PSCustomObject]]::new()
foreach ($group in $DuplicateGroups) {
$sorted = $group.Group | Sort-Object -Property @(
@{ Expression = { Get-TrustTypeRank $_.TrustType }; Descending = $tru
e },
@{ Expression = { $_.ApproximateLastSignInDateTime -as [datetime] };
Descending = $true },
@{ Expression = { [bool]$_.IsManaged }; Descending = $true },
@{ Expression = { [bool]$_.IsCompliant }; Descending = $true },
@{ Expression = { [bool]$_.AccountEnabled }; Descending = $true }
)
$keeper = $sorted[0]
for ($i = 0; $i -lt $sorted.Count; $i++) {
$dev       = $sorted[$i]
$lastSignIn = $dev.ApproximateLastSignInDateTime -as [datetime]
if ($i -eq 0) {
$action = "Keep"
} elseif ((Get-TrustTypeRank $dev.TrustType) -lt (Get-TrustTypeRank
$keeper.TrustType)) {
$action = "Disable (stale duplicate)"
} elseif ($null -eq $lastSignIn -or $lastSignIn -lt $StaleDate) {
$action = "Disable (stale duplicate)"
} else {
$action = "Review (both active)"
}
$Results.Add([PSCustomObject]@{
DuplicateGroup                = $group.Name
DisplayName                   = $dev.DisplayName
DeviceId                      = $dev.DeviceId
ObjectId                      = $dev.Id
ApproximateLastSignInDateTime = $dev.ApproximateLastSignInDateTim
e
TrustType                     = $dev.TrustType
IsManaged                     = $dev.IsManaged
IsCompliant                   = $dev.IsCompliant
AccountEnabled                = $dev.AccountEnabled
OperatingSystem               = $dev.OperatingSystem
OperatingSystemVersion        = $dev.OperatingSystemVersion
ProfileType                   = $dev.ProfileType
ManagementType                = $dev.ManagementType
RegistrationDateTime          = $dev.RegistrationDateTime
RecommendedAction             = $action
})
}
}
$StaleNonDuplicates = ($NonDuplicates | Where-Object {
$d = $_.Group[0]; $ls = $d.ApproximateLastSignInDateTime -as [datetime]
$null -eq $ls -or $ls -lt $StaleDate
}).Count
# --- Console summary ---
Write-Host "`n===  ENTRA DEVICE DUPLICATE REPORT  ===" -ForegroundColor Cyan
Write-Host "Total devices:                 $($AllDevices.Count)"
Write-Host "Unique device names:           $($DeviceGroups.Count)"
Entra Device Hygiene — Stale and Duplicate Object Cleanup
471

Write-Host "Names with duplicates:         $($DuplicateGroups.Count)"
Write-Host "Total duplicate objects:       $($Results.Count)"
Write-Host "Stale non-duplicate devices:   $StaleNonDuplicates (no sign-in $S
taleThresholdDays+ days)"
Write-Host "`nTrust Type Breakdown:" -ForegroundColor Cyan
$AllDevices | Group-Object TrustType | ForEach-Object {
$label = switch ($_.Name) {
"ServerAd"  { "Hybrid Azure AD Joined (ServerAd)" }
"AzureAd"   { "Entra Joined (AzureAd)" }
"Workplace" { "Entra Registered (Workplace)" }
default     { "Other/Unknown ($($_.Name))" }
}
Write-Host "  ${label}: $($_.Count)"
}
Write-Host "`nRecommended Actions for Duplicates:" -ForegroundColor Cyan
$Results | Group-Object RecommendedAction | ForEach-Object {
$color = switch -Wildcard ($_.Name) { "Keep" { "Green" } "Review*" { "Yel
low" } "Disable*" { "Red" } default { "White" } }
Write-Host "  $($_.Name): $($_.Count)" -ForegroundColor $color
}
Write-Host "`n--- Duplicate Groups Detail ---" -ForegroundColor Cyan
foreach ($groupName in ($Results | Select-Object -ExpandProperty DuplicateGro
up -Unique)) {
Write-Host "Device: $groupName"
$Results | Where-Object { $_.DuplicateGroup -eq $groupName } | ForEach-Ob
ject {
$color = switch -Wildcard ($_.RecommendedAction) { "Keep" { "Green" }
"Review*" { "Yellow" } "Disable*" { "Red" } default { "White" } }
$si = if ($_.ApproximateLastSignInDateTime) { $_.ApproximateLastSignI
nDateTime } else { "Never" }
Write-Host ("  [{0}] Trust={1}  LastSignIn={2}  Managed={3}  Complian
t={4}  Enabled={5}  ObjectId={6}" -f
$_.RecommendedAction, $_.TrustType, $si, $_.IsManaged, $_.IsCompl
iant, $_.AccountEnabled, $_.ObjectId
) -ForegroundColor $color
}
Write-Host ""
}
# --- CSV exports ---
$DetailCsv   = Join-Path $ScriptDir "EntraDeviceDuplicates_${DateStamp}.csv"
$SummaryCsv  = Join-Path $ScriptDir "EntraDeviceSummary_${DateStamp}.csv"
$Results | Export-Csv -Path $DetailCsv -NoTypeInformation -Encoding UTF8
Write-Host "Detail report: $DetailCsv" -ForegroundColor Green
$TrustBreak = $AllDevices | Group-Object TrustType
[PSCustomObject]@{
ReportDate               = $DateStamp
TotalDevices             = $AllDevices.Count
UniqueDeviceNames        = $DeviceGroups.Count
DuplicateDeviceNames     = $DuplicateGroups.Count
TotalDuplicateObjects    = $Results.Count
StaleNonDuplicates       = $StaleNonDuplicates
StaleThresholdDays       = $StaleThresholdDays
RecommendedKeep          = ($Results | Where-Object RecommendedAction -eq
"Keep").Count
RecommendedDisable       = ($Results | Where-Object { $_.RecommendedActio
n -like "Disable*" }).Count
RecommendedReview        = ($Results | Where-Object { $_.RecommendedActio
Securing Microsoft 365 in GCC High | 2026.04.30
472

n -like "Review*" }).Count
HybridJoinedCount        = ($TrustBreak | Where-Object Name -eq "ServerA
d").Count
EntraJoinedCount         = ($TrustBreak | Where-Object Name -eq "AzureA
d").Count
RegisteredCount          = ($TrustBreak | Where-Object Name -eq "Workplac
e").Count
} | Export-Csv -Path $SummaryCsv -NoTypeInformation -Encoding UTF8
Write-Host "Summary report: $SummaryCsv" -ForegroundColor Green
# --- Optional: disable stale duplicates ---
if ($DisableStale) {
$ToDisable = $Results | Where-Object { $_.RecommendedAction -like "Disabl
e*" -and $_.AccountEnabled -eq $true }
if ($ToDisable.Count -eq 0) {
Write-Host "No enabled stale duplicates to disable." -ForegroundColor
Green
} else {
Write-Host "`n$($ToDisable.Count) device(s) to disable:" -ForegroundC
olor Yellow
Write-Host "*** Verify BitLocker keys before proceeding. ***" -Foregr
oundColor Red
$hybrid = $ToDisable | Where-Object { $_.TrustType -eq "ServerAd" }
if ($hybrid.Count -gt 0) {
Write-Host "  $($hybrid.Count) Hybrid Joined device(s) detected —
clean up from on-prem AD first." -ForegroundColor Red
}
$ToDisable | ForEach-Object {
Write-Host "  $($_.DisplayName) | $($_.TrustType) | LastSignI
n=$($_.ApproximateLastSignInDateTime) | ObjectId=$($_.ObjectId)" -ForegroundC
olor Yellow
}
$confirm = Read-Host "`nType 'DISABLE' to confirm (any other input ca
ncels)"
if ($confirm -eq 'DISABLE') {
$ok = 0; $fail = 0
$ToDisable | ForEach-Object {
try {
Update-MgDevice -DeviceId $_.ObjectId -AccountEnabled:$fa
lse -ErrorAction Stop
Write-Host "  DISABLED: $($_.DisplayName)" -ForegroundCol
or Red; $ok++
} catch {
Write-Host "  FAILED: $($_.DisplayName): $_" -ForegroundC
olor Red; $fail++
}
}
Write-Host "Complete: $ok disabled, $fail failed." -ForegroundCol
or Cyan
} else {
Write-Host "Cancelled." -ForegroundColor Yellow
}
}
}
Disconnect-MgGraph | Out-Null
Write-Host "`nScript complete. Reports in: $ScriptDir" -ForegroundColor Cyan
Stop-Transcript | Out-Null
Entra Device Hygiene — Stale and Duplicate Object Cleanup
473

5.8.10 Key Gotchas
• BitLocker key loss is permanent. If you delete a device object that holds
the only copy of a BitLocker recovery key, the key cannot be recovered.
Export and confirm all BitLocker keys before deleting any device object.
• Entra Connect recreates what you delete. Deleting a Hybrid Joined
device from Entra without first removing the computer object from on-
premises AD will result in the object being recreated on the next sync
cycle. Always clean AD first.
• approximateLastSignInDateTimelags up to 14 days. Do not treat it as
real-time. Use it directionally and cross-reference against Intune's lastSyn
cDateTimefor higher precision.
• Graph API throttling. Get-MgDevice -Allon large tenants can hit
throttling (HTTP 429). The script above will fail silently on throttled calls;
add retry logic with exponential backoff for bulk operations exceeding a
few hundred devices.
• Autopilot hardware hashes survive device deletion. Deleting the Entra or
Intune device object does not remove the Autopilot hardware hash
registration. The hash persists and can cause re-enrollment issues. Remove
it explicitly.
• Disabled devices may still consume a license slot. Deletion is the only
way to fully free the slot in configurations that bill per registered device.
• Dynamic group membership is not instant. After disabling or deleting a
device, dynamic group recalculation can take 5–30 minutes. Do not assume
Conditional Access policies update immediately.
• Test with a small batch first. Before running bulk disable or delete
operations, validate with 5–10 devices and wait a full sync cycle before
proceeding.
5.8.11 CMMC Control Mapping
ENVIRONMENT: GCC HIGH (CMMC)
NIST SP 800-171 Rev. 2 Control How Entra Device Hygiene Satisfies
It
CM.L2-3.4.1 — Establish and
maintain baseline configurations and
Stale and duplicate device cleanup
produces an accurate, current inventory
Securing Microsoft 365 in GCC High | 2026.04.30
474

NIST SP 800-171 Rev. 2 Control How Entra Device Hygiene Satisfies
It
inventories of organizational systems of managed endpoints. An inventory
populated with orphaned objects does
not satisfy this control.
IA.L2-3.5.1 — Identify system users,
processes acting on behalf of users, and
devices
Entra device objects are how the
directory identifies devices for
authentication and access decisions.
Orphaned device objects represent
unidentified or ambiguously identified
system components.
AC.L2-3.1.1 — Limit system access to
authorized users and devices
Stale device objects with accountEnab
led = Truerepresent device identities
that can still authenticate to the tenant.
Disabling and removing them limits
system access to currently authorized,
actively managed devices.
CMMC Level 2 assessors evaluating CM.L2-3.4.1 will typically request a
device inventory export. An export containing hundreds of stale objects with
no evidence of a hygiene process is unlikely to satisfy this practice without
additional explanation.
ENVIRONMENT: COMMERCIAL
NIST SP 800-171 Rev. 3 Control How Entra Device Hygiene Satisfies
It
3.4.1 — Establish and maintain
baseline configurations and inventories
of organizational systems
Same as Rev. 2: stale device cleanup is
a prerequisite for a defensible system
inventory.
3.5.1 — Identify system users,
processes acting on behalf of users, and
devices
Orphaned device objects represent a
gap in device identification.
Entra Device Hygiene — Stale and Duplicate Object Cleanup
475

NIST SP 800-171 Rev. 3 Control How Entra Device Hygiene Satisfies
It
3.1.1 — Limit system access to
authorized users and devices
Disabling and removing stale device
objects enforces the authorized-device
boundary.
5.9 GPO-to-Intune Migration —
Structured Policy Buildout
Organizations managing Windows devices through Active Directory Group Policy
accumulate GPO estates over years. By the time a modern endpoint management
initiative begins, the typical environment has hundreds of GPOs — many obsolete,
many overlapping, most without documentation. Migrating them one-to-one into
Intune imports the technical debt wholesale.
This chapter describes a top-down, Intune-first approach that treats the existing
GPO estate as a source of requirements rather than a migration target. The goal is
not to reproduce Group Policy in Intune — it is to build a mature, well-structured
Intune policy framework and validate it against what Group Policy was actually
enforcing.
5.9.1 The Top-Down Approach
The one-to-one migration instinct is understandable but wrong. Each GPO that gets
mapped to an Intune configuration profile carries forward its original context,
naming, and scope — which was almost never designed with Intune in mind. The
result is the same organic mess in a different tool.
The alternative:
1. Define the target state first. Use the Open Intune Baseline (OIB) as the
structural foundation. Determine what a well-organized Intune policy set
looks like before touching the existing GPOs.
2. Treat GPO settings as requirements. Export a Group Policy Analytics
report. Use it to validate that your target Intune policies cover the settings
Securing Microsoft 365 in GCC High | 2026.04.30
476

that GPOs were enforcing. Fill gaps; discard settings that are obsolete or no
longer applicable.
3. Build clean, consolidated policies. Fewer policies with clear names and
documented purpose are easier to audit, easier to troubleshoot, and easier to
hand off.
4. Retire the ad-hoc layer. Disable existing organically grown Intune policies
as the structured framework subsumes them.
This approach produces a policy set that is defensible in an audit, maintainable over
time, and smaller than the original GPO estate.
5.9.2 Group Policy Analytics
Group Policy Analytics is built into the Intune portal (Devices > Windows >
Group Policy Analytics). It ingests a GPO XML export and classifies each setting:
Classification Meaning
MDM supported A direct CSP equivalent exists in Intune
— setting can be migrated as-is
Deprecated Setting targets an obsolete OS feature; do
not migrate
MDM parity Equivalent control exists but the
implementation path differs — requires
manual mapping
Not supported No MDM equivalent; requires a Platform
Script, Remediation, or no action
The MDM readiness percentage shown per GPO is the fraction of its settings that
fall in the MDM supported category. A GPO at 100% can be mechanically
migrated; a GPO at 0% requires a different workstream entirely (scripts, Win32
apps, or accepted risk).
5.9.2.1 Running the Analysis
1. Export GPOs to XML: On a domain controller or management
workstation with the Group Policy Management Console (GPMC)
installed, run:
GPO-to-Intune Migration — Structured Policy Buildout
477

# Export a single GPO
Get-GPO -Name "PolicyName" | Get-GPOReport -ReportType XML -Path ".\GP
OName.xml"
# Export all GPOs in the domain
Get-GPO -All | ForEach-Object {
Get-GPOReport -Guid $_.Id -ReportType XML -Path ".\GPOExport
s\$($_.DisplayName).xml"
}
2. Upload to Intune: Devices > Windows > Group Policy Analytics >
Import — upload individual XML files or a ZIP containing multiple
exports.
3. Review the report: Filter by MDM support percentage. Sort to identify
high-readiness GPOs (quick wins) and zero-readiness GPOs (alternate
workstreams).
4. Export the settings-level detail: The summary view shows per-GPO
readiness; the drill-down shows per-setting CSP mappings. Export the
settings-level CSV for use during policy buildout — this is the primary
working artifact. Each row is one setting from one GPO: setting name, CSP
path, MDM support state, and the source GPO. Sort by MDM support state
and functional category to build your policy map.
PRIORITIZE BY FUNCTION, NOT BY GPO
A single GPO may contain settings that belong in three different target
Intune policies. Work from the settings-level export, organized by
functional category, not from the GPO list. In large estates, 60–80% of
settings across specialized-environment GPOs are duplicates of each other
— identifying the shared base before building per-environment
supplements dramatically reduces the policy count.
5.9.3 Policy Framework and Naming Convention
The OIB naming convention provides a consistent structure for every Intune policy
in the environment. All policies — whether they are direct OIB imports or
organization-specific additions — should follow this schema:
Win - [OIB|ORG] - [ES|SC|U] - [Function] - [D|U] - [Description] - v[Version]
Securing Microsoft 365 in GCC High | 2026.04.30
478

Token Values Meaning
Win Win, iOS, macOS, Android Platform
OIBor ORG OIB= Open Intune
Baseline standard; org
prefix for org-specific
policies
Policy source/ownership
ES/ SC/ U ES = Endpoint Security;
SC = Security Compliance
/ Configuration; U = User-
level
Policy category
Function Attack Surface Reduct
ion, Browser, Firewall,
etc.
Functional area
D/ U D = Device scope; U =
User scope
Assignment scope
Description Short descriptor Distinguishes policies in
the same function
Version v1.0, v1.1 Change tracking
Example: Win - OIB - ES - Attack Surface Reduction - D - ASR Rules
- v1.0
Organization-specific policies that extend or deviate from OIB defaults use the org
prefix instead of OIB:
Example: Win - ACME - SC - Browser - D - Microsoft Edge - v1.0
(organization-specific Edge configuration, where ACMEis replaced with your own
2–4 letter org prefix)
This naming convention makes the policy list self-documenting: scope, ownership,
and function are visible without opening the policy.
5.9.4 Policy Taxonomy by Tier
Organize the build and deployment sequence into five tiers, ordered by security
impact and risk.
GPO-to-Intune Migration — Structured Policy Buildout
479

5.9.4.1 Tier 1 — Security Foundation
Deploy first. These policies establish the security posture for all managed Windows
devices and produce the most significant compliance and security improvement per
unit of effort.
Policy Area OIB Equivalent What It Covers
Attack Surface Reduction Win - OIB - ES - Atta
ck Surface Reduction
- D - ASR Rules
ASR rules, exploit
mitigations
Exploit Protection Win - Custom - ES - E
xploit Protection
(manually created —
Settings Catalog policy
enforcing DEP, ASLR,
SEHOP, CFG with Disall
owExploitProtectionOv
erridefor tamper
protection)
System-wide DEP, ASLR,
SEHOP, CFG mitigations
Defender Antivirus Win - OIB - ES - Defe
nder Antivirus - D -
AV Configuration
Real-time protection, cloud
protection, scan schedule
Defender Security
Experience
Win - OIB - ES - Defe
nder Antivirus - D -
Security Experience
Notification management,
tamper protection UI
EDR Onboarding Win - Custom - ES - D
efender for Endpoint
Onboarding(user-created
— not an OIB import; the
onboarding blob is tenant-
specific)
Automated onboarding to
Microsoft Defender for
Endpoint
BitLocker Win - OIB - ES - Encr
yption - D - BitLocke
r (OS Disk)
XTS-AES 256-bit
encryption, recovery key
escrow to Entra ID
Windows Firewall Win - OIB - ES - Wind
ows Firewall - D - Fi
rewall Configuration
Domain, private, and
public profiles
Windows LAPS Win - OIB - ES - Wind Local admin password
Securing Microsoft 365 in GCC High | 2026.04.30
480

Policy Area OIB Equivalent What It Covers
ows LAPS - D - LAPS C
onfiguration
rotation and escrow
Removable Media
Control
Win - Custom - ES - D
evice Control / Remov
able Media(manually
created — Device Control
rules are keyed to
approved hardware IDs
unique to each tenant)
USB and removable
storage allowlist
VALIDATE AGAINST EXISTING INTUNE POLICIES BEFORE
DEPLOYING TIER 1
Most environments with a GPO estate also have organically built Intune
policies covering some of these areas. Diff the existing Intune policy
settings against the OIB equivalents before enabling the OIB version.
Specific settings (ASR rule exclusions, AV exclusions, LAPS account
names) are often customized in the existing policies and must be carried
forward.
5.9.4.2 Tier 2 — Identity and Compliance
Policy Area OIB Equivalent What It Covers
Windows Hello for
Business
Win - OIB - ES - Wind
ows Hello for Busines
s - D - WHfB Configur
ation
Passwordless
authentication, biometrics
Cloud Kerberos Trust Win - OIB - SC - Wind
ows Hello for Busines
s - D - Cloud Kerbero
s Trust
SSO to on-premises
resources for Hybrid
environments
Local Security Policies Win - OIB - SC - Devi
ce Security - D - Loc
al Security Policies
Account lockout, audit
policies, user rights
assignments
GPO-to-Intune Migration — Structured Policy Buildout
481

Policy Area OIB Equivalent What It Covers
Compliance Policy Win - [ORG] - Complia
nce - D - Windows Wor
kstation
BitLocker required, Secure
Boot, minimum OS
version, firewall and AV
state, MDE risk score —
drives Conditional Access
enforcement
The compliance policy is the enforcement layer. Tier 1 policies establish the
security controls; the compliance policy verifies they are in place and signals
Conditional Access whether to permit or block device access.
5.9.4.3 Tier 3 — Device Configuration
Policy Area Coverage
Login and lock screen Screen timeout, lock behavior, inactivity
policy
Windows Update for Business Diagnostic data, update compliance
reporting (separate from Update Rings —
see Tier 4)
Browser configuration Homepage, security zones, enterprise site
lists, cache settings
OneDrive KFM Known Folder Move silent configuration,
sync settings
Productivity apps Office licensing, modern auth, PST disable
Remote access Remote Desktop, Remote Assistance
settings
Time synchronization NTP configuration — often 5-10 GPOs
consolidated into one Intune policy
Network and proxy Proxy settings per environment or
department group
5.9.4.4 Tier 4 — Windows Update Rings
Replace all Windows Update GPOs with a structured Windows Update for Business
Securing Microsoft 365 in GCC High | 2026.04.30
482

(WUfB) deployment. The standard ring structure:
Ring Typical Target Quality Deferral Feature Deferral
IT / Dev IT staff,
administrators
0 days 0 days
Pilot Early adopters 3 days 0 days
General Standard workforce 7–10 days 0 days
Critical Ops Mission-critical
devices (dispatch,
emergency
services,
production control)
14 days Use Feature Update
policy
Critical Ops devices — those running dispatch, emergency services, or production
control software — require extended quality deferrals and thorough validation
before feature updates are applied. Rather than setting a long feature deferral period
on the update ring (which is hard to manage over time), target a specific Windows
version using a separate Feature Update policy and update the target annually.
Maintain Group Policy as a fallback for these devices during the WUfB transition.
RETIRE UPDATE-BLOCKING GPOS IMMEDIATELY
GPOs that disable Windows Update entirely (Disable Windows Updates
x64, Disable Windows Updates x86, or similar) represent an active
security risk — they prevent devices from receiving security patches. These
must be retired immediately, before the WUfB migration is complete, by
assigning affected devices to the Critical Ops ring as an interim measure.
5.9.4.5 Tier 5 — Specialized Environments
These are higher-risk migrations requiring extended piloting. Before building any
Tier 5 policy, audit the settings-level export for cross-environment overlap — in
most organizations with specialized devices, 60–80% of settings across
environment-specific GPOs are identical. Build a Base Lockdown policy
containing shared settings first, then layer environment-specific supplements on top.
Layered architecture pattern:
GPO-to-Intune Migration — Structured Policy Buildout
483

Base Lockdown Policy (~80 shared settings)
→ Assigned to: all restricted / specialized device groups
+ MDT Supplement        (~25 unique settings)  → MDT/CAD devices
+ Dispatch Supplement   (~15 unique settings)  → Dispatch terminals
+ Kiosk Supplement      (~15 unique settings)  → Shared kiosk devices
+ VDI Supplement        (~30 unique settings)  → Virtual desktops
+ App Supplement        (~33 unique settings)  → Per-application policy
Typical shared settings that belong in the base policy: Start Menu restrictions,
desktop lockdown, File Explorer restrictions, command prompt and registry editor
blocking, screensaver enforcement, Task Manager removal, Lock Computer
removal.
Environment types:
• Mission-critical / operational devices — CAD systems, dispatch
terminals, vehicle-mounted computers. Cannot tolerate unplanned reboots
or feature changes. Extended pilot with a dedicated device group; maintain
GP as fallback throughout.
• Kiosk and shared devices — Single-app and multi-app kiosk
configurations; power management; LAPS for shared local admin accounts.
• VDI / virtual clients — Virtual machine optimization settings for AVD or
W365 session hosts. Verify whether any Defender or system-restore
settings in existing VDI GPOs were intentionally disabled for non-
persistent images.
• Application-specific policies — Settings that exist to support a specific
line-of-business application. Validate that the application is still in active
use before building a policy around it; many 0%-MDM-ready app GPOs
target decommissioned applications.
5.9.5 What to Exclude from Intune
Not everything in a GPO estate should be migrated. Attempting to migrate out-of-
scope GPOs wastes effort and produces policies that will never work correctly in
Intune.
5.9.5.1 Server GPOs
GPOs targeting server OUs remain in Group Policy. They are not in scope for
Intune. For hybrid server management at scale, evaluate Azure Arc + Azure Policy
as a separate initiative.
Securing Microsoft 365 in GCC High | 2026.04.30
484

5.9.5.2 Drive Mapping GPOs
Drive mapping has zero MDM support. This is not a policy migration question — it
is a file share modernization initiative (SharePoint Online, Azure Files, or
OneDrive Known Folder Move). When the organization is ready, a single Intune
Platform Script can replace dozens of drive mapping GPOs.
5.9.5.3 Software Deployment GPOs
GPOs that deploy MSI packages belong in Intune as Win32 app deployments, not
configuration policies. This is a separate app packaging and deployment
workstream.
5.9.5.4 Infrastructure and Network GPOs
Certificate deployment, Wi-Fi profiles, VPN configurations, and device enrollment
bootstrapping GPOs have Intune equivalents but belong in dedicated workstreams:
Certificate Connector, Wi-Fi profiles, VPN profiles, and enrollment restrictions.
They should not be migrated as configuration policies.
5.9.5.5 Empty and Container GPOs
GPOs with no active settings (OU containers, link-only GPOs, printer-only GPOs)
have nothing to migrate. Document them and clean them up in AD at the AD team's
discretion.
5.9.6 Co-Management Workload Configuration
Organizations on co-management (Intune + Configuration Manager) must explicitly
transfer workload authority to Intune for each policy area as migration completes.
Until the workload is transferred, Configuration Manager (and therefore Group
Policy applied by it) continues to win for that area.
Transfer workloads in Intune (Tenant administration > Connectors and tokens >
Microsoft Endpoint Configuration Manager > Properties):
Workload Transfer When
Compliance policies Phase 2 complete — compliance policies
built and validated
GPO-to-Intune Migration — Structured Policy Buildout
485

Workload Transfer When
Device configuration Phase 3 complete — Tier 3 policies built
and validated
Endpoint Protection Phase 1 complete — Tier 1 security
policies validated
Windows Update policies Phase 4 (WUfB rings) validated
Transfer one workload at a time. Monitor the Device Compliance and
Configuration dashboard after each transfer to catch regressions before transferring
the next workload.
5.9.7 Implementation Phases
5.9.7.1 Phase 1 — Security Foundation (Weeks 1–6)
1. Export the full GPO estate using GPMC and upload to Group Policy
Analytics
2. Review the analytics output — identify high-readiness GPOs in security
categories
3. Import the OIB Tier 1 policies using the IntuneManagement tool
4. Customize OIB defaults against the GPO settings export — carry forward
any organization-specific exclusions, account names, and rule overrides
5. Deploy to a pilot group (IT staff devices) for a minimum two-week
validation window
6. After validation, deploy broadly and disable superseded ad-hoc Intune
policies
5.9.7.2 Phase 2 — Identity, Compliance, and Device Configuration
(Weeks 6–12)
1. Deploy WHfB and Cloud Kerberos Trust policies
2. Build and deploy the compliance policy — coordinate with the CA team to
ensure Conditional Access is ready to enforce compliance state
3. Build Tier 3 device configuration policies from the GPO analytics settings
export, organized by functional area
4. Consolidate existing organically built Intune policies into the OIB-
structured equivalents
5. Deploy WUfB rings — transfer the Windows Update workload from
Securing Microsoft 365 in GCC High | 2026.04.30
486

Configuration Manager once rings are validated
5.9.7.3 Phase 3 — Specialized Environments (Weeks 12–20)
1. Pilot mission-critical device policies with a small, representative device
group
2. Restructure kiosk policies under the OIB naming convention
3. Deploy VDI optimization policies
4. Build application-specific policies; for zero-MDM-readiness app settings,
build Intune Remediations or Platform Scripts as needed
5.9.7.4 Phase 4 — Consolidation and Steady State (Weeks 20–26)
1. Retire all superseded Intune policies — disable, then delete after a 30-day
grace period
2. Remove test, temporary, and ZZZ-prefixed deprecated policies
3. Produce a policy registry — a living document mapping each Intune
policy to its purpose, target group, version, and the GPO settings it replaced
4. Establish a change management process: new policy requests follow the
OIB naming convention and require documentation before deployment
5.9.8 CMMC Control Mapping
ENVIRONMENT: GCC HIGH (CMMC)
NIST SP 800-171 Rev. 2 Control How Structured Policy Buildout
Satisfies It
CM.L2-3.4.1 — Establish and
maintain baseline configurations and
inventories of organizational systems
The OIB-structured Intune policy set is
the documented, maintained baseline.
The policy registry (Phase 4) provides
the inventory artifact required by
assessors.
CM.L2-3.4.2 — Establish and enforce
security configuration settings for
information technology products
Intune configuration policies enforce
security settings on all managed
endpoints with compliance state
reporting. Group Policy enforcement is
replaced with managed, auditable
GPO-to-Intune Migration — Structured Policy Buildout
487

NIST SP 800-171 Rev. 2 Control How Structured Policy Buildout
Satisfies It
Intune enforcement.
CM.L2-3.4.6 — Employ the principle
of least functionality
GPO-to-Intune migration is an
opportunity to remove settings that
enabled unnecessary features or
services. Tier 1 ASR rules directly
restrict execution of unneeded OS
capabilities.
SI.L2-3.14.1 — Identify, report, and
correct information system flaws in a
timely manner
WUfB rings (Tier 4) establish
structured, documented patch
management with defined deferral
periods and ring-based validation.
A CMMC Level 2 assessor evaluating CM.L2-3.4.1 will typically request
both the configuration evidence (Intune policy export) and a document
showing what the policies contain and why. The policy registry produced in
Phase 4 is the primary audit artifact for this control.
ENVIRONMENT: COMMERCIAL
NIST SP 800-171 Rev. 3 Control How Structured Policy Buildout
Satisfies It
3.4.1 — Establish and maintain
baseline configurations and inventories
of organizational systems
Same as Rev. 2: the OIB-structured
Intune policy set and policy registry are
the baseline inventory artifacts.
3.4.2 — Establish and enforce security
configuration settings
Intune enforces configuration settings
consistently across the device estate
with auditable compliance reporting.
3.4.6 — Employ the principle of least
functionality
GPO migration is an explicit
opportunity to remove legacy settings
enabling obsolete or unnecessary
features.
Securing Microsoft 365 in GCC High | 2026.04.30
488