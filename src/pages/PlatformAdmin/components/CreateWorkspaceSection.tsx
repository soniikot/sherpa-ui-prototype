import { useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateWorkspaceSectionProps } from "@/pages/PlatformAdmin/components/CreateWorkspaceSection.types";
import {
  generateTempPassword,
  workspaceFormSchema,
} from "@/pages/PlatformAdmin/workspaceForm";

export function CreateWorkspaceSection({
  open,
  onOpenChange,
  onCreated,
}: CreateWorkspaceSectionProps) {
  const [slug, setSlug] = useState("demo1");
  const [adminEmail, setAdminEmail] = useState("admin@demo1.test");
  const [organizationName, setOrganizationName] = useState("Demo One");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setSlug("demo1");
    setAdminEmail("admin@demo1.test");
    setOrganizationName("Demo One");
    setFieldErrors({});
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

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
      return;
    }

    setFieldErrors({});
    const password = generateTempPassword();
    onCreated({ ...parsed.data, tempPassword: password });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create tenant</DialogTitle>
          <DialogDescription>
            Each workspace reserves a guaranteed 2 vCPU / 4 GiB floor (Kueue ·
            cohort sherpa-fleet), with a hard cap of 4 vCPU / 8 GiB and 20 pods
            per namespace × 3 (app · model · system).
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
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
              shown in a toast once the workspace is created.
            </span>
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create workspace</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
