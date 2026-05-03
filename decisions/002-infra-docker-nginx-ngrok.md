# ADR 002 — Infrastructure: Docker + Nginx + ngrok

**Date**: 2026-05-03
**Status**: Accepted

## Context

The portfolio must be publicly accessible without a cloud server or domain name.
The build artifact (React /dist) must be served correctly as a SPA.

## Decision

### Multi-stage Dockerfile

Stage 1 (`node:20-alpine`): installs deps, runs `vite build`, outputs `/app/dist`.
Stage 2 (`nginx:alpine`): copies only `/dist` from stage 1. Final image ~25MB.

The two-stage approach means no Node.js runtime in the production image —
smaller attack surface, smaller image, faster pulls.

### nginx SPA Configuration

```
try_files $uri $uri/ /index.html;
```

This single line handles all SPA routing. Without it, hard-refreshing any
non-root route (e.g., `/projects`) returns nginx 404 because no file exists
at that path on disk. With it, nginx falls back to `index.html` and React
handles the route client-side.

Additional nginx features enabled:
- `gzip` compression for JS/CSS/JSON/SVG
- 1-year `Cache-Control: immutable` for hashed asset filenames
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

### docker-compose Services

| Service | Image         | Purpose                                      |
|---------|---------------|----------------------------------------------|
| `web`   | Built locally | nginx serving /dist on internal port 80      |
| `ngrok` | ngrok/ngrok   | HTTP tunnel exposing `web:80` to public HTTPS|

ngrok runs as a container so it requires no local installation. The two
containers communicate over a shared Docker bridge network (`portfolio-net`).
ngrok reaches nginx via the `web` hostname.

### ngrok Auth

`NGROK_AUTHTOKEN` is loaded from a `.env` file via Docker Compose's automatic
`.env` support. The `.env` file is gitignored. Token obtained from
https://dashboard.ngrok.com/get-started/your-authtoken.

### Accessing the Public URL

After `docker compose up -d`, visit http://localhost:4040 to open the ngrok
web inspector UI. The public HTTPS URL (e.g., `https://abc123.ngrok-free.app`)
is shown there and also in the ngrok container logs:

```
docker compose logs ngrok
```

## Consequences

- Free ngrok tier: URL changes on every restart; use a paid plan or ngrok
  static domain for a stable URL
- No HTTPS termination logic in nginx needed — ngrok provides TLS for the
  public-facing URL; nginx only handles HTTP internally
- Phase 2: add `location /api/ { proxy_pass http://backend:8000; }` to
  nginx.conf to route API traffic to the FastAPI/Express service
