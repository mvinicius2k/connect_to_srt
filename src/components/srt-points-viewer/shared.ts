import { HTMLAttributes } from "react";

export type SRTPoint = {
  ip: string;
  port: number;
  mode: "listener" | "rendezvous";
};



export interface SRTPointsViewerProps extends  HTMLAttributes<HTMLDivElement> {
  points: SRTPoint[],
  allowTextSelect?: boolean,
  onSelectedPoint?: (selected: SRTPoint) => void
  onPlaySelected?: (selected: SRTPoint) => void

}
