import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AllocationByPlaneProps } from "@/pages/OwnerConsole/components/cost/AllocationByPlane.types";

export function AllocationByPlane({
  planes,
  footer,
  openCostHref,
}: AllocationByPlaneProps) {
  const [openPlaneId, setOpenPlaneId] = useState<string | null>(null);
  const maxTotal = Math.max(...planes.map((plane) => plane.total), 1);

  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
        <div>
          <CardTitle className="text-lg font-semibold text-app-text">
            Allocation by plane
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Hybrid showback: OpenCost namespace dollars when present, otherwise
            catalog rates on live requests.
          </p>
        </div>
        <Badge variant="outline" className="shrink-0">
          Window 7d
        </Badge>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="space-y-3">
          {planes.map((plane) => {
            const widthPct = (plane.total / maxTotal) * 100;
            return (
              <div key={plane.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-app-text">{plane.label}</span>
                  <span className="font-mono text-app-text">
                    {plane.totalLabel}
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

        <p className="text-xs text-app-text-muted">{footer}</p>

        <div className="space-y-3">
          {planes.map((plane) => {
            const isOpen = openPlaneId === plane.id;
            return (
              <div
                key={plane.id}
                className="rounded-xl border border-app-border bg-app-bg/20"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenPlaneId((current) =>
                      current === plane.id ? null : plane.id,
                    )
                  }
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-app-text-muted transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                    <p className="truncate text-sm font-semibold text-app-text">
                      {plane.label}
                    </p>
                    <span className="shrink-0 text-xs text-app-text-muted">
                      {plane.namespaceCount} namespace
                      {plane.namespaceCount === 1 ? "" : "s"}
                    </span>
                  </div>
                </button>

                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-app-border px-4 py-4">
                  <div className="grid grid-cols-3 gap-6 text-sm">
                    <div>
                      <p className="text-xs text-app-text-muted">Total</p>
                      <p className="mt-1 font-semibold text-app-text">
                        {plane.totalLabel}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-app-text-muted">CPU / RAM</p>
                      <p className="mt-1 font-medium text-app-text">
                        {plane.cpuCost} / {plane.ramCost}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-app-text-muted">Pods</p>
                      <p className="mt-1 font-medium text-app-text">
                        {plane.pods}
                      </p>
                    </div>
                  </div>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <a href={openCostHref} target="_blank" rel="noreferrer">
                      OpenCost
                      <ExternalLink className="ml-1.5 size-3.5 opacity-70" />
                    </a>
                  </Button>
                </div>

                {isOpen && plane.namespaces.length > 0 ? (
                  <div className="border-t border-app-border px-4 py-4">
                    <div className="overflow-x-auto rounded-lg border border-app-border">
                      <table className="w-full min-w-[640px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                            <th className="px-3 py-2 font-medium" scope="col">
                              Namespace
                            </th>
                            <th className="px-3 py-2 font-medium" scope="col">
                              Pods
                            </th>
                            <th className="px-3 py-2 font-medium" scope="col">
                              CPU
                            </th>
                            <th className="px-3 py-2 font-medium" scope="col">
                              Memory
                            </th>
                            <th className="px-3 py-2 font-medium" scope="col">
                              Cost
                            </th>
                            <th className="px-3 py-2 font-medium" scope="col">
                              Source
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {plane.namespaces.map((ns) => (
                            <tr
                              key={ns.name}
                              className="border-b border-app-border/70 last:border-b-0"
                            >
                              <td className="px-3 py-3 font-mono text-app-text">
                                {ns.name}
                              </td>
                              <td className="px-3 py-3 text-app-text-muted">
                                {ns.pods}
                              </td>
                              <td className="px-3 py-3 text-app-text-muted">
                                {ns.cpu}
                              </td>
                              <td className="px-3 py-3 text-app-text-muted">
                                {ns.memory}
                              </td>
                              <td className="px-3 py-3 font-mono text-app-text">
                                {ns.cost}
                              </td>
                              <td className="px-3 py-3">
                                <Badge variant="outline">{ns.source}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
