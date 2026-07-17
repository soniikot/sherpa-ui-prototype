import { MOCK_SIGNUPS } from "@/data/mockSignups";
import type { SignupRequest, SignupStatus } from "@/data/signupTypes";

let signups: SignupRequest[] = MOCK_SIGNUPS.map((item) => ({
  ...item,
  reviewSignals: { ...item.reviewSignals },
}));

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function getSignups() {
  return signups;
}

export function getSignup(id: string) {
  return signups.find((item) => item.id === id) ?? null;
}

export function subscribeSignups(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function recordSignupDecision(input: {
  id: string;
  decision: "approve" | "reject";
  reason: string;
  internalNote?: string;
}) {
  const current = getSignup(input.id);
  if (!current || current.status !== "pending_review") {
    throw new Error("Signup is not pending review");
  }

  const updatedAt = new Date().toISOString();

  if (input.decision === "reject") {
    signups = signups.map((item) => {
      if (item.id !== input.id) {
        return item;
      }
      return {
        ...item,
        status: "rejected" satisfies SignupStatus,
        rejectReason: input.reason,
        updatedAt,
        revision: item.revision + 1,
      };
    });
    emit();
    return getSignup(input.id);
  }

  const nextApprovals = current.approvals + 1;
  const approved = nextApprovals >= current.requiredApprovals;

  signups = signups.map((item) => {
    if (item.id !== input.id) {
      return item;
    }
    return {
      ...item,
      approvals: nextApprovals,
      status: approved ? ("approved" satisfies SignupStatus) : item.status,
      updatedAt,
      revision: item.revision + 1,
    };
  });
  emit();
  return getSignup(input.id);
}
