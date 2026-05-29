# Commands

Custom slash commands for Claude Code.

Each command is a `.md` file that Claude reads when you invoke `/{command-name}`.

## Structure

```
commands/
├── mycommand.md       (command definition)
├── another.md         (another command)
└── README.md          (this file)
```

## Command Template

Create `commands/{command-name}.md`:

```markdown
# Command: /{command-name}

## Purpose
What this command does in 1-2 sentences.

## Usage
/{command-name} [optional-args]

## Arguments
- `arg1` - Description of first argument (optional)
- `arg2` - Description of second argument (required)

## Instructions for Claude

When user invokes `/{command-name}`:

### Step 1: {Action}
Detailed instructions for what Claude should do first.

### Step 2: {Action}
Next action...

### Step 3: {Action}
Final action...

## Examples

### Example 1: Basic usage
```
User: /mycommand
Claude: [does this]
```

### Example 2: With arguments
```
User: /mycommand --arg value
Claude: [does that]
```

## Success Criteria
How to verify the command executed successfully.

## Related
- Related commands
- Related skills
```

## Naming Conventions

- Use lowercase: `/mycommand` not `/MyCommand`
- Use hyphens: `/my-command` not `/my_command`
- Be concise: `/commit` not `/commit-changes-to-git`

## Command Categories

### Development
- `/scaffold` - Scaffold new project
- `/test` - Run tests
- `/lint` - Run linter

### Documentation
- `/docs` - Update documentation
- `/readme` - Generate README

### Git
- `/commit` - Smart commit
- `/push` - Push changes
- `/pr` - Create pull request

### Utility
- `/review` - Review code
- `/cleanup` - Clean up files
- `/search` - Smart search

## Using Commands

In Claude Code:
```
/mycommand arg1 arg2
```

Claude reads `commands/mycommand.md` and follows the instructions.

## Tips

- Keep commands focused on one thing
- Make them composable (commands can invoke skills)
- Use arguments for flexibility
- Document success criteria clearly
