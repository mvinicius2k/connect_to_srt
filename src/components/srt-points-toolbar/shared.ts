import { HTMLAttributes } from "react";
import { SRTPoint } from "@/components/srt-points-viewer/shared";

import { ToolbarActions } from "@/hooks/use-toolbar";


export interface SRTPointsToolbarProps extends HTMLAttributes<HTMLDivElement>{
  actions: ToolbarActions
  selectedPoint?: SRTPoint
}
