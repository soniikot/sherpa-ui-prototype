import { BellRing, Building2, Shield } from "lucide-react";
import type { AttentionSource } from "@/data/types";

export function sourceMeta(source: AttentionSource) {
  if (source === "tenant") {
    return {
      label: "New tenant",
      Icon: Building2,
    };
  }
  if (source === "policy") {
    return {
      label: "Policy",
      Icon: Shield,
    };
  }
  return {
    label: "Alerting",
    Icon: BellRing,
  };
}

/** Category colors — identity by source, not urgency. */
export function sourceStyles(source: AttentionSource) {
  if (source === "tenant") {
    return {
      card: "border-teal-500/30 bg-teal-500/5",
      dot: "bg-teal-400",
    };
  }
  if (source === "policy") {
    return {
      card: "border-violet-500/30 bg-violet-500/5",
      dot: "bg-violet-400",
    };
  }
  return {
    card: "border-orange-500/30 bg-orange-500/5",
    dot: "bg-orange-400",
  };
}
