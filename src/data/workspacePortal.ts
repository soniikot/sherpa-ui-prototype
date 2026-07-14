import { MOCK_TENANTS, type Tenant } from "@/data/mockData";

export interface WorkspaceServiceLink {
  id: string;
  label: string;
  href: string;
}

export interface WorkspaceResources {
  cpuUsed: number;
  cpuCap: number;
  memoryUsedGiB: number;
  memoryCapGiB: number;
  reservedCpu: number;
  reservedMemoryGiB: number;
  podsUsed: number;
  podsCap: number;
  batchAdmitted: number;
  batchQueued: number;
  runningLabel: string;
}

export interface WorkspacePortal {
  tenant: Tenant;
  appHost: string;
  modelHost: string;
  appDeployed: boolean;
  modelDeployed: boolean;
  internalServices: WorkspaceServiceLink[];
  internalPortalHref: string;
  teamSsoHref: string;
  resources: WorkspaceResources;
}

const DEFAULT_RESOURCES: WorkspaceResources = {
  cpuUsed: 0.34,
  cpuCap: 6,
  memoryUsedGiB: 0.73,
  memoryCapGiB: 12,
  reservedCpu: 2,
  reservedMemoryGiB: 4,
  podsUsed: 8,
  podsCap: 60,
  batchAdmitted: 0,
  batchQueued: 0,
  runningLabel: "0 running",
};

function buildPortal(tenant: Tenant): WorkspacePortal {
  return {
    tenant,
    appHost: `${tenant.slug}.lab.7sg.ai`,
    modelHost: `model-${tenant.slug}.lab.7sg.ai`,
    appDeployed: false,
    modelDeployed: false,
    internalServices: [
      {
        id: "zot",
        label: "zot",
        href: `https://zot.${tenant.slug}.lab.7sg.ai`,
      },
      {
        id: "vault",
        label: "vault",
        href: `https://vault.${tenant.slug}.lab.7sg.ai`,
      },
      {
        id: "langfuse",
        label: "langfuse",
        href: `https://langfuse.${tenant.slug}.lab.7sg.ai`,
      },
    ],
    internalPortalHref: `https://internal.${tenant.slug}.lab.7sg.ai`,
    teamSsoHref: `https://sso.lab.7sg.ai/orgs/${tenant.slug}`,
    resources: DEFAULT_RESOURCES,
  };
}

function synthesizeTenant(slug: string): Tenant {
  return {
    id: slug,
    slug,
    displayName: slug,
    status: "active",
    phaseLabel: "—",
    readyUrl: `https://${slug}.lab.7sg.ai`,
    workspaceHref: `https://${slug}.lab.7sg.ai`,
    adminEmail: `admin@${slug}.test`,
    cost7d: "$0.00 · 7d",
  };
}

/** Resolve portal mock for a slug. Known tenants use rich names; unknown slugs synthesize. */
export function getWorkspacePortal(slug: string): WorkspacePortal | null {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  const tenant =
    MOCK_TENANTS.find((item) => item.slug === normalized) ??
    synthesizeTenant(normalized);
  return buildPortal(tenant);
}
