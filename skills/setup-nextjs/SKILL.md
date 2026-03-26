---
name: setup-nextjs
description: >
  Use this skill to scaffold a new Next.js project from scratch with Tailwind CSS
  and shadcn/ui pre-configured. Trigger when the user asks to: create a new web app,
  scaffold a new Next.js project, set up a new frontend project, create a dashboard,
  build a new web application, or start a new React/Next.js project. Also trigger when
  asked to "set up the stack", "initialize a new project", or "create a new app with
  shadcn". Do NOT trigger for modifications to existing Next.js projects — only for
  brand new project creation.
---

# Setup Next.js + Tailwind CSS + shadcn/ui

This skill scaffolds a production-ready Next.js project with Tailwind CSS v4 and
shadcn/ui v4, handling environment quirks (blocked registries, no Google Fonts) that
commonly occur in restricted networks.

## Overview

The setup has four phases:
1. Bootstrap the Next.js app with `create-next-app`
2. Configure shadcn/ui manually (remote registry is often blocked)
3. Install and create UI components
4. Write a demo page to verify everything works

Always create the project in a subdirectory (e.g., `app/`) to keep it isolated from
any existing repo content. Ask the user for the directory name if not specified —
default to `app/`.

---

## Phase 1 — Bootstrap Next.js

Run from the repo root:

```bash
npx create-next-app@latest <dir> \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --yes
```

The `--yes` flag skips all interactive prompts. Replace `<dir>` with the target
directory name (e.g., `app`).

**What gets created:**
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- `next.config.ts`, `tsconfig.json`, `package.json`, `.gitignore`
- Tailwind CSS v4 with `@import "tailwindcss"` in globals.css

---

## Phase 2 — Fix Google Fonts (network blocked)

`create-next-app` generates a `layout.tsx` that imports Geist from Google Fonts.
This will fail in restricted environments. Always replace it with system fonts:

**`src/app/layout.tsx`** — replace the generated file with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js + Tailwind CSS + shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
```

---

## Phase 3 — Configure shadcn/ui Manually

The `npx shadcn@latest init` CLI fetches from `ui.shadcn.com` which is often blocked.
Set it up manually instead — it's just a few files.

### 3a. Install dependencies

```bash
npm --prefix <dir> install \
  class-variance-authority clsx tailwind-merge lucide-react \
  @radix-ui/react-slot @radix-ui/react-label
```

### 3b. Create `components.json`

Create `<dir>/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### 3c. Replace `src/app/globals.css`

Replace the generated file with shadcn/ui color tokens for Tailwind v4:

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.141 0.004 285.938);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.141 0.004 285.938);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.141 0.004 285.938);
    --primary: oklch(0.21 0.006 285.885);
    --primary-foreground: oklch(0.985 0.001 106.423);
    --secondary: oklch(0.967 0.001 286.375);
    --secondary-foreground: oklch(0.21 0.006 285.885);
    --muted: oklch(0.967 0.001 286.375);
    --muted-foreground: oklch(0.552 0.016 285.938);
    --accent: oklch(0.967 0.001 286.375);
    --accent-foreground: oklch(0.21 0.006 285.885);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.92 0.004 286.375);
    --input: oklch(0.92 0.004 286.375);
    --ring: oklch(0.705 0.015 286.067);
    --radius: 0.625rem;
  }

  .dark {
    --background: oklch(0.141 0.004 285.938);
    --foreground: oklch(0.985 0.001 106.423);
    --card: oklch(0.141 0.004 285.938);
    --card-foreground: oklch(0.985 0.001 106.423);
    --popover: oklch(0.141 0.004 285.938);
    --popover-foreground: oklch(0.985 0.001 106.423);
    --primary: oklch(0.985 0.001 106.423);
    --primary-foreground: oklch(0.21 0.006 285.885);
    --secondary: oklch(0.269 0.006 286.033);
    --secondary-foreground: oklch(0.985 0.001 106.423);
    --muted: oklch(0.269 0.006 286.033);
    --muted-foreground: oklch(0.705 0.015 286.067);
    --accent: oklch(0.269 0.006 286.033);
    --accent-foreground: oklch(0.985 0.001 106.423);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.552 0.016 285.938);
  }
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", monospace;
}

@layer base {
  * {
    border-color: var(--border);
    outline-color: var(--ring);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
```

### 3d. Create `src/lib/utils.ts`

```bash
mkdir -p <dir>/src/lib <dir>/src/components/ui
```

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Phase 4 — Create UI Components

Create each file under `src/components/ui/`. These are the canonical shadcn/ui v4
component sources for Tailwind v4, using oklch color tokens.

See the reference files in this skill directory for the full source of each component:
- `references/button.tsx`
- `references/input.tsx`
- `references/label.tsx`
- `references/card.tsx`
- `references/badge.tsx`
- `references/alert.tsx`

Add more components as the project requires. Common ones for dashboards:
- `table.tsx` — needs `@radix-ui/react-table` or plain HTML table
- `select.tsx` — needs `@radix-ui/react-select`
- `dialog.tsx` — needs `@radix-ui/react-dialog`
- `dropdown-menu.tsx` — needs `@radix-ui/react-dropdown-menu`
- `separator.tsx` — needs `@radix-ui/react-separator`
- `avatar.tsx` — needs `@radix-ui/react-avatar`

Install the matching Radix package before creating each component, e.g.:
```bash
npm --prefix <dir> install @radix-ui/react-select
```

---

## Phase 5 — Verify

Run all three checks from inside the project directory:

```bash
cd <dir>
npx tsc --noEmit   # should exit 0
npm run lint       # should exit 0
npm run build      # should produce .next/ with no errors
```

Fix any errors before proceeding to build features.

---

## Asking the User

Before starting, confirm:
1. **Directory name** — default `app/`, or what the user prefers
2. **Project purpose** — dashboard, landing page, admin panel, etc.
3. **Extra components needed** — e.g., "I need a data table and charts"

After setup, always ask what to build next (e.g., layout, pages, features).

---

## Common Pitfalls

- **`shadcn add` fails** — remote registry blocked; create component files manually using the reference files in this skill
- **Build fails with Google Fonts error** — always replace the generated `layout.tsx` as shown in Phase 2
- **`@/*` alias not resolving** — ensure `tsconfig.json` has `"paths": { "@/*": ["./src/*"] }`
- **Tailwind classes not applying** — confirm `globals.css` uses `@import "tailwindcss"` (v4 syntax, not `@tailwind base/components/utilities`)
- **Dark mode not working** — the CSS uses `.dark` class strategy; add `dark` class to `<html>` to test
