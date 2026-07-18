import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MOCK_TENANTS, type Tenant } from "@/data/mockData";
import { CreateWorkspaceSection } from "@/pages/PlatformAdmin/components/CreateWorkspaceSection";
import { PendingSignupsSection } from "@/pages/OwnerConsole/components/PendingSignupsSection";
import { TenantsTable } from "@/pages/OwnerConsole/components/TenantsTable";

export function TenantsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [showCreate, setShowCreate] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Tenant["status"]>(
    "all",
  );

  useEffect(() => {
    if (searchParams.get("create") !== "1") {
      return;
    }
    setShowCreate(true);
    const next = new URLSearchParams(searchParams);
    next.delete("create");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const normalized = query.trim().toLowerCase();
  const filtered = tenants.filter((tenant) => {
    if (statusFilter !== "all" && tenant.status !== statusFilter) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    return (
      tenant.slug.includes(normalized) ||
      tenant.displayName.toLowerCase().includes(normalized) ||
      tenant.adminEmail.toLowerCase().includes(normalized)
    );
  });

  const handleCreated = (payload: {
    slug: string;
    adminEmail: string;
    organizationName: string;
    tempPassword: string;
  }) => {
    const existing = tenants.some((tenant) => tenant.slug === payload.slug);
    if (existing) {
      toast.error(`Workspace "${payload.slug}" already exists`);
      return;
    }

    const next: Tenant = {
      id: payload.slug,
      slug: payload.slug,
      displayName: payload.organizationName,
      status: "active",
      health: "reachable",
      cpuUsed: "0.00",
      cpuQuota: "6",
      ramUsed: "0.00",
      ramQuota: "12",
      readyUrl: `https://${payload.slug}.lab.7sg.ai`,
      workspaceHref: `https://${payload.slug}.lab.7sg.ai`,
      adminEmail: payload.adminEmail,
      cost7d: "$0.00 · 7d",
    };

    setTenants((current) => [next, ...current]);
    setShowCreate(false);
    toast.success(`Created workspace ${payload.slug}`, {
      description: `Temp password: ${payload.tempPassword}`,
    });
  };

  return (
    <PageContainer
      eyebrow="Tenant lifecycle"
      title="Tenants"
      description="Operate live workspaces, then review pending signup requests."
      fullWidth
    >
      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Live tenants
          </CardTitle>
          <Button
            type="button"
            onClick={() => setShowCreate(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create tenant
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 px-0 pb-0">
          <div
            className="flex flex-wrap items-end gap-3"
            role="search"
            aria-label="Filter tenants"
          >
            <div className="min-w-[220px] flex-1">
              <label className="sr-only" htmlFor="tenant-search">
                Search tenants
              </label>
              <Input
                id="tenant-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search slug, name, or admin"
                aria-label="Search tenants"
              />
            </div>
            <label className="flex flex-col gap-1 text-xs text-app-text-muted">
              Status
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "all" | Tenant["status"])
                }
                aria-label="Status"
                className="h-9 min-w-[10rem] rounded-md border border-app-border bg-app-surface px-3 text-sm text-app-text"
              >
                <option value="all">All live statuses</option>
                <option value="active">active</option>
                <option value="deleted">deleted</option>
                <option value="suspended">suspended</option>
                <option value="provisioning">provisioning</option>
              </select>
            </label>
          </div>

          {tenants.length === 0 ? (
            <div className="rounded-lg border border-dashed border-app-border px-6 py-16 text-center">
              <p className="text-base font-semibold text-app-text">
                No tenants yet
              </p>
              <p className="mt-1 text-sm text-app-text-muted">
                Create a tenant to start operating workspaces.
              </p>
            </div>
          ) : null}

          {tenants.length > 0 && filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-app-border px-6 py-16 text-center">
              <p className="text-base font-semibold text-app-text">
                No matching tenants
              </p>
              <p className="mt-1 text-sm text-app-text-muted">
                Clear or adjust the current filters.
              </p>
            </div>
          ) : null}

          {filtered.length > 0 ? (
            <>
              <p className="text-sm text-app-text-muted" aria-live="polite">
                {`Showing ${filtered.length} of ${tenants.length} tenant${tenants.length === 1 ? "" : "s"}`}
              </p>
              <TenantsTable
                tenants={filtered}
                onSuspend={(tenantId) => {
                  setTenants((current) =>
                    current.map((tenant) => {
                      if (tenant.id !== tenantId) {
                        return tenant;
                      }
                      return { ...tenant, status: "suspended" };
                    }),
                  );
                  toast.message("Tenant suspended (mock)");
                }}
                onOffboard={(tenantId) => {
                  setTenants((current) =>
                    current.filter((tenant) => tenant.id !== tenantId),
                  );
                  toast.message("Tenant offboarded (mock)");
                }}
              />
            </>
          ) : null}
        </CardContent>
      </Card>

      <PendingSignupsSection />

      <CreateWorkspaceSection
        open={showCreate}
        onOpenChange={setShowCreate}
        onCreated={handleCreated}
      />
    </PageContainer>
  );
}
