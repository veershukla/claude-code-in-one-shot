# ADR 001 — Frontend Stack

**Date**: 2026-05-03
**Status**: Accepted

## Context

Need a fast, maintainable frontend for a developer portfolio. The design calls
for a dark/techy aesthetic with custom colors and a monospace font. The site
is Phase 1 static-only; Phase 2 will add backend API calls.

## Decision

- **React 18** — component model maps cleanly to the section/card structure
- **Vite 5** — fast HMR in dev, Rollup-based production build with chunk hashing
- **Tailwind CSS 3** — utility classes let design tokens (colors, fonts) live in
  `tailwind.config.js` as a single source of truth; no CSS-in-JS runtime overhead
- **JetBrains Mono + Inter** — loaded via Google Fonts in index.html; no FOUT
  because fonts are declared in `<head>` with `display=swap`
- No CSS framework beyond Tailwind (no MUI, Chakra) — keeps bundle small and
  gives full control over the dark theme

## Color Tokens (defined in tailwind.config.js)

| Token              | Hex       | Use                            |
|--------------------|-----------|--------------------------------|
| `background`       | `#0a0a0a` | Page background                |
| `surface`          | `#111111` | Card background                |
| `surface-elevated` | `#1a1a1a` | Card hover state               |
| `text.primary`     | `#e2e8f0` | Body text                      |
| `text.muted`       | `#94a3b8` | Secondary text, descriptions   |
| `accent.DEFAULT`   | `#00ff88` | Name, badges, buttons, borders |
| `accent.dim`       | `#00cc6a` | Accent hover states            |

## Consequences

- Tailwind purge/JIT requires all class names to be statically analyzable —
  avoid dynamic class construction (e.g., `text-${color}`) without safelisting
- Vite outputs hashed filenames — nginx can cache assets for 1 year (`immutable`)
- Adding shadcn/ui or Radix UI components in Phase 2 is straightforward since
  they are Tailwind-compatible
