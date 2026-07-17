import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { SignupDecisionDialogProps } from "@/pages/OwnerConsole/components/SignupDecisionDialog.types";

export function SignupDecisionDialog({
  open,
  decision,
  signup,
  onClose,
  onConfirm,
}: SignupDecisionDialogProps) {
  const [reason, setReason] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  if (!decision) {
    return null;
  }

  const isApprove = decision === "approve";
  const canSubmit = confirmed && reason.trim().length >= 3;

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      return;
    }
    setReason("");
    setInternalNote("");
    setConfirmed(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-lg"
        aria-labelledby="signup-decision-title"
      >
        <DialogHeader>
          <p className="text-[11px] font-semibold tracking-wide text-app-text-muted uppercase">
            {isApprove ? "Approval" : "Rejection"}
          </p>
          <DialogTitle id="signup-decision-title">
            {isApprove
              ? `Approve ${signup.orgName}`
              : `Reject ${signup.orgName}`}
          </DialogTitle>
          <DialogDescription>
            {isApprove
              ? "Approval allows tenant provisioning to proceed."
              : "The public reason may be shown to the requester. Do not include secrets or internal-only details."}
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSubmit) {
              return;
            }
            onConfirm({
              decision,
              reason: reason.trim(),
              internalNote: internalNote.trim(),
            });
            setReason("");
            setInternalNote("");
            setConfirmed(false);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="signup-decision-reason">
              {isApprove ? "Approval reason" : "Public rejection reason"}
            </Label>
            <textarea
              id="signup-decision-reason"
              rows={4}
              required
              minLength={3}
              autoFocus
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="w-full rounded-md border border-app-border bg-app-bg px-3 py-2 text-sm text-app-text outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            />
            <p className="text-xs text-app-text-muted">
              Required · at least 3 characters
            </p>
          </div>

          {!isApprove ? (
            <div className="space-y-2">
              <Label htmlFor="signup-decision-note">
                Internal note{" "}
                <span className="font-normal text-app-text-muted">
                  (optional)
                </span>
              </Label>
              <textarea
                id="signup-decision-note"
                rows={3}
                value={internalNote}
                onChange={(event) => setInternalNote(event.target.value)}
                className="w-full rounded-md border border-app-border bg-app-bg px-3 py-2 text-sm text-app-text outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              />
              <p className="text-xs text-app-text-muted">
                Visible to operators only; never place credentials or tokens
                here.
              </p>
            </div>
          ) : null}

          <label className="flex items-start gap-3 rounded-lg border border-app-border bg-app-bg/60 px-3 py-3 text-sm text-app-text">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
              className="mt-1"
            />
            <span>
              I confirm this decision for{" "}
              <strong>{signup.orgName}</strong> and workspace{" "}
              <code className="font-mono text-xs">{signup.slug}</code>.
            </span>
          </label>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant={isApprove ? "default" : "destructive"}
              disabled={!canSubmit}
            >
              {isApprove ? "Confirm approval" : "Confirm rejection"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
