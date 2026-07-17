import { useMemo, useState, useSyncExternalStore } from "react";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSignups, subscribeSignups } from "@/data/signupStore";
import { SignupsTable } from "@/pages/OwnerConsole/components/SignupsTable";

export function SignupsPage() {
  const signups = useSyncExternalStore(subscribeSignups, getSignups, getSignups);
  const [query, setQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");

  const pending = useMemo(
    () => signups.filter((item) => item.status === "pending_review"),
    [signups],
  );

  const plans = useMemo(() => {
    const unique = new Set(pending.map((item) => item.plan));
    return [...unique].sort();
  }, [pending]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return pending.filter((item) => {
      if (planFilter !== "all" && item.plan !== planFilter) {
        return false;
      }
      if (!normalized) {
        return true;
      }
      return [
        item.orgName,
        item.slug,
        item.adminEmail,
        item.plan,
        item.region,
        item.gpuClass,
      ].some((value) => value.toLowerCase().includes(normalized));
    });
  }, [pending, planFilter, query]);

  return (
    <PageContainer
      eyebrow="Tenant onboarding"
      title="Signup review"
      description="Review verified organization requests before tenant provisioning begins."
      fullWidth
    >
      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Pending review
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Only fields required for the provisioning decision are shown.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 px-0 pb-0">
          <div
            className="flex flex-wrap items-end gap-3"
            role="search"
            aria-label="Filter signup requests"
          >
            <div className="min-w-[220px] flex-1">
              <label className="sr-only" htmlFor="signup-search">
                Search signup requests
              </label>
              <Input
                id="signup-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search organization, slug, plan, or region"
                aria-label="Search signup requests"
              />
            </div>
            <label className="flex flex-col gap-1 text-xs text-app-text-muted">
              Plan
              <select
                value={planFilter}
                onChange={(event) => setPlanFilter(event.target.value)}
                aria-label="Plan"
                className="h-9 min-w-[10rem] rounded-md border border-app-border bg-app-surface px-3 text-sm text-app-text"
              >
                <option value="all">All plans</option>
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {pending.length === 0 ? (
            <div className="rounded-lg border border-dashed border-app-border px-6 py-16 text-center">
              <p className="text-base font-semibold text-app-text">
                No signups need review
              </p>
              <p className="mt-1 text-sm text-app-text-muted">
                New verified requests will appear here.
              </p>
            </div>
          ) : null}

          {pending.length > 0 && filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-app-border px-6 py-16 text-center">
              <p className="text-base font-semibold text-app-text">
                No matching signups
              </p>
              <p className="mt-1 text-sm text-app-text-muted">
                Clear or adjust the current filters.
              </p>
            </div>
          ) : null}

          {filtered.length > 0 ? (
            <>
              <p className="text-sm text-app-text-muted" aria-live="polite">
                {`Showing ${filtered.length} of ${pending.length} pending request${pending.length === 1 ? "" : "s"}`}
              </p>
              <SignupsTable signups={filtered} />
            </>
          ) : null}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
