import type { SignupRequest } from "@/data/signupTypes";

export type SignupDecision = "approve" | "reject";

export interface SignupDecisionDialogProps {
  open: boolean;
  decision: SignupDecision | null;
  signup: SignupRequest;
  onClose: () => void;
  onConfirm: (input: {
    decision: SignupDecision;
    reason: string;
    internalNote: string;
  }) => void;
}
