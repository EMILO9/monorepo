# Monorepo

This pnpm monorepo is managed with Turborepo. It contains:

- `apps/api` — Fastify API with MongoDB/Mongoose
- `apps/adm` — Vue 3 administration app with Vite
- `apps/web` — Nuxt 4 web app
- `packages/*` — shared workspace packages

## Requirements

- Node.js `^26.13.1`
- pnpm `12.23.0`
- MongoDB Atlas or a local MongoDB instance

Activate the required pnpm version with Corepack:

```bash
corepack enable
corepack prepare pnpm@12.23.0 --activate
```

## Setup

Run these commands from the repository root:

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
pnpm --filter web exec nuxt prepare
```

Edit `apps/api/.env` and replace the example credentials:

```dotenv
NODE_ENV=development
PORT=8080
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
MONGO_HOST=mongodb+srv://cluster0.example.mongodb.net
MONGO_USER=database-user
MONGO_PASS=database-password
MONGO_DB=testing
```

`MONGO_DB` is optional. If omitted, Mongoose uses the database specified in `MONGO_HOST`, or MongoDB's default `test` database when the URI has no database name.

Never commit `apps/api/.env` or real database credentials.

## Run

Run every app:

```bash
pnpm dev
```

Run only one app:

```bash
pnpm --filter api dev
pnpm --filter adm dev
pnpm --filter web dev
```

The API normally listens on `http://localhost:8080`.

## Checks and builds

```bash
pnpm typecheck
pnpm format:check
pnpm build
```

See [CHEATSHEET.md](CHEATSHEET.md) for quick commands and package installation examples.
