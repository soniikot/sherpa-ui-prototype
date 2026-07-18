import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_PLATFORM_SERVICES } from "@/data/mockData";

const WAZUH = MOCK_PLATFORM_SERVICES.find((service) => service.id === "wazuh");

export function SiemPage() {
  return (
    <PageContainer
      eyebrow="Detection"
      title="SIEM"
      description="Wazuh security events, vulnerability scans, SCA, and file integrity for the platform."
      fullWidth
    >
      <section
        aria-label="SIEM health"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Provider</p>
            <p className="mt-2 text-2xl font-bold text-app-text">Wazuh</p>
            <p className="mt-1 text-xs text-app-text-muted">Namespace · wazuh</p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Ops endpoint</p>
            <p className="mt-2 text-2xl font-bold text-app-text">Up</p>
            <p className="mt-1 font-mono text-xs text-app-text-muted">
              {WAZUH?.host ?? "wazuh-ops.lab.7sg.ai"}
            </p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Pods ready</p>
            <p className="mt-2 text-2xl font-bold text-app-text">5/5</p>
            <p className="mt-1 text-xs text-app-text-muted">
              Wazuh namespace workloads
            </p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Status</p>
            <p className="mt-2 text-2xl font-bold text-app-text">Available</p>
            <p className="mt-1 text-xs text-app-text-muted">Live SIEM probe</p>
          </CardContent>
        </Card>
      </section>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Wazuh operations console
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              {WAZUH?.description ??
                "SIEM: security events, vulnerabilities, SCA & file integrity."}
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-app-success/50 text-app-success"
          >
            Reachable
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4 px-0 pb-0">
          <p className="font-mono text-xs text-app-text-muted">
            {WAZUH?.host ?? "wazuh-ops.lab.7sg.ai"}
          </p>
          <p className="text-sm text-app-text-muted">
            Use the ops console for security events, FIM, SCA, and vulnerability
            findings. Alert routing and paging live under Alerting — not in SIEM.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" asChild>
              <a
                href={WAZUH?.href ?? "https://wazuh-ops.lab.7sg.ai"}
                target="_blank"
                rel="noreferrer"
              >
                Open Wazuh
                <ExternalLink className="ml-2 size-3.5" />
              </a>
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link to="/alerting">Configure notifications</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Health facts
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Controller probe of the Wazuh namespace and ops host.
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs text-app-text-muted">Namespace</dt>
              <dd className="mt-1 font-mono text-sm text-app-text">wazuh</dd>
            </div>
            <div>
              <dt className="text-xs text-app-text-muted">Pods</dt>
              <dd className="mt-1 text-sm text-app-text">5 ready / 5 total</dd>
            </div>
            <div>
              <dt className="text-xs text-app-text-muted">HTTP</dt>
              <dd className="mt-1 text-sm text-app-text">Up · 302</dd>
            </div>
            <div>
              <dt className="text-xs text-app-text-muted">Console</dt>
              <dd className="mt-1 font-mono text-sm text-app-accent">
                {WAZUH?.href ?? "https://wazuh-ops.lab.7sg.ai"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
