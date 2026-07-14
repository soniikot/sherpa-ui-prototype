import {
  Brain,
  ExternalLink,
  Rocket,
  Triangle,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WorkspacePortal } from "@/data/workspacePortal";

interface GeneralTabProps {
  portal: WorkspacePortal;
}

function ResourceMeter({
  label,
  valueLabel,
  ratio,
}: {
  label: string;
  valueLabel: string;
  ratio: number;
}) {
  const clamped = Math.min(Math.max(ratio, 0), 1);

  return (
    <div className="rounded-lg border border-app-border bg-app-bg/40 px-3 py-2.5 space-y-1.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-app-text-muted">{label}</span>
        <span className="font-mono text-xs text-app-text">{valueLabel}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-app-tag">
        <div
          className="h-full rounded-full bg-app-accent"
          style={{ width: `${clamped * 100}%` }}
        />
      </div>
    </div>
  );
}

function ResourceStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-app-border bg-app-bg/40 px-3 py-2.5">
      <p className="text-xs text-app-text-muted">{label}</p>
      <p className="mt-1 font-mono text-sm text-app-text">{value}</p>
    </div>
  );
}

function StatusBadge({
  tone,
  label,
}: {
  tone: "success" | "warning";
  label: string;
}) {
  if (tone === "success") {
    return <Badge variant="success">{label}</Badge>;
  }

  return (
    <Badge variant="outline" className="border-app-warning/50 text-app-warning">
      {label}
    </Badge>
  );
}

export function GeneralTab({ portal }: GeneralTabProps) {
  const { resources } = portal;

  const handleOpenDashboard = () => {
    toast.message("Sherpa Dashboard is not wired yet", {
      description: "Prototype — dashboard link is mock-only.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-app-text">
            <Rocket className="size-5 text-app-accent" />
            Sherpa Portal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-0 pb-0">
          <p className="max-w-3xl text-sm leading-relaxed text-app-text-muted">
            Your control hub. Use{" "}
            <span className="font-semibold text-app-text">Sherpa Dashboard</span>{" "}
            to deploy your app and model. Internal tooling (registry, secrets,
            observability) lives here too.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleOpenDashboard}>
              Open Sherpa Dashboard
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-app-success/50 text-app-success hover:bg-app-success/10 hover:text-app-success"
            >
              <a
                href={portal.internalPortalHref}
                target="_blank"
                rel="noreferrer"
              >
                Internal portal
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Rocket className="size-4 text-app-text-muted" />
                Main application
              </CardTitle>
              <StatusBadge
                tone={portal.appDeployed ? "success" : "warning"}
                label={portal.appDeployed ? "ready" : "not deployed"}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-0 pb-0">
            <p className="text-sm text-app-text-muted">
              Your app at{" "}
              <code className="font-mono text-app-text">{portal.appHost}</code>.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={!portal.appDeployed}
            >
              {portal.appDeployed
                ? "Open application"
                : "Not available — deploy via Sherpa"}
            </Button>
          </CardContent>
        </Card>

        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Wrench className="size-4 text-app-text-muted" />
                Internal services
              </CardTitle>
              <StatusBadge tone="success" label="ready" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-0 pb-0">
            <p className="text-sm text-app-text-muted">
              Registry, secrets and observability for your workspace.
            </p>
            <div className="flex flex-wrap gap-2">
              {portal.internalServices.map((service) => (
                <Button key={service.id} variant="secondary" size="sm" asChild>
                  <a href={service.href} target="_blank" rel="noreferrer">
                    {service.label}
                    <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Brain className="size-4 text-app-text-muted" />
                Model endpoint
              </CardTitle>
              <StatusBadge
                tone={portal.modelDeployed ? "success" : "warning"}
                label={portal.modelDeployed ? "ready" : "not deployed"}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-0 pb-0">
            <p className="text-sm text-app-text-muted">
              Served at{" "}
              <code className="font-mono text-app-text">{portal.modelHost}</code>
              .
            </p>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={!portal.modelDeployed}
            >
              {portal.modelDeployed
                ? "Open model endpoint"
                : "Not available — deploy via Sherpa"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Triangle className="size-4 text-app-text-muted" />
              Resource allocation
            </CardTitle>
            <StatusBadge tone="success" label={resources.runningLabel} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-0 pb-0">
          <p className="text-sm leading-relaxed text-app-text-muted">
            Your reserved floor is always available; bursts above it borrow idle
            capacity from the shared pool{" "}
            <code className="font-mono text-app-text">sherpa-fleet</code> and
            queue if the cluster is full.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <ResourceMeter
              label="CPU"
              valueLabel={`${resources.cpuUsed} / ${resources.cpuCap} vCPU`}
              ratio={resources.cpuUsed / resources.cpuCap}
            />
            <ResourceMeter
              label="Memory"
              valueLabel={`${resources.memoryUsedGiB} / ${resources.memoryCapGiB} GiB`}
              ratio={resources.memoryUsedGiB / resources.memoryCapGiB}
            />
            <ResourceStat
              label="Reserved floor"
              value={`${resources.reservedCpu} vCPU / ${resources.reservedMemoryGiB} GiB`}
            />
            <ResourceStat
              label="Pods"
              value={`${resources.podsUsed} / ${resources.podsCap}`}
            />
            <ResourceStat
              label="Batch jobs (admitted / queued)"
              value={`${resources.batchAdmitted} / ${resources.batchQueued}`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
