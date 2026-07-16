import type {
  AttentionItem,
  CapacityHighlight,
  CapacityPool,
  CostTenantRow,
  MetricCard,
  PlatformService,
} from "@/data/types";

export interface OverviewBriefingProps {
  metrics: MetricCard[];
  capacityHighlights: CapacityHighlight[];
  attentionItems: AttentionItem[];
  briefingTitle: string;
  briefingDetail: string;
  costTenants: CostTenantRow[];
  services: PlatformService[];
  capacityPool: CapacityPool;
}
