import { Card, CardContent } from "@/components/ui/card";
import type { CostMetricsProps } from "@/pages/OwnerConsole/components/cost/CostMetrics.types";

export function CostMetrics({ metrics }: CostMetricsProps) {
  return (
    <section
      aria-label="Usage and cost metrics"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {metrics.map((metric) => (
        <Card
          key={metric.id}
          className="dark-card border-app-border/80 shadow-none"
        >
          <CardContent className="px-0 py-0">
            <p className="text-xs text-app-text-muted">{metric.label}</p>
            <p className="mt-2 text-2xl font-bold text-app-text">{metric.value}</p>
            <p className="mt-1 text-xs text-app-text-muted">{metric.hint}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
