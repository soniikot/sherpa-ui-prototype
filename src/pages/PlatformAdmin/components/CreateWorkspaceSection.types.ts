export interface CreateWorkspaceSectionProps {
  onCreated: (payload: {
    slug: string;
    adminEmail: string;
    organizationName: string;
    tempPassword: string;
  }) => void;
}
