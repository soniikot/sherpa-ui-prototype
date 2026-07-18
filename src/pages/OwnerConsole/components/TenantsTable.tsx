import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Tenant } from "@/data/types";
import type { TenantsTableProps } from "@/pages/OwnerConsole/components/TenantsTable.types";

function workspaceHost(url: string) {
  return url.replace(/^https?:\/\//, "");
}

function StatusBadge({ status }: { status: Tenant["status"] }) {
  if (status === "active") {
    return (
      <Badge variant="success">
        <span className="size-1.5 rounded-full bg-app-success" />
        Active
      </Badge>
    );
  }

  if (status === "suspended") {
    return (
      <Badge variant="outline" className="border-app-warning/50 text-app-warning">
        <span className="size-1.5 rounded-full bg-app-warning" />
        Suspended
      </Badge>
    );
  }

  if (status === "deleted") {
    return (
      <Badge variant="outline" className="border-app-danger/50 text-app-danger">
        Deleted
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="border-app-running/50 text-app-running">
      <span className="size-1.5 rounded-full bg-app-running" />
      Provisioning
    </Badge>
  );
}

function HealthBadge({ health }: { health: Tenant["health"] }) {
  if (health === "reachable") {
    return <Badge variant="outline">Reachable</Badge>;
  }

  if (health === "unreachable") {
    return (
      <Badge variant="outline" className="border-app-danger/50 text-app-danger">
        Unreachable
      </Badge>
    );
  }

  return <Badge variant="outline">Unknown</Badge>;
}

export function TenantsTable({
  tenants,
  onSuspend,
  onOffboard,
}: TenantsTableProps) {
  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto rounded-lg border border-app-border">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                <th className="px-3 py-2 font-medium">Tenant</th>
                <th className="px-3 py-2 font-medium">Allocation</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Health</th>
                <th className="px-3 py-2 font-medium">Admin</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="border-b border-app-border/70 last:border-b-0"
                >
                  <td className="px-3 py-3 align-top">
                    <Link
                      to={`/workspace/${tenant.slug}`}
                      className="block text-sm font-medium text-app-accent hover:underline"
                    >
                      {tenant.displayName}
                    </Link>
                    <p className="font-mono text-xs text-app-text-muted">
                      {tenant.slug}
                    </p>
                    {tenant.readyUrl || tenant.workspaceHref ? (
                      <a
                        href={tenant.readyUrl ?? tenant.workspaceHref}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-app-text-muted hover:text-app-accent"
                      >
                        {workspaceHost(tenant.readyUrl ?? tenant.workspaceHref)}
                        <ExternalLink className="size-3 shrink-0 opacity-70" />
                      </a>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 align-top text-xs text-app-text-muted">
                    <p>
                      CPU {tenant.cpuUsed} / {tenant.cpuQuota} vCPU
                    </p>
                    <p>
                      RAM {tenant.ramUsed} / {tenant.ramQuota} GiB
                    </p>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <StatusBadge status={tenant.status} />
                  </td>
                  <td className="px-3 py-3 align-top">
                    <HealthBadge health={tenant.health} />
                  </td>
                  <td className="px-3 py-3 align-top text-app-text-muted">
                    {tenant.adminEmail}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" size="sm" asChild>
                        <Link to={`/workspace/${tenant.slug}`}>Open</Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={tenant.status === "suspended"}
                          >
                            Suspend
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Suspend {tenant.slug}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Marks the workspace suspended in this mock console.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onSuspend(tenant.id)}
                            >
                              Suspend
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button type="button" variant="destructive" size="sm">
                            Offboard
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Offboard {tenant.slug}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Removes this tenant from the mock list for this
                              session.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-white hover:bg-destructive/90"
                              onClick={() => onOffboard(tenant.id)}
                            >
                              Offboard
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
