import type { ElementType } from "react";
import {
  DatabaseBackup,
  LayoutGrid,
  PlusCircle,
  Users,
} from "lucide-react";

export interface NavItem {
  icon: ElementType;
  label: string;
  path: string;
  disabled?: boolean;
  badgeText?: string;
}

/** Ops plane — top section (like Sherpa Definitions) */
export const opsNavItems: NavItem[] = [
  { icon: LayoutGrid, label: "Platform services", path: "/#services" },
  { icon: DatabaseBackup, label: "Backups & DR", path: "/#backups" },
];

/** Tenant lifecycle — lower section (like Sherpa main nav) */
export const lifecycleNavItems: NavItem[] = [
  { icon: PlusCircle, label: "Create workspace", path: "/#create" },
  { icon: Users, label: "Tenants", path: "/#tenants" },
];
