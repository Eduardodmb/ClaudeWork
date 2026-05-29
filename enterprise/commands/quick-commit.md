# Quick Commit

Stage all changes and commit with a descriptive message.

## Steps

1. **Review changes**
   ```bash
   git status
   git diff
   ```

2. **Stage all changes**
   ```bash
   git add -A
   ```

3. **Generate commit message**
   - Analyze what changed
   - Write concise, descriptive message
   - Use conventional commit format

4. **Commit**
   ```bash
   git commit -m "type(scope): description"
   ```

## Output
- All changes staged and committed
- Commit hash displayed

## Notes
- Does NOT push to remote (use `/commit-push-pr` for full workflow)
- Reviews changes before committing to ensure nothing unexpected is included
