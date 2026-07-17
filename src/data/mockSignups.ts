import type { SignupRequest } from "@/data/signupTypes";

const now = Date.now();

function hoursAgo(hours: number) {
  return new Date(now - hours * 60 * 60 * 1000).toISOString();
}

function daysFromNow(days: number) {
  return new Date(now + days * 24 * 60 * 60 * 1000).toISOString();
}

export const MOCK_SIGNUPS: SignupRequest[] = [
  {
    id: "req_7sg_northwind",
    status: "pending_review",
    orgName: "Northwind Analytics",
    slug: "northwind",
    adminEmail: "ops@northwind.example",
    plan: "medium",
    region: "dc-01",
    gpuClass: "none",
    requiredApprovals: 1,
    approvals: 0,
    revision: 1,
    createdAt: hoursAgo(18),
    updatedAt: hoursAgo(2),
    expiresAt: daysFromNow(5),
    emailVerified: true,
    rejectReason: null,
    reviewSignals: {
      duplicateEmailRequests: 0,
      duplicateOrganizationRequests: 0,
      slugReserved: false,
      elevatedRequest: false,
      requiresCapacityReview: false,
    },
  },
  {
    id: "req_7sg_helix",
    status: "pending_review",
    orgName: "Helix Robotics",
    slug: "helix",
    adminEmail: "admin@helix.example",
    plan: "large",
    region: "dc-01",
    gpuClass: "a10",
    requiredApprovals: 2,
    approvals: 1,
    revision: 2,
    createdAt: hoursAgo(40),
    updatedAt: hoursAgo(6),
    expiresAt: daysFromNow(3),
    emailVerified: true,
    rejectReason: null,
    reviewSignals: {
      duplicateEmailRequests: 1,
      duplicateOrganizationRequests: 0,
      slugReserved: false,
      elevatedRequest: true,
      requiresCapacityReview: true,
    },
  },
  {
    id: "req_7sg_orbit",
    status: "pending_review",
    orgName: "Orbit Labs",
    slug: "orbit",
    adminEmail: "founder@orbit.example",
    plan: "small",
    region: "dc-01",
    gpuClass: "none",
    requiredApprovals: 1,
    approvals: 0,
    revision: 1,
    createdAt: hoursAgo(8),
    updatedAt: hoursAgo(8),
    expiresAt: daysFromNow(6),
    emailVerified: true,
    rejectReason: null,
    reviewSignals: {
      duplicateEmailRequests: 0,
      duplicateOrganizationRequests: 2,
      slugReserved: true,
      elevatedRequest: false,
      requiresCapacityReview: false,
    },
  },
];
