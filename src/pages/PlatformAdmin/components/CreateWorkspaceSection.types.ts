export interface CreateWorkspaceSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (payload: {
    slug: string;
    adminEmail: string;
    organizationName: string;
    tempPassword: string;
  }) => void;
}
