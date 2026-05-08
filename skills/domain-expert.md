# Domain Expert Skill

## Purpose
Answer questions about specific business domains using documented knowledge.

## Trigger Phrases
- "How does [domain] handle..."
- "What is the process for..."
- "Explain the [domain] workflow..."

## Required Context
- Domain folder (`domains/<domain-name>/`)
- Related entity and process documentation
- Integration documentation

## Steps

1. **Identify Domain**
   - Map question to one of 9 business domains
   - Load domain README for overview

2. **Locate Relevant Documentation**
   - Search entities for subject matter
   - Search processes for workflow questions
   - Check integrations for system questions

3. **Synthesize Answer**
   - Combine information from multiple sources
   - Reference specific documents
   - Note any gaps in documentation

4. **Provide Context**
   - Explain relationships to other domains
   - Mention relevant systems
   - Suggest related documentation

## Output
Comprehensive answer with document references.

## Domain Mapping

| Keywords | Domain |
|----------|--------|
| calendar, policy, org chart, announcement | company-info |
| CAD, ECO, BOM, design, technical | engineering |
| budget, accounting, planful, forecast | finance |
| employee, payroll, benefits, onboarding | human-resources |
| system, infrastructure, admin, IT | information-technology |
| production, work order, shop floor, MES | manufacturing |
| QC, inspection, NCR, audit, certification | quality |
| CRM, quote, customer, marketing | sales-marketing |
| purchasing, inventory, supplier, receiving | supply-chain |

## Example

**Input:** "How do we handle engineering change orders?"

**Response:**
"Based on `domains/engineering/processes/eco-workflow.md`:

The ECO process is initiated when... [synthesized answer]

Related documentation:
- Entity: `domains/engineering/entities/engineering-change-order.md`
- Integration: `domains/engineering/integrations/plm-integration.md`
- Cross-domain impact: May affect Manufacturing and Quality domains"
