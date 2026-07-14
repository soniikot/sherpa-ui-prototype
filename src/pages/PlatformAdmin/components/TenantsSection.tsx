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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tenant } from "@/data/mockData";
import type { TenantsSectionProps } from "@/pages/PlatformAdmin/components/TenantsSection.types";

function StatusBadge({ status }: { status: Tenant["status"] }) {
  if (status === "active") {
    return (
      <Badge variant="success">
        <span className="size-1.5 rounded-full bg-app-success" />
        active
      </Badge>
    );
  }

  if (status === "suspended") {
    return (
      <Badge variant="outline" className="border-app-warning/50 text-app-warning">
        <span className="size-1.5 rounded-full bg-app-warning" />
        suspended
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="border-app-running/50 text-app-running">
      <span className="size-1.5 rounded-full bg-app-running" />
      provisioning
    </Badge>
  );
}

export function TenantsSection({
  tenants,
  onSuspend,
  onRemove,
}: TenantsSectionProps) {
  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-semibold text-app-text">
          Tenants — {tenants.length} workspace{tenants.length === 1 ? "" : "s"}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto rounded-lg border border-app-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Cost</th>
                <th className="px-3 py-2 font-medium">Workspace</th>
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
                    <StatusBadge status={tenant.status} />
                  </td>
                  <td className="px-3 py-3 align-top">
                    <span className="font-mono text-xs text-app-success">
                      {tenant.cost7d}
                    </span>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Link
                      to={`/workspace/${tenant.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm text-app-accent hover:underline"
                    >
                      {tenant.displayName}
                      <span className="font-mono text-xs text-app-text-muted">
                        /{tenant.slug}
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3 align-top text-app-text-muted">
                    {tenant.adminEmail}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <div className="flex flex-wrap gap-2">
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
                              The workspace will be marked suspended in this mock
                              console. No real infrastructure change.
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
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Remove {tenant.slug}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Removes this tenant from the mock list. Cannot be
                              undone in this session.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-white hover:bg-destructive/90"
                              onClick={() => onRemove(tenant.id)}
                            >
                              Remove
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
