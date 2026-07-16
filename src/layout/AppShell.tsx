import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { Logo } from "@/layout/components/Logo";
import { SidebarNavSections } from "@/layout/components/SidebarNavSections";
import { SidebarUserMenu } from "@/layout/components/SidebarUserMenu";
import { MOCK_OPERATOR_EMAIL } from "@/data/mockData";

export function AppShell() {
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
          <SidebarNavSections />
        </nav>
        <SidebarUserMenu
          email={MOCK_OPERATOR_EMAIL}
          workspaceLabel="Platform owner"
          onSignOut={handleSignOut}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
