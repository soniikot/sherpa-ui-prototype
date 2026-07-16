import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PLATFORM_SERVICES } from "@/data/mockData";
import { PlatformServicesSection } from "@/pages/PlatformAdmin/components/PlatformServicesSection";

export function OperationsPage() {
  return (
    <PageContainer
      eyebrow="Live platform"
      title="Operations"
      description="Service launch points, current reachability, and owner activity."
      fullWidth
    >
      <PlatformServicesSection services={MOCK_PLATFORM_SERVICES} />

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Owner activity
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Read-only events from GET /v1/activity.
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="rounded-xl border border-dashed border-app-border px-4 py-10 text-center">
            <p className="text-sm font-medium text-app-text">
              No activity returned
            </p>
            <p className="mt-1 text-xs text-app-text-muted">
              The live activity endpoint currently contains no events.
            </p>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
