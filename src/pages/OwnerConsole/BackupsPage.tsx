import { PageContainer } from "@/components/PageContainer/PageContainer";
import { MOCK_BACKUP_STATUS } from "@/data/mockData";
import { BackupsSection } from "@/pages/PlatformAdmin/components/BackupsSection";

export function BackupsPage() {
  return (
    <PageContainer
      eyebrow="Recovery"
      title="Backups & DR"
      description="Velero status only — no backup UI. Schedules are on-demand."
      fullWidth
    >
      <BackupsSection status={MOCK_BACKUP_STATUS} />
    </PageContainer>
  );
}
