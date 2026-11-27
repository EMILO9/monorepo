<div align="center">

# Monorepo

**A TypeScript workspace for the API, web app, and admin app.**

Built with pnpm workspaces and Turborepo.

</div>

## What's inside

| Workspace | Stack | Purpose |
| --- | --- | --- |
| `apps/api` | Fastify · Mongoose · Zod | HTTP API, environment validation, MongoDB connection |
| `apps/web` | Nuxt 4 · Vue | Web application; currently checks API health at `/health` |
| `apps/adm` | Vue 3 · Vite | Admin application; currently checks API health at `/health` |
| `packages/tsconfig` | TypeScript | Shared TypeScript configurations |

The API registers routes from `apps/api/src/routes`. Its current `GET /health` route returns `{ "status": "ok" }`. Both frontends call this endpoint during startup.

## Prerequisites

- Node.js `^26.13.1`
- pnpm `12.23.0`
- A reachable MongoDB instance (Atlas or local)

Install Node.js and pnpm using your preferred method before continuing.

## Get started

From the repository root, install dependencies and create the API environment file:

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
```

On Windows PowerShell, copy the file with:

```powershell
Copy-Item apps/api/.env.example apps/api/.env
```

Open `apps/api/.env` and replace the example MongoDB connection details with your own:

```dotenv
NODE_ENV=development
PORT=8080
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
MONGO_HOST=mongodb+srv://your-cluster.example.mongodb.net
MONGO_USER=your-database-user
MONGO_PASS=your-database-password
MONGO_DB=testing
```

`MONGO_HOST`, `MONGO_USER`, and `MONGO_PASS` are required. `MONGO_DB` is optional: if omitted, Mongoose uses the database named in the URI, or `test` if the URI has no database name. `PORT` defaults to `8080`; `CORS_ORIGINS` is a comma-separated list and defaults to empty.

Keep real credentials in `apps/api/.env`; never commit them. The repository ignores `.env` files and provides `.env.example` as a template.

## Start developing

Start all three apps together from the root:

```bash
pnpm dev
```

Or start a single app:

```bash
pnpm --filter api dev
pnpm --filter web dev
pnpm --filter adm dev
```

The API listens on port `8080` by default. The web and admin dev servers print their local URLs in the terminal. The frontends currently request `http://localhost:8080/health`, so start the API as well when running either frontend.

## Useful commands

Run from the root of the repository:

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm typecheck` | Type-check all workspaces |
| `pnpm format` | Format files in all workspaces |
| `pnpm format:check` | Check formatting without changing files |
| `pnpm --filter <workspace> <script>` | Run a script in one workspace, e.g. `pnpm --filter api typecheck` |

After a fresh install, or after changing Nuxt configuration/modules, regenerate Nuxt's generated types/configuration:

```bash
pnpm --filter web exec nuxt prepare
```

## Add a dependency

Run from the repository root and target the workspace that uses the package:

```bash
pnpm --filter api add <package>
pnpm --filter web add <package>
pnpm --filter adm add <package>
```

Add a development-only dependency by adding `-D`, for example `pnpm --filter api add -D <package>`. Use `pnpm add -D -w <package>` for tooling shared at the repository root.
