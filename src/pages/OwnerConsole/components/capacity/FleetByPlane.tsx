import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FleetByPlaneProps } from "@/pages/OwnerConsole/components/capacity/FleetByPlane.types";

function FootprintBar({
  label,
  total,
  shares,
  accents,
}: {
  label: string;
  total: string;
  shares: number[];
  accents: string[];
}) {
  const sum = shares.reduce((acc, value) => acc + value, 0);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-xs text-app-text-muted">
        <span>{label}</span>
        <span className="font-medium text-app-text">{total}</span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-app-border/60">
        {shares.map((share, index) => (
          <div
            key={`${label}-${index}`}
            className={accents[index]}
            style={{ width: `${(share / sum) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function FleetByPlane({ footprint, planes }: FleetByPlaneProps) {
  const [openPlaneId, setOpenPlaneId] = useState<string | null>(null);
  const accents = planes.map((plane) => plane.accentClass);

  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
        <div className="min-w-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Fleet by plane
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Live CPU/memory requests and pods across System (T0), Platform
            (T1), and Tenants (T2+).
          </p>
        </div>
        <Badge variant="outline" className="shrink-0">
          Window 7d
        </Badge>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="space-y-3">
          <FootprintBar
            label="CPU request footprint"
            total={footprint.cpuTotal}
            shares={footprint.cpuShares}
            accents={accents}
          />
          <FootprintBar
            label="Memory request footprint"
            total={footprint.memoryTotal}
            shares={footprint.memoryShares}
            accents={accents}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {planes.map((plane) => {
            const isOpen = openPlaneId === plane.id;

            return (
              <div
                key={plane.id}
                className="rounded-xl border border-app-border bg-app-bg/30"
              >
                <button
                  type="button"
                  className="flex w-full items-start gap-3 px-3 py-3 text-left"
                  onClick={() =>
                    setOpenPlaneId((current) =>
                      current === plane.id ? null : plane.id,
                    )
                  }
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn("mt-1 size-2.5 shrink-0 rounded-full", plane.accentClass)}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-app-text">
                        {plane.name}
                      </p>
                      <ChevronDown
                        className={cn(
                          "size-4 shrink-0 text-app-text-muted transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </div>
                    <p className="mt-0.5 text-xs text-app-text-muted">
                      {plane.namespaceCount} namespaces
                    </p>
                    <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <dt className="text-app-text-muted">CPU</dt>
                        <dd className="font-medium text-app-text">{plane.cpu}</dd>
                      </div>
                      <div>
                        <dt className="text-app-text-muted">Memory</dt>
                        <dd className="font-medium text-app-text">
                          {plane.memory}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-app-text-muted">Pods</dt>
                        <dd className="font-medium text-app-text">{plane.pods}</dd>
                      </div>
                    </dl>
                  </div>
                </button>
                <div className="border-t border-app-border px-3 py-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 w-full text-xs"
                    onClick={() =>
                      setOpenPlaneId((current) =>
                        current === plane.id ? null : plane.id,
                      )
                    }
                  >
                    OpenCost
                  </Button>
                </div>
                {isOpen ? (
                  <div className="border-t border-app-border px-2 pb-2">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[420px] text-left text-xs">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-wide text-app-text-muted">
                            <th className="px-2 py-2 font-medium">Namespace</th>
                            <th className="px-2 py-2 font-medium">Pods</th>
                            <th className="px-2 py-2 font-medium">CPU</th>
                            <th className="px-2 py-2 font-medium">Memory</th>
                            <th className="px-2 py-2 font-medium">Top workloads</th>
                          </tr>
                        </thead>
                        <tbody>
                          {plane.namespaces.map((row) => (
                            <tr
                              key={row.name}
                              className="border-t border-app-border/70"
                            >
                              <td className="px-2 py-2 font-mono text-app-text">
                                {row.name}
                              </td>
                              <td className="px-2 py-2 text-app-text-muted">
                                {row.pods}
                              </td>
                              <td className="px-2 py-2 text-app-text-muted">
                                {row.cpu}
                              </td>
                              <td className="px-2 py-2 text-app-text-muted">
                                {row.memory}
                              </td>
                              <td className="px-2 py-2 text-app-text-muted">
                                {row.topWorkloads}
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
