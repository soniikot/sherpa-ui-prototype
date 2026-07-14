# sherpa-ui-prototype

**PROTOTYPE — throwaway.** Tenant Lifecycle Console UI, mocked data, Sherpa dashboard visual language.

## Question this answers

What does the platform-admin / tenant lifecycle console look like when restyled into prod-dashboard Sherpa UI (same IA as the ops screenshots)?

## Decisions (grill)

| Topic | Choice |
|-------|--------|
| Location | Standalone sibling app (not wired into Sherpa monorepo) |
| Style | Screenshot IA → Sherpa tokens/components (thin mirror) |
| Pages | Platform-admin only; login deferred |
| Chrome | Sherpa-like left sidebar (logo top, section nav, user + Sign out bottom-left) |
| Auth | None; Sign out in sidebar toasts “not wired” |
| Interactivity | In-memory create / suspend / remove |
| Links | Service + workspace open in new tab |

## Run

```bash
cd "../sherpa-ui-prototype"   # sibling of Sherpa/
npm install
npm run dev
```

Open http://localhost:5173

## Screens

- `/` — Platform services, Backups & DR, Create workspace, Tenants

## Later

- Add Sherpa-styled login gate (Cloudflare Access–shaped, not CF chrome)
- `git init` + GitHub remote for share/deploy
- Delete or absorb once the real product absorbs the design
