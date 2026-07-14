# sherpa-ui-prototype

Throwaway UI prototype for the **Sherpa Tenant Lifecycle Console** (platform-admin) and the **tenant workspace portal**.

Not connected to the Sherpa monorepo. Mock data only. Visual language mirrored from prod-dashboard (tokens + thin shadcn-style kit). No login.

## Quick start

```bash
npm install
npm run dev
```

From **Tenants**, click a workspace link (e.g. beta) → `/workspace/beta`.

## Scripts

| Command | What |
|---------|------|
| `npm run dev` | Local Vite server (http://localhost:5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Deploy (GitHub Pages)

Published from the `gh-pages` branch.

**Share link:** https://soniikot.github.io/sherpa-ui-prototype/

To republish after local changes:

```bash
GITHUB_PAGES=true npm run build
# then push the contents of dist/ to the gh-pages branch
```

See [NOTES.md](./NOTES.md) for prototype decisions and cleanup intent.
