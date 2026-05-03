# ADR 003 — Phase Architecture: Static → API-Backed

**Date**: 2026-05-03
**Status**: Accepted

## Context

The portfolio is built in two phases:
- **Phase 1** (now): 100% static. No server-side logic.
- **Phase 2** (future): FastAPI or Express backend, PostgreSQL for projects data,
  potentially a CMS or admin panel.

The code must be structured so Phase 2 additions require minimal changes to
Phase 1 files.

## Decision: The Data Seam

All project data in Phase 1 lives in a single file:

```
frontend/src/data/projects.js
```

This file exports a `PROJECTS` array. The array shape is the API contract.

In Phase 2, this file is replaced by an async fetch function:

```js
// Phase 2 replacement for data/projects.js
export async function fetchProjects() {
  const res = await fetch('/api/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}
```

`Projects.jsx` will be updated to call `fetchProjects()` via `useEffect` or
React Query. No other component changes are needed.

## Phase 2 docker-compose Additions

```yaml
backend:
  build: ./backend
  environment:
    DATABASE_URL: postgresql://user:pass@db:5432/portfolio
  depends_on:
    - db

db:
  image: postgres:16-alpine
  volumes:
    - postgres_data:/var/lib/postgresql/data
  environment:
    POSTGRES_DB: portfolio
    POSTGRES_USER: user
    POSTGRES_PASSWORD: pass

volumes:
  postgres_data:
```

## Phase 2 nginx.conf Addition

Add a proxy block before the SPA fallback:

```nginx
location /api/ {
    proxy_pass http://backend:8000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## What Does NOT Change in Phase 2

- `Hero.jsx` — untouched
- `App.jsx` — untouched
- `tailwind.config.js` — untouched
- `Dockerfile` — untouched (backend gets its own Dockerfile)
- `nginx.conf` — only one new `location` block added

## Consequences

- The `PROJECTS` array shape in `data/projects.js` is the implicit API schema.
  When writing the Phase 2 `/api/projects` endpoint, match this shape exactly.
- If `highlight` field logic becomes dynamic in Phase 2, add it as a boolean
  column in the `projects` DB table.
- React Query (`@tanstack/react-query`) is the recommended Phase 2 data-fetching
  layer — it handles caching, loading states, and refetch-on-focus automatically.
