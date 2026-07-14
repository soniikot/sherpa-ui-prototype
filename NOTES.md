# sherpa-ui-prototype

**PROTOTYPE — throwaway.** Tenant Lifecycle Console + tenant workspace portal UI, mocked data, Sherpa dashboard visual language.

## Question this answers

What does the platform-admin / tenant lifecycle console look like when restyled into prod-dashboard Sherpa UI (same IA as the ops screenshots)?

What does the **tenant workspace portal** (post-provision landing) look like in the same language — reachable without login?

## Decisions (grill)

| Topic | Choice |
|-------|--------|
| Location | Standalone sibling app (not wired into Sherpa monorepo) |
| Style | Screenshot IA → Sherpa tokens/components (thin mirror) |
| Pages | Platform-admin + workspace portal; login deferred |
| Chrome | Workspace: sidebar bar (logo + General / Team & SSO + user card); product nav deferred |
| Auth | None; Sign out toasts “not wired” |
| Interactivity | In-memory create / suspend / remove; workspace Team invite mock |
| Links | Tenant workspace link → `/workspace/:slug`; service + internal portal open in new tab |
| Workspace nav | Sidebar: General · Team & SSO |

## Run

```bash
cd "../sherpa-ui-prototype"   # sibling of Sherpa/
npm install
npm run dev
```

Open http://localhost:5173

## Screens

- `/` — Platform services, Backups & DR, Create workspace, Tenants
- `/workspace/:slug` — Tenant workspace portal (e.g. Beta Corp). From Tenants workspace link — no login.

## Later

- Add Sherpa-styled login gate (Cloudflare Access–shaped, not CF chrome)
- Wire “Open Sherpa Dashboard” to a real/mock dashboard surface
- `git init` + GitHub remote for share/deploy
- Delete or absorb once the real product absorbs the design
