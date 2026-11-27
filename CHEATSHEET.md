# Cheat Sheet

Run the commands below from the repository root unless stated otherwise.

## Setup

```bash
corepack enable
corepack prepare pnpm@12.23.0 --activate
pnpm install
cp apps/api/.env.example apps/api/.env
pnpm --filter web exec nuxt prepare
```

## Development

```bash
pnpm dev                   # Run all apps
pnpm --filter api dev      # Fastify API
pnpm --filter adm dev      # Vue/Vite admin app
pnpm --filter web dev      # Nuxt web app
```

## Checks and builds

```bash
pnpm build
pnpm typecheck
pnpm format
pnpm format:check
```

## Run commands for one app

```bash
pnpm --filter api build
pnpm --filter api typecheck
pnpm --filter api format:check

pnpm --filter adm build
pnpm --filter adm typecheck

pnpm --filter web build
pnpm --filter web typecheck
```

## Install packages

```bash
pnpm add -D -w <package>            # Shared development dependency
pnpm --filter api add <package>     # API dependency
pnpm --filter api add -D <package>  # API development dependency
pnpm --filter adm add <package>     # Admin dependency
pnpm --filter adm add -D <package>  # Admin development dependency
pnpm --filter web add <package>     # Web dependency
pnpm --filter web add -D <package>  # Web development dependency
```

## API environment

Required in `apps/api/.env`:

```dotenv
NODE_ENV=development
PORT=8080
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
MONGO_HOST=mongodb+srv://cluster0.example.mongodb.net
MONGO_USER=database-user
MONGO_PASS=database-password
```

Optional:

```dotenv
MONGO_DB=testing
```

Remove `MONGO_DB` or leave it unset to use the database specified by `MONGO_HOST`, or MongoDB's default `test` database.

## Cleanup

macOS/Linux:

```bash
pnpm store prune
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules, apps/*/node_modules, packages/*/node_modules
pnpm install
```
