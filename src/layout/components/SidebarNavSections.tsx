import { SidebarNavButton } from "@/layout/components/SidebarNavButton";
import { ownerNavItems } from "@/nav/navItems";

export function SidebarNavSections() {
  return (
    <div className="space-y-2 p-4 md:p-6">
      {ownerNavItems.map((item) => (
        <SidebarNavButton key={item.label} item={item} />
      ))}
    </div>
  );
}
