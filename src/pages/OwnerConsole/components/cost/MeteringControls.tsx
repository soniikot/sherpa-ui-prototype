import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TOGGLES = [
  "Enforce tenant limits",
  "Include cached tokens",
  "Anomaly detection",
] as const;

export function MeteringControls() {
  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="px-0 pt-0">
        <div>
          <CardTitle className="text-lg font-semibold text-app-text">
            Metering controls
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Token and gateway enforcement controls.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0">
        <div className="rounded-xl border border-app-danger/40 bg-app-danger/5 px-4 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-app-danger/50 text-app-danger"
            >
              Backend required
            </Badge>
            <Badge variant="outline">Missing endpoint</Badge>
          </div>
          <p className="font-mono text-sm text-app-danger">
            GET/PUT /v1/tenants/:slug/token-budget
          </p>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-semibold tracking-wide text-app-text-muted uppercase">
                Auth and audit
              </dt>
              <dd className="mt-1 text-app-text-muted">
                Operator authorization, metering source, immutable budget-change
                audit, and enforcement
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold tracking-wide text-app-text-muted uppercase">
                Owning domain
              </dt>
              <dd className="mt-1 text-app-text-muted">AI gateway and FinOps</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-3">
          {TOGGLES.map((label) => (
            <label
              key={label}
              className="flex items-center gap-3 text-sm text-app-text"
            >
              <input
                type="checkbox"
                checked
                disabled
                className="size-4 rounded border-app-border accent-app-accent"
              />
              {label}
            </label>
          ))}
        </div>

        <ul className="space-y-1 text-sm text-app-text-muted">
          <li>Enforcement: Envoy AI Gateway (planned)</li>
          <li>Attribution: signed tenant identity</li>
          <li>Prompt storage: disabled</li>
        </ul>

        <Button type="button" disabled>
          Configure token budgets
        </Button>
      </CardContent>
    </Card>
  );
}
