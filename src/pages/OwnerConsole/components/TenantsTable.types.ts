import type { Tenant } from "@/data/types";

export interface TenantsTableProps {
  tenants: Tenant[];
  onSuspend: (tenantId: string) => void;
  onOffboard: (tenantId: string) => void;
}
