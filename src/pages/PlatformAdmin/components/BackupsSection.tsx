import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BackupsSectionProps } from "@/pages/PlatformAdmin/components/BackupsSection.types";

export function BackupsSection({ status }: BackupsSectionProps) {
  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-lg font-semibold text-app-text">
            Backups & DR — Velero (no UI; status only)
          </CardTitle>
          <span className="text-xs text-app-text-muted">{status.summary}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0">
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">controller {status.controller}</Badge>
          <Badge variant="success">node-agent {status.nodeAgent}</Badge>
          <Badge variant="success">completed {status.completed}</Badge>
          <Badge variant="success">BSL {status.bsl}</Badge>
        </div>
        <p className="text-xs text-app-text-muted">{status.schedulesNote}</p>
        <div className="overflow-x-auto rounded-lg border border-app-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                <th className="px-3 py-2 font-medium">Backup</th>
                <th className="px-3 py-2 font-medium">Phase</th>
                <th className="px-3 py-2 font-medium">Err/Warn</th>
                <th className="px-3 py-2 font-medium">Age</th>
                <th className="px-3 py-2 font-medium">Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-sm text-app-text-muted"
                >
                  No backups yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
