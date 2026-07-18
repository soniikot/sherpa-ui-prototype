import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  sourceMeta,
  sourceStyles,
} from "@/components/notifications/sourceMeta";
import type { MockNotification } from "@/components/notifications/types";
import { getSignups, subscribeSignups } from "@/data/signupStore";
import { cn } from "@/lib/utils";

const STATIC_NOTIFICATIONS: MockNotification[] = [
  {
    id: "security-posture",
    title: "44 security findings need attention",
    description: "Kyverno posture · Policies",
    source: "policy",
    level: "warning",
    href: "/policies",
    createdAtLabel: "Just now",
    isRead: false,
  },
  {
    id: "firing-alerts",
    title: "3 critical alerts are firing",
    description: "Alertmanager · Alerting",
    source: "alerting",
    level: "critical",
    href: "/alerting",
    createdAtLabel: "12m ago",
    isRead: false,
  },
];

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const signups = useSyncExternalStore(subscribeSignups, getSignups, getSignups);

  const pendingSignups = signups.filter(
    (item) => item.status === "pending_review",
  );

  const notifications: MockNotification[] = [
    ...(pendingSignups.length > 0
      ? [
          {
            id: "signup-queue",
            title: `${pendingSignups.length} signup request${pendingSignups.length === 1 ? "" : "s"} need review`,
            description: pendingSignups
              .slice(0, 3)
              .map((item) => item.orgName)
              .join(", "),
            source: "tenant" as const,
            level: "info" as const,
            href: "/tenants",
            createdAtLabel: "Pending",
            isRead: false,
          },
        ]
      : []),
    ...STATIC_NOTIFICATIONS,
  ];

  const unreadCount = notifications.reduce(
    (count, notification) => (notification.isRead ? count : count + 1),
    0,
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="relative border-app-border text-app-text-muted hover:bg-app-hover hover:text-app-text"
        aria-label="Open notification center"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-600 px-1.5 py-0.5 text-[10px] leading-none font-semibold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label="Notification center"
          className="absolute top-full right-0 z-50 mt-2 w-[320px] overflow-hidden rounded-lg border border-app-border bg-app-bg shadow-lg sm:w-[420px]"
        >
          <div className="border-b border-app-border p-4">
            <div className="truncate text-base font-semibold text-app-text">
              Notifications
            </div>
            <div className="text-xs text-app-text-muted">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </div>
          </div>
          {notifications.length === 0 ? (
            <div className="p-6 text-sm text-app-text-muted">
              No notifications yet.
            </div>
          ) : (
            <ul className="max-h-[420px] space-y-2 overflow-y-auto p-3">
              {notifications.map((notification) => {
                const category = sourceStyles(notification.source);
                const source = sourceMeta(notification.source);
                const SourceIcon = source.Icon;

                return (
                  <li key={notification.id}>
                    <Link
                      to={notification.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-3 transition-colors hover:bg-app-hover/40",
                        category.card,
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1.5 size-2.5 shrink-0 rounded-full",
                          category.dot,
                        )}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-app-text">
                            {notification.title}
                          </p>
                          <Badge
                            variant="outline"
                            className="gap-1 border-app-border bg-app-surface/60 text-[10px] font-medium tracking-wide text-app-text-muted uppercase"
                          >
                            <SourceIcon className="size-3" aria-hidden />
                            {source.label}
                          </Badge>
                        </div>
                        {notification.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-app-text-muted">
                            {notification.description}
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-app-text-muted">
                          {notification.createdAtLabel}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="border-t border-app-border px-4 py-3">
            <Link
              to="/#owner-inbox"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-app-accent hover:underline"
            >
              Open notification center
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
