# Validate Documentation

Run validation checks on documentation files.

## Steps

1. **Check file structure**
   - Verify files are in correct directories
   - Check naming conventions followed
   - Validate frontmatter/metadata

2. **Validate links**
   ```bash
   # Find broken internal links
   grep -r "\[.*\](.*\.md)" --include="*.md" | while read line; do
     # Check each link exists
   done
   ```

3. **Check index.yaml**
   - All documented items have entries
   - No orphaned entries
   - IDs are unique

4. **Verify formatting**
   - Headers follow hierarchy
   - Code blocks have language specified
   - Tables are properly formatted

5. **Run project validation**
   ```bash
   npm run validate  # if available
   ```

## Output
- List of validation errors
- List of warnings
- Suggestions for improvement

## Notes
- Run before committing documentation changes
- Part of the verification loop
