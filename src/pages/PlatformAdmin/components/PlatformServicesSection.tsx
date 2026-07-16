import {
  Activity,
  AlertTriangle,
  Box,
  DollarSign,
  ExternalLink,
  HardDrive,
  KeyRound,
  LayoutDashboard,
  Network,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlatformServicesSectionProps } from "@/pages/PlatformAdmin/components/PlatformServicesSection.types";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  grafana: LayoutDashboard,
  prometheus: Activity,
  alertmanager: AlertTriangle,
  opencost: DollarSign,
  wazuh: Shield,
  kyverno: Box,
  hubble: Network,
  longhorn: HardDrive,
  vault: KeyRound,
  status: Activity,
  keycloak: KeyRound,
};

export function PlatformServicesSection({
  services,
}: PlatformServicesSectionProps) {
  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Platform services
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Ops plane health — SSO-gated ingress and direct probes.
          </p>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.id] ?? Box;
            return (
              <a
                key={service.id}
                href={service.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-app-border bg-app-bg/40 p-4 transition-colors hover:border-app-accent/50 hover:bg-app-hover/40"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-app-text">
                    <Icon className="size-4 text-app-text-muted" />
                    <span className="text-sm font-semibold group-hover:text-app-accent">
                      {service.name}
                    </span>
                    <ExternalLink className="size-3.5 text-app-text-muted opacity-70" />
                  </div>
                  <span
                    className={
                      service.status === "up"
                        ? "mt-1 size-2 shrink-0 rounded-full bg-app-success"
                        : "mt-1 size-2 shrink-0 rounded-full bg-app-danger"
                    }
                    aria-label={service.status === "up" ? "up" : "down"}
                  />
                </div>
                <p className="mb-3 text-xs leading-relaxed text-app-text-muted">
                  {service.description}
                </p>
                <p className="font-mono text-[11px] text-app-text-muted/80">
                  {service.host}
                </p>
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
