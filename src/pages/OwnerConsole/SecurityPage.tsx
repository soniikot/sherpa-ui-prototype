import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_SECURITY_FINDINGS } from "@/data/mockData";

export function SecurityPage() {
  return (
    <PageContainer
      eyebrow="Platform security"
      title="Security posture"
      description="Live read-only controls and findings reported by the owner security API."
      fullWidth
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Findings</p>
            <p className="mt-2 text-2xl font-bold text-app-text">44</p>
            <p className="mt-1 text-xs text-app-text-muted">Need attention</p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Status</p>
            <p className="mt-2 text-2xl font-bold text-app-text">Not reported</p>
            <p className="mt-1 text-xs text-app-text-muted">
              Generated time unavailable
            </p>
          </CardContent>
        </Card>
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">Controls evaluated</p>
            <p className="mt-2 text-2xl font-bold text-app-text">—</p>
            <p className="mt-1 text-xs text-app-text-muted">
              From GET /v1/security/posture
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="dark-card border border-app-danger/40 bg-app-danger/5 shadow-none">
        <CardHeader className="px-0 pt-0">
          <Badge
            variant="outline"
            className="mb-2 w-fit border-app-danger/50 text-app-danger"
          >
            Backend required
          </Badge>
          <CardTitle className="text-lg font-semibold text-app-text">
            Security approvals
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Exception review remains visible, but approvals require separation of
            duties, expiry, reason capture, and an immutable audit log.
          </p>
        </CardHeader>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-semibold text-app-text">
              Controls and findings
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Sample findings mirrored from the live attention inbox.
            </p>
          </div>
          <Button type="button" disabled className="shrink-0">
            Review approvals
          </Button>
        </div>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto rounded-lg border border-app-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                  <th className="px-3 py-2 font-medium">Severity</th>
                  <th className="px-3 py-2 font-medium">Control</th>
                  <th className="px-3 py-2 font-medium">Detail</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SECURITY_FINDINGS.map((finding) => (
                  <tr
                    key={finding.id}
                    className="border-b border-app-border/70 last:border-b-0"
                  >
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className="border-app-danger/50 text-app-danger"
                      >
                        {finding.severity}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-app-text">
                      {finding.control}
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-app-text-muted">
                      {finding.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
