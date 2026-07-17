import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_CURRENT_IAM, MOCK_PLATFORM_IDENTITIES } from "@/data/mockData";

export function PlatformIamPage() {
  const session = MOCK_CURRENT_IAM;

  return (
    <PageContainer
      eyebrow="Platform access"
      title="Platform IAM"
      description="Inspect the identity and effective authorization claims for this session."
      fullWidth
    >
      <Card className="dark-card border border-app-border/80 bg-app-hover/20 shadow-none">
        <CardHeader className="px-0 pt-0">
          <Badge variant="outline" className="mb-2 w-fit">
            Bindings are managed server-side
          </Badge>
          <CardTitle className="text-lg font-semibold text-app-text">
            Read-only authorization
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Roles and permissions are read-only here. Identity-provider groups
            and platform policy bindings are evaluated by the server; this
            console does not expose a role mutation API.
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-semibold text-app-text">
              Current identity
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Claims returned by the authenticated owner API.
            </p>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-xs text-app-text-muted">Subject</dt>
                <dd className="mt-1 break-all font-mono text-sm text-app-text">
                  {session.subject}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-app-text-muted">Email</dt>
                <dd className="mt-1 text-sm text-app-text">{session.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-app-text-muted">Plane</dt>
                <dd className="mt-1 text-sm text-app-text">{session.plane}</dd>
              </div>
              <div>
                <dt className="text-xs text-app-text-muted">Primary role</dt>
                <dd className="mt-1 text-sm text-app-text">
                  {session.primaryRole}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="dark-card border-app-border/80 shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-semibold text-app-text">
              Effective roles
            </CardTitle>
            <p className="mt-1 text-sm text-app-text-muted">
              Server-resolved role names for this subject.
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 px-0 pb-0">
            {session.roles.map((role) => (
              <Badge key={role} variant="outline">
                {role}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Effective permissions
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Permission checks are also enforced by the API; UI guards are not a
            security boundary.
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 px-0 pb-0">
          {session.permissions.map((permission) => (
            <Badge
              key={permission}
              variant="outline"
              className="font-mono text-[11px]"
            >
              {permission}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Platform identities
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Server-side account state and role bindings. Self-service role
            mutation is intentionally unavailable.
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto rounded-lg border border-app-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-app-text-muted">
                  <th className="px-3 py-2 font-medium">Identity</th>
                  <th className="px-3 py-2 font-medium">Roles</th>
                  <th className="px-3 py-2 font-medium">State</th>
                  <th className="px-3 py-2 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PLATFORM_IDENTITIES.map((identity) => (
                  <tr
                    key={identity.id}
                    className="border-b border-app-border/70 last:border-b-0"
                  >
                    <td className="px-3 py-3">
                      <div className="font-medium text-app-text">
                        {identity.displayName}
                      </div>
                      <div className="text-xs text-app-text-muted">
                        {identity.email}
                      </div>
                      <div className="mt-1 break-all font-mono text-[11px] text-app-text-muted">
                        {identity.subject}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {identity.roles.map((role) => (
                          <Badge key={role} variant="outline">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className="border-app-success/50 text-app-success"
                      >
                        {identity.state}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-app-text-muted">
                      {identity.updatedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="dark-card border-app-border/80 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold text-app-text">
            Recent IAM audit
          </CardTitle>
          <p className="mt-1 text-sm text-app-text-muted">
            Tamper-evident platform authorization and approval events.
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="rounded-xl border border-dashed border-app-border px-4 py-10 text-center">
            <p className="text-sm font-medium text-app-text">No audit events</p>
            <p className="mt-1 text-xs text-app-text-muted">
              No platform audit events were returned.
            </p>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
