import type { ElementType } from "react";
import {
  Activity,
  Bell,
  Bot,
  DatabaseBackup,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Radar,
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
  /** When set, active if pathname equals path or starts with matchPrefix. */
  matchPrefix?: string;
}

/** Matches Sherpa Canvas Owner Console primary nav order. */
export const ownerNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", path: "/" },
  {
    icon: Users,
    label: "Tenants",
    path: "/tenants",
    matchPrefix: "/signups",
  },
  { icon: Gauge, label: "Capacity & limits", path: "/capacity" },
  { icon: Bot, label: "AI models", path: "/models" },
  { icon: Wallet, label: "Usage & cost", path: "/cost" },
  {
    icon: Shield,
    label: "Policies",
    path: "/policies",
    badgeText: "44",
  },
  { icon: Radar, label: "SIEM", path: "/siem" },
  {
    icon: Bell,
    label: "Alerting",
    path: "/alerting",
    badgeText: "14",
  },
  { icon: Activity, label: "Operations", path: "/operations" },
  { icon: DatabaseBackup, label: "Backups & DR", path: "/backups" },
  { icon: KeyRound, label: "Platform IAM", path: "/iam" },
];
