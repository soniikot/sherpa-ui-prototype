import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { NavItem } from "@/nav/navItems";
import { cn } from "@/lib/utils";

interface SidebarNavButtonProps {
  item: NavItem;
}

export function SidebarNavButton({ item }: SidebarNavButtonProps) {
  const location = useLocation();
  const isDisabled = Boolean(item.disabled);
  const active = !isDisabled && location.pathname === item.path;

  return (
    <Link
      to={isDisabled ? "#" : item.path}
      onClick={(event) => {
        if (isDisabled) {
          event.preventDefault();
        }
      }}
      aria-label={
        isDisabled ? `${item.label} (coming soon)` : `Navigate to ${item.label}`
      }
      aria-current={active ? "page" : undefined}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      className={cn(
        "dark-nav-item w-full text-left",
        isDisabled && "cursor-not-allowed opacity-60",
        active && "dark-nav-item-active",
      )}
    >
      <item.icon className="h-5 w-5 shrink-0" />
      <span className="flex items-center gap-2 text-sm">
        <span>{item.label}</span>
        {item.badgeText ? (
          <Badge className="h-auto bg-slate-600 px-2 py-0.5 text-[10px] leading-tight text-white">
            {item.badgeText}
          </Badge>
        ) : null}
      </span>
    </Link>
  );
}
