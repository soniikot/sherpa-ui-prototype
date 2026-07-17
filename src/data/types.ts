export interface PlatformService {
  id: string;
  name: string;
  description: string;
  host: string;
  href: string;
  status: "up" | "down";
  /** HTTP probe status code from the ops host, when known. */
  probe?: string;
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

export type MetricTone = "neutral" | "good" | "warning";

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  hint: string;
  href?: string;
  tone?: MetricTone;
}

export interface CapacityHighlight {
  id: string;
  label: string;
  value: string;
  hint: string;
  icon: "cpu" | "memory" | "pool" | "plans";
}

export type AttentionLevel = "critical" | "warning";

export interface AttentionItem {
  id: string;
  level: AttentionLevel;
  title: string;
  detail: string;
  meta: string;
  action: string;
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

export interface CapacityPoolSegment {
  allocated: number;
  available: number;
  reserve: number;
  total: number;
  unit: string;
}

export interface CapacityPoolComposition {
  cpu: CapacityPoolSegment;
  memory: CapacityPoolSegment;
  rawAllocatable: string;
  schedulableAfterReserve: string;
  currentTenantFloors: string;
  readyCpuNodes: string;
}

export type PlacementStatus = "locked" | "available" | "unavailable";

export interface PlacementEnvelopeItem {
  id: string;
  title: string;
  detail: string;
  status: PlacementStatus;
}

export interface OnboardingPlanSlot {
  id: string;
  name: string;
  canOnboard: number;
  floor: string;
  available: boolean;
}

export interface CapacityPlan {
  id: string;
  name: string;
  floor: string;
  cap: string;
  available: boolean;
  canOnboard: number;
  cpuRequest: string;
  memoryRequest: string;
  podLimit: number;
  fitNote: string;
}

export interface FleetNamespaceRow {
  name: string;
  pods: string;
  cpu: string;
  memory: string;
  topWorkloads: string;
}

export interface FleetPlane {
  id: string;
  name: string;
  namespaceCount: number;
  cpu: string;
  memory: string;
  pods: string;
  accentClass: string;
  namespaces: FleetNamespaceRow[];
}

export interface FleetFootprint {
  cpuTotal: string;
  memoryTotal: string;
  cpuShares: number[];
  memoryShares: number[];
}

export interface TenantLimitRow {
  slug: string;
  displayName: string;
  plan: string;
  cpu: string;
  memory: string;
  kueueFloor: string;
  queue: string;
  limitStatus: "within_limits" | "near_limit" | "over_limit";
}

export interface CostTenantRow {
  slug: string;
  displayName: string;
  allocation7d: string;
  cpuQuota: string;
  memoryQuota: string;
  pods: string;
}

export interface CostMetric {
  id: string;
  label: string;
  value: string;
  hint: string;
}

export interface CostPlaneNamespace {
  name: string;
  pods: string;
  cpu: string;
  memory: string;
  cost: string;
  source: string;
}

export interface CostPlane {
  id: string;
  label: string;
  namespaceCount: number;
  total: number;
  totalLabel: string;
  cpuCost: string;
  ramCost: string;
  pods: number;
  namespaces: CostPlaneNamespace[];
}

export interface CostAllocationItem {
  id: string;
  label: string;
  amount: number;
  amountLabel: string;
}

export interface TenantBudgetRow {
  slug: string;
  displayName: string;
  cpuUsedPct: number | null;
  memUsedPct: number | null;
  allocationCost: string | null;
  floor: string;
  policy: "within_limits" | "near_limit" | "over_limit";
}

export interface SecurityFinding {
  id: string;
  control: string;
  detail: string;
  severity: "high" | "medium" | "low";
}

export type PolicyResult = "fail" | "warn" | "error" | "pass";

export interface PolicyFinding {
  id: string;
  policy: string;
  rule: string;
  result: PolicyResult;
  namespace: string;
  resource: string;
}

export interface PolicySummary {
  pass: number;
  fail: number;
  warn: number;
  error: number;
  skip: number;
  policies: number;
  reports: number;
  findings: number;
}

export type AlertSeverity = "critical" | "warning" | "none";

export interface FiringAlert {
  id: string;
  name: string;
  severity: AlertSeverity;
  summary: string;
  startedAt: string;
  state: "Active";
}

export interface PlatformIdentity {
  id: string;
  displayName: string;
  email: string;
  subject: string;
  roles: string[];
  state: "Enabled" | "Disabled";
  updatedAt: string;
}

export interface CurrentIamSession {
  subject: string;
  email: string;
  plane: string;
  primaryRole: string;
  roles: string[];
  permissions: string[];
}
