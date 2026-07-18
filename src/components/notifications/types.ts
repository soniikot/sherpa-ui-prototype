import type { AttentionLevel, AttentionSource } from "@/data/types";

export type NotificationSource = AttentionSource;

export interface MockNotification {
  id: string;
  title: string;
  description?: string;
  source: NotificationSource;
  level: AttentionLevel;
  href: string;
  createdAtLabel: string;
  isRead: boolean;
}
