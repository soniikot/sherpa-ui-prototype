import { LogOut, User } from "lucide-react";
import type { SidebarUserMenuProps } from "@/layout/components/SidebarUserMenu.types";

export function SidebarUserMenu({
  email,
  workspaceLabel,
  onSignOut,
}: SidebarUserMenuProps) {
  return (
    <div className="border-t border-app-border p-4 md:p-6">
      <div className="rounded-xl border border-app-border bg-app-surface p-3 md:p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-app-text">{email}</p>
            <p className="truncate text-xs text-app-text-muted" title={workspaceLabel}>
              {workspaceLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-app-text-muted transition-colors hover:bg-app-danger/10 hover:text-app-danger"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
