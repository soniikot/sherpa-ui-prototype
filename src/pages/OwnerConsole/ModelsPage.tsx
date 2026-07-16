import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ModelsPage() {
  return (
    <PageContainer
      eyebrow="AI runtime"
      title="AI models"
      description="Live read-only inventory of model workloads and their reported placement."
      fullWidth
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Reported models", value: "—", hint: "From GET /v1/models" },
          { label: "Running or ready", value: "—", hint: "No inventory yet" },
          { label: "Reported GPUs", value: "—", hint: "Placement unavailable" },
          {
            label: "Inventory generated",
            value: "—",
            hint: "time unavailable",
          },
        ].map((card) => (
          <Card
            key={card.label}
            className="dark-card border-app-border/80 shadow-none"
          >
            <CardContent className="px-0 py-0">
              <p className="text-xs text-app-text-muted">{card.label}</p>
              <p className="mt-2 text-2xl font-bold text-app-text">{card.value}</p>
              <p className="mt-1 text-xs text-app-text-muted">{card.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="dark-card border border-app-danger/40 bg-app-danger/5 shadow-none">
        <CardHeader className="px-0 pt-0">
          <div className="mb-2">
            <Badge variant="outline" className="border-app-danger/50 text-app-danger">
              Backend required
            </Badge>
          </div>
          <CardTitle className="text-lg font-semibold text-app-text">
            Model deployment
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Deployment remains part of the owner workflow, but it requires a real
            capacity-aware rollout API and audit trail.
          </p>
        </CardHeader>
        <CardContent className="space-y-2 px-0 pb-0 text-sm">
          <p>
            <span className="text-app-text-muted">Missing endpoint: </span>
            <code className="font-mono text-app-danger">POST /v1/models</code>
          </p>
          <p className="text-app-text-muted">
            Auth and audit: operator authorization, idempotency, deployment audit
            trail, and rollout status.
          </p>
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Model inventory
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Data from GET /v1/models. No inferred workloads are added.
            </p>
          </div>
          <Button type="button" disabled className="gap-2 shrink-0">
            Deploy model
          </Button>
        </div>
        <CardContent className="px-0 pb-0">
          <div className="rounded-xl border border-dashed border-app-border px-4 py-10 text-center">
            <p className="text-sm font-medium text-app-text">
              Model inventory source unavailable
            </p>
            <p className="mt-1 text-xs text-app-text-muted">
              Model namespace not found: platform-llm
            </p>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
