import { z } from "zod";

export const workspaceFormSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug must be 3–20 characters")
    .max(20, "Slug must be 3–20 characters")
    .regex(/^[a-z0-9-]+$/, "Use a–z, 0–9, hyphen only"),
  adminEmail: z.email("Enter a valid email"),
  organizationName: z.string().min(1, "Organization name is required"),
});

export type WorkspaceFormValues = z.infer<typeof workspaceFormSchema>;

export function generateTempPassword(): string {
  const random = Math.random().toString(36).slice(2, 8);
  const nn = String(Math.floor(Math.random() * 90) + 10);
  return `Sherpa-${random}-${nn}`;
}
