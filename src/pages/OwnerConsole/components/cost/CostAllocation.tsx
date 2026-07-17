import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CostAllocationProps } from "@/pages/OwnerConsole/components/cost/CostAllocation.types";

type AllocationView = "tenant" | "model";

export function CostAllocation({ byTenant }: CostAllocationProps) {
  const [view, setView] = useState<AllocationView>("tenant");
  const maxAmount = Math.max(...byTenant.map((item) => item.amount), 1);

  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
        <div>
          <CardTitle className="text-lg font-semibold text-app-text">
            Cost allocation
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Estimated infrastructure showback. Model-serving token cost is not
            included.
          </p>
        </div>
        <div
          className="inline-flex shrink-0 rounded-lg border border-app-border p-0.5"
          role="group"
          aria-label="Allocation breakdown"
        >
          <button
            type="button"
            onClick={() => setView("tenant")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              view === "tenant"
                ? "bg-app-accent text-white"
                : "text-app-text-muted hover:text-app-text",
            )}
          >
            By tenant
          </button>
          <button
            type="button"
            onClick={() => setView("model")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              view === "model"
                ? "bg-app-accent text-white"
                : "text-app-text-muted hover:text-app-text",
            )}
          >
            By model
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0">
        {view === "tenant" ? (
          <>
            <div className="space-y-3">
              {byTenant.map((item) => {
                const widthPct = (item.amount / maxAmount) * 100;
                return (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-app-text">
                        {item.label}
                      </span>
                      <span className="font-mono text-app-text">
                        {item.amountLabel}
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-app-border/60">
                      <div
                        className="h-full rounded-full bg-app-running"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-app-text-muted">
              Estimated infrastructure cost (USD) · Source: OpenCost · 7d
            </p>
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-app-border px-6 py-12 text-center">
            <p className="text-sm text-app-text-muted">
              By-model spend needs gateway token telemetry and a budget API.
              Infrastructure showback remains available under By tenant.
            </p>
            <Button type="button" disabled className="mt-4">
              Configure model metering
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
