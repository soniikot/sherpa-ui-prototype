import { PageContainer } from "@/components/PageContainer/PageContainer";
import {
  MOCK_ATTENTION_ITEMS,
  MOCK_CAPACITY_HIGHLIGHTS,
  MOCK_CAPACITY_POOL,
  MOCK_COST_TENANTS,
  MOCK_OVERVIEW_METRICS,
  MOCK_PLATFORM_SERVICES,
} from "@/data/mockData";
import { OverviewBriefing } from "@/pages/OwnerConsole/components/OverviewBriefing";

export function OverviewPage() {
  return (
    <PageContainer
      eyebrow="Owner briefing"
      title="Platform overview"
      description="Current operating posture across tenant lifecycle, services, allocation, recovery, and security."
      fullWidth
    >
      <OverviewBriefing
        metrics={MOCK_OVERVIEW_METRICS}
        capacityHighlights={MOCK_CAPACITY_HIGHLIGHTS}
        attentionItems={MOCK_ATTENTION_ITEMS}
        briefingTitle="Immediate owner attention required"
        briefingDetail="1 deterministic signal derived from current tenant, service, resource, recovery, cost, and security state."
        costTenants={MOCK_COST_TENANTS}
        services={MOCK_PLATFORM_SERVICES}
        capacityPool={MOCK_CAPACITY_POOL}
      />
    </PageContainer>
  );
}
