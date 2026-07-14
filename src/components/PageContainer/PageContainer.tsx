import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/themeToggle/ThemeToggle";
import type { PageContainerProps } from "@/components/PageContainer/types";

export function PageContainer({
  title,
  description,
  children,
  fullWidth = false,
  headerActions,
}: PageContainerProps) {
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const widthClassName = fullWidth ? "" : "max-w-7xl";

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto" data-scroll-container="page">
        <div
          className={cn("mx-auto w-full px-8 pt-10 sm:px-12", widthClassName)}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-app-text">
                {capitalizedTitle}
              </h1>
              <p className="mt-1 text-sm text-app-text-muted">{description}</p>
            </div>
            <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:shrink-0">
              {headerActions}
              <ThemeToggle className="h-9 px-3 text-sm" />
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
