import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/themeToggle/ThemeToggle";
import { AskSherpaButton } from "@/components/askSherpaButton/AskSherpaButton";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import type { PageContainerProps } from "@/components/PageContainer/types";

export function PageContainer({
  title,
  description,
  children,
  fullWidth = false,
  headerActions,
  eyebrow,
}: PageContainerProps) {
  const widthClassName = fullWidth ? "" : "max-w-7xl";

  const handleAskSherpa = () => {
    toast.message("Ask Sherpa is not wired yet", {
      description: "AI assistant deferred in this prototype.",
    });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto" data-scroll-container="page">
        <div
          className={cn("mx-auto w-full px-8 pt-10 sm:px-12", widthClassName)}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="order-2 min-w-0 sm:order-1">
              {eyebrow ? (
                <p className="mb-2 text-[11px] font-semibold tracking-wide text-app-text-muted uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="text-3xl font-extrabold tracking-tight text-app-text">
                {title}
              </h1>
              <p className="mt-1 text-sm text-app-text-muted">{description}</p>
            </div>
            <div className="order-1 flex w-full flex-wrap items-center justify-end gap-2 sm:order-2 sm:w-auto sm:shrink-0">
              {headerActions}
              <ThemeToggle className="h-9 px-3 text-sm" />
              <AskSherpaButton
                onClick={handleAskSherpa}
                className="h-9 px-3 text-sm"
              />
              <NotificationCenter />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mx-auto w-full px-8 pt-6 pb-8 sm:px-12",
            widthClassName,
          )}
        >
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
