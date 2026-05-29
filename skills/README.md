# Skills

Reusable workflows and automations.

Each skill is a folder with `SKILL.md` and optional supporting files.

## Structure

```
skills/{skill-name}/
├── SKILL.md          (main documentation)
├── template.md       (optional template)
├── example.txt       (optional example)
└── config.json       (optional config)
```

## SKILL.md Template

```markdown
# Skill: {skill-name}

## Purpose
Brief description of what this skill does.

## When to Use
Scenarios where this skill is appropriate.

## Prerequisites
- Tools required
- Knowledge needed
- Files that must exist

## Instructions for Claude

### Step 1: {Action}
Detailed instructions...

### Step 2: {Action}
Detailed instructions...

### Step 3: {Action}
Detailed instructions...

## Success Criteria
How to verify the skill executed correctly.

## Examples

### Example 1: {Scenario}
```
Input: ...
Output: ...
```

### Example 2: {Scenario}
```
Input: ...
Output: ...
```

## Variations
Common variations or optional parameters.

## Related
- Related skills
- Related learnings
- External docs

## Changelog
- 2026-05-08: Created
```

## Naming Conventions

- Use kebab-case: `my-skill-name`
- Be descriptive: `setup-express-api` not `setup-api`
- Group by domain: `python-*`, `docker-*`, `git-*`

## Categories

- **Development:** `setup-*`, `scaffold-*`, `generate-*`
- **DevOps:** `deploy-*`, `docker-*`, `ci-*`
- **Data:** `etl-*`, `migration-*`, `query-*`
- **Utilities:** `convert-*`, `validate-*`, `check-*`

## Promotion from Learnings

Create a skill when:
- ✅ Workflow used 3+ times
- ✅ Steps are clear and repeatable
- ✅ Applies across multiple projects
- ✅ Saves significant time/effort

## Using Skills

Tell Claude:
```
Use the {skill-name} skill
```

Claude will read `skills/{skill-name}/SKILL.md` and follow the instructions.
