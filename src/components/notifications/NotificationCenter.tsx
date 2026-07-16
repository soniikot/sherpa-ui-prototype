import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MockNotification } from "@/components/notifications/types";

const MOCK_NOTIFICATIONS: MockNotification[] = [];

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const unreadCount = MOCK_NOTIFICATIONS.reduce(
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
        {unreadCount > 0 ? (
          <span className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-600 px-1.5 py-0.5 text-[10px] leading-none font-semibold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </Button>

      {open ? (
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
          <div className="p-6 text-sm text-app-text-muted">
            No notifications yet.
          </div>
        </div>
      ) : null}
    </div>
  );
}
