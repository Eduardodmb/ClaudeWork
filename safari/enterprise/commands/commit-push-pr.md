# Commit, Push, and Create PR

Commit all staged changes, push to remote, and create a pull request.

## Steps

1. **Check for changes**
   ```bash
   git status
   git diff --staged
   ```

2. **Generate commit message**
   - Analyze the changes
   - Write a descriptive commit message following conventional commits
   - Format: `type(scope): description`

3. **Commit changes**
   ```bash
   git add -A
   git commit -m "generated message"
   ```

4. **Push to remote**
   ```bash
   git push -u origin $(git branch --show-current)
   ```

5. **Create pull request**
   ```bash
   gh pr create --title "PR title" --body "Description of changes"
   ```

## Output
- Committed changes with descriptive message
- Pushed to remote branch
- PR created with link provided

## Notes
- Requires `gh` CLI to be authenticated
- Will create branch if it doesn't exist on remote
- Follows repository's PR template if available
