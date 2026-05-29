# Documentation Writer Skill

## Purpose
Generate well-structured documentation following organizational standards.

## Trigger Phrases
- "Write documentation for..."
- "Document this process..."
- "Create a README for..."

## Required Context
- Target domain or product folder
- Type of documentation (entity, process, API, guide)
- Audience (developers, end-users, administrators)

## Steps

1. **Identify Documentation Type**
   - Entity documentation → Use entity template
   - Process documentation → Use process template
   - API documentation → Use API template
   - User guide → Use guide template

2. **Gather Information**
   - Review related existing documentation
   - Check domain context-map for relationships
   - Identify key stakeholders and systems

3. **Draft Structure**
   - Create outline following template
   - Include all required sections
   - Plan cross-references

4. **Write Content**
   - Use clear, concise language
   - Include examples where helpful
   - Add diagrams for complex concepts

5. **Review and Link**
   - Verify all links work
   - Update related READMEs
   - Add to glossary if new terms introduced

## Output
Markdown documentation file placed in appropriate directory.

## Example

**Input:** "Document the Engineering Change Order process"

**Actions:**
1. Create `domains/engineering/processes/eco-workflow.md`
2. Include trigger, steps, roles, systems
3. Link to ECO entity in `domains/engineering/entities/`
4. Update `domains/engineering/README.md`

**Output:** Complete process documentation with cross-references
