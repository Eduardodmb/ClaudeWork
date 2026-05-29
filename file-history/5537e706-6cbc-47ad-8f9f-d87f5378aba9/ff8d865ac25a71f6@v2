---
name: Safari Circuits CMMC Implementation Architecture
description: CMMC Level 2 boundary architecture and data flow for Safari Circuits
type: project
priority: high
status: active
date_created: 2026-05-12
last_updated: 2026-05-12
---

# Safari Circuits CMMC Implementation Architecture

## Overview

Safari Circuits' approach to CMMC Level 2 compliance using physical network segmentation + Azure GCC High cloud. The design minimizes CMMC scope by keeping most operations in commercial network and only processing CUI in the isolated CMMC boundary.

**Source document**: `C:\Users\emarquez\Downloads\Safari_Circuits_Data_Flow_and_Boundary_Diagrams.md` (Version 1.0, 2026-05-05)

---

## CMMC Boundary (IN SCOPE)

### On-Premises CMMC Infrastructure
- **VLAN 100** (10.100.1.0/24) - Physically isolated from all commercial VLANs
- **7 thin clients** (HP t640 or similar):
  - Engineering Area 1: 2 clients
  - Engineering Area 2: 3 clients
  - Quality Lab: 1 client
  - Management: 1 client
- **CMMC switch** (Cisco Catalyst 1000):
  - Port security enabled (MAC address binding)
  - 802.1X authentication (certificate-based)
  - All traffic logged to Azure Sentinel
- **Physical security**: Kensington cable locks on thin clients

### Azure GCC High Cloud (Primary CUI Environment)
- **Tenant**: safaricircuitsdefense.com
- **Location**: Azure Government (US datacenters)
- **Services**:
  - Azure AD (GCC High) - 20 user accounts, MFA required
  - SharePoint Online - Primary CUI storage (`/CUI-Customer-Files/`)
  - OneDrive for Business - User personal CUI storage
  - Exchange Online - CUI email (@safaricircuitsdefense.com)
  - Azure Virtual Desktop (AVD) - Thin clients connect here
  - Azure Sentinel - Unified SIEM
  - Microsoft Defender (Cloud + Endpoint)
- **Encryption**: AES-256 at rest, TLS 1.2+ in transit
- **Session controls**: 30-minute idle timeout, clipboard disabled, drive mapping disabled

---

## Out of CMMC Scope (Commercial Operations)

### Commercial Network (Safari Circuits Otsego)
- **VLAN 10** - Corporate Office (192.168.10.0/24)
  - Employee workstations (safaricircuits.com email)
  - Office printers, WiFi, general business apps
- **VLAN 20** - Production Floor (192.168.20.0/24)
  - CAM workstations (receive sanitized files only)
  - Manufacturing equipment (CNC, inspection)
  - MES, shop floor tablets
- **VLAN 30** - Server Infrastructure (192.168.30.0/24)
  - Plex ERP (cloud-hosted, sanitized data only)
  - File servers (corporate documents, no CUI)
  - Domain controllers (commercial AD)
  - Corporate backup systems
- **VLAN 50** - Guest Network (192.168.50.0/24)
  - Visitor WiFi (isolated, internet-only)

---

## CUI Data Flow (End to End)

### Step 1: CUI Enters Organization
- Customer sends Gerber files, specs, drawings via email
- Email lands in Exchange Online (GCC High)
- Attachments auto-stored in SharePoint (GCC High)
- CUI marking banner applied automatically
- **Example**: Lockheed F-35 antenna files → `/CUI-Customer-Files/Lockheed-F35-Antenna/`

### Step 2: Order Entry (Sanitized Data Only)
- Engineer logs into AVD session from thin client
- Opens SharePoint, views CUI files
- Extracts sanitized info: qty, due date, materials, layers
- Creates order in Plex ERP (commercial system) with:
  - Generic part number (Safari-45678)
  - Sanitized customer name ("Defense Customer A")
  - Technical specs only (FR-4, 1.6mm, ENIG, 4-layer)
  - **NO**: Customer company name, program name, drawings, ITAR markings

### Step 3: File Sanitization
- Engineer opens CUI Gerber files in CAM viewer (in AVD)
- Performs sanitization:
  - Remove customer company name from all layers
  - Strip silkscreen ("LOCKHEED MARTIN PROPRIETARY" → blank)
  - Remove ITAR/export control notices
  - Replace part numbers (LM-F35-ANT-REV3 → Safari-45678)
  - Remove file metadata (author, company, timestamps)
  - Rename files (Lockheed_F35_Top.gbr → Safari-45678-Top.gbr)
- **What remains**: Copper trace geometry, drill holes, layer stackup, board dimensions, Safari part number

### Step 4: Transfer Zone (One-Way, Monitored)
- Engineer copies sanitized files to transfer folder (`\\transfer\outbound\Safari-45678\`)
- **Jump server** (dual-homed):
  - Interface 1: CMMC VLAN (10.100.1.x) - receives sanitized files
  - Interface 2: Production VLAN (192.168.20.x) - forwards to CAM
- **Python script** runs every 5 minutes:
  1. Scans filenames for CUI keywords (ITAR, proprietary, lockheed, northrop, classified, secret, export controlled)
  2. IF keyword detected → QUARANTINE + alert security team + DO NOT transfer
  3. IF clean → Copy to `\\commercial\cam-inbox\` + log + archive + email CAM engineer
  4. Send logs to Azure Sentinel
- **CRITICAL**: ONE-WAY FLOW ONLY (CMMC → Commercial, never reverse)

### Step 5: CAM Programming (Commercial Network)
- CAM engineer receives email notification
- Opens sanitized Gerber files from `\\commercial\cam-inbox\Safari-45678\`
- Imports into CAM software, generates panel layout, tooling paths, NC programs
- **CAM engineer sees ONLY**: Safari-45678 part number, board geometry, manufacturing parameters
- **CAM engineer does NOT see**: Customer name, program name, ITAR/CUI markings

### Step 6: Shop Floor Manufacturing
- Shop floor receives work travelers from Plex ERP
- Work traveler shows: Safari-45678, quantity, materials, process steps
- Shop floor has ZERO knowledge of customer, program, or CUI
- If questions arise → Supervisor contacts Engineering → Engineer (with CUI access) provides sanitized guidance

### Step 7: Shipping & Delivery
- Shipping packs boards, creates packing slip with Safari-45678 part number
- NO CUI on any shipping documents
- Customer receives boards and correlates Safari-45678 with their internal part number

---

## User Access Matrix

| System/Data | Shop Floor | CAM Eng | IT Eng | GCC Admin | Manager |
|-------------|------------|---------|---------|-----------|---------|
| GCC Tenant (safaricircuitsdefense) | ✗ | ✗ | ✗ | ✓ | ✗ (TN Visa) |
| CUI in SharePoint | ✗ | ✗ | ✗ | ✓ | ✗ |
| Azure Virtual Desktop | ✗ | ✗ | ✗ | ✓ | ✗ |
| CMMC Thin Clients (physical) | ✗ | ✗ | ✓ (setup) | ✓ | ✗ |
| CMMC Switch Config | ✗ | ✗ | ✓ | ✗ | ✓ (design) |
| Azure Sentinel (SIEM) | ✗ | ✗ | ✗ | ✓ | ✓ (read-only) |
| Sanitized Files (commercial) | ✗ | ✓ | ✗ | ✓ | ✓ (review) |
| Work Travelers (Plex) | ✓ (view) | ✓ | ✗ | ✗ | ✓ |
| Commercial Network | ✓ | ✓ | ✓ | ✗ | ✓ |
| Plex ERP (sanitized only) | ✓ (view) | ✓ | ✗ | ✗ | ✓ |

**Key citizenship requirement**: GCC Admin MUST be U.S. Citizen or Permanent Resident.

---

## Six-Layer Security Controls

### Layer 1: Network Segmentation
- VLAN 100 (CMMC) isolated from all other VLANs
- Firewall enforces deny-all between CMMC ↔ Commercial
- Only allowed: Internet (via secure gateway) + Transfer Zone
- All boundary crossing attempts logged and alerted

### Layer 2: Physical Access
- Thin clients physically locked (Kensington cables)
- CMMC switch in locked network closet
- Port labels identify CMMC vs commercial
- Badge access logs maintained

### Layer 3: Logical Access
- Port security: Only authorized MAC addresses
- 802.1X: Certificate-based authentication
- MFA required for all GCC accounts
- Conditional Access: Block non-compliant devices
- Session timeout: 30 minutes idle

### Layer 4: Data Protection
- Encryption at rest: AES-256 (Microsoft-managed)
- Encryption in transit: TLS 1.2+ only
- CUI marking: Automatic labels applied
- DLP policies: Block CUI exfiltration
- No local storage: Thin clients diskless or encrypted

### Layer 5: Monitoring & Response
- Azure Sentinel: Unified SIEM across all systems
- 90-day audit log retention (minimum)
- Real-time alerting on security events
- Weekly log reviews by GCC Admins
- Incident response plan tested quarterly

### Layer 6: Administrative
- U.S. person requirement enforced (verified by HR)
- Least privilege: Role-based access control
- Quarterly access reviews
- Annual security training for all CUI users
- Background checks for GCC admins

---

## Monitoring & Alerting

### Azure Sentinel Ingests From
**GCC Cloud**: Azure AD sign-ins, Office 365 audit, AVD sessions, SharePoint access, Defender alerts, DLP violations
**On-Premises CMMC**: CMMC switch logs, port security, 802.1X failures, firewall rules, transfer server, syslog events
**Commercial Network**: Corporate AD logs, Office 365 commercial, firewall logs, endpoint alerts, email security, VPN access

### Alert Routing Matrix

| Alert Type | Severity | Recipient | Response |
|------------|----------|-----------|----------|
| Port security violation (CMMC switch) | Critical | IT Eng 1+2 + Manager | Immediate investigation |
| CUI keyword detected (transfer zone) | Critical | GCC Admin 1+2 + Manager | Quarantine file, report |
| Failed 802.1X auth (repeated) | High | IT Eng 1 | Investigate within 1 hr |
| Malware detected (Defender) | Critical | GCC Admin 1+2 + Manager | Isolate device now |
| Impossible travel (Azure AD) | High | GCC Admin 1+2 | Block account |
| After-hours CUI access | Medium | Manager | Review next business day |
| DLP violation (attempted CUI exfil) | High | GCC Admin 2 + Manager | Investigate, user training |

---

## CUI Spillage Incident Response

### Immediate Action (0-15 min)
1. Stop the breach
2. Notify Manager + GCC Admins
3. Document discovery

### Containment (15-60 min)
- **GCC Admin**: Quarantine file/email, delete from unauthorized location, recall email if possible, block further spread
- **Manager**: Start incident log, identify scope (who accessed?)

### Eradication (1-4 hours)
- **GCC Admin**: Verify no copies remain (email archives, local caches, mobile syncs, backups), force password resets if credentials compromised
- **Manager**: Interview involved parties, determine root cause, assess damage

### Notification (24-72 hours)
- Notify DoD customer (within 24 hours)
- Report to DIBNet (https://dibnet.dod.mil/) (within 72 hours)
- Inform C3PAO assessor
- Update POA&M

### Recovery (1-2 weeks)
- Implement corrective actions
- Update procedures
- Additional training
- Technical controls if needed
- Lessons learned session
- Update IR plan
- Document for compliance

**Evidence retention**: 3+ years

---

## Key Design Decisions

1. **Why Azure GCC High?**: CMMC Level 2 requires FedRAMP High, GCC High meets this requirement
2. **Why thin clients?**: Prevents local CUI storage, simplifies security (all data stays in cloud)
3. **Why one-way transfer?**: Eliminates reverse path for CUI to leak back into CMMC environment
4. **Why sanitization in AVD?**: Keeps CUI processing tools and files within CMMC boundary
5. **Why Plex stays commercial?**: Plex only receives sanitized data, keeping it out of CMMC scope reduces audit surface area
6. **Why separate email domains?**: Clear separation between safaricircuits.com (commercial) and safaricircuitsdefense.com (CUI)

---

## How to Apply This Knowledge

When working on CMMC-related tasks:

1. **Network changes**: Verify VLAN 100 isolation is maintained, firewall rules enforce deny-all between CMMC ↔ Commercial
2. **User access**: Always verify U.S. person status before granting GCC tenant access
3. **New CUI workflows**: Ensure data enters via GCC email only, never via commercial email or file transfers
4. **Transfer zone modifications**: Any changes to Python script must maintain keyword scanning and one-way flow
5. **Monitoring**: All new systems in CMMC boundary must send logs to Azure Sentinel
6. **Documentation**: Update this memory when architecture changes (new VLANs, systems, or processes)

---

## Related Documentation

- Source diagram file: `C:\Users\emarquez\Downloads\Safari_Circuits_Data_Flow_and_Boundary_Diagrams.md`
- Safari organizational standards: `@safari/CLAUDE.md` (work computer only)
- CMMC assessment: TBD (C3PAO engagement pending)
- Azure GCC High setup: TBD (deployment in progress)
