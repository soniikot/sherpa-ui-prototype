import { useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateWorkspaceSectionProps } from "@/pages/PlatformAdmin/components/CreateWorkspaceSection.types";
import {
  generateTempPassword,
  workspaceFormSchema,
} from "@/pages/PlatformAdmin/workspaceForm";

export function CreateWorkspaceSection({ onCreated }: CreateWorkspaceSectionProps) {
  const [slug, setSlug] = useState("demo1");
  const [adminEmail, setAdminEmail] = useState("admin@demo1.test");
  const [organizationName, setOrganizationName] = useState("Demo One");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [tempPassword, setTempPassword] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const parsed = workspaceFormSchema.safeParse({
      slug,
      adminEmail,
      organizationName,
    });

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      setTempPassword(null);
      return;
    }

    setFieldErrors({});
    const password = generateTempPassword();
    setTempPassword(password);
    onCreated({ ...parsed.data, tempPassword: password });
  };

  return (
    <Card className="dark-card border-app-border/80 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-semibold text-app-text">
          Create a workspace — provision a new tenant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0">
        <div className="rounded-lg border border-app-border bg-app-bg/50 px-4 py-3 text-sm leading-relaxed text-app-text-muted">
          Each workspace reserves a guaranteed{" "}
          <span className="font-semibold text-app-success">2 vCPU / 4 GiB</span>{" "}
          floor (Kueue · cohort{" "}
          <span className="font-semibold text-app-success">sherpa-fleet</span>,
          burstable by borrowing idle capacity), with a hard cap of{" "}
          <span className="font-semibold text-app-success">4 vCPU / 8 GiB</span>{" "}
          and 20 pods per namespace × 3 (app · model · system).
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="workspace-slug">Workspace slug</Label>
              <Input
                id="workspace-slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                aria-invalid={Boolean(fieldErrors.slug)}
              />
              <p className="text-xs text-app-text-muted">
                3–20 chars, a–z 0–9 hyphen.
              </p>
              {fieldErrors.slug ? (
                <p className="text-xs text-app-danger">{fieldErrors.slug}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin email</Label>
              <Input
                id="admin-email"
                type="email"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                aria-invalid={Boolean(fieldErrors.adminEmail)}
              />
              {fieldErrors.adminEmail ? (
                <p className="text-xs text-app-danger">{fieldErrors.adminEmail}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization name</Label>
              <Input
                id="org-name"
                value={organizationName}
                onChange={(event) => setOrganizationName(event.target.value)}
                aria-invalid={Boolean(fieldErrors.organizationName)}
              />
              {fieldErrors.organizationName ? (
                <p className="text-xs text-app-danger">
                  {fieldErrors.organizationName}
                </p>
              ) : null}
            </div>
          </div>

          <p className="flex items-start gap-2 text-xs leading-relaxed text-app-text-muted">
            <KeyRound className="mt-0.5 size-3.5 shrink-0" />
            <span>
              We generate a temporary password for you to give the admin. It is
              shown below once the workspace is created.
            </span>
          </p>

          <Button type="submit">Create workspace</Button>
        </form>

        {tempPassword ? (
          <div className="rounded-lg border border-app-success/40 bg-app-success/10 px-4 py-3 text-sm">
            <p className="font-medium text-app-success">Workspace created</p>
            <p className="mt-1 text-app-text-muted">
              Temporary password:{" "}
              <code className="font-mono text-app-text">{tempPassword}</code>
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
