import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_COST_TENANTS } from "@/data/mockData";

export function CostPage() {
  return (
    <PageContainer
      eyebrow="FinOps and scheduling"
      title="Usage & cost"
      description="Infrastructure allocation from OpenCost and resource reservations from Kueue. This is not token billing."
      fullWidth
    >
      <p className="text-sm text-app-text-muted">
        Currency values are OpenCost allocation by tenant namespace label. CPU,
        memory, pods, and queues are live Kubernetes/Kueue resources. No model
        tokens or API charges are represented.
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href="https://cost-ops.lab.7sg.ai"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-app-accent hover:underline"
        >
          Open OpenCost →
        </a>
        <a
          href="https://grafana-ops.lab.7sg.ai"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-app-accent hover:underline"
        >
          Open Grafana →
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">7d allocation</p>
            <p className="mt-2 text-2xl font-bold text-app-text">$3.00</p>
            <p className="mt-1 text-xs text-app-text-muted">OpenCost window</p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Reserved CPU</p>
            <p className="mt-2 text-2xl font-bold text-app-text">12 vCPU</p>
            <p className="mt-1 text-xs text-app-text-muted">Across live tenants</p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Reserved memory</p>
            <p className="mt-2 text-2xl font-bold text-app-text">24 GiB</p>
            <p className="mt-1 text-xs text-app-text-muted">Across live tenants</p>
          </CardContent>
        </Card>
      </div>

      <Card className="dark-card border border-app-danger/40 bg-app-danger/5 shadow-none">
        <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
          <div>
            <Badge
              variant="outline"
              className="mb-2 border-app-danger/50 text-app-danger"
            >
              Backend required
            </Badge>
            <CardTitle className="text-lg font-semibold text-app-text">
              Token budgets and model spend
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Token budgets cannot be derived from OpenCost. They need metering
              from the model gateway and a real budget enforcement API.
            </p>
          </div>
          <Button type="button" disabled>
            Configure token budgets
          </Button>
        </CardHeader>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Tenant infrastructure allocation
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            OpenCost allocation and Kueue/ResourceQuota state shown side by side.
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto rounded-lg border border-app-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                  <th className="px-3 py-2 font-medium">Tenant</th>
                  <th className="px-3 py-2 font-medium">7d allocation</th>
                  <th className="px-3 py-2 font-medium">CPU quota</th>
                  <th className="px-3 py-2 font-medium">Memory quota</th>
                  <th className="px-3 py-2 font-medium">Pods</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COST_TENANTS.map((row) => (
                  <tr
                    key={row.slug}
                    className="border-b border-app-border/70 last:border-b-0"
                  >
                    <td className="px-3 py-3">
                      <p className="font-medium text-app-text">{row.displayName}</p>
                      <p className="font-mono text-xs text-app-text-muted">
                        {row.slug}
                      </p>
                    </td>
                    <td className="px-3 py-3 font-mono text-app-success">
                      {row.allocation7d}
                    </td>
                    <td className="px-3 py-3 text-app-text-muted">{row.cpuQuota}</td>
                    <td className="px-3 py-3 text-app-text-muted">
                      {row.memoryQuota}
                    </td>
                    <td className="px-3 py-3 text-app-text-muted">{row.pods}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
