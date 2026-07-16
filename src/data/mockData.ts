import type {
  AttentionItem,
  BackupStatus,
  CapacityHighlight,
  CapacityPlan,
  CapacityPool,
  CostTenantRow,
  MetricCard,
  PlatformService,
  SecurityFinding,
  Tenant,
  TenantLimitRow,
} from "@/data/types";

export type {
  AttentionItem,
  BackupStatus,
  CapacityHighlight,
  CapacityPlan,
  CapacityPool,
  CostTenantRow,
  MetricCard,
  PlatformService,
  SecurityFinding,
  Tenant,
  TenantHealth,
  TenantLimitRow,
  TenantStatus,
} from "@/data/types";

export const MOCK_OPERATOR_EMAIL = "sofia@7sg.ai";

export const MOCK_PLATFORM_SERVICES: PlatformService[] = [
  {
    id: "grafana",
    name: "Grafana",
    description:
      "Dashboards, metrics, logs (Loki) & traces (Tempo) — the single query front door.",
    host: "grafana-ops.lab.7sg.ai",
    href: "https://grafana-ops.lab.7sg.ai",
    status: "up",
  },
  {
    id: "prometheus",
    name: "Prometheus",
    description: "Metrics store & PromQL. Inspect targets, rules and alert state.",
    host: "prometheus-ops.lab.7sg.ai",
    href: "https://prometheus-ops.lab.7sg.ai",
    status: "up",
  },
  {
    id: "alertmanager",
    name: "Alertmanager",
    description: "Alert routing, grouping, silences and inhibitions.",
    host: "alerts-ops.lab.7sg.ai",
    href: "https://alerts-ops.lab.7sg.ai",
    status: "up",
  },
  {
    id: "opencost",
    name: "OpenCost",
    description: "Cost allocation & showback by namespace / workload.",
    host: "cost-ops.lab.7sg.ai",
    href: "https://cost-ops.lab.7sg.ai",
    status: "up",
  },
  {
    id: "wazuh",
    name: "Wazuh",
    description: "SIEM: security events, vulnerabilities, SCA & file integrity.",
    host: "wazuh-ops.lab.7sg.ai",
    href: "https://wazuh-ops.lab.7sg.ai",
    status: "up",
  },
  {
    id: "kyverno",
    name: "Kyverno · Policy Reporter",
    description:
      "Admission policies & PolicyReports — pass/fail per rule across namespaces.",
    host: "policy-ops.lab.7sg.ai",
    href: "https://policy-ops.lab.7sg.ai",
    status: "up",
  },
  {
    id: "hubble",
    name: "Hubble",
    description: "Cilium network-flow map & policy-drop visibility (east/west).",
    host: "hubble-ops.lab.7sg.ai",
    href: "https://hubble-ops.lab.7sg.ai",
    status: "up",
  },
  {
    id: "longhorn",
    name: "Longhorn",
    description: "Block storage: volumes, replicas, snapshots & backups.",
    host: "longhorn-ops.lab.7sg.ai",
    href: "https://longhorn-ops.lab.7sg.ai",
    status: "up",
  },
  {
    id: "vault",
    name: "Vault",
    description: "Platform secrets (HA Raft) — KV, policies, auth & audit.",
    host: "vault-ops.lab.7sg.ai",
    href: "https://vault-ops.lab.7sg.ai",
    status: "up",
  },
  {
    id: "status",
    name: "Status",
    description: "Platform status page — uptime of every control-plane component.",
    host: "status.lab.7sg.ai",
    href: "https://status.lab.7sg.ai",
    status: "up",
  },
  {
    id: "keycloak",
    name: "Keycloak (SSO)",
    description:
      "Primary identity provider — tenant realms, users, federation, roles, and claims.",
    host: "sso.lab.7sg.ai",
    href: "https://sso.lab.7sg.ai",
    status: "up",
  },
];

export const MOCK_BACKUP_STATUS: BackupStatus = {
  controller: "1/1",
  nodeAgent: "4/4",
  completed: 0,
  failed: 0,
  bsl: "default Available · default",
  summary: "0 backups · all clean",
  schedulesNote: "No schedules — backups are on-demand.",
};

export const MOCK_TENANTS: Tenant[] = [
  {
    id: "acme",
    slug: "acme",
    displayName: "Acme Inc",
    status: "active",
    health: "reachable",
    cpuUsed: "0.08",
    cpuQuota: "6",
    ramUsed: "0.17",
    ramQuota: "12",
    readyUrl: "https://acme.lab.7sg.ai",
    workspaceHref: "https://acme.lab.7sg.ai",
    adminEmail: "admin@acme.test",
    cost7d: "$0.41 · 7d",
  },
  {
    id: "beta",
    slug: "beta",
    displayName: "Beta Corp",
    status: "active",
    health: "reachable",
    cpuUsed: "0.08",
    cpuQuota: "6",
    ramUsed: "0.17",
    ramQuota: "12",
    readyUrl: "https://beta.lab.7sg.ai",
    workspaceHref: "https://beta.lab.7sg.ai",
    adminEmail: "admin@beta.test",
    cost7d: "$2.10 · 7d",
  },
];

export const MOCK_OVERVIEW_METRICS: MetricCard[] = [
  {
    id: "tenants",
    label: "Active tenants",
    value: "2",
    hint: "4 live tenant records",
    href: "/tenants",
  },
  {
    id: "services",
    label: "Service availability",
    value: "17/17",
    hint: "Ingress and direct health probes",
    href: "/operations",
  },
  {
    id: "allocation",
    label: "Infrastructure allocation",
    value: "$3.00",
    hint: "OpenCost · 7d window",
    href: "/cost",
  },
  {
    id: "kueue",
    label: "Kueue pending",
    value: "0",
    hint: "Cohort sherpa-fleet",
    href: "/capacity",
  },
  {
    id: "recovery",
    label: "Recovery",
    value: "0 failed",
    hint: "0 completed backups",
    href: "/backups",
  },
  {
    id: "models",
    label: "Model inventory",
    value: "—",
    hint: "Reported workloads",
    href: "/models",
  },
];

export const MOCK_SECURITY_FINDINGS_COUNT = 44;

export const MOCK_CAPACITY_HIGHLIGHTS: CapacityHighlight[] = [
  {
    id: "cpu-headroom",
    label: "CPU headroom",
    value: "10 vCPU",
    hint: "6 / 16 reserved",
    icon: "cpu",
  },
  {
    id: "memory-headroom",
    label: "Memory headroom",
    value: "50.56 GiB",
    hint: "12 / 62.56 GiB reserved",
    icon: "memory",
  },
  {
    id: "cpu-pool",
    label: "CPU pool",
    value: "4 Ready nodes",
    hint: "20% safety reserve",
    icon: "pool",
  },
  {
    id: "plans",
    label: "Plan availability",
    value: "3/3 plans",
    hint: "Validated against live floors",
    icon: "plans",
  },
];

export const MOCK_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: "security-44",
    title: "44 security findings need attention",
    detail:
      "sherpa-require-requests-limits / autogen-require-cpu-mem-requests-limits",
    href: "/security",
  },
];

export const MOCK_CAPACITY_POOL: CapacityPool = {
  cpuReserved: "6",
  cpuSchedulable: "16",
  cpuPercent: 38,
  memoryReserved: "12",
  memorySchedulable: "62.56",
  memoryPercent: 19,
  rawAllocatable: "20 vCPU / 78.2 GiB",
  readyNodes: "4 Ready CPU-only nodes",
  safetyReserve: "20% safety reserve",
};

export const MOCK_CAPACITY_PLANS: CapacityPlan[] = [
  {
    id: "starter",
    name: "starter",
    floor: "2 vCPU / 4 GiB",
    cap: "4 vCPU / 8 GiB",
    available: true,
  },
  {
    id: "standard",
    name: "standard",
    floor: "4 vCPU / 8 GiB",
    cap: "8 vCPU / 16 GiB",
    available: true,
  },
  {
    id: "large",
    name: "large",
    floor: "6 vCPU / 12 GiB",
    cap: "12 vCPU / 24 GiB",
    available: true,
  },
];

export const MOCK_TENANT_LIMITS: TenantLimitRow[] = [
  {
    slug: "acme",
    displayName: "Acme Inc",
    cpu: "0.08 / 6 vCPU",
    memory: "0.17 / 12 GiB",
    kueueFloor: "2 vCPU / 4 GiB",
  },
  {
    slug: "beta",
    displayName: "Beta Corp",
    cpu: "0.08 / 6 vCPU",
    memory: "0.17 / 12 GiB",
    kueueFloor: "2 vCPU / 4 GiB",
  },
];

export const MOCK_COST_TENANTS: CostTenantRow[] = [
  {
    slug: "acme",
    displayName: "Acme Inc",
    allocation7d: "$0.41",
    cpuQuota: "6 vCPU",
    memoryQuota: "12 GiB",
    pods: "3",
  },
  {
    slug: "beta",
    displayName: "Beta Corp",
    allocation7d: "$2.10",
    cpuQuota: "6 vCPU",
    memoryQuota: "12 GiB",
    pods: "5",
  },
];

export const MOCK_SECURITY_FINDINGS: SecurityFinding[] = [
  {
    id: "f1",
    control: "sherpa-require-requests-limits",
    detail: "autogen-require-cpu-mem-requests-limits",
    severity: "high",
  },
  {
    id: "f2",
    control: "sherpa-require-requests-limits",
    detail: "autogen-require-cpu-mem-requests-limits",
    severity: "high",
  },
];
