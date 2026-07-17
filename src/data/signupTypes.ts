export type SignupStatus =
  | "pending_review"
  | "approved"
  | "rejected"
  | "expired";

export interface SignupReviewSignals {
  duplicateEmailRequests: number;
  duplicateOrganizationRequests: number;
  slugReserved: boolean;
  elevatedRequest: boolean;
  requiresCapacityReview: boolean;
}

export interface SignupRequest {
  id: string;
  status: SignupStatus;
  orgName: string;
  slug: string;
  adminEmail: string;
  plan: string;
  region: string;
  gpuClass: string;
  requiredApprovals: number;
  approvals: number;
  revision: number;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  emailVerified: boolean;
  rejectReason: string | null;
  reviewSignals: SignupReviewSignals;
}
