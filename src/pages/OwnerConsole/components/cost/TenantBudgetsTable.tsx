import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LimitStatusBadge } from "@/pages/OwnerConsole/components/capacity/CapacityStatusBadges";
import type { TenantBudgetsTableProps } from "@/pages/OwnerConsole/components/cost/TenantBudgetsTable.types";

function UsageBars({
  cpuUsedPct,
  memUsedPct,
}: {
  cpuUsedPct: number | null;
  memUsedPct: number | null;
}) {
  if (cpuUsedPct === null || memUsedPct === null) {
    return <span className="text-sm text-app-text-muted">Not reported</span>;
  }

  return (
    <div className="min-w-[8rem] space-y-2">
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-app-text-muted">
          <span>CPU {cpuUsedPct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-app-border/60">
          <div
            className="h-full rounded-full bg-app-running"
            style={{ width: `${Math.min(cpuUsedPct, 100)}%` }}
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-app-text-muted">
          <span>Mem {memUsedPct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-app-border/60">
          <div
            className="h-full rounded-full bg-app-running"
            style={{ width: `${Math.min(memUsedPct, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function TenantBudgetsTable({ rows }: TenantBudgetsTableProps) {
  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="px-0 pt-0">
        <div>
          <CardTitle className="text-lg font-semibold text-app-text">
            Tenant budgets
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Live infrastructure allocation and reservation pressure. Token budget
            policies are not enforced yet.
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto rounded-lg border border-app-border">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                <th className="px-3 py-2 font-medium" scope="col">
                  Tenant
                </th>
                <th className="px-3 py-2 font-medium" scope="col">
                  Used
                </th>
                <th className="px-3 py-2 font-medium" scope="col">
                  Allocation
                </th>
                <th className="px-3 py-2 font-medium" scope="col">
                  Policy
                </th>
                <th className="px-3 py-2 font-medium" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.slug}
                  className="border-b border-app-border/70 last:border-b-0"
                >
                  <td className="px-3 py-3 align-top">
                    <Link
                      to={`/workspace/${row.slug}`}
                      className="block text-sm font-medium text-app-accent hover:underline"
                    >
                      {row.displayName}
                    </Link>
                    <p className="font-mono text-xs text-app-text-muted">
                      {row.slug}
                    </p>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <UsageBars
                      cpuUsedPct={row.cpuUsedPct}
                      memUsedPct={row.memUsedPct}
                    />
                  </td>
                  <td className="px-3 py-3 align-top">
                    <p className="font-mono text-app-text">
                      {row.allocationCost ?? "—"}
                    </p>
                    <p className="mt-0.5 text-xs text-app-text-muted">
                      {row.floor}
                    </p>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <LimitStatusBadge status={row.policy} />
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Button type="button" variant="outline" size="sm" disabled>
                      Adjust
                    </Button>
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
