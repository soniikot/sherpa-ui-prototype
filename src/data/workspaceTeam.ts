export type WorkspaceMemberRole = "Workspace Admin" | "Member";

export interface WorkspaceMember {
  id: string;
  fullName: string;
  email: string;
  role: WorkspaceMemberRole;
  status: "active" | "invited";
}

export interface SsoProvider {
  id: string;
  name: string;
  status: "connected" | "available";
}

export function getDefaultMembers(adminEmail: string): WorkspaceMember[] {
  return [
    {
      id: "1",
      fullName: "Workspace Admin",
      email: adminEmail,
      role: "Workspace Admin",
      status: "active",
    },
    {
      id: "2",
      fullName: "Alex Member",
      email: adminEmail.replace("admin@", "alex@"),
      role: "Member",
      status: "active",
    },
  ];
}

export const MOCK_SSO_PROVIDERS: SsoProvider[] = [
  { id: "google", name: "Google", status: "available" },
  { id: "microsoft", name: "Microsoft", status: "available" },
  { id: "okta", name: "Okta", status: "available" },
  { id: "oidc", name: "OIDC / SAML", status: "available" },
];
