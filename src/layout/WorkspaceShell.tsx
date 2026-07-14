import { Outlet, useParams } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/layout/components/Logo";
import { SidebarNavButton } from "@/layout/components/SidebarNavButton";
import { SidebarUserMenu } from "@/layout/components/SidebarUserMenu";
import { getWorkspacePortal } from "@/data/workspacePortal";

export function WorkspaceShell() {
  const { slug = "" } = useParams<{ slug: string }>();
  const portal = getWorkspacePortal(slug);
  const email = portal?.tenant.adminEmail ?? "admin@workspace.test";
  const workspaceLabel = portal
    ? `${portal.tenant.displayName} · ${portal.tenant.slug}`
    : slug || "workspace";

  const handleSignOut = () => {
    toast.message("Sign out is not wired yet", {
      description: "Login page deferred — auth is mock-only.",
    });
  };

  return (
    <div className="flex h-screen bg-app-bg text-app-text">
      <aside className="flex w-20 flex-col border-r border-app-border bg-app-bg md:w-72">
        <Logo />
        <nav className="flex-1 overflow-y-auto">
          <div className="space-y-2 p-4 md:p-6">
            <p className="hidden px-3 text-[11px] font-semibold tracking-wide text-app-text-muted uppercase md:block">
              Workspace
            </p>
            <SidebarNavButton
              item={{
                icon: LayoutDashboard,
                label: "General",
                path: `/workspace/${slug}`,
              }}
            />
            <SidebarNavButton
              item={{
                icon: Users,
                label: "Team & SSO",
                path: `/workspace/${slug}/team`,
              }}
            />
          </div>
        </nav>
        <SidebarUserMenu
          email={email}
          workspaceLabel={workspaceLabel}
          onSignOut={handleSignOut}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
