import type { StackedResourceBarProps } from "@/pages/OwnerConsole/components/capacity/StackedResourceBar.types";

function formatAmount(value: number, unit: string) {
  const rounded = Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
  return `${rounded} ${unit}`;
}

export function StackedResourceBar({
  label,
  totalLabel,
  allocated,
  available,
  reserve,
  unit,
}: StackedResourceBarProps) {
  const total = allocated + available + reserve;
  const allocatedPct = (allocated / total) * 100;
  const availablePct = (available / total) * 100;
  const reservePct = (reserve / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-app-text">{label}</span>
        <span className="text-app-text-muted">{totalLabel}</span>
      </div>
      <div className="flex h-3 overflow-hidden rounded-full bg-app-border/60">
        <div
          className="bg-app-running"
          style={{ width: `${allocatedPct}%` }}
          title={`Allocated ${formatAmount(allocated, unit)}`}
        />
        <div
          className="bg-app-success"
          style={{ width: `${availablePct}%` }}
          title={`Available ${formatAmount(available, unit)}`}
        />
        <div
          className="bg-app-warning"
          style={{ width: `${reservePct}%` }}
          title={`Safety reserve ${formatAmount(reserve, unit)}`}
        />
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-app-text-muted">
        <li className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-app-running" />
          Allocated {formatAmount(allocated, unit)}
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-app-success" />
          Available {formatAmount(available, unit)}
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-app-warning" />
          Safety reserve {formatAmount(reserve, unit)}
        </li>
      </ul>
    </div>
  );
}
