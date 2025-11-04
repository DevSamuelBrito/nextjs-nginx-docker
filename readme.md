# 🚀 nextjs-nginx-docker

A study project — a Next.js application exported as a static site. The build is generated inside a Docker container (multi-stage image) and the result (the `out/` folder) is served by Nginx. Great for learning about static builds, Docker multi-stage builds and deploying with Nginx.

## ✨ What this project does

- ✅ Produces a static build of a Next.js project using `next` with `output: "export"` (see `app/next.config.ts`).
- 🧩 Runs the build inside a container (the `builder` stage uses Node) — reproducible environment.
- 🚢 Copies the static output (`/app/out`) to a final image based on `nginx:stable-alpine` and serves the files with Nginx.

## 🗂️ Important files

- `Dockerfile` — multi-stage image. The `builder` stage uses Node to install dependencies and run `npm run build`. The final stage uses Nginx, replaces `default.conf` and copies `out/` to `/usr/share/nginx/html`.
- `docker-compose.yml` — defines the `web` service that maps the container port to `8080` on the host.
- `nginx/default.conf` — Nginx configuration to serve the static files (includes alias for `/_next/`).
- `app/next.config.ts` — sets `output: "export"` to generate the `out/` folder (static export).

## 🛠️ Requirements to run

- 🐳 Docker (recommended >= 20.10) and Docker Compose. On Windows, prefer Docker Desktop with WSL2.
- 🧑‍💻 (Optional) Node.js and npm for local development (suggestion: Node 16+ or 18+).
- 🔌 Port 8080 free on the host machine (the `docker-compose.yml` maps `8080:80`).
- 🔐 Permissions to run Docker containers (e.g., Docker Desktop on Windows).

Quick version checks:

```powershell
docker --version
docker compose version    # or: docker-compose --version
node --version            # optional, for local dev
npm --version             # optional, for local dev
```

Quick tips:

- 🔁 If ports don't respond on Windows, make sure Docker Desktop is running and WSL2 is enabled.
- 🧹 Use `docker-compose build --no-cache` if changes don't appear after a rebuild.

## ⚙️ How it works (technical summary)

1. `builder` stage (Node):
   - copies `app/package*.json` and runs `npm install`;
   - copies the code (`./app`) and runs `npm run build`.
   - With `output: "export"`, `next build` produces the `out/` folder (static site).
2. Final image (Nginx):
   - removes the default Nginx config and uses the project's `nginx/default.conf`;
   - copies `/app/out` (from the `builder` stage) to `/usr/share/nginx/html` and serves it.

## ▶️ Running with Docker Compose (recommended)

Open PowerShell in the project root and run:

```powershell
# Build the image and create the container
docker-compose build

docker-compose up -d

# Follow container logs
docker logs -f nextjs-nginx

# Stop and remove containers
docker-compose down
```

After starting, open http://localhost:8080 in your browser.

## 🧪 Local development (without Docker)

If you want to work locally in dev mode:

```powershell
cd app
npm install
npm run dev
```

This starts the Next.js dev server (usually at http://localhost:3000).

## 🔁 Rebuild the site after changes

Because the build is packaged into the final image, whenever you change the code and want to see the new version in the Nginx container, rebuild the image and restart the service:

```powershell
# Force rebuild without cache
docker-compose build --no-cache
docker-compose up -d --force-recreate
```

## 💡 Notes / tips

- The `Dockerfile` produces a static build (`out/`) — this simplifies deployment and allows serving everything with Nginx.
- For dynamic pages or SSR, the approach changes: run `next start` in a Node container (remove `output: "export"`) or choose a serverless/SSR strategy.
- If content does not update, clear the browser cache and rebuild the image with `--no-cache`.

---

Project created for learning purposes. Feel free to explore, modify and learn! 👋
