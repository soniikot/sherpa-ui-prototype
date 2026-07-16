import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_TENANTS, type Tenant } from "@/data/mockData";
import { CreateWorkspaceSection } from "@/pages/PlatformAdmin/components/CreateWorkspaceSection";
import { TenantsTable } from "@/pages/OwnerConsole/components/TenantsTable";

export function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [showCreate, setShowCreate] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Tenant["status"]>(
    "all",
  );

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
      description="Create and operate workspaces using the live tenant controller."
      fullWidth
    >
      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search slug, name, or admin"
          aria-label="Search tenants"
          className="max-w-sm"
        />
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as "all" | Tenant["status"])
          }
          aria-label="Status"
          className="h-9 rounded-md border border-app-border bg-app-surface px-3 text-sm text-app-text"
        >
          <option value="all">All live statuses</option>
          <option value="active">active</option>
          <option value="deleted">deleted</option>
          <option value="suspended">suspended</option>
          <option value="provisioning">provisioning</option>
        </select>
        <Button
          type="button"
          onClick={() => setShowCreate(true)}
          className="ml-auto gap-2"
        >
          <Plus className="h-4 w-4" />
          Create tenant
        </Button>
      </div>

      <CreateWorkspaceSection
        open={showCreate}
        onOpenChange={setShowCreate}
        onCreated={handleCreated}
      />

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
    </PageContainer>
  );
}
