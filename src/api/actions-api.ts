import { defineCommands, ErrorIdentifier } from "@/api/tauri";
import { ActionsMock } from "@/mock/actions-mock";

export type ScanSucessResponseDto = {
  host: string;
  port: number;
  kind: "listener" | "rez";
};
export type ScanFailResponseDto = ErrorIdentifier;

export type ViewSucessResponseDto = void;
export type ViewFailResponseDto = ErrorIdentifier;
export const ActionsAPI = defineCommands({
  scan: {
    mock: ActionsMock.scan,
  },
  view: {
    mock: ActionsMock.view,
  },
});
