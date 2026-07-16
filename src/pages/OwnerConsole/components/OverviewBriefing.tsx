import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  MemoryStick,
  Server,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewSignals } from "@/pages/OwnerConsole/components/OverviewSignals";
import type { OverviewBriefingProps } from "@/pages/OwnerConsole/components/OverviewBriefing.types";

const CAPACITY_ICONS = {
  cpu: Cpu,
  memory: MemoryStick,
  pool: Server,
  plans: CheckCircle2,
};

function CapacityPercentBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="mt-3">
      <div className="h-2 overflow-hidden rounded-full bg-app-border/60">
        <div
          className="h-full rounded-full bg-app-accent"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-app-text-muted">{clamped}% reserved</p>
    </div>
  );
}

export function OverviewBriefing({
  metrics,
  capacityHighlights,
  attentionItems,
  briefingTitle,
  briefingDetail,
  costTenants,
  services,
  capacityPool,
}: OverviewBriefingProps) {
  return (
    <div className="space-y-6">
      <section
        aria-label={briefingTitle}
        className="rounded-xl border border-app-danger/30 bg-app-danger/5 p-4 sm:p-5"
      >
        <p className="mb-2 text-[11px] font-semibold tracking-wide text-app-success uppercase">
          Deterministic live briefing
        </p>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-app-danger text-white">
              <AlertTriangle className="size-4" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-app-text">
                {briefingTitle}
              </h2>
              <p className="mt-1 text-sm text-app-text-muted">{briefingDetail}</p>
              <a
                href="#attention-inbox"
                className="mt-2 inline-block text-sm font-medium text-app-accent hover:underline"
              >
                Open attention inbox →
              </a>
            </div>
          </div>
          <Badge variant="outline">Attention</Badge>
        </div>
      </section>

      <section aria-label="Key platform metrics">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => {
            const body = (
              <CardContent className="px-0 py-0">
                <p className="text-xs text-app-text-muted">{metric.label}</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-app-text">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-app-text-muted">{metric.hint}</p>
              </CardContent>
            );

            if (metric.href) {
              return (
                <Link key={metric.id} to={metric.href} className="group block">
                  <Card className="dark-card border-t-2 border-t-app-success/70 border-app-border/80 shadow-none transition-colors group-hover:border-t-app-accent">
                    {body}
                  </Card>
                </Link>
              );
            }

            return (
              <Card
                key={metric.id}
                className="dark-card border-t-2 border-t-app-success/70 border-app-border/80 shadow-none"
              >
                {body}
              </Card>
            );
          })}
        </div>
      </section>

      <OverviewSignals costTenants={costTenants} services={services} />

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Capacity & limit highlights
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Current tenant reservation headroom after the platform safety
              reserve.
            </p>
          </div>
          <Link
            to="/capacity"
            className="shrink-0 text-sm font-medium text-app-accent hover:underline"
          >
            Open capacity tab →
          </Link>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {capacityHighlights.map((item) => {
              const Icon = CAPACITY_ICONS[item.icon];
              const showCpuGraph = item.id === "cpu-headroom";
              const showMemoryGraph = item.id === "memory-headroom";

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-app-border bg-app-bg/40 p-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-app-text-muted">
                    <Icon className="size-4" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  <p className="text-xl font-bold text-app-text">{item.value}</p>
                  <p className="mt-1 text-xs text-app-text-muted">{item.hint}</p>
                  {showCpuGraph ? (
                    <CapacityPercentBar percent={capacityPool.cpuPercent} />
                  ) : null}
                  {showMemoryGraph ? (
                    <CapacityPercentBar percent={capacityPool.memoryPercent} />
                  ) : null}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          id="attention-inbox"
          className="dark-card scroll-mt-6 border-app-border/80 shadow-none"
        >
          <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
            <div>
              <CardTitle className="text-lg font-semibold text-app-text">
                Attention inbox
              </CardTitle>
              <p className="mt-1 text-sm text-app-text-muted">
                Only deterministic conditions from live API responses appear here.
              </p>
            </div>
            <Link
              to="/security"
              className="shrink-0 text-sm font-medium text-app-accent hover:underline"
            >
              Open security →
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 px-0 pb-0">
            {attentionItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="flex items-start gap-3 rounded-xl border border-app-danger/30 bg-app-danger/5 p-4 transition-colors hover:bg-app-danger/10"
              >
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-app-danger" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-app-text">
                    {item.title}
                  </p>
                  <p className="mt-1 font-mono text-xs text-app-text-muted">
                    {item.detail}
                  </p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
            <div>
              <CardTitle className="text-lg font-semibold text-app-text">
                Recent activity
              </CardTitle>
              <p className="mt-1 text-sm text-app-text-muted">
                Read-only owner activity from the platform audit feed.
              </p>
            </div>
            <Link
              to="/operations"
              className="shrink-0 text-sm font-medium text-app-accent hover:underline"
            >
              View operations →
            </Link>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="rounded-xl border border-dashed border-app-border px-4 py-10 text-center">
              <p className="text-sm font-medium text-app-text">
                No activity returned
              </p>
              <p className="mt-1 text-xs text-app-text-muted">
                The live activity endpoint did not return any events.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
