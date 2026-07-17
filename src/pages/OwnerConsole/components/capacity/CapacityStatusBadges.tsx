import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PlacementStatus } from "@/data/types";

export function PlacementBadge({ status }: { status: PlacementStatus }) {
  if (status === "locked") {
    return (
      <Badge variant="outline" className="gap-1">
        <Lock className="size-3" />
        Locked
      </Badge>
    );
  }

  if (status === "available") {
    return <Badge variant="success">Available</Badge>;
  }

  return (
    <Badge variant="outline" className="border-app-danger/40 text-app-danger">
      Unavailable
    </Badge>
  );
}

export function LimitStatusBadge({
  status,
}: {
  status: "within_limits" | "near_limit" | "over_limit";
}) {
  if (status === "within_limits") {
    return <Badge variant="outline">Within limits</Badge>;
  }

  if (status === "near_limit") {
    return (
      <Badge variant="outline" className="border-app-warning/50 text-app-warning">
        Near limit
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="border-app-danger/50 text-app-danger">
      Over limit
    </Badge>
  );
}
