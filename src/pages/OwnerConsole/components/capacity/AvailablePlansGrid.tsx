import { Cpu, HardDrive, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_CAPACITY_PLANS } from "@/data/mockData";

export function AvailablePlansGrid() {
  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="px-0 pt-0">
        <div>
          <CardTitle className="text-lg font-semibold text-app-text">
            Available plans
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Plan floors and namespace limits validated against current headroom.
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="grid gap-3 md:grid-cols-3">
          {MOCK_CAPACITY_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col rounded-xl border border-app-border bg-app-bg/30 px-4 py-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-app-text">{plan.name}</p>
                {plan.available ? (
                  <Badge variant="success">Available</Badge>
                ) : (
                  <Badge variant="outline">Unavailable</Badge>
                )}
              </div>
              <p className="mt-3 text-xl font-bold text-app-text">{plan.floor}</p>
              <p className="mt-1 text-sm font-medium text-app-success">
                Can onboard {plan.canOnboard} more
              </p>
              <ul className="mt-4 space-y-2 text-xs text-app-text-muted">
                <li className="flex items-center gap-2">
                  <Cpu className="size-3.5 shrink-0" />
                  Requests / namespace:{" "}
                  <span className="font-medium text-app-text">
                    {plan.cpuRequest}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <HardDrive className="size-3.5 shrink-0" />
                  Memory / namespace:{" "}
                  <span className="font-medium text-app-text">
                    {plan.memoryRequest}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="size-3.5 shrink-0" />
                  Pod limit / namespace:{" "}
                  <span className="font-medium text-app-text">
                    {plan.podLimit}
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-xs font-medium text-app-success">
                {plan.fitNote}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
