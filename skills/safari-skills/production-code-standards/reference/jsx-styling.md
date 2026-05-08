# Safari JSX/React Component Styling Guide

Reference for creating branded React components with Safari Circuits styling. Used for Safari apps: Trace, Docs, Analyze, Assist, Studio.

## Safari App Suite

| App | Purpose | Primary Color Accent |
|-----|---------|---------------------|
| **Safari Trace** | Observability, logging | Phase Purple `#a78bfa` |
| **Safari Docs** | Documentation platform | Phase Blue `#60a5fa` |
| **Safari Analyze** | Analytics, dashboards | Phase Green `#34d399` |
| **Safari Assist** | AI assistant interface | Safari Red `#9B1C1C` |
| **Safari Studio** | Development tools | Phase Orange `#f59e0b` |

All apps share the same base theme with app-specific accent colors.

---

## Theme System

### CSS Variables (Shared across all Safari apps)

```css
:root {
  /* Brand Core */
  --safari-red: #9B1C1C;
  --safari-red-light: #B82424;
  --safari-red-dark: #7B1616;

  /* Dark Theme (Default for Safari Apps) */
  --background: #0F172A;
  --background-secondary: #1E293B;
  --surface: #1E293B;
  --surface-elevated: #334155;

  /* Text */
  --text-primary: #F8FAFC;
  --text-secondary: #E2E8F0;
  --text-muted: #94A3B8;
  --text-disabled: #64748B;

  /* Borders */
  --border: #334155;
  --border-light: #475569;
  --border-focus: var(--safari-red);

  /* Status Colors */
  --success: #34d399;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #60a5fa;

  /* Phase/Accent Colors */
  --accent-blue: #60a5fa;
  --accent-green: #34d399;
  --accent-orange: #f59e0b;
  --accent-purple: #a78bfa;
  --accent-pink: #ec4899;

  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
```

### Light Theme Override

```css
[data-theme="light"] {
  --background: #FEFDFF;
  --background-secondary: #F8F7F5;
  --surface: #FFFFFF;
  --surface-elevated: #FFFFFF;

  --text-primary: #1E1E1E;
  --text-secondary: #2D2D2D;
  --text-muted: #6B7280;
  --text-disabled: #9CA3AF;

  --border: #E5E5E5;
  --border-light: #F0F0F0;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

---

## Typography

### Font Setup

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-sans: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale

```css
.text-xs { font-size: 0.75rem; line-height: 1rem; }      /* 12px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }  /* 14px */
.text-base { font-size: 1rem; line-height: 1.5rem; }     /* 16px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }  /* 18px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }   /* 20px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }      /* 24px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px */

.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

---

## Component Library

### Button

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled,
  onClick
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

```css
.btn {
  font-family: var(--font-sans);
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.btn-sm { padding: var(--space-1) var(--space-3); font-size: 0.875rem; }
.btn-md { padding: var(--space-2) var(--space-4); font-size: 0.875rem; }
.btn-lg { padding: var(--space-3) var(--space-6); font-size: 1rem; }

.btn-primary {
  background: var(--safari-red);
  color: white;
  border: none;
}
.btn-primary:hover { background: var(--safari-red-light); }

.btn-secondary {
  background: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
.btn-secondary:hover { background: var(--surface-elevated); }

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: none;
}
.btn-ghost:hover { background: var(--surface); }

.btn-danger {
  background: var(--error);
  color: white;
  border: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Card

```tsx
type CardProps = {
  children: React.ReactNode;
  elevated?: boolean;
  accent?: 'blue' | 'green' | 'red' | 'orange' | 'purple';
};

const Card: React.FC<CardProps> = ({ children, elevated, accent }) => {
  return (
    <div className={`card ${elevated ? 'card-elevated' : ''} ${accent ? `card-accent-${accent}` : ''}`}>
      {children}
    </div>
  );
};
```

```css
.card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--border);
}

.card-elevated {
  background: var(--surface-elevated);
  box-shadow: var(--shadow-md);
  border: none;
}

.card-accent-blue { border-left: 4px solid var(--accent-blue); }
.card-accent-green { border-left: 4px solid var(--accent-green); }
.card-accent-red { border-left: 4px solid var(--safari-red); }
.card-accent-orange { border-left: 4px solid var(--accent-orange); }
.card-accent-purple { border-left: 4px solid var(--accent-purple); }
```

### Input

```tsx
type InputProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ label, placeholder, error, value, onChange }) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input ${error ? 'input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};
```

```css
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.input {
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  font-size: 0.875rem;
  color: var(--text-primary);
  transition: border-color var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 2px rgba(155, 28, 28, 0.2);
}

.input-error {
  border-color: var(--error);
}

.input-error-text {
  font-size: 0.75rem;
  color: var(--error);
}
```

### Badge/Tag

```tsx
type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
};

const Badge: React.FC<BadgeProps> = ({ variant = 'default', children }) => {
  return <span className={`badge badge-${variant}`}>{children}</span>;
};
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: var(--radius-full);
}

.badge-default {
  background: var(--surface-elevated);
  color: var(--text-secondary);
}
.badge-success {
  background: rgba(52, 211, 153, 0.15);
  color: var(--success);
}
.badge-warning {
  background: rgba(245, 158, 11, 0.15);
  color: var(--warning);
}
.badge-error {
  background: rgba(239, 68, 68, 0.15);
  color: var(--error);
}
.badge-info {
  background: rgba(96, 165, 250, 0.15);
  color: var(--info);
}
```

### Table

```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background: var(--background-secondary);
  padding: var(--space-3) var(--space-4);
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: var(--space-3) var(--space-4);
  font-size: 0.875rem;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
}

.table tr:hover td {
  background: var(--surface);
}
```

---

## Layout Components

### Sidebar

```css
.sidebar {
  width: 240px;
  height: 100vh;
  background: var(--background);
  border-right: 1px solid var(--border);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: var(--space-4);
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 0.875rem;
  transition: all var(--transition-fast);
}

.sidebar-nav-item:hover {
  background: var(--surface);
  color: var(--text-primary);
}

.sidebar-nav-item.active {
  background: rgba(155, 28, 28, 0.1);
  color: var(--safari-red);
}
```

### Header

```css
.header {
  height: 64px;
  background: var(--background);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
}

.header-logo {
  height: 28px;
}

.header-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}
```

---

## Safari Logo Component

```tsx
// NEVER fabricate - always use the official SVG
const SafariLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 430.7 85.9"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* All 7 paths required - see html-deliverable-styling.md for full SVG */}
      <path fill="#9B1C1C" d="M79.5,85.7c3.1-6.7..."/>
      <path fill="#9B1C1C" d="M257,85.7c1.5-4.8..."/>
      <path fill="#9B1C1C" d="M360,50.7c7.4,5.7..."/>
      <path fill="#9B1C1C" d="M0,85.4c2.7-6..."/>
      <path fill="#9B1C1C" d="M430.7,0.2c-2.1..."/>
      <path fill="#9B1C1C" d="M225.8,32.4c-2.7..."/>
      <path fill="#9B1C1C" d="M185.7,18.2c1.9..."/>
    </svg>
  );
};
```

**CRITICAL:** Import the full logo from `shared/branding/assets/logos/` - never inline partial SVGs.

---

## File Structure

```
src/
├── styles/
│   ├── variables.css      # CSS custom properties
│   ├── typography.css     # Font imports, text styles
│   ├── components.css     # Component styles
│   └── index.css          # Main import file
├── components/
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   └── ...
└── assets/
    └── logos/
        └── safari-logo.svg  # Copied from brand assets
```

---

## Checklist: JSX Component

### Theme
- [ ] Uses CSS variables (not hardcoded colors)
- [ ] Supports dark and light themes
- [ ] Consistent spacing scale

### Brand
- [ ] Safari logo imported (not fabricated)
- [ ] Safari Red for primary actions
- [ ] App-specific accent color where appropriate

### Accessibility
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigable
- [ ] ARIA labels where needed

### Code Quality
- [ ] TypeScript types defined
- [ ] Props documented
- [ ] Responsive design
- [ ] Transition animations included

---

## Reference Files

- **Full CSS Variables:** `shared/styles/safari-theme.css`
- **Safari Logo SVG:** `shared/branding/assets/logos/svg/safari-logo.svg`
- **Component Library:** `shared/components/`
- **HTML Patterns:** See `html-deliverable-styling.md`
