# Veer Shukla — Portfolio

> Personal portfolio website built in one shot with [Claude Code](https://claude.ai/code).

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)
![nginx](https://img.shields.io/badge/nginx-alpine-009639?logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-compose-2496ED?logo=docker&logoColor=white)
![ngrok](https://img.shields.io/badge/ngrok-tunnel-1F1E37?logo=ngrok&logoColor=white)

## Live site

Served via ngrok — the public URL changes on every restart (free tier).  
After `docker compose up`, get the current URL from `http://localhost:4040` or:

```bash
docker compose logs ngrok | grep url=
```

## Tech stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite 5 + Tailwind CSS 3 |
| Fonts | JetBrains Mono (mono) + Inter (sans) via Google Fonts |
| Serving | nginx:alpine (multi-stage Docker build) |
| Tunnel | ngrok (Docker service) |

## Setup

### Prerequisites

- Node 20+
- Docker + Docker Compose
- [ngrok account](https://dashboard.ngrok.com) (free tier works)

### 1. Clone

```bash
git clone https://github.com/veershukla/claude-code-in-one-shot.git
cd claude-code-in-one-shot
```

### 2. Configure ngrok

```bash
cp .env.example .env
# Edit .env and paste your token:
# NGROK_AUTHTOKEN=<token from https://dashboard.ngrok.com/get-started/your-authtoken>
```

### 3a. Local dev (hot reload, no Docker)

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### 3b. Production (Docker + ngrok)

```bash
docker compose build
docker compose up -d
# Public URL → http://localhost:4040
```

After any frontend source change, rebuild:

```bash
docker compose build && docker compose up -d
```

## Architecture — Phase 1 / Phase 2

**Phase 1 (current):** fully static React app. Project data lives in `frontend/src/data/projects.js` as a plain array. No backend.

**Phase 2 (planned):** FastAPI backend + PostgreSQL. The `projects.js` array shape is the API contract — Phase 2 replaces it with a `fetchProjects()` hook, adds `location /api/` in nginx, and adds `backend` + `db` services to `docker-compose.yml`. No other files change.

```
Phase 1                         Phase 2
──────────────────────────────  ──────────────────────────────────
nginx → React SPA               nginx → React SPA
        ↑                               ↑           ↓
  static projects.js            fetchProjects()   /api/projects
                                                    ↑
                                              FastAPI + PostgreSQL
```

## Directory structure

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx       # Typing animation, tagline, Clock
│   │   │   ├── Projects.jsx   # Project card grid
│   │   │   └── Clock.jsx      # Live clocks: Pacific / Turkey / India
│   │   ├── data/
│   │   │   └── projects.js    # Phase 1/2 seam — static PROJECTS array
│   │   ├── App.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── vite.config.js
├── nginx/nginx.conf            # SPA routing, gzip, security headers
├── Dockerfile                  # Multi-stage: node:20-alpine → nginx:alpine
├── docker-compose.yml          # web + ngrok services
└── decisions/                  # Architecture Decision Records (ADRs)
```

## Automated code review

A `FileChanged` hook in `.claude/settings.local.json` triggers a Claude Code subagent on every source file save. It reviews for correctness, security, performance, Tailwind class safety, and React patterns. See `.claude/agents/` for the agent definition.
