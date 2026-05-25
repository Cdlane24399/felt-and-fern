# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

PURRFECT is a Next.js 16 e-commerce store for cat products with an AI automation admin dashboard. It uses Bun as the package manager (lockfile: `bun.lock`).

### Running the application

- **Dev server**: `bun run dev` (serves on http://localhost:3000)
- **Build**: `bun run build`
- **Lint**: `bun run lint`
- **Start (production)**: `bun run start`

### Key notes

- No external database required — task data is stored in `data/tasks.json` (flat-file store).
- The app has pre-existing ESLint errors (unescaped entities in JSX) which are not environment issues.
- Stripe and Resend integrations are optional; the app works fully without API keys for browsing, cart, and admin features.
- Cron endpoints (`/api/cron/*`) skip auth verification in dev mode (`NODE_ENV !== 'production'`).
- The `vercel.json` cron definitions only apply in production; in dev you can hit those endpoints manually via GET.

### Environment variables (all optional for local dev)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Email notifications via Resend |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe checkout (placeholder) |
| `STRIPE_SECRET_KEY` | Stripe server-side |
| `CRON_SECRET` | Auth for cron endpoints (bypassed in dev) |
