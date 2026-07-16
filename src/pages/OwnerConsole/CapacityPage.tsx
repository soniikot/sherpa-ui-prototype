import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_CAPACITY_HIGHLIGHTS,
  MOCK_CAPACITY_PLANS,
  MOCK_CAPACITY_POOL,
  MOCK_TENANT_LIMITS,
} from "@/data/mockData";

export function CapacityPage() {
  const pool = MOCK_CAPACITY_POOL;

  return (
    <PageContainer
      eyebrow="Capacity and scheduling"
      title="Capacity & limits"
      description="Live CPU-pool headroom, plan availability, tenant quotas, and Kueue reservation pressure."
      fullWidth
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {MOCK_CAPACITY_HIGHLIGHTS.map((item) => (
          <Card
            key={item.id}
            className="dark-card border-app-border/80 shadow-none"
          >
            <CardContent className="px-0 py-0">
              <p className="text-xs text-app-text-muted">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-app-text">{item.value}</p>
              <p className="mt-1 text-xs text-app-text-muted">{item.hint}</p>
            </CardContent>
          </Card>
        ))}
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Tenant pressure</p>
            <p className="mt-2 text-2xl font-bold text-app-text">0</p>
            <p className="mt-1 text-xs text-app-text-muted">
              2 live tenant allocation records
            </p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Kueue pending</p>
            <p className="mt-2 text-2xl font-bold text-app-text">0</p>
            <p className="mt-1 text-xs text-app-text-muted">Cohort sherpa-fleet</p>
          </CardContent>
        </Card>
      </div>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Schedulable pool
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            {pool.readyNodes} after a {pool.safetyReserve}.
          </p>
        </CardHeader>
        <CardContent className="space-y-5 px-0 pb-0">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-app-text-muted">CPU reservations</span>
              <span className="font-medium text-app-text">
                {pool.cpuReserved} / {pool.cpuSchedulable} vCPU
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-app-border">
              <div
                className="h-full rounded-full bg-app-success"
                style={{ width: `${pool.cpuPercent}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-app-text-muted">
              {pool.cpuPercent}% of schedulable capacity reserved
            </p>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-app-text-muted">Memory reservations</span>
              <span className="font-medium text-app-text">
                {pool.memoryReserved} / {pool.memorySchedulable} GiB
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-app-border">
              <div
                className="h-full rounded-full bg-app-success"
                style={{ width: `${pool.memoryPercent}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-app-text-muted">
              {pool.memoryPercent}% of schedulable capacity reserved
            </p>
          </div>
          <p className="text-sm text-app-text-muted">
            Raw allocatable:{" "}
            <span className="font-medium text-app-text">{pool.rawAllocatable}</span>
          </p>
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Available plans
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Plan floors and namespace limits validated against current headroom.
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto rounded-lg border border-app-border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                  <th className="px-3 py-2 font-medium">Plan</th>
                  <th className="px-3 py-2 font-medium">Floor</th>
                  <th className="px-3 py-2 font-medium">Cap</th>
                  <th className="px-3 py-2 font-medium">Availability</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CAPACITY_PLANS.map((plan) => (
                  <tr
                    key={plan.id}
                    className="border-b border-app-border/70 last:border-b-0"
                  >
                    <td className="px-3 py-3 font-medium text-app-text">
                      {plan.name}
                    </td>
                    <td className="px-3 py-3 text-app-text-muted">{plan.floor}</td>
                    <td className="px-3 py-3 text-app-text-muted">{plan.cap}</td>
                    <td className="px-3 py-3">
                      {plan.available ? (
                        <Badge variant="success">Available</Badge>
                      ) : (
                        <Badge variant="outline">Unavailable</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Tenant limits
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            ResourceQuota usage and Kueue floor by tenant.
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto rounded-lg border border-app-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                  <th className="px-3 py-2 font-medium">Tenant</th>
                  <th className="px-3 py-2 font-medium">CPU</th>
                  <th className="px-3 py-2 font-medium">Memory</th>
                  <th className="px-3 py-2 font-medium">Kueue floor</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TENANT_LIMITS.map((row) => (
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
                    <td className="px-3 py-3 text-app-text-muted">{row.cpu}</td>
                    <td className="px-3 py-3 text-app-text-muted">{row.memory}</td>
                    <td className="px-3 py-3 text-app-text-muted">
                      {row.kueueFloor}
                    </td>
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
