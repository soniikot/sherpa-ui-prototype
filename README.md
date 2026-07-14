# sherpa-ui-prototype

Throwaway UI prototype for the **Sherpa Tenant Lifecycle Console** (platform-admin).

Not connected to the Sherpa monorepo. Mock data only. Visual language mirrored from prod-dashboard (tokens + thin shadcn-style kit).

## Quick start

```bash
npm install
npm run dev
```

## Scripts

| Command | What |
|---------|------|
| `npm run dev` | Local Vite server (http://localhost:5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Deploy (GitHub Pages)

Pushes to `main` build and publish via Actions.

Live URL (after first deploy):

https://soniikot.github.io/sherpa-ui-prototype/

See [NOTES.md](./NOTES.md) for prototype decisions and cleanup intent.
