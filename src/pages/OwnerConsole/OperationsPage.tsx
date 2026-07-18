import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MOCK_CAPACITY_POOL,
  MOCK_PLATFORM_SERVICES,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

type CatalogFilter = "all" | "attention";

export function OperationsPage() {
  const [filter, setFilter] = useState<CatalogFilter>("all");
  const services = MOCK_PLATFORM_SERVICES;
  const healthy = services.filter((service) => service.status === "up").length;
  const total = services.length;
  const unreachable = total - healthy;
  const reachability = total === 0 ? 0 : Math.round((healthy / total) * 100);
  const pool = MOCK_CAPACITY_POOL;

  const visible = services.filter((service) => {
    if (filter === "attention") {
      return service.status !== "up";
    }
    return true;
  });

  return (
    <PageContainer
      eyebrow="Operations plane"
      title="Platform operations"
      description="Service health first; deep links stay available in context."
      fullWidth
    >
      <div className="flex flex-wrap items-center justify-end gap-3">
        <a
          href="https://grafana-ops.lab.7sg.ai"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-app-accent hover:underline"
        >
          Open Grafana
          <ExternalLink className="size-3.5 opacity-70" />
        </a>
      </div>

      <section
        aria-label="Operations metrics"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="dark-card border-app-border/80 border-t-4 border-t-app-success shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Services healthy</p>
            <p className="mt-2 text-2xl font-bold text-app-text">
              {healthy} / {total}
            </p>
            <p className="mt-1 text-xs text-app-text-muted">Live health probes</p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Reachability</p>
            <p className="mt-2 text-2xl font-bold text-app-text">
              {reachability}%
            </p>
            <p className="mt-1 text-xs text-app-text-muted">
              {healthy} reachable services
            </p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Active incidents</p>
            <p className="mt-2 text-2xl font-bold text-app-text">
              {unreachable}
            </p>
            <p className="mt-1 text-xs text-app-text-muted">
              {unreachable === 0
                ? "No unreachable services"
                : "Unreachable services"}
            </p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Degraded integrations</p>
            <p className="mt-2 text-2xl font-bold text-app-text">0</p>
            <p className="mt-1 text-xs text-app-text-muted">
              All reported services healthy
            </p>
          </CardContent>
        </Card>
      </section>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="flex flex-col gap-3 px-0 pt-0 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Service catalog
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Health first; deep links remain available in context.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All services
            </Button>
            <Button
              type="button"
              size="sm"
              variant={filter === "attention" ? "default" : "outline"}
              onClick={() => setFilter("attention")}
            >
              Needs attention
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-app-border px-4 py-10 text-center">
              <p className="text-sm font-medium text-app-text">
                No services need attention
              </p>
              <p className="mt-1 text-xs text-app-text-muted">
                All catalog services are currently healthy.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-app-border">
              <table className="w-full min-w-[880px] text-left text-sm">
                <thead>
                  <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                    <th className="px-3 py-2 font-medium">Service</th>
                    <th className="px-3 py-2 font-medium">State</th>
                    <th className="px-3 py-2 font-medium">Purpose</th>
                    <th className="px-3 py-2 font-medium">Host</th>
                    <th className="px-3 py-2 font-medium">Probe</th>
                    <th className="px-3 py-2 font-medium">Console</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-app-border/70 last:border-b-0"
                    >
                      <td className="px-3 py-3 font-medium text-app-text">
                        {service.name}
                      </td>
                      <td className="px-3 py-3">
                        <Badge
                          variant="outline"
                          className={cn(
                            service.status === "up"
                              ? "border-app-success/50 text-app-success"
                              : "border-app-danger/50 text-app-danger",
                          )}
                        >
                          {service.status === "up" ? "Healthy" : "Down"}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-app-text-muted">
                        {service.description}
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-app-text-muted">
                        {service.host}
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-app-text">
                        {service.probe ?? "—"}
                      </td>
                      <td className="px-3 py-3">
                        <a
                          href={service.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-app-accent hover:underline"
                        >
                          Open
                          <ExternalLink className="size-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Cluster capacity
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Reservation against usable CPU-only headroom.
            </p>
          </div>
          <Link
            to="/capacity"
            className="text-sm font-medium text-app-accent hover:underline"
          >
            Open capacity
          </Link>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-app-border px-4 py-3">
              <p className="text-xs text-app-text-muted">CPU reserved</p>
              <p className="mt-2 text-xl font-bold text-app-text">
                {pool.cpuReserved} / {pool.cpuSchedulable} vCPU
              </p>
              <p className="mt-1 text-xs text-app-text-muted">
                {pool.cpuPercent}% of schedulable
              </p>
            </div>
            <div className="rounded-xl border border-app-border px-4 py-3">
              <p className="text-xs text-app-text-muted">Memory reserved</p>
              <p className="mt-2 text-xl font-bold text-app-text">
                {pool.memoryReserved} / {pool.memorySchedulable} GiB
              </p>
              <p className="mt-1 text-xs text-app-text-muted">
                {pool.memoryPercent}% of schedulable
              </p>
            </div>
            <div className="rounded-xl border border-app-border px-4 py-3">
              <p className="text-xs text-app-text-muted">Raw allocatable</p>
              <p className="mt-2 text-xl font-bold text-app-text">
                {pool.rawAllocatable}
              </p>
              <p className="mt-1 text-xs text-app-text-muted">
                {pool.readyNodes}
              </p>
            </div>
            <div className="rounded-xl border border-app-border px-4 py-3">
              <p className="text-xs text-app-text-muted">Safety reserve</p>
              <p className="mt-2 text-xl font-bold text-app-text">
                {pool.safetyReserve}
              </p>
              <p className="mt-1 text-xs text-app-text-muted">
                Applied before onboarding math
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Owner activity
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Recent auditable platform actions.
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="rounded-xl border border-dashed border-app-border px-4 py-10 text-center">
            <p className="text-sm font-medium text-app-text">
              No activity returned
            </p>
            <p className="mt-1 text-xs text-app-text-muted">
              The live activity endpoint currently contains no events.
            </p>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
