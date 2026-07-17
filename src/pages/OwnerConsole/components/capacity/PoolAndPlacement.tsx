import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MOCK_PLACEMENT_ENVELOPE,
  MOCK_POOL_COMPOSITION,
} from "@/data/mockData";
import { PlacementBadge } from "@/pages/OwnerConsole/components/capacity/CapacityStatusBadges";
import { StackedResourceBar } from "@/pages/OwnerConsole/components/capacity/StackedResourceBar";

export function PoolAndPlacement() {
  const pool = MOCK_POOL_COMPOSITION;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Full pool composition
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Allocated, available headroom, and 20% safety reserve on raw
              allocatable capacity.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 px-0 pb-0">
          <StackedResourceBar
            label="CPU"
            totalLabel={`${pool.cpu.total.toFixed(1)} ${pool.cpu.unit} total`}
            allocated={pool.cpu.allocated}
            available={pool.cpu.available}
            reserve={pool.cpu.reserve}
            unit={pool.cpu.unit}
          />
          <StackedResourceBar
            label="Memory"
            totalLabel={`${pool.memory.total.toFixed(1)} ${pool.memory.unit} total`}
            allocated={pool.memory.allocated}
            available={pool.memory.available}
            reserve={pool.memory.reserve}
            unit={pool.memory.unit}
          />
          <dl className="grid gap-2 border-t border-app-border pt-4 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-app-text-muted">Raw allocatable</dt>
              <dd className="font-medium text-app-text">{pool.rawAllocatable}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-app-text-muted">Schedulable after reserve</dt>
              <dd className="font-medium text-app-text">
                {pool.schedulableAfterReserve}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-app-text-muted">Current tenant floors</dt>
              <dd className="font-medium text-app-text">
                {pool.currentTenantFloors}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-app-text-muted">Ready CPU nodes</dt>
              <dd className="font-medium text-app-text">{pool.readyCpuNodes}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Placement envelope
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Current scheduling dimensions and explicit platform limits.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-0 pb-0">
          {MOCK_PLACEMENT_ENVELOPE.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-app-border bg-app-bg/30 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-app-text">{item.title}</p>
                <p className="mt-0.5 text-xs text-app-text-muted">{item.detail}</p>
              </div>
              <PlacementBadge status={item.status} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
