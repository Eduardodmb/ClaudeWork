# Review Changes

Review all uncommitted changes and provide feedback.

## Steps

1. **Get change summary**
   ```bash
   git status
   git diff --stat
   ```

2. **Review each changed file**
   ```bash
   git diff <file>
   ```

3. **Analyze changes for**
   - Code quality issues
   - Potential bugs
   - Missing error handling
   - Style inconsistencies
   - Documentation gaps

4. **Provide feedback**
   - List issues found
   - Suggest improvements
   - Highlight good patterns

## Output
- Summary of all changes
- Issues and suggestions organized by file
- Recommendation: ready to commit or needs work

## Notes
- Use before committing to catch issues early
- Focuses on the diff, not the entire file
