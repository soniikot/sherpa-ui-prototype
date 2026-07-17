import type { CostPlane } from "@/data/types";

export interface AllocationByPlaneProps {
  planes: CostPlane[];
  footer: string;
  openCostHref: string;
}
