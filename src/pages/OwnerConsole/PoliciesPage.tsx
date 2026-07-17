import { useState } from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MOCK_POLICY_FINDINGS,
  MOCK_POLICY_NAMES,
  MOCK_POLICY_SUMMARY,
} from "@/data/mockData";
import type { PolicyResult } from "@/data/types";
import { cn } from "@/lib/utils";

const RESULT_FILTERS: Array<{ value: "all" | PolicyResult; label: string }> = [
  { value: "all", label: "All" },
  { value: "fail", label: "Fail" },
  { value: "warn", label: "Warn" },
  { value: "error", label: "Error" },
  { value: "pass", label: "Pass-only policies" },
];

function resultBadgeClass(result: PolicyResult) {
  if (result === "fail" || result === "error") {
    return "border-app-danger/50 text-app-danger";
  }
  if (result === "warn") {
    return "border-amber-500/50 text-amber-700 dark:text-amber-400";
  }
  return "border-app-success/50 text-app-success";
}

export function PoliciesPage() {
  const summary = MOCK_POLICY_SUMMARY;
  const [query, setQuery] = useState("");
  const [resultFilter, setResultFilter] = useState<"all" | PolicyResult>("all");

  const normalized = query.trim().toLowerCase();
  const findings = MOCK_POLICY_FINDINGS.filter((finding) => {
    if (resultFilter !== "all" && finding.result !== resultFilter) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    return (
      finding.policy.includes(normalized) ||
      finding.rule.includes(normalized) ||
      finding.namespace.includes(normalized) ||
      finding.resource.toLowerCase().includes(normalized)
    );
  });

  const totals = [
    {
      label: "Pass",
      value: summary.pass,
      hint: "PolicyReport pass results",
      accent: "border-t-app-success",
    },
    {
      label: "Fail",
      value: summary.fail,
      hint: "Failed results",
      accent: "border-t-app-danger",
    },
    {
      label: "Warn",
      value: summary.warn,
      hint: "Audit / warn results",
      accent: "border-t-app-border",
    },
    {
      label: "Error",
      value: summary.error,
      hint: "Evaluation errors",
      accent: "border-t-app-danger",
    },
    {
      label: "Skip",
      value: summary.skip,
      hint: "Skipped results",
      accent: "border-t-app-border",
    },
    {
      label: "Policies",
      value: summary.policies,
      hint: `${summary.reports} reports · ${summary.findings} findings`,
      accent: "border-t-app-border",
    },
  ];

  return (
    <PageContainer
      eyebrow="Admission control"
      title="Policies"
      description="Live Kyverno PolicyReport pass/fail posture across namespaces and cluster reports."
      fullWidth
      headerActions={
        <div className="mr-1 flex flex-wrap items-center gap-3">
          <Link
            to="/alerting"
            className="text-sm font-medium text-app-accent hover:underline"
          >
            Configure notifications
          </Link>
          <Link
            to="/siem"
            className="text-sm font-medium text-app-accent hover:underline"
          >
            SIEM
          </Link>
        </div>
      }
    >
      <section
        aria-label="Kyverno policy totals"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {totals.map((item) => (
          <Card
            key={item.label}
            className={cn(
              "dark-card border-app-border/80 border-t-4 shadow-none",
              item.accent,
            )}
          >
            <CardContent className="px-0 py-0">
              <p className="text-xs text-app-text-muted">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-app-text">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-app-text-muted">{item.hint}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-app-text-muted">Search</span>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Policy, rule, namespace, resource, reason…"
          />
        </label>
        <label className="flex w-full flex-col gap-1.5 sm:w-56">
          <span className="text-xs font-medium text-app-text-muted">Result</span>
          <select
            value={resultFilter}
            onChange={(event) =>
              setResultFilter(event.target.value as "all" | PolicyResult)
            }
            className="h-9 rounded-md border border-app-border bg-app-bg px-3 text-sm text-app-text"
          >
            {RESULT_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-semibold text-app-text">
              Policies
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              {MOCK_POLICY_NAMES.length} of {summary.policies} policies
            </p>
          </CardHeader>
          <CardContent className="space-y-2 px-0 pb-0">
            {MOCK_POLICY_NAMES.map((name) => (
              <div
                key={name}
                className="rounded-lg border border-app-border px-3 py-2 font-mono text-xs text-app-text"
              >
                {name}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0">
            <div>
              <CardTitle className="text-lg font-semibold text-app-text">
                Findings
              </CardTitle>
              <p className="mt-1 text-sm text-app-text-muted">
                {findings.length} fail/warn/error findings in view
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" disabled>
              Details
            </Button>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto rounded-lg border border-app-border">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                    <th className="px-3 py-2 font-medium">Result</th>
                    <th className="px-3 py-2 font-medium">Policy / rule</th>
                    <th className="px-3 py-2 font-medium">Resource</th>
                  </tr>
                </thead>
                <tbody>
                  {findings.map((finding) => (
                    <tr
                      key={finding.id}
                      className="border-b border-app-border/70 last:border-b-0"
                    >
                      <td className="px-3 py-3">
                        <Badge
                          variant="outline"
                          className={resultBadgeClass(finding.result)}
                        >
                          {finding.result}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-app-text">
                        <div>{finding.policy}</div>
                        <div className="text-app-text-muted">{finding.rule}</div>
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-app-text-muted">
                        <div>{finding.namespace}</div>
                        <div>{finding.resource}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
