import type { CostTenantRow, PlatformService } from "@/data/types";

export interface OverviewSignalsProps {
  costTenants: CostTenantRow[];
  services: PlatformService[];
}
