import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MOCK_CAPACITY_HIGHLIGHTS,
  MOCK_FLEET_FOOTPRINT,
  MOCK_FLEET_PLANES,
  MOCK_ONBOARDING_CAPACITY,
} from "@/data/mockData";
import { AvailablePlansGrid } from "@/pages/OwnerConsole/components/capacity/AvailablePlansGrid";
import { FleetByPlane } from "@/pages/OwnerConsole/components/capacity/FleetByPlane";
import { PoolAndPlacement } from "@/pages/OwnerConsole/components/capacity/PoolAndPlacement";
import { TenantLimitsTable } from "@/pages/OwnerConsole/components/capacity/TenantLimitsTable";

export function CapacityPage() {
  const updatedAt = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());

  return (
    <PageContainer
      eyebrow="Capacity and scheduling"
      title="Capacity & limits"
      description="Live CPU-pool headroom, plan availability, tenant quotas, and Kueue reservation pressure."
      fullWidth
      headerActions={
        <p className="mr-1 text-xs text-app-text-muted">Updated {updatedAt}</p>
      }
    >
      <section
        aria-label="Capacity highlights"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
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
      </section>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Onboarding capacity
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              How many additional tenants fit current unreserved headroom after
              the safety reserve.
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid gap-3 md:grid-cols-3">
            {MOCK_ONBOARDING_CAPACITY.map((plan) => (
              <div
                key={plan.id}
                className="rounded-xl border border-app-border bg-app-bg/30 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-app-text">
                    {plan.name}
                  </p>
                  {plan.available ? (
                    <Badge variant="success">Available</Badge>
                  ) : (
                    <Badge variant="outline">Unavailable</Badge>
                  )}
                </div>
                <p className="mt-3 text-3xl font-bold tracking-tight text-app-text">
                  {plan.canOnboard}
                </p>
                <p className="mt-1 text-xs text-app-text-muted">
                  {plan.canOnboard === 1
                    ? "additional tenant"
                    : "additional tenants"}{" "}
                  · {plan.floor} each
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PoolAndPlacement />

      <FleetByPlane
        footprint={MOCK_FLEET_FOOTPRINT}
        planes={MOCK_FLEET_PLANES}
      />

      <AvailablePlansGrid />

      <TenantLimitsTable />
    </PageContainer>
  );
}
