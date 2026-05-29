# Sync Index

Synchronize index.yaml with actual documentation files.

## Steps

1. **Scan documentation**
   - Find all .md files in domains/, products/, agents/, runbooks/
   - Extract metadata from each file
   - Note any new or removed files

2. **Compare with index.yaml**
   - Identify files not in index
   - Identify index entries without files
   - Check for metadata mismatches

3. **Update index.yaml**
   - Add entries for new files
   - Remove entries for deleted files
   - Update metadata for changed files

4. **Validate structure**
   - Ensure proper YAML formatting
   - Verify all required fields present
   - Check ID uniqueness

## Output
- Updated index.yaml
- Summary of additions/removals/updates

## Notes
- Run after adding or reorganizing documentation
- Keeps the catalog in sync with actual content
