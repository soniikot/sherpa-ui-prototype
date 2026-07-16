import type { ElementType } from "react";
import {
  Activity,
  Bot,
  DatabaseBackup,
  Gauge,
  LayoutDashboard,
  Shield,
  Users,
  Wallet,
} from "lucide-react";

export interface NavItem {
  icon: ElementType;
  label: string;
  path: string;
  disabled?: boolean;
  badgeText?: string;
}

/** Matches Sherpa Canvas Owner Console primary nav order. */
export const ownerNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", path: "/" },
  { icon: Users, label: "Tenants", path: "/tenants" },
  { icon: Gauge, label: "Capacity & limits", path: "/capacity" },
  { icon: Bot, label: "AI models", path: "/models" },
  { icon: Wallet, label: "Usage & cost", path: "/cost" },
  { icon: Shield, label: "Security", path: "/security" },
  { icon: Activity, label: "Operations", path: "/operations" },
  { icon: DatabaseBackup, label: "Backups & DR", path: "/backups" },
];
