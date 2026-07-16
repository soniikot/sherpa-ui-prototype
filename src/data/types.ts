export interface PlatformService {
  id: string;
  name: string;
  description: string;
  host: string;
  href: string;
  status: "up" | "down";
}

export type TenantStatus = "active" | "suspended" | "provisioning" | "deleted";

export type TenantHealth = "reachable" | "unreachable" | "unknown";

export interface Tenant {
  id: string;
  slug: string;
  displayName: string;
  status: TenantStatus;
  health: TenantHealth;
  cpuUsed: string;
  cpuQuota: string;
  ramUsed: string;
  ramQuota: string;
  readyUrl: string | null;
  workspaceHref: string;
  adminEmail: string;
  cost7d: string;
}

export interface BackupStatus {
  controller: string;
  nodeAgent: string;
  completed: number;
  failed: number;
  bsl: string;
  summary: string;
  schedulesNote: string;
}

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  hint: string;
  href?: string;
}

export interface CapacityHighlight {
  id: string;
  label: string;
  value: string;
  hint: string;
  icon: "cpu" | "memory" | "pool" | "plans";
}

export interface AttentionItem {
  id: string;
  title: string;
  detail: string;
  href: string;
}

export interface CapacityPool {
  cpuReserved: string;
  cpuSchedulable: string;
  cpuPercent: number;
  memoryReserved: string;
  memorySchedulable: string;
  memoryPercent: number;
  rawAllocatable: string;
  readyNodes: string;
  safetyReserve: string;
}

export interface CapacityPlan {
  id: string;
  name: string;
  floor: string;
  cap: string;
  available: boolean;
}

export interface TenantLimitRow {
  slug: string;
  displayName: string;
  cpu: string;
  memory: string;
  kueueFloor: string;
}

export interface CostTenantRow {
  slug: string;
  displayName: string;
  allocation7d: string;
  cpuQuota: string;
  memoryQuota: string;
  pods: string;
}

export interface SecurityFinding {
  id: string;
  control: string;
  detail: string;
  severity: "high" | "medium" | "low";
}
