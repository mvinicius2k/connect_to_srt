import { HTMLAttributes } from "react";
import { SRTPoint } from "@/components/srt-points-viewer/shared";

import { ToolbarActions } from "@/hooks/use-toolbar";
import { ResultAction } from "@/helpers/result";
import { ScanFailResponseDto, ScanSucessResponseDto } from "@/api/actions-api";


export interface SRTPointsToolbarProps extends HTMLAttributes<HTMLDivElement>{
  actions: ToolbarActions
  selectedPoint?: SRTPoint
  onScanStarted?: () => void
  onScanFinished?: (result: ResultAction<ScanSucessResponseDto, ScanFailResponseDto>) => void

}
