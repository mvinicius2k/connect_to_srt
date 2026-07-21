import { HTMLAttributes } from "react";

export type SRTPoint = {
  host: string;
  port: number;
  kind: "listener" | "rendezvous";
};



export interface SRTPointsViewerProps extends  HTMLAttributes<HTMLDivElement> {
  points: SRTPoint[],
  allowTextSelect?: boolean,
  onSelectedPoint: (selected: SRTPoint) => void

}
