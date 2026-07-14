import type { ReactNode } from "react";

export interface PageContainerProps {
  title: string;
  description: string;
  children: ReactNode;
  fullWidth?: boolean;
  headerActions?: ReactNode;
}
