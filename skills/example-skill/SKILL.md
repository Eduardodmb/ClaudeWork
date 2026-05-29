# Skill: example-skill

This is a template showing how to create a skill.

## Purpose

Delete this example and replace with your own skills.

Skills are reusable workflows that you use repeatedly across projects.

## When to Use

Create a skill when you find yourself doing the same workflow 3+ times.

## Prerequisites

- List tools required
- List knowledge needed
- List files that must exist

## Instructions for Claude

### Step 1: Understand the Goal

When user invokes this skill:
1. Read the user's request carefully
2. Identify what they want to accomplish
3. Confirm understanding before proceeding

### Step 2: Execute the Workflow

Follow these steps:
1. First action
2. Second action
3. Third action

### Step 3: Verify Success

Check that:
- [ ] Expected output exists
- [ ] No errors occurred
- [ ] User can verify the result

## Success Criteria

How to know the skill executed correctly:
- Specific files created
- Commands ran successfully
- Output matches expected format

## Examples

### Example 1: Basic Usage

**User says:**
```
Use the example-skill skill
```

**Claude does:**
1. Follows steps above
2. Creates expected output
3. Confirms completion

### Example 2: Real Skill (Replace This)

**Real skill example:**

```markdown
# Skill: setup-express-api

## Purpose
Scaffold a new Express.js API with standard middleware and folder structure.

## When to Use
Starting a new Express API project from scratch.

## Prerequisites
- Node.js installed
- npm or yarn available
- Terminal access

## Instructions for Claude

### Step 1: Create Project Structure
```bash
mkdir -p src/{routes,middleware,controllers,models,utils,config}
mkdir tests
```

### Step 2: Initialize Package
```bash
npm init -y
npm install express cors helmet dotenv
npm install -D @types/express @types/node typescript tsx nodemon
```

### Step 3: Create Core Files

Create `src/index.ts`:
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

Create `.env`:
```
PORT=3000
NODE_ENV=development
```

### Step 4: Add Scripts to package.json
```json
"scripts": {
  "dev": "nodemon --exec tsx src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

## Success Criteria
- [ ] Project structure created
- [ ] Dependencies installed
- [ ] Server starts with `npm run dev`
- [ ] GET /health returns 200 OK

## Examples

### Example: Basic Setup
```bash
User: Use the setup-express-api skill
Claude: Creates full structure as defined above
Result: Working Express API ready for development
```
```

## Variations

Optional variations of this skill:
- Variation 1: [description]
- Variation 2: [description]

## Related

- Learning: `learning/best-practices/example-learning.md`
- Command: `commands/example-command.md`
- Other skills that use this skill

## Changelog

- 2026-05-08: Created example template
