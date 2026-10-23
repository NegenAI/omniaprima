# shadcn/ui monorepo template

This is a Next.js monorepo template with shadcn/ui.

## Admin (Payload CMS)

Vehicles, team and site settings are edited at `/admin` ([Payload](https://payloadcms.com) 3, Postgres). The config is `apps/web/payload.config.ts`; collections and roles are in `apps/web/payload/`, and pages read through `apps/web/lib/content.ts`.

Requires Node `^22.23.4 || >=24.22.1` (`.nvmrc`). Variables are listed in `apps/web/.env.example`:

- With 1Password (Neon database, vault Negen, item `omniaprima-website`): `op run --env-file apps/web/.env.op -- pnpm --dir apps/web dev`
- With a local database: put `DATABASE_URL` and `PAYLOAD_SECRET` in a gitignored `apps/web/.env.local`, e.g. for a Docker Postgres:

  ```bash
  docker run -d --name omniaprima-payload-pg -e POSTGRES_USER=payload -e POSTGRES_PASSWORD=payload -e POSTGRES_DB=omniaprima -p 54329:5432 postgres:17-alpine
  ```

From `apps/web`:

- `pnpm payload migrate`: applies the migrations (production applies them when Payload starts).
- `pnpm payload migrate:create <name>`: after changing a collection, then `pnpm generate:types`. There is no schema push: every schema change is a committed migration.
- `pnpm seed`: loads the placeholder vehicles, team and contacts (`payload/seed/data.ts`, also used by the stories). It stops on a database that already has vehicles unless `SEED_RESET=1`, which replaces vehicles, team and media.

The first account, created at `/admin` on an empty database, is an Admin. Roles: Admin (Negen, everything), Manager (all content, site settings, manages Editors), Editor (creates, edits and publishes vehicles, team and images).

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```
