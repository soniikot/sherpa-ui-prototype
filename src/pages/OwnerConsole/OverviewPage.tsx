import { useMemo, useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import {
  MOCK_ATTENTION_ITEMS,
  MOCK_CAPACITY_PLANS,
  MOCK_CAPACITY_POOL,
  MOCK_CLUSTER_LABEL,
  MOCK_OVERVIEW_METRICS,
  MOCK_SECURITY_FINDINGS_COUNT,
  MOCK_SUMMARY_STATUS,
} from "@/data/mockData";
import { getSignups, subscribeSignups } from "@/data/signupStore";
import type { AttentionItem } from "@/data/types";
import { OverviewBriefing } from "@/pages/OwnerConsole/components/OverviewBriefing";

function buildEyebrow() {
  const day = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
  return `${day} · ${MOCK_CLUSTER_LABEL}`;
}

export function OverviewPage() {
  const navigate = useNavigate();
  const signups = useSyncExternalStore(subscribeSignups, getSignups, getSignups);
  const [acknowledged, setAcknowledged] = useState(false);

  const attentionItems = useMemo(() => {
    const pendingSignups = signups.filter(
      (item) => item.status === "pending_review",
    );
    const items: AttentionItem[] = [...MOCK_ATTENTION_ITEMS];

    if (pendingSignups.length > 0) {
      items.unshift({
        id: "signup-queue",
        level: "warning",
        title: `${pendingSignups.length} signup request${pendingSignups.length === 1 ? "" : "s"} need review`,
        detail: pendingSignups
          .slice(0, 3)
          .map((item) => `${item.orgName} (${item.slug})`)
          .join(", "),
        meta: "Signup review · pending queue",
        action: "Review",
        href: "/signups",
      });
    }

    return items;
  }, [signups]);

  const selectablePlans = MOCK_CAPACITY_PLANS.filter(
    (plan) => plan.available,
  ).length;

  return (
    <PageContainer
      eyebrow={buildEyebrow()}
      title="Platform command center"
      description="Current operating posture across tenant lifecycle, services, allocation, recovery, and security."
      fullWidth
      showAskSherpa={false}
    >
      <OverviewBriefing
        metrics={MOCK_OVERVIEW_METRICS}
        attentionItems={attentionItems}
        healthyServices={17}
        totalServices={17}
        capacityPool={MOCK_CAPACITY_POOL}
        planAvailability={`${selectablePlans}/${MOCK_CAPACITY_PLANS.length}`}
        summaryStatus={MOCK_SUMMARY_STATUS}
        kueuePending={0}
        securityFindingsCount={MOCK_SECURITY_FINDINGS_COUNT}
        acknowledged={acknowledged}
        onToggleAcknowledge={() => setAcknowledged((current) => !current)}
        onProvisionWorkspace={() => navigate("/tenants?create=1")}
      />
    </PageContainer>
  );
}
