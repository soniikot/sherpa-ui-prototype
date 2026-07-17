import { Link } from "react-router-dom";
import { ChevronDown, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AskSherpaPanel } from "@/pages/OwnerConsole/components/AskSherpaPanel";
import type {
  OverviewBriefingProps,
  SectionLinkProps,
} from "@/pages/OwnerConsole/components/OverviewBriefing.types";
import { cn } from "@/lib/utils";

const sectionLinkClassName =
  "shrink-0 text-sm font-medium text-app-accent hover:underline";

function SectionLink({ to, children }: SectionLinkProps) {
  return (
    <Link to={to} className={sectionLinkClassName}>
      {children}
    </Link>
  );
}

function toneBorder(tone?: "neutral" | "good" | "warning") {
  if (tone === "good") {
    return "border-t-app-success/70";
  }
  if (tone === "warning") {
    return "border-t-app-warning/70";
  }
  return "border-t-app-border";
}

function UsageMeter({
  label,
  percent,
  detail,
}: {
  label: string;
  percent: number;
  detail: string;
}) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2 text-sm">
        <span className="text-app-text-muted">{label}</span>
        <span className="font-medium text-app-text">{clamped}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-app-border/60">
        <div
          className="h-full rounded-full bg-app-accent"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-app-text-muted">{detail}</p>
    </div>
  );
}

export function OverviewBriefing({
  metrics,
  attentionItems,
  healthyServices,
  totalServices,
  capacityPool,
  planAvailability,
  summaryStatus,
  kueuePending,
  securityFindingsCount,
  acknowledged,
  onToggleAcknowledge,
  onProvisionWorkspace,
}: OverviewBriefingProps) {
  const degraded = totalServices - healthyServices;
  const availabilityPercent =
    totalServices === 0
      ? 0
      : Math.round((healthyServices / totalServices) * 100);

  const visibleAttention = acknowledged ? [] : attentionItems;
  const calloutTitle = visibleAttention.length
    ? `${visibleAttention.length} item${visibleAttention.length === 1 ? "" : "s"} need owner attention`
    : "No open attention items";
  const calloutDetail = visibleAttention.length
    ? `${visibleAttention
        .slice(0, 3)
        .map((item) => item.title)
        .join("; ")}.`
    : "Briefing computed from live tenant, service, capacity, recovery, cost, and security state.";

  const planParts = planAvailability.split("/");
  const planSelectable = Number.parseInt(planParts[0] ?? "0", 10) || 0;
  const planTotal = Number.parseInt(planParts[1] ?? "0", 10) || 0;
  const planPercent =
    planTotal === 0 ? 0 : Math.round((planSelectable / planTotal) * 100);

  return (
    <div className="space-y-6">
      <section
        aria-label={calloutTitle}
        className={cn(
          "rounded-xl border p-4 sm:p-5",
          visibleAttention.length
            ? "border-app-warning/40 bg-app-warning/5"
            : "border-app-border bg-app-surface/40",
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-app-text">
              {calloutTitle}
            </h2>
            <p className="mt-1 text-sm text-app-text-muted">{calloutDetail}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" asChild>
              <Link to="/policies">Review risks</Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onToggleAcknowledge}
              disabled={attentionItems.length === 0}
            >
              {acknowledged ? "Mark unacknowledged" : "Acknowledge"}
            </Button>
          </div>
        </div>
      </section>

      <AskSherpaPanel
        attentionItems={visibleAttention}
        healthyServices={healthyServices}
        totalServices={totalServices}
      />

      <section aria-label="Key platform metrics">
        <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
                <Link
                  key={metric.id}
                  to={metric.href}
                  className="group block h-full"
                >
                  <Card
                    className={cn(
                      "dark-card h-full border-t-2 border-app-border/80 shadow-none transition-colors group-hover:border-t-app-accent",
                      toneBorder(metric.tone),
                    )}
                  >
                    {body}
                  </Card>
                </Link>
              );
            }

            return (
              <Card
                key={metric.id}
                className={cn(
                  "dark-card h-full border-t-2 border-app-border/80 shadow-none",
                  toneBorder(metric.tone),
                )}
              >
                {body}
              </Card>
            );
          })}

          <button
            type="button"
            onClick={onProvisionWorkspace}
            className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-app-accent/45 bg-app-accent/10 p-4 text-center transition-colors hover:border-app-accent hover:bg-app-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-app-accent text-white">
              <Plus className="size-4" aria-hidden />
            </span>
            <span className="text-sm font-semibold text-app-text">
              Provision workspace
            </span>
            <span className="text-xs text-app-text-muted">
              Create a new tenant
            </span>
          </button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card
          id="owner-inbox"
          className="dark-card scroll-mt-6 border-app-border/80 shadow-none"
        >
          <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
            <div>
              <CardTitle className="text-lg font-semibold text-app-text">
                Owner inbox
              </CardTitle>
              <p className="mt-1 text-sm text-app-text-muted">
                Prioritized by customer impact and time sensitivity.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Badge variant="outline">{visibleAttention.length} open</Badge>
              <SectionLink to="/signups">Open signups</SectionLink>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-0 pb-0">
            {visibleAttention.length === 0 ? (
              <div className="rounded-xl border border-dashed border-app-border px-4 py-10 text-center">
                <p className="text-sm font-medium text-app-text">
                  No current attention signals
                </p>
                <p className="mt-1 text-xs text-app-text-muted">
                  All loaded sources are free of the conditions this briefing
                  checks.
                </p>
              </div>
            ) : (
              visibleAttention.map((item) => (
                <article
                  key={item.id}
                  className={cn(
                    "flex flex-wrap items-start justify-between gap-3 rounded-xl border p-4",
                    item.level === "critical"
                      ? "border-app-danger/30 bg-app-danger/5"
                      : "border-app-warning/30 bg-app-warning/5",
                  )}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className={cn(
                        "mt-1.5 size-2.5 shrink-0 rounded-full",
                        item.level === "critical"
                          ? "bg-app-danger"
                          : "bg-app-warning",
                      )}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-app-text">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-app-text-muted">
                        {item.detail}
                      </p>
                      <p className="mt-1 text-xs text-app-text-muted">
                        {item.meta}
                      </p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" asChild>
                    <Link to={item.href}>{item.action}</Link>
                  </Button>
                </article>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
            <div>
              <CardTitle className="text-lg font-semibold text-app-text">
                Fleet health
              </CardTitle>
              <p className="mt-1 text-sm text-app-text-muted">
                {degraded === 0
                  ? "All core services available"
                  : `${degraded} degraded integration${degraded === 1 ? "" : "s"}`}
              </p>
              <p className="mt-0.5 text-xs text-app-text-muted">
                {healthyServices} healthy · {degraded} degraded
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Badge variant="success">Live</Badge>
              <SectionLink to="/operations">Open operations</SectionLink>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-0 pb-0">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-3xl font-bold text-app-text">
                  {totalServices
                    ? `${healthyServices} / ${totalServices}`
                    : "—"}
                </p>
                <p className="text-xs text-app-text-muted">healthy</p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-app-text-muted">Service availability</span>
                <span className="font-medium text-app-text">
                  {availabilityPercent}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-app-border/60">
                <div
                  className="h-full rounded-full bg-app-success"
                  style={{ width: `${availabilityPercent}%` }}
                />
              </div>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-app-text-muted">CPU reserved</dt>
                <dd className="mt-0.5 text-sm text-app-text">
                  {capacityPool.cpuReserved} / {capacityPool.cpuSchedulable} vCPU
                </dd>
              </div>
              <div>
                <dt className="text-xs text-app-text-muted">Provision queue</dt>
                <dd className="mt-0.5 text-sm text-app-text">
                  {kueuePending} pending workload
                  {kueuePending === 1 ? "" : "s"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-app-text-muted">Policy findings</dt>
                <dd className="mt-0.5 text-sm text-app-text">
                  {securityFindingsCount} reported
                </dd>
              </div>
              <div>
                <dt className="text-xs text-app-text-muted">Last backup</dt>
                <dd className="mt-0.5 text-sm text-app-text">Not reported</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
            <div>
              <CardTitle className="text-lg font-semibold text-app-text">
                Platform capacity
              </CardTitle>
              <p className="mt-1 text-sm text-app-text-muted">
                Live reservation headroom after the platform safety reserve.
              </p>
            </div>
            <SectionLink to="/capacity">Open capacity</SectionLink>
          </CardHeader>
          <CardContent className="space-y-5 px-0 pb-0">
            <UsageMeter
              label="CPU reserved"
              percent={capacityPool.cpuPercent}
              detail={`${(
                Number.parseFloat(capacityPool.cpuSchedulable) -
                Number.parseFloat(capacityPool.cpuReserved)
              ).toFixed(0)} vCPU headroom · ${capacityPool.readyNodes.replace(
                / Ready.*/,
                " Ready nodes",
              )}`}
            />
            <UsageMeter
              label="Memory reserved"
              percent={capacityPool.memoryPercent}
              detail={`${(
                Number.parseFloat(capacityPool.memorySchedulable) -
                Number.parseFloat(capacityPool.memoryReserved)
              ).toFixed(2)} GiB headroom · ${capacityPool.safetyReserve.replace(
                "safety ",
                "",
              )}`}
            />
            <UsageMeter
              label="Plan availability"
              percent={planPercent}
              detail="Validated against live Kueue floors"
            />
          </CardContent>
        </Card>

        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
            <div>
              <CardTitle className="text-lg font-semibold text-app-text">
                Recent lifecycle activity
              </CardTitle>
              <p className="mt-1 text-sm text-app-text-muted">
                Read-only owner activity from the platform audit feed.
              </p>
            </div>
            <SectionLink to="/tenants">View all tenants</SectionLink>
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

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Summary source
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Provenance for the owner briefing shown above.
            </p>
          </div>
          <SectionLink to="/policies">Open policies</SectionLink>
        </CardHeader>
        <CardContent className="space-y-4 px-0 pb-0">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-app-text-muted">
                Owner summary status
              </dt>
              <dd className="mt-1 text-sm font-semibold capitalize text-app-text">
                {summaryStatus}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-app-text-muted">Generated</dt>
              <dd className="mt-1 text-sm font-semibold text-app-text">
                {new Intl.DateTimeFormat(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                }).format(new Date())}
              </dd>
            </div>
          </dl>
          <details className="group border-t border-app-border pt-3">
            <summary
              className={cn(
                sectionLinkClassName,
                "flex list-none items-center gap-1 marker:content-none [&::-webkit-details-marker]:hidden",
              )}
            >
              Inspect summary
              <ChevronDown
                className="size-3.5 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-app-text-muted">
              Deterministic mock summary derived from tenant lifecycle, service
              health, capacity reservations, OpenCost allocation, backup
              posture, and Kyverno findings.
            </p>
          </details>
        </CardContent>
      </Card>
    </div>
  );
}
