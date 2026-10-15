<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

# Omnia Prima website — working agreement

Marketing site for Omnia Prima (car rental and sales, Teramo), built by Negen. This section records how Federico works; it is derived from his other repositories and his project memory. Verify facts here against the code before relying on them.

## Project map

- `apps/web`: Next.js App Router site. Pages in `app/`, page sections in `components/<page>/`, shared site components in `components/`, content and data in `lib/` (`site.ts`, `vehicles.ts`).
- `packages/ui`: shared UI (shadcn/ui on Base UI). Design tokens in `src/styles/globals.css`; theme-aware `cn` in `src/lib/utils.ts`.
- `apps/web/stories`: Storybook stories (`pnpm storybook`, port 6006). Dev server: `pnpm dev` (the local preview config uses port 3100).
- Design source: Figma file `AZNrYeusiQEfkLOECGD136`, canvas "UX - Mobile" (node `5:47`). Mobile frames only (390px); desktop layouts are derived by us.
- Project memory: Obsidian `Journal/Negen/Omnia Prima Website.md` plus the Negen daily notes. They hold decisions, the open-decision list and history.

## Principles

- Prefer standard, documented solutions (Next.js, shadcn/ui, Base UI, Tailwind v4, Vercel) and official integrations. Do not invent requirements or add custom scripts, wrappers or abstractions based on assumptions.
- Before departing from ordinary documented patterns, ask Federico. State the standard option, the deviation and its concrete reason, then wait for an explicit decision. A verified technical gap alone is not authorization. Approved exceptions need no re-confirmation unless their scope changes.
- No machinery for hypothetical scale, and no wrappers for a single call site. Do share a component when a pattern repeats across pages.
- Open business and content decisions (form delivery, inventory source, contacts, legal pages, copy approval) are never hard-coded as facts. Keep them in data modules, mark them `TODO(copy)`, `TODO(copy-approval)` or `TODO(data)`, and add them to the open-decision list in project memory.

## UI and design

- Figma is the design source. Mobile must match the 390px frame; compare it in a browser before claiming fidelity. Record every interpretation Figma does not make explicit and flag it for designer confirmation.
- UI primitives come from shadcn, added with the CLI into `packages/ui`. They are restyled to the Figma design system: variants and sizes live in the component's `cva`, values come from tokens. Before writing a custom component, check in this order: shadcn component, shadcn/studio block, composition of existing pieces. If none fits, explain why and ask.
- Style through the tokens in `globals.css`: colours, `text-h1…h4`/`text-body`/`text-eyebrow`, `ds-1…8` spacing, `rounded-card`, shadows. Add a token only when a value recurs. Arbitrary values are allowed only for Figma-measured offsets, with a comment naming the Figma node or the reason.
- Import `cn` only from `@workspace/ui/lib/utils`. Output from `shadcn add` imports from `"cn"`; repoint it.
- Every new or changed reusable component gets a Storybook story.
- WCAG 2.1 AA is the minimum: semantic HTML, one `h1` per page, keyboard access, visible focus, sufficient contrast. Report contrast failures that are in the design instead of silently changing the design.

## Content, SEO and privacy

- UI copy is Italian; code, comments and docs are English.
- Never invent facts, numbers, reviews or testimonials. Draft copy is allowed only when clearly marked as a draft pending client approval.
- Every page exports metadata (title template "%s · Omnia Prima"). Images use `next/image` with meaningful Italian alt text; fonts use `next/font`.
- No analytics, pixels or third-party embeds (maps, chat) before cookie consent.

## Code

- Strict TypeScript: no `any`, no `@ts-ignore`. Use kebab-case file names, grouped by feature.
- No `console.*` in committed code. pnpm only, run from the repo root.
- Keep `"use client"` to the components that need state or effects.

## Verification before handoff

- Run `pnpm typecheck`, `pnpm lint` and `npx prettier --check` on changed files. Run `pnpm build` before releases.
- For UI changes, check in a browser at 390px and 1440px: no console errors, no horizontal overflow, reduced motion respected, and the 390px view matches the Figma frame.
- Report which checks passed and which were not run.

## Git and delivery

- Work on a branch, never directly on `main`. With a Linear issue: one issue, one branch (issue ID in the branch name), one PR with a change summary and testing steps. Use `Refs <ID>` while deploy and testing are pending; use `Fixes <ID>` only when closing the issue is intended.
- Commits use the repo-local identity `tech-negen` (GitHub noreply email) and are SSH-signed with the Negen key. The remote uses the `github.com-negen` SSH alias.
- Do not merge, push to `main`, deploy, or change GitHub/Vercel settings unless explicitly asked in the current request.

## Handoff and memory

- The final recap covers what changed and why, which checks ran, any external or irreversible changes with rollback, and open decisions.
- After a material decision, milestone, constraint or changed next step, update the project note, the Negen daily note and the root operation log in the Obsidian vault. Re-read a note before editing it, and append rather than rewrite.
- Never commit or quote secrets or `.env` values.
