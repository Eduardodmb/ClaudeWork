# Test and Fix

Run the test suite and fix any failures.

## Steps

1. **Run tests**
   ```bash
   npm test
   # or: yarn test, pnpm test, bun test, pytest, etc.
   ```

2. **Analyze failures**
   - Identify which tests failed
   - Understand the root cause
   - Check if it's a code issue or test issue

3. **Fix issues**
   - Make minimal changes to fix the failure
   - Prefer fixing code over modifying tests (unless test is wrong)

4. **Re-run tests**
   ```bash
   npm test
   ```

5. **Repeat until all pass**

## Output
- All tests passing
- Summary of fixes made

## Notes
- For documentation repos, this may run validation scripts instead
- Check `package.json` scripts or project README for test commands
