# Portfolio Website — Task Tracker

## Phase 1: Static React Site (Active)

### Scaffold
- [x] Create directory structure (frontend/, nginx/, decisions/)
- [x] Write task.md
- [x] Write decisions/001-frontend-stack.md
- [x] Write decisions/002-infra-docker-nginx-ngrok.md
- [x] Write decisions/003-phase-architecture.md

### Frontend — Config
- [x] frontend/package.json
- [x] frontend/vite.config.js
- [x] frontend/tailwind.config.js
- [x] frontend/postcss.config.js
- [x] frontend/index.html (Google Fonts, body class)
- [x] frontend/src/main.jsx
- [x] frontend/src/index.css (@tailwind directives)
- [x] frontend/src/App.jsx

### Frontend — Components
- [x] frontend/src/data/projects.js (static PROJECTS array; Phase 2 TODO comment)
- [x] frontend/src/components/Hero.jsx (typing animation, tagline)
- [x] frontend/src/components/Projects.jsx (card grid, badges, GitHub links)

### Infrastructure
- [x] Dockerfile (multi-stage: node:20-alpine → nginx:alpine)
- [x] nginx/nginx.conf (SPA try_files, gzip, cache headers)
- [x] docker-compose.yml (web + ngrok services)
- [x] .env (NGROK_AUTHTOKEN — do NOT commit)
- [x] .gitignore

### Local Dev & Verification
- [ ] Run `npm install` in frontend/ and commit package-lock.json
- [ ] Verify `npm run dev` renders Hero + Projects
- [ ] Run `docker compose build` — confirm both stages succeed
- [ ] Run `docker compose up -d`
- [ ] Visit http://localhost:4040 — copy ngrok public URL
- [ ] Open ngrok URL in browser — verify site renders over HTTPS

---

## Phase 2: Backend API (Future)

### API Service
- [ ] Add `backend/` directory (FastAPI or Express)
- [ ] Add `GET /api/projects` endpoint returning PROJECTS array from DB
- [ ] Add PostgreSQL service to docker-compose.yml
- [ ] Add backend service to docker-compose.yml
- [ ] Update nginx.conf to proxy `/api/` to backend service

### Frontend Migration
- [ ] Replace `frontend/src/data/projects.js` with async `fetchProjects()` hook
- [ ] Update `Projects.jsx` to use useEffect or React Query for data fetching
- [ ] Add loading skeleton and error states to ProjectCard

### Database
- [ ] Create `projects` table migration
- [ ] Seed from current PROJECTS array

---

## Decisions Log
- [x] decisions/001-frontend-stack.md — React + Vite + Tailwind
- [x] decisions/002-infra-docker-nginx-ngrok.md — nginx multi-stage + ngrok Docker service
- [x] decisions/003-phase-architecture.md — Phase 1/2 seam via data/projects.js
