# managemycounter Landing

Marketing/landing site for managemycounter, built with Next.js (App Router). Links out to the merchant sign-up flow on `shopkeeper-web` and to the latest mobile app builds (`shopkeeper-app`, `agent-app`) via GitHub releases.

## Development

```bash
npm install
npm run dev
```

## Environment

Configured via `NEXT_PUBLIC_API_URL` and related `NEXT_PUBLIC_*` variables (see `src/lib/config.ts` for defaults) — only public variables are used, nothing secret is bundled into this app.

## Deployment

Deploys via Vercel's git integration on push to `master`.
