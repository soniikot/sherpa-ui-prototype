import { SidebarNavButton } from "@/layout/components/SidebarNavButton";
import { lifecycleNavItems, opsNavItems } from "@/nav/navItems";

export function SidebarNavSections() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="space-y-2">
        <p className="px-3 text-[11px] font-semibold tracking-wide text-app-text-muted uppercase">
          Ops plane
        </p>
        {opsNavItems.map((item) => (
          <SidebarNavButton key={item.path} item={item} />
        ))}
      </div>

      <div className="border-t border-app-border" />

      <div className="space-y-2">
        <p className="px-3 text-[11px] font-semibold tracking-wide text-app-text-muted uppercase">
          Tenant lifecycle
        </p>
        {lifecycleNavItems.map((item) => (
          <SidebarNavButton key={item.path} item={item} />
        ))}
      </div>
    </div>
  );
}
