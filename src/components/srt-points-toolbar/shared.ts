import { HTMLAttributes } from "react";
import { SRTPoint } from "@/components/srt-points-viewer/shared";
import { ResultAction } from "@/helpers/result";
import { ErrorIdentifier } from "@/api/tauri";

export interface ToolbarActions {

  play: (point: SRTPoint) => Promise<ResultAction<void, ErrorIdentifier>>,
  scanAgain: () => Promise<ResultAction<SRTPoint[], ErrorIdentifier>>,
  toggleAllowTextSelection: () => void


}

export interface SRTPointsToolbarProps extends HTMLAttributes<HTMLDivElement>{
  actions: ToolbarActions
  selectedPoint?: SRTPoint
}
