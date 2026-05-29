# /screenshot - Screenshot Finder

## Purpose

Quickly find and view screenshots from the Windows Screenshots folder, either the most recent one or a set of recent images matching a time window.

## Screenshots Folder

```
C:\Users\dkmcintyre\OneDrive - Safari Circuits, LLC\Pictures\Screenshots
```

## When User Says

- "I just took a screenshot of..."
- "look at my latest screenshot"
- "check my most recent screenshot"
- "search for images related to..."
- "find recent screenshots of..."
- "show me screenshots from..."
- "/screenshot"

## Arguments

Optional: `/screenshot $ARGUMENTS`

- No arguments → Find most recent screenshot
- With description → Find recent screenshots, optionally filter by timeframe

## Execution Steps

### Step 1: List Screenshots

Use Glob to find all image files in the screenshots folder:

```
Pattern: C:/Users/dkmcintyre/OneDrive - Safari Circuits, LLC/Pictures/Screenshots/*.{png,jpg,jpeg,gif,webp}
```

### Step 2: Determine Mode

| Trigger | Mode | Action |
|---------|------|--------|
| "just took", "latest", "most recent", no args | **Single** | Read only the most recent file |
| "search for", "find", "related to", "from today" | **Search** | Read the N most recent files (default: 5) |

### Step 3: Read Image(s)

Use the Read tool to view the image file(s). Claude can read images directly.

For **Single** mode:
- Read the most recent screenshot
- Describe what you see
- Ask if this is the one they meant

For **Search** mode:
- Read the 5 most recent screenshots (or specify count)
- Briefly describe each
- Ask which one(s) are relevant

### Step 4: Context Integration

After viewing:
- If user provides context ("screenshot of the error"), relate findings to that context
- If relevant to current work, offer to:
  - Create a work item with the screenshot reference
  - Add to documentation
  - Use for debugging

## Output Format

### Single Screenshot
```
📸 Most recent screenshot: [filename]
   Taken: [timestamp from filename or file metadata]

   [Description of what's in the image]

   Is this the screenshot you meant?
```

### Search Results
```
📸 Found [N] recent screenshots:

1. [filename] - [brief description]
2. [filename] - [brief description]
...

Which one(s) would you like to examine more closely?
```

## Examples

**Input:** "I just took a screenshot of an error"
```
📸 Most recent screenshot: Screenshot 2026-01-21 143052.png
   Taken: Today at 2:30 PM

   I can see an error dialog showing [error description].
   The error message states: "[visible text]"

   Would you like me to help debug this error?
```

**Input:** "find recent screenshots from today"
```
📸 Found 4 screenshots from today:

1. Screenshot 2026-01-21 143052.png - Error dialog
2. Screenshot 2026-01-21 141230.png - Power BI report
3. Screenshot 2026-01-21 103045.png - Teams conversation
4. Screenshot 2026-01-21 091522.png - Azure DevOps board

Which one(s) would you like to examine?
```

## Notes

- Windows Screenshots typically named: `Screenshot YYYY-MM-DD HHMMSS.png`
- Glob results are sorted by modification time (most recent first)
- Claude can directly read PNG, JPG, and other image formats
