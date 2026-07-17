import type { ReactNode } from "react";
import type { AttentionItem, CapacityPool, MetricCard } from "@/data/types";

export interface OverviewBriefingProps {
  metrics: MetricCard[];
  attentionItems: AttentionItem[];
  healthyServices: number;
  totalServices: number;
  capacityPool: CapacityPool;
  planAvailability: string;
  summaryStatus: string;
  kueuePending: number;
  securityFindingsCount: number;
  acknowledged: boolean;
  onToggleAcknowledge: () => void;
  onProvisionWorkspace: () => void;
}

export interface SectionLinkProps {
  to: string;
  children: ReactNode;
}
