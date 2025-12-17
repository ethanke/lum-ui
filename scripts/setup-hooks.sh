#!/bin/bash

# Setup Git hooks for lum-ui development

set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
HOOKS_DIR="$REPO_ROOT/.githooks"
GIT_HOOKS_DIR="$REPO_ROOT/.git/hooks"

echo "🔧 Setting up Git hooks for lum-ui..."

# Configure git to use .githooks directory
git config core.hooksPath "$HOOKS_DIR"

# Make hooks executable
chmod +x "$HOOKS_DIR"/*

echo "✅ Git hooks configured successfully!"
echo ""
echo "Available hooks:"
echo "  - pre-commit: Generates screenshots when component files change"
echo ""
echo "Usage:"
echo "  Normal commit: git commit -m 'message'"
echo "  Force screenshots: FORCE_SCREENSHOTS=1 git commit -m 'message'"
echo "  Skip hook: git commit --no-verify -m 'message'"
echo ""
