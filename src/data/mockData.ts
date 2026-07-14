export interface PlatformService {
  id: string;
  name: string;
  description: string;
  host: string;
  href: string;
  status: "up" | "down";
}

export type TenantStatus = "active" | "suspended" | "provisioning";

export interface Tenant {
  id: string;
  slug: string;
  displayName: string;
  status: TenantStatus;
  phaseLabel: string;
  readyUrl: string | null;
  workspaceHref: string;
  adminEmail: string;
  cost7d: string;
}

export interface BackupStatus {
  controller: string;
  nodeAgent: string;
  completed: number;
  bsl: string;
  summary: string;
  schedulesNote: string;
}

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
    id: "zitadel",
    name: "Zitadel (SSO)",
    description:
      "Identity broker / IdP admin — orgs, users, IdP federation & claims.",
    host: "sso.lab.7sg.ai",
    href: "https://sso.lab.7sg.ai",
    status: "up",
  },
];

export const MOCK_BACKUP_STATUS: BackupStatus = {
  controller: "1/1",
  nodeAgent: "4/4",
  completed: 0,
  bsl: "default Available · default",
  summary: "0 backups · all clean",
  schedulesNote: "No schedules — backups are on-demand.",
};

export const MOCK_TENANTS: Tenant[] = [
  {
    id: "acme",
    slug: "acme",
    displayName: "Acme Corp",
    status: "active",
    phaseLabel: "—",
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
    phaseLabel: "—",
    readyUrl: "https://beta.lab.7sg.ai",
    workspaceHref: "https://beta.lab.7sg.ai",
    adminEmail: "admin@beta.test",
    cost7d: "$2.10 · 7d",
  },
];
