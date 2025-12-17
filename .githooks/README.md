# Git Hooks

This directory contains Git hooks for the lum-ui project.

## Available Hooks

### pre-commit

Automatically generates component screenshots when source files change.

**Triggers when:**
- Any file in `src/components.ts`, `src/charts.ts`, `src/tables.ts`, `src/metrics.ts`, or `src/layouts.ts` is modified
- Force flag is set

**Usage:**

```bash
# Normal commit (auto-detects changes)
git commit -m "feat: Update Button component"

# Force regenerate all screenshots
FORCE_SCREENSHOTS=1 git commit -m "chore: Update all screenshots"

# Skip hook if needed
git commit --no-verify -m "docs: Update README"
```

**Requirements:**
- Chrome or Chromium browser installed
- Deno runtime

**Setup:**

Run the setup script to configure hooks:

```bash
./scripts/setup-hooks.sh
```

This configures Git to use hooks from `.githooks/` directory instead of `.git/hooks/`.
