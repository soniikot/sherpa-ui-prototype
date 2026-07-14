import { useState, type FormEvent } from "react";
import { ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getDefaultMembers,
  MOCK_SSO_PROVIDERS,
  type WorkspaceMember,
  type WorkspaceMemberRole,
} from "@/data/workspaceTeam";

interface TeamSsoTabProps {
  adminEmail: string;
  organizationName: string;
}

const ROLES: WorkspaceMemberRole[] = ["Workspace Admin", "Member"];

export function TeamSsoTab({ adminEmail, organizationName }: TeamSsoTabProps) {
  const [members, setMembers] = useState<WorkspaceMember[]>(() =>
    getDefaultMembers(adminEmail),
  );
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WorkspaceMemberRole>("Member");

  const handleInvite = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      return;
    }

    const exists = members.some((member) => member.email === trimmed);
    if (exists) {
      toast.error("That email is already on the workspace");
      return;
    }

    const next: WorkspaceMember = {
      id: String(Date.now()),
      fullName: trimmed.split("@")[0] ?? trimmed,
      email: trimmed,
      role,
      status: "invited",
    };
    setMembers((current) => [next, ...current]);
    setEmail("");
    setRole("Member");
    toast.success(`Invited ${trimmed}`);
  };

  const handleConnectProvider = (name: string) => {
    toast.message(`${name} SSO is not wired yet`, {
      description: "Prototype — IdP connect is mock-only.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-app-text">User management</h3>
          <p className="mt-1 text-sm text-app-text-muted">
            Invite teammates, assign Workspace Admin / Member, and connect your
            own identity provider for corporate SSO.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text">
          <ShieldCheck className="size-4 text-app-accent" />
          <span>Managing {organizationName}</span>
        </div>
      </div>

      <form
        onSubmit={handleInvite}
        className="dark-card space-y-5 border-app-border/80 shadow-none"
      >
        <div>
          <h4 className="text-lg font-semibold text-app-text">
            Add existing teammate
          </h4>
          <p className="text-sm text-app-text-muted">
            Attach someone to this workspace and choose their starting role.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="invite-email">Work email</Label>
            <Input
              id="invite-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="member@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-role">Workspace role</Label>
            <select
              id="invite-role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value as WorkspaceMemberRole)
              }
              className="flex h-9 w-full rounded-md border border-app-border bg-app-surface px-3 text-sm text-app-text outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {ROLES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button type="submit" disabled={!email.trim()}>
          <UserPlus className="size-4" />
          Add to workspace
        </Button>
      </form>

      <div className="dark-card overflow-hidden border-app-border/80 shadow-none">
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-app-text">
            People with access
          </h4>
          <p className="text-sm text-app-text-muted">
            Members and roles for this workspace (mock, in-memory).
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg border border-app-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">Role</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-app-border/70 last:border-b-0"
                >
                  <td className="px-3 py-3 font-medium text-app-text">
                    {member.fullName}
                  </td>
                  <td className="px-3 py-3 text-app-text-muted">{member.email}</td>
                  <td className="px-3 py-3 text-app-text">{member.role}</td>
                  <td className="px-3 py-3">
                    {member.status === "active" ? (
                      <Badge variant="success">active</Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-app-running/50 text-app-running"
                      >
                        invited
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dark-card space-y-4 border-app-border/80 shadow-none">
        <div>
          <h4 className="text-lg font-semibold text-app-text">
            Identity providers
          </h4>
          <p className="text-sm text-app-text-muted">
            Connect Google, Microsoft, Okta, or any OIDC/SAML so the team signs in
            with corporate SSO. Scoped to this org only.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {MOCK_SSO_PROVIDERS.map((provider) => (
            <div
              key={provider.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-app-border bg-app-bg/40 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-app-text">{provider.name}</p>
                <p className="text-xs text-app-text-muted">{provider.status}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleConnectProvider(provider.name)}
              >
                Connect
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
