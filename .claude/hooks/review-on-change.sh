#!/usr/bin/env bash
# Triggered by FileChanged hook. Reads the changed file path from stdin JSON,
# filters out non-source files, then spawns a claude code-reviewer subagent.

set -euo pipefail

FILE=$(jq -r '.file_path // empty' 2>/dev/null)

# Nothing to review if no file path
[ -z "$FILE" ] && exit 0

# Skip generated / non-source paths
if echo "$FILE" | grep -qE '(node_modules|/dist/|/\.git/|package-lock\.json|\.env|/\.claude/)'; then
  exit 0
fi

# Only review recognised source file types
if ! echo "$FILE" | grep -qE '\.(jsx?|tsx?|css|conf|yml|yaml|Dockerfile|py|java|md|sh)$'; then
  exit 0
fi

# Spawn claude in non-interactive print mode with the code-reviewer agent
claude --agent code-reviewer -p "A file was just changed: $FILE

Read the file using the Read tool, then produce a concise code review following the guidelines in .claude/agents/code-reviewer.md. Focus on: bugs, security issues, performance, Tailwind class safety (no dynamic class names), and code quality. Use 🔴🟠🟡🔵 severity levels. If there are no issues, say so clearly." \
  --allowedTools "Read,Bash,Grep,Glob" \
  2>/dev/null || true
