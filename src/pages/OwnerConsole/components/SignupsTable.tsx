import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatSignupDate,
  formatSignupStatus,
} from "@/pages/OwnerConsole/signups/formatSignupDate";
import type { SignupsTableProps } from "@/pages/OwnerConsole/components/SignupsTable.types";

export function SignupsTable({ signups }: SignupsTableProps) {
  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto rounded-lg border border-app-border">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                <th className="px-3 py-2 font-medium" scope="col">
                  Organization
                </th>
                <th className="px-3 py-2 font-medium" scope="col">
                  Request
                </th>
                <th className="px-3 py-2 font-medium" scope="col">
                  Placement
                </th>
                <th className="px-3 py-2 font-medium" scope="col">
                  Verification
                </th>
                <th className="px-3 py-2 font-medium" scope="col">
                  Updated
                </th>
                <th className="px-3 py-2 font-medium" scope="col">
                  <span className="sr-only">Review</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {signups.map((signup) => (
                <tr
                  key={signup.id}
                  className="border-b border-app-border/70 last:border-b-0"
                >
                  <td className="px-3 py-3 align-top">
                    <p className="font-medium text-app-text">{signup.orgName}</p>
                    <p className="font-mono text-xs text-app-text-muted">
                      {signup.slug}
                    </p>
                    <p className="mt-0.5 text-xs text-app-text-muted">
                      {signup.adminEmail}
                    </p>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Badge variant="outline">
                      {formatSignupStatus(signup.status)}
                    </Badge>
                    <p className="mt-1 text-xs text-app-text-muted">
                      {signup.plan}
                    </p>
                  </td>
                  <td className="px-3 py-3 align-top text-sm text-app-text">
                    {signup.region}
                    <p className="mt-0.5 text-xs text-app-text-muted">
                      {signup.gpuClass}
                    </p>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Badge
                      variant={signup.emailVerified ? "success" : "outline"}
                    >
                      {signup.emailVerified ? "email verified" : "unverified"}
                    </Badge>
                    <p className="mt-1 text-xs text-app-text-muted">
                      {signup.approvals} of {signup.requiredApprovals} approvals
                    </p>
                  </td>
                  <td className="px-3 py-3 align-top text-xs text-app-text-muted">
                    {formatSignupDate(signup.updatedAt)}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Link
                      to={`/signups/${encodeURIComponent(signup.id)}`}
                      aria-label={`Review ${signup.orgName}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-app-border text-app-text-muted transition-colors hover:border-app-accent hover:text-app-accent"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
