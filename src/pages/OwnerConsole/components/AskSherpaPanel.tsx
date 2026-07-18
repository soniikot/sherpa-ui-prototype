import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AskSherpaPanelProps } from "@/pages/OwnerConsole/components/AskSherpaPanel.types";
import type { AttentionItem } from "@/data/types";

interface AskResult {
  title: string;
  detail: string;
  confidence: string;
  signals: string;
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
}

const PROMPTS = [
  {
    label: "Prioritize my day",
    value: "What should I handle first?",
  },
  {
    label: "Check headroom",
    value: "How much capacity remains for onboarding?",
  },
  {
    label: "Explain cost risk",
    value: "Explain current cost risk",
  },
  {
    label: "Summarize changes",
    value: "What changed since my last sign-in?",
  },
] as const;

function buildResult(
  query: string,
  attention: AttentionItem[],
  healthyServices: number,
  totalServices: number,
): AskResult {
  const normalized = query.toLowerCase();
  const top = attention[0];

  if (normalized.includes("capacity") || normalized.includes("headroom")) {
    return {
      title: "Capacity headroom is available for onboarding",
      detail:
        "Live reservation meters show remaining CPU and memory after the platform safety reserve. Confirm plan floors before approving elevated signup requests.",
      confidence: "High",
      signals: String(Math.max(attention.length, 1)),
      primary: { label: "Open capacity", to: "/capacity" },
      secondary: { label: "Create tenant", to: "/tenants?create=1" },
    };
  }

  if (
    normalized.includes("cost") ||
    normalized.includes("budget") ||
    normalized.includes("spend")
  ) {
    return {
      title: "Infrastructure showback is available; token budgets are not",
      detail:
        "OpenCost allocation by tenant namespace is live. Token or API billing controls remain a planned capability.",
      confidence: "High",
      signals: String(Math.max(attention.length, 1)),
      primary: { label: "Open usage & cost", to: "/cost" },
      secondary: { label: "Open tenants", to: "/tenants" },
    };
  }

  if (normalized.includes("changed") || normalized.includes("sign-in")) {
    return {
      title: "Recent lifecycle activity is quiet",
      detail:
        "The audit feed has not returned new owner events. Review the notification center for the current deterministic risk set.",
      confidence: "Medium",
      signals: String(attention.length),
      primary: { label: "Open notification center", to: "#owner-inbox" },
      secondary: { label: "View tenants", to: "/tenants" },
    };
  }

  if (top) {
    return {
      title: top.title,
      detail: top.detail,
      confidence: top.level === "critical" ? "High" : "Medium",
      signals: String(attention.length),
      primary: { label: top.action, to: top.href },
      secondary: { label: "Open tenants", to: "/tenants" },
    };
  }

  return {
    title: "No open attention items",
    detail: `Fleet health reports ${healthyServices} / ${totalServices} services healthy. Continue with capacity and tenant checks before provisioning.`,
    confidence: "Medium",
    signals: "0",
    primary: { label: "Open capacity", to: "/capacity" },
    secondary: { label: "Open tenants", to: "/tenants" },
  };
}

export function AskSherpaPanel({
  attentionItems,
  healthyServices,
  totalServices,
}: AskSherpaPanelProps) {
  const [query, setQuery] = useState("What should I handle first?");
  const [showResult, setShowResult] = useState(false);

  const result = buildResult(
    query,
    attentionItems,
    healthyServices,
    totalServices,
  );

  const evidenceLabel = `Evidence updated ${new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
  }).format(new Date())}`;

  return (
    <Card
      className="dark-card border-app-border/80 shadow-none"
      aria-labelledby="ask-sherpa-title"
    >
      <CardHeader className="px-0 pt-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-app-success"
                aria-hidden
              />
              <CardTitle
                id="ask-sherpa-title"
                className="text-lg font-semibold text-app-text"
              >
                Ask Sherpa
              </CardTitle>
              <Badge variant="outline">Read-only preview</Badge>
            </div>
            <p className="mt-1 text-sm text-app-text-muted">
              Synthesize tenant impact, policy, capacity, and recovery evidence
              before you act.
            </p>
          </div>
          <p className="text-xs text-app-text-muted">{evidenceLabel}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="ask-sherpa-input">
            Ask Sherpa
          </label>
          <Input
            id="ask-sherpa-input"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowResult(false);
            }}
            placeholder="Ask about risks, cost, tenants, or capacity…"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={() => setShowResult(true)}
            className="shrink-0"
          >
            Analyze
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {PROMPTS.map((prompt) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => {
                setQuery(prompt.value);
                setShowResult(false);
              }}
              className="rounded-full border border-app-border bg-app-bg px-3 py-1.5 text-xs text-app-text transition-colors hover:border-app-accent hover:text-app-accent"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        {showResult ? (
          <div className="rounded-xl border border-app-border bg-app-bg/40 p-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-app-text-muted uppercase">
                  Recommended focus
                </p>
                <p className="mt-1 text-sm font-semibold text-app-text">
                  {result.title}
                </p>
                <p className="mt-1 text-sm text-app-text-muted">
                  {result.detail}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-app-text-muted">Confidence</dt>
                  <dd className="font-medium text-app-text">
                    {result.confidence}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-app-text-muted">Signals</dt>
                  <dd className="font-medium text-app-text">{result.signals}</dd>
                </div>
              </dl>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="button" size="sm" asChild>
                <Link to={result.primary.to}>{result.primary.label}</Link>
              </Button>
              <Button type="button" size="sm" variant="outline" asChild>
                <Link to={result.secondary.to}>{result.secondary.label}</Link>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setShowResult(false)}
              >
                Clear analysis
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
