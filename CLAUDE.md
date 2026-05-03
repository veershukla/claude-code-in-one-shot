# Portfolio Website

## Project overview

Veer Shukla's personal portfolio website. Phase 1 is a fully static React app served by nginx inside Docker, exposed publicly via ngrok. Phase 2 will add a FastAPI backend and PostgreSQL.

## Tech stack

- **Frontend:** React 18 + Vite 5 + Tailwind CSS 3
- **Fonts:** JetBrains Mono (monospace) + Inter (sans) via Google Fonts
- **Serving:** nginx:alpine (multi-stage Docker build)
- **Tunnel:** ngrok (runs as a Docker service)

## Design tokens (tailwind.config.js)

| Token              | Hex       | Use                              |
|--------------------|-----------|----------------------------------|
| background         | #0a0a0a   | Page background                  |
| surface            | #111111   | Card background                  |
| surface-elevated   | #1a1a1a   | Card hover state                 |
| text.primary       | #e2e8f0   | Body text                        |
| text.muted         | #94a3b8   | Secondary / description text     |
| accent             | #00ff88   | Neon green -- name, badges, btns |

## Directory structure

```
.
+-- frontend/
|   +-- src/
|   |   +-- components/
|   |   |   +-- Hero.jsx
|   |   |   +-- Projects.jsx
|   |   |   +-- Clock.jsx
|   |   +-- data/
|   |   |   +-- projects.js
|   |   +-- App.jsx
|   |   +-- main.jsx
|   |   +-- index.css
|   +-- index.html
|   +-- package.json
|   +-- vite.config.js
|   +-- tailwind.config.js
|   +-- postcss.config.js
+-- nginx/
|   +-- nginx.conf
+-- Dockerfile
+-- docker-compose.yml
+-- .env               (gitignored -- copy from .env.example)
+-- .env.example
+-- .gitignore
+-- task.md
+-- decisions/
    +-- 001-frontend-stack.md
    +-- 002-infra-docker-nginx-ngrok.md
    +-- 003-phase-architecture.md
```

## How to run

### Local dev (hot reload, no Docker)
```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

### Production (Docker + ngrok)
```bash
cp .env.example .env   # add your NGROK_AUTHTOKEN
docker compose build
docker compose up -d
# Visit http://localhost:4040 for the public URL
docker compose down
```

After ANY frontend source change:
```bash
docker compose build && docker compose up -d
```

## Critical rules

### Tailwind class names must be static
```js
// BAD  -- JIT cannot detect dynamic names
const cls = `text-${color}-500`
// GOOD
const cls = color === 'accent' ? 'text-accent' : 'text-text-muted'
```

### Phase 1/2 seam -- do not break
`frontend/src/data/projects.js` exports a static PROJECTS array. No async, fetch, or backend imports in Phase 1.

### Docker rebuild required after source changes
nginx serves the pre-built /dist. Changes only appear after `docker compose build`.

### SPA routing is handled by nginx
`try_files $uri $uri/ /index.html` in nginx/nginx.conf must not be removed.

### ngrok URL changes on every restart (free tier)
Visit http://localhost:4040 after `docker compose up` for the current public URL.

## Projects showcased (Phase 1 static data)

| Title              | Tech                                    | Highlighted |
|--------------------|-----------------------------------------|-------------|
| Spendly            | Python, Flask, SQLite                   | No          |
| Pareto Problem Set | Java, DSA                               | No          |
| Agentic AI         | Python, LangGraph, CrewAI, AutoGen, MCP | Yes         |
| LeetCode Curation  | Java, Algorithms, Interview Prep        | No          |

## Phase 2 (future)

1. Add `backend/` (FastAPI) and `db` (postgres:16-alpine) to `docker-compose.yml`
2. Add `location /api/ { proxy_pass http://backend:8000/; }` to `nginx/nginx.conf`
3. Replace `frontend/src/data/projects.js` with an async `fetchProjects()` hook
4. Update `Projects.jsx` to use `useEffect` or React Query

See `decisions/003-phase-architecture.md` for full details.

## Automated code review

A FileChanged hook in `.claude/settings.local.json` triggers `.claude/agents/code-reviewer.md` on every source file save.
