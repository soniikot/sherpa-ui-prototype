import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import {
  MOCK_BACKUP_STATUS,
  MOCK_PLATFORM_SERVICES,
  MOCK_TENANTS,
  type Tenant,
} from "@/data/mockData";
import { BackupsSection } from "@/pages/PlatformAdmin/components/BackupsSection";
import { CreateWorkspaceSection } from "@/pages/PlatformAdmin/components/CreateWorkspaceSection";
import { PlatformServicesSection } from "@/pages/PlatformAdmin/components/PlatformServicesSection";
import { TenantsSection } from "@/pages/PlatformAdmin/components/TenantsSection";

export function PlatformAdminPage() {
  const location = useLocation();
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);

  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const id = location.hash.slice(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

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
      status: "active",
      phaseLabel: "—",
      readyUrl: `https://${payload.slug}.lab.7sg.ai`,
      workspaceHref: `https://${payload.slug}.lab.7sg.ai`,
      adminEmail: payload.adminEmail,
      cost7d: "$0.00 · 7d",
    };

    setTenants((current) => [next, ...current]);
    toast.success(`Created workspace ${payload.slug}`, {
      description: `Temp password: ${payload.tempPassword} · org: ${payload.organizationName}`,
    });
  };

  const handleSuspend = (tenantId: string) => {
    setTenants((current) =>
      current.map((tenant) => {
        if (tenant.id !== tenantId) {
          return tenant;
        }
        return { ...tenant, status: "suspended", phaseLabel: "suspended" };
      }),
    );
    toast.message("Tenant suspended (mock)");
  };

  const handleRemove = (tenantId: string) => {
    setTenants((current) => current.filter((tenant) => tenant.id !== tenantId));
    toast.message("Tenant removed (mock)");
  };

  return (
    <PageContainer
      title="Tenant Lifecycle Console"
      description="provisioning orchestrator (sherpa-lab)"
      fullWidth
    >
      <section id="services" className="scroll-mt-6">
        <PlatformServicesSection services={MOCK_PLATFORM_SERVICES} />
      </section>
      <section id="backups" className="scroll-mt-6">
        <BackupsSection status={MOCK_BACKUP_STATUS} />
      </section>
      <section id="create" className="scroll-mt-6">
        <CreateWorkspaceSection onCreated={handleCreated} />
      </section>
      <section id="tenants" className="scroll-mt-6">
        <TenantsSection
          tenants={tenants}
          onSuspend={handleSuspend}
          onRemove={handleRemove}
        />
      </section>
    </PageContainer>
  );
}
