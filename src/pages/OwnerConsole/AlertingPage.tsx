import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_FIRING_ALERTS, MOCK_PLATFORM_SERVICES } from "@/data/mockData";
import type { AlertSeverity } from "@/data/types";
import { cn } from "@/lib/utils";

const ALERTMANAGER = MOCK_PLATFORM_SERVICES.find(
  (service) => service.id === "alertmanager",
);

function severityBadgeClass(severity: AlertSeverity) {
  if (severity === "critical") {
    return "border-app-danger/50 text-app-danger";
  }
  if (severity === "warning") {
    return "border-amber-500/50 text-amber-700 dark:text-amber-400";
  }
  return "border-app-border text-app-text-muted";
}

export function AlertingPage() {
  const alerts = MOCK_FIRING_ALERTS;

  return (
    <PageContainer
      eyebrow="Platform notify"
      title="Alerting"
      description="Live Alertmanager firing alerts and platform-wide notification routing."
      fullWidth
    >
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link
          to="/policies"
          className="text-sm font-medium text-app-accent hover:underline"
        >
          Policy findings
        </Link>
      </div>

      <section
        aria-label="Alerting totals"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="dark-card border-app-border/80 border-t-4 border-t-app-danger shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Firing</p>
            <p className="mt-2 text-2xl font-bold text-app-text">
              {alerts.length}
            </p>
            <p className="mt-1 text-xs text-app-text-muted">
              Active / firing alerts
            </p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Alerts loaded</p>
            <p className="mt-2 text-2xl font-bold text-app-text">
              {alerts.length}
            </p>
            <p className="mt-1 text-xs text-app-text-muted">
              From Alertmanager API
            </p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Ops UI</p>
            <p className="mt-2 text-2xl font-bold text-app-text">Up</p>
            <p className="mt-1 font-mono text-xs text-app-text-muted">
              {ALERTMANAGER?.host ?? "alerts-ops.lab.7sg.ai"}
            </p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Default receiver</p>
            <p className="mt-2 text-2xl font-bold text-app-text">webhook</p>
            <p className="mt-1 text-xs text-app-text-muted">1 receiver</p>
          </CardContent>
        </Card>
      </section>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Live alerts
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              {alerts.length} alerts in view
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" asChild>
            <a
              href={ALERTMANAGER?.href ?? "https://alerts-ops.lab.7sg.ai"}
              target="_blank"
              rel="noreferrer"
            >
              Open Alertmanager
              <ExternalLink className="ml-2 size-3.5" />
            </a>
          </Button>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto rounded-lg border border-app-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                  <th className="px-3 py-2 font-medium">State</th>
                  <th className="px-3 py-2 font-medium">Alert</th>
                  <th className="px-3 py-2 font-medium">Severity</th>
                  <th className="px-3 py-2 font-medium">Summary</th>
                  <th className="px-3 py-2 font-medium">Started</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="border-b border-app-border/70 last:border-b-0"
                  >
                    <td className="px-3 py-3 text-app-text">{alert.state}</td>
                    <td className="px-3 py-3 font-mono text-xs text-app-text">
                      {alert.name}
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className={cn(severityBadgeClass(alert.severity))}
                      >
                        {alert.severity}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-app-text-muted">
                      {alert.summary}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-app-text-muted">
                      {alert.startedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Receivers & default route
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Structured config written to the Alertmanager config secret.
            Slack/PagerDuty tokens stay in secret files.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 px-0 pb-0">
          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-app-text-muted">Default receiver</dt>
              <dd className="mt-1 text-sm font-semibold text-app-text">
                webhook
              </dd>
            </div>
            <div>
              <dt className="text-xs text-app-text-muted">Group wait</dt>
              <dd className="mt-1 text-sm text-app-text-muted">—</dd>
            </div>
            <div>
              <dt className="text-xs text-app-text-muted">Repeat interval</dt>
              <dd className="mt-1 text-sm text-app-text-muted">—</dd>
            </div>
          </dl>
          <div className="rounded-xl border border-dashed border-app-border px-4 py-6">
            <p className="text-sm text-app-text-muted">
              Receiver mutation is disabled in this prototype. Silences and
              inhibition rules stay in the Alertmanager UI.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="button" size="sm" disabled>
                Add receiver
              </Button>
              <Button type="button" size="sm" variant="outline" disabled>
                Apply routing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
