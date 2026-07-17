import { useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowLeft, Check, Info, ShieldAlert, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getSignup,
  getSignups,
  recordSignupDecision,
  subscribeSignups,
} from "@/data/signupStore";
import { SignupDecisionDialog } from "@/pages/OwnerConsole/components/SignupDecisionDialog";
import type { SignupDecision } from "@/pages/OwnerConsole/components/SignupDecisionDialog.types";
import {
  formatSignupDate,
  formatSignupStatus,
} from "@/pages/OwnerConsole/signups/formatSignupDate";

const CAN_APPROVE = true;

export function SignupDetailPage() {
  useSyncExternalStore(subscribeSignups, getSignups, getSignups);
  const { id = "" } = useParams();
  const signup = getSignup(id);
  const [decision, setDecision] = useState<SignupDecision | null>(null);

  if (!signup) {
    return (
      <PageContainer
        eyebrow="Tenant onboarding"
        title="Review signup"
        description="Validate the requested tenant shape and record an auditable decision."
        fullWidth
        headerActions={
          <Button type="button" variant="outline" className="gap-2" asChild>
            <Link to="/signups">
              <ArrowLeft className="h-4 w-4" />
              Back to queue
            </Link>
          </Button>
        }
      >
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardContent className="px-0 py-10 text-center">
            <p className="text-base font-semibold text-app-text">
              Signup not found
            </p>
            <p className="mt-1 text-sm text-app-text-muted">
              Return to the queue and select another request.
            </p>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  const pending = signup.status === "pending_review";

  return (
    <PageContainer
      eyebrow="Tenant onboarding"
      title="Review signup"
      description="Validate the requested tenant shape and record an auditable decision."
      fullWidth
      headerActions={
        <Button type="button" variant="outline" className="gap-2" asChild>
          <Link to="/signups">
            <ArrowLeft className="h-4 w-4" />
            Back to queue
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-semibold text-app-text">
                  {signup.orgName}
                </CardTitle>
                <p className="mt-1 text-sm text-app-text-muted">
                  Request {signup.id}
                </p>
              </div>
              <Badge variant="outline">
                {formatSignupStatus(signup.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-0 pb-0">
            <dl className="grid gap-4 sm:grid-cols-2">
              <Fact label="Workspace slug">
                <code className="font-mono text-sm">{signup.slug}</code>
              </Fact>
              <Fact label="Administrator email">{signup.adminEmail}</Fact>
              <Fact label="Plan">{signup.plan}</Fact>
              <Fact label="Region">{signup.region}</Fact>
              <Fact label="GPU class">{signup.gpuClass}</Fact>
              <Fact label="Email verification">
                <Badge variant={signup.emailVerified ? "success" : "outline"}>
                  {signup.emailVerified ? "verified" : "unverified"}
                </Badge>
              </Fact>
              <Fact label="Approval progress">
                {signup.approvals} of {signup.requiredApprovals} distinct
                approvers
              </Fact>
              <Fact label="Submitted">{formatSignupDate(signup.createdAt)}</Fact>
              <Fact label="Updated">{formatSignupDate(signup.updatedAt)}</Fact>
              <Fact label="Expires">{formatSignupDate(signup.expiresAt)}</Fact>
              {signup.rejectReason ? (
                <Fact label="Public rejection reason">{signup.rejectReason}</Fact>
              ) : null}
            </dl>
            <p className="text-xs text-app-text-muted">
              This review intentionally excludes passwords, access tokens, and
              secret material.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="dark-card border-app-border/80 shadow-none">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold text-app-text">
                Review signals
              </CardTitle>
              <p className="mt-1 text-sm text-app-text-muted">
                Server-derived duplicate, capacity, and elevated-request
                indicators.
              </p>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <dl className="grid gap-4">
                <Fact label="Same administrator email (30 days)">
                  {signup.reviewSignals.duplicateEmailRequests}
                </Fact>
                <Fact label="Same organization name (30 days)">
                  {signup.reviewSignals.duplicateOrganizationRequests}
                </Fact>
                <Fact label="Slug already reserved">
                  <Badge
                    variant={
                      signup.reviewSignals.slugReserved ? "outline" : "success"
                    }
                    className={
                      signup.reviewSignals.slugReserved
                        ? "border-app-warning/50 text-app-warning"
                        : undefined
                    }
                  >
                    {signup.reviewSignals.slugReserved ? "attention" : "clear"}
                  </Badge>
                </Fact>
                <Fact label="Elevated request">
                  <Badge variant="outline">
                    {signup.reviewSignals.elevatedRequest ? "yes" : "no"}
                  </Badge>
                </Fact>
                <Fact label="Capacity review">
                  <Badge variant="outline">
                    {signup.reviewSignals.requiresCapacityReview
                      ? "required"
                      : "standard"}
                  </Badge>
                </Fact>
              </dl>
            </CardContent>
          </Card>

          <Card className="dark-card border-app-border/80 shadow-none">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold text-app-text">
                Decision
              </CardTitle>
              <p className="mt-1 text-sm text-app-text-muted">
                Decisions are enforced and audited by the signup service.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 px-0 pb-0">
              {CAN_APPROVE && pending ? (
                <>
                  <p className="text-sm text-app-text-muted">
                    Confirm the tenant shape and review signals before recording
                    a reason.
                    {signup.requiredApprovals > 1
                      ? ` This request needs ${signup.requiredApprovals} distinct approvers.`
                      : ""}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      className="gap-2"
                      onClick={() => setDecision("approve")}
                    >
                      <Check className="h-4 w-4" />
                      {signup.requiredApprovals > 1
                        ? `Record approval (${signup.approvals + 1} of ${signup.requiredApprovals})`
                        : "Approve signup"}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      className="gap-2"
                      onClick={() => setDecision("reject")}
                    >
                      <X className="h-4 w-4" />
                      Reject signup
                    </Button>
                  </div>
                </>
              ) : null}

              {CAN_APPROVE && !pending ? (
                <div className="flex gap-3 rounded-lg border border-app-border bg-app-bg/50 px-3 py-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-app-accent" />
                  <div>
                    <p className="text-sm font-medium text-app-text">
                      Decision already recorded
                    </p>
                    <p className="mt-1 text-sm text-app-text-muted">
                      This request is no longer pending review, so mutation
                      controls are unavailable.
                    </p>
                  </div>
                </div>
              ) : null}

              {!CAN_APPROVE ? (
                <div className="flex gap-3 rounded-lg border border-app-border bg-app-bg/50 px-3 py-3">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-app-warning" />
                  <div>
                    <p className="text-sm font-medium text-app-text">
                      Read-only access
                    </p>
                    <p className="mt-1 text-sm text-app-text-muted">
                      The <code className="font-mono text-xs">signup.approve</code>{" "}
                      permission is required to approve or reject requests.
                    </p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>

      <SignupDecisionDialog
        open={decision !== null}
        decision={decision}
        signup={signup}
        onClose={() => setDecision(null)}
        onConfirm={({ decision: nextDecision, reason, internalNote }) => {
          try {
            const updated = recordSignupDecision({
              id: signup.id,
              decision: nextDecision,
              reason,
              internalNote,
            });
            setDecision(null);
            toast.success(
              nextDecision === "approve"
                ? updated?.status === "approved"
                  ? "Signup approved"
                  : "Approval recorded"
                : "Signup rejected",
              {
                description:
                  nextDecision === "reject"
                    ? reason
                    : internalNote || undefined,
              },
            );
          } catch {
            toast.error("Decision was not recorded");
          }
        }}
      />
    </PageContainer>
  );
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="text-[11px] font-semibold tracking-wide text-app-text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-app-text">{children}</dd>
    </div>
  );
}
