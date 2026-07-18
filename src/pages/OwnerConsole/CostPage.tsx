import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import {
  MOCK_COST_BY_TENANT,
  MOCK_COST_METRICS,
  MOCK_COST_PLANE_FOOTER,
  MOCK_COST_PLANES,
  MOCK_TENANT_BUDGETS,
} from "@/data/mockCost";
import { AllocationByPlane } from "@/pages/OwnerConsole/components/cost/AllocationByPlane";
import { CostAllocation } from "@/pages/OwnerConsole/components/cost/CostAllocation";
import { CostMetrics } from "@/pages/OwnerConsole/components/cost/CostMetrics";
import { MeteringControls } from "@/pages/OwnerConsole/components/cost/MeteringControls";
import { TenantBudgetsTable } from "@/pages/OwnerConsole/components/cost/TenantBudgetsTable";

const OPEN_COST_HREF = "https://cost-ops.lab.7sg.ai";
const GRAFANA_HREF = "https://grafana-ops.lab.7sg.ai";

export function CostPage() {
  return (
    <PageContainer
      eyebrow="FinOps"
      title="Usage & cost"
      description="Estimated infrastructure allocation from OpenCost and reservation pressure from Kueue."
      fullWidth
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={OPEN_COST_HREF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-app-accent hover:underline"
          >
            Open OpenCost
            <ExternalLink className="size-3.5 opacity-70" />
          </a>
          <a
            href={GRAFANA_HREF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-app-accent hover:underline"
          >
            Open Grafana
            <ExternalLink className="size-3.5 opacity-70" />
          </a>
        </div>
        <Button
          type="button"
          className="h-9"
          onClick={() =>
            toast.message("Export report is not wired yet", {
              description: "Deferred in this prototype.",
            })
          }
        >
          Export report
        </Button>
      </div>

      <CostMetrics metrics={MOCK_COST_METRICS} />
      <AllocationByPlane
        planes={MOCK_COST_PLANES}
        footer={MOCK_COST_PLANE_FOOTER}
        openCostHref={OPEN_COST_HREF}
      />
      <CostAllocation byTenant={MOCK_COST_BY_TENANT} />
      <TenantBudgetsTable rows={MOCK_TENANT_BUDGETS} />
      <MeteringControls />
    </PageContainer>
  );
}
