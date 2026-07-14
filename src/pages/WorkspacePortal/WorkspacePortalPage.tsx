import { Link, useLocation, useParams } from "react-router-dom";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { getWorkspacePortal } from "@/data/workspacePortal";
import { GeneralTab } from "@/pages/WorkspacePortal/components/GeneralTab";
import { TeamSsoTab } from "@/pages/WorkspacePortal/components/TeamSsoTab";

export function WorkspacePortalPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const location = useLocation();
  const portal = getWorkspacePortal(slug);
  const isTeam = location.pathname.endsWith("/team");

  if (!portal) {
    return (
      <PageContainer title="Workspace not found" description="Mock portal" fullWidth>
        <div className="space-y-4">
          <p className="text-sm text-app-text-muted">
            No mock tenant named{" "}
            <code className="font-mono text-app-text">{slug || "(empty)"}</code>.
          </p>
          <Button asChild>
            <Link to="/">Back to admin</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  const { tenant } = portal;
  const title = isTeam
    ? "Team & SSO"
    : `${tenant.displayName} workspace`;
  const description = isTeam
    ? `Manage members and identity providers for ${tenant.displayName}`
    : `Tenant ${tenant.slug} · status ${tenant.status}`;

  return (
    <PageContainer title={title} description={description} fullWidth>
      {isTeam ? (
        <TeamSsoTab
          adminEmail={tenant.adminEmail}
          organizationName={tenant.displayName}
        />
      ) : (
        <GeneralTab portal={portal} />
      )}
    </PageContainer>
  );
}
