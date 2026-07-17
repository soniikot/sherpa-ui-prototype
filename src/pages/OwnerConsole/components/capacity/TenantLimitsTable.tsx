import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_TENANT_LIMITS } from "@/data/mockData";
import { LimitStatusBadge } from "@/pages/OwnerConsole/components/capacity/CapacityStatusBadges";

export function TenantLimitsTable() {
  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="px-0 pt-0">
        <div>
          <CardTitle className="text-lg font-semibold text-app-text">
            Tenant limits
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            ResourceQuota usage and Kueue floor by tenant.
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto rounded-lg border border-app-border">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                <th className="px-3 py-2 font-medium">Tenant</th>
                <th className="px-3 py-2 font-medium">Plan</th>
                <th className="px-3 py-2 font-medium">CPU requests</th>
                <th className="px-3 py-2 font-medium">Memory requests</th>
                <th className="px-3 py-2 font-medium">Kueue floor</th>
                <th className="px-3 py-2 font-medium">Queue</th>
                <th className="px-3 py-2 font-medium">Limit status</th>
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
                  <td className="px-3 py-3 text-app-text-muted">{row.plan}</td>
                  <td className="px-3 py-3 text-app-text-muted">{row.cpu}</td>
                  <td className="px-3 py-3 text-app-text-muted">{row.memory}</td>
                  <td className="px-3 py-3 text-app-text-muted">
                    {row.kueueFloor}
                  </td>
                  <td className="px-3 py-3 text-app-text-muted">{row.queue}</td>
                  <td className="px-3 py-3">
                    <LimitStatusBadge status={row.limitStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
