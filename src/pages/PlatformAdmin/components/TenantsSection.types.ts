import type { Tenant } from "@/data/mockData";

export interface TenantsSectionProps {
  tenants: Tenant[];
  onSuspend: (tenantId: string) => void;
  onRemove: (tenantId: string) => void;
}
