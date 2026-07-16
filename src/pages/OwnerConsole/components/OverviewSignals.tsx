import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { OverviewSignalsProps } from "@/pages/OwnerConsole/components/OverviewSignals.types";

const DONUT_COLORS = ["#3b82f6", "#38bdf8", "#64748b", "#22c55e"];

function parseDollars(value: string) {
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

function SignalCard({
  to,
  label,
  value,
  hint,
  openLabel,
  children,
}: {
  to: string;
  label: string;
  value: string;
  hint: string;
  openLabel: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className="group block h-full">
      <Card className="dark-card h-full border-app-border/80 shadow-none transition-colors group-hover:border-app-accent/50">
        <CardContent className="flex h-full flex-col px-0 py-0">
          <p className="text-xs text-app-text-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-app-text">
            {value}
          </p>
          <div className="mt-4 flex min-h-[7.5rem] flex-1 items-center">
            {children}
          </div>
          <p className="mt-3 flex items-baseline justify-between gap-2 text-xs text-app-text-muted">
            <span>{hint}</span>
            <span className="shrink-0 font-medium text-app-accent group-hover:underline">
              {openLabel}
            </span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function CostDonut({
  rows,
  total,
}: {
  rows: { name: string; amount: number; label: string }[];
  total: number;
}) {
  const radius = 36;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex w-full items-center gap-4">
      <div className="relative size-24 shrink-0">
        <svg viewBox="0 0 96 96" className="size-24 -rotate-90" aria-hidden>
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-app-border/50"
          />
          {rows.map((row, index) => {
            const share = total > 0 ? row.amount / total : 0;
            const length = share * circumference;
            const circle = (
              <circle
                key={row.name}
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke={DONUT_COLORS[index % DONUT_COLORS.length]}
                strokeWidth={stroke}
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += length;
            return circle;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-app-text">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <ul className="min-w-0 flex-1 space-y-2">
        {rows.map((row, index) => (
          <li key={row.name} className="flex items-center gap-2 text-xs">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor: DONUT_COLORS[index % DONUT_COLORS.length],
              }}
              aria-hidden
            />
            <span className="truncate text-app-text">{row.name}</span>
            <span className="ml-auto shrink-0 font-medium text-app-text">
              {row.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusStrip({ up, total }: { up: number; total: number }) {
  const percent = total === 0 ? 0 : Math.round((up / total) * 100);

  return (
    <div className="w-full">
      <div className="h-2.5 overflow-hidden rounded-full bg-app-border/60">
        <div
          className="h-full rounded-full bg-app-success"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-app-text-muted">{percent}% healthy</p>
    </div>
  );
}

function PodBars({ rows }: { rows: { name: string; pods: number }[] }) {
  const max = Math.max(...rows.map((row) => row.pods), 1);

  return (
    <div className="w-full space-y-3">
      {rows.map((row) => (
        <div key={row.name}>
          <div className="mb-1 flex items-center justify-between gap-2 text-xs">
            <span className="truncate text-app-text">{row.name}</span>
            <span className="shrink-0 font-medium text-app-text">{row.pods}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-app-border/60">
            <div
              className="h-full rounded-full bg-app-accent"
              style={{ width: `${(row.pods / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function OverviewSignals({ costTenants, services }: OverviewSignalsProps) {
  const costRows = costTenants.map((row) => ({
    name: row.displayName,
    amount: parseDollars(row.allocation7d),
    label: row.allocation7d,
  }));
  const costTotal = costRows.reduce((sum, row) => sum + row.amount, 0);
  const servicesUp = services.filter((service) => service.status === "up").length;
  const servicesTotal = services.length;
  const podRows = costTenants.map((row) => ({
    name: row.displayName,
    pods: Number.parseInt(row.pods, 10) || 0,
  }));

  return (
    <section aria-label="Platform signal graphs">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-app-text">Signal graphs</h2>
        <p className="mt-1 text-sm text-app-text-muted">
          Important live signals from tenants, cost, operations, and security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <SignalCard
          to="/cost"
          label="Cost by tenant · 7d"
          value={`$${costTotal.toFixed(2)}`}
          hint="OpenCost allocation"
          openLabel="open Usage & cost"
        >
          <CostDonut rows={costRows} total={costTotal} />
        </SignalCard>

        <SignalCard
          to="/operations"
          label="Service health"
          value={`${servicesUp}/${servicesTotal}`}
          hint="Ingress and direct health probes"
          openLabel="open Operations"
        >
          <StatusStrip up={servicesUp} total={servicesTotal} />
        </SignalCard>

        <SignalCard
          to="/cost"
          label="Pods by tenant"
          value={String(podRows.reduce((sum, row) => sum + row.pods, 0))}
          hint="Live pod count"
          openLabel="open Usage & cost"
        >
          <PodBars rows={podRows} />
        </SignalCard>
      </div>
    </section>
  );
}
