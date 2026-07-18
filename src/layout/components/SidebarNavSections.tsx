import { useSyncExternalStore } from "react";
import { SidebarNavButton } from "@/layout/components/SidebarNavButton";
import { getSignups, subscribeSignups } from "@/data/signupStore";
import { ownerNavItems } from "@/nav/navItems";

export function SidebarNavSections() {
  const signups = useSyncExternalStore(subscribeSignups, getSignups, getSignups);
  const pendingCount = signups.filter(
    (item) => item.status === "pending_review",
  ).length;

  return (
    <div className="space-y-2 p-4 md:p-6">
      {ownerNavItems.map((item) => {
        if (item.path !== "/tenants") {
          return <SidebarNavButton key={item.label} item={item} />;
        }

        return (
          <SidebarNavButton
            key={item.label}
            item={{
              ...item,
              badgeText: pendingCount > 0 ? String(pendingCount) : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
